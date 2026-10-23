---
name: triage-inbox
description: "List inbox threads that need a person and hand them to a reply draft. Use for triage. It does not send."
---
# Triage the inbox

List inbox threads that need a person and hand them to a reply draft. Follow `docs/skill-frame.md`.

## Use when

- Use this for triage of threads that are already open.

- The set is email, LinkedIn, WhatsApp, and one email that is not on a cadence.

- A new LinkedIn conversation, and any outreach program, goes to `draft-warm-followups`.

- It does not send.

## Steps

1. Ids are in `docs/tool-map.md` (`references/scope.md`).

2. Call (`references/scope.md`).

3. List with `unibox.inbox.unified_list` (`references/list.md`).

4. Read (`references/read.md`).

5. dry_run, then live with `quote_hash`, `max_credits`, and an `idempotency_key` (`references/read.md`).

6. Resolve with `senders.linkedin_accounts.list` and `senders.social_accounts.list` (`references/linkedin.md`).

7. Hand (`references/reply.md`).

8. Show (`references/changes.md`).

9. On a timeout, read the returned message and the run with `runs_get` (`references/changes.md`).

10. Hand (`references/changes.md`).

11. Report (`references/report.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 3 | `unibox.inbox.unified_list` | read | no |
| 5 | `unibox.inbox.analyze` | dry_run | no |
| 5 | `unibox.inbox.analyze` | live | yes |
| 6 | `senders.linkedin_accounts.list` | read | no |
| 6 | `senders.social_accounts.list` | read | no |
| 9 | `runs_get` | read | no |

Never call: `senders.identities.inbox_scope_get`.

## Stop rules

- It does not send.

- A send needs the owner's yes on that text.

- Do not call `senders.identities.inbox_scope_get`.

- An empty result is not an empty LinkedIn inbox.

- Do not read that empty allowlist as the whole inbox.

- Do not widen what that account ingests just to locate extra threads.

- Spend that credit on one conversation.

- Do not invent a capability id for a label edit, an archive, or a bulk change.

- A timeout does not prove the message was never delivered.

- On an error, do not file feedback and do not copy the conversation or its transcript anywhere else.
