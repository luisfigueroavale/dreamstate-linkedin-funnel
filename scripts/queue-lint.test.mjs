import assert from "node:assert/strict";
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import test from "node:test";
import os from "node:os";
import path from "node:path";
import { bannedWordsFrom, bansFor, profileOf } from "./queue-lint.mjs";

const root = path.resolve(import.meta.dirname, "..");
const script = path.join(root, "scripts/queue-lint.mjs");

function voice(heading, body) {
  return `# Voice\n\n## Tone\n\n- warm\n\n${heading}\n\n${body}\n\n## Example lines\n\n- synergy stays in the example\n`;
}

test("## Banned words is the list and the next heading is not", () => {
  const words = bannedWordsFrom(voice("## Banned words", "- synergy\n- circle back"));
  assert.deepEqual(words, ["synergy", "circle back"]);
});

test("## Banned still supplies the list", () => {
  assert.deepEqual(bannedWordsFrom(voice("## Banned", "- synergy")), ["synergy"]);
});

test("a different Banned heading is not the list", () => {
  assert.deepEqual(bannedWordsFrom(voice("## Banned phrases", "- synergy")), []);
  assert.deepEqual(bannedWordsFrom(voice("## Banned words extra", "- synergy")), []);
});

test("a word under the template heading is read, and the blank template is empty", () => {
  const template = readFileSync(path.join(root, "brand/voice.md"), "utf8");
  assert.match(template, /^## Banned words\s*$/m);
  assert.deepEqual(bannedWordsFrom(template), []);
  const filled = template.replace("## Banned words\n\n", "## Banned words\n\n- synergy\n");
  assert.deepEqual(bannedWordsFrom(filled), ["synergy"]);
});

test("headings and long lines stay out of the list", () => {
  const body = ["- synergy", "- " + "x".repeat(40), "# not a word"].join("\n");
  assert.deepEqual(bannedWordsFrom(voice("## banned words", body)), ["synergy"]);
});

test("owner banned words add to the stock list", () => {
  const rules = JSON.parse(readFileSync(path.join(root, "scripts/queue-rules.json"), "utf8"));
  const stock = [
    "orchestrates",
    "leverages",
    "streamlines",
    "seamless",
    "unlock",
    "game changer",
    "delve",
    "crucial",
    "elevate",
    "empower",
    "testament",
    "thrilled",
  ];
  assert.deepEqual(rules.linkedin.banned, stock);
  assert.deepEqual(rules.x.banned, [
    "game changer",
    "delve",
    "crucial",
    "unlock",
    "seamless",
    "streamlines",
    "leverages",
    "orchestrates",
  ]);
  const voiceFile = [
    "## Banned words",
    "",
    "- circleback",
    "",
    "## Example lines",
    "",
    "- delve stays an example",
  ].join("\n");
  const merged = bansFor(rules.linkedin.banned, voiceFile, ["from-the-run"]);
  assert.deepEqual(merged.slice(0, stock.length), stock);
  assert.deepEqual(merged.slice(stock.length), ["circleback", "from-the-run"]);
});

test("the command still runs when invoked", () => {
  const result = spawnSync(process.execPath, [script, "--help"], { encoding: "utf8" });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /queue-lint\.mjs/);
});

test("renamed X folders use the X profile without --profile", () => {
  const folders = ["draft-x-replies", "write-x-post", "write-x-article", "find-x-angles", "plan-x-week", "x-reply-queue"];
  for (const folder of folders) {
    assert.equal(profileOf(path.join("/tmp/work", folder, "queue.json"), []).name, "x", folder);
  }
  assert.equal(profileOf("/tmp/work/draft-linkedin-comments/queue.json", []).name, "linkedin");
  assert.equal(profileOf("/tmp/work/draft-x-replies/queue.json", ["--profile", "linkedin"]).name, "linkedin");
});

test("a file under work/draft-x-replies lints as X without --profile", () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "queue-lint-"));
  const folder = path.join(dir, "work", "draft-x-replies");
  mkdirSync(folder, { recursive: true });
  const file = path.join(folder, "queue.json");
  copyFileSync(path.join(root, "scripts/fixtures/queue-x.json"), file);
  const result = spawnSync(process.execPath, [script, file], { encoding: "utf8" });
  rmSync(dir, { recursive: true, force: true });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /lint pass \(x\)/);
});
