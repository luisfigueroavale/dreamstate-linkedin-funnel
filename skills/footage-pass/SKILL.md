---
name: footage-pass
description: "Review a supplied video from a transcript or a silence map and write the keeps. Use before a cut. It does not generate pictures of the speaker."
---

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Review the footage

If they supplied a transcript, mark keeps and drops against it. If not, run silencedetect and list spans. Do not claim you watched a face you did not see in a frame grab they asked for. Frame grabs are ffmpeg stills from their file, not new portraits.

Hand the keep list to `talk-cut` or `picture-lock`.

## Done

The keep list and anything you could not hear or see.
