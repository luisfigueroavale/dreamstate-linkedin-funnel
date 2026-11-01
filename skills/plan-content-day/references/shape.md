# Shape

The plan lives in `work/plans/<date>-day.md`, which git ignores. It reads top to bottom on a phone. Every line the owner could post has a tap-to-post link.

Build links from the repo root:

- Post: `node scripts/intent-link.mjs --text "<post>"`
- Quote: `node scripts/intent-link.mjs --text "<quote>" --quote <source post link>`
- Reply: `node scripts/intent-link.mjs --text "<reply>" --reply-to <source post link>`

```
# <date>

## Post
<post text>
Source: <angle source link, counts>
Post it: <tap-to-post link>

## Quote reposts
1. <source post link>, <counts>
   <quote text>
   Post it: <link>
(3 items, from draft-quote-reposts)

## Replies
1. <source post link>, <counts>
   <reply text>
   Reply: <link with in_reply_to>
(3 to 5 items, from draft-x-replies)

## LinkedIn
Idea: <one line>
Stage: reach | belief | signup
Why now: <source link and counts, or the owner's own note>
```

The X post is ready to post: in the owner's voice, short, one idea, through `write-x-post`. Replies and quotes go only to in-space accounts whose posts clear `docs/viral-bar.md`.

The LinkedIn idea names its stage from `vault/notes/funnel-stages.md`: reach (new readers), belief (proof and method), or signup (the offer and next step). It is an idea, not a draft. The owner asks for the draft with `write-linkedin-post`.

Run `docs/ai-tells.md` and the banned words over every line before hand-off. Then hand back the path and paste the plan.
