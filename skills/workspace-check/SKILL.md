---
name: workspace-check
description: "Confirm the active Dreamstate workspace before a write or a spend. Use at the start of a later session. It does not draft or send."
---

Follow `docs/skill-frame.md`.

`whoami`. Tell the owner which workspace is active, in chat only. Do not write the name or any id into the repo. If another workspace is active, stop. Then two free reads: `senders.linkedin_accounts.list` (optional `limit`) and `social.channels_list` (optional `limit`). No LinkedIn account means you cannot harvest or comment later. `senders.social_accounts.list` (optional `platform`, `limit`) is where draft account ids come from. Do not draft or send here.
