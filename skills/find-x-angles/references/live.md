# Live reads

A scan reads what is moving now. Pasted posts are a lookup, not a scan.

Use the public X reads the host already has, listed in `docs/tool-map.md`. Read the host's schema first. When the host has none, use the browser on x.com. The radar read comes after.

1. Topic search. Two or three queries from the pillars, inside the last 7 days, originals only (`-is:retweet -is:reply`). Add `min_faves:200` when the host's search supports it, and say whether it did.
2. Trends. Read trends for the owner's market and keep only the ones that touch a pillar. A trend off the reader is noise.
3. Accounts in the space. For each watch row or pillar account, read recent originals with `from:<handle>`.
4. Counts. Use recent counts on a query to say whether a topic is rising this week, with the window.

Save the raw rows you hold to `vault/sources/<date>-x-<topic>.json` with the capture time. That folder is not committed.

Every read stays a read. Do not post, like, repost, follow, bookmark, or DM, and do not add an X login or a paid key to get more.
