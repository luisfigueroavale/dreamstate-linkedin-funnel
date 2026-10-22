# Getting started

Do these in order. Each step names the skill. The agent reads that skill before it acts.

## 1. Plugin and workspace

Skill: `desk-setup`, then `workspace-check` on later sessions.

Install the plugin with `npx @trydreamstate/cli install`, or add the marketplace `luisfigueroavale/dreamstate-plugins` and install `dreamstate@dreamstate` for Claude Code or Codex. The plugin's `.mcp.json` is the server. Do not add another.

`whoami` names the active workspace. Pick one and stay on it.

## 2. Company Context

Skill: `context-intake`.

Company Context is the knowledge base the other skills read. The buyer, the proof, and the voice live there:

| Page | What you put on it |
|---|---|
| Ideal Customer | Who buys. The company-fit rubric points here. |
| Proof | Claims you are willing to show. A number with no source does not go on this page. |
| Tone of Voice | Sentences you would say. Bans you mean. |

The reader is not a page. The reader is `audience.local/ideal-follower.md`. Do not paste that file into Company Context.

Product Information is the usual product page in Dreamstate. If it is missing, add it in the same write, from your own site or from words you dictate. Competitor names, if you want rows excluded later, belong on a page you name, not in this repo.

The write is `knowledge.brain.context.compose_pages`. Dry run first. You say yes before the live call. Every page needs a `source_url` for something you read, or a `provenance_note` for something you are telling the agent. A second ingest of the same markdown note duplicates it. Do not use `knowledge.vault.ingest` for these pages. That id is to-check until `tools_get` shows it, and the team notes say a repeat creates a second note.

## 3. Local brand files

Skill: `local-brand`. Read [brand/AGENTS.md](../brand/AGENTS.md) first.

```sh
mkdir -p brand.local/assets
cp brand/identity.md brand/voice.md brand/style.md brand/tokens.css brand.local/
cp brand/assets/README.md brand.local/assets/README.md
```

Fill `brand.local/identity.md` and `brand.local/voice.md` before any draft. Fill `brand.local/style.md` and `brand.local/tokens.css` before any picture. Change `Status: blank` to `Status: filled` when the lines are yours. Leave unknown lines empty. The agent stops on a missing or blank required file and does not invent the value. Photos and logos go in `brand.local/assets/` and are listed in that folder's README.

## 4. The reader

Skill: `desk-setup` copies the template. You fill it.

```sh
mkdir -p audience.local
cp audience/ideal-follower.md audience.local/ideal-follower.md
```

Read [audience/AGENTS.md](../audience/AGENTS.md). Fill the one-sentence reader, the company facts, and the yes/no test. Set `Status: filled` when the answers are yours. The buyer stays on the Ideal Customer page. A blank file stops content, scoring, and qualification.

## 5. Vault

Skill: `vault-find` before any draft. `pillar-map` once, when you know the topics.

Posts live in `vault/posts/`, one file each. The board is `vault/board.md`. Notes the writer reads, then updates, are `vault/notes/`. Your raw material goes in `vault/sources/` and is not committed.

## 6. Pictures

Skills: `frame-build`, `frame-review`.

```sh
npm install
npx playwright install chromium
npm run still
npm run capture
```

`npm run still` writes PNGs at 1x and 2x. That PNG is the last frame of the JavaScript timeline in the same HTML file. `npm run capture` walks that timeline and writes the MP4 and the GIF. Rules: [picture-rules.md](picture-rules.md).

## 7. After a post is live

Skills: `post-path`, then `warm-cadence` or `thread-reply`.

Collect engagers into a worksheet, score company and person apart, and do not message anyone until you approve the text and the audience. Details: [watchers.md](watchers.md), [fit-gate.md](fit-gate.md), [conversations.md](conversations.md).

## 8. A giveaway

Skills: `magnet-build`, then `magnet-send`. Guide: [lead-magnet.md](lead-magnet.md).

## What good looks like at the end of the session

You can name the workspace. The buyer, proof, and voice pages exist, or you have a dry-run preview waiting. The local reader file is filled or you know it is still blank. The sample post is still in Idea. The example PNG opens and matches the timeline's last frame. No draft was scheduled.
