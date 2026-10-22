# Lead magnet

A giveaway is a file a stranger can use without you in the room. Skills: `magnet-build`, `magnet-send`. Read `audience/AGENTS.md` first. The reader is `audience.local/ideal-follower.md`. If that file is blank, stop.

## Build

The piece needs four parts, in `magnets/<slug>/`:

1. A promise in one sentence: what the reader can do when they finish.
2. A worked example, labeled as an example, with no borrowed customer numbers.
3. A blank they can copy (the rubric, the brief, the frame).
4. A delivery note: the keyword, the link, and the sentence you will send.

Read it yourself once. If a step depends on a login you did not mention, cut the step.

This repo can be that file. Do not stuff your Company Context into the copy you give away.

## Link

Look up the destination first with `social.content.tracking_links_lookup` (`urls`). Then `social.content.tracking_link_create` with `destination_url` and the week's `utm`. Optional: `artifact_id`, `platform`, `custom_slug`, `og`. The call does not post the link.

The DM body uses that full destination URL plus UTM. It does not use `short_url`. One unique URL per post, so a repeated link is not treated as already delivered.

Read the row back with `social.content.tracking_link_get`. Clicks, if you report them, come from fields that call returns, such as `first_click_at`. Do not invent a click count. If the schema has no count, say the count is unknown.

## Delivery

Default: do not arm an automatic DM.

1. `social.outreach.keyword_dm_rules.list` (`artifact_id`) before any replace.
2. Show the owner the full next set. `keyword_dm_rules.replace` deletes any rule you leave out. Include typo variants in `keywords` (1–20).
3. `comment_reply_not_connected` is the public line for someone who must connect first. `comment_reply_sent` is the line after the file has gone out.
4. Keep `dm_enabled` false, and keep public replies off, until the owner accepts that exact text. An enabled rule messages later commenters who use the keyword, with no fresh yes. Say that in the ask. Post text, the CTA, and the keyword have to match before you arm it.
5. The live replace sends `expected_revision` from the artifact read. A stale revision is refused. Re-read. Do not retry the old body. Leave pacing at the account's own spacing. Do not tighten it, and do not invent a spacing call.
6. Afterward, `social.outreach.keyword_dm_sends.list` (`artifact_id`) is how you see what went out.
7. For a single comment, prefer `social.comments.reply` plus a drafted DM, and wait for yes on those two texts. `social.comments.approve` posts the public reply (`action_id`, `content_hash`, `approved: true`).

If a post draws more comments than you will answer one by one, say so and ask whether the public reply should carry the link instead of a DM. Still your yes. Do not scrape the comment list in a tight loop. `social.comments.queue_list` is a paged read. Use the cursor it returns.

Connection requests are a separate yes. Do not send one because someone is out of network. The invite id is not in the fetched set for this desk. Look it up if the owner asks, and wait.

Track who received the file on the worksheet with a column you add, not by memory. Do not enroll those people into a pitch sequence in the same step as the delivery.
