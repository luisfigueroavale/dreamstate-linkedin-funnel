---
name: linkedin-draft
description: "Draft or revise one LinkedIn post from the vault, the brand files, and allowed proof. Use for a single post. It does not schedule or publish."
---

Follow `docs/skill-frame.md`.

Read the Proof page `brand.local/identity.md` names, Tone of Voice, `brand.local/voice.md`, `vault/notes/pillars.md`, the job in `vault/notes/funnel-stages.md`, `vault/notes/concepts.md`, `vault/notes/hooks.md`, and the post file. Then read the whole source behind the claim, the file or page named in that post's `source` field. The reader is `audience.local/ideal-follower.md`. A style sheet on its own leaves the draft generic, so also read lines they actually wrote: calls, DMs, voice notes, and earlier posts in `vault/voice/` and `vault/sources/`, a story collection if one exists, and any note of what has worked on their account. Use the parts that bear on this post. If they have not already told a personal story in public, get approval before the post uses it.

A blank follower file or a blank `brand.local/identity.md` stops the work. A blank `brand.local/voice.md` still allows a draft. Label it uncalibrated in the notes, never in the post. Keep lines they already wrote, and stay plain where they did not.

One useful point. Name its source, the reader, and the funnel job. Work from the brief and the files already here. Ask only when a missing fact would change the point. Do not invent a milestone, an anecdote, a customer quote, a revenue figure, or a line about what most people do. Posts already in this repo are examples, not proof.

There is no separate formats file. Let the material pick the shape, and keep it. Steps in order when the piece is a process. A story when a real change happened. Evidence when the point is a claim. A comparison when the reader is choosing.

The opening is `opening-line`. The body has to carry it. Prefer a concrete observation they made. Cut manufactured suspense. Match the rhythm and the words in their own lines. Do not add slang, self-deprecation, a deliberate mistake, a staged reversal, or a number just so the post sounds human.

Each paragraph adds information the lines above did not already give. Remove generic praise, a superlative the source does not support, a moral said twice, a transition that carries no fact, and a slogan ending. Keep an explanation or a qualification the reader needs. Read the opening, the first line of each paragraph, and the ending as one argument.

Verify facts, quotes, dates, and numbers. Each one has to match the file it came from, and that file has to be cleared for public use. Keep a reported result, a target, and an example in separate sentences. Use a call to action only when it matches the funnel job and a real offer exists. Signup means the file, the keyword, and the sentence are already in `magnets/<slug>/`. A reach close does not ask them to book. The last line is an ask or a question.

Repurposing keeps one argument from the source. It does not squeeze the whole source into the post. On a revision, make the change they asked for first, and honor their wording: their facts, and the phrases that still say the thing.

Deliver one paste-ready draft. Source notes, the uncalibrated label, and anything still unverified sit outside the copy. The post contains no commentary on how it was written. Offer another opening only when they ask, or when the body cannot support the line. That opening still comes from `opening-line`.

Write the draft to `vault/posts/<slug>.md` with the fields in `vault/fields.md`. One pillar. The channel is the one they asked for. Leave `publish_date` empty. If that file exists, edit it. Do not open a second file for the same post, and do not start a second board. Move the line on `vault/board.md`. After they accept it, add the concept back with `vault-find`.

The URL goes in the comment under the post, and the post tells the reader to look there. Hand them that comment as text. Do not publish it. The URL uses `utm_source=linkedin` and the weekly campaign slug. When the material is a list, use `1.` or `•`. No em dash. No hashtag stack.

`social.content.artifact_create` only when they ask to store it. `whoami` first. If more than one workspace is listed, stop until they name one. `tools_get` the capability, then run it. The fetched schema wins. When that schema has dry_run, dry_run first, show the quote, then live with `quote_hash`, `max_credits`, and a new `idempotency_key`. One artifact. When the idea is for LinkedIn and X, put both channels in `platform_payloads`. Fetch that field's shape. If more than one account can post and they did not pick, ask. If a stored draft for this post already exists, read it with `social.content.artifact_get` and do not create another. If the create cannot run, hand them the file and say the account copy was not saved. Saving a draft does not schedule. A day mark belongs to `week-board`. Do not call `social.content.schedule`. Say that nothing was sent.
