---
name: adapt-essay-for-linkedin
description: "Adapt a finished essay into a LinkedIn article draft and a short share post, keeping the claims. Use after write-x-article. It does not upload or publish."
---
# Adapt an essay for LinkedIn

Make a LinkedIn article the owner can review from the finished essay. Follow `docs/skill-frame.md`.

## Use when

- Use after write-x-article, for a LinkedIn article draft and a short share post that keep the claims.

- It does not upload or publish.

## Steps

1. Call `whoami` before the first write (`references/calls.md`).

2. Call `tools_get` before every `tools_run`, and let the schema just fetched win (`references/calls.md`).

3. Read the finished essay, the newest picture set, the HTML for each figure, the figure list, and the Proof page (`references/read.md`).

4. When the finished essay is a remote page, open it with `visibility.research.urls_fetch` (`references/remote.md`).

5. Keep the title, the argument, the section sequence, the examples, the links, the figures, and the voice (`references/edit.md`).

6. Change a sentence only when LinkedIn's article editor would make the essay's version worse (`references/edit.md`).

7. Keep each figure where the essay put it (`references/figures.md`).

8. Build the article cover at 16:9 (`references/cover.md`).

9. Make the file pack at `vault/posts/<slug>-linkedin/` (`references/pack.md`).

10. Write the short description and the share post (`references/share.md`).

11. Call `social.content.article_enabled_get` first (`references/calls.md`). It takes no params.

12. Draft the article with `social.content.article_create_schedule` only after the owner asks for a saved draft (`references/calls.md`).

13. Update that draft with `social.content.article_update` (`references/calls.md`).

14. Call `social.content.article_delivery_create` only after a yes on that article (`references/calls.md`).

15. Store the share post with `social.content.artifact_create` only when the owner asks (`references/calls.md`).

16. Call `social.posts.comment_publish` only after a yes on that exact body (`references/calls.md`).

17. Call `social.engagement.comment` only after a yes on that comment text (`references/calls.md`).

18. Save the LinkedIn line on `vault/board.md` only after the owner asks (`references/board.md`).

19. Hand over the folder and say that nothing was uploaded (`references/pack.md`).
## Dreamstate tools

| Step | Tool id | Mode | Needs yes? |
|---|---|---|---|
| 1 | `whoami` | read | no |
| 4 | `visibility.research.urls_fetch` | live | yes |
| 11 | `social.content.article_enabled_get` | read | no |
| 12 | `social.content.article_create_schedule` | live | yes |
| 13 | `social.content.article_update` | live | no |
| 14 | `social.content.article_delivery_create` | live | yes |
| 15 | `social.content.artifact_create` | live | no |
| 16 | `social.posts.comment_publish` | dry_run, then live | yes |
| 17 | `social.engagement.comment` | smoke_test | no |
| 17 | `social.engagement.comment` | live | yes |

Never call: `social.content.article_create`.

## Stop rules

- Follow the skill-frame writing rules.

- Do not rebuild the piece from an older brief or from a preview.

- If that slug is missing, or the essay and the brief disagree, ask. Do not mint one.

- Links that go somewhere else stay as written.

- Do not recast the piece as a feed post.

- Do not add a hook.

- Do not lengthen it.

- Do not alter a claim that has no source.

- A window or a unit stays beside its own number.

- Leave the bitmap unstretched.

- Do not trade a specific diagram for generic cards.

- Picture work stops at this article.

- Do not scale the portrait bitmap into 16:9.

- The profile-banner size is the wrong target.

- The ratio stays 16:9.

- Put a number on that card only when the essay and the Proof page already state it.

- Replace an older pack only when its name and its files are this same article, and only after those files have been read.

- The pack has to work with no ZIP.

- Do not use a signed image address that will expire.

- Leave the essay draft unchanged.

- Files on disk do not allow a publish and do not allow a schedule.

- Say that nothing was uploaded.

- A number appears only when the Proof page has cleared it.

- Do not turn that middle into tips.

- Do not lift a sample post, its story, or its stand-in counts.

- If the flag is off, stop. The other article calls 404.

- Do not send a cover on `social.content.article_create`.

- Carry a body only after the owner asks for a saved draft.

- A date is refused.

- Do not invent a capability id.

- `social.content.article_delivery_create` waits for a yes on that article.

- Do not send `publish_directly: true`.

- Do not schedule the post from this skill.

- Do not upload the cover, the figures, or the portrait, and do not publish the article, the share post, or the comment, unless the owner has said yes to that exact item.

- A yes on other wording, other media, or another day is a new yes.

- `social.posts.comment_publish` runs only from an approved durable run step, or the call returns 409 `durable_run_step_required`.

- It is not a way to fill a draft.

- Neither comment call runs before a yes on that comment text.

- A save on the board is only after the owner asks.

- Leave `publish_date` empty.
