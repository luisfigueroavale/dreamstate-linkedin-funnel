---
name: write-x-post
description: "Draft a short X post or thread from a sourced idea in the owner's voice. Use for X copy. It does not publish."
---
# Write an X post

Draft a short X post or thread from a sourced idea in the owner's voice.
Follow `docs/skill-frame.md`.

## Use when

- Use for X copy from a sourced idea.

- Not for publishing, scheduling, or reply automation.

## Steps

1. Read the brief, `vault/notes/`, and the post file, and treat `audience.local/ideal-follower.md` as the reader (`references/read.md`).

2. Match their vocabulary and their rhythm from `brand.local/voice.md` and the samples in `vault/voice/`, and when the voice file is missing or blank, still write a neutral draft and say the draft does not match their voice (`references/read.md`).

3. Take proof only from what `brand.local/identity.md` clears, because a blank identity file still stops you (`references/read.md`).

4. Keep the post short (`references/shape.md`).

5. Write one post when one post can finish the idea, and use a thread only when the explanation needs several distinct steps (`references/shape.md`).

6. Place the link and the attribution beside the claim they support (`references/links.md`).

7. Check the current limit when they care about an exact fit (`references/length.md`).

8. Deliver paste-ready copy (`references/deliver.md`). Source notes stay outside that copy.

9. Hand a picture, if they asked, to `design-post-graphic` (`references/deliver.md`).

10. Call `tools_get`, then `social.content.artifact_create`, only if they ask to store the copy (`references/deliver.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 10 | `social.content.artifact_create` | live | no |

Never call: `sequence.x.auto_engagements.replace`.

## Stop rules

- Follow the skill-frame writing rules.

- A blank identity file still stops you.

- No fake cliffhanger.

- No repeated conclusion.

- Do not chop a LinkedIn draft into a thread.

- Do not invent slang, outrage, controversy, an anecdote, or a screenshot to imitate the platform.

- No invented metric.

- Do not invent that slug.

- A video URL stays the full https URL.

- Do not shorten it.

- Drafting does not publish and does not start reply automation.

- Do not schedule, do not approve, and do not call `sequence.x.auto_engagements.replace`.
