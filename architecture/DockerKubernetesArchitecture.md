# Docker and Kubernetes Architecture Interview Questions

## 1. How does Docker work?

### What it is

Docker packages an application with its runtime, dependencies, and configuration into an image that runs as a container.

### Where I used it

I used Docker for Node APIs, frontend builds, local development, CI builds, and production deployments.

### How I implemented it

I write Dockerfiles with pinned base images, copy only required files, install production dependencies, expose the app port, run as non-root, and build images in CI with version tags.

### Why I chose it

It makes environments consistent across local, CI, staging, and production.

### Trade-offs

Images must be optimized and patched. Containers do not remove the need for secure configuration.

### Failure cases

Large images, secrets in image layers, wrong base images, and missing health checks can cause issues.

### How I monitored/debugged it

I inspect image layers, container logs, resource usage, vulnerability scans, and startup failures.

## 2. How do you reduce Docker image size?

### What it is

Reducing image size means removing unnecessary files, using smaller base images, and separating build-time from runtime dependencies.

### Where I used it

I used multi-stage builds for frontend apps and Node services.

### How I implemented it

I use a builder stage for installing dependencies and compiling code, then copy only built assets and production dependencies into a smaller runtime image.

### Why I chose it

Smaller images build faster, deploy faster, and reduce attack surface.

### Trade-offs

Minimal images can make debugging harder because common tools may be missing.

### Failure cases

Copying `node_modules`, source maps, tests, or secrets unnecessarily increases risk and size.

### How I monitored/debugged it

I use image size reports, layer inspection, vulnerability scans, and build logs.

## 3. How does Kubernetes work?

### What it is

Kubernetes orchestrates containers by scheduling pods, managing deployments, services, scaling, health checks, and rollouts.

### Where I used it

I used Kubernetes for running APIs, frontend services, workers, cron jobs, and internal services.

### How I implemented it

I define Deployments for apps, Services for stable networking, Ingress for external traffic, ConfigMaps/Secrets for config, probes for health, and HPA for autoscaling.

### Why I chose it

It provides self-healing, scaling, service discovery, and deployment control.

### Trade-offs

Kubernetes adds operational complexity and requires strong observability.

### Failure cases

Bad resource limits, failed probes, misconfigured services, and image pull errors can break deployments.

### How I monitored/debugged it

I use `kubectl describe`, pod logs, events, readiness/liveness probes, metrics, and tracing.

## 4. How does auto-scaling work in Kubernetes?

### What it is

Kubernetes can scale pods based on CPU, memory, or custom metrics using Horizontal Pod Autoscaler.

### Where I used it

I used autoscaling for APIs, workers, and services with traffic spikes.

### How I implemented it

I set CPU/memory requests, configure HPA with CPU or custom metrics, define min/max replicas, and monitor whether scaling keeps latency and queue depth under control.

### Why I chose it

It improves availability and cost efficiency.

### Trade-offs

Autoscaling reacts after metrics change, so sudden spikes may still need buffers.

### Failure cases

Wrong metrics, missing resource requests, slow startup, and database bottlenecks can make autoscaling ineffective.

### How I monitored/debugged it

I monitor HPA status, pod count, CPU/memory, request latency, queue depth, and service saturation.

## 5. How do you debug a failing pod?

### What it is

Debugging a pod means checking why a container is not starting, not ready, crashing, or failing traffic.

### Where I used it

I debugged crash loops, config issues, image pull errors, failing probes, and resource limits.

### How I implemented it

I run `kubectl describe pod`, check events, inspect logs including previous container logs, verify env/secrets, check probes, and review resource limits and image pull status.

### Why I chose it

Pod-level debugging is the fastest way to resolve Kubernetes production issues.

### Trade-offs

Kubernetes adds multiple layers, so you must check app logs and cluster events together.

### Failure cases

Wrong env vars, missing secrets, bad probes, memory limits, and network policies are common causes.

### How I monitored/debugged it

I use pod logs, `kubectl describe pod`, events, previous logs, exec shells, metrics, and deployment rollout history.

## 6. What are Dockerfile best practices?

### What it is

Dockerfile best practices create secure, small, repeatable, and efficient images.

### Where I used it

I used multi-stage builds, non-root users, `.dockerignore`, pinned base images, and minimal runtime layers.

### How I implemented it

I add `.dockerignore`, avoid copying secrets, use multi-stage builds, install only production dependencies, run as non-root, and scan images in CI.

### Why I chose it

It improves security, build speed, and deployment reliability.

### Trade-offs

Minimal images can make debugging harder.

### Failure cases

Running as root, copying secrets, and installing dev dependencies in production images are common issues.

### How I monitored/debugged it

I inspect layers, scan images, review Dockerfiles, and test containers locally and in CI.

## 7. ConfigMap vs Secret in Kubernetes?

### What it is

ConfigMaps store non-sensitive configuration. Secrets store sensitive values like passwords and tokens.

### Where I used it

I used ConfigMaps for feature config and Secrets for database URLs, API keys, and JWT secrets.

### How I implemented it

I mount ConfigMaps for non-sensitive config and Secrets for sensitive values. For production, I restrict RBAC and often sync secrets from a cloud secret manager.

### Why I chose it

It separates configuration from container images and supports environment-specific deployment.

### Trade-offs

Kubernetes Secrets still need proper encryption and access control.

### Failure cases

Putting secrets in ConfigMaps or logs can expose sensitive values.

### How I monitored/debugged it

I review RBAC, secret access, environment injection, deployment manifests, and audit logs.

## 8. What are liveness and readiness probes?

### What it is

Liveness checks whether a container should be restarted. Readiness checks whether it should receive traffic.

### Where I used it

I used probes for Node APIs, workers, and services with database dependencies.

### How I implemented it

I use liveness for process health and readiness for traffic eligibility. Readiness checks critical dependencies so pods do not receive traffic before they are ready.

### Why I chose it

They allow Kubernetes to self-heal and route traffic safely.

### Trade-offs

Bad probes can restart healthy apps or route traffic too early.

### Failure cases

Using the same shallow endpoint for both checks can hide dependency issues.

### How I monitored/debugged it

I check probe failures, pod events, app logs, restart count, and readiness transitions.

## 9. How do Kubernetes services and ingress work?

### What it is

A Service provides stable networking for pods. Ingress routes external HTTP traffic to services.

### Where I used it

I used services for internal communication and ingress for public APIs and frontend routes.

### How I implemented it

I create Services that select pods by labels, expose stable DNS names, and configure Ingress rules to route host/path traffic to the correct service.

### Why I chose it

Pods are temporary, so stable routing needs Kubernetes abstractions.

### Trade-offs

Ingress behavior depends on the controller and cloud load balancer configuration.

### Failure cases

Wrong service selectors, ports, or ingress rules can make apps unreachable.

### How I monitored/debugged it

I inspect endpoints, service selectors, ingress events, DNS, load balancer health, and access logs.

## 10. How do resource requests and limits work?

### What it is

Requests reserve CPU/memory for scheduling. Limits cap the maximum resources a container can use.

### Where I used it

I set requests and limits for APIs, workers, and frontend containers.

### How I implemented it

I start with observed baseline CPU/memory, set requests for normal usage, limits for safety, and adjust based on throttling, OOM kills, and production metrics.

### Why I chose it

They help Kubernetes schedule reliably and protect cluster resources.

### Trade-offs

Too low limits cause throttling or OOM kills. Too high requests waste capacity.

### Failure cases

Missing requests break autoscaling accuracy and resource planning.

### How I monitored/debugged it

I monitor CPU throttling, memory usage, OOM kills, HPA behavior, and pod scheduling.

## 11. How do rolling deployments work in Kubernetes?

### What it is

Rolling deployment gradually replaces old pods with new pods.

### Where I used it

I used rolling updates for APIs and workers with readiness probes.

### How I implemented it

I configure rolling update strategy, readiness probes, max unavailable/surge, and watch rollout status. The new pod must become ready before old pods are removed.

### Why I chose it

It allows deployment without downtime when the app is backward compatible.

### Trade-offs

Old and new versions may run together temporarily.

### Failure cases

Breaking API or database compatibility can fail during mixed-version rollout.

### How I monitored/debugged it

I watch rollout status, pod readiness, error rates, logs, and deployment events.

## 12. How do you handle logs in Kubernetes?

### What it is

Kubernetes logs are written to stdout/stderr and collected by logging agents.

### Where I used it

I used centralized logging for APIs, workers, ingress, and system components.

### How I implemented it

I write app logs to stdout/stderr, collect them with a logging agent, add service/version/request id fields, and search them in a centralized logging platform.

### Why I chose it

Pods are temporary, so logs need external storage.

### Trade-offs

High log volume increases cost and can create noise.

### Failure cases

Logging only inside container files can lose logs when pods restart.

### How I monitored/debugged it

I search logs by pod, namespace, request id, service, version, and timestamp.

## 13. How do you manage secrets in Kubernetes?

### What it is

Secret management controls how sensitive values are stored, encrypted, mounted, and accessed by pods.

### Where I used it

I used Kubernetes Secrets, cloud secret managers, and external secret operators.

### How I implemented it

I keep secrets out of Git, restrict RBAC, encrypt secrets at rest, rotate credentials, and use external secret operators to sync from cloud secret stores.

### Why I chose it

Secrets should not be baked into images or committed to Git.

### Trade-offs

External secret systems add setup but improve rotation and auditability.

### Failure cases

Overly broad RBAC or plaintext secrets in manifests can expose credentials.

### How I monitored/debugged it

I audit secret access, RBAC, deployment manifests, secret rotation, and failed mounts.

## 14. How do you debug Kubernetes networking issues?

### What it is

Networking debugging checks DNS, services, endpoints, network policies, ingress, and pod connectivity.

### Where I used it

I debugged API-to-database connectivity, service routing, ingress failures, and DNS issues.

### How I implemented it

I check DNS resolution, service endpoints, pod labels, ports, network policies, ingress rules, and run temporary debug pods for connectivity tests.

### Why I chose it

Networking problems often look like application failures.

### Trade-offs

Kubernetes networking has multiple layers, so debugging requires systematic checks.

### Failure cases

Wrong labels, blocked network policies, DNS failures, and port mismatch are common.

### How I monitored/debugged it

I inspect services, endpoints, DNS, pod logs, ingress logs, network policies, and connectivity tests.

## 15. How do you design Kubernetes namespaces?

### What it is

Namespaces logically separate resources in a Kubernetes cluster.

### Where I used it

I used namespaces for environments, teams, applications, and shared infrastructure.

### How I implemented it

I separate workloads by environment or team, apply RBAC and quotas per namespace, add network policies where needed, and standardize naming/labels.

### Why I chose it

They improve organization, access control, quotas, and operational clarity.

### Trade-offs

Too many namespaces can make management complex.

### Failure cases

Weak namespace RBAC can allow teams to access resources they should not manage.

### How I monitored/debugged it

I review RBAC, quotas, resource usage, network policies, and namespace-level alerts.
