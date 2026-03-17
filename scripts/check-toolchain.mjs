#!/usr/bin/env node

const [major] = process.versions.node.split(".").map((part) => Number(part));
if (!Number.isFinite(major) || major < 20) {
  console.error(
    `Node.js >= 20 is required. Detected ${process.versions.node}.`,
  );
  process.exit(1);
}

const ua = process.env.npm_config_user_agent ?? "";
if (!ua.includes("pnpm/")) {
  console.error(
    "This repo expects pnpm via Corepack.\n" +
      "Run: corepack enable\n" +
      "Then: pnpm install\n",
  );
  process.exit(1);
}
