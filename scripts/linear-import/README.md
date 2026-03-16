# Linear Import Script

This folder contains a standalone Node.js script that imports the issues defined in [docs/linear-import-ready-issues.md](../../docs/linear-import-ready-issues.md) into a Linear project.

## What It Does

- Parses each `###` issue entry from the markdown file.
- Creates Linear issues inside the specified project.
- Applies listed issue labels when they already exist on the selected team.
- Optionally creates missing team labels.
- Reuses existing project issues with the same title by default so reruns do not duplicate work.
- Creates `blocks` relations from declared dependencies.

## Requirements

- Node.js 18 or newer.
- A Linear personal API key, or an OAuth authorization value that you pass directly as the `Authorization` header value.

## Usage

```bash
LINEAR_API_KEY=lin_api_xxx \
node scripts/linear-import/import-issues.mjs \
  --project refinr \
  --team ENG
```

You can also use an exact project name or project UUID:

```bash
node scripts/linear-import/import-issues.mjs \
  --api-key lin_api_xxx \
  --project "Refinr MVP"
```

## Useful Options

```bash
--input <path>              Use a different markdown file.
--create-missing-labels     Create missing labels on the selected team.
--no-skip-existing          Do not reuse existing issues by title.
--dry-run                   Parse and resolve everything without writing to Linear.
```

## Suggested First Run

Run a dry run first to confirm the project and team resolution:

```bash
LINEAR_API_KEY=lin_api_xxx \
node scripts/linear-import/import-issues.mjs \
  --project refinr \
  --team ENG \
  --dry-run
```

## Notes

- Dependency import uses Linear `blocks` relations.
- When an issue says it depends on `B-001`, the script creates a relation so `B-001` blocks that issue.
- Missing labels are logged as warnings unless `--create-missing-labels` is supplied.