# Read

Read the whole thread that matters, and the Company Context pages that bear on it, before a classification or a draft. Keep the provider thread id, the participants, the sending account, and the delivery state the call returned.

For a review of one thread, `unibox.inbox.analyze` costs 1 credit and never sends. Required `conversation_id`.

Optional `analysis_mode` (`classify_only` or `draft_reply`, default `draft_reply`), `account_id`, `message_id`. dry_run, then live with `quote_hash`, `max_credits`, and an `idempotency_key`.

Spend that credit on one conversation.
