---
name: x-draft
description: "Draft a short X post or thread from a sourced idea in the owner's voice. Use for X copy. It does not publish."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Draft for X

One idea that fits in one post stays one post. A thread only when the owner asks or the brief has steps that do not fit. No new numbers. No em dash.

If this is the same idea as a LinkedIn draft, add the X text to that artifact's `platform_payloads` after `tools_get`. Do not create a second artifact. If there is no artifact yet and they want it stored, `social.content.artifact_create` with channel `x` only.

Length comes from `tools_get` on the create or update call, not from memory. A link's weight is whatever that schema says.

## Done

The text, the file or artifact id, and that it was not posted.
