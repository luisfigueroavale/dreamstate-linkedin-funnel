---
name: pick-short-takes
description: "Choose complete takes and drop false starts and dead air, keeping speech meaning and word boundaries. Use before a short is assembled. It does not export the final file."
---
# Pick short takes

Choose complete takes and drop false starts and dead air, keeping speech meaning and word boundaries.
Follow `docs/skill-frame.md`.

## Use when

- Use before a short is assembled.

- Not for exporting the final file. The finished-file pass is `check-short-export`.

## Steps

1. Read (`references/listen.md`).

2. Inspect each candidate range (`references/listen.md`).

3. For each beat record the source file, in-point, out-point, and why that range (`references/beats.md`).

4. That list is the EDL (`references/time.md`).

5. Play every join in context (`references/joins.md`).
## Dreamstate tools

None. Local files only.

## Stop rules

- Drop false starts.

- Reject an unfinished fragment even if it is the last thing they said.

- Do not keep two conflicting timelines by hand.

- This skill does not export the final file.
