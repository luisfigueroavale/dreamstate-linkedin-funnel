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
| `tables.columns.add` | plugin, catalog | Add a column. Does not run it. Fit uses `binding_spec.definition_id` of `column.ai_fit_score`. |
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
| `social.content.schedule` | catalog | Arms a future publish. Required `expected_revision`, `scheduled_at`, `artifact_id`. Owner yes. Dispatch still needs `social.content.approve` on that version. |
| `social.content.approve` | catalog | Binds the current body and media. Does not publish. Owner yes on that version. |
| `social.content.media_upload_url` | catalog | Signed upload URL for media on a draft. |
| `social.content.tracking_link_create` | catalog | Required `destination_url`. Optional `artifact_id`, `platform`, `custom_slug`, `og`, `utm`. The DM uses the full destination plus UTM, not `short_url`. |
| `social.content.tracking_link_get` | catalog | Read one short link, including `first_click_at` when the tool returns it. |
| `social.outreach.keyword_dm_rules.list` | catalog | Read rules on one artifact. Required before a replace. |
| `social.outreach.keyword_dm_rules.replace` | catalog | Replaces the whole rule set. Omitting a rule deletes it. An enabled rule messages commenters later. Owner yes on the exact set. |
| `social.comments.queue_list` | catalog | Comments waiting on your posts. Read. |
| `social.comments.reply` | catalog | Preview one reply. Does not post. |
| `social.comments.approve` | catalog | Posts that preview. Required `action_id`, `content_hash` (64 hex), `approved: true`. Owner yes. |
| `social.visuals.source_create` | catalog | Store HTML, CSS, or SVG. |
| `social.visuals.source_get` | catalog | Read one stored source, including bytes. |
| `social.visuals.source_list` | catalog | List sources. No bytes. |
| `social.visuals.render_preview` | catalog | Page count and size. Does not render. |
| `social.visuals.render_start` | catalog | Queue PNG or PDF. Scale is 1 or 2. Pass the `scope_hash` from the preview. |
| `social.visuals.render_get` | catalog | Render status. File ids for `social.visuals.file_get` or `social.visuals.download_url`, which that contract names. Fetch those two before use. |
| `visibility.linkedin.engagement_harvest` | catalog | Required `worksheet_id`, `linkedin_account_id` (from `senders.linkedin_accounts.list`), `post_id`. Dry run is allowed and costs 0. Live needs yes. Does not message anyone. |
| `visibility.linkedin.engagement_status` | catalog | State of that harvest. |
| `visibility.linkedin.engagement_engagers` | catalog | People already collected. Local read. |
| `unibox.inbox.unified_list` | catalog | Stored conversations. Use tab `needs_action` for a bounded slice. |
| `unibox.inbox.reply_draft_edit` | catalog | Saves a draft. Required `conversation_id`, `expected_revision`, `content` `{body, attachments, voice}`, `name`, `labels`. Does not send. |
| `unibox.context.thread_reply_send` | catalog | Sends. Required `conversation_id`, `content.body`, `client_request_id` (new UUID). `max_live_sends` is 1. Owner yes on that text. |
| `knowledge.brain.context.compose_pages` | catalog | Write a folder of Company Context pages. Dry run, then owner yes. Each page needs `source_url` or `provenance_note`. |
| `knowledge.engagement.people_engaged_n_times` | catalog | Counts mailbox interactions (`email_sent`, `email_received`, `meeting`). Not LinkedIn likes. |
| `sequence.campaigns.create` | catalog | Draft campaign. Creating does not launch. |

`column.ai_fit_score` is a column definition id, not a `tools_run` capability. One column returns one score from 0 to 100. This desk uses two columns, company and person. Views read `fit_score.score` (the plugin calls that numeric `fit_score_value`). Missing data is unsure. A Required fail with evidence scores 0. `column.ai` was not found as a capability on 2026-10-22. Do not call it.

## Also confirmed on 2026-10-22

`tools_get` returned these contracts. Re-fetch before use.

| Id | Use |
|---|---|
| `integrations.calendar.events_create` | Sends an invite to every attendee. Required `connection_id`, `title`, `start_at`, `end_at`. Google mailbox. dry_run unsupported. Owner yes first. |
| `integrations.calendar.events_list` | Free read. `from`, `to`, `limit`, `cursor`. dry_run executes live. |
| `visibility.research.web_search` | 2 credits. Required `query`. Refuses dry_run. Live with `max_credits` 2 and `idempotency_key` after yes. |
| `visibility.research.urls_fetch` | 1 credit. Required `urls`. Refuses dry_run. Live with `max_credits` 1 and `idempotency_key` after yes. |
| `senders.linkedin_accounts.list` | Free read. Optional `limit`. Source of `linkedin_account_id`. |
| `senders.social_accounts.list` | Free read. Optional `platform`, `limit`. |
| `social.channels_list` | Free read. Optional `limit`. |
| `social.content.artifact_list` | Free read. Resolver for `artifact_id`. |
| `social.content.media_uploaded` | Pair of `media_upload_url`. Required `expected_revision`, `media_id`, `artifact_id`. |
| `social.content.unschedule` | Required `expected_revision`, `artifact_id`. Pulls an armed send that has not started. Not `unplan`. Does not retract a live post. |
| `social.content.generate_hooks` | Free. Required `user_request`, `platform`. dry_run allowed. |
| `social.draft_score` | Free read. Required `text`. dry_run executes the read. |
| `social.content.tracking_links_lookup` | Required `urls`. Free read. dry_run executes live. Call before create. |
| `social.content.article_enabled_get` | No params. If the flag is off, other article calls 404. |
| `social.content.article_create` | No cover field. Props include `title`, `funnel_stage`, `campaign_id`, `label_ids`. Cannot schedule. |
| `social.content.article_create_schedule` | Draft article plus artifact. `scheduled_date` omitted or null. A date is refused. |
| `social.content.article_update` | Required `article_id`, `expected_revision`, `title`, `body_json`. Title and body on every call. |
| `social.content.article_delivery_create` | Union of shapes. Two of them publish. Owner yes. LinkedIn `publish_directly: true` is rejected. |
| `social.posts.comment_publish` | 2 credits. Posts immediately, no preview. LinkedIn: `account_id`, `target_post_urn`, `body`, `consequence` `public_comment`. |
| `social.engagement.comment` | Preview when `approved` is omitted or the mode is smoke_test. Live posts only with `approved: true` and `idempotency_key`. Required `account_id`, `post_social_id`, `body`. The bare id `engagement.comment` is not a capability. |
| `social.linkedin_posts.comments_list` | Required `account_id`, `post_id`. Free external read. dry_run executes live. |
| `social.feeds.create` | Repeating source that can spend later. Required `table_id`, `kind`, `cadence`, `stored_max_credits`. Owner yes. |
| `social.outreach.keyword_dm_sends.list` | Required `artifact_id`. Read what a keyword rule already sent. |
| `social.content.post_feedback_record` | Required `artifact_id`, `feedback_text`. Appends a note. The bare id `post_feedback_record` is not a capability. |
| `sequence.sequences.copy_preview` | Required `sequence_id`. Free read of which tokens resolve. |
| `tables.x_post_engagers.run` | Required `account_id`, `max_rows` (1–500). Modes smoke_test and live. A dry_run request runs live. Owner yes. Not a LinkedIn harvest. |
| `visibility.radar.inspiration_linkedin_list` | Free read. dry_run executes live. |
| `visibility.radar.inspiration_x_list` | Free read. dry_run executes live. |
| `visibility.analytics_query` | Free read of a stored snapshot. Does not refresh. |
| `visibility.linkedin.followers_import` | Required `worksheet_id`, `linkedin_account_id`, `target_provider_id`. dry_run supported. 0 credits. |
| `visibility.linkedin.comments.refresh` | Required `delivery_id`. 0 credits. Articles and newsletters return 422. Not a comment publish. |
| `knowledge.vault.ingest` | Required `title`, `markdown`. Always creates a new note. A blank idempotency key is refused. Not for Company Context pages. |

## Definition ids

These are not `tools_run` targets. `tools_get` returns not found. Resolve them with `tables.executable_definitions.list_resolved`.

| Id | Kind |
|---|---|
| `column.ai_fit_score` | Fit column. One numeric score, 0–100. |
| `source.account_posts_linkedin_profile` | Source definition for posts on a LinkedIn profile. |
| `source.linkedin_posts_search` | Source definition for a LinkedIn post search. |

## Do not call

`social.content.auto_publish_set` and `social.content.approval.authorize_publish` are named in the team rules as calls this desk does not make.

`sequence.linkedin.auto_engagements.replace` and `sequence.x.auto_engagements.replace` replace an automatic like-and-comment set. Do not call them.

`senders.identities.inbox_scope_get` is an email mailbox allowlist. It is not the resolver for a LinkedIn inbox. Use `senders.linkedin_accounts.list` and `senders.social_accounts.list`.

## To-check

Search, then `tools_get`. Do not call these from memory.

| Look up | Why it is open |
|---|---|
| `tables.table_sources.attach` | Binds a definition id onto a table. Arguments were not fetched. |
| `social.linkedin_posts.get` | Named as the source of `post_id` for `comments_list`. Arguments were not fetched. |
| `unibox.inbox.reply_drafts_list` | Named as the source of `expected_revision` for a reply draft. Arguments were not fetched. |
| `unibox.inbox.analyze` | Price on the verified list is 1 credit. Arguments were not fetched. dry_run only if the schema allows it. |
| `visibility.analytics_refresh` | Named when `analytics_query` says a refresh is required. Arguments were not fetched. |
| `visibility.content.feedback.record` | Named for structured accept or edit metrics. Arguments were not fetched. Use `social.content.post_feedback_record` for a text note. |
| `visibility.linkedin_post_notifications_list` | Named as the read after `comments.refresh`. Arguments were not fetched. |
| `social.engagement.react` | Named on the live-approval list. Arguments were not fetched. |
| `column.ai` | `tools_get` returned not found on 2026-10-22. Do not invent an open-text column type. |

## Reads that are not sends

A profile watcher watches person profiles you name (at most 10 URLs). It is not the harvest of people who touched a post. Post engagers use `visibility.linkedin.engagement_harvest`.
