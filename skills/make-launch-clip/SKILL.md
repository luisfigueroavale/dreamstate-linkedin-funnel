---
name: make-launch-clip
description: "Cut a short launch piece from a beat list and assets the owner already has. Use for a launch. It does not generate footage or a face."
---
# Make a launch clip

Cut a short launch piece from a beat list and assets the owner already has. Follow `docs/skill-frame.md`.

## Use when
- The owner wants a launch piece, and the beat list plus the assets are already in hand.

- It does not generate footage or a face, and it does not upload.

## Steps
1. Read the product brief and how the feature actually behaves (`references/brief.md`).

2. Set the audience, the runtime, the aspect, the one message, and the output (`references/brief.md`).

3. Write the beat sheet (`references/beats.md`). The spoken line has to be true of the feature on that screen.

4. Read `pictures/timeline.js` and `scripts/capture-motion.mjs` before you build, because `DeskTimeline.install` sets `__seek` (`references/motion.md`).

5. Drop the prebuilt scene library and the automatic uploader (`references/drops.md`).

6. Render a short slice first (`references/render.md`).

7. Inspect type, timing, and audio (`references/render.md`).

8. Render the whole piece with `scripts/capture-motion.mjs`, which seeks `__seek` (`references/render.md`).

9. Run `check-short-export` on the file (`references/render.md`).

10. Confirm codec and that the file plays (`references/render.md`).

11. Deliver the video, the editable HTML, the script, asset credits (file, source, license), and what you actually checked (`references/deliver.md`).

12. Read `brand.local` before you draw a title or an overlay, because a cut does not need `brand.local` (`references/deliver.md`).
## Dreamstate tools
None. Local files only.

## Stop rules
- Follow the skill-frame writing rules.

- Paid voice or music is a separate yes, with the scope and the budget named.

- The owner picks the voice.

- Use music only when their license covers this cut.

- Do not pick a recurring service in silence, and do not imitate a real person's voice.

- Do not invent a metric.

- Do not generate footage.

- Every screen is a real feature, or it is labeled concept or demo.

- A prebuilt scene library is dropped: a ready-made kit would put up a screen that is not this feature, and each screen is HTML for this launch so a later capture rebuilds the piece.

- An automatic uploader is dropped: the job ends when the file is on disk, and an upload waits for a separate yes.

- CSS does not animate.

- Keep exports out of the source folder.

- A cut does not need `brand.local`.

- A title or overlay does.

- No generated face.

- No upload.
