# Refinr Architecture

## Purpose

This document captures the implementation-facing system architecture for Refinr. It is a supporting document to [../PRD.md](../PRD.md).

For the approved technology choices behind this architecture, see [mvp-stack.md](mvp-stack.md).

## Architecture Goals

For MVP, the technical architecture should optimize for three things:

- Fast iteration on refinement logic.
- Clear separation between user-facing workflow state and AI orchestration logic.
- Safe, observable integration with external systems.

The architecture should be modular, but not prematurely distributed. MVP should favor a well-structured application with clear service boundaries over a microservices approach.

## Recommended MVP Architecture Style

Refinr should be built as a web application with a single primary backend application and a small number of asynchronous workers.

Recommended high-level structure:

- Web client for project setup, refinement sessions, and ticket review.
- Backend API for authentication, project management, orchestration control, and persistence.
- Background job layer for repository ingestion, long-running AI calls, summarization, and Linear export retries.
- Relational database for durable product state.
- Object or blob storage for cached repository artifacts and large context snapshots.

This is the simplest architecture that still cleanly supports the product workflow.

## Core Architectural Components

### 1. Web Client

Responsibilities:

- User authentication and session management.
- Project setup and integrations UI.
- Requirement creation and refinement interface.
- Readiness score and orchestration visibility.
- Ticket review and export workflow.

The client should be thin with respect to orchestration logic. It should render state, collect user input, and invoke backend workflows.

### 2. Application API

Responsibilities:

- Expose authenticated APIs to the web client.
- Persist projects, requirements, sessions, tickets, and export records.
- Coordinate orchestration decisions.
- Enforce readiness rules and export gates.
- Manage integration credentials and configuration.

This service is the system of record for product workflow state.

### 3. Orchestration Engine

Responsibilities:

- Decide which persona should act next.
- Build prompts and structured inputs for AI providers.
- Track refinement stage and readiness dimensions.
- Convert user answers into updated requirement state.
- Trigger ticketization when readiness conditions are met.

For MVP, this can live inside the backend application as a dedicated domain module rather than a separate deployed service.

### 4. AI Provider Gateway

Responsibilities:

- Abstract calls to external AI providers.
- Normalize request and response handling across models.
- Track provider usage, latency, failures, and estimated cost.
- Apply retry, fallback, and timeout policies.

This layer should prevent provider-specific behavior from leaking throughout the codebase.

### 5. Repository Context Ingestion Service

Responsibilities:

- Pull approved repository context sources.
- Parse selected documents.
- Extract structured context and citations.
- Create and refresh project context snapshots.

For MVP, this should be document-oriented and queue-backed. It does not need full repository indexing or semantic code graph generation.

### 6. Linear Integration Service

Responsibilities:

- Authenticate and store Linear connection metadata securely.
- Validate destination teams or boards.
- Create Linear issues from approved ticket candidates.
- Record export results and retry failures safely.

This component should be designed as an integration adapter with idempotent export behavior.

### 7. Background Worker Layer

Responsibilities:

- Run repository sync jobs.
- Process long-running summarization and ticketization jobs.
- Retry failed Linear exports.
- Recompute derived readiness summaries where needed.

This prevents the interactive UI from blocking on slower external operations.

## Proposed Runtime Boundaries

For MVP, a pragmatic deployment boundary is:

- One frontend application.
- One backend application.
- One worker process type.
- One primary relational database.
- One queue or background job mechanism.
- One blob store if large context payloads need to be retained.

That is enough separation to scale the slow parts independently without adding operational complexity too early.

## Primary Data Flows

### Refinement Flow

1. User submits a requirement or answer from the web client.
2. Backend persists the new message or state change.
3. Orchestration engine evaluates readiness gaps and next persona.
4. AI gateway calls the provider with the appropriate persona prompt and context.
5. Backend stores the response, updated summary, and readiness changes.
6. UI renders the updated state.

### Repository Context Flow

1. User links a repository and selects context sources.
2. Backend schedules a context ingestion job.
3. Worker fetches and parses approved materials.
4. Extracted context and citations are stored as project context snapshot data.
5. Refinement sessions can reference the latest approved snapshot.

### Ticket Export Flow

1. User approves ticket candidates.
2. Backend validates readiness and export preconditions.
3. Export job sends issues to Linear.
4. Export results are stored with returned issue IDs.
5. UI shows success, failure, and retry status.

## State Management Model

The architecture should distinguish between four types of state:

- Durable domain state: projects, requirements, sessions, ticket candidates, exports.
- Derived state: readiness score, synthesized summaries, orchestration recommendations.
- External state: repository snapshots, Linear identifiers, provider responses.
- Ephemeral UI state: local editing state, panel visibility, in-progress form drafts.

Derived state should be recomputable from durable state where practical.

## Storage Model

Recommended MVP storage approach:

- Relational database for core entities and audit history.
- JSON fields where useful for structured summaries, readiness dimensions, and persona logs.
- Blob storage for larger repository extracts, prompt artifacts, or cached context bundles.

The database schema should preserve event history rather than storing only the latest refinement snapshot.

## Suggested Domain Modules

Within the backend, the codebase should be organized around product domains rather than transport or vendor concerns.

Recommended modules:

- Authentication and users
- Projects and integrations
- Repository context
- Requirements and refinement sessions
- Persona orchestration
- Ticket generation and review
- Linear export
- Observability and audit

This keeps the orchestration logic from being tangled with integration plumbing.

## Synchronous Vs Asynchronous Work

For MVP, these operations should usually be synchronous from the user perspective:

- Creating a requirement.
- Submitting an answer.
- Receiving the next persona question.
- Viewing the current readiness and summary state.

These operations should usually be asynchronous:

- Repository sync and context refresh.
- Large summarization or backfill jobs.
- Export retries.
- Reprocessing after provider failure.

Ticket generation can be either synchronous or short-job asynchronous, depending on latency. If generation regularly exceeds interactive tolerance, it should move behind a job boundary with visible progress in the UI.

## Security And Secrets Handling

The architecture should assume external integrations and project context are sensitive.

MVP security requirements:

- Encrypt stored integration credentials.
- Scope repository and Linear access per project and workspace.
- Store audit history for exports and overrides.
- Avoid logging raw secrets or unnecessary provider payloads.
- Apply tenant isolation so project context never leaks across workspaces.

## Observability Requirements

Observability is part of the architecture, not an afterthought.

The system should capture:

- AI request latency and failure rate.
- Provider usage and estimated cost.
- Persona invocation frequency.
- Readiness progression by requirement.
- Export success and failure rates.
- Repository sync status and freshness.

This is necessary both for debugging product quality and for controlling provider spend.

## Failure Handling Strategy

The architecture should degrade gracefully when external systems fail.

MVP expectations:

- AI provider failure should not corrupt requirement state.
- Repository sync failure should leave the last known good context snapshot intact.
- Linear export failure should be retryable and idempotent.
- Partial export results should be visible to the user.

## Architecture Decisions To Keep Out Of MVP

The MVP should avoid these unless proven necessary:

- Microservices split by domain.
- Real-time collaborative editing infrastructure.
- Full repository semantic indexing pipeline.
- Multi-provider orchestration marketplace.
- Event streaming platform for all internal state changes.

## Recommended First Implementation Sequence

The technical architecture should be built in this order:

1. Core backend domain model and relational schema.
2. Web client shell and requirement workflow UI.
3. Single-provider AI gateway and orchestration module.
4. Readiness scoring and ticket generation flow.
5. Linear export adapter.
6. Repository context ingestion pipeline.
7. Worker-based retries, observability, and hardening.

This sequence delivers usable product value early while keeping the architecture aligned with the MVP.