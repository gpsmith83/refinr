# Refinr Implementation Roadmap

## Purpose

This document sequences the MVP delivery plan for Refinr. It is a supporting document to [../PRD.md](../PRD.md), [architecture.md](architecture.md), [mvp-stack.md](mvp-stack.md), and [data-model.md](data-model.md).

The roadmap is intentionally phase-based rather than date-based. It should guide execution order, milestone outcomes, and dependency management without assuming a fixed team size or calendar.

## Roadmap Principles

- Deliver a usable vertical slice early.
- Prioritize the refinement loop before advanced integrations.
- Keep infrastructure minimal until product value is demonstrated.
- Build replaceable adapters at integration boundaries from the start.
- Treat observability, retries, and auditability as hardening phases, not day-one blockers.

## MVP Milestones

### Milestone 0: Foundation

Goal:

- Establish the development baseline, core schema, and deployable application skeleton.

Primary outputs:

- Angular frontend shell
- Express API skeleton
- PostgreSQL with pgvector enabled
- Drizzle schema and migrations initialized
- Passport session auth with GitHub OAuth
- Docker Compose local environment for frontend, API, database, and worker
- Basic workspace and project creation flow

Exit criteria:

- Developers can run the full stack locally.
- Users can sign in and create a workspace and project.
- Core tables exist for workspaces, users, projects, requirements, and integrations.

### Milestone 1: Requirement Intake And Persistence

Goal:

- Create the first usable product workflow: entering and storing a requirement inside a project.

Primary outputs:

- Requirement creation UI
- Requirement detail page shell
- Requirement messages persisted in the backend
- Refinement session model in place
- Basic project dashboard listing requirements

Exit criteria:

- A user can create a requirement from a short prompt.
- The requirement is persisted and visible on revisit.
- A requirement page exists with conversation history and current state placeholders.

### Milestone 2: Guided Refinement Loop

Goal:

- Deliver the first end-to-end refinement interaction with one AI provider and one persona.

Primary outputs:

- AI provider gateway abstraction
- Initial Product Manager or Senior Project Manager persona flow
- Question-answer loop in the UI
- Requirement summary snapshot generation
- Basic readiness assessment computation

Exit criteria:

- A user can answer a system question and receive the next guided question.
- The system updates the summary and readiness state after each response.
- The requirement page shows current known state and missing information.

### Milestone 3: Persona Orchestration And Readiness Gate

Goal:

- Move from simple Q&A to rule-driven multi-persona refinement.

Primary outputs:

- Persona invocation records
- Orchestration rules for default persona progression
- Senior Developer, UI Designer, and Reality Checker entry triggers
- Readiness rubric enforcement
- Override flow for insufficiently refined requirements

Exit criteria:

- The system can introduce a new persona for a clear reason.
- Readiness dimensions are visible in the UI.
- Ticket generation remains blocked until readiness rules pass or the user overrides them.

### Milestone 4: Ticketization And Review

Goal:

- Convert refined requirements into editable ticket candidates.

Primary outputs:

- Ticket candidate generation pipeline
- Ticket review UI
- Split and merge ticket actions
- Dependency editing and ordering support
- Export eligibility state on ticket candidates

Exit criteria:

- A refined requirement can produce multiple ticket candidates.
- A user can review, edit, split, merge, and approve tickets.
- Ticket candidates preserve traceability to the source requirement and readiness state.

### Milestone 5: Linear Export

Goal:

- Complete the first production-critical external integration by exporting approved tickets to Linear.

Primary outputs:

- Linear connection setup
- Export batch model and audit history
- Linear issue creation adapter
- Per-ticket success and failure tracking
- Retryable export flow

Exit criteria:

- A user can connect a Linear destination.
- Approved ticket candidates can be pushed to Linear.
- Export results are visible and stored.
- Partial export failure is handled without data loss.

### Milestone 6: Repository Context Ingestion

Goal:

- Ground refinement in project-specific repository context.

Primary outputs:

- GitHub repository connection
- Context source selection flow
- Repository context snapshot pipeline
- Citation-aware context usage in summaries and ticket generation
- On-demand context refresh

Exit criteria:

- A user can connect a GitHub repository.
- The system can ingest approved context sources and create a project context snapshot.
- Refinement sessions can use repository context without losing direct user intent.

### Milestone 7: Hardening And Alpha Readiness

Goal:

- Make the MVP stable enough for real project usage.

Primary outputs:

- pg-boss worker retries and failure recovery
- Improved logging and request correlation
- Basic admin and diagnostics surfaces
- Session and permission hardening
- Export and repository sync error handling improvements

Exit criteria:

- Critical user flows recover cleanly from external failure.
- Logs and job traces are sufficient to debug production issues.
- The product can support a controlled alpha without manual intervention for common failure modes.

## Recommended Delivery Order Within Each Milestone

Within each milestone, work should generally proceed in this order:

1. Data model and API contract
2. Backend domain logic
3. Background job handling if required
4. UI implementation
5. Verification and error handling

This reduces rework and keeps the frontend aligned with stable domain behavior.

## Cross-Cutting Tracks

These tracks should advance throughout the roadmap rather than being postponed entirely.

### Product Quality Track

- Improve prompt quality and persona behavior.
- Refine readiness scoring calibration.
- Tighten ticket quality and acceptance criteria generation.

### Security Track

- Protect sessions and integration credentials.
- Enforce workspace isolation.
- Minimize sensitive payload logging.

### Observability Track

- Add structured logs early.
- Introduce request IDs and job IDs from the start.
- Expand metrics and tracing as external integrations become critical.

## Suggested MVP Release Criteria

Refinr should be considered ready for MVP release when all of the following are true:

- A user can sign in, create a project, and connect Linear.
- A user can create a requirement and complete a multi-step refinement session.
- The system can invoke multiple personas according to defined rules.
- Readiness scoring is visible and enforced.
- The system can generate editable ticket candidates.
- Approved tickets can be exported to Linear with auditable results.
- Basic repository context ingestion is working for approved documents.
- External integration failure does not corrupt requirement or export state.

## Post-MVP Opportunities

The most likely post-MVP expansions are:

- Multiple AI providers and routing strategies
- Self-hosted or open model support
- More issue tracker adapters beyond Linear
- Stronger repository context retrieval and indexing
- Team collaboration and approval workflows
- Cross-requirement planning and dependency visualization