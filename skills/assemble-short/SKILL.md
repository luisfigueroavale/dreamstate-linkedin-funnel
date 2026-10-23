---
name: assemble-short
description: "Run select, audio, overlay, and check for one short. Use when the owner wants a finished short from raw takes. It does not upload."
---
# Assemble a short

Run select, audio, overlay, and check for one short.
Follow `docs/skill-frame.md`.

## Use when

- Use when the owner wants a finished short from raw takes.

- Not for an upload.

## Steps

1. Read (`references/setup.md`).

2. Leave the source files unchanged (`references/setup.md`).

3. Set (`references/setup.md`).

4. Settle (`references/setup.md`).

5. Keep (`references/setup.md`).

6. Put (`references/files.md`).

7. Run (`references/order.md`).

8. Write (`references/order.md`).

9. Use (`references/order.md`).

10. Run `check-short-export` (`references/order.md`).

11. Compare (`references/order.md`).

12. Encode (`references/encode.md`).

13. Read (`references/encode.md`).

14. Return (`references/return.md`).

15. Write (`references/return.md`).
## Dreamstate tools

None. Local files only.

## Stop rules

- Leave the source files unchanged.

- This skill ships no prebuilt assembler.

- Stale offsets from the source files must not drive them.

- If a step's file is missing, stop and name it.

- Do not ship silence.

- Cuts do not need `brand.local`.

- Overlays and titles do.

- Read the tool's help before you invent a flag.

- A script with no render is not a finished edit.

- Do not upload.
