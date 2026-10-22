---
name: comment-queue
description: "Draft comments the owner can post on other people's LinkedIn posts, as a local queue. Use when they want replies drafted. It never publishes."
---

Follow `docs/skill-frame.md`.

Fetch, score, pick, thread, then learn. The owner posts the comment, or says yes on that exact text. Never call `sequence.linkedin.auto_engagements.replace`. `source.account_posts_linkedin_profile` and `source.linkedin_posts_search` are definition ids, not `tools_run` ids. Resolve them with `tables.executable_definitions.list_resolved`. Bind with `tables.table_sources.attach` only after `tools_get` (those attach arguments are to-check). `social.feeds.create` stores a repeating source that can spend later (`table_id`, `kind`, `cadence`, `stored_max_credits`). Owner yes. `visibility.radar.inspiration_linkedin_list` is a free read. `social.linkedin_posts.comments_list` needs `account_id` and `post_id` (`social.linkedin_posts.get` is to-check until fetched). To comment, `social.engagement.comment`: omit `approved`, or use smoke_test, to preview; live posts only with `approved: true` and an `idempotency_key` after yes. Required `account_id`, `post_social_id` (a composite id, not an activity URN), and `body` (1–4000). Zero credits, and it still counts on the sender's daily quota. `social.posts.comment_publish` is the other call: 2 credits, it posts immediately, and it has no preview. Lint a draft at 200 characters. Take a bounded batch, newest first, and skip a post that has no receipt. When the owner edits a draft, write the rule into voice, not their sentence.
