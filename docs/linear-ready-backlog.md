# Refinr Linear-Ready Backlog

## Purpose

This document is a derived artifact from [initial-delivery-backlog.md](initial-delivery-backlog.md).

It is optimized for converting the documented MVP backlog into tracker-native issues later, while leaving the source backlog in a more human-readable planning format.

The source of truth remains [initial-delivery-backlog.md](initial-delivery-backlog.md).

## How To Use This Document

- Treat each `B-xxx` entry as one candidate tracker issue.
- Use the suggested labels as a starting point, not a hard requirement.
- Preserve dependencies where they materially affect sequencing.
- Copy the summary and acceptance fields into issue descriptions when creating tracker records.

## Suggested Field Conventions

- Milestone label: `milestone:*`
- Area label: `area:*`
- Type label: `type:*`

## Milestone 0

### B-001 Angular application shell

- Milestone: `milestone:foundation`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: none
- Summary: Initialize the Angular app, configure core routes for sign-in, workspace, project, and requirement views, and add a minimal app shell.
- Acceptance:
  - Angular app runs locally.
  - Placeholder routes for core product areas are navigable.

### B-002 Express API skeleton

- Milestone: `milestone:foundation`
- Area: `area:backend`
- Type: `type:feature`
- Depends on: none
- Summary: Initialize the Express API with TypeScript, baseline middleware, logging, security headers, and a health endpoint.
- Acceptance:
  - API runs locally.
  - Health endpoint responds successfully.

### B-003 PostgreSQL and baseline schema tooling

- Milestone: `milestone:foundation`
- Area: `area:data`
- Type: `type:feature`
- Depends on: `B-002`
- Summary: Configure PostgreSQL with pgvector, initialize Drizzle migrations, and create baseline tables for users, workspaces, projects, and requirements.
- Acceptance:
  - Migrations run successfully.
  - Baseline tables exist and are queryable.

### B-004 GitHub OAuth session authentication

- Milestone: `milestone:foundation`
- Area: `area:auth`
- Type: `type:feature`
- Depends on: `B-002`, `B-003`
- Summary: Configure Passport-based GitHub OAuth and session persistence for authenticated users.
- Acceptance:
  - User can sign in with GitHub OAuth.
  - Authenticated session persists across requests.

### B-005 Workspace and project creation flow

- Milestone: `milestone:foundation`
- Area: `area:projects`
- Type: `type:feature`
- Depends on: `B-001`, `B-003`, `B-004`
- Summary: Implement workspace and project creation APIs and UI so authenticated users can create the first project hierarchy.
- Acceptance:
  - Authenticated user can create a workspace and project.
  - Project appears on the dashboard.

### B-006 Docker Compose local stack

- Milestone: `milestone:foundation`
- Area: `area:infra`
- Type: `type:feature`
- Depends on: `B-001`, `B-002`, `B-003`
- Summary: Create a local Docker Compose stack for frontend, API, and database with documented startup steps.
- Acceptance:
  - Core stack launches locally from one documented workflow.

## Milestone 1

### B-101 Requirement domain model and APIs

- Milestone: `milestone:requirement-intake`
- Area: `area:requirements`
- Type: `type:feature`
- Depends on: `B-003`, `B-005`
- Summary: Add requirement persistence and project-scoped create, read, and list APIs.
- Acceptance:
  - Requirements can be created and retrieved within a project.
  - Requirements are workspace-scoped through project ownership.

### B-102 Requirement creation UI

- Milestone: `milestone:requirement-intake`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-001`, `B-101`
- Summary: Build the requirement creation UI for a short freeform prompt and optional context notes.
- Acceptance:
  - User can create a requirement from the project interface.
  - Created requirement appears immediately in the UI.

### B-103 Project dashboard requirement listing

- Milestone: `milestone:requirement-intake`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-101`, `B-102`
- Summary: Add requirement listing to the project dashboard with status and last-updated information.
- Acceptance:
  - Project requirements are listed and link to requirement detail views.

### B-104 Requirement detail page shell

- Milestone: `milestone:requirement-intake`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-101`, `B-102`
- Summary: Build the requirement detail page shell with initial prompt, status, and placeholders for conversation, summary, and readiness.
- Acceptance:
  - Requirement detail page loads persisted requirement data.

### B-105 Refinement session and message persistence

- Milestone: `milestone:requirement-intake`
- Area: `area:requirements`
- Type: `type:feature`
- Depends on: `B-101`
- Summary: Persist refinement sessions and requirement messages as the durable history for guided refinement.
- Acceptance:
  - Requirement messages are stored and retrieved in order for a requirement.

## Milestone 2

### B-201 AI provider gateway abstraction

- Milestone: `milestone:guided-refinement`
- Area: `area:ai`
- Type: `type:feature`
- Depends on: `B-002`
- Summary: Create an internal AI provider abstraction with the first commercial provider adapter and usage metadata capture.
- Acceptance:
  - Backend can call the configured provider through the internal abstraction.

### B-202 Initial refinement session start flow

- Milestone: `milestone:guided-refinement`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-104`, `B-105`, `B-201`
- Summary: Add the API and UI action to begin refinement and create a default refinement session with a starting persona context.
- Acceptance:
  - User can start refinement from a requirement page.
  - System produces the first guided question.

### B-203 Question-and-answer loop persistence

- Milestone: `milestone:guided-refinement`
- Area: `area:requirements`
- Type: `type:feature`
- Depends on: `B-105`, `B-202`
- Summary: Persist system questions and user answers and reload the refinement history in the UI.
- Acceptance:
  - Questions and answers remain visible after page refresh.

### B-204 Summary snapshot generation

- Milestone: `milestone:guided-refinement`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-201`, `B-203`
- Summary: Generate and persist requirement summary snapshots after meaningful refinement turns.
- Acceptance:
  - Summary state updates after meaningful user responses.

### B-205 Basic readiness computation

- Milestone: `milestone:guided-refinement`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-204`
- Summary: Compute the initial readiness dimensions and total score for a requirement.
- Acceptance:
  - Backend derives readiness dimensions and total score for a requirement.

### B-206 Readiness score and missing-information UI

- Milestone: `milestone:guided-refinement`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-205`
- Summary: Render readiness dimensions, total score, and missing information in the requirement UI.
- Acceptance:
  - Readiness dimensions are visible as complete, partial, or missing.
  - UI highlights missing information preventing ticket generation.

## Milestone 3

### B-301 Persona invocation model and audit trail

- Milestone: `milestone:persona-orchestration`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-105`
- Summary: Add persona invocation persistence with invocation reason and contributed dimensions.
- Acceptance:
  - Persona invocations can be stored and reviewed for a requirement.

### B-302 Default persona progression rules

- Milestone: `milestone:persona-orchestration`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-201`, `B-205`, `B-301`
- Summary: Encode default persona progression rules and recommend the next persona based on requirement state and readiness gaps.
- Acceptance:
  - System can recommend the next persona using defined rules.

### B-303 Specialist persona trigger rules

- Milestone: `milestone:persona-orchestration`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-302`
- Summary: Add trigger logic for Senior Developer, UI Designer, and Reality Checker.
- Acceptance:
  - Non-trivial requirements can trigger specialist personas for clear reasons.

### B-304 Hybrid persona control UI

- Milestone: `milestone:persona-orchestration`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-302`, `B-303`
- Summary: Allow the user to accept, skip, or request personas where permitted and show invocation reasons in the UI.
- Acceptance:
  - User can accept or skip a suggested persona and see why it was suggested.

### B-305 Readiness gate enforcement

- Milestone: `milestone:persona-orchestration`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-205`, `B-304`
- Summary: Enforce blocking readiness dimensions before ticket generation.
- Acceptance:
  - Ticket generation is blocked when readiness is insufficient.

### B-306 Readiness override capture and marking

- Milestone: `milestone:persona-orchestration`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-305`
- Summary: Capture explicit readiness overrides and mark downstream ticket state accordingly.
- Acceptance:
  - User can explicitly override the readiness gate.
  - Override state is captured and reflected in downstream ticket data.

## Milestone 4

### B-401 Ticket candidate domain model and APIs

- Milestone: `milestone:ticketization`
- Area: `area:tickets`
- Type: `type:feature`
- Depends on: `B-003`, `B-305`
- Summary: Add ticket candidate persistence, retrieval, and core status metadata.
- Acceptance:
  - Ticket candidates can be stored and retrieved for a requirement.

### B-402 Ticket generation service

- Milestone: `milestone:ticketization`
- Area: `area:tickets`
- Type: `type:feature`
- Depends on: `B-201`, `B-305`, `B-401`
- Summary: Generate flat ticket candidates from ticket-ready requirements including title, description, acceptance criteria, and assumptions.
- Acceptance:
  - Ticket-ready requirement can produce one or more ticket candidates.

### B-403 Ticket review interface

- Milestone: `milestone:ticketization`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-402`
- Summary: Build the review UI to list, inspect, and approve ticket candidates.
- Acceptance:
  - Users can inspect and approve individual ticket candidates.

### B-404 Split and merge ticket actions

- Milestone: `milestone:ticketization`
- Area: `area:tickets`
- Type: `type:feature`
- Depends on: `B-403`
- Summary: Allow users to split over-broad ticket candidates and merge over-split ones.
- Acceptance:
  - Users can split one ticket into multiple candidates and merge related candidates.

### B-405 Dependency and ordering editing

- Milestone: `milestone:ticketization`
- Area: `area:tickets`
- Type: `type:feature`
- Depends on: `B-401`, `B-403`
- Summary: Let users define or edit dependencies and sequencing hints between ticket candidates.
- Acceptance:
  - Users can define or edit dependencies between ticket candidates.

## Milestone 5

### B-501 Linear connection domain and validation

- Milestone: `milestone:linear-export`
- Area: `area:integrations`
- Type: `type:feature`
- Depends on: `B-005`
- Summary: Configure and persist one Linear destination per project and validate connection details and target workflow.
- Acceptance:
  - Project can store and validate a Linear connection.

### B-502 Linear connection UI

- Milestone: `milestone:linear-export`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-501`
- Summary: Build the project UI for configuring and saving one Linear destination.
- Acceptance:
  - Project user can configure and save one Linear destination through the UI.

### B-503 Export batch model and APIs

- Milestone: `milestone:linear-export`
- Area: `area:export`
- Type: `type:feature`
- Depends on: `B-401`, `B-501`
- Summary: Add export batches and per-ticket export batch items to make exports auditable and retryable.
- Acceptance:
  - Export actions are recorded as batches with per-ticket status.

### B-504 Linear issue creation adapter

- Milestone: `milestone:linear-export`
- Area: `area:integrations`
- Type: `type:feature`
- Depends on: `B-503`
- Summary: Create Linear issues from approved ticket candidates and persist returned downstream identifiers.
- Acceptance:
  - Approved ticket candidates can be exported to Linear and mapped back to created issues.

### B-505 Export results UI

- Milestone: `milestone:linear-export`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-504`
- Summary: Show per-ticket export success, failure, and downstream identifiers in the UI.
- Acceptance:
  - Users can see export results for each ticket candidate.

### B-506 Retryable partial export handling

- Milestone: `milestone:linear-export`
- Area: `area:export`
- Type: `type:feature`
- Depends on: `B-503`, `B-504`
- Summary: Retry failed export items safely while preserving successful mappings during partial failure.
- Acceptance:
  - Partial export failures are visible and retryable without duplicating successful issues.

## Milestone 6

### B-601 GitHub repository connection domain

- Milestone: `milestone:repository-context`
- Area: `area:integrations`
- Type: `type:feature`
- Depends on: `B-004`, `B-005`
- Summary: Add GitHub repository connection persistence and project-scoped repository metadata.
- Acceptance:
  - Project can connect a GitHub repository.

### B-602 GitHub repository connection UI

- Milestone: `milestone:repository-context`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-601`
- Summary: Build the project UI for connecting a GitHub repository.
- Acceptance:
  - Project user can configure a GitHub repository connection through the UI.

### B-603 Context source recommendation and selection

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-601`, `B-602`
- Summary: Recommend likely documentation sources and allow the user to select which context sources are included.
- Acceptance:
  - User can choose which repository context sources are included.

### B-604 Repository context ingestion job pipeline

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-603`
- Summary: Fetch approved context sources, parse documents, and create repository context snapshots.
- Acceptance:
  - System can ingest approved context sources into a stored snapshot.

### B-605 Context citations and freshness metadata

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-604`
- Summary: Persist source citations and snapshot freshness metadata for repository context snapshots.
- Acceptance:
  - Context snapshots retain source citations and freshness metadata.

### B-606 Apply repository context in summaries and ticket generation

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-204`, `B-402`, `B-605`
- Summary: Inject repository context into summary and ticket generation flows while preserving user-answer priority.
- Acceptance:
  - Refinement outputs can reference repository context while preserving direct user intent.

### B-607 On-demand repository context refresh

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-604`
- Summary: Allow users to refresh project context and see the latest snapshot freshness.
- Acceptance:
  - Users can refresh project context and see current freshness state.

## Milestone 7

### B-701 Worker retries and recovery rules

- Milestone: `milestone:hardening`
- Area: `area:jobs`
- Type: `type:feature`
- Depends on: `B-506`, `B-604`
- Summary: Configure retries and recovery behavior for ingestion and export jobs.
- Acceptance:
  - Retryable background failures recover cleanly or surface actionable terminal errors.

### B-702 Request and job correlation logging

- Milestone: `milestone:hardening`
- Area: `area:observability`
- Type: `type:feature`
- Depends on: `B-002`
- Summary: Add structured logs with request IDs and job IDs propagated across API and worker flows.
- Acceptance:
  - Core flows can be traced across API and worker execution via shared identifiers.

### B-703 Workspace isolation and permission hardening

- Milestone: `milestone:hardening`
- Area: `area:security`
- Type: `type:feature`
- Depends on: `B-005`, `B-101`
- Summary: Enforce project access controls and verify workspace isolation across API and UI flows.
- Acceptance:
  - Cross-workspace access is rejected for project and requirement resources.

### B-704 Explicit failure-state UX for external dependency errors

- Milestone: `milestone:hardening`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-202`, `B-504`, `B-604`
- Summary: Show actionable error states for AI, repository, and Linear failures and distinguish retryable from terminal errors.
- Acceptance:
  - Users see meaningful failure states for core external integration errors.

### B-705 Audit retrieval for refinement and export history

- Milestone: `milestone:hardening`
- Area: `area:audit`
- Type: `type:feature`
- Depends on: `B-301`, `B-503`, `B-605`
- Summary: Expose persona history, readiness history, export history, and repository snapshot history for a requirement.
- Acceptance:
  - A completed requirement exposes audit history across refinement and export activities.

### B-706 Full provider payload audit retention and retrieval

- Milestone: `milestone:hardening`
- Area: `area:audit`
- Type: `type:feature`
- Depends on: `B-201`, `B-702`
- Summary: Persist full provider request and response payloads and make them retrievable for audit purposes without leaking them to ordinary logs.
- Acceptance:
  - Provider payload history is stored and retrievable for a requirement.
  - Ordinary logs do not expose raw provider payloads.

### B-707 Normal-turn responsiveness validation

- Milestone: `milestone:hardening`
- Area: `area:performance`
- Type: `type:feature`
- Depends on: `B-202`, `B-205`
- Summary: Measure representative refinement turn timings and validate the documented 10-second MVP responsiveness target.
- Acceptance:
  - Typical refinement turns complete within the documented 10-second target under representative MVP conditions.