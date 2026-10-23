# Ignore

`.gitignore` must list `brand.local/`, `audience.local/`, `work/`, `output/`, and `.banned-terms.local`. Add a missing line. Remove none.

`npm run check` reads that file when present and skips the scan when absent. Banned names go there, one per line.
