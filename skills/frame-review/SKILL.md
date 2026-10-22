---
name: frame-review
description: "Review a rendered frame at full size and phone width, and a motion filmstrip when one exists. Use after frame-build. The owner is the last reviewer."
---

## First

Read `brand/AGENTS.md` and follow its read order. Drafting needs filled `brand.local/identity.md` and `brand.local/voice.md`. Designing also needs filled `brand.local/style.md` and `brand.local/tokens.css` (not `unset`). Missing, empty, or `Status: blank` means stop and ask. Do not invent a color, a font, or a logo. Use an asset only when `brand.local/assets/README.md` allows that use.

## Last

Run `brand/taste.md` on the copy, the layout, the motion, and the export. A script exit code is not this check. Only then hand it over.

# Review the frame

Open the 1x PNG and the phone-width PNG. The still must be `__seek(duration)` of the same JavaScript timeline, not a separate CSS state. For motion, open frames at 0s (empty), about 2.3s (built), and the last frame (the still). The hold's two ends match. Check `brand/taste.md` design, motion, and numbers. Name the single largest fault. Fix that fault in the HTML or the scene script and render again. Stop after two or three rounds, or sooner if nothing material remains.

Do not say the piece passed because `npm run capture` exited 0. Do not schedule. If you attach a new file to an artifact that was already approved, tell the owner the previous yes is stale.

## Done

What you looked at, the fault you fixed, and what is still open.
