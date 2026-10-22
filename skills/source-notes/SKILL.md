---
name: source-notes
description: "Build a short evidence brief for a content question from primary sources the owner supplied or a Dreamstate read. Use before a claim-heavy draft. It does not invent findings."
---

Follow `docs/skill-frame.md`.

Cheapest evidence first: a file in `vault/sources/`, then a page they named. `visibility.research.web_search` costs 2 credits and refuses dry_run. Required `query`; optional `max_results`, `include_domains`. `visibility.research.urls_fetch` costs 1 credit and refuses dry_run. Required `urls`; optional `max_characters`. Quote the `cost_policy` price, wait for yes, then live with `max_credits` 2 or 1 and an `idempotency_key`. Write any gap under Open in the brief. Do not invent a finding. Feed definitions are not these calls. See `docs/sources.md`.
