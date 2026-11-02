# Match

Take four fields from the brief: the viewer, the product type, the proof type (`output`, `live_demo`, `before_after`, `measured_result`, `concept`), and the length in seconds.

Map them to record fields:

- Product type to `category`, using the ids in `data/categories.json`.
- Proof type to `hook_family`, using the ids in `data/hooks.json`: `input-output` for output and live demo, `comparison` for before and after, `measurable-stakes` for a measured result. A concept has no family of its own, so match it on category and length only.
- Length to `duration_seconds`, within the same band in `data/structures.json` (15, 30, 60, 90, 120). A null length matches no band.

Filter in this order: proof type, then category, then length, then viewer. Keep at most five records. When more than five match, prefer records with `scene_cuts` and an `individual-post` snapshot, then the newest `post_date`.

Numbers never pick a match. A high view count is not a reason to include a record, and a low one is not a reason to drop it. Skip any record that fails `npm run validate`, and say which file and why.
