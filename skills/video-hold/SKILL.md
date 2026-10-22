---
name: video-hold
description: "Package a finished video folder and optionally save a Dreamstate draft. Use when the file is ready for the owner to upload. It does not upload."
---

Follow `docs/skill-frame.md`.

Package the folder: file, blurb, thumb, chapters. `social.content.artifact_create` only if they ask to store a draft. Then `social.content.media_upload_url` and `social.content.media_uploaded` (`expected_revision`, `media_id`, `artifact_id`). That pair confirms the bytes landed. It does not publish. Do not upload the file to a video host.
