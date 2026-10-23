# Rubric

Score only with both rubrics present.

If Ideal Customer is empty, stop and run `collect-owner-context`.

If `audience.local/ideal-follower.md` is missing or blank, stop.

Company rubric is the buyer page and named exclusions.

Person rubric is the follower file, including the qualifying test.

Add two `column.ai_fit_score` columns with `tables.columns.add`, company and person, each 0 to 100.

Reuse an existing pair.

`tools_search` then `tools_get` before a change.

Bind only keys the sheet has.

A later lookup is `visibility.research.web_search` (`query`) or `visibility.research.urls_fetch` (`urls`).

See `docs/calls.md`.

A required no with evidence fails that side.

A no without evidence holds.

An unmarked question does not fail the row.

A like, a comment, or a keyword is not an answer.

Missing headcount, remit, or intent stays unknown.

A company name is not a domain match.

Exclude teammates, customers, and open threads when that column exists.

A company fail stops the row even when the person passes.

Someone who asked for the file goes to `send-lead-magnet`.
