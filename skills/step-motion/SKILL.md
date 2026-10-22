---
name: step-motion
description: "Animate a process as HTML plates and capture MP4 and GIF with the repo scripts. Use instead of a separate animation toolkit. It does not publish."
---

Follow `docs/skill-frame.md`.

Read the concept and the reader. The motion has to make a transformation, a dependency, a construction, or a changing quantity clear. Decoration is not an explanation.

This desk does not ship a separate animation library, so that library and its version-specific API are dropped. Motion is a `DeskTimeline` in the HTML page. Tracks write HTML styles, SVG attributes, and canvas pixels. CSS does not animate or transition. Run `scripts/capture-motion.mjs`. It calls `__seek`.

Plan each scene first: the narration or the caption, the objects, their spatial relationships, the transformation, and the duration. Check the math and the labels before anything moves. Move the camera only when the move explains scale or structure.

Keep the HTML and JavaScript editable. The script writes `export/` beside that file. Use the tokens in `brand.local` when that file is filled. Data and equations stay the source values, as text on the plate.

Run a low-cost preview before the full encode. Seek the start, one middle beat, and the last frame. Check pace, bounds, labels, and continuity for the objects and for the camera. Then capture the whole timeline. The GIF is 720×900, 15 fps, and under 5 MB. The still is the last frame. Plates start hidden, so the first seek is an empty stage. Hold the last frame so a loop does not blink the call to action off: when the piece lasts at least 2.4 seconds, the pixels at 2.4 seconds match the last frame, and the call to action is still on.

Inspect the transitions on the file the script wrote. When narration is included, the picture matches those words. Run `clip-check` where it applies. Deliver the editable source and the rendered file. Call the piece rendered only when `export/motion.mp4` and `export/motion.gif` both exist and the GIF is under 5 MB. The still is `export/still.png`. If capture cannot run, deliver the source and name the missing step. Do not call that file rendered. Do not publish.
