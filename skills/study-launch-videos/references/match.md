# Match

Take three fields from the brief: the product type, the proof type (`output`, `live_demo`, `before_after`, `measured_result`, `concept`), and the length in seconds. Records have no viewer field, so the viewer never filters. Use it only when you write what to borrow.

Map them to record fields:

- Product type to `category`, using the ids in `data/categories.json`.
- Proof type to `hook_family`, using the ids in `data/hooks.json`: `input-output` for output and live demo, `comparison` for before and after, `measurable-stakes` for a measured result. A concept has no family of its own, so match it on category and length only.
- Length to `duration_seconds`, within the same band in `data/structures.json`. A band runs from its `min` up to, not including, its `max`: 0 to 20 is the 15 band, 20 to 45 the 30 band, 45 to 75 the 60 band, 75 to 105 the 90 band, 105 to 150 the 120 band. A 45 second brief uses the 60 band. A null length matches no band.

Filter in this order: proof type, then category, then length. Keep at most five records. When more than five match, prefer records with `scene_cuts` and an `individual-post` snapshot, then the newest `post_date`.

Numbers never pick a match. A high view count is not a reason to include a record, and a low one is not a reason to drop it. Skip any record that fails `npm run validate`, and say which file and why.
