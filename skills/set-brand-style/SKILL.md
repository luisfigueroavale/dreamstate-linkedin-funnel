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

1. A missing file, an empty line, or `Status: blank` means ask (`references/files.md`).

2. Write only values the owner supplied (`references/identity.md`).

3. Offer (`references/identity.md`).

4. Put (`references/tokens.md`).

5. Those names include `--color-accent-2` and `--headline-gradient` (`references/tokens.md`).

6. File licensed assets under `brand.local/assets/` (`references/assets.md`). Do not vendor fonts.

7. Before a token change, list consumers and say which renders are stale (`references/consumers.md`).

8. Run (`references/check.md`).

9. Hand (`references/check.md`).
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
