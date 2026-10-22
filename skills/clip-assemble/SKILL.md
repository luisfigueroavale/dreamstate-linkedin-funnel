---
name: clip-assemble
description: "Run select, audio, overlay, and check for one short. Use when the owner wants a finished short from raw takes. It does not upload."
---

Follow `docs/skill-frame.md`.

Order is `clip-select`, `clip-audio`, `clip-motion`, then `clip-check`. If a step's output file is absent, stop there and name it. Do not skip audio and ship a silent file. Cuts do not require `brand.local`. Overlays and titles do. Write one file and record the ffmpeg command. Do not upload it.
