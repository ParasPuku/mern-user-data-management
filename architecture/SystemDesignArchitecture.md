# System Design Architecture Interview Questions

## 1. Monolithic Architecture vs Microservices Architecture

### What it is

Monolithic architecture means the application is built and deployed as one single unit. The UI, business logic, APIs, background jobs, and data access may be organized into modules, but they usually run inside one deployable application.

Microservices architecture means the system is split into multiple small services. Each service owns a specific business capability, runs independently, and communicates with other services over APIs, messaging, or events.

### Simple interview answer

Monolith is simpler to build, test, deploy, and debug in the beginning because everything is in one application.

Microservices are useful when the system becomes large, teams need independent ownership, services need independent scaling, or different parts of the system need separate deployment and failure isolation.

### Detailed Difference

| Area | Monolithic Architecture | Microservices Architecture |
| --- | --- | --- |
| Codebase | Usually one main codebase | Multiple service codebases or packages |
| Deployment | Entire application is deployed together | Each service can be deployed independently |
| Scaling | Scale the whole application | Scale only the service that needs more capacity |
| Team ownership | Multiple teams may work in same app | Each team can own one or more services |
| Development speed | Fast at early stage | Faster at large scale if teams are independent |
| Initial complexity | Low | High |
| Operational complexity | Low to medium | High |
| Infrastructure need | Simple server/container setup | Service discovery, gateway, monitoring, messaging, orchestration |
| Communication | In-process function/module calls | Network calls, queues, events, gRPC, REST |
| Latency | Usually lower because calls are in-process | Higher because calls go over network |
| Failure isolation | One bug can affect whole app | One service can fail without taking down everything, if designed well |
| Database | Often one shared database | Ideally each service owns its own database/schema |
| Transactions | Easier with single database transactions | Harder because distributed transactions are complex |
| Data consistency | Strong consistency is easier | Often eventual consistency is used |
| Testing | Easier end-to-end setup | Requires contract tests, integration tests, and service mocks |
| Debugging | Easier because flow is in one process | Harder because request crosses services |
| Monitoring | Basic logs and metrics may be enough initially | Requires centralized logs, metrics, tracing, and correlation ids |
| Security | Security boundaries mostly inside one app | Each service needs auth, network security, secrets, and access control |
| Release risk | One release can affect full system | Smaller releases, but dependency compatibility matters |
| Rollback | Roll back whole app | Roll back individual services, but schema/event compatibility matters |
| Technology choice | Usually one main stack | Services can use different stacks if needed |
| Cost | Usually cheaper at the start | Higher infra and operational cost |
| Local setup | Easier | Harder because many services/dependencies may be needed |
| Data duplication | Usually less duplication | Some duplication may happen for service independence |
| Ownership boundaries | Can become unclear as app grows | Clearer if services map to business domains |
| Best for | Small to medium apps, MVPs, early products | Large systems, independent teams, high-scale domains |

### Where I used it

I would use a monolith for early-stage products, admin portals, internal tools, MVPs, and systems where one team owns most features.

I would use microservices when the product has grown enough that multiple teams need independent deployment, parts of the system need separate scaling, or business domains are clearly separated, such as auth, payments, notifications, search, orders, billing, and reporting.

### Why I chose it

I would start with a modular monolith unless there is a strong reason to start with microservices.

A modular monolith gives clean internal boundaries without the operational cost of distributed systems. Later, if one module becomes large or needs independent scaling, it can be extracted into a service.

I would choose microservices when the organization and system are mature enough to handle service ownership, observability, CI/CD, distributed debugging, and data consistency challenges.

### Trade-offs

Monolith advantages:

- Simple deployment
- Easier debugging
- Easier local development
- Easier transactions
- Lower infrastructure cost
- Faster initial development
- Simpler monitoring

Monolith disadvantages:

- Whole app must be deployed together
- Harder to scale only one feature
- Codebase can become tightly coupled
- Large teams can block each other
- One failure can affect the whole app
- Build and test time can grow

Microservices advantages:

- Independent deployment
- Independent scaling
- Clear team ownership
- Better failure isolation
- Smaller services are easier to reason about
- Different services can choose different storage or technology when justified
- Works well with domain-driven design

Microservices disadvantages:

- More infrastructure complexity
- Network latency
- Distributed tracing required
- Harder local setup
- Harder data consistency
- More complicated testing
- More DevOps maturity needed
- Higher cost
- More security boundaries to manage

### Failure cases

Common monolith failure cases:

- Codebase becomes too tightly coupled
- One bad deployment breaks the whole system
- One slow module slows the whole app
- Teams conflict in the same repository
- Database becomes a bottleneck
- Build and test pipeline becomes slow

Common microservices failure cases:

- Services are split too early
- Boundaries are chosen incorrectly
- Too many network calls create latency
- One service failure causes cascading failure
- No distributed tracing makes debugging painful
- Shared database between services creates tight coupling
- Eventual consistency is not handled properly
- Deployment order between services becomes fragile
- Local development becomes difficult

### How I monitored/debugged it

For monolith:

- Application logs
- API latency
- Error rate
- Database slow queries
- CPU and memory
- Build/test duration
- Module-level performance metrics

For microservices:

- Centralized logs
- Distributed tracing
- Correlation ids
- Service-level latency
- Error rate per service
- Queue depth
- Retry count
- Circuit breaker metrics
- Dependency health
- API contract test results
- Deployment version per service

### How services communicate in microservices

Microservices usually communicate in two ways:

Synchronous communication:

- REST
- gRPC
- GraphQL between gateway and services

Use this when the caller needs an immediate response.

Asynchronous communication:

- Message queues
- Event streams
- Pub/Sub
- Kafka
- RabbitMQ
- SQS

Use this when work can happen later or services should be loosely coupled.

### Database design difference

In a monolith, one shared database is common and acceptable.

In microservices, each service should ideally own its data. Other services should not directly read or write another service's database tables or collections.

Example:

```txt
Auth Service -> auth database
User Service -> user database
Order Service -> order database
Payment Service -> payment database
Notification Service -> notification database
```

This improves ownership but introduces eventual consistency.

### Transaction handling difference

In a monolith, transactions are simple because one database transaction can update multiple tables/collections.

In microservices, one business operation may touch multiple services. Distributed transactions are hard, so systems often use:

- Saga pattern
- Outbox pattern
- Event-driven workflows
- Idempotent consumers
- Retry with backoff
- Compensating actions

Example:

```txt
Order Created
-> Payment Reserved
-> Inventory Reduced
-> Notification Sent
```

If payment fails, the order may need to be cancelled using a compensating action.

### Migration approach from monolith to microservices

Do not split everything at once.

Safer process:

1. Start with modular monolith boundaries.
2. Identify modules with clear business ownership.
3. Extract the module with the highest scaling or ownership need.
4. Create API contracts.
5. Move data ownership gradually.
6. Add observability before and after extraction.
7. Use events or APIs for communication.
8. Keep rollback plan ready.

Good candidates to extract first:

- Notifications
- Search
- File processing
- Reporting
- Payments
- Authentication

Bad candidates to extract first:

- Highly coupled core logic
- Modules with unclear ownership
- Modules with heavy shared database dependencies

### When to choose monolith

Choose monolith when:

- Product is early stage
- Team is small
- Domain boundaries are unclear
- Requirements change frequently
- Infrastructure maturity is low
- Strong consistency is needed
- You want faster initial delivery

### When to choose microservices

Choose microservices when:

- Team size is large
- Domain boundaries are clear
- Independent deployments are needed
- Some modules need independent scaling
- System needs better failure isolation
- Organization has DevOps maturity
- Observability and CI/CD are strong
- Services can own their own data

### Best senior-level answer

I would not start with microservices just because they are popular. I would usually start with a modular monolith, keep clear boundaries, and extract services only when there is a real need like team ownership, scaling pressure, deployment independence, or failure isolation.

Microservices solve organizational and scaling problems, but they introduce distributed system problems. So the decision should be based on business scale, team maturity, operational readiness, and domain boundaries.

## 2. How do microservices run in production?

### What it is

Microservices usually run as separate deployable applications. Each service can run in its own container, pod, process, or serverless function.

In modern production systems, microservices commonly run on:

- Docker containers
- Kubernetes pods
- ECS services
- Serverless functions
- VM-based process managers

### Where I used it

I would run each service independently, for example:

```txt
Auth Service
User Service
Order Service
Payment Service
Notification Service
Search Service
```

Each service has its own build pipeline, deployment, logs, metrics, health checks, and scaling rules.

### Why I chose it

Independent runtime lets each service scale, deploy, fail, and recover separately.

Example:

```txt
Notification Service has high load
-> Scale only notification service
-> Do not scale the full system
```

### Trade-offs

Running services separately increases infrastructure complexity. You need service discovery, load balancing, secrets, logging, tracing, CI/CD, and monitoring for each service.

### Failure cases

- One service may fail to start because of missing config
- A service may be healthy but unable to connect to database
- One service may consume too much CPU or memory
- Deployment of one service may break another service because of contract mismatch
- Autoscaling may not happen fast enough during traffic spikes

### How I monitored/debugged it

I monitor:

- Service health checks
- Pod/container restart count
- CPU and memory
- API latency
- Error rate
- Logs per service
- Deployment version
- Dependency health
- Kubernetes/ECS events

## 3. How do microservices communicate with each other?

### What it is

Microservices communicate using either synchronous or asynchronous communication.

Synchronous communication means one service calls another and waits for a response.

Asynchronous communication means one service publishes a message or event, and another service processes it later.

### Where I used it

Synchronous examples:

```txt
Order Service -> User Service: Get user details
API Gateway -> Product Service: Get product list
Frontend -> Auth Service: Login
```

Asynchronous examples:

```txt
Order Service publishes OrderCreated event
Payment Service consumes OrderCreated
Notification Service sends order email
Inventory Service reserves stock
```

### Why I chose it

Use synchronous communication when immediate response is required.

Use asynchronous communication when services should be loosely coupled or work can happen later.

### Trade-offs

Synchronous communication is simple but creates runtime dependency. If downstream service is slow, caller becomes slow.

Asynchronous communication improves resilience but introduces eventual consistency and more complex debugging.

### Failure cases

- Network timeout
- Downstream service is down
- Message is processed twice
- Message is never processed
- Event schema changes break consumers
- Circular service calls create latency and coupling

### How I monitored/debugged it

I monitor:

- API call latency between services
- Timeout rate
- Retry count
- Queue depth
- Dead-letter queue messages
- Consumer lag
- Distributed traces
- Correlation ids

## 4. What happens if one microservice goes down?

### What it is

If one service goes down, the impact depends on whether other services depend on it synchronously or asynchronously.

### Where I used it

Example:

```txt
Notification Service is down
-> Orders can still be placed
-> Notification events wait in queue
-> Emails are sent when service recovers
```

Another example:

```txt
Payment Service is down
-> Checkout cannot complete
-> Order may stay in pending state
-> User should see clear failure message
```

### Why I chose it

Microservices should be designed so one service failure does not automatically take down the whole system.

### Trade-offs

Failure isolation requires extra patterns like queues, circuit breakers, retries, fallback responses, and graceful degradation.

### Failure cases

- Cascading failure: one down service causes other services to fail
- Retry storm: many services repeatedly retry and overload the failed service
- Data inconsistency: one step succeeds and another fails
- User sees timeout instead of meaningful error
- Queue grows too large while consumer is down

### How I monitored/debugged it

I monitor:

- Service availability
- Error rate
- Timeout rate
- Circuit breaker open state
- Queue depth
- Retry count
- Dead-letter queue
- Dependency dashboard
- User-facing error rate

## 5. How do you prevent cascading failures in microservices?

### What it is

Cascading failure happens when one service failure spreads to other services.

### Where I used it

I use resilience patterns around service-to-service calls, especially for payment, notification, search, and external APIs.

### Why I chose it

One failed dependency should not exhaust all threads, connections, or workers of the caller service.

### Trade-offs

Resilience patterns add complexity and require careful tuning.

### Failure cases

- Infinite retries
- No timeout
- Too many open connections
- No fallback behavior
- One slow service consumes all request capacity

### How I monitored/debugged it

I use:

- Timeouts
- Retries with exponential backoff
- Circuit breakers
- Bulkheads
- Rate limits
- Queue-based buffering
- Fallback responses
- Dependency health dashboards

## 6. What is service discovery in microservices?

### What it is

Service discovery helps one service find the network location of another service.

In Kubernetes, services are discovered using DNS names.

Example:

```txt
http://user-service.default.svc.cluster.local
```

### Where I used it

I use service discovery when APIs run in containers or pods where IP addresses change frequently.

### Why I chose it

Microservice instances can scale up/down or restart, so hardcoding IP addresses is not reliable.

### Trade-offs

Service discovery adds dependency on platform networking and DNS.

### Failure cases

- DNS failure
- Wrong service name
- Wrong namespace
- Service points to no healthy pods
- Network policy blocks traffic

### How I monitored/debugged it

I check:

- DNS resolution
- Kubernetes service endpoints
- Pod labels/selectors
- Network policies
- Service mesh metrics
- Connection errors

## 7. What is API Gateway in microservices?

### What it is

An API Gateway is an entry point that routes client requests to backend services.

It can handle:

- Routing
- Authentication
- Rate limiting
- Request validation
- Response transformation
- Logging
- SSL termination

### Where I used it

Frontend calls the gateway instead of calling every microservice directly.

Example:

```txt
React App -> API Gateway -> Auth Service
React App -> API Gateway -> User Service
React App -> API Gateway -> Order Service
```

### Why I chose it

It gives clients one stable entry point and hides internal service structure.

### Trade-offs

Gateway can become a bottleneck or single point of failure if not scaled properly.

### Failure cases

- Gateway outage affects all APIs
- Wrong route configuration
- Auth logic duplicated between gateway and services
- Gateway becomes too much like a monolith

### How I monitored/debugged it

I monitor:

- Gateway latency
- Route-level error rate
- Auth failures
- Rate-limit hits
- Upstream service errors
- Request logs
- Traces from gateway to services

## 8. How do microservices handle data consistency?

### What it is

Microservices usually avoid sharing one database. Each service owns its own data, so consistency across services is often eventual.

### Where I used it

Example:

```txt
Order Service creates order
Payment Service confirms payment
Inventory Service reserves stock
Notification Service sends email
```

These steps may not all complete at the exact same time.

### Why I chose it

Independent data ownership reduces coupling and allows each service to evolve separately.

### Trade-offs

Eventual consistency is harder to reason about than one database transaction.

### Failure cases

- Payment succeeds but order update fails
- Inventory is reserved but order is cancelled
- Event is published but not consumed
- Duplicate event creates duplicate side effect

### How I monitored/debugged it

I use:

- Saga pattern
- Outbox pattern
- Idempotency keys
- Retry with backoff
- Dead-letter queues
- Event logs
- Reconciliation jobs

## 9. What is Saga pattern in microservices?

### What it is

Saga pattern manages a business transaction across multiple services using a sequence of local transactions.

If one step fails, compensating actions undo previous steps.

### Where I used it

Example order flow:

```txt
Create Order
Reserve Payment
Reserve Inventory
Confirm Order
Send Notification
```

If inventory reservation fails:

```txt
Cancel Payment Reservation
Cancel Order
```

### Why I chose it

It avoids distributed database transactions while keeping business workflows recoverable.

### Trade-offs

Saga logic is more complex than a single transaction.

### Failure cases

- Compensation action fails
- Duplicate events trigger duplicate compensation
- Workflow gets stuck in pending state
- Event order is wrong

### How I monitored/debugged it

I monitor:

- Saga state
- Failed steps
- Compensation attempts
- Retry count
- Stuck workflows
- Event history

## 10. What is circuit breaker pattern?

### What it is

Circuit breaker stops calling a failing service temporarily so the caller does not keep waiting or retrying endlessly.

### Where I used it

I use it around external APIs, payment gateways, search services, notification services, and unstable dependencies.

### Why I chose it

It prevents cascading failure and gives the failing service time to recover.

### Trade-offs

If the circuit opens too aggressively, valid requests may be blocked.

### Failure cases

- Circuit threshold too low
- Circuit never closes
- Fallback response is not useful
- No alert when circuit opens

### How I monitored/debugged it

I monitor:

- Circuit state
- Failure percentage
- Timeout rate
- Fallback count
- Recovery time
- Dependency health

## 11. How do microservices handle retries?

### What it is

Retries repeat failed operations when the failure may be temporary.

### Where I used it

I use retries for network timeouts, external API calls, queue processing, and temporary database failures.

### Why I chose it

Retries improve reliability when failures are transient.

### Trade-offs

Bad retries can overload a struggling service.

### Failure cases

- Retry storm
- Duplicate processing
- Long user wait time
- Retrying non-retryable errors like validation failures

### How I monitored/debugged it

I use:

- Exponential backoff
- Max retry limits
- Jitter
- Dead-letter queues
- Idempotency keys
- Retry metrics

## 12. How do you debug an issue across multiple microservices?

### What it is

Debugging across services means following one request or business flow across many applications.

### Where I used it

Example:

```txt
User places order
-> Gateway
-> Order Service
-> Payment Service
-> Inventory Service
-> Notification Service
```

### Why I chose it

Without a cross-service view, debugging distributed systems is slow and guess-based.

### Trade-offs

Distributed tracing and structured logging need setup and consistent implementation.

### Failure cases

- Missing correlation id
- Logs in different systems
- No trace from async messages
- Different services use different error formats

### How I monitored/debugged it

I use:

- Correlation id
- Distributed tracing
- Centralized logging
- Service dashboards
- Queue metrics
- Deployment version tracking
- Error aggregation

## 13. How do you decide service boundaries?

### What it is

Service boundaries define what each microservice owns.

### Where I used it

I divide services around business capabilities, not technical layers.

Good examples:

```txt
Auth Service
Payment Service
Notification Service
Order Service
Inventory Service
Search Service
```

Bad examples:

```txt
Controller Service
Database Service
Validation Service
Utility Service
```

### Why I chose it

Business-aligned services have clearer ownership and lower coupling.

### Trade-offs

Boundaries are hard to get right early because domain understanding evolves.

### Failure cases

- Services too small create chatty communication
- Services too large become mini-monoliths
- Shared database creates hidden coupling
- Wrong ownership creates team dependency

### How I monitored/debugged it

I watch:

- Cross-service call frequency
- Deployment dependency
- Shared table usage
- Team ownership conflicts
- Change coupling between services

