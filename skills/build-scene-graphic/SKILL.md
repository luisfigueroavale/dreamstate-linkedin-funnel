---
name: build-scene-graphic
description: "Build a small staged scene in HTML and CSS, with labels as real text, then capture it. Use when the idea is a place or a line of stations. It does not use a 3D library."
---
# Build a scene graphic

Build a small staged scene in HTML and CSS, with labels as real text, then capture it. Follow `docs/skill-frame.md`.

## Use when

- The idea is a place or a line of stations, roles, or a flow.

- A dense lesson stays in `design-post-graphic`. A process drawn as plates stays in `draw-process-map`.

- It does not use a 3D library.

## Steps

1. Offer three metaphors when the brief is open, one line each, and wait (`references/brief.md`). They pick.

2. State the reading order, and say what comes in, what each station does to it, and what leaves (`references/brief.md`).

3. Set color from filled `brand.local` tokens (`references/tokens.md`). Headline text uses `--headline-gradient` when that token is set, and `--color-accent` when it is not.

4. Build fewer, bigger stations (`references/stage.md`). Keep every actor in view.

5. Build the scene with `DeskTimeline`, then `scripts/capture-motion.mjs`, and call `DeskTimeline.install` so the page exposes `__seek` (`references/motion.md`).

6. Time the build in reading order (`references/timing.md`). Capture starts at `__seek(0)`.

7. Use only branding the owner supplied for a collab (`references/collab.md`).

8. Capture the MP4 and the GIF with `scripts/capture-motion.mjs` (`references/capture.md`).

9. Write the still with `scripts/render-still.mjs` (`references/capture.md`).

10. Inspect the full-size still and the phone width (`references/inspect.md`).

11. Deliver the still, the MP4, the GIF, and the editable folder (`references/deliver.md`).
## Dreamstate tools

None. Local files only.

## Stop rules

- `--color-accent-2` is the second accent.

- Stop if that file is blank.

- Do not deliver the stand-in.

- Never invent a station.

- The 3D library and the vendored runtime are dropped for that reason.

- Do not store a second duration beside it.

- Invent neither a deadline nor a headcount.

- Do not publish.
