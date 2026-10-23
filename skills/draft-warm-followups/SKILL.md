---
name: draft-warm-followups
description: "Build a short draft sequence for people who already fit, with a daily cap and fallback copy. Use after fit is accepted. It does not activate."
---
# Draft warm followups

Build a short draft sequence for people who already fit, with a daily cap and fallback copy. Follow `docs/skill-frame.md`.

## Use when

- Fit is accepted and the owner wants a short draft sequence.

- Not for activation. An existing thread goes to `draft-thread-reply`. A public comment goes to `draft-linkedin-comments`.

## Steps

1. Route work that is not a sequence (`references/scope.md`). A file request goes to `send-lead-magnet`, and the file goes first.

2. Take only rows that passed both scores (`references/cohort.md`). A required unknown is a hold and is not enrolled.

3. Write three steps or fewer from what they did (`references/copy.md`). Ask one question.

4. Take step ids from `sequence.sequences.step_options` after `tools_get` and before `tools_run` (`references/sequence.md`).

5. Read the account, the mailbox, health, and limits with `senders.linkedin_accounts.list` and `senders.social_accounts.list` (`references/senders.md`).

6. Draft with `sequence.sequences.create_from_worksheet` (`references/draft.md`). Nothing was sent.

7. Use `{{first_name}}` only with a real `first_name` column (`references/draft.md`). Else add a formula with `tables.columns.add`, or do not greet by name.

8. Preview at least 3 rows, including one thin row, with `sequence.sequences.copy_preview` (`references/preview.md`).

9. Name both `max_new_enrollments_per_day` and `max_live_sends` in the ask (`references/activate.md`).

10. Activate with `sequence.sequences.activate_audience` only on a separate yes (`references/activate.md`).

11. Record the enrollment id, the variant, and the run id (`references/record.md`).

12. For events and counts, call `tools_get` (`references/record.md`). Do not invent an id.

13. Resume with `sequence.sequences.resume` only after owner yes (`references/recover.md`).

14. Return the counts, the held reasons, the state, and the budget (`references/record.md`).

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 4 | `tools_get` | read | no |
| 4 | `tools_run` | read | no |
| 4 | `sequence.sequences.step_options` | read | no |
| 5 | `senders.linkedin_accounts.list` | read | no |
| 5 | `senders.social_accounts.list` | read | no |
| 6 | `tools_get` | read | no |
| 6 | `tools_run` | live | no |
| 6 | `sequence.sequences.create_from_worksheet` | live | no |
| 7 | `tools_get` | read | no |
| 7 | `tools_run` | live | no |
| 7 | `tables.columns.add` | live | no |
| 8 | `tools_get` | read | no |
| 8 | `tools_run` | live | no |
| 8 | `sequence.sequences.copy_preview` | live | no |
| 10 | `tools_get` | read | no |
| 10 | `tools_run` | dry_run | no |
| 10 | `tools_run` | live | yes |
| 10 | `sequence.sequences.activate_audience` | dry_run | no |
| 10 | `sequence.sequences.activate_audience` | live | yes |
| 12 | `tools_get` | read | no |
| 13 | `tools_get` | read | no |
| 13 | `tools_run` | live | yes |
| 13 | `sequence.sequences.resume` | live | yes |
| - | `sequence.linkedin.auto_engagements.replace` | never | no |
| - | `sequence.x.auto_engagements.replace` | never | no |

## Stop rules

- Follow the skill-frame writing rules.

- A required unknown is a hold and is not enrolled.

- Hold is not sent.

- Do not activate in the same step as delivering the file.

- Fit does not condition handoff.

- Never call `sequence.linkedin.auto_engagements.replace` or `sequence.x.auto_engagements.replace`.

- `sequence.sequences.activate_audience` is a separate yes on that audience and text and starts sending.

- Do not invent an id.

- Do not guess a name.

- Nothing was sent.

- A refused dry_run runs live, so say it was a read.
