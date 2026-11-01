---
name: check-subreddit-rules
description: "Read a subreddit's posted rules and recent posts, and write a rules card the draft must meet. Use before writing or posting to a subreddit. It does not post, comment, vote, or message."
---
# Check subreddit rules

Read one subreddit's own rules and write a short rules card for the draft.
Follow `docs/skill-frame.md`.

## Use when

- A Reddit draft is planned for a named subreddit.

- Not for picking subreddits to join, and not for posting.

## Steps

1. Take the subreddit name from the owner, and stop if none was named (`references/read.md`).

2. Read the public rules page, the sidebar, and any pinned post in a browser (`references/read.md`).

3. Read the top posts from the past month to see what this sub rewards (`references/recent.md`).

4. Write the rules card with links, self-promotion, flair, length, and banned topics (`references/card.md`).

5. Mark the owner's karma and account age as known or unknown (`references/account.md`).

6. Save the card to `drafts/reddit/<subreddit>-rules.md` with the date read (`references/card.md`).

## Dreamstate tools

None. Local files only.

## Stop rules

- Read only. Never log in, join, post, comment, vote, or send a message.

- A rule not written on the page is unknown, not assumed allowed.

- If the rules page cannot be read, say so and stop.

- A card older than 30 days gets read again before a new draft.
