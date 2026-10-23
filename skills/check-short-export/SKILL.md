---
name: check-short-export
description: "Check a finished export for cuts, captions, motion, picture, sound, playback, and pace. Use before you call the file done. It does not approve publishing."
---
# Check a short export

Check a finished export before you call the file done. Follow `docs/skill-frame.md`.

## Use when
- The encoded file, the source, and the edit list are in hand, and you are about to call the file done.

- Not for approving a publish.

## Steps
1. Hold the encoded file, the source, and the edit list, because no script runs the seven checks (`references/hold.md`).

2. Hear every join, with a short pad on both sides (`references/checks.md`).

3. Check captions against the words you hear (`references/checks.md`).

4. Check the cue and the payoff with the audio playing (`references/checks.md`).

5. Align the source and the output frames, and leave intended overlays and crops out before a quality score (`references/checks.md`).

6. Listen at a matched level (`references/checks.md`). Check peaks, channel layout, integrated loudness near -14 LUFS, and a true-peak ceiling of -1.5 dBTP.

7. Decode the whole file (`references/checks.md`).

8. Play it in their player if it is on this machine (`references/checks.md`).

9. Play the whole story (`references/checks.md`). Allow no duplicate take and no gap you cannot explain.

10. Run `ffprobe` on the encoded file (`references/probe.md`).

11. Align frames on shared timestamps (`references/probe.md`).

12. Name the location, the defect, and the fix (`references/report.md`).

13. Re-check the changed part (`references/report.md`). Confirm the same path, size, and duration.

14. Report what you measured, what you inspected, and what is unverified, because a pass is not permission to publish (`references/report.md`).

15. Read `brand.local` before you set type or color, and if that file is missing or blank, ask (`references/report.md`).
## Dreamstate tools
None. Local files only.

## Stop rules
- No script runs the seven checks.

- Another clip's threshold does not bind this one.

- Use a fresh temporary directory on each run, so files cannot mix.

- A JSON parse, or a renderer exit code, does not prove the picture or the sound.

- A header read is not a decode.

- A fade to black there fails unless the edit list asked for black.

- If `ffprobe`, the loudness meter, or the target player is missing, mark that item unverified.

- Do not claim a gate when the tool was missing.

- A pass is not permission to publish.

- If `brand.local` is missing or blank, ask.

- Judgment stays unverified.

- It does not approve publishing.
