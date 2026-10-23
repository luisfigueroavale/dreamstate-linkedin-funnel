## Level and the encoded file

Hit -14 LUFS integrated and -1.5 dBTP on the encoded file. One constant gain, then a limiter 0.5 dB under the peak target, so the encode has room. Do not ride gain per frame. `loudness.i` and `loudness.tp` override those targets when set. `loudness.lra` may be written as 11.

The checker does not measure loudness range.

This pass does not turn on EQ or compression because a voice field was left out. Level and noise stay with `fix-short-audio`. Use the cut's frame rate. Measure the file you encoded.

With `--media`, the checker fails the file when a full decode writes errors, duration is 0.1 seconds or more off the cut, integrated loudness is more than 1 LU from the target, the summary peak from `ebur128=peak=true` is above the target, or `blackdetect` finds a stretch at `d=0.10` and `pix_th=0.05`.

This ffmpeg prints that true-peak summary as dBFS.

`ffprobe` reports duration, streams, and frame size. Frame size stays the native size of the cut. If `ffmpeg` or `ffprobe` is missing, the file was not checked, and a missing tool is not a pass.

If the cut file is on disk, its probed length must agree with the frame-snapped ranges within 0.1 seconds.

A grade, only when they ask, needs the offset of graded time zero on the ungraded source. Sampled pairs fail when luma correlation is under 0.9. Frames run from 0.3 seconds in to 0.3 seconds before the end, ten by default.

A printed mean absolute error, in steps out of 255, is not a reject line.

Values in a baked cube stay inside 0 to 1. `lock-check.mjs` samples nothing and writes no cube, so it cannot pass a grade. Correlation means the frames line up. It is not a test of matching light.

A noise print needs silence of at least 0.8 seconds at -55 dB or quieter. Keep the sample 0.15 seconds inside the detected edges. No such stretch means stop. Leave out a denoise that invents texture, and leave out a per-frame loudness ride.

Those limits are not in the checker.

If a denoise adds delay, remove that delay or the mouth drifts. Cuts use the same frame rounding as the picture so the join stays lined up.

Music only when the plan names a file the owner may use. `music: null` means none. Sections, gain, and fade are mix notes. The checker does not test the right, and it does not measure ducking.
