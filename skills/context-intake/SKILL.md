---
name: context-intake
description: "Turn the owner's notes into Company Context pages: Ideal Customer, Proof, and Tone of Voice, plus Product Information when it is missing. Use when the pages are empty or wrong. The reader stays in audience.local. It does not invent claims."
---

Follow `docs/skill-frame.md`.

Pages to compose: Ideal Customer, Proof, Tone of Voice, and Product Information only when that page is missing. The reader is not a Company Context page. Keep every raw file under `vault/sources/` and append one index line to `vault/sources/README.md` (path, date, what it is). Unanswered questions go to `vault/intake/interview.md` and stay blank. `knowledge.brain.context.compose_pages`: dry_run, show the quote, wait, then live with `quote_hash`, `max_credits`, and `idempotency_key`. Each page needs `source_url` or `provenance_note`. Do not use `knowledge.vault.ingest` for these pages. A second ingest with a new key duplicates the note.
