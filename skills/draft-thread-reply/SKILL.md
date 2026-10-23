---
name: draft-thread-reply
description: "Draft one reply in an existing thread for the owner to send. Use for LinkedIn or email threads already open. It does not start a new sequence."
---
# Draft a thread reply

Write one reply in one open thread, in the owner's voice, with the thread link beside the draft.
Follow `docs/skill-frame.md`.

## Use when

- The owner asks for one reply in a LinkedIn or email thread that is already open.

- Not a new sequence. A new conversation or cadence is `draft-warm-followups`.

- Listing the slice is `triage-inbox`.

- A comment on someone else's post is `draft-linkedin-comments`. A long post or an article is `write-linkedin-post`.

## Steps

1. Read with `AGENTS.md` (`references/read.md`).

2. Read (`references/read.md`).

3. If more than one workspace is listed, ask which, and stop (`references/read.md`).

4. Open the thread in `docs/conversations.md` (`references/route.md`).

5. Read `unibox.inbox.unified_list` through `triage-inbox` (`references/slice.md`).

6. Classify the last inbound line (`references/route.md`).

7. Compose the reply from this thread (`references/voice.md`, `references/shapes.md`).

8. Call `tools_get` before `tools_run` on `unibox.inbox.analyze` (`references/analyze.md`). Not a way to look busy.

9. Read with `unibox.inbox.reply_drafts_list` (`references/save.md`).

10. Save with `unibox.inbox.reply_draft_edit` (`references/save.md`).

11. Preview with `social.comments.reply` (`references/own-post.md`).

12. Call with `social.comments.approve` (`references/own-post.md`).

13. Read (`references/send.md`).

14. Send with `unibox.context.thread_reply_send` (`references/send.md`).

15. Create with `integrations.calendar.events_create` (`references/calendar.md`).

16. Quote with `visibility.research.web_search` and `visibility.research.urls_fetch` (`references/research.md`).

17. Hand (`references/handover.md`).

18. Record a rewrite in `brand.local/voice.md` (`references/voice.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 3 | `whoami` | read | no |
| 5 | `unibox.inbox.unified_list` | read | no |
| 8 | `unibox.inbox.analyze` | dry_run | no |
| 8 | `unibox.inbox.analyze` | live | yes |
| 9 | `unibox.inbox.reply_drafts_list` | read | no |
| 10 | `unibox.inbox.reply_draft_edit` | live | no |
| 11 | `social.comments.reply` | preview | no |
| 12 | `social.comments.approve` | live | yes |
| 14 | `unibox.context.thread_reply_send` | dry_run, then live | yes |
| 15 | `integrations.calendar.events_create` | live | yes |
| 16 | `visibility.research.web_search` | live | yes |
| 16 | `visibility.research.urls_fetch` | live | yes |


## Stop rules

- Follow the skill-frame writing rules.

- Nothing goes out until the owner accepts that exact text.

- Do not add a second context tree.

- Do not put reply shapes in a side file. These rules are the set.

- If more than one workspace is listed, ask which, and stop.

- This skill writes neither.

- Never invent a demo, date, capability, price, discount, or plan the owner has not stated.

- Do not type a price or volume the owner never gave on this thread.

- If one fact is missing, stop, ask, and leave the gap.

- No calendar link unless they asked.

- Do not paste a tool reply, including `draft_reply` from `unibox.inbox.analyze`.

- Analyze costs 1 credit and never sends.

- Not a way to look busy.

- Nothing to answer means no reply: a thanks, a done after they booked, or a note they will look later.

- A pitch means no reply unless they asked.

- Do not promise a fee, a date, or a yes.

- It does not ship a fix.

- A required no the row supports fails them, and you stop.

- A company fail stops even when the person test passes.

- Unknown stays a hold, not a pass.

- Engagement does not answer the test.

- `sequence_stop_state` must read stopped before a send is offered.

- If the state is `active` or `unknown`, say which, and do not offer a send.

- No dry_run. Do not send that mode.

- It does not send. Say nothing was sent.

- `unibox.context.thread_reply_send` needs owner yes on that text.

- If dry_run is refused, do not send that mode.

- Send only the approved text.

- If the wording changed after the yes, ask again on the new text.

- One live send per call.

- Do not invent a spacing id.

- No time field on this send schema: do not invent one.

- No dry_run. Owner yes first.

- Do not invent `calendar.events_*` ids.

- Do not audit the whole mailbox.

- It drafts and shows. It does not send.

- One loop only, or the same mailbox can be answered twice.

- A streak or elapsed time does not turn sending on.

- Draft only after they said to begin.

- Quote first. Run only after yes.

- Do not import another person's voice.

- The same file in five or more threads: stop the one-off copies and hand delivery to `send-lead-magnet`.
