---
name: design-video-thumbnail
description: "Compose the thumbnail in HTML at the thumb size so the title and the picture make the same promise. Use after the title is chosen. It does not generate a face."
---

Follow `docs/skill-frame.md`.

Read the video, the reader, the title, and `brand.local`. Stop if a required brand file is blank. Settle on one concrete idea the video can fulfill. That idea can be a contrast or an outcome the footage actually reaches.

Use a face or a screenshot only when that file was supplied. Do not generate a face. Do not invent a result screen or an endorsement. Do not stage a reaction the footage does not show.

Sketch several compositions. Keep the one that stays legible when the frame is small. On-image words add a fact the title left unsaid. Two to four words.

A large name across a face starts from `pictures/frames/metal-title.css`, class `metal-title`. The fill runs the whole em box, from a cool near-white to a blue-grey, so a different face does not shift the color row. Tracking is a small negative em, and the end padding clears the last stem. Two shadows do the separation: a short contact blur, and a longer lift in a blue-black. There is no stroke, bevel, or inner highlight. At 1280×720 the name is one or two words on one line, across the middle half of the frame, set low, and it does not cover the eyes. Size it on the page until that fit holds. It does not stand in for a hook style the owner already approved. Add `metal-title--soft` on the same element when a warm paper fill is the better fit. That modifier uses one shadow. Look at the shirt before you keep it.

Build editable HTML. Import `brand/tokens.css` and the metal stylesheet. The display face comes from filled `brand.local`. Copy `pictures/frames/thumb.html`. The frame is 1280×720. Load `pictures/timeline.js`, register a `DeskTimeline`, and install it so the page exposes `__seek`. Capture calls `__seek`. The still is the last seek. When this thumb is the closing frame of a scene, that seek is the final one. CSS does not animate. Do not hand the preview stand-in to the owner.

Inspect 1280×720 and 320×180 for readability, crop, contrast, and truth. A manifest beside the HTML can set width 1280, height 720, and phoneWidth 320 so `npm run still` writes both views. `review-graphic` is the pass when they want a separate review. Do not spawn extra agents unless they asked.

Return the export, the HTML source, the real dimensions, and any upload limit you did not verify. `docs/picture-rules.md` lists this repo's export target. Making the thumb does not upload it or publish it.
