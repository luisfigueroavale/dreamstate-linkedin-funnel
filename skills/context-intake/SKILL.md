---
name: context-intake
description: "Turn the owner's notes into Company Context pages: Ideal Customer, Proof, and Tone of Voice, plus Product Information when it is missing. Use when the pages are empty or wrong. The reader stays in audience.local. It does not invent claims."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# File the pages

Call `workspace-check`. Read `docs/company-context.md` and `docs/calls.md`.

## Write

1. Ask only for facts the owner has not already put in `brand.local/identity.md`, `brand.local/voice.md`, or a file in `vault/sources/`.
2. `tools_get` `knowledge.brain.context.compose_pages`. Dry run. Show the markdown. Wait for a yes. Then live, with `quote_hash`, `max_credits`, and `idempotency_key` when the schema requires them.
3. Every page needs `source_url` or `provenance_note`. Proof lines they did not supply stay out.
4. Read the pages back. Report id and revision from the receipt. An unchanged read is not a write.
5. Point `brand.local/identity.md` at those page names only after the owner agrees. Do not mark it filled unless they say so.
6. Do not write the reader into Company Context. The reader is `audience.local/ideal-follower.md`. If that file is missing, copy the template and stop until the owner fills it.

Do not call `knowledge.vault.ingest` (to-check, and a repeat duplicates the note).

## Done

Page titles, ids, revisions, and any section still empty.
