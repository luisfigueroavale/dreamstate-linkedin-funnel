#!/usr/bin/env node
/**
 * Lint a draft-linkedin-comments or draft-x-replies run before the page is written.
 *
 *   node scripts/queue-lint.mjs <run.json> [--profile linkedin|x]
 *
 * Exit 1 on a hard failure. The page must not be written, and `lint` is not set.
 * Exit 0 stamps `lint: "pass"` on that file. Warnings print and do not block.
 * Rules: scripts/queue-rules.json. Do not set `lint` by hand.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
// local
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const rules = JSON.parse(readFileSync(path.join(root, "scripts/queue-rules.json"), "utf8"));

function wordsOf(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function paragraphsOf(text) {
  return text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
}

function startsWithPhrase(text, phrase) {
  const lead = text.trim().toLowerCase();
  const needle = phrase.toLowerCase();
  if (!lead.startsWith(needle)) return false;
  const next = lead.slice(needle.length, needle.length + 1);
  return next === "" || /[^a-z0-9%]/.test(next);
}

function hasBareNumber(text) {
  const stripped = text.replace(/\b(19|20)\d{2}\b/g, " ");
  return /(?<![,\d])\d{4,}(?![\d,])/.test(stripped);
}

function sixGrams(text) {
  const tokens = text.toLowerCase().split(/[^a-z0-9']+/).filter(Boolean);
  const out = [];
  for (let i = 0; i + 6 <= tokens.length; i += 1) out.push(tokens.slice(i, i + 6).join(" "));
  return out;
}

function draftText(entry) {
  if (typeof entry === "string") return entry;
  if (!entry || typeof entry !== "object") return "";
  if (typeof entry.text === "string") return entry.text;
  if (typeof entry.draft === "string") return entry.draft;
  if (entry.draft && typeof entry.draft.text === "string") return entry.draft.text;
  return "";
}

function columns(pack, profile) {
  const key = profile.draft_path;
  const rows = Array.isArray(pack[key]) ? pack[key] : Array.isArray(pack.items) ? pack.items : [];
  const first = [];
  const second = [];
  rows.forEach((row, index) => {
    const drafts = Array.isArray(row.drafts) && row.drafts.length
      ? row.drafts
      : [row.draft ?? row.text ?? row];
    const slot = (list, draft, which) => {
      list.push({
        index,
        which,
        text: draftText(draft),
        move: draft && typeof draft === "object" ? draft.move || row.move || row.angle || "" : row.angle || row.move || "",
        story: Boolean((draft && draft.ref) || row.ref || /story/i.test(String((draft && draft.move) || row.angle || ""))),
      });
    };
    slot(first, drafts[0], 0);
    if (drafts.length > 1) slot(second, drafts[1], 1);
  });
  return [first, second.filter((row) => row.text || row.move)];
}

function companyName(pack) {
  const name = pack.company ?? pack.company_name ?? null;
  if (name == null || String(name).trim() === "") return null;
  return String(name).trim();
}

export function bannedWordsFrom(text) {
  const chunk = String(text).split(/^##\s+Banned(?:\s+words)?\s*$/im)[1];
  if (!chunk) return [];
  return chunk
    .split(/^##\s+/m)[0]
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter((line) => line && !line.startsWith("#") && line.length < 40);
}

function voiceBans() {
  const file = path.join(root, "brand.local/voice.md");
  try {
    return bannedWordsFrom(readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

function lintDraft(text, profile, bans, label) {
  const fails = [];
  const body = text ?? "";
  if (!body.trim()) {
    fails.push(`${label}: empty body`);
    return fails;
  }
  if (profile.max_chars && body.length > profile.max_chars) fails.push(`${label}: ${body.length} characters`);
  const words = wordsOf(body);
  if (profile.min_words && words.length < profile.min_words) fails.push(`${label}: ${words.length} words`);
  if (profile.max_words && words.length > profile.max_words) fails.push(`${label}: ${words.length} words`);
  if (profile.max_line_breaks != null) {
    const breaks = (body.match(/\n/g) || []).length;
    if (breaks > profile.max_line_breaks) fails.push(`${label}: ${breaks} line breaks`);
  }
  if (/\n[ \t]*\n[ \t]*\n/.test(body)) fails.push(`${label}: two blank lines in a row`);
  const paragraphs = paragraphsOf(body);
  if (profile.max_paragraphs && paragraphs.length > profile.max_paragraphs) {
    fails.push(`${label}: ${paragraphs.length} paragraphs`);
  }
  if (profile.max_paragraph_words) {
    paragraphs.forEach((part, i) => {
      if (wordsOf(part).length > profile.max_paragraph_words) fails.push(`${label}: paragraph ${i + 1} over ${profile.max_paragraph_words} words`);
    });
  }
  if (profile.sentences_need_blank_line) {
    paragraphs.forEach((part) => {
      if ((part.match(/[.!?]["']?\s+[A-Z0-9]/g) || []).length) fails.push(`${label}: two sentences with no blank line`);
    });
  }
  if (profile.dashes && /[—–]|\s-\s/.test(body)) fails.push(`${label}: dash`);
  if (profile.links && /\bhttps?:\/\/|\bwww\./i.test(body)) fails.push(`${label}: link`);
  if (profile.hashtags && /(^|\s)#\w/.test(body)) fails.push(`${label}: hashtag`);
  for (const opener of profile.openers || []) {
    if (startsWithPhrase(body, opener)) fails.push(`${label}: opener ${opener}`);
  }
  for (const opener of profile.openers_at_line_start || []) {
    const first = body.split(/\n/)[0];
    if (startsWithPhrase(first, opener)) fails.push(`${label}: opener ${opener}`);
  }
  for (const word of bans) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = profile.banned_any_ending && !word.includes(" ")
      ? new RegExp(`\\b${escaped}\\w*\\b`, "i")
      : new RegExp(`\\b${escaped}\\b`, "i");
    if (pattern.test(body)) fails.push(`${label}: banned ${word}`);
  }
  for (const phrase of profile.pitches || []) {
    if (body.toLowerCase().includes(phrase)) fails.push(`${label}: pitch`);
  }
  for (const phrase of profile.stock || []) {
    if (body.toLowerCase().includes(phrase)) fails.push(`${label}: stock line`);
  }
  for (const source of profile.stock_regex || []) {
    if (new RegExp(source, "i").test(body)) fails.push(`${label}: stock shape`);
  }
  for (const phrase of profile.brags || []) {
    if (body.toLowerCase().includes(phrase)) fails.push(`${label}: product brag`);
  }
  if (profile.thousands && hasBareNumber(body)) fails.push(`${label}: number needs a thousands separator`);
  return fails;
}

function lintBatch(column, profile, company, priorGrams) {
  const fails = [];
  const warns = [];
  const batch = profile.batch || {};
  const filled = column.filter((row) => row.text.trim());
  if (!filled.length) return { fails, warns };
  if (batch.shared_opening) {
    const seen = new Map();
    filled.forEach((row) => {
      const opening = wordsOf(row.text).slice(0, 2).join(" ").toLowerCase();
      if (!opening) return;
      if (!seen.has(opening)) seen.set(opening, []);
      seen.get(opening).push(row.index + 1);
    });
    for (const [opening, cards] of seen) {
      if (cards.length > 1) fails.push(`same opening "${opening}" on cards ${cards.join(", ")}`);
    }
  }
  const share = (predicate) => filled.filter(predicate).length / filled.length;
  if (filled.length >= (batch.long_shape_min_cards || 5) && share((row) => paragraphsOf(row.text).length >= (batch.long_shape_paragraphs || 2)) > (batch.long_shape_share || 0.6)) {
    fails.push("over 60 percent share a 2-paragraph shape");
  }
  if (share((row) => wordsOf(row.text).length > (batch.over_45_words || 45)) > (batch.over_45_share || 0.3)) {
    fails.push("over 30 percent run past 45 words");
  }
  const questions = filled.filter((row) => row.text.includes("?")).length;
  const cap = Math.max(2, 0.4 * filled.length);
  if (questions > cap) fails.push(`${questions} cards ask a question; cap is ${cap}`);
  if (filled.length >= (batch.laugh_min_cards || 5)) {
    const tokens = batch.laugh_tokens || [];
    const loud = filled.filter((row) => tokens.some((token) => row.text.toLowerCase().includes(token))).length / filled.length;
    if (loud > (batch.laugh_share || 0.6)) fails.push("laugh texture on more than 60 percent");
  }
  if (filled.length >= (batch.first_person_min_cards || 5)) {
    const personal = filled.filter((row) => /\b(i|my|we|our)\b/i.test(row.text)).length / filled.length;
    if (personal < (batch.first_person_min_share || 0.5)) fails.push("first person on fewer than half");
  }
  if (company && batch.company_max_share != null) {
    const hits = filled.filter((row) => row.text.toLowerCase().includes(company.toLowerCase())).length;
    if (hits / filled.length > batch.company_max_share) fails.push("company name past 1 in 10");
  }
  if (batch.six_word) {
    const seen = new Map();
    filled.forEach((row) => {
      for (const gram of sixGrams(row.text)) {
        if (seen.has(gram) && seen.get(gram) !== row.index) fails.push(`repeated 6-word sequence on cards ${seen.get(gram) + 1} and ${row.index + 1}`);
        else seen.set(gram, row.index);
        if (priorGrams.has(gram)) fails.push("6-word sequence repeats a run from the past 14 days");
      }
    });
  }
  if (batch.story_warn_share != null && share((row) => row.story) > batch.story_warn_share) {
    warns.push("stories on more than about 4 in 10 (warning, not a stop)");
  }
  return { fails, warns };
}

function priorGrams(file, days) {
  const found = new Set();
  const dir = path.dirname(file);
  let names = [];
  try { names = readdirSync(dir); } catch { return found; }
  const now = Date.now();
  for (const name of names) {
    const full = path.join(dir, name);
    if (full === file || !name.endsWith(".json")) continue;
    const dated = name.match(/(\d{4})-(\d{2})-(\d{2})/);
    const when = dated ? Date.parse(`${dated[1]}-${dated[2]}-${dated[3]}T00:00:00Z`) : statSync(full).mtimeMs;
    if (!Number.isFinite(when) || now - when > days * 86400000 || when > now + 86400000) continue;
    try {
      const pack = JSON.parse(readFileSync(full, "utf8"));
      const texts = [];
      for (const row of [...(pack.items || []), ...(pack.picks || [])]) {
        if (Array.isArray(row.drafts)) row.drafts.forEach((draft) => texts.push(draftText(draft)));
        else texts.push(draftText(row));
      }
      texts.forEach((text) => sixGrams(text).forEach((gram) => found.add(gram)));
    } catch { /* skip a broken older file */ }
  }
  return found;
}

function sameMove(pack) {
  const fails = [];
  for (const [index, row] of (pack.items || []).entries()) {
    if (!Array.isArray(row.drafts) || row.drafts.length < 2) continue;
    const left = row.drafts[0].move;
    const right = row.drafts[1].move;
    if (left && right && left === right) fails.push(`card ${index + 1}: both drafts use move ${left}`);
  }
  return fails;
}

function profileOf(file, argv) {
  const flag = argv.indexOf("--profile");
  const name = flag >= 0 ? argv[flag + 1] : file.includes("x-reply") ? "x" : "linkedin";
  const profile = rules[name];
  if (!profile) throw new Error(`unknown profile ${name}`);
  return { name, profile };
}

function main() {
  const argv = process.argv.slice(2).filter((arg) => arg !== "--help" && arg !== "-h");
  if (process.argv.includes("--help") || !argv[0]) {
    console.log("node scripts/queue-lint.mjs <run.json> [--profile linkedin|x]");
    console.log("Hard rules live in scripts/queue-rules.json. Review shapes are printed there and are still rejects.");
    process.exit(process.argv.includes("--help") ? 0 : 1);
  }
  const file = path.resolve(argv[0]);
  const { name, profile } = profileOf(file, process.argv.slice(2));
  const pack = JSON.parse(readFileSync(file, "utf8"));
  const bans = [...(profile.banned || []), ...voiceBans(), ...(Array.isArray(pack.banned_words) ? pack.banned_words : [])];
  const company = companyName(pack);
  const fails = [];
  const warns = [];
  const cols = columns(pack, profile);
  cols.forEach((column, which) => {
    column.forEach((row) => {
      fails.push(...lintDraft(row.text, profile, bans, `card ${row.index + 1} draft ${which + 1}`));
    });
    if (profile.batch) {
      const batch = lintBatch(column, profile, company, priorGrams(file, profile.batch.six_word_days || 14));
      fails.push(...batch.fails);
      warns.push(...batch.warns);
    }
  });
  if (profile.batch?.same_move) fails.push(...sameMove(pack));
  if (name === "x" && company && profile.company_only_on_receipt) {
    const rows = cols[0];
    rows.forEach((row) => {
      if (!row.text.toLowerCase().includes(company.toLowerCase())) return;
      if (String(row.move).toLowerCase() !== "receipt") fails.push(`card ${row.index + 1}: company name outside a receipt`);
    });
    const hits = rows.filter((row) => row.text.toLowerCase().includes(company.toLowerCase())).length;
    if (rows.length && hits / rows.length > profile.company_max_share) fails.push("company name past 1 in 10");
  }
  const unique = [...new Set(fails)];
  warns.forEach((line) => console.log(`warn ${line}`));
  if (unique.length) {
    unique.forEach((line) => console.error(`fail ${line}`));
    console.error(`${unique.length} lint failure${unique.length === 1 ? "" : "s"}. Do not write the page.`);
    process.exit(1);
  }
  pack.lint = "pass";
  writeFileSync(file, `${JSON.stringify(pack, null, 2)}\n`);
  console.log(`lint pass (${name}).`);
}

function directRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === pathToFileURL(path.resolve(entry)).href;
}

if (directRun()) main();
