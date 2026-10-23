# Calls

`whoami` before the first write. `tools_get` before every `tools_run`. The schema just fetched wins.

Call `social.content.article_enabled_get` first. It takes no params. If the flag is off, stop. The other article calls 404.

`social.content.article_create` has no cover field. It is not how a body is carried. Do not send a cover on it.

Carry a body only after the owner asks for a saved draft. Use `social.content.article_create_schedule` with `scheduled_date` omitted or null.

A date is refused. That call drafts the article plus an artifact. It does not publish. Copy `article_id` and `expected_revision` from the response that returned them.

Then `social.content.article_update` with `article_id`, `expected_revision`, `title`, and `body_json`. Send title and body on every call, with `body_json` in the shape that schema shows.

Read the stored title and body back from that response, or from the get that schema names. Do not invent a capability id.

`social.content.article_delivery_create` waits for a yes on that article, because two of its shapes publish. LinkedIn `publish_directly: true` is rejected. Do not send that flag.

The share post is a separate object from the article. It stays in the folder until the owner asks to store that post.

The store call is `social.content.artifact_create`. Do not schedule the post from this skill. The portrait remains the feed image.

Do not upload the cover, the figures, or the portrait, and do not publish the article, the share post, or the comment, unless the owner has said yes to that exact item.

A yes on other wording, other media, or another day is a new yes.

`social.posts.comment_publish` is 2 credits. dry_run previews; live repeats `quote_hash` with `max_credits` 2.

Required `channel` `"linkedin"`, `account_id`, `target_post_urn`, `body`, and `consequence` `"public_comment"`.

It runs only from an approved durable run step, or the call returns 409 `durable_run_step_required`. The owner says yes on that exact body. It is not a way to fill a draft.

`social.engagement.comment` can preview when `approved` is omitted. A live comment also needs `approved: true` and an `idempotency_key`.

Neither runs before a yes on that comment text.
