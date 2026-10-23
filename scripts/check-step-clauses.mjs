import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { clauseMissing, conditionClauses, stepLines } from "./check-skills.mjs";

const root = path.resolve(import.meta.dirname, "..");
const skillRoot = path.join(root, "skills");
const revision = "99de10c";
const missing = [];

for (const name of readdirSync(skillRoot).filter((entry) => statSync(path.join(skillRoot, entry)).isDirectory())) {
  const currentPath = path.join(skillRoot, name, "SKILL.md");
  let references = "";
  const referenceDir = path.join(skillRoot, name, "references");
  try {
    for (const file of readdirSync(referenceDir)) {
      if (file.endsWith(".md")) references += "\n" + readFileSync(path.join(referenceDir, file), "utf8");
    }
  } catch {
    references = "";
  }
  const haystack = readFileSync(currentPath, "utf8") + "\n" + references;
  const old = execFileSync("git", ["show", `${revision}:skills/${name}/SKILL.md`], { cwd: root, encoding: "utf8" });
  for (const line of stepLines(old)) {
    for (const clause of conditionClauses(line)) {
      if (clauseMissing(clause, haystack)) missing.push(`${name}: ${clause}`);
    }
  }
}

if (missing.length) {
  console.error(`Missing condition clauses from ${revision}: ${missing.length}`);
  for (const line of missing) console.error(line);
  process.exit(1);
}
console.log(`Condition clauses from ${revision}: 0 missing.`);
