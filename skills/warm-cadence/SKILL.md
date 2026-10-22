---
name: warm-cadence
description: "Build a short draft sequence for people who already fit, with a daily cap and fallback copy. Use after fit is accepted. It does not activate."
---

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs `brand.local/identity.md` and `brand.local/voice.md` filled. Missing, empty, or `Status: blank` means stop and ask the owner. Do not guess identity, voice, or proof.

## Last

Run `brand/taste.md` on the result. Fix a miss you can fix without inventing a fact. Name any miss that needs the owner. Only then hand it over.

# Build the cadence

Read `docs/conversations.md`. `tools_get` `sequence.sequences.step_options` and use only returned step ids. `sequence.sequences.create_from_worksheet` makes a draft and does not start it. Pass `context_document_ids` from the pages you read when the schema asks.

Read `audience/AGENTS.md` and the filled follower file before you pick rows. Three steps or fewer. Enroll only rows that passed both fit columns and every required qualifying question with evidence. A required unknown is a hold. A required no with evidence is a stop. Do not enroll a hold or a stop. Keyword requesters who passed get the resource in step one, nothing else. Others get the post's topic and one question. No pitch. No line that says you saw a like. A like does not answer the test. Fallback text on every step that uses a row field. Greet by first name only if a `first_name` column exists. Set `max_new_enrollments_per_day`.

Preview at least three rows, one thin. `sequence.sequences.copy_preview` is to-check. Fetch it if you need token proof.

Activation is `sequence.sequences.activate_audience` and needs its own yes. Put `max_live_sends` in params when the schema lists it. There is no lifetime send ceiling. Say that in the ask. Do not activate from this skill.

## Done

The sequence id, the step text, the cap, and that it was not started.
