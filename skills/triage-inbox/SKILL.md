---
name: triage-inbox
description: "List inbox threads that need a person and hand them to a reply draft. Use for triage. It does not send."
---

Follow `docs/skill-frame.md`.

Triage threads that are already open. The set is email, LinkedIn, WhatsApp, and one email that is not on a cadence. A new LinkedIn conversation, and any outreach program, goes to `draft-warm-followups`. Stay on the account and the thread the owner named. Ground every class, and any note you pass on, in the thread and in Company Context. Ids are in `docs/tool-map.md`. `tools_get` before `tools_run`. The fetched schema wins.

List with `unibox.inbox.unified_list`. Keep each page small. When those fields are still on the schema, narrow by channel, time, status, one participant, or a shared tag. With no status cut, the list also returns threads that already have an answer. For a reply queue, pass tab `needs_action` when that enum is still in the schema.

Read the whole thread that matters, and the Company Context pages that bear on it, before a classification or a draft. Keep the provider thread id, the participants, the sending account, and the delivery state the call returned. For a review of one thread, `unibox.inbox.analyze` costs 1 credit and never sends. Required `conversation_id`. Optional `analysis_mode` (`classify_only` or `draft_reply`, default `draft_reply`), `account_id`, `message_id`. dry_run, then live with `quote_hash`, `max_credits`, and an `idempotency_key`. Spend that credit on one conversation.

LinkedIn rows are visible for the sender you resolved. Resolve accounts with `senders.linkedin_accounts.list` and `senders.social_accounts.list`. Do not call `senders.identities.inbox_scope_get`. It is an email mailbox allowlist. An empty result is not an empty LinkedIn inbox. If expected threads are missing, look again with those two lists. Do not read that empty allowlist as the whole inbox. Do not widen what that account ingests just to locate extra threads.

A reply carries the exact text, the thread, the account, and the recipients. Hand one thread to `draft-thread-reply`. Do not send. A send needs the owner's yes on that text.

A label edit, an archive, or a bulk change shows the real count and the scope first, and leaves every conversation outside that scope untouched. Do not invent a capability id for it.

A timeout does not prove the message was never delivered. Before a retry, read the returned message and the run with `runs_get`. A comment posted in public on a post goes to `draft-linkedin-comments`.

Report only the slice you opened: each classification, the draft when you handed one thread to `draft-thread-reply`, a message link only when the tool returned one, and the threads still unresolved. On an error, do not file feedback and do not copy the conversation or its transcript anywhere else.
