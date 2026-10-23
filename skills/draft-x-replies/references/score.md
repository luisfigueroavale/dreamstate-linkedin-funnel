# Score

Rank the cut by score, high first. The page the owner sees is still newest first, and the batch stays inside the cadence cap.

## Ordinary score

Signal is likes, plus replies times 3, plus reposts times 2, plus bookmarks.

Velocity is that signal divided by age in hours. Age counts as at least 0.25 hours.

Freshness is 1.0 at or under 1 hour, 0.75 at or under 2, 0.5 at or under 3, otherwise 0.2.

Crowd is 1.0 under 30 replies, 0.7 under 100, otherwise 0.4.

Reach is log10 of (followers + 10).

Fit is how many lanes match, capped at 3. With no lanes configured, fit is 1.

Niche is the count of distinct junk terms, capped at 4, with a trailing plural s folded. With no junk terms, niche is 1.

Start from reach times (1 + log10 of (1 + velocity)) times freshness times crowd times (0.4 + 0.3 times fit).

Then apply, in order: times 1.3 when the author is in the talker set.

times 1.3 when taste says the owner has replied to that account before, otherwise times 0.5 when that account was shown at least twice and never answered and is not in the circle.

times 1.6 when they are in the circle.

then times (0.6 + 0.2 times niche).

Drop, before scoring finishes, an account shown at least three times with zero replies from the owner, unless they are in the circle. The junk gate drops a post under the minimum distinct terms (default 1) unless this pass is broad or no terms are set.

## Speed score

Speed score replaces the ordinary score for a non-circle account on a speed pass, after the 300-reply and 50,000-follower cuts.

Freshness is 1.0 at or under 15 minutes, 0.85 at or under 30, 0.65 at or under 45, 0.5 at or under 60, otherwise 0.3.

Crowd is 1.0 under 20 replies, 0.8 under 60, 0.6 under 150, otherwise 0.35.

Velocity is (likes + replies times 3 + reposts times 2) divided by age in hours, with age at least 0.1 hours. Bookmarks stay out of this one.

Score is reach times freshness times crowd times (1 + log10 of (1 + velocity)), using the same reach formula.

Circle accounts on a speed pass keep the ordinary score, then the same boosts.

A fast-moving post from an account whose posts travel outranks a post that is only on topic. The feed bets on the next action, and a reply counts for much more than a like. Treat any published weight table as a hint.

A bare thanks stays near a handful of impressions. One specific practice, or one how-question under a large account, can reach the hundreds.

When a post finishes around a few thousand views, a few dozen people see the reply. When it reaches tens of thousands of views, several times more people see it. An emoji with no words, and a line that sounds generated, both sink.
