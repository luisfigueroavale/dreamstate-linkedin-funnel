# Claude Code

Read [AGENTS.md](AGENTS.md) and follow it. It is the operating contract for this folder. Before a draft or a design, read [brand/AGENTS.md](brand/AGENTS.md) first. Before content, scoring, or qualification, read [audience/AGENTS.md](audience/AGENTS.md).

Skills live in [skills/](skills/). This file's agent reads them through `.claude/skills`, which points at that same folder. Codex reads them through `.agents/skills`.

When a Dreamstate plugin skill is looser about sending, posting, enrolling, or spending, AGENTS.md wins. When a parameter shape is in question, `tools_get` wins over this repo.
