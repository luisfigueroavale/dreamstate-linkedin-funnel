# Calls

`senders.social_accounts.list` with `platform` `x` supplies `account_id`. `tools_get` before `tools_run`.

`visibility.radar.inspiration_x_list` is a free read of posts already stored. It does not call the X API. A dry_run request executes the read, so call it live.

Optional `query` (500), `author_handles` (up to 100, a leading @ is stripped), `limit` (1 to 100), `cursor` (pass `frontier.cursor` back). Leave `ai_filter` off unless the owner asked for that filter. An empty page means nothing is stored for those handles.

`tables.x_post_engagers.run` needs `account_id` and `max_rows` (1 to 500). Modes are smoke_test and live.

Optional `post_ids` are workspace post-record ids (1 to 25), or `author_handle` with `lookback_days` (1 to 7). `include_likes` is optional.

The call reads reposts, quotes, replies, and likes. It is not a LinkedIn harvest.

When the contract allows it: omit `approved`, or use smoke_test, to preview.

Required `account_id`, `post_social_id`, and `body`.

smoke_test to preview.

Required `account_id` and `post_social_id`. Optional `comment_id`. `reaction` defaults to like.

Skip the call when the fetched contract does not cover this X account. It is a public reaction, 0 credits, and it counts on the sender's daily quota.
