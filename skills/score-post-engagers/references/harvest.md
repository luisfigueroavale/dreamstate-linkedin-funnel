# Harvest

Keep the live post id.

Read the artifact with `social.content.artifact_get`.

`visibility.linkedin.engagement_harvest` requires `worksheet_id`, `linkedin_account_id` from `senders.linkedin_accounts.list`, and `post_id`.

If several accounts are connected, ask which one published, and wait.

Dry run costs 0 credits.

Live run needs yes.

Read `visibility.linkedin.engagement_status` and `visibility.linkedin.engagement_engagers`.

It is not `tables.profile_watcher` or `tables.x_post_engagers.run`.

It does not message or edit.

It reads posts in one window.

Do not walk older posts for a blank column.

One row holds the profile and the post.

Do not move an employee reaction onto a colleague.

Present employer stays.

Absent employer is unknown.

A reaction is not intent to buy.

`knowledge.engagement.people_engaged_n_times` counts mail and meetings, not this list.

The preview is free for 10 person URLs.

It returns `preview_hash`, and it uses no network.

Create and resume need that hash, `approved: true`, and yes.

Do not create one here.

Do not add another collector for these profiles.

On timeout, call `runs_get` on the same `idempotency_key`.

Do not start another watcher.

Report the status, the offer address, and the counts captured, passed, and held.

Recency orders passed rows.

A rubric edit leaves stored cells until a later run.
