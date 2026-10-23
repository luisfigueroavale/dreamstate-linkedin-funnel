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

3. Preview only public person-profile URLs the owner gave (`references/preview.md`).

4. Live, and if none is stored, do not create (`references/watcher.md`).

5. On a timeout, call `runs_get` (`references/watcher.md`). Do not start a second watcher.

6. Qualify from Ideal Customer and the follower file, and read `audience/AGENTS.md` first (`references/qualify.md`).

7. Do not call `sequence.sequences.activate_audience`, `sequence.sequences.resume`, or `workflow.workflows.activate` (`references/later.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 1 | `whoami` | read | no |
| 2 | `senders.linkedin_accounts.list` | read | no |
| 2 | `social.channels_list` | read | no |
| 2 | `senders.social_accounts.list` | read | no |
| 3 | `tables.profile_watcher.preview` | read | no |
| 4 | `tables.profile_watcher.get` | read | no |
| 5 | `runs_get` | read | no |
| - | `tables.x_post_engagers.run` | live | yes |

Never call: `senders.identities.inbox_scope_get`, `sequence.sequences.activate_audience`, `sequence.sequences.resume`, `tables.auto_run.set`, `tables.columns.add`, `tables.columns.run`, `tables.columns.update`, `tables.executables.save`, `tables.profile_watcher.create`, `tables.profile_watcher.resume`, `tables.table_runs.preview_cost`, `visibility.linkedin.engagement_harvest`, `visibility.research.urls_fetch`, `visibility.research.web_search`, `workflow.workflows.activate`.

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
