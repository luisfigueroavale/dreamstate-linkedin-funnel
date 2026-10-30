---
name: draft-quote-reposts
description: "Draft 3 quote reposts a day on recent posts in the owner's space that clear the viral bar, each with the source link, its counts, the quote text, and a tap-to-post link. Use for the daily quote round. The owner posts each one. It never posts."
---
# Draft quote reposts

Draft 3 quote reposts on recent in-space posts that clear the viral bar. Follow `docs/skill-frame.md`.

## Use when

- The owner wants today's quote reposts, alone or inside `plan-content-day`.

- Not for plain replies (`draft-x-replies`), own posts (`write-x-post`), or a niche scan (`find-x-angles`).

## Steps

1. Read the brand files and `audience.local/ideal-follower.md`, and stop if identity, voice, or the follower file is missing or `Status: blank` (`references/read.md`).

2. Take target rows from today's `find-x-angles` read, or read in-space accounts live with the public X reads the host has (`references/pick.md`).

3. Keep a post only when it is from the last 72 hours, clears `docs/viral-bar.md`, and comes from an account in the owner's space (`references/pick.md`).

4. Pick 3, at most one per author, in the order the viral bar script ranks them (`references/pick.md`). Fewer is fine when fewer clear.

5. Write each quote in the owner's voice, adding one point the owner's own evidence can carry (`references/write.md`).

6. Run `docs/ai-tells.md` and the banned words over every quote before hand-off (`references/write.md`).

7. Build each tap-to-post link with `node scripts/intent-link.mjs` using the quote text and the source link (`references/links.md`).

8. Hand back each item with the source link, its counts, the quote text, and the link, and save them to `work/plans/<date>-quotes.md` (`references/links.md`).

9. Leave posting to the owner, and do not repost, like, follow, or DM (`references/links.md`).

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 2 | `visibility.radar.inspiration_x_list` | read | no |

Never call: `sequence.x.auto_engagements.replace`.

Public X reads, read-only, when the host has them: `search_posts_all`, `get_users_posts`, `get_posts_quoted_posts` (`docs/tool-map.md`).

## Stop rules

- Follow the skill-frame writing rules.

- The owner posts every quote.

- Never post, repost, like, follow, or DM through any tool.

- Do not call `sequence.x.auto_engagements.replace`.

- A post under `docs/viral-bar.md` is not a quote target.

- An account outside the owner's space is not a quote target, however big the post.

- Do not quote a post you did not open at the source.

- Do not invent an anecdote, a customer story, or a number.

- Never present someone else's result as the owner's.

- Never pitch, never drop a booking link, and never say DM me.

- Do not write a count or a multiple the read or the script did not return.

- A missing count is unknown, not zero.
