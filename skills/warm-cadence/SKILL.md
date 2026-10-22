---
name: warm-cadence
description: "Build a short draft sequence for people who already fit, with a daily cap and fallback copy. Use after fit is accepted. It does not activate."
---

Follow `docs/skill-frame.md`.

Only rows that passed both scores. A required unknown is a hold and is not enrolled. Step ids come from `sequence.sequences.step_options`. `sequence.sequences.create_from_worksheet` builds a draft and does not start it. Preview at least three rows, including one thin row, with `sequence.sequences.copy_preview` (`sequence_id` required). Fallback copy on every step that reads a row field. `{{first_name}}` only when a real `first_name` column exists. Put the daily cap in the ask. `sequence.sequences.activate_audience` starts sending, with `max_live_sends` in params. There is no lifetime ceiling. Owner yes on that activation. Do not activate in the same step as delivering the file.
