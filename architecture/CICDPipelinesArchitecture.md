# CI/CD Pipelines Architecture Interview Questions

## 1. What happens when CI/CD gets triggered?

### What it is

CI/CD is an automated pipeline that validates, builds, tests, packages, and deploys code after a trigger like push, pull request, or release.

### Where I used it

I used pipelines for frontend builds, Node APIs, Docker images, database migrations, and Kubernetes deployments.

### Why I chose it

It makes deployments repeatable, faster, and less dependent on manual steps.

### Trade-offs

Pipelines need maintenance. Bad pipelines can block teams or deploy broken code quickly.

### Failure cases

Missing tests, weak secrets handling, wrong environment variables, and no rollback can cause incidents.

### How I monitored/debugged it

I check pipeline logs, test reports, artifact versions, deployment events, and environment health after deployment.

## 2. What checks should run in CI?

### What it is

CI checks verify code quality and correctness before merge or deployment.

### Where I used it

I run lint, type checks, unit tests, integration tests, build checks, dependency scans, and Docker image scans.

### Why I chose it

It catches issues early before they reach production.

### Trade-offs

More checks increase confidence but can slow feedback. I keep fast checks early and heavier checks later.

### Failure cases

Flaky tests, missing integration tests, and ignored warnings reduce trust in CI.

### How I monitored/debugged it

I track pipeline duration, failure rate, flaky tests, test coverage, and failed stages.

## 3. How do you handle secrets in CI/CD?

### What it is

Secrets are sensitive values like API keys, tokens, passwords, and certificates used by pipelines.

### Where I used it

I store secrets in CI secret managers, cloud secret stores, and Kubernetes secrets instead of source code.

### Why I chose it

It prevents accidental leakage through repositories and logs.

### Trade-offs

Secret rotation and environment-specific access need good process.

### Failure cases

Secrets can leak through logs, build artifacts, Docker layers, or overly broad permissions.

### How I monitored/debugged it

I use secret scanning, audit logs, masked variables, least privilege, and rotation policies.

## 4. How do you rollback a failed deployment?

### What it is

Rollback means returning production to a previously working version.

### Where I used it

I used rollback through Kubernetes rollout undo, previous Docker image tags, blue-green switching, and feature flags.

### Why I chose it

Fast rollback reduces incident impact.

### Trade-offs

Rollback is harder when database migrations are not backward compatible.

### Failure cases

No versioned artifacts, irreversible migrations, and missing smoke tests can make rollback unsafe.

### How I monitored/debugged it

I monitor deployment health, error rate, latency, logs, synthetic checks, and business metrics.

## 5. How do you run database migrations in CI/CD?

### What it is

Database migration in CI/CD changes schema or data as part of deployment.

### Where I used it

I used migrations for indexes, new fields, backfills, and schema changes.

### Why I chose it

Automating migrations reduces manual mistakes.

### Trade-offs

Migrations can break running apps if not backward compatible.

### Failure cases

Long locks, failed backfills, partial migrations, and no rollback plan can cause downtime.

### How I monitored/debugged it

I use dry runs, backups, migration logs, batch updates, slow query monitoring, and deployment gates.

## 6. How do you design branching strategy for CI/CD?

### What it is

Branching strategy defines how developers create, review, merge, release, and hotfix code.

### Where I used it

I used trunk-based development, feature branches, release branches, and hotfix branches depending on team maturity.

### Why I chose it

It keeps delivery predictable and reduces merge conflicts.

### Trade-offs

Trunk-based development is fast but needs strong automated tests. Long-lived branches isolate work but increase merge pain.

### Failure cases

Unclear branching leads to missed fixes, unstable releases, and confusing deployments.

### How I monitored/debugged it

I track merge frequency, stale branches, CI failures, release defects, and rollback frequency.

## 7. What is blue-green deployment?

### What it is

Blue-green deployment runs two environments, where one serves traffic and the other receives the new release.

### Where I used it

I used it for APIs and frontend releases where quick rollback was important.

### Why I chose it

It allows switching traffic quickly and rolling back by pointing traffic to the previous environment.

### Trade-offs

It needs extra infrastructure and careful database compatibility.

### Failure cases

If database migrations are not backward compatible, switching back may still fail.

### How I monitored/debugged it

I monitor health checks, traffic routing, error rate, latency, and deployment events.

## 8. What is canary deployment?

### What it is

Canary deployment sends a small percentage of traffic to the new version before full rollout.

### Where I used it

I used canary for risky backend changes, performance-sensitive APIs, and major frontend releases.

### Why I chose it

It limits blast radius and catches production issues early.

### Trade-offs

It needs traffic splitting, metrics, and automated or manual promotion decisions.

### Failure cases

Bad metrics or too small sample size can hide issues until full rollout.

### How I monitored/debugged it

I compare canary vs baseline error rate, latency, logs, and business metrics.

## 9. How do feature flags fit into CI/CD?

### What it is

Feature flags allow code to be deployed separately from feature release.

### Where I used it

I used flags for gradual rollout, A/B testing, emergency disable, and risky features.

### Why I chose it

It reduces deployment risk and enables faster merges.

### Trade-offs

Flags add complexity and must be cleaned up.

### Failure cases

Old flags can create confusing code paths and hidden bugs.

### How I monitored/debugged it

I track flag state, rollout percentage, user impact, errors by flag, and stale flag cleanup.

## 10. How do you promote builds across environments?

### What it is

Promotion moves the same tested artifact from dev to staging to production.

### Where I used it

I promoted Docker images, frontend build artifacts, and release tags across environments.

### Why I chose it

It avoids rebuilding different code for each environment.

### Trade-offs

Artifacts must be environment-agnostic, with config injected at runtime or deploy time.

### Failure cases

Rebuilding per environment can introduce inconsistent releases.

### How I monitored/debugged it

I track artifact digests, version tags, deployment history, and environment config.

## 11. How do you speed up slow pipelines?

### What it is

Pipeline optimization reduces CI/CD time without reducing confidence.

### Where I used it

I used caching, parallel test jobs, incremental builds, smaller Docker layers, and targeted test runs.

### Why I chose it

Fast feedback improves developer productivity.

### Trade-offs

Aggressive caching can hide dependency or build issues.

### Failure cases

Slow pipelines cause developers to bypass checks or batch risky changes.

### How I monitored/debugged it

I measure stage duration, cache hit rate, queue time, flaky tests, and slowest jobs.

## 12. How do you secure CI/CD pipelines?

### What it is

Pipeline security protects code, artifacts, secrets, credentials, and deployment permissions.

### Where I used it

I used protected branches, approval gates, secret scanning, SAST, dependency scans, and least-privilege deploy roles.

### Why I chose it

CI/CD has production access, so compromise can become a production incident.

### Trade-offs

Security gates add time but reduce risk.

### Failure cases

Leaked tokens, untrusted PR scripts, and broad deploy credentials can compromise environments.

### How I monitored/debugged it

I review audit logs, secret scans, failed security jobs, role usage, and artifact signatures.

## 13. How do you handle frontend and backend deployments separately?

### What it is

Separate deployment lets frontend and backend release independently while keeping contracts compatible.

### Where I used it

I used independent pipelines for React apps and Node APIs.

### Why I chose it

It speeds delivery and reduces coupling between teams.

### Trade-offs

API backward compatibility becomes very important.

### Failure cases

Frontend may call a field or endpoint not yet deployed in backend.

### How I monitored/debugged it

I use contract tests, API versioning, feature flags, release notes, and compatibility checks.

## 14. How do you manage failed production deployments?

### What it is

Managing failed deployment means detecting impact, stopping rollout, rolling back or fixing forward, and communicating.

### Where I used it

I used rollback, canary stop, feature flag disable, hotfix branches, and incident channels.

### Why I chose it

Fast response limits user impact.

### Trade-offs

Fix-forward can be faster but riskier than rollback.

### Failure cases

No owner, no rollback, and no monitoring can extend outage duration.

### How I monitored/debugged it

I watch error rate, latency, logs, deployment markers, user reports, and business KPIs.

## 15. What artifacts should a pipeline produce?

### What it is

Artifacts are versioned outputs like Docker images, frontend builds, test reports, coverage, SBOMs, and release notes.

### Where I used it

I produced Docker images, build bundles, coverage reports, vulnerability reports, and deployment manifests.

### Why I chose it

Artifacts make releases traceable and repeatable.

### Trade-offs

Storing artifacts costs space and requires retention policies.

### Failure cases

Without versioned artifacts, rollback and audit become difficult.

### How I monitored/debugged it

I track artifact version, digest, build metadata, retention, and deployment mapping.
