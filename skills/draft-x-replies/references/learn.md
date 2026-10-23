# Learn

Do this before the next fetch. Use replies the owner actually sent. A click on the page is not that evidence.

Compare each earlier draft with the sent text after stripping leading @ mentions. Same text means posted as drafted. Different text means posted with edits. No sent text means not posted.

When a sent reply exists and that account is in the talker set, note that they talked back. When that sent reply has public counts, store them beside the verdict. Unknown counts stay blank.

When the whole pass has zero sent replies, log a missed window. Do not treat those drafts as rejects. Skip judgment when the run is under 30 minutes old, or older than 6 days.

Judge each draft once, even if a later run carried the same post. When merging a new paste, include sends from one hour before `updated_at` so a boundary reply is kept.

`taste.json` stores `updated_at`, `drafts_judged`, `posted`, `posted_ids`, per-account `shown` and `posted`, `by_age`, and `by_angle`.

Age buckets are under 15 minutes, 15 to 60 minutes, 1 to 3 hours, and over 3 hours. Angles use the seven names above.

The short report names who they answer (up to 15, highest posted count first) and who they keep skipping (`shown` at least 2 and `posted` still 0).

Write what that comparison teaches into `references/verdicts.md` before drafting again. A pattern seen twice becomes a voice rule in `brand.local/voice.md`.

An edit they make becomes a voice rule, not a stored copy of their sentence. Their edits are the strongest signal in the ledger.

Own posts are `write-x-post` and `plan-x-week`. A niche scan is `find-x-angles`. LinkedIn comments are `draft-linkedin-comments`.
