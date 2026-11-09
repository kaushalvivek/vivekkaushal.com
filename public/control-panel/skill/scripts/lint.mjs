// src/cli.ts
import { readFileSync } from "node:fs";

// src/normalize.ts
var STATE_TYPES = ["triage", "backlog", "unstarted", "started", "completed", "canceled", "duplicate"];
function normalizeIssue(raw) {
  const identifier = raw.identifier ?? raw.id;
  if (!identifier) throw new Error("Issue has no identifier or id.");
  if (typeof raw.title !== "string") throw new Error(`${identifier}: missing title.`);
  const stateType = raw.stateType ?? raw.statusType ?? raw.state?.type;
  if (!stateType || !STATE_TYPES.includes(stateType)) {
    throw new Error(`${identifier}: missing or unknown state type "${stateType}". Pass statusType, stateType or state.type.`);
  }
  const labelList = Array.isArray(raw.labels) ? raw.labels : raw.labels?.nodes ?? [];
  const estimate = raw.estimate == null ? null : typeof raw.estimate === "number" ? raw.estimate : raw.estimate.value;
  return {
    identifier,
    title: raw.title,
    description: raw.description ?? null,
    labels: labelList.map((l) => typeof l === "string" ? l : l.name),
    estimate,
    dueDate: raw.dueDate ?? null,
    stateType
  };
}
function issuesFromJson(json) {
  const list = Array.isArray(json) ? json : json && typeof json === "object" && Array.isArray(json.issues) ? json.issues : [json];
  return list.map((item) => normalizeIssue(item));
}

// src/convention.ts
var VERSION = 1;
var CORE_KINDS = ["to-do", "check-in"];
var MODES = ["focus", "parallel"];
var HOURS_SCALE = [1, 2, 3, 5, 8, 13];
var FIELDS = {
  source: "Source",
  nextStep: "Next step",
  doneWhen: "Done when",
  chase: "Chase"
};
var OPEN_STATES = ["triage", "backlog", "unstarted", "started"];
var SCHEDULED_STATES = ["unstarted", "started"];

// src/parse.ts
var CODE_PREFIX = {
  source: "SOURCE",
  nextStep: "NEXT_STEP",
  doneWhen: "DONE_WHEN",
  chase: "CHASE"
};
var PLACEHOLDER = {
  source: "<where this work came from>",
  nextStep: "<the very next action>",
  doneWhen: "<the observable end state>",
  chase: "<who> \u2014 <what you need from them>"
};
var escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function readField(description, name) {
  const label = escapeRegex(name);
  const strict = description.match(new RegExp(`^${label}:[ \\t]*(\\S.*)$`, "im"));
  if (strict?.[1]) return { value: strict[1].trim(), malformed: false };
  const decorated = new RegExp(`^[^\\w\\n]*${label}[^\\w\\n]*:`, "im").test(description);
  const heading = new RegExp(`^#{1,6}[ \\t]*${label}[ \\t]*$`, "im").test(description);
  return { value: null, malformed: decorated || heading };
}
function parseChase(value) {
  const [who, ...rest] = value.split(/\s+(?:—|–|--|-)\s+/);
  const what = rest.join(" \u2014 ").trim();
  const people = (who ?? "").split(/\s*(?:,|&|\band\b)\s*/).map((p) => p.replace(/^@/, "").trim()).filter(Boolean);
  return people.length && what ? { who: people, what } : null;
}
function parse(issue, options = {}) {
  const kinds = /* @__PURE__ */ new Set([...CORE_KINDS, ...options.kinds ?? []]);
  const kindLabels = issue.labels.filter((l) => kinds.has(l));
  const modeLabels = issue.labels.filter((l) => MODES.includes(l));
  const description = issue.description ?? "";
  const fields = Object.fromEntries(
    Object.keys(FIELDS).map((key) => [key, readField(description, FIELDS[key])])
  );
  const chase = fields.chase.value ? parseChase(fields.chase.value) : null;
  const violations = [];
  const add = (code, message) => violations.push({ code, message });
  const kind = kindLabels.length === 1 ? kindLabels[0] : null;
  const requireField = (key) => {
    if (fields[key].value) return;
    const prefix = CODE_PREFIX[key];
    const line = `"${FIELDS[key]}: ${PLACEHOLDER[key]}"`;
    if (fields[key].malformed) {
      add(`${prefix}_MALFORMED`, `Write ${line} at the start of a line, with no markdown around "${FIELDS[key]}:".`);
    } else {
      add(`${prefix}_MISSING`, `Add the line ${line} to the description.`);
    }
  };
  const open = OPEN_STATES.includes(issue.stateType);
  if (open) {
    if (kindLabels.length === 0) add("KIND_MISSING", `Add exactly one Kind label: ${[...kinds].join(", ")}.`);
    if (kindLabels.length > 1) add("KIND_MULTIPLE", `Keep one Kind label. Found: ${kindLabels.join(", ")}.`);
    if (kind === "to-do") {
      if (modeLabels.length === 0) add("MODE_MISSING", `Add one Mode label: ${MODES.join(" or ")}.`);
      if (modeLabels.length > 1) add("MODE_MULTIPLE", `Keep one Mode label. Found: ${modeLabels.join(", ")}.`);
      if (issue.estimate == null) add("ESTIMATE_MISSING", `Set the estimate in hours: ${HOURS_SCALE.join(", ")}.`);
      else if (!HOURS_SCALE.includes(issue.estimate)) {
        add("ESTIMATE_OFF_SCALE", `Estimate ${issue.estimate} is not on the hours scale: ${HOURS_SCALE.join(", ")}.`);
      }
      if (issue.dueDate == null && SCHEDULED_STATES.includes(issue.stateType)) {
        add("DUE_MISSING", "Set a due date. Work in Todo or In Progress is scheduled, so it needs one.");
      }
      requireField("source");
      requireField("nextStep");
      requireField("doneWhen");
    }
    if (kind === "check-in") {
      if (issue.dueDate == null) add("DUE_MISSING", "Set a due date: the day to chase next.");
      requireField("source");
      requireField("doneWhen");
      if (fields.chase.value && !chase) {
        add("CHASE_MALFORMED", `Write the chase line as "Chase: <who> \u2014 <what you need from them>", with a dash between who and what.`);
      } else {
        requireField("chase");
      }
    }
  }
  return {
    kind,
    mode: modeLabels.length === 1 ? modeLabels[0] : null,
    source: fields.source.value,
    nextStep: fields.nextStep.value,
    doneWhen: fields.doneWhen.value,
    chase,
    violations
  };
}

// src/cli.ts
var USAGE = `control-panel lint (convention v${VERSION})

Usage: node lint.mjs [issue.json] [--kinds writing,review] [--json]

Reads one issue, an array of issues, or {"issues": [...]} as JSON from a file or stdin.
Accepts Linear MCP get_issue / list_issues output or Linear GraphQL issue nodes.
Exits 0 when every issue conforms, 1 when any issue has violations, 2 on bad input.`;
function main(argv) {
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(USAGE);
    return 0;
  }
  const kindsAt = argv.indexOf("--kinds");
  const kinds = kindsAt >= 0 ? (argv[kindsAt + 1] ?? "").split(",").map((k) => k.trim()).filter(Boolean) : [];
  const asJson = argv.includes("--json");
  const file = argv.find((a, i) => !a.startsWith("--") && argv[i - 1] !== "--kinds");
  const issues = issuesFromJson(JSON.parse(readFileSync(file ?? 0, "utf8")));
  const results = issues.map((issue) => ({ identifier: issue.identifier, ...parse(issue, { kinds }) }));
  if (asJson) {
    console.log(JSON.stringify(results.map((r) => ({ identifier: r.identifier, kind: r.kind, violations: r.violations })), null, 2));
  } else {
    for (const r of results) {
      if (!r.violations.length) console.log(`${r.identifier}  ok`);
      for (const v of r.violations) console.log(`${r.identifier}  ${v.code}  ${v.message}`);
    }
  }
  return results.some((r) => r.violations.length) ? 1 : 0;
}
try {
  process.exitCode = main(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 2;
}
