# One idea, one week

Skill: `week-spread`. The board skill is `week-board`. Both follow [skill-frame.md](skill-frame.md). A missing or blank `audience.local/ideal-follower.md` stops the week.

There is no Dreamstate object called a weekly plan. A week here is a local brief, then drafts, then a day mark only if you ask.

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

## Day map

One LinkedIn post a day.

| When | What ships |
|---|---|
| D | The video, the letter, the X essay, and a short X note that the video is up |
| D, LinkedIn | The native video, when the owner wants that slot |
| That week's lesson slot | The argument, taught |
| D+7 | The resource post |
| Open days | One or two idea posts from the transcript |

## Links

UTM source is the platform name: `linkedin`, `x`, `youtube`, or `newsletter`. The campaign is one short slug for the whole week, written on the brief, and copied onto every link. Video links are full https URLs. Do not shorten them. On LinkedIn the URL goes in the comment under the post, and the post tells the reader to look there.

## Close

`visibility.analytics_query` reads a stored snapshot. It does not refresh. If the response says a refresh is required, `visibility.analytics_refresh` is to-check until `tools_get`. Do not invent its arguments.

`visibility.linkedin.comments.refresh` needs a `delivery_id`. Articles and newsletters return 422. It does not publish a comment.

`social.content.post_feedback_record` appends a note (`artifact_id`, `feedback_text`). It does not change the post. The bare id `post_feedback_record` is not a capability.

`social.content.unschedule` (`expected_revision`, `artifact_id`) pulls an armed send that has not started. It is not `social.content.unplan`, and it does not retract a post that is already live.

## The brief

Copy `vault/week/brief.md` to `vault/week/<date>.md`. The idea is one sentence the reader would recognize. The source is a page, a file in `vault/sources/`, or a note. No source means the idea is not ready. Proof is only a line already on the Proof page or in that source. Name the pieces you want and skip the rest. A day on the brief is a plan, not a publish time. Dreamstate ids are written on the brief only after a create call returns them.
