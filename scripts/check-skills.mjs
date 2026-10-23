import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
// local
import path from "node:path";

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

const DOOR_FREE = new Set([
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
function isFreeRead(id, use) {
  if (DOOR_FREE.has(id) || EXTRA_FREE.has(id)) return true;
  if (hasAction(id) || yesText(use) || paidText(use) || /posts a public/i.test(use)) return false;
  if (/free read|free external read|local read|free people or company|(?:^|\.\s+)Free\.|\bRead only\b/i.test(use)) return true;
  if (/\b0 credits\b|costs 0/i.test(use)) return true;
  if (/^(Read|List|Counts|State of|People already|Stored conversations|Comments waiting|The step ids|Price an unsaved|Page count)/i.test(use)) return true;
  if (/(\.(get|list)|_(get|list))$/.test(id)) return true;
  return false;
}
function parseToolMap() {
  const text = readFileSync(path.join(root, "docs/tool-map.md"), "utf8");
  const uses = new Map();
  const definitions = new Set();
  let inDef = false;
  for (const line of text.split(/\n/)) {
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
  if (uses.size < 40) bad("docs/tool-map.md did not parse");
  return { uses, definitions };
}
function rowSide(mode) {
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
function expectedNeed(id, mode, use) {
  if (id === "tools_get" || id === "tools_run" || rowSide(mode) === "never") return "forbid";
  if (rowSide(mode) === "definition" || id.startsWith("source.") || id.startsWith("column.")) return "no";
  if (isFreeRead(id, use)) return "no";
  const side = rowSide(mode);
  if (side === "preview") return previewYes(id, use) ? "yes" : "no";
  if (side === "combined" || side === "outward") return outwardYes(id, use) ? "yes" : "no";
  return "no";
}

const { uses: toolUses, definitions } = parseToolMap();
const seenMode = new Map();
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
    if (isFreeRead(id, use) && (mode !== "read" || need !== "no")) {
      bad(`${name}: ${id} is a free read and must be read | no`);
    }
    if ((definitions.has(id) || id.startsWith("source.") || id.startsWith("column.")) && mode !== "definition id") {
      bad(`${name}: ${id} must be definition id | no`);
    }
    if (expected === "yes" && need !== "yes") bad(`${name}: ${id} ${mode} needs yes`);
    if (expected === "no" && need !== "no") bad(`${name}: ${id} ${mode} is free and must say no`);
    const key = `${id}\0${mode}`;
    const prior = seenMode.get(key);
    if (prior && prior !== need) bad(`${id} ${mode} is ${prior} in one skill and ${need} in ${name}`);
    seenMode.set(key, need);
  }
}

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
