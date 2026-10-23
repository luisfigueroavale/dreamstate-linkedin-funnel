# Calls

The owner posts every reply. A blanket go-ahead is not approval of a reply. Never call `sequence.x.auto_engagements.replace`. This skill does not follow anyone and does not send a DM.

The owner posts each reply, unless a fetched contract shows that account can take one exact public reply they approved.

`senders.social_accounts.list` with `platform` `x` supplies `account_id`. `tools_get` before `tools_run`. The fetched schema wins.

`visibility.radar.inspiration_x_list` is a free read of posts already stored. It does not call the X API. A dry_run request executes the read, so call it live.

Optional `query` (500), `author_handles` (up to 100, a leading @ is stripped), `limit` (1 to 100), `cursor` (pass `frontier.cursor` back). Leave `ai_filter` off unless the owner asked for that filter. An empty page means nothing is stored for those handles.

`tables.x_post_engagers.run` needs `account_id` and `max_rows` (1 to 500). Modes are smoke_test and live. Do not send dry_run, because that request runs live. Live only after yes.

Optional `post_ids` are workspace post-record ids (1 to 25), or `author_handle` with `lookback_days` (1 to 7). `include_likes` is optional.

The call reads reposts, quotes, replies, and likes. A like the platform will not return is missing, and missing is not zero. It is not a LinkedIn harvest.

A public reply uses `social.engagement.comment` only after `tools_get` shows that account can take it. Otherwise the owner posts the draft.

When the contract allows it: omit `approved`, or use smoke_test, to preview. Live needs `approved: true`, an `idempotency_key`, and yes on that text.

Required `account_id`, `post_social_id`, and `body`. Do not aim a contract that only describes another platform at an X post.

`social.engagement.react` has no dry_run. smoke_test to preview. Live needs `approved: true`, an `idempotency_key`, and yes on that reaction.

Required `account_id` and `post_social_id`. Optional `comment_id`. `reaction` defaults to like.

Skip the call when the fetched contract does not cover this X account. It is a public reaction, 0 credits, and it counts on the sender's daily quota.
