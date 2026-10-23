# Comments

Comments on the owner's post come from `social.comments.queue_list`.

Trust an empty queue only after `visibility.linkedin.comments.refresh` (`delivery_id`).

Articles and newsletters return 422.

`visibility.linkedin_post_notifications_list` takes `delivery_id` from `social.content.article_deliveries_list`, `limit` max 100, no paging.

Preview with `social.comments.reply`.

`social.comments.approve` after yes on that text: `action_id`, a 64-hex `content_hash`, and `approved: true`.

If the effect is unknown, read the run and do not resend.
