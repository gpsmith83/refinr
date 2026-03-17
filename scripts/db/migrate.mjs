#!/usr/bin/env node

const hint = `
No database migrations are defined yet.

This repository’s migration tooling will be implemented in B-003 (Drizzle).

For now, verify DB connectivity via:
  - pnpm db:up
  - psql "$DATABASE_URL" -c 'select 1'
`;

if (!process.env.DATABASE_URL) {
  console.error(
    "Missing DATABASE_URL. Copy .env.api.example -> .env and set DATABASE_URL.",
  );
  process.exitCode = 1;
} else {
  console.log(hint);
}
