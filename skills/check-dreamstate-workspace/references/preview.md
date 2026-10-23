# Preview

Preview public person-profile URLs given by the owner. `tools_get` `tables.profile_watcher.preview` before `tools_run`.

Use at most 10 URLs, and include their profile if it was supplied. Another URL only if Ideal Customer and `audience.local/ideal-follower.md` name that audience.

Stop if that file is missing or `Status: blank`, or Ideal Customer is empty.

It is free. It returns `preview_hash`. It does no network call, collect, schedule, create, or LinkedIn send.

Report its cadence, lookback, and coverage. Record `watcher_max_credits` for one cycle. If the URL or the cap changes, run a new preview and keep the new hash.
