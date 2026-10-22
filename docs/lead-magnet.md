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

Create the short link with `social.content.tracking_link_create` after `tools_get`. Pass the real destination. The call can attach `artifact_id` when the link belongs to a post. It does not post the link.

Read it back with `social.content.tracking_link_get`. Report `short_url` and `destination_url` from that read. Clicks, if you report them, come from fields the get call returns, such as `first_click_at`. Do not invent a click count. If the schema has no count, say the count is unknown.

Put the same destination through `social.content.tracking_links_lookup` only after you fetch that id. It was a search hit, not a full contract, so treat it as to-check.

## Delivery

Default: do not arm an automatic DM.

1. `social.outreach.keyword_dm_rules.list` on the artifact.
2. Show the owner the full next set. A replace deletes any rule you leave out.
3. Keep `dm_enabled` false, and keep public replies off, until the owner accepts that exact text. Accepting an enabled rule means later commenters who use the keyword are messaged without a fresh yes. Say that in the ask.
4. The live `social.outreach.keyword_dm_rules.replace` sends `expected_revision` from the artifact read. A stale revision is refused. Re-read. Do not retry the old body.
5. For a single comment, prefer `social.comments.reply` plus a drafted DM, and wait for yes on those two texts. `social.comments.approve` is what posts the public reply.

If a post draws more comments than you will answer one by one, say so and ask whether the public reply should carry the link instead of a DM. Still your yes. Do not scrape the comment list in a tight loop. `social.comments.queue_list` is a paged read. Use the cursor it returns.

Connection requests are a separate yes. Do not send one because someone is out of network. The invite id is not in the fetched set for this desk. Look it up if the owner asks, and wait.

Track who received the file on the worksheet with a column you add, not by memory. Do not enroll those people into a pitch sequence in the same step as the delivery.
