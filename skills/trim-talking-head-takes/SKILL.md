---
name: trim-talking-head-takes
description: "Join talking-head or screen takes, drop false starts, and keep the native picture. Use for a straight cut. It does not restyle the footage."
---
# Trim talking-head takes

Build one clean long-form picture from the raw recordings, and add nothing they did not ask for. Follow `docs/skill-frame.md`.

## Use when

- Use for a straight cut of talking-head or screen takes.

- Saying "just cut and merge" is a yes for this strategy.

- It does not restyle the footage. A designed opener is `edit-long-video`.

## Steps

1. Deliver a single named MP4 in the recording's `edit` folder (`references/job.md`). Leave every source recording untouched.

2. Ask only if you cannot infer the order, or which material should stay (`references/job.md`).

3. Apply the silence, pad, and encode defaults (`references/defaults.md`).

4. Trim on a word and keep the native picture (`references/defaults.md`).

5. Keep the last complete performance (`references/select.md`).

6. Cut qualifying pauses with `silencedetect` (`references/silence.md`).

7. Leave colour, captions, music, and graphics off unless they ask (`references/defaults.md`).

8. On a retake, keep the last attempt that completes the thought (`references/select.md`).

9. Keep story order unless they named a sequence (`references/select.md`).

10. Set the cut from word starts and the waveform (`references/edges.md`).

11. For a webcam plus a screen demo, set `min_seconds` to 9999 (`references/edges.md`).

12. Mark the manual drops (`references/drops.md`).

13. Write `plan.json` (`references/plan.md`).

14. Stop before encode when a failure mode matches (`references/failures.md`).

15. Inventory each named file with `ffprobe` (`references/render.md`).

16. Transcribe just those files, at word level (`references/render.md`).

17. Render the plan with `skills/trim-talking-head-takes/scripts/render_plan.py` (`references/render.md`).

18. Check joins on the output timeline from `edl.json` (`references/check.md`).

19. Report the file and how QA finished (`references/report.md`).

## Dreamstate tools

None. Local files only.

## Stop rules

- Leave every source recording untouched.

- Ask only if you cannot infer the order, or which material should stay.

- Do not resample the aspect.

- Do not blend faces.

- `brand.local` is not required unless you add type.

- Do not upload.

- Do not clear every brief gap.

- No colour grading unless they ask. The same goes for captions, music, compression, zooms, reframing, overlays, and graphics.

- A designed opener is `edit-long-video`.

- A dangling bit such as "So…", "and…", or a word that cuts off is not a take.

- Do not reorder the story unless they ask.

- For a screen demo, set `min_seconds` to 9999.

- Finish every manual drop on a whole word.

- Failure modes stop the run before encode.

- Three passes is the stop; then report what remains.

- This skill does not upload.
