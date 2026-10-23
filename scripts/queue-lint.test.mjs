import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import test from "node:test";
import path from "node:path";
import { bannedWordsFrom } from "./queue-lint.mjs";

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

test("the command still runs when invoked", () => {
  const result = spawnSync(process.execPath, [script, "--help"], { encoding: "utf8" });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /queue-lint\.mjs/);
});
