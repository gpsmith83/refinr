# Agent + CI Policy (Refinr)

This repository is designed to be automation-friendly (local dev, CI, and agent orchestration).

## One-command verification

Use this as the default “proof of work” command for tickets and PRs:

```bash
pnpm verify
```

`pnpm verify` must pass before opening a PR and before pushing changes that should be considered merge-ready.

## Standard commands

```bash
# Install deps (preferred)
pnpm bootstrap

# Format check (no writes)
pnpm format

# Lint
pnpm lint

# Typecheck
pnpm typecheck

# Build
pnpm build

# Tests (may be minimal early on)
pnpm test
```

## Notes

- Some apps/scripts are intentionally scaffolded in stages (see `docs/linear-import-ready-issues.md`).
- Early milestones may have placeholder `test` scripts; CI still runs `pnpm verify` to keep the workflow consistent.
