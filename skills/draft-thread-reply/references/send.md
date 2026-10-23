# Send

The read returns `sequence_stop_state` with `state`, `evidence`, and `observed_at`. `sequence_stop_state` must read stopped before a send is offered. If the state is `active` or `unknown`, say which, and do not offer a send.

`unibox.context.thread_reply_send` needs owner yes on that text. Required `content.body`. `attachments` is `[]`. `voice` is null unless audio. `client_request_id` is a new UUID. `max_live_sends` is 1. Pass `conversation_id`. `tools_get` first. Offered dry_run is not the send; live still waits for yes.

If dry_run is refused, do not send that mode.

Reread once before the draft and once before a send. Any newer inbound or outbound line retires the draft. Send only the approved text. If the wording changed after the yes, ask again on the new text.

A few minutes between accepted sends, inside the account's own limits. One live send per call. If the result is unclear, open the thread again before any retry. Do not invent a spacing id.

A clock time uses `scheduled_at`, not `planned_for`. `planned_for` is a day mark on a content draft, not a reply time. No time field on this send schema: do not invent one. The reply goes when they say yes.
