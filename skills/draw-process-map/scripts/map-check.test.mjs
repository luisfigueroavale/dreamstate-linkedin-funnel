import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
// local
import { fileURLToPath } from "node:url";
import test from "node:test";
import { checkMap, estimateTextBox } from "./map-check.mjs";

const scriptPath = fileURLToPath(new URL("./map-check.mjs", import.meta.url));

function codes(result) {
  return result.faults.map((fault) => fault.code);
}

function baseMap() {
  return {
    id: "desk",
    composition: "overview",
    readingOrder: ["src", "score", "ask", "out", "wait"],
    nodes: [
      {
        id: "src",
        role: "source",
        quiet: true,
        title: "Notes",
        icon: { type: "mark", name: "file" },
        x: 100,
        y: 40,
        w: 200,
        h: 72,
      },
      {
        id: "score",
        role: "step",
        shape: "square",
        band: "light",
        step: 1,
        index: "01",
        title: "Score fit",
        input: "Row",
        work: "Tests",
        output: "Pass or hold",
        icon: { type: "mark", name: "check" },
        x: 80,
        y: 150,
        w: 240,
        h: 200,
      },
      {
        id: "ask",
        role: "decision",
        question: "Fit on the row?",
        exits: [
          { label: "yes", to: "out" },
          { label: "hold", to: "wait" },
        ],
        x: 100,
        y: 390,
        w: 200,
        h: 120,
      },
      {
        id: "out",
        role: "result",
        title: "Passed",
        x: 420,
        y: 410,
        w: 180,
        h: 80,
      },
      {
        id: "wait",
        role: "step",
        shape: "square",
        band: "light",
        title: "Wait",
        input: "Gap",
        work: "Ask",
        output: "A later row",
        x: 80,
        y: 560,
        w: 240,
        h: 180,
      },
    ],
    edges: [
      { id: "e1", from: "src", to: "score", points: [[200, 112], [200, 150]] },
      { id: "e2", from: "score", to: "ask", points: [[200, 350], [200, 390]] },
      { id: "e3", from: "ask", to: "out", points: [[300, 450], [420, 450]] },
      { id: "e4", from: "ask", to: "wait", points: [[200, 510], [200, 560]] },
    ],
  };
}

test("a quiet overview with a hold passes", () => {
  const result = checkMap(baseMap());
  assert.deepEqual(result.faults, []);
  assert.equal(result.ok, true);
});

test("a source with an action header fails", () => {
  const map = baseMap();
  map.nodes[0].actionHeader = "Run";
  assert.ok(codes(checkMap(map)).includes("quiet-source"));
});

test("a step needs a distinct output", () => {
  const map = baseMap();
  map.nodes[1].output = "Row";
  assert.ok(codes(checkMap(map)).includes("step-contract"));
});

test("a skill is a rounded judgment card", () => {
  const map = baseMap();
  map.nodes.push({
    id: "judge",
    role: "skill",
    shape: "square",
    band: "light",
    title: "Choose",
    job: "Pick the next note",
    x: 420,
    y: 150,
    w: 220,
    h: 140,
  });
  map.readingOrder.push("judge");
  assert.ok(codes(checkMap(map)).includes("skill-contract"));
});

test("a decision without hold or retry fails", () => {
  const map = baseMap();
  map.nodes[2].exits = [
    { label: "yes", to: "out" },
    { label: "no", to: "wait" },
  ];
  assert.ok(codes(checkMap(map)).includes("decision"));
});

test("a diamond that treats a reaction as a purchase fails", () => {
  const map = baseMap();
  map.nodes[2].question = "Will they buy because they liked it?";
  assert.ok(codes(checkMap(map)).includes("reaction-intent"));
});

test("connectors that cross fail", () => {
  const map = baseMap();
  map.edges.push({
    id: "e5",
    from: "score",
    to: "wait",
    points: [[320, 250], [320, 560]],
  });
  assert.ok(codes(checkMap(map)).includes("cross"));
});

test("a line through another card fails", () => {
  const map = baseMap();
  map.edges[2].points = [[300, 450], [510, 450]];
  assert.ok(codes(checkMap(map)).includes("through-card"));
});

test("a return inside the column fails, and one outside passes", () => {
  const inside = baseMap();
  inside.edges.push({
    id: "back",
    from: "wait",
    to: "score",
    return: true,
    points: [[200, 560], [200, 350]],
  });
  assert.ok(codes(checkMap(inside)).includes("return-route"));

  const outside = baseMap();
  outside.edges.push({
    id: "back",
    from: "wait",
    to: "score",
    return: true,
    points: [[200, 560], [40, 560], [40, 150], [80, 150]],
  });
  const result = checkMap(outside);
  assert.equal(codes(result).includes("return-route"), false, JSON.stringify(result.faults));
  assert.equal(codes(result).includes("cross"), false, JSON.stringify(result.faults));
});

test("feedback from a result back to a source fails", () => {
  const map = baseMap();
  map.edges.push({
    id: "fb",
    from: "out",
    to: "src",
    feedback: true,
    points: [[600, 450], [640, 450], [640, 20], [200, 40]],
  });
  assert.ok(codes(checkMap(map)).includes("feedback"));
});

test("unknown color roles, marks, assets, and images fail", () => {
  const map = baseMap();
  map.colors = { logo: "ink" };
  map.nodes[0].icon = { type: "mark", name: "spark" };
  map.nodes[1].icon = { type: "asset", file: "logo.svg" };
  map.nodes[4].image = { file: "notes.txt", w: 10, h: 10, naturalW: 10, naturalH: 10 };
  const found = codes(checkMap(map, { allowedAssets: ["other.svg"] }));
  assert.ok(found.includes("theme-role"));
  assert.ok(found.includes("icon"));
  assert.ok(found.includes("image"));
});

test("a stretched image fails and a listed asset passes", () => {
  const bad = baseMap();
  bad.nodes[0].image = { file: "shot.png", w: 100, h: 40, naturalW: 100, naturalH: 100 };
  assert.ok(codes(checkMap(bad)).includes("image"));

  const good = baseMap();
  good.nodes[1].icon = { type: "asset", file: "mark.svg" };
  assert.equal(codes(checkMap(good, { allowedAssets: ["mark.svg"] })).includes("icon"), false);
});

test("taxonomy, funnel, and breakdown compositions are checked", () => {
  const taxonomy = baseMap();
  taxonomy.composition = "taxonomy";
  taxonomy.ordered = true;
  assert.ok(codes(checkMap(taxonomy)).includes("composition"));

  const funnel = baseMap();
  funnel.composition = "funnel";
  assert.ok(codes(checkMap(funnel)).includes("composition"));
  funnel.narrows = true;
  assert.equal(codes(checkMap(funnel)).includes("composition"), false);

  const breakdown = baseMap();
  breakdown.composition = "breakdown";
  assert.ok(codes(checkMap(breakdown)).includes("result-evidence"));
  breakdown.nodes[3].value = 12;
  breakdown.nodes[3].unit = "people";
  breakdown.nodes[3].population = "the April list";
  breakdown.nodes[3].date = "2026-04-02";
  breakdown.nodes[3].display = "large";
  breakdown.nodes[3].h = 160;
  assert.equal(codes(checkMap(breakdown)).includes("result-evidence"), false);
});

test("two columns declare whether they run together", () => {
  const map = baseMap();
  map.columns = 2;
  assert.ok(codes(checkMap(map)).includes("columns"));
  map.parallel = false;
  assert.equal(codes(checkMap(map)).includes("columns"), false);
});

test("a reaction map keeps company fit and person fit apart", () => {
  const map = baseMap();
  map.subject = "reactions";
  map.nodes[0].station = "capture";
  map.nodes[1].station = "company-fit";
  map.nodes[2].station = "route";
  map.nodes[3].station = "send";
  map.nodes[4].station = "review";
  assert.ok(codes(checkMap(map)).includes("station"));
  for (const [id, station, y] of [
    ["person", "person-fit", 150],
    ["draft", "draft", 400],
  ]) {
    map.nodes.push({
      id,
      role: "step",
      shape: "square",
      band: "light",
      title: "Next",
      input: "Row",
      work: "Write",
      output: "A note",
      station,
      x: 820,
      y,
      w: 220,
      h: 180,
    });
    map.readingOrder.push(id);
  }
  assert.equal(codes(checkMap(map)).includes("station"), false);
});

test("a shared page prefixes ids", () => {
  const map = baseMap();
  map.sharedPage = true;
  assert.ok(codes(checkMap(map)).includes("prefix"));
});

test("draft text size is not the foreign estimate", () => {
  const box = estimateTextBox("abcd", 10);
  assert.equal(box.estimate, true);
  assert.notEqual(box.w, Math.ceil(4 * 10 * 0.55));
  assert.notEqual(box.h, 10 * 1.25);
});

test("the command checks a file and draws nothing on import", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "draw-process-map-"));
  const file = path.join(dir, "map.json");
  writeFileSync(file, JSON.stringify(baseMap()));
  const run = spawnSync(process.execPath, [scriptPath, file], {
    encoding: "utf8",
  });
  assert.equal(run.status, 0, run.stderr);
  const parsed = JSON.parse(run.stdout);
  assert.equal(parsed.ok, true);
});
