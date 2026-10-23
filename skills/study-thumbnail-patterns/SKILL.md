---
name: study-thumbnail-patterns
description: "Note repeating thumbnail patterns in a set the owner pasted or a tool returned, and brief directions. Use before design-video-thumbnail. It does not treat the set as a market law."
---
# Study thumbnail patterns

Note repeating thumbnail patterns in a set, and brief directions. Follow `docs/skill-frame.md`.

## Use when

- Use before `design-video-thumbnail` builds a picture.

- Titles stay in `write-video-titles`. This skill only briefs directions.

- It does not treat the set as a market law.

## Steps

1. It is a definition id, not a `tools_run` id (`references/source.md`).

2. Attach with `tables.table_sources.attach` (`references/source.md`).

3. Run `tables.table_sources.run` only after the quote and the owner's yes (`references/source.md`).

4. When that definition is not resolved, use the set the owner pasted or a tool response they supplied (`references/source.md`, `references/set.md`).

5. Judge at 1280×720 and at 320×180 (`references/still.md`).

6. Split overused from useful (`references/patterns.md`).

7. Keep colour from `brand.local` (`references/concepts.md`). Stop if that file is blank or missing.

8. The owner picks before a frame is built (`references/concepts.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 1 | `tables.executable_definitions.list_resolved` | read | no |
| 2 | `tables.table_sources.attach` | write | no |
| 3 | `tables.table_sources.run` | dry_run, then live | yes |


## Stop rules

- This desk does not call a video-host API.

- The set is not a market law.

- Do not invent a link.

- Do not treat another channel's result as the owner's.

- Call a still high-performing only when the paste or the tool response already says so.

- Do not copy one of these just because it is common.

- No generated face.

- Do not smooth a face they gave you, and do not swap it.

- If that file is blank or missing, stop and ask.

- Do not guess a colour.

- Titles stay in `write-video-titles`.
