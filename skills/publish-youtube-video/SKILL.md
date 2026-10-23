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

1. Read the finished file, the title, the description, the thumbnail, and any privacy, schedule, or time zone they named (`references/package.md`). Ask if one is missing.

2. Read the account with `senders.social_accounts.list` (`references/account.md`). Stop if no YouTube account is connected.

3. Read the channel with `social.channels_list` (`references/account.md`). Both reads are live, and neither accepts dry_run.

4. Store the draft with `social.content.artifact_create` when they ask (`references/draft.md`).

5. Upload the one video with `social.content.media_upload_url` (`references/upload.md`).

6. Finish that upload with `social.content.media_uploaded` (`references/upload.md`). That pair does not publish.

7. Read an unclear create with `social.content.artifact_get` (`references/upload.md`). Use `social.content.artifact_list` when the id is unknown.

8. Get the owner's yes on that exact video, title, description, and privacy (`references/yes.md`).

9. Re-read the channel row with `social.channels_list` (`references/account.md`).

10. Approve with `social.content.approve` (`references/publish.md`).

11. Arm the time with `social.content.schedule` (`references/publish.md`). If they named a time and no time zone, ask first.

12. Read the delivery id with `social.content.artifact_get` (`references/publish.md`).

13. Run `social.content.delivery_publish` as dry_run and keep `approved_publish_hash` (`references/publish.md`). After yes, send the live call with `trigger` `explicit` and that hash.

14. Change an unpublished draft with `social.content.artifact_update` (`references/change.md`).

15. Copy a new draft with `social.content.replacement_create` when that returns `published_immutable` (`references/change.md`).

16. Say what happened (`references/report.md`). Name the folder, the artifact id, the delivery id, and the privacy you set.

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 2 | `senders.social_accounts.list` | live, no dry_run | yes |
| 3, 9 | `social.channels_list` | live, no dry_run | yes |
| 4 | `social.content.artifact_create` | live | yes |
| 5 | `social.content.media_upload_url` | live | yes |

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 6 | `social.content.media_uploaded` | live | yes |
| 7 | `social.content.artifact_list` | live | yes |
| 7, 12 | `social.content.artifact_get` | live, no dry_run | yes |
| 10 | `social.content.approve` | live | Owner yes |

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 11 | `social.content.schedule` | live | Owner yes |
| 13 | `social.content.delivery_publish` | dry_run, then live | yes |
| 14 | `social.content.artifact_update` | live | yes |
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
