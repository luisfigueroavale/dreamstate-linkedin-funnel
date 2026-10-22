---
name: magnet-send
description: "Prepare a tracked link and the reply that delivers a giveaway, without arming an automatic DM unless the owner accepts that exact rule. Use after magnet-build. It does not send on its own."
---

Follow `docs/skill-frame.md`.

The message body carries the full destination URL plus UTM. It does not carry `short_url`. `social.content.tracking_links_lookup` (`urls`) first, then `social.content.tracking_link_create` (`destination_url` required; optional `artifact_id`, `platform`, `custom_slug`, `og`, `utm`). Read it back with `tracking_link_get`. One unique URL per post, so a repeated link is not treated as already delivered. `social.outreach.keyword_dm_rules.list` (`artifact_id`) before `keyword_dm_rules.replace`, which replaces the whole set. Put typo variants in `keywords` (1–20). `comment_reply_not_connected` is the public line for someone who must connect first. `comment_reply_sent` is the line after the file has gone out. Leave `dm_enabled` false, and leave public replies off, until yes on that exact text. Say that an enabled rule messages later commenters with no fresh yes. Post text, CTA, and keyword have to match before you arm anything. Verify with `social.outreach.keyword_dm_sends.list` (`artifact_id`). Leave pacing at the account's own spacing. Do not tighten it, and do not invent a spacing call. Owner yes on the rule.
