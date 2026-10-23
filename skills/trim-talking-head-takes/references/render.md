# Render

1. Inventory each named file with `ffprobe` for width, height, and `avg_frame_rate`.

2. Transcribe just those files, at word level. Any word-timed transcript is enough. Uploading audio to a provider is optional. If the audio is not allowed to leave, cut from acoustic pauses alone.

3. Pick keep windows with the rules above.

4. Write the plan and render it:

```bash
python3 skills/trim-talking-head-takes/scripts/render_plan.py "$PROJECT/plan.json"
```

`--output` moves the MP4. `--edl-only` writes the EDL and skips encode.

The script calls `silencedetect` with `threshold_db` and `min_seconds`. Those cuts merge with the manual drops. Spans that touch or overlap fuse into one, and the reasons join with `"; "`. A leftover piece under 0.25 seconds is skipped.

`edl.json` uses version 1. It maps every id to a path. Each range has `source`, `start`, `end`, and `reason` (for example `long acoustic pause`, or `end of keep window` on the tail).

Settings record `silence_threshold_db`, `minimum_silence_seconds`, `silence_retained_seconds`, `audio_fade_seconds` of 0.03, plus `width`, `height`, and `fps` from the first source.

`selected_duration_s`, `removed_duration_s`, and `total_duration_s` are rounded to three decimals. The log prints those durations and the segment count.

Each kept span is encoded one time. Length snaps to a frame and is never under one frame. The picture chain is a lanczos fit, then pad, then `fps`, `setsar`, and `yuv420p`, on the first source's raster.

The fit does not stretch. There is no picture dissolve. Sound uses `atrim`, `apad`, and an `afade` in plus out on every kept edge, capped at a third of that span.

The video encoder is libx264, high profile, bt709, tv range, with `+faststart`. Join segments by stream copy. Do not run a second master encode merely because the pieces must be joined.
