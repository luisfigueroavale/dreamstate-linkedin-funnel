---
name: clip-motion
description: "Burn a cue-timed HTML overlay onto a short without covering the speaker or the captions. Use when the words need a label. It does not replace the footage."
---

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Add the overlay

Build the overlay as HTML at the video's pixel size, tokens from the owner. If the overlay moves, drive it with a JavaScript timeline (`DeskTimeline`, `window.__seek`), not CSS keyframes. Time each plate to a transcript cue. Leave the mouth and the caption band clear. If you cannot know where the mouth is, keep plates in the top margin and say you did not see a face position. A still of the overlay is `__seek(duration)`.

Composite with ffmpeg. Run `clip-check` and `frame-review` on a still of the composite.

## Done

The overlay HTML, the cue times, and the output path.
