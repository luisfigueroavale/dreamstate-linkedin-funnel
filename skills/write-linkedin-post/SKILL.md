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

2. The reader is `audience.local/ideal-follower.md` (`references/read.md`).

3. Get (`references/read.md`).

4. Make (`references/draft.md`).

5. Let (`references/draft.md`).

6. The body has to carry it (`references/draft.md`).

7. Remove (`references/draft.md`).

8. Each one has to match the file it came from, and that file has to be cleared for public use (`references/draft.md`).

9. Write (`references/file.md`).

10. Hand them the comment as text (`references/file.md`). Do not publish it.

11. Call `whoami` before a store (`references/store.md`).

12. Read an existing stored draft with `social.content.artifact_get` and do not create another (`references/store.md`).

13. Store with `social.content.artifact_create` (`references/store.md`).

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
