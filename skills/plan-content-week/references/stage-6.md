# Stage 6

## Stage 6

Queue a piece on its day only after yes on that text, that media, and that time. `social.content.schedule` needs `expected_revision`, `scheduled_at`, and `artifact_id`. Dispatch still needs `social.content.approve` on that version. If they set the time inside the host by hand, wait for that yes too, and do not also arm a second send for the same piece.

The letter stays a draft until they approve it. `write-newsletter-issue` does not send mail. Status stays Drafting until the piece is live, then Published.

One LinkedIn post a day. An idea post takes an open day. It never becomes a second post on a day that already has one.

To pull an armed send back, use the unschedule call in stage 8. It does not retract a live post.
