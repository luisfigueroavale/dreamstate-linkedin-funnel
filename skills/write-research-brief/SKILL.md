---
name: write-research-brief
description: "Build an evidence brief for a content or go-to-market question from primary sources, with implications and open questions. Use before a claim-heavy draft. It does not invent findings."
---
# Write a research brief

Build an evidence brief from primary sources, with implications and open questions. Follow `docs/skill-frame.md`.

## Use when
- The owner needs a brief before a claim-heavy draft, for a content question or a go-to-market question.

- Not for inventing findings.

- Owner facts go through `collect-owner-context` only.

## Steps
1. A blank reader file stops the brief (`references/question.md`).

2. Use the cheapest source first (`references/sources.md`).

3. Do not search to relocate it (`references/sources.md`).

4. Call (`references/calls.md`).

5. Call (`references/calls.md`).

6. Use with `visibility.research.web_search` (`references/calls.md`).

7. Use with `visibility.research.urls_fetch` (`references/calls.md`).

8. Do not attach or run `source.account_posts_linkedin_profile` or `source.linkedin_posts_search` (`references/calls.md`).

9. Write each evidence row (`references/rows.md`). Cite a vault file, a named page, or this call's figure, with the capability id.

10. If that path is taken, add a slug (`references/file.md`).

11. Record (`references/file.md`).

12. Every (`references/file.md`).

13. Send owner facts through `collect-owner-context` only (`references/file.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 4 | `whoami` | read | no |
| 6 | `visibility.research.web_search` | live | yes |
| 7 | `visibility.research.urls_fetch` | live | yes |

Never call: `source.account_posts_linkedin_profile`, `source.linkedin_posts_search`.

## Stop rules
- Follow the skill-frame writing rules.

- A blank reader file stops the brief.

- Keep the post audience and Ideal Customer apart.

- Do not search to relocate a URL you already have.

- Set `approved: true` only if the contract requires it, and only after a yes.

- A refused live call stops you.

- Do not guess a host.

- A cut-off tail is partial, not empty.

- A source outside the time window is not the present.

- `source.account_posts_linkedin_profile` and `source.linkedin_posts_search` are definition ids, not `tools_run` ids.

- `tools_get` is not found for both.

- Do not attach or run a feed.

- A suggestion or a promo line is not an owner fact.

- Do not write zero for a missing number.

- Owner facts go through `collect-owner-context` only.

- It does not invent findings.
