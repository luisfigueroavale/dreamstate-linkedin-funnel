---
name: week-board
description: "Update the local status board and, if the owner asks, mark a day on an existing Dreamstate draft. Use after the pieces exist. A day mark is not a schedule."
---

Follow `docs/skill-frame.md`.

One LinkedIn post a day on `vault/board.md`. The letter exists before the posts that reuse its argument. Move the line when status changes: Idea, Drafting, Review, Published, Backlog. `social.content.plan` sets `planned_for` on an existing artifact and does not publish. `social.content.schedule` is separate: `expected_revision`, `scheduled_at`, `artifact_id`, and dispatch still needs `social.content.approve` on that version. Both wait for yes. `social.content.unschedule` (`expected_revision`, `artifact_id`) pulls an armed send that has not started. It does not retract a live post, and it is not `social.content.unplan`.
