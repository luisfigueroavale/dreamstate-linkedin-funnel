# Analytics

`visibility.analytics_query` reads a stored snapshot and does not refresh it.

`visibility.analytics_refresh` needs `platform`, `account_id` from `senders.social_accounts.list`, and `metric_scope` `account`, `post`, or `audience`.

Post scope needs `provider_post_id`.

Carry source, post, and event ids forward.

A repeating monitor is `workflow.workflows.activate`.

No dry_run.

smoke_test, then live.

Required `workflow_id` and `expected_version_id` (the published version, not the draft).

`max_credits` is optional, and required on live when an autonomous trigger exists.

