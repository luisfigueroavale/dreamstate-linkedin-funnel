import { readFileSync } from "node:fs";

const arg = process.argv[2];
const text = arg
  ? arg.includes("\n") || arg.endsWith(".md") || arg.includes("/")
    ? readFileSync(arg, "utf8")
    : arg
  : readFileSync(0, "utf8");
const line = text.split("\n").find((row) => row.trim()) || "";
console.log(`${line.length}\t${line}`);
if (line.length > 210) process.exit(1);
