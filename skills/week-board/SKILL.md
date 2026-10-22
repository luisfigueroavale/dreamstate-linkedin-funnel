---
name: week-board
description: "Update the local status board and, if the owner asks, mark a day on an existing Dreamstate draft. Use after the pieces exist. A day mark is not a schedule."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Update the board

Move lines in `vault/board.md` between Idea, Drafting, Review, Published, and Backlog so they match the post files. One status per file.

A day mark is `social.content.plan` after `tools_get` and `social.content.artifact_get`. `planned_for` is a future timestamp. `expected_revision` comes from the get. This does not publish. Refuse if the artifact is already scheduled or published. Clearing the mark is `social.content.unplan`.

`social.content.schedule` and `social.content.approve` wait for a separate yes on that text and media. Do not call them from this skill.

## Done

The board lines you moved, and any artifact id you marked, with the planned time from the response.
