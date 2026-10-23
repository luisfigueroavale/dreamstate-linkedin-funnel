# One pass

Unless a pass only fills missing public lines, it covers about 150 comments, 12 file messages, 6 connect-first lines, and 12 sent-lines.

A busy post can lock those reads for many hours, and then nothing goes out, so once it is busy stretch toward thirty minutes, not fifteen. Track progress on the worksheet and in `social.outreach.keyword_dm_sends.list` (`artifact_id`), and do not re-read comments while delivery is live.

`social.comments.queue_list` is paged, so use its cursor and do not scrape in a tight loop. `social.linkedin_posts.comments_list` needs `account_id` and `post_id`. It is a free external read, and a dry_run runs live. When recent and relevant sorts both exist, read both and merge on comment id, because the newest can be missing from recent.

If relevant fails, keep recent. If the post lists more people than the worksheet, compare the sorts before calling it a miss. Jobs share that gap, a loser looks like an uncertain write with nothing sent, and you do not set that clock.

On a crowded post, send uncertain file messages, then first-degree people still missing the file, including anyone who connected after the connect-first line, then public lines. Break a tie by who was checked least recently, and put public lines last so replies do not spend the cap while the file sits for days.

Read reply threads at the end, with a cap of three. A pass that dies inside one pauses those reads for three hours, and a rate limit pauses them for hours, because the thread endpoint can limit while the comment list still answers.

Skip a pass more than nine minutes after its slot. Try an unconfirmed write once more after fifteen minutes, then it goes to review.
