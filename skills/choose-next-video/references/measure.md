# Measure

Best source first. The cheapest source is a file already in `vault/sources/`.

Call prices and modes are in `docs/calls.md`. No paid research without a yes.

Before hand-typed counts, resolve `source.account_posts_youtube` with `tables.executable_definitions.list_resolved`. It is a definition id, not a `tools_run` id.

Attach with `tables.table_sources.attach`.

Run `tables.table_sources.run` only after the quote and the owner's yes.

If that definition is not resolved, they type the counts after opening the pages: the past 30 days, the channel behind each result, and the median of its last 20 to 30 long uploads.

A badge from an outlier plugin is not a measurement you fetched.

Do not add a host client, a plugin, or a caption downloader. If a path needs an API key, drop it.

Score the sheet locally. The script does not open a socket. What rank computes, what depth computes, and the sheet JSON are in `skills/choose-next-video/references/score-sheet.md`.

Count 6 probes. Sheet size is a search cap of 20, a depth cap of 3, and those 6 probes. Default breadth is 4. Default outlier is 3. Going past 30 searches needs another yes.

Save numbers under `vault/sources/<date>-<slug>/` (append only). A fix is a new file.

In `origin.md`, record what was counted, when, the command, and that no host was called. Append one line to `vault/sources/README.md`. Do not commit the folder.

```sh
node skills/choose-next-video/scripts/score-sheet.mjs rank --sheet vault/sources/<date>-<slug>/sheet.json --out vault/sources/<date>-<slug>
node skills/choose-next-video/scripts/score-sheet.mjs depth --sheet vault/sources/<date>-<slug>/sheet.json --out vault/sources/<date>-<slug>
node skills/choose-next-video/scripts/score-sheet.mjs card --heat 2 --gap 2 --fit 2 --timing 1 --receipt 1
node skills/choose-next-video/scripts/score-sheet.mjs opening --file vault/notes/video/<date>-<slug>-opening.txt
node skills/choose-next-video/scripts/score-sheet.mjs packaging --donors vault/sources/<date>-<slug>/donors.json
```

Adding rows and rerunning reprints the tree. Nothing is fetched.

`depth` refuses to run without `fit`. `--max-depth 0` reports the seeds and proposes no children. `--days`, `--outlier`, and `--breadth` override the sheet.
