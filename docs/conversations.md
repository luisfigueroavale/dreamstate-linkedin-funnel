# Conversations

Drafts are local or stored as Dreamstate drafts. Sends wait for your yes on the exact text.

## Someone asked for the file

They commented the keyword, or they asked in a DM you already have.

1. `send-lead-magnet` prepares the tracked link and the reply text.
2. The public reply and the DM are shown together: account, person, keyword, link, both texts.
3. You say yes to that pair, or you say yes to a keyword rule whose text you have read. A rule is a standing send. See [lead-magnet.md](lead-magnet.md).
4. The next note, if you want one, is a short question about the asset. It does not pitch. It does not go out on a timer. A sequence step waits for its own yes at activation.

Do not tell them you watched them. They asked. Answer the ask.

## Someone engaged and did not ask

`score-post-engagers` has a pass on both fit columns, every required qualifying question is yes with evidence, and there is no open thread. A hold or a stop is not enrolled and is not sent a note.

The note names the topic of the post, in words that post actually used. It does not say "I saw you like this." One question. No offer, no calendar link, unless they already asked for a meeting. Three steps or fewer if you later approve a sequence. Daily cap set on the sequence. People already in a thread stay out unless you name those rows.

Show the rendered text for at least three rows, including one thin row, before you talk about enrollment. `sequence.sequences.create_from_worksheet` builds a draft and does not start it. Activation is `sequence.sequences.activate_audience` and needs a yes. There is no lifetime ceiling on those sends. Read that again before you activate.

Fallback copy is required on every step that uses a row field. Empty fields must still read as a sentence. Do not use a token the worksheet does not have. `{{first_name}}` resolves only when a real `first_name` column exists. The team notes say a bare `{{first_name}}` will not resolve by magic. Add the column with `tables.columns.add` as a formula, or do not greet by name.

## A thread that already exists

`triage-inbox` lists `needs_action`. `draft-thread-reply` drafts one reply. Read the thread both ways. Classify the last inbound message from its words. Confirm the sequence stop state is stopped before you offer a send. If it is active or unknown, say so and do not offer a send.

The draft answers their last message, usually under 240 characters, one next step, no meeting push unless they asked, in their language. Show channel, account, recipient, and the final text. Save with `unibox.inbox.reply_draft_edit` (`expected_revision`, `name`, `labels`, and `content` with `body`). Send with `unibox.context.thread_reply_send` only after yes: `content.body`, a new `client_request_id`, and `max_live_sends` 1.

`unibox.inbox.analyze` costs 1 credit and never sends. Required `conversation_id`. Optional `analysis_mode` (`classify_only` or `draft_reply`, default `draft_reply`), `account_id`, `message_id`. dry_run, show `quote_hash`, then live with `max_credits` and an `idempotency_key`. Do not analyze a pile of threads to look busy. `unibox.inbox.reply_drafts_list` is a free read with no required args (optional `conversation_id`, `channels`, `limit` up to 200, `cursor`). Do not send dry_run to that list.

A meeting on the calendar is `integrations.calendar.events_create`. It emails every attendee. Owner yes first. Do not invent `calendar.events_*`.

## Comments you might leave on other people's posts

`draft-linkedin-comments` and `draft-x-replies` write a local queue. You post them, or you say yes on that exact text. `social.engagement.comment` previews until `approved` is true. `social.posts.comment_publish` is 2 credits. dry_run previews; live repeats `quote_hash` with `max_credits` 2. Required `channel` `"linkedin"`, `account_id`, `target_post_urn`, `body`, and `consequence` `"public_comment"`. It runs only from an approved durable run step, or the call returns 409 `durable_run_step_required`. Owner yes on that exact body. Both wait for yes. Never call `sequence.linkedin.auto_engagements.replace` or `sequence.x.auto_engagements.replace`.
