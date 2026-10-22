---
name: frame-review
description: "Score one finished frame for clarity, identity, and export quality. Use after frame-build. Includes full size, 390px, and a motion filmstrip when the page moves. Report unless they asked for fixes. Publishing stays outside this skill."
---

Follow `docs/skill-frame.md`.

Read the brief and the post this frame came from. Read filled files in `brand.local/` that the piece actually uses. Skip context that cannot change the verdict. If identity, voice, style, or tokens are missing or still blank, review clarity and execution only. Do not invent a compliance failure, and do not invent a color or a font to fill the gap.

Look at the rendered file. A description of it is not the review. Check full size, then the file at 390px wide. If style left the size row blank, a portrait is 1080×1350 and a thumbnail is 1280×720. On a carousel, review every slide, not a sample, and check that the run still reads as one piece. A contact sheet is not a review. If you only have a screenshot, separate what is visible from checks that need the HTML. For a second ratio, judge aspect-ratio recomposition: hierarchy and crops made for that frame, not a flat shrink of the first.

Five scores, written in words. Do not give a numeric score unless a rubric exists.

- Meaning: the takeaway, reading order, and whether relationships and evidence hold.
- Content fit: the frame against the post or brief. Required steps, the figures, the caveats, and lines they chose. Flag type shrunk to squeeze copy in, and ornament that implies a result the source does not have.
- Identity: match rules that are written down. With no rule, do not fail the piece for identity.
- Craft: how large the type is, where lines break, alignment, the gaps, contrast, clipping, and connectors that cross or cover text. Letters are HTML. If you did not check contrast, say so.
- Delivery: pixel size, fonts that loaded, linked files, and both the editable page and the export when they were supplied.

A set of frames uses the same five scores. A face or body that was generated or retouched fails. A logo, photo, or icon belongs only when `brand.local/assets/README.md` lists that use.

When the page moves, the timeline is `DeskTimeline`. Review the frames `__seek` returns, including the last one, and that last frame is the still. Keep a still of it even when the motion file failed. At 0 the parts are off stage, which is also how the GIF should open. The ask is complete on screen by 2.3 seconds. Both ends of the hold show the same pixels. Parts arrive in reading order, about 0.4 seconds each, ease-out, with no bounce. CSS does not animate. A script exit is not a review.

State the evidence label. Use source only, prompt only, rendered, or rendered and inspected. In this list, rendered means the file exists and you have not looked. A clean render does not mean every slide was seen.

Open on the verdict and on what you could not inspect. Give the few findings that most change what the reader takes away. Each one names the place, what the reader does because of it, and the correction to make. Keep three piles: broken behavior, a clash with a rule they adopted, and a preference. Change hierarchy, type, spacing, or crop before you ask for extra decoration. A readable difference they made on purpose is not a defect.

This pass is report-only unless they asked for fixes. A fix stays on this asset, keeps edits already in the file, then renders again. Reinspect that export before you call the item resolved. Start from the largest fault. Two or three passes. Reviewing one frame does not rewrite brand files. It does not publish.
