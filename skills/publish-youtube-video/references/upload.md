# Upload

Then `social.content.media_upload_url` (`expected_revision`, `file_name`, `content_type`, `byte_length`, `artifact_id`) and `social.content.media_uploaded` (`expected_revision`, `media_id`, `artifact_id`) for the one video.

Record the artifact id.

If the create result is unclear, read it with `social.content.artifact_get` (live; no dry_run), or `social.content.artifact_list` when the id is unknown.

