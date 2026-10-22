---
name: thread-reply
description: "Draft one reply in an existing thread for the owner to send. Use for LinkedIn or email threads already open. It does not start a new sequence."
---

Follow `docs/skill-frame.md`.

One reply, one open thread, in the owner's voice. Put the thread link next to the draft. Nothing goes out until the owner accepts that exact text. Aim at the smallest move that helps. Help comes before a signup or a first use. A call is only for a buyer who already qualifies, and only as a question. This skill answers a thread that already exists (`docs/conversations.md`). A new conversation, or a cadence, is `warm-cadence`. Listing the slice is `inbox-desk`.

## Before the draft

Read `AGENTS.md`, then the filled files `brand/AGENTS.md` points at, then `audience/AGENTS.md` and `audience.local/ideal-follower.md` when the reply depends on fit. The buyer is the Ideal Customer page in Company Context. For a DM, compress `brand.local/voice.md` and the samples in `vault/voice/`, and reuse the owner's own earlier lines in this thread. Ids live in `docs/tool-map.md`. `tools_get` before `tools_run`. The fetched schema wins. Do not build a second context tree, and do not keep reply shapes in a side file. The rules in this skill are the set.

`whoami` before the first write or spend. If more than one workspace comes back, ask which one and stop.

## Which surface

A direct message is usually under 240 characters, across one to four short paragraphs. It answers their latest line. It is specific, one operator writing to another.

A comment on someone else's post belongs to `comment-queue`: one to three lines, a concrete observation or a question, and almost never a pitch. A long post or an article belongs to `linkedin-draft`. This skill writes neither.

A reply on your own post is not an inbox send. Preview it with `social.comments.reply`. Publish that preview with `social.comments.approve` only after yes: `action_id`, a 64-hex `content_hash`, and `approved: true`.

## How it should sound

Answer the last message, including the constraint or the stack they named. While a buyer is still in the thread, respond to what they just said and ask which part of their setup comes next. Describe the product only after they ask for that. Everyday words, precise nouns, the owner's informal rhythm. Do not chase a slang quota. Put each link on a line by itself. Leave off the sign-off.

When they asked for a repo, a recording, or a link, that artifact goes in the same message. Hand over the file even while fit is still open. Fit is not a toll on the file.

Sound like a peer. Name work they have already done. Compare tools without a slant. If you are unsure, say so. Never invent a demo, a date, a capability, a price, a discount, or a plan the owner has not stated. When one fact is missing, stop the draft and ask the owner. Leave the gap. Do not fill it.

No calendar link unless they asked. Small talk, and a new connection, stay in the thread. They do not become a meeting. One next step, and only one: the link, a question, or the thing they asked you to hand them. That question has to come from their words, not from a line you reuse. Write in their language, and at their register.

Do not paste a reply a tool already wrote, including a `draft_reply` from `unibox.inbox.analyze`. Compose it again from this thread, in the owner's words. That analyze call costs 1 credit and never sends. It is not a way to look busy. Required `conversation_id`. Optional `analysis_mode` (`classify_only` or `draft_reply`, default `draft_reply`), `account_id`, `message_id`. dry_run, then `quote_hash`, `max_credits`, and an `idempotency_key`.

If their last note is older than three days, name the gap in a short clause, and include the true cause if you know it. Change the wording on every draft in the batch. One shared apology makes the set sound automatic. No em dash. Use a period, a comma, or the word and.

## Prove a reply is still owed

A status chip, or a filter that says a reply is due, is only a hint. Reread the thread. Skip it when the newest line went out from this account, or when the order of lines is unclear. Read far enough to catch a link already sent, a question, a signup, or a meeting already promised. Before you treat an outbound line as the owner's voice, confirm a sequence or some other automation did not write it. If the same person has another thread this inbox already stores, read that one before you draft.

Classify the last inbound line from its words.

## Routes

Use one close. Do not stack a second ask on top.

Silence is the reply when there is nothing to answer: a thanks, a done after they booked, or a note that they will look later.

A pitch aimed at the owner gets no reply unless they asked for one.

An event, a show, a partnership, a payment, the law, or a private matter waits for the owner. Do not promise a fee, a date, or a yes.

Support acknowledges the problem, asks which step failed, and does not ship a fix. A refund or an account change waits with the owner as well.

A customer, including someone who already signed up, gets help at the point they are stuck. No meeting push unless they asked.

A weaker fit, and a fit you still cannot score, gets the answer and a self-serve path (the site, or the signup). Offer help if a later question shows up.

A qualified prospect gets the answer, then a call as a question. They fit the buyer page and they have named a need you can point at. Still no calendar link unless they asked.

A compliment or a new connection gets thanks, plus what they are working on.

A resource request gets the link and one question about the work in front of them. When that same file shows up in five or more threads, stop the one-off copies and hand delivery to `magnet-send`.

If they say they are ready to buy, move them to the following product step. Do not park a meeting in front of that step.

## Before a call is even a question

You need the company to fit, a role you can name, a need they stated, and a sign they mean to act. A well-known company, or a title near the top with nothing else beside it, leaves them unqualified. Unknown stays a hold, not a pass. A required no that the row actually supports fails them, and you stop. A company fail stops even when the person test passes. Engagement does not answer the test. Only after that pass do you ask about a call, and you ask it as a question.

## Save, then send

The conversation read returns `sequence_stop_state` with `state`, `evidence`, and `observed_at`. `sequence_stop_state` must read stopped before you offer a send. When `state` is `active` or `unknown`, say which, and do not offer a send.

`expected_revision` comes from `unibox.inbox.reply_drafts_list`. That call is a free read and has no required args. Optional `conversation_id`, `channels`, `limit` (max 200), `cursor`. No dry_run. Do not send that mode. A free read that cannot dry-run runs live. Say that it was a read.

`unibox.inbox.reply_draft_edit` takes `conversation_id`, `expected_revision`, `content` `{body, attachments, voice}`, `name`, and `labels` (array, may be empty). It does not send. Say that nothing was sent.

`unibox.context.thread_reply_send` only after yes on that text. `content.body` is required. `attachments` default `[]`. `voice` stays null unless the reply is audio. `client_request_id` is a new UUID. `max_live_sends` is 1. Pass `conversation_id` as well. `tools_get` first. If the schema offers dry_run, that pass is not the send, and the live call still waits for yes. If dry_run is refused, do not send that mode.

Reread the thread once before you present the draft, and once more before a send. Any newer line, inbound or outbound, retires what you were holding. Send only the text they approved. If the wording changes after that yes, ask again on the new text.

Put a few minutes between accepted sends, and stay inside the account's own limits. One live send per call. When a send's result is unclear, open the thread again before any retry. Do not invent a spacing id.

A clock time uses `scheduled_at`, not `planned_for`. `planned_for` is a day mark on a content draft, not a reply time. If this send schema has no time field, do not invent one. The reply goes when they say yes.

Putting a meeting on the calendar is `integrations.calendar.events_create`. It emails every attendee. Required `connection_id`, `title`, `start_at`, `end_at`. Owner yes first. dry_run is unsupported, so do not send it. Do not invent `calendar.events_*`.

## What you show

Open a bounded set of interested threads that are still unanswered. `inbox-desk` reads `unibox.inbox.unified_list` with tab `needs_action` when that value is still in the schema. State how much of the inbox the slice covered. Do not audit the whole mailbox.

Route each thread, then show three blocks. Ready: name, channel, account, recipient, thread link, the point of their latest line, the fit evidence, the route, and the draft inside a fenced block so the breaks remain. Held: the fact you still lack. Then a count of threads already answered, and a count of noise. Buyers come before every other route. Inside one route, the older open thread comes first.

When the pass ends, report what went out, what you skipped, what failed, and what you held. Keep a link you sent in a separate tally from a signup, from a first action inside the product, and from a booking that was actually qualified.

## A timed pass, and the morning list

A repeating pass may assemble the queue on a short interval the owner chose. It prepares drafts and shows them. It does not send. Outside the repo, store when that pass last ran, which drafts are still open, how each was judged, and a private list of people you will not answer. One loop only. A second loop on the same mailbox drafts the same people and can answer somebody twice. Advance the marker only after each fetched thread has been handled or held. The owner keeps approval until they explicitly allow sending for cases they name. Neither a streak nor time elapsed turns sending on.

For the morning, list each interested or still-unanswered thread as a name, a single line from what they last wrote, the route, and the link. Ask which ones to draft. Draft the queue only when they already said to begin.

A profile or company read that you would run only to personalize is paid. Quote it first, and run it only after yes. Prefer a page or a file already in hand. `visibility.research.web_search` costs 2 credits, needs `query`, and refuses dry_run. `visibility.research.urls_fetch` costs 1 credit, needs `urls`, and refuses dry_run. Quote `cost_policy`, wait, then go live with `max_credits` at that price and an `idempotency_key`.

## When the owner edits

If the owner rewrites a draft or turns it down, record the general rule behind that edit in `brand.local/voice.md`. Leave out names and the message text. Store the wording they kept as a sample under `vault/voice/`. `voice-card` fills a thin voice file from those pairs. Do not bring in another person's voice.

## Shapes that fail

Compose from this thread. These shapes are out:

- Do not lead with a guided tour, or with a demo.
- Do not ask them to free up a quarter of an hour so you can show what shipped recently.
- Do not propose a call in order to go deeper.
- Do not offer more detail or a call and then tell them to pick whatever time suits them.
- After a light note, do not announce that you will grab a slot.
- Do not sign off by saying you help groups like theirs push the same problem further.
- Do not drop a booking link and invite them to use it any time they want.
- Do not lock a rough number behind a meeting.
- Do not offer a heap of material and ask which themes interest them.
- Keep a social note to two, three, or four short lines. Do not combine a run of updates, a link for booking, and a request that they try what you sell.
- After a signup, write one ordinary sentence and one question. Do not stack product layers in jargon.
- A numbered list still has to end by asking something clear. A loose list with no question is not done.
- Do not type a price, or a volume, that the owner never gave you on this thread.
- Keep every em dash out of the DM.
- End in plain wording. Skip a chirpy goodbye.
- The last question has to change with their note. One stock question on the whole batch is a miss.
- A late reply does not reuse one apology across the batch.
- If asking how their setup works would move a live buyer forward, skip the feature speech.
- Hand over a linked page with a single casual line. Do not inventory the page.
- Leave a thanks, a done, and any line that already ended the thread unanswered.

You may include a booking link once they requested a conversation, or while you are already setting a time. What fails is using that closer as the default. A call itself is allowed.
