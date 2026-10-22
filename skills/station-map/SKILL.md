---
name: station-map
description: "Draw a process as numbered HTML plates in reading order, with connectors that do not cross. Use for a flow, a funnel, or a system map. It does not publish."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Map the stations

Write the steps as a list before you draw: input, change, output. One plate per step. A vertical rail or a single row. No crossing lines. No crossing labels. Text is HTML.

If the map moves, the motion is a JavaScript timeline (`DeskTimeline`, `window.__seek`), not CSS keyframes. The still is `__seek(duration)`.

Use `pictures/frames/portrait.html` as the shell or a new file under `pictures/examples/<name>/` that imports the tokens and `pictures/timeline.js`. Render and run `frame-review`.

Keep the source. Do not trace the map from the PNG.

## Done

The step list, the file, and the render paths.
