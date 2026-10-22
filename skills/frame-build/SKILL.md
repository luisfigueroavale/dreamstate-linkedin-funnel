---
name: frame-build
description: "Build one portrait, carousel slide, or thumbnail as HTML and CSS, with motion in a JavaScript timeline. Use when a piece needs a picture. It does not publish."
---

Follow `docs/skill-frame.md`.

Build picture owner can still edit. Read brief, post, `docs/picture-rules.md`. Read `brand/AGENTS.md`, then filled `brand.local/`: identity, voice, style, tokens. Write for person in `audience.local/ideal-follower.md`. Claims: post and Company Context pages `brand.local/identity.md` names. Logo, photo, or icon needs `brand.local/assets/README.md` plus file README allows. Missing or blank required file: stop and ask. Do not guess color, font, or claim. No approved kit in template.

From brief: who reads it, takeaway, lines that must appear, pixel size, next action when one exists. Relationship: one claim, sequence, comparison, hierarchy, evidence, or look back. Before drawing, three HTML-comment notes: focal element; reading order before drawing (what enters, what changes, what reader leaves with); how type, space, and material express that idea.

Teaching frames use labels people can follow. Each plate states a label and a fact true at that step, in up to three lines under the name. Number fewer, larger plates in one nameplate style. On overflow, cut a line or add a slide rather than shrink type.

The post needs a headline, earned points, and attribution. Keep lines as written. Smoother wording is a rewrite. Leave it out. The whole post stays off the frame. Keep sequence, figures, and limits that change meaning. Add no figure the source lacks. Skip a screenshot you lack.

Instructional plate: what to do, or fact reader can act on. Start with verb. Name object: folder, command, weekday. describing-only line does not belong. Quotation, editorial line, and proper name keep their grammar.

Sizes from `docs/picture-rules.md` unless `brand.local/style.md` filled that row and `brand.local/tokens.css` mirrors it. Portrait and each slide: 1080×1350, at 1x and 2x. Phone check: width 390. Thumbnail: 1280×720. MP4: 1080×1350, H.264, 25 fps, `yuv420p`, faststart. GIF: 720×900, 15 fps, palette, under 5 MB. Blank style row: use this table and say so. Export targets for this repo. Look up live platform limit when needed. Ordinary spacing needs no ask. Ask when open question would change words or format.

Import `brand/tokens.css` so names resolve. Owner values: `brand.local/tokens.css`. `DeskTimeline.previewStandIn` fills preview colors while tokens stay unset, so checkout can render. Do not hand preview stand-in to owner. choice here stays in this file, not new brand rule. Do not add logo, signature, palette, decorative footer, or call to action brief did not supply.

Spacing, hierarchy, and relationships do the work. Ban diagrams inside quotations. Do not stamp a card per slide. Use HTML text, not flat images or paths. Keep labels apart. Connectors do not cross or cover type. Keep contrast readable. Use a vertical rail or left-to-right row. If connectors cross, change the layout and render again. Draw process plates or SVG. Keep product screenshots whole. Owner photos stay unchanged. Do not generate faces. Ban third-party logos, photos, and illustrations. Use fonts the asset README lists. Do not fetch fonts into the repo. Confirm faces are on screen.

Carousel: 5 to 12 slides. Stay at 7 unless brief gives reason in range: hook, problem, idea's frame, slide per step, close. One job per slide. Continuous sequence. Footer shows slide number. Portrait: `pictures/frames/portrait.html`. Slide: `pictures/frames/carousel-slide.html`, one file per slide. Thumbnail: `pictures/frames/thumb.html`. Replace shell copy. Next step only when brief has one worth taking. Giveaway: connect line, comment keyword you will reply to. Else ask them to save it. Do not invent deadline or how many already joined.

Motion is a JavaScript timeline. `pictures/timeline.js` exposes `DeskTimeline`. Call `track(start, end, apply)`. `apply(eased, t, raw)` writes styles, SVG attributes, or canvas pixels. `seek` uses ease-out cubic. `DeskTimeline.install` sets `window.__timeline`, `window.__seek`. Capture drives `__seek`. CSS does not animate, without transitions or keyframes. Plates start at `opacity: 0`. The timeline overwrites. Nothing flashes. Parts move in reading order, 0.4 seconds, no bounce or overshoot. Call to action shows by 2.3 seconds. Hold 6 seconds. Ends match. Loops must not jump. GIF opens empty at `__seek(0)`. Still is `__seek(duration)`. Duration comes from `DeskTimeline`, not manifest. Write the still if MP4 or GIF fails.

`npm run still -- <html>` writes `export/still.png`, `export/still@2x.png`, and `export/phone.png` beside HTML. `npm run capture -- <html>` walks `__seek`, writes `export/motion.mp4` and `export/motion.gif`. Motion: local Playwright. Call `whoami` before writing. Store the page with `social.visuals.source_create`. Then `tools_get` `social.visuals.render_preview`, `social.visuals.render_start` with `scope_hash`, and `social.visuals.render_get`. Read bytes with `social.visuals.file_get` or `social.visuals.download_url`. GIF and MP4 stay local. Prompt request returns HTML: copy, colors, layout, size. prompt is not picture. flattened raster is not source. Do not redraw from PNG.

Keep HTML in named folder, or with that post's pictures. Save editable HTML beside `export/`. Thumbnail, and any frame profile image will cover: type inside safe inset. Check that crop.

Inspect the 1080px PNG and 390px view, and the thumbnail at 1280×720. Check words, hierarchy, clipping, contrast, connector collisions, missing assets, slides, and sequence. Read the filmstrip. Parts are absent at 0 seconds. The picture is complete at 2.3 seconds. Hold ends match. Repair the fault once. Prefer hierarchy, line breaks, spacing, and crop. Render again. Look at pixels. Decoration comes after. Neither markup nor a script exit of 0 is a review. If the render cannot run or you cannot see pixels, return HTML and name the missed step. Do not call the file rendered or inspected.

State reached: HTML ready, render not run; prompt exists and is not picture; rendered, not looked at; or rendered and inspected. Run `brand/taste.md` before owner sees it. Return editable HTML, export, pixel size, and any limit hit. Does not edit shared brand files. Do not publish.
