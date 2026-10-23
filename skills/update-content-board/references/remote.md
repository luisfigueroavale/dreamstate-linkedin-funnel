# Remote

`social.content.plan` sets `planned_for` on an artifact that already exists.

It does not publish.

The board status stays where it is.

If no artifact exists, the brief holds the day.

When they ask to store the piece, `tools_get` `social.content.artifact_create` and follow `docs/content-desk.md`.

Do not call it unasked.

Do not call `social.content.plan` yet.

`social.content.schedule` needs `expected_revision`, `scheduled_at`, and `artifact_id`.

Dispatch still needs `social.content.approve` on that version.

Plan and schedule both wait for yes.

Approve waits for a yes on that version.

`social.content.unschedule` takes `expected_revision` and `artifact_id`.

It pulls an armed send that has not started.

It is not `social.content.unplan`, and it does not retract a live post.

When a call comes back unclear, read the artifact with `social.content.artifact_get` before you call again.
