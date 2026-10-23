# Lint and page

Run `node scripts/queue-lint.mjs work/draft-x-replies/<YYYY-MM-DD>-<HHMM>z.json --profile x` before the page is written.

Lengths, line breaks, openers, banned words, stock shapes, and product brags are `scripts/queue-rules.json`. Read that file's `review` list and fix those shapes before you run the command.

A non-zero exit means do not write the page. Run `scripts/queue-page.mjs` to write the page only after lint passes, and a lint failure does not write the file.

Exit 0 stamps `lint` as `pass`. Do not set that field yourself. The page renders no cards without it.

Add words they never use under `## Banned words` in `brand.local/voice.md`, or as `banned_words` on the run. A company name fails except the one receipt exception above, and never past 1 reply in 10.

A null company skips that check. Each taste block is a pattern plus a why, learned from skips. A match fails.

`references/queue.html` is the page. Run `scripts/queue-page.mjs` with the run file, `references/queue.html`, and `work/draft-x-replies/<run-id>.html`, and pass `--profile x`.

The payload's `picks` array is what the page renders (`items` still renders if present). Put the note time in `updated` or `pulled_at`.

The page is one column. It sorts newest first. Each card shows the name, the handle, the text, likes, replies, follower count, and a circle chip when `circle` is true.

An avatar or a post image renders only from bytes already in the payload. The reply box grows with the text. The count warns over 200.

Skip, Copy, and Reply on X (the composer opens with the text filled in and the card marks done). Undo brings it back. Edits and skip or done marks stay in the browser.

The footer says nothing is sent until the owner posts it.

Before rendering, re-read the same handles and refresh counts, text, name, and followers. A post the new read no longer returns is dropped.

Save the run as `work/draft-x-replies/<YYYY-MM-DD>-<HHMM>z.json`. Include an id, the time it was pulled, the start of the window, how many handles were in play, how many candidates survived, the picks (each with its angle, its why, and its draft), and a short list of near misses.
