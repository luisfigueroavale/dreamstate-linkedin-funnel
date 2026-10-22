---
name: comment-queue
description: "Draft comments the owner can post on other people's LinkedIn posts, as a local queue. Use when they want replies drafted. It never publishes."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Queue comments

The watchlist is a file the owner maintains in `vault/sources/` (gitignored) or a list they paste. Do not scrape. For each post, draft one comment only when `brand.local/identity.md` gives you a real receipt to add. Otherwise skip and say why.

Write `work/comment-queue.html` with the post URL, the draft, and a blank for what they actually posted. They post it. Do not call `social.posts.comment_publish` (to-check). A comment on the owner's own post is `social.comments.reply` (preview only) and still needs a yes before `social.comments.approve`.

## Done

How many drafts, how many skips, and the queue path.
