# Thread

## Thread

Read threads only for the picks, with `social.linkedin_posts.comments_list`. A post with 0 comments is not read. Six comments is enough to see the pile. Do not repeat a point the thread already made. Record whether the post's author answers people, and whether the owner is already in it. A missing id is skipped.

Truncate what you hold in the run file; the draft does not quote the thread back.

Before the page, refresh every pick with `social.linkedin_posts.get`. Replace counts, text, and media from that read. Drop the card on `not_found`, on `404`, or when the post comes back empty. Any other failed read keeps the item as fetched.
