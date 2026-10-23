# Agent contract

This folder is a local desk for one owner. Dreamstate is the system of record for pages, worksheets, drafts, sequences, and inbox threads. Files in this repo are the working copies. Codex is the preferred agent. Claude Code follows this same file.

Before any draft or design, read [brand/AGENTS.md](brand/AGENTS.md) first. A missing or blank required file under `brand.local/` means stop and ask. Do not guess. Run [brand/taste.md](brand/taste.md) before you hand the work to the owner.

Before content, scoring, or qualification, read [audience/AGENTS.md](audience/AGENTS.md). The reader is `audience.local/ideal-follower.md`. The buyer stays on the Ideal Customer page in Company Context. A missing or blank follower file means stop and ask. Score a person with that file's qualifying test.

## Workspace

Call `whoami` before the first Dreamstate write or spend in a session. If more than one workspace is listed, ask which one and stop until the owner names it. If a later call is on a different workspace, stop.

The Dreamstate plugin ships one server, in its `.mcp.json` (`https://mcp.trydreamstate.com` in the plugin repo). Do not add a second server. Do not paste an API key. Sign in through the browser.

`skills_get` takes a bare id (`plays`), never `dreamstate:plays`. The plugin's `dreamstate` skill is not loaded that way. Read it from the installed plugin if you need the control order. The order is: `whoami`, `packs_route` or `packs_get`, `tools_search`, `tools_get`, `tools_run`. Poll a persisted run with `runs_get`.

## Calls

`tools_get` the capability before every `tools_run`. The schema you just fetched wins over this repo. If `tools_get` returns not found, stop. Do not invent an id. Ids marked to-check in [docs/tool-map.md](docs/tool-map.md) stay unused until a fetch succeeds.

Gates sit on `tools_run`, not inside `params`: `mode`, `max_credits`, `idempotency_key`, `quote_hash`, `approved`.

`max_rows` belongs in `params` of `tables.columns.run` and `tables.table_sources.run` when that schema lists it. `max_live_sends` belongs in `params` of an external-send sequence capability when that schema lists it, and it must cover at least the dry-run recipient count.

A write, a credit spend, or an external effect starts as `mode: "dry_run"` when that mode exists. Show the row count, the credit estimate, and `quote_hash`. Then wait. The live call repeats that `quote_hash`, sets `max_credits` to the dry run's ceiling, and sends a new `idempotency_key`. `max_credits` is 0 only when the quote is 0. A quote on a refused live call is a price, not permission to retry.

When the fetched contract refuses `dry_run`, do not send that mode. Shared prices and modes are in [docs/calls.md](docs/calls.md). `visibility.research.web_search` is 2 credits and `visibility.research.urls_fetch` is 1. Quote `cost_policy`, wait, then live with `max_credits` at that price and an `idempotency_key`. A free read that does not support `dry_run` runs as `live`. Say that it was a read. `tables.x_post_engagers.run` is one of these: a dry_run request executes live, so do not send it, and wait for yes before the live call.

Set `approved: true` only after the owner has said yes, and only when the call needs it: a paid run above 25 rows, a quote or refusal that says `approval_required`, a live external send above the server's recipient threshold, or a run that turns on a recurring trigger. Send the same `quote_hash`.

## Owner yes

Nothing posts, comments, sends a DM, enrolls, launches, spends, or deletes without the owner's yes on that exact item. A yes on different text, media, audience, or schedule is a new yes.

These still need that yes when the credit price is 0, because they arm a later send, post in public, email an invite, or start a recurring spend: `social.content.schedule`, `social.content.approve` when the owner has not approved that version, `social.comments.approve`, `social.engagement.comment` with `approved: true`, `social.engagement.react` with `approved: true`, `social.posts.comment_publish`, `social.content.article_delivery_create`, `unibox.context.thread_reply_send`, `social.outreach.keyword_dm_rules.replace` with any send or public reply turned on, `integrations.calendar.events_create`, `social.feeds.create`, `workflow.workflows.activate`, `visibility.linkedin.engagement_harvest`, `visibility.linkedin.followers_import`, `tables.profile_watcher.create`, `tables.profile_watcher.resume`, `tables.auto_run.set`, `sequence.sequences.activate_audience`, `sequence.sequences.resume`, `social.content.delivery_publish`. `social.content.delivery_publish` is public, immediate, and irreversible, and it costs 0 credits. `workflow.workflows.activate` always needs `approved: true`. `social.feeds.create` is dry_run first, then live with `approved: true`. `visibility.linkedin.followers_import` and `visibility.linkedin.engagement_harvest` need door-level approval on the live call. `social.engagement.react` has no dry_run. Preview with smoke_test. Live needs `approved: true` and an `idempotency_key`.

Do not call `social.content.auto_publish_set` or `social.content.approval.authorize_publish`.

Creating a draft, a local file, a preview, or a sequence that the contract says does not start, is allowed without a send-yes. Say that nothing was sent.

## Evidence

Report a number only when a tool, a file the owner supplied, or a page you opened returned it. Unknown stays unknown. Do not write zero in its place.

Do not generate, retouch, or replace a face or a body. A portrait uses a photo the owner supplied, unchanged.

Do not add a connection this repo does not already use. Dreamstate, the browser sign-in, and local tools (Node, Playwright, ffmpeg) are the set. Do not install a mailer, a hosted video API, a scraper account, or a second social login to make a skill run.

## Files

Company Context stays in Dreamstate. The buyer is the Ideal Customer page there. The reader is `audience.local/`. Owner identity, voice, color, and asset files stay in `brand.local/`. Voice samples and raw sources stay under `vault/voice/` and `vault/sources/`. Those paths are gitignored. Do not commit them. Names you never want in the repo go in `.banned-terms.local`, one per line. That file is gitignored. `npm run check` reads it when it exists and skips that scan when it does not. Do not paste Company Context into a tracked file. The templates in `brand/` and `audience/` stay blank.

Before drafting a post, read `vault/notes/` and the post file. After the owner accepts a draft, add the concept you used back to the note it belongs to, with the post path.

## Skills in this repo

| Job | Skill |
|---|---|
| First session | `set-up-desk`, then `collect-owner-context` |
| Confirm the workspace | `check-dreamstate-workspace` |
| One week of posts | `plan-content-week` |
| A picture | `design-post-graphic`, then `review-graphic` |
| People who engaged | `score-post-engagers` |
| A giveaway | `make-lead-magnet`, then `send-lead-magnet` |

The index is [skills/README.md](skills/README.md).
