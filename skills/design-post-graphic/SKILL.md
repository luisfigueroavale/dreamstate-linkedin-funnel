---
name: design-post-graphic
description: "Build one portrait, carousel slide, or thumbnail as HTML and CSS, with motion in a JavaScript timeline. Use when a piece needs a picture. It does not publish."
---

# Design a post graphic

Build one portrait, carousel slide, or thumbnail as HTML and CSS, with motion in a JavaScript timeline. Follow `docs/skill-frame.md`.

## Use when

- Use when a piece needs a picture: a portrait, a carousel slide, or a thumbnail.

- It does not publish.

## Steps

1. Read the brief, the post, and `docs/picture-rules.md` (`references/brief.md`).

2. Stop if a required file is missing or blank (`references/brief.md`).

3. Write three HTML-comment notes before drawing (`references/brief.md`).

4. Build the plates from the post and the brief (`references/plates.md`).

5. Take sizes from `docs/picture-rules.md` (`references/sizes.md`).

6. Import `brand/tokens.css` and use owner values in `brand.local/tokens.css` (`references/tokens.md`).

7. Lay out the frame in HTML and CSS (`references/layout.md`).

8. Write the portrait, slide, or thumbnail file (`references/files.md`).

9. Drive motion with `DeskTimeline` (`references/motion.md`). Capture calls `__seek`.

10. Write stills with `npm run still -- <html>` (`references/render.md`).

11. Walk `__seek` with `npm run capture -- <html>` (`references/render.md`).

12. Call `whoami` before writing (`references/render.md`).

13. Store with `social.visuals.source_create` (`references/render.md`).

14. Fetch with `social.visuals.render_preview` (`references/render.md`).

15. Fetch with `social.visuals.render_start` (`references/render.md`).

16. Fetch with `social.visuals.render_get` (`references/render.md`).

17. Read with `social.visuals.file_get` and `social.visuals.download_url` (`references/render.md`).

18. Inspect the 1080px PNG, the 390px view, and the thumbnail at 1280×720 (`references/inspect.md`).

19. Run `brand/taste.md` before the owner sees it (`references/inspect.md`).

20. State what you reached and hand back the HTML (`references/inspect.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 12 | `whoami` | read | no |
| 13 | `social.visuals.source_create` | live | no |
| 14 | `social.visuals.render_preview` | live | no |
| 15 | `social.visuals.render_start` | live | no |
| 16 | `social.visuals.render_get` | read | no |
| 17 | `social.visuals.file_get` | read | no |
| 17 | `social.visuals.download_url` | read | no |


## Stop rules

- If a required file is missing or blank, stop and ask.

- Do not guess a color, a font, or a claim.

- The template has no approved kit.

- Headline text uses `--headline-gradient` when that token is set, and `--color-accent` when it is not.

- `--color-accent-2` is the second accent an owner can name inside the gradient.

- Leave both unset in the committed template.

- Do not hand the preview stand-in to the owner.

- A choice made here stays in this file; it is not a new brand rule.

- Do not add logo, signature, palette, decorative footer, or a call to action the brief did not supply.

- Add no figure the source lacks.

- Skip a screenshot you lack.

- Smoother wording is a rewrite. Leave it out.

- Do not generate faces.

- Ban third-party logos, photos, and illustrations.

- Do not fetch fonts into the repo.

- Do not invent a deadline or how many already joined.

- CSS does not animate, and it has no transitions or keyframes.

- GIF and MP4 stay local.

- A prompt is not a picture.

- A flattened raster is not the source.

- Do not redraw from PNG.

- Neither markup nor a script exit of 0 is a review.

- Do not call the file rendered or inspected when you cannot see the pixels.

- It does not edit shared brand files.

- Do not publish.
