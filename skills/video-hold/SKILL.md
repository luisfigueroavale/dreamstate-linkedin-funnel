---
name: video-hold
description: "Package a finished video folder and optionally save a Dreamstate draft. Use when the file is ready for the owner to upload. It does not upload."
---

Follow `docs/skill-frame.md`.

Read the finished file on disk, the title, the description, the thumbnail, and any visibility, schedule, or time zone they named. If the file, the title, the description, or the thumbnail is missing, ask. Do not invent it. If visibility is missing, ask before you store a draft. This desk has no video-host uploader. OAuth and the host API are dropped for that reason. Do not send the file to a host, do not change a video already on a host, do not inspect a host account, and do not confirm a channel. Do not copy credentials from another project.

Build one folder: the final file, the title, the description, the thumbnail, captions, a playlist only when they asked, visibility, schedule, and time zone. Packaging is not permission to publish. Read platform limits and any quota figure from their notes or a page they name. Do not guess a quota.

`social.content.artifact_create` only when they ask to store a draft. Then `social.content.media_upload_url`, then `social.content.media_uploaded` (`expected_revision`, `media_id`, `artifact_id`). That pair confirms the bytes landed. It does not publish. Record the returned artifact id before any later step. When the create result is ambiguous, or a draft for this file is already stored, read that draft back with `social.content.artifact_get` (or `social.content.artifact_list` when the id is still unknown). If neither call shows the draft, stop. Do not create a second artifact.

Use the visibility and the schedule they named. `social.content.schedule` is a separate yes (`expected_revision`, `scheduled_at`, `artifact_id`) and still needs `social.content.approve` on that version. If they named a schedule and no time zone, ask before that call.

A successful create is not proof a host finished processing or that the video is public. Say what was stored: the folder, the artifact id, and that the bytes landed. Processing, a public page, and whether the thumbnail or captions are live are what only the owner can confirm after they upload.
