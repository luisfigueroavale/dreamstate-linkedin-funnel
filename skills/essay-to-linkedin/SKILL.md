---
name: essay-to-linkedin
description: "Adapt a finished essay into a LinkedIn article draft and a short share post, keeping the claims. Use after x-essay. It does not upload or publish."
---

Follow `docs/skill-frame.md`.

Rebuild the cover at 16:9 for the article. Keep the portrait for the feed. Switch the link to `utm_source=linkedin` and the same weekly campaign. The share post points at the article and puts the URL in the comment under the post. Call `social.content.article_enabled_get` first (no params). If the flag is off, the other article calls 404. Stop. `social.content.article_create` has no cover field. To carry a body, use `article_create_schedule` with `scheduled_date` omitted or null (a date is refused), then `article_update` (`article_id`, `expected_revision`, `title`, and `body_json`; title and body are both required on every call), then `article_delivery_create` only after yes, because two of its shapes publish. LinkedIn `publish_directly: true` is rejected.
