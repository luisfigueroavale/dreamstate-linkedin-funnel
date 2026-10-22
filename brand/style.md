Status: blank

# Style

Copy this file to `brand.local/style.md` and fill that copy. Mirror every value you set into `brand.local/tokens.css` under the token named here. Leave this template as it is.

Change `Status: blank` to `Status: filled` only when the values are yours. An empty line means unset. Do not invent a color or a font to complete the file.

Picture templates import `brand/tokens.css` for these names. They may show a preview stand-in when a token is `unset`. That stand-in is not your brand.

## Colors

| Role | Token | Value |
|---|---|---|
| Background | `--color-bg` | |
| Text | `--color-fg` | |
| Muted text | `--color-muted` | |
| Accent | `--color-accent` | |
| Rules and lines | `--color-line` | |
| Plate surface | `--color-surface` | |

## Fonts

| Role | Token | Family | File, if you supply one |
|---|---|---|---|
| Titles | `--font-display` | | |
| Body | `--font-body` | | |

Font files go in `brand.local/assets/` and must be listed in that folder's README. Do not download a font into the repo.

## Type scale

| Role | Token | Size |
|---|---|---|
| Kicker | `--size-kicker` | |
| Title | `--size-title` | |
| Body | `--size-body` | |
| Small | `--size-small` | |

## Spacing

| Role | Token | Value |
|---|---|---|
| Inset from the frame edge | `--space-safe` | |
| Space between plates | `--space-block` | |
| Space inside a plate | `--space-tight` | |

## Layout grid

| Role | Token | Value |
|---|---|---|
| Columns | `--grid-columns` | |
| Gutter | `--grid-gutter` | |

## Platform sizes

Leave a row blank to use the export target in `docs/picture-rules.md`. Say so when you do. Do not claim a blank row is a platform rule.

| Surface | Tokens | Width | Height |
|---|---|---|---|
| Portrait still and carousel slide | `--size-portrait-w` `--size-portrait-h` | | |
| Thumbnail | `--size-thumb-w` `--size-thumb-h` | | |
| Phone check | `--size-phone-w` | | |
| GIF | `--size-gif-w` `--size-gif-h` | | |

## Logo

| Role | Token | Value |
|---|---|---|
| Max height | `--logo-max-height` | |

Name the file in `brand.local/assets/README.md`. If you have no logo, write "none".
