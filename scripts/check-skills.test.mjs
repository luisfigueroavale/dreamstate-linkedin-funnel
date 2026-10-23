import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import path from "node:path";
import { compareRows, isFreeRead, listedModes, parseToolMap, rowErrors } from "./check-skills.mjs";

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
