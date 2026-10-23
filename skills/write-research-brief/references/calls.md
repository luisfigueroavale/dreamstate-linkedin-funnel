# Calls

Call `whoami` before the first spend. Call `tools_get` before `tools_run`. Call prices and modes are in `docs/calls.md`. Set `approved: true` only if the contract requires it, and only after a yes. A refused live call stops you.

Use `visibility.research.web_search` when local files leave the question open. `query` is required. `max_results` and `include_domains` are optional. Do not guess a host.

Use `visibility.research.urls_fetch` for a known URL. `urls` is required. `max_characters` is optional. A cut-off tail is partial, not empty.

`source.account_posts_linkedin_profile` and `source.linkedin_posts_search` are definition ids, not `tools_run` ids. `tools_get` is not found for both. Do not attach or run a feed. See `docs/sources.md`.
