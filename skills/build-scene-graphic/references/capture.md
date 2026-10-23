# Capture

`scripts/capture-motion.mjs` writes the MP4 at 1080×1350, H.264, 25fps, and the GIF at 720×900, 15fps, under 5MB. It steps `__seek`.

`scripts/render-still.mjs` writes the scale-2 still and the phone-width file from that same last frame.

If the GIF is over 5MB, simplify the motion and capture again.
