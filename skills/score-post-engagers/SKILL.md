---
name: score-post-engagers
description: "After a post is live, collect engagers, score company and person apart, and draft the next note without sending it. Use when the owner asks what to do with engagers. It does not enroll."
---
# Score post engagers

After a post is live, collect engagers, score company and person apart, and draft the next note without sending it. Follow `docs/skill-frame.md`.

## Use when

- The owner asks what to do with engagers after a post is live.

- Not for enrollment. It does not enroll.

## Steps

1. Keep with `social.content.artifact_get` (`references/harvest.md`).

2. Dry run costs 0 credits, and a live run needs yes (`references/harvest.md`).

3. Read `visibility.linkedin.engagement_status` and `visibility.linkedin.engagement_engagers` (`references/harvest.md`).

4. Do not start another watcher (`references/harvest.md`).

5. Stop (`references/rubric.md`).

6. Add with `column.ai_fit_score` and `tables.columns.add` (`references/rubric.md`).

7. Look up a later gap with `visibility.research.web_search` or `visibility.research.urls_fetch` (`references/rubric.md`).

8. Hold is not enrolled or sent (`references/rubric.md`).

9. Dry-run `tables.columns.run` (`references/fit.md`). Then live, `max_rows` in params.

10. Poll `runs_get` (`references/fit.md`). If `npm run fit` fails, rewrite and dry-run again.

11. Set with `tables.auto_run.set` (`references/fit.md`).

12. Hand (`references/next.md`).

13. Read with `social.comments.queue_list` (`references/comments.md`).

14. Read with `visibility.linkedin_post_notifications_list` and `social.content.article_deliveries_list` (`references/comments.md`).

15. Preview with `social.comments.reply` (`references/comments.md`).

16. Approve with `social.comments.approve` (`references/comments.md`).

17. Read with `visibility.analytics_query` (`references/analytics.md`).

18. Refresh metrics with `visibility.analytics_refresh` (`references/analytics.md`).

19. It always needs the owner's yes and `approved: true` (`references/analytics.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 1 | `social.content.artifact_get` | read | no |
| 2 | `senders.linkedin_accounts.list` | read | no |
| 2 | `visibility.linkedin.engagement_harvest` | dry_run | no |
| 2 | `visibility.linkedin.engagement_harvest` | live | yes |
| 3 | `visibility.linkedin.engagement_status` | read | no |
| 3 | `visibility.linkedin.engagement_engagers` | read | no |
| 4 | `runs_get` | read | no |
| 6 | `tools_search` | read | no |
| 6 | `tables.columns.add` | write | no |
| 7 | `visibility.research.web_search` | live | yes |
| 7 | `visibility.research.urls_fetch` | live | yes |
| 9 | `tables.columns.run` | dry_run | no |
| 9 | `tables.columns.run` | live | yes |
| 10 | `runs_get` | read | no |
| 11 | `tables.auto_run.set` | live | yes |
| 13 | `social.comments.queue_list` | read | no |
| 13 | `visibility.linkedin.comments.refresh` | read | no |
| 14 | `social.content.article_deliveries_list` | read | no |
| 14 | `visibility.linkedin_post_notifications_list` | read | no |
| 15 | `social.comments.reply` | preview | no |
| 16 | `social.comments.approve` | live | yes |
| 17 | `visibility.analytics_query` | read | no |
| 18 | `senders.social_accounts.list` | read | no |
| 18 | `visibility.analytics_refresh` | read | no |
| 19 | `workflow.workflows.activate` | smoke_test | yes |
| 19 | `workflow.workflows.activate` | live | yes |

Never call: `column.ai`, `knowledge.engagement.people_engaged_n_times`, `sequence.sequences.activate_audience`, `tables.profile_watcher`, `tables.x_post_engagers.run`.

## Stop rules

- Follow the skill-frame writing rules.

- A required unknown is a hold, not a no and not a yes.

- Hold is not enrolled or sent.

- Live run needs yes.

- Do not call `column.ai`.

- Do not delete rows to hide them.

- A pass is not a yes to send.

- Do not call `sequence.sequences.activate_audience`.

- Do not write zero.

- If the effect is unknown, read the run and do not resend.

- It does not enroll.
