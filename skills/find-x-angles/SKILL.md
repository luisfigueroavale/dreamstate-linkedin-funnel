---
name: find-x-angles
description: "Turn live public X reads, posts the owner pasted, or a Dreamstate read into sourced angles that clear the viral bar. Use for a niche scan or the first read at setup. It does not require a new X login and does not invent reach."
---
# Find X angles

Turn live public X reads, pasted posts, or a Dreamstate read into sourced angles that clear the viral bar. Follow `docs/skill-frame.md`.

## Use when

- The owner wants a niche scan from live public X reads, posts they pasted, or a Dreamstate read that returns them.

- Setup runs it once for the first read of what is moving in the owner's space.

- Not for a new X login, and not for inventing reach.

- Not for the reply (`draft-x-replies`) or the draft (`write-x-post`, `plan-x-week`).

## Steps

1. Treat reach as attention, and work the loop in order (`references/ground.md`). Cite the page you read.

2. Read the brand files and `audience.local/ideal-follower.md` (`references/ground.md`). Stop if identity, voice, or the follower file is missing or `Status: blank`.

3. Map every pillar in `vault/notes/pillars.md` before a wide scan (`references/ground.md`).

4. Keep a pasted post a lookup, and start discovery with two or three queries inside the last 7 days (`references/width.md`).

5. Read live with the public X reads the host already has, then the browser, before the radar read (`references/live.md`). Pasted posts alone are not a scan.

6. Read cheapest first, then call `visibility.radar.inspiration_x_list`, and call `tools_get` before `tools_run` (`references/read.md`).

7. Resolve `source.x_posts_search` with `tables.executable_definitions.list_resolved`, then attach with `tables.table_sources.attach`, and run `tables.table_sources.run` only after the quote and the owner's yes (`references/sources.md`).

8. Wait for a quote and a yes before `visibility.research.web_search` or `visibility.research.urls_fetch` (`references/sources.md`).

9. Do not call `tables.x_post_engagers.run` or `visibility.linkedin.engagement_harvest` in this scan (`references/sources.md`).

10. If a call fails, stop (`references/sources.md`). Do not loop on `whoami`, and do not start a monitor.

11. Turn the set into rows and keep each metric separate (`references/set.md`).

12. Hold every candidate to the bar in `docs/viral-bar.md`, and keep a post under the bar only as a reader note (`references/bar.md`).

13. Read each cleared author's recent originals and run `python3 skills/find-x-angles/scripts/viral_bar.py` so posts at 5 to 10 times the author's average rank first (`references/bar.md`).

14. Take hooks and formats from any niche, and keep quote and reply targets to accounts in the owner's space (`references/bar.md`).

15. Save the rows you hold and run `python3 skills/find-x-angles/scripts/hold_median.py` (`references/outlier.md`).

16. Lead with a short recommendation and name the sample size and the window (`references/brief.md`).

17. Cite the source post link and its counts on every angle (`references/brief.md`).

18. Write watch rows only from posts you opened and names the owner chose (`references/watch.md`).

19. Do not schedule, publish, reply, send a DM, follow, or like, and never call `sequence.x.auto_engagements.replace` (`references/keep.md`).

20. When they want the scan kept, write `vault/notes/<date>-x-<topic>.md` (`references/keep.md`).

21. When they ask for copy, hand the brief to `write-x-post` or `plan-x-week` (`references/drafts.md`).

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 6 | `visibility.radar.inspiration_x_list` | read | no |
| 7 | `source.x_posts_search` | definition id | no |
| 7 | `tables.executable_definitions.list_resolved` | read | no |
| 7 | `tables.table_sources.attach` | write | no |
| 7 | `tables.table_sources.run` | dry_run, then live | yes |
| 8 | `visibility.research.web_search` | live | yes |
| 8 | `visibility.research.urls_fetch` | live | yes |
| 9 | `senders.social_accounts.list` | read | no |
| 10 | `whoami` | read | no |
| 19 | `social.feeds.create` | dry_run, then live | yes |

Never call: `sequence.x.auto_engagements.replace`, `tables.x_post_engagers.run`, `visibility.linkedin.engagement_harvest`.

Public X reads, read-only, when the host has them: `search_posts_all`, `get_users_posts`, `get_posts_quoted_posts`, `get_posts_counts_recent`, `get_trends_by_woeid` (`docs/tool-map.md`).

## Stop rules

- Follow the skill-frame writing rules.

- A large number does not make a claim true, and it does not prove a signup.

- A post under `docs/viral-bar.md` is not inspiration.

- Do not write an author multiple you did not compute, or one from fewer than 10 of that author's posts.

- A quote or reply target outside the owner's space is not a target.

- Never post, like, repost, follow, or DM through an X read tool.

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
