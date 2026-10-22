---
name: linkedin-draft
description: "Draft or revise one LinkedIn post from the vault, the brand files, and allowed proof. Use for a single post. It does not schedule or publish."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Draft the post

Run `vault-find` and `opening-line` for the first 210 characters. One idea. Paragraphs of one to four sentences. Lists use `1.` or `•`. The last line is an ask or a question, unless the owner said no close. No em dash. No hashtags or emoji unless they asked.

Save `vault/posts/<slug>.md` and set status Drafting. Update `vault/board.md`.

Store it in Dreamstate only if they ask. `tools_get` `social.content.artifact_create`. One artifact. If X is part of the same request, put both channels on that artifact and per-channel text in `platform_payloads` after you fetch that field. If more than one LinkedIn account exists and they did not pick, ask. Read the artifact back with `social.content.artifact_get`.

## Done

The file path, the fold count, and the artifact id if one was created. State that it is not scheduled.
