---
name: desk-setup
description: "Install the Dreamstate plugin for this folder, confirm the workspace, and create brand.local and audience.local from the blank templates when those folders are absent. Use at the first session. It does not post, send, or spend."
---

Follow `docs/skill-frame.md`.

Confirm the plugin before any write. `skills_list` must show the installed dreamstate skill. If it does not, stop and point at `npx @trydreamstate/cli install`, or at adding this plugin from the marketplace. Do not register a second MCP server. The endpoint is the URL already in the installed plugin `.mcp.json`. Do not paste an API key into the repo or into a local file. Sign in through the browser. Then `whoami`: one active workspace. If more than one is listed, ask which one and stop until the owner names it. If it is the wrong one, stop. If a later call is on a different workspace, stop. Say which workspace is active in chat only. Do not write the name or any id into the repo. If you stop here, say why, and do not copy files.

Read `AGENTS.md`, `README.md`, `skills/README.md`, `brand/AGENTS.md`, and `audience/AGENTS.md` from this repo root before you copy or ask. A shell that was started somewhere else is the wrong base. The skill index is `skills/README.md`. The status board is `vault/board.md`.

Look at `brand.local/`, `audience.local/`, `vault/`, and `.gitignore` before you write. A folder the owner already uses is not a blank template. Keep their sources, their settings, and their edits.

Copy `brand/` to `brand.local/` and `audience/` to `audience.local/` only when those folders are absent. Identity, voice, and brand values go in `brand.local/`. The reader goes in `audience.local/ideal-follower.md`. Use this file list, so the guides in `brand/` and `audience/` stay the templates:

```sh
mkdir -p brand.local/assets
cp brand/identity.md brand/voice.md brand/style.md brand/tokens.css brand.local/
cp brand/assets/README.md brand.local/assets/README.md
mkdir -p audience.local
cp audience/ideal-follower.md audience.local/ideal-follower.md
```

Voice samples stay in `vault/voice/`. Raw material stays in `vault/sources/`. Do not commit either tree. Git ignores both except each README. Ignored working copies go in `output/` and `work/`. Rendered frames land in `pictures/**/export/`, which git also ignores. If a local folder is already present, do not replace a file inside it. If one template file is missing there, copy that file alone. After a copy, read the destination. If the result is unclear, read it again before you copy a second time.

`.gitignore` must cover `brand.local/`, `audience.local/`, `work/`, `output/`, and `.banned-terms.local`. Add a missing line. Do not remove the other lines. `npm run check` reads that last file when it exists and skips the scan when it does not. Names that must never appear in the repo go in `.banned-terms.local`, one per line.

Leave an unknown line empty. Do not invent a stand-in that looks like an answer. These local files hold what the owner typed. They are not proof of a life fact or a business claim. A claim waits for a file they supplied or a Company Context page that names its source.

From the conversation, collect only the gaps that block the next step: their name, the language, who the posts are for, the content goal, and which source files they already have. Leave time zone, posting days, and channel choice until they ask for a dated plan.

`vault/intake/interview.md` is where capture starts. If that file is missing, recreate the headings and leave every answer line empty. Do not seed identity or proof from an example. Do not seed voice, hook notes, or topic notes from an example either. `brand.local/identity.md`, `brand.local/voice.md`, `brand.local/style.md`, and `audience.local/ideal-follower.md` stay `Status: blank` until the owner writes them. Leave `vault/notes/hooks.md` and `vault/notes/pillars.md` as they are. Pillars wait for `pillar-map`. Do not rename files in `skills/`, `brand/`, or `audience/` so they carry the owner's name. The generic names stay.

Buyer, proof, and voice decisions that should last belong on Company Context pages. Each page needs `source_url` or `provenance_note`. `context-intake` does that write. Do not call `knowledge.brain.context.compose_pages` here. When that later skill runs it, the call is dry_run, then the owner's yes, then live with `quote_hash`, `max_credits`, and `idempotency_key`. Do not call `knowledge.vault.ingest` for those pages. This skill does not post, send, or spend.

A second database is out. Company Context plus the local vault. Local drafting needs no other store. If they ask for a separate database, views, or a parent page in another product, refuse. Do not read or write a config file for one. Do not copy an identifier out of a sample, a different workspace, or a search result into this repo. If Company Context pages already contain their words, leave those pages. Do not claim a file, a page, or a connection you did not just read.

If they ask for a search during setup, search this repo with local file tools, including `vault/`. If they name a file, report its path and the line that matched. Do not install a search program or an embedding model just to initialize the desk. Do not add a video-host client, a separate animation library, or a vendored font or face. Motion in this desk is `DeskTimeline` and `__seek`.

Run `npm run check`. Then tell the owner three things: which connections succeeded, which required files are still empty, and which source to collect next. A connection succeeded when the dreamstate skill showed in `skills_list` and `whoami` returned one workspace. Empty means a required local file is missing or still says `Status: blank`, plus any interview line they have not answered. The source to collect next is the first of those gaps, then `context-intake` for Company Context. Nothing was scheduled, posted, commented, sent, enrolled, launched, spent, reacted to in public, or emailed as a calendar invite. Any of those needs the owner's yes on that exact item. This skill does not do them.
