---
name: release-reel
description: "Cut a short launch piece from a beat list and assets the owner already has. Use for a launch. It does not generate footage or a face."
---

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Cut the launch

Beats come from the offer on the Product Information page or `brand.local/identity.md`. Each beat names an asset path they supplied, or a still from `frame-build`. Missing asset: cut the beat. Ask once if a beat is required and the file is absent.

Assemble with ffmpeg. Commands live in `docs/clips.md` and `scripts/` patterns. No stock face. Run `clip-check`, then `brand/taste.md`.

## Done

The output path, the beats kept, and the beats cut.
