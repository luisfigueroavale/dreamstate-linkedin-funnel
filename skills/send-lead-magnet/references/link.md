# Link

The shared link and delivery procedure is in `docs/lead-magnet.md`. The message body carries the full destination URL plus UTM and never `short_url`. Use list-then-replace. `dm_enabled` stays false until the owner says yes on that exact text. Keep keywords in the range 1-20.

Call `social.content.tracking_links_lookup` (`urls`) first. It is a free read. A dry_run runs live, so say it was a read. Then call `social.content.tracking_link_create` (`destination_url` required; optional `artifact_id`, `platform`, `custom_slug`, `og`, `utm`) and `social.content.tracking_link_get`. Stop when that exact address is already in the private thread, so an earlier giveaway address skips them.

Prefer a same-page fragment, or UTM source `linkedin`, campaign the post slug, content `dm`.
