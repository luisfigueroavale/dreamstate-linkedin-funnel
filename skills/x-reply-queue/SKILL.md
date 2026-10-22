---
name: x-reply-queue
description: "Draft a bounded queue of short X replies from stored posts and anything the owner pasted. Use for the daily reply round. The owner posts each reply, unless a fetched contract shows that account can take one exact public reply they approved."
---

Follow `docs/skill-frame.md`.

The owner posts every reply. A blanket go-ahead is not approval of a reply. Never call `sequence.x.auto_engagements.replace`. This skill does not follow anyone and does not send a DM.

## Tools

`senders.social_accounts.list` with `platform` `x` supplies `account_id`. `tools_get` before `tools_run`. The fetched schema wins.

`visibility.radar.inspiration_x_list` is a free read of posts already stored. It does not call the X API. A dry_run request executes the read, so call it live. Optional `query` (500), `author_handles` (up to 100, a leading @ is stripped), `limit` (1–100), `cursor` (pass `frontier.cursor` back). Leave `ai_filter` off unless the owner asked for that filter. An empty page means nothing is stored for those handles.

`tables.x_post_engagers.run` needs `account_id` and `max_rows` (1–500). Modes are smoke_test and live. Do not send dry_run, because that request runs live. Live only after yes. Optional `post_ids` are workspace post-record ids (1–25), or `author_handle` with `lookback_days` (1–7). `include_likes` is optional. The call reads reposts, quotes, replies, and likes. A like the platform will not return is missing, and missing is not zero. It is not a LinkedIn harvest.

A public reply uses `social.engagement.comment` only after `tools_get` shows that account can take it. Otherwise the owner posts the draft. When the contract allows it: omit `approved`, or use smoke_test, to preview; live needs `approved: true`, an `idempotency_key`, and yes on that text. Required `account_id`, `post_social_id`, and `body`. Do not aim a contract that only describes another platform at an X post.

`social.engagement.react` has no dry_run. smoke_test to preview. Live needs `approved: true`, an `idempotency_key`, and yes on that reaction. Required `account_id` and `post_social_id`. Optional `comment_id`. `reaction` defaults to like. Skip the call when the fetched contract does not cover this X account. It is a public reaction, 0 credits, and it counts on the sender's daily quota.

## Where the lists live

Blank files in `references/` start at `Status: blank`. Stop and fill them with the owner before the first drafts. Ask only for what the pages and their past replies do not already show. When they supply old replies, read at least 50, skip the automated ones, and write texture into `brand.local/voice.md` as rules. Do not paste those sentences into the rule list. Two pauses: after voice, receipts, and lanes; again after the watchlist, the circle, and the reach list.

`references/watchlist.md` holds 50 to 150 accounts. Seed it with whoever already gets their replies, whoever they volunteer, and peers who post inside the lanes. A row has a handle, a display name, a follower count, a lane, and notes. Priority is a digit from 1 to 3, or the word off. Off stays out of every pass. Their own handle stays out.

`references/lanes.md` holds 3 to 5 lanes, each a keyword pattern, plus the smaller set for a core-niche pass, plus the junk terms. A junk gate with no terms is off.

`references/receipts.md` holds four groups: habits and tools in use, figures they will say out loud, positions in their phrasing, and a blocked list of claims that are not true yet. A reply must not use the blocked list. When a figure disagrees with the Proof page, the Proof page wins. Each line names its source. Refresh the file when a figure or a position changes.

`references/circle.md` is the circle. `references/reach.md` is the large-account list. `references/verdicts.md` is the lesson log. Runs and `taste.json` go under `work/x-reply-queue/`, which is gitignored.

## Cadence

Ask when their targets are online. Twice on those days. For a US audience, use that timezone's morning and its afternoon. Each ordinary pass looks back 3 hours. Hand them somewhere from eight replies through fifteen. Their share of the work is about ten minutes. Keep the window short. People see the replies that land early.

On a day the owner posts, they answer the replies under that post themselves, during the first hour. This queue does not include those.

Speed pass, while they are at the keyboard: look back 1.5 hours, keep originals under 90 minutes, hand them 5 to 8, and run again every 20 to 30 minutes until they stop. Any topic they can stand behind still has to clear politics, promos, and the other flags below. When junk terms exist, the term minimum still applies unless they marked this pass broad.

A thin window (a weekend, or their main audience asleep) keeps only posts from the last three hours, and a small page, then a later pass. Do not backfill with older posts.

Hand back two lines: the page path, the count, and the 2 or 3 to send first because they go stale fastest.

## Circle and reach

About 10 accounts, engaged on every run, so the name becomes familiar and they answer. Pick them with the owner from a 7-day look: they post often in the lanes, they get real engagement, and they reply to other people. One line under the circle heading: handle, name, followers, and why. Lines under Alternates are ignored. Move a line up to swap someone in.

Circle posts stay eligible out to 6 hours. They receive a 1.6 boost. The page marks them with a circle chip. The taste ledger does not drop them, and the half-score for repeated skips does not apply. In a speed pass they stay in even under 50,000 followers. If they were missing from the watchlist, treat them as on it for that pass. When anyone in the circle posted inside the window, the batch includes at least one reply to them.

`references/reach.md` is for the speed pass: active accounts at or above 50,000 followers, in or near the lanes, on topics where the owner can add a real line. Confirm the follower count before a name goes in. Skip a political feed, a crypto feed, an account that only posts tool roundups, and a company account with no back-and-forth. One line: handle and follower count. The speed set is that file, plus the circle, plus watchlist rows already at 50,000 followers. If the file is still blank, speed uses the circle and those watchlist rows.

## What enters

Candidates are original posts. Replies and reposts do not enter. A quote stays, scored on its own text.

Build the handle set from the watchlist priorities in play, plus the circle. A speed pass uses the reach set instead of the full watchlist. Read `visibility.radar.inspiration_x_list` in handle batches of at most 100, newest stored first. Also take posts the owner pasted. Cap the scored list at 40.

Skip a post they already replied to (same post or same conversation) using the replies they sent in the last day. Skip anything that was already on the previous run's page. One reply to a given account per day is enough; `replied_to_author_recently` at 1 or more leaves them out today.

People who replied to the owner in the last 24 hours, capped at 50, are the talker set.

Flags, any of which blocks a pick:

- Giveaway: ask to comment a code word, reply with a quoted word, repost-and-follow, or the word giveaway.
- Politics, drama, or tragedy. The politics match includes election, democrat, republican, and war.
- The whole post is a single link.
- Promo: airdrop, presale, a cashtag, crypto, web3, whitelist, token launch, bonding curve, escrow, telegram, sponsored, limited spots, final hour, hours left, jobs found today, dm me for, i help founders.
- Hiring: a job alert, now hiring, work mode, job type, apply here, remote jobs, or a pin-and-briefcase location line.
- A run of four or more styled unicode letters used as a fake headline.
- A campaign: the same three-word phrase, ignoring articles, pronouns, and short prepositions, from four or more accounts in one fetch.

Off-list posts (a paste, or a stored post whose author is not on the watchlist) also need a follower floor of 5,000, or 2,000 on a core-niche pass, and they need to touch at least two lanes. A core-niche pass keeps a post only when it matches the focus lanes. Promo or politics drops them. Do not add a second copy of someone already on the watchlist.

## Score

Rank the cut by score, high first. The page the owner sees is still newest first, and the batch stays inside the cadence cap.

Ordinary score:

- Signal is likes, plus replies times 3, plus reposts times 2, plus bookmarks.
- Velocity is that signal divided by age in hours. Age counts as at least 0.25 hours.
- Freshness is 1.0 at or under 1 hour, 0.75 at or under 2, 0.5 at or under 3, otherwise 0.2.
- Crowd is 1.0 under 30 replies, 0.7 under 100, otherwise 0.4.
- Reach is log10 of (followers + 10).
- Fit is how many lanes match, capped at 3. With no lanes configured, fit is 1.
- Niche is the count of distinct junk terms, capped at 4, with a trailing plural s folded. With no junk terms, niche is 1.
- Start from reach times (1 + log10 of (1 + velocity)) times freshness times crowd times (0.4 + 0.3 times fit).

Then apply, in order: times 1.3 when the author is in the talker set; times 1.3 when taste says the owner has replied to that account before, otherwise times 0.5 when that account was shown at least twice and never answered and is not in the circle; times 1.6 when they are in the circle; then times (0.6 + 0.2 times niche).

Drop, before scoring finishes, an account shown at least three times with zero replies from the owner, unless they are in the circle. The junk gate drops a post under the minimum distinct terms (default 1) unless this pass is broad or no terms are set.

Speed score replaces the ordinary score for a non-circle account on a speed pass, after the 300-reply and 50,000-follower cuts:

- Freshness is 1.0 at or under 15 minutes, 0.85 at or under 30, 0.65 at or under 45, 0.5 at or under 60, otherwise 0.3.
- Crowd is 1.0 under 20 replies, 0.8 under 60, 0.6 under 150, otherwise 0.35.
- Velocity is (likes + replies times 3 + reposts times 2) divided by age in hours, with age at least 0.1 hours. Bookmarks stay out of this one.
- Score is reach times freshness times crowd times (1 + log10 of (1 + velocity)), using the same reach formula.
- Circle accounts on a speed pass keep the ordinary score, then the same boosts.

A fast-moving post from an account whose posts travel outranks a post that is only on topic. The feed bets on the next action, and a reply counts for much more than a like. Treat any published weight table as a hint. A bare thanks stays near a handful of impressions. One specific practice, or one how-question under a large account, can reach the hundreds. When a post finishes around a few thousand views, a few dozen people see the reply. When it reaches tens of thousands of views, several times more people see it. An emoji with no words, and a line that sounds generated, both sink.

## Pick

All four have to be yes:

1. Lanes. General news, culture, jokes, and events stay out.
2. Something they do this week. That is a habit, a tool they would actually choose, or a figure they can show, from `references/receipts.md` or the Proof page. Skip when there is no receipt. Do not invent the missing fact, and do not replace it with a question-only draft.
3. A plug, a story, or a bare opinion stays out. That includes naming the product, a shipped-it brag, a tour of their setup, an old personal story, and a take that contains no practice.
4. Age under three hours, strongest from a quarter hour to one hour. A circle post may use the six-hour window only to fill the circle slot when that circle has nothing newer.

Fewer strong picks beat a longer weak list. The ordinary page holds 8 to 12. The speed page holds 5 to 8.

## Thread

For a pick with 5 or more replies, read the thread before drafting. Use `tables.x_post_engagers.run` with `max_rows` at 10 unless the owner asked for a larger bound, live only after yes, and only when `post_ids` are real post-record ids. If those ids are missing, ask the owner to paste the thread. Keep the look inside the last 2 days. Use the 8 replies with the most likes.

Drop the pick when that thread is a promo pile or a bot pile. Do not repeat a point already sitting in those top replies. `author_answers` above 0 is a plus: the poster is talking back.

## Draft

Read `brand/AGENTS.md`, `brand.local/`, `references/verdicts.md`, and `taste.json` before writing. One reply per post. Every fact comes from the receipts, the Proof page, the voice file, or the post. Every number comes from the Proof page.

A reply is one thought to a peer: usually one or two short sentences, 70 to 160 characters, and never over 200. Say it with contractions and plain words, in the texture already in `brand.local/voice.md` (how they laugh, whether they use emoji, lowercase, the words they use for people). No windup sentence, no punchline sentence, and no triad of parallel beats. One receipt is enough. Do not pile a story, a number, and a lesson into the same line, and do not show off a number nobody asked for. At most one question, and only after a concrete line. The question is short, and the poster could answer it from experience.

No compliment as the opener or as padding. No link, no hashtag, no product plug. When they have named the company, that name appears only when it is the receipt itself, and in at most one reply out of ten. If they have not named it, there is no name check. No em dash and no en dash.

Set `angle` to one of these seven names. `receipt`: the line is work they already do. `gap`: the post left out the piece they know. `tried`: they followed that advice, or they dropped it. `method`: the post never shows the how, and they have one. `ask`: a short question sits after a concrete line. `pushback`: their own work gives them a reason to disagree. `joke`: the post is funny and they can add a true detail.

Starting tastes, kept until verdicts replace them:

- Each reply carries one practice, tool, or result they have now. A pure opinion, an old story, or a plug is skipped.
- Open on the hack or the result. A draft that is only a question rarely gets sent.
- Meet the post's point first: agree by adding the how, answer the question they asked, or add a joke the owner can stand behind.
- Under a hype post or a results post, match their energy in the owner's words, then one result or one trick if there is one.
- Leave out setup tours: routines, repos, agent counts, subscriptions.
- Prefer plain words. Leave out age, years, and team size unless the post asked.
- Do not hang another reply on the same failure story.
- Drafts under posts 15 to 60 minutes old are the ones that actually get sent. Drafts under posts older than 3 hours mostly do not.

Never send a reply that invents an anecdote, a customer story, or a number. Never present someone else's result as the owner's, and never claim a tool they have not used. Never pitch, never drop a booking link, never say DM me, and never say check out the product.

## Lint

Run `node scripts/queue-lint.mjs work/x-reply-queue/<YYYY-MM-DD>-<HHMM>z.json --profile x` before the page is written. Lengths, line breaks, openers, banned words, stock shapes, and product brags are `scripts/queue-rules.json`. Read that file's `review` list and fix those shapes before you run the command. A non-zero exit means do not write the page. Run `scripts/queue-page.mjs` to write the page only after lint passes, and a lint failure does not write the file. Exit 0 stamps `lint` as `pass`. Do not set that field yourself. The page renders no cards without it. Add words they never use under `## Banned` in `brand.local/voice.md`, or as `banned_words` on the run. A company name fails except the one receipt exception above, and never past 1 reply in 10. A null company skips that check. Each taste block is a pattern plus a why, learned from skips. A match fails.

`references/queue.html` is the page. Run `scripts/queue-page.mjs` with the run file, `references/queue.html`, and `work/x-reply-queue/<run-id>.html`, and pass `--profile x`. The payload's `picks` array is what the page renders (`items` still renders if present). Put the note time in `updated` or `pulled_at`. The page is one column. It sorts newest first. Each card shows the name, the handle, the text, likes, replies, follower count, and a circle chip when `circle` is true. An avatar or a post image renders only from bytes already in the payload. The reply box grows with the text. The count warns over 200. Skip, Copy, and Reply on X (the composer opens with the text filled in and the card marks done). Undo brings it back. Edits and skip or done marks stay in the browser. The footer says nothing is sent until the owner posts it.

Before rendering, re-read the same handles and refresh counts, text, name, and followers. A post the new read no longer returns is dropped. Do not invent a metric to fill a hole.

Save the run as `work/x-reply-queue/<YYYY-MM-DD>-<HHMM>z.json`. Include an id, the time it was pulled, the start of the window, how many handles were in play, how many candidates survived, the picks (each with its angle, its why, and its draft), and a short list of near misses.

## Learn

Do this before the next fetch. Use replies the owner actually sent. A click on the page is not that evidence. If they have not pasted the sent text and no fetched contract returned it, say so and do not invent the verdicts.

Compare each earlier draft with the sent text after stripping leading @ mentions. Same text means posted as drafted. Different text means posted with edits. No sent text means not posted. When a sent reply exists and that account is in the talker set, note that they talked back. When that sent reply has public counts, store them beside the verdict. Unknown counts stay blank.

When the whole pass has zero sent replies, log a missed window. Do not treat those drafts as rejects. Skip judgment when the run is under 30 minutes old, or older than 6 days. Judge each draft once, even if a later run carried the same post. When merging a new paste, include sends from one hour before `updated_at` so a boundary reply is kept.

`taste.json` stores `updated_at`, `drafts_judged`, `posted`, `posted_ids`, per-account `shown` and `posted`, `by_age`, and `by_angle`. Age buckets are under 15 minutes, 15 to 60 minutes, 1 to 3 hours, and over 3 hours. Angles use the seven names above. The short report names who they answer (up to 15, highest posted count first) and who they keep skipping (`shown` at least 2 and `posted` still 0).

Write what that comparison teaches into `references/verdicts.md` before drafting again. A pattern seen twice becomes a voice rule in `brand.local/voice.md`. An edit they make becomes a voice rule, not a stored copy of their sentence. Their edits are the strongest signal in the ledger.

Own posts are `x-draft` and `x-week`. A niche scan is `x-scan`. LinkedIn comments are `comment-queue`.
