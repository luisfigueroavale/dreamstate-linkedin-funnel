# Watcher

Before another watcher, `tools_get` `tables.profile_watcher.get` (`table_id`). Live. If none is stored, do not create.

Do not activate a watcher. Do not call `tables.profile_watcher.create` or `tables.profile_watcher.resume`.

Create needs that `preview_hash`, `approved: true`, and yes; spend up to `watcher_max_credits`; no engager rows.

`tables.profile_watcher.pause` (`table_id`) keeps collected rows. On a timeout, call `runs_get`, and do not start a second watcher.

The cadence is daily. People on one post belong to `visibility.linkedin.engagement_harvest`. Do not run that harvest. Do not send `dry_run` to `tables.x_post_engagers.run`.
