---
name: write-opening-lines
description: "Write, revise, or compare LinkedIn opening lines in the owner's voice, with counts from the house measurer. Use for options, a first-line edit, or the opening pass on a full post. It does not write the rest of the post."
---

# Write opening lines

Write, revise, or compare LinkedIn opening lines in the owner's voice, with counts from the house measurer. Follow `docs/skill-frame.md`.

## Use when

- Use for options, a first-line edit, or the opening pass on a full post.

- Voice, facts, and the ending stay with `write-linkedin-post`.

- When `plan-content-week` needs an opening, choose it here, then return to that skill for the rest.

- It does not write the rest of the post.

## Steps

1. Read the draft or the factual brief, `brand.local/voice.md`, and `audience.local/ideal-follower.md` (`references/scope.md`).

2. Name the reader and the one point the body will pay off (`references/scope.md`).

3. Choose a family the facts support (`references/families.md`).

4. Write the opening, or edit the line they handed you (`references/shape.md`).

5. Measure that text with `node scripts/opening-measure.mjs --json` (`references/measure.md`).

6. Fetch `social.content.generate_hooks` with `tools_get` before `tools_run` (`references/tools.md`).

7. Score the line with `social.draft_score` (`references/tools.md`). Sending dry_run executes the read.

8. Hand back the opening you recommend (`references/hand-back.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 6 | `social.content.generate_hooks` | read | no |
| 7 | `social.draft_score` | read | no |


## Stop rules

- Follow the skill-frame writing rules.

- It does not write the rest of the post.

- Ban invented drama.

- Ban a mandatory I.

- Ban compulsory numbers.

- Do not invent a number.

- A public number comes only from Proof, a file they supplied, or a tool result.

- Ban the crowd-is-doing-it opener.

- Never call a slice the exact preview.

- Past 60 is a note, not a reject.

- They do not add a number the owner does not have.

- Sending dry_run to `social.draft_score` executes the read. Say that it was a read.

- It does not replace the measurer, and it is not a preview of the feed.

- The owner picks.

- Leave the routine notes off the page they will read.
