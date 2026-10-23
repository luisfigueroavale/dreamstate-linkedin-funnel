---
name: check-short-export
description: "Check a finished export for cuts, captions, motion, picture, sound, playback, and pace. Use before you call the file done. It does not approve publishing."
---

Follow `docs/skill-frame.md`.

Hold the encoded file, the source, and the edit list. No script runs the seven checks. Use machine tools and record each result.

For cuts, hear every join, with a short pad on both sides. Each word is complete. The line still means what was said.
For captions, check names, numbers, short words, cue timing, line breaks, and crop. Read them against the words you hear.
For motion, check the cue and the payoff with the audio playing. The fact lands with the speech. Watch the overlaps.
For the image, align the source and the output frames. Leave intended overlays and crops out before a quality score.
For audio, listen at a matched level. Check peaks, channel layout, integrated loudness near -14 LUFS, and a true-peak ceiling of -1.5 dBTP.
For playback, decode the whole file. Play it in their player if it is on this machine.
For pacing, play the whole story. Allow no duplicate take and no gap you cannot explain.

Run `ffprobe` on the encoded file. The duration matches the edit list. Width and height stay at the native frame size. Read the channel count and the layout. Sample the opening second. A fade to black there fails unless the edit list asked for black.

Align frames on shared timestamps. Keep intended overlays and crops out before scoring. Another clip's threshold does not bind this one. Use a fresh temporary directory on each run, so files cannot mix.

A failure names the location, the defect, and the fix. Re-check the changed part. Confirm the same path, size, and duration. A JSON parse, or a renderer exit code, does not prove the picture or the sound. A header read is not a decode.

Report what you measured, what you inspected, and what is unverified. Measured means the tool and the printed value. Inspected means what you heard or saw. If `ffprobe`, the loudness meter, or the target player is missing, mark that item unverified. Do not claim a gate when the tool was missing. A pass is not permission to publish.

For titles or overlays, read `brand.local` before you set type or color. If that file is missing or blank, ask. Judgment stays unverified.
