# Product Requirements Document: Refinr

## Document Status

- Status: Draft v0.2
- Date: 2026-03-16
- Product: Refinr
- Owner: TBD

## Document Structure

This file is the core product requirements document for Refinr.

Implementation-facing detail has been split into supporting documents:

- [docs/README.md](docs/README.md)
- [docs/architecture.md](docs/architecture.md)
- [docs/mvp-stack.md](docs/mvp-stack.md)
- [docs/data-model.md](docs/data-model.md)

## Executive Summary

Refinr is a web-based product definition and backlog refinement tool for product managers and product owners. A user starts with a simple requirement such as "I want to track abandoned carts," and Refinr uses AI services to drive an iterative discovery process until the requirement is decomposed into implementation-ready tickets.

The core value is not content editing. It is structured requirement elicitation before engineering is involved. Refinr will ask clarifying questions, introduce the right specialist personas at the right time, surface gaps and edge cases, and convert the resulting understanding into actionable tickets that can be pushed to an associated Linear board.

Each project in Refinr will have two important external anchors:

- An associated git repository that provides project context for the agents.
- An associated Linear workspace and board where approved tickets are created and managed.

## Product Vision

Refinr becomes the system product teams use to turn ambiguous product intent into a fully refined, cross-functionally challenged, engineering-ready task space.

The long-term promise is simple: engineering should not be the first place where requirements become concrete.

## Problem Statement

Product ideas often begin as vague outcomes, partial assumptions, or stakeholder requests. Product managers and owners are expected to transform these into clear requirements, but that process is usually fragmented.

Today, teams often rely on some combination of:

- Ad hoc conversations in meetings or chat.
- Static docs that go stale quickly.
- Generic AI chat that lacks structure, memory, and role discipline.
- Manual backlog creation after requirements are already partially lost.

This creates predictable failure modes:

- Important questions are not asked early enough.
- Edge cases are discovered by engineering instead of product.
- UI, technical, delivery, and quality concerns are introduced too late.
- Tickets are created before scope boundaries are actually clear.
- Backlogs become incomplete, inconsistent, or dependent on tribal knowledge.

Product teams need a structured refinement environment that can interrogate a requirement from multiple specialist perspectives before any implementation work begins.

## Opportunity

There is a meaningful wedge between lightweight note-taking and full product delivery tooling. Refinr can own the pre-engineering refinement phase: the stage where an idea becomes a plan.

The differentiation is not just AI generation. The differentiation is orchestration:

- Asking the next best question.
- Bringing in the right persona for the current maturity of the requirement.
- Using repository context and prior project knowledge to ground refinement.
- Producing tickets only when a sufficient depth threshold has been met.

If executed well, Refinr can become the bridge between product discovery and execution systems like Linear.

## Target Users

### Primary User

Product managers and product owners responsible for turning business needs into actionable delivery work.

### Secondary Users

- Founders operating as product leads.
- Delivery managers or project managers supporting planning.
- Small product teams that need more rigor before engineering handoff.

### Tertiary Stakeholders

- Engineering managers who receive better-defined tickets.
- Designers who want earlier involvement in ambiguous work.
- Leadership teams that want traceable requirement evolution.

## Jobs To Be Done

When I have a high-level product request, I want the system to ask the right questions until the scope is clear, so I can turn vague intent into implementation-ready work.

When a requirement has hidden complexity, I want specialist perspectives to challenge it, so edge cases and missing decisions are discovered before engineering starts.

When I am ready to execute, I want the refined work broken into clear tickets and pushed into Linear, so my delivery workflow starts with usable backlog items instead of rough notes.

When my project already has documentation or code context, I want the system to use that context during refinement, so the output reflects the actual product environment.

## Product Principles

- Interrogate ambiguity before creating tickets.
- Introduce specialist personas only when they add signal.
- Preserve traceability from initial idea to final ticket.
- Make refinement state explicit and inspectable.
- Prefer structured questioning over one-shot generation.
- Ensure backlog output is reviewable before sync to Linear.

## Core Concept

Refinr is a staged refinement engine.

The user begins with a broad requirement. Refinr then moves that requirement through a sequence of refinement states. At each state, it can invoke one or more AI personas to deepen, challenge, or operationalize the requirement.

Example:

1. User enters: "I want to track abandoned carts."
2. A high-level product or project management persona explores goals, definitions, business triggers, affected users, and success criteria.
3. As the requirement becomes clearer, technical and design personas are brought in where needed.
4. Before ticket creation, a "three amigos" style review challenges the requirement from product, engineering, and design or quality perspectives.
5. Refinr groups the work into ticket candidates and pushes approved tickets to Linear.

## Persona Strategy

Refinr should support persona-driven refinement using agent definitions selected from the Agency Agents repository. Personas are not decorative. They represent structured lenses and workflows.

Initial personas to support or emulate in the workflow:

- Product Manager: owns product framing, goals, tradeoffs, and problem definition.
- Senior Project Manager: converts broad requirements into concrete scope and task structure.
- Senior Developer: challenges technical feasibility, dependencies, data requirements, and implementation assumptions.
- UI Designer: identifies UX implications, interaction requirements, states, and usability gaps.
- Reality Checker: pressure-tests readiness, completeness, and edge cases before ticket creation.

Additional personas may be introduced later depending on domain:

- UX Researcher
- Software Architect
- Technical Writer
- Accessibility Auditor
- Security Engineer
- Workflow Architect

## MVP Persona Orchestration Rules

For MVP, persona orchestration should be rule-driven, explainable, and constrained. Refinr should not behave like an unrestricted multi-agent swarm.

The system should introduce personas sequentially based on requirement state, missing readiness dimensions, and requirement type.

### Default Persona Order

The default orchestration path should be:

1. Product Manager or Senior Project Manager for initial discovery.
2. Senior Project Manager for decomposition when the requirement begins to stabilize.
3. Specialist personas only when triggered by gaps or scope signals.
4. Reality Checker as a final challenge persona before ticket generation for non-trivial requirements.

### Persona Entry Triggers

For MVP, personas should be invoked by clear triggers.

Recommended triggers:

- Product Manager: default starting persona for ambiguous product intent.
- Senior Project Manager: requirement is ready to be decomposed into workstreams or tickets.
- Senior Developer: technical context, dependencies, integrations, data, permissions, or implementation constraints are unclear.
- UI Designer: the requirement changes user-facing behavior, introduces a new flow, or depends on interface states.
- Reality Checker: edge-case coverage is weak, assumptions remain unchallenged, or the system is approaching ticket generation.
- UX Researcher: user behavior, segmentation, or problem validation remains unclear.
- Software Architect: the requirement spans multiple systems or carries architectural tradeoffs.

### Persona Exit Rules

Personas should not remain active indefinitely.

A persona should be considered complete for the current session when:

- Its targeted readiness dimension reaches sufficient coverage.
- It has no additional high-value questions.
- Another persona has become the highest-signal next contributor.

### Orchestration Constraints

To keep the workflow understandable in MVP, Refinr should apply these limits:

- Only one active questioning persona at a time.
- Maximum of three specialist personas in a single refinement pass unless the user explicitly expands scope.
- Persona changes must be announced with a clear reason.
- The system should prefer reusing an already involved persona before introducing a new one.

### User Control Rules

Users should be able to influence orchestration without having to manage it manually.

MVP controls should include:

- Accept the suggested next persona.
- Skip a suggested persona.
- Manually request a specific persona.
- End questioning and move to review if readiness allows.

The system should remain responsible for recommendations, but the user should retain final control over progression.

### Three-Amigos Rule

For non-trivial requirements, ticket generation should normally require challenge from at least three perspectives before export readiness:

- Product or project framing
- Technical feasibility
- UX, design, or quality challenge

In many cases this will map to Senior Project Manager, Senior Developer, and either UI Designer or Reality Checker.

### Escalation Rules

Refinr should escalate from a simple refinement loop to a broader challenge pattern when:

- The requirement touches multiple systems.
- Multiple readiness dimensions remain partial after two rounds of questioning.
- Different personas surface conflicting assumptions.
- The requirement would otherwise produce more than three issues.

### Orchestration Transparency

The system should keep an explicit orchestration log showing:

- Which personas were invoked
- Why they were invoked
- Which dimensions they contributed to
- What decisions or unresolved questions remain after their involvement

This log should be user-visible and stored in refinement history.

## Refinement Lifecycle

### Stage 1: Intake

The user creates a project or selects an existing project, connects the relevant git repository and Linear board, and submits an initial requirement or product objective.

### Stage 2: High-Level Discovery

Refinr uses a high-level persona, likely Product Manager or Senior Project Manager, to clarify:

- Business goal
- user problem
- target personas
- success metrics
- constraints
- scope boundaries
- assumptions
- known unknowns

### Stage 3: Structured Deepening

Refinr asks follow-up questions iteratively until the requirement reaches a defined sufficiency threshold. The system should decide whether more questions are needed based on missing dimensions, not a fixed number of prompts.

### Stage 4: Specialist Challenges

Refinr invokes additional personas as needed, for example:

- Senior Developer for event design, data models, integration concerns, and technical constraints.
- UI Designer for screens, user flows, and state transitions.
- Reality Checker for exception paths, operational gaps, and unresolved ambiguity.

### Stage 5: Ticketization

The system groups the refined requirement into candidate tickets with titles, descriptions, acceptance criteria, dependencies, and optional estimates or labels.

### Stage 6: Review And Approval

The product manager or owner reviews the proposed tickets, edits them if needed, and approves the push to Linear.

### Stage 7: Sync To Linear

Approved tickets are created in the associated Linear board with project-specific metadata.

## Definition Of Done For Refinement

A requirement is considered sufficiently refined for ticket creation when:

- The problem and business outcome are clear.
- The target users or actors are identified.
- The primary workflow is understood.
- Important edge cases have been surfaced.
- Open technical assumptions are called out.
- UI and interaction implications are identified when relevant.
- Tickets can be written with acceptance criteria that a delivery team can act on.

Refinr should not create final tickets until this threshold is met or the user explicitly overrides the threshold.

## MVP Readiness Rubric

For MVP, Refinr should implement a simple, explainable readiness rubric that determines whether a requirement is ready for ticket generation.

The goal of the rubric is not perfect certainty. The goal is to prevent obviously premature ticket creation while keeping the workflow moving.

### Readiness Dimensions

Each requirement is scored across the following dimensions:

- Problem clarity: Is the underlying business or user problem clearly stated?
- Outcome clarity: Is the intended outcome or success condition defined?
- User and actor definition: Are the users, stakeholders, or systems involved identified?
- Workflow definition: Is the primary workflow or behavior path described?
- Scope boundaries: Are in-scope and out-of-scope boundaries reasonably clear?
- Edge-case coverage: Have important exception paths or ambiguous conditions been surfaced?
- Technical context: Are material technical constraints, dependencies, or unknowns identified?
- UX impact: Are user-facing states, flows, or interface implications captured when relevant?
- Ticketability: Can the work be decomposed into actionable tickets with acceptance criteria?

### Scoring Model

Each dimension is scored on a 3-point scale:

- 0: Missing. The dimension is not understood well enough to support ticket creation.
- 1: Partial. Some information exists, but meaningful ambiguity remains.
- 2: Sufficient. The dimension is clear enough for MVP-level ticket generation.

Maximum score: 18

### Ticket-Ready Threshold

A requirement is considered ticket-ready in MVP when all of the following are true:

- Total readiness score is at least 14 out of 18.
- No critical dimension remains at 0.
- Ticketability is scored 2.
- Problem clarity is scored 2.
- Outcome clarity is scored 2.
- At least one challenge persona beyond the initial discovery persona has participated when the requirement is non-trivial.

### Critical Dimensions

The following dimensions are blocking for ticket generation and cannot remain at 0 unless the user explicitly overrides the gate:

- Problem clarity
- Outcome clarity
- Workflow definition
- Ticketability

### Trivial Vs Non-Trivial Requirements

For MVP, Refinr should classify a requirement as non-trivial if any of the following are true:

- More than one user or system actor is involved.
- The requirement affects an existing product workflow.
- The requirement has user-facing behavior changes.
- The requirement depends on analytics, integrations, permissions, or data model changes.
- The initial requirement statement is too broad to map directly to one ticket.

Non-trivial requirements should trigger at least one specialist challenge persona before ticket generation.

### Override Policy

Users may override the readiness gate, but the override must be explicit.

When a user overrides the gate, Refinr should:

- Show which dimensions remain weak.
- Mark the exported tickets as user-forced or incomplete.
- Preserve the override event in refinement history.
- Warn that the resulting tickets may require downstream clarification.

### Product Behavior When Not Ready

If the requirement is not ready for ticket generation, Refinr should not simply block the user. It should identify the weakest dimensions and ask targeted follow-up questions.

Examples:

- If problem clarity is weak, ask about the underlying business pain or user problem.
- If workflow definition is weak, ask the user to describe the expected journey or event sequence.
- If technical context is weak, bring in a Senior Developer persona.
- If UX impact is weak and the feature is user-facing, bring in a UI Designer persona.
- If edge-case coverage is weak, invoke Reality Checker.

### Readiness Output In The UI

The readiness model should be visible to the user as a simple checklist or scorecard, not a hidden system score.

The UI should show:

- Current readiness score.
- Which dimensions are complete, partial, or missing.
- Which persona last contributed to each dimension, where applicable.
- What still needs to be answered before ticket generation.

### Why This Rubric Fits MVP

This rubric is intentionally lightweight:

- It is simple enough to implement without complex evaluation infrastructure.
- It is explainable to users.
- It provides a concrete readiness gate before Linear issue creation.
- It gives the persona orchestration logic a practical decision framework.

## Goals

### Business Goals

- Become the preferred pre-engineering refinement layer for product teams.
- Create a strong workflow wedge between idea capture and delivery tools.
- Drive recurring usage at the project and backlog level.
- Increase stickiness through project context and Linear integration.

### User Goals

- Reduce time required to turn a vague idea into a usable backlog.
- Improve requirement completeness before engineering handoff.
- Reduce rework caused by missing edge cases or ambiguous tickets.
- Create better cross-functional thinking without requiring live meetings.

## Non-Goals For MVP

- Full roadmap management across the entire product lifecycle.
- Real-time team collaboration comparable to Notion, Jira, or Linear.
- Automatic implementation planning directly in code repositories.
- Fully autonomous product decisions without user review.
- Broad support for all project management tools at launch.

## MVP Scope

### In Scope

- Web application for requirement intake and refinement.
- Project setup with associated git repository and Linear board.
- AI-provider-backed questioning workflow using API calls to external AI services.
- Staged persona orchestration based on refinement state.
- Conversation and refinement history per requirement.
- Ticket candidate generation from refined requirements.
- Review and approval flow before ticket export.
- Push approved tickets to Linear.
- Project context ingestion from repository-linked artifacts.

### Nice To Have If Low Cost

- Suggested persona stacks by requirement type.
- Reusable refinement templates for common work types.
- Duplicate or branch a requirement to explore alternate scope choices.
- Confidence score or refinement completeness score.

### Out Of Scope

- Bidirectional Linear sync beyond initial ticket creation.
- Fine-grained sprint planning and capacity management.
- Native mobile application.
- Automatic code generation or pull request creation.
- Multi-org enterprise governance in the first release.

## Key User Stories

- As a product owner, I can enter a rough requirement in plain language and have the system start a structured clarification process.
- As a product manager, I can connect a git repository so the refinement engine has product and technical context.
- As a product manager, I can connect a Linear board so approved tickets can be created without manual copy and paste.
- As a user, I can see which persona is currently active and why it has been introduced.
- As a user, I can answer questions iteratively rather than writing a full spec upfront.
- As a user, I can review ticket candidates before they are created in Linear.
- As a user, I can trace a created ticket back to the discussion and decisions that produced it.

## User Experience Summary

The product should feel like an intelligent refinement workspace, not a generic chatbot.

The interface should make three things clear at all times:

- What is currently known.
- What is still missing.
- Which persona is asking or challenging the requirement right now.

Core flow:

1. Create or select a project.
2. Connect git repository and Linear board.
3. Enter a high-level requirement.
4. Answer guided questions from an initial persona.
5. Watch the system introduce additional personas as needed.
6. Review the emerging requirement summary and ticket decomposition.
7. Approve ticket creation and push to Linear.

## MVP UI And User Flow

For MVP, the interface should optimize for clarity, momentum, and trust. The product should feel like a guided refinement console, not a document editor and not an open-ended chat screen.

### Primary Navigation Model

The MVP application should be organized around three primary levels:

- Workspace level: shows projects the user can access.
- Project level: shows linked repository, linked Linear destination, active requirements, and recent refinement activity.
- Requirement level: shows the full refinement experience for a single requirement.

### Core Requirement Screen

The requirement screen should be the main product surface. It should contain four persistent regions.

#### 1. Requirement Header

The header should show:

- Requirement title or initial user statement.
- Current readiness status.
- Current refinement stage.
- Linked project context status.
- Primary actions such as continue refinement, review tickets, or push to Linear.

#### 2. Guided Conversation Panel

This is the main working area where the active persona asks questions and the user responds.

The panel should:

- Show the active persona clearly.
- Distinguish system questions from user answers.
- Group related questions when possible.
- Allow concise answer entry without requiring formal formatting.
- Preserve the conversational history for traceability.

This panel should feel structured, not like an infinite chat feed. Questions should be tied to missing readiness dimensions where possible.

#### 3. Refinement State Panel

This panel should summarize the current understanding of the requirement in real time.

It should show:

- Problem summary.
- Intended outcome.
- Users or actors.
- Workflow summary.
- Constraints and assumptions.
- Open questions.
- Edge cases discovered so far.

This panel gives the user a live synthesis of what the system believes is true.

#### 4. Readiness And Ticket Panel

This panel should show:

- Readiness score.
- Readiness dimensions and their status.
- Missing information blocking ticket generation.
- Candidate tickets once ticketization begins.
- Dependencies or sequencing hints when present.

This is the bridge from discovery to execution.

### Project Setup Flow

The first-time project setup flow should be short and explicit.

Steps:

1. User names the project.
2. User links a git repository.
3. User authenticates to Linear.
4. User selects destination workspace, team, and board or project mapping.
5. User optionally selects default persona stack and project metadata.

The setup flow should end on the project dashboard with a clear call to create the first requirement.

### Requirement Creation Flow

When creating a requirement, the user should not be forced into a large form.

MVP creation flow:

1. User clicks create requirement.
2. User enters a short freeform statement.
3. User optionally adds context notes, links, or constraints.
4. User submits.
5. Refinr immediately enters guided discovery with an initial persona.

The system should optimize for low-friction entry and defer structure to the refinement engine.

### Guided Refinement Flow

The refinement flow should feel like progressive narrowing.

Expected behavior:

- Start with one high-level persona.
- Ask one focused question or one grouped set of related questions at a time.
- Update the synthesized requirement state after each meaningful answer.
- Introduce additional personas only when triggered by weak readiness dimensions or clear domain needs.
- Keep showing the user why a new persona was brought in.

Persona transitions should be visible and justified, for example:

- "Senior Developer joined because technical dependencies remain unclear."
- "UI Designer joined because this requirement changes user-facing behavior."
- "Reality Checker joined because edge-case coverage is still weak."

### Ticket Review Flow

Once the requirement is ticket-ready, the UI should shift from interrogation to review.

The review flow should let the user:

- See a list of candidate tickets.
- Open a ticket to inspect title, description, and acceptance criteria.
- Edit ticket content directly.
- Split or merge tickets.
- Flag tickets as blocked by unresolved questions.
- Approve individual tickets or the full set.

This flow should feel closer to backlog curation than chat.

### Push To Linear Flow

After review, the user should be able to push approved tickets to Linear in a single explicit action.

Before push, the UI should confirm:

- Destination team or board.
- Number of tickets to be created.
- Any labels, priority, or parent-child mapping that will be applied.
- Any tickets marked incomplete or user-forced.

After push, the system should show:

- Success or failure status per ticket.
- Returned Linear issue identifiers.
- A clear link between Refinr ticket candidates and created Linear issues.

### Key UX States

The requirement screen should support the following visible states:

- Draft: requirement created, refinement not meaningfully started.
- Discovering: initial high-level questioning in progress.
- Challenging: specialist personas are testing assumptions and coverage.
- Ticketizing: the system is generating candidate work items.
- Review Ready: tickets are ready for user review.
- Synced: approved tickets have been pushed to Linear.
- Override: user chose to create tickets before full readiness.

These states should be explicit in the UI and visible at the requirement header level.

### Design Principles For MVP UI

- Prioritize comprehension over cleverness.
- Keep the active persona and current refinement objective visible.
- Make synthesized knowledge more prominent than raw chat history.
- Avoid forcing the user to navigate between many screens during a single refinement session.
- Keep ticket review separate from question answering once the requirement is ready.

### Mobile Considerations

MVP should be desktop-first, but the product should still be usable on mobile web for lightweight review and response.

On smaller screens:

- The conversation panel should remain primary.
- Summary and readiness panels can collapse into tabs or drawers.
- Ticket review should remain possible, but bulk editing can be deprioritized.

### UX Risks To Avoid

- Over-chatification, where the experience feels like a generic assistant instead of a structured workflow.
- Over-personification, where persona switching feels like theater instead of product signal.
- Overloaded screens that show too much system state at once.
- Hidden readiness logic that makes ticket generation feel arbitrary.
- Premature transition to ticket review before the user feels the requirement has been properly challenged.

## Functional Requirements

### Project Setup

- Users can create projects in Refinr.
- Each project can be associated with a git repository.
- Each project can be associated with a Linear workspace, team, and or board destination.
- Users can configure project metadata such as product area, goals, and default labels.

### Repository Context

- The system can ingest and reference repository context relevant to refinement.
- Context sources may include markdown docs, product specs, architecture notes, and repository metadata.
- The system should maintain a project context layer that can be referenced across refinement sessions.
- Users can control which repository materials are included or excluded.

## MVP Repository Context Ingestion Model

For MVP, repository ingestion should be selective, document-first, and explicitly user-controlled.

The goal is to provide enough project grounding to improve questioning and ticket quality without building a full code intelligence system.

### MVP Ingestion Scope

Refinr should prioritize these repository sources:

- README files
- Product and requirements documents
- Architecture decision records
- Design notes
- API documentation
- Markdown files in clearly documented folders
- Explicitly selected files or folders chosen by the user

MVP should not depend on deep parsing of the entire codebase.

### Default Exclusions

To reduce noise, the system should exclude by default:

- Build artifacts
- Dependency directories
- Generated files
- Large binary assets
- Test snapshots
- Lockfiles
- Minified assets

### Context Ingestion Flow

Recommended MVP flow:

1. User links a repository.
2. Refinr scans for likely context sources.
3. The user is shown recommended documents to include.
4. The user confirms or edits the context set.
5. Refinr creates a project context index from the approved sources.

This keeps context ingestion visible and reduces the risk of grounding on irrelevant files.

### Context Layers

Refinr should treat repository context as layered.

MVP layers:

- Global project context: durable facts used across requirements.
- Requirement-specific context: documents or files attached to one requirement.
- Session context: temporary excerpts brought into the current refinement pass.

### What The System Should Extract

From ingested materials, Refinr should extract and store structured context such as:

- Product terminology
- Known system boundaries
- Existing features or workflows
- API names and integration references
- Domain constraints
- Existing analytics or event concepts
- Links to source documents

The system does not need full semantic code understanding in MVP. It needs reliable contextual grounding for questioning and ticket generation.

### Context Freshness Rules

Repository context can go stale, so MVP should include simple freshness behavior:

- Record the repository revision or sync timestamp for each context snapshot.
- Allow the user to re-sync project context on demand.
- Show when ticket suggestions rely on potentially stale repository context.

### Context Citation Rules

When repository context materially influences a question, summary, or ticket candidate, Refinr should retain a lightweight citation to the source document or file.

This improves traceability and user trust.

### Context Safety Rules

Refinr should avoid over-trusting repository content.

MVP rules:

- Repository context informs questioning but does not override direct user answers.
- Conflicts between user input and repository context should be surfaced explicitly.
- The user should be able to remove or replace misleading context sources.

### Requirement Intake

- Users can create a new requirement from a short freeform statement.
- Users can add supporting notes, links, or constraints.
- Users can revisit existing requirements and continue refinement.

### Conversational Refinement

- The system asks iterative clarifying questions rather than generating tickets immediately.
- Questions should be state-aware and based on missing information.
- Users can answer in plain language.
- The system maintains a structured internal representation of the requirement as answers evolve.
- Users can review a synthesized summary of the current requirement at any time.

### Persona Orchestration

- The system can select personas based on refinement stage and requirement type.
- Users can see which persona is active.
- Users can manually add, remove, or override personas where appropriate.
- Persona transitions should be explainable and visible in the interface.
- The system should support a default three-amigos style challenge at the ticket-readiness stage.

### Ticket Generation

- The system can group refined work into one or more ticket candidates.
- Each ticket should include at least a title, description, and acceptance criteria.
- Tickets should preserve traceability to the originating requirement and discussion.
- The system should identify dependencies or ordering where evident.

### Review And Approval

- Users can review generated tickets before export.
- Users can edit, merge, split, or discard ticket candidates.
- Users can mark unresolved questions before pushing tickets downstream.

### Linear Integration

- Users can authenticate to Linear.
- Users can map Refinr projects to Linear teams or boards.
- Approved tickets can be pushed to Linear as issues.
- The system should record the Linear issue identifiers returned after creation.
- Failed sync attempts should be visible and retryable.
- The system should support an execution-friendly export mode optimized for one issue per actionable implementation task.

### History And Traceability

- The system stores the question and answer history for each requirement.
- The system stores persona participation history.
- The system stores snapshots of requirement summaries over time.
- The system links created tickets back to the refinement record.

## Non-Functional Requirements

- The application must be responsive in modern desktop browsers.
- The questioning flow should feel conversational without excessive latency.
- Repository and Linear credentials must be handled securely.
- AI provider usage should be observable and cost-aware.
- The system should tolerate external API failure gracefully.
- The platform should support multi-project usage without cross-project context leakage.

## Integrations

### AI Providers

Refinr will use API calls to AI providers to power questioning, summarization, persona behavior, and ticket generation.

Requirements:

- Support at least one provider at MVP.
- Abstract provider usage so additional providers can be introduced later.
- Track provider, model, prompt class, and cost at the session level.

### Git Repository

The associated git repository serves as project context, not as a delivery automation target in MVP.

Expected uses:

- Grounding agent questions in known product context.
- Referencing existing documentation and prior decisions.
- Maintaining project-specific agent context over time.

### Linear

Linear is the initial execution system of record.

Expected uses:

- Creating issues from approved ticket candidates.
- Preserving labels, project mapping, and dependency relationships.
- Allowing the product team to move from refinement directly into execution planning.

## Linear Output Model

Refinr should optimize its MVP Linear export model for downstream execution systems that monitor a Linear board and execute work issue by issue.

That implies the default export should favor independently consumable work items over deep issue hierarchies.

### Recommended Default Model

For MVP, Refinr should export flat Linear issues as the primary output model.

Each exported issue should represent one actionable implementation unit that can be picked up independently by an execution system.

The system should avoid making epics, initiatives, or parent-child issue trees the primary output requirement for MVP.

### Why Flat Issues Are The Right MVP Choice

Flat issues are the best default for autonomous execution consumption because:

- Downstream execution systems can treat each issue as an isolated implementation run.
- A single issue maps cleanly to a single autonomous execution loop.
- Flat issues reduce ambiguity about what is actually ready to be worked.
- Parent-child structures often introduce planning overhead without improving machine consumption.
- Dependency links and labels are sufficient for most early orchestration needs.

### Unit Of Work Rule

Refinr should generate one Linear issue per implementation-sized task.

An implementation-sized task is work that:

- Has a single clear outcome.
- Can be described with one coherent acceptance criteria set.
- Is reasonably executable by one engineering workstream.
- Does not hide multiple unrelated deliverables under one issue.

If a requirement expands into multiple independent tasks, Refinr should create multiple sibling issues rather than one large umbrella issue.

### Exported Issue Shape

Each Linear issue generated by Refinr should include, at minimum:

- Title
- Problem or goal summary
- Scope description
- Acceptance criteria
- Known constraints or assumptions
- Dependencies or prerequisite issues
- Traceability link back to the Refinr requirement record

Where supported by the connected Linear configuration, Refinr should also apply:

- Project mapping
- Labels
- Priority
- Estimates
- Assignee left blank by default unless the user chooses otherwise

### Relationship Model

For MVP, Refinr should support lightweight relationships rather than mandatory hierarchy.

Supported relationship types should include:

- Depends on
- Blocks
- Related to same originating requirement
- Optional grouping under a Linear project when available

This provides enough structure for orchestration while keeping each issue independently operable.

### Optional Planning Artifact

If the user wants a higher-level planning object, Refinr may generate a non-blocking summary artifact for the requirement, but this should not be required for the default export mode.

That planning artifact can exist in one of two forms:

- A Refinr-side requirement summary that is not pushed as a Linear issue.
- An optional parent planning issue created only when the user requests it.

The default mode should remain issue-first, not parent-first.

### Execution-Friendly Export Mode

Refinr should offer a named export mode for downstream autonomous execution systems.

In execution-friendly mode, Refinr should:

- Prefer flat issues over nested structures.
- Split broad work into independently executable issues.
- Avoid exporting issues that fail the readiness gate unless explicitly overridden.
- Preserve enough issue detail that an autonomous implementation system can start without additional human clarification.
- Include stable metadata that ties sibling issues back to the same originating requirement.

### Rules For Splitting Work

Refinr should split work into separate issues when any of the following are true:

- Different work items affect different system areas or disciplines.
- One work item depends on another completing first.
- Acceptance criteria naturally separate into distinct deliverables.
- A single issue would otherwise contain multiple engineering outcomes.
- One part of the work is exploratory while another part is implementation-ready.

Example for abandoned carts:

- Issue 1: Define and instrument cart abandonment events.
- Issue 2: Persist abandonment state and recovery triggers.
- Issue 3: Add analytics reporting for abandonment funnel visibility.
- Issue 4: Implement user-facing recovery touchpoints if in scope.

### Rules For Not Splitting Work

Refinr should keep work in a single issue when:

- The acceptance criteria describe one coherent change.
- Splitting would create artificial overhead.
- The task is already small enough for one autonomous implementation run.

### Traceability Requirements

Every exported Linear issue should retain a clear connection to the source refinement process.

At minimum, Refinr should store:

- Originating requirement identifier
- Export batch identifier
- Related sibling issue identifiers
- Readiness status at export time
- Whether the issue was exported under override

### Implications For The Review UI

Because the output model is flat-issue-first, the review UI should present ticket candidates as a list of sibling execution items.

The user should be able to:

- Inspect each issue independently.
- Edit sequencing and dependencies.
- Merge issues that were split too aggressively.
- Split issues that remain too broad.
- Approve all issues or a selected subset for export.

Implementation-facing detail has been extracted into supporting documents listed at the top of this file.

## Success Metrics

### North Star

- Number of refined requirements that are converted into approved Linear tickets.

### Product Metrics

- Requirement-to-ticket completion rate.
- Median time from initial idea submission to ticket-ready state.
- Average number of refinement iterations per requirement.
- Percentage of tickets pushed to Linear after generation.
- Number of active projects with linked repository and Linear context.

### Quality Metrics

- User-rated quality of generated tickets.
- User-rated completeness of refined requirements.
- Percentage of tickets edited before export.
- Percentage of sessions where additional personas are invoked.
- Percentage of tickets later reopened for missing requirements.

### Business Impact Metrics

- Reduction in backlog grooming time.
- Reduction in requirement clarifications requested by engineering.
- Increase in proportion of engineering-ready tickets at handoff.

## Activation Definition

A user is activated when they:

1. Create a project.
2. Connect a repository and Linear destination.
3. Complete at least one refinement session.
4. Approve and push at least one ticket to Linear.

## Risks

- The system may ask too many questions and create fatigue.
- Persona switching may feel theatrical rather than useful if not grounded in clear value.
- The definition of "ticket-ready" may vary significantly across teams.
- Repository context may be noisy, incomplete, or stale.
- AI-generated tickets may look plausible while still missing critical implementation detail.
- Linear integration may encourage premature ticket creation if readiness gates are weak.

## Open Product Decisions

- Should persona selection be mostly automatic, mostly user-driven, or hybrid?
- Should the first release focus on a single team workflow inside Linear or support multiple teams per project?

## Recommended MVP Positioning

Refinr should be positioned as the AI backlog refinement system for product teams.

Suggested framing:

"Turn vague product requests into engineering-ready Linear tickets using staged AI questioning, specialist personas, and project context."

That is sharper than "AI product manager" and more concrete than "multi-agent workspace."

## Example End-To-End Scenario

Input:

"I want to track abandoned carts."

Expected Refinr behavior:

1. Product Manager persona clarifies business objective, funnel stage, definition of abandonment, customer segments, and success metrics.
2. Senior Project Manager turns the clarified need into workstreams such as event tracking, cart state rules, analytics visibility, and notification or recovery options.
3. Senior Developer identifies event instrumentation, data model considerations, backend dependencies, and analytics integration concerns.
4. UI Designer identifies user-visible cart states, recovery touchpoints, and dashboard or reporting needs.
5. Reality Checker pressures the plan for anonymous users, multi-device behavior, timeout definitions, privacy concerns, and operational gaps.
6. Refinr proposes a set of Linear-ready tickets with acceptance criteria and dependencies.

## Future Opportunities

- Team-level refinement policies and definitions of readiness.
- Persona packs tuned to industry or product domain.
- Jira, Asana, and other delivery tool integrations.
- Cross-requirement dependency analysis across the backlog.
- Automated generation of higher-level artifacts such as PRDs, epics, or delivery plans.
- Feedback loop from engineering outcomes back into refinement quality.

## Suggested Next Draft Inputs

To turn this into a more execution-ready PRD, the next inputs needed are:

- Specific Linear objects and hierarchy to support at launch.
- Preferred AI provider strategy and cost constraints.
- Whether persona definitions are embedded, user-selectable, or imported from repository-based templates.