/**
 * Structural checks for a station map described as JSON.
 * Importing this module draws nothing and writes nothing.
 *
 * estimateTextBox is a draft width for a layout pass. Measure glyphs on the page.
 */
import { readFileSync } from "node:fs";
// local
import path from "node:path";
// local
import { pathToFileURL } from "node:url";

export const MARKS = Object.freeze([
  "file",
  "person",
  "company",
  "note",
  "calendar",
  "message",
  "check",
  "split",
]);

export const COLOR_ROLES = Object.freeze([
  "bg",
  "fg",
  "muted",
  "accent",
  "line",
  "surface",
]);

export const COMPOSITIONS = Object.freeze([
  "overview",
  "taxonomy",
  "funnel",
  "breakdown",
]);

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]);
const REACTION_STATIONS = ["capture", "company-fit", "person-fit", "route", "draft", "review", "send"];

export function estimateTextBox(value, size = 18) {
  const lines = String(value ?? "").split("\n");
  const widest = lines.reduce((max, line) => Math.max(max, [...line].length), 0);
  return {
    w: Math.ceil(widest * size * 0.62),
    h: Math.ceil(Math.max(lines.length, 1) * size * 1.35),
    estimate: true,
  };
}

function fail(faults, code, where, detail) {
  faults.push({ code, where: where || "", detail });
}

function asBox(node) {
  const x = Number(node.x);
  const y = Number(node.y);
  const w = Number(node.w);
  const h = Number(node.h);
  if (![x, y, w, h].every(Number.isFinite) || w <= 0 || h <= 0) return null;
  return { x, y, w, h };
}

function pointInRect(x, y, rect, eps = 0.75) {
  return x > rect.x + eps && x < rect.x + rect.w - eps && y > rect.y + eps && y < rect.y + rect.h - eps;
}

function orient(ax, ay, bx, by, cx, cy) {
  const v = (by - ay) * (cx - bx) - (bx - ax) * (cy - by);
  if (Math.abs(v) < 1e-6) return 0;
  return v > 0 ? 1 : -1;
}

function rangeOverlap(a1, a2, b1, b2) {
  const lo = Math.max(Math.min(a1, a2), Math.min(b1, b2));
  const hi = Math.min(Math.max(a1, a2), Math.max(b1, b2));
  return hi - lo > 0.5;
}

function samePoint(a, b) {
  return Math.abs(a[0] - b[0]) < 0.5 && Math.abs(a[1] - b[1]) < 0.5;
}

function onSpan(a, b, c) {
  return (
    c[0] >= Math.min(a[0], b[0]) - 1e-6 &&
    c[0] <= Math.max(a[0], b[0]) + 1e-6 &&
    c[1] >= Math.min(a[1], b[1]) - 1e-6 &&
    c[1] <= Math.max(a[1], b[1]) + 1e-6 &&
    !samePoint(c, a) &&
    !samePoint(c, b)
  );
}

function segmentsCross(a, b) {
  const [p, q] = a;
  const [r, s] = b;
  const o1 = orient(p[0], p[1], q[0], q[1], r[0], r[1]);
  const o2 = orient(p[0], p[1], q[0], q[1], s[0], s[1]);
  const o3 = orient(r[0], r[1], s[0], s[1], p[0], p[1]);
  const o4 = orient(r[0], r[1], s[0], s[1], q[0], q[1]);
  if (o1 === 0 && o2 === 0 && o3 === 0 && o4 === 0) {
    const horizontal = Math.abs(q[0] - p[0]) >= Math.abs(q[1] - p[1]);
    return horizontal ? rangeOverlap(p[0], q[0], r[0], s[0]) : rangeOverlap(p[1], q[1], r[1], s[1]);
  }
  if (o1 === 0 && onSpan(p, q, r)) return true;
  if (o2 === 0 && onSpan(p, q, s)) return true;
  if (o3 === 0 && onSpan(r, s, p)) return true;
  if (o4 === 0 && onSpan(r, s, q)) return true;
  if (o1 === 0 || o2 === 0 || o3 === 0 || o4 === 0) return false;
  return o1 !== o2 && o3 !== o4;
}

function segmentEntersRect(p, q, rect) {
  if (pointInRect(p[0], p[1], rect) || pointInRect(q[0], q[1], rect)) return true;
  let t0 = 0;
  let t1 = 1;
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const packs = [
    [-dx, p[0] - rect.x],
    [dx, rect.x + rect.w - p[0]],
    [-dy, p[1] - rect.y],
    [dy, rect.y + rect.h - p[1]],
  ];
  for (const [pi, qi] of packs) {
    if (Math.abs(pi) < 1e-9) {
      if (qi < 0) return false;
      continue;
    }
    const r = qi / pi;
    if (pi < 0) {
      if (r > t1) return false;
      if (r > t0) t0 = r;
    } else {
      if (r < t0) return false;
      if (r < t1) t1 = r;
    }
  }
  if (t0 > t1) return false;
  const mid = (Math.max(t0, 0) + Math.min(t1, 1)) / 2;
  if (!(mid > 0 && mid < 1)) return false;
  return pointInRect(p[0] + dx * mid, p[1] + dy * mid, rect);
}

function boundaryDistance(x, y, rect) {
  const left = rect.x;
  const right = rect.x + rect.w;
  const top = rect.y;
  const bottom = rect.y + rect.h;
  const dx = Math.max(left - x, 0, x - right);
  const dy = Math.max(top - y, 0, y - bottom);
  if (dx > 0 || dy > 0) return Math.hypot(dx, dy);
  return Math.min(x - left, right - x, y - top, bottom - y);
}

function pair(points, index) {
  const p = points[index];
  const q = points[index + 1];
  if (!p || !q || p.length < 2 || q.length < 2) return null;
  return [
    [Number(p[0]), Number(p[1])],
    [Number(q[0]), Number(q[1])],
  ];
}

function saysBuyFromReaction(text) {
  const value = String(text || "");
  const reaction = /\b(like|liked|likes|react|reacted|reaction|reactions)\b/i;
  const buy = /\b(buy|buys|buying|purchase|purchased|sale|sold|intent)\b/i;
  return reaction.test(value) && buy.test(value);
}

function checkTextFit(node, box, faults) {
  const fields = [
    ["title", node.role === "result" && node.display === "large" ? 64 : 26],
    ["input", 18],
    ["work", 18],
    ["output", 18],
    ["job", 18],
    ["question", 18],
  ];
  let stack = 32;
  for (const [key, size] of fields) {
    if (node[key] == null || node[key] === "") continue;
    const draft = estimateTextBox(node[key], size);
    stack += draft.h;
    if (draft.w > box.w) {
      fail(faults, "text-fit", node.id, `${key} is wider than the card. Wrap it or enlarge the card.`);
    }
  }
  if (stack > box.h) {
    fail(faults, "text-fit", node.id, "The rows are taller than the card. Add a line break room by enlarging it.");
  }
}

function checkIcon(node, options, faults) {
  if (node.icon == null) return;
  const icon = node.icon;
  if (!icon || typeof icon !== "object") {
    fail(faults, "icon", node.id, "Name a CSS mark or an allowed asset file.");
    return;
  }
  if (icon.type === "mark") {
    if (!MARKS.includes(icon.name)) {
      fail(faults, "icon", node.id, `Unknown mark ${icon.name || ""}.`);
    }
    return;
  }
  if (icon.type === "asset") {
    const file = String(icon.file || "");
    if (!file || file.includes("/") || file.includes("\\")) {
      fail(faults, "icon", node.id, "An asset icon is a filename from the asset list.");
      return;
    }
    const allowed = options.allowedAssets;
    if (!Array.isArray(allowed) || !allowed.includes(file)) {
      fail(faults, "icon", node.id, "That file is not in the asset allow list.");
    }
    return;
  }
  fail(faults, "icon", node.id, "Icon type is mark or asset.");
}

function checkImage(node, faults) {
  if (node.image == null) return;
  const image = node.image;
  const file = String(image.file || "");
  const ext = path.extname(file).toLowerCase();
  const mime = image.mime ? String(image.mime) : "";
  if (!IMAGE_EXT.has(ext) || (mime && !mime.startsWith("image/"))) {
    fail(faults, "image", node.id, "The placed file has to be an image.");
    return;
  }
  const w = Number(image.w);
  const h = Number(image.h);
  const nw = Number(image.naturalW);
  const nh = Number(image.naturalH);
  if (![w, h, nw, nh].every((n) => Number.isFinite(n) && n > 0)) {
    fail(faults, "image", node.id, "Pass the placed size and the file's own pixel size.");
    return;
  }
  const placed = w / h;
  const natural = nw / nh;
  if (Math.abs(placed - natural) / natural > 0.02) {
    fail(faults, "image", node.id, "Keep the image's own aspect.");
  }
}

export function checkMap(map, options = {}) {
  const faults = [];
  const gap = Number.isFinite(options.gap) ? options.gap : 12;
  if (!map || typeof map !== "object" || Array.isArray(map)) {
    fail(faults, "map", "", "A map is one object. Loading this module does not draw it.");
    return { ok: false, faults };
  }

  if (!COMPOSITIONS.includes(map.composition)) {
    fail(faults, "composition", map.id, "Composition is overview, taxonomy, funnel, or breakdown.");
  }
  if (map.composition === "taxonomy" && map.ordered !== false) {
    fail(faults, "composition", map.id, "A taxonomy sets ordered to false.");
  }
  if (map.composition === "funnel" && map.narrows !== true) {
    fail(faults, "composition", map.id, "A funnel sets narrows to true.");
  }
  if (map.columns != null && Number(map.columns) >= 2 && typeof map.parallel !== "boolean") {
    fail(faults, "columns", map.id, "Say whether columns run together. Side by side is only layout.");
  }
  if (map.colors != null) {
    if (typeof map.colors !== "object" || Array.isArray(map.colors)) {
      fail(faults, "theme-role", map.id, "Colors are a set of known roles.");
    } else {
      for (const key of Object.keys(map.colors)) {
        if (!COLOR_ROLES.includes(key)) fail(faults, "theme-role", map.id, `Unknown color role ${key}.`);
        else if (!String(map.colors[key] || "").trim()) {
          fail(faults, "theme-role", map.id, `Color role ${key} is empty.`);
        }
      }
    }
  }
  if (map.sharedPage === true) {
    const prefix = String(map.prefix || "");
    if (!prefix) fail(faults, "prefix", map.id, "A shared page needs a prefix on every id.");
  }

  const nodes = new Map();
  if (!Array.isArray(map.nodes) || map.nodes.length === 0) {
    fail(faults, "map", map.id, "The map needs its cards.");
    return { ok: false, faults };
  }
  for (const node of map.nodes) {
    if (!node || !node.id || nodes.has(node.id)) {
      fail(faults, "map", node && node.id, "Each card id appears once.");
      continue;
    }
    nodes.set(node.id, node);
    if (map.sharedPage === true && map.prefix && !String(node.id).startsWith(`${map.prefix}-`)) {
      fail(faults, "prefix", node.id, "Prefix this id.");
    }
    const box = asBox(node);
    if (!box) fail(faults, "binding", node.id, "Give the card a box so ends can be computed.");
    else checkTextFit(node, box, faults);
    checkIcon(node, options, faults);
    checkImage(node, faults);

    if (node.role === "source") {
      if (node.quiet !== true || node.actionHeader || node.input || node.work || node.output) {
        fail(faults, "quiet-source", node.id, "A source is a quiet card, without an action header.");
      }
    } else if (node.role === "step") {
      const rows = [node.input, node.work, node.output].map((row) => String(row || "").trim());
      const distinct = new Set(rows).size === 3 && rows.every(Boolean);
      if (node.shape !== "square" || node.band !== "light" || !distinct) {
        fail(faults, "step-contract", node.id, "A step is a square card with input, work, and a distinct output.");
      }
      if (node.step != null && node.index !== String(node.step).padStart(2, "0")) {
        fail(faults, "step-contract", node.id, "The band shows the step number as two digits.");
      }
    } else if (node.role === "skill") {
      if (node.shape !== "rounded" || node.band !== "contrast" || !String(node.job || "").trim()) {
        fail(faults, "skill-contract", node.id, "A skill is a rounded card for judgment.");
      }
      if (node.classifiedBy === "name") {
        fail(faults, "skill-contract", node.id, "Classify the skill by the judgment, not by the title.");
      }
    } else if (node.role === "decision") {
      const question = String(node.question || "");
      const words = question.trim().split(/\s+/).filter(Boolean);
      const exits = Array.isArray(node.exits) ? node.exits : [];
      if (!question.includes("?") || words.length > 12 || exits.length < 2) {
        fail(faults, "decision", node.id, "A decision is a short question with labeled exits.");
      }
      const labels = exits.map((exit) => String(exit.label || "").trim().toLowerCase());
      if (labels.some((label) => !label) || new Set(labels).size !== labels.length) {
        fail(faults, "decision", node.id, "Label each exit, and keep the labels distinct.");
      }
      if (!labels.some((label) => label === "hold" || label === "retry")) {
        fail(faults, "decision", node.id, "Include an explicit hold or retry.");
      }
      for (const exit of exits) {
        if (!nodes.has(exit.to) && !map.nodes.some((candidate) => candidate.id === exit.to)) {
          fail(faults, "decision", node.id, "Each exit lands on a card.");
        }
        if (String(exit.label || "").trim().toLowerCase() === "retry") {
          const target = map.nodes.find((candidate) => candidate.id === exit.to);
          if (!target || (target.role !== "step" && target.role !== "skill")) {
            fail(faults, "decision", node.id, "A retry returns to the station that repeats.");
          }
        }
      }
      if (saysBuyFromReaction(question) || exits.some((exit) => saysBuyFromReaction(exit.label))) {
        fail(faults, "reaction-intent", node.id, "Do not draw a diamond that says they will buy because they reacted.");
      }
    } else if (node.role === "result") {
      if (node.value != null) {
        if (!String(node.unit || "").trim() || !String(node.population || "").trim() || !String(node.date || "").trim() || node.display !== "large") {
          fail(faults, "result-evidence", node.id, "A numeric result uses large type with unit, population, and date.");
        }
      }
    } else {
      fail(faults, "role", node.id, "Role is source, step, skill, decision, or result.");
    }

    if (node.proposed === true && node.tag !== "proposed") {
      fail(faults, "snapshot", node.id, "Mark a proposed station.");
    }
    if (node.snapshot === true && !String(node.date || "").trim()) {
      fail(faults, "snapshot", node.id, "Date a snapshot.");
    }
  }

  if (map.composition === "breakdown" && ![...nodes.values()].some((node) => node.role === "result" && node.value != null)) {
    fail(faults, "result-evidence", map.id, "A breakdown shows an evidenced number.");
  }
  if (map.subject === "reactions") {
    const have = new Set([...nodes.values()].map((node) => node.station));
    for (const station of REACTION_STATIONS) {
      if (!have.has(station)) fail(faults, "station", map.id, `The reaction map includes ${station}.`);
    }
  }

  const order = Array.isArray(map.readingOrder) ? map.readingOrder : [];
  if (order.length !== nodes.size || new Set(order).size !== nodes.size || order.some((id) => !nodes.has(id))) {
    fail(faults, "order", map.id, "State a reading order that names each card once.");
  }

  const groups = Array.isArray(map.groups) ? map.groups : [];
  const grouped = new Map();
  for (const group of groups) {
    if (!group || (group.mode !== "align" && group.mode !== "container")) {
      fail(faults, "group", group && group.id, "Grouping is alignment or a light container.");
      continue;
    }
    const members = Array.isArray(group.nodeIds) ? group.nodeIds : [];
    if (group.mode === "align") {
      const marks = members.map((id) => nodes.get(id) && nodes.get(id).align);
      if (marks.some((mark) => !mark) || new Set(marks).size !== 1) {
        fail(faults, "group", group.id, "Aligned cards share one edge mark.");
      }
    }
    if (group.mode === "container" && group.light !== true) {
      fail(faults, "group", group.id, "A container is a light outline.");
    }
    for (const id of members) grouped.set(id, group.id);
  }
  for (const node of nodes.values()) {
    if (node.cluster && grouped.get(node.id) !== node.cluster) {
      fail(faults, "group", node.id, "A clustered card is listed in that group.");
    }
  }

  const edges = Array.isArray(map.edges) ? map.edges : [];
  if (map.composition !== "taxonomy" && edges.length === 0) {
    fail(faults, "edge", map.id, "Draw the dependencies.");
  }
  const edgeIds = new Set();
  const normalized = [];
  for (const edge of edges) {
    if (!edge || !edge.id || edgeIds.has(edge.id)) {
      fail(faults, "edge", edge && edge.id, "Each connector id appears once.");
      continue;
    }
    edgeIds.add(edge.id);
    if (map.sharedPage === true && map.prefix && !String(edge.id).startsWith(`${map.prefix}-`)) {
      fail(faults, "prefix", edge.id, "Prefix this connector id.");
    }
    const from = nodes.get(edge.from);
    const to = nodes.get(edge.to);
    if (!from || !to) {
      fail(faults, "edge", edge.id, "A connector meets two cards.");
      continue;
    }
    const points = Array.isArray(edge.points) ? edge.points : [];
    if (points.length < 2) {
      fail(faults, "binding", edge.id, "Compute the connector from the card boxes.");
      continue;
    }
    const fromBox = asBox(from);
    const toBox = asBox(to);
    const first = points[0];
    const last = points[points.length - 1];
    if (fromBox && boundaryDistance(Number(first[0]), Number(first[1]), fromBox) > gap) {
      fail(faults, "binding", edge.id, "The start sits on the source card's current box.");
    }
    if (toBox && boundaryDistance(Number(last[0]), Number(last[1]), toBox) > gap) {
      fail(faults, "binding", edge.id, "The end sits on the destination card's current box.");
    }
    for (let at = 0; at < points.length - 1; at++) {
      const seg = pair(points, at);
      if (!seg || seg.some((pt) => pt.some((n) => !Number.isFinite(n)))) {
        fail(faults, "binding", edge.id, "Connector points are pairs of numbers.");
        continue;
      }
      normalized.push({ id: edge.id, seg });
      for (const node of nodes.values()) {
        const box = asBox(node);
        if (!box) continue;
        if (segmentEntersRect(seg[0], seg[1], box)) {
          fail(faults, "through-card", edge.id, `The line crosses ${node.id}.`);
        }
      }
    }
    const upward = Number(last[1]) + 40 < Number(first[1]);
    if (edge.return === true || edge.kind === "return" || upward) {
      const main = [...nodes.values()].filter((node) => node.side !== true).map(asBox).filter(Boolean);
      if (main.length) {
        const minX = Math.min(...main.map((box) => box.x));
        const maxX = Math.max(...main.map((box) => box.x + box.w));
        const outside = points.some((pt) => Number(pt[0]) < minX - 24 || Number(pt[0]) > maxX + 24);
        if (!outside) fail(faults, "return-route", edge.id, "A long return runs outside the main column.");
      }
    }
    if (edge.feedback === true) {
      if (from.role === "result" && to.role === "source") {
        fail(faults, "feedback", edge.id, "A result does not rewrite a raw source card.");
      } else if (to.role !== "step" && to.role !== "skill") {
        fail(faults, "feedback", edge.id, "Feedback ends on the station that changes.");
      }
    }
  }

  for (const node of nodes.values()) {
    if (node.role !== "decision" || !Array.isArray(node.exits)) continue;
    const outgoing = edges.filter((edge) => edge.from === node.id).map((edge) => edge.to);
    for (const exit of node.exits) {
      if (!outgoing.includes(exit.to)) {
        fail(faults, "decision", node.id, "Each labeled exit has a connector.");
      }
    }
  }

  for (let i = 0; i < normalized.length; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      if (normalized[i].id === normalized[j].id) continue;
      if (segmentsCross(normalized[i].seg, normalized[j].seg)) {
        fail(faults, "cross", `${normalized[i].id}/${normalized[j].id}`, "Connectors do not cross.");
      }
    }
  }

  return { ok: faults.length === 0, faults };
}

function directRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === pathToFileURL(path.resolve(entry)).href;
}

if (directRun()) {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node skills/draw-process-map/scripts/map-check.mjs <map.json> [asset-names.txt]");
    process.exit(2);
  }
  const map = JSON.parse(readFileSync(file, "utf8"));
  const allowPath = process.argv[3];
  const allowedAssets = allowPath
    ? readFileSync(allowPath, "utf8")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
    : [];
  const result = checkMap(map, { allowedAssets });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exit(result.ok ? 0 : 1);
}
