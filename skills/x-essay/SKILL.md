---
name: x-essay
description: "Write or revise a long X article from the owner's letter, framework, notes, or giveaway, with pictures only where they explain a claim. Also write the short post for a new video. Use for that long piece or that video post. A short post is x-draft. It does not publish."
---

Follow `docs/skill-frame.md`.

Write or revise a native X article, or a long illustrated post. A short post or a thread is `x-draft`. A week's slate is `x-week`. The announcement post for a video stays in this skill. Adapt the argument the owner already approved. In a week, that argument is the letter. With no letter, use the transcript, framework, post, or giveaway they named. Do not invent a thesis. The words and the pictures describe that same argument.

Ground the brief before any sentence. Read the source itself, the Proof page, `brand.local/identity.md`, `brand.local/voice.md`, `audience.local/ideal-follower.md`, `vault/notes/pillars.md`, and `vault/notes/funnel-stages.md`. How they sound comes from `brand.local/voice.md`. This opening is not a LinkedIn hook: do not shrink it to about 210 characters, and do not force the last line to ask. The brief names the reader's problem, the thesis, what the owner contributed, the evidence, the section order, the pillar, the funnel job, and the pictures. If a note is empty, say so. Ask only when the answer would change the argument.

If they supply a post URL, open that post and any article linked from it, cover included, inline pictures included. Say what you could read, and which parts stayed closed. Do not rebuild the piece from a card or a preview. A paste needs no fetch. A fetch is `visibility.research.urls_fetch` after `tools_get`. Required `urls`. Call prices and modes: `docs/calls.md`.

The title is specific. The opening is the result, the proof they can show, and the reader's payoff. Use the strongest result the Proof page supports. The payoff is what they can build. After that, the mechanism: tools, order, decisions, and why. Keep their concrete details and their first-person experience.

Personal means a documented habit, mistake, or decision. Changing "you" to "I" is not personal. Keep the names they gave their frameworks. Explain each name once, on first use.

Use the shortest explanation that is still complete. Two sentences and one picture can be a whole section. Do not pad. State the action or the belief, then the reason. Short lists are for inputs, stages, and routing. A failure is the missing input or the decision they named. Say that missing piece, such as context the draft never received. Do not replace it with a general complaint that the piece lacked a point. Each section keeps the job you gave it. Leave out an example, a script, or a side topic they already cut, even when it still feels relevant.

Separate what they demonstrated from what they only propose. A number comes only from the Proof page. Keep each time window in its own claim. A reference piece is craft only. Study how it makes the stakes plain, and how a picture holds a fact. Do not take its stories, its numbers, or its lines.

Numerals. No em dash. No hashtags. No generic machine phrasing. A link on their own site uses `utm_source=x` and `utm_campaign` set to the weekly slug on the brief. Every other link stays clean.

A picture only where it explains the next claim. That is a cover, or an inline frame beside the paragraph it proves. Record the cover path and each inline path on the brief. Number those inline files in article order, and add where each one sits. Keep a caption only when it adds a fact the picture does not show. Placeholder text from an editor is not a caption. New pictures are `frame-build` or `station-map`. Keep the HTML. The still is the last frame of that timeline, at full size. Do not redraw it from a small export.

For the post that goes with a new video, use this shape. One line on the reader's world or the result. One or two lines on what the video shows. Attach the native video if they have the file. If the file is missing, say so and leave the video off. Put the full https URL in the post. Do not shorten that URL.

A hand edit sets the rule in `brand.local/voice.md` without storing a second copy of their sentence. Compare that edit with the draft before it. The rule covers the depth and the pace, plus each addition, each cut, and each rename. Length, examples, headings, and tone in the edit replace the earlier draft. Writing the rule does not start another rewrite. It does not publish.

Return the title, the article, the cover path, each inline path with its place, and any fact still open. Do not publish. Do not schedule. Do not call `social.content.schedule` or `social.content.approve`. Do not call `social.content.article_create` (no cover field, and it cannot schedule), `social.content.article_create_schedule` (it refuses a date; `scheduled_date` omitted or null is the only form that call accepts), or `social.content.article_delivery_create` (two of its shapes publish). Hand the draft and the picture files to the owner. They paste both into X's article editor. Tell them this desk did not post anything. If they ask to store the video post, `tools_get` `social.content.artifact_create` and save one draft. Fetch the shape of the channel field. x is one of the writable channels the contract named. Re-fetch, because that list moves. That save does not publish. Do not put the long article in that post artifact.

Before you hand it back, check five things. The title promises a useful outcome. The opening holds the strongest result the Proof page supports. The owner would recognize the reasoning. A reader can scan the piece and act. The words, the pictures, and the links describe one system.
