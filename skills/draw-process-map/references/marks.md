# Icons and color

Use one mark per card, the same size and the same stroke, inside that card's group. The words stay readable without the mark. Mark strokes stay marks. A mark set does not draw the route.

The HTML is the picture. A capture is an export of that file. If `brand.local/assets/README.md` lists a file for that use, use that file, keep its aspect, and look at the pixels.

Otherwise a simple CSS mark you name in the file: `file`, `person`, `company`, `note`, `calendar`, `message`, `check`, or `split`. A logo sits in its own group, and only when that README allows the use. A vendor link is optional.

Colors come from filled `brand.local` tokens. Headline text uses `--headline-gradient` when that token is set, and `--color-accent` when it is not. `--color-accent-2` is the second accent. Stop when those files are blank.

Use the owner's files for this map. Leave another client's look and subject matter out. `skills/draw-process-map/scripts/map-check.mjs` rejects a color role it does not know. It ships no palette and no logo. Loading the module draws nothing.
