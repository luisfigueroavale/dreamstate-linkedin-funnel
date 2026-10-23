---
name: draw-process-map
description: "Draw a process as numbered HTML plates in reading order, with connectors that do not cross. Use for a flow, a funnel, or a system map. It does not publish."
---

# Draw a process map

Draw a process as numbered HTML plates in reading order, with connectors that do not cross. Follow `docs/skill-frame.md`.

## Use when

- Use for a flow, a funnel, or a system map.

- It does not publish.

## Steps

1. Read the workflow you are mapping (`references/read.md`).

2. When the picture is a funnel, read the stage notes the owner already has (`references/read.md`).

3. Open the HTML you are changing and any script that draws it (`references/read.md`).

4. State the reading order before you place a card (`references/order.md`).

5. Name the trigger, the input, the work, each decision, the output, the exception, and any feedback (`references/order.md`).

6. Choose the card for each station (`references/cards.md`).

7. Place one mark per card (`references/marks.md`).

8. Take colors from filled `brand.local` tokens (`references/marks.md`). Stop when those files are blank.

9. Bind both ends of each connector (`references/connectors.md`).

10. Measure the glyphs before you change the type size (`references/type.md`).

11. If the map moves, drive it with `DeskTimeline` (`references/motion.md`). Capture calls `__seek`.

12. Run `node skills/draw-process-map/scripts/map-check.mjs <map.json> <asset-names.txt>` (`references/inspect.md`).

13. Look at the full-size frame and at phone width, 390px (`references/inspect.md`).

14. Write the still with `scripts/render-still.mjs` (`references/inspect.md`).

15. When the map moves, step `__seek` with `scripts/capture-motion.mjs` (`references/inspect.md`).

16. Hand back the HTML, the preview when a render ran, the pixel size, and the inspection limit (`references/hand-back.md`).

## Dreamstate tools

None. Local files only.

## Stop rules

- Keep edits a person made by hand.

- Keep the file path the owner already opens.

- A like is not intent.

- A reaction grants no permission and completes no sale.

- Do not draw a diamond that says they will buy because they reacted.

- A card on the page does not run the station, enroll anyone, or send.

- Use the large number only when that number is already in the source.

- Headline text uses `--headline-gradient` when that token is set, and `--color-accent` when it is not.

- `--color-accent-2` is the second accent.

- Stop when those files are blank.

- Leave another client's look and subject matter out.

- `skills/draw-process-map/scripts/map-check.mjs` rejects a color role it does not know.

- It ships no palette and no logo.

- Loading the module draws nothing.

- Connectors do not cross.

- A map that can be read while still needs no timeline.

- CSS stays layout and color.

- A JSON parse, or a script that exits 0, is not a visual review.

- Keep the previous HTML before you regenerate an edit.

- Write only in the diagram folder you were given.

- The words of the diagram stay with the diagram.

- Do not publish.
