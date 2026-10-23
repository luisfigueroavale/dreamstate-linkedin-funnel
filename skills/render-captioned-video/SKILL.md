---
name: render-captioned-video
description: "Turn an edit list and a recording into one captioned file with ffmpeg. Use for a single pass on footage they supplied. It does not upload."
---
# Render a captioned video

Make one pass from the edit list to one captioned file.
Follow `docs/skill-frame.md`.

## Use when

- The owner asks for one captioned file from an edit list and footage they supplied.

- Not for an upload.

## Steps

1. Read (`references/plan.md`).

2. Confirm the files are on this disk before a long encode (`references/plan.md`). Leave every recording untouched.

3. Read (`references/plan.md`).

4. Derive output time from each keep (`references/clock.md`). Do not keep a second clock by hand.

5. Place each event on that clock (`references/events.md`).

6. Write the SRT from the mapped words (`references/captions.md`).

7. Level the encoded file (`references/level.md`). Measure the file you encoded.

8. Run (`references/plan.md`).

9. Review motion, sound, and card limits (`references/motion.md`).

10. Look and listen once (`references/after.md`).

11. Run `check-short-export` (`references/after.md`).
## Dreamstate tools

None. Local files only.

## Stop rules

- Leave every recording untouched.

- Do not upload.

- Read the installed tool's help before you invent flags.

- A synced copy can sit offline, so the files have to be on this disk before a long encode.

- Do not keep a second clock by hand.

- Sending audio out for a transcript needs the owner's yes.

- Do not vendor a font.

- No box behind every word unless they ask.

- Do not ride gain per frame.

- This pass does not turn on EQ or compression because a voice field was left out.

- No such stretch means stop.

- Leave out a denoise that invents texture, and leave out a per-frame loudness ride.

- Music only when the plan names a file the owner may use.

- A missing label fails the review even when the checker exits 0.

- Do not ramp a zoom.

- Set `ease` to 0.

- One pass.

- A real fail stops the job. Report it.

- Do not roll another render to chase a clean sheet.

- If `ffmpeg` or `ffprobe` is missing, the file was not checked, and a missing tool is not a pass.
