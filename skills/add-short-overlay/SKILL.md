---
name: add-short-overlay
description: "Burn a cue-timed HTML overlay onto a short without covering the speaker or the captions. Use when the words need a label. It does not replace the footage."
---
# Add a short overlay

Burn a cue-timed HTML overlay onto a short without covering the speaker or the captions. Follow `docs/skill-frame.md`.

## Use when
- The words on a finished cut need a label, and a graphic explains a spoken fact.

- Not for replacing the footage.

- `check-short-export` is the last pass.

## Steps
1. Open `brand/AGENTS.md`, then `brand.local/` (`references/plan.md`). Stop if a required file is blank.

2. Scout the finished cut for a number, a comparison, a step, a label, or a supporting image (`references/plan.md`).

3. Record each plan row (`references/cues.md`).

4. Resolve each cue against the final transcript of the cut you will ship (`references/cues.md`). When a cue is spoken twice, name which occurrence.

5. Keep captions, the face, and the graphic in distinct regions (`references/regions.md`).

6. Burn the HTML overlay with ffmpeg (`references/burn.md`). Motion is `DeskTimeline`, capture steps `__seek`, headline text uses `--headline-gradient` when that token is set and `--color-accent` when it is not, and `--color-accent-2` is the second accent.

7. After an edit change, resolve the cues again from that final transcript before the next burn (`references/burn.md`).

8. Inspect before, during, and after (`references/inspect.md`).

9. Play that span with audio (`references/inspect.md`).

10. Return the editable source and the render (`references/inspect.md`). `check-short-export` is the last pass.

## Dreamstate tools
None. Local files only.

## Stop rules
- Follow the skill-frame writing rules.

- Stop if a required file is blank.

- A retention interval you invented is not a reason to add a graphic.

- Full screen needs a story reason.

- Do not vendor a font.

- Do not cover the mouth or the captions.

- Do not replace the footage.

- CSS is layout and color.

- If ffmpeg is not installed, stop and say the burn did not run.
