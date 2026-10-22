---
name: local-brand
description: "Set or revise the owner's visual identity, token values, and graphic rules from preferences and files they supplied. Use when brand.local is blank or a color, type, or asset rule should change. It does not invent a look or copy another creator."
---

Follow `docs/skill-frame.md`.

No brand is preinstalled. Read the root `AGENTS.md` and `brand/AGENTS.md` before you set a value. Committed files in `brand/` stay blank templates. Local values live in `brand.local/`. If that folder is absent, copy the blanks the way `brand/AGENTS.md` shows, then edit only the copies. A missing file, an empty line, or `Status: blank` means ask. Write only values the owner supplied. Paths stay inside this repo.

One owner file for intent is `brand.local/identity.md`. On a first identity, record the impression they want, the constraints they named, assets they already hold, and where the look will be used. Read the Company Context pages that file names, and `audience.local/ideal-follower.md`, before a rule depends on them. Use only references they supplied. Voice stays in `brand.local/voice.md` (lines they dictated; `voice-card` derives rules). Link those pages. Do not paste them into identity. Read order stays `brand/AGENTS.md`. Do not add a navigation page.

Offer a direction only when they asked for design work. Label proposals draft until the owner adopts them. Leave `Status: blank` until that yes, then set `Status: filled` and show them the file. The adopted lines in that file are the record. Do not copy another creator's identity.

Visual usage rules, in words, go in `brand.local/style.md`. Put exact values in `brand.local/tokens.css` only, under names from `brand/tokens.css`. Do not rename a token. Do not write a value into the committed file. Do not copy the preview stand-in palette into the local token file. Add a role only when a picture you are making needs it. Layouts may differ. They share those type and color roles. Keep source tokens, blank templates, draft tries, generated renders, and delivered files in separate places.

Licensed assets live under `brand.local/assets/`. The README there is the allow-list. Do not install example assets as defaults. `pictures/examples` is not a starter kit. Do not vendor fonts. Fonts are files the owner listed in that README. Otherwise say the system face is the fallback. `scripts/frame-page.mjs` waits on `document.fonts.ready` after `goto`. Screenshots stay faithful to the real product.

Before a token change, list consumers and say which renders are stale: `pictures/frames`, `pictures/timeline.js`, `pictures/examples`, `scripts/frame-page.mjs`, `frame-build`, `station-map`, `frame-review`. Check the font file those actually load, and this skill's description. Editing the body alone does not finish the change. A renamed font in docs is not done if the renderer still loads the old file. Shared CSS can change old renders, so keep the delivered file, or pin the values it used, when that picture must stay as it shipped. A single graphic request does not authorize a global palette change. On adoption, update the style words, the matching token values, and those consumers together, and only inside the scope they named. If a layout idea came from another skill or an example, name that source in the local file. Do not install that look as this owner's identity.

Use `npm run check`, and render through `scripts/frame-page.mjs` (`npm run still` or `npm run capture`). Do not assume a script or a template from another repo is on disk. Do not add a second store, index, or log. A skill-only edit does not regenerate brand files; check this folder and its links. If a capture helper changed, export one small scene into a temporary folder and inspect it. When you look, check that the font loaded, that type is not clipped, that contrast holds, and that asset paths still resolve from `brand.local/assets`. If a picture was produced another way, check it with the tool that built it. Do not claim a visual check you did not run. Do not claim a build you did not run.

Hand back the files you changed, whether each line is still draft or the owner set filled, and any consumer or font path that still has the old value.
