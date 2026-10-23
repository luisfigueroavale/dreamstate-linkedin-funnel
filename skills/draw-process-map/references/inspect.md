# Inspect

Run `node skills/draw-process-map/scripts/map-check.mjs <map.json> <asset-names.txt>`. The second file lists filenames the asset README allows, one per line. The script checks roles, exits, crossings, bindings, image ratio, and id prefixes. It does not open a browser.

Then look. Check the title, each row, and the output strip against the card. Inspect collisions, what each exit means, both bindings, the font, and the image. Open the overview and one detail.

At phone width, 390px, check the hierarchy. Read every field on the full-size frame. A dense working map is for a closer view. A social frame that is crowded becomes fewer stations or another slide (`docs/picture-rules.md`).

When more than one map shares a page, prefix every id so a binding cannot hit the wrong card. For a complex map, keep a short edge list beside the HTML.

Record what you measured, what you looked at, and what you could not open.

Reopen the saved file and compare it with the export. `scripts/render-still.mjs` writes the still and the phone file. When the map moves, `scripts/capture-motion.mjs` steps `__seek`.
