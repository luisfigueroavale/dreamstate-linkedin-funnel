---
name: video-pick
description: "Decide the next video before anyone records: three gates, a scorecard, and a ledger after publish. Use for the next topic, a title and thumbnail check, or the opening script. Files and numbers come from the owner. It does not call a video-host API."
---

Follow `docs/skill-frame.md`.

Do not record until three gates pass. Gate 1 compares the idea with the channel median they supply. Gate 2 keeps an outside structure only at 3× or more, from 3 or more channels, across 2 or more niches, inside 90 days, in evidence they provided, and not worn at home. Gate 3 is the first minute. The ledger is the day after, three days, a week, and four weeks (28 days). Record studio click-through and retention only. Never write zero. If a path needs an API key, drop it.

| Gate | Question | Evidence | Hand over | Who decides |
|---|---|---|---|---|
| 1 Idea | Will this audience click the topic now? | Inside the niche, depth first | Up to 3 scored ideas | The owner |
| 2 Packaging | Which title and still carry the idea? | Outside-niche donors | 2 titles and 2 still directions, with donors | The owner |
| 3 Hook | Does the click hold at 0:30 and at 1:00? | 5 beats, plus recent openings | The first minute, picture on every beat | The owner reads it aloud |
| Ledger | What did this upload teach? | Their sheet and any studio paste | 1 row, and a rubric note when the card was wrong | Nothing to pick |

## Read first

1. `vault/notes/channel-ledger.md` when it exists. If it is missing, create it on the first ledger pass. Until it has 3 or more rows, the rubric is uncalibrated.
2. Proof in Company Context. There is no page-read id in `docs/tool-map.md`. Use a figure they pasted, the interview, or a receipt. A public number needs definition, unit, period, source, and a yes. Do not paste Proof into a tracked file.
3. `audience.local/ideal-follower.md` and `brand.local/identity.md`. If either is missing or still `Status: blank`, stop. The reader is the follower file. The buyer stays on Ideal Customer.
4. `vault/notes/pillars.md` and `vault/notes/funnel-stages.md`.
5. A recent wave note, for example from `x-scan`.

A wave is a product, method, or release moving this week. Before gate 1, write the niche in one line: who pays, and the paid outcome. Run `brand/taste.md` before you hand over the slate or the script.

## Evidence

Every claim names a measurement they supplied: the url, the views, the channel median, the ratio, and the capture date. A fetched page may date a launch. It does not supply a view count. One viral video is an anecdote. Call a trend or a title shape validated only after 3 or more outliers, each at 3× or above, across 3 or more channels and 2 or more niches. Log each verdict in `vault/notes/packaging-library.md`. A tip is counted the same day with this sheet before it is evidence. Their own uploads are proven only in the ledger. A ratio is current views against that channel's comparable uploads. It is not click-through, not views per hour, and not causation. Never call the age-band ratio velocity.

Call prices and modes are in `docs/calls.md`. The cheapest source is a file already in `vault/sources/`. No paid research without a yes. Do not add a host client, a plugin, or a caption downloader.

## Measure

Best source first. Before hand-typed counts, resolve `source.account_posts_youtube` with `tables.executable_definitions.list_resolved`. It is a definition id, not a `tools_run` id. Attach with `tables.table_sources.attach`. Run `tables.table_sources.run` only after the quote and the owner's yes. If that definition is not resolved, they type the counts after opening the pages: the past 30 days, the channel behind each result, and the median of its last 20 to 30 long uploads. A badge from an outlier plugin is not a measurement you fetched.

Score the sheet locally. The script does not open a socket. What rank computes, what depth computes, and the sheet JSON are in `skills/video-pick/references/score-sheet.md`. Count 6 probes. Sheet size is a search cap of 20, a depth cap of 3, and those 6 probes. Default breadth is 4. Default outlier is 3. Going past 30 searches needs another yes.

Save numbers under `vault/sources/<date>-<slug>/` (append only). A fix is a new file. In `origin.md`, record what was counted, when, the command, and that no host was called. Append one line to `vault/sources/README.md`. Do not commit the folder.

```sh
node skills/video-pick/scripts/score-sheet.mjs rank --sheet vault/sources/<date>-<slug>/sheet.json --out vault/sources/<date>-<slug>
node skills/video-pick/scripts/score-sheet.mjs depth --sheet vault/sources/<date>-<slug>/sheet.json --out vault/sources/<date>-<slug>
node skills/video-pick/scripts/score-sheet.mjs card --heat 2 --gap 2 --fit 2 --timing 1 --receipt 1
node skills/video-pick/scripts/score-sheet.mjs opening --file vault/notes/video/<date>-<slug>-opening.txt
node skills/video-pick/scripts/score-sheet.mjs packaging --donors vault/sources/<date>-<slug>/donors.json
```

Adding rows and rerunning reprints the tree. Nothing is fetched. `depth` refuses to run without `fit`. `--max-depth 0` reports the seeds and proposes no children. `--days`, `--outlier`, and `--breadth` override the sheet.

## Gate 1

1. Seeds. 6 to 10 in `vault/sources/<date>-<slug>/seeds.json`, each `{ "query", "branch" }`. Mix waves from the last 30 days with 2 or 3 niche-outcome queries. They type the queries. You do not search a host.
2. They count results into the sheet: views, publish time, duration, channel, and that channel's other uploads. Run `depth` with `--days 30`.
3. Read `depth.md`. The tree shows where the count got hot. The heat table shows phrases that are outliers on many channels. Probes show the gap. The library block ("also popping") is waves the seeds never named. Follow a new wave with a second sheet, 4 to 6 seeds, `--max-depth 0`, and one query that pairs the wave with the niche outcome.
4. For the 5 strongest outliers, read the title, a still they paste, and a transcript of minute one if they have it. Remove off-topic hits, keynotes, and the wrong language. A foreign upload on the niche angle is demand, not the cut they will copy. Date the wave from its source. Write every niche upload on that wave, with its ratio. Many small uploads near baseline means the slot is crowded. An outlier from a larger niche channel means the slot is closed. Under a week of age, also read views per day, because older uploads dominate the median. If they cannot run the tool on their plan or where they live, Receipt is 0.
5. A pass needs 8 or more points out of 10, with Heat, Gap, and Fit all above 0.
6. Slate up to 3 ideas, strongest first, in `vault/notes/video/<date>-<slug>.md`. One line names the wave, then the niche outcome. Under it, each criterion gets its evidence: up to 3 outlier urls with ratios, the probe, and the date the wave began. Name the receipt. Note overlap with the previous 3 videos. If fewer than 3 pass, say so. The owner picks.

```text
Idea: <wave> applied to <niche outcome>
Scores: Heat 2, Gap 2, Fit 2, Timing 1, Receipt 1, total 8, pass
Heat evidence: url, ratio, channel, age (up to 3)
Gap evidence: probe, or the niche list with count, best ratio, and who
Timing evidence: wave began <date> via <source>; planned live date; day gap
Receipt evidence: what is on screen, and which cleared proof line
Overlap evidence: none, or the recent video it repeats
```

## Scorecard

Five criteria, each 0, 1, or 2. Pass is 8 or higher, and Heat, Gap, and Fit must each be above 0. Backtest the card on their uploads, and revise it when the ledger gains a row. `card` sums the five integers. If Heat is 0 while Gap is above 0, it warns: a dead wave does not create a gap.

Heat is whether the wave is hot now. Evidence is the heat table and the top outliers. 2: at least 3 outliers at 3× or higher, from at least 2 channels, freshest younger than 14 days. 1: outliers are 15 to 30 days old, or only one channel produced them. 0: no wave, evergreen, or outliers absent.

Gap is whether the niche angle is still open. Evidence is the probes and the list in step 4. 2: niche uploads on this wave lack outlier numbers, and there are not many of them. 1: plenty of niche uploads, small or near baseline, and none is an outlier. 0: a larger channel in this niche already has an outlier on the angle. Give Gap points only when Heat is 1 or 2.

Fit is whether the outcome is this owner's niche. Evidence is the title draft and the follower file. 2: the title states the outcome this audience pays for. 1: adjacent work they care about less. 0: a different audience, personal growth, or general news. Heat is measured off their channel. Fit is measured on it. A personal-brand idea passes only when the outcome is the niche outcome.

Timing is whether it can ship while the window is open. 2: the upload goes up within 14 days of the wave's beginning, or of its latest jump. 1: the lag is 15 to 30 days. 0: later than that. On one wave, Gap and Timing usually split a hit from a miss.

Receipt is whether the owner can show the thing. Evidence is Proof, already cleared. 2: a real run, on screen, with a cleared number, and that number is required before anyone records. 1: a real run, and no number. 0: opinion only, or an explainer with nothing they ran. Receipt at 0 does not alone fail a card whose total is still 8 or more while Heat, Gap, and Fit stay above 0. An idea they cannot run is still Receipt 0.

One idea may carry two waves when both serve the niche outcome. If the idea repeats 1 of their last 3 videos, note it on the slate. A follow-up on a winner may stay. A rerun may not.

## Gate 2

The niche picks the topic. Packaging is proved elsewhere. When the same shape wins across 2 or more unrelated niches, the shape is what won. Inside one niche the idea, the title, and the still are tangled.

1. Draft 3 to 5 titles. Each names the wave and the niche outcome. `title-pair` may polish the pair. It does not replace this donor test.
2. One structure at a time, from 4 to 6 niches, at least 2 outside their field. Own seed file. `branch` is the donating niche. Window 90 days. Depth 0. `keep` is the structure. `fit` is the niche outcome. Do not merge them.
3. Apply the three-part pass below.
4. Open the top 5 donor stills they paste. Record subject (to-camera, back-shot, object, or UI), the one hero object, word count, and contrast. Brief `thumb-patterns` and `thumb-frame`. On-image words name the niche outcome. The hero is the wave's mark. About 2 to 4 words. No other creator's face unless the video is about that person. Do not generate a face.
5. Promise check. The title and the still claim only what the video shows. A number only when Proof has cleared it.

Hand over 2 titles and 2 still directions, each with donors (url, niche, ratio) and the saturation check. The owner picks.

Donor fields and the eight structures (experiment, equation, time box, removed task, verdict, versus, plea, swap), with the `packaging` name and the shape the scorer tests, are in `skills/video-pick/references/score-sheet.md`.

`donors.json` uses `rows` for outside niches and `niche_rows` for the wear test. Optional `structure` drops rows whose title misses that shape. A row with no ratio or no age is ignored, not treated as zero. Window fields are `window_days` 90 and `niche_window_days` 30.

Pass, all three. Proved elsewhere means, inside 90 days, at least 3 outliers at 3× or above, at least 3 channels, and at least 2 donor niches. Not worn at home means the same shape on 3 or 4 niche seeds across 30 days. Worn means 3 or more home-niche channels used it and the median of their ratios sits under 1.5×. That median averages the two central ratios on an even count. A median of 1.5× is not under the line. A missing ratio stays missing. Transfer the skeleton. Preserve word order, any parenthesis, and the slot where a number sits. Put the wave and the niche outcome into those slots, then run the promise check.

Read the packaging library before you draft. After each check, record the shape, when you counted it, each donor's url, niche, and ratio, whether the home niche is saturated, and a verdict: validated, worn, or not proven. Below 10 videos of their own, a pattern in their old stills is a hint, not a rule. After the ledger has rows, read those stills for the subject, the object, and the words on hits and missing on misses.

## Gate 3

Script minute one as 5 beats. Aim near 160 words. A clear take may stretch toward 220. The template band is 150 to 170. Every beat names the picture. Sentence one restates the title. Frame one is the hero object from the still. Write three alternates of sentence one. The owner reads them aloud, picks, and films that opening before the rest. `record-script` waits until all three gates pass. `long-cut` uses the cut marks.

A studio paste uses the share still watching at 0:30. High means the opening delivered the package. Low means change the title, the still, or the opening. There is no universal benchmark. Compare with this channel's previous 10 of similar length when they paste that. Prove the promise, then show the work. On a business channel, use at most 3 short lines, restate the promise, raise curiosity past the packaging, and enter point 1.

From transcripts they supply of their last 3 or 4 videos, note the first 15 seconds, 0:15 through 1:00, and keep or cut. Count "essentially", "actually", "basically", and the words in minute one. That is their pace. Outlier openings often land around 200 to 270 words and open on the proof object, a numbered promise against a contrast, the belief this video breaks, or the wave with its date. A disclaimer or another creator is a rare open.

1. Confirm, 0:00 through 0:05, cap 15 words. State the title's promise as an outcome. Do not greet. Do not say their name. The picture is the hero object, and it is live.
2. Stakes, 0:05 through 0:15, cap 30 words. Say why this week. Show a launch page, an outlier, or the mark.
3. Receipt, 0:15 through 0:25, cap 25 words. One line of cleared proof, plus half a line on who they are. Show that number on their display.
4. Loop, from 25 seconds through 45 seconds, cap 50 words. Name the three parts, and leave one loop open on the part that produced the result. Show the card that lists those parts, or show the map.
5. Payoff, from 45 seconds through one minute, cap 45 words. Begin part 1. Do not use a hop-in line. Show step 1.

Caps add to 165. Do not pad. Show the result, then the method. Benchmarks, history, and theory wait until after the first payoff. No other creators, filler, subscribe ask, channel intro, or sponsor in this minute. Change the picture every 3 to 5 seconds for the first 30 seconds. Near 3:00, open another loop or show a result they have not seen.

The handed script has TITLE, HERO, then the five beats with three confirm lines labeled A, B, and C, and a WORDS line. `opening` looks for those five time marks, three confirm lines, a beat over its cap, any confirm line over 15 words, a spoken total over 220, a hop-in on the payoff, and a confirm that starts with hi, hey, or hello. The spoken total takes the line marked `PICK` when present, otherwise the first confirm line, then beats 2 through 5. Outside 150 to 170 is a note unless the total exceeds 220. Filler and a missing cut mark inside the first three beats are notes. A note is not a pass on the promise.

Once the video is up, and only after they paste the figures, write the 0:30 share and the 1:00 share into the ledger. If the script beats the previous 10 at 0:30, keep beat 1. Otherwise write a new beat 1.

## Ledger

After publish, record in `vault/notes/channel-ledger.md` at the day after, at three days, at a week, and at four weeks: views, views per day against the channel median they supplied, and, only from a studio paste, impressions, click-through, the 0:30 still-watching share, the 1:00 still-watching share, and average view duration. Leave a studio cell blank when they have not pasted it. Do not write zero. Add this video's card and one sentence on the lesson. When a card of 8 or more misses, or a card under 8 hits, revise the rubric and write the reason.

The week-out pace is the calibration column. Views per day are views divided by age in days, age at least 1. Compare pace with pace. Do not divide unlike units. Do not use the token sequence "d 1 d 3 d 7".

## Rules

The owner picks the idea and the packaging. No number without a source. Ratios come from this sheet. Results come from cleared Proof. Never record on a failed gate. Raw numbers stay in `vault/sources/<date>-<slug>/` with `origin.md`. The synthesis is `vault/notes/video/<date>-<slug>.md`. Lessons live in the ledger and the packaging library. Use numerals in what you hand them. Do not use em dashes in that copy. `week-spread` is the weekly caller when the recording is the trunk and the idea is not chosen yet.

An outlier needs at least 5 peers of similar age and length, or the ratio is not evidence. Drop livestreams, anything under four minutes, and off-audience topics. Note a sponsor. Bands under 2×, 2–5×, 5–10×, and over 10× are labels. The 3× cut sits inside 2–5×.

## Failure modes

One viral video is an anecdote. A gap is closed when a bigger niche channel got there first. Crowded means many small uploads at baseline. Under 7 days, do not trust the ratio alone. If there is no tool where they live, the receipt is 0. Nothing back from a probe, once that wave has died, is not an opening. Under 5 peers, there is no ratio. A foreign outlier on the angle stays. A rerun of the last 3 is not a sequel. No niche outcome fails Fit. A claim the video will not show fails the promise check. An uncleared number stays off the title. A miss at 8 or more, or a hit under 8, moves the rubric. Below 3 ledger rows, the sheet is uncalibrated. One niche, under 3 channels, or under 3× is not validated. Home median under 1.5× across 3 or more channels is worn. A greeting, their name, a subscribe ask, theory before the payoff, or a hop-in fails the minute.

## Host client, not used

Do not set a key, port a client, or build a watch or still url from an id. A pasted url stays their string. A caption is one they supply. Rebuild limits are in `skills/video-pick/references/score-sheet.md`.

## Deliver

Which gate ran, whether it passed, and the reason. For gate 1, the slate and the evidence. For gate 2, the titles, the still directions, and the donors. For gate 3, the script one beat at a time. The path of the research note, the sheet, and the ledger if it changed. Which gate is next, and what the owner still has to supply.
