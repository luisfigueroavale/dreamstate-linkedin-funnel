# Failure modes

Failure modes stop the run before encode:

- `sources` is absent, empty, or not a list

- an `id` is blank, or the same id appears twice

- the path is relative, or the file is missing

- that source lists no keep window

- a keep pair is not two numbers, or the end does not land after the start

- `retain_seconds` is below zero, or it is not strictly less than `min_seconds`

- a drop is missing a numeric `start` or `end`

- the plan is missing, or it is not JSON
