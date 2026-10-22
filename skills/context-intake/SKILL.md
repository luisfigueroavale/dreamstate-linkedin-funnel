---
name: context-intake
description: "Save interviews, notes, and writing the owner supplies, then file only the lines that evidence supports. Use when Ideal Customer, Proof, or Tone of Voice is empty or wrong, and when Product Information is absent. The reader stays in audience.local. It does not invent a claim or open a second store."
---

Follow `docs/skill-frame.md`.

Read `AGENTS.md`, `docs/company-context.md`, `docs/sources.md`, `docs/tool-map.md`, `vault/intake/interview.md`, and `vault/sources/`. Read `brand/AGENTS.md` before `brand.local/` and `audience/AGENTS.md` before reader. No `context/` tree.

Ask only blank interview lines this task needs. Leave every other answer blank.

Save exact material in a new dated folder under `vault/sources/`. Copy a local file unchanged. A fragment stays a fragment; the manifest says so. Change pages only after the gates below.

`origin.md`: producer, where from, date on the material, date saved, files, whole or fragment, public or not. Unknown: write unknown. Append path, date, and what it is to `vault/sources/README.md`. Do not commit. No credential, connection id, or prospect row in the interview or a tracked file.

Positioning they stated may go in `brand.local/identity.md`. `Status: filled` only when every required section is theirs.

Who posts are for, their problem, and their phrases: `audience.local/ideal-follower.md`. If missing, copy `audience/ideal-follower.md` and edit the copy. Leave qualifying-test answers empty and `Status: blank` until owed sections are filled. The reader stays in `audience.local` and is not a Company Context page. Buyer facts stay on Ideal Customer. Who pays, the company, and the purchase, plus buyer phrases: Ideal Customer. Reader phrases stay in the follower file.

Product Information only if the interview or they say that page is missing. If it exists, leave it. New offer facts stay on the interview. Goal, repeated subject, reader next step, and cadence stay on the interview. No pillars, topic rows, cards, or board. Do not schedule.

Accepted samples: `vault/voice/`, uncommitted. Rules they stand behind (person, sentence length, refused words, close) go on Tone of Voice. Five-pair card: `voice-card`.

Type, color, pictures: only supplied values in `brand.local/style.md`, `brand.local/tokens.css`, or `brand.local/assets/`. Do not draw a face.

Only the owner sets `Status: filled`. Unknown public use stays off public copy and off Proof. A Proof metric needs definition, unit, period, source, and a public yes. Else it stays on the interview.

`whoami` before the first write. More than one workspace: ask which and stop. `tools_get` `knowledge.brain.context.compose_pages`, then `tools_run`. Schema wins. Not found: stop. Invent no arguments. No page-read id is in `docs/tool-map.md`. Record: interview, what they just said, receipt. Poll `runs_get` on a run id.

Include Ideal Customer, Proof, and Tone of Voice when evidence exists. Product Information only if missing. Each page needs `source_url` or `provenance_note` (a `vault/sources/` path, or that they dictated it). Omit a page with neither. No wiki heading, bracket link, or paste into the repo.

Do not call `knowledge.vault.ingest` for these pages. It needs `title` and `markdown`, refuses a blank `idempotency_key`, and always creates a new note. A new key duplicates it.

Gates on `tools_run`, outside `params`: `mode`, `max_credits`, `idempotency_key`, `quote_hash`, `approved`. `dry_run` first. Show credit estimate, `quote_hash`, and full page text. Wait. The yes must match. Live repeats `quote_hash`, sets `max_credits` to that ceiling (`0` only when the quote is `0`), and sends a new `idempotency_key`. `approved: true` only after yes, and only if the fetched contract or `AGENTS.md` requires it. A refused quote is a price. Do not retry.

Live revises existing Ideal Customer, Proof, or Tone of Voice, not an existing Product Information page. Unseen page: paste before dry_run so sourced lines stay. Read the receipt. Report id and revision. If compose cannot run, pages were not written; keep the raw folder.

The only Dreamstate write is that compose, after the yes. This skill does not search, fetch, enrich, watch, publish, schedule, enroll, or send. No server, worksheet, or posts database. A capture yes does not cover those.

Name changed pages with id and revision, and each local path. Leave questions that change public wording blank under Open in `vault/intake/interview.md`.
