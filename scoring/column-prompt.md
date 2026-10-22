# Column prompts

Paste one prompt into each `column.ai_fit_score` column after `tools_get` `tables.columns.add`. Replace every blank from the Ideal Customer page or from `audience.local/ideal-follower.md`. If either source is empty, do not add the column.

Missing data is unsure. Do not tell the column to score 0 for a field you did not find. A Required fail needs evidence in the row.

## Company

```
Score the company from 0 to 100.

Required:
- (paste required facts from the Ideal Customer page)

Nice:
- (paste the rest)

Exclusions:
- (paste exclusions)

If a Required fact is contradicted by the row, score 0 and name the cell.
If a Required fact is absent, say unsure. Do not use 0 for absent.
Do not treat a like, a comment, or a keyword as evidence.
```

## Person

```
Score the person from 0 to 100.

Reader:
- (one sentence from audience.local/ideal-follower.md)

Required:
- (paste required facts from that file)

Qualifying test, each question required or not as the file marks it:
- (paste the owner's questions, not the blank template)

If a required question is no and the row shows why, score 0 and quote the cell.
If a required question cannot be answered from the row, say unsure. Do not use 0.
A like, a comment, or a keyword does not answer a question.
```

Run the columns with `tables.columns.run` on one row first. Dry run, show the quote, wait.
