---
name: send-lead-magnet
description: "Prepare a tracked link and the reply that delivers a giveaway, without arming an automatic DM unless the owner accepts that exact rule. Use after make-lead-magnet. It does not send on its own."
---
# Send a lead magnet

Prepare a tracked link and the reply that delivers a giveaway. Follow `docs/skill-frame.md`.

## Use when

- The owner wants a tracked link and the reply that delivers a giveaway, after `make-lead-magnet`.

- The owner must accept that exact text before an automatic DM is armed.

- Not for building the file (`make-lead-magnet`). This skill does not send on its own.

## Steps

1. Use one live post, one file, and one destination (`references/setup.md`). Call `whoami` before the first write, and call `tools_get` before every `tools_run`.

2. Follow the shared procedure in `docs/lead-magnet.md` (`references/link.md`). The body carries the full destination URL plus UTM and never `short_url`.

3. Call `social.content.tracking_links_lookup`, then `social.content.tracking_link_create` and `social.content.tracking_link_get` (`references/link.md`).

4. Call `social.outreach.keyword_dm_rules.list` before `keyword_dm_rules.replace` (`references/rules.md`). Keep `dm_enabled` false until the owner says yes on that exact text.

5. Run `node skills/send-lead-magnet/scripts/check-delivery.mjs` before showing it (`references/checks.md`).

6. Decide who is asking (`references/ask.md`). Match a whole-word keyword, plus the typo list.

7. Run the duplicate guard (`references/duplicate.md`). Nobody gets the file twice.

8. Send the file message first, read it back, then send the public line (`references/send.md`). Add a receipt column with `tables.columns.add` after `tools_get`.

9. Shape the message from a real first name, or a neutral stand-in (`references/copy.md`). Do not guess a name.

10. Read `senders.linkedin_accounts.list` and keep that account's own spacing (`references/pace.md`).

11. Run one pass inside the caps in `references/pass.md`. Start each pass by reading comments.

12. Call `social.linkedin_posts.get` for a short post link (`references/one.md`). For one comment, use `social.comments.reply` and `social.comments.approve`.

13. Before a new file message to a first-degree person, check other campaigns (`references/campaign.md`).

14. Find threads with `unibox.inbox.unified_list` since the post went live (`references/inbox.md`). Draft with `draft-thread-reply`.

15. Keep private messages as the default (`references/public.md`). A public link on that post needs a yes.

16. After a live pass, verify with `social.outreach.keyword_dm_sends.list` (`references/verify.md`).

17. On a failed pass, read `runs_get` and `runs_events` (`references/fail.md`).

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 1 | `whoami` | read | no |
| 1 | `tools_get` | read | no |
| 1 | `tools_run` | live | yes |
| 3 | `social.content.tracking_links_lookup` | live | yes |
| 3 | `social.content.tracking_link_create` | live | yes |
| 3 | `social.content.tracking_link_get` | read | no |
| 4 | `social.outreach.keyword_dm_rules.list` | read | no |
| 4 | `keyword_dm_rules.replace` | live | yes |
| 7 | `social.outreach.keyword_dm_sends.list` | read | no |
| 8 | `tables.columns.add` | write | no |
| 8 | `tools_get` | read | no |
| 10 | `senders.linkedin_accounts.list` | read | no |
| 11 | `social.comments.queue_list` | read | no |
| 11 | `social.linkedin_posts.comments_list` | live | yes |
| 11 | `social.outreach.keyword_dm_sends.list` | read | no |
| 12 | `social.linkedin_posts.get` | live | yes |
| 12 | `social.comments.reply` | live | yes |
| 12 | `social.comments.approve` | live | yes |
| 13 | `tools_get` | read | no |
| 14 | `unibox.inbox.unified_list` | read | no |
| 16 | `social.outreach.keyword_dm_sends.list` | read | no |
| 17 | `runs_get` | read | no |
| 17 | `runs_events` | read | no |

## Stop rules

- Follow the skill-frame writing rules.

- Do not activate a sequence in the same step as delivering the file.

- This skill does not send.

- Call `tools_get` before every `tools_run`.

- The message body carries the full destination URL plus UTM and never `short_url`.

- `dm_enabled` stays false until the owner says yes on that exact text.

- Keep keywords in the range 1-20.

- A dry_run of `social.content.tracking_links_lookup` runs live, so say it was a read.

- Stop when that exact address is already in the private thread.

- Omitting one rule deletes it.

- If the revision is stale, re-read it and do not retry the old body.

- The owner says yes on the rule.

- A missing degree is a skip.

- Accepting an invite is a separate yes, and it is not this delivery.

- Accept an invite only from a person waiting on this file.

- Nobody gets the file twice.

- A leftover cursor refuses the send.

- An incomplete duplicate check is not a send.

- No chat id on the receipt means review, not a second send.

- Do not invent an id.

- A cut-short list, or a full page, refuses the send.

- Do not tighten pacing or invent a spacing API.

- The owner may shorten the gap for safety, and this skill never does.

- More than 500 comments stops the scan on purpose.

- Do not scrape in a tight loop.

- A dry_run of `social.linkedin_posts.comments_list` runs live.

- Run no other job on this account in the same quarter-hour.

- Run one pass at a time.

- Two tries is the ceiling.

- At about a thousand worksheet rows, stop and review before widening.

- `social.linkedin_posts.get` has no dry_run. Do not send that mode.

- Anything that is not a live pass must not send.

- A price of zero still needs a yes when replace turns a send or a public line on.

- Missing channel data refuses the send.

- Sixty pages is the ceiling.

- An empty page refuses the send.

- Do not raise it to hide a truncated page.

- A DM or a connection note never hits the comment rule.

- Send only accepted texts.

- If a timed-out reply is under two hours old, stop before any network call.

- If a network rate limit hits, stop.

- If quota enforcement is unavailable, stop.

- Do not build a side path that does the same writes.

- On a failure, read `runs_get` and `runs_events`.

- Do not invent a field the schema lacks.
