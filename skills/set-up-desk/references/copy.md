# Copy

`brand.local/identity.md`, `brand.local/voice.md`, `brand.local/style.md`, and `audience.local/ideal-follower.md` stay `Status: blank` until the owner writes them.

Before write, look at `brand.local/`, `audience.local/`, `vault/`, and `.gitignore`. An owner folder is not a blank template. Keep their sources, settings, and edits.

Copy `brand/` to `brand.local/` and `audience/` to `audience.local/` only if absent. Identity, voice, and brand values go in `brand.local/`. The reader goes in `audience.local/ideal-follower.md`. Templates stay in `brand/` and `audience/`:

```sh
mkdir -p brand.local/assets
cp brand/identity.md brand/voice.md brand/style.md brand/tokens.css brand.local/
cp brand/assets/README.md brand.local/assets/README.md
mkdir -p audience.local
cp audience/ideal-follower.md audience.local/ideal-follower.md
```

Samples live in `vault/voice/`. Raw material lives in `vault/sources/`. Commit neither. These paths are also ignored: `output/`, `work/`, `pictures/**/export/`.

Copy one missing template alone. After a copy, read the destination.
