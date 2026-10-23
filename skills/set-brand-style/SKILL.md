---
name: set-brand-style
description: "Set or revise the owner's visual identity, token values, and graphic rules from preferences and files they supplied. Use when brand.local is blank or a color, type, or asset rule should change. It does not invent a look or copy another creator."
---
# Set brand style

Set or revise the owner's visual identity, token values, and graphic rules from preferences and files they supplied. Follow `docs/skill-frame.md`.

## Use when

- `brand.local` is blank, or a color, type, or asset rule should change.

- Not for inventing a look or copying another creator.

## Steps

1. Read the root `AGENTS.md` and `brand/AGENTS.md` before you set a value (`references/files.md`). A missing file, an empty line, or `Status: blank` means ask.

2. Record intent in `brand.local/identity.md` (`references/identity.md`). Write only values the owner supplied.

3. Offer a direction only when they asked for design work (`references/identity.md`). Leave `Status: blank` until that yes.

4. Put visual rules in `brand.local/style.md` and exact values in `brand.local/tokens.css` (`references/tokens.md`).

5. Headline text uses the gradient when the owner set it, and `--color-accent` when that value is still unset (`references/tokens.md`). Those names include `--color-accent-2` and `--headline-gradient`.

6. File licensed assets under `brand.local/assets/` (`references/assets.md`). Do not vendor fonts.

7. Before a token change, list consumers and say which renders are stale (`references/consumers.md`).

8. Run `npm run check`, and render through `scripts/frame-page.mjs` (`references/check.md`).

9. Hand back the files you changed, and any path that still has the old value (`references/check.md`).

## Dreamstate tools

None. Local files only.

## Stop rules

- A missing file, an empty line, or `Status: blank` means ask.

- Write only values the owner supplied.

- Do not copy another creator's identity.

- Do not rename a token.

- Do not write a value into the committed file.

- Do not copy the preview stand-in palette into the local token file.

- Headline text uses the gradient when the owner set it, and `--color-accent` when that value is still unset.

- Do not vendor fonts.

- A single graphic request does not authorize a global palette change.

- Do not add a second store, index, or log.

- Do not claim a visual check you did not run.

- Do not claim a build you did not run.
