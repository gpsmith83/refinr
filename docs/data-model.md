# Refinr Backend Data Model

## Purpose

This document captures the backend domain model and persistence strategy for Refinr. It is a supporting document to [../PRD.md](../PRD.md).

## Data Model Goals

For MVP, the backend data model should be optimized for three needs:

- Durable workflow state across projects and requirements.
- Clear traceability from initial requirement to exported Linear issues.
- Event history that allows the system to explain how a requirement evolved over time.

The model should be relational at its core, with JSONB used selectively for structured but variable artifacts such as readiness state, summaries, and provider metadata.

## Modeling Principles

- Workspaces own projects.
- Projects own integrations and requirements.
- Requirements own refinement history and ticket candidates.
- Exports are append-only records of what was pushed downstream.
- Derived summaries should be stored, but source events must remain recoverable.

## Core Entity Groups

### Identity And Access

- User
- Workspace
- WorkspaceMember

Responsibilities:

- Represent authenticated users.
- Model workspace membership and roles.
- Scope project access and integration visibility.

Recommended notes:

- A user may belong to multiple workspaces.
- Workspace membership should support at least admin and member roles in MVP.

### Project And Integration Layer

- Project
- ProjectMember
- RepositoryConnection
- RepositoryContextSource
- RepositoryContextSnapshot
- LinearConnection

Responsibilities:

- Represent a Refinr project within a workspace.
- Store linked repository configuration.
- Store linked Linear destination configuration.
- Persist approved repository context sources and generated snapshots.

Recommended notes:

- A project belongs to one workspace.
- A project may have one active repository connection in MVP.
- A project may have one active Linear connection in MVP.
- Repository context snapshots should be versioned rather than overwritten.

### Requirement And Refinement Layer

- Requirement
- RequirementMessage
- RefinementSession
- PersonaInvocation
- RequirementSummarySnapshot
- ReadinessAssessment
- RequirementArtifact

Responsibilities:

- Store the initial requirement and current status.
- Preserve the question-and-answer conversation history.
- Capture session boundaries for major refinement passes.
- Track which personas were invoked, why, and what they contributed.
- Preserve summary snapshots and readiness state over time.

Recommended notes:

- A requirement belongs to one project.
- A requirement may have many messages.
- A requirement may have many refinement sessions.
- A refinement session may have many persona invocations.
- A requirement may have many summary snapshots and readiness assessments.

### Ticketization And Export Layer

- TicketCandidate
- TicketCandidateDependency
- ExportBatch
- ExportBatchItem
- LinearIssueMapping

Responsibilities:

- Represent proposed tickets before export.
- Preserve dependency relationships between ticket candidates.
- Record each export action as a batch.
- Record the per-ticket outcome of each export batch.
- Store created Linear issue identifiers and linkage back to source tickets.

Recommended notes:

- Ticket candidates should remain editable until exported.
- Export batches should be immutable audit records.
- One ticket candidate may map to zero or more export attempts over time.

### Integration And Provider Audit Layer

- AIProviderCall
- JobExecutionLog
- IntegrationEvent

Responsibilities:

- Track provider usage, latency, model choice, and outcome.
- Track worker job execution for key long-running flows.
- Track important integration lifecycle events such as repository sync and export attempts.

These records should support debugging, cost analysis, and trust-building without turning the MVP into an observability platform.

## Recommended Core Tables

The exact schema can evolve, but the MVP should expect something close to the following relational model:

- users
- workspaces
- workspace_members
- projects
- project_members
- repository_connections
- repository_context_sources
- repository_context_snapshots
- linear_connections
- requirements
- requirement_messages
- refinement_sessions
- persona_invocations
- requirement_summary_snapshots
- readiness_assessments
- requirement_artifacts
- ticket_candidates
- ticket_candidate_dependencies
- export_batches
- export_batch_items
- linear_issue_mappings
- ai_provider_calls
- job_execution_logs
- integration_events

## Key Entity Details

### Requirement

Suggested fields:

- id
- project_id
- title
- initial_prompt
- current_status
- current_stage
- created_by_user_id
- latest_summary_snapshot_id
- latest_readiness_assessment_id
- created_at
- updated_at

Purpose:

- This is the primary product object around which refinement happens.

### RequirementMessage

Suggested fields:

- id
- requirement_id
- refinement_session_id
- role
- persona_name nullable
- message_text
- message_metadata JSONB
- created_at

Purpose:

- Preserve the actual conversational and structured interaction history.

### PersonaInvocation

Suggested fields:

- id
- requirement_id
- refinement_session_id
- persona_name
- invocation_reason
- started_at
- completed_at
- contributed_dimensions JSONB
- result_summary JSONB

Purpose:

- Make orchestration inspectable and auditable.

### ReadinessAssessment

Suggested fields:

- id
- requirement_id
- refinement_session_id nullable
- total_score
- dimension_scores JSONB
- blocking_dimensions JSONB
- ticket_ready boolean
- override_applied boolean
- created_at

Purpose:

- Store the scored readiness state used for gating ticket generation.

### TicketCandidate

Suggested fields:

- id
- requirement_id
- title
- description
- acceptance_criteria JSONB or text
- scope_notes text nullable
- assumptions JSONB
- status
- export_eligibility_status
- ordering_index nullable
- created_at
- updated_at

Purpose:

- Represent a reviewable work item before it becomes a Linear issue.

### ExportBatch And ExportBatchItem

Suggested fields for export_batches:

- id
- requirement_id
- project_id
- triggered_by_user_id
- destination_metadata JSONB
- export_mode
- created_at

Suggested fields for export_batch_items:

- id
- export_batch_id
- ticket_candidate_id
- export_status
- failure_reason nullable
- linear_issue_identifier nullable
- created_at
- updated_at

Purpose:

- Separate the act of exporting from the ticket candidates themselves.
- Allow retries, partial failure handling, and immutable export history.

## Snapshot Vs Event Strategy

The MVP should store both snapshots and events.

Store as events:

- requirement messages
- persona invocations
- export attempts
- integration events

Store as snapshots:

- synthesized requirement summaries
- readiness assessments
- repository context snapshots

Why:

- Events preserve explainability and audit history.
- Snapshots keep the product fast and simple to render.

## Ownership And Cascade Rules

Recommended ownership rules:

- Deleting a workspace should delete projects and workspace-local data.
- Deleting a project should delete requirements and project-scoped refinement data.
- Export records should be soft-deleted at most, not hard-deleted, if audit needs apply.
- Integration credentials should be separable from domain records so they can be rotated safely.

For MVP, soft deletes should be used sparingly. Prefer explicit archival states unless there is a strong product need for reversible deletion.

## Multi-Tenancy Rules

The data model must enforce workspace isolation.

Practical requirements:

- Every project row is tied to a workspace.
- Every requirement row is tied transitively to a workspace through project ownership.
- Integration configuration must never be accessible across workspaces.
- Repository context snapshots and exported ticket records must remain workspace-scoped.

## JSONB Use Guidelines

JSONB should be used for:

- readiness dimension maps
- provider request metadata
- summary structures
- assumptions and constraint lists
- integration payload fragments worth retaining

JSONB should not be used as a substitute for core relational structure where filtering, joins, and ownership matter.

## Data Model Risks To Avoid

- Storing only the latest summary and losing refinement history.
- Hiding core relationships inside JSON blobs.
- Coupling ticket candidates directly to a single export attempt.
- Making provider-specific fields first-class across the entire schema.
- Failing to separate repository context snapshots from live repository configuration.