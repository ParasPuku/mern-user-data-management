# AWS Architecture Interview Questions

## 1. How do you design a scalable application on AWS?

### What it is

A scalable AWS architecture uses load balancing, auto scaling, managed databases, caching, object storage, monitoring, and secure networking.

### Where I used it

I used ALB, ECS/EKS, EC2, Lambda, S3, CloudFront, RDS/Mongo-compatible services, Redis, and CloudWatch.

### Why I chose it

Managed AWS services reduce operational work and support scaling based on demand.

### Trade-offs

Managed services reduce maintenance but increase cloud-specific dependency and cost planning needs.

### Failure cases

Poor networking, no autoscaling, single-AZ design, weak IAM, and missing limits can cause outages.

### How I monitored/debugged it

I monitor CloudWatch metrics, logs, alarms, load balancer health, traces, costs, and service quotas.

## 2. How do you secure AWS infrastructure?

### What it is

AWS security includes IAM least privilege, network isolation, encryption, secrets management, logging, and vulnerability scanning.

### Where I used it

I used IAM roles, security groups, private subnets, KMS, Secrets Manager, WAF, CloudTrail, and S3 bucket policies.

### Why I chose it

Cloud misconfiguration is a major security risk, so access and data boundaries must be explicit.

### Trade-offs

Strong security adds setup effort and may slow debugging if access is too restricted.

### Failure cases

Public S3 buckets, broad IAM permissions, exposed databases, leaked keys, and missing audit logs are common failures.

### How I monitored/debugged it

I use CloudTrail, GuardDuty-style findings, IAM Access Analyzer, security alerts, and config reviews.

## 3. How do you deploy containers on AWS?

### What it is

Containers can be deployed using ECS, EKS, or similar container platforms with images stored in ECR.

### Where I used it

I used Docker images, ECR, ECS/EKS deployments, load balancers, health checks, and autoscaling.

### Why I chose it

Container deployment makes services portable, repeatable, and scalable.

### Trade-offs

ECS is simpler to operate. EKS gives Kubernetes flexibility but adds complexity.

### Failure cases

Bad task definitions, missing env vars, unhealthy targets, image pull issues, and resource limits can fail deployments.

### How I monitored/debugged it

I check service events, task logs, target group health, deployment status, container metrics, and image versions.

## 4. How do you handle observability on AWS?

### What it is

Observability means collecting logs, metrics, traces, alarms, and dashboards to understand system health.

### Where I used it

I used CloudWatch logs, custom metrics, alarms, distributed tracing, load balancer metrics, and application logs.

### Why I chose it

It helps detect issues before users report them and reduces debugging time.

### Trade-offs

Too many logs and metrics increase cost and noise. Alerts must be actionable.

### Failure cases

No correlation ids, missing error logs, noisy alerts, and no latency breakdown make incidents hard to resolve.

### How I monitored/debugged it

I use dashboards for latency, error rate, traffic, saturation, logs, traces, and business metrics.

## 5. How do you control AWS cost?

### What it is

Cost control means monitoring usage, right-sizing resources, autoscaling, using lifecycle policies, and setting budgets.

### Where I used it

I used budgets, cost allocation tags, S3 lifecycle rules, reserved capacity, autoscaling, and log retention policies.

### Why I chose it

Cloud cost can grow quickly without ownership and monitoring.

### Trade-offs

Aggressive cost optimization can reduce performance or reliability if not measured carefully.

### Failure cases

Unused resources, high log retention, oversized instances, unbounded data transfer, and no budget alerts cause waste.

### How I monitored/debugged it

I use cost explorer, budgets, tags, service-level dashboards, usage reports, and regular cost reviews.

## 6. How do you design VPC networking on AWS?

### What it is

A VPC is an isolated network where AWS resources run with subnets, route tables, gateways, and security controls.

### Where I used it

I used public subnets for load balancers and private subnets for APIs, databases, Redis, and workers.

### Why I chose it

It isolates sensitive services and controls network access.

### Trade-offs

Private networking improves security but adds NAT, routing, and debugging complexity.

### Failure cases

Wrong route tables, open security groups, or public databases can create outages or security risks.

### How I monitored/debugged it

I inspect route tables, security groups, NACLs, flow logs, DNS, and load balancer target health.

## 7. How do IAM roles work?

### What it is

IAM roles grant temporary permissions to AWS services, users, or workloads.

### Where I used it

I used roles for ECS/EKS tasks, CI/CD deploy jobs, Lambda functions, and cross-account access.

### Why I chose it

Roles avoid long-lived static credentials and support least privilege.

### Trade-offs

IAM policies can become complex and hard to audit.

### Failure cases

Overly broad permissions like `*:*` can expose the entire account.

### How I monitored/debugged it

I use CloudTrail, Access Analyzer, IAM policy simulator, and permission boundary reviews.

## 8. How do you use S3 and CloudFront?

### What it is

S3 stores objects and CloudFront caches and serves them globally through a CDN.

### Where I used it

I used them for frontend static hosting, images, documents, exports, and public assets.

### Why I chose it

They are scalable, durable, and cost-effective for static content.

### Trade-offs

Caching improves speed but requires invalidation or versioned assets for updates.

### Failure cases

Public bucket misconfiguration, stale CDN cache, and missing encryption can cause issues.

### How I monitored/debugged it

I check access logs, cache hit ratio, CloudFront errors, bucket policies, and object metadata.

## 9. How do you design AWS high availability?

### What it is

High availability uses multiple availability zones, health checks, autoscaling, and managed failover.

### Where I used it

I used multi-AZ load balancers, databases, container services, and Redis replicas.

### Why I chose it

It keeps applications running when one instance or AZ has problems.

### Trade-offs

High availability costs more and needs testing.

### Failure cases

Single-AZ databases, one NAT gateway, or one app instance can become single points of failure.

### How I monitored/debugged it

I monitor AZ health, target health, failover events, error rates, and dependency status.

## 10. How do you use AWS Secrets Manager?

### What it is

Secrets Manager stores, encrypts, rotates, and audits access to secrets.

### Where I used it

I used it for database passwords, API keys, OAuth secrets, and service credentials.

### Why I chose it

It avoids storing secrets in source code, images, or plain environment files.

### Trade-offs

It adds cost and runtime dependency if secrets are fetched dynamically.

### Failure cases

Wrong IAM permissions or failed rotation can break production services.

### How I monitored/debugged it

I monitor access logs, rotation status, IAM errors, application startup failures, and CloudTrail events.

## 11. How do you use SQS in architecture?

### What it is

SQS is a managed queue for decoupling producers and consumers.

### Where I used it

I used it for background jobs, email sending, webhook processing, and retryable workflows.

### Why I chose it

It improves reliability and absorbs traffic spikes.

### Trade-offs

Queues introduce eventual consistency and duplicate delivery handling.

### Failure cases

Missing dead-letter queues or idempotency can create stuck or repeated processing.

### How I monitored/debugged it

I monitor queue depth, age of oldest message, failed messages, DLQ count, and consumer errors.

## 12. How do you use Lambda?

### What it is

Lambda runs code without managing servers, triggered by events like HTTP, S3, SQS, or schedules.

### Where I used it

I used Lambda for lightweight jobs, webhooks, image processing, scheduled tasks, and glue logic.

### Why I chose it

It reduces infrastructure management for event-driven workloads.

### Trade-offs

Cold starts, timeout limits, and vendor-specific design must be considered.

### Failure cases

Long-running tasks, large packages, and missing retries can cause failures.

### How I monitored/debugged it

I monitor CloudWatch logs, duration, errors, throttles, cold starts, and DLQ events.

## 13. How do you design AWS disaster recovery?

### What it is

Disaster recovery defines how the system recovers from major failures using backups, replication, and runbooks.

### Where I used it

I planned RTO/RPO, backups, restore drills, multi-AZ, and cross-region options.

### Why I chose it

It prepares the business for outages, data loss, or regional failures.

### Trade-offs

Lower RTO/RPO needs more infrastructure and cost.

### Failure cases

Backups without restore testing give false confidence.

### How I monitored/debugged it

I monitor backup success, restore test results, replication lag, runbook readiness, and failover drills.

## 14. How do you use CloudWatch effectively?

### What it is

CloudWatch collects AWS metrics, logs, alarms, dashboards, and events.

### Where I used it

I used it for app logs, Lambda logs, ECS/EKS metrics, load balancer metrics, and alarms.

### Why I chose it

It is the default AWS observability layer and integrates with many services.

### Trade-offs

CloudWatch can become expensive and noisy without retention and filtering.

### Failure cases

No alarms, noisy alarms, or missing correlation ids make incidents harder.

### How I monitored/debugged it

I create dashboards, alarms, log queries, metric filters, and deployment markers.

## 15. How do you manage AWS environments?

### What it is

Environment management separates dev, staging, and production using accounts, VPCs, configs, and access controls.

### Where I used it

I used separate accounts or isolated environments with different secrets, databases, and deployment permissions.

### Why I chose it

Isolation reduces accidental production impact and improves security.

### Trade-offs

More environments increase cost and configuration overhead.

### Failure cases

Shared secrets or shared databases between staging and production can cause serious incidents.

### How I monitored/debugged it

I review account boundaries, IAM access, config drift, deployment targets, and environment-specific alarms.
