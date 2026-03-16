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

## Epic 0: Foundation

Aligned roadmap milestone: Milestone 0

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

Dependencies:

- B-001
- B-003
- B-004

Acceptance:

- An authenticated user can create a new workspace from the product UI.
- The same user can create a project within that workspace.
- The created project appears on the project dashboard for that workspace.
- Workspace and project ownership are persisted correctly.

Split guidance:

- If this work expands during planning, split into separate tickets for workspace domain APIs, project domain APIs, and combined creation UI.

### B-006 Create Docker Compose local stack

Value:

- Makes the product runnable consistently by the team.

Scope:

- Create a local stack for frontend, API, and database.
- Document local startup requirements.

Dependencies:

- B-001
- B-002
- B-003

Acceptance:

- Frontend, API, and database services can be started locally from one documented workflow.
- The documented startup path is sufficient for another developer to reach a running local stack.

## Epic 1: Requirement Intake And Persistence

Aligned roadmap milestone: Milestone 1

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

### B-201 Implement AI provider gateway abstraction

Value:

- Creates a replaceable integration boundary around commercial AI services.

Scope:

- Define provider interface.
- Implement the first commercial provider adapter.
- Capture usage and outcome metadata.

Dependencies:

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

## Epic 3: Persona Orchestration And Readiness Gate

Aligned roadmap milestone: Milestone 3

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
- B-304

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

## Epic 4: Ticketization And Review

Aligned roadmap milestone: Milestone 4

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

## Epic 5: Linear Export

Aligned roadmap milestone: Milestone 5

### B-501 Implement Linear connection domain and validation

Value:

- Enables the first production-critical downstream integration.

Scope:

- Configure and persist one Linear destination per project.
- Validate connection credentials and target team or workflow.

Dependencies:

- B-005

Acceptance:

- A project can store one Linear destination for MVP use.
- The stored Linear connection is validated against the configured credentials and target workflow.
- Invalid connection details are rejected rather than silently stored.

### B-502 Build Linear connection UI

Value:

- Gives users a usable path to configure export destinations.

Scope:

- Add project UI for connecting and validating a Linear destination.

Dependencies:

- B-501

Acceptance:

- A project user can enter and save one Linear destination through the UI.
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

## Epic 6: Repository Context Ingestion

Aligned roadmap milestone: Milestone 6

### B-601 Implement GitHub repository connection domain

Value:

- Connects refinement to project-specific source context.

Scope:

- Add GitHub repository connection for a project.
- Persist repository metadata and access configuration.

Dependencies:

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

## Epic 7: Hardening And Alpha Readiness

Aligned roadmap milestone: Milestone 7

### B-701 Implement worker retries and recovery rules

Value:

- Makes background workflows resilient enough for alpha use.

Scope:

- Configure retries for ingestion and export jobs.
- Record retry outcomes and terminal failures.

Dependencies:

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

## Backlog Notes

- This backlog is intentionally initial, not exhaustive.
- Tickets should be refined further before implementation if hidden scope or cross-cutting security concerns emerge.
- Tickets that grow beyond normal implementation size should be split further rather than carried forward as oversized stories.

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