# Checks

Run `node skills/send-lead-magnet/scripts/check-delivery.mjs` before showing it. The script never sends. It rejects keywords outside 1-20, a sent line the duplicate guard would miss, and a connect-first line the guard would treat as already sent.

It rejects a body that uses `short_url` or omits the destination, a reused destination, a keyword that is not a close spelling of the call to action, praise classified as a request, a tightened gap, or `dm_enabled` on without an arm flag.
