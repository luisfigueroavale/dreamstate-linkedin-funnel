# Motion

This desk builds the scene as HTML, CSS, SVG, and canvas with `DeskTimeline`, then `scripts/capture-motion.mjs`.

The staging rules stay.

Load `pictures/timeline.js`, register tracks, and call `DeskTimeline.install` so the page exposes `__seek`.

CSS is layout and color. A part may start hidden. JavaScript sets the pixels. Duration is the timeline's duration.
