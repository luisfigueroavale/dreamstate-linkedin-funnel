---
name: adapt-essay-for-linkedin
description: "Adapt a finished essay into a LinkedIn article draft and a short share post, keeping the claims. Use after write-x-article. It does not upload or publish."
---

Follow `docs/skill-frame.md`.

Make a LinkedIn article the owner can review from the finished essay. Before any edit, read that essay, the newest picture set, the HTML for each figure, the figure list, and the Proof page. A later hand edit of the essay wins. Do not rebuild the piece from an older brief or from a preview.

Leave the title, the argument, the section sequence, the examples, the links, the figures, and the voice as they stand. The one link edit is on the owner's own site: set `utm_source=linkedin` and keep the weekly campaign slug already on the essay and the brief, so these readers are not filed under the essay's other channel. If that slug is missing, or the essay and the brief disagree, ask. Do not mint one. Links that go somewhere else stay as written.

Change a sentence only when LinkedIn's article editor would make the essay's version worse: remove a reference that exists only for the other channel, retune an opening or a close that assumes that channel, and repair formatting that is actually broken. If the essay is already about LinkedIn, change little. Do not recast the piece as a feed post. Do not add a hook. Do not lengthen it. Do not alter a claim that has no source. Numbers, windows of time, qualifiers, and the split between what was shown and what is only proposed stay at the same scope. Check them on the Proof page. A window or a unit stays beside its own number.

Keep each figure where the essay put it, and keep the caption with it. Reuse an approved full-size export while that export is still right. When the frame must change, edit the HTML and inspect the file you just wrote. Leave the bitmap unstretched. Do not trade a specific diagram for generic cards. Rebuild a picture with `design-post-graphic`, then `review-graphic`. A process map uses `draw-process-map`. Stay inside `brand.local` and the design already approved for this essay. Picture work stops at this article.

The article gets its own cover. That file is not a profile banner. The feed keeps the portrait. Build the article frame at 16:9 from the HTML, and set the spacing for that ratio. Do not scale the portrait bitmap into 16:9.

At execution, open LinkedIn's current article-cover help and read the pixel size and the allowed formats. A page there has pointed at 1920 by 1080 for this ratio. Read it again. The profile-banner size is the wrong target. A size named in `brand.local/style.md` overrides that pixel target. Say which size you used. The ratio stays 16:9.

Keep a result the reader would still recognize. Keep the hierarchy, the type, the palette, and imagery of the real system. Hold important type off edges a crop is likely to take. Review the native pixels and a narrow width, including the 390px check in `review-graphic`. Save the HTML next to a PNG or a JPEG that fits the limits you just read.

On a results-led essay, one arrangement is allowed, and it is not a pattern you reuse on other covers: the result line sits on the left, one card in the upper right holds one or two proof numbers, and the real workflow diagram spans the width underneath. Put a number on that card only when the essay and the Proof page already state it. The window or the unit stays on that number alone.

Make one named folder, at the path the owner gives, or else `vault/posts/<slug>-linkedin/`. The status board stays `vault/board.md`. This folder is the file pack. Its top level holds only what a person can place by hand:

- `00-cover.png`, for the article's cover field.
- `01-`, then `02-`, and the rest: one PNG for each inline figure, in the essay's order, taken from the best export you have already inspected.
- `ARTICLE.md`: the adapted title in full and the body in full. Where a figure belongs, name that local file. Captions stay. A link that already works stays.
- `START-HERE.txt`: where the essay lives, how to set the cover, the order of the images, and any wording that actually changed. This note is short. It is not another copy of the essay.
- The short description, the share post, and the comment, each ready to paste.

Start a fresh folder. Replace an older pack only when its name and its files are this same article, and only after those files have been read. Leave the essay, its HTML, and the portrait in place. The note names the editable HTML. Before the handoff, open each image at its real pixel size, confirm the format, read the type, confirm the figures follow the essay, resolve each local link, and confirm the article text is whole. The pack has to work with no ZIP.

If the finished essay is a remote page, open it with `visibility.research.urls_fetch` (required `urls`; prices in `docs/calls.md`) and read it through, including how its images are ordered, then build the pack from that version. Prefer a local export. Do not use a signed image address that will expire. Leave the essay draft unchanged.

Files on disk do not allow a publish and do not allow a schedule. Say that nothing was uploaded.

When the handoff needs a description or a post for the network, write those as two pieces, in the voice in `brand.local/voice.md`. Keep the description short. The post can be pasted as it stands.

Open that post on the result, using the owner's words. A number appears only when the Proof page has cleared it, and the window of time for that number stays in the same sentence. The middle is the earlier state, the later state, and how the change works. Do not turn that middle into tips. Tell the reader why opening the article is worth it. Leave the article's procedure inside the article. Public figures stay inside the Proof page. The result is what shows before the fold. The last line is an ask or a question.

The post points at the article. It tells the reader the link sits in the comment under the post. That comment is the article URL with `utm_source=linkedin` and the same weekly campaign. Do not lift a sample post, its story, or its stand-in counts.

`whoami` before the first write. `tools_get` before every `tools_run`. The schema just fetched wins.

Call `social.content.article_enabled_get` first. It takes no params. If the flag is off, stop. The other article calls 404.

`social.content.article_create` has no cover field. It is not how a body is carried. Do not send a cover on it.

Carry a body only after the owner asks for a saved draft. Use `social.content.article_create_schedule` with `scheduled_date` omitted or null. A date is refused. That call drafts the article plus an artifact. It does not publish. Copy `article_id` and `expected_revision` from the response that returned them.

Then `social.content.article_update` with `article_id`, `expected_revision`, `title`, and `body_json`. Send title and body on every call, with `body_json` in the shape that schema shows. Read the stored title and body back from that response, or from the get that schema names. Do not invent a capability id.

`social.content.article_delivery_create` waits for a yes on that article, because two of its shapes publish. LinkedIn `publish_directly: true` is rejected. Do not send that flag.

The share post is a separate object from the article. It stays in the folder until the owner asks to store that post. The store call is `social.content.artifact_create`. Do not schedule the post from this skill. The portrait remains the feed image.

Do not upload the cover, the figures, or the portrait, and do not publish the article, the share post, or the comment, unless the owner has said yes to that exact item. A yes on other wording, other media, or another day is a new yes. `social.posts.comment_publish` is 2 credits. dry_run previews; live repeats `quote_hash` with `max_credits` 2. Required `channel` `"linkedin"`, `account_id`, `target_post_urn`, `body`, and `consequence` `"public_comment"`. It runs only from an approved durable run step, or the call returns 409 `durable_run_step_required`. The owner says yes on that exact body. It is not a way to fill a draft. `social.engagement.comment` can preview when `approved` is omitted. A live comment also needs `approved: true` and an `idempotency_key`. Neither runs before a yes on that comment text.

A save on the board is for LinkedIn, in draft, with a full readback, and only after the owner asks. On `vault/board.md` the line stays under Drafting. Leave `publish_date` empty. Record returned ids on the brief. Close by naming where the folder is, which article text you adapted, where the cover HTML is, the pixel sizes, and which editor step is still open. The cover is not a field on `article_create`. The owner can open that folder and drop the files in, following the numbers, inside LinkedIn's article editor.

## Stop rules
- Follow the skill-frame writing rules.
