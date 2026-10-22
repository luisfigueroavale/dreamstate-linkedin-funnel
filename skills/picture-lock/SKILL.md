---
name: picture-lock
description: "Turn an edit list and a recording into one captioned file with ffmpeg. Use for a single pass on footage they supplied. It does not upload."
---

Follow `docs/skill-frame.md`.

One pass from the edit list to one captioned file. Read the installed tool's help before you invent flags. Leave every recording untouched. A synced copy can sit offline, so the files have to be on this disk before a long encode. Do not upload.

The plan shape is `skills/picture-lock/scripts/plan.example.json`. Run `node skills/picture-lock/scripts/lock-check.mjs plan.json` with `--transcript name=path`, `--words-out words.json`, `--srt captions.srt`, and `--media out.mp4` when you have them. The script checks the plan and, with `--media`, the encoded file. It does not render, mix, or grade. A warning exits 0. A fail exits 1. A gate below is a script gate, except where the sentence says the checker does not run it.

## Clock

Each keep names a source, a start, and an end on that file. Output time is derived. Each span is `max(1, round half to even of (end - start) times fps)` frames, and the next span begins where those frames end. A range that stores `out_start` fails when it disagrees. A words file passed with `--words-out` fails when it disagrees with that map, and fails when no map was built. Do not keep a second clock by hand.

A word is kept when its start lies in a range, start included, end excluded. The word's end is clipped to the range end. Tokens that are not type `word` are left out. A named transcript that is missing fails. Written times use that map, rounded to milliseconds with the same half-even rule. When words are mapped, the checker prints phrase groups split where the gap reaches 0.5 seconds. That print is not a gate.

Paths resolve beside the plan file. Card times are seconds on the cut you are delivering. `edl` may point at a ranges file, or the ranges may sit in the plan. Both at once fails. If the picture is already one graded or scaled file, set `edl` to null and do not attach raw ranges. That file is the only clip, and its probed length is the clock. Sending audio out for a transcript needs the owner's yes. With no transcript, time the clip you have as one range from zero to its length, and say the words came from that file.

## Events

Every event has a unique id, a start, a length, and a cue (the words it sits on). A repeated id fails. A missing cue fails. A `draft` flag fails until the line is filled in and the flag is cleared. A start before zero fails. An end more than 0.01 seconds past the cut fails.

When mapped words exist, a cue that is not spoken from 2 seconds before the start through 2.5 seconds after is a warning.

Cards do not stack. Overlap fails. A gap under 1 second warns. A spotlight, the caption track, and a full-frame beat may share time with a card. A spotlight may sit on a card on purpose. Kind `overlay` is an HTML burn from `clip-motion`. It counts as a card unless `underlay` is true. Give it a `rect` or the camera test skips it.

Zoom scale outside 1.05 to 2.5 fails. A zoom under 1.2 seconds warns. With `layout.cam` as `[x, y, w, h]` fractions, a zoom that shows more than 2 percent and less than 98 percent of that box fails. The box stays wholly inside the zoom or wholly outside it. The visible region is a square whose side is one divided by the scale, with its top-left at each focus coordinate times one minus that side. Omitted focus is the center of the frame. `ease` is stored and not gated. Use 0 when they asked for a hard punch.

A card or spotlight whose footprint meets the camera box fails. The overlap cutoff and the frame margin are printed by `node skills/picture-lock/scripts/lock-check.mjs --help`. Footprints use that margin, then the kind's default anchor, unless the event sets `anchor` or `offset`. A still `width` is design pixels on a 1920-wide frame and changes that footprint. Caption glyphs and full-frame beats are outside this test. You still watch the mouth.

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

A list row whose `at` (seconds from the card start) is later than `dur - 0.8` fails. A sound path named on an event and missing on disk fails. Sound hits under 1.5 seconds apart warn. A sound belongs on a visual event. This script does not mix. When you do place a hit, -9 dB is the level unless the plan sets `sfx_gain_db`. `sfx_at` (`in` or `out`) and `sfx_offset` say where the hit sits. The checker does not schedule them.

A number whose first two digits are absent from words within 20 seconds, and that has no `source`, warns. Spelled-out figures do not trip that test. You still check names, numbers, and units against the recording. Wording is what they said, trimmed. A figure they did not say needs a source line from the screen or from the Proof page. The checker does not open that page. It does not decide whether a still is real or a stand-in. It only checks the path. An unknown kind fails.

Density skips captions and zooms. Under a minute, a card about every 6 to 8 seconds; to 3 minutes, every 8 to 12; to 10, every 12 to 20; to 30, every 20 to 35; longer, every 30 to 60. The checker warns under 0.6 times (duration / the wider gap) when captions mode is not `full`, and over 1.4 times (duration / the tighter gap) always. Mode defaults to `full`, which quiets only the sparse warning. A hole longer than 60 seconds between events warns. A 15 second flat stretch is a drafting note. This checker does not measure it. A card's start belongs about 0.2 to 0.5 seconds before the cue word, and the first move about 0.1 to 0.3 seconds after that word. Those offsets are review, not a gate.

## Captions

Captions are an SRT from the mapped words of the final cut, not from raw timestamps left in place. Apply `fixes` (token to the shown form), drop filler tokens, and drop a single token whose time is in `drop_at` within 0.02 seconds. Given the SRT and the transcript, the checker fails a cue whose words are not in that window, and a cue that falls outside the cut. The match keeps letters, digits, and `$%+'`, so a display fix is not flattened away. It does not score a keep ratio. Keeping 70 to 85 percent of the words is review only. Emphasis size and hero layout are not gates. With an SRT and no transcript, times are checked and the word match is reported as skipped.

Fonts come from files listed in `brand.local/assets/README.md`. If that list is empty, say the burn falls back to the system face. Do not vendor a font. No box behind every word unless they ask. `brand.local` is required for titles and overlays, not for the cuts themselves.

## Level and the encoded file

Hit -14 LUFS integrated and -1.5 dBTP on the encoded file. One constant gain, then a limiter 0.5 dB under the peak target, so the encode has room. Do not ride gain per frame. `loudness.i` and `loudness.tp` override those targets when set. `loudness.lra` may be written as 11. The checker does not measure loudness range. This pass does not turn on EQ or compression because a voice field was left out. Level and noise stay with `clip-audio`. Use the cut's frame rate. Measure the file you encoded.

With `--media`, the checker fails the file when a full decode writes errors, duration is 0.1 seconds or more off the cut, integrated loudness is more than 1 LU from the target, the summary peak from `ebur128=peak=true` is above the target, or `blackdetect` finds a stretch at `d=0.10` and `pix_th=0.05`. This ffmpeg prints that true-peak summary as dBFS. `ffprobe` reports duration, streams, and frame size. Frame size stays the native size of the cut. If `ffmpeg` or `ffprobe` is missing, the file was not checked, and a missing tool is not a pass. If the cut file is on disk, its probed length must agree with the frame-snapped ranges within 0.1 seconds.

A grade, only when they ask, needs the offset of graded time zero on the ungraded source. Sampled pairs fail when luma correlation is under 0.9. Frames run from 0.3 seconds in to 0.3 seconds before the end, ten by default. A printed mean absolute error, in steps out of 255, is not a reject line. Values in a baked cube stay inside 0 to 1. `lock-check.mjs` samples nothing and writes no cube, so it cannot pass a grade. Correlation means the frames line up. It is not a test of matching light.

A noise print needs silence of at least 0.8 seconds at -55 dB or quieter. Keep the sample 0.15 seconds inside the detected edges. No such stretch means stop. Leave out a denoise that invents texture, and leave out a per-frame loudness ride. Those limits are not in the checker. If a denoise adds delay, remove that delay or the mouth drifts. Cuts use the same frame rounding as the picture so the join stays lined up.

Music only when the plan names a file the owner may use. `music: null` means none. Sections, gain, and fade are mix notes. The checker does not test the right, and it does not measure ducking.

## Motion and sound

Scan one frame every 10 seconds and label that frame with its timestamp. Sixteen frames fill one sheet. Then read positions from frames that carry a 10 percent grid. A missing label, or a label over the mouth, fails the review even when the checker exits 0.

An interlude is a full-frame flat card with centred type for the one idea or number the piece hangs on. Cut that card in hard. It lasts 1 to 4 seconds. Past 4 seconds the cut looks paused. Under 1 second the next card has not landed.

Reframes and zooms are hard cuts. Set `ease` to 0. Do not ramp a zoom. Keep the scale between 1.1 and 1.3, about every 2 to 3 seconds. Soft motion is only for a type entrance: the words rise out of a blur, with no spring and no bounce.

At most one sound effect per hit. A hit is one visual event that earns a sound. Do not stack two effects on the same appearance. Space hits at least 1.5 seconds apart. The checker warns when they sit closer. This script does not mix the effect. It checks the path and the gap.

## Card limits

One full-frame idea card in any 30 seconds. One chapter card in any 45 seconds. A phrase card is one to six spoken words, not a sentence. A list card is three to six items they said. Do not repeat a label the picture already shows large. Break the pattern about every 30 seconds. On a vertical frame, keep cards out of the top 10 percent and the bottom 22 percent. A full-frame idea card cuts in hard. A spotlight label must not cover the evidence. Cut a graphic that only repeats the screen, including a card that only echoes the captions. Record what the owner kept or changed so the next edit starts from that note.

## After the numbers

Look and listen once. The exit code does not prove a card is readable, clear of the face, or faithful to the words, and it does not prove a zoom landed on the thing in the line. A spotlight sits on what they named. A card must not assert something the picture does not show. A hit plays only where something appears. No swell across a cut where nothing happens. Open a frame before you place type, and measure `layout.cam` from that frame.

Run `clip-check`. Keep the project and the list next to the export. One pass. A real fail stops the job. Report it. Do not roll another render to chase a clean sheet. Do not upload.
