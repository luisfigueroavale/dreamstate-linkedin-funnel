#!/usr/bin/env python3
"""Score a saved set of posts. Views per day versus that account's median in this file. No network."""

import json
import statistics
import sys
from datetime import datetime, timezone
from pathlib import Path


METRICS = ("likes", "bookmarks", "replies", "reposts", "quotes", "views")
# Flat names a paste or a public post object may already use. Missing stays missing.
ALIASES = {
    "likes": ("likes", "like_count", "favorite_count"),
    "bookmarks": ("bookmarks", "bookmark_count"),
    "replies": ("replies", "reply_count"),
    "reposts": ("reposts", "repost_count", "retweet_count"),
    "quotes": ("quotes", "quote_count"),
    "views": ("views", "view_count", "impression_count"),
}


def clock(value, label):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(label + " is empty")
    text = value.strip()
    if text[-1] in "Zz":
        text = text[:-1] + "+00:00"
    when = datetime.fromisoformat(text)
    if when.utcoffset() is None:
        raise ValueError(label + " must include an offset")
    return when.astimezone(timezone.utc)


def as_number(value):
    if isinstance(value, bool) or value is None:
        return None
    if isinstance(value, (int, float)):
        return value
    if isinstance(value, str):
        token = value.strip().replace(",", "")
        if not token:
            return None
        try:
            return float(token) if "." in token else int(token)
        except ValueError:
            return None
    return None


def lookup_metric(post, name):
    bags = [post]
    for key in ("metrics", "public_metrics"):
        nested = post.get(key)
        if isinstance(nested, dict):
            bags.append(nested)
    for bag in bags:
        for alias in ALIASES[name]:
            if alias in bag:
                return as_number(bag.get(alias))
    return None


def text_of(post):
    chunks = []
    for key in ("text", "full_text", "body"):
        value = post.get(key)
        if isinstance(value, str) and value.strip():
            chunks.append(value.strip())
    if not chunks:
        return None
    return max(chunks, key=len)


def author_of(post):
    for key in ("author", "handle", "username"):
        value = post.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip().lstrip("@").lower()
    user = post.get("user")
    if isinstance(user, dict):
        for key in ("username", "handle", "screen_name"):
            value = user.get(key)
            if isinstance(value, str) and value.strip():
                return value.strip().lstrip("@").lower()
    return None


def date_of(post):
    for key in ("date", "published_at", "created_at"):
        value = post.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()
    return None


def load_posts(document):
    if isinstance(document, list):
        rows = document
    elif isinstance(document, dict):
        for key in ("posts", "items"):
            if isinstance(document.get(key), list):
                rows = document[key]
                break
        else:
            data = document.get("data")
            if isinstance(data, list):
                rows = data
            else:
                raise ValueError("Expected a list of posts, or an object with posts")
    else:
        raise ValueError("Expected a JSON list or object")
    if not all(isinstance(row, dict) for row in rows):
        raise ValueError("Each post must be an object")
    return rows


def dedupe_key(post, index):
    post_id = post.get("id", post.get("post_id"))
    if post_id is not None and str(post_id).strip():
        return "id:" + str(post_id).strip()
    url = post.get("url") or post.get("post_url") or post.get("link")
    if isinstance(url, str) and url.strip():
        return "url:" + url.strip()
    return "row:" + str(index)


def build(post, captured_at):
    author = author_of(post)
    raw_date = date_of(post)
    post_id = post.get("id", post.get("post_id"))
    post_id = str(post_id).strip() if post_id is not None and str(post_id).strip() else None
    url = post.get("url") or post.get("post_url") or post.get("link")
    url = url.strip() if isinstance(url, str) and url.strip() else None
    if url is None and author and post_id:
        url = f"https://x.com/{author}/status/{post_id}"
    metrics = {name: lookup_metric(post, name) for name in METRICS}
    missing = [name for name, value in metrics.items() if value is None]
    if author is None:
        missing.append("author")
    published = None
    if raw_date is None:
        missing.append("date")
    else:
        try:
            published = clock(raw_date, "date")
        except ValueError:
            missing.append("date")
    views_per_day = None
    if metrics["views"] is not None and published is not None:
        age_days = (captured_at - published).total_seconds() / 86400
        if age_days > 0:
            views_per_day = metrics["views"] / age_days
        else:
            missing.append("age")
    if url is None:
        missing.append("url")
    return {
        "id": post_id,
        "url": url,
        "author": author,
        "date": published.isoformat() if published else raw_date,
        "text": text_of(post),
        "metrics": metrics,
        "missing": missing,
        "views_per_day": views_per_day,
        "views_returned_zero": metrics["views"] == 0,
    }


def mark(rows):
    by_author = {}
    for row in rows:
        rate = row["views_per_day"]
        author = row["author"]
        if author and rate is not None:
            by_author.setdefault(author, []).append(rate)
    medians = {author: statistics.median(rates) for author, rates in by_author.items()}
    for row in rows:
        author = row["author"]
        rates = by_author.get(author, [])
        median = medians.get(author)
        rate = row["views_per_day"]
        row["account_posts_with_views"] = len(rates)
        row["median_views_per_day"] = median
        row["outlier"] = bool(
            author and rate is not None and median is not None and len(rates) >= 2 and rate > median
        )
    return rows


def take_args(argv):
    saved = None
    fetched_at = None
    limit = 0
    index = 0
    while index < len(argv):
        token = argv[index]
        if token in ("-h", "--help"):
            return "help", None, None
        if token == "--fetched-at":
            index += 1
            if index >= len(argv):
                raise ValueError("--fetched-at needs a value")
            fetched_at = argv[index]
        elif token == "--limit":
            index += 1
            if index >= len(argv):
                raise ValueError("--limit needs a value")
            limit = int(argv[index])
            if limit < 0:
                raise ValueError("--limit must be 0 or more")
        elif token.startswith("-"):
            raise ValueError("Unknown flag " + token)
        elif saved is None:
            saved = Path(token)
        else:
            raise ValueError("Unexpected extra argument")
        index += 1
    if saved is None:
        raise ValueError("Pass the saved JSON file")
    return saved, fetched_at, limit


def main(argv):
    try:
        saved, fetched_at, limit = take_args(argv)
        if saved == "help":
            sys.stdout.write(
                "Usage: hold_median.py <saved.json> [--fetched-at ISO] [--limit N]\n"
                "Scores the file you pass. Does not contact a network.\n"
            )
            return 0
        if fetched_at:
            captured = clock(fetched_at, "--fetched-at")
            source = "explicit"
        else:
            captured = datetime.fromtimestamp(saved.stat().st_mtime, tz=timezone.utc)
            source = "file_mtime"
        document = json.loads(saved.read_text())
        incoming = load_posts(document)
        seen = set()
        rows = []
        duplicates = 0
        for index, post in enumerate(incoming):
            key = dedupe_key(post, index)
            if key in seen:
                duplicates += 1
                continue
            seen.add(key)
            rows.append(build(post, captured))
        rows = mark(rows)
        rows.sort(key=lambda row: (row["views_per_day"] is None, -(row["views_per_day"] or 0)))
        shown = rows if limit == 0 else rows[:limit]
        payload = {
            "fetched_at": captured.isoformat(),
            "capture_time_source": source,
            "scope": "this file only",
            "incoming_count": len(incoming),
            "duplicate_count": duplicates,
            "unique_count": len(rows),
            "shown_count": len(shown),
            "posts": shown,
        }
        sys.stdout.write(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    except (OSError, ValueError, TypeError, json.JSONDecodeError) as error:
        sys.stderr.write(str(error) + "\n")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
