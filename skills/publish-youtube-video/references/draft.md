# Draft

`social.content.artifact_create` when they ask to store the draft. Required `content` and `channels` `["youtube"]`.

Pass `account_ids` with that id, and set `platform_payloads.youtube.account_id` to the same id, plus `snippet.title`, `snippet.description`, and `status.privacyStatus`.

Map the thumbnail to `platform_payloads.youtube.thumbnail`. Set `status.selfDeclaredMadeForKids` to `false` unless the owner says otherwise.
