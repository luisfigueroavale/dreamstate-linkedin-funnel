---
name: write-linkedin-post
description: "Draft or revise one LinkedIn post from the vault, the brand files, and allowed proof. Use for a single post. It does not schedule or publish."
---
# Write a LinkedIn post

Draft or revise one LinkedIn post from the vault, the brand files, and allowed proof. Follow `docs/skill-frame.md`.

## Use when

- The owner wants one LinkedIn post drafted or revised.

- Not for a schedule or a publish. A day mark belongs to `update-content-board`.

## Steps

1. Read the Proof page, Tone of Voice, `brand.local/voice.md`, the pillar, funnel, concept, and hook notes, and the post file (`references/read.md`).

2. Read the whole source named in the post's `source` field, and treat `audience.local/ideal-follower.md` as the reader (`references/read.md`).

3. Read lines they wrote in `vault/voice/` and `vault/sources/`, and get approval before a personal story that is not already public (`references/read.md`).

4. Make one useful point and name its source, the reader, and the funnel job (`references/draft.md`).

5. Let the material pick the shape and keep it (`references/draft.md`).

6. Write the opening with `write-opening-lines`, and make the body carry it (`references/draft.md`).

7. Remove a line that adds no information, then read the opening, the first line of each paragraph, and the ending as one argument (`references/draft.md`).

8. Verify facts, quotes, dates, and numbers, and make each one match the file it came from once that file is cleared for public use (`references/draft.md`).

9. Write the draft to `vault/posts/<slug>.md` with the fields in `vault/fields.md`, and leave `publish_date` empty (`references/file.md`).

10. Hand them the comment as text (`references/file.md`). Do not publish it.

11. Call `whoami` before a store, and if more than one workspace is listed, stop until they name one (`references/store.md`).

12. Read an existing stored draft with `social.content.artifact_get` and do not create another (`references/store.md`).

13. Store one artifact with `social.content.artifact_create` only when they ask, after `tools_get` (`references/store.md`).

14. Say that nothing was sent (`references/store.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 11 | `whoami` | read | no |
| 12 | `social.content.artifact_get` | read | no |
| 13 | `social.content.artifact_create` | live | no |

Never call: `social.content.schedule`.

## Stop rules

- Follow the skill-frame writing rules.

- A blank follower file or a blank `brand.local/identity.md` stops the work.

- Do not invent a milestone, an anecdote, a customer quote, a revenue figure, or a line about what most people do.

- Do not open a second file for the same post, and do not start a second board.

- Do not publish it.

- If more than one workspace is listed, stop until they name one.

- Saving a draft does not schedule.

- Do not call `social.content.schedule`.

- Say that nothing was sent.
