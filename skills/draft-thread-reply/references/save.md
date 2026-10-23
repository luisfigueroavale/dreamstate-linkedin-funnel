# Save the draft

`expected_revision` comes from `unibox.inbox.reply_drafts_list`. Free read, no required args. Optional `conversation_id`, `channels`, `limit` (max 200), `cursor`. No dry_run. A free read that cannot dry-run runs live. Say it was a read.

`unibox.inbox.reply_draft_edit` takes `conversation_id`, `expected_revision`, `content` `{body, attachments, voice}`, `name`, and `labels` (array, may be empty).
