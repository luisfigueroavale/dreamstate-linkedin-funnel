# Gate 1

Gate 1 compares the idea with the channel median they supply. The owner picks from up to 3 scored ideas.

## 1. Seeds

Seeds. 6 to 10 in `vault/sources/<date>-<slug>/seeds.json`, each `{ "query", "branch" }`.

Mix waves from the last 30 days with 2 or 3 niche-outcome queries. They type the queries. You do not search a host.

## 2. Counts

They count results into the sheet: views, publish time, duration, channel, and that channel's other uploads. Run `depth` with `--days 30`.

## 3. Read the tree

Read `depth.md`. The tree shows where the count got hot. The heat table shows phrases that are outliers on many channels. Probes show the gap.

The library block ("also popping") is waves the seeds never named.

Follow a new wave with a second sheet, 4 to 6 seeds, `--max-depth 0`, and one query that pairs the wave with the niche outcome.

## 4. Strongest outliers

For the 5 strongest outliers, read the title, a still they paste, and a transcript of minute one if they have it. Remove off-topic hits, keynotes, and the wrong language.

A foreign upload on the niche angle is demand, not the cut they will copy. Date the wave from its source. Write every niche upload on that wave, with its ratio.

Many small uploads near baseline means the slot is crowded. An outlier from a larger niche channel means the slot is closed.

Under a week of age, also read views per day, because older uploads dominate the median. If they cannot run the tool on their plan or where they live, Receipt is 0.

## 5. Pass

A pass needs 8 or more points out of 10, with Heat, Gap, and Fit all above 0.

## 6. Slate

Slate up to 3 ideas, strongest first, in `vault/notes/video/<date>-<slug>.md`. One line names the wave, then the niche outcome.

Under it, each criterion gets its evidence: up to 3 outlier urls with ratios, the probe, and the date the wave began. Name the receipt.

Note overlap with the previous 3 videos. If fewer than 3 pass, say so. The owner picks.

```text
Idea: <wave> applied to <niche outcome>
Scores: Heat 2, Gap 2, Fit 2, Timing 1, Receipt 1, total 8, pass
Heat evidence: url, ratio, channel, age (up to 3)
Gap evidence: probe, or the niche list with count, best ratio, and who
Timing evidence: wave began <date> via <source>; planned live date; day gap
Receipt evidence: what is on screen, and which cleared proof line
Overlap evidence: none, or the recent video it repeats
```
