# Publish

A future time is `social.content.schedule` (`artifact_id`, `expected_revision`, `scheduled_at`). It writes a delivery and does not post. If they named a time and no time zone, ask first.

Publish in this order: `social.content.artifact_create`, the upload, `social.content.approve`, then `social.content.schedule`, then `social.content.artifact_get` for the delivery id.

`social.content.delivery_publish` needs that delivery, and only `social.content.schedule` creates one.

Run `social.content.delivery_publish` as dry_run and keep `approved_publish_hash`.

Get the owner's yes on that exact video, then send the live call with `trigger` `explicit` and that hash. 0 credits.

If the outcome is unknown, or `reconciliation_required` is true, do not retry. A replayed row is already published.

If the dry_run says publish authority is missing (`social.content.approval.authorize_publish`), stop and ask the owner. Never call `authorize_publish` yourself. Do not call `social.content.auto_publish_set`.
