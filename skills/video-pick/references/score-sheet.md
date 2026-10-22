# Score sheet

`node skills/video-pick/scripts/score-sheet.mjs` scores a sheet the owner already filled. It does not open a socket. This page is what `rank` and `depth` compute. The skill states the sheet size: 6 probes, a search cap of 20, a depth cap of 3, breadth 4, outlier 3, and another yes past 30 searches.

## Sheet

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

## What rank computes

A row is eligible when its unrounded age is at least 1 day, its duration is at least 240 seconds, it is not live (`live` true, or `broadcast` of `live` or `upcoming`), and views are present. Missing views stay missing. Do not write zero in their place.

Candidates also need rounded age at or under 90 days, a title that matches `keep` (default: any title), a language that is blank or begins with lowercase `en`, and a channel id that has an `uploads` list. `keep` does not filter the baseline. Peers stay in the median even when their titles miss `keep`. A set language that does not start with `en` is dropped from candidates only. Blank language stays, flagged `language_unchecked`, and the final pick is still reviewed by hand. Language metadata can be missing or wrong. Peers are not language-filtered, so a non-English upload can still sit in a baseline.

Age is rounded to 2 decimals before the 90-day cut and before peer windows. The recent cohort is other eligible uploads on that channel, rounded age 3 through 90, newest 20 by publish time. The recent median exists only when that list has at least 5. Otherwise `recent_ratio` is blank.

The age band runs from `max(3, age/2)` to `min(90, max(7, age×2))`, using the rounded age. A peer's duration must sit between one third of the target and three times the target. The target itself is excluded. The age-band median exists only when those peers number at least 5. Otherwise `age_band_ratio` is blank. A median of 0 also leaves the ratio blank. Both medians average the two middle values when the count is even.

Sort is age-band ratio descending (blank counts as 0), then views. The ratio the rest of the skill uses is the age-band ratio when it is a positive number, otherwise the recent ratio when that is positive, otherwise 0. Views per day are views divided by `max(rounded age, 1)`, rounded to 1 decimal. Ratios round to 2 decimals. `fit_title` is true when the title matches the niche pattern. There is no fixed marketing-word list. Bands, which are labels and not the pass line: under 2×, 2 to 5×, 5 to 10×, over 10×. The outlier cut is 3×, which sits inside the 2 to 5 band. An outlier on a smaller subscriber count is the stronger proof of a format, when they supplied subscribers. No subscriber cutoff is invented here.

`discovery` is `search` when a search block lists the id, and `library` when the id showed up only on an upload list.

## What depth computes

Round order is the sheet order. For each search, among ranked hits that match `keep`: scored rows are those with a positive used ratio; outliers are scored rows at or above the outlier cut (default 3). The node stores results, scored, outliers, distinct outlier channels, how many of those channels are new, niche-fit outliers (title matches `fit`), yield, up to 12 phrases, and the top 5 outliers (id, title, channel, views, ratio, age in days).

Yield is the sum of `log2(ratio)` across that node's outliers, rounded to 2 decimals. A phrase's weight is the same sum across the outliers whose titles contain it. Phrases that show up on outlier titles from at least 2 channels, highest weight first, are the children. A node's median ratio is the upper middle of the sorted scored ratios (index `n//2`), not the averaged peer median. Saturation means the search added neither a new outlier channel nor a new phrase. Near-duplicate phrases still count as "seen" even when they are not offered as children.

The next count, when depth allows it, comes from the deepest unsaturated node with the highest yield, up to `breadth` children (default 4). Depth starts at 0. Children stop at `max_depth` (default 3). A child is skipped when its core is empty or when that core contains, or is contained by, a query already taken. Priority is `yield × 1000 + phrase weight`. Tree status is `saturated`, `dived` when a later row names it as parent, or `not followed`.

Phrase extraction drops a long stop list (function words, filler, time words, hype) and a generic-noun list (tool, model, business, money, and the rest in the script). A unigram needs a letter and more than 2 characters. A lone version number is not a wave. A bigram is kept when neither token is a stop word and the pair is not two pure integers, so a version number beside a name can still be a wave. `generic_extra` extends the generic list. Heat keeps a phrase only when at least 2 channels carry it, then folds a core that contains or is contained by an earlier core. The report shows up to 25 heat rows: phrase, hot-row count, channel count, upper-middle ratio, fit-hit count, freshest age in days. A hot phrase with little niche fit is a thin angle.

A probe row is a hot phrase plus a niche anchor they already counted. Pick those phrases from the heat table only when the phrase itself does not already match the niche pattern, then pair each one with an anchor. Count 6 probes. A niche match needs the phrase's core inside the title and a `fit` hit. The report counts matches, how many have a baseline, how many of those are outliers, the highest view count, and the best titled row. Few matches and low views on a hot wave: the slot still looks open. Outliers on the probe: the angle is taken.

The report then lists up to 40 search outliers in the window, and up to 15 library outliers ("also popping"): adjacent clicks from the upload lists, not from a search.

## Donor fields and structures

| Field | Why it donates | Seed kinds |
|---|---|---|
| Tool tutorials | Fast packaging cycle | A tool name, an agent, an automation |
| Entrepreneurship | Outcome packaging | Business, clients, agency |
| Personal finance | Stakes and figures | Money, stocks, invest, budget |
| Experiments | Let-it-run shapes and time boxes | A day, a month, a challenge |
| Productivity | Systems, and tried-it-for-N-days | Habits, routine, productivity |
| Tech reviews | Head-to-head and verdicts | Phone, laptop, camera |
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

## Limits that do not run

Do not rebuild a video-host client. An older scanner priced one search at 100 units against a 10,000 unit day and asked to stay under 30 searches unless the owner wanted more. Its client defaulted to 60 searches and 1,500 calls. A lower-level sampler defaulted to 40 searches, 1,000 calls, and 100 uploads. The sheet this desk counts is 20 searches, depth 3, and 6 probes. The argument default for a wider dive budget was 24 searches. Extra call math on that scanner was 60 plus 4 times the queries in a round, and 40 plus 3 times the channels that still needed uploads. It sampled at most 50 channels a round and 30 uploads each in the dive. Listing pages held 50 rows. Channel and video details were requested in batches of 50. It retried transport failures, and statuses 429, 500, 502, 503, and 504, up to 4 times, with a timeout of 30 seconds. A 401 refreshed a token once. The token was kept in memory and treated as stale 60 seconds early. Credentials were an environment key, or a client id, a secret, and a refresh token, never a file. Allowed reads on that client were search, video records, channel records, playlist items, and comment threads. A lock file refused a second writer. A prior success with the same query was skipped. Responses were stored with a timestamp and a 16-character parameter hash. Re-runs looked for a state file so quota was not spent twice. Playlist reads stopped when the next page was missing. After each round it ranked with a match-all title pattern so baselines still saw every eligible upload. Its search order, when it searched, was relevance, view count, or date. None of that runs here.
