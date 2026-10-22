# How a Dreamstate call is made

Use this shape. Fetch the schema every time. [tool-map.md](tool-map.md) says which ids were seen and which are to-check.

## Order

1. `whoami` once per session. See [AGENTS.md](../AGENTS.md).
2. `tools_get` with the exact `capability_id`. Read `required_fields`, `cost_policy`, and `execution_mode_contract`.
3. `tools_run`.

A free read that cannot dry-run uses `mode: "live"` and changes nothing. Say so. A paid read that refuses dry_run (`visibility.research.web_search` at 2 credits, `visibility.research.urls_fetch` at 1) is quoted from `cost_policy`, then run live after yes, with `max_credits` at that price and an `idempotency_key`. Do not send `dry_run` to those ids. `tables.x_post_engagers.run` treats a dry_run request as a live read of X. Do not send that mode.

## Paid or outward

```text
tools_run
  capability_id: the id you fetched
  mode: dry_run
  params: only fields the schema lists

# show rows, credits, quote_hash, then wait for a yes

tools_run
  capability_id: same
  mode: live
  quote_hash: the dry run's hash
  max_credits: the dry run's ceiling
  idempotency_key: a new string for this live attempt
  approved: true only after the owner said yes and the call requires it
  params: the same params, plus max_rows or max_live_sends when the schema has them
```

`max_rows` and `max_live_sends` are params of the capability, not gates of `tools_run`.

If the live call is refused, do not send it again with a new story. Read the error. A new `quote_hash` from that refusal is not a yes.

## Drafts that are not sends

`social.content.artifact_create` saves a draft. `social.content.plan` writes a day mark and does not publish. `sequence.sequences.create_from_worksheet` creates a draft sequence and does not start it. `social.comments.reply` freezes a preview. `unibox.inbox.reply_draft_edit` stores reply text. `tables.profile_watcher.preview` does not contact LinkedIn.

Say which of those you did. Do not describe a draft as scheduled or sent.

## Ids

Copy ids from the response that minted them. `artifact_id`, `table_id`, `worksheet_id`, `expected_revision`, `preview_hash`, and `quote_hash` are not examples. An example in a schema is not a value you may send.
