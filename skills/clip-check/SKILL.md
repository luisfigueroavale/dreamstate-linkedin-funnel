---
name: clip-check
description: "Check a finished export for cuts, captions, motion, picture, sound, playback, and pace. Use before you call the file done. It does not approve publishing."
---

Follow `docs/skill-frame.md`.

Hold the encoded file next to its source and the edit list. This skill ships no script that runs the seven checks. Use the tools on the machine, and record what each one actually returned.

| Check | What you do |
|---|---|
| Cuts | Hear every join, with a short pad on both sides. Each word is complete. The line still means what was said |
| Captions | Names, numbers, short words, cue timing, line breaks, and crop. Read them against the words you hear |
| Motion | Cue and payoff with the audio playing. The fact lands with the speech. Watch for overlaps |
| Image | Aligned source and output frames. Leave intended overlays and crops out before you read a quality score |
| Audio | Listen at a matched level. Peaks, channel layout, integrated loudness near -14 LUFS, and a true-peak ceiling of -1.5 dBTP |
| Playback | Decode the whole file. Play it in their player when that player is on this machine |
| Pacing | Play the whole story. No duplicate take. No gap you cannot explain |

`ffprobe` the encoded file. Duration matches the edit list. Width and height stay the native frame size. Read the channel count and layout it reports. Sample the opening second. A fade to black there fails unless the edit list asked for black.

Line frames up on shared timestamps. Keep intended overlays and crops out of the comparison before you trust a score. A threshold taken from another clip does not bind this one. Give every run a fresh temporary directory so one file cannot mix into the next.

A failure names the location, the defect, and the fix. Re-check the changed part. Then confirm the file is the reviewed one: same path, size, and duration. A JSON parse or a renderer exit code does not prove picture or sound. A header read is not a decode.

Split the report into measured, inspected, and unverified. Measured rows name the tool and the value it printed. Inspected rows name what you heard or saw. If `ffprobe`, a loudness meter, or the target player is missing, that item stays unverified. Do not claim a gate when the tool was missing. A pass is not permission to publish.

If the file has titles or overlays, read `brand.local` before you judge type or color. Missing or blank means ask, and that judgment stays unverified.
