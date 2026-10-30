# The bar

The rules live in `docs/viral-bar.md`. This page is how the scan applies them.

1. Hold every candidate to the bar: 200 or more likes, or 10,000 or more views. A missing view count is unknown, so that post has to clear on likes.
2. For each author that cleared, read their recent originals (aim for 20 to 50, at least 10) and save them to a history file.
3. From the repo root run `python3 skills/find-x-angles/scripts/viral_bar.py <candidates.json> --history <author-posts.json>`. It returns each post's bar result, the author average of likes plus bookmarks, the sample size, the multiple, and a tier.
4. Rank in the order the script returns: 5 to 10 times first, then over 10 times (check for a large repost before you explain it), then under 5 times, then unknown.
5. Split the set in two:
   - Format rows. Any niche. You keep the hook shape, the structure, and the length. Never a sentence.
   - Target rows. Accounts in the owner's space only: pillars in `vault/notes/pillars.md`, the reader in `audience.local/ideal-follower.md`, and watch rows the owner chose. These feed `draft-quote-reposts` and `draft-x-replies`.
6. A post under the bar can stay as a reader note for language or a question. Label it so. It is not inspiration.
