# Plan

Make one pass from the edit list to one captioned file. Do not upload.

The plan shape is `skills/render-captioned-video/scripts/plan.example.json`. Run `node skills/render-captioned-video/scripts/lock-check.mjs plan.json` with `--transcript name=path`, `--words-out words.json`, `--srt captions.srt`, and `--media out.mp4` when you have them. The script checks the plan and, with `--media`, the encoded file. It does not render, mix, or grade. A warning exits 0. A fail exits 1.
