# One post and one comment

For a short post link, resolve the post id, then call `social.linkedin_posts.get` (`account_id`, `post_id`). The cost is 0. It calls the network and has no dry_run. Use the returned id. For one comment, use `social.comments.reply` plus the drafted private message, with a yes on both texts.

`social.comments.approve` posts the public reply (`action_id`, `content_hash`, `approved: true`). A preview pulls the live comment list and stores no row. It plans each file message and public line. Read that plan before any pass that can send.

A dry run that stubs the network and shows zero comments only proves the loader ran. Do not set a credit ceiling that finishes the file message and drops the public line, unless those lines are paused on purpose.

Finished people stay done.

For acknowledgement-only posts missing public lines for people whose file is verified, send no new file message, send no new connect-first line, scan about a hundred comments, and allow up to about forty sent-lines. A request backfill names the people, at most a hundred, and cannot share a pass with acknowledgement-only.

Public lines may stay off while comment writes time out. File messages continue. Turn lines on only with a yes, then run once for lines that never posted.
