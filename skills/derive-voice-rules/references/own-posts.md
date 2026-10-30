# Own posts

Ask the owner for their X handle and their LinkedIn profile URL. Keep both in `brand.local/identity.md`, which git ignores. Never write them into a tracked file.

## X

Read their own recent originals, about the last 100, with the public X reads the host already has (`docs/tool-map.md`). Search `from:<handle> -is:retweet -is:reply` and page until you hold about 100 or the window ends. If the host has no X reads, use the browser on their profile. Do not add an X login or a paid key.

Save the rows to `vault/voice/<date>-x-own.json` with the capture time, the text, the link, and the counts the read returned. That folder is not committed. Keep the counts for the viral bar, not as proof of voice. An engagement count is an outcome, not authorship.

Replies are a second sample set. Read them only when the owner replies often, and keep them apart from originals.

## LinkedIn

There is no public LinkedIn read here. Use posts the owner pasted, or posts a Dreamstate read already returned and saved under `vault/sources/`. Save each as its own file in `vault/voice/`. Note the date of each one.

## Not samples

Posts by other accounts, quotes of other people inside the owner's posts, reposts, and ghostwritten posts the owner never edited. Classify each path with `references/classify.md`.
