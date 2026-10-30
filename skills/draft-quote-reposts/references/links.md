# Links and hand-off

Build each link from the repo root:

`node scripts/intent-link.mjs --text "<quote text>" --quote <source post link>`

That returns `https://x.com/intent/post?text=...&url=...`. Tapping it opens X with the quote filled in. The owner reads it and posts it, or not.

Each item in `work/plans/<date>-quotes.md`, short enough to read on a phone:

```
1. <author>, <source post link>
   <likes> likes, <reposts> reposts, <views or "views unknown">, <multiple>x of <sample> posts
   Quote: <quote text>
   Post: <tap-to-post link>
```

The skill does not post, repost, like, follow, or DM. `work/` is not committed.
