# Send

The read returns `sequence_stop_state` with `state`, `evidence`, and `observed_at`.

Required `content.body`. `attachments` is `[]`. `voice` is null unless audio. `client_request_id` is a new UUID. `max_live_sends` is 1. Pass `conversation_id`. `tools_get` first. Offered dry_run is not the send; live still waits for yes.

Reread once before the draft and once before a send. Any newer inbound or outbound line retires the draft.

A few minutes between accepted sends, inside the account's own limits. If the result is unclear, open the thread again before any retry.

A clock time uses `scheduled_at`, not `planned_for`. `planned_for` is a day mark on a content draft, not a reply time. The reply goes when they say yes.
