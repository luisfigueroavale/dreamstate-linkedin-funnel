---
name: step-motion
description: "Animate a process as HTML plates and capture MP4 and GIF with the repo scripts. Use instead of a separate animation toolkit. It does not publish."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Animate the steps

Follow `docs/picture-rules.md`. Each step is a track on `DeskTimeline` in `pictures/timeline.js`, 0.4s apart, ease-out. `apply` sets HTML, SVG, or canvas. No CSS keyframes. The close is on screen by 2.3s. Capture with `npm run capture -- <html>`. The still is `__seek(duration)` of that same timeline. Run `frame-review`.

Do not add a Python animation library or a browser 3D package.

## Done

The export paths from the script.
