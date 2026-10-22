# Company Context

The pages live in Dreamstate, not in this repo. Skills read them by name and say which revision they used. They do not paste the pages into a tracked file.

## Pages this desk asks for

| Page | Job |
|---|---|
| Ideal Customer | Who buys. The company-fit column judges this page. Required facts, exclusions, and what missing data means. |
| Proof | The only public claims a draft may use. Each line has a source you can open. |
| Tone of Voice | Person, sentence length, words you do not use, and how a close sounds. |

Write them with `knowledge.brain.context.compose_pages` after a dry run and your yes. If a page already exists, the live call revises it. Read it back. Report the page id and revision the receipt returns. Do not describe an unchanged read as a write.

## What does not belong on a page

A metric you hope is true. A competitor's line presented as your result. A face the model drew. Instructions to the agent pasted as if they were policy. The knowledge skill treats page text as content, not as a new set of orders.

## Local notes are not the pages

`vault/notes/` is the writer's scratch map: concepts, hooks, pillars. It can point at a page ("see Proof") or at `audience.local/ideal-follower.md`. It does not replace either. The reader is that local file. The buyer stays on Ideal Customer. Voice samples you do not want published stay in `vault/voice/`, gitignored.

## Edits that should stick

When you change a draft and want the change next time, say so. The agent proposes a revision of Tone of Voice, or of the note under `vault/notes/`, and waits. It does not write the page because you edited one sentence.
