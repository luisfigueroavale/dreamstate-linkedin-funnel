---
name: release-reel
description: "Cut a short launch piece from a beat list and assets the owner already has. Use for a launch. It does not generate footage or a face."
---

Follow `docs/skill-frame.md`.

Read the product brief and how the feature actually behaves. Set the audience, the runtime, the aspect, the one message, and the output. This skill is the procedure. The renderer is the repo's capture scripts. A voice file or a music file they already have is an input. Paid voice or music is a separate yes, with the scope and the budget named. The owner picks the voice. Use music only when their license covers this cut. Do not pick a recurring service in silence, and do not imitate a real person's voice.

Beat sheet: spoken line, visual action, the evidence or asset, and a target duration. The spoken line has to be true of the feature on that screen. Do not invent a metric. Use assets they already have. Do not generate footage. Every screen is a real feature, or it is labeled concept or demo. Keep the script next to the scene source so a revision cannot leave them apart. Narration text and beat times live in one file.

Before you build, read `pictures/timeline.js` and `scripts/capture-motion.mjs`. Motion is `DeskTimeline`. `DeskTimeline.install` sets `__seek`. That script steps it. CSS does not animate. Align pictures to measured word cues.

A prebuilt scene library is dropped: a ready-made kit would put up a screen that is not this feature, and each screen is HTML for this launch so a later capture rebuilds the piece. An automatic uploader is dropped: the job ends when the file is on disk, and an upload waits for a separate yes.

Render a short slice first. Inspect type, timing, and audio. Then render the whole piece with `scripts/capture-motion.mjs`, which seeks `__seek`. Keep exports out of the source folder. Run `clip-check` on the file. Confirm codec and that the file plays.

Deliver the video, the editable HTML, the script, asset credits (file, source, license), and what you actually checked. When the piece has a title or an overlay, read `brand.local` before you draw it. A cut does not need `brand.local`. A title or overlay does. No generated face. No upload.
