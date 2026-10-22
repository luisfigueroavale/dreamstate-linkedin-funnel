---
name: thumb-frame
description: "Design a thumbnail whose promise matches the script, as HTML at the thumb size. Use after the title is chosen. It does not generate a face."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Make the thumbnail

Read the script's promise. The largest words are that promise, not a different claim. Size is `--size-thumb-w` and `--size-thumb-h` from the owner's tokens, or 1280×720 if style left the row blank. Say which.

A person in the frame is a still from their footage or a photo listed in `brand.local/assets/README.md`, unchanged. Include `pictures/timeline.js`. The PNG is `__seek(duration)` of that JavaScript timeline, even when the thumb is a single held frame. Render with `npm run still`. Run `frame-review`.

## Done

The HTML, the PNG, and the promise line you used.
