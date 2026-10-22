---
name: clip-audio
description: "Measure speech loudness and apply only a fix you can hear. Use when the recording is harsh, quiet, or rumbling. It does not master for a platform."
---

Follow `docs/skill-frame.md`.

Measure first. Listen to the original. With the audio tools installed here, record sample rate, channel count, loudness, and peaks. Treat the fault that is actually present. Keep the problems apart: room tone, low level, clipping, noise, and uneven delivery. Touch noise only when you can hear it. Raising the level does not denoise.

Use the smallest useful change. Where headroom allows it, one constant gain keeps the dynamics. Add compression or limiting only when that gain is not enough, and make the choice deliberate. Listen for pumping, for consonants that clip, and for room tone that drops out. Read the filter help before you run it. A linear mode can be limited or missing in the filter you have.

For noise reduction, capture representative silence from this take. At matched loudness, compare the speech from before the filter with the speech after it. Reject a pass that burbles, or that strips texture from the voice. Do not copy a preset from another recording, and do not bring over a denoiser setting or a fixed gain.

Order the chain as channels, with conversion when the layout is wrong, then EQ, then dynamics, then the final level. Target -14 LUFS integrated and -1.5 dBTP. In the final mix, listen for music, sound effects, overlapping peaks, and any change between mono and stereo.

Measure the encoded file and listen to it beside the original, not only the intermediate PCM. `brand.local` is not required for a loudness pass. Report the treatment, the numbers, and the audible tradeoff. `clip-check` covers the combined file.
