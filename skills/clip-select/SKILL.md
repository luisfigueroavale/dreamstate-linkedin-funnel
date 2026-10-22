---
name: clip-select
description: "Choose complete takes and drop false starts and dead air, keeping speech meaning and word boundaries. Use before a short is assembled. It does not export the final file."
---

Follow `docs/skill-frame.md`.

Read the full transcript and listen to the candidate ranges. Inspect each candidate range. Decide whether a repeat is a retake or emphasis they meant. On retake-heavy footage, prefer the last complete attempt. When the brief or the performance says otherwise, the strongest coherent take wins.

For each beat record the source file, in-point, out-point, and why that range. Drop false starts. Reject an unfinished fragment even if it is the last thing they said. A retake can sit inside a phrase. Inspect at word level.

Speech-to-text times are a start. Listen around every cut so a consonant or a breath is not clipped. Keep each word boundary whole, and keep the speech meaning. Remove silence inside a take only when the pace gets better. Keep a pause they meant. Drop dead air that sits between attempts.

Build the list from source time. That list is the EDL. Output positions are cumulative. Derive output positions by adding durations. After the cut changes, regenerate caption times and overlay cues. Regenerate the downstream timing map in the same pass. Do not keep two conflicting timelines by hand.

Play every join in context. If you cannot play a join here, render that join and watch it in context. Return the kept ranges, the rejected alternatives when they matter, the final duration, and any transcript you do not trust. `clip-check` is the finished-file pass. This skill does not export the final file.
