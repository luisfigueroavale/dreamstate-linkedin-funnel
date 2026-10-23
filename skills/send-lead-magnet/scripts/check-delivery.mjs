#!/usr/bin/env node
// Local spec check for a giveaway delivery. Reads JSON. Writes nothing. Sends nothing.

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const GUARD = /\bsent\b|\binbox\b|\bdms?\b/i;
const NINE_MIN_MS = 9 * 60 * 1000;
const NOUNS = new Set([
  "file", "kit", "template", "resource", "system", "guide", "checklist", "skill", "skills", "it", "over", "link",
]);
const SEND_TAILS = ["it", "me", "over", "please", "pls"];

function words(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function distance(a, b) {
  const left = words(a).join("");
  const right = words(b).join("");
  const rows = Array.from({ length: left.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= right.length; j += 1) rows[0][j] = j;
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost);
    }
  }
  return rows[left.length][right.length];
}

function wholeWord(text, token) {
  const escaped = String(token).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(String(text ?? ""));
}

function pieces(text) {
  return String(text ?? "")
    .toLowerCase()
    .split(/[^a-z0-9']+/)
    .filter(Boolean);
}

function mentionsSendNoun(text) {
  const list = pieces(text);
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] !== "send" && list[i] !== "share") continue;
    if (list.slice(i + 1, i + 12).some((word) => NOUNS.has(word))) return true;
  }
  return false;
}

function bareSend(text) {
  const flat = ` ${pieces(text).join(" ")} `;
  if (flat.includes(" please send ")) return true;
  if (SEND_TAILS.some((tail) => flat.includes(` send ${tail} `))) return true;
  return flat.trim().endsWith(" send");
}

function genuineAsk(text) {
  const flat = pieces(text).join(" ");
  if (flat.includes("would love to get") || flat.includes("would love to have")) return true;
  if (flat.includes("can i get") || flat.includes("can i have")) return true;
  if (flat.includes("i'd like") || flat.includes("send me the") || flat.includes("share the")) return true;
  return false;
}

export function asksForFile(text, keywords) {
  const body = String(text ?? "");
  if ((keywords || []).some((word) => wholeWord(body, word))) return true;
  return mentionsSendNoun(body) || bareSend(body) || genuineAsk(body);
}

export function degreeLane(value) {
  const label = String(value ?? "").trim().toUpperCase().replace(/\s+/g, "_");
  if (label === "FIRST_DEGREE" || label === "DISTANCE_1" || label === "1") return "file";
  if (label === "SECOND_DEGREE" || label === "DISTANCE_2" || label === "2") return "connect";
  if (label === "THIRD_DEGREE" || label === "DISTANCE_3" || label === "3") return "connect";
  return "skip";
}

export function replyRecognized(text) {
  return GUARD.test(String(text ?? ""));
}

function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function monthLength(year, month) {
  const lengths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && leapYear(year)) return 29;
  return lengths[month] || 0;
}

function utcFromParts(year, month, day, hour, minute, second, ms) {
  if (month < 1 || month > 12 || day < 1 || day > monthLength(year, month)) return null;
  if (hour > 23 || minute > 59 || second > 59 || ms > 999) return null;
  let days = 0;
  for (let yearCursor = 1970; yearCursor < year; yearCursor += 1) days += leapYear(yearCursor) ? 366 : 365;
  for (let monthCursor = 1; monthCursor < month; monthCursor += 1) days += monthLength(year, monthCursor);
  days += day - 1;
  return ((days * 24 + hour) * 60 + minute) * 60 * 1000 + second * 1000 + ms;
}

function parseIsoZ(value) {
  const raw = String(value ?? "");
  if (!raw.endsWith("Z")) return null;
  const [date, clock] = raw.slice(0, -1).split("T");
  if (!date || !clock) return null;
  const dateParts = date.split("-");
  if (dateParts.length !== 3) return null;
  const [clockBody, fraction] = clock.split(".");
  const clockParts = clockBody.split(":");
  if (clockParts.length !== 3) return null;
  if (fraction !== undefined && !/^[0-9]{1,3}$/.test(fraction)) return null;
  const numbers = [...dateParts, ...clockParts].map((part) => Number(part));
  if (numbers.some((part) => !Number.isInteger(part))) return null;
  const millis = fraction === undefined ? 0 : Number(fraction.padEnd(3, "0"));
  return utcFromParts(numbers[0], numbers[1], numbers[2], numbers[3], numbers[4], numbers[5], millis);
}

export function tickIsStale(nowIso, scheduledIso) {
  const now = parseIsoZ(nowIso);
  const scheduled = parseIsoZ(scheduledIso);
  if (now === null || scheduled === null) return true;
  return now - scheduled > NINE_MIN_MS;
}

function sameAddress(a, b) {
  const clean = (value) => String(value ?? "").trim().replace(/\/+$/, "");
  return clean(a) !== "" && clean(a) === clean(b);
}

function hasParam(url, name, expected) {
  try {
    const parsed = new URL(url);
    const value = parsed.searchParams.get(name);
    if (value === null || value === "") return false;
    if (expected === undefined) return true;
    return value.toLowerCase() === expected.toLowerCase();
  } catch {
    return false;
  }
}

export function checkSpec(spec) {
  const issues = [];
  const fail = (code, detail) => issues.push({ code, detail });
  if (!spec || typeof spec !== "object") {
    return { ok: false, issues: [{ code: "spec", detail: "Spec must be an object." }] };
  }

  const keywords = Array.isArray(spec.keywords) ? spec.keywords.map((item) => String(item)) : [];
  const cta = String(spec.cta ?? "").trim();
  const post = String(spec.post_text ?? "");
  if (!cta) fail("cta", "Name the call to action.");
  if (keywords.length < 1 || keywords.length > 20) {
    fail("keywords", "keywords needs 1 to 20 entries.");
  }
  if (cta && !post.toLowerCase().includes(cta.toLowerCase())) {
    fail("post", "The post text does not contain the call to action.");
  }
  if (cta && !keywords.some((word) => word.toLowerCase() === cta.toLowerCase())) {
    fail("keywords", "keywords must include the call to action.");
  }
  for (const word of keywords) {
    if (!word.trim()) fail("keywords", "Empty keyword.");
    else if (cta && distance(word, cta) > 2) {
      fail("keywords", `"${word}" is not a close spelling of the call to action.`);
    }
  }

  const sentLines = [spec.comment_reply_sent, ...(spec.sent_variants || [])].filter((line) => line != null && String(line) !== "");
  const connectLines = [spec.comment_reply_not_connected, ...(spec.connect_variants || [])].filter(
    (line) => line != null && String(line) !== "",
  );
  if (sentLines.length === 0) fail("sent", "comment_reply_sent is empty.");
  if (connectLines.length === 0) fail("connect", "comment_reply_not_connected is empty.");
  for (const line of sentLines) {
    if (!replyRecognized(line)) fail("sent", "The sent line must include sent, inbox, or dm as a whole word.");
  }
  for (const line of connectLines) {
    if (replyRecognized(line)) fail("connect", "The connect-first line must not include sent, inbox, or dm.");
  }

  const destination = String(spec.destination_url ?? "");
  const body = String(spec.dm_body ?? "");
  const shortUrl = String(spec.short_url ?? "");
  if (!destination) fail("destination", "destination_url is required.");
  if (destination && !/^https:\/\//i.test(destination)) fail("destination", "destination_url must be https.");
  if (destination && !hasParam(destination, "utm_source", "linkedin")) {
    fail("utm", "destination_url needs utm_source=linkedin.");
  }
  if (destination && !hasParam(destination, "utm_campaign")) fail("utm", "destination_url needs utm_campaign.");
  if (destination && !hasParam(destination, "utm_content", "dm")) {
    fail("utm", "destination_url needs utm_content=dm.");
  }
  if (destination && !body.includes(destination)) fail("body", "The message body must contain the full destination URL.");
  if (shortUrl && body.includes(shortUrl)) fail("body", "The message body must not contain short_url.");
  if (/\bshort_url\b/.test(body)) fail("body", "The message body must not mention short_url.");
  for (const prior of spec.prior_destinations || []) {
    if (sameAddress(prior, destination)) fail("destination", "This destination was already used on another post.");
  }

  if (spec.spacing_seconds != null || spec.cron != null) {
    fail("pacing", "Leave pacing at the account's own spacing. Do not set a gap or a clock here.");
  }
  const armed = spec.arm === true;
  if (spec.dm_enabled === true && !armed) {
    fail("arm", "dm_enabled stays false until the spec records arm: true after the owner's yes.");
  }
  if (spec.public_replies === true && !armed) {
    fail("arm", "Public replies stay off until the spec records arm: true after the owner's yes.");
  }

  const samples = Array.isArray(spec.comments) ? spec.comments : [];
  for (const sample of samples) {
    const got = asksForFile(sample.text, keywords);
    if (Boolean(sample.ask) !== got) {
      fail("match", `"${sample.text}" classified as ${got ? "a request" : "not a request"}.`);
    }
  }

  if (spec.degree != null && spec.expect_lane != null && degreeLane(spec.degree) !== spec.expect_lane) {
    fail("degree", `Degree ${spec.degree} is ${degreeLane(spec.degree)}, not ${spec.expect_lane}.`);
  }
  if (spec.scheduled_for != null && spec.now != null && tickIsStale(spec.now, spec.scheduled_for) && spec.allow_stale !== true) {
    fail("stale", "This pass is more than nine minutes after its slot.");
  }

  return { ok: issues.length === 0, issues };
}

function builtInSamples(cta) {
  return [
    { text: cta, ask: true },
    { text: "Love this", ask: false },
    { text: "Great post", ask: false },
    { text: "please send :)", ask: true },
    { text: "would love to get the kit", ask: true },
    { text: "can you share the template", ask: true },
  ];
}

function selfTest() {
  const destination = "https://example.com/file?utm_source=linkedin&utm_campaign=week-slug&utm_content=dm";
  const good = {
    cta: "FRAME",
    keywords: ["FRAME", "FRAMe", "FRANE"],
    post_text: "Comment FRAME if you want the file.",
    comment_reply_sent: "Sent. It is in your inbox.",
    comment_reply_not_connected: "Connect with me first and I can pass you the file.",
    destination_url: destination,
    short_url: "https://short.example/abc",
    dm_body: `Ada\n\nThe blank file:\n\n${destination}`,
    prior_destinations: ["https://example.com/older"],
    dm_enabled: false,
    public_replies: false,
    comments: builtInSamples("FRAME"),
    degree: "DISTANCE_3",
    expect_lane: "connect",
    now: "2026-10-22T12:00:00Z",
    scheduled_for: "2026-10-22T11:56:00Z",
  };
  const ok = checkSpec(good);
  if (!ok.ok) throw new Error(`good spec failed ${JSON.stringify(ok.issues)}`);

  const cases = [
    [{ ...good, comment_reply_sent: "On its way to you" }, "sent"],
    [{ ...good, comment_reply_not_connected: "Sent you a note, now connect" }, "connect"],
    [{ ...good, dm_body: "Here https://short.example/abc" }, "body"],
    [{ ...good, keywords: Array.from({ length: 21 }, (_, i) => (i === 0 ? "FRAME" : "FRAME")) }, "keywords"],
    [{ ...good, prior_destinations: [destination] }, "destination"],
    [{ ...good, dm_enabled: true }, "arm"],
    [{ ...good, spacing_seconds: 30 }, "pacing"],
    [{ ...good, comments: [{ text: "Love this", ask: true }] }, "match"],
    [{ ...good, scheduled_for: "2026-10-22T11:00:00Z" }, "stale"],
    [{ ...good, degree: "DISTANCE_1", expect_lane: "connect" }, "degree"],
  ];
  for (const [spec, code] of cases) {
    const result = checkSpec(spec);
    if (result.ok || !result.issues.some((issue) => issue.code === code)) {
      throw new Error(`expected ${code}, got ${JSON.stringify(result.issues)}`);
    }
  }
  if (degreeLane("FIRST_DEGREE") !== "file") throw new Error("first degree");
  if (degreeLane("") !== "skip") throw new Error("unknown degree");
  if (!tickIsStale("not-a-time", "2026-10-22T11:00:00Z")) throw new Error("bad iso should fail closed");
  if (parseIsoZ("2026-02-29T00:00:00Z") !== null) throw new Error("2026 is not a leap year");
  if (parseIsoZ("2024-02-29T00:00:00Z") === null) throw new Error("2024 is a leap year");
  console.log("self-test ok");
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) {
    selfTest();
    return;
  }
  const file = args.find((arg) => !arg.startsWith("--"));
  if (!file) {
    console.error("Usage: node skills/send-lead-magnet/scripts/check-delivery.mjs <spec.json> | --self-test");
    process.exit(2);
  }
  const spec = JSON.parse(readFileSync(file, "utf8"));
  if (!Array.isArray(spec.comments) && spec.cta) spec.comments = builtInSamples(spec.cta);
  const result = checkSpec(spec);
  if (!result.ok) {
    for (const issue of result.issues) console.error(`${issue.code}: ${issue.detail}`);
    process.exit(1);
  }
  console.log("ok");
}

const invoked = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invoked) main();
