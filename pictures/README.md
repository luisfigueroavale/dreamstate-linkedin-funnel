# Pictures

HTML and CSS are the picture. JavaScript is the motion. PNG, GIF, and MP4 are exports of that same file.

`timeline.js` exposes `DeskTimeline`. A scene registers tracks. `apply(eased, t)` sets HTML styles, SVG attributes, or canvas pixels. The page sets `window.__timeline` and `window.__seek(t)`. CSS does not transition or animate. A plate may start at `opacity: 0`. The script overwrites it.

The still is `__seek(duration)`. Duration is the timeline's own number. `manifest.json` holds width, height, and frame rate only.

## Shells

| File | Use |
|---|---|
| `frames/portrait.html` | 1080×1350 portrait |
| `frames/carousel-slide.html` | One carousel slide. One file per slide |
| `frames/thumb.html` | 1280×720 thumbnail |
| `examples/gate/` | A worked example. The copy is invented |

Shells import `brand/tokens.css` for the token names. If those values are still `unset` and `brand.local/tokens.css` is not filled, `previewStandIn()` paints preview colors so the script can run. That stand-in is not the brand. Do not hand it to the owner.

## Export

```sh
npm run still
npm run capture
```

Pass an HTML path to render a different file. Output lands in `export/` next to that file. The folder is gitignored.

`npm run still` writes `still.png` (the last frame), `still@2x.png`, and `phone.png`. `npm run capture` walks `__seek` from 0 through the duration, writes the MP4 and the GIF, and writes `still.png` from the last frame again. The GIF starts on the empty stage.
