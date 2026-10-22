---
name: stage-build
description: "Build a small staged scene in HTML and CSS, with labels as real text, then capture it. Use when the idea is a place or a line of stations. It does not use a 3D library."
---

Follow `docs/skill-frame.md`.

Offer three metaphors and wait. The owner picks. The camera stays fixed unless they name a move. Plates enter in reading order, 0.4s each, ease-out cubic. The CTA is fully on screen by about 2.3s, then a hold that starts and ends on the same pixels. Do not put a second person's brand on the stage. The filmstrip is ffmpeg through `scripts/capture-motion.mjs`, which calls `__seek`. No 3D library.
