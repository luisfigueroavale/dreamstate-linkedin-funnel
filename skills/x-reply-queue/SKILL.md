---
name: x-reply-queue
description: "Draft short X replies for posts the owner pasted, as a local queue. Use when they want replies drafted. It never posts."
---

Follow `docs/skill-frame.md`.

Same pipeline as `comment-queue`: fetch, score, pick, thread, learn. The owner posts, or says yes on that exact reply. Never call `sequence.x.auto_engagements.replace`. Free read: `visibility.radar.inspiration_x_list`. People on a post: `tables.x_post_engagers.run` with `account_id` and `max_rows`, live only after yes, and do not send dry_run (it runs live). A public reply uses `social.engagement.comment` only after `tools_get` shows that account can take it; otherwise leave the draft for the owner to post. Lint at 200 characters. Bounded batch, newest first, skip when there is no receipt. An edit they make becomes a voice rule, not a stored copy of their sentence.
