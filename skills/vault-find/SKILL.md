---
name: vault-find
description: "Search the local vault before drafting and add a concept back after the owner accepts a piece. Use when you need a prior note. It does not call Dreamstate."
---

# Find a note

Search with `rg -n` under `vault/notes`, `vault/posts`, and `vault/week`. Do not search `vault/sources` or `vault/voice` into a tracked file. Quote the path and the line.

If nothing matches, say so. Do not fill the gap with a general claim.

After the owner accepts a draft, append one line to the relevant note in `vault/notes/`: the concept, the post path, and the date they accepted it. No metric.

## Done

The paths you opened, or the statement that the vault has no note on this.
