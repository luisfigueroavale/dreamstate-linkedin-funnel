# Fit gate

Company fit and person fit are separate. A like is not either score. The local contract is [scoring/output.schema.json](../scoring/output.schema.json). The worked rules and the invented cases are in [scoring/](../scoring/).

Read [audience/AGENTS.md](../audience/AGENTS.md) before a score. If `audience.local/ideal-follower.md` is missing or still says `Status: blank`, stop. Do not score from the blank template.

## What the columns are

Add two `column.ai_fit_score` columns with `tables.columns.add`. Adding a column is free and does not run it. One rubric is the company. One is the person. Do not fold them into a single `column.ai` that returns an integer.

Each rubric lists Required and Nice to have. A Required fail that the row's evidence supports scores 0 on that side. Missing evidence stays unsure. The plugin's own line is: missing data is unsure, and a Required fail scores 0. Do not tell the column to use 0 for "we did not look".

Write the company rubric from Ideal Customer and from exclusions you have actually named. If Ideal Customer is empty, stop and run `context-intake`. Do not invent a market to make the column runnable.

Write the person rubric from the filled follower file. Include that file's qualifying test. The three questions in `audience/ideal-follower.md` are templates. They are not answers. Use the questions the owner kept, cut, or wrote, and only the Required marks they set.

- A required question answered no, with evidence on the row, fails the person.
- A required question you cannot answer from the row is a hold. Unknown is not a no, and it is not a yes.
- A no with no evidence is a hold. Do not fail a row on a guess.
- A question the owner did not mark required can sit in the note. It does not fail the row by itself.
- A like, a comment, or a keyword does not answer the test.

## How a decision is chosen

| Company | Person | Decision |
|---|---|---|
| pass | pass | pass |
| fail (evidence) | any | stop |
| any | fail (evidence) | stop |
| unsure, and the other is not fail | | hold |
| pass | unsure | hold |

Hold means you do not enroll and you do not send. You may fetch the missing field later, under the paid rule, or you may leave the row.

Engagement, a keyword comment, and an open thread are routing facts. They do not raise either score. Record them beside the decision.

## Run

1. `tables.table_runs.preview_cost` if you want a price before the column exists. Otherwise dry-run `tables.columns.run` on one row.
2. Show credits and `quote_hash`. Wait.
3. Live, with `max_rows` inside params, on a sample you can read (start at one row, then a handful).
4. Read the cells. Compare them to [scoring/cases.json](../scoring/cases.json) by running `npm run fit`. If the column's reasons would fail those cases, change the rubric text and dry-run again. Do not widen the audience to hide a bad rubric.
5. Scale only the rows the run conditions admit, in batches, after you accept the sample.

`npm run fit` checks the local cases. It does not call Dreamstate and it does not prove a live column is right. You still read real rows.

## Enrollment line

Enroll from the numeric `fit_score.score` on both columns, plus your pass threshold, only after you have accepted the copy and the qualifying test is yes on every required question, with evidence. The decision `hold` or `stop` stays out of the sequence. Do not draft a warm note for those rows. Thresholds are yours. The example rubric uses 70 as a pass line for its invented cases. That number is not a default for your market. Write your own on the Ideal Customer page.
