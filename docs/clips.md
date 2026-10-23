# Clips and longer cuts

Local files only. ffmpeg does the cut. You supply the recording. The agent does not upload it, does not generate a face, and does not send the file to a video host.

Skills, in the order a short usually needs:

| Skill | Job |
|---|---|
| `trim-talking-head-takes` | Join takes. Drop false starts on a word boundary. Keep the native frame size. |
| `pick-short-takes` | Choose the takes that say the thing. |
| `fix-short-audio` | Measure loudness. Touch noise only when you can hear the problem. |
| `add-short-overlay` | Burn a cue-timed HTML overlay that does not cover the mouth or the captions. |
| `assemble-short` | Run those in order and write one file. |
| `check-short-export` | Probe the export before you call it done. |
| `cut-raw-footage` | Review a cut from a transcript you supply, or from a silence map if you do not. |
| `render-captioned-video` | One pass from an edit list to a captioned file. |
| `edit-long-video` | A still opener from `design-post-graphic`, then the screen recording, then chapters. |
| `make-launch-clip` | A short launch cut from a beat list and assets you already have. |
| `write-video-script` | What you will say, before you record. |
| `write-video-description` | Description and chapters from the final transcript. |
| `publish-youtube-video` | Package the folder. Do not upload. |
| `animate-process` | A process drawn in HTML. Motion is the JavaScript timeline. Capture with `scripts/capture-motion.mjs`. The still is the last seek. |

When ffmpeg is not installed, stop and tell the owner. Do not switch to a cloud encoder.

Captions use an SRT whose cues match the audio you kept. Fonts come from files listed in `brand.local/assets/README.md`. If that list is empty, say the burn is using the system face. Do not vendor a font. Do not add background boxes behind every word unless the owner asks.

`brand.local` is required for titles and overlays. A cut that only trims picture and sound does not need it. Loudness target for `render-captioned-video`, `edit-long-video`, and `fix-short-audio` is -14 LUFS integrated and -1.5 dBTP.

`trim-talking-head-takes` drops silence at -45 dB, with a minimum gap of 600 ms, 60 ms of pad before the word and 150 ms after, 30 ms audio fades, CRF 18, and AAC at 192k. Check with `ffprobe` and `loudnorm`.

A still of the speaker, if you need one, is a frame from their footage, not a generated portrait.
