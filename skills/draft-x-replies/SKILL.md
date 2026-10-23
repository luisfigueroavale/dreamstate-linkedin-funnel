---
name: draft-x-replies
description: "Draft a bounded queue of short X replies from stored posts and anything the owner pasted. Use for the daily reply round. The owner posts each reply, unless a fetched contract shows that account can take one exact public reply they approved."
---
# Draft X replies

Draft a bounded queue of short X replies.
Follow `docs/skill-frame.md`.

## Use when

- The owner wants the daily reply round, from stored posts and anything they pasted.

- The owner posts each reply, unless a fetched contract shows that account can take one exact public reply they approved.

- Not for own posts (`write-x-post`, `plan-x-week`), a niche scan (`find-x-angles`), or LinkedIn comments (`draft-linkedin-comments`).

## Steps

1. Fill blank list files with the owner before the first drafts, and stop while one is `Status: blank` (`references/lists.md`).

2. Fetch `senders.social_accounts.list` with `tools_get` before `tools_run`, and let the fetched schema win (`references/calls.md`).

3. Ask when their targets are online (`references/cadence.md`).

4. Read candidates with `visibility.radar.inspiration_x_list` (`references/enter.md`).

5. Score the posts that clear the gates (`references/score.md`).

6. Keep a pick only when all four answers are yes (`references/pick.md`).

7. Read the thread for a pick with 5 or more replies using `tables.x_post_engagers.run`, and live only after yes (`references/thread.md`).

8. Read the brand files, `references/verdicts.md`, and `taste.json` before writing (`references/draft.md`).

9. Write one reply per post (`references/draft.md`).

10. Lint the run with `node scripts/queue-lint.mjs` before the page is written (`references/page.md`).

11. Render the page only after lint exits 0 (`references/page.md`).

12. Hand back the page path, the count, and the 2 or 3 to send first (`references/cadence.md`).

13. Post one reply with `social.engagement.comment` only when the fetched contract allows that exact text (`references/calls.md`). Otherwise the owner posts the draft.

14. Preview a reaction with `social.engagement.react` only when the contract covers this account, because live needs yes on that reaction (`references/calls.md`).

15. Judge sent replies before the next fetch (`references/learn.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 2 | `senders.social_accounts.list` | read | no |
| 4 | `visibility.radar.inspiration_x_list` | read | no |
| 7 | `tables.x_post_engagers.run` | smoke_test | no |
| 7 | `tables.x_post_engagers.run` | live | yes |
| 13 | `social.engagement.comment` | smoke_test | no |
| 13 | `social.engagement.comment` | live | yes |
| 14 | `social.engagement.react` | smoke_test | no |
| 14 | `social.engagement.react` | live | yes |

Never call: `sequence.x.auto_engagements.replace`.

## Stop rules

- Follow the skill-frame writing rules.

- The owner posts every reply.

- A blanket go-ahead is not approval of a reply.

- Never call `sequence.x.auto_engagements.replace`.

- This skill does not follow anyone and does not send a DM.

- Do not send dry_run to `visibility.radar.inspiration_x_list`, because that request executes the read.

- Do not send dry_run to `tables.x_post_engagers.run`, because that request runs live.

- Live `tables.x_post_engagers.run` only after yes.

- A public reply uses `social.engagement.comment` only after `tools_get` shows that account can take it.

- Otherwise the owner posts the draft.

- Live `social.engagement.comment` needs `approved: true`, an `idempotency_key`, and yes on that text.

- Do not aim a contract that only describes another platform at an X post.

- `social.engagement.react` has no dry_run.

- Skip `social.engagement.react` when the fetched contract does not cover this X account.

- Live `social.engagement.react` needs `approved: true`, an `idempotency_key`, and yes on that reaction.

- Never send a reply that invents an anecdote, a customer story, or a number.

- Never present someone else's result as the owner's, and never claim a tool they have not used.

- Never pitch, never drop a booking link, never say DM me, and never say check out the product.

- A non-zero lint exit means do not write the page.

- Do not set the `lint` field yourself.

- Do not invent a metric to fill a hole.

- If they have not pasted the sent text and no fetched contract returned it, say so and do not invent the verdicts.

- A like the platform will not return is missing, and missing is not zero.
