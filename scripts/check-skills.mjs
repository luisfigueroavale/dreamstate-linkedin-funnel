import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
// local
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const strict = process.argv.includes("--strict");

const VISUAL = [
  "design-post-graphic", "review-graphic", "draw-process-map", "build-scene-graphic",
  "animate-process", "design-video-thumbnail", "add-short-overlay",
];

const QUESTIONS = [
  "Would a customer recommend them by name tomorrow?",
  "Are they the reason the company sells, and does that not scale?",
  "Would they rather build their own distribution than hand it to a ghostwriter or agency?",
];

function referencedScripts(text) {
  const found = new Set();
  for (const match of text.matchAll(/`((?:skills\/[a-z0-9-]+\/)?scripts\/[^`\s]+\.(?:mjs|js|py))(?![a-z0-9])/g)) {
    found.add(match[1].replace(/^\.\//, ""));
  }
  for (const match of text.matchAll(/\bskills\/[a-z0-9-]+\/scripts\/[A-Za-z0-9_./-]+\.(?:mjs|js|py)(?![a-z0-9])/g)) {
    found.add(match[0]);
  }
  return found;
}

function matchesTerm(text, term) {
  const escaped = term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`).test(text);
}

function bannedTerms() {
  const file = path.join(root, ".banned-terms.local");
  if (!existsSync(file)) return null;
  return readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "export") continue;
    const full = path.join(dir, name);
    const info = statSync(full);
    if (info.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

let failed = 0;
function bad(message) {
  failed += 1;
  console.error(message);
}

const skillRoot = path.join(root, "skills");
const folders = readdirSync(skillRoot).filter((name) => statSync(path.join(skillRoot, name)).isDirectory());
if (folders.length !== 50) bad(`expected 50 skills, found ${folders.length}`);

const framePath = path.join(root, "docs/skill-frame.md");
const frame = readFileSync(framePath, "utf8");
for (const needle of ["audience/AGENTS.md", "brand/AGENTS.md", "brand/taste.md", "required unknown", "queue-rules.json", "no em dash"]) {
  if (!frame.includes(needle)) bad(`docs/skill-frame.md is missing ${needle}`);
}

const WRITING = [
  "adapt-essay-for-linkedin",
  "choose-next-video",
  "draft-linkedin-comments",
  "draft-thread-reply",
  "draft-warm-followups",
  "draft-x-replies",
  "find-x-angles",
  "make-lead-magnet",
  "plan-content-week",
  "plan-x-week",
  "score-post-engagers",
  "send-lead-magnet",
  "split-long-source",
  "write-linkedin-post",
  "write-long-essay",
  "write-newsletter-issue",
  "write-opening-lines",
  "write-video-description",
  "write-video-script",
  "write-video-titles",
  "write-x-article",
  "write-x-post",
];

export function stepLines(text) {
  const section = text.match(/^## Steps\s*\n([\s\S]*?)(?=^## )/m);
  if (!section) return [];
  return section[1].split("\n").map((line) => line.trim()).filter((line) => /^\d+\.\s/.test(line));
}

export function neverCallIds(text) {
  const line = text.match(/^Never call:\s*(.+)$/m);
  if (!line) return [];
  return [...line[1].matchAll(/`([^`]+)`/g)].map((match) => match[1]);
}

export function mentionsId(sentence, id) {
  const escaped = String(id).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp("`?" + escaped + "`?(?!\\.[A-Za-z0-9_])(?![A-Za-z0-9_])").test(sentence);
}

export function neverStepErrors(stepLine, ids) {
  const body = String(stepLine).replace(/^\d+\.\s*/, "");
  const sentences = body.split(/(?<=[.!?])\s+(?=[A-Z])/);
  const errors = [];
  for (const sentence of sentences) {
    if (/^(Do not|Never)\b/.test(sentence)) continue;
    for (const id of ids) {
      if (mentionsId(sentence, id)) errors.push(`${id} is on the Never call line`);
    }
  }
  return errors;
}

export function stepShapeErrors(stepLine) {
  const errors = [];
  const line = String(stepLine).trim();
  const body = line.replace(/^\d+\.\s*/, "").trim();
  const words = body.split(/\s+/).filter(Boolean);
  if (words.length < 5) errors.push("step has fewer than 5 words");
  if (/^\d+\. \w+ with `/.test(line)) errors.push("step is a verb-with fragment");
  return errors;
}

export function conditionClauses(stepText) {
  const body = String(stepText)
    .replace(/^\d+\.\s*/, "")
    .replace(/\(`references\/[^`]+`\)/g, " ");
  const clauses = [];
  for (const sentence of body.split(/(?<=[.!?])\s+/)) {
    const pattern = /\b(?:after owner yes|at least|only|when|if)\b/gi;
    let match;
    while ((match = pattern.exec(sentence))) {
      const clause = sentence.slice(match.index).replace(/\s+/g, " ").trim().replace(/[.,;:]+$/, "");
      if (clause) clauses.push(clause);
    }
  }
  return clauses;
}

export function clauseMissing(clause, haystack) {
  const norm = (value) => String(value).replace(/\s+/g, " ").trim().toLowerCase();
  return !norm(haystack).includes(norm(clause));
}

for (const name of folders) {
  const file = path.join(skillRoot, name, "SKILL.md");
  const text = readFileSync(file, "utf8");
  const match = text.match(/^name:\s*(\S+)\s*$/m);
  if (!match || match[1] !== name) bad(`${name}: frontmatter name mismatch`);
  if (!text.includes("docs/skill-frame.md")) bad(`${name}: missing docs/skill-frame.md`);
  for (const rel of referencedScripts(text)) {
    if (!existsSync(path.join(root, rel))) bad(`${name}: missing script ${rel}`);
  }
  if (VISUAL.includes(name) && !text.includes("DeskTimeline") && !text.includes("__seek")) {
    bad(`${name}: motion is not the JavaScript timeline`);
  }
  if ((name === "score-post-engagers" || name === "draft-warm-followups") && !/required unknown/i.test(text)) {
    bad(`${name}: qualifying test is missing`);
  }
  if (WRITING.includes(name) && !text.includes("Follow the skill-frame writing rules.")) {
    bad(`${name}: missing the skill-frame writing rules`);
  }
  const bannedIds = neverCallIds(text);
  for (const line of stepLines(text)) {
    for (const message of stepShapeErrors(line)) bad(`${name}: ${message}: ${line}`);
    for (const message of neverStepErrors(line, bannedIds)) bad(`${name}: ${message}: ${line}`);
  }
}

const emDash = "\u2014";
const emDashSeen = new Set();
function flagEmDash(rel) {
  if (!rel || emDashSeen.has(rel) || rel === "scripts/queue-lint.mjs") return;
  emDashSeen.add(rel);
  const full = path.join(root, rel);
  if (!existsSync(full)) return;
  if (readFileSync(full, "utf8").includes(emDash)) bad(`${rel} contains an em dash`);
}
const tracked = execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean);
for (const rel of tracked) {
  if (rel.endsWith(".md")) flagEmDash(rel);
  if (!rel.startsWith("skills/") && /\.(mjs|html|json)$/.test(rel)) flagEmDash(rel);
}
for (const file of walk(root)) {
  const rel = path.relative(root, file);
  const skillText = rel.startsWith(`skills${path.sep}`) && /\.(md|html|json|txt)$/.test(file);
  const fixture = rel.startsWith(`scripts${path.sep}fixtures${path.sep}`);
  if (skillText || fixture) flagEmDash(rel);
}

export const DOOR_FREE = new Set([
  "whoami", "runs_get", "runs_events", "runs_list", "runs_cancel", "tools_search",
  "packs_list", "packs_get", "packs_route", "skills_list", "skills_get",
]);
const EXTRA_FREE = new Set([
  "social.visuals.download_url",
  "social.visuals.file_get",
  "tables.profile_watcher.get",
  "social.content.article_deliveries_list",
]);
const PAID_RUN = new Set(["tables.columns.run", "tables.table_sources.run"]);
const ACTION_TOKEN = new Set(["send", "publish", "enroll", "schedule", "approve", "delete"]);
const MODE_WORD = new Set(["read", "live", "dry_run", "smoke_test", "preview", "write", "quote"]);

function idTokens(id) {
  return String(id).toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}
function hasAction(id) {
  return idTokens(id).some((token) => ACTION_TOKEN.has(token));
}
function yesText(use) {
  return /owner'?s?\s+yes|needs\s+(?:its\s+own\s+|a\s+)?yes|after\s+yes|door-level approval|needs `approved:\s*true`|live needs `approved:\s*true`|live posts only with|always owner yes/i.test(use);
}
function paidText(use) {
  return /\bpaid\b/i.test(use) || /\b[1-9]\d*\s+credits?\b/.test(use);
}
export function useBody(use) {
  return String(use || "").replace(/^(?:plugin|catalog|to-check)(?:\s*,\s*(?:plugin|catalog|to-check))*\s+/i, "");
}
export function isFreeRead(id, use) {
  const text = String(use || "");
  if (DOOR_FREE.has(id) || EXTRA_FREE.has(id)) return true;
  if (/\.list_resolved$/.test(id)) return true;
  if (/\breversible\b/i.test(text)) return false;
  if (hasAction(id) || yesText(text) || paidText(text) || /posts a public/i.test(text)) return false;
  const body = useBody(text);
  if (/free read|free external read|local read|free people or company|(?:^|\.\s+)Free\.|\bRead only\b/i.test(body)) return true;
  if (/\b0 credits\b|costs 0/i.test(body)) return true;
  if (/^(Read|List|Counts|State of|People already|Stored conversations|Comments waiting|The step ids|Price an unsaved)\b/i.test(body)) return true;
  if (/^Page count\b/i.test(text)) return true;
  if (/(\.(get|list)|_(get|list))$/.test(id)) return true;
  return false;
}
export function parseToolMap(text) {
  const uses = new Map();
  const definitions = new Set();
  let inDef = false;
  for (const line of String(text).split(/\n/)) {
    if (/^## Definition ids/.test(line)) {
      inDef = true;
      continue;
    }
    if (/^## /.test(line)) inDef = false;
    if (!line.startsWith("|")) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 2) continue;
    const id = cells[0].replace(/`/g, "").trim();
    if (!id.includes(".") || id === "Id") continue;
    if (inDef) definitions.add(id);
    else if (!uses.has(id)) uses.set(id, cells.slice(1).join(" "));
  }
  return { uses, definitions };
}
export function rowSide(mode) {
  const value = mode.toLowerCase();
  if (value.includes("never") || value.includes("not this")) return "never";
  if (value.includes("definition") || value.includes("not tools_run")) return "definition";
  const live = /\blive\b/.test(value);
  const preview = /\b(dry_run|smoke_test|preview|read|quote)\b/.test(value);
  if (preview && live) return "combined";
  if (preview) return "preview";
  if (live || /\bwrite\b/.test(value)) return "outward";
  return "other";
}
function sends(id, use) {
  return hasAction(id) || /starts sending|\benrolls?\b/i.test(use);
}
function previewYes(id, use) {
  if (/always owner yes/i.test(use)) return true;
  if (/dry run is allowed and costs 0|smoke_test to preview|preview when|modes smoke_test and live/i.test(use)) return false;
  return sends(id, use);
}
function outwardYes(id, use) {
  return sends(id, use) || yesText(use) || paidText(use) || PAID_RUN.has(id) || /posts a public/i.test(use);
}
export function expectedNeed(id, mode, use) {
  if (id === "tools_get" || id === "tools_run" || rowSide(mode) === "never") return "forbid";
  if (rowSide(mode) === "definition" || id.startsWith("source.") || id.startsWith("column.")) return "no";
  if (isFreeRead(id, use)) return "no";
  const side = rowSide(mode);
  if (side === "preview") return previewYes(id, use) ? "yes" : "no";
  if (side === "combined" || side === "outward") return outwardYes(id, use) ? "yes" : "no";
  return "no";
}
function refusesDry(use) {
  return /refus(?:es|ed)\s+dry_run|no\s+dry_run|dry_run\s+unsupported|no\s+real\s+dry_run/i.test(use);
}
export function listedModes(id, use, definitions = new Set()) {
  if (definitions.has(id) || id.startsWith("source.") || id.startsWith("column.")) return new Set(["definition id"]);
  if (!use) return new Set(["read"]);
  if (/\breversible\b/i.test(use)) return new Set(["write"]);
  if (isFreeRead(id, use)) {
    const modes = new Set(["read"]);
    if (/use smoke_test/i.test(use)) modes.add("smoke_test");
    return modes;
  }
  const modes = new Set();
  const named = String(use).match(/modes\s+([a-z_]+)\s+and\s+([a-z_]+)/i);
  if (named) {
    modes.add(named[1].toLowerCase());
    modes.add(named[2].toLowerCase());
  }
  if (/smoke_test/i.test(use)) modes.add("smoke_test");
  if (/preview when|preview one|smoke_test to preview/i.test(use)) modes.add("preview");
  if (/\bdry[_\s]run\b/i.test(use) && !refusesDry(use) && !/dry_run executes|dry_run request runs live/i.test(use)) {
    modes.add("dry_run");
  }
  if (/(?:^|[.]\s+)Live\b|\blive (?:with|needs|sends|posts|repeats)\b|\bthen live\b/i.test(use)) modes.add("live");
  if (modes.has("dry_run") && /dry.run first|dry_run, then|dry run, then/i.test(use)) modes.add("live");
  if (modes.size === 0) {
    if (/add a column|does not run/i.test(use)) modes.add("write");
    else modes.add("live");
  }
  if (modes.has("live") && !refusesDry(use) && !/dry_run executes|dry_run request runs live/i.test(use)) {
    modes.add("dry_run");
  }
  return modes;
}
export function modeTokens(mode) {
  const value = String(mode || "").trim().toLowerCase();
  if (value === "definition id") return ["definition id"];
  return value.split(/[^a-z_]+/).filter((token) => MODE_WORD.has(token));
}
export function modeAllowed(mode, allowed) {
  const tokens = modeTokens(mode);
  return tokens.length > 0 && tokens.every((token) => allowed.has(token));
}
export function rowErrors(id, mode, need, use, definitions = new Set()) {
  const errors = [];
  const allowed = listedModes(id, use, definitions);
  if (!modeAllowed(mode, allowed)) {
    errors.push(`${id} mode ${mode} is not a mode docs/tool-map.md lists`);
  }
  if (isFreeRead(id, use) && !(mode === "read" && need === "no") && !(mode === "smoke_test" && need === "no" && allowed.has("smoke_test"))) {
    errors.push(`${id} is a free read and must be read | no`);
  }
  const expected = expectedNeed(id, mode, use);
  if (expected === "yes" && need !== "yes") errors.push(`${id} ${mode} needs yes`);
  if (expected === "no" && need !== "no") errors.push(`${id} ${mode} is free and must say no`);
  return errors;
}
export function compareRows(rows, useFor, definitions = new Set()) {
  const byId = new Map();
  for (const row of rows) {
    if (!byId.has(row.id)) byId.set(row.id, []);
    byId.get(row.id).push(row);
  }
  const errors = [];
  for (const [id, list] of byId) {
    const needs = new Set(list.map((row) => row.need));
    if (needs.size < 2) continue;
    const use = useFor(id) || "";
    const allowed = listedModes(id, use, definitions);
    const split = list.every((row) => {
      if (!modeAllowed(row.mode, allowed)) return false;
      const side = rowSide(row.mode);
      if (row.need === "no") return side === "preview";
      if (row.need === "yes") return side === "outward" || side === "combined";
      return false;
    });
    if (!split) errors.push(`${id} disagrees across skills regardless of mode`);
  }
  return errors;
}

const { uses: toolUses, definitions } = parseToolMap(readFileSync(path.join(root, "docs/tool-map.md"), "utf8"));
if (toolUses.size < 40) bad("docs/tool-map.md did not parse");
const seenMode = new Map();
const seenRows = [];
for (const name of folders) {
  const text = readFileSync(path.join(skillRoot, name, "SKILL.md"), "utf8");
  for (const line of text.split(/\n/)) {
    if (!line.startsWith("|")) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 4 || cells[1] === "Tool id" || !cells[1].includes("`")) continue;
    const id = cells[1].replace(/`/g, "").trim();
    const mode = cells[2];
    const need = cells[3];
    if (id === "tools_get" || id === "tools_run") bad(`${name}: drop the ${id} wrapper row`);
    if (rowSide(mode) === "never") bad(`${name}: fold ${id} into Never call`);
    const use = toolUses.get(id) || "";
    const expected = expectedNeed(id, mode, use);
    if (expected === "forbid") bad(`${name}: ${id} ${mode} is not a tool row`);
    if (need !== "yes" && need !== "no") bad(`${name}: ${id} Needs yes is ${need}`);
    for (const message of rowErrors(id, mode, need, use, definitions)) bad(`${name}: ${message}`);
    if ((definitions.has(id) || id.startsWith("source.") || id.startsWith("column.")) && mode !== "definition id") {
      bad(`${name}: ${id} must be definition id | no`);
    }
    const key = `${id}\0${mode}`;
    const prior = seenMode.get(key);
    if (prior && prior !== need) bad(`${id} ${mode} is ${prior} in one skill and ${need} in ${name}`);
    seenMode.set(key, need);
    seenRows.push({ name, id, mode, need });
  }
}
for (const message of compareRows(seenRows, (id) => toolUses.get(id) || "", definitions)) bad(message);

for (const rel of ["brand/identity.md", "brand/voice.md", "brand/style.md", "audience/ideal-follower.md"]) {
  const text = readFileSync(path.join(root, rel), "utf8");
  if (!text.includes("Status: blank")) bad(`${rel}: template is not Status: blank`);
}

const follower = readFileSync(path.join(root, "audience/ideal-follower.md"), "utf8");
for (const question of QUESTIONS) {
  if (!follower.includes(question)) bad(`audience template missing: ${question}`);
}
if (!readFileSync(path.join(root, "brand/tokens.css"), "utf8").includes("unset")) {
  bad("brand/tokens.css has no unset values");
}

const timeline = readFileSync(path.join(root, "pictures/timeline.js"), "utf8");
if (!timeline.includes("DeskTimeline") || !timeline.includes("__seek")) {
  bad("pictures/timeline.js is missing DeskTimeline or __seek");
}
const scene = readFileSync(path.join(root, "pictures/examples/gate/scene.js"), "utf8");
if (!scene.includes("DeskTimeline") || /@keyframes|transition\s*:/.test(scene)) {
  bad("example scene is not a JavaScript timeline");
}

const terms = bannedTerms();
if (terms === null || terms.length === 0) {
  console.log("BANNED-TERM SCAN SKIPPED");
  if (strict) bad("strict: .banned-terms.local is missing or empty");
} else {
  const lowered = terms.map((term) => term.toLowerCase());
  for (const file of walk(root)) {
    if (!/\.(md|js|mjs|css|html|json|py)$/.test(file)) continue;
    const text = readFileSync(file, "utf8").toLowerCase();
    if (lowered.some((term) => matchesTerm(text, term))) {
      bad(`${path.relative(root, file)} matches .banned-terms.local`);
    }
  }
  if (!failed) console.log(`Banned-term check passed (${terms.length} terms).`);
}

if (failed) process.exit(1);
console.log("50 skills. Audience and timeline checks passed.");
