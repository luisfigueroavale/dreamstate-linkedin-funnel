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

2. A required unknown is a hold and is not enrolled (`references/cohort.md`).

3. Write three steps or fewer from what they did, and ask one question (`references/copy.md`).

4. Take with `sequence.sequences.step_options` (`references/sequence.md`).

5. Read with `senders.linkedin_accounts.list` and `senders.social_accounts.list` (`references/senders.md`).

6. Draft with `sequence.sequences.create_from_worksheet` (`references/draft.md`).

7. Else with `tables.columns.add` (`references/draft.md`).

8. Preview with `sequence.sequences.copy_preview` (`references/preview.md`).

9. Name both `max_new_enrollments_per_day` and `max_live_sends` in the ask (`references/activate.md`).

10. Activate with `sequence.sequences.activate_audience` (`references/activate.md`).

11. Record the enrollment id, the variant, and the run id (`references/record.md`).

12. Do not invent an id (`references/record.md`).

13. Resume with `sequence.sequences.resume` only after owner yes (`references/recover.md`).

14. Return the counts, the held reasons, the state, and the budget (`references/record.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 4 | `sequence.sequences.step_options` | read | no |
| 5 | `senders.linkedin_accounts.list` | read | no |
| 5 | `senders.social_accounts.list` | read | no |
| 6 | `sequence.sequences.create_from_worksheet` | live | no |
| 7 | `tables.columns.add` | write | no |
| 8 | `sequence.sequences.copy_preview` | read | no |
| 10 | `sequence.sequences.activate_audience` | dry_run, then live | yes |
| 13 | `sequence.sequences.resume` | live | yes |

Never call: `sequence.linkedin.auto_engagements.replace`, `sequence.x.auto_engagements.replace`.

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
