# Motion

This desk does not ship a separate animation library, so that library and its version-specific API are dropped. Motion is a `DeskTimeline` in the HTML page. Tracks write HTML styles, SVG attributes, and canvas pixels. Run `scripts/capture-motion.mjs`. It calls `__seek`.

Keep the HTML and JavaScript editable. The script writes `export/` beside that file. Use the tokens in `brand.local` when that file is filled. Headline text uses `--headline-gradient` when that token is set, and `--color-accent` when it is not. `--color-accent-2` is the second accent. Data and equations stay the source values, as text on the plate.
