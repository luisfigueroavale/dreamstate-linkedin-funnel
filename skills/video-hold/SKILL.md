---
name: video-hold
description: "Package a finished video and publish it on the connected YouTube account after a yes on that exact file. Use when the cut is ready. It does not publish without that yes."
---

Follow `docs/skill-frame.md`.

Read the finished file on disk, the title, the description, the thumbnail, and any privacy, schedule, or time zone they named. If the file, the title, the description, or the thumbnail is missing, ask. Do not invent it. Do not copy a connection from another project.

`senders.social_accounts.list` with `platform` `youtube` supplies `account_id` (the account `id`). No connected YouTube account: stop. `social.channels_list` is the channel row. Both reads are live. Neither accepts dry_run. Re-read the channel row before a publish. YouTube supports write, schedule, publish, and analytics. The publish route is `youtube_data_api_v3`. Analytics come from `youtube_analytics`. The same list includes Threads, TikTok, Instagram, and Facebook. Reddit is draft-only for schedule and publish, so this skill does not schedule or publish Reddit.

One video per post. The title is `platform_payloads.youtube.snippet.title`, 100 characters or fewer. The description is `snippet.description`, 5000 characters or fewer. Privacy is always set in `status.privacyStatus`: `private`, `unlisted`, or `public`. When they did not name one, use `private`. `public` only when they named public.

`social.content.artifact_create` when they ask to store the draft. Required `content` and `channels` `["youtube"]`. Pass `account_ids` with that id, and set `platform_payloads.youtube.account_id` to the same id, plus `snippet.title`, `snippet.description`, and `status.privacyStatus`. Then `social.content.media_upload_url` (`expected_revision`, `file_name`, `content_type`, `byte_length`, `artifact_id`) and `social.content.media_uploaded` (`expected_revision`, `media_id`, `artifact_id`) for the one video. That pair does not publish. Record the artifact id. If the create result is unclear, read it with `social.content.artifact_get` (live; no dry_run), or `social.content.artifact_list` when the id is unknown. If neither shows the draft, stop. Do not create a second artifact.

Packaging is not permission to publish. Owner yes on that exact video, that title, that description, and that privacy, before a publish. A yes on a different file is a new yes.

A future time is `social.content.schedule` (`artifact_id`, `expected_revision`, `scheduled_at`). It writes a delivery and does not post. Dispatch still needs `social.content.approve` (`artifact_id`, `expected_revision`). If they named a time and no time zone, ask first.

Publish now with `social.content.delivery_publish`. Copy `delivery_id` from `deliveries` on `social.content.artifact_get` after `schedule`. dry_run first and keep `approved_publish_hash`. Live sends `trigger` `explicit` and that hash only after the yes. 0 credits. If the outcome is unknown, or `reconciliation_required` is true, do not retry. A replayed row is already published. Do not call `social.content.approval.authorize_publish` or `social.content.auto_publish_set`.

A draft that is not published yet can change through `social.content.artifact_update` (`artifact_id`, `expected_revision`). If that returns `published_immutable`, `social.content.replacement_create` (`artifact_id`, `expected_revision`) copies a new draft and does not publish. That new draft still needs its own yes before publish. Do not call `social.content.delete_republish_propose`.

Say what happened: the folder, the artifact id, the delivery id, and the privacy you set. A successful create is not proof processing finished. Do not invent a public address.
