---
name: thumb-frame
description: "Compose the thumbnail in HTML at the thumb size so the title and the picture make the same promise. Use after the title is chosen. It does not generate a face."
---

Follow `docs/skill-frame.md`.

Read the video, the reader, the title, and `brand.local`. Stop if a required brand file is blank. Settle on one concrete idea the video can fulfill. That idea can be a contrast or an outcome the footage actually reaches.

Use a face or a screenshot only when that file was supplied. Do not generate a face. Do not invent a result screen or an endorsement. Do not stage a reaction the footage does not show.

Sketch several compositions. Keep the one that stays legible when the frame is small. On-image words add a fact the title left unsaid. Two to four words.

A large name across a face starts from `pictures/frames/metal-title.css`, class `metal-title`. It is a starting point. The fill is one vertical gradient from white to `#b3b9c2`, with stops at 14.5% and 85.5%, so a short letter takes the same colour row as a capital. Those stops meet the cap and the baseline while line-height stays 1, the name has no vertical padding, and the face is a bold grotesque. If `brand.local` names another face, look at the caps and move the stops on that page. There is no stroke, bevel, or inner highlight. Shadows do the separation, and they are ems so they grow with the type. The class is bold. Right padding is `0.08em`. At 1280×720 the type is about 210px, the cap about 148px, centered, about 60% of the frame wide, and set low. That name is one or two words, and it stays on one line. It does not stand in for a hook style the owner already approved. Add `metal-title--soft` on the same element when a lighter fill is the better fit. That modifier uses one full-strength shadow, which can turn heavy on a pale shirt, so look at the shirt. The default halo is what keeps a light shirt from swallowing the name. On a dark jacket or screen that halo reads stronger. Keep line-height at 1 and add no vertical padding on the name. Tracking in the stylesheet is tight: look at the final letter at full size, and put the right padding back if the ink is cut.

Build editable HTML. Import `brand/tokens.css` and the metal stylesheet. The display face comes from filled `brand.local`. Copy `pictures/frames/thumb.html`. The frame is 1280×720. Load `pictures/timeline.js`, register a `DeskTimeline`, and install it so the page exposes `__seek`. Capture calls `__seek`. The still is the last seek. When this thumb is the closing frame of a scene, that seek is the final one. CSS does not animate. Do not hand the preview stand-in to the owner.

Inspect 1280×720 and 320×180 for readability, crop, contrast, and truth. A manifest beside the HTML can set width 1280, height 720, and phoneWidth 320 so `npm run still` writes both views. `frame-review` is the pass when they want a separate review. Do not spawn extra agents unless they asked.

Return the export, the HTML source, the real dimensions, and any upload limit you did not verify. `docs/picture-rules.md` lists this repo's export target. Making the thumb does not upload it or publish it.
