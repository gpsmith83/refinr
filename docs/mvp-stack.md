# Refinr Approved MVP Stack

## Purpose

This document captures the approved MVP technology stack for Refinr. It is a supporting document to [../PRD.md](../PRD.md) and [architecture.md](architecture.md).

## Stack Principles

The approved MVP stack should prioritize:

- Team familiarity.
- Zero required paid platform dependencies in the application core.
- Deploy-anywhere portability.
- Replaceable adapters around commercial external services.

## Frontend

- Modern Angular with TypeScript
- Angular Router
- Angular CDK
- Tailwind CSS as the default UI styling system
- Angular Material only for a limited set of mature controls where it saves time
- RxJS for asynchronous UI state and workflow coordination

Rationale:

- Angular matches team familiarity better than React-based alternatives.
- Tailwind allows a more flexible and product-specific UI than relying entirely on Angular Material.
- This keeps the frontend portable and free of hosting-specific assumptions.

## Backend

- Node.js
- Express with TypeScript
- Zod for request and domain validation
- Pino for structured logging
- Helmet and standard Express security middleware

Rationale:

- Express fits the team and is sufficient for the application API, orchestration control plane, and integration adapters.
- TypeScript shared across frontend and backend reduces schema and integration drift.

## Database And Data Access

- PostgreSQL as the primary system-of-record database
- pgvector extension for embedding storage and simple retrieval
- Drizzle ORM for schema management, migrations, and typed data access
- JSONB fields for readiness state, summaries, persona logs, and provider metadata

Rationale:

- PostgreSQL covers the core relational model and retrieval needs without introducing another database class for MVP.
- Drizzle is a good fit for a greenfield TypeScript codebase and keeps schema ownership explicit.

## Background Jobs

- pg-boss for queueing and background job execution
- A separate worker process using the same application codebase and database

Initial job types:

- Repository sync and context ingestion
- Context extraction and summarization
- Long-running AI orchestration tasks when they exceed interactive latency
- Ticket generation when needed asynchronously
- Linear export retries and scheduled refresh jobs

Rationale:

- pg-boss is free, Postgres-backed, portable, and adequate for MVP workflow orchestration without introducing an external job platform.

## Authentication

- Passport
- express-session
- Postgres-backed session storage
- GitHub OAuth as the first and only required login method for MVP

Rationale:

- This avoids hosted auth vendors while keeping implementation complexity reasonable.
- GitHub login is a sensible MVP default given the product's repository-centric workflow.

## Integrations

- Octokit for GitHub repository access
- Direct Linear API integration
- Commercial AI providers accessed through internal adapter interfaces

Initial adapter expectation:

- One primary commercial AI provider at launch
- Optional second provider later for resilience or model fit

Rationale:

- GitHub and Linear are allowed external systems for MVP.
- AI providers and Linear should remain boundary adapters so the core product is not tightly coupled to any single external service.

## Storage

- Local filesystem for development and early deployments where blob storage is minimal
- Defer MinIO until a concrete need exists for portable object storage

Rationale:

- The MVP should not add operational components before the product actually needs them.
- If larger artifact storage becomes necessary, MinIO is the portable upgrade path.

## Observability

- Structured JSON logging
- Request IDs and job IDs across API and worker flows
- Basic health endpoints for API and worker processes

Deferred until later:

- OpenTelemetry
- Prometheus
- Grafana

Rationale:

- The MVP should start with disciplined logs and identifiers, then add heavier observability infrastructure only once operational pain justifies it.

## Deployment

- Docker Compose as the default deployment topology
- Deployable on self-hosted infrastructure or generic cloud compute
- Reverse proxy via Caddy or Nginx

Initial production shape:

- Angular frontend container or static asset host
- Express API container
- Worker container
- PostgreSQL container or portable managed PostgreSQL if chosen later

Rationale:

- This keeps the system portable across self-hosted environments and hyperscalers without assuming a specific vendor runtime.

## Explicit MVP Defaults

The following defaults are approved for MVP:

- Frontend framework: Angular
- Backend framework: Express
- UI approach: Tailwind-first, Angular Material selectively
- Authentication: GitHub OAuth first
- Blob storage: deferred unless an immediate need emerges
- Job system: pg-boss
- Vector storage: pgvector in PostgreSQL

## Architecture Principles Implied By This Stack

- Core platform components must remain free, portable, and deployable on generic infrastructure.
- External commercial services are allowed only through replaceable adapter boundaries.
- The MVP should prefer operational simplicity over architectural novelty.
- New infrastructure components should only be introduced when the product has a demonstrated need for them.