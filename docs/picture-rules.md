# Picture rules

HTML and CSS are the picture. JavaScript is the motion. PNG, PDF, GIF, and MP4 are exports of that same source. Do not redraw from the PNG. Skills: `frame-build`, `frame-review`, `station-map`, `stage-build`, `step-motion`.

Read [brand/AGENTS.md](../brand/AGENTS.md) first. Templates import [brand/tokens.css](../brand/tokens.css) for the token names. Owner values come from `brand.local/tokens.css`. If that file is missing or still `unset`, stop and ask. Do not invent a color. A preview stand-in in the template CSS is only so a blank checkout can render. Do not hand that stand-in to the owner.

## Copy

Each line is an instruction or a fact that is already in the post. Start with a verb when the line tells the reader to do something. Name the real object. Use the post's own lines. Do not put a number on a frame unless the post's source has that number.

A plate has a name and at most three lines. If the text does not fit, cut a line or add a slide. Do not shrink the type.

## Layout

State the reading order before you draw: what comes in, what changes, what the reader leaves with. Use numbered plates and one nameplate style. Prefer fewer, larger stations.

Text is real HTML, not a flattened image and not a path. Labels do not overlap. Connectors do not cross and do not cover type. A vertical rail or a left-to-right row is enough. If a draft crosses, change the layout and render again.

Carousel length is 5 to 12 slides. Use 7 when you have no reason to differ: hook, problem, the frame of the idea, one slide per step, close. The footer carries the slide number.

## Sizes

| Export | This repo's target |
|---|---|
| Portrait still | 1080×1350, files at scale 1 and scale 2 |
| Phone check | The same frame scaled to 390px wide, which is the phone width `social.visuals.render_start` described |
| Carousel slide | 1080×1350 |
| Thumbnail frame | 1280×720 |
| MP4 | 1080×1350, H.264, 25 fps, `yuv420p`, faststart |
| GIF | 720×900, 15 fps, palette, aim under 5 MB |

These are export targets for the scripts in this repo. They are not a claim about a platform's limit. A number the owner wrote in `brand.local/style.md`, mirrored in `brand.local/tokens.css`, overrides the matching target. If that row is blank, use the table and say so.

Dreamstate can also render a stored source: `social.visuals.render_preview`, then `social.visuals.render_start` with that preview's `scope_hash`, then `social.visuals.render_get`. Local Playwright is the path for motion. Dreamstate's render contract that was fetched covers PNG and PDF, not GIF or MP4.

## Motion

Motion is a JavaScript timeline in the same HTML file. `pictures/timeline.js` exposes `DeskTimeline`. Scene code registers tracks. Each track's `apply(eased, t)` sets HTML styles, SVG attributes, or canvas pixels. The page sets `window.__timeline` and `window.__seek(t)`. The capture script steps `__seek`. It does not sample CSS animations.

CSS is layout and color. A plate may start at `opacity: 0` so the first paint does not flash. JavaScript overwrites that. Do not use CSS transitions or keyframes for the motion.

Parts arrive in reading order. Each part takes 0.4s, ease-out cubic, no bounce and no overshoot. The close, including the call to action, is fully visible by 2.3s. After that, one quiet hold of about 6s. The hold starts and ends on the same pixels so a loop does not jump. The GIF's first frame is the empty stage (`__seek(0)`), so when the GIF repeats it restarts empty.

The still is `__seek(duration)`, the last frame of that same timeline. Duration comes from the scene's `DeskTimeline`, not from a second number in a manifest. Keep that still even when the motion export fails.

## Call to action

One real next step. For a giveaway: a connect line, and a comment keyword you will actually answer. Otherwise a save. Do not invent a deadline or a count of people who already did it.

## Review

Open the PNG at 1080px and the 390px file. For motion, check a filmstrip: time 0 is empty of parts, 2.3s is complete, the hold matches at both ends. Fix the largest fault, then render again. Two or three rounds. You are the last reviewer. A script that exits 0 is not a review.

## Faces and marks

No generated face or body. No one else's logo, photo, or illustration. A photo you supply can sit in the frame unchanged. No metric without a source line in the post file.
