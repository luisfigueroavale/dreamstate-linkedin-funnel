# Render

`npm run still -- <html>` writes `export/still.png`, `export/still@2x.png`, and `export/phone.png` beside the HTML. `npm run capture -- <html>` walks `__seek`, writes `export/motion.mp4` and `export/motion.gif`. Motion capture is local Playwright.

Call `whoami` before writing. Store the page with `social.visuals.source_create`. Then `tools_get` `social.visuals.render_preview`, `social.visuals.render_start` with `scope_hash`, and `social.visuals.render_get`. Read the bytes with `social.visuals.file_get` or `social.visuals.download_url`. GIF and MP4 stay local.

A prompt request returns HTML: copy, colors, layout, size. A prompt is not a picture. A flattened raster is not the source. Do not redraw from PNG.
