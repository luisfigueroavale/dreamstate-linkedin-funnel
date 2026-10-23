## Captions

Captions are an SRT from the mapped words of the final cut, not from raw timestamps left in place. Apply `fixes` (token to the shown form), drop filler tokens, and drop a single token whose time is in `drop_at` within 0.02 seconds.

Given the SRT and the transcript, the checker fails a cue whose words are not in that window, and a cue that falls outside the cut. The match keeps letters, digits, and `$%+'`, so a display fix is not flattened away. It does not score a keep ratio.

Keeping 70 to 85 percent of the words is review only. Emphasis size and hero layout are not gates. With an SRT and no transcript, times are checked and the word match is reported as skipped.

Fonts come from files listed in `brand.local/assets/README.md`. If that list is empty, say the burn falls back to the system face. Do not vendor a font. No box behind every word unless they ask. `brand.local` is required for titles and overlays, not for the cuts themselves.
