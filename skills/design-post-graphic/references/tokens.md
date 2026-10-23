# Tokens

Import `brand/tokens.css` so names resolve. Owner values live in `brand.local/tokens.css`. Headline text uses `--headline-gradient` when that token is set, and `--color-accent` when it is not. `--color-accent-2` is the second accent an owner can name inside the gradient. Leave both unset in the committed template.

`DeskTimeline.previewStandIn` fills preview colors while tokens stay unset, so the checkout can render. Do not hand the preview stand-in to the owner. A choice made here stays in this file; it is not a new brand rule. Do not add logo, signature, palette, decorative footer, or a call to action the brief did not supply.
