# Plan

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

Merging follows the order of `sources`. Each `id` is unique and not blank. A `keep` entry is a pair of source-timeline seconds, and one source may carry several windows.

A `drop` entry is source-timeline seconds as well, with `start`, `end`, and `reason`. Drops are intersected with whatever you kept. Absolute paths let the same plan render from any directory.

Missing `silence` or `output` falls back to the defaults in this skill. Beside the plan you should find `edl.json`, the `segments` directory, `concat.txt`, and the MP4. Set `output.path` when that MP4 should live somewhere else.
