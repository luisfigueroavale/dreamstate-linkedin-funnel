# Outlier

An outlier, in this desk, is a post whose views per day beat that account's own median inside the set you hold. Save the rows you actually hold. Copy the full text that came back, the timestamp, the author, each metric, and any quoted post the response included.

Leave out a metric the response did not include. Then run, from the repo root:

`python3 skills/find-x-angles/scripts/hold_median.py <file> --fetched-at <capture time>`

The script makes no network call. It dedupes, leaves a missing metric empty, and sets `outlier` only from that file. One measured post from an account cannot beat its own median. If the file has no view counts, say unknown.

Do not explain performance from a snippet, and do not explain it from a median you did not compute. A popular line does not establish how a product works, what converted, or what caused the number. Keep three layers apart: what the post says, what you guess drew attention, and what the owner could add.

Drop celebrity reach that is off the reader, an empty take, a copied story, and an outcome nobody checked. Do not lift a distinctive sentence.
