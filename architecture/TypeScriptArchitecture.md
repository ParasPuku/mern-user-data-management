# TypeScript Architecture Interview Questions

## 1. Why use TypeScript in large applications?

### What it is

TypeScript adds static typing on top of JavaScript so many mistakes are caught before runtime.

### Where I used it

I used it in React apps, Node services, shared API contracts, Redux state, validation layers, and reusable libraries.

### Why I chose it

It improves maintainability, refactoring safety, onboarding, and API contract clarity in large teams.

### Trade-offs

It adds build steps, type maintenance, and learning curve. Bad types can also create false confidence.

### Failure cases

Overuse of `any`, outdated API types, and unsafe type assertions can bypass TypeScript protection.

### How I monitored/debugged it

I enforce strict mode, CI type checks, lint rules, code reviews, and avoid unchecked type assertions.

## 2. How do you type API responses safely?

### What it is

Typing API responses means defining expected response shapes and validating that data before using it.

### Where I used it

I used it for REST APIs, paginated lists, auth responses, error responses, and shared frontend-backend DTOs.

### Why I chose it

It prevents UI code from assuming fields exist when backend contracts change or return unexpected data.

### Trade-offs

Static types do not validate runtime data. For critical flows, runtime validation is still needed.

### Failure cases

Backend changes can break frontend silently if the response is cast using `as SomeType` without validation.

### How I monitored/debugged it

I use typed API clients, integration tests, contract tests, runtime validation for important inputs, and CI checks.

## 3. How do you avoid `any` spreading in a TypeScript codebase?

### What it is

Avoiding `any` means keeping unknown data explicit and narrowing it safely before usage.

### Where I used it

I used this in API clients, form handling, error handling, external library wrappers, and migration from JavaScript to TypeScript.

### Why I chose it

`any` disables type safety and allows errors to move deep into the application.

### Trade-offs

Strict typing takes more upfront effort, especially during migration or third-party integration.

### Failure cases

One `any` in a shared function can weaken type safety across many modules.

### How I monitored/debugged it

I use ESLint rules, `noImplicitAny`, code reviews, typed wrappers, and gradual migration plans.

## 4. Type vs interface: how do you decide?

### What it is

Both define shapes in TypeScript. Interfaces are often used for object contracts. Types are useful for unions, intersections, primitives, and advanced composition.

### Where I used it

I use interfaces for domain models and public object contracts, and types for API unions, utility types, and state variants.

### Why I chose it

This keeps object contracts readable while still using type aliases for flexible type composition.

### Trade-offs

Teams can over-debate this. Consistency matters more than choosing one everywhere.

### Failure cases

Inconsistent conventions make code harder to scan and maintain.

### How I monitored/debugged it

I document team conventions and enforce simple style through code review rather than heavy rules.

## 5. How do you share types between frontend and backend?

### What it is

Shared types define common contracts for API payloads, response shapes, and domain objects.

### Where I used it

I used shared packages in monorepos and generated types from OpenAPI or schema definitions.

### Why I chose it

It reduces mismatch between frontend expectations and backend responses.

### Trade-offs

Shared types can tightly couple services if not versioned properly.

### Failure cases

A backend-only domain model may leak internal fields to frontend if shared carelessly.

### How I monitored/debugged it

I use contract tests, package versioning, CI checks, and separate public DTO types from internal database types.

## 6. How do you use generics in real projects?

### What it is

Generics allow functions, components, and types to work with different data shapes while preserving type safety.

### Where I used it

I used generics in API clients, table components, form utilities, repository functions, and reusable hooks.

### Why I chose it

It reduces duplication while keeping strong typing for each use case.

### Trade-offs

Overly complex generics can make code hard to read and debug.

### Failure cases

Too many generic parameters or weak constraints can make the type system confusing.

### How I monitored/debugged it

I keep generic APIs small, add examples, use type tests where useful, and review inferred types in the editor.

## 7. What are discriminated unions and where do you use them?

### What it is

A discriminated union represents multiple possible shapes using a common field like `type` or `status`.

### Where I used it

I used it for async states, form steps, payment states, notification events, and reducer actions.

### Why I chose it

It makes impossible states harder to represent and improves exhaustive handling.

### Trade-offs

It requires designing state models carefully instead of using loose objects.

### Failure cases

Without unions, code may forget to handle loading, error, empty, or success cases.

### How I monitored/debugged it

I use `never` exhaustiveness checks, strict mode, and tests for each state branch.

## 8. How do you handle `unknown` errors in TypeScript?

### What it is

TypeScript treats caught errors as `unknown` in strict mode because anything can be thrown.

### Where I used it

I used safe error narrowing in API clients, Express middleware, background jobs, and frontend error handlers.

### Why I chose it

It avoids assuming every thrown value is an `Error` object.

### Trade-offs

It takes more code to safely extract messages and metadata.

### Failure cases

Accessing `error.message` directly can fail if a string or custom object was thrown.

### How I monitored/debugged it

I use helper functions to normalize errors and log original values safely.

## 9. Why do you still need runtime validation with TypeScript?

### What it is

Runtime validation checks actual data at runtime, while TypeScript only checks code during development/build.

### Where I used it

I used runtime validation for API payloads, environment variables, webhooks, file imports, and external service responses.

### Why I chose it

External data cannot be trusted just because the code has types.

### Trade-offs

Runtime validation adds overhead and schema maintenance.

### Failure cases

Invalid external data can crash the app if it is trusted only through TypeScript casts.

### How I monitored/debugged it

I log validation failures, track bad payloads, add contract tests, and alert on repeated schema errors.

## 10. What TypeScript compiler settings matter in production projects?

### What it is

Compiler settings control how strict TypeScript is and how safely code is checked.

### Where I used it

I used `strict`, `noImplicitAny`, `strictNullChecks`, and `noUncheckedIndexedAccess` in mature codebases.

### Why I chose it

Strict settings catch common bugs before runtime.

### Trade-offs

Strict mode can slow migration from JavaScript or weakly typed code.

### Failure cases

Loose settings allow null bugs, unsafe indexing, and accidental `any` to reach production.

### How I monitored/debugged it

I run `tsc --noEmit` in CI, enforce lint rules, and improve strictness gradually during migration.

## 11. How do utility types help architecture?

### What it is

Utility types like `Pick`, `Omit`, `Partial`, `Required`, and `Record` transform existing types into new ones.

### Where I used it

I used them for create/update DTOs, form state, API payloads, and role-permission maps.

### Why I chose it

They reduce duplication and keep related types consistent.

### Trade-offs

Overusing utility types can hide the final shape from readers.

### Failure cases

Using database model types directly with `Omit` can still leak internal fields.

### How I monitored/debugged it

I check generated shapes in the editor and prefer explicit DTOs for public APIs.

## 12. How do you migrate a large JavaScript codebase to TypeScript?

### What it is

Migration means gradually adding TypeScript to existing JavaScript while keeping the app working.

### Where I used it

I used incremental migration by enabling TypeScript, converting core modules, then feature areas.

### Why I chose it

Big-bang migrations are risky and block feature delivery.

### Trade-offs

Incremental migration means JavaScript and TypeScript coexist for a while.

### Failure cases

Converting without tests or using `any` everywhere reduces the value of migration.

### How I monitored/debugged it

I track converted files, strictness progress, type errors, test coverage, and CI type checks.

## 13. How do you type Redux or global state safely?

### What it is

Typing global state means defining root state, actions, selectors, thunks, and API responses clearly.

### Where I used it

I used typed Redux Toolkit slices, selectors, async thunks, and app-level hooks.

### Why I chose it

It prevents components from reading wrong state shapes or dispatching invalid actions.

### Trade-offs

Strong typing requires maintaining action payload and state contracts.

### Failure cases

Untyped selectors or actions can break many components after a state shape change.

### How I monitored/debugged it

I use typed hooks, `RootState`, type checks in CI, and Redux DevTools for runtime debugging.

## 14. How do you type environment variables?

### What it is

Typing environment variables means defining required config keys and validating them before app startup.

### Where I used it

I used it for API URLs, database connection strings, JWT secrets, Redis URLs, and feature flags.

### Why I chose it

Missing or invalid environment variables should fail fast, not fail during user traffic.

### Trade-offs

Validation adds startup checks and config maintenance.

### Failure cases

Typos or missing secrets can cause production outages or insecure defaults.

### How I monitored/debugged it

I validate config at startup, log safe config status, and block deployment when required variables are missing.

## 15. How do you design public types for a reusable package?

### What it is

Public types define the API contract that package consumers depend on.

### Where I used it

I used public types for shared UI libraries, API clients, validation packages, and domain SDKs.

### Why I chose it

Stable public types improve adoption and reduce breaking changes.

### Trade-offs

Changing public types requires versioning discipline and migration notes.

### Failure cases

Exporting internal types can lock implementation details and make refactoring hard.

### How I monitored/debugged it

I use semantic versioning, changelogs, type tests, examples, and consumer integration tests.
