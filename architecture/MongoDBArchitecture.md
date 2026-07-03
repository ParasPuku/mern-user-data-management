# MongoDB Architecture Interview Questions

## 1. Where do you apply indexing and why?

### What it is

An index is a data structure MongoDB uses to find documents faster without scanning the whole collection.

### Where I used it

I used indexes on login identifiers, owner ids, status filters, search fields, created dates, and unique business keys.

### Why I chose it

Indexes reduce query latency and make filtering, sorting, and uniqueness checks efficient.

### Trade-offs

Indexes speed reads but slow writes and consume memory/storage.

### Failure cases

Too many indexes, wrong index order, and unindexed sorting can cause slow queries and high CPU.

### How I monitored/debugged it

I use `explain("executionStats")`, slow query logs, MongoDB metrics, index usage stats, and query latency dashboards.

## 2. How do you debug a slow MongoDB query?

### What it is

Debugging slow queries means finding whether MongoDB is scanning too many documents, sorting in memory, or using the wrong index.

### Where I used it

I used it for admin tables, filtered user lists, reports, and search endpoints.

### Why I chose it

Slow queries directly affect API latency and database load.

### Trade-offs

Adding indexes improves reads but increases write cost. Sometimes query design or data model must change.

### Failure cases

Regex without prefix, large skips, missing compound indexes, and unbounded queries are common issues.

### How I monitored/debugged it

I check `executionTimeMillis`, `nReturned`, `totalDocsExamined`, `totalKeysExamined`, and sort stages in explain plans.

## 3. How does horizontal scaling work in MongoDB?

### What it is

MongoDB horizontal scaling is done through sharding, where data is distributed across multiple shards.

### Where I used it

I considered sharding for high-volume collections like events, logs, analytics, and large multi-tenant data.

### Why I chose it

It allows storage and write/read workload to scale beyond a single replica set.

### Trade-offs

Sharding adds operational complexity and requires careful shard key selection.

### Failure cases

Bad shard keys can create hot shards, uneven data distribution, and poor query performance.

### How I monitored/debugged it

I monitor shard distribution, chunk migrations, query routing, slow queries, and per-shard CPU/storage metrics.

## 4. How do you choose a shard key?

### What it is

A shard key determines how MongoDB distributes documents across shards.

### Where I used it

I evaluate tenant id, account id, date buckets, and high-cardinality fields depending on access patterns.

### Why I chose it

A good shard key spreads writes evenly and supports common queries.

### Trade-offs

Range-based keys help range queries but can create hot partitions. Hashed keys distribute well but may not support range queries efficiently.

### Failure cases

Low-cardinality keys like status or role can overload a small number of shards.

### How I monitored/debugged it

I review query patterns, cardinality, chunk distribution, shard load, and production access logs.

## 5. How do you migrate MongoDB data safely?

### What it is

Database migration changes schema, data shape, indexes, or constraints in a controlled way.

### Where I used it

I used migrations for adding fields, backfilling data, creating indexes, renaming fields, and changing references.

### Why I chose it

Controlled migration avoids breaking running applications and keeps data consistent.

### Trade-offs

Safe migrations often require multiple deployments and temporary backward-compatible code.

### Failure cases

Large blocking updates, breaking old app versions, missing rollback plans, and failed backfills can cause outages.

### How I monitored/debugged it

I use dry runs, backups, batch processing, progress logs, migration status collections, slow query monitoring, and rollback plans.

## 6. Embedding vs referencing: how do you decide?

### What it is

Embedding stores related data inside one document. Referencing stores related data in separate collections with ids.

### Where I used it

I embedded small profile-like data and referenced users, teams, skills, and memberships when relationships grew.

### Why I chose it

Embedding is fast for read-together data. Referencing is better for large or independently changing data.

### Trade-offs

Embedding can duplicate data. Referencing can require extra queries or aggregation.

### Failure cases

Large embedded arrays can hit document size limits or become hard to update.

### How I monitored/debugged it

I review document size, query patterns, update frequency, and explain plans.

## 7. How do MongoDB transactions work?

### What it is

MongoDB transactions allow multiple operations to commit or roll back together.

### Where I used it

I used transactions for multi-document operations like creating related records or updating balances.

### Why I chose it

They protect consistency when multiple writes must succeed together.

### Trade-offs

Transactions add overhead and should not replace good data modeling.

### Failure cases

Long transactions can hold locks, conflict, or fail under high load.

### How I monitored/debugged it

I monitor transaction duration, aborts, write conflicts, and database latency.

## 8. How do you design MongoDB aggregations?

### What it is

Aggregation pipelines transform and analyze documents through stages like match, group, lookup, sort, and project.

### Where I used it

I used aggregations for dashboards, counts, reports, joins, and analytics.

### Why I chose it

It lets the database process data close to storage instead of moving everything to the app.

### Trade-offs

Complex pipelines can be hard to maintain and may consume database resources.

### Failure cases

Running `$lookup` or `$sort` on large unindexed data can become slow.

### How I monitored/debugged it

I use explain plans, stage timing, index checks, memory limits, and slow query logs.

## 9. Cursor pagination vs skip pagination?

### What it is

Skip pagination uses `skip` and `limit`. Cursor pagination uses a stable field like `_id` or `createdAt` to fetch the next page.

### Where I used it

I used skip for small admin pages and cursor pagination for large feeds, logs, and infinite scroll.

### Why I chose it

Cursor pagination performs better for deep pages and changing datasets.

### Trade-offs

Skip is easier to implement. Cursor requires stable sorting and cursor encoding.

### Failure cases

Large skip values force MongoDB to scan and discard many records.

### How I monitored/debugged it

I monitor query time by page depth, docs examined, and index usage.

## 10. How do you enforce uniqueness in MongoDB?

### What it is

Unique indexes prevent duplicate values for one or more fields.

### Where I used it

I used unique indexes for email, mobile, username, account identifiers, and relation pairs.

### Why I chose it

Database-level uniqueness is safer than app-only checks.

### Trade-offs

Unique indexes require careful handling during migrations and duplicate cleanup.

### Failure cases

Race conditions can create duplicates if uniqueness is checked only in application code.

### How I monitored/debugged it

I track duplicate key errors, audit existing duplicates, and test concurrent create flows.

## 11. How do TTL indexes work?

### What it is

TTL indexes automatically delete documents after a configured time.

### Where I used it

I used TTL indexes for OTP tokens, temporary sessions, password reset tokens, and short-lived logs.

### Why I chose it

It avoids manual cleanup jobs for temporary data.

### Trade-offs

TTL deletion is not immediate; MongoDB cleans up in the background.

### Failure cases

Wrong date field or TTL value can delete data too early or not at all.

### How I monitored/debugged it

I check index definitions, document expiry fields, collection counts, and cleanup timing.

## 12. How do you design multi-tenant MongoDB data?

### What it is

Multi-tenant design separates data by tenant, account, or organization.

### Where I used it

I used `owner`, `accountId`, or `tenantId` fields on user-owned collections.

### Why I chose it

It prevents one tenant from accessing another tenant's data and supports tenant-level queries.

### Trade-offs

Every query must include tenant scope, and indexes should include tenant fields.

### Failure cases

Missing tenant filters can leak data across accounts.

### How I monitored/debugged it

I test cross-tenant access, review queries, log tenant ids, and use compound indexes with tenant id.

## 13. How do you backup and restore MongoDB?

### What it is

Backup and restore processes protect data from accidental deletion, corruption, or disasters.

### Where I used it

I used managed snapshots, scheduled backups, export jobs, and restore drills.

### Why I chose it

Backups are only useful if restore is tested and recovery targets are known.

### Trade-offs

Frequent backups improve recovery but increase storage cost.

### Failure cases

Untested backups may fail during real incidents.

### How I monitored/debugged it

I monitor backup status, restore duration, backup age, storage usage, and run restore drills.

## 14. How do you handle schema changes in MongoDB?

### What it is

Schema changes update document shape, required fields, indexes, or validation rules over time.

### Where I used it

I used backward-compatible changes, optional fields, backfills, and phased deployments.

### Why I chose it

MongoDB is flexible, but applications still need predictable data contracts.

### Trade-offs

Flexible schema speeds development but can create inconsistent documents.

### Failure cases

New code may assume a field exists while old documents do not have it.

### How I monitored/debugged it

I use schema validation, migration scripts, data audits, and error logs for missing fields.

## 15. How do you use change streams?

### What it is

Change streams let applications listen to MongoDB insert, update, delete, and replace events.

### Where I used it

I used them for audit logs, notifications, cache invalidation, and event-driven workflows.

### Why I chose it

They allow reactive processing without polling.

### Trade-offs

Consumers must handle resume tokens, retries, and duplicate processing.

### Failure cases

If consumers fall behind or lose resume tokens, events can be missed.

### How I monitored/debugged it

I monitor stream errors, resume token handling, lag, processed event counts, and retry behavior.
