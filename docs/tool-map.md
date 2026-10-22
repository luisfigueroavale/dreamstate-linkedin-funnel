# Tool map

Dreamstate's door is small: `whoami`, `packs_list`, `packs_get`, `packs_route`, `skills_list`, `skills_get`, `tools_search`, `tools_get`, `tools_run`, `runs_get`, `runs_events`, `runs_list`, `runs_cancel`. Those names are in the plugin's `dreamstate` skill.

A capability id below is a `tools_run` target. Fetch it with `tools_get` before use. The fetched schema wins.

Legend:

- **plugin** — the id is a literal in `luisfigueroavale/dreamstate-plugins` skills.
- **catalog** — `tools_get` returned a contract on 2026-10-22, server 1.3.7. Re-fetch. Schemas move.
- **to-check** — not fetched. Search, then fetch. Do not call a guessed id.

## Confirmed

| Id | Status | Use |
|---|---|---|
| `tables.columns.add` | plugin, catalog | Add a column. Does not run it. Fit uses `binding_spec.definition_id` of `column.ai_fit_score`. Open text uses `column.ai`. |
| `tables.columns.run` | plugin, catalog | Run one column. Dry run first. `max_rows` is a param. |
| `tables.table_sources.run` | plugin | Run a source. Same paid rule. |
| `tables.sourcing.preview` | plugin | Free people or company preview. Not a worksheet write. |
| `tables.table_runs.preview_cost` | plugin | Price an unsaved column before you add it. |
| `tables.executable_definitions.list_resolved` | plugin | Read source definitions the catalog will actually run. |
| `sequence.sequences.create_from_worksheet` | plugin, catalog | Draft a sequence from a worksheet view. Does not start or send. |
| `sequence.sequences.step_options` | plugin | The step ids you may use. Do not invent a step. |
| `sequence.sequences.activate_audience` | plugin, catalog | Starts sending. Owner yes. `max_live_sends` in params when the schema lists it. |
| `sequence.sequences.resume` | plugin | Resume. Owner yes. Same send rule. |
| `workflow.workflows.activate` | plugin | Activate a workflow. Owner yes if it sends or spends. |
| `tables.profile_watcher.preview` | catalog | Free read of up to 10 person-profile URLs. No LinkedIn call. |
| `tables.profile_watcher.create` | catalog | Store a daily profile watcher. Needs `preview_hash` and `approved: true`. Owner yes. The create call does not write engager rows. Later runs spend up to `watcher_max_credits`. |
| `tables.profile_watcher.resume` | catalog | Restart that watcher after a fresh preview. Owner yes. |
| `tables.auto_run.set` | catalog | Run named columns when rows arrive, inside `max_credits_per_run`. Owner yes. |
| `social.content.artifact_create` | catalog | Draft. Channels the contract named as writable that day: linkedin, x, instagram, tiktok, facebook, youtube, threads, reddit. Re-fetch. LinkedIn's last line must be an ask or a question. |
| `social.content.artifact_get` | catalog | Read one draft, its revision, and its deliveries. |
| `social.content.plan` | catalog | Day mark. Status stays. Nothing publishes. |
| `social.content.unplan` | catalog | Clear the day mark. Not an unschedule. |
| `social.content.schedule` | catalog | Arms a future publish. Owner yes. Dispatch still needs the current version approved. |
| `social.content.approve` | catalog | Binds the current body and media. Does not publish. Owner yes on that version. |
| `social.content.media_upload_url` | catalog | Signed upload URL for media on a draft. |
| `social.content.tracking_link_create` | catalog | Short link. Checks the destination. Does not announce the link. |
| `social.content.tracking_link_get` | catalog | Read one short link, including `first_click_at` when the tool returns it. |
| `social.outreach.keyword_dm_rules.list` | catalog | Read rules on one artifact. Required before a replace. |
| `social.outreach.keyword_dm_rules.replace` | catalog | Replaces the whole rule set. Omitting a rule deletes it. An enabled rule messages commenters later. Owner yes on the exact set. |
| `social.comments.queue_list` | catalog | Comments waiting on your posts. Read. |
| `social.comments.reply` | catalog | Preview one reply. Does not post. |
| `social.comments.approve` | catalog | Posts that preview. Owner yes. `content_hash` must match. |
| `social.visuals.source_create` | catalog | Store HTML, CSS, or SVG. |
| `social.visuals.source_get` | catalog | Read one stored source, including bytes. |
| `social.visuals.source_list` | catalog | List sources. No bytes. |
| `social.visuals.render_preview` | catalog | Page count and size. Does not render. |
| `social.visuals.render_start` | catalog | Queue PNG or PDF. Scale is 1 or 2. Pass the `scope_hash` from the preview. |
| `social.visuals.render_get` | catalog | Render status. File ids for `social.visuals.file_get` or `social.visuals.download_url`, which that contract names. Fetch those two before use. |
| `visibility.linkedin.engagement_harvest` | catalog | Reactions and commenters on one LinkedIn post, into a worksheet. Dry run, then owner yes. Does not message anyone. |
| `visibility.linkedin.engagement_status` | catalog | State of that harvest. |
| `visibility.linkedin.engagement_engagers` | catalog | People already collected. Local read. |
| `unibox.inbox.unified_list` | catalog | Stored conversations. Use tab `needs_action` for a bounded slice. |
| `unibox.inbox.reply_draft_edit` | catalog | Save reply text on a conversation. Does not send. |
| `unibox.context.thread_reply_send` | catalog | Sends the reply. Owner yes on that text. |
| `knowledge.brain.context.compose_pages` | catalog | Write a folder of Company Context pages. Dry run, then owner yes. Each page needs `source_url` or `provenance_note`. |
| `knowledge.engagement.people_engaged_n_times` | catalog | Counts mailbox interactions (`email_sent`, `email_received`, `meeting`). Not LinkedIn likes. |
| `sequence.campaigns.create` | catalog | Draft campaign. Creating does not launch. |

`column.ai_fit_score` is a column definition id, not a `tools_run` capability. One column returns one score from 0 to 100. This desk uses two columns, company and person. Views read `fit_score.score` (the plugin calls that numeric `fit_score_value`). Missing data is unsure. A Required fail with evidence scores 0. Do not add a second `column.ai` to hold the same score.

## To-check

Search, then `tools_get`. Do not call these from memory.

| Look up | Why it is open |
|---|---|
| `social.content.media_uploaded` | Team docs name it as the pair to `media_upload_url`. Not fetched. |
| `social.content.article_enabled_get`, `social.content.article_create` | Native articles only if the flag is on. Not fetched. |
| `social.posts.comment_publish` | Public comment. Team docs say 2 credits. Not fetched. This desk drafts comments locally and does not call it. |
| `social.content.artifact_list`, `social.channels_list`, `senders.social_accounts.list` | Named inside fetched contracts as resolvers. Fetch before you need the list. |
| `sequence.sequences.copy_preview` | Team docs say it shows which tokens resolve. Not fetched. |
| `tables.x_post_engagers.run` | Team docs: 0 credits and it calls X. Not a LinkedIn harvest. Owner yes. Not fetched. |
| `visibility.radar.inspiration_linkedin_list`, `visibility.radar.inspiration_x_list`, `visibility.analytics_query`, `visibility.linkedin.followers_import` | Named in team charters. Not fetched. |
| `knowledge.vault.ingest` | Team docs: creates a note, and a second call duplicates it. Not fetched. |

`social.content.auto_publish_set` and `social.content.approval.authorize_publish` are named in the team rules as calls this desk does not make.

## Reads that are not sends

A profile watcher watches person profiles you name (at most 10 URLs). It is not the harvest of people who touched a post. Post engagers use `visibility.linkedin.engagement_harvest`.
