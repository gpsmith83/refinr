# Refinr Linear Import-Ready Issues

## Purpose

This document converts the tracker-oriented backlog in [linear-ready-backlog.md](linear-ready-backlog.md) into copy-paste-ready issue bodies for Linear.

Each issue entry follows the same structure so a team can import or create issues consistently without having to reconstruct setup context, validation steps, or acceptance criteria.

## Use Standard

- Use the issue heading text as the Linear issue title.
- Apply the listed milestone, area, and type labels when creating the issue.
- Preserve the listed dependencies in Linear where supported.
- Copy the body content under each issue into the Linear description.

## Milestone 0

### B-000 Repository bootstrap and developer workflow

- Labels: `milestone:foundation`, `area:infra`, `type:feature`
- Depends on: none

## Summary

Define the repository bootstrap path, required toolchain, standard scripts, environment templates, and exact local verification steps so a new developer can start implementation without tribal knowledge.

## Execution Readiness

- Prerequisites: none.
- Local services: none required before this issue starts.
- Environment and config: document the local environment templates, database connection settings, session configuration, and integration-related variables this repository will require.
- External access: identify any external accounts that later issues will require, but this issue should not depend on them being fully configured first.
- Startup path: establish the repository-standard bootstrap and local startup commands for the team.
- Validation path: verify that a developer can follow the documented bootstrap path from a fresh clone without prior project knowledge.
- Ready signal: the repository has one documented bootstrap path and one documented set of standard scripts that later tickets can reference.

## Acceptance Criteria

- The repository contains a documented developer bootstrap path that assumes no prior project knowledge.
- The required Node.js version and package manager are explicitly stated and enforced or validated by the repository tooling.
- Standard scripts exist for development, build, lint, test, migration, and seed or equivalent local data setup workflows.
- Environment variable templates exist for local development and list the required values for frontend, API, database, session, and integration-related configuration.
- A developer starting from a fresh clone can follow the documented bootstrap flow and verify that the repository is ready for Milestone 0 implementation work.

### B-001 Angular application shell

- Labels: `milestone:foundation`, `area:frontend`, `type:feature`
- Depends on: none

## Summary

Initialize the Angular app, configure core routes for sign-in, workspace, project, and requirement views, and add a minimal app shell.

## Execution Readiness

- Prerequisites: `B-000` should define the repository-standard frontend bootstrap and startup commands.
- Local services: frontend runtime only.
- Environment and config: local frontend environment template and package manager configuration from `B-000`.
- External access: none.
- Startup path: use the documented frontend install and dev commands from `B-000`.
- Validation path: start the Angular app locally and verify the placeholder routes render through the configured router.
- Ready signal: the frontend app starts cleanly and the placeholder routes render inside a consistent app shell.

## Acceptance Criteria

- The Angular application starts successfully in the local development environment.
- Sign-in, workspace, project, and requirement placeholder routes resolve through the configured router.
- A minimal application shell renders consistently across those routes.

### B-002 Express API skeleton

- Labels: `milestone:foundation`, `area:backend`, `type:feature`
- Depends on: none

## Summary

Initialize the Express API with TypeScript, baseline middleware, logging, security headers, and a health endpoint.

## Execution Readiness

- Prerequisites: `B-000` should define the repository-standard backend bootstrap and startup commands.
- Local services: API runtime only.
- Environment and config: local API environment template and package manager configuration from `B-000`.
- External access: none.
- Startup path: use the documented backend install and dev commands from `B-000`.
- Validation path: start the API locally and call the health endpoint.
- Ready signal: the API starts cleanly and returns a successful health response.

## Acceptance Criteria

- The Express API starts successfully in the local development environment.
- The health endpoint returns a successful response from the running API.
- Baseline middleware for logging, security headers, and error handling is wired into request handling.

### B-003 PostgreSQL and baseline schema tooling

- Labels: `milestone:foundation`, `area:data`, `type:feature`
- Depends on: `B-002`

## Summary

Configure PostgreSQL with pgvector, initialize Drizzle migrations, and create baseline tables for users, workspaces, projects, and requirements.

## Execution Readiness

- Prerequisites: `B-000` should define database startup and migration commands; `B-002` should provide the API skeleton.
- Local services: PostgreSQL and API.
- Environment and config: database connection variables and migration configuration from `B-000`.
- External access: none.
- Startup path: start PostgreSQL using the repository-standard path, then run migrations and start the API.
- Validation path: run migrations successfully and verify the API can query the created tables.
- Ready signal: migrations complete successfully and the application can query the baseline schema.

## Acceptance Criteria

- Drizzle migrations run successfully against the configured PostgreSQL instance.
- Baseline tables for users, workspaces, projects, and requirements are created.
- The created tables can be queried successfully from the application.

### B-004 GitHub OAuth session authentication

- Labels: `milestone:foundation`, `area:auth`, `type:feature`
- Depends on: `B-007`, `B-002`, `B-003`

## Summary

Configure Passport-based GitHub OAuth and session persistence for authenticated users.

## Execution Readiness

- Prerequisites: `B-002`, `B-003`, and `B-007` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: GitHub OAuth variables, session secret configuration, and local callback URLs documented by `B-007`.
- External access: a non-production GitHub OAuth app and a test GitHub account.
- Startup path: start the API and database, then run the sign-in flow from the frontend or a temporary test client.
- Validation path: complete GitHub sign-in and verify the user record and session persistence.
- Ready signal: a new or existing user can sign in through GitHub and remain authenticated across subsequent requests.

## Acceptance Criteria

- A new or existing user can complete sign-in with GitHub OAuth.
- The authenticated user record is persisted or updated in application storage.
- The resulting session remains valid across subsequent authenticated requests.

### B-005 Workspace and project creation flow

- Labels: `milestone:foundation`, `area:projects`, `type:feature`
- Depends on: `B-001`, `B-003`, `B-004`

## Summary

Implement workspace and project creation APIs and UI so authenticated users can create the first project hierarchy and persist project setup metadata needed for later refinement and export.

## Execution Readiness

- Prerequisites: `B-001`, `B-003`, and `B-004` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: authenticated session support plus any seeded data needed to test workspace membership.
- External access: GitHub sign-in remains required.
- Startup path: run the local stack, sign in, and navigate to the workspace and project setup flow.
- Validation path: create a workspace and a project, then confirm project metadata and default refinement settings persist across reload.
- Ready signal: an authenticated user can create and reopen a project with its saved metadata and default settings intact.

## Acceptance Criteria

- An authenticated user can create a new workspace from the product UI.
- The same user can create a project within that workspace.
- The created project appears on the project dashboard for that workspace.
- Project metadata and default refinement settings such as product area, goals, default labels, and an optional default persona stack can be captured and persisted.
- Workspace and project ownership are persisted correctly.
- Saved project metadata remains available after reload or later revisit.

### B-006 Docker Compose local stack

- Labels: `milestone:foundation`, `area:infra`, `type:feature`
- Depends on: `B-000`, `B-001`, `B-002`, `B-003`, `B-008`

## Summary

Create a local Docker Compose stack for frontend, API, database, and worker with startup steps aligned to the documented bootstrap, environment, migration, and worker workflow.

## Execution Readiness

- Prerequisites: `B-000`, `B-001`, `B-002`, `B-003`, and `B-008` should be complete enough to containerize.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: compose environment files, service ports, migration path, and worker startup configuration.
- External access: none beyond what the local stack itself needs.
- Startup path: use one documented Docker Compose command path.
- Validation path: bring up the full stack from a fresh clone and confirm the app can reach a runnable state.
- Ready signal: another developer can start the full local stack from one documented workflow without tribal knowledge.

## Acceptance Criteria

- Frontend, API, database, and worker services can be started locally from one documented workflow.
- The documented startup path is sufficient for another developer with no prior repository knowledge to reach a running local stack.
- The documented path includes the expected pre-requisites, required environment files, migration steps, and the worker service needed before the application can be used locally.

### B-007 Local secrets and external access prerequisites

- Labels: `milestone:foundation`, `area:infra`, `type:feature`
- Depends on: `B-000`

## Summary

Document the required local secrets, non-production credentials, sandbox destinations, where each secret is used, and how a developer confirms setup is complete.

## Execution Readiness

- Prerequisites: `B-000` should define the environment template structure.
- Local services: none.
- Environment and config: local env templates for frontend, API, database, session, AI provider, GitHub, and Linear settings.
- External access: identify how developers obtain GitHub, Linear, and AI provider non-production credentials.
- Startup path: document where these values go before later tickets start.
- Validation path: give a clear checklist a developer can use to confirm their machine is ready for auth and integration work.
- Ready signal: a junior developer can determine whether they are blocked by missing credentials before starting implementation.

## Acceptance Criteria

- The repository documentation explicitly lists the local secrets and external accounts required for GitHub OAuth, session configuration, Linear integration, and AI provider access.
- The setup guidance states how a developer obtains approved non-production credentials or sandbox destinations for each external dependency.
- Local environment templates include the required secret variable names without embedding live credential values.
- A developer can verify whether their local machine is ready to begin auth and integration implementation without relying on tribal knowledge or production credentials.

### B-008 Worker runtime and job execution skeleton

- Labels: `milestone:foundation`, `area:jobs`, `type:feature`
- Depends on: `B-000`, `B-002`, `B-003`

## Summary

Create the worker runtime, pg-boss connection setup, local startup command, and baseline job registration conventions for queue-backed work.

## Execution Readiness

- Prerequisites: `B-000`, `B-002`, and `B-003` should be complete.
- Local services: worker, API, and PostgreSQL.
- Environment and config: database connection settings and any worker-specific configuration variables.
- External access: none.
- Startup path: start PostgreSQL, then run the worker with the repository-standard worker command.
- Validation path: verify the worker connects to pg-boss and reports a ready signal through logs or a simple health check.
- Ready signal: the worker can start locally and is ready to process registered jobs.

## Acceptance Criteria

- The repository contains a worker runtime entry point aligned with the documented architecture and stack.
- The worker can start locally against the configured PostgreSQL instance and connect to pg-boss successfully.
- Baseline job registration conventions are documented so later tickets can add background jobs consistently.
- A developer can run the documented worker start command and verify from a simple check or expected log output that it is ready to process jobs.

## Milestone 1

### B-101 Requirement domain model and APIs

- Labels: `milestone:requirement-intake`, `area:requirements`, `type:feature`
- Depends on: `B-003`, `B-005`

## Summary

Add requirement persistence and project-scoped create, read, and list APIs.

## Execution Readiness

- Prerequisites: `B-000`, `B-006`, and `B-005` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: standard local stack and a test workspace and project.
- External access: GitHub sign-in for authenticated flows.
- Startup path: start the local stack and sign in to a workspace with a project available.
- Validation path: create, list, and fetch requirements through API and UI flows.
- Ready signal: an authenticated user can create a requirement and retrieve it again through the expected project-scoped flows.

## Acceptance Criteria

- A requirement can be created for a specific project through the backend API.
- A requirement can be retrieved individually and through a project-scoped list API.
- Requirement access is correctly scoped through project and workspace ownership.

### B-102 Requirement creation UI

- Labels: `milestone:requirement-intake`, `area:frontend`, `type:feature`
- Depends on: `B-001`, `B-101`

## Summary

Build the requirement creation UI for a short freeform prompt and optional context notes.

## Execution Readiness

- Prerequisites: `B-001` and `B-101` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: authenticated user, test workspace, and project.
- External access: GitHub sign-in for authenticated flows.
- Startup path: run the local stack and navigate to a project dashboard.
- Validation path: create a requirement from the UI with and without optional context notes.
- Ready signal: the created requirement appears immediately in the UI after save.

## Acceptance Criteria

- A project user can create a requirement from the project interface using a short freeform prompt.
- Optional context notes can be entered during creation.
- The created requirement appears immediately in the UI after successful save.

### B-103 Project dashboard requirement listing

- Labels: `milestone:requirement-intake`, `area:frontend`, `type:feature`
- Depends on: `B-101`, `B-102`

## Summary

Add requirement listing to the project dashboard with status and last-updated information.

## Execution Readiness

- Prerequisites: `B-101` and `B-102` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a project containing one or more requirements.
- External access: GitHub sign-in for authenticated flows.
- Startup path: run the local stack, open a project dashboard, and load seeded or newly created requirements.
- Validation path: confirm the dashboard lists requirements with identifying data and links to their detail views.
- Ready signal: the project dashboard shows and links requirements reliably after refresh.

## Acceptance Criteria

- Project requirements are listed on the project dashboard.
- Each listed requirement shows enough identifying information to distinguish it in the dashboard.
- Each listed requirement links to its requirement detail view.

### B-104 Requirement detail page shell

- Labels: `milestone:requirement-intake`, `area:frontend`, `type:feature`
- Depends on: `B-101`, `B-102`

## Summary

Build the requirement detail page shell with initial prompt, status, and placeholders for conversation, summary, and readiness.

## Execution Readiness

- Prerequisites: `B-101` and `B-102` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: at least one persisted requirement.
- External access: GitHub sign-in for authenticated flows.
- Startup path: open a persisted requirement from the project dashboard in the local stack.
- Validation path: verify the page loads the requirement, shows its current status, and renders the planned workflow sections.
- Ready signal: a requirement detail shell exists and is stable on reload.

## Acceptance Criteria

- The requirement detail page loads persisted requirement data for the selected requirement.
- The page displays the initial prompt and current status.
- The page includes visible sections for conversation history, summary state, and readiness state.

### B-105 Refinement session and message persistence

- Labels: `milestone:requirement-intake`, `area:requirements`, `type:feature`
- Depends on: `B-101`

## Summary

Persist refinement sessions and requirement messages as the durable history for guided refinement.

## Execution Readiness

- Prerequisites: `B-101` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: at least one project and requirement to attach sessions and messages to.
- External access: none beyond authenticated product access.
- Startup path: use the local stack and a test requirement.
- Validation path: create sessions and messages, then fetch them again in chronological order.
- Ready signal: refinement sessions and messages can be persisted and replayed reliably.

## Acceptance Criteria

- Refinement sessions can be created and linked to a requirement.
- Requirement messages are stored with the correct requirement and session linkage.
- Stored messages are retrieved in the correct chronological order.

## Milestone 2

### B-201 AI provider gateway abstraction

- Labels: `milestone:guided-refinement`, `area:ai`, `type:feature`
- Depends on: `B-007`, `B-002`

## Summary

Create an internal AI provider abstraction with the first commercial provider adapter and usage metadata capture.

## Execution Readiness

- Prerequisites: Milestone 1 flows should work, and `B-007` should document the AI provider credentials.
- Local services: API and PostgreSQL.
- Environment and config: AI provider keys, model selection, and prompt-class configuration.
- External access: a non-production account for the primary AI provider.
- Startup path: run the API locally with the documented provider configuration.
- Validation path: execute at least one provider call through the abstraction and inspect recorded usage metadata.
- Ready signal: the backend can call the provider through the abstraction without vendor-specific logic leaking into domain code.

## Acceptance Criteria

- The backend calls the configured AI provider through an internal provider abstraction rather than vendor-specific logic in domain code.
- The first provider adapter can successfully execute a provider call.
- Provider usage metadata is captured for the call.

### B-202 Initial refinement session start flow

- Labels: `milestone:guided-refinement`, `area:orchestration`, `type:feature`
- Depends on: `B-104`, `B-105`, `B-201`

## Summary

Add the API and UI action to begin refinement and create a default refinement session with a starting persona context.

## Execution Readiness

- Prerequisites: `B-104`, `B-105`, and `B-201` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: AI provider configuration and a persisted requirement.
- External access: the primary AI provider sandbox account.
- Startup path: run the local stack, open a requirement detail view, and trigger refinement.
- Validation path: confirm the system creates a refinement session and displays the first guided question.
- Ready signal: the first guided question is returned and linked to a persisted refinement session.

## Acceptance Criteria

- A user can trigger refinement from the requirement page.
- The system creates a refinement session linked to the requirement.
- The system returns and displays the first guided question for that session.

### B-203 Question-and-answer loop persistence

- Labels: `milestone:guided-refinement`, `area:requirements`, `type:feature`
- Depends on: `B-105`, `B-202`

## Summary

Persist system questions and user answers and reload the refinement history in the UI.

## Execution Readiness

- Prerequisites: `B-105` and `B-202` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a requirement with an active refinement session.
- External access: the primary AI provider sandbox account for live question generation.
- Startup path: run the local stack, start refinement, and continue through multiple turns.
- Validation path: persist system questions and user answers, refresh the page, and confirm stable ordering.
- Ready signal: saved conversation history reloads in the same order after refresh.

## Acceptance Criteria

- System questions and user answers are persisted as requirement messages.
- The saved conversation history reloads correctly after page refresh.
- Message ordering remains stable across reloads.

### B-204 Summary snapshot generation

- Labels: `milestone:guided-refinement`, `area:orchestration`, `type:feature`
- Depends on: `B-201`, `B-203`

## Summary

Generate and persist requirement summary snapshots after meaningful refinement turns.

## Execution Readiness

- Prerequisites: `B-201` and `B-203` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: AI provider configuration plus persisted refinement history.
- External access: the primary AI provider sandbox account.
- Startup path: run the local stack and complete meaningful refinement turns.
- Validation path: confirm new summary snapshots are generated, persisted, and linked correctly after relevant turns.
- Ready signal: the latest summary snapshot updates as the conversation evolves and can be retrieved for display.

## Acceptance Criteria

- A new summary snapshot is generated after a meaningful refinement response.
- The generated snapshot is persisted and linked to the correct requirement or session.
- The latest summary state becomes available for display in the UI.

### B-205 Basic readiness computation

- Labels: `milestone:guided-refinement`, `area:orchestration`, `type:feature`
- Depends on: `B-204`

## Summary

Compute the initial readiness dimensions and total score for a requirement.

## Execution Readiness

- Prerequisites: `B-204` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: the documented readiness rubric and a requirement with summary state.
- External access: none beyond the provider support already used by summary generation.
- Startup path: run the local stack and use requirements with enough history to evaluate readiness.
- Validation path: calculate readiness values, persist or expose them, and confirm the score matches the documented rubric.
- Ready signal: readiness state is computed deterministically and available for later retrieval.

## Acceptance Criteria

- The backend derives readiness dimensions for a requirement using the documented rubric.
- The backend calculates a total readiness score for the requirement.
- The resulting readiness state is persisted or otherwise made available for later retrieval.

### B-206 Readiness score and missing-information UI

- Labels: `milestone:guided-refinement`, `area:frontend`, `type:feature`
- Depends on: `B-205`

## Summary

Render readiness dimensions, total score, and missing information in the requirement UI.

## Execution Readiness

- Prerequisites: `B-205` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a requirement with persisted readiness data.
- External access: none beyond existing refinement prerequisites.
- Startup path: run the local stack and open a requirement detail view with readiness state available.
- Validation path: verify that the UI shows complete, partial, and missing dimensions along with the total score and missing information.
- Ready signal: a user can see the readiness score and what is still blocking ticket generation.

## Acceptance Criteria

- Readiness dimensions are visible in the requirement UI as complete, partial, or missing.
- The total readiness score is visible to the user.
- The UI highlights missing information that is preventing ticket generation.

### B-207 Live requirement summary panel

- Labels: `milestone:guided-refinement`, `area:frontend`, `type:feature`
- Depends on: `B-104`, `B-204`

## Summary

Render the synthesized requirement summary in the requirement detail view and make it easy to verify that it updates and reloads correctly.

## Execution Readiness

- Prerequisites: `B-104` and `B-204` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a requirement with persisted summary snapshots.
- External access: the primary AI provider sandbox account if generating the summary live.
- Startup path: run the local stack, open a requirement, and complete refinement turns that update the summary.
- Validation path: confirm the summary panel updates after meaningful turns and remains correct after reload.
- Ready signal: the latest summary is always visible on the requirement screen after refresh or revisit.

## Acceptance Criteria

- The requirement UI shows what is currently known about the requirement based on the latest summary snapshot.
- The summary panel presents the latest synthesized state after meaningful refinement responses.
- The latest summary remains visible after page refresh or later revisit.
- A developer can verify the panel by completing refinement turns, refreshing the page, and confirming the latest saved summary is still shown.

## Milestone 3

### B-301 Persona invocation model and audit trail

- Labels: `milestone:persona-orchestration`, `area:orchestration`, `type:feature`
- Depends on: `B-105`

## Summary

Add persona invocation persistence with invocation reason and contributed dimensions.

## Execution Readiness

- Prerequisites: Milestone 2 should be functioning with refinement history and readiness state available.
- Local services: API and PostgreSQL.
- Environment and config: persisted refinement sessions and the persona model to record.
- External access: none beyond the existing AI provider integration.
- Startup path: run the local stack and use a requirement that has entered guided refinement.
- Validation path: record persona invocations and retrieve them again for audit display.
- Ready signal: persona invocation history can be persisted and reviewed independently of the active refinement turn.

## Acceptance Criteria

- Persona invocations are stored with the associated requirement and refinement session.
- Invocation reason and contributed dimensions are retained.
- Stored invocation history can be retrieved for review.

### B-302 Default persona progression rules

- Labels: `milestone:persona-orchestration`, `area:orchestration`, `type:feature`
- Depends on: `B-201`, `B-205`, `B-301`

## Summary

Encode default persona progression rules and recommend the next persona based on requirement state and readiness gaps.

## Execution Readiness

- Prerequisites: `B-201`, `B-205`, and `B-301` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: the documented orchestration rules and readiness rubric.
- External access: the primary AI provider sandbox account if recommendations lead directly to live prompts.
- Startup path: run the local stack and continue refinement on requirements with varied readiness states.
- Validation path: confirm the system recommends the expected next persona for representative scenarios.
- Ready signal: persona recommendations follow the documented progression rules and are available to the UI.

## Acceptance Criteria

- The system evaluates requirement state and readiness gaps to recommend the next persona.
- The recommendation follows the documented default progression rules.
- The recommendation can be returned in a form usable by the UI.

### B-303 Specialist persona trigger rules

- Labels: `milestone:persona-orchestration`, `area:orchestration`, `type:feature`
- Depends on: `B-302`

## Summary

Add trigger logic for Senior Developer, UI Designer, and Reality Checker.

## Execution Readiness

- Prerequisites: `B-302` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: trigger rules for technical, UX, and edge-case coverage gaps.
- External access: the primary AI provider sandbox account.
- Startup path: run the local stack and use non-trivial requirements with clear specialist triggers.
- Validation path: confirm the specialist persona is recommended with a clear reason when the documented conditions are met.
- Ready signal: non-trivial requirements reliably trigger the expected specialist personas.

## Acceptance Criteria

- Non-trivial requirements can trigger specialist personas based on documented rules.
- The trigger result includes a clear reason for invoking the specialist persona.

### B-304 Hybrid persona control UI

- Labels: `milestone:persona-orchestration`, `area:frontend`, `type:feature`
- Depends on: `B-302`, `B-303`

## Summary

Allow the user to accept, skip, or request personas where permitted and show invocation reasons in the UI.

## Execution Readiness

- Prerequisites: `B-302` and `B-303` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: persona recommendation data and allowed manual request rules.
- External access: the primary AI provider sandbox account for live refinement transitions.
- Startup path: run the local stack, open a non-trivial requirement, and continue the refinement flow.
- Validation path: verify accept, skip, and manual request flows along with visible invocation reasons.
- Ready signal: the UI exposes persona control without making orchestration opaque or fully manual.

## Acceptance Criteria

- The UI shows the recommended persona and the reason it was suggested.
- The user can accept or skip the recommendation.
- Where permitted, the user can manually request a persona through the UI.

### B-305 Readiness gate enforcement

- Labels: `milestone:persona-orchestration`, `area:orchestration`, `type:feature`
- Depends on: `B-205`

## Summary

Enforce blocking readiness dimensions before ticket generation.

## Execution Readiness

- Prerequisites: `B-205` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: the documented readiness threshold and blocking-dimension rules.
- External access: none beyond existing refinement flows.
- Startup path: use the local stack with requirements below and above the readiness threshold.
- Validation path: attempt ticket generation from both ready and not-ready requirements.
- Ready signal: ticket generation is blocked or allowed deterministically from the documented rules.

## Acceptance Criteria

- Ticket generation is blocked when blocking readiness dimensions are insufficient.
- The blocked state is deterministically derived from the documented readiness rules.

### B-306 Readiness override capture and marking

- Labels: `milestone:persona-orchestration`, `area:orchestration`, `type:feature`
- Depends on: `B-305`

## Summary

Capture explicit readiness overrides and mark downstream ticket state accordingly.

## Execution Readiness

- Prerequisites: `B-305` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: override event storage and downstream ticket-state marking.
- External access: none beyond normal product access.
- Startup path: use a not-ready requirement in the local stack and trigger the override flow.
- Validation path: confirm the override event is stored and that downstream ticket state reflects the override.
- Ready signal: override behavior is explicit, auditable, and preserved downstream.

## Acceptance Criteria

- The user can explicitly override the readiness gate from the product flow.
- The override action is persisted as part of refinement history.
- Downstream ticket data is marked to reflect that the requirement was exported under override.

### B-307 Readiness gate status and override UI

- Labels: `milestone:persona-orchestration`, `area:frontend`, `type:feature`
- Depends on: `B-206`, `B-305`, `B-306`

## Summary

Show readiness gate blocking reasons in the requirement UI and provide the explicit override action with visible override state from the same screen.

## Execution Readiness

- Prerequisites: `B-206`, `B-305`, and `B-306` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: visible readiness state, blocking reasons, and override controls.
- External access: none beyond existing refinement flows.
- Startup path: run the local stack and open a requirement that is not ticket-ready.
- Validation path: verify the UI shows blocking reasons, identifies the weak dimensions, and exposes the override flow on the requirement screen.
- Ready signal: a user can understand and act on readiness status without using the API directly.

## Acceptance Criteria

- The UI explains why ticket generation is blocked when readiness requirements are not met.
- The UI identifies the dimensions that are preventing ticket generation.
- A user can explicitly override the readiness gate from the product UI.
- The requirement UI reflects when downstream tickets are being generated under override.
- A developer can verify the flow from the requirement screen without using the API directly.

## Milestone 4

### B-401 Ticket candidate domain model and APIs

- Labels: `milestone:ticketization`, `area:tickets`, `type:feature`
- Depends on: `B-003`, `B-305`

## Summary

Add ticket candidate persistence, retrieval, and core status metadata.

## Execution Readiness

- Prerequisites: Milestone 3 must be working and a ticket-ready requirement should be available.
- Local services: API and PostgreSQL.
- Environment and config: ticket candidate storage model and a requirement eligible for ticketization.
- External access: none beyond any live ticket-generation dependency already in use.
- Startup path: run the local stack and generate or seed a ticket-ready requirement.
- Validation path: store and retrieve ticket candidates, including their statuses and metadata.
- Ready signal: ticket candidates behave as durable review objects between refinement and export.

## Acceptance Criteria

- Ticket candidates can be stored for a specific requirement.
- Ticket candidates can be retrieved individually and as a requirement-scoped list.
- Candidate status and core metadata are retained.

### B-402 Ticket generation service

- Labels: `milestone:ticketization`, `area:tickets`, `type:feature`
- Depends on: `B-201`, `B-305`, `B-401`

## Summary

Generate flat ticket candidates from ticket-ready requirements including title, description, acceptance criteria, and assumptions.

## Execution Readiness

- Prerequisites: `B-201`, `B-305`, and `B-401` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: AI provider configuration and ticketization settings.
- External access: the primary AI provider sandbox account when generation runs live.
- Startup path: run the local stack and ticketize a requirement that meets the readiness gate.
- Validation path: confirm the generated output is flat, actionable, and linked back to the source requirement.
- Ready signal: ticket-ready requirements generate one or more sibling ticket candidates with usable acceptance criteria.

## Acceptance Criteria

- A ticket-ready requirement can produce one or more flat ticket candidates.
- Each generated candidate includes title, description, acceptance criteria, and assumptions.
- Generated candidates remain linked to the source requirement.

### B-403 Ticket review interface

- Labels: `milestone:ticketization`, `area:frontend`, `type:feature`
- Depends on: `B-402`

## Summary

Build the review UI to list, inspect, and approve ticket candidates.

## Execution Readiness

- Prerequisites: `B-402` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a requirement with generated ticket candidates.
- External access: the primary AI provider sandbox account if ticket candidates are generated live before review.
- Startup path: run the local stack and open a requirement that has generated tickets.
- Validation path: inspect the list and detail view of ticket candidates and approve individual items.
- Ready signal: users can review ticket candidates independently before export.

## Acceptance Criteria

- Users can view the list of ticket candidates for a requirement.
- Users can inspect individual ticket candidate details.
- Users can approve individual ticket candidates from the review UI.

### B-404 Split and merge ticket actions

- Labels: `milestone:ticketization`, `area:tickets`, `type:feature`
- Depends on: `B-403`

## Summary

Allow users to split over-broad ticket candidates and merge over-split ones.

## Execution Readiness

- Prerequisites: `B-403` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a requirement with a candidate set suitable for split and merge testing.
- External access: none beyond any live ticket-generation dependency already in use.
- Startup path: run the local stack and open the review flow for a generated candidate set.
- Validation path: split one candidate, merge another pair, and confirm the resulting set stays linked to the source requirement.
- Ready signal: the ticket set can be reshaped without rerunning the entire refinement workflow.

## Acceptance Criteria

- A user can split one over-broad ticket candidate into multiple candidates.
- A user can merge related ticket candidates that were over-split.
- The resulting ticket set remains linked to the originating requirement.

### B-405 Dependency and ordering editing

- Labels: `milestone:ticketization`, `area:tickets`, `type:feature`
- Depends on: `B-401`, `B-403`

## Summary

Let users define or edit dependencies and sequencing hints between ticket candidates.

## Execution Readiness

- Prerequisites: `B-401` and `B-403` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a ticket candidate set with editable dependency metadata.
- External access: none beyond standard product access.
- Startup path: run the local stack and open the ticket review flow for a persisted candidate set.
- Validation path: create and edit dependency relationships, then reload the review view.
- Ready signal: dependency and ordering changes persist and remain visible in the ticket set.

## Acceptance Criteria

- Users can define dependencies between ticket candidates.
- Users can edit existing dependency or sequencing information.
- Updated dependency information persists with the ticket set.

### B-406 Ticket candidate content editing

- Labels: `milestone:ticketization`, `area:tickets`, `type:feature`
- Depends on: `B-401`, `B-403`

## Summary

Allow direct editing of ticket candidate content, including execution guidance and unresolved-question blocking state, before export.

## Execution Readiness

- Prerequisites: `B-401` and `B-403` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a candidate set that can be edited and reloaded.
- External access: none beyond any live generation dependency already in use.
- Startup path: run the local stack and open the ticket review flow.
- Validation path: edit candidate content, reload the view, and confirm the changes persist along with any blocked-by-unresolved-question markers.
- Ready signal: generated tickets can be turned into execution-ready work items without losing traceability.

## Acceptance Criteria

- A user can edit ticket candidate content before export.
- Edited ticket content persists across reload or later revisit.
- A user can mark a ticket candidate as blocked by unresolved questions when needed.
- Edited candidates remain linked to the originating requirement and candidate set.
- A developer can verify the edit flow by changing a ticket, reloading the review view, and confirming the saved changes remain visible.

### B-407 Ticket candidate discard and restore actions

- Labels: `milestone:ticketization`, `area:tickets`, `type:feature`
- Depends on: `B-403`, `B-406`

## Summary

Allow users to discard ticket candidates from the active export set without losing traceability, and restore them when needed.

## Execution Readiness

- Prerequisites: `B-403` and `B-406` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a candidate set with persisted review state.
- External access: none beyond standard product access.
- Startup path: run the local stack and open the ticket review flow.
- Validation path: discard one ticket candidate, confirm it leaves the default export set, then restore it.
- Ready signal: users can remove low-value ticket candidates from export without deleting traceability.

## Acceptance Criteria

- A user can discard a ticket candidate from the review flow.
- Discarded candidates are excluded from the default export selection.
- Discarded candidates remain linked to the originating requirement and can be restored for review.

## Milestone 5

### B-501 Linear connection domain and validation

- Labels: `milestone:linear-export`, `area:integrations`, `type:feature`
- Depends on: `B-007`, `B-005`

## Summary

Configure and persist one Linear destination per project and validate connection details against the selected workspace, team, and any supported board or project mapping.

## Execution Readiness

- Prerequisites: Milestone 4 must be working and `B-007` must document Linear test credentials and allowed destinations.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: Linear API credentials and destination mapping configuration.
- External access: a Linear test workspace, team, and any optional board or project destination used for validation.
- Startup path: run the local stack, open project settings, and configure the Linear destination.
- Validation path: save and validate the selected destination objects against the configured credentials.
- Ready signal: a project can persist a validated Linear destination without relying on tribal knowledge about valid test targets.

## Acceptance Criteria

- A project can store one Linear destination for MVP use, including the selected workspace, team, and any supported board or project mapping.
- The stored Linear connection is validated against the configured credentials and selected destination objects.
- Invalid connection details or invalid destination mappings are rejected rather than silently stored.

### B-502 Linear connection UI

- Labels: `milestone:linear-export`, `area:frontend`, `type:feature`
- Depends on: `B-501`

## Summary

Build the project UI for configuring, validating, and saving one Linear destination selection.

## Execution Readiness

- Prerequisites: `B-501` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a project with access to the saved Linear connection settings.
- External access: a Linear test workspace and team.
- Startup path: run the local stack and navigate to the project integration settings.
- Validation path: select the destination objects in the UI, save them, and confirm validation feedback.
- Ready signal: the user can choose and save the Linear destination from the product UI.

## Acceptance Criteria

- A project user can enter and save one Linear destination through the UI.
- The UI allows the user to select the supported workspace, team, and any supported board or project mapping for that destination.
- The UI surfaces connection validation success or failure.

### B-503 Export batch model and APIs

- Labels: `milestone:linear-export`, `area:export`, `type:feature`
- Depends on: `B-401`, `B-501`

## Summary

Add export batches and per-ticket export batch items to make exports auditable and retryable.

## Execution Readiness

- Prerequisites: `B-401` and `B-501` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: a configured Linear destination and a set of approved ticket candidates.
- External access: a Linear test workspace is helpful for full-path validation, though persistence can be tested before the actual export call.
- Startup path: run the local stack and prepare approved tickets for export.
- Validation path: create export batches and export batch items, then retrieve their status after an attempt.
- Ready signal: export activity is represented as immutable, reviewable records rather than a fire-and-forget side effect.

## Acceptance Criteria

- Each export attempt is recorded as an export batch.
- Each exported ticket candidate is recorded as a per-ticket batch item.
- Per-ticket export status is retrievable after the export attempt.

### B-504 Linear issue creation adapter

- Labels: `milestone:linear-export`, `area:integrations`, `type:feature`
- Depends on: `B-503`

## Summary

Create Linear issues from approved ticket candidates and persist returned downstream identifiers.

## Execution Readiness

- Prerequisites: `B-503` should be complete.
- Local services: API and PostgreSQL.
- Environment and config: a validated Linear destination and approved ticket candidates.
- External access: a Linear test workspace and team.
- Startup path: run the local stack, prepare approved candidates, and trigger export.
- Validation path: create issues in Linear, then confirm the returned identifiers are stored and mapped back to their source candidates.
- Ready signal: approved tickets can be created in Linear exactly once and traced back to their source in Refinr.

## Acceptance Criteria

- Approved ticket candidates can be exported to Linear as issues.
- Returned Linear identifiers are persisted.
- Created issues remain mapped back to their source ticket candidates.

### B-505 Export results UI

- Labels: `milestone:linear-export`, `area:frontend`, `type:feature`
- Depends on: `B-504`

## Summary

Show per-ticket export success, failure, and downstream identifiers in the UI.

## Execution Readiness

- Prerequisites: `B-504` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: a requirement with a recorded export batch.
- External access: a Linear test workspace for realistic export outcomes.
- Startup path: run the local stack, export approved tickets, and open the export results view.
- Validation path: verify that success, failure, and downstream identifier states are visible per ticket candidate.
- Ready signal: a user can understand what happened to each exported ticket without reading logs.

## Acceptance Criteria

- The UI shows export success or failure for each ticket candidate in the export batch.
- The UI shows downstream Linear identifiers for successfully created issues.

### B-506 Retryable partial export handling

- Labels: `milestone:linear-export`, `area:export`, `type:feature`
- Depends on: `B-503`, `B-504`

## Summary

Retry failed export items safely while preserving successful mappings during partial failure.

## Execution Readiness

- Prerequisites: `B-503` and `B-504` should be complete.
- Local services: API, PostgreSQL, and worker if retries run asynchronously.
- Environment and config: a recorded export batch with mixed success and failure states.
- External access: a Linear test workspace that allows a realistic partial failure scenario.
- Startup path: run the local stack, trigger an export with a partial failure, then retry the failed items.
- Validation path: confirm retries only recreate failed items and leave successful mappings untouched.
- Ready signal: partial failure no longer forces manual cleanup or duplicate issue creation.

## Acceptance Criteria

- Partial export failures are visible to the user.
- Failed export items can be retried without duplicating already successful issues.
- Successful mappings remain intact across retries.

### B-507 Export confirmation and metadata mapping

- Labels: `milestone:linear-export`, `area:export`, `type:feature`
- Depends on: `B-502`, `B-504`, `B-505`

## Summary

Add a pre-export confirmation step and apply supported metadata such as labels, priority, estimates, and destination mapping to created Linear issues.

## Execution Readiness

- Prerequisites: `B-502`, `B-504`, and `B-505` should be complete.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: saved project defaults and supported export metadata settings.
- External access: a Linear test workspace and destination mapping that supports the metadata under test.
- Startup path: run the local stack, select approved candidates, and begin the export flow.
- Validation path: confirm the pre-export screen shows the destination and metadata, then verify the created issues contain the expected values.
- Ready signal: export intent is explicit and the downstream issues carry the expected execution metadata.

## Acceptance Criteria

- Before export, the UI confirms the destination and the metadata that will be applied to the selected ticket candidates.
- Supported metadata such as labels, priority, estimates, and destination mapping are applied to created Linear issues consistently.
- Exported issues remain traceable to their originating ticket candidates together with the metadata used at export time.

## Milestone 6

### B-601 GitHub repository connection domain

- Labels: `milestone:repository-context`, `area:integrations`, `type:feature`
- Depends on: `B-007`, `B-004`, `B-005`

## Summary

Add GitHub repository connection persistence and project-scoped repository metadata.

## Execution Readiness

- Prerequisites: Milestone 5 should be operational and GitHub repository access should be available for a test repository.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: GitHub integration configuration and a project that can store repository metadata.
- External access: a test repository and credentials with permission to fetch its contents.
- Startup path: run the full local stack and open project integration settings.
- Validation path: save repository connection details and confirm they persist against the correct project.
- Ready signal: a project can store a GitHub repository connection that later ingestion jobs can use.

## Acceptance Criteria

- A project can store a GitHub repository connection.
- Repository metadata is persisted against the correct project.

### B-602 GitHub repository connection UI

- Labels: `milestone:repository-context`, `area:frontend`, `type:feature`
- Depends on: `B-601`

## Summary

Build the project UI for connecting a GitHub repository.

## Execution Readiness

- Prerequisites: `B-601` should be complete.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: a project with repository connection support enabled.
- External access: a test repository and credentials with permission to read it.
- Startup path: run the full local stack and navigate to the project repository settings.
- Validation path: connect a repository from the UI and confirm the saved repository is shown clearly.
- Ready signal: a user can see and manage which repository is connected to the project.

## Acceptance Criteria

- A project user can configure a GitHub repository connection through the UI.
- The UI makes it clear which repository is currently connected.

### B-603 Context source recommendation and selection

- Labels: `milestone:repository-context`, `area:repository-context`, `type:feature`
- Depends on: `B-601`, `B-602`

## Summary

Recommend likely documentation sources and allow the user to select which context sources are included.

## Execution Readiness

- Prerequisites: `B-601` and `B-602` should be complete.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: an accessible test repository with readable documentation files.
- External access: credentials with permission to read repository contents.
- Startup path: run the full local stack, connect a repository, and enter the source selection flow.
- Validation path: confirm the system recommends likely sources and persists the user-approved include and exclude set.
- Ready signal: repository grounding is user-controlled rather than opaque.

## Acceptance Criteria

- The system recommends likely repository context sources.
- The user can choose which sources are included or excluded.
- The selected source set is persisted for later ingestion.

### B-604 Repository context ingestion job pipeline

- Labels: `milestone:repository-context`, `area:repository-context`, `type:feature`
- Depends on: `B-008`, `B-603`

## Summary

Fetch approved context sources, parse documents, and create repository context snapshots.

## Execution Readiness

- Prerequisites: `B-008` and `B-603` should be complete.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: repository connection, approved source set, and any snapshot storage configuration.
- External access: a readable test repository with approved documents.
- Startup path: run the full local stack, connect a repository, approve sources, and trigger ingestion.
- Validation path: verify the worker fetches the sources, parses them, and stores a snapshot linked to the correct project.
- Ready signal: repository context is available as a reusable project snapshot rather than a transient fetch.

## Acceptance Criteria

- Approved context sources are fetched and parsed through the ingestion pipeline.
- The ingestion result is stored as a repository context snapshot.
- The snapshot is linked to the correct project.

### B-605 Context citations and freshness metadata

- Labels: `milestone:repository-context`, `area:repository-context`, `type:feature`
- Depends on: `B-604`

## Summary

Persist source citations and snapshot freshness metadata for repository context snapshots.

## Execution Readiness

- Prerequisites: `B-604` should be complete.
- Local services: API, PostgreSQL, and worker.
- Environment and config: a stored repository context snapshot.
- External access: none beyond the repository access already required for ingestion.
- Startup path: run the full local stack and inspect persisted snapshot data after ingestion.
- Validation path: verify citations and freshness metadata are stored and retrievable with the snapshot.
- Ready signal: repository-grounded output can be explained and checked for staleness.

## Acceptance Criteria

- Repository context snapshots retain source citations.
- Repository context snapshots retain freshness or sync metadata.
- Citation and freshness data are retrievable with the snapshot.

### B-606 Apply repository context in summaries and ticket generation

- Labels: `milestone:repository-context`, `area:repository-context`, `type:feature`
- Depends on: `B-204`, `B-402`, `B-605`

## Summary

Inject repository context into summary and ticket generation flows while preserving user-answer priority.

## Execution Readiness

- Prerequisites: `B-204`, `B-402`, and `B-605` should be complete.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: a project with a valid repository snapshot and a requirement that can use it.
- External access: repository access and the primary AI provider sandbox account for live generation.
- Startup path: run the full local stack, ingest context, then continue refinement or ticket generation.
- Validation path: confirm summaries and ticket candidates reference repository context while deferring to direct user answers on conflict.
- Ready signal: repository grounding improves outputs without silently overriding the user.

## Acceptance Criteria

- Summary generation can reference repository context from approved snapshots.
- Ticket generation can reference repository context from approved snapshots.
- Direct user answers remain authoritative when they conflict with repository context.

### B-607 On-demand repository context refresh

- Labels: `milestone:repository-context`, `area:repository-context`, `type:feature`
- Depends on: `B-604`

## Summary

Allow users to refresh project context and see the latest snapshot freshness.

## Execution Readiness

- Prerequisites: `B-604` should be complete.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: a connected repository and an existing context snapshot.
- External access: a readable test repository.
- Startup path: run the full local stack, open the repository context view, and trigger refresh.
- Validation path: confirm a new snapshot is created or the freshness state updates after refresh completes.
- Ready signal: users can resync project context on demand instead of waiting for stale context to be discovered later.

## Acceptance Criteria

- Users can trigger a repository context refresh on demand.
- The latest context freshness state is visible after refresh completes.

### B-608 Repository citation display in refinement and review

- Labels: `milestone:repository-context`, `area:frontend`, `type:feature`
- Depends on: `B-207`, `B-403`, `B-605`, `B-606`

## Summary

Surface lightweight repository source citations in refinement summaries and ticket review when project context contributes to the output so users can see where the information came from.

## Execution Readiness

- Prerequisites: `B-207`, `B-403`, `B-605`, and `B-606` should be complete.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: a requirement and ticket set influenced by repository context.
- External access: repository access and the primary AI provider sandbox account for live output generation.
- Startup path: run the full local stack, ingest context, and revisit refinement or ticket review.
- Validation path: verify that repository-influenced summary and review output show the expected source references.
- Ready signal: users can inspect where repository-grounded information came from.

## Acceptance Criteria

- Repository-derived summary output exposes lightweight source citation in the requirement experience.
- Repository-derived ticket candidate output exposes lightweight source citation in the review experience.
- Citation display remains linked to the correct repository snapshot or source entry.
- A developer can verify the feature by using ingested repository context and confirming the affected summary or ticket output shows the expected source reference.

### B-609 Repository context remediation and conflict handling

- Labels: `milestone:repository-context`, `area:repository-context`, `type:feature`
- Depends on: `B-603`, `B-604`, `B-606`, `B-607`, `B-608`

## Summary

Allow users to remove or replace misleading context sources after setup and surface conflicts between repository context and direct user input.

## Execution Readiness

- Prerequisites: `B-603`, `B-604`, `B-606`, `B-607`, and `B-608` should be complete.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: an existing approved source set and at least one ingested snapshot.
- External access: a readable test repository and any context variants needed to produce a conflict scenario.
- Startup path: run the full local stack, ingest context, then revisit source selection and refinement.
- Validation path: remove or replace a source, refresh context, and confirm conflicts are surfaced explicitly and removed sources stop affecting new outputs.
- Ready signal: repository context remains trustworthy even when previously approved sources turn out to be misleading.

## Acceptance Criteria

- A user can remove or replace a misleading context source after the initial ingestion flow.
- Conflicts between repository context and direct user input are surfaced explicitly rather than silently resolved.
- After a source is removed and context is refreshed, new summaries and ticket outputs no longer cite or rely on the removed source unless it is re-approved.

## Milestone 7

### B-701 Worker retries and recovery rules

- Labels: `milestone:hardening`, `area:jobs`, `type:feature`
- Depends on: `B-008`, `B-506`, `B-604`

## Summary

Configure retries and recovery behavior for ingestion and export jobs.

## Execution Readiness

- Prerequisites: the core refinement, export, and repository context flows from Milestones 0 through 6 must already be working.
- Local services: the full local stack, including worker, must be running.
- Environment and config: prior milestone settings plus any retry and failure-policy configuration.
- External access: GitHub, Linear, and AI provider test accounts as needed to simulate failures realistically.
- Startup path: start the full local stack and run representative repository ingestion and export jobs.
- Validation path: simulate retryable and terminal failures, then inspect recovery behavior and surfaced error state.
- Ready signal: transient failures recover automatically where appropriate and terminal failures remain actionable.

## Acceptance Criteria

- Retryable ingestion and export job failures recover automatically where appropriate.
- Terminal failures surface actionable error information rather than failing silently.

### B-702 Request and job correlation logging

- Labels: `milestone:hardening`, `area:observability`, `type:feature`
- Depends on: `B-002`

## Summary

Add structured logs with request IDs and job IDs propagated across API and worker flows.

## Execution Readiness

- Prerequisites: core API and worker flows must already be working.
- Local services: API, worker, and PostgreSQL.
- Environment and config: structured logging configuration and any correlation ID propagation middleware.
- External access: none beyond representative local flows.
- Startup path: start the full local stack and exercise both request-driven and job-driven flows.
- Validation path: inspect logs to confirm request IDs and job IDs are present and traceable across related activity.
- Ready signal: a reviewer can follow a workflow across API and worker logs using shared identifiers.

## Acceptance Criteria

- API requests include a request identifier in structured logging.
- Background jobs include a job identifier in structured logging.
- Related API and worker activity can be traced through shared identifiers.

### B-703 Workspace isolation and permission hardening

- Labels: `milestone:hardening`, `area:security`, `type:feature`
- Depends on: `B-005`, `B-101`

## Summary

Enforce project access controls and verify workspace isolation across API and UI flows.

## Execution Readiness

- Prerequisites: project and requirement flows must already be working.
- Local services: frontend, API, and PostgreSQL.
- Environment and config: at least two authenticated users or test identities across different workspaces.
- External access: GitHub sign-in for multi-user verification.
- Startup path: start the local stack and sign in with users belonging to different workspaces.
- Validation path: attempt cross-workspace access through both UI navigation and direct API calls.
- Ready signal: unauthorized access is rejected consistently and workspace data does not leak.

## Acceptance Criteria

- Project and requirement access is restricted to authorized workspace members.
- Cross-workspace access attempts are rejected for project and requirement resources.

### B-704 Explicit failure-state UX for external dependency errors

- Labels: `milestone:hardening`, `area:frontend`, `type:feature`
- Depends on: `B-202`, `B-504`, `B-604`

## Summary

Show actionable error states for AI, repository, and Linear failures and distinguish retryable from terminal errors.

## Execution Readiness

- Prerequisites: AI refinement, Linear export, and repository ingestion flows must already be working.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: representative failure-state data or a test setup that can trigger those failures.
- External access: GitHub, Linear, and AI provider test accounts for realistic failure simulation.
- Startup path: start the full local stack and execute the relevant flows.
- Validation path: trigger AI, repository, and Linear failures, then inspect the UI states shown to the user.
- Ready signal: the user sees actionable product states instead of silent failure or generic error noise.

## Acceptance Criteria

- Users see explicit failure states for AI, repository, and Linear errors.
- The UI distinguishes retryable errors from terminal failures where possible.

### B-705 Audit retrieval for refinement and export history

- Labels: `milestone:hardening`, `area:audit`, `type:feature`
- Depends on: `B-301`, `B-503`, `B-605`

## Summary

Expose persona history, readiness history, export history, and repository snapshot history for a requirement.

## Execution Readiness

- Prerequisites: persona history, export history, and repository snapshot history must already be persisted.
- Local services: frontend, API, PostgreSQL, and worker.
- Environment and config: a completed requirement with representative audit data.
- External access: none beyond what is needed to produce the audit records in the first place.
- Startup path: start the full local stack and open a requirement with completed refinement and export activity.
- Validation path: retrieve and inspect the audit views or API responses for persona, readiness, export, and snapshot history.
- Ready signal: audit records are retrievable through intended product paths rather than raw logs or database access.

## Acceptance Criteria

- A completed requirement exposes persona history.
- A completed requirement exposes readiness history.
- A completed requirement exposes export history and repository snapshot history.

### B-706 Full provider payload audit retention and retrieval

- Labels: `milestone:hardening`, `area:audit`, `type:feature`
- Depends on: `B-201`, `B-702`

## Summary

Persist full provider request and response payloads and make them retrievable for audit purposes without leaking them to ordinary logs.

## Execution Readiness

- Prerequisites: provider calls and structured logging must already be working.
- Local services: API, PostgreSQL, and worker where provider calls can originate.
- Environment and config: provider payload storage and redaction rules.
- External access: the primary AI provider sandbox account.
- Startup path: start the full local stack and execute representative provider-backed refinement turns.
- Validation path: confirm payload history is stored in the audit path while ordinary logs remain redacted.
- Ready signal: full provider interaction history is available for audit without leaking into standard logs.

## Acceptance Criteria

- Full provider request and response payload history is stored for a requirement.
- Stored provider payload history is retrievable for audit purposes.
- Ordinary logs do not expose raw provider payload content.

### B-707 Normal-turn responsiveness validation

- Labels: `milestone:hardening`, `area:performance`, `type:feature`
- Depends on: `B-202`, `B-205`

## Summary

Measure representative refinement turn timings and validate the documented 10-second MVP responsiveness target.

## Execution Readiness

- Prerequisites: guided refinement and readiness computation flows must already be working.
- Local services: frontend, API, PostgreSQL, and any worker support used by the refinement path.
- Environment and config: representative MVP-like configuration and test data.
- External access: the primary AI provider sandbox account under representative conditions.
- Startup path: start the full local stack and execute several normal refinement turns.
- Validation path: measure timings, record evidence, and confirm slower operations show an in-progress state.
- Ready signal: responsiveness evidence shows that normal turns typically complete within the MVP target.

## Acceptance Criteria

- Representative refinement turns are measured under MVP-like conditions.
- Typical refinement turns complete within the documented 10-second target under those conditions.
- Slower operations surface an explicit in-progress state to the user.

### B-708 Integration credential protection and secret redaction

- Labels: `milestone:hardening`, `area:security`, `type:feature`
- Depends on: `B-007`, `B-004`, `B-201`, `B-501`, `B-601`, `B-702`

## Summary

Protect stored integration credentials and enforce redaction so secrets do not leak through logs, error responses, or normal product APIs.

## Execution Readiness

- Prerequisites: auth, provider, Linear, repository, and logging flows must already be working.
- Local services: the full local stack, including worker, must be running.
- Environment and config: secret storage approach, encryption or protection mechanism, and redaction rules.
- External access: GitHub, Linear, and AI provider test accounts for realistic credential-handling paths.
- Startup path: start the full local stack and execute representative auth and integration flows.
- Validation path: inspect logs, error responses, and UI/API payloads while exercising integrations.
- Ready signal: secrets are protected at rest and redacted during normal operation and failure handling.

## Acceptance Criteria

- Stored integration credentials are protected according to the documented MVP security approach.
- Ordinary logs and error responses do not expose raw secrets or sensitive connection values.
- Representative UI and API flows do not return stored credential values to authorized or unauthorized users.
- The repository documents how secret protection and redaction are verified during implementation, including which checks to run and what evidence to look for.

### B-709 Basic admin and diagnostics surfaces

- Labels: `milestone:hardening`, `area:operations`, `type:feature`
- Depends on: `B-701`, `B-702`, `B-705`, `B-706`

## Summary

Build a minimal diagnostics surface for jobs, integrations, repository freshness, export outcomes, and recent failures needed for alpha support.

## Execution Readiness

- Prerequisites: retries, correlation logging, audit retrieval, and provider payload audit work must already be complete.
- Local services: the full local stack, including worker, must be running.
- Environment and config: diagnostics access controls and any backend endpoints required to surface operational state.
- External access: representative GitHub, Linear, and AI provider flows to populate diagnostics data.
- Startup path: start the full local stack and run representative end-to-end product activity first.
- Validation path: inspect the diagnostics surface for repository freshness, export status, recent failures, and integration outcomes.
- Ready signal: a reviewer can understand recent system state without reading raw database records or raw logs.

## Acceptance Criteria

- The product exposes a basic diagnostics path for inspecting recent job and integration outcomes.
- A reviewer can inspect repository sync freshness, export status, and recent failure state without relying only on raw logs.
- The diagnostics surface is sufficient to support the documented alpha-readiness milestone without requiring a separate observability platform.
- A developer or reviewer can use the diagnostics surface to confirm the last known status of a job or integration without reading raw database records.