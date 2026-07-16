# System Design Architecture Interview Questions

Study priority: Questions 1 to 18 are the most commonly asked interview topics. Questions 19 onward are additional topics to revise after the priority set.

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

### How I implemented it

I start with a modular monolith when the domain is still evolving. I keep modules separated by business capability, avoid mixing responsibilities, and make module boundaries clear. When a module needs independent scaling, ownership, or deployment, I extract it behind an API or event contract and move its data ownership gradually.

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

## 2. How do microservices communicate with each other?

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

### How I implemented it

For immediate reads, I use REST or gRPC with timeouts and retries. For workflows, I publish events to a queue or stream. I include correlation ids, version event payloads, make consumers idempotent, and send failed messages to a dead-letter queue.

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

## 3. What is API Gateway in microservices?

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

### How I implemented it

I configure gateway routes by path or domain, centralize authentication and rate limiting where appropriate, forward correlation ids, keep business logic inside services, and monitor upstream latency/error rate per route.

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

## 4. How do microservices handle data consistency?

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

### How I implemented it

I let each service own its database, publish domain events after local commits, use the outbox pattern for reliable event publishing, make consumers idempotent, and run reconciliation jobs for stuck or inconsistent records.

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

## 5. What is Saga pattern in microservices?

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

### How I implemented it

I model each saga as a sequence of local transactions with explicit states. Each step emits an event or command. If a later step fails, I trigger compensating actions and track the saga state until it completes or fails permanently.

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

## 6. What is circuit breaker pattern?

### What it is

Circuit breaker stops calling a failing service temporarily so the caller does not keep waiting or retrying endlessly.

### Where I used it

I use it around external APIs, payment gateways, search services, notification services, and unstable dependencies.

### How I implemented it

I wrap dependency calls with a circuit breaker that opens after repeated failures or timeouts. While open, calls fail fast or return fallback responses. After a cooldown, it allows test calls to check recovery.

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

## 7. How do microservices handle retries?

### What it is

Retries repeat failed operations when the failure may be temporary.

### Where I used it

I use retries for network timeouts, external API calls, queue processing, and temporary database failures.

### How I implemented it

I retry only retryable errors, use exponential backoff with jitter, set a max retry count, make operations idempotent, and send permanently failed async messages to a dead-letter queue.

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

## 8. What happens if one microservice goes down?

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

### How I implemented it

I define dependency behavior per service. Non-critical services like notification fail asynchronously through queues. Critical services like payment return a clear failure or pending state. I add timeouts, circuit breakers, fallback responses, and alerts.

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

## 9. How do you debug an issue across multiple microservices?

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

### How I implemented it

I generate a correlation id at the gateway, pass it through HTTP headers and message metadata, log it in every service, and use distributed tracing to visualize the full request path.

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

## 10. How do you decide service boundaries?

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

### How I implemented it

I use domain-driven design thinking: identify business capabilities, data ownership, change frequency, team ownership, and transaction boundaries. I avoid extracting a service until its boundary is stable enough.

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

## 11. What is caching?

### What it is

Caching means storing frequently used data in a fast place so we do not need to calculate or fetch it again every time.

Common cache stores:

- Browser cache
- CDN cache
- In-memory cache
- Redis
- Memcached

### Simple beginner answer

Cache saves data temporarily so future requests become faster.

Example:

```txt
First request:
API -> Database -> Return data -> Save result in cache

Next request:
API -> Cache -> Return data quickly
```

### Why it is useful

Caching helps reduce:

- Database load
- API latency
- Server cost
- Repeated computation

### Trade-offs

The hardest part of caching is invalidation. Cached data can become stale if the original data changes.

### Failure cases

- Serving old data from cache
- Cache key is designed poorly
- Cache memory becomes full
- Cache server goes down
- No fallback to database

### Best beginner-level answer

Caching stores frequently used data in a faster location, like Redis or memory, so the system can respond faster and reduce database load.


## 12. What is Load Balancer?
A load balancer acts like a traffic cop at a busy intersection. It sits in front of your servers and routes incoming user requests across a group of backend machines. This ensures no single server gets overwhelmed, keeping applications fast and preventing crashes during traffic spikes.

1. How It Works (The Traffic Director)
Instead of all users connecting to a single server, they connect to the load balancer's IP address. The load balancer evaluates the incoming request and forwards it to the best available server in a server pool.

2. The Core Benefits
- Prevents Overload: It evenly distributes the workload so servers can operate smoothly without hitting a breaking point.
- High Availability (Failover): The load balancer constantly checks if servers are healthy. If a server crashes, it instantly stops sending traffic to that broken machine and reroutes users to the healthy ones.
- Scalability: It allows you to easily add or remove servers without interrupting the user experience.

3. Common Routing Methods
How does it decide where to send the traffic? It uses specific rules:
- Round Robin: It sends requests to each server in turn (Server 1, Server 2, Server 3, Server 1...).
- Least Connections: It checks which server currently has the fewest active connections and routes the new user there.

## 12. Horizontal scaling vs vertical scaling

### What it is

Scaling means increasing system capacity so it can handle more users, requests, or data.

Vertical scaling means increasing the power of one machine.

Horizontal scaling means adding more machines.

### Simple beginner answer

Vertical scaling:

```txt
Use a bigger server
```

Horizontal scaling:

```txt
Use more servers
```

### Detailed Difference

| Area | Vertical Scaling | Horizontal Scaling |
| --- | --- | --- |
| Meaning | Make one server stronger | Add more servers |
| Example | More CPU, RAM, storage | More app instances |
| Complexity | Simpler | More complex |
| Limit | Hardware limit exists | Can scale much further |
| Cost | Can become expensive | Often more flexible |
| Failure risk | One big server can be single point of failure | Better availability if designed well |
| Best for | Small to medium systems | Large traffic systems |

### Why it is useful

Vertical scaling is easy at first. Horizontal scaling is better when the system needs high availability and large-scale traffic handling.

### Trade-offs

Horizontal scaling needs load balancing, shared session handling, distributed logging, and careful database design.

### Best beginner-level answer

Vertical scaling means making one server bigger. Horizontal scaling means adding more servers. Start with vertical scaling for simplicity, but use horizontal scaling when traffic and reliability needs grow.

## 13. What is a message queue?

### What it is

A message queue is a system that stores messages until another service is ready to process them.

Common examples:

- RabbitMQ
- Kafka
- Amazon SQS
- Google Pub/Sub

### Simple beginner answer

A queue is like a waiting line for background work.

Example:

```txt
User signs up
-> API saves user
-> API adds SendWelcomeEmail message to queue
-> Email worker reads queue
-> Email worker sends email
```

The user does not need to wait for the email to be sent before getting a response.

### Why it is useful

Message queues help with:

- Background processing
- Retry handling
- Load smoothing
- Loose coupling
- Better failure recovery

### Trade-offs

Queues add operational complexity and eventual consistency.

### Failure cases

- Queue grows too large
- Messages are processed multiple times
- Failed messages are not moved to a dead-letter queue
- Consumer is too slow
- No idempotency handling

### Best beginner-level answer

A message queue stores work that can be processed later. It helps make systems more reliable and responsive, especially for background tasks like emails, notifications, reports, and file processing.

## 14. What is event-driven architecture?

### What it is

Event-driven architecture is a style where services communicate by producing and consuming events.

An event means something important happened in the system.

Examples:

```txt
UserRegistered
OrderCreated
PaymentCompleted
PasswordResetRequested
ProductStockUpdated
```

### Simple beginner answer

Instead of one service directly calling many services, it publishes an event. Other services listen and react to that event.

Example:

```txt
Order Service publishes OrderCreated
-> Payment Service starts payment process
-> Inventory Service reserves stock
-> Notification Service sends order email
```

### Why it is useful

Event-driven architecture helps services stay loosely coupled.

### Trade-offs

It can be harder to debug because the flow is asynchronous and spread across multiple services.

### Failure cases

- Event is processed more than once
- Event is lost
- Consumer fails but no retry exists
- Event schema changes break consumers
- Debugging is hard without correlation ids

### Best beginner-level answer

Event-driven architecture means services communicate through events. It helps build loosely coupled systems, but it needs good monitoring, retries, idempotency, and event versioning.

## 15. What is SOLID principle in software programming?

### What it is

SOLID is a set of five software design principles that help developers write code that is easier to understand, change, test, and maintain.

SOLID is especially useful when an application starts growing and many developers work on the same codebase.

The five SOLID principles are:

```txt
S -> Single Responsibility Principle
O -> Open/Closed Principle
L -> Liskov Substitution Principle
I -> Interface Segregation Principle
D -> Dependency Inversion Principle
```

### Simple beginner answer

SOLID helps us write clean code by keeping responsibilities clear, reducing tight coupling, and making future changes easier.

As a beginner, you can think of SOLID like this:

- A class or function should do one main job
- New features should be added without breaking old working code
- Child classes should behave correctly like their parent classes
- Do not force code to depend on methods it does not use
- Depend on abstractions, not hard-coded implementations

### 1. Single Responsibility Principle

Single Responsibility Principle means one class, function, or module should have one main reason to change.

Bad example:

```js
class UserService {
  createUser(user) {
    // save user
  }

  sendWelcomeEmail(user) {
    // send email
  }

  generateUserReport() {
    // generate report
  }
}
```

This class is doing too many things:

- User creation
- Email sending
- Report generation

Better example:

```js
class UserService {
  createUser(user) {
    // save user
  }
}

class EmailService {
  sendWelcomeEmail(user) {
    // send email
  }
}

class ReportService {
  generateUserReport() {
    // generate report
  }
}
```

Now each class has one clear responsibility.

### 2. Open/Closed Principle

Open/Closed Principle means code should be open for extension but closed for modification.

This means we should be able to add new behavior without changing old working code again and again.

Bad example:

```js
function calculateDiscount(userType, price) {
  if (userType === "regular") {
    return price * 0.05;
  }

  if (userType === "premium") {
    return price * 0.1;
  }

  return 0;
}
```

If a new user type is added, we must modify this function.

Better example:

```js
class RegularDiscount {
  calculate(price) {
    return price * 0.05;
  }
}

class PremiumDiscount {
  calculate(price) {
    return price * 0.1;
  }
}

class GoldDiscount {
  calculate(price) {
    return price * 0.2;
  }
}
```

Now we can add new discount types by creating new classes instead of changing old logic.

### 3. Liskov Substitution Principle

Liskov Substitution Principle means a child class should be usable wherever its parent class is expected.

Simple meaning: if a class extends another class, it should not break the expected behavior of the parent class.

Bad example:

```js
class Bird {
  fly() {
    console.log("Flying");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins cannot fly");
  }
}
```

This is a problem because `Penguin` is a `Bird`, but it cannot behave like a flying bird.

Better example:

```js
class Bird {}

class FlyingBird extends Bird {
  fly() {
    console.log("Flying");
  }
}

class Sparrow extends FlyingBird {}

class Penguin extends Bird {}
```

Now only birds that can actually fly use the `fly()` behavior.

### 4. Interface Segregation Principle

Interface Segregation Principle means code should not be forced to depend on methods it does not need.

Simple meaning: smaller and specific interfaces are better than one large interface.

Bad example:

```ts
interface Worker {
  code(): void;
  design(): void;
  test(): void;
}
```

This is not good because not every worker codes, designs, and tests.

Better example:

```ts
interface Developer {
  code(): void;
}

interface Designer {
  design(): void;
}

interface Tester {
  test(): void;
}
```

Now each role depends only on the behavior it actually needs.

### 5. Dependency Inversion Principle

Dependency Inversion Principle means high-level code should not directly depend on low-level implementation details. Both should depend on abstractions.

Simple meaning: depend on what something can do, not on the exact class that does it.

Bad example:

```js
class EmailService {
  send(message) {
    console.log(`Email sent: ${message}`);
  }
}

class NotificationService {
  constructor() {
    this.emailService = new EmailService();
  }

  notify(message) {
    this.emailService.send(message);
  }
}
```

Here `NotificationService` is tightly coupled to `EmailService`.

Better example:

```js
class EmailService {
  send(message) {
    console.log(`Email sent: ${message}`);
  }
}

class SmsService {
  send(message) {
    console.log(`SMS sent: ${message}`);
  }
}

class NotificationService {
  constructor(sender) {
    this.sender = sender;
  }

  notify(message) {
    this.sender.send(message);
  }
}

const notification = new NotificationService(new EmailService());
notification.notify("Welcome user");
```

Now `NotificationService` can work with email, SMS, push notification, or any sender that has a `send()` method.

### SOLID in React: simple examples

In React, SOLID applies to components, custom hooks, props, Context, and service modules rather than only classes.

#### S: Single Responsibility Principle

Keep fetching logic in a hook and rendering logic in a component.

```tsx
function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then((response) => response.json()).then(setUsers);
  }, []);

  return users;
}

function UserList({ users }) {
  return <ul>{users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
}

function UsersPage() {
  return <UserList users={useUsers()} />;
}
```

#### O: Open/Closed Principle

Use props to extend a component instead of adding a new conditional for every design variation.

```tsx
function Button({ variant = 'primary', children }) {
  return <button className={`button button--${variant}`}>{children}</button>;
}

<Button>Save</Button>
<Button variant="danger">Delete</Button>
```

#### L: Liskov Substitution Principle

Components that follow the same props contract should be safely interchangeable.

```tsx
function SaveButton({ onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled}>Save</button>;
}

function IconSaveButton({ onClick, disabled }) {
  return <button aria-label="Save" onClick={onClick} disabled={disabled}>💾</button>;
}

function Editor({ SaveControl = SaveButton }) {
  return <SaveControl onClick={() => console.log('saved')} disabled={false} />;
}
```

`IconSaveButton` can replace `SaveButton` because it accepts and respects the same props.

#### I: Interface Segregation Principle

Pass only the props a component needs.

```tsx
function Avatar({ name, imageUrl }) {
  return <img src={imageUrl} alt={name} />;
}

function UserProfile({ user }) {
  return <Avatar name={user.name} imageUrl={user.imageUrl} />;
}
```

`Avatar` is not coupled to unrelated fields such as `user.role`, `user.permissions`, or `user.address`.

#### D: Dependency Inversion Principle

Inject a dependency through props instead of hard-coding an API call inside the component.

```tsx
function UserForm({ saveUser }) {
  return (
    <button onClick={() => saveUser({ name: 'Asha' })}>
      Save user
    </button>
  );
}

const saveUserToApi = (user) => fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify(user),
});

<UserForm saveUser={saveUserToApi} />
```

This makes `UserForm` easier to test because a test can pass a fake `saveUser` function.

### React interview answer

```text
In React, SOLID means keeping each component or hook focused, using props and composition to extend UI, keeping interchangeable components consistent, passing only necessary props, and injecting services or callbacks rather than hard-coding dependencies.
```

### Why SOLID is useful

SOLID helps with:

- Cleaner code
- Easier debugging
- Easier testing
- Easier feature changes
- Less duplicate logic
- Less tightly coupled code
- Better long-term maintainability

### Trade-offs

SOLID is useful, but applying it too early or too strictly can make beginner code more complicated than needed.

For small scripts or simple features, keep the code simple. Use SOLID when code starts growing, changing often, or becoming hard to understand.

### Best beginner-level answer

SOLID is a group of five design principles used to write clean and maintainable software.

The main idea is to keep code focused, flexible, and loosely coupled. As a beginner, the most important principle to start with is Single Responsibility Principle. If a function or class is doing too many things, split it into smaller parts with clear responsibilities.

## 16. What is Dependency Injection?

### What it is

Dependency Injection means passing a dependency from outside instead of creating it directly inside a class or function.

### Simple beginner answer

Instead of a class creating everything it needs by itself, we give it the required object from outside.

Bad example:

```js
class UserService {
  constructor() {
    this.emailService = new EmailService();
  }
}
```

Here `UserService` is tightly connected to `EmailService`.

Better example:

```js
class UserService {
  constructor(emailService) {
    this.emailService = emailService;
  }
}

const userService = new UserService(new EmailService());
```

Now `UserService` can work with real email service, mock email service, SMS service, or test service.

### Why it is useful

Dependency Injection helps with:

- Loose coupling
- Easier testing
- Easier replacement of dependencies
- Better flexibility

### Trade-offs

For very small code, dependency injection can feel extra. It becomes more useful as the project grows.

### Best beginner-level answer

Dependency Injection means giving a class its required dependencies from outside. This makes the code less tightly coupled and easier to test.

## 17. What is MVC architecture?

### What it is

MVC means Model View Controller.

It is an architecture pattern that separates an application into three parts:

```txt
Model -> data and business rules
View -> UI or response format
Controller -> handles user request and connects model with view
```

### Simple beginner answer

MVC keeps data logic, UI logic, and request handling separate.

### Example

In a MERN-style backend:

```txt
User Model -> MongoDB user schema
User Controller -> handles signup, login, update profile
View/API Response -> JSON response sent to frontend
```

### Why it is useful

MVC makes applications easier to organize because every file has a clear role.

### Trade-offs

In large applications, controllers can become too big if business logic is not moved into services.

### Best beginner-level answer

MVC is a pattern that separates code into Model, View, and Controller. It helps keep the application organized and prevents all logic from being written in one place.

## 18. What is layered architecture?

### What it is

Layered architecture organizes code into separate layers. Each layer has a specific responsibility.

Common layers:

```txt
Presentation Layer -> UI or API routes
Controller Layer -> request and response handling
Service Layer -> business logic
Repository Layer -> database operations
Database Layer -> actual database
```

### Simple beginner answer

Layered architecture means requests pass through clear layers instead of all code being mixed together.

Example flow:

```txt
Frontend
-> Route
-> Controller
-> Service
-> Repository
-> Database
```

### Why it is useful

It improves readability, testability, and maintainability.

### Trade-offs

Too many layers can be overkill for a very small project.

### Failure cases

- Business logic is written inside controllers
- Database queries are written directly inside routes
- Layers are created but responsibilities are not clear
- Every small feature needs too many files

### Best beginner-level answer

Layered architecture splits an application into layers like controller, service, repository, and database. Each layer has one clear responsibility.

## 19. What is DRY principle?

### What it is

DRY means Don't Repeat Yourself.

It means we should avoid writing the same logic again and again in multiple places.

### Simple beginner answer

If the same code is repeated many times, move it into a reusable function, class, component, or helper.

Bad example:

```js
const userFullName = user.firstName + " " + user.lastName;
const adminFullName = admin.firstName + " " + admin.lastName;
const managerFullName = manager.firstName + " " + manager.lastName;
```

Better example:

```js
function getFullName(person) {
  return person.firstName + " " + person.lastName;
}

const userFullName = getFullName(user);
const adminFullName = getFullName(admin);
const managerFullName = getFullName(manager);
```

### Why it is useful

DRY helps because if logic changes, we update it in one place instead of many places.

### Trade-offs

Do not create an abstraction too early. Sometimes two pieces of code look similar but may change for different reasons. In that case, keeping them separate can be better.

### Best beginner-level answer

DRY means avoid duplicate logic. If the same logic appears in multiple places, extract it into a reusable function or module so the code is easier to maintain.

## 20. What is KISS principle?

### What it is

KISS means Keep It Simple, Stupid.

It means code and architecture should be as simple as possible while still solving the problem.

### Simple beginner answer

Do not make code more complicated than needed.

Bad example:

```js
function isAdult(age) {
  if (age >= 18) {
    return true;
  } else {
    return false;
  }
}
```

Better example:

```js
function isAdult(age) {
  return age >= 18;
}
```

### Why it is useful

Simple code is easier to read, debug, test, and explain in interviews.

### Trade-offs

Simple does not mean careless. We still need proper validation, error handling, and security where required.

### Best beginner-level answer

KISS means keep the solution simple. Avoid unnecessary complexity, patterns, and abstractions until they are actually needed.

## 21. What is YAGNI principle?

### What it is

YAGNI means You Aren't Gonna Need It.

It means we should not build features or abstractions before they are actually required.

### Simple beginner answer

Build what is needed now. Do not add extra code for imaginary future requirements.

Bad example:

```js
class PaymentService {
  payByCard() {}
  payByUpi() {}
  payByCrypto() {}
  payByGiftCard() {}
}
```

If the application only supports card payment today, the extra payment methods add unnecessary complexity.

Better example:

```js
class PaymentService {
  payByCard() {}
}
```

Add more payment methods when the product actually needs them.

### Why it is useful

YAGNI keeps the codebase smaller and easier to change.

### Trade-offs

YAGNI does not mean ignoring good design. We should still keep code clean enough to extend later.

### Best beginner-level answer

YAGNI means do not build something just because it might be useful in the future. Build the current requirement well, then extend when real requirements appear.

## 22. What is Separation of Concerns?

### What it is

Separation of Concerns means splitting software into parts where each part handles a specific concern or responsibility.

Example concerns:

- UI rendering
- Business logic
- API handling
- Database access
- Authentication
- Logging

### Simple beginner answer

Do not mix everything in one file or one function. Keep different responsibilities separate.

Bad example:

```js
async function registerUser(req, res) {
  // validate request
  // hash password
  // save user to database
  // send email
  // return response
}
```

Better structure:

```txt
Controller -> handles request and response
Service -> handles business logic
Repository -> handles database access
Email Service -> handles email sending
```

### Why it is useful

It makes code easier to read, test, reuse, and debug.

### Trade-offs

Too many tiny layers can make a small project harder to follow. Use separation where it improves clarity.

### Best beginner-level answer

Separation of Concerns means keeping different responsibilities in different places so the application does not become tightly mixed and hard to maintain.

## 23. What is Clean Architecture?

### What it is

Clean Architecture is an architecture style where business logic is kept independent from frameworks, databases, UI, and external tools.

The core idea is:

```txt
Business rules should not depend on external details.
External details should depend on business rules.
```

### Simple beginner answer

Clean Architecture keeps the most important business logic in the center and keeps frameworks and databases outside.

Common structure:

```txt
Entities -> core business objects
Use Cases -> application business rules
Controllers -> handle request and response
Repositories -> database access contracts
Infrastructure -> database, email, APIs, frameworks
```

### Why it is useful

It makes the core business logic easier to test and less dependent on technology choices.

Example:

If MongoDB changes to PostgreSQL, the main business rules should not need to change much.

### Trade-offs

Clean Architecture can add extra files and interfaces. It is very useful for large applications, but it can feel heavy for small projects.

### Best beginner-level answer

Clean Architecture separates business logic from technical details like database, framework, and UI. This makes the important logic easier to test, maintain, and reuse.

## 24. What is service discovery in microservices?

### What it is

Service discovery helps one service find the network location of another service.

In Kubernetes, services are discovered using DNS names.

Example:

```txt
http://user-service.default.svc.cluster.local
```

### Where I used it

I use service discovery when APIs run in containers or pods where IP addresses change frequently.

### How I implemented it

In Kubernetes, I call services by DNS name instead of pod IP. I define Services with correct selectors, use namespaces for isolation, and rely on Kubernetes to route traffic to healthy pods.

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

## 25. How do you prevent cascading failures in microservices?

### What it is

Cascading failure happens when one service failure spreads to other services.

### Where I used it

I use resilience patterns around service-to-service calls, especially for payment, notification, search, and external APIs.

### How I implemented it

I set strict timeouts, retry only transient failures with exponential backoff, add circuit breakers for unstable dependencies, isolate resources with bulkheads, use queues for async work, and define fallback responses.

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

## 26. How do microservices run in production?

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

### How I implemented it

I containerize each service, deploy it as its own Kubernetes Deployment or ECS service, give it separate environment variables/secrets, configure readiness and liveness checks, expose it through an internal service, and scale it independently based on CPU, memory, latency, or queue depth.

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
