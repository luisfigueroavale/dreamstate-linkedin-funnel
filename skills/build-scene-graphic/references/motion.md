# Motion

This desk builds the scene as HTML, CSS, SVG, and canvas with `DeskTimeline`, then `scripts/capture-motion.mjs`.

The 3D library and the vendored runtime are dropped for that reason. The staging rules stay.

Load `pictures/timeline.js`, register tracks, and call `DeskTimeline.install` so the page exposes `__seek`.

CSS is layout and color. A part may start hidden. JavaScript sets the pixels. Duration is the timeline's duration. Do not store a second duration beside it.
