#!/usr/bin/env node
/**
 * Score a sheet the owner already filled.
 * No socket, no host, no key.
 *
 *   node skills/video-pick/scripts/score-sheet.mjs rank --sheet sheet.json --out dir
 *   node skills/video-pick/scripts/score-sheet.mjs depth --sheet sheet.json --out dir
 *   node skills/video-pick/scripts/score-sheet.mjs card --heat 2 --gap 2 --fit 2 --timing 2 --receipt 1
 *   node skills/video-pick/scripts/score-sheet.mjs opening --file opening.txt
 *   node skills/video-pick/scripts/score-sheet.mjs packaging --donors donors.json
 *   node skills/video-pick/scripts/score-sheet.mjs self-check
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const STOP = new Set(
  `yours your you've you're you'll you years year won't without with will why who which where when what's what weeks week we've we're we ways way watch was want vs videos video using used use us up ultimate two tutorial turned turn trying try tried too to tips three this things thing they're they these there's there then them their the that's than testing tested test stop still steps step started start someone so shows show secrets secret runs running run review released release really real powerful people part out our or only one on officially official of now nothing not no need my much most more months month minutes minute min me massive many making make made live literally lets let leaked leak launched launch last just its it's it'll it isn't is into insane incredible in if i've i'm i'll i huge how hours hour honest here's here have has guide got going go full from free forever for first finally fast explained everything everyone every ever even easy drops dropped dont don't doesn't does do didn't did days day crazy complete changes changed change can't can by but built biggest better best beginners beginner before be back at as are anything announced and an amazing again after actually a 2026 2025`.split(/\s+/),
);

const GENERIC = new Set(
  `agent agents ai app apps automate automated automation build building business company content founder founders growth hustle income marketing model models money news online sales side startup strategy system systems tool tools update work workflow workflows`.split(/\s+/),
);

const BEATS = [
  { mark: "0:00", name: "confirm", cap: 15 },
  { mark: "0:05", name: "stakes", cap: 30 },
  { mark: "0:15", name: "receipt", cap: 25 },
  { mark: "0:25", name: "loop", cap: 50 },
  { mark: "0:45", name: "payoff", cap: 45 },
];

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function roundTo(value, places) {
  const factor = 10 ** places;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function statisticalMedian(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function upperMiddle(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function parseClock(text) {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(text || "");
  if (!match) return null;
  return Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
}

function durationOf(video) {
  if (video.duration_seconds != null && video.duration_seconds !== "") return Number(video.duration_seconds);
  if (video.duration) return parseClock(video.duration) ?? 0;
  return 0;
}

function wordTokens(title) {
  const cleaned = String(title || "")
    .toLowerCase()
    .replaceAll("\u2019", "'")
    .replace(/https?:\/\/\S+|[#@]\w+/g, " ");
  const alphabet = "a-z0-9";
  const matcher = new RegExp(`[${alphabet}](?:[${alphabet}.+'-]*[${alphabet}+])?`, "g");
  return cleaned.match(matcher) ?? [];
}

function coreOf(text, stop = STOP) {
  const found = String(text || "").toLowerCase().match(/[a-z]+/g) ?? [];
  return new Set(found.filter((token) => !stop.has(token)));
}

function isSubset(left, right) {
  if (left.size > right.size) return false;
  for (const token of left) if (!right.has(token)) return false;
  return true;
}

function overlapsTaken(core, taken) {
  for (const prior of taken) {
    if (isSubset(core, prior) || isSubset(prior, core)) return true;
  }
  return false;
}

function phrasesIn(title, generic) {
  const tokens = wordTokens(title);
  const found = new Set();
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!STOP.has(token) && !generic.has(token) && /[a-z]/.test(token) && token.length > 2) found.add(token);
    if (index + 1 < tokens.length) {
      const next = tokens[index + 1];
      const bothDigits = /^\d+$/.test(token) && /^\d+$/.test(next);
      if (!STOP.has(token) && !STOP.has(next) && !bothDigits) found.add(`${token} ${next}`);
    }
  }
  return found;
}

function compilePattern(source, fallback) {
  const text = source == null || source === "" ? fallback : String(source);
  return new RegExp(text, "i");
}

function paceRatio(row) {
  return row.age_band_ratio || row.recent_ratio || 0;
}

function bandOf(ratio) {
  if (ratio == null) return null;
  if (ratio < 2) return "under 2";
  if (ratio < 5) return "2 to 5";
  if (ratio < 10) return "5 to 10";
  return "over 10";
}

function rankSheet(sheet, options = {}) {
  const asOf = new Date(sheet.as_of || options.asOf || new Date().toISOString());
  if (Number.isNaN(asOf.getTime())) throw new Error("as_of is not a time");
  const keep = compilePattern(options.keep ?? sheet.keep, ".");
  const fit = options.fit ?? sheet.fit ? compilePattern(options.fit ?? sheet.fit, "$^") : null;
  const uploads = sheet.uploads || {};
  const searchIds = new Map();
  for (const search of sheet.searches || []) {
    for (const id of search.ids || []) {
      if (!searchIds.has(id)) searchIds.set(id, []);
      searchIds.get(id).push(search.query);
    }
  }
  const rows = new Map();
  for (const video of sheet.videos || []) {
    if (!video.id) throw new Error("a video is missing id");
    const published = new Date(video.published);
    if (Number.isNaN(published.getTime())) throw new Error(`bad published on ${video.id}`);
    const ageExact = (asOf.getTime() - published.getTime()) / 86400000;
    const duration = durationOf(video);
    const viewsKnown = video.views != null && video.views !== "" && !Number.isNaN(Number(video.views));
    const views = viewsKnown ? Number(video.views) : null;
    const broadcast = String(video.broadcast || "");
    const live = Boolean(video.live) || broadcast === "live" || broadcast === "upcoming";
    const language = video.language == null ? "" : String(video.language);
    const eligible = ageExact >= 1 && duration >= 240 && !live && viewsKnown;
    rows.set(video.id, {
      id: video.id,
      title: String(video.title || ""),
      channel: video.channel || "",
      channel_id: video.channel_id || "",
      published: video.published,
      age_exact: ageExact,
      age_days: roundTo(ageExact, 2),
      duration_seconds: duration,
      views: viewsKnown ? views : null,
      subscribers: video.subscribers == null || video.subscribers === "" ? null : Number(video.subscribers),
      language,
      language_unchecked: language === "",
      live,
      eligible,
      url: video.url || "",
    });
  }

  const ranked = [];
  for (const row of rows.values()) {
    if (!row.eligible || row.age_days > 90) continue;
    if (!keep.test(row.title)) continue;
    if (row.language && !row.language.startsWith("en")) continue;
    if (!row.channel_id || !uploads[row.channel_id]) continue;
    const library = uploads[row.channel_id];
    const recent = library
      .filter((id) => id !== row.id && rows.has(id))
      .map((id) => rows.get(id))
      .filter((peer) => peer.eligible && peer.age_days >= 3 && peer.age_days <= 90)
      .sort((a, b) => new Date(b.published) - new Date(a.published))
      .slice(0, 20);
    const ageMin = Math.max(3, row.age_days / 2);
    const ageMax = Math.min(90, Math.max(7, row.age_days * 2));
    const peers = library
      .filter((id) => id !== row.id && rows.has(id))
      .map((id) => rows.get(id))
      .filter((peer) => {
        if (!peer.eligible) return false;
        if (peer.age_days < ageMin || peer.age_days > ageMax) return false;
        return peer.duration_seconds >= row.duration_seconds / 3 && peer.duration_seconds <= row.duration_seconds * 3;
      });
    const recentMedian = recent.length >= 5 ? statisticalMedian(recent.map((peer) => peer.views)) : null;
    const ageMedian = peers.length >= 5 ? statisticalMedian(peers.map((peer) => peer.views)) : null;
    const recentRatio = recentMedian ? roundTo(row.views / recentMedian, 2) : null;
    const ageRatio = ageMedian ? roundTo(row.views / ageMedian, 2) : null;
    const queries = searchIds.get(row.id) || [];
    ranked.push({
      id: row.id,
      title: row.title,
      channel: row.channel,
      channel_id: row.channel_id,
      published: row.published,
      age_days: row.age_days,
      duration_seconds: row.duration_seconds,
      views: row.views,
      subscribers: row.subscribers,
      language: row.language,
      language_unchecked: row.language_unchecked,
      url: row.url,
      discovery: queries.length ? "search" : "library",
      queries,
      recent_n: recent.length,
      recent_median: recentMedian,
      recent_ratio: recentRatio,
      zero_recent_median: recentMedian === 0,
      age_band_min: roundTo(ageMin, 2),
      age_band_max: roundTo(ageMax, 2),
      age_band_n: peers.length,
      age_band_median: ageMedian,
      age_band_ratio: ageRatio,
      zero_age_median: ageMedian === 0,
      peer_ids: peers.map((peer) => peer.id),
      recent_ids: recent.map((peer) => peer.id),
      views_per_day: roundTo(row.views / Math.max(row.age_days, 1), 1),
      fit_title: fit ? fit.test(row.title) : null,
    });
  }
  ranked.sort((a, b) => (b.age_band_ratio || 0) - (a.age_band_ratio || 0) || b.views - a.views);
  return {
    as_of: asOf.toISOString(),
    keep: String(options.keep ?? sheet.keep ?? "."),
    rows: ranked,
    byId: new Map(ranked.map((row) => [row.id, row])),
    all: rows,
  };
}

function genericSet(sheet) {
  const extra = new Set(GENERIC);
  for (const token of sheet.generic_extra || []) extra.add(String(token).toLowerCase());
  return extra;
}

function heatTable(rows, { days, outlier, keep, generic }) {
  const outliers = rows.filter((row) => row.discovery === "search" && row.age_days <= days && keep.test(row.title) && paceRatio(row) >= outlier);
  const grouped = new Map();
  for (const row of outliers) {
    for (const phrase of phrasesIn(row.title, generic)) {
      if (!grouped.has(phrase)) grouped.set(phrase, []);
      grouped.get(phrase).push(row);
    }
  }
  const ordered = [...grouped.entries()].sort((a, b) => {
    const aChannels = new Set(a[1].map((row) => row.channel_id)).size;
    const bChannels = new Set(b[1].map((row) => row.channel_id)).size;
    if (bChannels !== aChannels) return bChannels - aChannels;
    return b[1].length - a[1].length;
  });
  const hot = [];
  const kept = [];
  for (const [phrase, list] of ordered) {
    const channels = new Set(list.map((row) => row.channel_id));
    if (channels.size < 2) break;
    const core = coreOf(phrase);
    if (!core.size || overlapsTaken(core, kept)) continue;
    kept.push(core);
    hot.push({ phrase, rows: list, channels: channels.size });
  }
  return hot;
}

function depthReport(sheet, options = {}) {
  const fitSource = options.fit ?? sheet.fit;
  if (!fitSource) throw new Error("depth needs a fit pattern: the niche outcome words");
  const fit = compilePattern(fitSource, "$^");
  const keep = compilePattern(options.keep ?? sheet.keep, ".");
  const days = Number(options.days ?? sheet.days ?? 30);
  const outlier = Number(options.outlier ?? sheet.outlier ?? 3);
  const breadth = Number(options.breadth ?? sheet.breadth ?? 4);
  const maxDepth = Number(options.maxDepth ?? sheet.max_depth ?? 3);
  const generic = genericSet(sheet);
  const ranked = rankSheet(sheet, { keep: options.keep ?? sheet.keep, fit: fitSource });
  const seenChannels = new Set();
  const seenPhrases = new Set();
  const taken = [];
  const nodes = [];

  for (const search of sheet.searches || []) {
    const ids = search.ids || [];
    const matched = ids.map((id) => ranked.byId.get(id)).filter((row) => row && keep.test(row.title));
    const scored = matched.filter((row) => paceRatio(row));
    const outs = scored.filter((row) => paceRatio(row) >= outlier);
    const newChannels = [...new Set(outs.map((row) => row.channel_id))].filter((id) => !seenChannels.has(id));
    const weight = new Map();
    const phraseChannels = new Map();
    for (const row of outs) {
      for (const phrase of phrasesIn(row.title, generic)) {
        weight.set(phrase, (weight.get(phrase) || 0) + Math.log2(paceRatio(row)));
        if (!phraseChannels.has(phrase)) phraseChannels.set(phrase, new Set());
        phraseChannels.get(phrase).add(row.channel_id);
      }
    }
    const candidates = [...weight.keys()]
      .filter((phrase) => phraseChannels.get(phrase).size >= 2)
      .sort((a, b) => weight.get(b) - weight.get(a));
    const freshPhrases = candidates.filter((phrase) => !seenPhrases.has(phrase));
    const ratios = scored.map((row) => paceRatio(row));
    const depth = Number(search.depth ?? 0);
    const node = {
      query: search.query,
      branch: search.branch || search.query,
      depth,
      parent: search.parent_query || null,
      results: ids.length,
      scored: scored.length,
      outliers: outs.length,
      outlier_channels: new Set(outs.map((row) => row.channel_id)).size,
      new_outlier_channels: newChannels.length,
      fit_outliers: outs.filter((row) => fit.test(row.title)).length,
      median_ratio: ratios.length ? roundTo(upperMiddle(ratios), 2) : null,
      yield_score: roundTo(outs.reduce((sum, row) => sum + Math.log2(paceRatio(row)), 0), 2),
      phrases: candidates.slice(0, 12),
      phrase_weight: Object.fromEntries(candidates.slice(0, 12).map((phrase) => [phrase, roundTo(weight.get(phrase), 3)])),
      saturated: newChannels.length === 0 && freshPhrases.length === 0,
      top: outs
        .slice()
        .sort((a, b) => paceRatio(b) - paceRatio(a))
        .slice(0, 5)
        .map((row) => ({
          id: row.id,
          title: row.title,
          channel: row.channel,
          views: row.views,
          ratio: paceRatio(row),
          age_days: row.age_days,
        })),
    };
    nodes.push(node);
    const core = coreOf(search.query || "");
    if (core.size) taken.push(core);
    for (const id of new Set(outs.map((row) => row.channel_id))) seenChannels.add(id);
    for (const phrase of candidates) seenPhrases.add(phrase);
  }

  const expandable = nodes.filter((node) => !node.saturated && node.depth < maxDepth);
  const deepest = expandable.reduce((max, node) => Math.max(max, node.depth), -1);
  const parent = expandable.filter((node) => node.depth === deepest).sort((a, b) => b.yield_score - a.yield_score)[0];
  const next = [];
  if (parent) {
    const rankedPhrases = Object.entries(parent.phrase_weight).sort((a, b) => b[1] - a[1]);
    for (const [phrase, weight] of rankedPhrases) {
      const core = coreOf(phrase);
      if (!core.size || overlapsTaken(core, taken)) continue;
      taken.push(core);
      next.push({
        query: phrase,
        branch: parent.branch,
        parent_query: parent.query,
        depth: parent.depth + 1,
        priority: roundTo(parent.yield_score * 1000 + weight, 3),
      });
      if (next.length === breadth) break;
    }
  }

  const hot = heatTable(ranked.rows, { days, outlier, keep, generic });
  const probes = (sheet.probes || []).map((probe) => {
    const need = coreOf(probe.phrase || "");
    const videos = (probe.ids || []).map((id) => ranked.all.get(id)).filter(Boolean);
    const matches = videos.filter((video) => need.size && isSubset(need, coreOf(video.title)) && fit.test(video.title));
    const withBase = matches.map((video) => ranked.byId.get(video.id)).filter((row) => row && paceRatio(row));
    const winner = withBase.slice().sort((a, b) => paceRatio(b) - paceRatio(a))[0] || null;
    const viewsMax = matches.reduce((max, video) => Math.max(max, video.views || 0), 0);
    return {
      query: probe.query,
      phrase: probe.phrase,
      anchor: probe.anchor,
      results: (probe.ids || []).length,
      niche_matches: matches.length,
      with_baseline: withBase.length,
      outliers: withBase.filter((row) => paceRatio(row) >= outlier).length,
      views_max: viewsMax,
      best: winner
        ? { channel: winner.channel, views: winner.views, multiple: paceRatio(winner), link: winner.url, name: winner.title }
        : null,
    };
  });

  const inWindow = ranked.rows.filter((row) => row.age_days <= days && keep.test(row.title) && paceRatio(row) >= outlier);
  inWindow.sort((a, b) => paceRatio(b) - paceRatio(a));
  const lines = [];
  lines.push("# Depth from the owner sheet");
  lines.push("");
  lines.push(`Window ${days} days. Outlier at ${outlier}× or more. Searches counted: ${(sheet.searches || []).length}.`);
  lines.push("A ratio is current views against that channel's own comparable uploads. It is a snapshot. It is not views per hour, not click-through, and not proof the topic caused the views.");
  lines.push("");
  lines.push("## Tree");
  lines.push("");
  lines.push("| Query | Depth | Rows | Hot | Channels, new ones | Fit hits | Upper-middle ratio | Yield | Status |");
  lines.push("|---|---|---|---|---|---|---|---|---|");
  const followed = new Set(nodes.map((node) => node.parent).filter(Boolean));
  for (const node of nodes) {
    let status = "not followed";
    if (node.saturated) status = "saturated";
    else if (followed.has(node.query)) status = "dived";
    const median = node.median_ratio == null ? "n/a" : node.median_ratio;
    lines.push(`| ${node.query} | ${node.depth} | ${node.results} | ${node.outliers} | ${node.outlier_channels} (${node.new_outlier_channels}) | ${node.fit_outliers} | ${median} | ${node.yield_score} | ${status} |`);
  }
  if (next.length) {
    lines.push("");
    lines.push("Count these next, by hand, then add them to the sheet: " + next.map((item) => `\`${item.query}\``).join(", "));
  } else {
    lines.push("");
    lines.push("No further phrase was proposed. Either the branches are saturated, depth is capped, or the sheet has no search yet.");
  }
  lines.push("");
  lines.push("## Heat");
  lines.push("");
  lines.push("Hot means at least 2 channels. A core that contains another core folds into the earlier one. A version number alone is not a wave. Little niche fit on a hot phrase means the angle is thin. Probes confirm it.");
  lines.push("");
  lines.push("| Phrase | Hot rows | Channel count | Upper middle | Fit hits | Freshest age |");
  lines.push("|---|---|---|---|---|---|");
  for (const entry of hot.slice(0, 25)) {
    const ratios = entry.rows.map((row) => paceRatio(row));
    const newest = Math.min(...entry.rows.map((row) => row.age_days));
    const nicheFit = entry.rows.filter((row) => fit.test(row.title)).length;
    lines.push(`| ${entry.phrase} | ${entry.rows.length} | ${entry.channels} | ${upperMiddle(ratios).toFixed(1)}× | ${nicheFit} | ${Math.round(newest)} |`);
  }
  lines.push("");
  lines.push("## Probes");
  lines.push("");
  if (!probes.length) lines.push("No probe rows on the sheet. A probe is a hot phrase plus a niche anchor the owner already counted.");
  else {
    lines.push("| Probe | Niche matches | With a baseline | Outliers | Most views | Best |");
    lines.push("|---|---|---|---|---|---|");
    for (const probe of probes) {
      const best = probe.best ? `${probe.best.name} ${probe.best.multiple}× ${probe.best.channel}` : "";
      lines.push(`| ${probe.query} | ${probe.niche_matches} | ${probe.with_baseline} | ${probe.outliers} | ${probe.views_max} | ${best} |`);
    }
    lines.push("");
    lines.push("Few niche matches and low views on a hot wave: the slot still looks open. Outliers on the probe: the angle is taken.");
  }
  const dump = (list) => {
    lines.push("| Ratio | Views | Age days | Channel | Title | Fit |");
    lines.push("|---|---|---|---|---|---|");
    for (const row of list) {
      const subs = row.subscribers == null ? "?" : row.subscribers;
      lines.push(`| ${paceRatio(row).toFixed(1)}× | ${row.views} | ${Math.round(row.age_days)} | ${row.channel} (${subs}) | ${row.title} | ${row.fit_title ? "yes" : ""} |`);
    }
  };
  lines.push("");
  lines.push("## Search outliers in the window");
  lines.push("");
  dump(inWindow.filter((row) => row.discovery === "search").slice(0, 40));
  lines.push("");
  lines.push("## Also popping in the sampled libraries");
  lines.push("");
  lines.push("These outliers came from upload lists, not from a search phrase. They are adjacent clicks on the same channels.");
  lines.push("");
  dump(inWindow.filter((row) => row.discovery !== "search").slice(0, 15));
  lines.push("");
  return { markdown: lines.join("\n"), nodes, next, probes, hot: hot.slice(0, 25), ranked };
}

function scoreCard(input) {
  const names = ["heat", "gap", "fit", "timing", "receipt"];
  const parts = {};
  for (const name of names) {
    const value = Number(input[name]);
    if (![0, 1, 2].includes(value)) throw new Error(`${name} must be 0, 1, or 2`);
    parts[name] = value;
  }
  const total = names.reduce((sum, name) => sum + parts[name], 0);
  const reasons = [];
  if (parts.heat === 0) reasons.push("heat is 0");
  if (parts.gap === 0) reasons.push("gap is 0");
  if (parts.fit === 0) reasons.push("fit is 0");
  if (parts.heat === 0 && parts.gap > 0) reasons.push("a dead wave does not leave a gap");
  if (total < 8) reasons.push(`total ${total} is under 8`);
  const pass = total >= 8 && parts.heat !== 0 && parts.gap !== 0 && parts.fit !== 0;
  return { total, pass, parts, reasons };
}

function spokenWords(line) {
  return String(line || "").trim().split(/\s+/).filter(Boolean);
}

function evaluateOpening(text) {
  const lines = String(text || "").replaceAll("\r\n", "\n").split("\n");
  const buckets = new Map(BEATS.map((beat) => [beat.mark, []]));
  let current = null;
  const found = [];
  for (const line of lines) {
    const header = line.match(/^\[(\d+:\d+)\b([^\]]*)\]/);
    if (header) {
      current = header[1];
      found.push(current);
      if (!buckets.has(current)) buckets.set(current, []);
      continue;
    }
    if (current && line.trim()) buckets.get(current).push(line.trim());
  }
  const beats = BEATS.map((beat) => {
    const body = buckets.get(beat.mark) || [];
    const versions = beat.mark === "0:00" ? body : null;
    const picked = body.find((line) => /^pick\b/i.test(line)) || body[0] || "";
    const spoken = spokenWords(picked.replace(/^pick\b[:\s-]*/i, ""));
    return {
      mark: beat.mark,
      name: beat.name,
      cap: beat.cap,
      words: spoken.length,
      over_cap: spoken.length > beat.cap,
      versions: versions ? versions.length : undefined,
      version_words: versions ? versions.map((line) => spokenWords(line.replace(/^pick\b[:\s-]*/i, "")).length) : undefined,
    };
  });
  const filler = (String(text).match(/\b(essentially|actually|basically)\b/gi) || []).length;
  const earlyText = ["0:00", "0:05", "0:15"].map((mark) => (buckets.get(mark) || []).join("\n")).join("\n");
  const cutMarks = (earlyText.match(/\bcuts?\b/gi) || []).length;
  const total = beats.reduce((sum, beat) => sum + beat.words, 0);
  const problems = [];
  if (BEATS.some((beat) => !found.includes(beat.mark))) problems.push("a beat header is missing");
  const confirm = beats[0];
  if (confirm.versions !== 3) problems.push("confirm needs 3 first-sentence versions");
  for (const beat of beats) if (beat.over_cap) problems.push(`${beat.name} has ${beat.words} words, cap ${beat.cap}`);
  if ((confirm.version_words || []).some((count) => count > 15)) problems.push("a confirm version is over 15 words");
  if (total > 220) problems.push(`spoken total ${total} is over the 220 stretch`);
  const notes = [];
  if (total < 150 || total > 170) notes.push(`spoken total ${total} is outside the 150 to 170 template`);
  if (filler) notes.push(`${filler} filler word(s): essentially, actually, basically`);
  if (!cutMarks) notes.push("no cut mark in the first three beats");
  if (/\bhop into\b/i.test(buckets.get("0:45")?.join(" ") || "")) problems.push("payoff uses a hop-in line");
  if (/^(hi|hey|hello)\b/i.test((buckets.get("0:00") || []).join(" "))) problems.push("confirm starts with a greeting");
  return { beats, spoken_total: total, filler, cut_marks_before_receipt_end: cutMarks, problems, notes, pass: problems.length === 0 };
}

function anyOf(parts, flags = "i") {
  return new RegExp(parts.join("|"), flags);
}

const STRUCTURES = {
  experiment: new RegExp(`\\bI (?:${["let", "gave", "made", "hired", "asked"].join("|")})\\b`, "i"),
  equation: /[+=]/,
  timebox: new RegExp(`\\bin (?:\\d+|one|a) (?:${["day", "hour", "week", "month"].join("|")})s?\\b`, "i"),
  removed: new RegExp(`^(?:${["stop", "never", "no more", "quit"].join("|")})\\b|\\bwithout\\b`, "i"),
  verdict: anyOf(["worth it", "honest", "i tested", "after \\d+"]),
  // A head-to-head shape is not the review shape above.
  versus: anyOf(["\\bvs\\.?", "\\bversus\\b"]),
  plea: /begging/i,
  swap: new RegExp(`\\bi ${"quit"}\\b|\\b${"quit"}ting\\b|\\bi stopped\\b`, "i"),
};

function structureTest(name) {
  if (!name) return null;
  const test = STRUCTURES[name];
  if (!test) throw new Error(`unknown structure ${name}`);
  return test;
}

function packagingReport(doc) {
  const donorWindow = Number(doc.window_days ?? 90);
  const nicheWindow = Number(doc.niche_window_days ?? 30);
  const shape = structureTest(doc.structure);
  const shaped = (doc.rows || []).filter((row) => !shape || (row.title && shape.test(row.title)));
  const donors = shaped.filter((row) => row.ratio != null && row.age_days != null && row.age_days <= donorWindow && Number(row.ratio) >= 3);
  const channels = new Set(donors.map((row) => row.channel).filter(Boolean));
  const niches = new Set(donors.map((row) => row.niche).filter(Boolean));
  const proven = donors.length >= 3 && channels.size >= 3 && niches.size >= 2;
  const nicheRows = (doc.niche_rows || []).filter((row) => row.ratio != null && row.age_days != null && row.age_days <= nicheWindow);
  const nicheChannels = new Set(nicheRows.map((row) => row.channel).filter(Boolean));
  const nicheMedian = statisticalMedian(nicheRows.map((row) => Number(row.ratio)));
  const worn = nicheChannels.size >= 3 && nicheMedian != null && nicheMedian < 1.5;
  return {
    proven_elsewhere: proven,
    worn_here: worn,
    pass: proven && !worn,
    donor_outliers: donors.length,
    donor_channels: channels.size,
    donor_niches: [...niches],
    niche_channels: nicheChannels.size,
    niche_median_ratio: nicheMedian,
    donor_rows_ignored: (doc.rows || []).length - donors.length,
    structure: doc.structure || null,
    niche_window_days: nicheWindow,
    donor_window_days: donorWindow,
  };
}

function parseArgs(list) {
  const out = { _: [] };
  for (let index = 0; index < list.length; index += 1) {
    const token = list[index];
    if (!token.startsWith("--")) {
      out._.push(token);
      continue;
    }
    const key = token.slice(2);
    const next = list[index + 1];
    if (next == null || next.startsWith("--")) out[key] = true;
    else {
      out[key] = next;
      index += 1;
    }
  }
  return out;
}

function writeOut(dir, name, text) {
  mkdirSync(dir, { recursive: true });
  const full = path.join(dir, name);
  writeFileSync(full, text.endsWith("\n") ? text : `${text}\n`);
  return full;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) fail(`self-check: ${message}`);
}

function samplePeers(channelId, count, ageDays, views, language = "en") {
  return Array.from({ length: count }, (_, index) => ({
    id: `${channelId}-p${index}-${ageDays}`,
    title: `peer ${index}`,
    channel: channelId,
    channel_id: channelId,
    published: new Date(Date.parse("2026-10-22T00:00:00Z") - ageDays * 86400000).toISOString(),
    duration_seconds: 600,
    views,
    live: false,
    language,
  }));
}

function selfCheck() {
  const asOf = "2026-10-22T00:00:00Z";
  const peers = [
    ...samplePeers("c1", 5, 12, 1000),
    ...samplePeers("c1", 5, 40, 100),
  ];
  const spanishPeer = { ...samplePeers("c1", 1, 12, 1000, "es")[0], id: "c1-es" };
  const target = {
    id: "t1",
    title: "lumen stack for shops",
    channel: "North",
    channel_id: "c1",
    published: "2026-10-12T00:00:00Z",
    duration_seconds: 600,
    views: 3000,
    live: false,
    language: "en",
    url: "https://example.com/v",
  };
  const sheet = {
    as_of: asOf,
    fit: "shops",
    days: 30,
    videos: [target, spanishPeer, ...peers, {
      id: "short",
      title: "too short",
      channel: "North",
      channel_id: "c1",
      published: "2026-10-12T00:00:00Z",
      duration: "PT3M",
      views: 99999,
      language: "en",
    }, {
      id: "live1",
      title: "a live room",
      channel: "North",
      channel_id: "c1",
      published: "2026-10-12T00:00:00Z",
      duration_seconds: 3600,
      views: 99999,
      broadcast: "live",
      language: "en",
    }, {
      id: "old",
      title: "old upload",
      channel: "North",
      channel_id: "c1",
      published: "2026-07-01T00:00:00Z",
      duration_seconds: 600,
      views: 5000,
      language: "en",
    }, {
      id: "es-target",
      title: "lumen stack taller",
      channel: "South",
      channel_id: "c2",
      published: "2026-10-12T00:00:00Z",
      duration_seconds: 600,
      views: 8000,
      language: "es",
    }],
    uploads: {
      c1: ["t1", "c1-es", "short", "live1", "old", ...peers.map((peer) => peer.id)],
      c2: ["es-target"],
    },
    searches: [{ query: "lumen stack", branch: "lumen", ids: ["t1"] }],
  };
  const ranked = rankSheet(sheet);
  const row = ranked.rows.find((item) => item.id === "t1");
  assert(row, "target ranked");
  assert(row.age_band_n >= 5, "spanish peer counts in the baseline");
  assert(row.age_band_ratio === 3, `expected age-band ratio 3, got ${row.age_band_ratio}`);
  assert(row.views_per_day === 300, "views per day");
  assert(row.fit_title === true, "fit flag");
  assert(!ranked.rows.some((item) => item.id === "short"), "under 4 minutes stays out");
  assert(!ranked.rows.some((item) => item.id === "live1"), "live stays out");
  assert(!ranked.rows.some((item) => item.id === "old"), "older than 90 days stays out of candidates");
  assert(!ranked.rows.some((item) => item.id === "es-target"), "non-english candidate stays out");
  assert(row.discovery === "search", "search discovery");
  assert(bandOf(3) === "2 to 5" && bandOf(10) === "over 10" && bandOf(1.5) === "under 2", "bands");

  const thin = rankSheet({
    as_of: asOf,
    videos: [{
      id: "thin",
      title: "thin baseline",
      channel: "North",
      channel_id: "c9",
      published: "2026-10-12T00:00:00Z",
      duration_seconds: 600,
      views: 100,
      language: "",
    }, ...samplePeers("c9", 4, 12, 50)],
    uploads: { c9: ["thin", ...samplePeers("c9", 4, 12, 50).map((peer) => peer.id)] },
    searches: [],
  });
  const thinRow = thin.rows.find((item) => item.id === "thin");
  assert(thinRow.language_unchecked === true, "blank language flagged");
  assert(thinRow.age_band_ratio == null && thinRow.recent_ratio == null, "under 5 peers leaves both ratios blank");

  const clock = durationOf({ duration: "PT4M" });
  assert(clock === 240, "PT4M is 240 seconds");
  assert(parseClock("PT3M59S") === 239, "clock parser");

  const other = {
    id: "t2",
    title: "lumen stack daily",
    channel: "West",
    channel_id: "c3",
    published: "2026-10-11T00:00:00Z",
    duration_seconds: 700,
    views: 5000,
    language: "en",
  };
  const c3peers = samplePeers("c3", 5, 14, 1000);
  const deepSheet = {
    ...sheet,
    videos: [...sheet.videos, other, ...c3peers],
    uploads: { ...sheet.uploads, c3: ["t2", ...c3peers.map((peer) => peer.id)] },
    searches: [
      { query: "lumen stack", branch: "lumen", ids: ["t1", "t2"], depth: 0 },
      { query: "lumen stack", branch: "lumen", ids: ["t1", "t2"], depth: 1, parent_query: "lumen stack" },
    ],
    probes: [{ query: "lumen stack shops", phrase: "lumen stack", anchor: "shops", ids: ["t1", "t2"] }],
  };
  const depth = depthReport(deepSheet);
  assert(depth.nodes[0].outliers === 2, "two outliers on the seed");
  assert(depth.nodes[0].saturated === false, "first search is not saturated");
  assert(depth.nodes[1].new_outlier_channels === 0, "repeat search adds no channel");
  assert(depth.nodes[1].saturated === true, "repeat search saturates");
  assert(depth.hot.some((entry) => entry.channels >= 2), "heat sees a 2-channel phrase");
  assert(!depth.hot.some((entry) => entry.phrase === "lumen stack"), "a longer core folds into the earlier phrase");
  assert(depth.probes[0].niche_matches === 1, "probe keeps the niche title");
  assert(phrasesIn("only 2.5", GENERIC).size === 0, "a lone version number is not a phrase");
  assert(phrasesIn("seedance 2.5 arrives", GENERIC).has("seedance 2.5"), "version number survives inside a pair");
  assert(upperMiddle([1, 2, 3, 4]) === 3, "node median is the upper middle");
  assert(statisticalMedian([1, 2, 3, 4]) === 2.5, "peer median averages the middle pair");

  const card = scoreCard({ heat: 2, gap: 2, fit: 2, timing: 2, receipt: 0 });
  assert(card.pass && card.total === 8, "receipt 0 can still pass");
  const closed = scoreCard({ heat: 2, gap: 0, fit: 2, timing: 2, receipt: 2 });
  assert(!closed.pass, "gap 0 fails");
  const dead = scoreCard({ heat: 0, gap: 2, fit: 2, timing: 2, receipt: 2 });
  assert(!dead.pass && dead.reasons.some((reason) => reason.includes("dead wave")), "dead wave warned");

  const pack = packagingReport({
    rows: [
      { niche: "finance", channel: "a", ratio: 4, age_days: 10 },
      { niche: "finance", channel: "b", ratio: 3, age_days: 20 },
      { niche: "fitness", channel: "c", ratio: 6, age_days: 30 },
      { niche: "fitness", channel: "d", ratio: 2, age_days: 10 },
    ],
    niche_rows: [
      { channel: "n1", ratio: 1.2, age_days: 5 },
      { channel: "n2", ratio: 1.1, age_days: 8 },
      { channel: "n3", ratio: 1.0, age_days: 12 },
    ],
  });
  assert(pack.proven_elsewhere && pack.worn_here && !pack.pass, "worn structure does not pass");
  const fresh = packagingReport({
    rows: packPassRows(),
    niche_rows: [{ channel: "n1", ratio: 4, age_days: 3 }],
  });
  assert(fresh.pass, "proven and not worn");

  const opening = evaluateOpening(buildOpening());
  assert(opening.pass, `opening should pass: ${opening.problems.join("; ")}`);
  assert(opening.spoken_total === 160, "160 spoken words");
  const shortLine = evaluateOpening(buildOpening().replace("word ".repeat(15).trim(), "hi there friend today"));
  assert(!shortLine.pass, "bad confirm fails");
  assert(structureTest("versus").test("alpha vs beta"), "versus shape");
  assert(structureTest("timebox").test("shipped in 7 days"), "timebox shape");
  assert(structureTest("experiment").test("I let a tool run it"), "experiment shape");
  assert(!structureTest("plea").test("please consider this"), "plea stays narrow");
  const shaped = packagingReport({
    structure: "versus",
    rows: [
      { title: "alpha vs beta", niche: "finance", channel: "a", ratio: 4, age_days: 4 },
      { title: "gamma versus delta", niche: "labs", channel: "b", ratio: 5, age_days: 4 },
      { title: "no shape here", niche: "labs", channel: "c", ratio: 9, age_days: 4 },
      { title: "tape vs disk", niche: "health", channel: "d", ratio: 3, age_days: 4 },
    ],
    niche_rows: [],
  });
  assert(shaped.donor_outliers === 3 && shaped.pass, "structure filter drops the unmatched title");
  console.log("self-check ok");
}

function packPassRows() {
  return [
    { niche: "finance", channel: "a", ratio: 4, age_days: 10 },
    { niche: "labs", channel: "b", ratio: 5, age_days: 11 },
    { niche: "labs", channel: "c", ratio: 3.5, age_days: 12 },
  ];
}

function buildOpening() {
  const line = (n) => Array.from({ length: n }, () => "word").join(" ");
  return [
    "TITLE: example",
    "[0:00 Confirm | screen: object]",
    line(15),
    line(15),
    line(15),
    "[0:05 Stakes | screen: logo]",
    `${line(29)} cut`,
    "[0:15 Receipt | screen: number]",
    line(25),
    "[0:25 Loop | screen: map]",
    line(50),
    "[0:45 Payoff | screen: step]",
    line(40),
  ].join("\n");
}

function main() {
  const argv = parseArgs(process.argv.slice(2));
  const command = argv._[0];
  if (command === "self-check") {
    selfCheck();
    return;
  }
  if (command === "card") {
    console.log(JSON.stringify(scoreCard({
      heat: argv.heat,
      gap: argv.gap,
      fit: argv.fit,
      timing: argv.timing,
      receipt: argv.receipt,
    }), null, 2));
    return;
  }
  if (command === "opening") {
    if (!argv.file) fail("opening needs --file");
    console.log(JSON.stringify(evaluateOpening(readFileSync(argv.file, "utf8")), null, 2));
    return;
  }
  if (command === "packaging") {
    if (!argv.donors) fail("packaging needs --donors");
    console.log(JSON.stringify(packagingReport(readJson(argv.donors)), null, 2));
    return;
  }
  if (command !== "rank" && command !== "depth") fail("use rank, depth, card, opening, packaging, or self-check");
  if (!argv.sheet) fail(`${command} needs --sheet`);
  const sheet = readJson(argv.sheet);
  if (command === "rank") {
    const ranked = rankSheet(sheet, { keep: argv.keep, fit: argv.fit });
    const body = JSON.stringify({ as_of: ranked.as_of, keep: ranked.keep, rows: ranked.rows.map(decorate) }, null, 2);
    if (argv.out) console.log(writeOut(argv.out, "ranked.json", body));
    else console.log(body);
    return;
  }
  const report = depthReport(sheet, {
    fit: argv.fit,
    keep: argv.keep,
    days: argv.days,
    outlier: argv.outlier,
    breadth: argv.breadth,
    maxDepth: argv["max-depth"],
  });
  if (argv.out) {
    const rankedPath = writeOut(argv.out, "ranked.json", JSON.stringify({ as_of: report.ranked.as_of, rows: report.ranked.rows.map(decorate) }, null, 2));
    const depthPath = writeOut(argv.out, "depth.md", report.markdown);
    console.log(JSON.stringify({ ranked: rankedPath, depth: depthPath, next: report.next }, null, 2));
    return;
  }
  console.log(report.markdown);
}

function decorate(row) {
  return { ...row, band: bandOf(paceRatio(row)), used_ratio: paceRatio(row) };
}

main();
