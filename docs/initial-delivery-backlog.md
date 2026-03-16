# Refinr Initial Delivery Backlog

## Purpose

This document translates the current Refinr documentation into an initial MVP delivery backlog. It is derived from [../PRD.md](../PRD.md), [implementation-roadmap.md](implementation-roadmap.md), and [acceptance-criteria.md](acceptance-criteria.md).

The backlog is structured to follow INVEST principles as closely as possible:

- Independent: tickets should avoid unnecessary coupling.
- Negotiable: scope should remain discussable unless fixed by acceptance criteria.
- Valuable: each ticket should produce visible product or engineering value.
- Estimable: each ticket should be small enough to reason about.
- Small: tickets should fit within a normal implementation cycle.
- Testable: each ticket has concrete acceptance outcomes.

## Backlog Conventions

- Epics are aligned to roadmap milestones.
- Tickets are written as backlog-ready implementation items, not high-level aspirations.
- Dependencies are listed only where they materially affect sequencing.
- Acceptance criteria here are written as observable outcomes that should remain usable when copied directly into a tracker.
- Ticket IDs are provisional and intended for documentation use until moved into a tracking system.
- This backlog preserves the richer MVP scope already defined in the PRD; where the PRD and backlog diverge, the backlog should be expanded rather than silently narrowing product behavior.

## Execution Readiness Standard

Before a backlog item is considered startable by an implementation team, the tracker version of that item should explicitly include:

- Prerequisites and blocking tickets that must be complete first.
- Local services that must be running.
- Required environment variables or local configuration.
- Required external sandbox credentials, accounts, or test destinations.
- The exact startup path the developer should use in this repository.
- The validation command or walkthrough that proves the change works locally.
- The expected ready signal that tells a junior developer their environment is correctly prepared.

Until B-000 and B-006 establish the repository-standard commands, milestone readiness notes below should be treated as the minimum execution context that must be copied into tracker issues.

## Epic 0: Foundation

Aligned roadmap milestone: Milestone 0

Shared execution readiness for this epic:

- Prerequisites: none for B-000 and B-007; all other foundation work should wait for the bootstrap and secrets guidance they produce.
- Local services: frontend, API, PostgreSQL, and worker are introduced during this epic and must converge on one documented local startup path.
- Environment and config: local environment templates, database connection settings, session configuration, and GitHub OAuth variables defined by B-000 and B-007.
- External access: a non-production GitHub OAuth app and a test GitHub account are required for B-004.
- Startup path: use the repository bootstrap and Docker Compose commands established by B-000 and B-006.
- Validation path: verify placeholder routes, API health, database migrations, worker readiness, and GitHub sign-in once those pieces exist.
- Ready signal: the app shell loads, the API health endpoint responds successfully, migrations complete, the worker connects to pg-boss, and GitHub login succeeds.

### B-000 Establish repository bootstrap and developer workflow

Value:

- Makes the repository implementable by a team starting from zero local knowledge.

Scope:

- Define the repository structure for frontend, API, shared code, and worker runtime areas.
- Choose and document the package manager and required Node.js version.
- Create standard scripts for install, dev, build, lint, test, database migration, and seed workflows.
- Add environment file templates and document the required variables for local development.
- Document the exact local bootstrap flow, including the commands to install dependencies, create local environment files, start the database, run migrations, and verify that the repository is ready for implementation.

Dependencies:

- None

Acceptance:

- The repository contains a documented developer bootstrap path that assumes no prior project knowledge.
- The required Node.js version and package manager are explicitly stated and enforced or validated by the repository tooling.
- Standard scripts exist for development, build, lint, test, migration, and seed or equivalent local data setup workflows.
- Environment variable templates exist for local development and list the required values for frontend, API, database, session, and integration-related configuration.
- A developer starting from a fresh clone can follow the documented bootstrap flow and verify that the repository is ready for Milestone 0 implementation work.

### B-001 Establish Angular application shell

Value:

- Creates the frontend base for all user-facing workflows.

Scope:

- Initialize the Angular application.
- Configure routing shell for sign-in, workspace, project, and requirement views.
- Add a minimal layout system and navigation frame.

Dependencies:

- None

Acceptance:

- The Angular application starts successfully in the local development environment.
- Sign-in, workspace, project, and requirement placeholder routes resolve through the configured router.
- A minimal application shell renders consistently across those routes.

### B-002 Establish Express API skeleton

Value:

- Creates the backend entry point for all domain and integration work.

Scope:

- Initialize the Express API.
- Add TypeScript build and runtime structure.
- Add baseline middleware for logging, security headers, and error handling.

Dependencies:

- None

Acceptance:

- The Express API starts successfully in the local development environment.
- The health endpoint returns a successful response from the running API.
- Baseline middleware for logging, security headers, and error handling is wired into request handling.

### B-003 Provision PostgreSQL and baseline schema tooling

Value:

- Creates the durable persistence foundation required for all MVP workflows.

Scope:

- Configure PostgreSQL and pgvector.
- Initialize Drizzle migrations.
- Create baseline schema for users, workspaces, projects, and requirements.

Dependencies:

- B-002

Acceptance:

- Drizzle migrations run successfully against the configured PostgreSQL instance.
- Baseline tables for users, workspaces, projects, and requirements are created.
- The created tables can be queried successfully from the application.

### B-004 Implement GitHub OAuth session authentication

Value:

- Enables authenticated access to workspace and project workflows.

Scope:

- Configure Passport and session handling.
- Implement GitHub OAuth sign-in.
- Persist authenticated user records.

Dependencies:

- B-007
- B-002
- B-003

Acceptance:

- A new or existing user can complete sign-in with GitHub OAuth.
- The authenticated user record is persisted or updated in application storage.
- The resulting session remains valid across subsequent authenticated requests.

### B-005 Implement workspace and project creation flow

Value:

- Delivers the first usable product object hierarchy.

Scope:

- Create workspace and project domain APIs.
- Build the UI flow for workspace and project creation.
- Persist workspace membership and project ownership.
- Support project metadata needed for refinement and export, including product area, goals, default labels, and an optional default persona stack.

Dependencies:

- B-001
- B-003
- B-004

Acceptance:

- An authenticated user can create a new workspace from the product UI.
- The same user can create a project within that workspace.
- The created project appears on the project dashboard for that workspace.
- Project metadata and default refinement settings can be captured and persisted during setup or immediate project editing.
- Workspace and project ownership are persisted correctly.
- Saved project metadata remains available after reload or later revisit.

Split guidance:

- If this work expands during planning, split into separate tickets for workspace domain APIs, project domain APIs, and combined creation UI.

### B-006 Create Docker Compose local stack

Value:

- Makes the product runnable consistently by the team.

Scope:

- Create a local stack for frontend, API, database, and worker.
- Document how the local stack is started after repository bootstrap is complete.
- Align the documented startup path with the standard scripts, environment templates, database migration workflow, and worker runtime startup requirements.

Dependencies:

- B-000
- B-001
- B-002
- B-003
- B-008

Acceptance:

- Frontend, API, database, and worker services can be started locally from one documented workflow.
- The documented startup path is sufficient for another developer with no prior repository knowledge to reach a running local stack.
- The documented path includes the expected pre-requisites, required environment files, migration steps, and the worker service needed before the application can be used locally.

### B-007 Establish local secrets and external access prerequisites

Value:

- Prevents auth and integration work from stalling on undocumented credential and sandbox requirements.

Scope:

- Document the local secret requirements for GitHub OAuth, session security, Linear access, and the primary AI provider.
- Define how developers obtain or are provisioned with non-production credentials and allowed test destinations.
- Add environment template entries and setup guidance for required secrets without exposing real values.
- Document where each secret is stored locally, where it is used in the application, and how a developer can confirm that setup is complete before starting auth or integration tickets.

Dependencies:

- B-000

Acceptance:

- The repository documentation explicitly lists the local secrets and external accounts required for GitHub OAuth, session configuration, Linear integration, and AI provider access.
- The setup guidance states how a developer obtains approved non-production credentials or sandbox destinations for each external dependency.
- Local environment templates include the required secret variable names without embedding live credential values.
- A developer can verify whether their local machine is ready to begin auth and integration implementation without relying on tribal knowledge or production credentials.

### B-008 Establish worker runtime and job execution skeleton

Value:

- Creates the missing runtime needed for queue-backed ingestion, retries, and long-running background work.

Scope:

- Set up the worker process structure in the shared application codebase.
- Configure pg-boss connection and baseline job registration conventions.
- Add the command or script used to start the worker during local development and make sure it can also be used by the Docker Compose workflow.
- Define a simple health or verification check so developers can confirm the worker is connected and able to execute jobs.

Dependencies:

- B-000
- B-002
- B-003

Acceptance:

- The repository contains a worker runtime entry point aligned with the documented architecture and stack.
- The worker can start locally against the configured PostgreSQL instance and connect to pg-boss successfully.
- Baseline job registration conventions are documented so later tickets can add background jobs consistently.
- A developer can run the documented worker start command and verify from a simple check or expected log output that it is ready to process jobs.

## Epic 1: Requirement Intake And Persistence

Aligned roadmap milestone: Milestone 1

Shared execution readiness for this epic:

- Prerequisites: B-000 and B-006 should be complete, and B-005 should provide an authenticated workspace and project to work against.
- Local services: frontend, API, and PostgreSQL should be running through the standard local stack.
- Environment and config: foundation environment templates plus any seeded or manually created workspace and project records needed for testing.
- External access: GitHub sign-in remains required for authenticated UI flows.
- Startup path: start the local stack with the repository-standard commands from B-000 and B-006, then create or load a test workspace and project.
- Validation path: exercise requirement create, list, read, and reload flows through the UI and any supporting API endpoints.
- Ready signal: an authenticated user can create a requirement, see it on the project dashboard, and reopen it after refresh.

### B-101 Implement requirement domain model and APIs

Value:

- Creates the primary business object for Refinr.

Scope:

- Add requirement tables and API endpoints.
- Support create, read, and list operations scoped to project.

Dependencies:

- B-003
- B-005

Acceptance:

- A requirement can be created for a specific project through the backend API.
- A requirement can be retrieved individually and through a project-scoped list API.
- Requirement access is correctly scoped through project and workspace ownership.

### B-102 Build requirement creation UI

Value:

- Gives users a low-friction way to start product refinement.

Scope:

- Add requirement creation form for short freeform prompts.
- Support optional context notes field.

Dependencies:

- B-001
- B-101

Acceptance:

- A project user can create a requirement from the project interface using a short freeform prompt.
- Optional context notes can be entered during creation.
- The created requirement appears immediately in the UI after successful save.

### B-103 Build project dashboard requirement listing

Value:

- Makes requirement work discoverable and revisitable.

Scope:

- Add requirement list to the project dashboard.
- Show status and last-updated information.

Dependencies:

- B-101
- B-102

Acceptance:

- Project requirements are listed on the project dashboard.
- Each listed requirement shows enough identifying information to distinguish it in the dashboard.
- Each listed requirement links to its requirement detail view.

### B-104 Build requirement detail page shell

Value:

- Establishes the primary working surface for future refinement work.

Scope:

- Add requirement detail route and layout.
- Show initial prompt, current status, and placeholders for conversation, summary, and readiness.

Dependencies:

- B-101
- B-102

Acceptance:

- The requirement detail page loads persisted requirement data for the selected requirement.
- The page displays the initial prompt and current status.
- The page includes visible sections for conversation history, summary state, and readiness state.

### B-105 Persist refinement sessions and requirement messages

Value:

- Creates the event history needed for the guided refinement loop.

Scope:

- Add refinement session model.
- Add requirement message persistence.
- Tie messages to requirements and sessions.

Dependencies:

- B-101

Acceptance:

- Refinement sessions can be created and linked to a requirement.
- Requirement messages are stored with the correct requirement and session linkage.
- Stored messages are retrieved in the correct chronological order.

## Epic 2: Guided Refinement Loop

Aligned roadmap milestone: Milestone 2

Shared execution readiness for this epic:

- Prerequisites: milestone 1 flows must be working, and B-007 must have documented the AI provider credentials required for local development.
- Local services: frontend, API, and PostgreSQL should be running; worker support is only required if a refinement step is moved behind a job boundary.
- Environment and config: baseline app configuration plus AI provider keys, model selection, and any prompt-class configuration defined by the provider gateway.
- External access: a non-production account for the primary AI provider is required.
- Startup path: run the local stack, sign in, create or load a requirement, and use the requirement detail view as the starting point.
- Validation path: start a refinement session, answer at least two turns, and confirm that messages, summaries, and readiness state persist after reload.
- Ready signal: the first guided question returns successfully, follow-up turns persist, and the latest summary and readiness state reload correctly.

### B-201 Implement AI provider gateway abstraction

Value:

- Creates a replaceable integration boundary around commercial AI services.

Scope:

- Define provider interface.
- Implement the first commercial provider adapter.
- Capture usage and outcome metadata.

Dependencies:

- B-007
- B-002

Acceptance:

- The backend calls the configured AI provider through an internal provider abstraction rather than vendor-specific logic in domain code.
- The first provider adapter can successfully execute a provider call.
- Provider usage metadata is captured for the call.

### B-202 Implement initial refinement session start flow

Value:

- Starts the first guided experience from a stored requirement.

Scope:

- Add API and UI action to begin refinement.
- Create a default refinement session and starting persona context.

Dependencies:

- B-104
- B-105
- B-201

Acceptance:

- A user can trigger refinement from the requirement page.
- The system creates a refinement session linked to the requirement.
- The system returns and displays the first guided question for that session.

Split guidance:

- If API and UI work diverge materially, split into a backend session-start ticket and a frontend refinement-start action ticket.

### B-203 Implement question-and-answer loop persistence

Value:

- Makes the refinement session durable and auditable.

Scope:

- Persist system questions and user answers.
- Reload prior conversation history into the UI.

Dependencies:

- B-105
- B-202

Acceptance:

- System questions and user answers are persisted as requirement messages.
- The saved conversation history reloads correctly after page refresh.
- Message ordering remains stable across reloads.

### B-204 Generate summary snapshots after refinement turns

Value:

- Turns raw conversation into structured product understanding.

Scope:

- Generate summary snapshots from refinement progress.
- Persist snapshots on meaningful updates.

Dependencies:

- B-201
- B-203

Acceptance:

- A new summary snapshot is generated after a meaningful refinement response.
- The generated snapshot is persisted and linked to the correct requirement or session.
- The latest summary state becomes available for display in the UI.

### B-205 Compute basic readiness state

Value:

- Makes refinement progress visible and creates the basis for gating.

Scope:

- Compute initial readiness dimension state.

Dependencies:

- B-204

Acceptance:

- The backend derives readiness dimensions for a requirement using the documented rubric.
- The backend calculates a total readiness score for the requirement.
- The resulting readiness state is persisted or otherwise made available for later retrieval.

### B-206 Render readiness score and missing information in the UI

Value:

- Makes refinement progress legible to the user.

Scope:

- Render readiness dimensions, total score, and missing information in the requirement UI.

Dependencies:

- B-205

Acceptance:

- Readiness dimensions are visible in the requirement UI as complete, partial, or missing.
- The total readiness score is visible to the user.
- The UI highlights missing information that is preventing ticket generation.

### B-207 Build live requirement summary panel

Value:

- Makes the system's synthesized understanding visible instead of leaving the user to infer it from conversation history.

Scope:

- Render the current requirement summary in the requirement detail experience.
- Show the key synthesized sections for problem, outcome, actors, workflow, assumptions, open questions, and edge cases when available.
- Refresh the displayed summary after meaningful refinement turns and reload the latest saved state on revisit.

Dependencies:

- B-104
- B-204

Acceptance:

- The requirement UI shows what is currently known about the requirement based on the latest summary snapshot.
- The summary panel presents the latest synthesized state after meaningful refinement responses.
- The latest summary remains visible after page refresh or later revisit.
- A developer can verify the panel by completing refinement turns, refreshing the page, and confirming that the latest saved summary is still shown.

## Epic 3: Persona Orchestration And Readiness Gate

Aligned roadmap milestone: Milestone 3

Shared execution readiness for this epic:

- Prerequisites: milestone 2 must be functioning with persisted refinement history and readiness state.
- Local services: frontend, API, and PostgreSQL should be running.
- Environment and config: the same AI provider and application configuration used for milestone 2.
- External access: the primary AI provider sandbox account remains required.
- Startup path: run the local stack, open a non-trivial requirement, and continue from the requirement detail flow.
- Validation path: verify persona recommendation, accept and skip flows, explicit invocation reasons, readiness gate behavior, and override history.
- Ready signal: specialist personas appear for documented reasons and ticket generation is blocked or overridden deterministically from the requirement screen.

### B-301 Implement persona invocation model and audit trail

Value:

- Makes orchestration inspectable and traceable.

Scope:

- Add persona invocation persistence.
- Record invocation reason and contributed dimensions.

Dependencies:

- B-105

Acceptance:

- Persona invocations are stored with the associated requirement and refinement session.
- Invocation reason and contributed dimensions are retained.
- Stored invocation history can be retrieved for review.

### B-302 Implement orchestration rules for default persona progression

Value:

- Moves the product from generic chat behavior to structured refinement.

Scope:

- Encode default persona progression rules.
- Select next persona based on requirement state and readiness gaps.

Dependencies:

- B-201
- B-205
- B-301

Acceptance:

- The system evaluates requirement state and readiness gaps to recommend the next persona.
- The recommendation follows the documented default progression rules.
- The recommendation can be returned in a form usable by the UI.

### B-303 Implement specialist persona trigger rules

Value:

- Brings technical, UX, and edge-case challenge into refinement at the right time.

Scope:

- Add trigger logic for Senior Developer, UI Designer, and Reality Checker.

Dependencies:

- B-302

Acceptance:

- Non-trivial requirements can trigger specialist personas based on documented rules.
- The trigger result includes a clear reason for invoking the specialist persona.

### B-304 Build hybrid persona control actions in the UI

Value:

- Preserves user control without making orchestration fully manual.

Scope:

- Allow user to accept, skip, or request personas where permitted.
- Expose invocation reason in the UI.

Dependencies:

- B-302
- B-303

Acceptance:

- The UI shows the recommended persona and the reason it was suggested.
- The user can accept or skip the recommendation.
- Where permitted, the user can manually request a persona through the UI.

Split guidance:

- If the UI action set grows, separate manual persona request into its own ticket.

### B-305 Enforce readiness gate

Value:

- Prevents premature ticket generation while still allowing explicit override.

Scope:

- Enforce blocking readiness dimensions.

Dependencies:

- B-205

Acceptance:

- Ticket generation is blocked when blocking readiness dimensions are insufficient.
- The blocked state is deterministically derived from the documented readiness rules.

### B-306 Implement readiness override capture and marking

Value:

- Preserves user control while keeping override behavior explicit and auditable.

Scope:

- Add override action capture.
- Mark downstream ticket state when generated under override.

Dependencies:

- B-305

Acceptance:

- The user can explicitly override the readiness gate from the product flow.
- The override action is persisted as part of refinement history.
- Downstream ticket data is marked to reflect that the requirement was exported under override.

### B-307 Build readiness gate status and override UI

Value:

- Makes ticket-generation blocking behavior understandable and actionable instead of feeling like an unexplained system refusal.

Scope:

- Show when ticket generation is blocked by readiness rules.
- Surface the specific blocking or weak readiness dimensions in the requirement UI.
- Provide the explicit override action in the UI and reflect override status after it is used.

Dependencies:

- B-206
- B-305
- B-306

Acceptance:

- The UI explains why ticket generation is blocked when readiness requirements are not met.
- The UI identifies the dimensions that are preventing ticket generation.
- A user can explicitly override the readiness gate from the product UI.
- The requirement UI reflects when downstream tickets are being generated under override.
- A developer can verify the flow from the requirement screen without using the API directly.

## Epic 4: Ticketization And Review

Aligned roadmap milestone: Milestone 4

Shared execution readiness for this epic:

- Prerequisites: milestone 3 must be working, and a ticket-ready requirement should be available for review.
- Local services: frontend, API, and PostgreSQL should be running.
- Environment and config: the same refinement configuration used in milestone 3, plus any ticket-generation settings.
- External access: the primary AI provider account is still required when ticket candidates are generated live.
- Startup path: open a ticket-ready requirement from the local stack and enter the ticket review flow.
- Validation path: generate candidates, inspect them, edit content, split, merge, discard, update dependencies, and confirm the saved state after reload.
- Ready signal: the approved candidate set reflects user edits accurately and discarded candidates stay out of the default export path.

### B-401 Implement ticket candidate domain model and APIs

Value:

- Creates the reviewable work-item layer between refinement and export.

Scope:

- Add ticket candidate persistence and retrieval.
- Support candidate statuses and ordering metadata.

Dependencies:

- B-003
- B-305

Acceptance:

- Ticket candidates can be stored for a specific requirement.
- Ticket candidates can be retrieved individually and as a requirement-scoped list.
- Candidate status and core metadata are retained.

### B-402 Build ticket generation service

Value:

- Converts refined understanding into actionable work items.

Scope:

- Generate flat ticket candidates from ticket-ready requirements.
- Include title, description, acceptance criteria, and assumptions.

Dependencies:

- B-201
- B-305
- B-401

Acceptance:

- A ticket-ready requirement can produce one or more flat ticket candidates.
- Each generated candidate includes title, description, acceptance criteria, and assumptions.
- Generated candidates remain linked to the source requirement.

### B-403 Build ticket review interface

Value:

- Gives users direct control over backlog quality before export.

Scope:

- List ticket candidates.
- Open individual candidate details.
- Support approval state.

Dependencies:

- B-402

Acceptance:

- Users can view the list of ticket candidates for a requirement.
- Users can inspect individual ticket candidate details.
- Users can approve individual ticket candidates from the review UI.

Split guidance:

- If review scope expands, separate candidate list view from candidate detail editing.

### B-404 Implement split and merge ticket actions

Value:

- Supports backlog shaping without rerunning the full refinement process.

Scope:

- Split over-broad ticket candidates.
- Merge over-split ticket candidates.

Dependencies:

- B-403

Acceptance:

- A user can split one over-broad ticket candidate into multiple candidates.
- A user can merge related ticket candidates that were over-split.
- The resulting ticket set remains linked to the originating requirement.

### B-405 Implement dependency and ordering editing

Value:

- Makes the ticket set execution-ready rather than just descriptive.

Scope:

- Edit candidate dependencies.
- Edit ordering or sequencing hints.

Dependencies:

- B-401
- B-403

Acceptance:

- Users can define dependencies between ticket candidates.
- Users can edit existing dependency or sequencing information.
- Updated dependency information persists with the ticket set.

### B-406 Implement ticket candidate content editing

Value:

- Lets users turn generated ticket candidates into execution-ready backlog items before export.

Scope:

- Allow direct editing of ticket candidate title, description, acceptance criteria, and assumptions or equivalent execution guidance.
- Support marking a ticket candidate as blocked by unresolved questions where needed.
- Persist edited candidate content and reload it accurately in the review flow.

Dependencies:

- B-401
- B-403

Acceptance:

- A user can edit ticket candidate content before export.
- Edited ticket content persists across reload or later revisit.
- A user can mark a ticket candidate as blocked by unresolved questions when needed.
- Edited candidates remain linked to the originating requirement and candidate set.
- A developer can verify the edit flow by changing a ticket, reloading the review view, and confirming the saved changes remain visible.

### B-407 Implement ticket candidate discard and restore actions

Value:

- Lets users remove low-value ticket candidates from the export set without losing traceability.

Scope:

- Allow users to discard a ticket candidate from the active review set.
- Preserve discarded candidates as traceable, non-exportable records unless they are restored.
- Support restoring a discarded ticket candidate when the user decides it should be reconsidered.

Dependencies:

- B-403
- B-406

Acceptance:

- A user can discard a ticket candidate from the review flow.
- Discarded candidates are excluded from the default export selection.
- Discarded candidates remain linked to the originating requirement and can be restored for review.

## Epic 5: Linear Export

Aligned roadmap milestone: Milestone 5

Shared execution readiness for this epic:

- Prerequisites: milestone 4 must be working, and B-007 must have documented Linear test credentials and allowed destinations.
- Local services: frontend, API, and PostgreSQL should be running; worker support is required when export retries run asynchronously.
- Environment and config: Linear API credentials, destination mapping configuration, and any default export metadata such as labels or priority.
- External access: a Linear test workspace, team, and any optional board or project destination needed for validation.
- Startup path: start the local stack, configure the Linear destination from project settings, and open a reviewed requirement with approved ticket candidates.
- Validation path: verify connection validation, export confirmation, downstream issue creation, metadata application, and safe retry of partial failures.
- Ready signal: issues are created once in the expected Linear destination, expected metadata is applied, and successful mappings survive retries.

### B-501 Implement Linear connection domain and validation

Value:

- Enables the first production-critical downstream integration.

Scope:

- Configure and persist one Linear destination per project.
- Validate connection credentials and target workspace, team, and optional board or project mapping.

Dependencies:

- B-007
- B-005

Acceptance:

- A project can store one Linear destination for MVP use, including the selected workspace, team, and any supported board or project mapping.
- The stored Linear connection is validated against the configured credentials and selected destination objects.
- Invalid connection details or invalid destination mappings are rejected rather than silently stored.

### B-502 Build Linear connection UI

Value:

- Gives users a usable path to configure export destinations.

Scope:

- Add project UI for connecting, validating, and saving a Linear destination selection.

Dependencies:

- B-501

Acceptance:

- A project user can enter and save one Linear destination through the UI.
- The UI allows the user to select the supported workspace, team, and any supported board or project mapping for that destination.
- The UI surfaces connection validation success or failure.

### B-503 Implement export batch model and APIs

Value:

- Creates auditable export behavior instead of direct fire-and-forget integration.

Scope:

- Add export batches and export batch items.
- Support export initiation from approved ticket candidates.

Dependencies:

- B-401
- B-501

Acceptance:

- Each export attempt is recorded as an export batch.
- Each exported ticket candidate is recorded as a per-ticket batch item.
- Per-ticket export status is retrievable after the export attempt.

### B-504 Implement Linear issue creation adapter

Value:

- Completes the core backlog delivery path from Refinr to Linear.

Scope:

- Create Linear issues from approved ticket candidates.
- Persist returned downstream identifiers.

Dependencies:

- B-503

Acceptance:

- Approved ticket candidates can be exported to Linear as issues.
- Returned Linear identifiers are persisted.
- Created issues remain mapped back to their source ticket candidates.

### B-505 Surface export results in the UI

Value:

- Makes export behavior understandable and recoverable for users.

Scope:

- Show per-ticket export success and failure.
- Show downstream issue identifiers.

Dependencies:

- B-504

Acceptance:

- The UI shows export success or failure for each ticket candidate in the export batch.
- The UI shows downstream Linear identifiers for successfully created issues.

### B-506 Implement retryable partial export handling

Value:

- Prevents export failures from forcing manual cleanup or data loss.

Scope:

- Retry failed export items safely.
- Preserve successful mappings during partial failures.

Dependencies:

- B-503
- B-504

Acceptance:

- Partial export failures are visible to the user.
- Failed export items can be retried without duplicating already successful issues.
- Successful mappings remain intact across retries.

### B-507 Implement export confirmation and metadata mapping

Value:

- Makes export intent explicit and ensures created Linear issues carry the execution metadata described in the PRD.

Scope:

- Add a pre-export confirmation step showing destination, issue count, and metadata to be applied.
- Map supported project defaults and export metadata such as labels, priority, estimates, and project or board mapping onto created Linear issues.
- Keep assignee unset by default unless the user explicitly chooses otherwise.

Dependencies:

- B-502
- B-504
- B-505

Acceptance:

- Before export, the UI confirms the destination and the metadata that will be applied to the selected ticket candidates.
- Supported metadata such as labels, priority, estimates, and destination mapping are applied to created Linear issues consistently.
- Exported issues remain traceable to their originating ticket candidates together with the metadata used at export time.

## Epic 6: Repository Context Ingestion

Aligned roadmap milestone: Milestone 6

Shared execution readiness for this epic:

- Prerequisites: milestone 5 must be operational, and GitHub repository access must be available for a test repository that contains approved documents.
- Local services: frontend, API, PostgreSQL, and worker should all be running.
- Environment and config: GitHub integration configuration, repository context settings, and any storage location used for snapshots or cached artifacts.
- External access: a test repository with readable markdown or documentation sources and credentials with permission to fetch its contents.
- Startup path: start the full local stack, connect a repository, select approved sources, run ingestion, then revisit refinement or ticket generation.
- Validation path: verify snapshot creation, citations, freshness, source replacement or removal, conflict surfacing, and on-demand refresh.
- Ready signal: the latest repository snapshot is visible, citations resolve correctly, and removed sources stop influencing newly generated output after refresh.

### B-601 Implement GitHub repository connection domain

Value:

- Connects refinement to project-specific source context.

Scope:

- Add GitHub repository connection for a project.
- Persist repository metadata and access configuration.

Dependencies:

- B-007
- B-004
- B-005

Acceptance:

- A project can store a GitHub repository connection.
- Repository metadata is persisted against the correct project.

### B-602 Build GitHub repository connection UI

Value:

- Gives users a path to connect repository context to a project.

Scope:

- Add project UI for connecting a GitHub repository.

Dependencies:

- B-601

Acceptance:

- A project user can configure a GitHub repository connection through the UI.
- The UI makes it clear which repository is currently connected.

### B-603 Build context source recommendation and selection flow

Value:

- Keeps repository grounding selective and user-controlled.

Scope:

- Recommend likely documentation sources.
- Allow user selection and exclusion of context sources.

Dependencies:

- B-601
- B-602

Acceptance:

- The system recommends likely repository context sources.
- The user can choose which sources are included or excluded.
- The selected source set is persisted for later ingestion.

### B-604 Implement repository context ingestion job pipeline

Value:

- Creates reusable project context snapshots for refinement.

Scope:

- Fetch approved context sources.
- Parse documents and create context snapshots.

Dependencies:

- B-008
- B-603

Acceptance:

- Approved context sources are fetched and parsed through the ingestion pipeline.
- The ingestion result is stored as a repository context snapshot.
- The snapshot is linked to the correct project.

### B-605 Persist citations and context freshness metadata

Value:

- Makes context usage traceable and trustworthy.

Scope:

- Store source citations.
- Store snapshot version or sync metadata.

Dependencies:

- B-604

Acceptance:

- Repository context snapshots retain source citations.
- Repository context snapshots retain freshness or sync metadata.
- Citation and freshness data are retrievable with the snapshot.

### B-606 Apply repository context in summaries and ticket generation

Value:

- Improves refinement quality by grounding outputs in project knowledge.

Scope:

- Inject repository context into summary and ticket generation flows.
- Preserve user-answer priority over conflicting repository context.

Dependencies:

- B-204
- B-402
- B-605

Acceptance:

- Summary generation can reference repository context from approved snapshots.
- Ticket generation can reference repository context from approved snapshots.
- Direct user answers remain authoritative when they conflict with repository context.

### B-607 Add on-demand repository context refresh

Value:

- Prevents context from silently drifting stale during product use.

Scope:

- Trigger context refresh.
- Show latest snapshot freshness in the UI.

Dependencies:

- B-604

Acceptance:

- Users can trigger a repository context refresh on demand.
- The latest context freshness state is visible after refresh completes.

### B-608 Surface repository citations in refinement and ticket review

Value:

- Makes repository-grounded output reviewable and trustworthy instead of asking users to accept hidden context influence.

Scope:

- Show lightweight source citations when repository context contributes to summary output.
- Show lightweight source citations when repository context contributes to generated ticket candidates.
- Keep citation display readable in the requirement and ticket review experiences.

Dependencies:

- B-207
- B-403
- B-605
- B-606

Acceptance:

- Repository-derived summary output exposes lightweight source citation in the requirement experience.
- Repository-derived ticket candidate output exposes lightweight source citation in the review experience.
- Citation display remains linked to the correct repository snapshot or source entry.
- A developer can verify the feature by using ingested repository context and confirming the affected summary or ticket output shows the expected source reference.

### B-609 Implement repository context remediation and conflict handling

Value:

- Keeps repository grounding trustworthy when selected context later proves misleading, stale, or in conflict with direct user input.

Scope:

- Allow users to remove or replace previously approved context sources after the initial ingestion flow.
- Surface conflicts between repository context and direct user input in the refinement experience.
- Ensure refreshed snapshots and downstream outputs stop relying on removed sources.

Dependencies:

- B-603
- B-604
- B-606
- B-607
- B-608

Acceptance:

- A user can remove or replace a misleading context source after the initial ingestion flow.
- Conflicts between repository context and direct user input are surfaced explicitly rather than silently resolved.
- After a source is removed and context is refreshed, new summaries and ticket outputs no longer cite or rely on the removed source unless it is re-approved.

## Epic 7: Hardening And Alpha Readiness

Aligned roadmap milestone: Milestone 7

Shared execution readiness for this epic:

- Prerequisites: the core refinement, export, and repository context flows from milestones 0 through 6 must already be working.
- Local services: the full local stack, including worker, must be running.
- Environment and config: all prior milestone settings plus any encryption, redaction, logging, and diagnostics configuration needed for hardening work.
- External access: GitHub, Linear, and AI provider test accounts are required to simulate failure and recovery paths realistically.
- Startup path: start the full local stack and execute representative end-to-end product flows before simulating failures or validating diagnostics.
- Validation path: exercise failure handling, audit retrieval, responsiveness measurement, secret redaction, and diagnostics inspection using the documented MVP flows.
- Ready signal: recoverable failures preserve state, audit data is retrievable, responsiveness evidence is captured, and diagnostics reflect recent job and integration status.

### B-701 Implement worker retries and recovery rules

Value:

- Makes background workflows resilient enough for alpha use.

Scope:

- Configure retries for ingestion and export jobs.
- Record retry outcomes and terminal failures.

Dependencies:

- B-008
- B-506
- B-604

Acceptance:

- Retryable ingestion and export job failures recover automatically where appropriate.
- Terminal failures surface actionable error information rather than failing silently.

### B-702 Add request and job correlation logging

Value:

- Makes the system diagnosable under real usage.

Scope:

- Add structured logs with request IDs and job IDs.
- Propagate correlation IDs across API and worker flows.

Dependencies:

- B-007
- B-002

Acceptance:

- API requests include a request identifier in structured logging.
- Background jobs include a job identifier in structured logging.
- Related API and worker activity can be traced through shared identifiers.

### B-703 Harden workspace isolation and permission checks

Value:

- Protects core tenant boundaries before alpha rollout.

Scope:

- Enforce project access controls.
- Verify workspace isolation across API and UI flows.

Dependencies:

- B-005
- B-101

Acceptance:

- Project and requirement access is restricted to authorized workspace members.
- Cross-workspace access attempts are rejected for project and requirement resources.

### B-704 Implement explicit failure-state UX for external dependency errors

Value:

- Prevents silent failure and reduces user confusion in critical flows.

Scope:

- Show actionable error states for AI, repository, and Linear failures.
- Distinguish retryable from terminal failures.

Dependencies:

- B-202
- B-504
- B-604

Acceptance:

- Users see explicit failure states for AI, repository, and Linear errors.
- The UI distinguishes retryable errors from terminal failures where possible.

### B-705 Implement audit retrieval for refinement and export history

Value:

- Supports traceability, trust, and post-failure investigation.

Scope:

- Expose persona history, readiness history, export history, and repository snapshot history for a requirement.

Dependencies:

- B-301
- B-503
- B-605

Acceptance:

- A completed requirement exposes persona history.
- A completed requirement exposes readiness history.
- A completed requirement exposes export history and repository snapshot history.

### B-706 Implement full provider payload audit retention and retrieval

Value:

- Satisfies the explicit MVP auditability requirement for provider interactions.

Scope:

- Persist full provider request and response payloads.
- Make retained payload history retrievable for audit purposes.
- Ensure ordinary logs do not leak the same data.

Dependencies:

- B-201
- B-702

Acceptance:

- Full provider request and response payload history is stored for a requirement.
- Stored provider payload history is retrievable for audit purposes.
- Ordinary logs do not expose raw provider payload content.

### B-707 Validate normal-turn responsiveness against MVP target

Value:

- Confirms the core user interaction loop is acceptable for MVP use.

Scope:

- Measure representative refinement turn timings.
- Surface in-progress states for slower operations.

Dependencies:

- B-202
- B-205

Acceptance:

- Representative refinement turns are measured under MVP-like conditions.
- Typical refinement turns complete within the documented 10-second target under those conditions.
- Slower operations surface an explicit in-progress state to the user.

### B-708 Implement integration credential protection and secret redaction

Value:

- Brings auth and integration handling up to the documented MVP security bar instead of relying on convention.

Scope:

- Encrypt or otherwise protect stored integration credentials and sensitive connection details.
- Apply log and error-response redaction rules for secrets and sensitive provider data.
- Verify that UI and API responses do not expose stored credentials during normal product flows.

Dependencies:

- B-007
- B-004
- B-201
- B-501
- B-601
- B-702

Acceptance:

- Stored integration credentials are protected according to the documented MVP security approach.
- Ordinary logs and error responses do not expose raw secrets or sensitive connection values.
- Representative UI and API flows do not return stored credential values to authorized or unauthorized users.
- The repository documents how secret protection and redaction are verified during implementation, including which checks to run and what evidence to look for.

### B-709 Build basic admin and diagnostics surfaces

Value:

- Gives the team a minimal operational view into jobs, integrations, and failure states needed to support alpha users.

Scope:

- Expose a basic diagnostics surface for key background jobs, integration status, and recent failures.
- Show enough state to inspect repository sync freshness, export outcomes, and retry or terminal failure conditions.
- Keep the surface limited to MVP operational support needs rather than building a full admin platform.

Dependencies:

- B-701
- B-702
- B-705
- B-706

Acceptance:

- The product exposes a basic diagnostics path for inspecting recent job and integration outcomes.
- A reviewer can inspect repository sync freshness, export status, and recent failure state without relying only on raw logs.
- The diagnostics surface is sufficient to support the documented alpha-readiness milestone without requiring a separate observability platform.
- A developer or reviewer can use the diagnostics surface to confirm the last known status of a job or integration without reading raw database records.

## Backlog Notes

- This backlog is intentionally initial, not exhaustive.
- Tickets should be refined further before implementation if hidden scope or cross-cutting security concerns emerge.
- Tickets that grow beyond normal implementation size should be split further rather than carried forward as oversized stories.
- This backlog intentionally keeps the richer PRD-defined scope for project setup, export metadata, context remediation, and discardable ticket candidates. If a narrower MVP is desired, that should be an explicit product decision in the PRD rather than an accidental backlog omission.

## What Mapping This Into Linear Would Mean

Turning this document into a Linear-ready import format would mean converting each backlog item into a tracker-native record with explicit tracker fields, not just leaving it as a documentation list.

In practice, that would require:

- Choosing which sections become Linear projects, epics, or plain issues.
- Turning each backlog ticket into a title plus structured description.
- Adding labels such as milestone, area, and type.
- Encoding dependencies in a form that Linear can represent.
- Deciding import order so prerequisite issues exist before dependent issues are linked.
- Normalizing ticket wording so descriptions are concise enough for a tracker but still preserve acceptance outcomes.

For this backlog specifically, the most sensible mapping would likely be:

- Each epic in this document becomes a Linear project, epic, or labeled grouping.
- Each `B-xxx` item becomes one Linear issue.
- Dependencies are carried over where the tracker supports them.
- Acceptance sections are included in each issue description.

That work is mostly formatting and tracker-shaping, not new product definition.