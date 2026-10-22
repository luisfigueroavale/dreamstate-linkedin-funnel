---
name: local-brand
description: "Help the owner fill brand.local from the blank templates. Use when identity, voice, style, or tokens are missing. It writes only values the owner supplied."
---

Follow `docs/skill-frame.md`.

Write only values the owner supplied into `brand.local/`. After a token, font, or color change, list the templates and scripts that import `tokens.css` or draw type (`pictures/frames/`, `pictures/timeline.js`, `pictures/examples/`, `scripts/frame-page.mjs`) and name which renders are now stale. Fonts are files they placed and listed in `brand.local/assets/README.md`. Do not vendor a font. If that list is empty, say capture falls back to the system face. `scripts/frame-page.mjs` waits on `document.fonts.ready` after `goto`.
