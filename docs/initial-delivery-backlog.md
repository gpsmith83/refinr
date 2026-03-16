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
- Acceptance criteria here are intentionally concise and should be expanded in the tracker if needed.
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

- The Angular app runs locally.
- The app has navigable placeholder routes for the core product areas.

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

- The API runs locally.
- A health endpoint responds successfully.

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

- Database migrations run successfully.
- Baseline tables exist and are queryable.

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

- A user can sign in with GitHub OAuth.
- Authenticated sessions persist across requests.

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

- An authenticated user can create a workspace and a project.
- The project appears on the project dashboard.

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

- The core stack can be launched locally from a single documented workflow.

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

- Requirements can be created and retrieved within a project.
- Requirements are workspace-scoped through project ownership.

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

- A user can create a requirement from the project interface.
- The created requirement appears immediately in the UI.

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

- Project requirements are listed and link to requirement detail views.

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

- A requirement detail page exists and loads persisted requirement data.

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

- Requirement messages can be stored and retrieved in order for a given requirement.

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

- The backend can call the configured provider through an internal abstraction.

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

- A user can start refinement from a requirement page.
- The system produces the first guided question.

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

- Questions and answers remain visible after page refresh.

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

- Summary state updates after meaningful user responses.

### B-205 Compute and display basic readiness state

Value:

- Makes refinement progress visible and creates the basis for gating.

Scope:

- Compute initial readiness dimension state.
- Render readiness score and missing information in the UI.

Dependencies:

- B-204

Acceptance:

- Readiness dimensions are visible as complete, partial, or missing.

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

- Persona invocations can be stored and reviewed for a requirement.

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

- The system can recommend the next persona using defined rules.

### B-303 Implement specialist persona trigger rules

Value:

- Brings technical, UX, and edge-case challenge into refinement at the right time.

Scope:

- Add trigger logic for Senior Developer, UI Designer, and Reality Checker.

Dependencies:

- B-302

Acceptance:

- Non-trivial requirements can trigger specialist personas for clear reasons.

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

- The user can accept or skip a suggested persona and see why it was suggested.

### B-305 Enforce readiness gate and override flow

Value:

- Prevents premature ticket generation while still allowing explicit override.

Scope:

- Enforce blocking readiness dimensions.
- Add override capture and downstream override marking.

Dependencies:

- B-205
- B-304

Acceptance:

- Ticket generation is blocked when readiness is insufficient unless the user overrides it.

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

- Ticket candidates can be stored and retrieved for a requirement.

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

- A ticket-ready requirement can produce one or more ticket candidates.

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

- Users can inspect and approve individual ticket candidates.

### B-404 Implement split and merge ticket actions

Value:

- Supports backlog shaping without rerunning the full refinement process.

Scope:

- Split over-broad ticket candidates.
- Merge over-split ticket candidates.

Dependencies:

- B-403

Acceptance:

- Users can split one ticket into multiple candidates and merge related candidates.

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

- Users can define or edit dependencies between ticket candidates.

## Epic 5: Linear Export

Aligned roadmap milestone: Milestone 5

### B-501 Implement Linear connection setup

Value:

- Enables the first production-critical downstream integration.

Scope:

- Configure and persist one Linear destination per project.
- Validate connection credentials and target team or workflow.

Dependencies:

- B-005

Acceptance:

- A project can store and validate a Linear connection.

### B-502 Implement export batch model and APIs

Value:

- Creates auditable export behavior instead of direct fire-and-forget integration.

Scope:

- Add export batches and export batch items.
- Support export initiation from approved ticket candidates.

Dependencies:

- B-401
- B-501

Acceptance:

- Export actions are recorded as batches with per-ticket status.

### B-503 Implement Linear issue creation adapter

Value:

- Completes the core backlog delivery path from Refinr to Linear.

Scope:

- Create Linear issues from approved ticket candidates.
- Persist returned downstream identifiers.

Dependencies:

- B-502

Acceptance:

- Approved ticket candidates can be exported to Linear and mapped back to created issues.

### B-504 Surface export results in the UI

Value:

- Makes export behavior understandable and recoverable for users.

Scope:

- Show per-ticket export success and failure.
- Show downstream issue identifiers.

Dependencies:

- B-503

Acceptance:

- Users can see export results for each ticket candidate.

### B-505 Implement retryable partial export handling

Value:

- Prevents export failures from forcing manual cleanup or data loss.

Scope:

- Retry failed export items safely.
- Preserve successful mappings during partial failures.

Dependencies:

- B-502
- B-503

Acceptance:

- Partial export failures are visible and retryable without duplicating successful issues.

## Epic 6: Repository Context Ingestion

Aligned roadmap milestone: Milestone 6

### B-601 Implement GitHub repository connection

Value:

- Connects refinement to project-specific source context.

Scope:

- Add GitHub repository connection for a project.
- Persist repository metadata and access configuration.

Dependencies:

- B-004
- B-005

Acceptance:

- A project can connect a GitHub repository.

### B-602 Build context source recommendation and selection flow

Value:

- Keeps repository grounding selective and user-controlled.

Scope:

- Recommend likely documentation sources.
- Allow user selection and exclusion of context sources.

Dependencies:

- B-601

Acceptance:

- A user can choose which repository context sources are included.

### B-603 Implement repository context ingestion job pipeline

Value:

- Creates reusable project context snapshots for refinement.

Scope:

- Fetch approved context sources.
- Parse documents and create context snapshots.

Dependencies:

- B-602

Acceptance:

- The system can ingest approved context sources into a stored snapshot.

### B-604 Persist citations and context freshness metadata

Value:

- Makes context usage traceable and trustworthy.

Scope:

- Store source citations.
- Store snapshot version or sync metadata.

Dependencies:

- B-603

Acceptance:

- Context snapshots retain source citations and freshness metadata.

### B-605 Apply repository context in summaries and ticket generation

Value:

- Improves refinement quality by grounding outputs in project knowledge.

Scope:

- Inject repository context into summary and ticket generation flows.
- Preserve user-answer priority over conflicting repository context.

Dependencies:

- B-204
- B-402
- B-604

Acceptance:

- Refinement outputs can reference repository context while preserving direct user intent.

### B-606 Add on-demand repository context refresh

Value:

- Prevents context from silently drifting stale during product use.

Scope:

- Trigger context refresh.
- Show latest snapshot freshness in the UI.

Dependencies:

- B-603

Acceptance:

- Users can refresh project context and see current freshness state.

## Epic 7: Hardening And Alpha Readiness

Aligned roadmap milestone: Milestone 7

### B-701 Implement worker retries and recovery rules

Value:

- Makes background workflows resilient enough for alpha use.

Scope:

- Configure retries for ingestion and export jobs.
- Record retry outcomes and terminal failures.

Dependencies:

- B-505
- B-603

Acceptance:

- Retryable background failures recover cleanly or surface actionable terminal errors.

### B-702 Add request and job correlation logging

Value:

- Makes the system diagnosable under real usage.

Scope:

- Add structured logs with request IDs and job IDs.
- Propagate correlation IDs across API and worker flows.

Dependencies:

- B-002

Acceptance:

- Core flows can be traced across API and worker execution via shared identifiers.

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

- Cross-workspace access is rejected for project and requirement resources.

### B-704 Implement explicit failure-state UX for external dependency errors

Value:

- Prevents silent failure and reduces user confusion in critical flows.

Scope:

- Show actionable error states for AI, repository, and Linear failures.
- Distinguish retryable from terminal failures.

Dependencies:

- B-202
- B-503
- B-603

Acceptance:

- Users see meaningful failure states for core external integration errors.

### B-705 Implement audit retrieval for refinement and export history

Value:

- Supports traceability, trust, and post-failure investigation.

Scope:

- Expose persona history, readiness history, export history, and repository snapshot history for a requirement.

Dependencies:

- B-301
- B-502
- B-604

Acceptance:

- A completed requirement exposes audit history across refinement and export activities.

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

- Provider payload history is stored and retrievable for a requirement.
- Ordinary logs do not expose raw provider payloads.

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

- Typical refinement turns complete within the documented 10-second target under representative MVP conditions.

## Backlog Notes

- This backlog is intentionally initial, not exhaustive.
- Tickets should be refined further before implementation if hidden scope or cross-cutting security concerns emerge.
- Tickets that grow beyond normal implementation size should be split further rather than carried forward as oversized stories.