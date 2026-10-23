---
name: publish-youtube-video
description: "Package a finished video and publish it on the connected YouTube account after a yes on that exact file. Use when the cut is ready. It does not publish without that yes."
---
# Publish a YouTube video

Package a finished video and publish it on the connected YouTube account after a yes on that exact file. Follow `docs/skill-frame.md`.

## Use when

- Use when the cut is ready.

- It does not publish without that yes.

## Steps

1. Ask if one is missing (`references/package.md`).

2. Read with `senders.social_accounts.list` (`references/account.md`). Stop if no YouTube account is connected.

3. Read with `social.channels_list` (`references/account.md`).

4. Store with `social.content.artifact_create` (`references/draft.md`).

5. Upload with `social.content.media_upload_url` (`references/upload.md`).

6. Finish that upload with `social.content.media_uploaded` (`references/upload.md`). That pair does not publish.

7. Use with `social.content.artifact_list` (`references/upload.md`).

8. Get (`references/yes.md`).

9. Re with `social.channels_list` (`references/account.md`).

10. Approve with `social.content.approve` (`references/publish.md`).

11. Arm the time with `social.content.schedule` (`references/publish.md`).

12. Read with `social.content.artifact_get` (`references/publish.md`).

13. Run with `social.content.delivery_publish` (`references/publish.md`).

14. Change an unpublished draft with `social.content.artifact_update` (`references/change.md`).

15. Copy a new draft with `social.content.replacement_create` when that returns `published_immutable` (`references/change.md`).

16. Say what happened (`references/report.md`). Name the folder, the artifact id, the delivery id, and the privacy you set.
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 2 | `senders.social_accounts.list` | read | no |
| 3, 9 | `social.channels_list` | read | no |
| 4 | `social.content.artifact_create` | live | no |
| 5 | `social.content.media_upload_url` | live | no |
| 6 | `social.content.media_uploaded` | live | no |
| 7 | `social.content.artifact_list` | read | no |
| 7, 12 | `social.content.artifact_get` | read | no |
| 10 | `social.content.approve` | live | yes |
| 11 | `social.content.schedule` | live | yes |
| 13 | `social.content.delivery_publish` | dry_run, then live | yes |
| 14 | `social.content.artifact_update` | live | no |
| 15 | `social.content.replacement_create` | live | yes |


## Stop rules

- If the file, the title, the description, or the thumbnail is missing, ask.

- Do not invent it.

- Do not copy a connection from another project.

- If no YouTube account is connected, stop.

- Neither accepts dry_run.

- This skill does not schedule or publish Reddit.

- When they did not name one, use `private`.

- `public` only when they named public.

- That pair does not publish.

- If neither shows the draft, stop.

- Do not create a second artifact.

- Packaging is not permission to publish.

- A yes on a different file is a new yes.

- If they named a time and no time zone, ask first.

- 0 credits.

- If the outcome is unknown, or `reconciliation_required` is true, do not retry.

- If the dry_run says publish authority is missing (`social.content.approval.authorize_publish`), stop and ask the owner.

- Never call `authorize_publish` yourself.

- Do not call `social.content.auto_publish_set`.

- That new draft still needs its own yes before publish.

- Do not call `social.content.delete_republish_propose`.

- Do not invent a public address.

- It does not publish without that yes.
