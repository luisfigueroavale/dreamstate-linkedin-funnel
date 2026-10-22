---
name: long-cut
description: "Edit a longer recording into an opener still plus the screen recording, with chapters. Use when a plain trim is not enough. It does not upload."
---

Follow `docs/skill-frame.md`.

Opener is a still from `frame-build`, then the screen recording. In the intro, the promise lands inside the first 15 seconds: no logo sting, and no cold open that hides the subject. Chapters come from the cut you made. Loudness target is -14 LUFS integrated and -1.5 dBTP, measured with ffmpeg `loudnorm` and checked with `ffprobe`. `brand.local` is required for titles and overlays, not for the cuts. Fonts come from files listed there. If none are listed, say you are on the system face. Do not vendor a font. Do not upload.
