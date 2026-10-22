# One idea, one week

Skill: `week-spread`. The board skill is `week-board`. Both follow [skill-frame.md](skill-frame.md). A missing or blank `audience.local/ideal-follower.md` stops the week.

There is no Dreamstate object called a weekly plan. A week here is a local brief, then drafts, then a day mark only if you ask.

The procedure is [skills/week-spread/SKILL.md](../skills/week-spread/SKILL.md). This page holds the day table, the link rules, and the close calls.

## Stages

Enter at the stage the work is already in. Do not restart at 0 to look thorough.

| Stage | What it is | What finishes it |
|---|---|---|
| 0 | The owner picks the idea | A source you can name |
| 1 | Brief | `vault/week/<date>.md` filled |
| 2 | Board | The pieces listed on `vault/board.md` |
| 3 | Record | The script, then the file they record |
| 4 | Package | The file is the reach piece (native upload) |
| 5 | Drafts | Letter, X essay, lesson, posts |
| 6 | Schedule | A yes on that item, then `social.content.schedule` |
| 7 | Convert | `post-path`, `magnet-send`, `warm-cadence`, or `thread-reply` |
| 8 | Close | Read what the tools return. Do not invent the rest |

Stage 7 is not a profile watcher. Stage 6 does nothing without a yes on that exact artifact.

## Trunk and roots

The live recording is the trunk. Three roots grow from it.

- The file. Reach. This is the native upload.
- The argument. Belief, then signup. Write the letter first. The X essay, the lesson, and the resource post reuse that argument. The resource post is the signup.
- The transcript. Lines from it become later idea posts. They do not become new claims.

## Day table

One parent row for the recording. Every other row carries a status, a platform, and a date. Date them from release day D. One LinkedIn post a day. An idea post takes an open day and never shares a day with another LinkedIn post.

Start each row at Drafting. Move it to Published when it is live. A line that cannot stand without the recording goes to Backlog. Add a micro post, a chapter thread, or a repost of a winner only when the owner picks it. Keep the week near eight rows.

| When | Piece | Status | Platform | Job | Skill |
|---|---|---|---|---|---|
| D | The recording (parent) | Drafting | youtube | trunk, no funnel job | stage 4, `video-hold` |
| D | Letter | Drafting | newsletter | belief | `letter-draft` |
| D | X essay | Drafting | x | belief | `x-essay` |
| D | Short note that the recording is up | Drafting | x | reach | `x-draft` |
| Day they choose that week | Native recording | Drafting | linkedin | reach | `linkedin-draft` |
| That week's lesson day | The lesson | Drafting | linkedin | belief | `linkedin-draft`, `opening-line` |
| D+7 | Resource post | Drafting | linkedin | signup | `linkedin-draft`, `magnet-send` |
| Open days after the harvest | One or two idea posts | Drafting | linkedin | root 3 | `linkedin-draft` |

The letter exists before any piece that reuses its argument. The week's posts are text, pictures, and graphics. The finished recording goes on LinkedIn and on X only as the native file.

## Links

UTM source is the platform name: `linkedin`, `x`, `youtube`, or `newsletter`. The campaign is one short slug for the whole week, written on the brief, and copied onto every link. Video links are full https URLs. Do not shorten them. On LinkedIn the URL goes in the comment under the post, and the post tells the reader to look there.

## Close

`visibility.analytics_query` reads a stored snapshot. It does not refresh. When the snapshot says a refresh is required, call `visibility.analytics_refresh`: `platform`, `account_id` from `senders.social_accounts.list`, and `metric_scope` of `account`, `post`, or `audience`. A post scope also needs `provider_post_id`. 0 credits. There is no dry_run. Use smoke_test. Read `freshness.state`. `unsupported` means nothing was fetched.

`visibility.linkedin.comments.refresh` needs a `delivery_id`. Articles and newsletters return 422. It does not publish a comment. Read what came back with `visibility.linkedin_post_notifications_list`: `delivery_id` from `social.content.article_deliveries_list`, optional `limit` up to 100, no paging. A busy post stops at 100. Do not send dry_run.

`social.content.post_feedback_record` appends a note (`artifact_id`, `feedback_text`). It does not change the post. The bare id `post_feedback_record` is not a capability. Structured flags go to `visibility.content.feedback.record`: `artifact_id`, `artifact_version`, and the booleans `accepted_first_try`, `user_edited`, `published`. 0 credits. A stale version returns 409.

`social.content.unschedule` (`expected_revision`, `artifact_id`) pulls an armed send that has not started. It is not `social.content.unplan`, and it does not retract a post that is already live.

## The brief

Copy `vault/week/brief.md` to `vault/week/<date>.md`. The idea is one sentence the reader would recognize. The source is a page, a file in `vault/sources/`, or a note. No source means the idea is not ready. Proof is only a line already on the Proof page or in that source. Name the pieces you want and skip the rest. A day on the brief is a plan, not a publish time. Dreamstate ids are written on the brief only after a create call returns them.

## Not in this desk

No walkthrough link. No second planning database: the board is `vault/board.md`, and Dreamstate holds drafts. No video-host uploader: the owner uploads after `video-hold` packages the folder. No ranking plugin, no paid social radar, and no 3D scene library.
