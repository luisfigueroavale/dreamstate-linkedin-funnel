---
name: video-pick
description: "Decide the next video before anyone records: three gates, a scorecard, and a ledger after publish. Use for the next topic, a title and thumbnail check, or the opening script. Files and numbers come from the owner. It does not call a video-host API."
---

Follow `docs/skill-frame.md`.

No recording until the gates pass. The owner picks. Gate 1 asks whether the idea sits deep in the niche, and you compare its ratio with the channel median they supplied. Gate 2 keeps a structure as validated outside the niche only with at least 3× from 3 or more channels across 2 or more niches, in evidence they provided. Gate 3 is the first minute, scripted. The ledger is not a fourth gate in front of the camera. It starts the day after publish, then three days out, a week out, and four weeks out (28 days): views per day against that channel median. Click-through and retention only when they paste studio numbers. Do not invent a video-host API. If a script needs an API key, drop that path. Inputs are files or numbers the owner supplies.

A breakout on a small channel usually ties a hot wave from that week (a model, a tool, or a launch) to the outcome this niche pays for, while larger channels here have not used the angle. A miss usually lacks the gap, because a bigger channel got there first, or it lacks the wave and the niche together, because that topic is not one this audience pays for. The ledger is how this channel teaches the rubric. Each upload adds a row.

| Gate | Question | Where the evidence lives | What you hand over | Who decides |
|---|---|---|---|---|
| 1 Idea | Will this audience click the topic now? | Inside the niche, depth first | 3 scored ideas, or fewer if that is all that pass | The owner, the pick |
| 2 Packaging | Which title and which still should carry this idea? | Outside the niche: outlier donors | 2 titles and 2 thumbnail directions, each with donors | The owner chooses the split pair |
| 3 Hook | Does the click still hold at 0:30 and at 1:00? | 5 beats, plus their recent openings | The first minute in full, screen noted on every beat | The owner reads it aloud and edits |
| Ledger | What did this upload teach? | Their sheet and any studio paste | 1 row, and a rubric note when the card was wrong | Nothing to pick |

## Read first

1. `vault/notes/channel-ledger.md` when it exists: their pattern and the last uploads. If it is missing, create it on the first ledger pass, using the row below. Until that file has 3 or more rows, call the rubric uncalibrated.
2. Proof in Company Context. There is no page-read id in `docs/tool-map.md`. Use a figure they pasted, the interview, or a receipt. A public number needs definition, unit, period, source, and a yes. Do not paste Proof into a tracked file. Do not invent one.
3. `audience.local/ideal-follower.md` and `brand.local/identity.md`. If either is missing or still `Status: blank`, stop. The reader is the follower file. The buyer stays on Ideal Customer. Name the outcome the video serves.
4. `vault/notes/pillars.md` and `vault/notes/funnel-stages.md`, so the recording has a job in the system.
5. A recent wave note, for example from `x-scan`: what is hot this week.

Before gate 1, write the niche in 1 line: who the audience is and the outcome they pay for. Every later gate points back at that line.

Run `brand/taste.md` before the slate or the script is handed over.

## Evidence

- Every claim names a measurement they supplied: the url they pasted, the views, the channel median, the ratio, and the capture date. A view count does not come from memory. A fetched page may date a launch. It does not supply a view count.
- 1 viral video is an anecdote. Call a trend or a title shape validated only after you hold 3 or more outliers, each at 3× or above, spread across 3 or more channels and 2 or more niches. Log each verdict in `vault/notes/packaging-library.md`.
- When someone sends a tip, count it the same day with this sheet method before it counts as evidence.
- Their own uploads are proven only later, in the ledger: week-out views per day against the median they supplied, plus studio click-through, the 0:30 still-watching share, and the split result, and only for studio fields they actually pasted.
- A ratio compares current views with that channel's own comparable uploads. It is not click-through. It is not views per hour. It is not causation. Never call the age-band ratio velocity. It is not a historical view count at the same age.

`visibility.research.web_search` is 2 credits and refuses dry_run. `visibility.research.urls_fetch` is 1 credit and refuses dry_run. Quote the price, wait for yes, then live with `max_credits` at that price and an `idempotency_key`. Cheapest first: a file already in `vault/sources/`. No paid research and no new tool spend without a yes. Do not add a host client, a plugin, or a caption downloader to make this skill run.

## Measure

Best source first:

1. A sheet they filled, scored locally with `skills/video-pick/scripts/score-sheet.mjs`. The script does not open a socket.
2. Counts they typed after opening the pages themselves. Look across the past 30 days, open the channel behind each result, and take the median of its last 20 to 30 long uploads. Those counts go in the sheet. A badge from an outlier plugin is not a measurement you fetched.

Save their numbers under `vault/sources/<date>-<slug>/` (append only). A fix is a new file. Beside the sheet, add `origin.md`: what was counted, when, the command below, and a line that no host was called. Append one line to `vault/sources/README.md`. Do not commit the folder.

Sheet shape:

```json
{
  "as_of": "2026-10-22T00:00:00Z",
  "fit": "patients|clinic",
  "keep": ".",
  "days": 30,
  "outlier": 3,
  "max_depth": 3,
  "breadth": 4,
  "generic_extra": [],
  "videos": [{
    "id": "local-1",
    "title": "",
    "channel": "",
    "channel_id": "",
    "published": "2026-10-01T00:00:00Z",
    "duration_seconds": 600,
    "views": 0,
    "live": false,
    "broadcast": "",
    "language": "en",
    "subscribers": null,
    "url": ""
  }],
  "uploads": { "channel-id": ["local-1"] },
  "searches": [{ "query": "", "branch": "", "ids": [], "depth": 0, "parent_query": null }],
  "probes": [{ "query": "", "phrase": "", "anchor": "", "ids": [] }]
}
```

`duration` may be a clock stamp `PT#H#M#S` instead of `duration_seconds`. A peer that is not a row in `videos` is ignored. List searches in the order they were counted. Put a lone brand token in `generic_extra` when that single token should not count as a wave. A two-word phrase that contains it still can.

Commands, from the repo root:

```sh
node skills/video-pick/scripts/score-sheet.mjs rank --sheet vault/sources/<date>-<slug>/sheet.json --out vault/sources/<date>-<slug>
node skills/video-pick/scripts/score-sheet.mjs depth --sheet vault/sources/<date>-<slug>/sheet.json --out vault/sources/<date>-<slug>
node skills/video-pick/scripts/score-sheet.mjs card --heat 2 --gap 2 --fit 2 --timing 1 --receipt 1
node skills/video-pick/scripts/score-sheet.mjs opening --file vault/notes/video/<date>-<slug>-opening.txt
node skills/video-pick/scripts/score-sheet.mjs packaging --donors vault/sources/<date>-<slug>/donors.json
```

Adding rows and running the same command again reprints the tree. Nothing is fetched, so there is no quota cursor and no second writer to lock. `depth` refuses to run without `fit`. `--max-depth 0` reports the seeds and proposes no children. `--days`, `--outlier`, and `--breadth` override the sheet.

### What rank computes

A row is eligible when its unrounded age is at least 1 day, its duration is at least 240 seconds, it is not live (`live` true, or `broadcast` of `live` or `upcoming`), and views are present. Missing views stay missing. Do not write zero in their place.

Candidates also need rounded age at or under 90 days, a title that matches `keep` (default: any title), a language that is blank or begins with lowercase `en`, and a channel id that has an `uploads` list. `keep` does not filter the baseline. Peers stay in the median even when their titles miss `keep`. A set language that does not start with `en` is dropped from candidates only. Blank language stays, flagged `language_unchecked`, and the final pick is still reviewed by hand. Language metadata can be missing or wrong. Peers are not language-filtered, so a non-English upload can still sit in a baseline.

Age is rounded to 2 decimals before the 90-day cut and before peer windows. The recent cohort is other eligible uploads on that channel, rounded age 3 through 90, newest 20 by publish time. The recent median exists only when that list has at least 5. Otherwise `recent_ratio` is blank.

The age band runs from `max(3, age/2)` to `min(90, max(7, age×2))`, using the rounded age. A peer's duration must sit between one third of the target and three times the target. The target itself is excluded. The age-band median exists only when those peers number at least 5. Otherwise `age_band_ratio` is blank. A median of 0 also leaves the ratio blank. Both medians average the two middle values when the count is even.

Sort is age-band ratio descending (blank counts as 0), then views. The ratio the rest of the skill uses is the age-band ratio when it is a positive number, otherwise the recent ratio when that is positive, otherwise 0. Views per day are views divided by `max(rounded age, 1)`, rounded to 1 decimal. Ratios round to 2 decimals. `fit_title` is true when the title matches the niche pattern. There is no fixed marketing-word list. Bands, which are labels and not the pass line: under 2×, 2 to 5×, 5 to 10×, over 10×. The outlier cut is 3×, which sits inside the 2 to 5 band. An outlier on a smaller subscriber count is the stronger proof of a format, when they supplied subscribers. No subscriber cutoff is invented here.

`discovery` is `search` when a search block lists the id, and `library` when the id showed up only on an upload list.

### What depth computes

Round order is the sheet order. For each search, among ranked hits that match `keep`: scored rows are those with a positive used ratio; outliers are scored rows at or above the outlier cut (default 3). The node stores results, scored, outliers, distinct outlier channels, how many of those channels are new, niche-fit outliers (title matches `fit`), yield, up to 12 phrases, and the top 5 outliers (id, title, channel, views, ratio, age in days).

Yield is the sum of `log2(ratio)` across that node's outliers, rounded to 2 decimals. A phrase's weight is the same sum across the outliers whose titles contain it. Phrases that show up on outlier titles from at least 2 channels, highest weight first, are the children. A node's median ratio is the upper middle of the sorted scored ratios (index `n//2`), not the averaged peer median. Saturation means the search added neither a new outlier channel nor a new phrase. Near-duplicate phrases still count as "seen" even when they are not offered as children.

The next count, when depth allows it, comes from the deepest unsaturated node with the highest yield, up to `breadth` children (default 4). Depth starts at 0. Children stop at `max_depth` (default 3). A child is skipped when its core is empty or when that core contains, or is contained by, a query already taken. Priority is `yield × 1000 + phrase weight`. Tree status is `saturated`, `dived` when a later row names it as parent, or `not followed`.

Phrase extraction drops a long stop list (function words, filler, time words, hype) and a generic-noun list (tool, model, business, money, and the rest in the script). A unigram needs a letter and more than 2 characters. A lone version number is not a wave. A bigram is kept when neither token is a stop word and the pair is not two pure integers, so a version number beside a name can still be a wave. `generic_extra` extends the generic list. Heat keeps a phrase only when at least 2 channels carry it, then folds a core that contains or is contained by an earlier core. The report shows up to 25 heat rows: phrase, hot-row count, channel count, upper-middle ratio, fit-hit count, freshest age in days. A hot phrase with little niche fit is a thin angle.

A probe row is a hot phrase plus a niche anchor they already counted. Pick those phrases from the heat table only when the phrase itself does not already match the niche pattern, then pair each one with an anchor. The old example counted 6. A niche match needs the phrase's core inside the title and a `fit` hit. The report counts matches, how many have a baseline, how many of those are outliers, the highest view count, and the best titled row. Few matches and low views on a hot wave: the slot still looks open. Outliers on the probe: the angle is taken.

The report then lists up to 40 search outliers in the window, and up to 15 library outliers ("also popping"): adjacent clicks from the upload lists, not from a search.

## Gate 1

1. Seeds. 6 to 10 in `vault/sources/<date>-<slug>/seeds.json`, each `{ "query", "branch" }`. Mix waves from the last 30 days (models, tools, launches, and channels this audience watches) with 2 or 3 niche-outcome queries. They type the queries. You do not search a host.
2. They count the results into the sheet: views, publish time, duration, channel, and that channel's other uploads. Then run `depth` with `--days 30`. The old dive example used a search cap of 20, a depth cap of 3, and 6 probes. Use those as the size of the sheet they are willing to count, not as a client call. Default breadth is 4. Default outlier is 3. If they ask to go wider, the old ceiling before an extra yes was 30 searches.
3. Read `depth.md`. Use the tree for where the count got hot. Use the heat table for which phrases show up as outliers on many channels. Use probes for the gap. The library block ("also popping") is waves the seeds never named. Follow a new wave with a second sheet, 4 to 6 seeds, `--max-depth 0`, and one query that pairs the wave with the niche outcome.
4. Then look at what a sheet cannot see. For the 5 strongest outliers, read the title, a still they paste, and a transcript of minute one if they have it. Remove off-topic hits, keynotes, and the wrong language. Keep a note when a foreign upload hits the niche angle: that is demand, not the cut they will copy. Put a date on the wave from its source. Write down every niche upload on that wave, with its ratio. A crowd of small uploads near baseline means the slot is crowded. An outlier from a larger niche channel means the slot is closed. Under a week of age, the ratio is too low a read, because older uploads dominate the median, so also read views per day. If they cannot run the tool on their plan or where they live, Receipt is 0.
5. Score each candidate with the card below. A pass needs 8 or more points out of 10, with Heat, Gap, and Fit all above 0.
6. Slate up to 3 ideas, strongest first, in `vault/notes/video/<date>-<slug>.md`. One line names the wave and then the niche outcome. Under it, each criterion gets its evidence: up to 3 outlier urls with ratios when they pasted urls, the probe, and the date the wave began. Name the receipt they can show. Note overlap with the previous 3 videos. If fewer than 3 ideas pass, say that in the note. The owner picks. Do not pick for them.

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

Five criteria, each 0, 1, or 2. A pass is a total of 8 or higher, and Heat, Gap, and Fit must each be above 0. Treat the card as a working rule, not a law. When they already have uploads, backtest the card on those, and revise it each time the ledger gains a row.

Heat asks whether the wave is hot now. Evidence is the heat table and the top outliers.
- 2: at least 3 outliers at 3× or higher, from at least 2 channels, and the freshest is younger than 14 days.
- 1: the outliers are 15 to 30 days old, or only one channel produced them.
- 0: there is no wave. The topic is evergreen, or outliers are absent.

Gap asks whether the niche angle is still open. Evidence is the probes, plus the list written in step 4.
- 2: niche uploads on this wave lack outlier numbers, and there are not many of them.
- 1: niche uploads exist, plenty of them small or near baseline, and none is an outlier.
- 0: some larger channel in this niche already has an outlier on the angle.

Fit asks whether the outcome is this owner's niche. Evidence is the title draft and `audience.local/ideal-follower.md`.
- 2: the title states the outcome this audience pays for.
- 1: adjacent work, a related output this audience cares about less.
- 0: a different audience, personal growth, or general news.

Timing asks whether it can ship while the window is open. Evidence is the wave's source date and the release plan.
- 2: the upload goes up within 14 days of the wave's beginning, or of its latest jump.
- 1: the lag is 15 to 30 days.
- 0: later than that.

Receipt asks whether the owner can show the thing. Evidence is Proof, already cleared.
- 2: a real run, on screen, together with a cleared number.
- 1: a real run, and no number.
- 0: opinion only, or an explainer with nothing they ran.

`card` sums the five integers and applies that pass line. If Heat is 0 while Gap is above 0, it warns: a dead wave does not create a gap.

Notes:

- Heat is measured off their channel. Fit is measured on it. A personal-brand idea, or a building-in-public idea, passes only if the outcome is the niche outcome. Reach by itself is not enough.
- On one wave, Gap and Timing are the usual split between a hit and a miss. Wait a few days and a larger niche channel has taken the angle.
- Give Gap points only when Heat is 1 or 2. A probe that returns empty, on a wave that was already dead, is not a gap. State both facts.
- One idea may carry two waves when both serve the niche outcome.
- If the idea repeats an angle from 1 of their last 3 videos, write that in the slate. Sequels to a hit may stay. A rerun may not.
- Receipt at 2 requires the cleared number before anyone records, not afterwards. Receipt at 0 does not alone fail a card whose total is still 8 or more while Heat, Gap, and Fit stay above 0. An idea they cannot run is still Receipt 0.

## Gate 2

The niche picks the topic. Packaging is proved in other niches. When the same shape wins on unrelated topics across 2 or more niches, the shape is what won. The outlier might be the idea, the title, or the still. Inside a single niche those three are tangled. Shapes wear out after a niche copies them, so both halves are required: proved somewhere else, and not worn here.

1. Draft 3 to 5 titles on the chosen idea. Each title has to name both the wave and the niche outcome. `title-pair` may polish the final pair after this gate. It does not replace the donor test.
2. For one structure at a time, count donors from 4 to 6 niches, and at least 2 of those niches sit outside their field. Give each structure its own seed file. Set `branch` to the donating niche. Use a 90-day window and depth 0, so you count seeds only. `keep` is the structure pattern. `fit` remains the niche-outcome pattern. Do not merge those two patterns.
3. A structure stays only if its outliers reach 3× or more, from 3 or more channels, across 2 or more donor niches, all inside 90 days, and the home niche has not worn it out.
4. For the still: open the top 5 donor images they paste. Record who or what is the subject (to-camera face, a back-shot, an object, or a UI), the single hero object, how many words are on it, and the contrast. Then brief `thumb-patterns` and `thumb-frame` under `brand.local`. Words on the image name the niche outcome. The hero object is the wave's mark. Keep the words around 2 to 4. Do not use another creator's face unless this video is about that person. Do not generate a face.
5. Promise check. Anything the title or the still claims has to appear in the video. A number is allowed only when Proof has cleared it.

Hand over 2 titles and 2 thumbnail directions for a split, each with its donor outliers (url they gave, niche, ratio) and its niche-saturation check. The owner picks the pair.

Donor fields you may draw seeds from, without borrowing another company's product names. They supply the actual nouns.

| Field | Why it donates | Seed kinds |
|---|---|---|
| Tool tutorials | Fast packaging cycle, overlapping viewers | A tool name, an agent, an automation |
| Entrepreneurship | Business viewers respond to outcome packaging | Business, clients, agency |
| Personal finance | Titles carry stakes, figures, and real-money tests | Money, stocks, invest, budget |
| Experiments | Let-it-run shapes and time boxes show up at full strength | A day-long box, a month-long box, a challenge |
| Productivity | Systems, and "tried it for N days" | Habits, routine, productivity |
| Tech reviews | Head-to-head and verdict shapes | Phone, laptop, camera |
| Fitness | Transformation time boxes | Workout, diet, gym |

| Structure | Skeleton | `packaging` name | Shape the scorer tests |
|---|---|---|---|
| Experiment | I let X run my Y | `experiment` | I, then let, gave, made, hired, or asked |
| Equation | X + Y = Z | `equation` | A plus sign or an equals sign |
| Time box | A result in 7 days | `timebox` | "in" plus a count plus days, hours, weeks, or months. The count may be a digit, "one", or "a" |
| Removed task | No more of a painful task | `removed` | Starts with stop, never, no more, or quit, or contains without |
| Verdict | An honest review | `verdict` | worth it, honest, i tested, or after plus a digit |
| Versus | A vs B | `versus` | vs or versus |
| Plea | Beg the viewer to act | `plea` | contains the letters of begging as a substring |
| Swap | Quit one path and take another | `swap` | i quit, or quitting, or i stopped |

`donors.json` uses `rows` for outside niches and `niche_rows` for the wear test. Optional `structure` drops rows whose `title` misses that shape. A row with no ratio or no age is ignored, not treated as zero.

```json
{
  "structure": "timebox",
  "window_days": 90,
  "niche_window_days": 30,
  "rows": [{ "title": "", "niche": "", "channel": "", "ratio": 4.2, "age_days": 20, "url": "" }],
  "niche_rows": [{ "title": "", "channel": "", "ratio": 1.2, "age_days": 10 }]
}
```

Pass, all three:

1. Proved elsewhere: inside 90 days, at least 3 outliers at 3× or above, at least 3 channels, and at least 2 donor niches.
2. Not worn at home: count the same shape on 3 or 4 niche seeds across 30 days. Worn means 3 or more home-niche channels used it and the median of their ratios sits under 1.5×. That median averages the two central ratios on an even count. A median of 1.5× is not under the line. A missing ratio stays missing.
3. Transfer the skeleton. Preserve word order, any parenthesis, and the slot where a number sits. Put the wave and the niche outcome into those slots. Run the promise check after that.

Read the packaging library before you draft. After each check, record the shape, when you counted it, each donor's url, niche, and ratio, whether the home niche is saturated, and a verdict: validated, worn, or not proven. Below 10 videos of their own, a pattern in their old stills is a hint for the split, not a rule. After the ledger has rows, read those stills for the subject, the object, and the words that showed up on hits and were missing on misses.

## Gate 3

Script minute one as 5 beats. Aim near 160 words. If the take stays clear, you may stretch toward 220. The template band is 150 to 170. Every beat names the picture. Sentence one restates the title's promise. Frame one shows the hero object from the still. Write three alternates of sentence one. The owner reads them aloud and picks. They film that opening as its own take, repeating until it works, and only then film the rest. `long-cut` uses the cut marks. `record-script` waits until gates 1, 2, and 3 have passed.

When they paste studio, the intro figure is the share still watching at 0:30. High means the opening delivered the title and the still. Low means change the title, the still, or the opening. There is no universal benchmark. The comparison, if they paste it, is this channel's previous 10 uploads of similar length. Production notes that get passed around treat the stretch from 0:00 to 1:00 as the minute that matters: prove the promise, then show the work instead of announcing it. On a business channel, use at most 3 short lines, restate the promise, raise curiosity past what the packaging did, and enter point 1.

Before you write, pull transcripts they supply for the last 3 or 4 of their videos and fill this table.

| Video | First 15 seconds | From 0:15 through 1:00 | Lesson |
|---|---|---|---|
| Title and views per day | Spoken line and the picture | When the payoff actually began | Keep this, or cut it |

Count "essentially", "actually", and "basically", and count words in minute one. That is their pace. In most niches, outlier openings land around 200 to 270 words in those 60 seconds. They tend to open with one of four moves: the proof object already visible (list, dashboard, or result), a numbered promise set against a contrast, the belief this video breaks, or the wave named with its date. A disclaimer, or another creator, is a rare way to open.

1. Confirm runs from 0:00 through 0:05, with a cap of 15 words. State the title's promise as an outcome. Do not greet. Do not say their name. The picture is the hero object from the still, and it is live.
2. Stakes runs from 0:05 through 0:15, with a cap of 30 words. Say why this week: the wave, and the angle that is still open. Show a launch page, an outlier, or the mark.
3. Receipt runs from 0:15 through 0:25, with a cap of 25 words. Give one line of their proof, cleared numbers only, plus half a line on who they are. Show that number on their actual display.
4. Loop runs from 0:25 through 0:45, with a cap of 50 words. Name the three parts the viewer will get, and leave one loop open on the part that produced the result. Show a card that has three parts, or show the map.
5. Payoff runs from 0:45 through 1:00, with a cap of 45 words. Begin part 1 immediately. Do not use a hop-in line. Show step 1.

Those caps add to 165. That is a ceiling. Do not pad to reach it.

Rules for the minute:

- Sentence one borrows the title's words. Frame one is the object from the still. The opening belongs to the packaging.
- Show the result, then explain the method.
- Keep benchmarks, history, and theory out until after the first payoff. Park them past 1:00, or delete them.
- Talk about the viewer's outcome and about the owner's run. Other creators stay out of this minute.
- Strip their filler from the script.
- Minute one contains no subscribe ask, no channel intro, and no sponsor.
- Through the first 30 seconds, change the picture every 3 to 5 seconds. A cut can be a screen, a zoom, a card, or b-roll. Mark each one for `long-cut`.
- Near 3:00, in the body of the video, open another loop or show a result they did not see coming.

```text
TITLE
<exact title>
HERO
<object on the still>

[0:00 Confirm | picture: ...]
A.
B.
C.

[0:05 Stakes | picture: ...]
...

[0:15 Receipt | picture: ...]
...

[0:25 Loop | picture: ...]
...

[0:45 Payoff | picture: ...]
...

WORDS <count>  target band 150 to 170
```

`opening` looks for those five time marks, three confirm lines, a beat over its cap, any confirm line over 15 words, a spoken total over 220, a hop-in on the payoff, and a confirm that starts with hi, hey, or hello. The spoken total takes the line marked `PICK` when present, otherwise the first confirm line, then beats 2 through 5. Outside 150 to 170 is a note unless the total exceeds 220. Filler and a missing cut mark inside the first three beats are notes. A note is not a pass on the promise.

Once the video is up, and only after they paste the figures, write the 0:30 share and the 1:00 share into the ledger and set them next to this channel's usual retention. If the script beats that previous 10 at 0:30, keep beat 1 as the template. Otherwise write a new beat 1.

## Ledger

After publish, at the day after, at three days out, at a week out, and at four weeks out, record in `vault/notes/channel-ledger.md`: views, views per day against the channel median they supplied, and, only from a studio paste, the fields a public page does not give you (impressions, click-through, the 0:30 still-watching share, the 1:00 still-watching share, and average view duration). Leave a studio cell blank when they have not pasted it. Do not write zero. Add this video's card and one sentence on the lesson. When a card of 8 or more misses, or a card under 8 hits, revise the rubric in that file and write the reason.

The week-out pace is the calibration column. The other three checkpoints still get their own views-per-day figures. Views per day are views divided by age in days, with age at least 1. If the median they typed is a pace, compare pace with pace. If they typed a median of raw views, label that unit. Do not divide unlike units. When their channel is on the sheet, you may also show the ranker's median of peer view counts, labeled as that.

```text
| When | Title | Card H·G·F·T·R | Week-out views per day, and the median | Click-through | Still watching 0:30 | Still watching 1:00 | Lesson |
| Day after |  |  |  |  |  |  |  |
| Three days out |  |  |  |  |  |  |  |
| Week out |  |  |  |  |  |  |  |
| Four weeks out |  |  |  |  |  |  |  |
```

Impressions and average view duration sit in the lesson cell, or in a line under the row, when pasted.

## Rules

- The owner picks both the idea and the packaging. This skill only proposes, then proves.
- No number without a source. Ratios come from this sheet. Their results come from cleared Proof.
- Never record on a gate that failed. On the next pass, return with the slate instead of filming that idea.
- Raw numbers stay in `vault/sources/<date>-<slug>/` with `origin.md`. The synthesis is `vault/notes/video/<date>-<slug>.md`. Durable lessons live in the ledger and the packaging library. Point the ledger at the research note. This desk does not keep a separate index file for the run.
- Numerals in what you hand them. No em dashes in that copy.
- `week-spread` is the weekly caller when the recording is the trunk and the idea is not chosen yet.

## Failure modes

- 1 viral video is an anecdote.
- Never record on a gate that failed.
- A bigger channel got there first: the gap is closed.
- Many small uploads at baseline: the slot is crowded.
- A wave younger than 7 days: do not trust the ratio alone.
- They cannot use the tool on their plan or where they live: Receipt 0.
- A dead-wave probe that comes back empty is not a gap.
- Fewer than 5 comparable peers: no ratio.
- Off-topic hits and keynotes come off the slate. A foreign outlier on the niche angle does not.
- A rerun of an angle from the last 3 videos is not a sequel.
- A personal-brand idea scored for reach, with no niche outcome, fails Fit.
- A claim on the title or the thumbnail that the video will not show fails the promise check.
- A number that is not cleared fails Receipt 2 and stays off the title.
- An 8-or-higher card that misses, or a card under 8 that hits, means the rubric moves. Write why.
- The rubric is uncalibrated below 3 ledger rows.
- A structure with one niche, or fewer than 3 channels, or under 3×, is not validated.
- A structure whose niche median is under 1.5× across 3 or more channels is worn.
- Beat 1 that greets, names them, or asks for a subscription fails the minute.
- Theory before the first payoff fails the minute.
- A hop-in line on the payoff fails the minute.

## Host client, not used

State these limits so they are not lost, then do not run them. An older scanner priced one search at 100 units against a 10,000 unit day and asked to stay under 30 searches unless the owner wanted more. Its client defaulted to 60 searches and 1,500 calls. A lower-level sampler defaulted to 40 searches, 1,000 calls, and 100 uploads. The dive example used 20 searches, depth 3, and 6 probes. The argument default for the dive budget was 24 searches. Extra call math on that scanner was 60 plus 4 times the queries in a round, and 40 plus 3 times the channels that still needed uploads. It sampled at most 50 channels a round and 30 uploads each in the dive. Listing pages held 50 rows. Channel and video details were requested in batches of 50. It retried transport failures, and statuses 429, 500, 502, 503, and 504, up to 4 times, with a timeout of 30 seconds. A 401 refreshed a token once. The token was kept in memory and treated as stale 60 seconds early. Credentials were an environment key, or a client id, a secret, and a refresh token, never a file. Allowed reads on that client were search, video records, channel records, playlist items, and comment threads. A lock file refused a second writer. A prior success with the same query was skipped. Responses were stored with a timestamp and a 16-character parameter hash. Re-runs looked for a state file so quota was not spent twice. Playlist reads stopped when the next page was missing. After each round it ranked with a match-all title pattern so baselines still saw every eligible upload. Its search order, when it searched, was relevance, view count, or date. None of that runs here. Do not set a key. Do not port that client. Do not build a watch-page url or a still url from an id. If they paste a url, keep their string. A caption file is one they supply, not one a downloader fetches.

## Deliver

1. Which gate ran, whether it passed or failed, and the reason.
2. For gate 1, the slate, the scores, and the evidence. For gate 2, the titles, the still directions, and the donor outliers. For gate 3, the script one beat at a time.
3. The path of the research note, the sheet, and the ledger if it changed.
4. Which gate is next, and the piece the owner still has to supply.
