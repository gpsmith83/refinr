#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_INPUT = path.resolve(__dirname, "../../docs/linear-import-ready-issues.md");
const GRAPHQL_ENDPOINT = "https://api.linear.app/graphql";

function printHelp() {
  console.log(`Usage:
  node scripts/linear-import/import-issues.mjs --project <id|slug|name> [options]

Required:
  --project <value>          Linear project UUID, slug, or exact project name.

Optional:
  --api-key <value>          Linear personal API key or OAuth Authorization value.
                             Defaults to LINEAR_API_KEY.
  --team <value>             Team UUID, key, or exact name. Required when the
                             selected project maps to multiple teams or none.
  --input <path>             Markdown file to import.
                             Defaults to docs/linear-import-ready-issues.md.
  --create-missing-labels    Create any missing issue labels on the selected team.
  --no-skip-existing         Recreate issues even when a project issue already
                             exists with the same title.
  --dry-run                  Parse and resolve everything but do not create data.
  --help                     Show this message.

Examples:
  LINEAR_API_KEY=lin_api_xxx node scripts/linear-import/import-issues.mjs \
    --project refinr --team ENG

  node scripts/linear-import/import-issues.mjs \
    --api-key lin_api_xxx \
    --project "Refinr MVP" \
    --create-missing-labels
`);
}

function parseArgs(argv) {
  const options = {
    input: DEFAULT_INPUT,
    createMissingLabels: false,
    dryRun: false,
    skipExisting: true,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--create-missing-labels") {
      options.createMissingLabels = true;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--no-skip-existing") {
      options.skipExisting = false;
      continue;
    }

    if (arg.startsWith("--")) {
      const next = argv[index + 1];
      if (!next || next.startsWith("--")) {
        throw new Error(`Missing value for ${arg}`);
      }

      switch (arg) {
        case "--api-key":
          options.apiKey = next;
          break;
        case "--project":
          options.project = next;
          break;
        case "--team":
          options.team = next;
          break;
        case "--input":
          options.input = path.resolve(process.cwd(), next);
          break;
        default:
          throw new Error(`Unknown argument: ${arg}`);
      }

      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  options.apiKey = options.apiKey ?? process.env.LINEAR_API_KEY;
  return options;
}

function extractInlineCodeValues(line) {
  return Array.from(line.matchAll(/`([^`]+)`/g), (match) => match[1].trim()).filter(Boolean);
}

function parseIssueEntry(entry) {
  const lines = entry.lines;
  const labelsLine = lines.find((line) => line.startsWith("- Labels:"));
  const dependsLine = lines.find((line) => line.startsWith("- Depends on:"));

  if (!labelsLine) {
    throw new Error(`Missing labels line for ${entry.title}`);
  }

  if (!dependsLine) {
    throw new Error(`Missing dependency line for ${entry.title}`);
  }

  const labels = extractInlineCodeValues(labelsLine);
  const dependsOn = /none\s*$/i.test(dependsLine)
    ? []
    : extractInlineCodeValues(dependsLine);

  const bodyLines = lines.filter((line) => line !== labelsLine && line !== dependsLine);
  while (bodyLines.length > 0 && bodyLines[0].trim() === "") {
    bodyLines.shift();
  }

  const description = bodyLines.join("\n").trim();

  if (!description) {
    throw new Error(`Missing issue body for ${entry.title}`);
  }

  const sourceIdMatch = entry.title.match(/^([A-Z]-\d+)\b/);
  if (!sourceIdMatch) {
    throw new Error(`Issue heading does not start with a source identifier: ${entry.title}`);
  }

  return {
    sourceId: sourceIdMatch[1],
    title: entry.title.trim(),
    milestone: entry.milestone,
    labels,
    dependsOn,
    description,
  };
}

function parseIssues(markdown) {
  const lines = markdown.split(/\r?\n/);
  const parsed = [];
  let milestone = null;
  let current = null;

  const pushCurrent = () => {
    if (!current) {
      return;
    }
    parsed.push(parseIssueEntry(current));
  };

  for (const line of lines) {
    const milestoneMatch = line.match(/^##\s+(Milestone.+)$/);
    if (milestoneMatch) {
      milestone = milestoneMatch[1].trim();
      continue;
    }

    const issueMatch = line.match(/^###\s+(.+)$/);
    if (issueMatch) {
      pushCurrent();
      current = {
        title: issueMatch[1].trim(),
        milestone,
        lines: [],
      };
      continue;
    }

    if (current) {
      current.lines.push(line);
    }
  }

  pushCurrent();
  return parsed;
}

function normalizeMatchValue(value) {
  return String(value ?? "").trim().toLowerCase();
}

function resolveUniqueMatch(items, selector, rawValue, description) {
  const target = normalizeMatchValue(rawValue);
  const matches = items.filter((item) => selector(item).some((candidate) => normalizeMatchValue(candidate) === target));

  if (matches.length === 0) {
    throw new Error(`No ${description} matched \"${rawValue}\".`);
  }

  if (matches.length > 1) {
    const names = matches.map((item) => selector(item).find(Boolean)).join(", ");
    throw new Error(`Multiple ${description}s matched \"${rawValue}\": ${names}`);
  }

  return matches[0];
}

function pickTeam(project, allTeams, teamArg) {
  const projectTeams = Array.isArray(project.teams?.nodes) ? project.teams.nodes : [];

  if (teamArg) {
    return resolveUniqueMatch(
      allTeams,
      (team) => [team.id, team.key, team.name],
      teamArg,
      "team",
    );
  }

  if (projectTeams.length === 1) {
    return projectTeams[0];
  }

  if (projectTeams.length > 1) {
    const choices = projectTeams.map((team) => `${team.key ?? team.name} (${team.id})`).join(", ");
    throw new Error(`Project maps to multiple teams. Pass --team. Available teams: ${choices}`);
  }

  throw new Error("Could not infer a team from the selected project. Pass --team explicitly.");
}

function colorForLabel(name) {
  let hash = 0;
  for (const char of name) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  const hue = hash % 360;
  return hslToHex(hue, 55, 48);
}

function hslToHex(hue, saturation, lightness) {
  const s = saturation / 100;
  const l = lightness / 100;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const scaledHue = hue / 60;
  const x = chroma * (1 - Math.abs((scaledHue % 2) - 1));
  let red = 0;
  let green = 0;
  let blue = 0;

  if (scaledHue >= 0 && scaledHue < 1) {
    red = chroma;
    green = x;
  } else if (scaledHue < 2) {
    red = x;
    green = chroma;
  } else if (scaledHue < 3) {
    green = chroma;
    blue = x;
  } else if (scaledHue < 4) {
    green = x;
    blue = chroma;
  } else if (scaledHue < 5) {
    red = x;
    blue = chroma;
  } else {
    red = chroma;
    blue = x;
  }

  const match = l - chroma / 2;
  return [red, green, blue]
    .map((channel) => Math.round((channel + match) * 255).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

class LinearClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async request(query, variables = {}, { optional = false } = {}) {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.apiKey,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Linear API request failed with ${response.status}: ${text}`);
    }

    const payload = await response.json();
    if (payload.errors?.length) {
      const message = payload.errors.map((error) => error.message).join("; ");
      if (optional) {
        return { data: payload.data ?? null, errors: payload.errors, message };
      }
      throw new Error(message);
    }

    return { data: payload.data, errors: [] };
  }

  async loadProjectsAndTeams() {
    const query = `
      query ProjectsAndTeams {
        projects(first: 250, includeArchived: true) {
          nodes {
            id
            name
            slug
            teams {
              nodes {
                id
                key
                name
              }
            }
          }
        }
        teams(first: 250, includeArchived: true) {
          nodes {
            id
            key
            name
          }
        }
      }
    `;

    const result = await this.request(query);
    return {
      projects: result.data.projects.nodes,
      teams: result.data.teams.nodes,
    };
  }

  async loadIssueLabels() {
    const query = `
      query IssueLabels {
        issueLabels(first: 250, includeArchived: true) {
          nodes {
            id
            name
            team {
              id
            }
          }
        }
      }
    `;

    const result = await this.request(query, {}, { optional: true });
    if (result.errors.length > 0) {
      return [];
    }
    return result.data.issueLabels.nodes;
  }

  async loadProjectIssues(projectId) {
    const query = `
      query ProjectIssues($projectId: String!) {
        project(id: $projectId) {
          id
          issues(first: 250, includeArchived: true) {
            nodes {
              id
              identifier
              title
            }
          }
        }
      }
    `;

    const result = await this.request(query, { projectId }, { optional: true });
    if (result.errors.length > 0 || !result.data?.project) {
      return [];
    }
    return result.data.project.issues.nodes;
  }

  async createLabel(input) {
    const mutation = `
      mutation IssueLabelCreate($input: IssueLabelCreateInput!) {
        issueLabelCreate(input: $input) {
          success
          issueLabel {
            id
            name
          }
        }
      }
    `;

    const result = await this.request(mutation, { input });
    if (!result.data.issueLabelCreate.success) {
      throw new Error(`Failed to create label ${input.name}`);
    }
    return result.data.issueLabelCreate.issueLabel;
  }

  async createIssue(input) {
    const mutation = `
      mutation IssueCreate($input: IssueCreateInput!) {
        issueCreate(input: $input) {
          success
          issue {
            id
            identifier
            title
            url
          }
        }
      }
    `;

    const result = await this.request(mutation, { input });
    if (!result.data.issueCreate.success) {
      throw new Error(`Failed to create issue ${input.title}`);
    }
    return result.data.issueCreate.issue;
  }

  async createBlocksRelation(blockingIssueId, blockedIssueId) {
    const mutation = `
      mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
        issueRelationCreate(input: $input) {
          success
          issueRelation {
            id
            type
          }
        }
      }
    `;

    const result = await this.request(
      mutation,
      {
        input: {
          issueId: blockingIssueId,
          relatedIssueId: blockedIssueId,
          type: "blocks",
        },
      },
      { optional: true },
    );

    if (result.errors.length > 0) {
      const duplicate = result.message.toLowerCase().includes("already") || result.message.toLowerCase().includes("exists");
      if (duplicate) {
        return { skipped: true, reason: result.message };
      }
      throw new Error(result.message);
    }

    if (!result.data.issueRelationCreate.success) {
      throw new Error(`Failed to create dependency relation ${blockingIssueId} -> ${blockedIssueId}`);
    }

    return { skipped: false };
  }
}

async function ensureLabels({ client, labels, teamId, existingLabels, createMissingLabels, dryRun }) {
  const labelMap = new Map(existingLabels.map((label) => [normalizeMatchValue(label.name), label]));
  const resolvedLabelIds = [];
  const missingLabels = [];

  for (const labelName of labels) {
    const existing = labelMap.get(normalizeMatchValue(labelName));
    if (existing) {
      resolvedLabelIds.push(existing.id);
      continue;
    }

    if (!createMissingLabels) {
      missingLabels.push(labelName);
      continue;
    }

    if (dryRun) {
      missingLabels.push(labelName);
      continue;
    }

    const created = await client.createLabel({
      name: labelName,
      teamId,
      color: colorForLabel(labelName),
    });
    existingLabels.push(created);
    labelMap.set(normalizeMatchValue(created.name), created);
    resolvedLabelIds.push(created.id);
  }

  return { labelIds: resolvedLabelIds, missingLabels };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  if (!options.project) {
    throw new Error("Missing required --project argument.");
  }

  if (!options.apiKey) {
    throw new Error("Missing Linear API key. Pass --api-key or set LINEAR_API_KEY.");
  }

  const markdown = await readFile(options.input, "utf8");
  const issues = parseIssues(markdown);

  if (issues.length === 0) {
    throw new Error(`No issue entries found in ${options.input}`);
  }

  const client = new LinearClient(options.apiKey);
  const { projects, teams } = await client.loadProjectsAndTeams();
  const project = resolveUniqueMatch(
    projects,
    (candidate) => [candidate.id, candidate.slug, candidate.name],
    options.project,
    "project",
  );
  const team = pickTeam(project, teams, options.team);

  const allLabels = await client.loadIssueLabels();
  const teamLabels = allLabels.filter((label) => !label.team || label.team.id === team.id);
  const existingProjectIssues = await client.loadProjectIssues(project.id);
  const issuesByTitle = new Map(existingProjectIssues.map((issue) => [issue.title, issue]));
  const importedIssues = new Map();
  const skippedIssues = [];
  const warnings = [];

  console.log(`Parsed ${issues.length} issues from ${options.input}`);
  console.log(`Target project: ${project.name} (${project.id})`);
  console.log(`Target team: ${team.key ?? team.name} (${team.id})`);
  if (options.dryRun) {
    console.log("Dry run enabled. No Linear data will be created.");
  }

  for (const issue of issues) {
    const { labelIds, missingLabels } = await ensureLabels({
      client,
      labels: issue.labels,
      teamId: team.id,
      existingLabels: teamLabels,
      createMissingLabels: options.createMissingLabels,
      dryRun: options.dryRun,
    });

    if (missingLabels.length > 0) {
      warnings.push(`${issue.sourceId}: missing labels not applied: ${missingLabels.join(", ")}`);
    }

    if (options.skipExisting && issuesByTitle.has(issue.title)) {
      const existing = issuesByTitle.get(issue.title);
      importedIssues.set(issue.sourceId, existing);
      skippedIssues.push(`${issue.sourceId} -> ${existing.identifier}`);
      console.log(`Skipping existing issue: ${issue.title} (${existing.identifier})`);
      continue;
    }

    if (options.dryRun) {
      importedIssues.set(issue.sourceId, {
        id: issue.sourceId,
        identifier: issue.sourceId,
        title: issue.title,
      });
      console.log(`Would create: ${issue.title}`);
      continue;
    }

    const created = await client.createIssue({
      teamId: team.id,
      projectId: project.id,
      title: issue.title,
      description: issue.description,
      labelIds,
    });

    issuesByTitle.set(created.title, created);
    importedIssues.set(issue.sourceId, created);
    console.log(`Created ${created.identifier}: ${created.title}`);
  }

  let relationCount = 0;
  for (const issue of issues) {
    const dependent = importedIssues.get(issue.sourceId);
    if (!dependent) {
      continue;
    }

    for (const dependencySourceId of issue.dependsOn) {
      const dependency = importedIssues.get(dependencySourceId);
      if (!dependency) {
        warnings.push(`${issue.sourceId}: dependency ${dependencySourceId} was not created or found; relation skipped`);
        continue;
      }

      if (options.dryRun) {
        relationCount += 1;
        console.log(`Would relate ${dependency.identifier} blocks ${dependent.identifier}`);
        continue;
      }

      const relation = await client.createBlocksRelation(dependency.id, dependent.id);
      if (!relation.skipped) {
        relationCount += 1;
      }
    }
  }

  console.log("");
  console.log("Import complete.");
  console.log(`Issues parsed: ${issues.length}`);
  console.log(`Issues reused: ${skippedIssues.length}`);
  console.log(`Dependency relations processed: ${relationCount}`);

  if (skippedIssues.length > 0) {
    console.log("Reused existing issues:");
    for (const line of skippedIssues) {
      console.log(`  - ${line}`);
    }
  }

  if (warnings.length > 0) {
    console.log("Warnings:");
    for (const warning of warnings) {
      console.log(`  - ${warning}`);
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});