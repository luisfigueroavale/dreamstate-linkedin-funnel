---
name: clip-check
description: "Check a finished export for cuts, captions, motion, picture, sound, playback, and pace. Use before you call the file done. It does not approve publishing."
---

Follow `docs/skill-frame.md`.

Hold encoded file, source, and edit list. No script runs the seven checks. Use machine tools and record each result.

Cuts: hear every join, short pad on both sides. Each word complete. Line still means what was said.
Captions: names, numbers, short words, cue timing, line breaks, crop. Read them against words you hear.
Motion: cue and payoff with audio playing. Fact lands with speech. Watch overlaps.
Image: align source and output frames. Leave intended overlays and crops out before a quality score.
Audio: listen at a matched level. Peaks, channel layout, integrated loudness near -14 LUFS, and a true-peak ceiling of -1.5 dBTP.
Playback: decode whole file. Play in their player if on this machine.
Pacing: play whole story. No duplicate take. No gap you cannot explain.

`ffprobe` the encoded file. Duration matches edit list. Width and height stay native frame size. Read channel count and layout. Sample opening second. Fade to black there fails unless edit list asked for black.

Align frames on shared timestamps. Keep intended overlays and crops out before scoring. Another clip's threshold does not bind this one. Fresh temporary directory each run, so files cannot mix.

Failure names location, defect, and fix. Re-check changed part. Confirm same path, size, duration. JSON parse or renderer exit code does not prove picture or sound. Header read is not a decode.

Report measured, inspected, unverified. Measured: tool and printed value. Inspected: what you heard or saw. Missing `ffprobe`, loudness meter, or target player: unverified. Do not claim a gate when tool was missing. Pass is not permission to publish.

Titles or overlays: read `brand.local` before type or color. Missing or blank: ask. Judgment stays unverified.
