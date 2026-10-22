---
name: picture-lock
description: "Turn an edit list and a recording into one captioned file with ffmpeg. Use for a single pass on footage they supplied. It does not upload."
---

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Lock the picture

The edit list is JSON the owner can read: in, out, and caption text per span. Cuts sit on word boundaries when a transcript exists. Otherwise use silence from `ffmpeg silencedetect` and let them confirm.

Burn captions from an SRT. System font only. No font file vendored. No box behind every word unless they ask. Keep the native frame. Run `clip-check`.

## Done

The edit list path, the output path, and the probe summary.
