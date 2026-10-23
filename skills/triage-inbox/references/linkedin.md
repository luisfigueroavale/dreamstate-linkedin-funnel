# LinkedIn rows

LinkedIn rows are visible for the sender you resolved. Resolve accounts with `senders.linkedin_accounts.list` and `senders.social_accounts.list`.

Do not call `senders.identities.inbox_scope_get`. It is an email mailbox allowlist. An empty result is not an empty LinkedIn inbox.

If expected threads are missing, look again with those two lists. Do not read that empty allowlist as the whole inbox. Do not widen what that account ingests just to locate extra threads.
