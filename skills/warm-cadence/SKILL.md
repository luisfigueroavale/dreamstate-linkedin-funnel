---
name: warm-cadence
description: "Build a short draft sequence for people who already fit, with a daily cap and fallback copy. Use after fit is accepted. It does not activate."
---

Follow `docs/skill-frame.md`.

A sequence is a new conversation, even with one recipient; cadenced outreach; or outreach to more than one recipient. An existing thread goes to `thread-reply`. Email with no cadence is not a sequence. A public comment goes to `comment-queue`. A file request goes to `magnet-send`, and the file goes first. Fit does not condition handoff. Do not activate in the same step as delivering the file.

Take only rows that passed both scores. A required unknown is a hold and is not enrolled. Hold is not sent. `tables.profile_watcher` and the fit column do not enroll anyone. Use a reviewed cohort. In-thread rows stay out unless the owner names them. Exclusions, suppression, prior-contact rules, and tags stay out.

Buyer fit and exact public context first. Match what they did. Evidence-based, adaptable, short, not timed, not a rate claim. Three steps or fewer. No questionnaire.

Use the post's words for the topic, the comment's actual point, one experience you stand behind, and whether that problem is their work. A relevant question beats a like. File ask or product weighing only if true. No reaction-only observation. Waiting or public follow-up can be right. Do not say you saw a like. One question. No offer. No calendar link unless they asked to meet. No side pitch off file handoff.

Ask about today's work and the stuck point, and only what they shared. If the offer addresses that problem, proportionate: one relevant example, part of asset, or one evidenced suggestion. The conversation can pick an answer, the resource, one signup, a demonstration, or a call. Stop on decline or stop request. Reply stops stay on. Replies go to `thread-reply`.

`tools_get` before every `tools_run`. Step ids from `sequence.sequences.step_options`. Invent no step. Read definition, version, ordered steps, delays, variants, send window, time zone, channel fallback.

From `senders.linkedin_accounts.list` and `senders.social_accounts.list`, read the account, the mailbox, health, and limits. Stable recipient-to-sender binding. Connected is not the same as ready. Do no mailbox setup here. Do not guess a name.

`sequence.sequences.create_from_worksheet` drafts and does not start. Nothing was sent. Map identity and worksheet variables only. Fallback copy on row-field steps. Empty fields must still be a sentence. `{{first_name}}` only with a real `first_name` column. Else `tables.columns.add` as a formula, or do not greet by name.

Preview scope and row variables: at least 3 rows, including one thin row, via `sequence.sequences.copy_preview` (`sequence_id` required). Free read. Refused dry_run runs live; say it was a read. Report unresolved identities and tokens.

Before activation, inspect preview and sending scope. Draft or paused enrollments may stay pending. Active may deliver after enrollment. Enrollment is not dispatch. No lifetime ceiling. `max_live_sends` in params covers at least dry-run recipient count, not authorization. Inspect bounces. Invent no bounce count.

The ask names both `max_new_enrollments_per_day` and `max_live_sends`. `sequence.sequences.activate_audience` is a separate yes on that audience and text and starts sending. Stay in scope and fetched gates. Use dry_run if offered. Show recipient count, credit estimate, `quote_hash`. Live repeats the hash, sets `max_credits` at the dry-run ceiling with new `idempotency_key`. Do not restart. Never call `sequence.linkedin.auto_engagements.replace` or `sequence.x.auto_engagements.replace`.

Record the enrollment id, the variant, and the run id. For events and counts, search, then call `tools_get`. Invent no id. Keep the named sender. A missing identity stays unnamed. Count delivered, replies, qualified talks, and opportunities apart. Keep source post and profile. Signups and meetings differ from opportunities and revenue. Ungiven numbers stay unknown.

For recovery, preview the failed or deferred rows, and reconcile provider outcomes before a retry. `sequence.sequences.resume` is resume only (owner yes, same send rule, `max_live_sends` in params when listed), not pause, retirement, or capacity recovery.

Return the counts, the held reasons, the state, and the budget. Give a deep link only if one was returned.
