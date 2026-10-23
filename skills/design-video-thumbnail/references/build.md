# Build

Build editable HTML. Import `brand/tokens.css` and the metal stylesheet. The display face comes from filled `brand.local`.

Copy `pictures/frames/thumb.html`. The frame is 1280×720.

Load `pictures/timeline.js`, register a `DeskTimeline`, and install it so the page exposes `__seek`. Capture calls `__seek`. The still is the last seek.

When this thumb is the closing frame of a scene, that seek is the final one. CSS does not animate.

Do not hand the preview stand-in to the owner.
