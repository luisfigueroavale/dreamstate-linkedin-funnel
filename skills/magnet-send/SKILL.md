---
name: magnet-send
description: "Prepare a tracked link and the reply that delivers a giveaway, without arming an automatic DM unless the owner accepts that exact rule. Use after magnet-build. It does not send on its own."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Prepare delivery

Read `docs/lead-magnet.md` and `docs/calls.md`.

1. `tools_get` `social.content.tracking_link_create`. Create the link to the real destination. Read it back with `social.content.tracking_link_get`. Report `short_url` from that read. Do not invent clicks.
2. Draft the DM and the public reply. Show account, keyword, link, and both texts.
3. For one comment, preview with `social.comments.reply`. Post only after yes, with `social.comments.approve` and the same `content_hash`.
4. A standing rule is `social.outreach.keyword_dm_rules.list`, then a replace of the full set. Leave `dm_enabled` false and public replies off until they accept the exact text. Tell them an enabled rule messages later commenters with no fresh yes. `expected_revision` comes from the artifact. A stale revision means re-read, not a blind retry.
5. Do not send a connection invite from this skill.

Record delivery on the worksheet with a column, not from memory.

## Done

The short URL from the get call, the texts, and whether a rule was left off or they approved it.
