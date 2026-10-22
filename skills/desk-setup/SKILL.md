---
name: desk-setup
description: "Install the Dreamstate plugin for this folder, confirm the workspace, and create brand.local and audience.local from the blank templates when those folders are absent. Use at the first session. It does not post, send, or spend."
---

Follow `docs/skill-frame.md`.

First session, in this order. `brand.local/identity.md`, `brand.local/voice.md`, `brand.local/style.md`, and `audience.local/ideal-follower.md` stay `Status: blank` until the owner writes them. Do not fill a blank brand or audience file.

1. Confirm the plugin before any write. `skills_list` must show dreamstate. If not, stop and point at `npx @trydreamstate/cli install`, or the marketplace. No second MCP server. Endpoint: the URL in `.mcp.json`. No API key in the repo or a local file. Sign in through the browser. `whoami`: one workspace. More than one: ask and stop until named. Wrong workspace, or a later switch: stop. Name it in chat only. Write no name or id into the repo. If you stop, copy nothing.

2. Before copy or ask, read `AGENTS.md`, `README.md`, `skills/README.md`, `brand/AGENTS.md`, and `audience/AGENTS.md` from this repo root. A shell started elsewhere is the wrong base. Index: `skills/README.md`. Board: `vault/board.md`.

3. Before write, look at `brand.local/`, `audience.local/`, `vault/`, and `.gitignore`. An owner folder is not a blank template. Keep their sources, settings, and edits.

4. Copy `brand/` to `brand.local/` and `audience/` to `audience.local/` only if absent. Identity, voice, and brand values go in `brand.local/`. The reader goes in `audience.local/ideal-follower.md`. Templates stay in `brand/` and `audience/`:

```sh
mkdir -p brand.local/assets
cp brand/identity.md brand/voice.md brand/style.md brand/tokens.css brand.local/
cp brand/assets/README.md brand.local/assets/README.md
mkdir -p audience.local
cp audience/ideal-follower.md audience.local/ideal-follower.md
```

Samples: `vault/voice/`. Raw material: `vault/sources/`. Commit neither. Also ignored: `output/`, `work/`, `pictures/**/export/`. If a local folder exists, replace nothing. Copy one missing template alone. After a copy, read the destination.

5. `.gitignore` must list `brand.local/`, `audience.local/`, `work/`, `output/`, and `.banned-terms.local`. Add a missing line. Remove none. `npm run check` reads that file when present and skips the scan when absent. Banned names go there, one per line.

6. Leave an unknown empty. Invent no stand-in. Local files hold what the owner typed, not proof of a life fact or a business claim. A claim waits for their file or a Company Context page that names its source.

7. Collect only blocking gaps: name, language, who the posts are for, content goal, and source files on hand. Time zone, posting days, and channel wait until they ask for a dated plan. Does not schedule.

8. Capture starts at `vault/intake/interview.md`. If missing, recreate headings and leave answers empty. Do not seed identity, proof, voice, hooks, or topics from an example. Leave `vault/notes/hooks.md` and `vault/notes/pillars.md`. Pillars wait for `pillar-map`. Do not rename files in `skills/`, `brand/`, or `audience/`.

9. Lasting buyer, proof, and voice go on Company Context. Each page needs `source_url` or `provenance_note`. `context-intake` writes them. Do not call `knowledge.brain.context.compose_pages` here. Do not call `knowledge.vault.ingest` for those pages.

10. No second database. Company Context plus the local vault. Refuse another database, views, or a parent page in another product. No config for one. Do not copy an id from a sample, another workspace, or a search result. If pages already hold their words, leave them.

11. Search with local file tools, including `vault/`. Named file: path and matching line. No search program, embedding model, video-host client, animation library, or vendored font or face. Motion is `DeskTimeline` and `__seek`.

12. Run `npm run check`. Report succeeded connections, files still empty, and the next source. Success: dreamstate in `skills_list` and one workspace from `whoami`. Empty: missing or `Status: blank`, plus unanswered interview lines. Next: the first gap, then `context-intake`.
