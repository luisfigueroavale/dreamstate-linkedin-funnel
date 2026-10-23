---
name: plan-x-week
description: "Plan X posts with the owner for the next 7 days from three lanes: adapted LinkedIn pieces, angles from posts they can show, and launches they already have. Use for an X slate, or for one post when they only want today. It does not post."
---
# Plan an X week

Plan X posts with the owner for the next 7 days from three lanes. Follow `docs/skill-frame.md`.

## Use when

- Use for an X slate, or for one post when they only want today.

- The lanes are adapted LinkedIn pieces, angles from posts they can show, and launches they already have.

- `plan-content-week` owns the video post, including the short note that the video is up, and the X essay. Other X posts come from here.

- Replies on someone else's post are `draft-x-replies`.

- It does not post.

## Steps

1. Call `whoami` before the first write or the first spend, and if it returns two or more workspaces, ask which and stop (`references/calls.md`).

2. Call `tools_get` before every `tools_run`, and the fetched schema wins (`references/calls.md`).

3. Read every `vault/week/*-x-verdicts.md`, oldest first (`references/window.md`).

4. Call `social.content.artifact_list` for the window (`references/window.md`).

5. Search the vault with `search-vault` (`references/window.md`).

6. Call `visibility.analytics_query` after `tools_get`, and read the stored snapshot (`references/pattern.md`).

7. Build lane A from one LinkedIn piece (`references/lane-a.md`).

8. Read posts they can show, from a paste or from `visibility.radar.inspiration_x_list` (`references/lane-b.md`).

9. Follow `find-x-angles` for `source.x_posts_search`, and get a quote and the owner's yes before the run (`references/lane-b.md`).

10. Call `visibility.research.urls_fetch` before a news claim enters the slate (`references/news.md`).

11. Call `visibility.research.web_search` when that page is not in hand (`references/news.md`).

12. Ask once what is launching for lane C (`references/lane-c.md`).

13. When they only want today, write one post and skip the slate (`references/today.md`, `references/write.md`).

14. Otherwise slate about 1.5 times the slots, and take the first line from `references/write.md` (`references/slate.md`).

15. After they pick, draft those posts (`references/write.md`).

16. Save each post as `vault/posts/<slug>.md` (`references/save.md`).

17. Call `social.content.artifact_create` when they ask to store a pick (`references/save.md`).

18. Call `social.content.plan` only when they asked for the day mark (`references/save.md`).

19. Call `social.content.schedule` only after yes on that text, that media, and that time (`references/save.md`).

20. Call `social.content.approve` on that version (`references/save.md`).

21. Append rows to `vault/week/<date>-x-verdicts.md` (`references/verdicts.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 1 | `whoami` | read | no |
| 4 | `social.content.artifact_list` | read | no |
| 6 | `visibility.analytics_query` | read | no |
| 8 | `visibility.radar.inspiration_x_list` | read | no |
| 9 | `source.x_posts_search` | definition id | no |
| 10 | `visibility.research.urls_fetch` | live | yes |
| 11 | `visibility.research.web_search` | live | yes |
| 17 | `social.content.artifact_create` | live | no |
| 18 | `social.content.plan` | live | no |
| 19 | `social.content.schedule` | live | yes |
| 20 | `social.content.approve` | live | yes |

Never call: `social.content.approval.authorize_publish`, `social.content.auto_publish_set`.

## Stop rules

- Follow the skill-frame writing rules.

- If `whoami` returns two or more workspaces, ask which and stop.

- Do not assume a pattern until this owner's own X results show one.

- An empty snapshot means there is no pattern yet. Say so, and do not fill the gap.

- A figure from that snapshot stays out of a post unless the Proof page already has it.

- If the handle is missing, ask. Do not guess one.

- Do not carry counts over from LinkedIn, and do not write "now on X too".

- This skill does not arm the rule. A send waits for yes on that rule.

- A missing field stays missing. Do not invent reach.

- Do not copy the post.

- Do not pass another person's number or story off as the owner's.

- No yes means the claim stays off.

- Do not ask a second time.

- Do not add a launch that the window already contains.

- Do not use hype adjectives.

- Do not chop a LinkedIn piece into a thread, and do not restate the first line as the rest of the thread.

- Do not start a search to collect them.

- Take numbers only from the Proof page.

- Do not shorten it.

- If the brief has no slug, ask once. Do not invent one.

- If they have not said how many X posts a day, ask once and wait. Do not pick a daily count for them.

- Do not invent a row to fill the table.

- The slate is not a post.

- Do not schedule it in this step.

- `publish_date` stays empty.

- Do not open a second database.

- `social.content.schedule` waits for yes on that text, that media, and that time.

- Do not call `social.content.auto_publish_set` or `social.content.approval.authorize_publish`.

- Do not add a metric.

- Do not seed the file with anyone else's examples.

- It does not post.
