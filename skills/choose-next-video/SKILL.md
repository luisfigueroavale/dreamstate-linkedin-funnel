---
name: choose-next-video
description: "Decide the next video before anyone records: three gates, a scorecard, and a ledger after publish. Use for the next topic, a title and thumbnail check, or the opening script. Files and numbers come from the owner. It does not call a video-host API."
---
# Choose the next video

Decide the next video before anyone records.
Follow `docs/skill-frame.md`.

## Use when

- The owner asks for the next topic, a title and thumbnail check, or the opening script.

- Files and numbers come from the owner.

- `plan-content-week` calls this when the recording is the trunk and the idea is not chosen yet.

- Not for a video-host API, and not for recording before the three gates pass.

## Steps

1. Read `vault/notes/channel-ledger.md` when it exists, and create it on the first ledger pass (`references/read-first.md`).

2. Read Proof, `audience.local/ideal-follower.md`, `brand.local/identity.md`, the pillar note, the funnel note, and a recent wave note, and stop if the follower file or the identity file is missing or `Status: blank` (`references/read-first.md`).

3. Write the niche in one line before gate 1 (`references/read-first.md`).

4. Run `brand/taste.md` before you hand over the slate or the script.

5. Resolve `source.account_posts_youtube` with `tables.executable_definitions.list_resolved`, which is a definition id, not a `tools_run` id (`references/measure.md`).

6. Attach that definition with `tables.table_sources.attach` (`references/measure.md`).

7. Run `tables.table_sources.run` only after the quote and the owner's yes (`references/measure.md`).

8. When that definition is not resolved, have them type the counts (`references/measure.md`).

9. Score the sheet locally (`references/score-sheet.md`). The script does not open a socket.

10. Save the numbers under `vault/sources/<date>-<slug>/` (`references/measure.md`).

11. Run gate 1 (`references/gate-1.md`, `references/scorecard.md`). The owner picks.

12. Run gate 2 (`references/gate-2.md`). The owner picks.

13. Run gate 3: the owner reads the first minute aloud (`references/gate-3.md`).

14. After publish, write the ledger from figures they pasted (`references/ledger.md`).

15. Hand over the gate result (`references/deliver.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 5 | `tables.executable_definitions.list_resolved` | read | no |
| 6 | `tables.table_sources.attach` | write | no |
| 7 | `tables.table_sources.run` | dry_run, then live | yes |


## Stop rules

- Follow the skill-frame writing rules.

- Do not record until three gates pass.

- Never write zero.

- If a path needs an API key, drop it.

- Stop if `audience.local/ideal-follower.md` or `brand.local/identity.md` is missing or still `Status: blank`.

- Do not paste Proof into a tracked file.

- A public number needs definition, unit, period, source, and a yes.

- No paid research without a yes.

- Going past 30 searches needs another yes.

- Run `tables.table_sources.run` only after the quote and the owner's yes.

- Do not add a host client, a plugin, or a caption downloader.

- Do not commit the folder under `vault/sources/`.

- Never call the age-band ratio velocity.

- The owner picks the idea and the packaging.

- Never record on a failed gate.

- No number without a source.

- A badge from an outlier plugin is not a measurement you fetched.

- Do not set a key, port a client, or build a watch or still url from an id.

- A pasted url stays their string.

- A caption is one they supply.

- Do not generate a face.

- `write-video-script` waits until all three gates pass.

- Use numerals in what you hand them.

- It does not call a video-host API.
