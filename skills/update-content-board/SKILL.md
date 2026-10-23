---
name: update-content-board
description: "Place a week's pieces on the local board from the owner's dates, time zone, and cadence. Use when the slate belongs on vault/board.md. A planned day is not a publish."
---
# Update the content board

Place a week's pieces on the local board from the owner's dates, time zone, and cadence. Follow `docs/skill-frame.md`.

## Use when

- The slate belongs on `vault/board.md`.

- A planned day is not a publish.

## Steps

1. Treat `vault/board.md` as the only board, and leave `publish_date` empty until the piece is actually out (`references/board.md`).

2. Read Proof, the notes, the week brief, and words marked public or approved (`references/sources.md`).

3. Place the week from the dates, time zone, channel, and cadence they named (`references/cadence.md`).

4. Give each piece one pillar, one topic, one subtopic, and one funnel job, and do not mint a pillar, a topic, or a job to fill an empty day (`references/pieces.md`).

5. File the draft and record the planned day on the week brief (`references/file.md`). That day is not a publish.

6. Store the piece with `social.content.artifact_create` only when they ask, after `tools_get`, and do not call `social.content.plan` yet (`references/remote.md`).

7. Set `planned_for` with `social.content.plan` on an artifact that already exists, and if no artifact exists, the brief holds the day (`references/remote.md`).

8. Schedule that piece with `social.content.schedule` only after yes (`references/remote.md`).

9. Approve that version with `social.content.approve` only after a yes on that version (`references/remote.md`).

10. Pull an armed send that has not started with `social.content.unschedule` (`references/remote.md`).

11. When a call comes back unclear, read the artifact with `social.content.artifact_get` before you call again.
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 6 | `social.content.artifact_create` | live | no |
| 7 | `social.content.plan` | live | no |
| 8 | `social.content.schedule` | live | yes |
| 9 | `social.content.approve` | live | yes |
| 10 | `social.content.unschedule` | live | no |
| 11 | `social.content.artifact_get` | read | no |

Never call: `social.content.unplan`.

## Stop rules

- A planned day is not a publish.

- `publish_date` stays empty until the piece is actually out.

- Do not claim a card was saved in another app.

- Do not invent a conversion figure.

- Do not assume four posts.

- Do not mint a pillar, a topic, or a job to fill an empty day.

- Do not add posts just to reach a number.

- Do not call it unasked.

- Plan and schedule both wait for yes.

- Approve waits for a yes on that version.

- It is not `social.content.unplan`, and it does not retract a live post.
