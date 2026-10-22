---
name: talk-cut
description: "Join talking-head or screen takes, drop false starts, and keep the native picture. Use for a straight cut. It does not restyle the footage."
---

Follow `docs/skill-frame.md`.

ffmpeg. Drop silence at -45 dB, minimum gap 600 ms, pad 60 ms before the word and 150 ms after, and fade the audio 30 ms. Picture encode CRF 18. Audio AAC at 192k. Check with `ffprobe` and `loudnorm`. Trim on a word. Do not resample the aspect. Do not blend faces. Report each join as input file, in-point, out-point. `brand.local` is not required unless you add type.
