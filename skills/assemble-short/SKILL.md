---
name: assemble-short
description: "Run select, audio, overlay, and check for one short. Use when the owner wants a finished short from raw takes. It does not upload."
---

Follow `docs/skill-frame.md`.

Read the brief and inspect the footage. Leave the source files unchanged. Set the message, the aspect, and the runtime. Settle routine choices the request already implies. Keep the message the brief already states.

Put `raw/`, `transcripts/`, `edit/`, and `renders/` in the ignored output directory they named. This skill ships no prebuilt assembler. Every span on the decision list records the source file, start, end, beat, and reason.

Order is `pick-short-takes`, then `fix-short-audio`. Write captions from the words and times of the final cut. Stale offsets from the source files must not drive them. Use `add-short-overlay` only when a graphic earns the moment. Then `check-short-export`. Compare each name, number, and unit with the recording, by hand.

When one pass is practical, encode once from the files you kept. Cache each transcript and any other generated file with the settings that made it, so versions stay distinct. Read the tool's help before you invent a flag.

If a step's file is missing, stop and name it. Do not ship silence. Cuts do not need `brand.local`. Overlays and titles do. Return the rendered file, the decision list, the source-to-output map, and the `check-short-export` results. Write the ffmpeg command into `edit/`. A script with no render is not a finished edit. Do not upload.
