---
name: x-week
description: "Plan X posts with the owner for the next 7 days from three lanes: adapted LinkedIn pieces, angles from posts they can show, and launches they already have. Use for an X slate, or for one post when they only want today. It does not post."
---

Follow `docs/skill-frame.md`.

`week-spread` owns the video post, including the short note that the video is up, and the X essay. Other X posts come from here: a short post, or a thread when the steps are required, including a chapter thread. Replies on someone else's post are `x-reply-queue`.

The window is the next 7 days unless they name another. Before the slate, read every `vault/week/*-x-verdicts.md`, oldest first. Then read what is already planned on every channel in that window: the week brief, `vault/board.md`, `vault/posts/`, and `social.content.artifact_list` (free read). Search the vault with `vault-find` before you treat a prior post as theirs. Leave out the video post, the X essay, and anything already planned, so the same piece is not set twice.

Before the first write or the first spend, `whoami`. If `whoami` returns two or more workspaces, ask which and stop. `tools_get` before every `tools_run`. The fetched schema wins.

Do not assume a pattern until this owner's own X results show one. `tools_get` `visibility.analytics_query` and read the stored snapshot. It is a free read, and it does not refresh. An empty snapshot means there is no pattern yet. Say so, and do not fill the gap. A figure from that snapshot stays out of a post unless the Proof page already has it. When a snapshot does show a pattern, add a verdicts row after the session.

Lane A is an adapted LinkedIn piece. Open a recent LinkedIn post in the vault or on the account. Keep it when one experience is doing the work: a result they can point at, a mistake that left a rule, or a choice they made. Carry the point. The LinkedIn shape stays on LinkedIn. You may keep their opening words exactly, then move to the point at once. If they replace that opening, the draft uses their line unchanged. Put the X version on the day after the LinkedIn day. They can swap those days. Name a product or a person only with a handle already in their notes, a paste, or a tool result from this session. If the handle is missing, ask. Do not guess one.

A comment-to-DM resource often does worse here than on LinkedIn. Measure their own posts before you plan another. If they still want the file on X, the post stands on its own. Do not carry counts over from LinkedIn, and do not write "now on X too". The picture keeps the two-step ask: the first step says follow, the second says comment the keyword. Do not crop that box off, and do not leave a connect line on the X picture. A new frame goes through `frame-build`, with both steps still on it. The keyword is the one `magnet-send` will use. This skill does not arm the rule. A send waits for yes on that rule.

Lane B is posts they can show. Use a paste, or `visibility.radar.inspiration_x_list` (free read; dry_run executes the read, so say that it was a read). Pass only fields the fetched schema lists. Open `x-scan` for the outlier test. Keep a post only when you can show it, that test passes, the date falls in the last 7 days, and the topic is a pillar in `vault/notes/pillars.md`. If that note is empty, say so and keep only a post that matches the filled reader file. `source.x_posts_search` is a definition id, not a `tools_run` id: resolve it with `tables.executable_definitions.list_resolved`, attach with `tables.table_sources.attach`, and run `tables.table_sources.run` only after the quote and the owner's yes. Record the url, the author, the date, and any count the paste or the tool actually returned. A missing field stays missing. Do not invent reach. The angle has to be their receipt, their disagreement, or their method. Do not copy the post. Do not pass another person's number or story off as the owner's.

A news claim stays off the slate until its source page has been opened. Call prices and modes: `docs/calls.md`. No yes means the claim stays off the slate.

Lane C is launches they already have: a product, a video, a graphic, or a resource. Ask once what is launching, and in which order. Do not ask a second time. The window read is what already went out. Do not add a launch that window already contains. The caption tells the viewer what they receive. Use wording the product already uses. No hype adjectives.

Writing. One point, in the first line. The post stays short. Voice is `brand.local/voice.md` and X posts they have already published. Read `vault/notes/pillars.md`, `vault/notes/concepts.md`, and `vault/notes/hooks.md` before the draft. An empty note is named, not filled. A thread only when the steps are required. Do not chop a LinkedIn piece into a thread, and do not restate the first line as the rest of the thread. In a thread, each post still makes its point if the reader stops. The post has to stand alone. If it needs the LinkedIn piece or the video beside it, fix it or cut it. Anti-slop: no role-verbs that only sound busy, no label-colon bullets, no bonus tag. Bullets are fine. A stack names each tool and the job it does. A process is first person and uses plain verbs. When posts from people they follow are already in hand, check the draft against that rule. If those posts are not in hand, say so. Do not start a search to collect them. Keep the tool, the number, and the mistake that make it theirs. Cut the rest. Numerals. Numbers only from the Proof page. No em dash. A video link is the full https URL. Do not shorten it. A link to their own site uses `utm_source=x` and the campaign slug on the week brief, including when the piece was adapted from LinkedIn. If the brief has no slug, ask once. Do not invent one. Links to other sites stay clean.

If they only want today's post, skip the slate. Write one post from the lane they named, or from the first lane you can source, ready to paste. The writing rules above still apply. Save it with the rules below. Do not schedule it in this step.

Otherwise slate about 1.5 times the slots. If they have not said how many X posts a day, ask once and wait. Do not pick a daily count for them. One table per day:

| Day | Lane | Angle | First line | Asset | Source |

The first line is the full opening and already follows the writing rules. Angle, asset, and source are one line each. Asset is the file they will attach, or none. Source is a path or url you can open. Mark one row per day with `suggest`. They pick, cut, and edit. Keep their words. An empty lane stays empty. Do not invent a row to fill the table. The slate is not a post.

After they pick, draft those posts. The single today post is saved the same way. Save each one as `vault/posts/<slug>.md` using `vault/fields.md`, and add the line on `vault/board.md`. `publish_date` stays empty. Put the same text in chat. Do not open a second database. When they ask to store a pick, `tools_get` `social.content.artifact_create` and follow `docs/content-desk.md`. One idea is one artifact. `social.content.plan` sets the day mark and is not a publish. Set that mark only when they asked for it. `social.content.schedule` waits for yes on that text, that media, and that time. Required `expected_revision`, `scheduled_at`, `artifact_id`. Dispatch still needs `social.content.approve` on that version. Do not call `social.content.auto_publish_set` or `social.content.approval.authorize_publish`. After they accept a draft, add the concept line the way `vault-find` does. Do not add a metric.

Append to `vault/week/<date>-x-verdicts.md` after the session. Use the brief's date when the brief exists, otherwise the session date, as YYYY-MM-DD. Create the file with this header and no sample rows:

| Date | Piece | Verdict | Why |

Newest row at the bottom. One row per keep, cut, or rewrite. The verdict is kept, cut, or rewritten, in their words when they gave them. The why is the rule for the next slate. Do not seed the file with anyone else's examples. The next slate starts from these rows.
