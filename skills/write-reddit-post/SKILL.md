---
name: write-reddit-post
description: "Draft one Reddit post (title, body, optional first comment) in one of six categories for one checked subreddit. Use after pick-reddit-category and check-subreddit-rules. The owner posts by hand; this skill never posts."
---
# Write a Reddit post

Draft one Reddit post for one subreddit from a picked category and a rules card.
Follow `docs/skill-frame.md`.

## Use when

- `pick-reddit-category` has handed over a category and shape, and `check-subreddit-rules` has a card under 30 days old.

- Not for comments on other people's posts, and not for posting.

## Steps

1. Read the brand files, the follower file, the hand-off, and the rules card, and stop if any is missing (`references/read.md`).

2. Read the one category file for the picked category (`references/categories/<category>.md`).

3. Write the title in 60 to 120 characters with one of five patterns (`references/title.md`).

4. Write the body in the category's outline and the sub's own vocabulary (`references/body.md`).

5. Apply the promotion limit from the owner's karma and the rules card (`references/promo.md`).

6. Add a TL;DR only when the body runs over 500 characters (`references/body.md`).

7. Draft an optional first comment, with a link only if the sub allows links and the owner says yes (`references/promo.md`).

8. Remove every number and proof line the source does not contain (`references/proof.md`).

9. Strike the Reddit phrase list and run `brand/taste.md` on the draft (`references/check.md`).

10. Save the draft with `social.content.artifact_create` on channel reddit, or to `drafts/reddit/` if that channel is not writable today (`references/save.md`).

11. Hand the draft to `review-reddit-post` before the owner sees it (`references/save.md`).

## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 10 | `social.content.artifact_create` | live | no |

Never call: `social.content.schedule`, `social.content.approve`, `social.content.delivery_publish`.

## Stop rules

- Follow the skill-frame writing rules.

- Never post, comment, vote, crosspost, change flair, or send a message. The owner posts by hand.

- No link in the body. No emoji. No hashtags.

- Never describe a screenshot, a dashboard, or a result the owner did not supply.

- One post per subreddit. A second subreddit gets its own rewrite, never the same text.
