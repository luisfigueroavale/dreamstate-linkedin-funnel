---
name: find-x-angles
description: "Turn posts the owner pasted, or a Dreamstate read that returns them, into sourced angles. Use for a niche scan. It does not require a new X login and does not invent reach."
---

Follow `docs/skill-frame.md`.

Reach is attention. A large number does not make a claim true, and it does not prove a signup. Work the loop in order: split the question, search, tighten, follow the thread, open linked pages, and cite the page you read.

## Ground

Read `brand/AGENTS.md`, then `brand.local/identity.md` and `brand.local/voice.md`. Read `audience/AGENTS.md`, then `audience.local/ideal-follower.md`. The reader is that follower file. Pillars live in `vault/notes/pillars.md`. Each pillar has one job in `vault/notes/funnel-stages.md`: reach, belief, or signup. Proof is the Company Context Proof page named from identity. Voice tells you how the owner sounds. It does not impose a length limit on this scan. If identity, voice, or the follower file is missing or still `Status: blank`, stop and ask. Do not invent the reader.

If `vault/notes/` lists creators they already study, read that list before a wide scan. Search `vault/` for a receipt, an older framing, or a piece they already shipped. Check the date before you call it current. A sentence they just gave you beats an older file. Never attribute another person's result to the owner.

Map every pillar before a wide scan: what the reader is stuck on, and what the owner can show from their own work. For a weekly pass, touch each pillar. A quiet pillar stays in the note. Do not pad it to look busy.

## How wide

A pasted post or a narrow question is a lookup. Open that post and only the context the question needs. Do not widen it into a scan.

A discovery request starts with two or three different queries and a short page. From the pillars you can draft up to about ten seeds (the problem in the reader's words, a tool in use, an outcome they want, a failure, a company decision). Do not fire the whole list. Add a query only when the pages you have are noisy, thin, or off the reader. Widen a thin query. Narrow one that comes back as generic comment. A noise exclusion, such as giveaways, waits until you actually see that noise. Do not ban every resource offer.

The default window is the last 7 days. Say the window you used. Older material comes from a file they supplied or from the browser. Do not claim a thread is complete when the parent is outside that window or the page stopped early.

## Where to read

Cheapest first: posts and links they pasted, then the browser, then `visibility.radar.inspiration_x_list`. That radar read is free. It takes `query`, `author_handles`, `ai_filter`, `limit`, `cursor`. `tools_get` before `tools_run`. The fetched schema wins. Sending dry_run still executes the read. Say that it was a read. Do not treat that mode as a preview that fetched nothing. Keep `limit` to a short page, about 10 to 20, and name the number you asked for. Pass `cursor` only when you mean to open the next page, and say so. Do not walk every page on your own. `ai_filter` is a short description for this call. A reason in the response applies to this response only.

The tool's order is not an engagement ranking. Sort the set you hold. In the browser you can use that site's own search operators and a date range. That string is a different dialect from the radar query. Do not paste it into the radar call and expect the same filter. Pass known accounts through `author_handles`. Ask for original posts unless you are reading replies on purpose. If one account fills the page, query the remaining handles on their own. A person quoted in the text is not the account you requested. For the owner's own recent posts, pass their handle and keep originals.

There is no paid command-line client and no third-party search product in this skill. Use the radar read or files they supplied. Prefer a saved file under `vault/sources/` before you pay to pull the same posts again, and label the capture date on every saved number.

`source.x_posts_search` is a definition id, not a `tools_run` id. Resolve it with `tables.executable_definitions.list_resolved`, attach with `tables.table_sources.attach`, and run `tables.table_sources.run` only after the quote and the owner's yes. Use that before you treat a hand count as the only source.

A paid open-web read waits for a quote and a yes. Call prices and modes are in `docs/calls.md`. Required `query` on `visibility.research.web_search` and `urls` on `visibility.research.urls_fetch`. A quote is not a yes. No yes means you do not run the call.

`tables.x_post_engagers.run` is who touched one post. It needs `account_id` from `senders.social_accounts.list` and `max_rows` (1–500). Call prices and modes are in `docs/calls.md`. It is not a LinkedIn harvest and it is not this scan. Do not call `visibility.linkedin.engagement_harvest` to answer an X question.

If a call fails, stop. Report the error the tool returned. Do not loop on `whoami`. Do not start a monitor.

## What to do with the set

Turn the question into a topic, a problem the reader has, and, when it helps, a named builder or a concrete workflow. The seeds above are optional. Start from original posts. Include replies when you want buyer language, an objection, a failure, or the steps someone took. Read the post, the media, and the thread before you say why it traveled. Open a linked doc, repo, or benchmark when the post depends on one. A cut-off snippet is not the post. Confirm a cited post at the source before you treat a number or a quotation as fact.

Dedupe on post id. Keep a row that fits the reader, shows a real mechanism, has a discussion worth joining, and leaves the owner an angle their evidence can carry. Do not drop a row because the like count is low. Modest reach stays when the problem is real. Read a reply before you infer the mood from a count.

Likes, bookmarks, replies, and reposts stay separate. Quotes stay separate when the tool returns them. A missing view count is unknown. Do not write zero in its place. A zero the tool returned stays zero, and it is still not proof the post reached nobody. Do not divide another metric by views when views are missing or that returned zero. Followers, when a paste or a tool returned them, are context beside age. Do not invent either.

An outlier, in this desk, is a post whose views per day beat that account's own median inside the set you hold. Save the rows you actually hold. Copy the full text that came back, the timestamp, the author, each metric, and any quoted post the response included. Leave out a metric the response did not include. Then run, from the repo root:

`python3 skills/find-x-angles/scripts/hold_median.py <file> --fetched-at <capture time>`

The script makes no network call. It dedupes, leaves a missing metric empty, and sets `outlier` only from that file. One measured post from an account cannot beat its own median. If the file has no view counts, say unknown. Do not explain performance from a snippet, and do not explain it from a median you did not compute. A popular line does not establish how a product works, what converted, or what caused the number. Keep three layers apart: what the post says, what you guess drew attention, and what the owner could add.

Drop celebrity reach that is off the reader, an empty take, a copied story, and an outcome nobody checked. Do not lift a distinctive sentence. Do not present their screenshot as the owner's work.

## Brief

Lead with a short recommendation and a shortlist of the strongest few. Do not fill a quota. If nothing is strong, say so, and list questions the audience is actually asking. Name the sample size and the window.

Each note records url, author, date, the number the paste or the tool returned, and what is missing. Also record why it is worth a look, the mechanism, the angle the owner can add, the grounding (a local receipt, or an explicit gap), one pillar, and one funnel job. An asset is a file they already have, or none. A public count is not a signup and not revenue. Proof numbers come from the Proof page or from figures they supplied for this piece, with the window, the unit, and the qualifier still attached. Short hooks are optional. They are not a draft.

## Watchlist

When they want accounts to watch and posts worth a reply, keep one local file they choose. Default `vault/notes/x-watch.md` for accounts and `vault/notes/x-queue.md` for posts. Do not create that list in another workspace.

Key an account row by the handle in lowercase, with `@` removed. On that row record the name, the follower count you were shown, the pillar you would file them under, and whether the cohort is a peer or a specialist. Put a reply you actually opened in its own field, with that reply's url. Record tools that showed up in the sampled posts, a status, and notes.

Key a post row by the post id, stored as text. Record the url, the author, the date, each count that came back, and the time you captured them. Record the owner's angle and the grounding in their own fields. Status uses one of these labels: To review, or Replied, or Skipped. Keep notes beside that label, not inside it.

Ask what follower range they want to talk with. Peers a little ahead usually answer, and the readers overlap. Prefer people who join threads and show an implementation, a lesson, a diagnosis, or work they did themselves. A keyword, a follower band, a tool list, a revenue claim, or a giveaway line does not earn a row by itself. A result they state stays their claim until something else checks it. Smaller specialists are their own cohort. Reply evidence means you saw a recent reply to someone else. A one-line acknowledgement was seen. It is not proof of a real exchange. No reply in the sample means the sample was short, not that they never reply. Tools named in the sample are not the whole stack. A row on the list is not a follow, and it is not a sign they will buy.

The list comes from posts you opened and from names the owner chose. Do not import a list you found elsewhere. Do not follow anyone. Check a handle against a live account before you trust an old spelling. Rank a queue row by fit, a point the owner can back up, freshness, and room for a useful reply. Do not call a small sample the whole niche.

On a refresh, read the file again immediately before you write. Keep their additions, exclusions, priorities, notes, and finished statuses. A row they removed stays out. Update by the key so an old copy cannot put the row back. Write only rows you reviewed. Do not overwrite their status or their notes. Read the file back and check the counts. Flag media or a thread you did not open before a reply that depends on it. State the reads and the price before you run them. Reply text, if they want it, goes to `draft-x-replies`. This skill does not write that reply.

## Keep it

This skill does not schedule, publish, reply, send a DM, follow, or like. Do not call `sequence.x.auto_engagements.replace`. A repeating refresh is not a loop you start here. If they later want one, that call is `social.feeds.create`. dry_run first. Live needs `approved: true` because it is a recurring trigger. Required `table_id`, `kind`, `cadence`, and `stored_max_credits`. Pass `account_urls` or `keyword`, never both.

When they want the scan kept, write the brief to `vault/notes/<date>-x-<topic>.md`. Put the untouched response in `vault/sources/<date>-x-<topic>/` and do not edit that raw file in place. Label the query and the capture time on both. Do not add the scan to `vault/board.md`. Do not paste credentials or a large raw payload into the chat. A fact about the owner that belongs on a Company Context page goes through `collect-owner-context`, and only after they ask. A hole in the evidence stays in the brief.

## Drafts

A scan is not a draft. When they ask for copy, hand the brief to `write-x-post` for one post or `plan-x-week` for a slate. Keep their wording. Keep their proof numbers, including the window, the unit, and the qualifier. No invented scene, no stock slogan, and no call to action they did not ask for.

## Stop rules
- Follow the skill-frame writing rules.
