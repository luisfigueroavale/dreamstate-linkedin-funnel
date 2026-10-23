# Edges

Phrase location can trust word starts. Word ends are weaker: they spill into the quiet and raise false alarms. The transcript picks the line. The waveform picks where silence starts and where it stops.

The normal pad is 60 ms before the first word and 150 ms after the last word. Widen it only for plosives, breaths, or room acoustics.

For a webcam plus a screen demo, dropping early tries and trimming the tail means the cut opens on word one of the last finished take. Close about 150 ms past the sign-off.

Turn the pause trim off by setting `min_seconds` to 9999. Quiet removed while someone types or clicks makes the picture jump.
