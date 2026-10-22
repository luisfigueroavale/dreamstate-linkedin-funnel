---
name: thread-reply
description: "Draft one reply in an existing thread for the owner to send. Use for LinkedIn or email threads already open. It does not start a new sequence."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Draft the reply

Read the thread both ways. Classify the last inbound message from its words: interested, question, objection, not now, wrong person, referral, unsubscribe, or unclear. Quote the line that decided it.

Confirm sequence stop state is stopped before you offer a send. Active or unknown: say so and do not offer a send. The plugin field name is `sequence_stop_state`. If the read does not return it, say the stop state is unknown.

Answer their last message. Usually under 240 characters. One next step. No meeting push unless they asked. Match their language. Do not paste a model suggestion as if it were theirs.

Save with `unibox.inbox.reply_draft_edit` after `tools_get`. Show channel, account, recipient, and the final text. Send only if they yes that text, via `unibox.context.thread_reply_send`.

## Done

The classification, the stop state, and the draft text. Sent or not sent.
