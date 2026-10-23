# Keep it

This skill does not schedule, publish, reply, send a DM, follow, or like. Do not call `sequence.x.auto_engagements.replace`. A repeating refresh is not a loop you start here. If they later want one, that call is `social.feeds.create`. dry_run first. Live needs `approved: true` because it is a recurring trigger. Required `table_id`, `kind`, `cadence`, and `stored_max_credits`.

Pass `account_urls` or `keyword`, never both.

When they want the scan kept, write the brief to `vault/notes/<date>-x-<topic>.md`. Put the untouched response in `vault/sources/<date>-x-<topic>/` and do not edit that raw file in place. Label the query and the capture time on both. Do not add the scan to `vault/board.md`. Do not paste credentials or a large raw payload into the chat.

A fact about the owner that belongs on a Company Context page goes through `collect-owner-context`, and only after they ask. A hole in the evidence stays in the brief.
