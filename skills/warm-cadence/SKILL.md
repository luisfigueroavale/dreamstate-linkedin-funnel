---
name: warm-cadence
description: "Build a short draft sequence for people who already fit, with a daily cap and fallback copy. Use after fit is accepted. It does not activate."
---

Follow `docs/skill-frame.md`.

Sequences: new conversation, even one recipient; cadenced outreach; outreach to more than one recipient. Existing thread: `thread-reply`. No-cadence email is not a sequence. Public comment: `comment-queue`. File request: `magnet-send`, file first. Fit does not condition handoff. Do not activate in the same step as delivering the file.

Only rows that passed both scores. A required unknown is a hold and is not enrolled. Hold is not sent. `tables.profile_watcher` and fit column do not enroll. Reviewed cohort. In-thread rows stay out unless owner names them. Exclusions, suppression, prior-contact rules, and tags stay out.

Buyer fit and exact public context first. Match what they did. Evidence-based, adaptable, short, not timed, not a rate claim. Three steps or fewer. No questionnaire.

Post words for topic, comment's actual point, one experience you stand behind, and whether that problem is their work. A relevant question beats a like. File ask or product weighing only if true. No reaction-only observation. Waiting or public follow-up can be right. Do not say you saw a like. One question. No offer. No calendar link unless they asked to meet. No side pitch off file handoff.

Ask today's work and stuck point, only what they shared. If the offer addresses that problem, proportionate: one relevant example, part of asset, or one evidenced suggestion. Conversation picks: answer, resource, signup, demonstration, or call. Stop on decline or stop request. Reply stops stay on. Replies go to `thread-reply`.

`tools_get` before every `tools_run`. Step ids from `sequence.sequences.step_options`. Invent no step. Read definition, version, ordered steps, delays, variants, send window, time zone, channel fallback.

`senders.linkedin_accounts.list` and `senders.social_accounts.list`: account, mailbox, health, limits. Stable recipient-to-sender binding. Connected is not ready. No mailbox setup here. No guessed name.

`sequence.sequences.create_from_worksheet` drafts and does not start. Nothing was sent. Map identity and worksheet variables only. Fallback copy on row-field steps. Empty fields must still be a sentence. `{{first_name}}` only with a real `first_name` column. Else `tables.columns.add` as a formula, or do not greet by name.

Preview scope and row variables: at least 3 rows, including one thin row, via `sequence.sequences.copy_preview` (`sequence_id` required). Free read. Refused dry_run runs live; say it was a read. Report unresolved identities, tokens.

Before activation, inspect preview and sending scope. Draft or paused enrollments may stay pending. Active may deliver after enrollment. Enrollment is not dispatch. No lifetime ceiling. `max_live_sends` in params covers at least dry-run recipient count, not authorization. Inspect bounces when channel has them. Invent no bounce count.

Activation ask names both `max_new_enrollments_per_day` and `max_live_sends`. `sequence.sequences.activate_audience` is a separate yes on that audience and text and starts sending. Authorized scope, fetched gates. Dry_run if offered. Show recipient count, credit estimate, `quote_hash`. Live repeats hash, `max_credits` at dry-run ceiling, new `idempotency_key`. No second start. Never `sequence.linkedin.auto_engagements.replace` or `sequence.x.auto_engagements.replace`.

Record enrollment id, variant, run id. Events and counts: search, then `tools_get`. Invent no id. Keep sender attribution. Missing identity stays unattributed. Separate delivered, replies, qualified conversations, opportunities. Keep source post and profile. Signups and meetings differ from opportunities and revenue. Ungiven numbers stay unknown.

Recovery: preview failed or deferred rows, reconcile provider outcomes before retry. Discover pause, resume, retirement, and capacity recovery separately. `sequence.sequences.resume` is resume only (owner yes, same send rule, `max_live_sends` in params when listed), not pause, retirement, or capacity recovery.

Return counts, held reasons, state, budget. Deep link only if returned.
