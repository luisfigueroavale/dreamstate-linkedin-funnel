# Content desk

The vault is the board. Dreamstate is where a draft goes when you want it saved on the account.

## One file, one post

`vault/posts/<slug>.md` uses the fields in [vault/fields.md](../vault/fields.md). Status is one of Idea, Drafting, Review, Published, Backlog. The board in `vault/board.md` lists paths under those five headings. Move the line when the status changes. Do not keep a second board in another app.

## Before a draft

Read [brand/AGENTS.md](../brand/AGENTS.md) first, then [audience/AGENTS.md](../audience/AGENTS.md). Then `brand.local/identity.md`, `brand.local/voice.md`, and `audience.local/ideal-follower.md`. If any of those is missing or still says `Status: blank`, stop. Then Tone of Voice (the page identity points at), the Ideal Customer page when the piece is about the buyer, Proof, `vault/notes/pillars.md`, `vault/notes/concepts.md`, `vault/notes/hooks.md`, and the post file. The follower file is the reader. Do not treat the Ideal Customer page as the reader. Run [brand/taste.md](../brand/taste.md) before you hand the draft to the owner. If a note is empty, say so and draft from the pages and the filled reader file. Do not borrow a sentence from a post you found online. Structure you observed is fair game. Their words are not.

## After the owner accepts it

Add one line to the concept note and, if you used a hook shape, to the hook note. Include the post path and the date the owner accepted it. Do not add a view count you do not have.

## Saving into Dreamstate

When the owner asks to store the draft, `tools_get` `social.content.artifact_create`, then create one artifact. One idea that goes to LinkedIn and X is one artifact with both channels and per-channel text in `platform_payloads`. Fetch that field's shape. Do not create two artifacts for one request.

If more than one account can post and the owner did not pick, ask. Do not guess.

`social.content.plan` sets `planned_for`. It is not `social.content.schedule`. Schedule and approve wait for a yes on that artifact's current text and media. If you attach a new file after a yes, ask again.

## What the writer will not invent

A customer name, a revenue figure, a "most people" claim, or a hashtag stack. Follow the writing rules in `docs/skill-frame.md`. The Dreamstate `linkedin-posts` skill is the craft reference for LinkedIn shape: about 210 characters before the fold, a close that asks or questions, lists with `1.` or `•`. Fetch that skill with `skills_get` if the workspace copy may differ. This repo's consent rules still win.
