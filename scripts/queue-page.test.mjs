import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import test from "node:test";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const page = path.join(root, "scripts/queue-page.mjs");

function run(args) {
  return spawnSync(process.execPath, [page, ...args], { encoding: "utf8" });
}

test("a lint failure does not write the page", () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "queue-page-fail-"));
  try {
    const runFile = path.join(dir, "run.json");
    const template = path.join(dir, "template.html");
    const out = path.join(dir, "out.html");
    writeFileSync(runFile, `${JSON.stringify({
      run_id: "fixture-fail",
      items: [{ drafts: [{ text: "", move: "receipt" }] }],
    }, null, 2)}\n`);
    writeFileSync(template, "<script type=\"application/json\" id=\"payload\">{}</script>\n");
    const result = run([runFile, template, out, "--profile", "linkedin"]);
    assert.equal(result.status, 1);
    assert.equal(existsSync(out), false);
    assert.match(result.stderr, /empty body/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a passing linkedin run is stamped into the page", () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "queue-page-pass-"));
  try {
    const template = path.join(dir, "template.html");
    const out = path.join(dir, "out.html");
    writeFileSync(template, "<script type=\"application/json\" id=\"payload\">{}</script>\n");
    const fixture = path.join(root, "scripts/fixtures/queue-linkedin.json");
    const before = readFileSync(fixture, "utf8");
    const result = run([fixture, template, out, "--profile", "linkedin"]);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(readFileSync(fixture, "utf8"), before);
    const html = readFileSync(out, "utf8");
    assert.match(html, /<script type="application\/json" id="payload">/);
    assert.match(html, /"lint": "pass"/);
    assert.match(html, /hid the real number from the sheet/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a passing x run keeps the queue-json tag", () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "queue-page-x-"));
  try {
    const template = path.join(dir, "template.html");
    const out = path.join(dir, "out.html");
    writeFileSync(template, "<script type=\"application/json\" id=\"queue-json\">{}</script>\n");
    const result = run([
      path.join(root, "scripts/fixtures/queue-x.json"),
      template,
      out,
      "--profile",
      "x",
    ]);
    assert.equal(result.status, 0, result.stderr);
    const html = readFileSync(out, "utf8");
    assert.match(html, /<script type="application\/json" id="queue-json">/);
    assert.match(html, /"lint": "pass"/);
    assert.match(html, /the first take held/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
