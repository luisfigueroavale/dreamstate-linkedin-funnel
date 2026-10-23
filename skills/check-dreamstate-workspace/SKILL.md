---
name: check-dreamstate-workspace
description: "Confirm the active Dreamstate workspace before a write or a spend. When the owner names person profiles, preview them and stop before a watcher exists. Use at the start of a later session. It does not draft or send."
---
# Check the Dreamstate workspace

Confirm the active Dreamstate workspace before a write or a spend. Follow `docs/skill-frame.md`.

## Use when

- Use this at the start of a later session, before a write or a spend.

- When the owner names person profiles, preview them and stop before a watcher exists.

- It does not draft or send.

## Steps

1. Call `whoami` (`references/workspace.md`). Name the active workspace in chat only.

2. Read `senders.linkedin_accounts.list`, `social.channels_list`, and `senders.social_accounts.list` (`references/accounts.md`).

3. Call `tools_get` on `tables.profile_watcher.preview` before `tools_run` (`references/preview.md`). Preview only public person-profile URLs the owner gave.

4. Call `tools_get` on `tables.profile_watcher.get` before another watcher (`references/watcher.md`). Live, and if none is stored, do not create.

5. On a timeout, call `runs_get` (`references/watcher.md`). Do not start a second watcher.

6. Qualify from Ideal Customer and the follower file (`references/qualify.md`). Read `audience/AGENTS.md` first.

7. Do not call `sequence.sequences.activate_audience`, `sequence.sequences.resume`, or `workflow.workflows.activate` (`references/later.md`).

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 1 | `whoami` | live | yes |
| 2 | `senders.linkedin_accounts.list` | live | yes |
| 2 | `social.channels_list` | live | yes |
| 2 | `senders.social_accounts.list` | live | yes |
| 3 | `tools_get` | read | no |
| 3 | `tools_run` | live | yes |
| 3 | `tables.profile_watcher.preview` | live | yes |
| 4 | `tools_get` | read | no |
| 4 | `tables.profile_watcher.get` | live | yes |
| 5 | `runs_get` | live | yes |
| - | `senders.identities.inbox_scope_get` | never | n/a |
| - | `tables.profile_watcher.create` | never | n/a |
| - | `tables.profile_watcher.resume` | never | n/a |
| - | `visibility.linkedin.engagement_harvest` | never | n/a |
| - | `tables.x_post_engagers.run` | live | yes |
| - | `tables.columns.add` | never | n/a |
| - | `tables.columns.update` | never | n/a |
| - | `tables.columns.run` | never | n/a |
| - | `tables.table_runs.preview_cost` | never | n/a |
| - | `tables.auto_run.set` | never | n/a |
| - | `tables.executables.save` | never | n/a |
| - | `visibility.research.web_search` | never | n/a |
| - | `visibility.research.urls_fetch` | never | n/a |
| - | `sequence.sequences.activate_audience` | never | n/a |
| - | `sequence.sequences.resume` | never | n/a |
| - | `workflow.workflows.activate` | never | n/a |

## Stop rules

- Put no name or id in the repo.

- Stop if another is active, `whoami` fails, or a later call switches workspace.

- If several are listed, ask the owner to name one and wait.

- If `whoami` says this workspace cannot be used, repeat it and stop before a watcher, a column, or a send.

- Do not add a second server.

- If there is no LinkedIn account, run no later harvest or comment.

- Do not call `senders.identities.inbox_scope_get`.

- Do not use a sample value.

- Use at most 10 URLs.

- Stop if `audience.local/ideal-follower.md` is missing or `Status: blank`, or Ideal Customer is empty.

- Do not invent a URL.

- Do not run an interview.

- If none is stored, do not create.

- Do not activate a watcher.

- Do not call `tables.profile_watcher.create` or `tables.profile_watcher.resume`.

- Create needs that `preview_hash`, `approved: true`, and yes; spend up to `watcher_max_credits`; no engager rows.

- On a timeout, do not start a second watcher.

- The cadence is daily.

- Do not run `visibility.linkedin.engagement_harvest`.

- Do not send `dry_run` to `tables.x_post_engagers.run`.

- Do not call `tables.columns.add`, `tables.columns.update`, `tables.columns.run`, `tables.table_runs.preview_cost`, `tables.auto_run.set`, or `tables.executables.save`.

- Do not call `visibility.research.web_search` or `visibility.research.urls_fetch` to fill a blank.

- Do not react in public or email a calendar invite without a later yes.

- Do not call `sequence.sequences.activate_audience`, `sequence.sequences.resume`, or `workflow.workflows.activate`.

- Do not add a second database or a video-host API.

- It does not draft or send.
