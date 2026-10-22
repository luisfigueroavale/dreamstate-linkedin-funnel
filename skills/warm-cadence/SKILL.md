---
name: warm-cadence
description: "Build a short draft sequence for people who already fit, with a daily cap and fallback copy. Use after fit is accepted. It does not activate."
---

Follow `docs/skill-frame.md`.

A new conversation is a sequence, even for one recipient. Cadenced outreach is a sequence. Outreach to more than one recipient is a sequence. An existing thread goes to `thread-reply`. A direct email with no cadence is not a sequence. A public comment stays in `comment-queue`. Someone who asked for the file goes to `magnet-send`, which hands the file over first. Fit is not a condition of that handoff. Do not activate in the same step as delivering the file.

Only rows that passed both scores. A required unknown is a hold and is not enrolled. Hold is not sent. `tables.profile_watcher` does not enroll anyone. The fit column does not enroll anyone either. Start from a reviewed cohort. People already in a thread stay out unless the owner names those rows. Exclusions, suppression, prior-contact rules, and tags stay out.

Check buyer fit first, and the exact public context. The message fits what that person did. It is grounded in that recipient's actual context. Copy is evidence-based. Samples are adaptable. They are not copy you send on a timer, and they are not a claim about a rate.

Length stays short. Ask one easy question about their situation. Three steps or fewer. Do not send a questionnaire.

The note may name the post's topic in words that post used, their comment's actual point, and one experience you can stand behind. It may ask whether that problem is work they are in. A comment that raises a relevant question gives you more than a like. Do not say they asked for the file, and do not say they are weighing a product, unless that is what they did. When a reaction is all you have, do not invent a personal observation. Waiting can be right. So can a public follow-up.

The note does not say you saw a like. One question. No offer. No calendar link unless they already asked for a meeting. Do not turn the file handoff into a pitch about something else.

Ask what they do today. Ask where it gets stuck for them. Then use only what they already shared. Offer something specific only after they describe a problem the offer addresses: one relevant example, a part of the asset, or one concrete suggestion of your own, backed by evidence you can stand behind. Make a proportionate invitation. Let the conversation determine it. The next step might be an answer. It might be a resource or a signup. It might be a demonstration or a call.

Stop when they decline. Stop when they ask you to stop. Reply stops stay on. A reply leaves this cadence and goes to `thread-reply`.

`tools_get` before every `tools_run`. Step ids come from `sequence.sequences.step_options`. Do not invent a step. Read the definition and its version, the ordered steps, the delays, any variants, the send window and its time zone, and any channel fallback the step list actually contains.

Read sender profiles with `senders.linkedin_accounts.list` and `senders.social_accounts.list`: the exact account, any mailbox, health, and channel limits. Keep a stable recipient-to-sender binding. Seeing a connected sender does not prove readiness. Mailbox setup is not bundled in this skill. Do not fetch it by a guessed name.

`sequence.sequences.create_from_worksheet` builds a draft and does not start it. Say that nothing was sent. Map recipient identity and only variables the worksheet has. Fallback copy on every step that reads a row field. Empty fields must still read as a sentence. `{{first_name}}` only when a real `first_name` column exists. Otherwise add that column with `tables.columns.add` as a formula, or do not greet by name.

Preview the real recipient scope. Render messages with the variables on that row. Preview at least three rows, including one thin row, with `sequence.sequences.copy_preview` (`sequence_id` required). That read is free. Follow the fetched schema. If it refuses dry_run, run it live and say it was a read. Report unresolved identities individually. Report each token that does not resolve.

Before activation, inspect the current preview and the sending scope. Draft or paused enrollments may remain pending. An active sequence may deliver after enrollment. Enrollment and dispatch are separate actions. Put the daily cap in the ask. There is no lifetime ceiling. `max_live_sends` in params is the live-run cap for that activation, not a lifetime budget. A cap is not authorization. Inspect bounce behavior when the channel has it. Do not invent a bounce count.

`sequence.sequences.activate_audience` starts sending. Owner yes on that activation, on that audience and that text. Send only the scope they authorized, inside the gates the fetched contract names. Dry_run first when that mode exists. Show the recipient count, the credit estimate, and `quote_hash`. The live call repeats that hash, sets `max_credits` to the dry-run ceiling, and uses a new `idempotency_key`. `max_live_sends` sits in params and covers at least the dry-run recipient count. Do not add a second start call beside that activation. Never call `sequence.linkedin.auto_engagements.replace` or `sequence.x.auto_engagements.replace`.

Record the enrollment id, the variant, and the run id the call returns. For events and outcome counts, search, then `tools_get`. Do not invent that id. Preserve actual sender attribution. A missing identity stays unattributed. Keep delivered messages, replies, qualified conversations, and opportunities apart. Preserve the source post where known. Keep the source profile on the row. Signups and meetings are different outcomes from opportunities and from revenue. A number you were not given stays unknown.

For recovery, preview the narrow failed or deferred scope. Reconcile provider outcomes before any retry. Pause is separate from resume. Retirement is separate from capacity recovery. Discover each one before you act. `sequence.sequences.resume` is resume. Owner yes. Same send rule, including `max_live_sends` in params when the schema lists it. Do not treat resume as a pause, a retirement, or a capacity recovery.

Return counts, the held reasons, the actual state, and the budget you set. Include a deep link only when the call returned one.
