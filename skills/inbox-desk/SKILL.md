---
name: inbox-desk
description: "List inbox threads that need a person and hand them to a reply draft. Use for triage. It does not send."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Open the inbox

`tools_get` `unibox.inbox.unified_list`. Read a bounded page with tab `needs_action` when that enum is still in the schema. Do not load the whole history. `senders.identities.inbox_scope_get` is to-check. If you need it to avoid a false empty inbox, fetch it first. If the fetch fails, say the inbox read may be incomplete.

For each thread you will answer, run `thread-reply`. Cap a digest at 10. `unibox.inbox.analyze` is paid (the team list says 1 credit). Dry run if the schema allows, then wait.

## Done

How many threads, which ids you drafted, and which you left.
