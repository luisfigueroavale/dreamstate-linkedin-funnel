# Watching engagers

Two different tools. Do not swap them.

## People on one post

`visibility.linkedin.engagement_harvest` collects reactions and commenters for one LinkedIn post into a worksheet you name. Dry run, show the quote, wait for a yes, then live. Read progress with `visibility.linkedin.engagement_status` and people with `visibility.linkedin.engagement_engagers`. The harvest does not send messages and does not change the post.

Run it on posts you published, inside a window you name. Do not page the whole history because a column is empty.

## Person profiles, on a schedule

`tables.profile_watcher.preview` shows up to 10 public person-profile URLs and returns `preview_hash`. It does not contact LinkedIn. `tables.profile_watcher.create` stores a daily watcher. It requires that hash and `approved: true`. You say yes before the agent sets `approved`. The create call itself does not write rows. Later runs can spend up to `watcher_max_credits` (1 to 1000 on the fetched schema). Changing a URL or the cap means a new preview. Resume uses `tables.profile_watcher.resume` and the same yes.

This watcher is for profiles you already decided to track. It is not a scrape of everyone who liked a post.

## After the rows land

Score them with the fit gate before anyone writes a message. The person side uses the qualifying test in `audience.local/ideal-follower.md`. If that file is missing or blank, stop. Exclude your own team, current customers, and open threads with a column condition when the worksheet has those fields. If it does not, say the exclusion could not be applied. Do not delete the rows to hide them.

`tables.auto_run.set` makes new rows run the score columns inside a credit cap. That is a standing spend. It waits for your yes.

`knowledge.engagement.people_engaged_n_times` counts email and meetings. Do not use it as a LinkedIn engager list.

`tables.x_post_engagers.run` is to-check. Team docs say it calls X even at 0 credits. It is not this LinkedIn harvest. Do not call it to avoid the LinkedIn one.
