# Silence

`silencedetect` finds pauses. A useful starting point is -45 dB and a minimum of 600 ms.

Remove the middle of a pause that qualifies, and retain about 180 ms in total, about 90 ms to either side.

That retained length is `retain_seconds` 0.18, so the speech does not sound machine-cut. Do not clear every brief gap.

Under 600 ms, a pause usually holds phrasing, emphasis, or a breath. Once the file is rendered, quiet that is still left, up to about 600 ms, may stay when the cadence sounds natural.
