---
name: build-scene-graphic
description: "Build a small staged scene in HTML and CSS, with labels as real text, then capture it. Use when the idea is a place or a line of stations. It does not use a 3D library."
---

Follow `docs/skill-frame.md`.

The scene is a place the reader gets quickly. Use it for stations, roles, or a flow. A dense lesson stays in `design-post-graphic`. A process drawn as plates stays in `draw-process-map`.

Colors and type come from filled `brand.local` tokens. Headline text uses `--headline-gradient` when that token is set, and `--color-accent` when it is not. `--color-accent-2` is the second accent. Stop if that file is blank. Do not deliver the stand-in. A number appears only when the post already states it. Lines are the post's own lines. Roles and tool names come from that source. Never invent a station. A mark or a photo is allowed only from a file the owner supplied, and a photo stays unchanged.

When the brief is open, offer three metaphors, one line each, and wait. They pick. Then state the reading order: what comes in, what each station does to it, and what leaves.

Fewer, bigger stations. Keep every actor in view. The same nameplate style on every actor: a number, a name, and at most three lines. A line states an instruction, or a fact the post already contains. Do not shrink the type. Put the name down before the smaller tags. Cut a prop that hides a label. Words are real HTML, not a picture of text. Labels do not cover a station or each other. The frame stays fixed.

This desk builds the scene as HTML, CSS, SVG, and canvas with `DeskTimeline`, then `scripts/capture-motion.mjs`. The 3D library and the vendored runtime are dropped for that reason. The staging rules stay. Load `pictures/timeline.js`, register tracks, and call `DeskTimeline.install` so the page exposes `__seek`. CSS is layout and color. A part may start hidden. JavaScript sets the pixels. Duration is the timeline's duration. Do not store a second duration beside it.

Build in reading order: header, stations, then the ask. Each part takes 0.4s, ease-out, no bounce. The call to action is fully on screen by about 2.3s. Then a hold of about 6s whose endpoints match. Motion inside the hold is quiet, back on the same pixels at both ends, and it does not blink. Capture starts at `__seek(0)`. That frame is empty, and it is the GIF's first frame, so a loop shows the build. The still is the last frame.

A collab uses only branding the owner supplied. Both names are large. The call to action is one real next step. A resource ask that needs a connection says so in two steps, without pitching. If no connection is required, ask them to save it. Invent neither a deadline nor a headcount.

`scripts/capture-motion.mjs` writes the MP4 at 1080×1350, H.264, 25fps, and the GIF at 720×900, 15fps, under 5MB. It steps `__seek`. `scripts/render-still.mjs` writes the scale-2 still and the phone-width file from that same last frame. If the GIF is over 5MB, simplify the motion and capture again.

Inspect the full-size still and the phone width. The headline, the station names, the actors, and the call to action have to read in both. At time 0 the parts are absent. By about 2.3s the page is complete. The hold matches at both ends. Nothing sits on a label. Fix the largest fault and render again. Reading the source is not a review of the picture.

Deliver the still, the MP4, the GIF, and the editable folder. In that folder, a short note names the brief, the sizes, what changed after each look, the capture command, and any limit. Do not publish.
