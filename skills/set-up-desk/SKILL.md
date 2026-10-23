---
name: set-up-desk
description: "Install the Dreamstate plugin for this folder, confirm the workspace, and create brand.local and audience.local from the blank templates when those folders are absent. Use at the first session. It does not post, send, or spend."
---
# Set up the desk

Install the Dreamstate plugin, confirm the workspace, and create the local folders when they are absent. Follow `docs/skill-frame.md`.

## Use when

- Use at the first session.

- It does not post, send, or spend.

## Steps

1. Confirm the plugin with `skills_list`, and stop if it does not show dreamstate (`references/plugin.md`).

2. Confirm the workspace with `whoami`, and stop if it is not one named workspace (`references/plugin.md`).

3. Read `AGENTS.md`, `README.md`, `skills/README.md`, `brand/AGENTS.md`, and `audience/AGENTS.md` (`references/read.md`).

4. Look at `brand.local/`, `audience.local/`, `vault/`, and `.gitignore` (`references/copy.md`).

5. Copy `brand/` to `brand.local/` and `audience/` to `audience.local/` only if absent (`references/copy.md`).

6. Update `.gitignore`, and add a missing line and remove none (`references/ignore.md`).

7. Leave an unknown empty (`references/gaps.md`). Do not invent a stand-in.

8. Collect only blocking gaps (`references/gaps.md`). This step does not schedule.

9. Start capture at `vault/intake/interview.md` (`references/intake.md`).

10. Leave Company Context pages to `collect-owner-context` (`references/context.md`).

11. Search with local file tools (`references/search.md`).

12. Run `npm run check` (`references/check.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 1 | `skills_list` | read | no |
| 2 | `whoami` | read | no |


## Stop rules

- `brand.local/identity.md`, `brand.local/voice.md`, `brand.local/style.md`, and `audience.local/ideal-follower.md` stay `Status: blank` until the owner writes them.

- Do not fill a blank brand or audience file.

- Do not add a second MCP server.

- Do not put an API key in the repo or a local file.

- If you stop, copy nothing.

- Write no name or id into the repo.

- If a local folder exists, replace nothing.

- Remove none.

- Do not call `knowledge.brain.context.compose_pages` here.

- Do not call `knowledge.vault.ingest` for those pages.

- Do not add a second database.

- Do not copy an id from a sample, another workspace, or a search result.

- Do not rename files in `skills/`, `brand/`, or `audience/`.

- It does not post, send, or spend.
