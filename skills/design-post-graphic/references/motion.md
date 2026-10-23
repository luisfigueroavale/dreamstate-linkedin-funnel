# Motion

Motion is a JavaScript timeline. `pictures/timeline.js` exposes `DeskTimeline`. Call `track(start, end, apply)`. `apply(eased, t, raw)` writes styles, SVG attributes, or canvas pixels. `seek` uses ease-out cubic. `DeskTimeline.install` sets `window.__timeline`, `window.__seek`. Capture drives `__seek`. CSS does not animate, and it has no transitions or keyframes.

Plates start at `opacity: 0`. The timeline overwrites them. Nothing flashes. Parts move in reading order, 0.4 seconds, no bounce or overshoot. Call to action shows by 2.3 seconds. Hold 6 seconds. Ends match. Loops must not jump.

A GIF opens empty at `__seek(0)`. A still is `__seek(duration)`. Duration comes from `DeskTimeline`, not the manifest. Write the still if MP4 or GIF fails.
