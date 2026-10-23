---
name: draft-linkedin-comments
description: "Draft a local queue of comments on other people's LinkedIn posts. Use when the owner wants replies drafted. They post each one, or they say yes on that exact text."
---

Follow `docs/skill-frame.md`.

The owner posts the comment, or says yes on that exact text. A yes on different wording is a new yes. This skill does not comment, like, follow, connect, or message on its own. Never call `sequence.linkedin.auto_engagements.replace`. Never call `sequence.x.auto_engagements.replace`. A file handed out after a keyword comment is `send-lead-magnet`, not this queue.

`tools_get` before every `tools_run`. The fetched schema wins.

`source.account_posts_linkedin_profile` and `source.linkedin_posts_search` are definition ids, not `tools_run` ids. Resolve them with `tables.executable_definitions.list_resolved`. Bind with `tables.table_sources.attach`: `table_id`, `source_column_id` (nullable), and either `binding_spec` or `binding`, never both. Pass `source_id` only when editing. Attach is 0 credits and reversible. `tables.table_sources.run` is what spends. When that schema lists `max_rows`, it belongs in `params`. Dry-run the run when the mode exists, show the quote, wait, then live with `quote_hash`, `max_credits`, and a new `idempotency_key`.

`social.feeds.create` is 0 credits. dry_run first. Live needs `approved: true` because it is a recurring trigger. Required `table_id`, `kind` (`watched_accounts` or `keyword`), `cadence` (`hourly`, `daily`, or `weekly`), and `stored_max_credits`. Pass `account_urls` or `keyword`, never both.

`visibility.radar.inspiration_linkedin_list` is a free read. `dry_run` executes the read.

`account_id` comes from `senders.linkedin_accounts.list`.

`social.linkedin_posts.get` needs `account_id` and `post_id`. It costs 0, calls LinkedIn, and is read only. Do not send dry_run.

`social.linkedin_posts.comments_list` uses that same `account_id` and `post_id`. It is a free external read. Sending dry_run executes the read, so do not send that mode. Say that it was a read.

To comment, `social.engagement.comment`: omit `approved`, or use smoke_test, to preview. Live posts only with `approved: true`, an `idempotency_key`, and yes on that exact text. Required `account_id`, `post_social_id` (a composite id, not an activity URN), and `body` (1–4000). Zero credits, and it still counts on the sender's daily quota.

`social.posts.comment_publish` is the other call. It is 2 credits. dry_run previews; live repeats `quote_hash` with `max_credits` 2. Required `channel` `"linkedin"`, `account_id`, `target_post_urn`, `body` (1–3000), and `consequence` `"public_comment"`. It runs only from an approved durable run step, or the call returns 409 `durable_run_step_required`. The owner says yes on that exact body. Do not retry when the outcome is unknown. Do not use that call to fill the queue.

`social.engagement.react`: `account_id`, `post_social_id`, optional `comment_id`, `reaction` defaulting to like. It has no dry_run. Use smoke_test to preview. Live needs `approved: true`, an `idempotency_key`, and yes on that reaction. It also counts on the daily quota. Do not react unless they named that reaction.

## Cadence

Run twice on a weekday. Ask when their audience is actually on LinkedIn. Many use mid-morning. The second pass is mid-afternoon. Use their time zone. The window is 3 hours. The batch is 10 to 12 comments. Weekends are thin. Open the window back to the prior run's `fetched_at`. In the handover, say those posts are older. Replies under the owner's own posts stay off this queue. They answer those themselves.

## Learn

If `work/draft-linkedin-comments/` already has a run, start from the newest file. Set each earlier draft against what they really posted. Verdicts are `posted as drafted`, `posted with edits`, and `not posted`. When their comments could not be read, the verdict is `unknown`. Zero posts from them on that run is a missed window. That is not a verdict on the drafts.

Match the 19-digit id that follows `activity-` or `activity:`. Strip a leading @mention. Collapse whitespace. Ignore automated lines: a bare sent note, a "check your DMs" delivery, any link, a `utm_` tag, or the same line repeated word for word. With two drafts, name which one (A or B) landed closer.

Early rounds, while picks are still settling, write 2 drafts on each post. After two runs where one draft would have been the card they took most of the time, return to a single draft.

An edit becomes a voice rule in `brand.local/voice.md`, not a stored copy of their sentence. A pattern seen twice becomes a rule. Edits are the strongest voice signal. One line in the handover says what you learned. Do not paste their comment into the repo. Recent comments of theirs are texture only.

Skip reasons a card may store: "Post too old", "Already said", "Wrong angle", "Too long", "Not how I talk", "Not my topic", "No reason".

If `brand.local/voice.md` has no comment rules yet, measure and ask before the first batch. Use the last 50 to 100 comments they left under other people's posts. Drop automated deliveries. Also drop replies they left on their own posts. Record how many you read, the median word count, the share of 1 liners, the longest comment plus its topic, the usual opening, and the usual close. Until that measurement exists, follow the default shape and mention that in the handover. Two stops before the first batch: show the measured shape and wait, then show the watchlist and wait.

## Fetch

Watchlist priorities `1`, `2`, and `3`. Priority `off` drops the row. Sheet columns: `notes`, `lane`, `priority`, `headline`, `followers`, `profile_url`, and `name`. Notes say how they know the person (a client, a friend, an event, a podcast) and how warm the comment may be. Aim for 50 to 100 people. A blank follower count scores as 2,000.

Resolve the two definition ids, attach, and only then run, after yes. Run one search per profile, newest first, and hold it to the window. Cap parallel reads at 5. Retry a failure one by one. Keep that person's own posts. Skip a reshare of somebody else. Add niche keyword searches for people who are not on the watchlist. Drop anything they already commented on. Drop anything the previous run already showed. Dedupe on share id: a repost can carry a new urn and still point at the original url.

Niche rows, when lanes exist, need fit of at least 2. Drop niche hits flagged `promo`, `politics`, `hiring`, or `non_english`. `niche_min_reactions` starts at 15. Include people only. Never include the owner. Never include a profile already watched.

Mark flags on watchlist hits rather than silently deleting them: `comment_gate`, `hiring`, `politics`, `promo`, `milestone`, `link_only`, `non_english`.

`comment_gate` is a keyword bait ("comment" plus a shouty token), a promise that a comment gets a send, or "drop a comment". `hiring` covers open roles and apply-here lines. `politics` covers election, democrat, republican, and war. `promo` covers sponsored lines, partner blurbs, a promo code, a discount code, percent off, limited spots, register-here, and webinars. `milestone` covers a new job title, a work anniversary, "I'm humbled", and announcement openers such as happy-to-share or excited-to-announce. `link_only` means the whole post is a single URL. `non_english`: count the function words the, you, of, it, for, with, and, is, to, that. Flag the post when that count is under max(3, word count // 25).

At pick time also skip sponsored posts, giveaways, job posts, milestone posts, product pitches, politics, tragedy, layoffs, and anything they would have to fake.

One bad profile does not end the run. One bad thread read does not end the run. One bad refresh does not end the run. Write the miss on `errors` and name it in the summary. `rate_limit_exceeded` ("Capacity is busy"): back off, then retry, with never more than 5 calls in parallel. On a paid read, `provider_outcome_unknown` gets a single retry. `provider_response_error` goes to a second pass, done 1 at a time. Weekends are flakier. If reading their own comments fails, continue. You lose feedback and the already-commented check, and you do not pretend those reads succeeded. Stop before a call that would pass the credit ceiling.

## Score

Score only surfaces fresh posts that are moving. Fit stays a human call.

age_hours is minutes divided by 60, with a floor of 0.25. velocity is reactions, plus comments times 3, plus reposts times 2, all over age_hours. fresh is 1.0 in the first hour, 0.85 through hour 2, 0.7 through hour 3, 0.45 through hour 6, and 0.2 after that. crowd is 1.0 when comments are under 15, 0.8 under 60, 0.55 under 150, and 0.35 otherwise. reach is log10 of (followers or 2000) plus 10. With no lane regexes, fit is 1, which is neutral. Otherwise fit is how many lanes the text touches, capped at 3. Multiply reach by (1 plus log10 of 1 plus velocity), then by fresh, then by crowd, then by (0.4 plus 0.3 times fit). Round the score to 2 decimals. Round velocity to 1 decimal. Sort high score first. Keep at most 40.

## Pick

Read each candidate in full. Keep a post only where the owner has a receipt, a stance, or a real question, inside their lanes. Skip a post with no receipt.

Take 10 to 12. Mix in 3 to 5 accounts of 50k or more when that post is younger than 2 hours, plus peers, especially notes that mark someone as warm. Prefer anything younger than 3 hours. Do not keep a post older than 6 hours unless it names the owner. A thin window means fewer cards. Say that. Do not pad with old posts.

The page is a bounded batch, newest first.

## Thread

Read threads only for the picks, with `social.linkedin_posts.comments_list`. A post with 0 comments is not read. Six comments is enough to see the pile. Do not repeat a point the thread already made. Record whether the post's author answers people, and whether the owner is already in it. A missing id is skipped. Hitting the credit ceiling stops further thread reads. Truncate what you hold in the run file; the draft does not quote the thread back.

Before the page, refresh every pick with `social.linkedin_posts.get`. Replace counts, text, and media from that read. Drop the card on `not_found`, on `404`, or when the post comes back empty. Any other failed read keeps the item as fetched.

## Receipt

Look the post's author up before writing. Notes, plus lines already in vault or Company Context, say whether there is a shared history. No hit means no shared moment. Do not invent one. A person they know can be named, with more warmth. A stranger has to earn the comment alone. DMs, calls, and deals stay private.

A story enters only as a direct parallel. If it needs a bridge, it is the wrong story. Use one in 2 to 4 comments out of 10. Say it the way they would over a coffee, and only with details the source actually gives. If that story showed up in the past 7 days, leave it out. The rest of the batch reacts, adds know-how, answers, or asks.

Every fact comes from the post or from vault and Company Context. Every number comes from proof, in that wording, and it is the newest cleared figure. Cut a sentence about the owner that has no source, or turn it into a question. No invented anecdote, feeling, client, number, or plan. No claim that a product has a feature which is not live.

## Draft

Comment voice is not post voice. Pick one move. Keys stay fixed so later counts still line up:

- `plain_opinion`: a take they share, or one they doubt.
- `plain_answer`: the post asked something.
- `honest_opinion`: no clean answer exists.
- `next_step`: a play they also run.
- `what_i_use`: a tool post or a workflow post.
- `real_question`: they want that person's method.
- `disagree`: push back only from work they have done.
- `agree_angle`: they agree, then add one angle.
- `my_story`: the direct parallel.
- `joke`: they can stand behind it.
- `peer_win`: someone they know just shipped or grew.

On a two-draft card the moves differ, one of the two is a single line, and the first slot is not always the same move. The pick should show the move, not the slot.

Write it the way they type on a phone. Cut the setup, the summary, and any word that only sounds smart. Start from what caught them. If the line would fit any other post, if it grades the post, or if it sounds like a tip, write it again.

Defaults until a measured shape replaces them: one line, between 6 and 30 words, and the batch is mostly single lines. A second short paragraph is only an honest opening plus an opinion, or a reaction plus one detail from their own work. A numbered list is only for steps that answer the post's question. Two or more sentences get a blank line between them. Ask only when they would actually want the reply. Cap questions at 4 in 10. About half the batch may use a laugh, an emoji, lowercase, or odd punctuation. Never the whole batch.

Lint every draft at 200 characters before it can reach the page. Also refuse a draft over 70 words. The older ceiling of 450 characters ("1 point, not a mini post") does not raise this 200-character stop.

Taste to test, then replace from their verdicts: prefer a concrete practice, a tool, or a result over a soft take. For a technical post, name the change they would make, including which tool, which order, and the cost reason, instead of only asking. On a hype or results post, react in their words first, then one result if they have one. Skip a setup tour unless that exact setup is the subject. A failure story is not a general hook. It belongs only on the same subject. Lines they actually say, including a slightly sharp one, stay. A sanded-down take gets skipped.

## Lint

Run `node scripts/queue-lint.mjs work/draft-linkedin-comments/<YYYY-MM-DD>-<HHMM>z.json` before the page is written. The profile is linkedin. Lengths, openers, banned words, pitches, stock lines, and batch rules are `scripts/queue-rules.json`. Read that file's `review` list and fix those shapes before you run the command. The command does not detect them. A non-zero exit means do not write the page. `scripts/queue-page.mjs` writes the page only after lint passes, and a lint failure does not write the file. Exit 0 stamps `lint` as `pass`. Do not set that field yourself. The page renders no cards unless the payload carries that stamp. Add words they never use under `## Banned words` in `brand.local/voice.md`, or as `banned_words` on the run. A null `company` skips the company-name check. The older 450-character ceiling does not raise the 200-character stop.

## Save and hand over

Write `work/draft-linkedin-comments/<YYYY-MM-DD>-<HHMM>z.json` in UTC. Store `errors`, `skipped_top`, `items`, `credits_used`, `candidates_total`, `watchlist_profiles`, `window_start`, `fetched_at`, and `run_id`. Each item keeps the candidate fields plus `angle`, `why`, and `drafts` as a list of `move`, `label`, and `text`. A draft that uses a story also stores `ref` and `ref_source` as the source path, not a second copy of a sentence they typed over your draft. `skipped_top` is the high scores you left out, with the reason. `work/` is gitignored.

Run `scripts/queue-page.mjs` with the run file, `skills/draft-linkedin-comments/queue.html`, and the page under `work/draft-linkedin-comments/`. Use one column. Put the freshest post first. Each card shows name, headline, age, text, and counts, then the comment in a box that grows, a word count, a character count against the 200-character lint, and the personal moment with its source path. Controls are Skip, then Copy, then a control labeled Copy & open. That last control puts the text on the clipboard, opens the post in a new tab, and marks the card done. Skip asks why, in one tap. Edits and marks stay in that browser. Footer line: nothing is sent until the owner posts it, or says yes on that exact text. Do not download remote images and do not embed them. No text from the read means no card.

Keep the handover to two lines. Give the count. Name the 2 or 3 that will go stale first, and tell them to do those before the rest.

A live post of one card is only `social.engagement.comment` after yes on that exact body, using the composite `post_social_id`. Preview by omitting `approved` or by smoke_test. Do not switch to `social.posts.comment_publish` unless they asked for that call and said yes on that exact body. That call is 2 credits, dry_run previews, and live repeats `quote_hash` with `max_credits` 2 from an approved durable run step.

## Stop rules
- Follow the skill-frame writing rules.
