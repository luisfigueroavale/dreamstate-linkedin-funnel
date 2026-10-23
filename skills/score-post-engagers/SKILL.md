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

1. Keep the live post id and read the artifact with `social.content.artifact_get` (`references/harvest.md`).

2. Harvest with `visibility.linkedin.engagement_harvest` (`references/harvest.md`). Dry run costs 0 credits, and a live run needs yes.

3. Read `visibility.linkedin.engagement_status` and `visibility.linkedin.engagement_engagers` (`references/harvest.md`).

4. On timeout, call `runs_get` on the same `idempotency_key` (`references/harvest.md`). Do not start another watcher.

5. Stop and run `collect-owner-context` when Ideal Customer is empty (`references/rubric.md`). Stop if `audience.local/ideal-follower.md` is missing or blank.

6. Add two `column.ai_fit_score` columns with `tables.columns.add` after `tools_search` and `tools_get` (`references/rubric.md`).

7. Look up a later gap with `visibility.research.web_search` or `visibility.research.urls_fetch` (`references/rubric.md`).

8. A required unknown is a hold, not a no and not a yes (`references/rubric.md`). Hold is not enrolled or sent.

9. Dry-run `tables.columns.run` on one row you can judge (`references/fit.md`). Then live, `max_rows` in params.

10. Poll `runs_get` (`references/fit.md`). If `npm run fit` fails, rewrite and dry-run again.

11. Set standing runs with `tables.auto_run.set` after owner yes (`references/fit.md`).

12. Hand a file ask to `send-lead-magnet` first (`references/next.md`).

13. Read comments with `social.comments.queue_list` (`references/comments.md`). Trust an empty queue only after `visibility.linkedin.comments.refresh`.

14. Read notifications with `visibility.linkedin_post_notifications_list` after `social.content.article_deliveries_list` (`references/comments.md`).

15. Preview with `social.comments.reply` (`references/comments.md`).

16. Approve with `social.comments.approve` after yes on that text (`references/comments.md`).

17. Read a stored snapshot with `visibility.analytics_query` (`references/analytics.md`). Do not write zero.

18. Refresh metrics with `visibility.analytics_refresh` (`references/analytics.md`).

19. Activate a repeating monitor with `workflow.workflows.activate` (`references/analytics.md`). It always needs the owner's yes and `approved: true`.

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
| 6 | `tools_get` | read | no |
| 6 | `tables.columns.add` | live | no |
| 7 | `visibility.research.web_search` | live | no |
| 7 | `visibility.research.urls_fetch` | live | no |
| 9 | `tables.columns.run` | dry_run | no |
| 9 | `tables.columns.run` | live | yes |
| 10 | `runs_get` | read | no |
| 11 | `tables.auto_run.set` | live | yes |
| 13 | `social.comments.queue_list` | read | no |
| 13 | `visibility.linkedin.comments.refresh` | live | no |
| 14 | `social.content.article_deliveries_list` | read | no |
| 14 | `visibility.linkedin_post_notifications_list` | read | no |
| 15 | `social.comments.reply` | preview | no |
| 16 | `social.comments.approve` | live | yes |
| 17 | `visibility.analytics_query` | read | no |
| 18 | `senders.social_accounts.list` | read | no |
| 18 | `visibility.analytics_refresh` | live | no |
| 19 | `workflow.workflows.activate` | smoke_test | no |
| 19 | `workflow.workflows.activate` | live | yes |
| - | `tables.profile_watcher` | never | no |
| - | `tables.x_post_engagers.run` | never | no |
| - | `knowledge.engagement.people_engaged_n_times` | never | no |
| - | `column.ai` | never | no |
| - | `sequence.sequences.activate_audience` | never | no |

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
