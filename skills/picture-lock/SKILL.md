---
name: picture-lock
description: "Turn an edit list and a recording into one captioned file with ffmpeg. Use for a single pass on footage they supplied. It does not upload."
---

Follow `docs/skill-frame.md`.

One pass from the edit list to a captioned file. Captions come from an SRT. Fonts come from files listed in `brand.local/assets/README.md`. If that list is empty, say the burn falls back to the system face. Do not vendor a font. No box behind every word unless they ask. `brand.local` is required for titles and overlays, not for the cuts. Loudness target -14 LUFS integrated and -1.5 dBTP. `ffprobe` the result and run `clip-check`. Do not upload.
