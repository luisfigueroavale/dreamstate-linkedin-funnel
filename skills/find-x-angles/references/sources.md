# Other reads

`source.x_posts_search` is a definition id, not a `tools_run` id. Resolve it with `tables.executable_definitions.list_resolved`, attach with `tables.table_sources.attach`, and run `tables.table_sources.run` only after the quote and the owner's yes. Use that before you treat a hand count as the only source.

A paid open-web read waits for a quote and a yes. Call prices and modes are in `docs/calls.md`. Required `query` on `visibility.research.web_search` and `urls` on `visibility.research.urls_fetch`. A quote is not a yes. No yes means you do not run the call.

`tables.x_post_engagers.run` is who touched one post. It needs `account_id` from `senders.social_accounts.list` and `max_rows` (1–500). Call prices and modes are in `docs/calls.md`. It is not a LinkedIn harvest and it is not this scan. Do not call `visibility.linkedin.engagement_harvest` to answer an X question.

If a call fails, stop. Report the error the tool returned. Do not loop on `whoami`. Do not start a monitor.
