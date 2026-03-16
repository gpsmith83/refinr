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
- Copy the milestone execution-readiness notes into each created issue so local setup, required services, credentials, validation steps, and ready signals are explicit for the assignee.

## Acceptance Writing Standard

Acceptance items in this document are written to be tracker-friendly and operational.

When copying these items into Linear, prefer acceptance wording that describes observable outcomes such as:

- what a user can do
- what the system stores or returns
- what a reviewer can verify from the UI, API, or persisted state

These are not full test scripts, but they should be specific enough that a person or autonomous delivery system can understand what "done" means for the issue.

## Suggested Field Conventions

- Milestone label: `milestone:*`
- Area label: `area:*`
- Type label: `type:*`

## Execution Readiness Standard

Every tracker issue created from this document should explicitly include:

- Prerequisites and blocking tickets that must be complete first.
- Local services that must be running.
- Required environment variables or local configuration.
- Required external sandbox credentials, accounts, or test destinations.
- The exact startup path the developer should use in this repository.
- The validation command or walkthrough that proves the change works locally.
- The expected ready signal that tells a junior developer their environment is correctly prepared.

Until B-000 and B-006 establish the repository-standard commands, the milestone readiness notes below should be treated as required issue content rather than optional guidance.

## Milestone 0

- Shared execution readiness for all Milestone 0 issues:
- Prerequisites: none for `B-000` and `B-007`; all other foundation work should wait for the bootstrap and secrets guidance they produce.
- Local services: frontend, API, PostgreSQL, and worker are introduced during this milestone and must converge on one documented startup path.
- Environment and config: local environment templates, database connection settings, session configuration, and GitHub OAuth variables defined by `B-000` and `B-007`.
- External access: a non-production GitHub OAuth app and a test GitHub account are required for `B-004`.
- Startup path: use the repository bootstrap and Docker Compose commands established by `B-000` and `B-006`.
- Validation path: verify placeholder routes, API health, database migrations, worker readiness, and GitHub sign-in once those pieces exist.
- Ready signal: the app shell loads, the API health endpoint responds successfully, migrations complete, the worker connects to pg-boss, and GitHub login succeeds.

### B-000 Repository bootstrap and developer workflow

- Milestone: `milestone:foundation`
- Area: `area:infra`
- Type: `type:feature`
- Depends on: none
- Summary: Use the approved stack in [mvp-stack.md](mvp-stack.md) as input and turn it into the repository bootstrap path, required toolchain, standard scripts, environment templates, and exact local verification steps a new developer needs.
- Acceptance:
  - The repository bootstrap guidance is consistent with the approved technology choices and defaults documented in [mvp-stack.md](mvp-stack.md).
  - The repository contains a documented developer bootstrap path that assumes no prior project knowledge.
  - The required Node.js version and package manager are explicitly stated and enforced or validated by the repository tooling.
  - Standard scripts exist for development, build, lint, test, migration, and seed or equivalent local data setup workflows.
  - Environment variable templates exist for local development and list the required values for frontend, API, database, session, and integration-related configuration.
  - A developer starting from a fresh clone can follow the documented bootstrap flow and verify that the repository is ready for Milestone 0 implementation work.

### B-001 Angular application shell

- Milestone: `milestone:foundation`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: none
- Summary: Initialize the Angular app, configure core routes for sign-in, workspace, project, and requirement views, and add a minimal app shell.
- Acceptance:
  - The Angular application starts successfully in the local development environment.
  - Sign-in, workspace, project, and requirement placeholder routes resolve through the configured router.
  - A minimal application shell renders consistently across those routes.

### B-002 Express API skeleton

- Milestone: `milestone:foundation`
- Area: `area:backend`
- Type: `type:feature`
- Depends on: none
- Summary: Initialize the Express API with TypeScript, baseline middleware, logging, security headers, and a health endpoint.
- Acceptance:
  - The Express API starts successfully in the local development environment.
  - The health endpoint returns a successful response from the running API.
  - Baseline middleware for logging, security headers, and error handling is wired into request handling.

### B-003 PostgreSQL and baseline schema tooling

- Milestone: `milestone:foundation`
- Area: `area:data`
- Type: `type:feature`
- Depends on: `B-002`
- Summary: Configure PostgreSQL with pgvector, initialize Drizzle migrations, and create baseline tables for users, workspaces, projects, and requirements.
- Acceptance:
  - Drizzle migrations run successfully against the configured PostgreSQL instance.
  - Baseline tables for users, workspaces, projects, and requirements are created.
  - The created tables can be queried successfully from the application.

### B-004 GitHub OAuth session authentication

- Milestone: `milestone:foundation`
- Area: `area:auth`
- Type: `type:feature`
- Depends on: `B-007`, `B-002`, `B-003`
- Summary: Configure Passport-based GitHub OAuth and session persistence for authenticated users.
- Acceptance:
  - A new or existing user can complete sign-in with GitHub OAuth.
  - The authenticated user record is persisted or updated in application storage.
  - The resulting session remains valid across subsequent authenticated requests.

### B-005 Workspace and project creation flow

- Milestone: `milestone:foundation`
- Area: `area:projects`
- Type: `type:feature`
- Depends on: `B-001`, `B-003`, `B-004`
- Summary: Implement workspace and project creation APIs and UI so authenticated users can create the first project hierarchy and persist project setup metadata needed for later refinement and export.
- Acceptance:
  - An authenticated user can create a new workspace from the product UI.
  - The same user can create a project within that workspace.
  - The created project appears on the project dashboard for that workspace.
  - Project metadata and default refinement settings such as product area, goals, default labels, and an optional default persona stack can be captured and persisted.
  - Workspace and project ownership are persisted correctly.
  - Saved project metadata remains available after reload or later revisit.

### B-006 Docker Compose local stack

- Milestone: `milestone:foundation`
- Area: `area:infra`
- Type: `type:feature`
- Depends on: `B-000`, `B-001`, `B-002`, `B-003`, `B-008`
- Summary: Create a local Docker Compose stack for frontend, API, database, and worker with startup steps aligned to the documented bootstrap, environment, migration, and worker workflow.
- Acceptance:
  - Frontend, API, database, and worker services can be started locally from one documented workflow.
  - The documented startup path is sufficient for another developer with no prior repository knowledge to reach a running local stack.
  - The documented path includes the expected pre-requisites, required environment files, migration steps, and the worker service needed before the application can be used locally.

### B-007 Local secrets and external access prerequisites

- Milestone: `milestone:foundation`
- Area: `area:infra`
- Type: `type:feature`
- Depends on: `B-000`
- Summary: Document the required local secrets, non-production credentials, sandbox destinations, where each secret is used, and how a developer confirms setup is complete.
- Acceptance:
  - The repository documentation explicitly lists the local secrets and external accounts required for GitHub OAuth, session configuration, Linear integration, and AI provider access.
  - The setup guidance states how a developer obtains approved non-production credentials or sandbox destinations for each external dependency.
  - Local environment templates include the required secret variable names without embedding live credential values.
  - A developer can verify whether their local machine is ready to begin auth and integration implementation without relying on tribal knowledge or production credentials.

### B-008 Worker runtime and job execution skeleton

- Milestone: `milestone:foundation`
- Area: `area:jobs`
- Type: `type:feature`
- Depends on: `B-000`, `B-002`, `B-003`
- Summary: Create the worker runtime, pg-boss connection setup, local startup command, and baseline job registration conventions for queue-backed work.
- Acceptance:
  - The repository contains a worker runtime entry point aligned with the documented architecture and stack.
  - The worker can start locally against the configured PostgreSQL instance and connect to pg-boss successfully.
  - Baseline job registration conventions are documented so later tickets can add background jobs consistently.
  - A developer can run the documented worker start command and verify from a simple check or expected log output that it is ready to process jobs.

## Milestone 1

- Shared execution readiness for all Milestone 1 issues:
- Prerequisites: `B-000` and `B-006` should be complete, and `B-005` should provide an authenticated workspace and project to work against.
- Local services: frontend, API, and PostgreSQL should be running through the standard local stack.
- Environment and config: foundation environment templates plus any seeded or manually created workspace and project records needed for testing.
- External access: GitHub sign-in remains required for authenticated UI flows.
- Startup path: start the local stack with the repository-standard commands from `B-000` and `B-006`, then create or load a test workspace and project.
- Validation path: exercise requirement create, list, read, and reload flows through the UI and any supporting API endpoints.
- Ready signal: an authenticated user can create a requirement, see it on the project dashboard, and reopen it after refresh.

### B-101 Requirement domain model and APIs

- Milestone: `milestone:requirement-intake`
- Area: `area:requirements`
- Type: `type:feature`
- Depends on: `B-003`, `B-005`
- Summary: Add requirement persistence and project-scoped create, read, and list APIs.
- Acceptance:
  - A requirement can be created for a specific project through the backend API.
  - A requirement can be retrieved individually and through a project-scoped list API.
  - Requirement access is correctly scoped through project and workspace ownership.

### B-102 Requirement creation UI

- Milestone: `milestone:requirement-intake`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-001`, `B-101`
- Summary: Build the requirement creation UI for a short freeform prompt and optional context notes.
- Acceptance:
  - A project user can create a requirement from the project interface using a short freeform prompt.
  - Optional context notes can be entered during creation.
  - The created requirement appears immediately in the UI after successful save.

### B-103 Project dashboard requirement listing

- Milestone: `milestone:requirement-intake`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-101`, `B-102`
- Summary: Add requirement listing to the project dashboard with status and last-updated information.
- Acceptance:
  - Project requirements are listed on the project dashboard.
  - Each listed requirement shows enough identifying information to distinguish it in the dashboard.
  - Each listed requirement links to its requirement detail view.

### B-104 Requirement detail page shell

- Milestone: `milestone:requirement-intake`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-101`, `B-102`
- Summary: Build the requirement detail page shell with initial prompt, status, and placeholders for conversation, summary, and readiness.
- Acceptance:
  - The requirement detail page loads persisted requirement data for the selected requirement.
  - The page displays the initial prompt and current status.
  - The page includes visible sections for conversation history, summary state, and readiness state.

### B-105 Refinement session and message persistence

- Milestone: `milestone:requirement-intake`
- Area: `area:requirements`
- Type: `type:feature`
- Depends on: `B-101`
- Summary: Persist refinement sessions and requirement messages as the durable history for guided refinement.
- Acceptance:
  - Refinement sessions can be created and linked to a requirement.
  - Requirement messages are stored with the correct requirement and session linkage.
  - Stored messages are retrieved in the correct chronological order.

## Milestone 2

- Shared execution readiness for all Milestone 2 issues:
- Prerequisites: Milestone 1 flows must be working, and `B-007` must have documented the AI provider credentials required for local development.
- Local services: frontend, API, and PostgreSQL should be running; worker support is only required if a refinement step is moved behind a job boundary.
- Environment and config: baseline app configuration plus AI provider keys, model selection, and any prompt-class configuration defined by the provider gateway.
- External access: a non-production account for the primary AI provider is required.
- Startup path: run the local stack, sign in, create or load a requirement, and use the requirement detail view as the starting point.
- Validation path: start a refinement session, answer at least two turns, and confirm that messages, summaries, and readiness state persist after reload.
- Ready signal: the first guided question returns successfully, follow-up turns persist, and the latest summary and readiness state reload correctly.

### B-201 AI provider gateway abstraction

- Milestone: `milestone:guided-refinement`
- Area: `area:ai`
- Type: `type:feature`
- Depends on: `B-007`, `B-002`
- Summary: Create an internal AI provider abstraction with the first commercial provider adapter and usage metadata capture.
- Acceptance:
  - The backend calls the configured AI provider through an internal provider abstraction rather than vendor-specific logic in domain code.
  - The first provider adapter can successfully execute a provider call.
  - Provider usage metadata is captured for the call.

### B-202 Initial refinement session start flow

- Milestone: `milestone:guided-refinement`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-104`, `B-105`, `B-201`
- Summary: Add the API and UI action to begin refinement and create a default refinement session with a starting persona context.
- Acceptance:
  - A user can trigger refinement from the requirement page.
  - The system creates a refinement session linked to the requirement.
  - The system returns and displays the first guided question for that session.

### B-203 Question-and-answer loop persistence

- Milestone: `milestone:guided-refinement`
- Area: `area:requirements`
- Type: `type:feature`
- Depends on: `B-105`, `B-202`
- Summary: Persist system questions and user answers and reload the refinement history in the UI.
- Acceptance:
  - System questions and user answers are persisted as requirement messages.
  - The saved conversation history reloads correctly after page refresh.
  - Message ordering remains stable across reloads.

### B-204 Summary snapshot generation

- Milestone: `milestone:guided-refinement`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-201`, `B-203`
- Summary: Generate and persist requirement summary snapshots after meaningful refinement turns.
- Acceptance:
  - A new summary snapshot is generated after a meaningful refinement response.
  - The generated snapshot is persisted and linked to the correct requirement or session.
  - The latest summary state becomes available for display in the UI.

### B-205 Basic readiness computation

- Milestone: `milestone:guided-refinement`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-204`
- Summary: Compute the initial readiness dimensions and total score for a requirement.
- Acceptance:
  - The backend derives readiness dimensions for a requirement using the documented rubric.
  - The backend calculates a total readiness score for the requirement.
  - The resulting readiness state is persisted or otherwise made available for later retrieval.

### B-206 Readiness score and missing-information UI

- Milestone: `milestone:guided-refinement`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-205`
- Summary: Render readiness dimensions, total score, and missing information in the requirement UI.
- Acceptance:
  - Readiness dimensions are visible in the requirement UI as complete, partial, or missing.
  - The total readiness score is visible to the user.
  - The UI highlights missing information that is preventing ticket generation.

### B-207 Live requirement summary panel

- Milestone: `milestone:guided-refinement`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-104`, `B-204`
- Summary: Render the synthesized requirement summary in the requirement detail view and make it easy to verify that it updates and reloads correctly.
- Acceptance:
  - The requirement UI shows what is currently known about the requirement based on the latest summary snapshot.
  - The summary panel presents the latest synthesized state after meaningful refinement responses.
  - The latest summary remains visible after page refresh or later revisit.
  - A developer can verify the panel by completing refinement turns, refreshing the page, and confirming the latest saved summary is still shown.

## Milestone 3

- Shared execution readiness for all Milestone 3 issues:
- Prerequisites: Milestone 2 must be functioning with persisted refinement history and readiness state.
- Local services: frontend, API, and PostgreSQL should be running.
- Environment and config: the same AI provider and application configuration used for Milestone 2.
- External access: the primary AI provider sandbox account remains required.
- Startup path: run the local stack, open a non-trivial requirement, and continue from the requirement detail flow.
- Validation path: verify persona recommendation, accept and skip flows, explicit invocation reasons, readiness gate behavior, and override history.
- Ready signal: specialist personas appear for documented reasons and ticket generation is blocked or overridden deterministically from the requirement screen.

### B-301 Persona invocation model and audit trail

- Milestone: `milestone:persona-orchestration`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-105`
- Summary: Add persona invocation persistence with invocation reason and contributed dimensions.
- Acceptance:
  - Persona invocations are stored with the associated requirement and refinement session.
  - Invocation reason and contributed dimensions are retained.
  - Stored invocation history can be retrieved for review.

### B-302 Default persona progression rules

- Milestone: `milestone:persona-orchestration`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-201`, `B-205`, `B-301`
- Summary: Encode default persona progression rules and recommend the next persona based on requirement state and readiness gaps.
- Acceptance:
  - The system evaluates requirement state and readiness gaps to recommend the next persona.
  - The recommendation follows the documented default progression rules.
  - The recommendation can be returned in a form usable by the UI.

### B-303 Specialist persona trigger rules

- Milestone: `milestone:persona-orchestration`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-302`
- Summary: Add trigger logic for Senior Developer, UI Designer, and Reality Checker.
- Acceptance:
  - Non-trivial requirements can trigger specialist personas based on documented rules.
  - The trigger result includes a clear reason for invoking the specialist persona.

### B-304 Hybrid persona control UI

- Milestone: `milestone:persona-orchestration`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-302`, `B-303`
- Summary: Allow the user to accept, skip, or request personas where permitted and show invocation reasons in the UI.
- Acceptance:
  - The UI shows the recommended persona and the reason it was suggested.
  - The user can accept or skip the recommendation.
  - Where permitted, the user can manually request a persona through the UI.

### B-305 Readiness gate enforcement

- Milestone: `milestone:persona-orchestration`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-205`
- Summary: Enforce blocking readiness dimensions before ticket generation.
- Acceptance:
  - Ticket generation is blocked when blocking readiness dimensions are insufficient.
  - The blocked state is deterministically derived from the documented readiness rules.

### B-306 Readiness override capture and marking

- Milestone: `milestone:persona-orchestration`
- Area: `area:orchestration`
- Type: `type:feature`
- Depends on: `B-305`
- Summary: Capture explicit readiness overrides and mark downstream ticket state accordingly.
- Acceptance:
  - The user can explicitly override the readiness gate from the product flow.
  - The override action is persisted as part of refinement history.
  - Downstream ticket data is marked to reflect that the requirement was exported under override.

### B-307 Readiness gate status and override UI

- Milestone: `milestone:persona-orchestration`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-206`, `B-305`, `B-306`
- Summary: Show readiness gate blocking reasons in the requirement UI and provide the explicit override action with visible override state from the same screen.
- Acceptance:
  - The UI explains why ticket generation is blocked when readiness requirements are not met.
  - The UI identifies the dimensions that are preventing ticket generation.
  - A user can explicitly override the readiness gate from the product UI.
  - The requirement UI reflects when downstream tickets are being generated under override.
  - A developer can verify the flow from the requirement screen without using the API directly.

## Milestone 4

- Shared execution readiness for all Milestone 4 issues:
- Prerequisites: Milestone 3 must be working, and a ticket-ready requirement should be available for review.
- Local services: frontend, API, and PostgreSQL should be running.
- Environment and config: the same refinement configuration used in Milestone 3, plus any ticket-generation settings.
- External access: the primary AI provider account is still required when ticket candidates are generated live.
- Startup path: open a ticket-ready requirement from the local stack and enter the ticket review flow.
- Validation path: generate candidates, inspect them, edit content, split, merge, discard, update dependencies, and confirm the saved state after reload.
- Ready signal: the approved candidate set reflects user edits accurately and discarded candidates stay out of the default export path.

### B-401 Ticket candidate domain model and APIs

- Milestone: `milestone:ticketization`
- Area: `area:tickets`
- Type: `type:feature`
- Depends on: `B-003`, `B-305`
- Summary: Add ticket candidate persistence, retrieval, and core status metadata.
- Acceptance:
  - Ticket candidates can be stored for a specific requirement.
  - Ticket candidates can be retrieved individually and as a requirement-scoped list.
  - Candidate status and core metadata are retained.

### B-402 Ticket generation service

- Milestone: `milestone:ticketization`
- Area: `area:tickets`
- Type: `type:feature`
- Depends on: `B-201`, `B-305`, `B-401`
- Summary: Generate flat ticket candidates from ticket-ready requirements including title, description, acceptance criteria, and assumptions.
- Acceptance:
  - A ticket-ready requirement can produce one or more flat ticket candidates.
  - Each generated candidate includes title, description, acceptance criteria, and assumptions.
  - Generated candidates remain linked to the source requirement.

### B-403 Ticket review interface

- Milestone: `milestone:ticketization`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-402`
- Summary: Build the review UI to list, inspect, and approve ticket candidates.
- Acceptance:
  - Users can view the list of ticket candidates for a requirement.
  - Users can inspect individual ticket candidate details.
  - Users can approve individual ticket candidates from the review UI.

### B-404 Split and merge ticket actions

- Milestone: `milestone:ticketization`
- Area: `area:tickets`
- Type: `type:feature`
- Depends on: `B-403`
- Summary: Allow users to split over-broad ticket candidates and merge over-split ones.
- Acceptance:
  - A user can split one over-broad ticket candidate into multiple candidates.
  - A user can merge related ticket candidates that were over-split.
  - The resulting ticket set remains linked to the originating requirement.

### B-405 Dependency and ordering editing

- Milestone: `milestone:ticketization`
- Area: `area:tickets`
- Type: `type:feature`
- Depends on: `B-401`, `B-403`
- Summary: Let users define or edit dependencies and sequencing hints between ticket candidates.
- Acceptance:
  - Users can define dependencies between ticket candidates.
  - Users can edit existing dependency or sequencing information.
  - Updated dependency information persists with the ticket set.

### B-406 Ticket candidate content editing

- Milestone: `milestone:ticketization`
- Area: `area:tickets`
- Type: `type:feature`
- Depends on: `B-401`, `B-403`
- Summary: Allow direct editing of ticket candidate content, including execution guidance and unresolved-question blocking state, before export.
- Acceptance:
  - A user can edit ticket candidate content before export.
  - Edited ticket content persists across reload or later revisit.
  - A user can mark a ticket candidate as blocked by unresolved questions when needed.
  - Edited candidates remain linked to the originating requirement and candidate set.
  - A developer can verify the edit flow by changing a ticket, reloading the review view, and confirming the saved changes remain visible.

### B-407 Ticket candidate discard and restore actions

- Milestone: `milestone:ticketization`
- Area: `area:tickets`
- Type: `type:feature`
- Depends on: `B-403`, `B-406`
- Summary: Allow users to discard ticket candidates from the active export set without losing traceability, and restore them when needed.
- Acceptance:
  - A user can discard a ticket candidate from the review flow.
  - Discarded candidates are excluded from the default export selection.
  - Discarded candidates remain linked to the originating requirement and can be restored for review.

## Milestone 5

- Shared execution readiness for all Milestone 5 issues:
- Prerequisites: Milestone 4 must be working, and `B-007` must have documented Linear test credentials and allowed destinations.
- Local services: frontend, API, and PostgreSQL should be running; worker support is required when export retries run asynchronously.
- Environment and config: Linear API credentials, destination mapping configuration, and any default export metadata such as labels or priority.
- External access: a Linear test workspace, team, and any optional board or project destination needed for validation.
- Startup path: start the local stack, configure the Linear destination from project settings, and open a reviewed requirement with approved ticket candidates.
- Validation path: verify connection validation, export confirmation, downstream issue creation, metadata application, and safe retry of partial failures.
- Ready signal: issues are created once in the expected Linear destination, expected metadata is applied, and successful mappings survive retries.

### B-501 Linear connection domain and validation

- Milestone: `milestone:linear-export`
- Area: `area:integrations`
- Type: `type:feature`
- Depends on: `B-007`, `B-005`
- Summary: Configure and persist one Linear destination per project and validate connection details against the selected workspace, team, and any supported board or project mapping.
- Acceptance:
  - A project can store one Linear destination for MVP use, including the selected workspace, team, and any supported board or project mapping.
  - The stored Linear connection is validated against the configured credentials and selected destination objects.
  - Invalid connection details or invalid destination mappings are rejected rather than silently stored.

### B-502 Linear connection UI

- Milestone: `milestone:linear-export`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-501`
- Summary: Build the project UI for configuring, validating, and saving one Linear destination selection.
- Acceptance:
  - A project user can enter and save one Linear destination through the UI.
  - The UI allows the user to select the supported workspace, team, and any supported board or project mapping for that destination.
  - The UI surfaces connection validation success or failure.

### B-503 Export batch model and APIs

- Milestone: `milestone:linear-export`
- Area: `area:export`
- Type: `type:feature`
- Depends on: `B-401`, `B-501`
- Summary: Add export batches and per-ticket export batch items to make exports auditable and retryable.
- Acceptance:
  - Each export attempt is recorded as an export batch.
  - Each exported ticket candidate is recorded as a per-ticket batch item.
  - Per-ticket export status is retrievable after the export attempt.

### B-504 Linear issue creation adapter

- Milestone: `milestone:linear-export`
- Area: `area:integrations`
- Type: `type:feature`
- Depends on: `B-503`
- Summary: Create Linear issues from approved ticket candidates and persist returned downstream identifiers.
- Acceptance:
  - Approved ticket candidates can be exported to Linear as issues.
  - Returned Linear identifiers are persisted.
  - Created issues remain mapped back to their source ticket candidates.

### B-505 Export results UI

- Milestone: `milestone:linear-export`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-504`
- Summary: Show per-ticket export success, failure, and downstream identifiers in the UI.
- Acceptance:
  - The UI shows export success or failure for each ticket candidate in the export batch.
  - The UI shows downstream Linear identifiers for successfully created issues.

### B-506 Retryable partial export handling

- Milestone: `milestone:linear-export`
- Area: `area:export`
- Type: `type:feature`
- Depends on: `B-503`, `B-504`
- Summary: Retry failed export items safely while preserving successful mappings during partial failure.
- Acceptance:
  - Partial export failures are visible to the user.
  - Failed export items can be retried without duplicating already successful issues.
  - Successful mappings remain intact across retries.

### B-507 Export confirmation and metadata mapping

- Milestone: `milestone:linear-export`
- Area: `area:export`
- Type: `type:feature`
- Depends on: `B-502`, `B-504`, `B-505`
- Summary: Add a pre-export confirmation step and apply supported metadata such as labels, priority, estimates, and destination mapping to created Linear issues.
- Acceptance:
  - Before export, the UI confirms the destination and the metadata that will be applied to the selected ticket candidates.
  - Supported metadata such as labels, priority, estimates, and destination mapping are applied to created Linear issues consistently.
  - Exported issues remain traceable to their originating ticket candidates together with the metadata used at export time.

## Milestone 6

- Shared execution readiness for all Milestone 6 issues:
- Prerequisites: Milestone 5 must be operational, and GitHub repository access must be available for a test repository that contains approved documents.
- Local services: frontend, API, PostgreSQL, and worker should all be running.
- Environment and config: GitHub integration configuration, repository context settings, and any storage location used for snapshots or cached artifacts.
- External access: a test repository with readable markdown or documentation sources and credentials with permission to fetch its contents.
- Startup path: start the full local stack, connect a repository, select approved sources, run ingestion, then revisit refinement or ticket generation.
- Validation path: verify snapshot creation, citations, freshness, source replacement or removal, conflict surfacing, and on-demand refresh.
- Ready signal: the latest repository snapshot is visible, citations resolve correctly, and removed sources stop influencing newly generated output after refresh.

### B-601 GitHub repository connection domain

- Milestone: `milestone:repository-context`
- Area: `area:integrations`
- Type: `type:feature`
- Depends on: `B-007`, `B-004`, `B-005`
- Summary: Add GitHub repository connection persistence and project-scoped repository metadata.
- Acceptance:
  - A project can store a GitHub repository connection.
  - Repository metadata is persisted against the correct project.

### B-602 GitHub repository connection UI

- Milestone: `milestone:repository-context`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-601`
- Summary: Build the project UI for connecting a GitHub repository.
- Acceptance:
  - A project user can configure a GitHub repository connection through the UI.
  - The UI makes it clear which repository is currently connected.

### B-603 Context source recommendation and selection

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-601`, `B-602`
- Summary: Recommend likely documentation sources and allow the user to select which context sources are included.
- Acceptance:
  - The system recommends likely repository context sources.
  - The user can choose which sources are included or excluded.
  - The selected source set is persisted for later ingestion.

### B-604 Repository context ingestion job pipeline

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-008`, `B-603`
- Summary: Fetch approved context sources, parse documents, and create repository context snapshots.
- Acceptance:
  - Approved context sources are fetched and parsed through the ingestion pipeline.
  - The ingestion result is stored as a repository context snapshot.
  - The snapshot is linked to the correct project.

### B-605 Context citations and freshness metadata

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-604`
- Summary: Persist source citations and snapshot freshness metadata for repository context snapshots.
- Acceptance:
  - Repository context snapshots retain source citations.
  - Repository context snapshots retain freshness or sync metadata.
  - Citation and freshness data are retrievable with the snapshot.

### B-606 Apply repository context in summaries and ticket generation

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-204`, `B-402`, `B-605`
- Summary: Inject repository context into summary and ticket generation flows while preserving user-answer priority.
- Acceptance:
  - Summary generation can reference repository context from approved snapshots.
  - Ticket generation can reference repository context from approved snapshots.
  - Direct user answers remain authoritative when they conflict with repository context.

### B-607 On-demand repository context refresh

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-604`
- Summary: Allow users to refresh project context and see the latest snapshot freshness.
- Acceptance:
  - Users can trigger a repository context refresh on demand.
  - The latest context freshness state is visible after refresh completes.

### B-608 Repository citation display in refinement and review

- Milestone: `milestone:repository-context`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-207`, `B-403`, `B-605`, `B-606`
- Summary: Surface lightweight repository source citations in refinement summaries and ticket review when project context contributes to the output so users can see where the information came from.
- Acceptance:
  - Repository-derived summary output exposes lightweight source citation in the requirement experience.
  - Repository-derived ticket candidate output exposes lightweight source citation in the review experience.
  - Citation display remains linked to the correct repository snapshot or source entry.
  - A developer can verify the feature by using ingested repository context and confirming the affected summary or ticket output shows the expected source reference.

### B-609 Repository context remediation and conflict handling

- Milestone: `milestone:repository-context`
- Area: `area:repository-context`
- Type: `type:feature`
- Depends on: `B-603`, `B-604`, `B-606`, `B-607`, `B-608`
- Summary: Allow users to remove or replace misleading context sources after setup and surface conflicts between repository context and direct user input.
- Acceptance:
  - A user can remove or replace a misleading context source after the initial ingestion flow.
  - Conflicts between repository context and direct user input are surfaced explicitly rather than silently resolved.
  - After a source is removed and context is refreshed, new summaries and ticket outputs no longer cite or rely on the removed source unless it is re-approved.

## Milestone 7

- Shared execution readiness for all Milestone 7 issues:
- Prerequisites: the core refinement, export, and repository context flows from Milestones 0 through 6 must already be working.
- Local services: the full local stack, including worker, must be running.
- Environment and config: all prior milestone settings plus any encryption, redaction, logging, and diagnostics configuration needed for hardening work.
- External access: GitHub, Linear, and AI provider test accounts are required to simulate failure and recovery paths realistically.
- Startup path: start the full local stack and execute representative end-to-end product flows before simulating failures or validating diagnostics.
- Validation path: exercise failure handling, audit retrieval, responsiveness measurement, secret redaction, and diagnostics inspection using the documented MVP flows.
- Ready signal: recoverable failures preserve state, audit data is retrievable, responsiveness evidence is captured, and diagnostics reflect recent job and integration status.

### B-701 Worker retries and recovery rules

- Milestone: `milestone:hardening`
- Area: `area:jobs`
- Type: `type:feature`
- Depends on: `B-008`, `B-506`, `B-604`
- Summary: Configure retries and recovery behavior for ingestion and export jobs.
- Acceptance:
  - Retryable ingestion and export job failures recover automatically where appropriate.
  - Terminal failures surface actionable error information rather than failing silently.

### B-702 Request and job correlation logging

- Milestone: `milestone:hardening`
- Area: `area:observability`
- Type: `type:feature`
- Depends on: `B-002`
- Summary: Add structured logs with request IDs and job IDs propagated across API and worker flows.
- Acceptance:
  - API requests include a request identifier in structured logging.
  - Background jobs include a job identifier in structured logging.
  - Related API and worker activity can be traced through shared identifiers.

### B-703 Workspace isolation and permission hardening

- Milestone: `milestone:hardening`
- Area: `area:security`
- Type: `type:feature`
- Depends on: `B-005`, `B-101`
- Summary: Enforce project access controls and verify workspace isolation across API and UI flows.
- Acceptance:
  - Project and requirement access is restricted to authorized workspace members.
  - Cross-workspace access attempts are rejected for project and requirement resources.

### B-704 Explicit failure-state UX for external dependency errors

- Milestone: `milestone:hardening`
- Area: `area:frontend`
- Type: `type:feature`
- Depends on: `B-202`, `B-504`, `B-604`
- Summary: Show actionable error states for AI, repository, and Linear failures and distinguish retryable from terminal errors.
- Acceptance:
  - Users see explicit failure states for AI, repository, and Linear errors.
  - The UI distinguishes retryable errors from terminal failures where possible.

### B-705 Audit retrieval for refinement and export history

- Milestone: `milestone:hardening`
- Area: `area:audit`
- Type: `type:feature`
- Depends on: `B-301`, `B-503`, `B-605`
- Summary: Expose persona history, readiness history, export history, and repository snapshot history for a requirement.
- Acceptance:
  - A completed requirement exposes persona history.
  - A completed requirement exposes readiness history.
  - A completed requirement exposes export history and repository snapshot history.

### B-706 Full provider payload audit retention and retrieval

- Milestone: `milestone:hardening`
- Area: `area:audit`
- Type: `type:feature`
- Depends on: `B-201`, `B-702`
- Summary: Persist full provider request and response payloads and make them retrievable for audit purposes without leaking them to ordinary logs.
- Acceptance:
  - Full provider request and response payload history is stored for a requirement.
  - Stored provider payload history is retrievable for audit purposes.
  - Ordinary logs do not expose raw provider payload content.

### B-707 Normal-turn responsiveness validation

- Milestone: `milestone:hardening`
- Area: `area:performance`
- Type: `type:feature`
- Depends on: `B-202`, `B-205`
- Summary: Measure representative refinement turn timings and validate the documented 10-second MVP responsiveness target.
- Acceptance:
  - Representative refinement turns are measured under MVP-like conditions.
  - Typical refinement turns complete within the documented 10-second target under those conditions.
  - Slower operations surface an explicit in-progress state to the user.

### B-708 Integration credential protection and secret redaction

- Milestone: `milestone:hardening`
- Area: `area:security`
- Type: `type:feature`
- Depends on: `B-007`, `B-004`, `B-201`, `B-501`, `B-601`, `B-702`
- Summary: Protect stored integration credentials and enforce redaction so secrets do not leak through logs, error responses, or normal product APIs.
- Acceptance:
  - Stored integration credentials are protected according to the documented MVP security approach.
  - Ordinary logs and error responses do not expose raw secrets or sensitive connection values.
  - Representative UI and API flows do not return stored credential values to authorized or unauthorized users.
  - The repository documents how secret protection and redaction are verified during implementation, including which checks to run and what evidence to look for.

### B-709 Basic admin and diagnostics surfaces

- Milestone: `milestone:hardening`
- Area: `area:operations`
- Type: `type:feature`
- Depends on: `B-701`, `B-702`, `B-705`, `B-706`
- Summary: Build a minimal diagnostics surface for jobs, integrations, repository freshness, export outcomes, and recent failures needed for alpha support.
- Acceptance:
  - The product exposes a basic diagnostics path for inspecting recent job and integration outcomes.
  - A reviewer can inspect repository sync freshness, export status, and recent failure state without relying only on raw logs.
  - The diagnostics surface is sufficient to support the documented alpha-readiness milestone without requiring a separate observability platform.
  - A developer or reviewer can use the diagnostics surface to confirm the last known status of a job or integration without reading raw database records.