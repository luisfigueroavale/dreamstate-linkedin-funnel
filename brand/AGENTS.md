# Brand files

Read this before you draft or design. Then read the local copies, not the templates, for the owner's values.

The files in `brand/` are blank templates. They are committed so the shape stays stable. The owner's words, colors, and files live in `brand.local/`, which git ignores. Same file names in both places.

## Read order

1. This file.
2. `brand.local/identity.md` and `brand.local/voice.md` before any draft, title, script, reply, or caption.
3. The Company Context pages `identity.md` names. Proof claims come from those pages, not from memory.
4. `brand.local/style.md` and `brand.local/tokens.css` before any frame, carousel, thumbnail, overlay, or motion.
5. `brand.local/assets/README.md` before you place a logo, photo, or icon. Use only a file that README lists, and only for a use it allows.
6. `brand/taste.md` before you hand anything to the owner. If `brand.local/taste.md` exists, run those extra lines too.

## Required

| Work | Required local files |
|---|---|
| Drafting or writing | `brand.local/identity.md`, `brand.local/voice.md` |
| Designing or motion | Those two, plus `brand.local/style.md` and `brand.local/tokens.css` |
| Using a mark or a photo | `brand.local/assets/README.md` and the file it names |

A required file is missing if the path does not exist.

A required file is blank if it is empty, if it still says `Status: blank`, or if `tokens.css` still has every custom property set to `unset`.

Missing or blank means stop and ask the owner. Do not guess a color, a font, a positioning line, a proof point, or a banned-word list. Do not copy the template prompts into the draft as if the owner wrote them. Do not fill `brand.local/` yourself except with words the owner just gave you, and show them the file before you treat it as filled.

Templates may render with a preview stand-in so the scripts run. That stand-in is not the brand. Do not hand the owner a picture that used only the stand-in.

## What each file is for

| File | Role |
|---|---|
| `identity.md` | Who we are, the offer, who it is for, positioning, and which pages may be cited as proof. |
| `voice.md` | Tone, word rules, do and don't, banned words, example lines the owner accepts. |
| `style.md` | Color, type, spacing, grid, and platform sizes, in words. |
| `tokens.css` | The same choices as variables. Picture templates import `brand/tokens.css` for the names. Owner values override from `brand.local/tokens.css`. Headline text uses `--headline-gradient` when that token is set, and `--color-accent` when it is not. `--color-accent-2` is the second accent. Both stay unset in the template. |
| `assets/` | Logos, photos the owner supplied, icons. The README is the allow-list. No generated faces. |
| `taste.md` | The check every draft and design must pass before the owner sees it. |

## Create the local copies

```sh
mkdir -p brand.local/assets
cp brand/identity.md brand/voice.md brand/style.md brand/tokens.css brand.local/
cp brand/assets/README.md brand.local/assets/README.md
```

Edit only the `brand.local/` copies. Change `Status: blank` to `Status: filled` when the lines are yours. Leave a line empty if you do not know it. Empty is a question, not a license to invent.
