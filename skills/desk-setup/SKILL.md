---
name: desk-setup
description: "Install the Dreamstate plugin for this folder, confirm the workspace, and create brand.local and audience.local from the blank templates. Use at the first session. It does not post, send, or spend."
---

Follow `docs/skill-frame.md`.

Confirm the plugin before any write. `skills_list` must show the installed dreamstate skill. If it does not, stop and point at `npx @trydreamstate/cli install`, or at adding this plugin from the marketplace. Do not register a second MCP server. The endpoint is the URL already in the installed plugin `.mcp.json`. Then `whoami`: one active workspace. If it is the wrong one, stop. Copy `brand/` to `brand.local/` and `audience/` to `audience.local/` only when those folders are absent. `.gitignore` must cover `brand.local/`, `audience.local/`, `work/`, `output/`, and `.banned-terms.local`. `npm run check` reads that last file when it exists. This skill does not post, send, or spend.
