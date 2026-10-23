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
for (const needle of ["audience/AGENTS.md", "brand/AGENTS.md", "brand/taste.md", "required unknown"]) {
  if (!frame.includes(needle)) bad(`docs/skill-frame.md is missing ${needle}`);
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
