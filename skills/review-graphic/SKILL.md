---
name: review-graphic
description: "Score one finished frame for clarity, identity, and export quality. Use after design-post-graphic. Includes full size, 390px, and a motion filmstrip when the page moves. Report unless they asked for fixes. Publishing stays outside this skill."
---
# Review a graphic

Score one finished frame for clarity, identity, and export quality. Follow `docs/skill-frame.md`.

## Use when

- Use after design-post-graphic. Includes full size, 390px, and a motion filmstrip when the page moves.

- Report unless they asked for fixes. Publishing stays outside this skill.

## Steps

1. Read the brief and the post this frame came from (`references/look.md`).

2. Read filled files in `brand.local/` that the piece actually uses (`references/look.md`).

3. Look at the rendered file at full size, then at 390px, because a description of it is not the review (`references/look.md`).

4. Write five scores in words (`references/scores.md`). Do not give a numeric score unless a rubric exists.

5. Match identity to rules that are written down, and headline text uses `--headline-gradient` when that token is set, and `--color-accent` when it is not (`references/scores.md`).

6. Review the frames `__seek` returns, including the last one, on the `DeskTimeline`, and treat that last frame as the still (`references/motion.md`).

7. State the evidence label (`references/report.md`). Open on the verdict and on what you could not inspect.

8. Stay report-only unless they asked for fixes (`references/report.md`).
## Dreamstate tools

None. Local files only.

## Stop rules

- `--color-accent-2` is a second accent inside a gradient the owner wrote.

- With no rule, do not fail the piece for identity.

- Do not invent a compliance failure, and do not invent a color or a font to fill the gap.

- A face or body that was generated or retouched fails.

- CSS does not animate.

- A script exit is not a review.

- This pass is report-only unless they asked for fixes.

- Reviewing one frame does not rewrite brand files.

- It does not publish.
