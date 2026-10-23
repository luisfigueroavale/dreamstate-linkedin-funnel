# Check

QA joins on the output timeline, from `edl.json`, rather than only at the source joins. A filmstrip and a waveform, together, should confirm:

- the opening frame and the closing frame are ones you meant

- where the screen jumps, it still matches the spoken thought

- dead air does not become a long gap

- the boundary has no click and no spike

- consonants are intact, and so is the word

- you do not see black, and you do not see a single-frame flash

Decode the whole file. Check duration, size, and codec metadata. Run black detection at `d=0.10` and `pix_th=0.05`, and silence detection at `noise=-45dB` with duration `0.60`.

Inspect the opening, the midpoint, and the ending. Rebuild when that evidence shows a fault.

```bash
ffmpeg -i "$OUT" -v error -f null -
ffprobe -of json -show_entries format=duration,size:stream -v error "$OUT"
BLACK=blackdetect=d=0.10
BLACK=$BLACK:pix_th=0.05
ffmpeg -nostats -hide_banner -an -i "$OUT" -vf "$BLACK" -f null -
ffmpeg -nostats -hide_banner -i "$OUT" -af "silencedetect=noise=-45dB:d=0.6" -f null -
```

`loudnorm` is a reading of the encoded file, not a new grade and not a restyle. Repair a failed join and render again.
