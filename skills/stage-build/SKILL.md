---
name: stage-build
description: "Build a small staged scene in HTML and CSS, with labels as real text, then capture it. Use when the idea is a place or a line of stations. It does not use a 3D library."
---

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Stage the scene

CSS sets the look, including `transform` for a resting position. Labels are HTML, not textures. Roles are simple shapes in the owner's colors. No characters with faces. No bundled graphics library.

Motion is a JavaScript timeline (`DeskTimeline`, `window.__seek`) that drives those styles. No CSS keyframes. Follow `docs/picture-rules.md`. Capture with `scripts/capture-motion.mjs`. The still is the last seek of that timeline. Run `frame-review` on the still and the filmstrip.

## Done

The HTML path and the export paths.
