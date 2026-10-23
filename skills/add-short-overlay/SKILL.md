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
1. Stop if a required file is blank (`references/plan.md`).

2. Scout the finished cut for a number, a comparison, a step, a label, or a supporting image (`references/plan.md`).

3. Record each plan row (`references/cues.md`).

4. When a cue is spoken twice, name which occurrence (`references/cues.md`).

5. Keep captions, the face, and the graphic in distinct regions (`references/regions.md`).

6. Burn with ffmpeg (`references/burn.md`). Motion is `DeskTimeline`, and capture steps `__seek`.

7. After an edit change, resolve the cues again from that final transcript before the next burn (`references/burn.md`).

8. Inspect before, during, and after (`references/inspect.md`).

9. Play that span with audio (`references/inspect.md`).

10. `check-short-export` is the last pass (`references/inspect.md`).
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
