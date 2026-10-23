# Measure

Run `node scripts/opening-measure.mjs --json` on one draft path, or pipe the plain text with no path. Counts are Unicode code points. The same report gives UTF-16 units, which is the count that moves when emoji are in the text.

CRLF is normalized, and a lone CR is normalized, both to LF. Whitespace stays as written. The block drops the line break after its last line and keeps the breaks between its lines. If no line has text, the block is empty.

`opening_chars` is that block. `slice_140` and `slice_210` are prefixes of the full text, so they are not a second name for the block. Both slices are text checks, not a layout. `not_a_feed_preview` is true.

Notes, printed under `notes`: `empty`, `leading-space`, `first-line-over-60` (not an auto-reject; judge the line), `opening-over-140`, `blank-line-in-opening`, `over-3000` when code points pass 3000, and `utf16-over-3000` only when code points are still within 3000 and UTF-16 is over 3000.

A blank line in the opening can shove the second beat down. Leading space spends room at the front, so keep it only on purpose.

JSON mode is `--json`. Empty input, including whitespace only, still prints the report and exits 1. Any other text exits 0, notes included.
