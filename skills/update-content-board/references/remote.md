# Remote

`social.content.plan` sets `planned_for` on an artifact that already exists.

It does not publish.

The board status stays where it is.

When they ask to store the piece, `tools_get` `social.content.artifact_create` and follow `docs/content-desk.md`.

`social.content.schedule` needs `expected_revision`, `scheduled_at`, and `artifact_id`.

Dispatch still needs `social.content.approve` on that version.

`social.content.unschedule` takes `expected_revision` and `artifact_id`.

It pulls an armed send that has not started.

