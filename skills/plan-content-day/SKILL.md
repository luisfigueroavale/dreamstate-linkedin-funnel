---
name: plan-content-day
description: "Draft a short phone-friendly plan for today: 1 ready X post, 3 quote reposts, 3 to 5 replies, each with a tap-to-post link, and one LinkedIn idea tagged reach, belief, or signup. Monday adds 3 voice-note prompts. It also turns an idea or voice note into X and LinkedIn drafts. Use for the daily plan. It does not schedule or post."
---
# Plan a content day

Draft one short plan for today that the owner can act on from a phone. Follow `docs/skill-frame.md`.

## Use when

- The owner wants today's plan, or setup drafts the first one.

- The owner sends an idea or a voice note and wants posts from it.

- Not for a full week of pieces (`plan-content-week`) or an X slate (`plan-x-week`).

## Steps

1. Read the brand files and `audience.local/ideal-follower.md`, and stop if identity, voice, or the follower file is missing or `Status: blank` (`references/read.md`).

2. Read what moved in the owner's space in the last 72 hours through `find-x-angles` (`references/read.md`).

3. Draft 1 ready X post with `write-x-post` from the strongest angle the owner's evidence can carry (`references/shape.md`).

4. Take 3 quote reposts from `draft-quote-reposts` (`references/shape.md`).

5. Draft 3 to 5 replies with `draft-x-replies` on in-space posts that clear `docs/viral-bar.md` (`references/shape.md`).

6. Build every tap-to-post link with `node scripts/intent-link.mjs`, using `--reply-to` for each reply (`references/shape.md`).

7. Add one LinkedIn post idea tagged reach, belief, or signup from `vault/notes/funnel-stages.md` (`references/shape.md`).

8. Run `docs/ai-tells.md` and the banned words over every line before hand-off (`references/shape.md`).

9. Write the plan to `work/plans/<date>-day.md` and hand back the path and the plan (`references/shape.md`).

10. On Monday, add the week view and 3 voice-note prompts (`references/monday.md`).

11. When the owner sends an idea or a voice note, turn it into X and LinkedIn drafts with `write-x-post` and `write-linkedin-post` (`references/voice-note.md`).

12. Do not schedule, post, or create a routine (`references/routine.md`). A daily routine needs the owner's yes and a reason.

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 2 | `visibility.radar.inspiration_x_list` | read | no |

Never call: `sequence.x.auto_engagements.replace`, `social.content.schedule`.

Public X reads, read-only, when the host has them: `search_posts_all`, `get_users_posts`, `get_posts_counts_recent`, `get_trends_by_woeid` (`docs/tool-map.md`).

## Stop rules

- Follow the skill-frame writing rules.

- The owner posts every line in the plan.

- Never post, repost, like, follow, or DM through any tool.

- Do not call `social.content.schedule` or `sequence.x.auto_engagements.replace`.

- A plan is not a schedule, and a day mark is not a schedule.

- Do not create a routine or a recurring trigger without the owner's yes on that routine.

- A quote or reply target outside the owner's space is not a target.

- Do not invent an anecdote, a customer story, or a number.

- Never present someone else's result as the owner's.

- Do not write a count the read did not return. Missing is not zero.

- A voice note is the owner's words. Do not add claims they did not say.

- Keep the plan short. If it does not fit one phone screen per section, cut it.
