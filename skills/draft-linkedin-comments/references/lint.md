# Lint

Lint every draft at 200 characters before it can reach the page. The older ceiling of 450 characters ("1 point, not a mini post") does not raise this 200-character stop.

## Lint

Run `node scripts/queue-lint.mjs work/draft-linkedin-comments/<YYYY-MM-DD>-<HHMM>z.json` before the page is written. The profile is linkedin. Lengths, openers, banned words, pitches, stock lines, and batch rules are `scripts/queue-rules.json`. Read that file's `review` list and fix those shapes before you run the command. The command does not detect them.

`scripts/queue-page.mjs` writes the page only after lint passes, and a lint failure does not write the file. Exit 0 stamps `lint` as `pass`. Do not set that field yourself. The page renders no cards unless the payload carries that stamp. Add words they never use under `## Banned words` in `brand.local/voice.md`, or as `banned_words` on the run.

A null `company` skips the company-name check. The older 450-character ceiling does not raise the 200-character stop.
