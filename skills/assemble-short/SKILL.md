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

1. Read the brief and inspect the footage (`references/setup.md`).

2. Leave the source files unchanged (`references/setup.md`).

3. Set the message, the aspect, and the runtime (`references/setup.md`).

4. Settle routine choices the request already implies (`references/setup.md`).

5. Keep the message the brief already states (`references/setup.md`).

6. Put `raw/`, `transcripts/`, `edit/`, and `renders/` in the ignored output directory they named (`references/files.md`).

7. Run `pick-short-takes`, then `fix-short-audio` (`references/order.md`).

8. Write captions from the words and times of the final cut (`references/order.md`).

9. Use `add-short-overlay` only when a graphic earns the moment (`references/order.md`).

10. Run `check-short-export` (`references/order.md`).

11. Compare each name, number, and unit with the recording, by hand (`references/order.md`).

12. Encode once from the files you kept when one pass is practical (`references/encode.md`).

13. Read the tool's help before you invent a flag (`references/encode.md`).

14. Return the rendered file, the decision list, the source-to-output map, and the `check-short-export` results (`references/return.md`).

15. Write the ffmpeg command into `edit/` (`references/return.md`).

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
