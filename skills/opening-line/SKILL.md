---
name: opening-line
description: "Write, revise, or compare LinkedIn opening lines in the owner's voice, with counts from the house measurer. Use for options, a first-line edit, or the opening pass on a full post. It does not write the rest of the post."
---

Follow `docs/skill-frame.md`.

You own the opening and how it meets the body. Voice, facts, and the ending stay with `linkedin-draft`. When `week-spread` needs an opening, choose it here, then return to that skill for the rest.

Read the draft or the factual brief, `brand.local/voice.md`, and `audience.local/ideal-follower.md`. Name the reader and the one point the body will pay off. Match tone to posts the owner already shipped or saved under `vault/`. Wording they gave on this request wins over a family template. A public number comes only from Proof, a file they supplied, or a tool result.

The first line may be a claim, a question, a confession, a comparison, a result, a story detail, or a framework promise. Ban invented drama. Ban a mandatory I. Ban compulsory numbers. An I is allowed when it is already their voice. A number is allowed only when it is already theirs. Do not use an em dash. Do not invent a number.

Prefer one of these families, and only with facts they have: result plus method; a test or a comparison, with the stance on the next line; a claim, then how the reader benefits; news plus result; confession plus change; stakes, then the response; before then after; receipt as promise. Ban the crowd-is-doing-it opener, the one that says people at large already do the thing and that almost nobody will admit the rest. It reads as generated copy.

A follow-up within a few days uses a different family. Do not reword the same receipt. Move that receipt to line 2. A short X post may keep the receipt on line 1.

These are house budgets, not a feed preview. They are not a platform cap. They keep the point in a short opening a phone can show. Wrapping, a blank line, and the viewport change what a person sees. Never call a slice the exact preview.

Line 1 is a soft 40-60. A line at 35 or 85 can win. Past 60 is a note, not a reject. Line 1 stands alone. The point is not waiting after code point 140. The opening block runs from the start through the second nonempty line, or through the only nonempty line, and that block aims at about 140. Spaces and line breaks inside it count. Stress-check 210 on the full text. The whole post, finished draft included, stays within 3000 code points.

Shape:

1. Name the concrete point, why this reader cares, and any tension that is actually true.
2. Write the opening, or edit the one they handed you. Line 2 adds a specific, a consequence, a contrast, or a promise, and it must not restate line 1.
3. When they ask for options and leave the count unspecified, default to 3. Change the angle, not the adjectives. Write one hook when writing the whole post.
4. Judge each for a stranger: clear, specific, relevant, in their voice, and paid off by the body.
5. Measure the exact chosen text. Read the 140 prefix and the 210 prefix. If a needed word arrives late, bring it forward. Leave a short line short.

Run `node scripts/opening-measure.mjs --json` on one draft path, or pipe the plain text with no path. Counts are Unicode code points. The same report gives UTF-16 units, which is the count that moves when emoji are in the text. CRLF is normalized, and a lone CR is normalized, both to LF. Whitespace stays as written. The block drops the line break after its last line and keeps the breaks between its lines. If no line has text, the block is empty. `opening_chars` is that block. `slice_140` and `slice_210` are prefixes of the full text, so they are not a second name for the block. Both slices are text checks, not a layout. `not_a_feed_preview` is true.

Notes, printed under `notes`: `empty`, `leading-space`, `first-line-over-60` (not an auto-reject; judge the line), `opening-over-140`, `blank-line-in-opening`, `over-3000` when code points pass 3000, and `utf16-over-3000` only when code points are still within 3000 and UTF-16 is over 3000. A blank line in the opening can shove the second beat down. Leading space spends room at the front, so keep it only on purpose. JSON mode is `--json`. Empty input, including whitespace only, still prints the report and exits 1. Any other text exits 0, notes included.

`social.content.generate_hooks` is free, with required `user_request` and `platform`, and dry_run is allowed. Fetch it with `tools_get` before `tools_run`. Its lines are candidates. Measure them. They do not add a number the owner does not have. `social.draft_score` is a free read, with required `text`. Sending dry_run executes the read. Say that it was a read. It does not replace the measurer, and it is not a preview of the feed.

When they only want the opening, hand back the line you recommend. Put the line 1 count and the opening-block count beside the copy, not inside it. If they asked for options, mark one and give the reason in one line. The owner picks. When the task is the whole post, place that single opening in the draft and leave the routine notes off the page they will read.
