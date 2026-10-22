# Fit rubric

Two scores. Company, then person. A like is neither.

Read `audience/AGENTS.md` before you score. The company rubric comes from the Ideal Customer page. The person rubric comes from the filled `audience.local/ideal-follower.md`. If that file is missing or `Status: blank`, stop. The questions in `audience/ideal-follower.md` are templates, not answers.

## Scores

Each side is a `column.ai_fit_score` column. The cell's number is `fit_score.score`, from 0 to 100. Do not ask `column.ai` for the integer.

A Required fail that the row's evidence supports scores 0 on that side. Missing evidence stays unsure. Unsure is not 0.

The example cases in `cases.json` treat 70 as a pass line. That number is only for those invented rows. Write your own line on the Ideal Customer page.

## Qualifying test

The test is the yes/no list in the filled follower file. It applies to the person only.

| What you have | What it means |
|---|---|
| Required yes, and a line of evidence on the row | That question passes |
| Required no, and a line of evidence on the row | The person fails |
| Required no, and no evidence | Hold. A guess is not a no |
| Required unknown, or a blank answer | Hold. Unknown is not a yes |
| Not required | Note only. It does not fail the row |
| A like, a comment, or a keyword | Routing. It does not answer the test |

## Decision

| Company | Person | Decision |
|---|---|---|
| pass | pass, and every required question is yes with evidence | pass |
| fail, with evidence | any | stop |
| any | fail, with evidence, including a required no | stop |
| unsure, and the other side is not a fail | | hold |

Hold is not enrolled and not sent. Stop is not enrolled and not sent.

`npm run fit` checks `cases.json`. It does not call Dreamstate.
