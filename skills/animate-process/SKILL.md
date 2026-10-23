---
name: animate-process
description: "Animate a process as HTML plates and capture MP4 and GIF with the repo scripts. Use instead of a separate animation toolkit. It does not publish."
---
# Animate a process

Animate a process as HTML plates and capture MP4 and GIF with the repo scripts. Follow `docs/skill-frame.md`.

## Use when
- The motion has to make a transformation, a dependency, a construction, or a changing quantity clear.

- Use instead of a separate animation toolkit.

- It does not publish.

## Steps
1. Decoration is not an explanation (`references/plan.md`).

2. Plan each scene first (`references/plan.md`).

3. Check the math and the labels before anything moves (`references/plan.md`).

4. Write motion as a `DeskTimeline` in the HTML page (`references/motion.md`). CSS does not animate or transition.

5. Run `scripts/capture-motion.mjs` (`references/motion.md`). It calls `__seek`.

6. Run a low-cost preview before the full encode (`references/capture.md`).

7. Seek the start, one middle beat, and the last frame (`references/capture.md`).

8. Capture the whole timeline (`references/capture.md`). The GIF is 720×900, 15 fps, and under 5 MB.

9. Inspect the transitions on the file the script wrote (`references/deliver.md`).

10. Run `check-short-export` where it applies (`references/deliver.md`).

11. Call the piece rendered only when `export/motion.mp4` and `export/motion.gif` both exist and the GIF is under 5 MB (`references/deliver.md`).
## Dreamstate tools
None. Local files only.

## Stop rules
- This desk does not ship a separate animation library, so that library and its version-specific API are dropped.

- Decoration is not an explanation.

- CSS does not animate or transition.

- Move the camera only when the move explains scale or structure.

- Plates start hidden, so the first seek is an empty stage.

- When the piece lasts at least 2.4 seconds, the pixels at 2.4 seconds match the last frame, and the call to action is still on.

- If capture cannot run, deliver the source and name the missing step.

- Do not call that file rendered.

- Do not publish.
