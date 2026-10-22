# Audience files

Read this before you write for a reader, or before you score or qualify an engager. Then read the local copy, not the template.

The files in `audience/` are blank templates. They are committed so the shape stays stable. The owner's answers live in `audience.local/`, which git ignores. Same file names in both places.

The ideal follower is the reader of the posts. The ideal customer is the buyer. The buyer stays on the Ideal Customer page in Company Context. Do not merge those two people into one description. A reader may never buy. A buyer may never be who the post was written for.

## Read order

1. This file.
2. `audience.local/ideal-follower.md` before a draft, a title, a script, a picture's words, a score, or a qualification.
3. The Ideal Customer page in Company Context when the work is about buying, fit of a company, or an offer. The buyer page does not replace the follower file.

## Required

`audience.local/ideal-follower.md` is required for content, scoring, and qualification.

It is missing if the path does not exist.

It is blank if it is empty, or if it still says `Status: blank`.

Missing or blank means stop and ask the owner. Do not guess firmographics, a fear, a desire, or a yes on the qualifying test. Do not treat the template questions as the owner's answers. Do not copy the template prompts into a post.

## Qualifying test

The test is the yes/no list in the filled local file. Scoring uses that list on the person, not on the company.

- A required question answered no, with evidence on the row, fails the person.
- A required question you cannot answer from the row is a hold. Unknown is not a no, and it is not a yes.
- A question the owner did not mark required can inform the note. It does not fail the row by itself.

Engagement does not answer the test. A like, a comment, or a keyword is routing. It is not a yes.

## Create the local copy

```sh
mkdir -p audience.local
cp audience/ideal-follower.md audience.local/ideal-follower.md
```

Edit only the local copy. Change `Status: blank` to `Status: filled` when the sections are the owner's. Leave a section empty if they do not know it.
