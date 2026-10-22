---
name: clip-assemble
description: "Run select, audio, overlay, and check for one short. Use when the owner wants a finished short from raw takes. It does not upload."
---

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Assemble the short

Order: `clip-select`, `talk-cut` or an equivalent trim, `clip-audio` if the levels need it, `clip-motion` only if the brief asked for labels, then `clip-check`. Skip a step that does not apply and say so.

## Done

The final path and which steps ran.
