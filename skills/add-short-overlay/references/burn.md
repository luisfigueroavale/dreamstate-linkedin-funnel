# Burn

The overlay is HTML, burned with ffmpeg onto the footage. Headline text on the overlay uses `--headline-gradient` when that token is set, and `--color-accent` when it is not. `--color-accent-2` is the second accent. Motion is `DeskTimeline`. Capture steps `__seek`.

On the burned frames, confirm the alpha channel, the layering, the text metrics, and that font loading succeeded. Read the installed ffmpeg help before you invent flags. Fonts are the files `brand.local` lists. When that list is empty, say the system face is in use.

After an edit change, resolve the cues again from that final transcript before the next burn.
