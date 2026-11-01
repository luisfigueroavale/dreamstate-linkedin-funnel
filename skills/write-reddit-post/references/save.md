# Save

A draft holds: title, body, category id, shape, subreddit, the rules card link, the promotion tier used, and the optional first comment.

Call `tools_get social.content.artifact_create` and check that reddit is a writable channel today. If it is, create the draft live (it only drafts). If not, save to `drafts/reddit/<date>-<subreddit>.md`.

Then hand the draft to `review-reddit-post`.
