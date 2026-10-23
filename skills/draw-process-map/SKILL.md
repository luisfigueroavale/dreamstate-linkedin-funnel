---
name: draw-process-map
description: "Draw a process as numbered HTML plates in reading order, with connectors that do not cross. Use for a flow, a funnel, or a system map. It does not publish."
---

Follow `docs/skill-frame.md`.

Read the workflow you are mapping. When the picture is a funnel, read the stage notes the owner already has. Open the HTML you are changing and any script that draws it. Keep edits a person made by hand. Keep the file path the owner already opens.

State the reading order before you place a card: what comes in, what changes, what the reader leaves with. Name the trigger, the input, the work, each decision, the output, the exception, and any feedback. A split lands on a card at every exit. An arrow is a dependency you can point to. A lane names who owns the work. A filter is a container that is wider where more enters and tighter where fewer remain.

A set of pillars or tests is a taxonomy. Top, middle, and bottom name jobs of a piece. A reader can stop at one band.

When the map is about people who reacted, keep separate stations for the capture, the company fit, the person fit, the route, the draft, the review, and the send. Set `station` to `capture`, `company-fit`, `person-fit`, `route`, `draft`, `review`, or `send`. Date a snapshot. Mark a station that is only proposed. A like is not intent. A reaction grants no permission and completes no sale. Do not draw a diamond that says they will buy because they reacted. A card on the page does not run the station, enroll anyone, or send.

## Cards

A source or a reference is a quiet card, not an action header. Several files can sit as a compact list. The band stays quiet.

A step is a square card with input, work, and a distinct output. The title band is light. It shows a two-digit number and the word step. Each row is left aligned and carries a short label: input, find, check, match, write, or route. The output sits on its own strip under a rule, with its own label. A step may call a model and still names its input and its output. The card grows when you add a line break.

A skill is a rounded card for judgment. Its band contrasts with the step band. Classify the card by the judgment it applies. A title that names a tool does not pick the role. A skill may choose steps or combine them. The shape leaves open whether the work is deterministic.

A decision is a short question in a diamond with labeled exits and an explicit hold or retry. The question sits inside the diamond. A retry returns to the station that repeats. Hold is a station of its own.

A result can use large type with unit, population, and date. Use the large number only when that number is already in the source. A signal with no number stays a small event card.

Grouping is alignment or a light container. Share an edge when the stations belong together. The container is a quiet outline.

Use different compositions for an overview, a taxonomy, a funnel, and a result breakdown. An overview is the whole route in few stations. A taxonomy is a set of choices. A funnel narrows, and a person need not visit every stage. A breakdown puts one evidenced number in large type and the parts beside it.

Shape, the words on the band, and contrast each show whether a card is a step or a skill.

## Icons and color

Use one mark per card, the same size and the same stroke, inside that card's group. The words stay readable without the mark. Mark strokes stay marks. A mark set does not draw the route. The HTML is the picture. A capture is an export of that file. If `brand.local/assets/README.md` lists a file for that use, use that file, keep its aspect, and look at the pixels. Otherwise a simple CSS mark you name in the file: `file`, `person`, `company`, `note`, `calendar`, `message`, `check`, or `split`. A logo sits in its own group, and only when that README allows the use. A vendor link is optional.

Colors come from filled `brand.local` tokens. Stop when those files are blank. Use the owner's files for this map. Leave another client's look and subject matter out. `skills/draw-process-map/scripts/map-check.mjs` rejects a color role it does not know. It ships no palette and no logo. Loading the module draws nothing.

## Connectors

Compute each end from the card's current box. Bind both ends: the line names the cards, and each card names the line. Bind the shape the line actually meets. Leave room for the exit label. Connectors do not cross. They stay off the type and off other cards. Draw the path that succeeds first. Then draw failures and loops. A long return runs outside the main column. A failure or a return may be dashed so the main path stays clear. When two columns sit side by side, say on the map whether the work runs at the same time. Side by side alone is layout.

A feedback line starts where the feedback appears and ends on the station that changes because of it. Leave a raw source card as evidence. A later sale stays on the result.

## Type

Shorten a line, wrap it, or enlarge the card before you change the type size. `estimateTextBox` in the checker is a draft width for a layout pass. Measure the glyphs in the font the page loads, then correct the alignment. Keep that font. Keep the words as HTML.

## Motion

If the map moves, the motion is `DeskTimeline` in that HTML file. CSS stays layout and color. Capture calls `__seek`. Parts arrive in reading order, 0.4s each, ease-out cubic. The still is the last frame of that timeline. A map that can be read while still needs no timeline.

## Inspect

Run `node skills/draw-process-map/scripts/map-check.mjs <map.json> <asset-names.txt>`. The second file lists filenames the asset README allows, one per line. The script checks roles, exits, crossings, bindings, image ratio, and id prefixes. It does not open a browser.

Then look. Check the title, each row, and the output strip against the card. Inspect collisions, what each exit means, both bindings, the font, and the image. Open the overview and one detail. At phone width, 390px, check the hierarchy. Read every field on the full-size frame. A dense working map is for a closer view. A social frame that is crowded becomes fewer stations or another slide (`docs/picture-rules.md`).

When more than one map shares a page, prefix every id so a binding cannot hit the wrong card. For a complex map, keep a short edge list beside the HTML.

Record what you measured, what you looked at, and what you could not open. A JSON parse, or a script that exits 0, is not a visual review. Keep the previous HTML before you regenerate an edit. Reopen the saved file and compare it with the export. `scripts/render-still.mjs` writes the still and the phone file. When the map moves, `scripts/capture-motion.mjs` steps `__seek`.

## Hand back

Deliver the HTML, the preview when a render ran, the pixel size, and the inspection limit. Write only in the diagram folder you were given. The checks stay in this skill. The words of the diagram stay with the diagram. Do not publish.
