---
name: inbox-desk
description: "List inbox threads that need a person and hand them to a reply draft. Use for triage. It does not send."
---

Follow `docs/skill-frame.md`.

`unibox.inbox.unified_list`, tab `needs_action` when that value is still in the schema. Resolve who can receive with `senders.linkedin_accounts.list` and `senders.social_accounts.list`. Do not call `senders.identities.inbox_scope_get`. That id is an email mailbox allowlist, and an empty result is not an empty LinkedIn inbox. `unibox.inbox.analyze` is 1 credit on the verified price list; its arguments are to-check until `tools_get`. Dry_run only if that schema allows it. Hand one thread to `thread-reply`. Do not send.
