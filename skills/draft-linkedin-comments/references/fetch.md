# Fetch

## Fetch

Watchlist priorities `1`, `2`, and `3`. Priority `off` drops the row. Sheet columns: `notes`, `lane`, `priority`, `headline`, `followers`, `profile_url`, and `name`. Notes say how they know the person (a client, a friend, an event, a podcast) and how warm the comment may be. Aim for 50 to 100 people. A blank follower count scores as 2,000.

Resolve the two definition ids, attach, and only then run, after yes. Run one search per profile, newest first, and hold it to the window. Cap parallel reads at 5. Retry a failure one by one. Keep that person's own posts. Skip a reshare of somebody else. Add niche keyword searches for people who are not on the watchlist.

Drop anything they already commented on. Drop anything the previous run already showed. Dedupe on share id: a repost can carry a new urn and still point at the original url.

Niche rows, when lanes exist, need fit of at least 2. Drop niche hits flagged `promo`, `politics`, `hiring`, or `non_english`. `niche_min_reactions` starts at 15. Include people only.

Mark flags on watchlist hits rather than silently deleting them: `comment_gate`, `hiring`, `politics`, `promo`, `milestone`, `link_only`, `non_english`.

`comment_gate` is a keyword bait ("comment" plus a shouty token), a promise that a comment gets a send, or "drop a comment". `hiring` covers open roles and apply-here lines. `politics` covers election, democrat, republican, and war. `promo` covers sponsored lines, partner blurbs, a promo code, a discount code, percent off, limited spots, register-here, and webinars.

`milestone` covers a new job title, a work anniversary, "I'm humbled", and announcement openers such as happy-to-share or excited-to-announce. `link_only` means the whole post is a single URL. `non_english`: count the function words the, you, of, it, for, with, and, is, to, that. Flag the post when that count is under max(3, word count // 25).

One bad profile does not end the run. One bad thread read does not end the run. One bad refresh does not end the run. Write the miss on `errors` and name it in the summary. `rate_limit_exceeded` ("Capacity is busy"): back off, then retry, with never more than 5 calls in parallel.

On a paid read, `provider_outcome_unknown` gets a single retry. `provider_response_error` goes to a second pass, done 1 at a time. Weekends are flakier. You lose feedback and the already-commented check, and you do not pretend those reads succeeded.
