---
name: derive-voice-rules
description: "Derive voice rules from the owner's own X posts, pasted LinkedIn posts, samples, and edits, each rule tied to example posts. Use at setup, or when Tone of Voice or brand.local/voice.md is thin. It does not import another person's voice."
---
# Derive voice rules

Derive voice rules from the owner's own posts, samples, and edits. Follow `docs/skill-frame.md`.

## Use when

- Use this when Tone of Voice or `brand.local/voice.md` is thin.

- Setup runs it once on the owner's own recent posts.

- It does not import another person's voice.

## Steps

1. Read `brand.local/identity.md`, `brand.local/voice.md`, and `vault/voice/`, and if the voice file is missing, copy `brand/voice.md` to `brand.local/voice.md` (`references/read.md`).

2. Ask the owner for their X handle and LinkedIn profile URL, and write neither into a tracked file (`references/own-posts.md`).

3. Read the owner's own last 100 or so X originals with a public X read, or the browser, and save them in `vault/voice/` (`references/own-posts.md`).

4. Add LinkedIn posts the owner pasted, or ones a Dreamstate read already returned, as samples (`references/own-posts.md`).

5. Save a new sample in `vault/voice/` under its filename (`references/samples.md`).

6. Classify each path beside the file (`references/classify.md`).

7. Observe several samples before a rule (`references/observe.md`). One is tentative, not a universal style.

8. Write into existing `brand.local/voice.md` sections (`references/write.md`).

9. Tie every rule to two or more example posts by link or sample filename (`references/write.md`). A rule with one example is tentative.

10. Note which patterns in `docs/ai-tells.md` the owner's own posts really use, with the examples (`references/write.md`).

11. Write a calibration draft only when asked, and read `audience.local/ideal-follower.md` first (`references/calibrate.md`).

12. Hand back the guide, and do not post, send, or spend (`references/empty.md`).

## Dreamstate tools

None. Local files only, plus public X reads when the host has them: `search_posts_all`, `get_users_posts` (`docs/tool-map.md`). Those stay read-only.

## Stop rules

- Template prompts are not owner rules.

- If unread, say so.

- Voice rules go only in `brand.local/voice.md`.

- No formats file, second guide, index, or log.

- Do not summarize, commit, or fetch someone else's public post as a stand-in.

- The owner's own posts, read from the handle they gave, are samples. Another account's posts are not.

- Do not hard-code a handle or a profile URL in a tracked file.

- Never post, like, repost, follow, or DM through an X read tool.

- Do not invent a sample or a quote.

- External inspiration is not a rule or example.

- A spoken habit is not a writing rule unless written samples show it.

- Do not hard-code a dialect, slang quota, CTA frequency, numeric separator, or hook length unless samples repeat it.

- Stop if `audience.local/ideal-follower.md` is missing or blank before a calibration draft.

- Add no unstated fact.

- Do not mark an imitation approved.

- Leave `Status: blank` until they say the rules are theirs.

- Do not claim a voice from a biography or `brand.local/identity.md` alone.

- This skill does not post, send, or spend.

- It does not import another person's voice.
