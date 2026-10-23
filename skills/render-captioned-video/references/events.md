## Events

A gate below is a script gate, except where the sentence says the checker does not run it.

Every event has a unique id, a start, a length, and a cue (the words it sits on). A repeated id fails. A missing cue fails. A `draft` flag fails until the line is filled in and the flag is cleared. A start before zero fails. An end more than 0.01 seconds past the cut fails.

When mapped words exist, a cue that is not spoken from 2 seconds before the start through 2.5 seconds after is a warning.

Cards do not stack. Overlap fails. A gap under 1 second warns. A spotlight, the caption track, and a full-frame beat may share time with a card. A spotlight may sit on a card on purpose.

Kind `overlay` is an HTML burn from `add-short-overlay`. It counts as a card unless `underlay` is true. Give it a `rect` or the camera test skips it.

Zoom scale outside 1.05 to 2.5 fails. A zoom under 1.2 seconds warns. With `layout.cam` as `[x, y, w, h]` fractions, a zoom that shows more than 2 percent and less than 98 percent of that box fails.

The box stays wholly inside the zoom or wholly outside it.

The visible region is a square whose side is one divided by the scale, with its top-left at each focus coordinate times one minus that side. Omitted focus is the center of the frame. `ease` is stored and not gated.

Use 0 when they asked for a hard punch.

A card or spotlight whose footprint meets the camera box fails. The overlap cutoff and the frame margin are printed by `node skills/render-captioned-video/scripts/lock-check.mjs --help`. Footprints use that margin, then the kind's default anchor, unless the event sets `anchor` or `offset`.

A still `width` is design pixels on a 1920-wide frame and changes that footprint.

Caption glyphs and full-frame beats are outside this test. You still watch the mouth.

Duration outside the band warns. It does not fail the run.

| Kind | Needs | Band (seconds) | Default anchor |
|---|---|---|---|
| nameplate | title | 2.5 to 6 | bottom-right |
| number | value, label | 3 to 6 | top-right |
| phrase | text | 1.5 to 4 | top-center |
| list | items | 3 to 18 | right |
| chapter | title | 2 to 4 | top-left |
| still | src, file on disk | 3 to 9 | right |
| spotlight | rect | 1.5 to 6 | the rect |
| captions | | no band | |
| fullframe | | no band | |
| zoom | scale | the scale gate | focus |
| overlay | cue, at, dur | no band | rect if you have one |

A list row whose `at` (seconds from the card start) is later than `dur - 0.8` fails. A sound path named on an event and missing on disk fails. Sound hits under 1.5 seconds apart warn. A sound belongs on a visual event. This script does not mix.

When you do place a hit, -9 dB is the level unless the plan sets `sfx_gain_db`. `sfx_at` (`in` or `out`) and `sfx_offset` say where the hit sits. The checker does not schedule them.

A number whose first two digits are absent from words within 20 seconds, and that has no `source`, warns. Spelled-out figures do not trip that test. You still check names, numbers, and units against the recording. Wording is what they said, trimmed.

A figure they did not say needs a source line from the screen or from the Proof page. The checker does not open that page. It does not decide whether a still is real or a stand-in. It only checks the path. An unknown kind fails.

Density skips captions and zooms. Under a minute, a card about every 6 to 8 seconds; to 3 minutes, every 8 to 12; to 10, every 12 to 20; to 30, every 20 to 35; longer, every 30 to 60.

The checker warns under 0.6 times (duration / the wider gap) when captions mode is not `full`, and over 1.4 times (duration / the tighter gap) always. Mode defaults to `full`, which quiets only the sparse warning. A hole longer than 60 seconds between events warns.

A 15 second flat stretch is a drafting note.

This checker does not measure it. A card's start belongs about 0.2 to 0.5 seconds before the cue word, and the first move about 0.1 to 0.3 seconds after that word. Those offsets are review, not a gate.
