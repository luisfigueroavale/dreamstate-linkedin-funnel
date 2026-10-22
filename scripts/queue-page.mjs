#!/usr/bin/env node
/**
 * Write a queue page only after lint passes.
 *
 *   node scripts/queue-page.mjs <run.json> <template.html> <out.html> [--profile linkedin|x]
 *
 * Copies the run, runs scripts/queue-lint.mjs on that copy, and writes nothing
 * when lint exits non-zero. On success, the stamped JSON replaces the body of
 * the first script type="application/json". The opening tag stays as written.
 */
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

function usage() {
  console.error("node scripts/queue-page.mjs <run.json> <template.html> <out.html> [--profile linkedin|x]");
  process.exit(1);
}

const argv = process.argv.slice(2);
const profileAt = argv.indexOf("--profile");
let profile = null;
if (profileAt >= 0) {
  profile = argv[profileAt + 1];
  if (!profile) usage();
  argv.splice(profileAt, 2);
}
const [runPath, templatePath, outPath] = argv;
if (!runPath || !templatePath || !outPath) usage();

const dir = mkdtempSync(path.join(os.tmpdir(), "queue-page-"));
const copy = path.join(dir, "run.json");
let status = 1;
try {
  copyFileSync(path.resolve(runPath), copy);
  const args = [path.join(root, "scripts/queue-lint.mjs"), copy];
  if (profile) args.push("--profile", profile);
  const result = spawnSync(process.execPath, args, { encoding: "utf8" });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) {
    status = result.status || 1;
  } else {
    const stamped = readFileSync(copy, "utf8").trim().replace(/</g, "\\u003c");
    const html = readFileSync(path.resolve(templatePath), "utf8");
    const re = /(<script\b[^>]*type=["']application\/json["'][^>]*>)[\s\S]*?(<\/script>)/i;
    if (!re.test(html)) {
      console.error("template has no application/json script");
      status = 1;
    } else {
      const next = html.replace(re, (_match, open, close) => `${open}${stamped}${close}`);
      writeFileSync(path.resolve(outPath), next);
      status = 0;
    }
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
process.exit(status);
