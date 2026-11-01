---
name: review-reddit-post
description: "Review one Reddit draft against its category outline, the subreddit rules card, the promotion limit, and the house rules, and return pass or fix lines. Use after write-reddit-post and before the owner sees the draft. It does not post."
---
# Review a Reddit post

Check one Reddit draft and return pass, or exact fixes.
Follow `docs/skill-frame.md`.

## Use when

- `write-reddit-post` has saved a draft.

- Not for drafting from scratch, and not for posting.

## Steps

1. Read the draft, its category file, and its rules card (`references/read.md`).

2. Check the title length, pattern, and match with the body (`references/checks.md`).

3. Check the body against each section of the category outline (`references/checks.md`).

4. Check links, disclosure, and the promotion tier against the rules card (`references/checks.md`).

5. Trace every number and proof line to a source file (`references/checks.md`).

6. Check for dashes, emoji, hashtags, and the struck phrase list (`references/checks.md`).

7. Return pass, or one fix line per problem with the exact rewrite (`references/report.md`).

## Dreamstate tools

None. Local files only.

## Stop rules

- Follow the skill-frame writing rules.

- A pass is not a yes to post. The owner decides and posts by hand.

- An untraced number is a fix, never a pass.

- Never post, comment, vote, or send a message.
