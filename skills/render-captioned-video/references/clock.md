## Clock

Each keep names a source, a start, and an end on that file. Output time is derived. Each span is `max(1, round half to even of (end - start) times fps)` frames, and the next span begins where those frames end.

A range that stores `out_start` fails when it disagrees.

A words file passed with `--words-out` fails when it disagrees with that map, and fails when no map was built. Do not keep a second clock by hand.

A word is kept when its start lies in a range, start included, end excluded. The word's end is clipped to the range end. Tokens that are not type `word` are left out. A named transcript that is missing fails.

Written times use that map, rounded to milliseconds with the same half-even rule.

When words are mapped, the checker prints phrase groups split where the gap reaches 0.5 seconds. That print is not a gate.

Paths resolve beside the plan file. Card times are seconds on the cut you are delivering. `edl` may point at a ranges file, or the ranges may sit in the plan. Both at once fails.

If the picture is already one graded or scaled file, set `edl` to null and do not attach raw ranges.

That file is the only clip, and its probed length is the clock. Sending audio out for a transcript needs the owner's yes. With no transcript, time the clip you have as one range from zero to its length, and say the words came from that file.
