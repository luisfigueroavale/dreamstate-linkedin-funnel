# Account

`senders.social_accounts.list` with `platform` `youtube` supplies `account_id` (the account `id`). `social.channels_list` is the channel row.

Both reads are live. Neither accepts dry_run. Re-read the channel row before a publish.

YouTube supports write, schedule, publish, and analytics. The publish route is `youtube_data_api_v3`. Analytics come from `youtube_analytics`.

The same list includes Threads, TikTok, Instagram, and Facebook. Reddit is draft-only for schedule and publish, so this skill does not schedule or publish Reddit.
