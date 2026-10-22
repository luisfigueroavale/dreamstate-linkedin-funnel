---
name: talk-cut
description: "Join talking-head or screen takes, drop false starts, and keep the native picture. Use for a straight cut. It does not restyle the footage."
---

Follow `docs/skill-frame.md`.

Build one clean long-form picture from the raw recordings, and add nothing they did not ask for. Deliver a single named MP4. Store the project in the recording's `edit` folder, under a slug you choose. Leave every source recording untouched.

Saying "just cut and merge" is a yes for this strategy. Ask only if you cannot infer the order, or which material should stay.

## Defaults

Silence -45 dB. Minimum gap 600 ms. Pad 60 ms before and 150 ms after. 30 ms audio fades. Picture encode CRF 18, H.264, preset `medium`, `yuv420p`. Audio AAC 192k, 48 kHz stereo. Check with `ffprobe` and `loudnorm`.

Trim on a word, not in the middle of one. Do not resample the aspect. Do not blend faces. `brand.local` is not required unless you add type. Do not upload.

Usually you want the best complete performance, and that is the last attempt that finishes. Remove starts they abandoned, long dead air, and setup or search transitions that appear on screen. Keep short natural breaths. Keep the speaker's cadence. Keep the source resolution, the frame rate, the framing, and the colour.

`silencedetect` finds pauses. A useful starting point is -45 dB and a minimum of 600 ms. Remove the middle of a pause that qualifies, and retain about 180 ms in total, about 90 ms to either side. That retained length is `retain_seconds` 0.18, so the speech does not sound machine-cut. Do not clear every brief gap. Under 600 ms, a pause usually holds phrasing, emphasis, or a breath. Once the file is rendered, quiet that is still left, up to about 600 ms, may stay when the cadence sounds natural.

No colour grading unless they ask. The same goes for captions, music, compression, zooms, reframing, overlays, and graphics. A designed opener is `long-cut`.

## Retakes

On retakes, choose the last attempt that completes the thought. A dangling bit such as "So…", "and…", or a word that cuts off is not a take. Use the complete version that came before it.

Do not reorder the story unless they ask. When recordings are timestamped and nobody named a sequence, chronological order is the default.

## Boundaries

Phrase location can trust word starts. Word ends are weaker: they spill into the quiet and raise false alarms. The transcript picks the line. The waveform picks where silence starts and where it stops.

The normal pad is 60 ms before the first word and 150 ms after the last word. Widen it only for plosives, breaths, or room acoustics.

For a webcam plus a screen demo, dropping early tries and trimming the tail means the cut opens on word one of the last finished take. Close about 150 ms past the sign-off. Turn the pause trim off by setting `min_seconds` to 9999. Quiet removed while someone types or clicks makes the picture jump.

## Manual drops

Acoustic detection will not see every editorial transition. Mark these yourself:

- a false start that still contains speech
- an accidental selection, a menu, or cursor setup with no explanation attached
- hunting for a page or a file, a workflow, or a tab
- waiting while the interface loads
- a setup change that follows a spoken "Exactly", "Lovely", or a similar marker
- scene setup repeated until it says the next clip's opening again

Also mark the gaps silence cannot see: a screen search, a spoken transition marker, a failed restart, a setup phrase said twice. Finish every manual drop on a whole word. Keep a screen change when the viewer needs it to know where the next explanation happens.

## What the plan must contain

The cut is `plan.json`. What the plan must contain: sources in order, windows to keep, optional drops you marked, silence settings, and output settings.

Names of the fields stay these: `sources`, `id`, `path`, `keep`, `drop`, `start`, `end`, `reason`, `silence`, `threshold_db`, `min_seconds`, `retain_seconds`, `output`, `crf`, `preset`, `audio_bitrate`.

```json
{
  "silence": {
    "threshold_db": -45,
    "retain_seconds": 0.18,
    "min_seconds": 0.6
  },
  "output": {
    "audio_bitrate": "192k",
    "path": "/work/edit/camera-cut/final.mp4",
    "preset": "medium",
    "crf": 18
  },
  "sources": [
    {
      "drop": [
        {"reason": "menu hunting", "end": 21.0, "start": 18.25}
      ],
      "keep": [[12.4, 48.0], [51.2, 70.5]],
      "path": "/media/raw/camera.mp4",
      "id": "take-a"
    }
  ]
}
```

Merging follows the order of `sources`. Each `id` is unique and not blank. A `keep` entry is a pair of source-timeline seconds, and one source may carry several windows. A `drop` entry is source-timeline seconds as well, with `start`, `end`, and `reason`. Drops are intersected with whatever you kept. Absolute paths let the same plan render from any directory. Missing `silence` or `output` falls back to the defaults in this skill. Beside the plan you should find `edl.json`, the `segments` directory, `concat.txt`, and the MP4. Set `output.path` when that MP4 should live somewhere else.

## Failure modes

Failure modes stop the run before encode:

- `sources` is absent, empty, or not a list
- an `id` is blank, or the same id appears twice
- the path is relative, or the file is missing
- that source lists no keep window
- a keep pair is not two numbers, or the end does not land after the start
- `retain_seconds` is below zero, or it is not strictly less than `min_seconds`
- a drop is missing a numeric `start` or `end`
- the plan is missing, or it is not JSON

## Render

1. Inventory each named file with `ffprobe` for width, height, and `avg_frame_rate`. Use the order they gave. Timestamped files, with no order stated, follow recording time.
2. Transcribe just those files, at word level. Any word-timed transcript is enough. Uploading audio to a provider is optional. If the audio is not allowed to leave, cut from acoustic pauses alone.
3. Pick keep windows with the rules above. Boundaries come from word starts, with 60 ms of lead before the opening word and 150 ms of tail after the closing word.
4. Write the plan and render it:

```bash
python3 skills/talk-cut/scripts/render_plan.py "$PROJECT/plan.json"
```

`--output` moves the MP4. `--edl-only` writes the EDL and skips encode.

The script calls `silencedetect` with `threshold_db` and `min_seconds`. When quiet overlaps a keep window for at least `min_seconds`, the middle goes and half of `retain_seconds` stays on each side. Those cuts merge with the manual drops. Spans that touch or overlap fuse into one, and the reasons join with `"; "`. A leftover piece under 0.25 seconds is skipped.

`edl.json` uses version 1. It maps every id to a path. Each range has `source`, `start`, `end`, and `reason` (for example `long acoustic pause`, or `end of keep window` on the tail). Settings record `silence_threshold_db`, `minimum_silence_seconds`, `silence_retained_seconds`, `audio_fade_seconds` of 0.03, plus `width`, `height`, and `fps` from the first source. `selected_duration_s`, `removed_duration_s`, and `total_duration_s` are rounded to three decimals. The log prints those durations and the segment count.

Each kept span is encoded one time. Length snaps to a frame and is never under one frame. The picture chain is a lanczos fit, then pad, then `fps`, `setsar`, and `yuv420p`, on the first source's raster. Do not resample the aspect. The fit does not stretch, and it does not blend faces. There is no picture dissolve. Sound uses `atrim`, `apad`, and an `afade` in plus out on every kept edge, capped at a third of that span. Those 30 ms audio fades stop a click, and they stay too short to hear as a crossfade. The video encoder is libx264, high profile, bt709, tv range, with `+faststart`. Sound is AAC 192k at 48 kHz stereo. Join segments by stream copy. Do not run a second master encode merely because the pieces must be joined. Then decode to null, probe the file, and print `loudnorm`.

## Check

QA joins on the output timeline, from `edl.json`, rather than only at the source joins. A filmstrip and a waveform, together, should confirm:

- the opening frame and the closing frame are ones you meant
- where the screen jumps, it still matches the spoken thought
- dead air does not become a long gap
- the boundary has no click and no spike
- consonants are intact, and so is the word
- you do not see black, and you do not see a single-frame flash

Decode the whole file. Check duration, size, and codec metadata. Run black detection at `d=0.10` and `pix_th=0.05`, and silence detection at `noise=-45dB` with duration `0.60`. Inspect the opening, the midpoint, and the ending. Rebuild when that evidence shows a fault.

```bash
ffmpeg -i "$OUT" -v error -f null -
ffprobe -of json -show_entries format=duration,size:stream -v error "$OUT"
BLACK=blackdetect=d=0.10
BLACK=$BLACK:pix_th=0.05
ffmpeg -nostats -hide_banner -an -i "$OUT" -vf "$BLACK" -f null -
ffmpeg -nostats -hide_banner -i "$OUT" -af "silencedetect=noise=-45dB:d=0.6" -f null -
```

`loudnorm` is a reading of the encoded file, not a new grade and not a restyle. Repair a failed join and render again. Three passes is the stop; then report what remains.

## Report

State the file, runtime, size, resolution, frame rate, what was taken out, and how QA finished. Report each join as input, in-point, and out-point. Keep the transcript, the plan, the EDL, and the QA frames in the project folder. This skill does not upload.
