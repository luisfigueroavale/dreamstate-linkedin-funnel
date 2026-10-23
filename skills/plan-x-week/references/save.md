# Save

After they pick, draft those posts. The single today post is saved the same way. Save each one as `vault/posts/<slug>.md` using `vault/fields.md`, and add the line on `vault/board.md`.

`publish_date` stays empty. Put the same text in chat.

When they ask to store a pick, `tools_get` `social.content.artifact_create` and follow `docs/content-desk.md`. One idea is one artifact.

`social.content.plan` sets the day mark and is not a publish. Set that mark only when they asked for it.

Required `expected_revision`, `scheduled_at`, `artifact_id`.

Dispatch still needs `social.content.approve` on that version.

After they accept a draft, add the concept line the way `search-vault` does.
