# Refinr MVP Acceptance Criteria

## Purpose

This document defines the acceptance criteria for the core MVP workflows in Refinr. It is the quality gate for implementation and should be used alongside [../PRD.md](../PRD.md) and [implementation-roadmap.md](implementation-roadmap.md).

The goal is to make the MVP testable in concrete terms rather than relying on general intent.

## Acceptance Criteria Principles

- Each workflow must be testable end to end.
- Acceptance criteria should describe observable system behavior.
- Criteria should focus on product outcomes, not internal implementation details.
- Failure handling and traceability are first-class parts of acceptance.

## Workflow 1: Workspace And Project Setup

### Acceptance Criteria

- A new user can sign in with GitHub OAuth.
- An authenticated user can create a workspace.
- A workspace member can create a project within that workspace.
- A project can store its name and basic metadata.
- The user can reach the project dashboard after project creation.
- Workspace and project data are isolated from other workspaces.
- Workspace and project ownership are persisted so later access checks behave consistently.

### Minimum Verification

- Sign in as a new user.
- Create a workspace.
- Create a project.
- Confirm the project appears on the dashboard.
- Confirm the created project remains available after reload or revisit.
- Confirm a different workspace user cannot access that project without membership.

## Workflow 2: Requirement Creation And Persistence

### Acceptance Criteria

- A project user can create a requirement from a short freeform prompt.
- A project user can optionally include context notes during creation.
- The requirement is persisted and visible after page refresh or later revisit.
- The requirement page shows the initial prompt and current status.
- A requirement is associated with the correct project and workspace.

### Minimum Verification

- Create a requirement such as "I want to track abandoned carts."
- Include optional context notes during creation.
- Reload the page and confirm the requirement still exists.
- Reopen the project and confirm the requirement is listed.

## Workflow 3: Guided Refinement Loop

### Acceptance Criteria

- The system can initiate a refinement session with a default persona.
- The system asks a clarifying question based on the requirement input.
- The user can answer in plain language.
- The system persists both the question and the answer.
- The system can continue the refinement loop with a follow-up question.
- The UI shows the active persona and current conversation history.
- Conversation history remains ordered correctly after reload or later revisit.

### Minimum Verification

- Open a requirement.
- Start refinement.
- Answer at least two rounds of questions.
- Refresh the page and confirm the conversation history remains intact.
- Confirm the message order remains stable after reload.

## Workflow 4: Summary And Readiness State

### Acceptance Criteria

- After each meaningful refinement answer, the system updates a requirement summary snapshot.
- The UI shows what is currently known about the requirement.
- The UI shows readiness dimensions as complete, partial, or missing.
- The readiness score is derived and visible, not hidden.
- The system can identify missing information preventing ticket generation.
- The latest summary and readiness state remain available after reload or later revisit.

### Minimum Verification

- Complete at least two refinement responses.
- Confirm the summary and readiness state change after each response.
- Confirm at least one missing dimension is called out explicitly when the requirement is not yet ready.
- Reload the requirement and confirm the latest summary and readiness state are still shown.

## Workflow 5: Persona Orchestration

### Acceptance Criteria

- The system can introduce a new persona based on defined orchestration rules.
- Persona control follows the hybrid model: the system recommends personas and the user can accept, skip, or manually request one where allowed.
- The UI shows which persona is active.
- The system explains why the new persona was introduced.
- Persona invocations are stored in refinement history.
- For non-trivial requirements, at least one specialist challenge persona can be introduced before ticket generation.
- The stored persona history remains reviewable after the active refinement turn completes.

### Minimum Verification

- Use a non-trivial requirement with technical or user-facing implications.
- Confirm that a specialist persona such as Senior Developer or UI Designer is invoked.
- Confirm that the invocation reason is visible.
- Reopen the requirement and confirm the persona invocation remains present in history.

## Workflow 6: Readiness Gate And Override

### Acceptance Criteria

- The system blocks ticket generation when blocking readiness dimensions remain insufficient.
- The UI explains why ticket generation is blocked.
- A user can explicitly override the gate.
- Override actions are persisted in refinement history.
- Tickets generated under override are marked accordingly.
- The blocked or overridden state is deterministically derived from the documented readiness rules.

### Minimum Verification

- Attempt ticket generation before the requirement is ready.
- Confirm the system blocks the action and explains why.
- Apply an override and confirm the override is recorded and reflected in downstream ticket state.
- Revisit the requirement and confirm the override history is still available.

## Workflow 7: Ticket Candidate Generation

### Acceptance Criteria

- A ticket-ready requirement can be decomposed into one or more ticket candidates.
- Each ticket candidate includes a title, description, and acceptance criteria.
- Each ticket candidate includes assumptions or equivalent execution guidance where needed.
- Ticket candidates preserve traceability to the source requirement.
- Ticket candidates can include dependencies or ordering hints.
- The default output model is flat, sibling issue candidates rather than a deep hierarchy.

### Minimum Verification

- Refine a requirement to readiness.
- Generate ticket candidates.
- Confirm multiple tickets appear where the requirement clearly decomposes into multiple implementation units.
- Inspect one ticket candidate and confirm it includes source traceability and acceptance content.

## Workflow 8: Ticket Review And Editing

### Acceptance Criteria

- A user can inspect ticket candidates individually.
- A user can edit ticket candidate content before export.
- A user can split a broad ticket into multiple candidates.
- A user can merge tickets that were over-split.
- A user can edit dependency or ordering information.
- A user can approve all ticket candidates or a subset.
- All edits remain linked to the originating requirement and candidate set.

### Minimum Verification

- Generate multiple ticket candidates.
- Edit one ticket.
- Split one ticket.
- Merge two tickets.
- Approve a subset for export.
- Reload the review view and confirm the edited ticket set remains intact.

## Workflow 9: Linear Export

### Acceptance Criteria

- A project can store a valid Linear connection.
- Each project exports to one configured Linear team or workflow destination in MVP.
- Approved ticket candidates can be exported to Linear.
- Each export action is recorded as an export batch.
- The system stores per-ticket export results.
- Returned Linear issue identifiers are persisted.
- Partial failure is visible and retryable.
- Successful exported tickets remain mapped to their source candidates across retries.

### Minimum Verification

- Connect a Linear destination.
- Export approved tickets.
- Confirm Linear issues are created.
- Simulate or trigger a partial failure and confirm retry behavior is available.
- Confirm successful issues are not duplicated when retrying only failed items.

## Workflow 10: Repository Context Ingestion

### Acceptance Criteria

- A project can connect a GitHub repository.
- The system can recommend likely context sources.
- A user can choose which context sources to include.
- The system creates a repository context snapshot from approved sources.
- Refinement can reference repository context without overriding direct user input.
- Context-derived outputs retain lightweight source citation.
- Repository context snapshots retain freshness or sync metadata that can be surfaced later.

### Minimum Verification

- Connect a GitHub repository.
- Select approved markdown or documentation files.
- Run context ingestion.
- Confirm a refinement session references ingested context and exposes the source citation.
- Confirm the snapshot exposes freshness or sync metadata after ingestion completes.

## Workflow 11: Failure Handling

### Acceptance Criteria

- AI provider failure does not corrupt requirement history.
- Repository sync failure does not destroy the last known good context snapshot.
- Linear export failure does not lose ticket candidate state.
- Job retries can recover from transient external errors where appropriate.
- The user sees actionable failure states rather than silent failure.
- Retryable errors are distinguishable from terminal failures in the user experience.

### Minimum Verification

- Simulate provider failure during refinement.
- Simulate repository ingestion failure.
- Simulate Linear export failure.
- Confirm that state remains recoverable and visible in each case.
- Confirm the UI indicates whether each failure can be retried or requires manual intervention.

## Workflow 12: Traceability And Auditability

### Acceptance Criteria

- A user can trace a ticket candidate back to its originating requirement.
- The system stores persona invocation history.
- The system stores readiness assessments over time.
- The system stores export history and resulting Linear mappings.
- Repository context snapshots are versioned rather than silently replaced.
- Full AI provider request and response payload history is retained for MVP auditability.
- Audit records remain linked to the originating requirement and project.

### Minimum Verification

- Generate a ticket candidate and inspect its origin linkage.
- Review prior readiness and persona history for the requirement.
- Export the ticket and confirm the downstream mapping is recorded.
- Confirm that provider call history for the requirement can be retrieved for audit purposes.
- Confirm repository snapshot history can be inspected without losing prior versions.

## Non-Functional Acceptance Gates

### Responsiveness

Acceptance criteria:

- A normal refinement turn should typically produce the next visible system response within 10 seconds under expected MVP conditions.
- The UI should expose an in-progress state when the system is waiting on longer-running operations.
- Long-running work should not leave the user in an ambiguous state.
- Measured responsiveness should be based on representative MVP conditions rather than idealized local-only timing.

Minimum verification:

- Measure several normal refinement turns under representative conditions.
- Confirm the typical visible response completes within 10 seconds.
- Confirm loading and in-progress states appear when responses are slower.
- Record enough representative runs to show the target is typical rather than a one-off best case.

### Reliability

Acceptance criteria:

- The MVP must handle common external failures gracefully, but it does not require an explicit uptime target at this stage.
- AI, repository, or Linear failures must not corrupt durable workflow state.
- Retryable failures must be surfaced clearly to the user.
- Recovery behavior should preserve the last known good state where external dependencies fail mid-flow.

Minimum verification:

- Simulate representative AI, repository, and Linear failures.
- Confirm state remains intact and retry paths are visible.
- Confirm the last known good requirement, ticket, or context state remains accessible after each failure.

### Security And Isolation

Acceptance criteria:

- Workspace data must remain isolated from other workspaces.
- Integration credentials must not be exposed in UI responses or ordinary logs.
- Session-based access control must be enforced on project and requirement resources.
- Authorization behavior should remain consistent after reload, revisit, and direct API access attempts.

Minimum verification:

- Attempt cross-workspace access with a different authenticated user.
- Inspect representative logs and API responses for credential leakage.
- Confirm unauthorized access is rejected for project-scoped resources.
- Attempt direct access to a project or requirement API outside the authorized workspace and confirm rejection.

### Auditability

Acceptance criteria:

- The system must retain persona invocation history, readiness history, repository context snapshot history, export history, and full provider payload history for MVP.
- Audit records must remain linked to the originating requirement and project.
- Audit data should be retrievable without relying on ordinary request logs as the source of truth.

Minimum verification:

- Inspect one requirement with completed refinement and export history.
- Confirm all required audit records are present and linked.
- Confirm provider payload history and repository snapshot history are retrievable through the intended audit path.

## MVP Release Gate

The MVP should not be considered release-ready until all of the following are true:

- Workflows 1 through 9 pass end-to-end.
- Repository context ingestion is functional for approved documents.
- Core failure handling is verified for AI, repository, and Linear integration paths.
- Traceability from requirement to exported Linear issue is demonstrably intact.
- Workspace isolation is verified.
- Non-functional acceptance gates pass for responsiveness, reliability handling, security, and auditability.

## Out-Of-Scope For MVP Acceptance

The following are explicitly not required for MVP acceptance:

- Real-time collaborative editing
- Multi-provider AI routing
- Full repository semantic indexing
- Non-GitHub repository providers
- Non-Linear issue tracker support
- Native mobile application support