# Development

This repo is intentionally bootstrapped in stages. `B-000` establishes a consistent
local developer workflow; later tickets fill in the actual application runtimes.

## Prerequisites

- Node.js `>= 20` (see `.nvmrc` / `.tool-versions`)
- `pnpm` via Corepack
- Docker (for local PostgreSQL)

## Fresh clone bootstrap

```bash
# enable pnpm via Corepack
corepack enable

# if Corepack fails (for example due to signature/key mismatch), install pnpm
# directly and retry.
npm i -g pnpm@9.15.6 --force

# install workspace deps
pnpm install

# start local Postgres (+ pgvector)
pnpm db:up

# (optional) view DB logs / status
pnpm db:ps
pnpm db:logs
```

## Environment templates

Copy the templates as needed:

- `.env.api.example` -> `.env` (API defaults)
- `.env.worker.example` -> `.env.worker` (worker defaults)
- `.env.web.example` -> `.env.web` (frontend defaults)

## Common commands

```bash
# format / lint
pnpm format
pnpm lint

# typecheck / build
pnpm typecheck
pnpm build

# dev (starts api + worker; web is a placeholder until B-001)
pnpm dev
```

## Notes

- The API and worker processes are placeholders until `B-002` / `B-008`.
- Migration + seed scripts are placeholders until `B-003`.
