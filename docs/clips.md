# Clips and longer cuts

Local files only. ffmpeg does the cut. You supply the recording. The agent does not upload it, does not generate a face, and does not send the file to a video host.

Skills, in the order a short usually needs:

| Skill | Job |
|---|---|
| `talk-cut` | Join takes. Drop false starts on a word boundary. Keep the native frame size. |
| `clip-select` | Choose the takes that say the thing. |
| `clip-audio` | Measure loudness. Touch noise only when you can hear the problem. |
| `clip-motion` | Burn a cue-timed HTML overlay that does not cover the mouth or the captions. |
| `clip-assemble` | Run those in order and write one file. |
| `clip-check` | Probe the export before you call it done. |
| `footage-pass` | Review a cut from a transcript you supply, or from a silence map if you do not. |
| `picture-lock` | One pass from an edit list to a captioned file. |
| `long-cut` | A still opener from `frame-build`, then the screen recording, then chapters. |
| `release-reel` | A short launch cut from a beat list and assets you already have. |
| `record-script` | What you will say, before you record. |
| `video-blurb` | Description and chapters from the final transcript. |
| `video-hold` | Package the folder. Do not upload. |
| `step-motion` | A process drawn in HTML. Motion is the JavaScript timeline. Capture with `scripts/capture-motion.mjs`. The still is the last seek. |

If ffmpeg is missing, stop and say so. Do not substitute a cloud encoder.

Captions use an SRT whose cues match the audio you kept. System fonts only. Do not vendor a font. Do not add background boxes behind every word unless the owner asks.

A still of the speaker, if you need one, is a frame from their footage, not a generated portrait.
