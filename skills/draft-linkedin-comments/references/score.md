# Score

## Score

Score only surfaces fresh posts that are moving. Fit stays a human call.

age_hours is minutes divided by 60, with a floor of 0.25. velocity is reactions, plus comments times 3, plus reposts times 2, all over age_hours. fresh is 1.0 in the first hour, 0.85 through hour 2, 0.7 through hour 3, 0.45 through hour 6, and 0.2 after that.

crowd is 1.0 when comments are under 15, 0.8 under 60, 0.55 under 150, and 0.35 otherwise. reach is log10 of (followers or 2000) plus 10. With no lane regexes, fit is 1, which is neutral. Otherwise fit is how many lanes the text touches, capped at 3.

Multiply reach by (1 plus log10 of 1 plus velocity), then by fresh, then by crowd, then by (0.4 plus 0.3 times fit). Round the score to 2 decimals. Round velocity to 1 decimal. Sort high score first. Keep at most 40.
