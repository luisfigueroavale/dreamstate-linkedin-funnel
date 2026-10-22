import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const positional = args.filter((arg) => !arg.startsWith("--"));
const raw = positional.length ? readFileSync(positional[0], "utf8") : readFileSync(0, "utf8");
const text = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

const notes = [];
if (!text.trim()) notes.push("empty");
if (text && /\s/.test(text[0])) notes.push("leading-space");

function points(value) {
  return Array.from(value);
}

const lines = text.split("\n");
const content = [];
for (let index = 0; index < lines.length; index += 1) {
  if (lines[index].trim()) content.push(index);
  if (content.length === 2) break;
}
const first = content.length ? lines[content[0]] : "";
const block = content.length ? lines.slice(0, content[content.length - 1] + 1).join("\n") : "";
const firstPoints = points(first).length;
const blockPoints = points(block).length;
const textPoints = points(text);

if (firstPoints > 60) notes.push("first-line-over-60");
if (blockPoints > 140) notes.push("opening-over-140");
if (block.includes("\n\n")) notes.push("blank-line-in-opening");

const chars = textPoints.length;
const utf16 = Buffer.from(text, "utf16le").length / 2;
if (chars > 3000) notes.push("over-3000");
else if (utf16 > 3000) notes.push("utf16-over-3000");

const report = {
  unit: "unicode-code-points",
  not_a_feed_preview: true,
  chars,
  utf16,
  first_line_chars: firstPoints,
  opening_chars: blockPoints,
  opening_ends: "second nonempty line, or the only nonempty line",
  slice_140: textPoints.slice(0, 140).join(""),
  slice_210: textPoints.slice(0, 210).join(""),
  notes,
};

if (asJson) process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
else {
  process.stdout.write(
    [
      `first line ${report.first_line_chars} (soft band 40-60; a note past 60 is not a reject)`,
      `opening block ${report.opening_chars} (budget 140, through the second nonempty line)`,
      `post ${report.chars} code points, ${report.utf16} UTF-16 units (ceiling 3000)`,
      "slices are text, not a see-more preview",
      notes.length ? `notes: ${notes.join(", ")}` : "notes: none",
    ].join("\n") + "\n",
  );
}
process.exit(text.trim() ? 0 : 1);
