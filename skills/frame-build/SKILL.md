---
name: frame-build
description: "Build one portrait, carousel slide, or thumbnail as HTML and CSS, with motion in a JavaScript timeline. Use when a piece needs a picture. It does not publish."
---

Follow `docs/skill-frame.md`.

Build picture owner can still edit. Read brief, post, `docs/picture-rules.md`. Read `brand/AGENTS.md`, then filled `brand.local/`: identity, voice, style, tokens. Write for person in `audience.local/ideal-follower.md`. Claims: post and Company Context pages `brand.local/identity.md` names. Logo, photo, or icon needs `brand.local/assets/README.md` plus file README allows. Missing or blank required file: stop and ask. Do not guess color, font, or claim. No approved kit in template.

From brief: who reads it, takeaway, lines that must appear, pixel size, next action when one exists. Relationship: one claim, sequence, comparison, hierarchy, evidence, or look back. Before drawing, three HTML-comment notes: focal element; reading order before drawing (what enters, what changes, what reader leaves with); how type, space, and material express that idea.

Little copy can carry the idea. Teaching frame: labels person can follow. Each plate: state label, fact true at that step, up to three lines under name. Number plates. One nameplate style. Fewer, larger plates. Overflow: cut line or add slide. Do not shrink type to fit.

Post needs headline, earned points, and attribution. Keep post lines as written. Smoother wording is a rewrite. Leave it out. Whole post stays off the frame. Keep sequence, figures, and limits that change a line's meaning. Add no figure the source lacks. Skip a screenshot you lack.

Instructional plate: what to do, or fact reader can act on. Start with verb. Name object: folder, command, weekday. describing-only line does not belong. Quotation, editorial line, and proper name keep their grammar.

Sizes from `docs/picture-rules.md` unless `brand.local/style.md` filled that row and `brand.local/tokens.css` mirrors it. Portrait and each slide: 1080×1350, at 1x and 2x. Phone check: width 390. Thumbnail: 1280×720. MP4: 1080×1350, H.264, 25 fps, `yuv420p`, faststart. GIF: 720×900, 15 fps, palette, under 5 MB. Blank style row: use this table and say so. Export targets for this repo. Look up live platform limit when needed. Ordinary spacing needs no ask. Ask when open question would change words or format.

Import `brand/tokens.css` so names resolve. Owner values: `brand.local/tokens.css`. `DeskTimeline.previewStandIn` fills preview colors while tokens stay unset, so checkout can render. Do not hand preview stand-in to owner. choice here stays in this file, not new brand rule. Do not add logo, signature, palette, decorative footer, or call to action brief did not supply.

Spacing, hierarchy, true relationships do the work. Ban diagrams inside quotations. Do not stamp card per slide. Use HTML text, not flat image or path. Labels stay apart. Connectors do not cross or cover type. Keep contrast to follow. Use vertical rail or left-to-right row. If connectors cross, make layout and render again. Draw process plates or SVG. Owner product screenshot stays whole. Owner photo can sit unchanged. Do not generate face. Ban third-party logo, photo, or illustration. Use font asset README lists. Do not fetch font into repo. After load, confirm face is on screen.

Carousel: 5 to 12 slides. Stay at 7 unless brief gives reason in range: hook, problem, idea's frame, slide per step, close. One job per slide. Continuous sequence. Footer shows slide number. Portrait: `pictures/frames/portrait.html`. Slide: `pictures/frames/carousel-slide.html`, one file per slide. Thumbnail: `pictures/frames/thumb.html`. Replace shell copy. Next step only when brief has one worth taking. Giveaway: connect line, comment keyword you will reply to. Else ask them to save it. Do not invent deadline or how many already joined.

Motion: JavaScript timeline in the HTML. `pictures/timeline.js` exposes `DeskTimeline`. `track(start, end, apply)`. `apply(eased, t, raw)` writes HTML styles, SVG attributes, or canvas pixels. `seek` uses ease-out cubic. `DeskTimeline.install` sets `window.__timeline`, `window.__seek`. Capture drives `__seek`. CSS does not animate. No transitions or keyframes. plate may start at `opacity: 0` no flash before paint. Timeline overwrites that. Parts in reading order, 0.4 seconds each, ease-out cubic. No bounce. No overshoot. By 2.3 seconds close, call to action included, on screen. Hold about 6 seconds; ends match. loop must not jump. GIF opens empty at `__seek(0)`. Still: last seek `__seek(duration)`, timeline end. Duration from scene `DeskTimeline`, not manifest. Write the still if MP4 or GIF fails.

`npm run still -- <html>` writes `export/still.png`, `export/still@2x.png`, and `export/phone.png` beside HTML. `npm run capture -- <html>` walks `__seek`, writes `export/motion.mp4` and `export/motion.gif`. Motion: local Playwright. Call `whoami` before writing. Store the page with `social.visuals.source_create`. Then `tools_get` `social.visuals.render_preview`, `social.visuals.render_start` with `scope_hash`, and `social.visuals.render_get`. Read bytes with `social.visuals.file_get` or `social.visuals.download_url`. GIF and MP4 stay local. Prompt request returns HTML: copy, colors, layout, size. prompt is not picture. flattened raster is not source. Do not redraw from PNG.

Keep HTML in named folder, or with that post's pictures. Save editable HTML beside `export/`. Thumbnail, and any frame profile image will cover: type inside safe inset. Check that crop.

Inspect 1080px PNG and 390px. Check thumbnail 1280×720. Check words, hierarchy, clipping, contrast, connector collisions, missing assets, slides, sequence. Read filmstrip. At 0 seconds parts are absent. At 2.3 seconds picture completes. Hold ends match. Repair fault once. Prefer hierarchy, line breaks, spacing, crop. Add decoration only after. Render again. Look at pixels. Markup is not review. Script exit of 0 is not review. If render cannot run, or you cannot see pixels, return HTML and name missed step. Do not call file rendered or inspected.

State reached: HTML ready, render not run; prompt exists and is not picture; rendered, not looked at; or rendered and inspected. Run `brand/taste.md` before owner sees it. Return editable HTML, export, pixel size, and any limit hit. Does not edit shared brand files. Do not publish.
