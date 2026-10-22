---
name: clip-check
description: "Probe an export for duration, audio, and caption timing. Use before calling a video done. It does not approve publishing."
---

# Check the export

`ffprobe` the file. Report duration, size, codec, and whether audio is present. If an SRT exists, confirm the last cue ends before the file ends. Spot a frame at the start, the middle, and the end with ffmpeg. Say if a frame is unexpectedly black.

Do not say the piece passed taste. That is `brand/taste.md`, and it still needs a person when the check is visual.

## Done

The probe fields and any fault.
