---
name: design-video-thumbnail
description: "Compose the thumbnail in HTML at the thumb size so the title and the picture make the same promise. Use after the title is chosen. It does not generate a face."
---
# Design a video thumbnail

Compose the thumbnail in HTML at the thumb size so the title and the picture make the same promise. Follow `docs/skill-frame.md`.

## Use when

- Use this after the title is chosen.

- The title and the picture make the same promise.

- It does not generate a face, and it does not upload or publish.

## Steps

1. Read the video, the reader, the title, and `brand.local`, and stop if a required brand file is blank (`references/idea.md`).

2. Settle on one concrete idea the video can fulfill (`references/idea.md`).

3. Use a face or a screenshot only when that file was supplied (`references/idea.md`).

4. Keep the composition that stays legible when the frame is small (`references/words.md`).

5. Add on-image words for a fact the title left unsaid, two to four words (`references/words.md`).

6. Start a large name from `pictures/frames/metal-title.css`, class `metal-title` (`references/metal.md`). The fill is `--headline-gradient` when that token is set, and `--color-accent` when it is not, and `--color-accent-2` is the second accent an owner can name inside the gradient.

7. Add `metal-title--soft` on the same element when one shadow is the better fit (`references/metal.md`).

8. Copy `pictures/frames/thumb.html` and import `brand/tokens.css` (`references/build.md`).

9. Load `pictures/timeline.js`, register a `DeskTimeline`, and install it so the page exposes `__seek`, because capture calls `__seek` (`references/build.md`).

10. Inspect 1280×720 and 320×180 (`references/inspect.md`).

11. Return the export, the HTML source, the real dimensions, and any upload limit you did not verify (`references/inspect.md`).
## Dreamstate tools

None. Local files only.

## Stop rules

- Stop if a required brand file is blank.

- Do not generate a face.

- Do not invent a result screen or an endorsement.

- Do not stage a reaction the footage does not show.

- Leave both unset in the committed template.

- It does not stand in for a hook style the owner already approved.

- CSS does not animate.

- Do not hand the preview stand-in to the owner.

- Do not spawn extra agents unless they asked.

- Making the thumb does not upload it or publish it.
