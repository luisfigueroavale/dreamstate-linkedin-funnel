---
name: fix-short-audio
description: "Measure speech loudness and apply only a fix you can hear. Use when the recording is harsh, quiet, or rumbling. It does not master for a platform."
---
# Fix short audio

Measure speech loudness and apply only a fix you can hear.
Follow `docs/skill-frame.md`.

## Use when

- Use when the recording is harsh, quiet, or rumbling.

- Not for mastering for a platform. The combined file goes to `check-short-export`.

## Steps

1. Measure first (`references/measure.md`).

2. Listen to the original (`references/measure.md`).

3. Treat (`references/faults.md`).

4. Use the smallest useful change (`references/gain.md`).

5. Capture (`references/noise.md`).

6. Order (`references/chain.md`).

7. Measure (`references/report.md`).
## Dreamstate tools

None. Local files only.

## Stop rules

- Touch noise only when you can hear it.

- Raising the level does not denoise.

- Reject a pass that burbles, or that strips texture from the voice.

- Do not copy a preset from another recording, and do not bring over a denoiser setting or a fixed gain.

- It does not master for a platform.

- `brand.local` is not required for a loudness pass.
