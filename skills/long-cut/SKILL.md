---
name: long-cut
description: "Shape a long recording as a designed opener plus the screen recording. Reach for it when a straight trim cannot carry the opening pictures. It does not upload."
---

Follow `docs/skill-frame.md`.

Make one finished file from the recording they gave you. This brief and this footage choose the treatment. A direction for this recording outranks a preset saved from an earlier job.

The usual shape is a designed opener of the speaker, then the screen recording. If they want graphics on the whole file, plan those beats from the transcript: a chapter card where the speech changes section, a short idea plate on a flat ground or a frosted ground, a spotlight on the interface they name, and a hard reframe where they face the camera. Review each beat you planned. Leave a pause empty when it does not need a graphic.

Transcribe with a time on every word. Mark the hook, every claim that deserves a picture, the first frame of the demonstration, and the closing transition. Start on the spoken hook. Cut the dead air and the false starts at the top. For each removal, record the source in-point, the source out-point, and why it goes. Watch the picture and listen at every join. Keep a pause when the viewer still has to follow the screen. Before you build, inspect the recording, the transcript, the frame rate, and the audio, and write that source-range list. A body that is only a trim goes through `talk-cut`.

On the opener, use short phrase captions, real supporting pictures, small camera moves, and only a few motion graphics. Match each picture to the beat they are saying. A launch page, a logo, or a number shows up when they name it. It stays about 1.5 to 3 seconds, then leaves. Show the real picture from the recording or the receipt. Do not draw a fake card. The opener still works with the sound off. The speaker remains the subject. Keep those phrase captions a comfortable size and clear of the face. Nudge the framing at the boundary between phrases. One graphic carries one spoken idea, then it leaves.

A counter may climb only as far as the real value. When a counter, a chart, and an arrow share one reveal, they match on every frame. Use an analytics picture or a chart drawn from real measurements. That analytics picture is full frame and wears the numbers already printed on it. Do not stamp a rounder caption over it. If the figure has a window, say the window, for example the last 7 days. Numbers and wording on screen match the speech and the Proof page. When the speech and a receipt disagree, put the receipt on screen and tell the owner. Give each related figure its own beat. A comparison becomes columns, one figure to a column.

Hold one calm system through the opener: neutral ground, a few see-through panels, precise type, and a single accent. Do not use captions that are large and all the same, slabs that crowd the frame, wipes that look cheap, or transitions that bounce. Vary the side so the opener does not sit in one place: left card, then the whole frame, then a right card, then the whole frame again, then a split. Shift the camera away from whichever side the card occupies. Where type sits on a dark or busy picture, thicken the glass. A full-frame moment is frosted glass over their own footage. Ramp the blur in and back out. `DeskTimeline` sets `backdrop-filter` on the frost and drives a separate tint layer. Do not fade the overlay parent. If that parent sits below opacity 1, the blur switches off and the frost arrives late. That frosted full frame can also cover a jump cut. Do not let a talking stretch run past about 7 seconds with no visual change. For a longer stretch, snap-punch in on the phrase that matters, or split the frame: the speaker inside a rounded window, a diagram building beside them, the two at one height. The first frame is already moving, a small zoom that settles. On the closing line, push closer, then cut into the demonstration.

The usual body is the screen recording, picture only. When they asked for that, remove unwanted time and stutters, and add nothing else. That stretch gets no captions, no zooms, no overlays, and no chapter breaks. Fix timing only by cutting source ranges.

Sound follows events the viewer can see. Use few quiet cues. Add them only if they asked for sound design, and tie each one to a clear motion: a panel coming in, a landing, or a reveal. Keep their voice. Do not stamp a click on a repeating grid. No music unless they asked. Set the mix by ear against the words, then measure the export.

Build the opener as an editable motion scene in HTML. Motion is `DeskTimeline`, and capture calls `__seek`. CSS does not animate. Hide every element until its entrance, and have each one gone before the last opener frame, so the join into the body shows no leftover. Also inspect descendants. A descendant forced to stay visible can outlive the parent's timer and leave a panel up. Run the motion check, render, and look at a timed contact sheet plus the encoded opener before assembly. Review the opening frames, each graphic as it enters and as it exits, the last opener frame, and the joins. A structural pass will miss a graphic that lingers past its beat.

Assemble the rendered opener, the cut body, and the close. Check picture and sound on every cut. Inspect the camera-to-screen handoff frame by frame, and do the same for the closing cut.

Encode H.264 video and AAC audio at the frame rate of the recording. Loudness about -14 LUFS integrated and true peak at or under -1.5 dBTP. Decode the whole file. Confirm duration and streams. Review a contact sheet of that finished file.

`brand.local` is required for titles and overlays, not for the cuts. Fonts come from files listed there. If none are listed, say you are on the system face. Do not vendor a font. Keep the editable scene, the cut list, and the check notes beside the file. Title, description, thumbnail, and upload are other skills. Do not upload.
