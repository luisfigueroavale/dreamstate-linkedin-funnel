---
name: desk-setup
description: "Install the Dreamstate plugin for this folder, confirm the workspace, and create brand.local and audience.local from the blank templates. Use at the first session. It does not post, send, or spend."
---

# Set up the desk

Read `docs/getting-started.md`. Consent is in `AGENTS.md`. Read `brand/AGENTS.md` and `audience/AGENTS.md` before you copy anything.

## Steps

1. Confirm the Dreamstate plugin. Install with `npx @trydreamstate/cli install`, or add marketplace `luisfigueroavale/dreamstate-plugins` and install `dreamstate@dreamstate` for Claude Code or Codex. The server URL is the one in the plugin `.mcp.json`. Do not add a second server. Do not paste a key.
2. Call `whoami`. More than one workspace: stop and ask. Keep that workspace for the session.
3. If `brand.local/identity.md` or `brand.local/voice.md` is missing, copy the templates the way `brand/AGENTS.md` shows. Do not fill them. Tell the owner which lines are empty.
4. If `audience.local/ideal-follower.md` is missing, copy `audience/ideal-follower.md` the way `audience/AGENTS.md` shows. Do not fill it. The reader is that file. The buyer stays on the Ideal Customer page.
5. Run `git check-ignore -v brand.local/identity.md audience.local/ideal-follower.md .banned-terms.local vault/sources/note.md work/out.txt`. If a path is not ignored, stop. `.banned-terms.local` is where the owner lists names they never want in the repo. The check reads it when the file exists.

## Done

Report the workspace name from `whoami`, whether the plugin is installed, and which brand.local and audience.local files are missing or still `Status: blank`.
