---
name: post-path
description: "After a post is live, collect engagers, score company and person apart, and draft the next note without sending it. Use when the owner asks what to do with engagers. It does not enroll."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Run the path

Read `docs/watchers.md`, `docs/fit-gate.md`, and `docs/conversations.md`.

1. Harvest one post with `visibility.linkedin.engagement_harvest` after `tools_get`, a dry run, and a yes. Read status and people back.
2. Add two `column.ai_fit_score` columns if they are not there. The person rubric includes the qualifying test from `audience.local/ideal-follower.md`. If that file is missing or `Status: blank`, stop. Do not score from the template questions. Sample with `tables.columns.run`. A required no with row evidence fails the person. A required unknown holds. A no without evidence holds. Stop on an evidenced fail of either side.
3. Keyword commenters who passed go to `magnet-send` as drafts. A keyword is not a yes on the test.
4. Other passes get a note that names the post's topic and asks one question. No pitch. No "I saw you like this." Do not draft that note for a hold or a stop. Show three rendered rows, including a thin one.
5. A sequence, if they want one, is `warm-cadence` and stays a draft.

Profile watcher create is a different tool. Do not use it as this harvest.

## Done

Worksheet id, pass / hold / stop counts from cells you read, and the drafts waiting. Credits only if a call returned them.
