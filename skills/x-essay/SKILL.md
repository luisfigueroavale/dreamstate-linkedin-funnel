---
name: x-essay
description: "Write a long X article from the owner's letter, framework, or vault notes, with pictures only where they explain a claim. Use when they want a long X piece. It does not publish."
---

## Reader

Read `audience/AGENTS.md`. Use `audience.local/ideal-follower.md` as the reader. The buyer is the Ideal Customer page in Company Context, not this file. If the local file is missing or `Status: blank`, stop and ask. Do not guess who the reader is.

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Write the essay

Start from a source in the week brief. The strongest sourced result leads, if one exists. If none exists, lead with the argument, not a fake result.

Pictures use `frame-build` and only restate lines in the essay. `social.content.article_enabled_get` and `social.content.article_create` are to-check. Fetch them. If native articles are off or the fetch fails, save `vault/posts/<slug>-essay.md` and do not call an article tool.

## Done

The file path, the claims and their sources, and whether an article draft id exists.
