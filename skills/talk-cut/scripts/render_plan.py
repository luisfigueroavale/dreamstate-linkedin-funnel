#!/usr/bin/env python3
"""Build a straight cut from plan JSON. Joins do not blend the picture."""

from __future__ import annotations

import json
import subprocess
import sys
from fractions import Fraction
from pathlib import Path


MIN_PIECE_S = 0.25
FADE_S = 0.03
Span = tuple[float, float, str]


def run_cmd(argv: list[str], *, ok: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(argv, check=ok, text=True, capture_output=True)


def halt(text: str) -> None:
    raise SystemExit(text)


def add(cmd: list[str], *bits: str) -> None:
    for bit in bits:
        cmd.append(bit)


def read_raster(media: Path) -> dict:
    cmd: list[str] = []
    add(cmd, "ffprobe", "-v", "error")
    add(cmd, "-of", "json")
    add(cmd, "-select_streams", "v:0")
    add(cmd, "-show_entries")
    add(cmd, "stream=avg_frame_rate,height,width")
    add(cmd, str(media))
    proc = run_cmd(cmd)
    stream = json.loads(proc.stdout)["streams"][0]
    rate = Fraction(str(stream["avg_frame_rate"]))
    return {
        "w": int(stream["width"]),
        "h": int(stream["height"]),
        "rate": rate,
        "rate_s": f"{rate.numerator}/{rate.denominator}",
    }


def listed_quiet(media: Path, db: float, shortest: float) -> list[tuple[float, float]]:
    cmd: list[str] = []
    add(cmd, "ffmpeg", "-hide_banner")
    add(cmd, "-nostats", "-i", str(media))
    add(cmd, "-af", f"silencedetect=noise={db}dB:d={shortest}")
    add(cmd, "-f", "null", "-")
    proc = run_cmd(cmd, ok=False)
    found: list[tuple[float, float]] = []
    cursor: float | None = None
    for raw in proc.stderr.splitlines():
        if "silence_start:" in raw:
            cursor = float(raw.split("silence_start:", 1)[1].split()[0])
            continue
        if "silence_end:" not in raw or cursor is None:
            continue
        stop = float(raw.split("silence_end:", 1)[1].split()[0])
        found.append((cursor, stop))
        cursor = None
    return found


def glue(rows: list[Span]) -> list[Span]:
    rows = sorted(rows, key=lambda item: (item[0], item[1]))
    out: list[Span] = []
    for start, end, why in rows:
        if end <= start:
            continue
        if out and start <= out[-1][1]:
            prev = out[-1]
            out[-1] = (prev[0], max(prev[1], end), prev[2] + "; " + why)
        else:
            out.append((start, end, why))
    return out


def pieces_of(begin: float, finish: float, cuts: list[Span]) -> list[Span]:
    kept: list[Span] = []
    at = begin
    for start, end, why in cuts:
        left = max(begin, start)
        right = min(finish, end)
        if right <= at or left >= finish:
            continue
        if (left - at) >= MIN_PIECE_S:
            kept.append((at, left, why))
        if right > at:
            at = right
    if (finish - at) >= MIN_PIECE_S:
        kept.append((at, finish, "end of keep window"))
    return kept


def shared_seconds(a0: float, a1: float, b0: float, b1: float) -> float:
    lo = a0 if a0 > b0 else b0
    hi = a1 if a1 < b1 else b1
    span = hi - lo
    if span > 0:
        return span
    return 0.0


def check_sources(plan: dict) -> list[dict]:
    block = plan.get("sources")
    if type(block) is not list or len(block) < 1:
        halt("sources list is missing or empty")
    seen: list[str] = []
    for item in block:
        label = item.get("id")
        label_s = label.strip() if isinstance(label, str) else ""
        if label_s == "" or label_s in seen:
            halt("each source id has to be filled in and unique")
        seen.append(label_s)
        target = Path(str(item.get("path", ""))).expanduser()
        if (not target.is_absolute()) or (not target.exists()):
            halt("need an absolute path that exists: %s" % target)
        windows = item.get("keep")
        if type(windows) is not list or len(windows) < 1:
            halt("keep windows are required for %s" % label_s)
        for pair in windows:
            bad = not isinstance(pair, (list, tuple)) or len(pair) != 2
            if bad or float(pair[1]) <= float(pair[0]):
                halt("bad keep window for %s: %s" % (label_s, pair))
        for drop in item.get("drop") or []:
            if "start" not in drop or "end" not in drop:
                halt(f"{label_s} drop needs numeric start and end")
            try:
                float(drop["start"])
                float(drop["end"])
            except (TypeError, ValueError):
                halt(f"{label_s} drop needs numeric start and end")
    return block


def quiet_settings(plan: dict) -> tuple[float, float, float]:
    block = plan.get("silence") or {}
    db = float(block.get("threshold_db", -45))
    shortest = float(block.get("min_seconds", 0.6))
    retain = float(block.get("retain_seconds", 0.18))
    if retain < 0 or not (retain < shortest):
        halt("retain_seconds has to be zero or higher, and shorter than min_seconds")
    return db, shortest, retain


def timeline(plan: dict, rasters: dict[str, dict]) -> dict:
    db, shortest, retain = quiet_settings(plan)
    half = retain / 2.0
    ranges: list[dict] = []
    chosen = 0.0
    cut_away = 0.0
    for item in plan["sources"]:
        label = item["id"]
        media = Path(item["path"])
        heard = listed_quiet(media, db, shortest)
        marked = []
        for drop in item.get("drop") or []:
            marked.append(
                (float(drop["start"]), float(drop["end"]), str(drop.get("reason", "manual drop")))
            )
        for window in item["keep"]:
            a = float(window[0])
            b = float(window[1])
            chosen += b - a
            pending = list(marked)
            for q0, q1 in heard:
                left = a if a > q0 else q0
                right = b if b < q1 else q1
                if (right - left) < shortest:
                    continue
                cut_a = left + half
                cut_b = right - half
                if cut_b > cut_a:
                    pending.append((cut_a, cut_b, "long acoustic pause"))
            fused = glue(pending)
            for c0, c1, _why in fused:
                cut_away += shared_seconds(a, b, c0, c1)
            for start, end, why in pieces_of(a, b, fused):
                row = {
                    "reason": why,
                    "end": round(end, 3),
                    "start": round(start, 3),
                    "source": label,
                }
                ranges.append(row)
    total = 0.0
    for row in ranges:
        total += row["end"] - row["start"]
    first = rasters[plan["sources"][0]["id"]]
    settings = {
        "fps": first["rate_s"],
        "height": first["h"],
        "width": first["w"],
        "audio_fade_seconds": FADE_S,
        "silence_retained_seconds": retain,
        "minimum_silence_seconds": shortest,
        "silence_threshold_db": db,
    }
    return {
        "total_duration_s": round(total, 3),
        "removed_duration_s": round(cut_away, 3),
        "selected_duration_s": round(chosen, 3),
        "settings": settings,
        "ranges": ranges,
        "sources": {item["id"]: item["path"] for item in plan["sources"]},
        "version": 1,
    }


def final_path(plan: dict, folder: Path, override: Path | None) -> Path:
    if override is not None:
        dest = Path(override).expanduser()
    else:
        raw = (plan.get("output") or {}).get("path", folder / "final.mp4")
        dest = Path(raw).expanduser()
    if not dest.is_absolute():
        dest = (folder / dest).resolve()
    dest.parent.mkdir(parents=True, exist_ok=True)
    return dest


def snapped(seconds: float, rate: Fraction) -> float:
    per = float(rate)
    frames = round(seconds * per)
    if frames < 1:
        frames = 1
    return frames / per


def fit_chain(span: float, w: int, h: int, rate_s: str) -> str:
    trim = "trim=duration=" + format(span, ".9f")
    reset = "setpts=PTS-STARTPTS"
    scale = "scale=%d:%d:flags=lanczos:force_original_aspect_ratio=decrease" % (w, h)
    pad = "pad=%d:%d:(ow-iw)/2:(oh-ih)/2" % (w, h)
    rate = "fps=" + rate_s
    square = "setsar=1"
    pixels = "format=yuv420p"
    return ",".join([trim, reset, scale, pad, rate, square, pixels])


def sound_chain(span: float, fade: float) -> str:
    used = fade if fade < (span / 3.0) else (span / 3.0)
    out_at = span - used
    if out_at < 0:
        out_at = 0.0
    head = "atrim=duration=" + format(span, ".9f")
    reset = "asetpts=PTS-STARTPTS"
    pad = "apad=whole_dur=" + format(span, ".9f")
    tail = "atrim=duration=" + format(span, ".9f")
    fade_in = "afade=t=in:d=%0.3f:st=0" % used
    fade_out = "afade=t=out:d=%0.3f:st=%0.3f" % (used, out_at)
    return ",".join([head, reset, pad, tail, fade_in, fade_out])


def write_parts(plan: dict, edl: dict, folder: Path, dest: Path) -> None:
    cfg = plan.get("output") or {}
    crf = str(cfg.get("crf", 18))
    preset = str(cfg.get("preset", "medium"))
    bitrate = str(cfg.get("audio_bitrate", "192k"))
    w = int(edl["settings"]["width"])
    h = int(edl["settings"]["height"])
    rate = Fraction(str(edl["settings"]["fps"]))
    fade = float(edl["settings"]["audio_fade_seconds"])
    parts_dir = folder / "segments"
    parts_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    for index, row in enumerate(edl["ranges"], start=1):
        media = Path(edl["sources"][row["source"]])
        start = float(row["start"])
        span = snapped(float(row["end"]) - start, rate)
        part = parts_dir / f"part-{index:04d}.mp4"
        cmd: list[str] = []
        add(cmd, "ffmpeg", "-y")
        add(cmd, "-loglevel", "error")
        add(cmd, "-hide_banner")
        add(cmd, "-ss", f"{start:.3f}")
        add(cmd, "-i", str(media))
        add(cmd, "-t", f"{span:.9f}")
        add(cmd, "-map", "0:v:0")
        add(cmd, "-map", "0:a:0")
        add(cmd, "-vf", fit_chain(span, w, h, edl["settings"]["fps"]))
        add(cmd, "-af", sound_chain(span, fade))
        add(cmd, "-c:v", "libx264")
        add(cmd, "-preset", preset)
        add(cmd, "-crf", crf)
        add(cmd, "-profile:v", "high")
        add(cmd, "-pix_fmt", "yuv420p")
        add(cmd, "-color_primaries", "bt709")
        add(cmd, "-color_trc", "bt709")
        add(cmd, "-colorspace", "bt709")
        add(cmd, "-color_range", "tv")
        add(cmd, "-c:a", "aac")
        add(cmd, "-b:a", bitrate)
        add(cmd, "-ar", "48000")
        add(cmd, "-ac", "2")
        add(cmd, "-movflags", "+faststart")
        add(cmd, str(part))
        run_cmd(cmd)
        if measured_seconds(part) <= 0:
            halt("encoded part has no duration: %s" % part)
        written.append(part)
        print(f"input={media} in-point={start:.3f} out-point={float(row['end']):.3f}")
    listing = folder / "concat.txt"
    body = []
    for part in written:
        safe = str(part.resolve()).replace("'", "'\\''")
        body.append("file '%s'\n" % safe)
    listing.write_text("".join(body))
    join: list[str] = []
    add(join, "ffmpeg", "-y")
    add(join, "-loglevel", "error")
    add(join, "-hide_banner")
    add(join, "-f", "concat")
    add(join, "-safe", "0")
    add(join, "-i", str(listing))
    add(join, "-c", "copy")
    add(join, "-movflags", "+faststart")
    add(join, str(dest))
    run_cmd(join)
    verify: list[str] = []
    add(verify, "ffmpeg", "-v", "error")
    add(verify, "-i", str(dest))
    add(verify, "-f", "null", "-")
    run_cmd(verify)


def loudness_block(media: Path) -> str:
    cmd: list[str] = []
    add(cmd, "ffmpeg", "-hide_banner")
    add(cmd, "-i", str(media))
    add(cmd, "-af", "loudnorm=print_format=json")
    add(cmd, "-f", "null", "-")
    proc = run_cmd(cmd, ok=False)
    blob = proc.stderr
    start = blob.rfind("{")
    stop = blob.rfind("}")
    if start < 0 or stop < start:
        return ""
    return blob[start : stop + 1]


def measured_seconds(media: Path) -> float:
    cmd: list[str] = []
    add(cmd, "ffprobe", "-v", "error")
    add(cmd, "-of", "json")
    add(cmd, "-show_entries", "format=duration")
    add(cmd, str(media))
    proc = run_cmd(cmd, ok=False)
    try:
        raw = json.loads(proc.stdout)["format"].get("duration")
        return float(raw)
    except (json.JSONDecodeError, KeyError, TypeError, ValueError):
        return 0.0


def probe_summary(media: Path) -> str:
    cmd: list[str] = []
    add(cmd, "ffprobe", "-v", "error")
    add(cmd, "-of", "json")
    add(cmd, "-show_entries", "format=duration,size:stream=codec_name,width,height,avg_frame_rate")
    add(cmd, str(media))
    return run_cmd(cmd).stdout.strip()


def take_args(argv: list[str]) -> tuple[Path, Path | None, bool]:
    plan_arg: Path | None = None
    output: Path | None = None
    edl_only = False
    index = 0
    while index < len(argv):
        item = argv[index]
        if item == "--edl-only":
            edl_only = True
        elif item == "--output":
            index += 1
            if index >= len(argv):
                halt("--output needs a path")
            output = Path(argv[index])
        elif plan_arg is None and not item.startswith("--"):
            plan_arg = Path(item)
        else:
            halt("unexpected argument: %s" % item)
        index += 1
    if plan_arg is None:
        halt("pass the plan json path")
    return plan_arg, output, edl_only


def main() -> None:
    plan_arg, output, edl_only = take_args(sys.argv[1:])
    plan_path = plan_arg.expanduser().resolve()
    if not plan_path.is_file():
        halt("missing plan: %s" % plan_path)
    try:
        plan = json.loads(plan_path.read_text())
    except json.JSONDecodeError as exc:
        halt("plan is not valid JSON: %s" % exc)
    check_sources(plan)
    rasters = {}
    for item in plan["sources"]:
        rasters[item["id"]] = read_raster(Path(item["path"]))
    edl = timeline(plan, rasters)
    folder = plan_path.parent
    edl_file = folder.joinpath("edl.json")
    payload = json.dumps(edl, indent=2)
    edl_file.write_text(payload + "\n")
    print(
        "selected_s=%.2f removed_s=%.2f output_s=%.2f segments=%d"
        % (
            edl["selected_duration_s"],
            edl["removed_duration_s"],
            edl["total_duration_s"],
            len(edl["ranges"]),
        )
    )
    if edl_only:
        print(edl_file)
        return
    dest = final_path(plan, folder, output)
    write_parts(plan, edl, folder, dest)
    print(probe_summary(dest))
    print(loudness_block(dest))
    print(dest)


if __name__ == "__main__":
    main()
