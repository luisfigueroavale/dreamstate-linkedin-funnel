# Calls

The owner posts the comment, or says yes on that exact text. A yes on different wording is a new yes. This skill does not comment, like, follow, connect, or message on its own. Never call `sequence.linkedin.auto_engagements.replace`. Never call `sequence.x.auto_engagements.replace`. A file handed out after a keyword comment is `send-lead-magnet`, not this queue.

`tools_get` before every `tools_run`. The fetched schema wins.

`source.account_posts_linkedin_profile` and `source.linkedin_posts_search` are definition ids, not `tools_run` ids. Resolve them with `tables.executable_definitions.list_resolved`. Bind with `tables.table_sources.attach`: `table_id`, `source_column_id` (nullable), and either `binding_spec` or `binding`, never both. Pass `source_id` only when editing. Attach is 0 credits and reversible. `tables.table_sources.run` is what spends. When that schema lists `max_rows`, it belongs in `params`.

Dry-run the run when the mode exists, show the quote, wait, then live with `quote_hash`, `max_credits`, and a new `idempotency_key`.

`social.feeds.create` is 0 credits. dry_run first. Live needs `approved: true` because it is a recurring trigger. Required `table_id`, `kind` (`watched_accounts` or `keyword`), `cadence` (`hourly`, `daily`, or `weekly`), and `stored_max_credits`. Pass `account_urls` or `keyword`, never both.

`visibility.radar.inspiration_linkedin_list` is a free read. `dry_run` executes the read.

`account_id` comes from `senders.linkedin_accounts.list`.

`social.linkedin_posts.get` needs `account_id` and `post_id`. It costs 0, calls LinkedIn, and is read only. Do not send dry_run.

`social.linkedin_posts.comments_list` uses that same `account_id` and `post_id`. It is a free external read. Sending dry_run executes the read, so do not send that mode. Say that it was a read.

To comment, `social.engagement.comment`: omit `approved`, or use smoke_test, to preview. Live posts only with `approved: true`, an `idempotency_key`, and yes on that exact text. Required `account_id`, `post_social_id` (a composite id, not an activity URN), and `body` (1–4000). Zero credits, and it still counts on the sender's daily quota.

`social.posts.comment_publish` is the other call. It is 2 credits. dry_run previews; live repeats `quote_hash` with `max_credits` 2. Required `channel` `"linkedin"`, `account_id`, `target_post_urn`, `body` (1–3000), and `consequence` `"public_comment"`. It runs only from an approved durable run step, or the call returns 409 `durable_run_step_required`. The owner says yes on that exact body. Do not retry when the outcome is unknown.

Do not use that call to fill the queue.

`social.engagement.react`: `account_id`, `post_social_id`, optional `comment_id`, `reaction` defaulting to like. It has no dry_run. Use smoke_test to preview. Live needs `approved: true`, an `idempotency_key`, and yes on that reaction. It also counts on the daily quota. Do not react unless they named that reaction.

A live post of one card is only `social.engagement.comment` after yes on that exact body, using the composite `post_social_id`. Preview by omitting `approved` or by smoke_test. Do not switch to `social.posts.comment_publish` unless they asked for that call and said yes on that exact body.

That call is 2 credits, dry_run previews, and live repeats `quote_hash` with `max_credits` 2 from an approved durable run step.
