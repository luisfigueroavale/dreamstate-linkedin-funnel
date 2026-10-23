---
name: add-short-overlay
description: "Burn a cue-timed HTML overlay onto a short without covering the speaker or the captions. Use when the words need a label. It does not replace the footage."
---

Follow `docs/skill-frame.md`.

A graphic belongs on the cut when it explains a spoken fact. Scout the finished cut for a number, a comparison, a step, a label, or a supporting image. Read brand first. Open `brand/AGENTS.md`, then `brand.local/`. Stop if a required file is blank. A retention interval you invented is not a reason to add a graphic.

Each plan row records the cue phrase, the payload, the duration, the region, and the reason. Resolve each cue against the final transcript of the cut you will ship. When a cue is spoken twice, name which occurrence. The payoff arrives with the spoken fact. The entrance may begin earlier, and the fact stays visible while the line is heard.

Captions, the face, and the graphic keep distinct regions, and each region stays readable. Use a lower third when it keeps useful picture. Full screen needs a story reason. Every metric has a supported value and a unit from the recording or the notes. A supporting image is a file the owner supplied. The shot under the overlay still carries its meaning.

The overlay is HTML, burned with ffmpeg onto the footage. Headline text on the overlay uses `--headline-gradient` when that token is set, and `--color-accent` when it is not. `--color-accent-2` is the second accent. Motion is `DeskTimeline`. Capture steps `__seek`. CSS is layout and color. On the burned frames, confirm the alpha channel, the layering, the text metrics, and that font loading succeeded. Read the installed ffmpeg help before you invent flags. Fonts are the files `brand.local` lists. When that list is empty, say the system face is in use. Do not vendor a font. Do not cover the mouth or the captions. Do not replace the footage.

After an edit change, resolve the cues again from that final transcript before the next burn.

Inspect before, during, and after: a frame ahead of the graphic, a frame while the fact is spoken, and a frame once it has left. Play that span with audio. Return the editable source and the render. Report uncertain timing and anything unrendered. If ffmpeg is not installed, stop and say the burn did not run. `check-short-export` is the last pass.
