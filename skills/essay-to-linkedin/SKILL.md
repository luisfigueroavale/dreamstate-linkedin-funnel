---
name: essay-to-linkedin
description: "Adapt a finished essay into a LinkedIn article draft and a short share post, keeping the claims. Use after x-essay. It does not upload or publish."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Adapt the essay

Keep the argument and the sourced lines. Cut for the feed only in the share post, which follows `linkedin-draft`. Do not add a result the essay did not have.

Cover art is a `frame-build` still. Do not guess an article pixel size. `tools_get` `social.content.article_create` and use the cover field only if the schema has one. Until that fetch succeeds, leave the cover as a local PNG and say the article tool was not called.

Write a local folder `work/article/<slug>/` with the markdown, the cover path, and the share post. `work/` is gitignored.

## Done

The folder path and which Dreamstate ids, if any, came back from a call.
