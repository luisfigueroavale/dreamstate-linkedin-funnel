---
name: clip-check
description: "Probe an export for duration, audio, and caption timing. Use before calling a video done. It does not approve publishing."
---

Follow `docs/skill-frame.md`.

Probe before you call the file done. Duration matches the edit list. Audio is present. Integrated loudness is near -14 LUFS and true peak is at or under -1.5 dBTP. Caption cues sit on the words. Frame size is the native size. The first second does not fade to black by accident. Use `ffprobe`. A pass here is not permission to publish.
