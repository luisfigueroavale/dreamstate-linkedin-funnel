#!/usr/bin/env node
/**
 * Lint the committed queue fixtures on copies, so the fixtures stay unstamped.
 *
 *   node scripts/queue-check.mjs
 */
import { copyFileSync, mkdtempSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const cases = [
  ["scripts/fixtures/queue-linkedin.json", "linkedin"],
  ["scripts/fixtures/queue-x.json", "x"],
];

const dir = mkdtempSync(path.join(os.tmpdir(), "queue-check-"));
let failed = 0;
try {
  for (const [rel, profile] of cases) {
    const dest = path.join(dir, path.basename(rel));
    copyFileSync(path.join(root, rel), dest);
    const result = spawnSync(
      process.execPath,
      [path.join(root, "scripts/queue-lint.mjs"), dest, "--profile", profile],
      { encoding: "utf8" },
    );
    if (result.status !== 0) {
      failed += 1;
      if (result.stdout) process.stdout.write(result.stdout);
      if (result.stderr) process.stderr.write(result.stderr);
      console.error(`${rel} failed lint`);
    }
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
if (failed) process.exit(1);
console.log("queue fixtures lint pass");
