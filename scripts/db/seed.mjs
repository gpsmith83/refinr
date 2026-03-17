#!/usr/bin/env node

if (!process.env.DATABASE_URL) {
  console.error(
    "Missing DATABASE_URL. Copy .env.api.example -> .env and set DATABASE_URL.",
  );
  process.exitCode = 1;
} else {
  console.log(
    "No seed workflow yet. B-003/B-005 will define seed data and scripts.",
  );
}
