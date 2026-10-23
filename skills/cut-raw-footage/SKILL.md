---
name: cut-raw-footage
description: "Cut a recording they supplied, from a timed transcript or a silence map, and render only the assets they named. Use when the brief picks the treatment. It does not generate a picture of the speaker."
---

Follow `docs/skill-frame.md`.

Watch the footage and read the request before you choose the treatment. Leave original files and any saved project edit untouched. The brief picks interview, montage, tutorial, or talking head for this piece. Do not push every clip through one preset.

Write a project note: source files, message, chosen output, edits, and decisions still open. When speech sets the cut, keep a transcript whose times point at the source, and look at the picture at each decision. When speech does not set the cut, a silence map can mark the ranges. Speech-to-text and any generation step are optional outside tools. They are not bundled, and each one bills on its own.

Build the edit list from source ranges. Derive the output timeline from those ranges. Record the words on either side of each cut. Map those ranges to captions, overlays, and a later revision. Use `pick-short-takes`, `fix-short-audio`, and `add-short-overlay` where that job fits.

Read the help for the tools installed here and follow the grammar it documents. This skill ships no shared render script and no transcriber. Make only the assets the request names. Keep working files and the finished render out of the source folder.

`brand.local` matters when you add a title or an overlay. It does not matter when you only mark cuts. Render, watch, and revise until the piece matches the brief. When a file was rendered, `check-short-export` is the last pass. Hand over the export, the project note, and the edit list, and name the limits you know. Do not generate a picture of the speaker. A still, if you need one, is a frame of their footage. Publishing, and any upload, is a separate yes.
