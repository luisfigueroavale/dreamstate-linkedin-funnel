# Fetch

If they supply a post URL, open that post and any article linked from it, cover included, inline pictures included. Say what you could read, and which parts stayed closed. Do not rebuild the piece from a card or a preview. A paste needs no fetch.

A fetch is `visibility.research.urls_fetch` after `tools_get`. Required `urls`. Call prices and modes are in `docs/calls.md`.

Do not send dry_run to `visibility.research.urls_fetch`. It refuses dry_run. Live runs after yes, with `max_credits` 1 and an `idempotency_key`, as `docs/calls.md` states.
