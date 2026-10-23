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

1. Stay on the account and the thread the owner named (`references/scope.md`). Ids are in `docs/tool-map.md`.

2. Call `tools_get` before `tools_run` (`references/scope.md`). The fetched schema wins.

3. List threads with `unibox.inbox.unified_list` (`references/list.md`).

4. Read the whole thread before a classification or a draft (`references/read.md`).

5. Review one thread with `unibox.inbox.analyze` (`references/read.md`). dry_run, then live with `quote_hash`, `max_credits`, and an `idempotency_key`.

6. Resolve accounts with `senders.linkedin_accounts.list` and `senders.social_accounts.list` (`references/linkedin.md`).

7. Hand one thread to `draft-thread-reply` (`references/reply.md`). Do not send.

8. Show the real count and the scope before a label edit, an archive, or a bulk change (`references/changes.md`).

9. On a timeout, read the returned message and the run with `runs_get` (`references/changes.md`).

10. Hand a public comment on a post to `draft-linkedin-comments` (`references/changes.md`).

11. Report only the slice you opened (`references/report.md`).

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 2 | `tools_get` | read | no |
| 2 | `tools_run` | live | no |
| 3 | `unibox.inbox.unified_list` | live | no |
| 5 | `unibox.inbox.analyze` | dry_run | no |
| 5 | `unibox.inbox.analyze` | live | yes |
| 6 | `senders.linkedin_accounts.list` | live | no |
| 6 | `senders.social_accounts.list` | live | no |
| 9 | `runs_get` | live | no |
| - | `senders.identities.inbox_scope_get` | never | no |

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
