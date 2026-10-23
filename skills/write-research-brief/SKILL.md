---
name: write-research-brief
description: "Build an evidence brief for a content or go-to-market question from primary sources, with implications and open questions. Use before a claim-heavy draft. It does not invent findings."
---

Follow `docs/skill-frame.md`.

Write the question, the audience, the time window, and the decision first. The post audience is the filled `audience.local/ideal-follower.md`. The buying audience is Ideal Customer. Keep them apart. A blank reader file stops the brief.

Before a paid call, use the cheapest source first: `vault/sources/`, a named page, `vault/voice/`, `vault/notes/`, then an in-session Company Context page (id and revision). If you already have only the URL, fetch it. Do not search to relocate it.

Call `whoami` before the first spend. Call `tools_get` before `tools_run`. Call prices and modes are in `docs/calls.md`. Set `approved: true` only if the contract requires it, and only after a yes. A refused live call stops you.

Use `visibility.research.web_search` when local files leave the question open. `query` is required. `max_results` and `include_domains` are optional. Do not guess a host.

Use `visibility.research.urls_fetch` for a known URL. `urls` is required. `max_characters` is optional. A cut-off tail is partial, not empty.

A company claim needs that company's publication, plus a second publisher when a sentence depends on it. Write the publication date and the observation date, or write that the publication date is missing. A source outside the time window is not the present.

`source.account_posts_linkedin_profile` and `source.linkedin_posts_search` are definition ids, not `tools_run` ids. `tools_get` is not found for both. Do not attach or run a feed. See `docs/sources.md`.

A suggestion or a promo line is not an owner fact. Prefer how the work runs, and prefer a measured result. Say what each title supports. Lead with the conclusion, the strongest evidence, and the meaning for that reader. Confidence names its limit.

Each row records the claim, the path (URL or file), an excerpt or a paraphrase, the date, the confidence, and the use. Keep evidence, inference, conflict, and open questions apart. Cite a vault file, a named page, or this call's figure, with the capability id.

Write `vault/sources/<date>-brief.md`. If that path is taken, add a slug. In `vault/sources/README.md`, record the path, the day, and that it is a research brief. Every gap goes under Open. Do not write zero for a missing number.

Owner facts go through `collect-owner-context` only. For an owner-only gap, add one blank question under Open in `vault/intake/interview.md`, and leave it blank here too.
