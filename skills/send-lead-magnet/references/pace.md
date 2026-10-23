# Pacing

Pacing stays at the account's own spacing. Do not tighten it or invent a spacing API. Read `senders.linkedin_accounts.list`. Use limits, today's usage, and working hours only when present; if absent, say so. A shorter gap is refused and burns the cycle. Expect twenty to thirty actions an hour, about ten people.

The owner may shorten the gap for safety, and this skill never does. Stay inside working hours, stop a few minutes early, and skip days the account does not name as working. If your zone is not the account's zone, say that the hours check did not run.

Saturday and Sunday are half volume unless the weekend is full volume. A health factor from zero to one lowers the cap the same way, and the floor is one, not zero. Count the warmup cap and leave two message slots in reserve.

Stop file messages and public lines when the action cap is spent, stop file messages when the message cap or the warmup cap is spent, and stop public lines when the comment cap is spent. After one write with unknown account state, wait about two minutes.

If a next slot is named, wait it out plus a few seconds. A spacing, rate-limit, or hours refusal that is not unknown returns the row to waiting. Retry inside the account's own limits.
