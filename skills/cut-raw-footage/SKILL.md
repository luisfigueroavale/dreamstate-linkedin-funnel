---
name: cut-raw-footage
description: "Cut a recording they supplied, from a timed transcript or a silence map, and render only the assets they named. Use when the brief picks the treatment. It does not generate a picture of the speaker."
---
# Cut raw footage

Cut a recording they supplied, from a timed transcript or a silence map, and render only the assets they named.
Follow `docs/skill-frame.md`.

## Use when

- Use when the brief picks the treatment: interview, montage, tutorial, or talking head.

- Not for generating a picture of the speaker. Publishing, and any upload, is a separate yes.

## Steps

1. Watch the footage and read the request before you choose the treatment (`references/treat.md`).

2. Leave original files and any saved project edit untouched (`references/treat.md`).

3. Write a project note (`references/note.md`).

4. Build the edit list from source ranges (`references/edit.md`).

5. Use `pick-short-takes`, `fix-short-audio`, and `add-short-overlay` where that job fits (`references/edit.md`).

6. Read the help for the tools installed here and follow the grammar it documents (`references/render.md`).

7. Render, watch, and revise until the piece matches the brief (`references/render.md`).

8. Run `check-short-export` when a file was rendered (`references/render.md`).

9. Hand over the export, the project note, and the edit list (`references/render.md`).
## Dreamstate tools

None. Local files only.

## Stop rules

- Do not push every clip through one preset.

- Leave original files and any saved project edit untouched.

- This skill ships no shared render script and no transcriber.

- Make only the assets the request names.

- Keep working files and the finished render out of the source folder.

- Do not generate a picture of the speaker.

- A still, if you need one, is a frame of their footage.

- Publishing, and any upload, is a separate yes.
