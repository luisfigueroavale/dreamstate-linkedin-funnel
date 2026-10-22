import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const cases = JSON.parse(readFileSync(path.join(root, "scoring/cases.json"), "utf8"));
const EXAMPLE_PASS = 70;

function filled(list) {
  return (list || []).some((item) => String(item).trim());
}

function judge(row) {
  let company = row.company_verdict;
  let person = row.person_verdict;
  if (company === "fail" && !filled(row.company_evidence)) company = "unsure";
  if (person === "fail" && !filled(row.person_evidence)) person = "unsure";

  let requiredOpen = false;
  for (const item of row.qualifying_test || []) {
    if (!item.required) continue;
    const evidence = String(item.evidence || "").trim();
    if (item.answer === "no" && evidence) person = "fail";
    else if (item.answer !== "yes" || !evidence) requiredOpen = true;
  }
  if (person !== "fail" && requiredOpen) person = "unsure";

  let decision = "hold";
  if (company === "fail" || person === "fail") decision = "stop";
  else if (company === "pass" && person === "pass") decision = "pass";

  const companyFit = company === "fail" ? 0 : company === "unsure" ? null : row.company_fit;
  const personFit = person === "fail" ? 0 : person === "unsure" ? null : row.person_fit;

  return {
    decision,
    company_verdict: company,
    person_verdict: person,
    company_fit: companyFit,
    person_fit: personFit,
  };
}

let failed = 0;
for (const item of cases) {
  const got = judge(item.row);
  const problems = [];
  if (got.decision !== item.expected.decision) {
    problems.push(`decision ${got.decision} != ${item.expected.decision}`);
  }
  if (got.company_verdict !== item.expected.company_verdict) {
    problems.push(`company ${got.company_verdict} != ${item.expected.company_verdict}`);
  }
  if (got.person_verdict !== item.expected.person_verdict) {
    problems.push(`person ${got.person_verdict} != ${item.expected.person_verdict}`);
  }
  if (JSON.stringify(item.row).includes("engagement") && item.row.engagement) {
    const without = judge({ ...item.row, engagement: "" });
    if (without.decision !== got.decision) {
      problems.push("engagement changed the decision");
    }
  }
  if (got.decision === "pass") {
    if (!(got.company_fit >= EXAMPLE_PASS) || !(got.person_fit >= EXAMPLE_PASS)) {
      problems.push("a pass used a score under the example line of 70");
    }
  }
  if (got.company_verdict === "fail" && got.company_fit !== 0) problems.push("company fail was not 0");
  if (got.person_verdict === "fail" && got.person_fit !== 0) problems.push("person fail was not 0");
  if (got.company_verdict === "unsure" && got.company_fit !== null) problems.push("unsure company was not null");
  if (got.person_verdict === "unsure" && got.person_fit !== null) problems.push("unsure person was not null");
  if (problems.length) {
    failed += 1;
    console.error(`${item.name}: ${problems.join("; ")}`);
  } else {
    console.log(`ok ${item.name}`);
  }
}

if (!cases.length) {
  console.error("No cases.");
  process.exit(1);
}
if (failed) process.exit(1);
console.log(`${cases.length} cases passed. 70 is the example line only.`);
