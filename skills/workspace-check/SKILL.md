---
name: workspace-check
description: "Confirm the active Dreamstate workspace before a write or a spend. When the owner names person profiles, preview them and stop before a watcher exists. Use at the start of a later session. It does not draft or send."
---

Follow `docs/skill-frame.md`.

`whoami` first. Name the active workspace in chat only. No name or id in the repo. Stop if another is active, `whoami` fails, or a later call switches workspace. Several listed: ask the owner to name one and wait. If `whoami` says this workspace cannot be used, repeat it and stop before a watcher, a column, or a send. No second server.

Free reads, optional `limit`: `senders.linkedin_accounts.list`, `social.channels_list`. `senders.social_accounts.list` (optional `platform`, `limit`) for draft account ids. No LinkedIn account: no later harvest or comment. Do not call `senders.identities.inbox_scope_get`.

Preview public person-profile URLs given by the owner. `tools_get` `tables.profile_watcher.preview` before `tools_run`. No sample value. Max 10 URLs, their profile if supplied. Another URL only if Ideal Customer and `audience.local/ideal-follower.md` name that audience. Stop if that file is missing or `Status: blank`, or Ideal Customer is empty. No invented URL. No interview. Free; returns `preview_hash`; no network, collect, schedule, create, or LinkedIn sender. Report its cadence, lookback, and coverage. Record `watcher_max_credits` for one cycle. Changed URL or cap: new preview and hash. Before another watcher, `tools_search` then `tools_get` a confirmed read; else do not create.

Do not activate a watcher. Do not call `tables.profile_watcher.create` or `tables.profile_watcher.resume`. Create needs that `preview_hash`, `approved: true`, and yes; later spend up to `watcher_max_credits`; no engager rows; not a draft. Timeout: `runs_get`; no second watcher. Daily. People on one post: `visibility.linkedin.engagement_harvest`. Do not run that harvest. Do not send `dry_run` to `tables.x_post_engagers.run`.

Qualify from Ideal Customer and the follower file. Read `audience/AGENTS.md` first. No sample rubric. Company and person apart, 0 to 100, on the pass line and exclusions. Do not call, separate scope and cost: `tables.columns.add` (definition only; `binding_spec.definition_id` `column.ai_fit_score`; company and person columns; reuse if present; search, then `tools_get`; no invented update id), `tables.columns.run` (`max_rows` in params), `tables.table_runs.preview_cost` (unsaved price), `tables.auto_run.set` (`max_credits_per_run`; own yes; apart from the watcher). `column.ai` stays to-check. Do not call it. Bind only keys a worksheet read returned. No `visibility.research.web_search` or `visibility.research.urls_fetch` to fill a blank.

No public react or calendar invite without a later yes. Do not call `sequence.sequences.activate_audience`, `sequence.sequences.resume`, or `workflow.workflows.activate`. No second database or video-host API.
