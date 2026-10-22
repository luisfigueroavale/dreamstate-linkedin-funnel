---
name: step-motion
description: "Animate a process as HTML plates and capture MP4 and GIF with the repo scripts. Use instead of a separate animation toolkit. It does not publish."
---

Follow `docs/skill-frame.md`.

Draw the process as HTML plates. Motion is `DeskTimeline`. Plates start hidden, so the first `__seek` is an empty stage. `scripts/capture-motion.mjs` writes MP4 and GIF. The still is the last frame. Hold that frame long enough that a loop does not blink the CTA off. GIF target is under 5 MB, 720×900, 15 fps. Do not publish.
