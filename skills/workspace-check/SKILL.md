---
name: workspace-check
description: "Confirm the active Dreamstate workspace before a write or a spend. When the owner names person profiles, preview them and stop before a watcher exists. Use at the start of a later session. It does not draft or send."
---

Follow `docs/skill-frame.md`.

`whoami` first. Name the active workspace in chat only. Put no name or id in the repo. Stop if another is active, `whoami` fails, or a later call switches workspace. If several are listed, ask the owner to name one and wait. If `whoami` says this workspace cannot be used, repeat it and stop before a watcher, a column, or a send. Do not add a second server.

Free reads, optional `limit`: `senders.linkedin_accounts.list`, `social.channels_list`. `senders.social_accounts.list` (optional `platform`, `limit`) for account ids. If there is no LinkedIn account, run no later harvest or comment. Do not call `senders.identities.inbox_scope_get`.

Preview public person-profile URLs given by the owner. `tools_get` `tables.profile_watcher.preview` before `tools_run`. Do not use a sample value. Use at most 10 URLs, and include their profile if it was supplied. Another URL only if Ideal Customer and `audience.local/ideal-follower.md` name that audience. Stop if that file is missing or `Status: blank`, or Ideal Customer is empty. Do not invent a URL. Do not run an interview. It is free. It returns `preview_hash`. It does no network call, collect, schedule, create, or LinkedIn send. Report its cadence, lookback, and coverage. Record `watcher_max_credits` for one cycle. If the URL or the cap changes, run a new preview and keep the new hash. Before another watcher, `tools_get` `tables.profile_watcher.get` (`table_id`). Live. If none is stored, do not create.

Do not activate a watcher. Do not call `tables.profile_watcher.create` or `tables.profile_watcher.resume`. Create needs that `preview_hash`, `approved: true`, and yes; spend up to `watcher_max_credits`; no engager rows. `tables.profile_watcher.pause` (`table_id`) keeps collected rows. On a timeout, call `runs_get`, and do not start a second watcher. The cadence is daily. People on one post belong to `visibility.linkedin.engagement_harvest`. Do not run that harvest. Do not send `dry_run` to `tables.x_post_engagers.run`.

Qualify from Ideal Customer and the follower file. Read `audience/AGENTS.md` first. Company and person apart, 0 to 100, on the pass line and exclusions. Do not call these, and keep scope and cost apart: `tables.columns.add` (definition only; `binding_spec.definition_id` `column.ai_fit_score`; company and person columns; reuse if present), `tables.columns.update` (`column_id`, `expected_updated_at`), `tables.columns.run` (`max_rows` in params), `tables.table_runs.preview_cost`, `tables.auto_run.set` (`max_credits_per_run`; own yes; apart from the watcher), `tables.executables.save` (`binding_spec`, `label`, `table_id`; live `approved: true`). `column.ai` does not exist; use `column.ai_fit_score` as `binding_spec.definition_id`. Bind only keys a worksheet read returned. Do not call `visibility.research.web_search` or `visibility.research.urls_fetch` to fill a blank.

Do not react in public or email a calendar invite without a later yes. Do not call `sequence.sequences.activate_audience`, `sequence.sequences.resume`, or `workflow.workflows.activate`. Do not add a second database or a video-host API.
