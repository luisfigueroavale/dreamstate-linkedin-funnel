# Save and hand over

## Save and hand over

Write `work/draft-linkedin-comments/<YYYY-MM-DD>-<HHMM>z.json` in UTC. Store `errors`, `skipped_top`, `items`, `credits_used`, `candidates_total`, `watchlist_profiles`, `window_start`, `fetched_at`, and `run_id`. Each item keeps the candidate fields plus `angle`, `why`, and `drafts` as a list of `move`, `label`, and `text`.

A draft that uses a story also stores `ref` and `ref_source` as the source path, not a second copy of a sentence they typed over your draft. `skipped_top` is the high scores you left out, with the reason. `work/` is gitignored.

Run `scripts/queue-page.mjs` with the run file, `skills/draft-linkedin-comments/queue.html`, and the page under `work/draft-linkedin-comments/`. Use one column. Put the freshest post first. Each card shows name, headline, age, text, and counts, then the comment in a box that grows, a word count, a character count against the 200-character lint, and the personal moment with its source path.

Controls are Skip, then Copy, then a control labeled Copy & open. That last control puts the text on the clipboard, opens the post in a new tab, and marks the card done. Skip asks why, in one tap. Edits and marks stay in that browser.

Footer line: nothing is sent until the owner posts it, or says yes on that exact text. Do not download remote images and do not embed them. No text from the read means no card.

Keep the handover to two lines. Give the count. Name the 2 or 3 that will go stale first, and tell them to do those before the rest.
