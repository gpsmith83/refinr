# Refinr

Refinr is a web-based product definition and backlog refinement tool for product managers and product owners.

The product is designed to take a simple requirement such as "I want to track abandoned carts," guide the user through structured AI-assisted refinement, apply specialist personas where needed, and produce reviewable ticket candidates that can be pushed to Linear.

## Repository Purpose

This repository currently holds the product and implementation documentation for Refinr.

The documentation has been split so that product definition, architecture, stack choices, data model decisions, delivery sequencing, and acceptance criteria can evolve independently.

## Where To Start

- [PRD.md](PRD.md): Core product requirements document.
- [docs/README.md](docs/README.md): Documentation index.
- [docs/architecture.md](docs/architecture.md): System architecture and runtime design.
- [docs/mvp-stack.md](docs/mvp-stack.md): Approved MVP stack and deployment defaults.
- [docs/data-model.md](docs/data-model.md): Backend data model and persistence strategy.
- [docs/implementation-roadmap.md](docs/implementation-roadmap.md): MVP milestones and sequencing.
- [docs/acceptance-criteria.md](docs/acceptance-criteria.md): Acceptance criteria for the core MVP workflows.
- [docs/initial-delivery-backlog.md](docs/initial-delivery-backlog.md): Initial INVEST-oriented MVP backlog.

## Current Product Direction

- Frontend: modern Angular
- Backend: Express with TypeScript
- Persistence: PostgreSQL with pgvector
- Jobs: pg-boss
- Auth: GitHub OAuth first
- External integrations allowed for MVP: Linear and commercial AI providers
- Core platform requirement: free, portable, and deployable on self-hosted or generic cloud infrastructure

## Documentation Strategy

The working documentation model is:

- Keep [PRD.md](PRD.md) product-facing and comparatively stable.
- Keep implementation detail in the `docs/` directory.
- Add decision-specific documents when changes should not silently rewrite prior reasoning.

## Next Likely Additions

- Architecture decision records for major technical choices
- Initial API contracts
- First-pass schema definitions and migrations
- Delivery work breakdown derived from the roadmap and acceptance criteria