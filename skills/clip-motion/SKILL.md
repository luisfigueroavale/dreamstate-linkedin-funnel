---
name: clip-motion
description: "Burn a cue-timed HTML overlay onto a short without covering the speaker or the captions. Use when the words need a label. It does not replace the footage."
---

Follow `docs/skill-frame.md`.

The overlay is HTML, timed to the cue, and burned on top. It must not cover the mouth or the captions. Motion inside the overlay is `DeskTimeline`, captured with `__seek`, then ffmpeg. Type uses fonts from `brand.local`. Do not replace the footage.
