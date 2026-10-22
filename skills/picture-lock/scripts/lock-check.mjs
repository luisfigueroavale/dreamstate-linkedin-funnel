#!/usr/bin/env node
/**
 * Check a picture-lock plan, and optionally the encoded file.
 *
 * Fails: version other than 1; two range lists; a range with end <= start or an
 * unknown source; a stored out_start that disagrees with frame-snapped output
 * time; a words file that disagrees with the map; a missing named transcript;
 * repeated or missing ids; a draft flag; a missing cue; start < 0 or end more
 * than 0.01s past the cut; zoom scale outside 1.05–2.5; camera slice between
 * 2% and 98% of layout.cam; card overlap; footprint overlap with the camera
 * box over 0.002; unknown kind; missing required fields; a still or sound path
 * that is not on disk; a list row later than dur-0.8; an SRT cue whose words
 * are not in the mapped window; encoded-file decode errors; duration off by
 * 0.1s or more; integrated loudness more than 1 LU from the target; ebur128
 * summary peak above the true-peak target; a black stretch (d=0.10, pix_th=0.05);
 * a requested media file or probe tool that is missing.
 *
 * Warns: cue outside [at-2s, at+2.5s]; zoom under 1.2s; duration outside the
 * kind band; number digits missing nearby with no source; card gap under 1s;
 * sound hits under 1.5s apart; sparse or dense card counts; more than 60s
 * between events; event bounds skipped because there is no clock.
 *
 * Does not grade, search for silence, mix audio, measure loudness range,
 * score a caption keep-ratio, or decide that a still is genuine.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";

const MX = 76 / 1920;
const MY = 76 / 1080;
const ZOOM_SCALE_MIN = 1.05;
const ZOOM_SCALE_MAX = 2.5;
const ZOOM_SHORT_S = 1.2;
const BLACK_SECONDS = 0.1;
const BLACK_LUMA = 0.05;

const KINDS = {
  nameplate: { req: ["title"], dur: [2.5, 6], anchor: "bottom-right", box: { w: 0.36, h: 0.16 }, card: true, count: true },
  number: { req: ["value", "label"], dur: [3, 6], anchor: "top-right", box: { w: 0.27, h: 0.36 }, card: true, count: true },
  phrase: { req: ["text"], dur: [1.5, 4], anchor: "top-center", box: { w: 0.6, h: 0.15 }, card: true, count: true },
  list: { req: ["items"], dur: [3, 18], anchor: "right", box: { w: 0.31, h: 0.46 }, card: true, count: true },
  chapter: { req: ["title"], dur: [2, 4], anchor: "top-left", box: { w: 0.46, h: 0.17 }, card: true, count: true },
  still: { req: ["src"], dur: [3, 9], anchor: "right", box: { w: 0.47, h: 0.8 }, card: true, count: true },
  spotlight: { req: ["rect"], dur: [1.5, 6], anchor: null, box: null, card: false, count: true },
  captions: { req: [], dur: null, anchor: null, box: null, card: false, count: false },
  fullframe: { req: [], dur: null, anchor: null, box: null, card: false, count: true },
  zoom: { req: ["scale"], dur: null, anchor: null, box: null, card: false, count: false },
  overlay: { req: [], dur: null, anchor: null, box: null, card: true, count: true },
};

const HELP = `Usage: node skills/picture-lock/scripts/lock-check.mjs <plan.json> [--transcript name=path] [--words-out words.json] [--srt captions.srt] [--media out.mp4] [--silence 0.5]

Checks the plan and, with --media, the encoded file. See the header comment for fail versus warn.`;

function roundHalfEven(n) {
  const sign = n < 0 ? -1 : 1;
  const x = Math.abs(n);
  const floor = Math.floor(x);
  const diff = x - floor;
  if (Math.abs(diff - 0.5) > 1e-10) return sign * Math.round(x);
  return sign * (floor % 2 === 0 ? floor : floor + 1);
}

function round3(n) {
  return roundHalfEven(n * 1000) / 1000;
}

function parseFps(fps) {
  if (typeof fps === "number" && Number.isFinite(fps) && fps > 0) return fps;
  const match = /^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/.exec(String(fps ?? "").trim());
  if (!match) return null;
  const value = Number(match[1]) / Number(match[2]);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function norm(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function overlap(a, b) {
  const ax = a[0];
  const ay = a[1];
  const aw = a[2];
  const ah = a[3];
  const bx = b[0];
  const by = b[1];
  const bw = b[2];
  const bh = b[3];
  const width = Math.min(ax + aw, bx + bw) - Math.max(ax, bx);
  const height = Math.min(ay + ah, by + bh) - Math.max(ay, by);
  if (width <= 0 || height <= 0) return 0;
  return width * height;
}

function zoomView(scale, focus) {
  const fx = focus[0];
  const fy = focus[1];
  const span = 1 / scale;
  const x = fx * (1 - span);
  const y = fy * (1 - span);
  return [x, y, span, span];
}

function fields(event) {
  const top = {};
  for (const key of [
    "title", "value", "label", "text", "items", "rect", "src", "width", "anchor",
    "offset", "labelSide", "label", "mode", "fixes", "drop", "drop_at", "scale",
    "focus", "ease", "underlay",
  ]) {
    if (event[key] !== undefined) top[key] = event[key];
  }
  return { ...top, ...(event.props || {}) };
}

function anchorBox(kind, props) {
  if (kind === "spotlight" || (kind === "overlay" && props.rect)) {
    const [x, y, w, h] = props.rect;
    const side = props.labelSide || "bottom";
    const labelH = props.label ? 0.07 : 0;
    const pad = labelH + 0.02;
    return [x, side === "top" ? y - pad : y, w, h + pad];
  }
  const spec = KINDS[kind];
  if (!spec?.box) return null;
  let w = spec.box.w;
  let h = spec.box.h;
  if (kind === "still" && props.width) w = Number(props.width) / 1920;
  const anchor = props.anchor || spec.anchor;
  if (!anchor) return null;
  const x = anchor.includes("left") ? MX : anchor.includes("right") ? 1 - MX - w : (1 - w) / 2;
  const y = anchor.startsWith("top") ? MY : anchor.startsWith("bottom") ? 1 - MY - h : (1 - h) / 2;
  const shift = props.offset || [];
  const dx = Number(shift[0] || 0) / 1920;
  const dy = Number(shift[1] || 0) / 1080;
  return [x + dx, y + dy, w, h];
}

function deriveSpans(ranges, fps) {
  let cursor = 0;
  return ranges.map((item) => {
    const frames = Math.max(1, roundHalfEven((Number(item.end) - Number(item.start)) * fps));
    const outStart = cursor;
    cursor += frames / fps;
    return { ...item, frames, outStart, outEnd: cursor };
  });
}

function mapWords(spans, bySource) {
  const cache = {};
  const out = [];
  for (const span of spans) {
    if (!cache[span.source]) {
      const raw = bySource[span.source];
      if (!raw) return { error: span.source, words: out };
      cache[span.source] = raw.filter((word) => (word.type || "word") === "word");
    }
    const start = Number(span.start);
    const end = Number(span.end);
    for (const word of cache[span.source]) {
      const ws = Number(word.start);
      const we = Number(word.end);
      if (start <= ws && ws < end) {
        out.push({
          w: String(word.text).trim(),
          s: round3(span.outStart + ws - start),
          e: round3(span.outStart + Math.min(we, end) - start),
        });
      }
    }
  }
  return { words: out };
}

function phrases(words, silence) {
  const groups = [];
  for (const word of words) {
    const last = groups[groups.length - 1];
    if (last && word.s - last[last.length - 1].e < silence) last.push(word);
    else groups.push([word]);
  }
  return groups.map((group) => ({
    s: group[0].s,
    e: group[group.length - 1].e,
    text: group.map((word) => word.w).join(" "),
  }));
}

function parseSrt(text) {
  const blocks = text.replace(/^\uFEFF/, "").trim().split(/\r?\n\s*\r?\n/);
  const cues = [];
  for (const block of blocks) {
    const lines = block.split(/\r?\n/).filter((line) => line.trim() !== "");
    const timeLine = lines.find((line) => line.includes("-->"));
    if (!timeLine) continue;
    const [a, b] = timeLine.split("-->").map((part) => part.trim().split(/\s+/)[0]);
    const start = srtTime(a);
    const end = srtTime(b);
    const body = lines.slice(lines.indexOf(timeLine) + 1).join(" ");
    if (start == null || end == null) return { error: timeLine, cues };
    cues.push({ start, end, text: body });
  }
  return { cues };
}

function srtTime(value) {
  const match = /^(\d+):(\d+):(\d+)[,.](\d+)$/.exec(value);
  if (!match) return null;
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) + Number(match[4]) / 1000;
}

function displayWords(words, caps) {
  const fixes = caps.fixes || {};
  const drop = new Set(caps.drop || []);
  const dropAt = caps.drop_at || caps.dropAt || [];
  return words
    .filter((word) => !drop.has(word.w) && !dropAt.some((t) => Math.abs(word.s - Number(t)) < 0.02))
    .map((word) => ({ ...word, show: fixes[word.w] ?? word.w }));
}

function showTokens(text) {
  return String(text ?? "").toLowerCase().match(/[a-z0-9$%+']+/g) || [];
}

function isSubsequence(needles, hay) {
  let i = 0;
  for (const token of hay) {
    if (token === needles[i]) i += 1;
    if (i === needles.length) return true;
  }
  return needles.length === 0;
}

function loadTranscript(file) {
  const data = readJson(file);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.words)) return data.words;
  throw new Error(`no words in ${file}`);
}

function which(bin) {
  const found = spawnSync("sh", ["-c", `command -v ${bin}`], { encoding: "utf8" });
  return found.status === 0;
}

function probe(file) {
  const result = spawnSync(
    "ffprobe",
    ["-v", "error", "-show_format", "-show_streams", "-print_format", "json", file],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    return { error: (result.stderr || result.stdout || "ffprobe failed").trim() };
  }
  const data = JSON.parse(result.stdout);
  const video = (data.streams || []).find((stream) => stream.codec_type === "video");
  return {
    duration: Number(data.format?.duration),
    audio: (data.streams || []).some((stream) => stream.codec_type === "audio"),
    video: Boolean(video),
    width: video ? Number(video.width) : null,
    height: video ? Number(video.height) : null,
  };
}

function measureEncoded(file) {
  const decode = spawnSync("ffmpeg", ["-v", "error", "-i", file, "-f", "null", "-"], { encoding: "utf8" });
  const ebur = spawnSync(
    "ffmpeg",
    ["-hide_banner", "-nostats", "-i", file, "-af", "ebur128=peak=true", "-f", "null", "-"],
    { encoding: "utf8" },
  );
  const blackFilter = `blackdetect=d=${BLACK_SECONDS.toFixed(2)}:pix_th=${BLACK_LUMA}`;
  const black = spawnSync(
    "ffmpeg",
    ["-hide_banner", "-nostats", "-i", file, "-vf", blackFilter, "-an", "-f", "null", "-"],
    { encoding: "utf8" },
  );
  const eburText = `${ebur.stderr || ""}\n${ebur.stdout || ""}`;
  const loud = [...eburText.matchAll(/I:\s+(-?[\d.]+) LUFS/g)].map((match) => Number(match[1]));
  const peak = [...eburText.matchAll(/Peak:\s+(-?[\d.]+) dBFS/g)].map((match) => Number(match[1]));
  const blackText = `${black.stderr || ""}\n${black.stdout || ""}`;
  return {
    decodeErrors: (decode.stderr || "").trim() ? (decode.stderr || "").trim().split(/\r?\n/).length : 0,
    integrated: loud.length ? loud[loud.length - 1] : null,
    peak: peak.length ? peak[peak.length - 1] : null,
    black: blackText.includes("black_start"),
  };
}

function paceBand(minutes) {
  if (minutes < 1) return [6, 8];
  if (minutes < 3) return [8, 12];
  if (minutes < 10) return [12, 20];
  if (minutes < 30) return [20, 35];
  return [30, 60];
}

function parseArgs(argv) {
  const opts = { transcript: [], wordsOut: null, srt: null, media: null, silence: 0.5, plan: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") opts.help = true;
    else if (arg === "--transcript") opts.transcript.push(argv[++i]);
    else if (arg === "--words-out") opts.wordsOut = argv[++i];
    else if (arg === "--srt") opts.srt = argv[++i];
    else if (arg === "--media") opts.media = argv[++i];
    else if (arg === "--silence") opts.silence = Number(argv[++i]);
    else if (!arg.startsWith("--") && !opts.plan) opts.plan = arg;
    else throw new Error(`unknown argument ${arg}`);
  }
  return opts;
}

function resolvePlan(planPath, plan) {
  const dir = dirname(planPath);
  const errors = [];
  let ranges = plan.ranges;
  let sources = plan.sources || {};
  let fps = plan.fps;
  if (plan.edl === null && ranges) {
    errors.push("fail edl null cannot sit beside ranges");
    ranges = null;
  } else if (plan.edl && ranges) errors.push("fail two range lists; keep ranges or an edl file, not both");
  if (typeof plan.edl === "string") {
    const edlPath = resolvePath(dir, plan.edl);
    if (!existsSync(edlPath)) errors.push(`fail edl missing ${edlPath}`);
    else {
      const edl = readJson(edlPath);
      ranges = edl.ranges;
      sources = edl.sources || {};
      fps = fps ?? edl.settings?.fps;
    }
  }
  return { dir, ranges: ranges || null, sources, fps, errors };
}

function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  if (opts.help || !opts.plan) {
    console.log(HELP);
    process.exit(opts.help ? 0 : 1);
  }

  const planPath = resolvePath(opts.plan);
  const plan = readJson(planPath);
  const errors = [];
  const warnings = [];
  if (plan.version !== 1) errors.push("fail version must be 1");

  const loaded = resolvePlan(planPath, plan);
  errors.push(...loaded.errors);
  const { dir, sources } = loaded;
  const fps = parseFps(loaded.fps ?? plan.fps);
  let spans = [];
  let derived = null;

  if (loaded.ranges) {
    if (!fps) errors.push("fail fps missing or not a positive number or N/D fraction");
    else {
      loaded.ranges.forEach((range, index) => {
        if (!sources[range.source]) errors.push(`fail range ${index} source ${range.source} is not in sources`);
        if (!(Number(range.end) > Number(range.start))) errors.push(`fail range ${index} end must be after start`);
      });
      if (!errors.some((line) => line.startsWith("fail range"))) {
        spans = deriveSpans(loaded.ranges, fps);
        derived = spans.length ? spans[spans.length - 1].outEnd : 0;
        spans.forEach((span, index) => {
          console.log(
            `span ${index} ${span.source} ${Number(span.start).toFixed(3)}-${Number(span.end).toFixed(3)} -> ${span.outStart.toFixed(3)}-${span.outEnd.toFixed(3)} (${span.frames} frames)`,
          );
          if (span.out_start != null && Math.abs(Number(span.out_start) - span.outStart) > 0.0005) {
            errors.push(
              `fail range ${index} out_start ${span.out_start} disagrees with frame-snapped ${span.outStart.toFixed(3)}`,
            );
          }
        });
      }
    }
  }

  let cutDuration = derived;
  const basePath = plan.base ? resolvePath(dir, plan.base) : null;
  if (basePath && existsSync(basePath) && which("ffprobe")) {
    const info = probe(basePath);
    if (info.error) errors.push(`fail cut probe: ${info.error}`);
    else {
      console.log(
        `cut ${info.width || "?"}x${info.height || "?"} ${info.duration.toFixed(3)}s video=${info.video} audio=${info.audio}`,
      );
      if (derived != null && Math.abs(info.duration - derived) >= 0.1) {
        errors.push(
          `fail cut length ${info.duration.toFixed(3)}s disagrees with frame-snapped ranges ${derived.toFixed(3)}s`,
        );
      }
      cutDuration = info.duration;
    }
  } else if (plan.duration != null && cutDuration == null) {
    cutDuration = Number(plan.duration);
  }
  if (cutDuration == null) warnings.push("warn no clock yet; event ends were not compared to a cut length");

  const transcripts = { ...(plan.transcripts || {}) };
  for (const entry of opts.transcript) {
    const split = entry.includes("=") ? entry.split("=") : [null, entry];
    const name = split.length === 2 && split[0] ? split[0] : Object.keys(sources)[0] || "main";
    transcripts[name] = split.length === 2 && split[0] ? split[1] : entry;
  }
  const bySource = {};
  for (const [name, rel] of Object.entries(transcripts)) {
    const file = resolvePath(dir, rel);
    if (!existsSync(file)) errors.push(`fail missing transcript for ${name}: ${file}`);
    else bySource[name] = loadTranscript(file);
  }

  let words = [];
  if (Object.keys(bySource).length && spans.length && !errors.some((line) => line.includes("missing transcript"))) {
    const mapped = mapWords(spans, bySource);
    if (mapped.error) errors.push(`fail missing transcript for source ${mapped.error}`);
    words = mapped.words;
    for (const phrase of phrases(words, opts.silence)) {
      console.log(`phrase ${phrase.s.toFixed(3)}-${phrase.e.toFixed(3)} ${phrase.text}`);
    }
  }

  if (opts.wordsOut) {
    const file = resolvePath(dir, opts.wordsOut);
    if (!existsSync(file)) errors.push(`fail words file missing ${file}`);
    else if (!words.length && spans.length) {
      errors.push("fail words file given but the transcript map is empty");
    } else if (words.length) {
      const claimed = readJson(file);
      const rows = Array.isArray(claimed) ? claimed : claimed.words;
      const same = Array.isArray(rows) && rows.length === words.length && rows.every((row, i) => {
        return row.w === words[i].w && Math.abs(Number(row.s) - words[i].s) <= 0.0005 && Math.abs(Number(row.e) - words[i].e) <= 0.0005;
      });
      if (!same) errors.push("fail words file disagrees with the map from source ranges");
    }
  }

  const events = [...(plan.events || [])].sort((a, b) => Number(a.at) - Number(b.at));
  const ids = events.map((event) => event.id);
  if (ids.some((id) => !id)) errors.push("fail every event needs an id");
  if (new Set(ids.filter(Boolean)).size !== ids.filter(Boolean).length) errors.push("fail event ids repeat");

  const cam = plan.layout?.cam ?? null;
  for (const event of events) {
    const id = event.id || "?";
    const props = fields(event);
    const kind = event.kind || event.template;
    if (event.draft) errors.push(`fail ${id} is still marked draft`);
    const at = Number(event.at);
    const dur = Number(event.dur);
    if (!Number.isFinite(at) || !Number.isFinite(dur)) {
      errors.push(`fail ${id} needs numeric at and dur`);
      continue;
    }
    if (cutDuration != null && (at < 0 || at + dur > cutDuration + 0.01)) {
      errors.push(`fail ${id} ${at.toFixed(2)}+${dur.toFixed(2)}s falls outside the ${cutDuration.toFixed(2)}s cut`);
    }
    if (!event.cue) errors.push(`fail ${id} needs a cue`);
    else if (words.length) {
      const window = words.filter((word) => at - 2 <= word.s && word.s <= at + 2.5).map((word) => word.w).join(" ");
      if (!norm(window).includes(norm(event.cue))) {
        warnings.push(`warn ${id} cue "${event.cue}" is outside the spoken window at ${at.toFixed(2)}s`);
      }
    }
    if (event.sfx) {
      const sound = resolvePath(dir, event.sfx);
      if (!existsSync(sound)) errors.push(`fail ${id} sound file missing ${sound}`);
    }
    if (kind === "zoom") {
      const scale = Number(props.scale);
      const shortZoom = dur < ZOOM_SHORT_S;
      if (!(scale > 0)) errors.push(`fail ${id} needs a positive scale`);
      else if (scale < ZOOM_SCALE_MIN || scale > ZOOM_SCALE_MAX) {
        errors.push(`fail ${id} scale ${scale} is outside ${ZOOM_SCALE_MIN} to ${ZOOM_SCALE_MAX}`);
      }
      if (shortZoom) warnings.push(`warn ${id} lasts ${dur.toFixed(2)}s; a zoom under ${ZOOM_SHORT_S}s looks like a mistake`);
      if (cam && scale > 0) {
        const view = zoomView(scale, props.focus || [0.5, 0.5]);
        const area = cam[2] * cam[3];
        const seen = area ? overlap(view, cam) / area : 0;
        if (seen > 0.02 && seen < 0.98) {
          errors.push(`fail ${id} zoom shows ${Math.round(seen * 100)}% of the camera box`);
        }
      }
      continue;
    }
    if (!KINDS[kind]) {
      errors.push(`fail ${id} kind ${kind} is not in the checker menu`);
      continue;
    }
    const spec = KINDS[kind];
    for (const key of spec.req) {
      if (props[key] == null) errors.push(`fail ${id} ${kind} needs ${key}`);
    }
    if (spec.dur && (dur < spec.dur[0] || dur > spec.dur[1])) {
      warnings.push(`warn ${id} ${kind} runs ${dur.toFixed(1)}s; band is ${spec.dur[0]} to ${spec.dur[1]}s`);
    }
    if (kind === "still" && props.src) {
      const src = resolvePath(dir, props.src);
      if (!existsSync(src)) errors.push(`fail ${id} still file missing ${src}`);
    }
    if (kind === "list") {
      for (const item of props.items || []) {
        if (item.at != null && Number(item.at) > dur - 0.8) {
          errors.push(`fail ${id} list row "${item.text}" starts with under 0.8s left`);
        }
      }
    }
    if (kind === "number" && words.length) {
      const digits = String(props.value ?? "").replace(/[^0-9]/g, "").slice(0, 2);
      const near = words.filter((word) => at - 20 <= word.s && word.s <= at + 20).map((word) => word.w).join(" ");
      const source = event.source || props.source;
      if (digits && !near.replace(/[^0-9 ]/g, "").includes(digits) && !source) {
        warnings.push(`warn ${id} ${props.value} is not in nearby words and has no source`);
      }
    }
    if (kind === "overlay" && props.underlay) continue;
    if ((spec.card || kind === "spotlight" || (kind === "overlay" && props.rect)) && cam) {
      const box = anchorBox(kind, props);
      if (box && overlap(box, cam) > 0.002) errors.push(`fail ${id} footprint meets the camera box`);
    }
  }

  const cards = events.filter((event) => {
    const kind = event.kind || event.template;
    if (kind === "overlay" && fields(event).underlay) return false;
    return KINDS[kind]?.card;
  });
  for (let i = 0; i < cards.length - 1; i += 1) {
    const gap = Number(cards[i + 1].at) - (Number(cards[i].at) + Number(cards[i].dur));
    if (gap < 0) errors.push(`fail ${cards[i].id} and ${cards[i + 1].id} overlap`);
    else if (gap < 1) warnings.push(`warn ${cards[i].id} to ${cards[i + 1].id}: ${gap.toFixed(1)}s between cards`);
  }
  const hits = events.filter((event) => event.sfx).map((event) => Number(event.at)).sort((a, b) => a - b);
  for (let i = 0; i < hits.length - 1; i += 1) {
    if (hits[i + 1] - hits[i] < 1.5) warnings.push(`warn sound hits ${hits[i + 1] - hits[i]}s apart`);
  }

  if (cutDuration != null && events.length) {
    const [tight, wide] = paceBand(cutDuration / 60);
    const low = cutDuration / wide;
    const high = cutDuration / tight;
    const count = events.filter((event) => KINDS[event.kind || event.template]?.count).length;
    const captioned = events.some((event) => {
      const kind = event.kind || event.template;
      return kind === "captions" && (fields(event).mode ?? "full") === "full";
    });
    if (count < low * 0.6 && !captioned) {
      warnings.push(`warn ${count} cards over ${cutDuration.toFixed(1)}s is sparse for a ${tight}-${wide}s band`);
    }
    if (count > high * 1.4) {
      warnings.push(`warn ${count} cards over ${cutDuration.toFixed(1)}s is dense for a ${tight}-${wide}s band`);
    }
    const gaps = [];
    for (let i = 0; i < events.length - 1; i += 1) {
      gaps.push(Number(events[i + 1].at) - (Number(events[i].at) + Number(events[i].dur)));
    }
    const biggest = gaps.length ? Math.max(...gaps) : 0;
    if (biggest > 60) warnings.push(`warn ${biggest.toFixed(0)}s between visual events`);
  }

  const captionEvent = events.find((event) => (event.kind || event.template) === "captions");
  const caps = {
    ...(plan.captions || {}),
    ...(captionEvent ? fields(captionEvent) : {}),
  };
  const srtPath = opts.srt || captionEvent?.srt;
  if (srtPath) {
    const file = resolvePath(dir, srtPath);
    if (!existsSync(file)) errors.push(`fail srt missing ${file}`);
    else {
      const parsed = parseSrt(readFileSync(file, "utf8"));
      if (parsed.error) errors.push(`fail srt time line ${parsed.error}`);
      const shown = words.length ? displayWords(words, caps) : null;
      for (const cue of parsed.cues || []) {
        if (!(cue.end > cue.start)) errors.push(`fail srt cue ends before it starts (${cue.start})`);
        if (cutDuration != null && (cue.start < -0.001 || cue.end > cutDuration + 0.05)) {
          errors.push(`fail srt cue ${cue.start.toFixed(2)}-${cue.end.toFixed(2)} is outside the cut`);
        }
        if (shown) {
          const window = shown.filter((word) => word.e > cue.start - 0.05 && word.s < cue.end + 0.05);
          const need = showTokens(cue.text);
          const have = window.flatMap((word) => showTokens(word.show));
          if (!isSubsequence(need, have)) errors.push(`fail srt cue "${cue.text}" is not in the mapped cut`);
        }
      }
      if (shown == null) warnings.push("warn srt times checked; word match skipped (no transcript map)");
    }
  }

  if (opts.media) {
    const media = resolvePath(dir, opts.media);
    if (!existsSync(media)) errors.push(`fail media missing ${media}`);
    else if (!which("ffprobe") || !which("ffmpeg")) errors.push("fail ffmpeg or ffprobe missing; encoded file not checked");
    else {
      const info = probe(media);
      if (info.error) errors.push(`fail media probe: ${info.error}`);
      else {
        console.log(
          `media ${info.width || "?"}x${info.height || "?"} ${info.duration.toFixed(3)}s video=${info.video} audio=${info.audio}`,
        );
        const expect = cutDuration;
        if (expect == null) errors.push("fail media duration has no cut length to compare");
        else if (Math.abs(info.duration - expect) >= 0.1) {
          errors.push(`fail duration ${info.duration.toFixed(2)}s vs cut ${expect.toFixed(2)}s`);
        }
        const levels = measureEncoded(media);
        const targetI = plan.loudness?.i ?? -14;
        const targetTp = plan.loudness?.tp ?? -1.5;
        console.log(
          `levels integrated=${levels.integrated ?? "?"} peak=${levels.peak ?? "?"} decode_errors=${levels.decodeErrors} black=${levels.black}`,
        );
        if (levels.decodeErrors) errors.push(`fail decode errors: ${levels.decodeErrors}`);
        if (levels.integrated == null || Math.abs(levels.integrated - targetI) > 1) {
          errors.push(`fail integrated ${levels.integrated ?? "missing"} LUFS is more than 1 LU from ${targetI}`);
        }
        if (levels.peak == null || levels.peak > targetTp) {
          errors.push(`fail peak ${levels.peak ?? "missing"} dBFS is above ${targetTp}`);
        }
        if (levels.black) errors.push("fail black stretch detected");
      }
    }
  }

  for (const line of warnings) console.log(line);
  for (const line of errors) console.log(line);
  if (errors.length) {
    console.log(`lock-check: fail (${errors.length} errors, ${warnings.length} warnings)`);
    process.exit(1);
  }
  console.log(`lock-check: ok (${warnings.length} warnings)`);
}

main();
