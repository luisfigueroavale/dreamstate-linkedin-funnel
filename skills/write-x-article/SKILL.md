---
name: write-x-article
description: "Write or revise a long X article from the owner's letter, framework, notes, or giveaway, with pictures only where they explain a claim. Also write the short post for a new video. Use for that long piece or that video post. A short post is write-x-post. It does not publish."
---

# Write an X article

Write or revise a long X article, or the short post for a new video, from a source the owner already approved. Follow `docs/skill-frame.md`.

## Use when

- Use for that long piece or that video post.

- A short post or a thread is `write-x-post`.

- A week's slate is `plan-x-week`.

- It does not publish.

## Steps

1. Read the source, the Proof page, and the brand, audience, and vault notes (`references/brief.md`).

2. Write the brief before any sentence (`references/brief.md`).

3. Open a supplied URL with `visibility.research.urls_fetch` after `tools_get` (`references/fetch.md`). A paste needs no fetch.

4. Write the title, the opening, and the mechanism (`references/draft.md`).

5. Place a picture only where it explains the next claim (`references/pictures.md`).

6. Write the short post that goes with a new video (`references/video-post.md`).

7. Record a hand edit as a rule in `brand.local/voice.md` (`references/edit.md`).

8. Fetch `social.content.artifact_create` with `tools_get` when they ask to store the video post (`references/hand-back.md`).

9. Save one draft with `social.content.artifact_create` (`references/hand-back.md`). That save does not publish.

10. Check five things, then hand the draft and the picture files to the owner (`references/hand-back.md`).

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 3 | `tools_get` | read | no |
| 3 | `visibility.research.urls_fetch` | live | yes |
| 8 | `tools_get` | read | no |
| 9 | `social.content.artifact_create` | live | yes |

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| - | `social.content.schedule` | never | no |
| - | `social.content.approve` | never | no |
| - | `social.content.article_create` | never | no |
| - | `social.content.article_create_schedule` | never | no |
| - | `social.content.article_delivery_create` | never | no |

## Stop rules

- Follow the skill-frame writing rules.

- Do not invent a thesis.

- Do not shrink this opening to about 210 characters, and do not force the last line to ask.

- A number comes only from the Proof page.

- Do not use a hashtag or generic machine phrasing.

- Do not rebuild the piece from a card or a preview.

- Do not redraw a picture from a small export.

- Do not shorten that URL.

- Writing the rule does not start another rewrite.

- Do not publish.

- Do not schedule.

- Do not call `social.content.schedule` or `social.content.approve`.

- Do not call `social.content.article_create` (no cover field, and it cannot schedule).

- Do not call `social.content.article_create_schedule` (it refuses a date; `scheduled_date` omitted or null is the only form that call accepts).

- Do not call `social.content.article_delivery_create` (two of its shapes publish).

- That save does not publish.

- Do not put the long article in that post artifact.
