---
name: post-path
description: "After a post is live, collect engagers, score company and person apart, and draft the next note without sending it. Use when the owner asks what to do with engagers. It does not enroll."
---

Follow `docs/skill-frame.md`.

`visibility.linkedin.engagement_harvest` needs `worksheet_id`, `linkedin_account_id` from `senders.linkedin_accounts.list`, and `post_id`. Dry run is allowed and costs 0. Live still needs yes. Then `engagement_status` and `engagement_engagers`. This is not `tables.profile_watcher` and not `tables.x_post_engagers.run`. Score company and person apart. A required unknown on the qualifying test is a hold, not a no and not a yes. Hold is not enrolled and is not sent. Someone who asked for the file goes to `magnet-send` first. A warm note waits until both scores pass, stays under the cap, carries no pitch, and needs yes on that item.
