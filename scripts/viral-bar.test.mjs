import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const script = path.join(root, "skills/find-x-angles/scripts/viral_bar.py");
const fixtures = path.join(root, "scripts/fixtures/viral");

function run(...args) {
  const result = spawnSync("python3", [script, ...args], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

const out = run(path.join(fixtures, "candidates.json"), "--history", path.join(fixtures, "history.json"));
const byId = Object.fromEntries(out.posts.map((row) => [row.id, row]));

test("200 likes or 10,000 views clears the bar", () => {
  assert.equal(byId.p1.clears_bar, true);
  assert.deepEqual(byId.p1.bar_reason, ["views 12000 >= 10000"]);
  assert.equal(byId.p3.clears_bar, true);
  assert.equal(byId.p4.clears_bar, false);
});

test("the multiple uses the author's own average of likes and bookmarks", () => {
  assert.equal(byId.p1.author_average, 25);
  assert.equal(byId.p1.multiple, 8);
  assert.equal(byId.p1.tier, "5-10x");
  assert.equal(byId.p2.tier, "over 10x");
});

test("a thin author sample stays unknown", () => {
  assert.equal(byId.p3.author_sample, 3);
  assert.equal(byId.p3.multiple, null);
  assert.equal(byId.p3.tier, "unknown");
});

test("posts in the 5 to 10x band rank first and a miss ranks last", () => {
  assert.deepEqual(out.posts.map((row) => row.id), ["p1", "p2", "p3", "p4"]);
});
