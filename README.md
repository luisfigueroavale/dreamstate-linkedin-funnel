# LinkedIn funnel on Dreamstate

A local folder a coding agent runs for one owner. [Dreamstate](https://trydreamstate.com) holds the pages, the worksheets, the drafts, the sequences, and the inbox. This repo holds the working files: a content vault, picture templates, a fit rubric, and the skills the agent follows.

Codex is the preferred agent. Claude Code uses the same [AGENTS.md](AGENTS.md).

The folder is generic on purpose. It ships no customer rows, no live posts, and no performance numbers. You fill Company Context in your own workspace. You fill identity, voice, and style in `brand.local/`, and the reader in `audience.local/`. Git ignores both. The files in `brand/` and `audience/` are blank templates.

## Who it is for

Someone who already uses Dreamstate, wants LinkedIn (and the posts that fall out of the same idea) handled from a folder, and wants a person to approve each send. You do not need a second database, a scraper account, or a hosted video tool.

## What the agent will not do

It will not post, comment, send a DM, enroll a sequence, launch a campaign, spend credits, or delete a record unless you say yes to that exact item. It will not invent a metric. It will not generate a face. The rules are in [AGENTS.md](AGENTS.md).

## The first 30 minutes

1. Install the Dreamstate plugin if it is not installed. The easiest path is `npx @trydreamstate/cli install`. For one agent, run `claude plugin marketplace add luisfigueroavale/dreamstate-plugins` then `claude plugin install dreamstate@dreamstate`, or the Codex pair `codex plugin marketplace add` and `codex plugin add` with the same repo and plugin id. Sign in in the browser. Do not paste a key.
2. Open this folder in Codex or Claude Code and tell it to run the `set-up-desk` skill. It calls `whoami`. If you have more than one workspace, name the one this folder should use.
3. Create the local brand copies and fill them. The agent reads [brand/AGENTS.md](brand/AGENTS.md) first and stops if a required file is missing or still says `Status: blank`.

   ```sh
   mkdir -p brand.local/assets
   cp brand/identity.md brand/voice.md brand/style.md brand/tokens.css brand.local/
   cp brand/assets/README.md brand.local/assets/README.md
   ```

   Write who you are and how you sound in `brand.local/identity.md` and `brand.local/voice.md`. Set `Status: filled` when the lines are yours. Leave unknown lines empty. Put colors in `brand.local/style.md` and the same values in `brand.local/tokens.css` before anyone designs.
4. Copy the reader file and fill it. The agent reads [audience/AGENTS.md](audience/AGENTS.md) before it writes or scores. The buyer is not this file.

   ```sh
   mkdir -p audience.local
   cp audience/ideal-follower.md audience.local/ideal-follower.md
   ```

   The one-sentence reader, the company facts, and the yes/no test live here. The buyer stays on the Ideal Customer page in Company Context. Set `Status: filled` only when the answers are yours.
5. Tell the agent to run `collect-owner-context`. Have this ready: who buys (Ideal Customer), proof you are willing to show (Proof), and how you sound (Tone of Voice). The agent previews the page write and waits. Read it. Say yes only if the text is yours. Do not paste the follower file into that page.
6. Open [vault/board.md](vault/board.md) and [vault/posts/sample-gate.md](vault/posts/sample-gate.md). That is the shape of one post. Status moves Idea, Drafting, Review, Published, Backlog.
7. From this folder, after `npm install` and `npx playwright install chromium`:

   ```sh
   npm run still
   npm run capture
   npm run check
   ```

   Look at `pictures/examples/gate/export/`. The PNG is the last frame of the JavaScript timeline. The MP4 is that same timeline. The GIF opens on an empty stage, so a loop returns there.
8. Stop. Nothing has been posted. The next real piece of work is one idea in the vault, not a send.

The longer path is [docs/getting-started.md](docs/getting-started.md).

## How a week moves

One idea becomes a set: a record script if you are filming, a letter, an X post, a LinkedIn post, and a picture dated from that idea. The agent marks a day in Dreamstate only when you want the day mark. A day mark is not a schedule. A schedule is a later yes.

After something is published, the agent can collect people who reacted or commented, score the company and the person separately, and run the reader's qualifying test. It holds the row when a required fact is missing. Someone who asked for the giveaway gets the file first. Everyone else, if you approve it, gets a short note with no pitch, under a daily cap. Replies in threads that already exist are drafted for you. You send them.

## Map

| Path | What it is |
|---|---|
| [AGENTS.md](AGENTS.md) | Rules for Codex and Claude Code |
| [docs/](docs/) | Setup, the week, pictures, fit, conversations, the giveaway |
| [skills/](skills/) | One skill per job. Both agents read this folder |
| [vault/](vault/) | One markdown file per post, plus the notes the writer reads |
| [pictures/](pictures/) | HTML/CSS frames. Motion is a JavaScript timeline. One worked example |
| [scripts/](scripts/) | Still render, motion capture, fit check |
| [scoring/](scoring/) | Rubric, output schema, calibration cases |
| [brand/](brand/) | Blank templates. Your copy is `brand.local/` |
| [audience/](audience/) | Blank reader template. Your answers are `audience.local/` |

## Names you never want in the repo

Put them in `.banned-terms.local`, one name per line. Blank lines and lines that start with `#` are ignored. Git does not track the file. `npm run check` scans the repo for those names when the file is present. When the file is missing it prints `BANNED-TERM SCAN SKIPPED` and continues. `npm run skills -- --strict` fails in that case.

## Local tools

Node 22 or current LTS, Playwright's Chromium, and ffmpeg on the PATH for MP4 and GIF. Skip ffmpeg and the still PNG still renders. No other account is required.

## License

[MIT](LICENSE). Copyright 2026 Luis Figueroa.
