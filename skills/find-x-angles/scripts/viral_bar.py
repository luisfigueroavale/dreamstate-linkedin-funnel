#!/usr/bin/env python3
"""Apply the viral bar to a saved set of posts and rank by the author's own average. No network.

A post clears the bar with 200 or more likes, or 10,000 or more views.
The author average is mean(likes + bookmarks) over that author's recent posts in the
history file, leaving out the post being scored. Fewer than MIN_SAMPLE posts means unknown.
"""

import json
import sys
# local
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
# local
from hold_median import author_of, dedupe_key, load_posts, lookup_metric  # noqa: E402

LIKES_BAR = 200
VIEWS_BAR = 10000
MIN_SAMPLE = 10
BAND_LOW = 5
BAND_HIGH = 10
TIER_ORDER = {"5-10x": 0, "over 10x": 1, "under 5x": 2, "unknown": 3}


def post_id(post):
    value = post.get("id", post.get("post_id"))
    return str(value).strip() if value is not None and str(value).strip() else None


def engagement(post):
    likes = lookup_metric(post, "likes")
    bookmarks = lookup_metric(post, "bookmarks")
    if likes is None:
        return None
    return likes + (bookmarks or 0)


def clears(post):
    likes = lookup_metric(post, "likes")
    views = lookup_metric(post, "views")
    reasons = []
    if likes is not None and likes >= LIKES_BAR:
        reasons.append(f"likes {likes} >= {LIKES_BAR}")
    if views is not None and views >= VIEWS_BAR:
        reasons.append(f"views {views} >= {VIEWS_BAR}")
    return bool(reasons), reasons


def history_by_author(rows):
    by_author = {}
    seen = set()
    for index, post in enumerate(rows):
        key = dedupe_key(post, index)
        if key in seen:
            continue
        seen.add(key)
        author = author_of(post)
        score = engagement(post)
        if author and score is not None:
            by_author.setdefault(author, []).append((post_id(post), score))
    return by_author


def tier_of(multiple):
    if multiple is None:
        return "unknown"
    if multiple > BAND_HIGH:
        return "over 10x"
    if multiple >= BAND_LOW:
        return "5-10x"
    return "under 5x"


def score(post, history):
    author = author_of(post)
    ok, reasons = clears(post)
    own = engagement(post)
    pid = post_id(post)
    sample = [value for other_id, value in history.get(author, []) if pid is None or other_id != pid]
    average = sum(sample) / len(sample) if len(sample) >= MIN_SAMPLE else None
    multiple = None
    if own is not None and average:
        multiple = round(own / average, 2)
    url = post.get("url") or post.get("post_url") or post.get("link")
    if not url and author and pid:
        url = f"https://x.com/{author}/status/{pid}"
    return {
        "id": pid,
        "url": url,
        "author": author,
        "likes": lookup_metric(post, "likes"),
        "bookmarks": lookup_metric(post, "bookmarks"),
        "reposts": lookup_metric(post, "reposts"),
        "replies": lookup_metric(post, "replies"),
        "views": lookup_metric(post, "views"),
        "clears_bar": ok,
        "bar_reason": reasons,
        "author_sample": len(sample),
        "author_average": round(average, 2) if average is not None else None,
        "multiple": multiple,
        "tier": tier_of(multiple),
    }


def rank_key(row):
    return (
        not row["clears_bar"],
        TIER_ORDER[row["tier"]],
        -(row["multiple"] or 0),
        -(row["likes"] or 0),
    )


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        sys.stdout.write(
            "Usage: viral_bar.py <candidates.json> [--history <author-posts.json>]\n"
            "Applies the bar and ranks by the author's own average. Does not contact a network.\n"
        )
        return 0 if argv else 1
    try:
        candidates_path = Path(argv[0])
        history_path = None
        if len(argv) == 3 and argv[1] == "--history":
            history_path = Path(argv[2])
        elif len(argv) != 1:
            raise ValueError("Unexpected arguments")
        candidates = load_posts(json.loads(candidates_path.read_text()))
        history_rows = load_posts(json.loads(history_path.read_text())) if history_path else candidates
        history = history_by_author(history_rows)
        seen = set()
        rows = []
        for index, post in enumerate(candidates):
            key = dedupe_key(post, index)
            if key in seen:
                continue
            seen.add(key)
            rows.append(score(post, history))
        rows.sort(key=rank_key)
        payload = {
            "scope": "this file only",
            "likes_bar": LIKES_BAR,
            "views_bar": VIEWS_BAR,
            "min_author_sample": MIN_SAMPLE,
            "cleared_count": sum(1 for row in rows if row["clears_bar"]),
            "unique_count": len(rows),
            "posts": rows,
        }
        sys.stdout.write(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    except (OSError, ValueError, TypeError, json.JSONDecodeError) as error:
        sys.stderr.write(str(error) + "\n")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
