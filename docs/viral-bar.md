# Viral bar

One bar for every skill that picks inspiration, a quote target, or a reply target from other people's posts.

## The bar

A post counts as inspiration only when it has 200 or more likes, or 10,000 or more views. A missing view count is unknown, not zero, so a post with no views returned has to clear the likes line.

A post under the bar can still teach you the reader's words or an open question. Keep it as a reader note. Do not call it inspiration, and do not borrow its hook.

## Rank

Rank first the posts running 5 to 10 times their author's average. The average is likes plus bookmarks per post, over that author's recent original posts (aim for the last 20 to 50, and at least 10). Read those posts with a public X read, save them, and compute the number with the script:

`python3 skills/find-x-angles/scripts/viral_bar.py <candidates.json> --history <author-posts.json>`

The script makes no network call. Fewer than 10 author posts leaves the multiple unknown. A post above 10 times stays near the top, but check whether a large account reposted it before you say why it traveled. Never write a multiple you did not compute.

## Where ideas may come from

- Hooks and formats may come from any niche. Borrow the shape, never the sentence.
- Quote and reply targets must be accounts in the owner's own space: the pillars in `vault/notes/pillars.md`, the reader in `audience.local/ideal-follower.md`, and the watch rows the owner chose.

## Reads

Use live public reads, not only pasted posts. In order: posts the owner pasted, the public X reads the agent already has (post search, a user's recent posts, recent counts, trends; ids are in `docs/tool-map.md`), the browser, then `visibility.radar.inspiration_x_list`. For LinkedIn, posts the owner pasted, then `visibility.radar.inspiration_linkedin_list`. Every read stays read-only.

## Citation

Every angle, quote, and reply names its source post link and its counts: likes, reposts, replies, bookmarks, views when returned, the capture time, and the author multiple with its sample size when you computed it.
