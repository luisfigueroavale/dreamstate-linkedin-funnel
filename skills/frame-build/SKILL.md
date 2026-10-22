---
name: frame-build
description: "Build one portrait, carousel slide, or thumbnail as HTML and CSS, with motion in a JavaScript timeline. Use when a piece needs a picture. It does not publish."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Build the frame

Read `docs/picture-rules.md` and `pictures/README.md`. Copy starts from the post file. State the reading order in an HTML comment. Start from `pictures/frames/portrait.html`, `carousel-slide.html`, or `thumb.html`. Import `brand/tokens.css` and `pictures/frames/frame.css`. The render script adds `brand.local/tokens.css` when it exists. If those tokens are missing or `unset`, stop. Do not hand over the preview stand-in.

CSS is layout and color. No CSS transitions and no keyframes. Motion is `pictures/timeline.js`. The scene registers tracks on `DeskTimeline`. `apply(eased, t)` sets HTML styles, SVG attributes, or canvas pixels. Install with `window.__timeline` and `window.__seek`. Duration is the timeline's `duration`.

No generated face. No metric that is not in the post. Plate name plus at most three lines. If it does not fit, add a slide. Carousel length 5 to 12. Use 7 only when the post has a hook, a problem, a frame, steps, and a close.

`npm run still -- <html>` seeks `window.__timeline.duration` and writes that frame. `npm run capture -- <html>` walks the same `__seek` from 0 to that duration. Then `frame-review`.

Store the HTML with `social.visuals.source_create` only if they ask. Fetch the schema first. Inline `timeline.js` and the scene into that one document before the call, because the stored source is the file you send. Dreamstate render is PNG or PDF (`render_preview`, then `render_start` with `scope_hash`, then `render_get`). Motion stays local.

## Done

The HTML path, the PNG paths, the duration from the timeline, and the reading order you wrote down.
