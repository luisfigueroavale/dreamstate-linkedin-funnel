---
name: draft-linkedin-comments
description: "Draft a local queue of comments on other people's LinkedIn posts. Use when the owner wants replies drafted. They post each one, or they say yes on that exact text. It does not comment, like, follow, connect, or message on its own."
---

# Draft LinkedIn comments

Draft a local queue of comments on other people's LinkedIn posts. Follow `docs/skill-frame.md`.

## Use when

- The owner wants replies drafted on other people's LinkedIn posts.

- They post each one, or they say yes on that exact text.

- Not for a file handed out after a keyword comment (`send-lead-magnet`), and not for replies under the owner's own posts.

## Steps

1. If `brand.local/voice.md` has no comment rules yet, measure and ask before the first batch (`references/learn.md`).

2. If `work/draft-linkedin-comments/` already has a run, start from the newest file (`references/learn.md`).

3. Ask (`references/cadence.md`).

4. Run with `source.account_posts_linkedin_profile` and `source.linkedin_posts_search` and `tables.executable_definitions.list_resolved` (`references/calls.md`).

5. Bind sources with `tables.table_sources.attach`, then dry-run `tables.table_sources.run` and go live only after yes (`references/calls.md`, `references/fetch.md`).

6. Fetch (`references/fetch.md`).

7. Read with `visibility.radar.inspiration_linkedin_list` (`references/calls.md`). Do not send dry_run.

8. Take with `senders.linkedin_accounts.list` (`references/calls.md`).

9. Fit stays a human call (`references/score.md`).

10. Pick 10 to 12 (`references/pick.md`). Do not pad with old posts.

11. Read picked threads with `social.linkedin_posts.comments_list` (`references/thread.md`).

12. Refresh with `social.linkedin_posts.get` (`references/thread.md`).

13. Check the author and the proof before you write (`references/receipt.md`).

14. Write one move per draft (`references/draft.md`).

15. A non-zero exit means do not write the page (`references/lint.md`).

16. Save the run and render the page with `scripts/queue-page.mjs` (`references/page.md`).

17. Hand (`references/page.md`).

18. Post with `social.engagement.comment` (`references/calls.md`).

19. Use with `social.posts.comment_publish` (`references/calls.md`).

20. React with `social.engagement.react` only when they named that reaction (`references/calls.md`).

21. Create a feed with `social.feeds.create` only when they have accepted that recurring trigger (`references/calls.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 4 | `tables.executable_definitions.list_resolved` | live | no |
| 4 | `source.account_posts_linkedin_profile` | definition id | no |
| 4 | `source.linkedin_posts_search` | definition id | no |
| 5 | `tables.table_sources.attach` | read | no |
| 5 | `tables.table_sources.run` | dry_run, then live | yes |
| 7 | `visibility.radar.inspiration_linkedin_list` | read | no |
| 8 | `senders.linkedin_accounts.list` | read | no |
| 11 | `social.linkedin_posts.comments_list` | read | no |
| 12 | `social.linkedin_posts.get` | read | no |
| 18 | `social.engagement.comment` | smoke_test | no |
| 18 | `social.engagement.comment` | live | yes |
| 19 | `social.posts.comment_publish` | dry_run, then live | yes |
| 20 | `social.engagement.react` | smoke_test | no |
| 20 | `social.engagement.react` | live | yes |
| 21 | `social.feeds.create` | dry_run, then live | yes |

Never call: `sequence.linkedin.auto_engagements.replace`, `sequence.x.auto_engagements.replace`.

## Stop rules

- Follow the skill-frame writing rules.

- The owner posts the comment, or says yes on that exact text.

- A yes on different wording is a new yes.

- This skill does not comment, like, follow, connect, or message on its own.

- Never call `sequence.linkedin.auto_engagements.replace`.

- Never call `sequence.x.auto_engagements.replace`.

- A file handed out after a keyword comment is `send-lead-magnet`, not this queue.

- `tools_get` before every `tools_run`. The fetched schema wins.

- Pass `binding_spec` or `binding`, never both.

- Run `tables.table_sources.run` only after the quote and a yes.

- Live `social.feeds.create` needs `approved: true` because it is a recurring trigger.

- Pass `account_urls` or `keyword`, never both.

- Do not send dry_run to `visibility.radar.inspiration_linkedin_list`, because that request executes the read.

- Do not send dry_run to `social.linkedin_posts.get`.

- Do not send dry_run to `social.linkedin_posts.comments_list`. Say that it was a read.

- Live `social.engagement.comment` needs `approved: true`, an `idempotency_key`, and yes on that exact text.

- Do not use `social.posts.comment_publish` to fill the queue.

- Do not retry `social.posts.comment_publish` when the outcome is unknown.

- `social.posts.comment_publish` runs only from an approved durable run step, or the call returns 409 `durable_run_step_required`.

- Do not react unless they named that reaction.

- `social.engagement.react` has no dry_run. Live needs `approved: true`, an `idempotency_key`, and yes on that reaction.

- Replies under the owner's own posts stay off this queue.

- Do not paste their comment into the repo.

- Show the measured shape and wait, then show the watchlist and wait, before the first batch.

- Never include the owner.

- Never include a profile already watched.

- Stop before a call that would pass the credit ceiling.

- If reading their own comments fails, continue, and do not pretend those reads succeeded.

- Skip a post with no receipt.

- Do not keep a post older than 6 hours unless it names the owner.

- Do not pad with old posts.

- No hit means no shared moment. Do not invent one.

- No invented anecdote, feeling, client, number, or plan.

- No claim that a product has a feature which is not live.

- The older ceiling of 450 characters does not raise this 200-character stop.

- Also refuse a draft over 70 words.

- A non-zero exit means do not write the page.

- Do not set the `lint` field yourself.

- Do not download remote images and do not embed them.

- No text from the read means no card.

- Hitting the credit ceiling stops further thread reads.

- The draft does not quote the thread back.
