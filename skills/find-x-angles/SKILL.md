---
name: find-x-angles
description: "Turn posts the owner pasted, or a Dreamstate read that returns them, into sourced angles. Use for a niche scan. It does not require a new X login and does not invent reach."
---
# Find X angles

Turn pasted posts, or a Dreamstate read that returns them, into sourced angles. Follow `docs/skill-frame.md`.

## Use when

- The owner wants a niche scan from posts they pasted, or from a Dreamstate read that returns them.

- Not for a new X login, and not for inventing reach.

- Not for the reply (`draft-x-replies`) or the draft (`write-x-post`, `plan-x-week`).

## Steps

1. Treat reach as attention, and work the loop in order (`references/ground.md`). Cite the page you read.

2. Read the brand files and `audience.local/ideal-follower.md` (`references/ground.md`). Stop if identity, voice, or the follower file is missing or `Status: blank`.

3. Map every pillar in `vault/notes/pillars.md` before a wide scan (`references/ground.md`).

4. Keep a pasted post a lookup, and start discovery with two or three queries inside the last 7 days (`references/width.md`).

5. Read cheapest first, then call `visibility.radar.inspiration_x_list` (`references/read.md`). Call `tools_get` before `tools_run`.

6. Resolve `source.x_posts_search` with `tables.executable_definitions.list_resolved`, then attach with `tables.table_sources.attach` (`references/sources.md`). Run `tables.table_sources.run` only after the quote and the owner's yes.

7. Wait for a quote and a yes before `visibility.research.web_search` or `visibility.research.urls_fetch` (`references/sources.md`).

8. Leave `tables.x_post_engagers.run` and `visibility.linkedin.engagement_harvest` out of this scan (`references/sources.md`).

9. If a call fails, stop (`references/sources.md`). Do not loop on `whoami`, and do not start a monitor.

10. Turn the set into rows and keep each metric separate (`references/set.md`).

11. Save the rows you hold and run `python3 skills/find-x-angles/scripts/hold_median.py` (`references/outlier.md`).

12. Lead with a short recommendation and name the sample size and the window (`references/brief.md`).

13. Write watch rows only from posts you opened and names the owner chose (`references/watch.md`).

14. Do not schedule, publish, reply, send a DM, follow, or like (`references/keep.md`). Do not call `sequence.x.auto_engagements.replace`.

15. When they want the scan kept, write `vault/notes/<date>-x-<topic>.md` (`references/keep.md`).

16. When they ask for copy, hand the brief to `write-x-post` or `plan-x-week` (`references/drafts.md`).

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 5 | `tools_get` | read | no |
| 5 | `tools_run` | live | yes |
| 5 | `visibility.radar.inspiration_x_list` | live | yes |
| 6 | `source.x_posts_search` | definition id | no |
| 6 | `tables.executable_definitions.list_resolved` | read | no |
| 6 | `tables.table_sources.attach` | live | yes |
| 6 | `tables.table_sources.run` | live | yes |
| 7 | `visibility.research.web_search` | live | yes |
| 7 | `visibility.research.urls_fetch` | live | yes |
| 8 | `senders.social_accounts.list` | read | no |
| 8 | `tables.x_post_engagers.run` | not this scan | yes |
| 8 | `visibility.linkedin.engagement_harvest` | never | n/a |
| 9 | `whoami` | read | no |
| 14 | `sequence.x.auto_engagements.replace` | never | n/a |
| 14 | `social.feeds.create` | dry_run, then live | yes |

## Stop rules

- Follow the skill-frame writing rules.

- A large number does not make a claim true, and it does not prove a signup.

- If identity, voice, or the follower file is missing or still `Status: blank`, stop and ask.

- Do not invent the reader.

- Never attribute another person's result to the owner.

- Do not widen a pasted post or a narrow question into a scan.

- Do not claim a thread is complete when the parent is outside that window or the page stopped early.

- Sending dry_run to `visibility.radar.inspiration_x_list` still executes the read. Say that it was a read.

- Do not treat that mode as a preview that fetched nothing.

- Do not walk every page on your own.

- Do not paste a browser query into the radar call and expect the same filter.

- `source.x_posts_search` is a definition id, not a `tools_run` id.

- Run `tables.table_sources.run` only after the quote and the owner's yes.

- A quote is not a yes.

- Do not call `visibility.linkedin.engagement_harvest` to answer an X question.

- If a call fails, stop.

- Do not loop on `whoami`.

- Do not start a monitor.

- Do not write zero in place of a missing view count.

- Do not divide another metric by views when views are missing or that returned zero.

- Do not explain performance from a median you did not compute.

- Do not present their screenshot as the owner's work.

- A public count is not a signup and not revenue.

- Do not create that list in another workspace.

- Do not import a list you found elsewhere.

- Do not follow anyone.

- Do not overwrite their status or their notes.

- This skill does not write that reply.

- This skill does not schedule, publish, reply, send a DM, follow, or like.

- Do not call `sequence.x.auto_engagements.replace`.

- A repeating refresh is not a loop you start here.

- Live `social.feeds.create` needs `approved: true` because it is a recurring trigger.

- Pass `account_urls` or `keyword`, never both.

- Do not add the scan to `vault/board.md`.

- Do not paste credentials or a large raw payload into the chat.

- A scan is not a draft.

- No invented scene, no stock slogan, and no call to action they did not ask for.
