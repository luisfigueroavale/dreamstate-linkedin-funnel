# Probe

Run `ffprobe` on the encoded file. The duration matches the edit list. Width and height stay at the native frame size. Read the channel count and the layout. Sample the opening second. A fade to black there fails unless the edit list asked for black.

Align frames on shared timestamps. Keep intended overlays and crops out before scoring. Another clip's threshold does not bind this one. Use a fresh temporary directory on each run, so files cannot mix.
