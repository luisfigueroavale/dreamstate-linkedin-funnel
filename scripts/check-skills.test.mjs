import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import path from "node:path";
import {
  clauseMissing,
  compareRows,
  conditionClauses,
  isFreeRead,
  listedModes,
  neverStepErrors,
  parseToolMap,
  rowErrors,
  stepShapeErrors,
} from "./check-skills.mjs";

const root = path.resolve(import.meta.dirname, "..");
const { uses, definitions } = parseToolMap(readFileSync(path.join(root, "docs/tool-map.md"), "utf8"));

test("a row mode must be one tool-map lists, so web_search cannot be relabeled read", () => {
  const id = "visibility.research.web_search";
  const use = uses.get(id);
  assert.ok(use);
  assert.deepEqual(rowErrors(id, "live", "yes", use, definitions), []);
  const errors = rowErrors(id, "read", "no", use, definitions);
  assert.ok(errors.some((error) => /not a mode docs\/tool-map\.md lists/.test(error)));
});

test("the same id is compared across skills regardless of mode", () => {
  const id = "senders.social_accounts.list";
  const use = uses.get(id);
  const clash = compareRows(
    [
      { id, mode: "read", need: "no" },
      { id, mode: "live", need: "yes" },
    ],
    () => use,
    definitions,
  );
  assert.ok(clash.some((error) => /regardless of mode/.test(error)));

  const harvest = "visibility.linkedin.engagement_harvest";
  const split = compareRows(
    [
      { id: harvest, mode: "dry_run", need: "no" },
      { id: harvest, mode: "live", need: "yes" },
    ],
    () => uses.get(harvest),
    definitions,
  );
  assert.deepEqual(split, []);
});

test("plugin Read cells and ids ending in list_resolved are free reads", () => {
  const id = "tables.executable_definitions.list_resolved";
  const use = "plugin Read source definitions the catalog will actually run.";
  assert.equal(isFreeRead(id, use), true);
  assert.equal(isFreeRead("tables.example.list_resolved", "not a read sentence"), true);
  assert.equal(isFreeRead("example.catalog_read", "plugin Read the rows the catalog will run."), true);
  assert.ok(listedModes(id, use, definitions).has("read"));
  assert.equal(listedModes(id, use, definitions).has("live"), false);
  assert.deepEqual(rowErrors(id, "read", "no", use, definitions), []);
  const live = rowErrors(id, "live", "no", use, definitions);
  assert.ok(live.some((error) => /free read/.test(error) || /not a mode/.test(error)));
});

test("a step cannot name a never-call id unless that id is the object of Do not or Never", () => {
  const banned = ["sequence.x.auto_engagements.replace"];
  const called = neverStepErrors(
    "14. Do with `sequence.x.auto_engagements.replace` (`references/keep.md`).",
    banned,
  );
  assert.ok(called.some((error) => error.includes("sequence.x.auto_engagements.replace")));
  assert.deepEqual(
    neverStepErrors(
      "14. Do not schedule, publish, or reply, and never call `sequence.x.auto_engagements.replace` (`references/keep.md`).",
      banned,
    ),
    [],
  );
  assert.ok(
    neverStepErrors(
      "14. Do not schedule, call `sequence.x.auto_engagements.replace`.",
      banned,
    ).some((error) => error.includes("sequence.x.auto_engagements.replace")),
  );
  assert.ok(
    neverStepErrors("8. Leave `tables.x_post_engagers.run` out of this scan.", ["tables.x_post_engagers.run"]).length > 0,
  );
  assert.deepEqual(
    neverStepErrors("8. Do not call `tables.x_post_engagers.run` in this scan.", ["tables.x_post_engagers.run"]),
    [],
  );
  assert.deepEqual(neverStepErrors("6. Add two `column.ai_fit_score` columns.", ["column.ai"]), []);
});

test("a step needs five words and cannot be a verb-with fragment", () => {
  const clipped = stepShapeErrors("9. Re with `social.channels_list` (`references/account.md`).");
  assert.ok(clipped.some((error) => /fewer than 5 words/.test(error)));
  assert.ok(clipped.some((error) => /verb-with fragment/.test(error)));
  assert.ok(stepShapeErrors("7. Else with `tables.columns.add` (`references/draft.md`).").some((error) => /verb-with/.test(error)));
  assert.deepEqual(
    stepShapeErrors("9. Re-read the channel row with `social.channels_list` (`references/account.md`)."),
    [],
  );
});

test("if, only, when, at least, and after owner yes clauses are found when dropped", () => {
  const ask = conditionClauses(
    "10. Call `tools_get`, then `social.content.artifact_create`, only if they ask to store the copy (`references/deliver.md`).",
  );
  const askClause = ask.find((clause) => /only if they ask to store the copy/i.test(clause));
  assert.ok(askClause);
  assert.equal(clauseMissing(askClause, "Call `tools_get`, then `social.content.artifact_create`, only if they ask to store the copy."), false);
  assert.equal(clauseMissing(askClause, "Call `social.content.artifact_create`."), true);

  const rows = conditionClauses("8. Preview at least 3 rows, including one thin row, with `sequence.sequences.copy_preview`.");
  assert.ok(rows.some((clause) => /at least 3 rows, including one thin row/i.test(clause)));
  const yes = conditionClauses("11. Set standing runs with `tables.auto_run.set` after owner yes.");
  assert.ok(yes.some((clause) => /after owner yes/i.test(clause)));
  const open = conditionClauses("6. Use `visibility.research.web_search` when local files leave the question open.");
  assert.ok(open.some((clause) => /when local files leave the question open/i.test(clause)));
  const link = conditionClauses("15. A public link on that post needs a yes.");
  assert.ok(link.some((clause) => clause.toLowerCase() === "needs a yes"));
  const owner = conditionClauses("Send that text, which needs owner yes on that text.");
  assert.ok(owner.some((clause) => /needs owner yes on that text/i.test(clause)));
});

test("a reversible 0-credit attach is write | no", () => {
  const id = "tables.table_sources.attach";
  const use = uses.get(id);
  assert.match(use, /\breversible\b/i);
  assert.match(use, /\bwrite\b/i);
  assert.equal(isFreeRead(id, use), false);
  assert.deepEqual([...listedModes(id, use, definitions)], ["write"]);
  assert.deepEqual(rowErrors(id, "write", "no", use, definitions), []);
  assert.ok(rowErrors(id, "read", "no", use, definitions).length > 0);
});
