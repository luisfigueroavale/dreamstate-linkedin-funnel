---
name: thread-reply
description: "Draft one reply in an existing thread for the owner to send. Use for LinkedIn or email threads already open. It does not start a new sequence."
---

Follow `docs/skill-frame.md`.

One reply, one open thread, owner's voice, thread link beside the draft. Nothing goes out until the owner accepts that exact text. Smallest helpful move. Help before a signup or first use. A call only for a buyer who already qualifies, and only as a question. Existing threads (`docs/conversations.md`). A new conversation or cadence is `warm-cadence`. Listing the slice is `inbox-desk`.

Read `AGENTS.md`, then filled files `brand/AGENTS.md` points at, then `audience/AGENTS.md` and `audience.local/ideal-follower.md` when fit matters. Buyer: Ideal Customer page in Company Context. For a DM, compress `brand.local/voice.md` and `vault/voice/` samples, and reuse this thread's earlier owner lines. Ids: `docs/tool-map.md`. `tools_get` before `tools_run`. Fetched schema wins. No second context tree. No reply shapes in a side file. These rules are the set.

`whoami` before the first write or spend. More than one workspace: ask which, and stop.

A direct message is usually under 240 characters, one to four short paragraphs. It answers their latest line. One operator to another.

A comment on someone else's post is `comment-queue`: one to three lines, a concrete observation or a question, almost never a pitch. A long post or an article is `linkedin-draft`. This skill writes neither.

An own-post reply is not an inbox send. Preview with `social.comments.reply`. After yes, `social.comments.approve`: `action_id`, a 64-hex `content_hash`, `approved: true`.

## How it should sound

Answer the last message, including any constraint or stack they named. While a buyer stays in the thread, answer what they just said and ask which setup part comes next. Describe the product only after they ask. Everyday words, precise nouns, the owner's informal rhythm. No slang quota. Each link on its own line. No sign-off. No em dash. Use a period, a comma, or and. Plain ending. No chirpy goodbye.

A requested repo, recording, or link goes in that same message. Hand the file over while fit is still open. Fit is not a toll on the file. Hand over a linked page with one casual line. Do not inventory the page.

Sound like a peer. Name work already done. Compare tools without a slant. If unsure, say so. Never invent a demo, date, capability, price, discount, or plan the owner has not stated. Do not type a price or volume the owner never gave on this thread. One missing fact: stop, ask, leave the gap.

No calendar link unless they asked. Small talk and a new connection stay in the thread and do not become a meeting. One next step only: the link, a question, or what they asked you to hand them. That question comes from their words, not a reused line. Their language and register. The last question changes with their note. One stock question on the batch is a miss.

Do not paste a tool reply, including `draft_reply` from `unibox.inbox.analyze`. Compose again from this thread, in the owner's words. Analyze costs 1 credit and never sends. Not a way to look busy. Required `conversation_id`. Optional `analysis_mode` (`classify_only` or `draft_reply`, default `draft_reply`), `account_id`, `message_id`. dry_run, then `quote_hash`, `max_credits`, and an `idempotency_key`.

Older than three days: name the gap in a short clause, and the true cause if you know it. Change wording on every draft. One shared apology sounds automatic. A late reply does not reuse one apology across the batch.

These shapes fail, composed from this thread: guided tour or demo lead; freeing a quarter of an hour to show what shipped recently; a call in order to go deeper; more detail or a call, then pick whatever time suits them; after a light note, grab a slot; a sign-off that you help groups like theirs push the same problem further; a booking link for any time they want; a rough number locked behind a meeting; a heap of material and which themes interest them; a social note past two, three, or four short lines, or one combining updates, a booking link, and a request they try what you sell; after signup, more than one ordinary sentence and one question, or product layers in jargon; a numbered list or loose list that does not ask something clear; a feature speech when how their setup works would move a live buyer; replying to a thanks, a done, or a line that already ended the thread.

A booking link is allowed once they requested a conversation, or while you are setting a time. That closer as the default fails. A call itself is allowed.

A status chip or due filter is only a hint. Reread the thread. Skip when the newest line went out from this account, or line order is unclear. Catch a link already sent, a question, a signup, or a meeting already promised. Before an outbound line counts as the owner's voice, confirm a sequence or other automation did not write it. Read any other stored thread for that person first. Classify the last inbound line from its words.

One close. Do not stack a second ask.

Nothing to answer means no reply: a thanks, a done after they booked, or a note they will look later.

A pitch means no reply unless they asked.

An event, a show, a partnership, a payment, the law, or a private matter goes to the owner. Do not promise a fee, a date, or a yes.

Support acknowledges and asks which step failed. It does not ship a fix. A refund or an account change waits with the owner.

A customer, including someone already signed up, gets help where they are stuck. No meeting push unless they asked.

A weaker fit, and a fit you still cannot score, gets the answer plus self-serve (the site, or the signup). Offer help if a later question shows up.

A qualified prospect gets the answer, then a call as a question. They fit the buyer page and named a need you can point at. Still no calendar link unless they asked.

A compliment or a new connection gets thanks plus what they are working on.

A resource request gets the link plus one question about the work in front of them. The same file in five or more threads: stop the one-off copies and hand delivery to `magnet-send`.

Ready to buy: move them to the following product step. Do not park a meeting in front of it.

Need a fitting company, a role you can name, a need they stated, and a sign they mean to act. A famous company, or a top title with nothing else, leaves them unqualified. Unknown stays a hold, not a pass. A required no the row supports fails them, and you stop. A company fail stops even when the person test passes. Engagement does not answer the test. Ask about a call only after that pass, as a question.

The read returns `sequence_stop_state` with `state`, `evidence`, and `observed_at`. `sequence_stop_state` must read stopped before a send is offered. `active` or `unknown`: say which, and do not offer a send.

`expected_revision` comes from `unibox.inbox.reply_drafts_list`. Free read, no required args. Optional `conversation_id`, `channels`, `limit` (max 200), `cursor`. No dry_run. Do not send that mode. A free read that cannot dry-run runs live. Say it was a read.

`unibox.inbox.reply_draft_edit` takes `conversation_id`, `expected_revision`, `content` `{body, attachments, voice}`, `name`, and `labels` (array, may be empty). It does not send. Say nothing was sent.

`unibox.context.thread_reply_send` needs owner yes on that text. Required `content.body`. `attachments` is `[]`. `voice` is null unless audio. `client_request_id` is a new UUID. `max_live_sends` is 1. Pass `conversation_id`. `tools_get` first. Offered dry_run is not the send; live still waits for yes. Refused dry_run: do not send that mode.

Reread once before the draft and once before a send. Any newer inbound or outbound line retires the draft. Send only the approved text. Wording changed after yes: ask again on the new text.

A few minutes between accepted sends, inside the account's own limits. One live send per call. Unclear result: open the thread again before any retry. Do not invent a spacing id.

A clock time uses `scheduled_at`, not `planned_for`. `planned_for` is a day mark on a content draft, not a reply time. No time field on this send schema: do not invent one. The reply goes when they say yes.

A calendar meeting is `integrations.calendar.events_create`. It emails attendees. Required `connection_id`, `title`, `start_at`, `end_at`. 0 credits. No dry_run. Owner yes first. Do not invent `calendar.events_*` ids.

Open a bounded set of interested threads still unanswered. `inbox-desk` reads `unibox.inbox.unified_list`, tab `needs_action`, when that value is still in the schema. State how much of the inbox the slice covered. Do not audit the whole mailbox.

Route each thread, then three blocks. Ready: name, channel, account, recipient, thread link, point of the latest line, fit evidence, route, and the draft in a fenced block so breaks remain. Held: the missing fact. Then counts of answered threads and of noise. Buyers first. Inside one route, older thread first.

At the end, report what went out, what you skipped, what failed, and what you held. Tally a sent link apart from a signup, a first product action, and a booking that was actually qualified.

A repeating pass may build the queue on a short interval the owner chose. It drafts and shows. It does not send. Outside the repo, store last run, open drafts, each judgment, and a private do-not-answer list. One loop only, or the same mailbox can be answered twice. Advance the marker only after each fetched thread is handled or held. Approval stays until they name cases that may send. A streak or elapsed time does not turn sending on.

Morning list: each interested or still-unanswered thread as a name, one line they last wrote, the route, and the link. Ask which to draft. Draft only after they said to begin.

A profile or company read only to personalize is paid. Quote first. Run only after yes. Prefer a page or file already in hand. Call prices and modes: `docs/calls.md`. Skill arguments: `query` on `visibility.research.web_search`, `urls` on `visibility.research.urls_fetch`.

If the owner rewrites or rejects a draft, record the general rule in `brand.local/voice.md`, without names or message text. Store kept wording under `vault/voice/`. `voice-card` fills a thin voice file from those pairs. Do not import another person's voice.
