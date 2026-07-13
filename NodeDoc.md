# Node.js Interview Questions and Answers

This document covers commonly asked Node.js interview questions with concise answers, examples, and notes from this MERN app backend.

## How to Use This Document

Use this file for:

- Node.js interview revision
- Express.js backend preparation
- understanding async/event loop concepts
- explaining API architecture
- revising authentication, middleware, MongoDB, Redis, and security
- connecting interview answers to this project

## Node.js Basics

### 1. What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.

It allows JavaScript to run outside the browser.

Interview answer:

```text
Node.js is a runtime environment that allows JavaScript to run on the server. It uses the V8 engine and is commonly used for building APIs, real-time apps, command-line tools, and backend services.
```

### 2. Is Node.js a language?

No.

JavaScript is the language. Node.js is the runtime.

Simple answer:

```text
Node.js is not a programming language. It is a runtime that executes JavaScript outside the browser.
```

### 3. Why use Node.js?

Reasons:

- JavaScript on backend and frontend
- fast V8 engine
- non-blocking I/O
- good for API servers
- large npm ecosystem
- suitable for real-time apps
- good for I/O-heavy applications

### 4. Where is Node.js commonly used?

Use cases:

- REST APIs
- GraphQL APIs
- real-time chat apps
- streaming apps
- background jobs
- serverless functions
- CLI tools
- microservices

In this app, Node.js is used for:

```text
Express API server
Authentication
JWT cookies
MongoDB access
Redis OTP storage
File upload
Role-based authorization
```

### 5. What is V8?

V8 is Google's JavaScript engine.

It parses, compiles, and executes JavaScript.

Node.js uses V8 to run JavaScript on the server.

### 6. Is Node.js single-threaded?

JavaScript execution in Node.js is single-threaded.

But Node.js can handle many operations concurrently using:

- event loop
- libuv thread pool
- operating system async APIs
- worker threads

Interview answer:

```text
Node.js runs JavaScript on a single main thread, but it handles asynchronous I/O using the event loop and libuv. Some heavy operations use a thread pool internally.
```

### 7. What is non-blocking I/O?

Non-blocking I/O means Node.js does not wait for I/O operations to finish before continuing other work.

Example:

```js
fs.readFile('data.txt', (error, data) => {
  console.log(data);
});

console.log('Runs first');
```

Node starts file reading and continues executing other code.

### 8. What is blocking I/O?

Blocking I/O stops execution until operation finishes.

Example:

```js
const data = fs.readFileSync('data.txt');
console.log(data);
```

This blocks the main thread.

### 9. When should we avoid Node.js?

Node.js is not ideal for CPU-heavy work on the main thread.

Examples:

- video encoding
- large image processing
- heavy mathematical computation
- machine learning training

Reason:

CPU-heavy work blocks the event loop.

Solutions:

- worker threads
- separate service
- queue/background job
- native modules

## Event Loop

### 10. What is event loop in Node.js?

The event loop allows Node.js to handle asynchronous operations without blocking the main thread.

Interview answer:

```text
The event loop is the mechanism that allows Node.js to execute non-blocking asynchronous operations. It picks callbacks from queues and executes them when the call stack is empty.
```

### 10.1. What is an event in Node.js?

An event is a signal that something has happened in the application.

Examples:

- a request reached the server
- a file read operation completed
- a timer finished
- a user was created
- a database connection opened
- a socket received a message

Simple example:

```text
Something happens -> event is created -> handler runs
```

Interview answer:

```text
An event is a notification that something happened in the system. In Node.js, many operations are event-based, such as HTTP requests, file operations, timers, streams, and sockets.
```

### 10.2. What is an event handler?

An event handler is a callback function that runs when a specific event happens.

Example:

```js
button.on('click', () => {
  console.log('Button clicked');
});
```

Node.js style example:

```js
import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

emitter.on('userCreated', (user) => {
  console.log('Send welcome email to:', user.email);
});

emitter.emit('userCreated', {
  email: 'paras@example.com',
});
```

Here:

- `userCreated` is the event
- the callback passed to `.on()` is the event handler
- `.emit()` triggers the event

Interview answer:

```text
An event handler is a function registered to run when an event occurs. In Node.js, event handlers are usually callback functions attached using methods like on() or once().
```

### 10.3. What is EventEmitter in Node.js?

`EventEmitter` is a built-in Node.js class that allows objects to emit events and listen to events.

It comes from the `events` module.

Example:

```js
import { EventEmitter } from 'node:events';

const notificationEmitter = new EventEmitter();

notificationEmitter.on('orderPlaced', (order) => {
  console.log('Send order confirmation email:', order.id);
});

notificationEmitter.on('orderPlaced', (order) => {
  console.log('Notify warehouse:', order.id);
});

notificationEmitter.emit('orderPlaced', {
  id: 'ORD123',
});
```

Output:

```text
Send order confirmation email: ORD123
Notify warehouse: ORD123
```

Important methods:

- `.on(eventName, handler)` registers a handler
- `.once(eventName, handler)` runs the handler only once
- `.emit(eventName, data)` triggers an event
- `.off(eventName, handler)` removes a handler

Interview answer:

```text
EventEmitter is a Node.js class used to create event-driven behavior. It lets us register listeners for events and emit those events when something happens. It is commonly used internally by streams, HTTP servers, sockets, and many Node.js modules.
```

### 10.4. What is an event queue?

An event queue is a waiting area where callbacks wait until the call stack is empty and the event loop is ready to execute them.

Example flow:

```text
Timer completes
Callback goes into queue
Call stack becomes empty
Event loop picks callback
Callback executes
```

Example:

```js
console.log('Start');

setTimeout(() => {
  console.log('Timer callback');
}, 0);

console.log('End');
```

Output:

```text
Start
End
Timer callback
```

Why?

```text
setTimeout callback goes to the queue.
Synchronous code runs first.
Event loop runs the queued callback after the call stack is empty.
```

Important note:

```text
Node.js does not have only one queue. It has different queues/phases like timers, poll, check, close callbacks, microtask queue, and nextTick queue.
```

Interview answer:

```text
The event queue stores callbacks that are ready to run. The event loop picks callbacks from these queues and executes them when the JavaScript call stack is empty.
```

### 10.5. What is event-driven architecture?

Event-driven architecture is a design pattern where different parts of the system communicate by producing and reacting to events.

Instead of one function directly calling every next function, one part emits an event and other parts listen to it.

Example:

```text
User registered
-> send welcome email
-> create audit log
-> send notification
-> update analytics
```

Code example:

```js
import { EventEmitter } from 'node:events';

const appEvents = new EventEmitter();

appEvents.on('userRegistered', (user) => {
  console.log('Send welcome email:', user.email);
});

appEvents.on('userRegistered', (user) => {
  console.log('Create audit log:', user.id);
});

function registerUser(user) {
  console.log('User saved:', user.id);
  appEvents.emit('userRegistered', user);
}

registerUser({
  id: 'U101',
  email: 'paras@example.com',
});
```

Output:

```text
User saved: U101
Send welcome email: paras@example.com
Create audit log: U101
```

Benefits:

- loose coupling
- easier to add new behavior
- good for real-time systems
- good for background jobs
- useful in microservices
- easier to react to business events

Real-world examples:

- `orderPlaced` -> payment, inventory, invoice, email
- `userRegistered` -> welcome email, audit log, notification
- `paymentCompleted` -> receipt, shipment, analytics

Important considerations:

- handle failures and retries
- avoid duplicate processing
- make handlers idempotent
- log events properly
- monitor event processing

Interview answer:

```text
Event-driven architecture is a system design style where components communicate through events. One component emits an event, and one or more listeners react to it. This makes the system loosely coupled and easier to extend, but we must handle retries, duplicate events, failures, and observability carefully.
```

### 10.6. Event, EventEmitter, Event Queue, Event Handler, Event Loop, and Event-Driven Architecture in one flow

Simple flow:

```text
Event happens
-> EventEmitter emits the event
-> Event handler is registered to handle it
-> Callback may wait in an event queue
-> Event loop picks callback when call stack is empty
-> Event-driven architecture uses this pattern at application/system level
```

Quick difference:

| Concept | Meaning |
|---|---|
| Event | Something happened |
| Event handler | Function that runs when event happens |
| EventEmitter | Object/class that emits and listens to events |
| Event queue | Place where callbacks wait before execution |
| Event loop | Mechanism that picks callbacks from queues |
| Event-driven architecture | System design where components communicate through events |

### 11. Event loop phases?

Main phases:

- timers
- pending callbacks
- idle/prepare
- poll
- check
- close 

https://medium.com/@kunaltandon.kt/process-nexttick-vs-setimmediate-vs-settimeout-explained-wrt-different-event-loop-phases-c0506b12921d

Important queues:

- microtask queue
- nextTick queue

### 12. setInterval vs setTimeout vs setImmediate?

`setInterval` - Executes a function repeatedly, waiting for the specified millisecond duration between each execution cycle.

```js
// Prints every 2 seconds indefinitely
const intervalId = setInterval(() => {
  console.log("⏳ Clock ticking...");
}, 2000);

// How to stop the loop (Crucial for React cleanup!):
clearInterval(intervalId);
```

`setTimeout` - Executes a function once after waiting for a specified number of milliseconds (1 second = 1000ms).

`setTimeout` runs after minimum delay in timers phase.

```js
// Waits 3 seconds, then prints once
const timerId = setTimeout(() => {
  console.log("⏰ Alarm ringing!");
}, 3000);

// How to cancel it before it fires:
clearTimeout(timerId);
```

`setImmediate` is used to execute a function right after the current block of code finishes, executing ahead of standard timers."
`setImmediate` runs in check phase.

Example:

```js
console.log("1. Start");
setImmediate(() => {
  console.log("3. Inside setImmediate");
});
console.log("2. End");

// --- OUTPUT ---
// 1. Start
// 2. End
// 3. Inside setImmediate

```

Order can vary depending on context.

Inside I/O callback, `setImmediate` usually runs before `setTimeout`.

Quick Comparison: setImmediate vs setTimeout(..., 0)
If you use both inside a Node.js backend environment, their execution order can vary depending on context, but generally:

setTimeout(() => {}, 0): Must register a formal 0ms clock countdown inside the timer hardware tracking module, which makes it slightly more system-heavy than a direct immediate execution.

`setImmediate:` Always fires on the next check phase of the event loop wheel, immediately after I/O cycles complete.

`setTimeout:` setTimeout(() => {}, 0): Must register a formal 0ms clock countdown inside the timer hardware tracking module, which makes it slightly more system-heavy than a direct immediate execution.

`setTimeout:` Even with 0ms, JavaScript must formally hand the task over to the system clock, register a timer, count down to zero, and then push the callback into the event loop queue. This process requires a tiny amount of performance overhead.

`setImmediate:` It completely bypasses the system clock timer module. It says: "As soon as the current file finishes executing its immediate code (and handles any network/file I/O operations), run this block next."

### 13. process.nextTick vs Promise.then?

Both are microtask-like mechanisms in Node.js.

`process.nextTick` has higher priority than Promise microtasks.

Example:

```js
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));

console.log('sync');
```

Output:

```text
sync
nextTick
promise
```

```js
setImmediate(() => console.log("🎫 4. setImmediate"), 0);

setTimeout(() => console.log("⏱️ 3. setTimeout (0ms)"), 0);
console.log("✍️ 0. Main Synchronous Code Execution");
process.nextTick(() => {
  console.log("🚀 2. process.nextTick - The Line Jumper!");
});
```

Output
// --- EXECUTING THE CODE TRACKS ---
```js
✍️ 0. Main Synchronous Code Execution
✍️ 1. Main Synchronous Code Execution
🚀 2. process.nextTick - The Line Jumper!
⏱️ 3. setTimeout (0ms)
🎫 4. setImmediate
```
Note - The Clockwise Flow of the Event Loop - 
  The Node.js event loop runs continuously in a strict clockwise order:
  Timer Phase(setTimeout) -> I/O Phase -> Poll Phase -> Check Phase(setImmediate) 
  Because the Timers Phase comes before the Check Phase on the wheel, setTimeout naturally gets checked first if both are ready.

Why setTimeout ran first in your codeWhen you run a file normally, the main file script executes line-by-line.

- It registers the setTimeout and the setImmediate.
- Once the main script finishes, the Event Loop starts up and starts turning the wheel from the very beginning—which is the Timers Phase.
- Because setTimeout is at the beginning of the wheel, its callback gets fired first, and setImmediate must wait until the wheel spins down to the Check Phase.

### 14. Why can process.nextTick be dangerous?

"process.nextTick() is a specialized Node.js function that lets you schedule a callback to run immediately after the current block of code finishes, jumping ahead of all other asynchronous timers and event loop queues."

Too many `process.nextTick` callbacks can starve the event loop.

Example:

```js
function loop() {
  process.nextTick(loop);
}
```

The Execution Checklist
- Synchronous Tasks: Standard top-to-bottom code runs.
- process.nextTick() Queue: Node.js pauses to clear this entirely.
- Promises/Microtasks: Standard .then() callbacks run.
- The Event Loop Wheel Turns: setTimeout, setInterval, and setImmediate finally get their turn.

setTimeout(() => console.log("⏱️ 3. setTimeout (0ms)"), 0);

process.nextTick(() => {
  console.log("🚀 2. process.nextTick - High Priority!");
});

console.log("✍️ 1. Main Synchronous Line");

// --- OUTPUT ---
// 1. Main Synchronous Line
// 2. process.nextTick - High Priority!
// 3. setTimeout (0ms)


This can prevent timers/I/O from running.

### Difference between Microtask Queue and Macrotask Queue
Today’s focus was microtasks vs macrotasks.

1. The Two Queues :
When the Call Stack is empty, the Event Loop doesn't just grab the first thing it sees. It checks two different queues with different priority levels:

A. The Microtask Queue (The VIP Lane)
Microtasks are high-priority tasks that must be executed immediately after the current synchronous code finishes, but before the browser renders or moves to the next Macrotask.
Sources: Promises (.then, .catch, .finally), async/await, queueMicrotask(), and MutationObserver.

B. The Macrotask Queue (The Standard Lane)
Also known simply as the Task Queue. These are standard background tasks.
Sources: setTimeout, setInterval, setImmediate (Node.js), requestAnimationFrame, and I/O events (clicks, network responses).

### 15. What is libuv?

"Libuv is the underlying C library that provides Node.js with its Event Loop and Thread Pool, allowing a single-threaded language like JavaScript to handle thousands of heavy network and file tasks concurrently without blocking."

libuv is a C library used by Node.js.

It provides:

- event loop
- async I/O
- thread pool
- file system operations
- timers
- networking support

## Modules

### 16. What are modules in Node.js?

Modules allow code to be split into reusable files.

Common module systems:

- CommonJS
- ES Modules

### 16.1. What are the top 5 built-in modules commonly used in Node.js projects?

Node.js has many built-in modules. Built-in means we do not need to install them from npm.

We can import them directly:

```js
import fs from 'node:fs';
import path from 'node:path';
```

The top 5 commonly used built-in modules are:

| Module | Purpose |
|---|---|
| `fs` | Work with files and folders |
| `path` | Work with file and folder paths safely |
| `http` | Create HTTP servers and handle HTTP requests |
| `crypto` | Hashing, encryption, random tokens, secure values |
| `events` | Create and handle custom events using `EventEmitter` |

#### 1. `fs` module

`fs` stands for file system.

It is used to read, write, update, and delete files.

Example:

```js
import fs from 'node:fs/promises';

const data = await fs.readFile('users.json', 'utf-8');
console.log(data);
```

Common use cases:

- reading config files
- writing logs
- handling uploaded files
- reading templates
- deleting temporary files

#### 2. `path` module

`path` is used to create safe file paths across operating systems.

Example:

```js
import path from 'node:path';

const filePath = path.join('uploads', 'profile', 'avatar.png');
console.log(filePath);
```

Why useful:

```text
Windows uses backslash paths.
Linux/Mac use slash paths.
path module handles this safely.
```

Common use cases:

- building file paths
- getting file extension
- getting file name
- resolving absolute paths

#### 3. `http` module

`http` is used to create HTTP servers.

Express internally works on top of Node's HTTP server.

Example:

```js
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

Common use cases:

- creating a basic server
- understanding how Express works internally
- handling raw HTTP requests

#### 4. `crypto` module

`crypto` is used for security-related operations.

Example: generate random token

```js
import crypto from 'node:crypto';

const token = crypto.randomBytes(32).toString('hex');
console.log(token);
```

Example: hash a value

```js
import crypto from 'node:crypto';

const hash = crypto
  .createHash('sha256')
  .update('secret-value')
  .digest('hex');

console.log(hash);
```

Common use cases:

- generating reset tokens
- generating OTP secrets
- hashing values
- creating secure random strings
- encryption/decryption use cases

Important note:

```text
For password hashing, prefer libraries like bcrypt or argon2 instead of plain crypto hashing.
```

#### 5. `events` module

`events` is used to work with event-driven behavior using `EventEmitter`.

Example:

```js
import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

emitter.on('userCreated', (user) => {
  console.log('Send welcome email:', user.email);
});

emitter.emit('userCreated', {
  email: 'paras@example.com',
});
```

Common use cases:

- custom app events
- notification flows
- logging/audit events
- stream events
- socket events

Interview answer:

```text
The top commonly used built-in Node.js modules are fs, path, http, crypto, and events. fs is used for file operations, path for safe file paths, http for creating servers, crypto for security-related operations, and events for event-driven programming with EventEmitter.
```

### 17. CommonJS vs ES Modules?

CommonJS:

```js
const express = require('express');
module.exports = app;
```

ES Modules:

```js
import express from 'express';
export { app };
```

This app uses ES Modules:

```json
"type": "module"
```

### 18. What is package.json?

`package.json` stores project metadata, scripts, dependencies, and configuration.

Example from this backend:

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon",
    "start": "node src/server.js"
  }
}
```

### 19. What is npm?

npm is the Node package manager.

It is used to:

- install packages
- run scripts
- manage dependencies
- publish packages

### 20. dependencies vs devDependencies?

`dependencies` are needed in production.

Example:

```json
"express": "^5.1.0"
```

`devDependencies` are needed only during development.

Example:

```json
"nodemon": "^3.1.10"
```

### 20.1. What is package-lock.json?

`package-lock.json` records the exact dependency versions installed in the project.

Interview answer:

```text
package-lock.json makes dependency installation predictable. It locks exact versions of packages and their nested dependencies so every developer and server installs the same dependency tree.
```

Why it matters:

- avoids "works on my machine" version issues
- makes `npm install` more consistent
- improves security auditing
- should usually be committed to Git

### 20.2. What is npx?

`npx` runs npm package binaries without manually installing them globally.

Example:

```sh
npx nodemon src/server.js
```

Interview answer:

```text
npx is used to execute a package command directly. It is useful for running local project binaries or one-time CLI tools without global installation.
```

### 20.3. What are npm scripts?

npm scripts are shortcut commands defined in `package.json`.

Example:

```json
{
  "scripts": {
    "dev": "nodemon",
    "start": "node src/server.js"
  }
}
```

Use:

```sh
npm run dev
npm start
```

Interview answer:

```text
npm scripts help standardize project commands like starting the server, running tests, building code, or linting.
```

### 20.4. What is semantic versioning in npm?

Semantic versioning uses this format:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
5.1.0
```

Meaning:

- `MAJOR`: breaking changes
- `MINOR`: new backward-compatible features
- `PATCH`: backward-compatible bug fixes

Common symbols:

- `^5.1.0`: allows minor and patch updates
- `~5.1.0`: allows patch updates
- `5.1.0`: exact version only

### 20.5. What is process in Node.js?

`process` is a global Node.js object that provides information and control over the running Node process.

Common uses:

```js
console.log(process.env.NODE_ENV);
console.log(process.pid);
console.log(process.cwd());
```

In backend apps, `process.env` is commonly used for configuration:

```js
const port = process.env.PORT || 5001;
```

### 20.6. What are environment variables?

Environment variables store configuration outside the source code.

Examples:

```text
PORT=5001
MONGODB_URI=...
JWT_SECRET=...
```

Interview answer:

```text
Environment variables keep environment-specific and sensitive values out of the codebase. They are commonly used for ports, database URLs, JWT secrets, API keys, and feature flags.
```

Benefits:

- safer than hardcoding secrets
- easy to change per environment
- useful for local, staging, and production configs

## Express.js

### 21. What is Express.js?

Express.js is a minimal Node.js web framework used to build APIs and web servers.

Interview answer:

```text
Express is a Node.js framework that provides routing, middleware support, request/response handling, and utilities for building APIs.
```

### 22. Why use Express?

Reasons:

- simple routing
- middleware support
- request/response helpers
- large ecosystem
- easy REST API creation

### 23. How to create Express app?

```js
import express from 'express';

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(5001);
```

In this app:

```text
backend/src/app.js
backend/src/server.js
```

### 24. app.js vs server.js?

In this app:

`app.js`:

```text
creates Express app
adds middleware
registers routes
adds error handlers
```

`server.js`:

```text
connects database
starts HTTP server
handles shutdown
```

This separation helps testing and maintainability.

### 25. What is middleware?

Middleware is a function that runs between request and response.

Signature:

```js
(req, res, next) => {}
```

Example:

```js
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
```

### 26. Types of middleware?

Common types:

- application middleware
- router middleware
- error middleware
- built-in middleware
- third-party middleware

In this app:

```js
app.use(helmet());
app.use(cors(...));
app.use(express.json(...));
app.use(cookieParser());
app.use(morgan(...));
```

### 27. What is next()?

`next()` passes control to the next middleware.

Example:

```js
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};
```

### 28. What is error handling middleware?

Error middleware has four parameters:

```js
(error, req, res, next) => {}
```

In this app:

```text
backend/src/middleware/errorHandler.js
```

### 29. Why error middleware should be last?

Because it catches errors from routes/middleware registered before it.

In this app:

```js
app.use(notFound);
app.use(errorHandler);
```

### 30. What is express.json()?

It parses JSON request body which is passed data via modern Axios/Fetch API calls from your React frontend.

JSON text payloads ({ "key": "value" }) from the frontend side.

Example:

```js
app.use(express.json({ limit: '1mb' }));
```

Without it, `req.body` may be undefined for JSON requests.

### 31. What is express.urlencoded()?

It parses form URL-encoded data like URL query text strings (key=value&key2=value2) which gets attach when Traditional HTML <form> submissions sending raw browser requests.

Example:

```js
app.use(express.urlencoded({ extended: true }));
```

### 32. What is express.static()?

It serves static files.

express.static() is a built-in middleware function in Express used to serve static files directly to the browser.

Static files are assets that do not change dynamically when the application runs—such as images, PDF documents, raw CSS stylesheets, and client-side JavaScript files.

Without this middleware, if a client requests an image via a URL (like http://localhost:5001/logo.png), Express will treat it as an unhandled API route and return a 404 Not Found error.

A Quick Recap of Why Your Logic is Spot-On

- The 404 Problem (Without the middleware): Express is strictly a routing engine by default. If you ask for /logo.png, it searches through your manual endpoint list (app.get('/logo.png')). When it can't find a matching route declaration, it returns a 404 Not Found error.

- The Interception Fix (With the middleware): When you add express.static('public'), you are telling Express: "Before throwing a 404 error, check if a file named logo.png physically exists inside my public folder.

- "The File Type Freedom: It automatically reads, handles, and streams any binary or text file format to the browser—including PDF documents, JPEGs, PNGs, MP3 audio tracks, MP4 video snippets, favicon icons, and raw CSS files—setting the correct browser headers for you automatically.

In this app:

```js
app.use('/uploads', express.static(uploadsDir));
```

This serves uploaded avatars.

## Error Handling
### 33. How to handle error in Backend side 

The 3 Pillars of Backend Error Handling

1. Always Use Try-Catch in Asynchronous Code
Because database operations (like MongoDB/Mongoose lookups) are asynchronous, an unhandled error inside a Promise will crash your entire server node. You must wrap them in a try/catch block.

2. Pass Errors to the next() Function
Express has a special built-in parameter called next. When you pass an error into it (next(error)), Express will immediately halt the current request loop, skip all regular routes, and shoot the error straight down to your global error-handling workspace.

3. Create a Single Global Error Middleware (The Control Hub)
Instead of copy-pasting res.status(500).json(...) into 50 different files, you write one global middleware function at the bottom of your server script to format and deliver all system alerts uniformly.

Complete code
=============

const express = require('express');
const app = express();

app.use(express.json());

// --- 1. SAMPLE ROUTE HANDLER ---
app.get('/api/users/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        
        // Simulating a database validation check
        if (userId === "invalid") {
            // Create a custom error and assign an accurate HTTP Status Code
            const err = new Error("User profile not found in our records.");
            err.statusCode = 404;
            throw err; // Blow the whistle! Jumps directly to the catch block below
        }

        res.json({ id: userId, name: "Paras" });
    } catch (error) {
        // 💡 CRITICAL: Pass the error to the next() tracker to send it down the pipeline
        next(error); 
    }
});

// --- 2. THE GLOBAL ERROR HANDLING MIDDLEWARE ---
// 💡 Rule: It MUST have exactly 4 arguments (err, req, res, next) so Express recognizes it.
// Put this line at the absolute bottom of your file, after all your routes.
app.use((err, req, res, next) => {
    // Fall back to a 500 Internal Server error if a specific code wasn't provided
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong on our servers.";

    console.error(`🚨 [SERVER ERROR] Status: ${statusCode} | Message: ${message}`);

    // Send a clean, unified response to your React frontend application
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        error: message,
        // Only reveal the raw stack trace during local development, hide it in live production
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

app.listen(5001, () => console.log('🚀 Secure Server running on port 5001'));


## Routing

### 33. What is routing in Express?

Routing maps HTTP method and URL path to handler.

Example:

```js
app.get('/api/users', getUsers);
app.post('/api/users', createUser);
```

### 34. What is Express Router?

Router groups related routes.

Example:

```js
import { Router } from 'express';

export const userRoutes = Router();

userRoutes.route('/').get(getUsers).post(createUser);
```

In this app:

```text
backend/src/routes/authRoutes.js
backend/src/routes/userRoutes.js
backend/src/routes/teamRoutes.js
backend/src/routes/skillRoutes.js
backend/src/routes/adminRoutes.js
```

### 35. What are route params?

Route params are dynamic URL parts.

Example:

```js
app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
});
```

### 36. What are query params?

Query params come after `?`.

Example:

```text
/api/users?page=1&limit=5
```

Access:

```js
req.query.page
req.query.limit
```

### 37. What is req.body?

`req.body` contains parsed request body.

Example:

```js
const { email, password } = req.body;
```

Requires body parser middleware like `express.json()`.

## REST API

### 38. What is REST API?

REST API uses HTTP methods and resources to expose data/actions.

Example:

```text
GET /api/users
POST /api/users
PATCH /api/users/:id
DELETE /api/users/:id
```

### 39. HTTP methods?

Common methods:

- `GET`: read
- `POST`: create/action
- `PUT`: replace
- `PATCH`: partial update
- `DELETE`: delete

### 40. Common HTTP status codes?

Common codes:

- `200`: success
- `201`: created
- `204`: no content
- `400`: bad request
- `401`: unauthenticated
- `403`: forbidden
- `404`: not found
- `409`: conflict
- `429`: too many requests
- `500`: server error

### 41. 401 vs 403?

`401 Unauthorized` means user is not authenticated.

`403 Forbidden` means user is authenticated but does not have permission.

Example:

```text
No login cookie -> 401
Logged in as member trying admin action -> 403
```

## Async JavaScript in Node

### 42. How does Node handle async code?

Node handles async code with:

- callbacks
- promises
- async/await
- event loop

Example:

```js
const users = await User.find();
```

### 43. What is async/await?

`async/await` is syntax for writing promise-based code in a readable way.

Example:

```js
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
};
```

### 44. Why use try/catch with async?

To handle rejected promises.

Example:

```js
try {
  const user = await User.findById(id);
} catch (error) {
  next(error);
}
```

### 45. What is asyncHandler?

`asyncHandler` wraps async Express handlers and forwards errors to error middleware.

Example:

```js
export const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);
```

Use:

```js
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
});
```

Benefit:

```text
No need to write try/catch in every controller.
```

### 110. What is health endpoint?

Health endpoint checks server status.

In this app:

```text
GET /api/health
```

It returns:

```json
{
  "status": "ok",
  "uptime": 123,
  "timestamp": "..."
}
```

## Negative Oriented Node.js Interview Questions

### 111. What can go wrong if error handling is missing?

Problems:

- unhandled promise rejections
- server crashes
- inconsistent responses
- leaked stack traces
- hard-to-debug failures

### 112. What happens if MongoDB is down?

Backend cannot read/write permanent data.

Good behavior:

- fail startup if DB is required
- log meaningful error
- return proper 500/503 responses
- monitor database health

### 113. What happens if JWT secret is weak?

Attackers may guess or brute-force token signature.

Use strong secret in production.

### 114. What happens if CORS allows all origins with credentials?

This is dangerous.

If credentials are allowed, origins should be restricted.

Bad:

```js
origin: true,
credentials: true
```

without proper control.

### 115. What happens if request body limit is too high?

Attackers can send huge payloads and consume memory.

This app uses:

```js
express.json({ limit: '1mb' });
```

### 116. What happens if file uploads are not validated?

Risks:

- malware upload
- huge file upload
- path traversal
- storage exhaustion

Validate type, size, and path.

### 117. What happens if passwords are stored plain text?

If database leaks, all passwords are exposed.

Always hash passwords using bcrypt/argon2.

### 118. What happens if API has no pagination?

Large collections can return too much data.

Problems:

- slow API
- high memory usage
- poor frontend performance

### 119. What happens if event loop is blocked?

All requests become slow or stuck.

Avoid CPU-heavy sync code in request handlers.

### 120. What happens if Redis cache has stale data?

Users may see outdated data.

Solutions:

- TTL
- cache invalidation
- update cache on mutation
- avoid caching sensitive rapidly changing data

## Most Important Short Answers

### 121. Node.js in one line

```text
Node.js is a JavaScript runtime that runs JS outside the browser using V8.
```

### 122. Express in one line

```text
Express is a Node.js web framework for building APIs using routes and middleware.
```

### 123. Middleware in one line

```text
Middleware is a function that runs between request and response and can modify req/res or pass control using next.
```

### 124. Event loop in one line

```text
The event loop allows Node.js to handle asynchronous callbacks without blocking the main thread.
```

### 125. JWT auth in one line

```text
JWT auth verifies a signed token to identify the user making the request.
```

### 126. Mongoose in one line

```text
Mongoose is an ODM that provides schemas, models, validation, and query helpers for MongoDB.
```

### 127. Redis in one line

```text
Redis is an in-memory key-value store used for fast temporary data like OTP, sessions, cache, and rate limits.
```

### 128. CORS in one line

```text
CORS controls which browser origins are allowed to call the backend.
```

### 129. Rate limiting in one line

```text
Rate limiting restricts request count in a time window to reduce abuse.
```

### 130. Graceful shutdown in one line

```text
Graceful shutdown closes server and database connections before process exit.
```

## Final Node.js Interview Checklist

Must know:

- Node.js runtime
- V8
- event loop
- libuv
- blocking vs non-blocking I/O
- CommonJS vs ES Modules
- npm/package.json
- Express app setup
- middleware
- routing
- error handling
- REST APIs
- HTTP status codes
- authentication vs authorization
- JWT cookies
- CORS
- Helmet
- rate limiting
- bcrypt
- Mongoose schemas/models
- MongoDB relationships
- Redis use cases
- file upload
- environment variables
- graceful shutdown
- performance basics
- security basics

Strong answer pattern:

```text
Definition -> Example -> Why it matters -> App use case
```

Example:

```text
Middleware is a function that runs between request and response. For example, requireAuth verifies JWT before protected routes. It matters because it centralizes cross-cutting concerns like auth, logging, and validation. In our app, authMiddleware attaches req.account after verifying the JWT.
```
