# Qualify

Qualify from Ideal Customer and the follower file. Read `audience/AGENTS.md` first. Company and person apart, 0 to 100, on the pass line and exclusions.

Do not call these, and keep scope and cost apart: `tables.columns.add` (definition only; `binding_spec.definition_id` `column.ai_fit_score`; company and person columns; reuse if present), `tables.columns.update` (`column_id`, `expected_updated_at`), `tables.columns.run` (`max_rows` in params), `tables.table_runs.preview_cost`, `tables.auto_run.set` (`max_credits_per_run`; own yes; apart from the watcher), `tables.executables.save` (`binding_spec`, `label`, `table_id`; live `approved: true`).

`column.ai` does not exist; use `column.ai_fit_score` as `binding_spec.definition_id`. Bind only keys a worksheet read returned.

Do not call `visibility.research.web_search` or `visibility.research.urls_fetch` to fill a blank.
