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

### 8. Can you access DOM in Node?
No, you cannot access the DOM in Node.js because Node.js is a server-side environment, while the DOM (Document Object Model) is a client-side concept used in browsers to interact with HTML and XML documents.

Node.js runs on the server and does not have access to a browser's DOM, which is part of the browser's environment. The DOM allows you to manipulate the content and structure of web pages, but it is not available in Node.js, as it operates on the backend, outside the context of a web page or browser.

### Explain the event driven architecture?
Event-Driven Architecture (EDA) is a software design pattern where the flow of your application is determined by events rather than a strict sequence of function calls. Instead of Component A calling Component B directly, Component A simply announces that "something happened" (an event), and any other component can choose to listen and react to it.

Node.js is built from the ground up around this pattern using a single-threaded, non-blocking Event Loop.

Here is how it works broken down into 4 simple steps.

Step 1: The Core Components
To understand the flow, you only need to know three main concepts:
- Event: A signal or named string indicating that something just occurred (e.g., userRegistered, paymentReceived).
- Emitter (Publisher): The part of your code that triggers or broadcasts the event.
- Listener (Subscriber): The part of your code that waits for the event to happen and runs a function (callback) when it does.

Step 2: Import the Built-in EventEmitter
Node.js comes with a built-in module called events specifically designed to handle this pattern. You do not need to install anything.

```js
// Import the core events module
const EventEmitter = require('events');

// Create a new instance of the emitter
const eventBus = new EventEmitter();
```

Step 3: Create a Listener
Before you broadcast an event, you must define who is listening for it and what they should do. You do this using the .on() method.

```js
// This listener waits for the 'userRegistered' event
eventBus.on('userRegistered', (userData) => {
    console.log(`Sending a welcome email to ${userData.email}`);
});

// You can add multiple independent listeners to the exact same event!
eventBus.on('userRegistered', (userData) => {
    console.log(`Creating a database profile for user ID: ${userData.id}`);
});
```

Step 4: Emit the Event
When an action takes place in your app, you trigger the event using the .emit() method and pass along any relevant data.

```js
// Simulating a registration process
const newUser = { id: 101, email: 'hello@example.com' };

// Broadcast the event to the system
eventBus.emit('userRegistered', newUser);
```

Why use this in Node.js?
Benefits - How it works
- Loose Coupling - The registration code doesn't need to know how to send emails. It just screams "Registration happened!" and walks away.
- Easy Scalability - If you want to add a third feature later (like sending an SMS notification), you just write a new listener. You don't have to touch your original registration code.
- High Performance - It maps perfectly to Node's asynchronous environment, keeping the main thread free to handle other requests while waiting for I/O tasks.

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
- close callback

https://medium.com/@kunaltandon.kt/process-nexttick-vs-setimmediate-vs-settimeout-explained-wrt-different-event-loop-phases-c0506b12921d

Important queues:

- microtask queue
- nextTick queue

## Explanation of Each Phase
Each phase possesses a first-in, first-out (FIFO) queue of callbacks to execute.
- Timers: Executes callbacks scheduled by setTimeout() and setInterval() once their threshold expires.
- Pending Callbacks: Executes I/O callbacks deferred from the previous loop iteration (e.g., specific TCP errors).
- Idle, Prepare: Used exclusively by Node.js for internal housekeeping and preparation.
- Poll: Retrieves new I/O events, reads files, manages network connections, and executes their callbacks. Node.js may block or pause here if appropriate.
- Check: Executes callbacks scheduled specifically by setImmediate() right after the poll phase finishes.
- Close Callbacks: Handles cleanup and resource teardown, such as socket.on('close', ...)

The Microtask Intermission
- Though they are not official phases of the main loop, Microtasks (such as process.nextTick() and resolved Promises) are highly prioritized. Node.js fully drains the microtask queue immediately after any phase finishes, right before it advances to the next phase. process.nextTick() takes precedence and executes before Promise callbacks.

### 12. What is setImmediate()?
setImmediate() is a built-in timer function used to schedule a callback function to execute asynchronously in the "Check" phase of the Node.js Event Loop. It is specifically designed to run code immediately after the current I/O polling operations finish, helping break up long-running tasks without blocking incoming requests.

```js
const immediateObj = setImmediate((arg1, arg2) => {
  console.log(`Executed with: ${arg1} and ${arg2}`);
}, 'Hello', 'World');

// Optional: Cancel the execution if needed
// clearImmediate(immediateObj);
```

## Where It Sits in the Event Loop
The Node.js event loop executes in specific phases. setImmediate() interacts with them like this:
- Poll Phase: Node.js retrieves new I/O events and executes their callbacks. If the poll queue becomes empty and setImmediate() scripts are waiting, the event loop advances to the next phase.
- Check Phase: This phase is entirely dedicated to executing callbacks scheduled via setImmediate().

## Code Execution Comparison
To understand setImmediate(), it must be compared to process.nextTick() and setTimeout(fn, 0).

```js
const fs = require('fs');

fs.readFile(__filename, () => {
    setTimeout(() => console.log('1. setTimeout (Timer Phase)'), 0);
    setImmediate(() => console.log('2. setImmediate (Check Phase)'));
    process.nextTick(() => console.log('3. process.nextTick (Microtask)'));
});
```

Output order inside an I/O callback:
- 3. process.nextTick (Executes immediately after the current operation finishes, before the phase ends).
- 2. setImmediate (Executes as soon as the event loop moves from the Poll phase into the Check phase).
- 1. setTimeout (Executes in the Timers phase of the next loop iteration)

When to Use setImmediate()
- Chunking CPU-heavy jobs: Use it to yield control back to the event loop so network requests or file reads can be handled between your CPU execution blocks.
- Queueing after I/O: Use it when you want to guarantee your function executes right after the current I/O polling ends.

### 12. What is process.nextTick()?
In Node.js, process.nextTick() is a built-in method used to schedule a callback function to execute immediately after the current operation finishes, but before the Node.js Event Loop moves on to any other phase or handles any I/O or timers.

It bypasses the main phases of the event loop by adding callbacks to a specialized microtask queue known as the nextTick queue.

## How It Fits into the Event Loop
- Every time Node.js transitions between different event loop phases (like Timers, Poll, or Check), it checks the nextTick queue. If there are any callbacks waiting in this queue, Node.js pauses everything else and executes all of them until the queue is completely empty.

## The execution order generally follows this priority:
- Synchronous Code (Executes first).
- process.nextTick() Callbacks (Executes right after the current operation finishes).
- Promises / Microtasks (Executes after nextTick but before standard I/O/timers).
- setTimeout / setImmediate (Executes in subsequent macro-task phases).

```js
Code Example: Understanding Execution Order
console.log('1. Start Synchronous');

setTimeout(() => {
  console.log('5. setTimeout (Macro-task)');
}, 0);

setImmediate(() => {
  console.log('6. setImmediate (Macro-task)');
});

Promise.resolve().then(() => {
  console.log('4. Promise (Micro-task)');
});

process.nextTick(() => {
  console.log('3. process.nextTick (Highest priority micro-task)');
});

console.log('2. End Synchronous');
```

Output:
1. Start Synchronous
2. End Synchronous
3. process.nextTick (Highest priority micro-task)
4. Promise (Micro-task)
5. setTimeout (Macro-task)
6. setImmediate (Macro-task)

## Why setImmediate will not run before the setTimeout?
- Because setImmediate can run before setTimeout in this specific code snippet.
- Since these functions are placed in the main global scope (and not inside an I/O callback), the execution order between them is unpredictable and depends entirely on machine performance.
- Here is the exact reason why setImmediate sometimes runs after setTimeout, and why it sometimes runs before it:

The Race Condition Explained
- The Timer Delay: When you write setTimeout(fn, 0), Node.js actually caps the minimum delay to 1ms. It cannot physically register a true 0ms timer.
- The Event Loop Start: After the synchronous script finishes, Node.js starts the event loop and enters the Timers Phase.
- The Decision Point:
  - If the machine takes >1ms to spin up the event loop, the timer has already expired. The loop fires setTimeout first, and setImmediate must wait for the Check phase.
  - If the machine takes <1ms to spin up the event loop, the timer has not expired yet. The loop skips the Timers phase, enters the Check phase, and fires setImmediate first.

How to Guarantee setImmediate Runs First
- If you want to force setImmediate to always execute before setTimeout, you must wrap them inside an I/O callback (like a file read or a network request).

```js
const fs = require('fs');

fs.readFile(__filename, () => {
  // Now inside the "Poll Phase" of the event loop
  setTimeout(() => console.log('setTimeout'), 0);
  setImmediate(() => console.log('setImmediate')); 
});

// GUARANTEED OUTPUT:
// setImmediate
// setTimeout
```

Why this guarantees the order:
- When the file reading finishes, the event loop is sitting in the Poll Phase.
- The next phase in the loop cycle is the Check Phase (setImmediate).
- The Timers Phase (setTimeout) is further away at the very start of the next loop cycle.
- Therefore, setImmediate is guaranteed to win every single time.

## Why and When to Use It
According to the official Node.js Documentation on nextTick, there are two primary use cases:
- Ensuring 100% Asynchronous Behavior: If an API is asynchronous in some conditions but synchronous in others, it can cause unpredictable bugs (often called "releasing Zalgo"). Wrapping a synchronous return in process.nextTick() guarantees it always runs asynchronously.
- Allowing Event Handlers to Bind First: It allows an object to emit an event after it has been fully constructed, giving the surrounding script time to attach event listeners first.

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

### 20.7. What are built-in global objects in Node.js? What are pseudo-globals?

Simple definition:

**Global objects** are available in every module without `require` or `import`.

**Pseudo-globals** look like globals, but they are **not** on the `global` object. Node injects them into each module scope.

#### Built-in true globals

| Global | What it is |
|---|---|
| `global` | The global namespace object (like `window` in browsers) |
| `process` | Info and control of the current Node process |
| `console` | Logging to stdout/stderr |
| `Buffer` | Binary data handling |
| `setTimeout` / `clearTimeout` | Timers |
| `setInterval` / `clearInterval` | Repeated timers |
| `setImmediate` / `clearImmediate` | Run after I/O (check phase) |
| `queueMicrotask` | Schedule a microtask |
| `URL` / `URLSearchParams` | URL parsing |
| `TextEncoder` / `TextDecoder` | Text encoding helpers |
| `performance` | Timing and performance marks |
| `structuredClone` | Deep clone values |
| `fetch` / `FormData` / `Headers` / `Request` / `Response` | Built-in HTTP client APIs (modern Node) |
| `AbortController` / `AbortSignal` | Cancel async work |
| `atob` / `btoa` | Base64 helpers |
| `crypto` (webcrypto) | Web Crypto API on `globalThis.crypto` |

Examples:

```js
console.log(global === globalThis); // true in Node
console.log(process.pid);
console.log(Buffer.from('hello').toString('hex'));
setTimeout(() => console.log('timer'), 0);
```

#### Pseudo-globals (module-scoped, not true globals)

These are provided by CommonJS module wrapping. They exist inside each file, but **are not** properties of `global`:

| Pseudo-global | Meaning |
|---|---|
| `__dirname` | Absolute path of the current module's folder |
| `__filename` | Absolute path of the current module file |
| `exports` | Shortcut for `module.exports` |
| `module` | Current module object |
| `require` | Function to load modules |

Example:

```js
console.log(__dirname);
console.log(__filename);
console.log(typeof require); // 'function' in CJS

console.log(global.__dirname); // undefined (not a true global)
console.log(global.require);   // undefined (not a true global)
```

Why they are called "pseudo":

```js
// Node wraps each CommonJS file roughly like this:
(function (exports, require, module, __filename, __dirname) {
  // your code runs here
});
```

So `__dirname`, `__filename`, `require`, `module`, and `exports` are function parameters, not real globals.

Note for ESM:

```js
// In ES Modules, __dirname and __filename are NOT available by default.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

Interview answer:

```text
True globals like process, console, Buffer, and timers are available everywhere without importing. Pseudo-globals like __dirname, __filename, require, module, and exports are injected per CommonJS module and are not on the global object.
```

### 20.8. How do you create custom globals in Node.js?

Simple definition:

You can attach values to `global` (or `globalThis`) so every file can use them without importing. This works, but it is usually a bad design choice.

Example — creating a custom global:

```js
// setup.js
global.appName = 'UserDataApp';
global.config = {
  port: process.env.PORT || 5001,
  env: process.env.NODE_ENV || 'development',
};

// any other file
console.log(appName);       // UserDataApp
console.log(global.config); // { port: 5001, env: 'development' }
```

Using `globalThis` (preferred modern way):

```js
globalThis.logger = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`),
};

logger.info('Server started');
```

Load setup early:

```js
// server.js
require('./setup'); // must run before other modules use the global
require('./app');
```

Safer alternative (recommended):

```js
// config.js
module.exports = {
  port: process.env.PORT || 5001,
  env: process.env.NODE_ENV || 'development',
};

// app.js
const config = require('./config');
console.log(config.port);
```

Interview answer:

```text
You create custom globals by assigning to global or globalThis. Prefer exporting a shared module instead, because explicit imports are clearer, easier to test, and less error-prone than hidden globals.
```

### 20.9. Why should we avoid overusing globals?

Simple definition:

Globals create shared mutable state that is hard to track, hard to test, and easy to break as the app grows.

Problems with globals:

1. **Hidden dependencies** — a file uses something that is not imported, so readers cannot see where it comes from.
2. **Name collisions** — two libraries may overwrite the same global name.
3. **Harder testing** — tests share and mutate global state between cases.
4. **Harder debugging** — any file can change the value unexpectedly.
5. **Race / load-order bugs** — if setup runs late, other modules may see `undefined`.
6. **Scaling issues** — in cluster/worker setups, each process has its own globals (not shared memory).

Bad example:

```js
global.db = connectDb();

// later somewhere else
db.query('SELECT * FROM users'); // unclear who owns db, hard to mock
```

Good example:

```js
// db.js
const mongoose = require('mongoose');

async function connectDb() {
  await mongoose.connect(process.env.MONGODB_URI);
  return mongoose.connection;
}

module.exports = { connectDb };
```

When a global is acceptable:

- built-in Node globals (`process`, `console`, `Buffer`)
- rare app bootstrap helpers (still prefer modules)
- polyfills in carefully controlled environments

Interview answer:

```text
Avoid custom globals because they hide dependencies, cause collisions, make testing harder, and create unexpected shared state. Prefer modules, dependency injection, or a config file that you import explicitly.
```
### 12. What happend if one callback functions run for 10sec?
If a callback function runs for 10 seconds on a single-threaded main thread, it will block the entire execution loop, cause UI freezing, and trigger timeout errors in systems with strict watchdog limits.

Main Effects of a Blocking Callback
- UI Freezing: Buttons won't click, animations stop, and the app or webpage appears completely dead to the user.
- Event Loop Block: Other queued tasks, network responses, and user inputs wait in the queue and cannot execute.
- Watchdog Terminations: Operating systems or frameworks (like Android or iOS extensions) often kill processes if a main-thread callback exceeds limits like 5 to 10 seconds.

How to Fix It
- Offload Work: Move heavy 10-second tasks to background threads, worker threads, or use asynchronous tasks/promises.
- Break Up Tasks: Slice the work into small chunks under 16ms so the main thread stays free between slices.

### 12. Why nodejs is single threaded and how does it handles thousand of request?
Node.js uses a single thread for its Event Loop to avoid the high memory and CPU cost of creating a new thread for every user. Managing thousands of threads causes heavy context-switching overhead and complex thread-synchronization bugs.

By staying single-threaded, Node.js remains lightweight, fast, and highly efficient for data-intensive applications.

How It Handles Thousands of Requests
- Node.js achieves high concurrency not by processing requests simultaneously, but by handling them asynchronously without waiting around.
- Non-Blocking I/O: When a request asks for a database query or a file read, Node.js hands that task over to the operating system or its internal C++ thread pool (libuv).
- The Event Loop: Instead of waiting for the database to respond, the single thread immediately moves on to accept the next incoming request.
- Callback Execution: When the database task finishes, it triggers a callback. The Event Loop picks up this callback and sends the response back to the user.

### 12. What is cluster module in nodejs?
The Cluster module is a built-in Node.js feature that allows you to run multiple instances of your application simultaneously to utilize all available CPU cores.

Because Node.js runs on a single thread by default, it only uses one CPU core. If your server has 8 cores, 7 of them sit idle. The cluster module solves this limitation.

How the Cluster Module Works
- Master Process: The main application process that starts first. It does not handle network requests itself. Instead, it spawns worker processes and manages them.
- Worker Processes: Duplicate instances of your application running on separate threads/cores. They share the same server port (e.g., port 3000).
- Load Balancing: The master process automatically distributes incoming network requests among the worker processes using a Round-Robin algorithm.

Key Benefits
- True Parallelism: Your app can handle multiple heavy CPU tasks at the exact same time.
- Zero Downtime: If one worker process crashes due to a bug, the master process can instantly spawn a new one without taking your website offline.
- Increased Throughput: It allows a single server to handle significantly more concurrent requests.

### 12. When do we use cluster module in nodejs?
We use the Cluster module in Node.js when an application needs to scale horizontally across multiple CPU cores on a single machine.

Key Scenarios for Using the Cluster Module
- Maximizing Multi-Core Hardware: Use it when deploying to a production server with multiple CPUs so that background cores do not sit idle.
- Handling High Network Traffic: Use it for high-volume HTTP servers or API gateways to distribute the incoming request load across multiple processes.
- Achieving High Availability: Use it to prevent app downtime. If a bug crashes one worker process, the remaining workers keep serving users while the master restarts the failed one.
- Isolating CPU-Intensive Tasks: Use it when your route handlers perform moderate CPU tasks (like JSON parsing or cryptography) so they do not block requests for other users.

When NOT to Use It
- Cloud-Native Containers: Do not use it if you deploy via Docker, Kubernetes, or AWS ECS, as these platforms handle scaling and load balancing externally.
- Stateful Applications: Avoid it if your app stores sessions or data in local server memory. Workers do not share memory, so you must use an external database like Redis.

### 12. What is PM2 and how do we manage clusters automatically using a tool like PM2?
PM2 is a production-grade, open-source Process Manager for Node.js applications. It keeps your application alive forever, reloads it with zero downtime, balances network traffic across CPU cores, and simplifies logging and monitoring.

In production, developers rarely write custom cluster-module code. Instead, they use PM2 to handle clustering automatically via configuration.

1. Automatic Load BalancingPM2 shares the network ports between all workers and uses a round-robin algorithm to distribute incoming HTTP/API requests evenly. Your code does not change at all.

2. Self-Healing & Zero DowntimeAuto-Restart: If a worker process crashes due to an unhandled error or a memory leak, PM2 instantly kills it and spawns a new one.Hot Reloading: When you update your code, PM2 reloads workers one by one (pm2 reload). Users experience zero downtime because some workers stay online while others restart.


### 12. Child process vs worker thread?
The primary difference is that Child Processes run in completely separate operating system processes with isolated memory, while Worker Threads run inside the same process and share memory.

Child Processes
Child processes spin up entirely new instances of the Node.js runtime environment.
- Memory: Isolated. Processes cannot directly access each other's variables.
- Overhead: High. Each process takes around 30MB of memory and requires significant CPU to spin up.
- Communication: Message-based (Serialization/IPC). Data must be turned into a string, sent over, and parsed.
- Best Used For: Running external system commands (like a bash script), executing independent applications, or isolating risky tasks that might crash the process.

Worker Threads
Worker threads (worker_threads module) allow you to run CPU-intensive tasks on background threads within the main process.
- Memory: Shared. Threads share the same application memory space and can utilize ArrayBuffer objects for zero-copy data transfer.
- Overhead: Low. Threads are lightweight, fast to create, and share the single Node.js runtime instance.
- Communication: Direct or message-based. Communication is much faster because data can be shared directly via shared memory.
- Best Used For: Heavy CPU-intensive mathematical or data calculations inside Node.js (like image processing, cryptography, or parsing massive JSON objects) without blocking the main event loop.

### 12. Can nodejs use multiple CPU cores?
Yes, Node.js can use multiple CPU cores, even though its main event loop runs on a single thread. It achieves this by using built-in modules or internal architecture to spread tasks across your processor's cores.

How Node.js Uses Multiple Cores
- The Internal Thread Pool (libuv): Node.js automatically shifts heavy tasks like file system operations (fs), cryptography (crypto), and compression (zlib) onto a background C++ thread pool. This pool utilizes multiple CPU cores out of the box without any extra code.
- The Cluster Module: This allows you to spawn copy instances of your application (worker processes) that run simultaneously. Each worker runs on its own CPU core and shares the same network port to handle incoming traffic.
- Worker Threads: The worker_threads module lets you execute heavy JavaScript CPU calculations (like data processing or image manipulation) on separate threads inside parallel CPU cores.
- Process Managers (PM2): Tools like PM2 automate the setup of the Cluster module in production, instantly scaling your single application to use every available core on the server machine.

### 12. What is heap snapshot and startup snapshot?
Heap Snapshot
A Heap Snapshot is a diagnostic tool that captures a complete picture of your application's memory usage at a specific moment in time. It records every JavaScript object, closure, and DOM node currently allocated in the V8 engine's heap memory.

- Primary Use Case: Troubleshooting and fixing memory leaks.
- How it helps: By taking two separate snapshots (before and after a heavy task), you can compare them to see which objects were created but never cleaned up by the Garbage Collector.
- How to generate it: You can capture one programmatically using the built-in v8 module via v8.getHeapSnapshot(), or externally by connecting Google Chrome DevTools to a running Node.js process using the --inspect flag.

Startup Snapshot
A Startup Snapshot is a performance optimization tool that serializes the state of a fully initialized Node.js application into a binary file. Instead of forcing Node.js to parse JavaScript code, resolve dependencies (require/import), and initialize variables every single time your server boots up, it loads the pre-compiled snapshot directly into memory.

- Primary Use Case: Accelerating application startup time and reducing cold start latencies (highly critical for Serverless functions, AWS Lambda, and microservices).
- How it helps: It cuts down boot times from seconds to milliseconds by executing initialization code once during a build step rather than at runtime.
- How to use it: You can use the built-in v8.startupSnapshot API and build your application using the --snapshot-blob flag in the Node.js CLI.

### 12. What if cpu usage becomes 100 percent how to fix this?
When CPU usage hits 100%, the Node.js single thread is completely starved. The event loop cannot process incoming requests, the application stops responding, and health checks will begin to fail.

Step 1: Diagnose the Cause (Find the Culprit)
You cannot fix the issue until you know exactly what is locking up the CPU.

- Generate a Flame Graph / Profile: Start Node.js with the built-in profiler:
```js
node --prof app.js
```
Run traffic against it, then process the generated log file to see exactly which functions are consuming the most CPU cycles.

- Take a Heap Snapshot: High CPU usage is often caused by the Garbage Collector working in overdrive trying to free up memory during a memory leak. Check if memory usage is spiking alongside the CPU.

- Use APM Tools: In production, tools like New Relic, Datadog, or PM2 Plus can pinpoint the exact route or function causing the spike.

Step 2: Immediate Production Quick Fixes
If your production server is down right now, use these infrastructure fixes to restore service immediately.

Restart with PM2: Force a clean slate to clear stuck infinite loops:

pm2 reload all
Scale Horizontally (Cluster Mode): If you are running on a single core, scale to all available cores instantly:

```js
pm2 restart app.js -i max
```

Add a Reverse Proxy Rate Limiter: If the spike is caused by a DDoS attack or scraping bots, block them at the Nginx or Cloudflare level before they hit Node.js.

Step 3: Permanent Code Fixes
Once the server is stable, rewrite the problematic code using these strategies.

1. Offload Heavy CPU Calculations
Never perform heavy math, image processing, or massive loops on the main thread. Move them to Worker Threads

```js
const { Worker } = require('worker_threads');

// Instead of doing heavy work here, offload it
const worker = new Worker('./cpu-intensive-task.js');
worker.on('message', (result) => console.log(result));
```

2. Avoid Synchronous APIsReplace blocking synchronous methods with their asynchronous equivalents.
- Bad: fs.readFileSync() or crypto.pbkdf2Sync()
- Good: fs.promises.readFile() or crypto.pbkdf2()

3. Break Up Massive Loops
- If you must process a massive array (e.g., 1 million items), split the execution using setImmediate() to let the event loop breathe between chunks:

```js
function processLargeArray(items) {
  if (items.length === 0) return;
  
  // Process a small chunk of 1000 items
  const chunk = items.splice(0, 1000);
  doMath(chunk);
  
  // Yield control back to the event loop before doing the next chunk
  setImmediate(() => processLargeArray(items));
}
```

4. Stream Large Files
-Do not load massive files or database dumps entirely into memory using fs.readFile(), as parsing them spikes the CPU. Use Streams to process the data chunk-by-chunk:

```js
const fs = require('fs');
// Uses minimal memory and CPU
fs.createReadStream('huge-file.log').pipe(res); 
```

### 12. CPU profiling?
CPU Profiling is the process of measuring how much CPU time your code functions consume while executing. It helps you pinpoint exactly which lines of code, loops, or third-party libraries are causing your Node.js application to slow down or hit 100% CPU usage.

Method 1: The Built-In Node.js Profiler (Quickest)
Node.js has a built-in profiler that samples your application's stack at regular intervals.

1. Start your application with the profile flag:

```js
node --prof app.js
```

2. Simulate traffic:
- Run your application and hit the slow routes using a tool like autocannon or ab, or just browse the app to trigger the high CPU usage.

3. Process the log file:
- When you stop the server, Node.js generates a file named something like isolate-0xXXXXXXXXXXXX-v8.log. This file is unreadable by humans. Process it using the built-in tick processor:

```js
node --prof-process isolate-0xXXXXXXXXXXXX-v8.log > processed_profile.txt
```

### 12. What is streams?
A Stream is a built-in Node.js feature designed to handle reading or writing data chunk-by-chunk, rather than loading an entire file or dataset into memory all at once.

If you try to read a 4GB file using standard methods like fs.readFile(), Node.js will attempt to load all 4GB into RAM simultaneously, causing a crash (JavaScript heap out of memory). Streams solve this by processing the file in small, manageable pieces (usually 64KB chunks).

The Four Types of Streams
- Readable Streams: Used to read data from a source.
  Examples: fs.createReadStream(), an incoming HTTP client request (req).
- Writable Streams: Used to write data to a destination.
  Examples: fs.createWriteStream(), an HTTP server response (res).
- Duplex Streams: Streams that are both Readable and Writable simultaneously.
  Example: A network socket connection (net.Socket).
- Transform Streams: A type of Duplex stream that can modify or transform the data as it is being read and written.
  Examples: zlib.createGzip() (to compress data on the fly), crypto.createCipheriv() (to encrypt data).

Why Streams are Crucial (Key Benefits)
- Memory Efficiency: You can process files larger than your server's total RAM. Only a tiny chunk is loaded into memory at any given second.
- Time Efficiency: You can start processing or sending data to the client as soon as the first chunk arrives, instead of waiting for the entire payload to be read from disk.
- Composability (Piping): You can cleanly connect streams together like LEGO blocks using the .pipe() method.

Code Comparison: Standard vs. Streams

❌ The Bad Way (Loads everything into RAM)javascriptconst fs = require('fs');
```js
const http = require('http');

http.createServer((req, res) => {
  // If the file is 2GB, this uses 2GB of RAM instantly
  fs.readFile('huge-video.mp4', (err, data) => {
    res.end(data);
  });
}).listen(3000);
```

The Streams Way (Uses minimal RAM)javascriptconst fs = require('fs');

```js
const http = require('http');
http.createServer((req, res) => {
  // Reads and sends the video in tiny 64KB pieces
  const stream = fs.createReadStream('huge-video.mp4');
  
  // Combines the readable stream to the writable response stream
  stream.pipe(res); 
}).listen(3000);
```

### 12. How to scale node.js application?
- Horizontal scaling
- Use cluster mode
- Use load balancer
- Use Worker thread
- Use PM2

### 11. How to debug nodejs app in production issue?

### 12. When do we use worker threads in nodejs?

## Core Architecture and Event Loop (Advanced)

### 131. Explain the phases of the Event Loop in detail

Simple definition:

The event loop is a loop that runs phases in order. After each phase, Node.js clears microtasks (`process.nextTick` first, then Promise callbacks) before moving to the next phase.

Main phases:

1. **Timers** — runs `setTimeout` and `setInterval` callbacks whose delay has expired.
2. **Pending callbacks** — runs some deferred I/O callbacks (for example TCP errors).
3. **Idle, prepare** — internal libuv work (usually not important in app code).
4. **Poll** — waits for new I/O events and runs I/O callbacks (network, file read completion).
5. **Check** — runs `setImmediate` callbacks.
6. **Close callbacks** — runs close events like `socket.on('close')`.

Simple flow:

```text
Sync code -> nextTick -> Promises -> Timers -> Pending -> Poll -> Check -> Close -> repeat
```

Example:

```js
const fs = require('fs');

console.log('1 sync');

setTimeout(() => console.log('2 timer'), 0);
setImmediate(() => console.log('3 immediate'));

fs.readFile(__filename, () => {
  console.log('4 I/O callback');
  setTimeout(() => console.log('5 timer in I/O'), 0);
  setImmediate(() => console.log('6 immediate in I/O'));
});

Promise.resolve().then(() => console.log('7 promise'));
process.nextTick(() => console.log('8 nextTick'));
```

Interview answer:

```text
The event loop processes work in phases. Timers run delayed callbacks, poll handles I/O, check runs setImmediate, and close handles cleanup. Microtasks run between phases, with process.nextTick having the highest priority.
```

### 132. How do process.nextTick(), queueMicrotask(), and setImmediate() differ?

Simple definition:

- `process.nextTick()` — runs before any other async callback (highest priority).
- `queueMicrotask()` — runs in the microtask queue (same priority as Promise `.then()`).
- `setImmediate()` — runs in the **check phase** of the event loop (lower priority than microtasks).

Example:

```js
console.log('start');

setImmediate(() => console.log('setImmediate'));
queueMicrotask(() => console.log('queueMicrotask'));
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));

console.log('end');
```

Typical output:

```text
start
end
nextTick
queueMicrotask
promise
setImmediate
```

When to use what:

```js
// nextTick: run cleanup before event loop continues
process.nextTick(() => cleanup());

// queueMicrotask / Promise: standard async follow-up
queueMicrotask(() => scheduleFollowUp());

// setImmediate: run after current I/O cycle
setImmediate(() => processLargeBatch());
```

Interview answer:

```text
nextTick runs first and can starve the loop if overused. queueMicrotask and Promises are microtasks with normal priority. setImmediate runs later in the check phase, after I/O polling.
```

### 132. What are the potential pitfalls of using closures?
Potential pitfalls of using closures in JavaScript include:

- Memory Leaks: Closures can unintentionally keep outer function scopes alive, causing memory leaks.
- Variable Sharing: They can lead to unexpected variable sharing between closures.
- Performance Issues: Overuse can impact performance due to increased memory usage.
- Debugging Complexity: Understanding and debugging code with closures can be challenging due to the complexity of the scope chain.

### 

### 133. How does Node.js handle asynchronous I/O at the OS level via libuv?

Simple definition:

libuv is a C library that talks to the operating system. For network I/O it uses OS async APIs (epoll on Linux, kqueue on macOS, IOCP on Windows). For some file/crypto/dns work it uses a thread pool.

Example mental model:

```text
JavaScript request -> libuv -> OS async API or thread pool -> callback queued -> event loop runs callback
```

Network example:

```js
const http = require('http');

http.createServer((req, res) => {
  // Node registers socket with OS; callback runs when data arrives
  res.end('Hello');
}).listen(3000);
```

File example (uses thread pool):

```js
const fs = require('fs');

fs.readFile('large-file.txt', (err, data) => {
  // libuv worker thread read the file; callback runs on main thread
  console.log(data.length);
});
```

Interview answer:

```text
libuv bridges JavaScript and the OS. Network sockets use non-blocking OS APIs. Some blocking operations like file reads use libuv's thread pool so the main JavaScript thread stays free.
```

### 134. How does the libuv Thread Pool work, and how do you tune its size?

Simple definition:

libuv maintains a fixed pool of worker threads (default **4**) for operations that cannot use pure async OS APIs, such as file system, DNS (`dns.lookup`), and some crypto work.

Tune size with environment variable:

```bash
UV_THREADPOOL_SIZE=8 node server.js
```

Example:

```js
// These may use thread pool workers:
const fs = require('fs');
const crypto = require('crypto');
const dns = require('dns');

fs.readFile('data.txt', () => {});
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {});
dns.lookup('example.com', () => {});
```

Important notes:

- Max recommended size is usually **128**.
- More threads help I/O-heavy thread-pool work but use more CPU and memory.
- CPU-heavy JavaScript still blocks the main thread — thread pool does not fix that.

Interview answer:

```text
The thread pool offloads blocking libuv tasks from the main thread. Default size is 4. Increase UV_THREADPOOL_SIZE when many concurrent file or crypto operations queue up, but profile first because too many threads can hurt performance.
```

### 135. What are the performance implications of synchronous code in a callback?

Simple definition:

Even inside an async callback, **synchronous blocking code stops the entire event loop**. No other requests, timers, or I/O callbacks run until it finishes.

Bad example:

```js
app.get('/report', (req, res) => {
  // BAD: blocks all users for 2 seconds
  const start = Date.now();
  while (Date.now() - start < 2000) {}

  res.json({ ok: true });
});
```

Good example:

```js
app.get('/report', async (req, res) => {
  const data = await generateReportInWorker(); // offload heavy work
  res.json(data);
});
```

Impact:

- Increased latency for all clients
- Timeouts and health check failures
- Queue buildup under load
- Poor CPU utilization pattern

Interview answer:

```text
Callbacks run on the main thread. Heavy sync work inside them blocks the event loop just like sync code at the top level. Offload CPU work to worker threads, queues, or separate services.
```

### 136. Explain the V8 garbage collection mechanism and its main phases

Simple definition:

V8 automatically frees memory for objects that are no longer reachable. It uses a **generational** collector: new objects die young in the young generation; survivors move to the old generation.

Main ideas:

1. **New Space (Scavenge)** — fast, frequent GC for short-lived objects.
2. **Old Space (Mark-Sweep-Compact)** — slower GC for long-lived objects.
3. **Mark phase** — find reachable objects.
4. **Sweep phase** — free unreachable objects.
5. **Compact phase** — reduce memory fragmentation (when needed).

Example:

```js
function createUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({ id: i, name: `User-${i}` }); // short-lived if function ends
  }
  return users[0]; // only one object stays reachable
}
```

Trigger GC manually only for debugging:

```bash
node --expose-gc app.js
```

```js
if (global.gc) global.gc();
```

Interview answer:

```text
V8 divides heap into young and old generations. Most objects are collected quickly in the young generation. Long-lived objects are promoted and collected less often with mark-sweep-compact. Frequent GC pauses usually mean too many long-lived objects or memory leaks.
```

### 137. How do you identify and debug a memory leak in production Node.js?

Simple definition:

A memory leak happens when memory usage keeps growing because objects stay reachable when they should be freed.

Common causes:

- Global arrays/maps that grow forever
- Forgotten timers/intervals
- Event listeners not removed
- Closures holding large objects
- Unbounded caches

Debug steps:

```bash
# 1. Watch memory over time
node --inspect app.js

# 2. Take heap snapshots at different times
kill -USR2 <pid>   # if configured with heapdump

# 3. Compare snapshots in Chrome DevTools
```

Code pattern to detect growth:

```js
setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    rss: Math.round(used.rss / 1024 / 1024) + ' MB',
    heapUsed: Math.round(used.heapUsed / 1024 / 1024) + ' MB',
  });
}, 30000);
```

Production-safe approach:

```js
const cache = new Map();
const MAX_CACHE_SIZE = 1000;

function setCache(key, value) {
  if (cache.size >= MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  cache.set(key, value);
}
```

Interview answer:

```text
Monitor heapUsed over time, capture heap snapshots, compare retained objects, and fix roots like global caches, listeners, and timers. Use bounded caches, remove listeners, and restart workers gracefully in production as a safety net.
```

### 138. What is the impact of hidden classes and inline caches in V8 optimization?

Simple definition:

V8 creates hidden classes (internal shapes) for objects with the same property layout. When object shapes stay consistent, V8 can optimize property access with inline caches (fast paths).

Good pattern (same shape):

```js
function createUser(name, age) {
  return { name, age, active: true }; // same shape every time
}

const u1 = createUser('Asha', 25);
const u2 = createUser('Ravi', 30);
```

Bad pattern (changing shape):

```js
const user = { name: 'Asha' };
user.age = 25;        // shape changed
user.active = true;   // shape changed again
delete user.age;      // shape changed again
```

Impact:

- Consistent object shapes = faster property reads/writes
- Adding/removing properties dynamically = deoptimization
- Mixing types in hot loops = slower code

Interview answer:

```text
V8 optimizes objects that keep the same property structure. Initialize properties in a consistent order and avoid adding or deleting properties on hot-path objects to keep inline caches fast.
```

### 139. Explain execution differences between CommonJS (CJS) and ECMAScript Modules (ESM)

Simple definition:

- **CJS** — loads synchronously, `require()` at runtime, `module.exports`.
- **ESM** — loads asynchronously, static `import`/`export`, better for tree-shaking.

CJS example:

```js
// math.cjs
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.cjs
const { add } = require('./math.cjs');
console.log(add(2, 3));
```

ESM example:

```js
// math.mjs
export function add(a, b) {
  return a + b;
}

// app.mjs
import { add } from './math.mjs';
console.log(add(2, 3));
```

Key differences:

| Feature | CJS | ESM |
|---|---|---|
| Loading | Synchronous | Asynchronous |
| Top-level await | No | Yes |
| `__dirname` | Available | Use `import.meta.url` |
| Dynamic import | `require()` | `import()` |
| Tree shaking | Limited | Better |

Enable ESM in Node:

```json
{
  "type": "module"
}
```

Interview answer:

```text
CJS uses require/module.exports and loads synchronously. ESM uses import/export, supports top-level await, and enables better static analysis. Node supports both, but mixing them needs careful setup.
```

### 140. How does Node.js handle backpressure in streams?

Simple definition:

Backpressure means a **slow consumer** tells a **fast producer** to pause so memory does not explode.

Without backpressure (bad):

```js
const fs = require('fs');
const readable = fs.createReadStream('big-file.txt');
const writable = fs.createWriteStream('copy.txt');

readable.on('data', (chunk) => {
  writable.write(chunk); // may buffer endlessly if disk is slow
});
```

With backpressure (good):

```js
const fs = require('fs');

fs.createReadStream('big-file.txt')
  .pipe(fs.createWriteStream('copy.txt'));
// pipe() handles pause/resume automatically
```

Manual backpressure:

```js
readable.on('data', (chunk) => {
  const ok = writable.write(chunk);
  if (!ok) {
    readable.pause();
    writable.once('drain', () => readable.resume());
  }
});
```

Interview answer:

```text
Streams use backpressure to prevent unbounded buffering. writable.write() returns false when the internal buffer is full, so the readable stream should pause until the drain event fires.
```

## Advanced Streams and Buffers

### 141. Difference between Readable, Writable, Duplex, and Transform streams?

Simple definition:

| Type | Direction | Example |
|---|---|---|
| Readable | Read only | `fs.createReadStream` |
| Writable | Write only | `fs.createWriteStream` |
| Duplex | Read and write (independent) | TCP socket |
| Transform | Read, modify, write | gzip compression |

Examples:

```js
const { Readable, Writable, Duplex, Transform } = require('stream');

// Readable
const readable = Readable.from(['hello', 'world']);

// Writable
const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
});

// Duplex (simplified)
const duplex = new Duplex({
  read() {
    this.push('data');
    this.push(null);
  },
  write(chunk, encoding, callback) {
    callback();
  },
});

// Transform
const upper = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

readable.pipe(upper).pipe(writable);
```

Interview answer:

```text
Readable produces data, Writable consumes it, Duplex does both independently like a socket, and Transform is a Duplex that modifies data in the middle, like compression or encryption.
```

### 142. How do you implement a custom Transform stream for data masking?

Simple definition:

A Transform stream reads input chunks, changes them, and pushes output chunks.

Example — mask email in log lines:

```js
const { Transform } = require('stream');

const maskEmail = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString();
    const masked = text.replace(
      /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
      '***@$2'
    );
    this.push(masked);
    callback();
  },
});

process.stdin.pipe(maskEmail).pipe(process.stdout);
// Input:  user@example.com logged in
// Output: ***@example.com logged in
```

With object mode (JSON records):

```js
const maskUserStream = new Transform({
  objectMode: true,
  transform(user, encoding, callback) {
    callback(null, {
      ...user,
      email: '***@hidden.com',
      password: undefined,
    });
  },
});
```

Interview answer:

```text
Implement a Transform stream with a transform() function that modifies each chunk and calls callback() when done. Use it in a pipe chain to process large files line-by-line without loading everything into memory.
```

### 143. What is the relationship between Buffer and ArrayBuffer in V8?

Simple definition:

- **ArrayBuffer** — raw binary memory (JavaScript standard).
- **Buffer** — Node.js wrapper around ArrayBuffer with helper methods.
- **TypedArray** (Uint8Array, etc.) — view into ArrayBuffer memory.

Example:

```js
const buf = Buffer.from('hello');      // Node.js Buffer
const arrayBuffer = buf.buffer;        // underlying ArrayBuffer
const view = new Uint8Array(arrayBuffer, buf.byteOffset, buf.byteLength);

console.log(buf.toString());           // hello
console.log(view[0]);                  // 104 (ASCII of 'h')
console.log(buf instanceof Uint8Array); // true in modern Node
```

Convert between them:

```js
const buf = Buffer.from([1, 2, 3]);
const uint8 = new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
const backToBuffer = Buffer.from(uint8);
```

Interview answer:

```text
Buffer is Node's high-level binary API built on top of ArrayBuffer. A Buffer shares the same underlying memory as TypedArray views, which is why Buffer methods are fast for network and file I/O.
```

### 144. Buffer.alloc() vs Buffer.allocUnsafe() — memory allocation strategy

Simple definition:

- `Buffer.alloc(size)` — allocates and **zero-fills** memory (safe, slower).
- `Buffer.allocUnsafe(size)` — allocates without zeroing (faster, may contain old data).

Example:

```js
const safe = Buffer.alloc(10);
console.log(safe); // <Buffer 00 00 00 00 00 00 00 00 00 00>

const fast = Buffer.allocUnsafe(10);
console.log(fast); // may contain leftover memory garbage
fast.fill(0);      // zero manually if needed
```

When to use:

```js
// Sensitive data (passwords, tokens)
const secretBuffer = Buffer.alloc(64);

// Performance-critical, non-sensitive bulk I/O
const chunk = Buffer.allocUnsafe(64 * 1024);
```

Interview answer:

```text
Use alloc for security-sensitive buffers because allocUnsafe may leak old memory contents. Use allocUnsafe for high-performance I/O when you immediately overwrite the buffer.
```

### 145. How do you stream large multi-gigabyte files without crashing the V8 heap?

Simple definition:

Never read the whole file into memory. Process it in chunks using streams.

Bad (loads entire file):

```js
const fs = require('fs');

app.get('/download', (req, res) => {
  const data = fs.readFileSync('10gb-file.bin'); // can crash process
  res.send(data);
});
```

Good (streams chunks):

```js
const fs = require('fs');

app.get('/download', (req, res) => {
  const stream = fs.createReadStream('10gb-file.bin');
  stream.on('error', () => res.status(500).end());
  stream.pipe(res);
});
```

Upload large file:

```js
const upload = fs.createWriteStream('upload.bin');
req.pipe(upload);
```

Extra tips:

- Set timeouts appropriately
- Handle client disconnect (`req.on('close')`)
- Use `highWaterMark` to tune chunk size
- For transforms, always respect backpressure

Interview answer:

```text
Use createReadStream/createWriteStream and pipe data chunk-by-chunk. Avoid readFile/readFileSync for large files because they allocate the entire file in the V8 heap.
```

## Concurrency, Scaling and Performance

### 146. How does the Cluster module work for multi-core scaling?

Simple definition:

Cluster forks multiple Node.js **processes** (workers), one per CPU core. All workers share the same server port; the OS distributes incoming connections.

Example:

```js
const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died, restarting`);
    cluster.fork();
  });
} else {
  http.createServer((req, res) => {
    res.end(`Handled by worker ${process.pid}`);
  }).listen(3000);
}
```

Under the hood:

```text
Primary process -> fork workers -> workers listen on same port -> OS load balances connections
```

Interview answer:

```text
Cluster uses multiple Node processes to use all CPU cores. Each worker has its own memory and event loop. The primary process manages worker lifecycle and restarts crashed workers.
```

### 147. Cluster module vs Worker Threads — when to use each?

Simple definition:

| Feature | Cluster | Worker Threads |
|---|---|---|
| Unit | Separate process | Thread in same process |
| Memory | Isolated | Shared (with limits) |
| Best for | HTTP servers, isolation | CPU-heavy tasks |
| Crash impact | One worker dies | Can affect whole process |

Cluster example (I/O server):

```js
// Use cluster for scaling HTTP across cores
if (cluster.isPrimary) {
  for (let i = 0; i < 4; i++) cluster.fork();
}
```

Worker Threads example (CPU task):

```js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename, { workerData: { n: 40 } });
  worker.on('message', (result) => console.log('Fibonacci:', result));
} else {
  const fib = (n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2));
  parentPort.postMessage(fib(workerData.n));
}
```

When to use:

- **Cluster** — scale web servers, fault isolation per process
- **Worker Threads** — heavy computation, image processing, parsing large JSON

Interview answer:

```text
Use Cluster to scale I/O-bound HTTP services across cores. Use Worker Threads for CPU-bound work inside one app. Cluster gives process isolation; Worker Threads give lower overhead for sharing data.
```

### 148. State management strategies when scaling Node.js horizontally

Simple definition:

When you run many Node.js instances, **in-memory state is not shared**. Store shared state outside the process.

Strategies:

1. **Stateless API servers** — JWT/session id only; no local user state
2. **External session store** — Redis for sessions
3. **Shared cache** — Redis/Memcached
4. **Database as source of truth** — MongoDB/PostgreSQL
5. **Message queue** — RabbitMQ/Kafka for async work
6. **Sticky sessions** — only when absolutely needed (WebSockets)

Example — stateless auth:

```js
// BAD: in-memory session map breaks with multiple instances
const sessions = new Map();

// GOOD: Redis shared across all instances
const session = await redis.get(`session:${sessionId}`);
```

Example — sticky WebSocket note:

```text
Prefer Redis pub/sub or a message broker so any worker can broadcast to connected clients.
```

Interview answer:

```text
Design services to be stateless. Put sessions, cache, locks, and pub/sub in Redis or a database. Avoid assuming data in one process memory is visible to other instances.
```

### 149. How to implement a Circuit Breaker in a Node.js microservice?

Simple definition:

A circuit breaker stops calling a failing downstream service after too many failures, giving it time to recover.

States:

- **Closed** — normal calls
- **Open** — fail fast, no calls
- **Half-open** — test if service recovered

Simple implementation:

```js
class CircuitBreaker {
  constructor(threshold = 5, timeout = 10000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED';
    this.nextAttempt = Date.now();
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount += 1;
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

const breaker = new CircuitBreaker();

async function getUserFromService(id) {
  return breaker.call(() => fetch(`http://user-service/users/${id}`));
}
```

Libraries: `opossum`, `cockatiel`.

Interview answer:

```text
Track failures to a dependency. After a threshold, open the circuit and return fast errors or fallback responses. After a cooldown, allow trial requests in half-open state before fully closing the circuit.
```

### 150. How do you profile CPU performance in Node.js?

Simple definition:

Profiling finds which functions consume the most CPU time.

Built-in flags:

```bash
# CPU profile
node --prof app.js
node --prof-process isolate-*.log > processed.txt

# Inspect in Chrome DevTools
node --inspect app.js

# Diagnostic report on crash
node --report-on-fatalerror app.js
```

Using clinic.js:

```bash
npm install -g clinic
clinic doctor -- node server.js
clinic flame -- node server.js
clinic bubbleprof -- node server.js
```

Code-level timing:

```js
console.time('db-query');
await User.find({});
console.timeEnd('db-query');
```

Interview answer:

```text
Start with clinic.js or Chrome DevTools CPU profiler to find hot functions. Use --prof for low-level analysis. Fix event loop blockers, reduce sync work, and optimize database and JSON parsing in hot paths.
```

### 151. Bottlenecks of using PM2 in Docker/Kubernetes

Simple definition:

PM2 is a process manager great for bare-metal/VPS deployments, but in Kubernetes it adds an extra layer because Kubernetes already manages pods, restarts, and scaling.

Common bottlenecks:

1. **Double process management** — PM2 inside a container + K8s restarting pods
2. **Wrong signal handling** — PM2 may not forward SIGTERM for graceful shutdown
3. **Cluster mode vs K8s replicas** — running PM2 cluster with many pods over-scales CPU
4. **Health checks** — PM2 status != app readiness (DB connected?)
5. **Log aggregation** — PM2 log files vs stdout/stderr expected by K8s
6. **Extra memory overhead** — PM2 daemon + Node workers in one container

Recommended in Kubernetes:

```dockerfile
# Run Node directly, one process per container
CMD ["node", "server.js"]
```

Use K8s for:

- replicas / HPA scaling
- liveness/readiness probes
- rolling updates
- resource limits

Interview answer:

```text
In Kubernetes, prefer one Node process per container and let K8s handle restarts and scaling. PM2 adds complexity, can interfere with graceful shutdown, and duplicates what the orchestrator already does.
```

### 152. How do you prevent EventEmitter memory leaks from dangling listeners?

Simple definition:

Every `on('event')` adds a listener. If you never remove it, memory grows and warnings appear.

Problem:

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

setInterval(() => {
  emitter.on('data', () => {}); // leak: adds listener every second
}, 1000);
```

Fixes:

```js
// 1. Remove when done
emitter.on('data', handler);
emitter.off('data', handler);

// 2. once for one-time listeners
emitter.once('connected', () => {});

// 3. setMaxListeners for debugging
emitter.setMaxListeners(20);

// 4. removeAllListeners on shutdown
process.on('SIGTERM', () => emitter.removeAllListeners());
```

Detect leaks:

```js
emitter.on('newListener', (event) => {
  console.log('Listener added:', event, emitter.listenerCount(event));
});
```

Interview answer:

```text
Always remove listeners you no longer need, prefer once() for one-time handlers, and clean up on shutdown. Watch MaxListenersExceededWarning in logs as a leak signal.
```

### 153. Architectural design of a highly available WebSocket server

Simple definition:

Run multiple Node instances behind a load balancer, share pub/sub for cross-server messaging, and store connection metadata in Redis.

Architecture:

```text
Clients -> Load Balancer -> WS Node 1 / Node 2 / Node 3
                                \       |       /
                                 Redis Pub/Sub
                                 Redis (session/room state)
```

Example with `ws` + Redis:

```js
const WebSocket = require('ws');
const Redis = require('ioredis');

const pub = new Redis();
const sub = new Redis();
const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map();

wss.on('connection', (ws, req) => {
  const userId = authenticate(req);
  clients.set(userId, ws);

  ws.on('close', () => clients.delete(userId));
});

sub.subscribe('chat-room');
sub.on('message', (channel, message) => {
  const { userId, text } = JSON.parse(message);
  const ws = clients.get(userId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(text);
  }
});

function broadcast(room, payload) {
  pub.publish('chat-room', JSON.stringify(payload));
}
```

HA checklist:

- Multiple WS nodes
- Sticky sessions or shared room state
- Redis pub/sub for cross-node events
- Heartbeat/ping-pong
- Graceful shutdown (stop accepting, drain connections)
- Health checks and auto-restart

Interview answer:

```text
Scale WebSocket servers horizontally with a load balancer, use Redis pub/sub to broadcast across nodes, store room membership centrally, and implement heartbeats and graceful shutdown for zero-downtime deploys.
```

### 154. How does Keep-Alive optimization impact HTTP throughput?

Simple definition:

HTTP Keep-Alive reuses the same TCP connection for multiple requests instead of opening a new connection every time.

Without Keep-Alive:

```text
Request 1: TCP handshake -> HTTP -> close
Request 2: TCP handshake -> HTTP -> close  (slow)
```

With Keep-Alive:

```text
TCP handshake once -> HTTP -> HTTP -> HTTP -> close  (faster)
```

Server (Node.js):

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Keep-Alive', 'timeout=5, max=1000');
  res.end('ok');
});
```

Client (axios/fetch agent):

```js
const http = require('http');
const agent = new http.Agent({ keepAlive: true, maxSockets: 50 });

// Reuse agent across requests to same host
```

Impact:

- Lower latency (no repeated handshakes)
- Higher throughput under high traffic
- Fewer open sockets if tuned correctly
- Risk of socket exhaustion if limits are wrong

Interview answer:

```text
Keep-Alive reuses TCP connections and greatly improves throughput for high-volume HTTP clients. Configure agent maxSockets and server timeouts to balance performance with resource usage.
```

### 155. Execute heavy computational tasks without blocking the event loop

Simple definition:

Move CPU-heavy work off the main thread using Worker Threads, child processes, job queues, or separate microservices.

Options:

```js
// 1. Worker Threads
const { Worker } = require('worker_threads');
new Worker('./heavy-task.js');

// 2. Child process
const { fork } = require('child_process');
fork('./heavy-task.js');

// 3. Job queue (BullMQ)
// API enqueues job -> worker process handles it -> result stored in Redis/DB
```

API pattern:

```js
app.post('/reports', async (req, res) => {
  const job = await reportQueue.add('generate', { userId: req.user.id });
  res.status(202).json({ jobId: job.id }); // accepted, processing async
});
```

Interview answer:

```text
Never run heavy CPU work in request handlers. Use worker threads for isolated tasks, queues for background jobs, or separate services for sustained compute load. Keep the main thread free for I/O and routing.
```

## Database, Caching and Integration

### 156. Database connection pooling and preventing starvation

Simple definition:

A connection pool reuses DB connections instead of opening a new one per request. Starvation happens when all connections are busy and new requests wait or fail.

Mongoose example:

```js
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 20,     // max open connections
  minPoolSize: 5,      // keep warm connections
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

Prevent starvation:

```js
// 1. Always release connections (ORM handles this if you await properly)
// 2. Set query timeouts
const users = await User.find({ active: true }).maxTimeMS(3000);

// 3. Limit concurrent heavy jobs
const limit = pLimit(5);
await Promise.all(jobs.map((job) => limit(() => runJob(job))));

// 4. Separate read/write pools or replicas for heavy reads
```

Signs of pool exhaustion:

- Requests hang then timeout
- `MongoServerSelectionError` or `too many connections`
- Rising queue latency

Interview answer:

```text
Configure pool size based on traffic and DB limits, enforce query timeouts, avoid long transactions, and limit concurrency for heavy operations so connections are not monopolized.
```

### 157. Mongoose middleware execution order (pre/post hooks)

Simple definition:

Mongoose middleware runs before or after certain operations like save, validate, remove.

Order for `save`:

```text
pre validate -> validate -> post validate -> pre save -> save -> post save
```

Example:

```js
userSchema.pre('validate', function () {
  console.log('1 pre validate');
});

userSchema.post('validate', function () {
  console.log('2 post validate');
});

userSchema.pre('save', async function () {
  console.log('3 pre save');
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.post('save', function (doc) {
  console.log('4 post save', doc._id);
});
```

Important notes:

- `pre('save')` runs on `document.save()` and `create()` (usually)
- `pre('findOneAndUpdate')` is different from `pre('save')`
- Use `next()` in callback-style middleware; async middleware can return a Promise

Interview answer:

```text
Mongoose runs validate hooks before save hooks. Pre hooks mutate or prepare data; post hooks run side effects like logging. Always attach hooks to the correct operation name for your query method.
```

### 158. Implement a reliable distributed lock with Node.js and Redis

Simple definition:

A distributed lock ensures only one service instance performs a critical task at a time across multiple servers.

Pattern with Redis `SET NX EX`:

```js
const Redis = require('ioredis');
const redis = new Redis();
const { randomUUID } = require('crypto');

async function acquireLock(key, ttlMs = 10000) {
  const token = randomUUID();
  const result = await redis.set(key, token, 'PX', ttlMs, 'NX');
  if (result !== 'OK') return null;
  return token;
}

async function releaseLock(key, token) {
  const script = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;
  return redis.eval(script, 1, key, token);
}

async function runWithLock() {
  const lockKey = 'lock:generate-invoice';
  const token = await acquireLock(lockKey, 15000);
  if (!token) throw new Error('Could not acquire lock');

  try {
    await generateInvoice();
  } finally {
    await releaseLock(lockKey, token);
  }
}
```

Best practices:

- Always set TTL (prevent dead locks)
- Use unique token per lock holder
- Release only if token matches
- For complex cases use Redlock algorithm or libraries like `redlock`

Interview answer:

```text
Use Redis SET key value NX EX ttl to acquire a lock with expiry, store a unique token, and release with a Lua script that deletes only if the token matches. This prevents two instances from doing the same critical work.
```

### 159. Mitigation strategies for Cache Stampede in Node.js

Simple definition:

Cache stampede happens when a popular cache key expires and many requests hit the database at the same time.

Mitigations:

1. **Locking** — only one request rebuilds cache
2. **Stale-while-revalidate** — serve stale data while refreshing in background
3. **Jittered TTL** — avoid all keys expiring together
4. **Probabilistic early refresh** — refresh before expiry under load

Example — lock + rebuild:

```js
async function getProduct(id) {
  const cacheKey = `product:${id}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const lockKey = `lock:${cacheKey}`;
  const token = await acquireLock(lockKey, 5000);

  if (!token) {
    // Another worker is rebuilding; wait briefly and retry cache
    await sleep(100);
    return getProduct(id);
  }

  try {
    const product = await Product.findById(id);
    await redis.set(cacheKey, JSON.stringify(product), 'EX', 300);
    return product;
  } finally {
    await releaseLock(lockKey, token);
  }
}
```

Jitter example:

```js
const ttl = 300 + Math.floor(Math.random() * 60); // 300-359 seconds
await redis.set(key, value, 'EX', ttl);
```

Interview answer:

```text
Prevent thundering herd with per-key locks, staggered TTLs, and stale-while-revalidate. Only one worker should rebuild expensive cache entries while others wait or serve slightly stale data.
```

### 160. Event-driven architecture with Kafka or RabbitMQ in Node.js

Simple definition:

Services communicate by publishing and consuming events instead of direct synchronous calls.

RabbitMQ example:

```js
// producer.js
const amqp = require('amqplib');

async function publishUserCreated(user) {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue('user.created', { durable: true });
  channel.sendToQueue('user.created', Buffer.from(JSON.stringify(user)));
  await channel.close();
  await conn.close();
}

// consumer.js
async function startConsumer() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue('user.created', { durable: true });

  channel.consume('user.created', async (msg) => {
    const user = JSON.parse(msg.content.toString());
    await sendWelcomeEmail(user);
    channel.ack(msg);
  });
}
```

Kafka-style pattern:

```text
User Service -> user.created topic -> Email Service
                                 -> Analytics Service
                                 -> Search Index Service
```

Design tips:

- Make consumers idempotent (safe to retry)
- Use dead-letter queues for failed messages
- Store event schema/version
- Avoid dual writes (DB + queue) without outbox pattern

Interview answer:

```text
Publish domain events to Kafka or RabbitMQ so services stay decoupled. Consumers process events asynchronously, retry on failure, and scale independently from the API layer.
```

### 161. Distributed transactions across microservices in Node.js

Simple definition:

There is no perfect single ACID transaction across separate services. Use patterns that keep data eventually consistent.

Patterns:

1. **Saga** — sequence of local transactions with compensating actions
2. **Outbox pattern** — write DB + event in same local transaction
3. **Two-phase commit** — rarely used (slow, tight coupling)

Saga example — order flow:

```text
Order Service: create order (PENDING)
Payment Service: charge card -> success
Inventory Service: reserve stock -> success
Order Service: mark CONFIRMED

If inventory fails:
Payment Service: refund (compensating action)
Order Service: mark FAILED
```

Outbox example:

```js
async function createOrder(orderData) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.create([orderData], { session });
    await Outbox.create([{
      type: 'OrderCreated',
      payload: order[0],
    }], { session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

// Separate worker reads Outbox and publishes to message broker
```

Interview answer:

```text
Avoid cross-service 2PC in Node microservices. Use sagas with compensating steps and the outbox pattern to reliably publish events after local DB commits.
```

### 162. Optimize slow database queries from the Node.js application layer

Simple definition:

Fix slow queries by reducing data fetched, adding indexes, caching, and avoiding N+1 patterns.

Techniques:

```js
// 1. Select only needed fields
User.find({}, 'name email');

// 2. Use indexes (define in schema)
userSchema.index({ email: 1 });

// 3. Avoid N+1 queries
// BAD
const orders = await Order.find();
for (const order of orders) {
  order.user = await User.findById(order.userId);
}

// GOOD
const orders = await Order.find().populate('userId', 'name email');

// 4. Pagination
User.find().sort({ createdAt: -1 }).skip(20).limit(20);

// 5. Cache expensive reads
const cached = await redis.get('dashboard:stats');
if (cached) return JSON.parse(cached);

// 6. Explain plan in MongoDB
await User.find({ email: 'test@example.com' }).explain('executionStats');
```

Interview answer:

```text
Profile queries with explain(), add proper indexes, limit fields returned, paginate results, eliminate N+1 patterns, and cache hot reads. Most slowness is too much data or missing indexes, not Node itself.
```

## Security and Error Handling (Advanced)

### 163. Operational errors vs programmer errors in Node.js

Simple definition:

- **Operational errors** — expected runtime problems (network down, invalid input, timeout).
- **Programmer errors** — bugs in code (undefined variable, wrong logic, type errors).

Operational error handling:

```js
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // expected
    }
    res.json(user);
  } catch (error) {
    next(error); // maybe DB down -> operational
  }
});
```

Programmer error example:

```js
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

calculateTotal(null); // programmer bug: no null check
```

How to respond:

- Operational -> return proper HTTP status, log, retry if useful
- Programmer -> log, alert, fix code, restart process if state may be corrupt

Interview answer:

```text
Operational errors are part of normal operation and should be handled gracefully. Programmer errors indicate bugs and should be fixed in code, not silently swallowed in production.
```

### 164. Why is process.on('uncaughtException') dangerous for normal flow control?

Simple definition:

`uncaughtException` means something went seriously wrong. The process may be in an unknown state. Using it like try/catch for business logic is unsafe.

Dangerous pattern:

```js
process.on('uncaughtException', (err) => {
  console.log('Ignored error, continuing...', err);
  // BAD: app may be corrupted but keeps serving traffic
});
```

Safer pattern:

```js
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  shutdownGracefully(); // stop accepting requests, close DB, exit
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  shutdownGracefully();
});
```

Why dangerous:

- Partially executed logic
- Leaked resources
- Corrupted in-memory state
- Unpredictable behavior after error

Interview answer:

```text
uncaughtException is a last-resort safety net, not normal error handling. Log the error, stop accepting new work, clean up, and restart. Fix the underlying bug instead of continuing in a broken state.
```

### 165. Securely manage and rotate secrets in production Node.js

Simple definition:

Never hardcode secrets. Load them from a secure source and rotate them regularly.

Bad:

```js
const JWT_SECRET = 'my-hardcoded-secret'; // never do this
```

Good:

```js
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is required');
```

Production approaches:

```text
Development -> .env (not committed)
Production  -> AWS Secrets Manager / HashiCorp Vault / K8s Secrets
Rotation    -> support two valid keys during transition
```

Rotation pattern:

```js
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_CURRENT);
  } catch {
    return jwt.verify(token, process.env.JWT_SECRET_PREVIOUS);
  }
}
```

Best practices:

- Never commit `.env` to git
- Least privilege IAM/service accounts
- Rotate DB passwords and API keys on schedule
- Audit secret access

Interview answer:

```text
Store secrets in environment variables backed by a secret manager, inject at runtime, rotate with overlap periods, and never log or commit secrets to source control.
```

### 166. Protect a Node.js API against Prototype Pollution

Simple definition:

Prototype pollution happens when an attacker modifies `Object.prototype` through unsafe merge/parse operations, affecting all objects.

Vulnerable pattern:

```js
function merge(target, source) {
  for (const key in source) {
    target[key] = source[key]; // dangerous if key is __proto__ or constructor
  }
  return target;
}
```

Safer merge:

```js
function safeMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    target[key] = source[key];
  }
  return target;
}
```

Protection steps:

1. Validate and sanitize user input
2. Use `Object.create(null)` for maps when needed
3. Avoid unsafe deep merge utilities
4. Use libraries with pollution protection
5. Freeze prototypes in critical apps: `Object.freeze(Object.prototype)`

Express body validation:

```js
const { body, validationResult } = require('express-validator');

app.post('/profile', body('name').isString().trim(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  // ...
});
```

Interview answer:

```text
Prevent prototype pollution by validating input keys, avoiding unsafe recursive merge, using Object.keys instead of for...in on untrusted data, and keeping dependencies updated.
```

### 167. Defend against ReDoS (Regular Expression Denial of Service)

Simple definition:

ReDoS happens when a regex takes exponential time on certain inputs, blocking the event loop.

Vulnerable regex:

```js
const emailRegex = /^([a-zA-Z0-9_\-.+])+@([a-zA-Z0-9_\-.])+\.([a-zA-Z]{2,5})+$/;
// nested quantifiers can cause catastrophic backtracking
```

Safer approaches:

```js
// 1. Use well-tested libraries
const validator = require('validator');
validator.isEmail(input);

// 2. Limit input length
if (input.length > 320) return res.status(400).json({ message: 'Input too long' });

// 3. Set timeout for regex (Node 16+)
const { exec } = require('node:child_process');
// or use 're2' / 'safe-regex' libraries for user-supplied patterns
```

Never use user-supplied regex directly:

```js
// BAD
new RegExp(req.body.pattern).test(req.body.text);
```

Interview answer:

```text
Avoid complex nested quantifiers, cap input length, use validator libraries instead of custom regex for emails/URLs, and never execute user-provided regex patterns on the main thread.
```

### 168. Configure secure CSP and CORS in Express/Fastify

Simple definition:

- **CORS** — controls which frontends can call your API.
- **CSP** — controls which resources the browser can load (mainly for pages you serve).

Express CORS:

```js
const cors = require('cors');

app.use(cors({
  origin: ['https://myapp.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

Express CSP with Helmet:

```js
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.myapp.com'],
      frameAncestors: ["'none'"],
    },
  },
}));
```

Fastify example:

```js
const fastify = require('fastify')();

await fastify.register(require('@fastify/cors'), {
  origin: 'https://myapp.com',
  credentials: true,
});

await fastify.register(require('@fastify/helmet'), {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  },
});
```

Security tips:

- Never use `origin: '*'` with `credentials: true`
- Restrict methods and headers
- Avoid `'unsafe-inline'` and `'unsafe-eval'` in CSP when possible

Interview answer:

```text
Use CORS to allow only trusted frontend origins. Use Helmet CSP to restrict script/style/load sources. Tighten both in production instead of allowing all origins or inline scripts.
```

### 169. Security risks of eval() and the vm module

Simple definition:

Both execute dynamic code. If input comes from users, attackers can run arbitrary JavaScript on your server.

eval risk:

```js
// NEVER do this with user input
const result = eval(req.body.expression); // remote code execution
```

vm is not a security sandbox:

```js
const vm = require('vm');

const code = `process.mainModule.require('child_process').execSync('rm -rf /')`;
vm.runInNewContext(code); // still dangerous in many setups
```

Safer alternatives:

```js
// 1. Parse expressions with a safe math parser
const { evaluate } = require('mathjs');
evaluate('2 + 2');

// 2. Use a dedicated sandbox service with strict isolation
// 3. Avoid dynamic code execution entirely
```

Interview answer:

```text
eval and vm are not safe for untrusted input. They can lead to remote code execution. Avoid dynamic code execution; if needed, use specialized parsers or isolated worker environments with no access to process or filesystem.
```

### 170. Robust rate limiting across multiple Node.js instances

Simple definition:

In-memory rate limiting fails with multiple servers because each instance has its own counter. Use a shared store like Redis.

In-memory (single server only):

```js
const counts = new Map(); // does not work across instances
```

Redis-based (multi-instance):

```js
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  keyGenerator: (req) => req.ip,
});

app.use('/api/', limiter);
```

Advanced patterns:

- Different limits per route (`/login` stricter than `/products`)
- Sliding window or token bucket in Redis
- Combine with WAF/CDN rate limiting (Cloudflare, AWS WAF)
- Return `429 Too Many Requests` with `Retry-After` header

Interview answer:

```text
Use Redis-backed rate limiting so all API instances share the same counters. Apply stricter limits on auth endpoints and layer edge rate limiting at CDN/load balancer for defense in depth.
```

## Final Node.js Interview Checklist

Must know:

- Node.js runtime
- V8
- event loop phases (timers, poll, check, close)
- libuv and thread pool tuning
- process.nextTick vs queueMicrotask vs setImmediate
- blocking vs non-blocking I/O
- CommonJS vs ES Modules
- built-in globals vs pseudo-globals (`__dirname`, `require`)
- why avoid custom globals
- streams and backpressure
- Buffer.alloc vs Buffer.allocUnsafe
- cluster vs worker threads
- horizontal scaling and shared state (Redis)
- circuit breaker pattern
- CPU profiling (clinic.js, --inspect)
- EventEmitter listener cleanup
- WebSocket HA architecture
- HTTP Keep-Alive optimization
- database connection pooling
- Mongoose middleware order
- Redis distributed locks
- cache stampede mitigation
- Kafka/RabbitMQ event-driven design
- saga and outbox pattern
- operational vs programmer errors
- uncaughtException handling
- secrets management and rotation
- prototype pollution and ReDoS
- CSP and CORS hardening
- eval/vm security risks
- distributed rate limiting
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


**********************************************************************
******************DEEP UNDERSTANDING OG NODEJS************************
**********************************************************************

### 0. Why nodejs compare to other server side technologies?
Node.js stands out because it allows developers to build high-performance backend systems using JavaScript, eliminating the need to learn different languages for the frontend and backend. 

Unlike traditional server-side technologies that spawn a new thread for every incoming connection, Node.js uses a single-threaded, event-driven architecture that handles thousands of concurrent requests with minimal memory overhead.

Key Technical Advantages
- JavaScript Everywhere: Developers can write both frontend and backend code in the same language, maximizing code reuse and drastically reducing context switching.
- Non-Blocking I/O Architecture: It handles requests asynchronously, meaning the server never idles while waiting for database or file system responses.
Massive Ecosystem: The npm registry provides millions of reusable packages, which dramatically accelerates production timelines.
- Real-Time Efficiency: The underlying Google V8 engine compiles JavaScript directly into machine code, making Node.js the industry favorite for live-updating applications like chat systems and streaming platforms.

When to Choose (and Avoid) Node.js
- Node.js is optimal for I/O-bound applications. If an application constantly reads and writes to databases, streams video, or updates a UI instantly (like Uber or Trello), Node.js will outperform traditional multithreaded servers.

However, avoid Node.js for CPU-bound tasks. Because it runs on a single main thread, long-running calculations like video encoding, image manipulation, or complex data analytics will block the entire server and freeze all other incoming requests.

If you are preparing for a specific technical discussion, let me know:
- What specific stack you are comparing Node.js against (e.g., Python/Django, Go, Java Spring)?
- What type of project architecture you are building (e.g., microservices, a monolith)?

### 1. What is i/o task in nodejs, and why it matters?
I/O stands for Input/Output, and it refers to any time your code talks to the outside world. It is not just about reading and writing files; it includes any operation where data enters or leaves your computer's memory.

Understanding I/O is the single most important concept in Node.js because Node.js was specifically designed to handle I/O tasks differently than traditional programming languages.

What counts as an I/O operation?
Think of I/O as any task that takes place outside your main CPU (the computer's brain). Here are the primary examples:
- File I/O: Reading a .json file, writing a log file, or uploading an image.
- Network I/O: Making an API call to Google Maps, fetching data from a third-party payment gateway, or a user requesting a webpage from your server.
- Database I/O: Asking MongoDB, MySQL, or PostgreSQL to find a user profile or save a new password.
- Hardware I/O: Listening for a keystroke, clicking a mouse, or printing a document.

The Problem: Why I/O is "Heavy"Compared to the CPU, I/O operations are incredibly slow.
- Changing a variable in code takes less than a nanosecond.
- Reading a file from a hard drive or waiting for a database to reply can take 10 to 100 milliseconds.

In the tech world, that time difference is massive. If your CPU is a supersonic jet, waiting for a database to respond feels like waiting for a snail to cross a highway.

How Node.js Handles I/O (The Restaurant Analogy)
To understand why this matters, imagine a busy restaurant with customers ordering food. The "kitchen cooking the food" is the slow I/O operation.

1. Traditional Languages (The "One Waiter per Table" Approach)
Languages like PHP or Java (traditionally) assign one waiter to a single table. The waiter takes the order, goes to the kitchen, and stands there doing nothing until the food is ready.
- If 100 customers walk in, the restaurant needs 100 waiters.
- If they run out of waiters, the 101st customer has to wait outside. This consumes a massive amount of computer memory (RAM).

2. Node.js (The "Smart Waiter" Approach)Node.js uses a single waiter (a single thread) for the entire restaurant.
- The Node.js waiter takes your order, gives it to the kitchen, and immediately moves to the next table to take their order.
- The waiter never stands around waiting for the kitchen.
- When the kitchen finishes cooking a meal, they ding a bell (an Event).
- The waiter hears the bell, picks up the food, and delivers it to your table.

Why is this so important to know?
Because Node.js only has one waiter, you must never give the waiter a task that blocks them from moving to the next table.
- Good (Asynchronous I/O): You tell Node.js to read a massive file. Node.js hands the task to the operating system and keeps answering other user requests. When the file is ready, Node.js triggers a callback function to handle the data. Your app stays lightning-fast.
- Bad (Blocking Code): If you write a massive math calculation that loops a billion times directly in your main code, you are forcing the waiter to sit at a table and do math. The entire server freezes, and no other users can load your website until the math is done.

In short, Node.js is famous because it excels at handling thousands of simultaneous I/O tasks (like database queries and web requests) on a single thread without slowing down.

### 3. The difference between a blocking (sync) file read and a non-blocking (async) file read in Node.js?
This demonstrates exactly how the "Smart Waiter" behavior works using the built-in File System (fs) module in Node.js.

1. The Bad Way: Blocking (Synchronous) I/O
In this approach, the code executes sequentially line-by-line. The entire application pauses and freezes while the file is being read.

```js
const fs = require('fs');
console.log("1. Waiter takes Customer A's order.");
// Node.js freezes here until the heavy file is completely read
const data = fs.readFileSync('large_file.txt', 'utf8'); 
console.log("2. Kitchen finished cooking Customer A's food.");
console.log("3. Waiter moves to Customer B.");
```

The Output:

1. Waiter takes Customer A's order.
2. Kitchen finished cooking Customer A's food.
3. Waiter moves to Customer B.


2. The Node.js Way: Non-Blocking (Asynchronous) I/O
In this approach, Node.js hands the heavy lifting to the computer's operating system and immediately moves to the next line of code.

```js
const fs = require('fs');
console.log("1. Waiter takes Customer A's order.");
// Node.js hands the file task to the OS and immediately moves on
fs.readFile('large_file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log("3. Kitchen dings the bell! Customer A's food is ready.");
});
console.log("2. Waiter immediately moves to Customer B.");
```

The Output:
1. Waiter takes Customer A's order.
2. Waiter immediately moves to Customer B.
3. Kitchen dings the bell! Customer A's food is ready.


The Magic: Notice how line 2 prints before line 3. The single-threaded "waiter" never stopped moving. Customer B was served instantly, and Customer A's food was delivered the exact millisecond it was ready.

Summary Checklist
- fs.readFileSync = Blocking. Blocks the thread. Avoid using this in production servers.
- fs.readFile (with callback or promises) = Non-blocking. Hands off the task, frees the thread. This is how Node.js achieves high performance.

### 4. Why callback considered as non blocking, how it has been implemented that it will not execute in main thread instead it will go to callback queues?
To understand exactly why callbacks do not block the main thread, we need to lift the hood of Node.js.
A callback function itself is just a regular piece of JavaScript code. What makes it non-blocking is not the function itself, but who manages the execution of that function.

Here is the exact mechanism of how Node.js achieves this behind the scenes.
The Secret Architecture: Node.js is a Team
When people say Node.js is "single-threaded," they are only telling half the story.
- The Main Thread (V8 Engine): This is the single thread that runs your JavaScript code. It is the "Smart Waiter.
- "Libuv (The C++ Background Worker Pool): This is a powerful multi-threaded library built into Node.js written in C++. These are the "Kitchen Staff.

"When you use an asynchronous function like fs.readFile(), you are interacting with both sides of this team.

Step-by-Step: The Journey of an Asynchronous Operation
Let's look at what happens step-by-step when you execute this line:

```js
fs.readFile('file.txt', 'utf8', myCallbackFunction);
```

1. Offloading to the Kitchen (Libuv)
- When the Main Thread hits fs.readFile, it does not read the file. Instead, it instantly packages two things and hands them over to Libuv (the C++ background layer):The request (e.g., "Read file.txt").
- The callback function (myCallbackFunction).

2. The Main Thread is Freed InstantlyAs soon as Libuv takes the package, the Main Thread says "Great, not my problem right now," and immediately moves down to execute the next line of your JavaScript file. This is why it is non-blocking.

3. Background Work Happening in ParallelWhile the Main Thread is busy handling other user requests or printing logs, Libuv assigns the heavy file-reading task to one of its C++ background threads (the Worker Pool). This worker interacts directly with the computer's Operating System to fetch the data.

4. Moving to the Callback QueueWhen the C++ background worker finishes reading the file, it takes your myCallbackFunction, pairs it with the freshly retrieved data, and pushes it into the Callback Queue.
- The Callback Queue is essentially a waiting room for functions that are fully ready to execute.

How the Callback Queue gets Executed: The Event LoopNow your callback function is sitting in the Callback Queue, but it cannot just interrupt the Main Thread whenever it wants. JavaScript is strictly single-threaded and cannot do two things at once.

This is where the Event Loop comes in. The Event Loop acts as a traffic cop with one simple, continuous job:
- It looks at the Main Thread (Call Stack) and asks: "Is the Main Thread currently busy executing JavaScript code?"
- If the Main Thread is busy, the Event Loop waits.
- The exact millisecond the Main Thread finishes all its current code and becomes empty, the Event Loop looks at the Callback Queue.- It grabs the first callback waiting in line and pushes it onto the Main Thread to be executed.

To answer your specific questions directly:
- Why are callbacks considered non-blocking? Because the function initiating the task returns immediately, allowing the main thread to continue. The callback is simply a placeholder for work to be done later.
- How is it implemented so it doesn't run on the main thread initially? Node.js offloads the actual heavy lifting (the waiting part) to Libuv's C++ worker threads. Your JavaScript main thread is completely oblivious to the heavy work until the final callback is sitting in the queue ready to be processed.

### 5. What are CPU cores and how do they works?
What is a CPU Core in Simple Terms?
- Think of your CPU (Central Processing Unit) as the main brain of your computer.
- A CPU Core is like an individual worker inside that brain.
- Old computers only had one core (one worker). If you wanted to browse the internet, listen to music, and write a document at the same time, that single worker had to switch between those tasks incredibly fast to make it look like they were happening together.
- Today, computers have Multi-Core CPUs (e.g., Dual-Core has 2 workers, Quad-Core has 4 workers, Octa-Core has 8 workers). This means your computer can literally do 4 or 8 things at the exact same millisecond because it has multiple separate workers.

How Cores Work in Node.js
- By default, Node.js only uses exactly ONE CPU Core for your JavaScript code.
- Going back to our restaurant analogy: even if your computer has an 8-core CPU (8 workers available), Node.js will only hire one waiter (the Main Thread) to handle your JavaScript code.

Here is exactly how Node.js interacts with your computer's cores:
1. The Main Core (Core 1)Your primary JavaScript code, your API routes, your Event Loop, and your Callback Queue all run on Core 1. If 10,000 people visit your website, that single core handles all of their requests using the non-blocking pattern we discussed earlier.

2. The Background Cores (Cores 2, 3, 4...)Remember Libuv (the C++ kitchen staff that handles heavy file reading or database waiting)? Libuv is smart. It does use your other CPU cores!
- While Core 1 is busy running your JavaScript website code, Libuv will automatically send a heavy file-reading task to Core 2, and a crypto-hashing task to Core 3.

The Waste Problem (and The Fix)
- Because Node.js runs its main JavaScript engine on just one core, a major problem arises with heavy web servers. If you host a Node.js app on an expensive server with 16 CPU cores, 15 of those cores will sit mostly idle while Core 1 does 90% of the heavy lifting.
- To fix this and use 100% of your computer's power, Node.js provides two built-in solutions:

Solution A: The Cluster Module (Multiple Restaurants)
- Instead of running one instance of your app, the cluster module lets you spawn a copy of your application for every core you have. If you have a 4-core CPU, Node.js launches 4 identical copies of your server. A built-in load balancer automatically splits incoming traffic among them.

Solution B: Worker Threads (Adding More Waiters)
- If you have a single app that needs to do heavy CPU math (like video processing or AI calculations), you can use worker_threads to manually create a second JavaScript thread and point it to a different CPU core.

Summary Checklist
- CPU Core: An independent physical worker inside your computer's processor.
- Node.js JavaScript: Runs on one core at a time by default.
- Node.js C++ Internal Tasks: Can use multiple cores automatically behind the scenes.
- Maximizing Power: Developers use Clusters or Worker Threads to manually force Node.js to use all available CPU cores.

### 6. How cluster use CPU core for maximising power?
The cluster module maximizes power by running multiple independent copies (processes) of your Node.js application simultaneously, with each copy automatically assigned to its own CPU core.

If you have a server with 4 CPU cores, the cluster module launches 4 identical instances of your web server. Instead of 1 core doing all the work while 3 sit idle, all 4 cores handle incoming traffic together.

Here is exactly how it works under the hood and how to implement it.

How Clustering Works (The Airport Check-in Analogy)
Imagine a busy airport with 4 check-in counters (Cores), but only one counter is open (Default Node.js). A massive line of passengers forms. The other 3 counters are closed and the workers are sleeping.

When you use the Cluster Module, you introduce a Primary (Master) Process who acts as a line manager:
- The Primary process opens all 4 counters and places a Worker Process at each one.
- The Primary process takes the main network port (e.g., Port 3000) and stands at the front of the line.
- When a passenger (an HTTP request) arrives, the Primary process instantly hands that passenger to the least busy counter using a technique called Round-Robin load balancing.

Step-by-Step Code Example
- Node.js has a built-in cluster module and an os module to make this incredibly easy. Here is a complete, production-ready example:

```js
const cluster = require('cluster');
const http = require('http');
const os = require('os');

// 1. Count how many CPU cores your computer actually has
const numCPUs = os.cpus().length; 

if (cluster.isPrimary) {
    console.log(`Primary system started. Core count: ${numCPUs}`);
    console.log(`Spawning ${numCPUs} worker processes...`);

    // 2. Loop through the cores and spawn a worker process for each one
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // This clones your application onto a new CPU core
    }

    // Optional: If a worker dies (crashes), automatically start a new one
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} died. Reviving...`);
        cluster.fork();
    });

} else {
    // 3. This is the code that the Workers run on their individual cores.
    // Every single worker shares the EXACT SAME port (Port 3000)!
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Handled by worker process ID: ${process.pid}\n`);
    }).listen(3000);

    console.log(`Worker process ${process.pid} is listening on Port 3000`);
}
```

Why this Maximizes Power
- True Parallelism: If 4 users hit your website at the exact same millisecond, all 4 requests are processed at the exact same time on 4 different physical chips inside your computer.
- No Code Sharing (Isolated Memory): Each worker process is completely independent. They have their own memory space and their own Event Loop. If Worker 1 encounters a terrible bug and crashes, Workers 2, 3, and 4 keep running completely unaffected. Your website never goes down.
- Zero Port Conflicts: Normally, you cannot run two programs on Port 3000 at the same time. The cluster module handles the networking magic behind the scenes so all workers can secretly share Port 3000 without throwing an "Address Already In Use" error.

The Modern Alternative: PM2
- In real-world production environments, developers rarely write the cluster code manually. Instead, they use a popular, free production process manager called PM2.
- With PM2 installed, you write your standard single-threaded Node.js code normally, and you launch it via your terminal like this:

pm2 start app.js -i max

The -i max flag tells PM2 to automatically look at your machine's CPU cores, duplicate your application to match that number, and manage the clustering and load-balancing for you instantly.

### 7. How Worker thread use CPU core for maximising power? 
While the Cluster module maximizes power by duplicating your entire application across multiple cores, Worker Threads maximize power by letting a single application split up heavy, complex math problems and run them on different cores at the same time.

Think of a Cluster as opening multiple identical branches of a restaurant, while a Worker Thread is like adding more chefs inside the same kitchen.

How Worker Threads Maximize Power
- By default, your Node.js application executes JavaScript on a single thread (Core 1). If you ask Core 1 to calculate the 50th Fibonacci number or process a heavy image, Core 1 completely freezes. It cannot respond to new web requests.
- With Worker Threads, you can spawn a new thread (e.g., Core 2) and hand that heavy math problem directly to it.
- Core 1 stays completely free to handle user requests, listen to APIs, and keep the website responsive.
- Core 2 runs at 100% capacity calculating the heavy math problem.
- When Core 2 finishes, it sends a message back to Core 1 with the result.

Step-by-Step Worker Thread Code Example
Node.js provides a built-in module called worker_threads. Here is a simple example showing how the main thread sends heavy work to a worker thread:


```js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    // 1. THIS IS THE MAIN THREAD (Core 1)
    console.log("Main Thread: Starting a heavy calculation on Core 2...");

    // Spawn a worker thread using this exact same file
    const worker = new Worker(__filename, {
        workerData: { number: 40 } // Pass data to the worker
    });

    // Listen for the result from the worker thread
    worker.on('message', (result) => {
        console.log(`Main Thread: Received result from Core 2: ${result}`);
    });

    console.log("Main Thread: I am completely free to handle web traffic right now!");

} else {
    // 2. THIS IS THE WORKER THREAD (Core 2)
    // It gets its own isolated thread to do heavy CPU tasks without blocking anyone
    const num = workerData.number;
    
    // Simulate a heavy, blocking CPU calculation
    let result = 0;
    for (let i = 0; i < num * 100000000; i++) {
        result += i;
    }

    // Send the final answer back to the main thread
    parentPort.postMessage(result);
}
```

The Output:
Main Thread: Starting a heavy calculation on Core 2...
Main Thread: I am completely free to handle web traffic right now!
Main Thread: Received result from Core 2: 7999999980000000

Notice how the main thread printed its "completely free" message before the heavy math loop finished. The main thread never froze.

When to use which?
- Use Cluster if you are building a standard web app or REST API. You want to duplicate the app so that if 1,000 users visit, the network traffic is evenly distributed across all your CPU cores.
- Use Worker Threads if your web app has a specific feature that requires massive computing power—like resizing user profile pictures, generating PDFs, data analytics, or heavy encryption.

### 9. Difference between Cluster and Worker Thread?

The direct comparison between the Cluster Module and Worker Threads organized as a clean, scannable list:
Cluster Module (Multiple Processes)
- Analogy: Opening 4 separate restaurant branches.What it creates: Multiple independent Processes.
- Memory (RAM): Isolated. Each process has its own locked memory space.
- Communication: Slow. It must serialize data into strings to talk between processes.
- Network Port: Shared. All copies share the exact same port (e.g., Port 3000).
- Best Used For: I/O Bound Tasks (Web servers, APIs, routing incoming traffic).

Worker Threads Module (Single Process)
- Analogy: Adding 4 chefs inside the same kitchen.
- What it creates: Multiple Threads inside one single Process.
- Memory (RAM): Shared. Threads can share the exact same memory space.
- Communication: Fast. It can pass memory objects directly between threads.
- Network Port: Not Shared. They cannot share a port. Only the main thread handles networking.
- Best Used For: CPU Bound Tasks (Image processing, video encoding, AI/Math).

### 10. Streams and Buffers (Handling Massive Data)
What is a Buffer?A Buffer is a temporary holding chunk of physical memory (RAM) that Node.js allocates outside the V8 JavaScript engine. It holds raw binary data (0s and 1s). Think of a Buffer as a small bucket that collects water from a faucet before you pour it into a glass.

What is a Stream?
A Stream is the continuous movement of data from one place to another, processed chunk-by-chunk over time, rather than all at once.
- The Problem: If you have a 4GB video file and you use fs.readFile(), Node.js will attempt to load all 4GB into your computer's RAM simultaneously. If your server only has 2GB of RAM, your application will instantly crash with an "Out of Memory" error.
- The Solution (Streams): Node.js breaks that 4GB file down into tiny chunks (usually 64KB each) called Buffers. It reads chunk 1, processes it, throws it away, and moves to chunk 2.


Code Deep Dive:
```js
const fs = require('fs');

// Create a readable stream from a massive file
const readableStream = fs.createReadStream('massive_video.mp4');
// Create a writable stream to a new destination
const writableStream = fs.createWriteStream('destination_video.mp4');

// Stream chunks from source to destination automatically
readableStream.pipe(writableStream);

writableStream.on('finish', () => {
    console.log("Entire file copied using less than 64KB of RAM total!");
});
```

### 11. The 6 Phases of the Event Loop
Earlier, we looked at the Event Loop as a single queue. In reality, the Libuv Event Loop executes callbacks by cycling through 6 distinct phases in a strict loop. Each phase has its own dedicated FIFO (First In, First Out) queue of callbacks.

   ┌───────────────────────────────────────────────┐
   │ 1. Timers (setTimeout, setInterval)           │
   └───────────────────────┬───────────────────────┘
                           ▼
   ┌───────────────────────────────────────────────┐
   │ 2. Pending Callbacks (System errors, TCP)     │
   └───────────────────────┬───────────────────────┘
                           ▼
   ┌───────────────────────────────────────────────┐
   │ 3. Idle, Prepare (Internal Node tasks)        │
   └───────────────────────┬───────────────────────┘
                           ▼
   ┌───────────────────────────────────────────────┐
   │ 4. Poll (Incoming I/O data, HTTP requests)    │
   └───────────────────────┬───────────────────────┘
                           ▼
   ┌───────────────────────────────────────────────┐
   │ 5. Check (setImmediate)                       │
   └───────────────────────┬───────────────────────┘
                           ▼
   ┌───────────────────────────────────────────────┐
   │ 6. Close Callbacks (socket.on('close'))       │
   └───────────────────────▲───────────────────────┘
                           │
                           └───────────────────────┘ (Loops back to Phase 1)

The Execution Flow:
- Timers Phase: Executes callbacks scheduled by setTimeout() and setInterval().
- Pending Callbacks Phase: Executes system-level callbacks (e.g., if a TCP socket connection throws an error).
- Idle, Prepare Phase: Used internally by Node.js for engine optimization. You cannot write code that executes here.
- Poll Phase: This is where Node.js spends 90% of its time. It waits for incoming I/O data (database responses, file reads, incoming network requests) and executes their callbacks.
- Check Phase: Executes callbacks scheduled by setImmediate(). If you want a callback to execute immediately after the Poll phase completes, put it here.
- Close Callbacks Phase: Executes clean-up callbacks like socket.on('close').

Topic 3: Microtask Queues (process.nextTick and Promises)The 6 phases above handle Macrotasks. However, Node.js has a parallel, high-priority system called the Microtask Queue that bypasses the 6 phases completely.The Microtask Queue consists of two lines, ranked by priority:process.nextTick() queue (Highest VIP priority in all of Node.js).Promise callback queue (e.g., .then(), .catch(), or async/await returns).

The VIP Rule:
- Whenever the Event Loop is moving between any of the 6 phases, or even between individual callbacks within a phase, it will completely pause what it is doing, look at the Microtask Queue, and empty it out fully before continuing to the next phase.

Code Deep Dive: 
- Predicting the output of this code separates junior developers from masters:

```js
setTimeout(() => console.log("1. Timeout (Phase 1 Macrotask)"), 0);
setImmediate(() => console.log("2. Immediate (Phase 5 Macrotask)"));

Promise.resolve().then(() => console.log("3. Promise (Microtask)"));
process.nextTick(() => console.log("4. NextTick (VIP Microtask)"));

console.log("5. Synchronous Main Thread");
```

The Output:
5. Synchronous Main Thread   // Runs instantly on the main stack
4. NextTick (VIP Microtask)   // VIP queue empties before loop even starts phase 1
3. Promise (Microtask)        // Remaining microtask queue empties
1. Timeout (Phase 1 Macrotask)// Loop starts, hits Phase 1 (Timers)
2. Immediate (Phase 5 Macrotask)// Loop continues through phases to Phase 5 (Check)


### 12. Event-Driven Architecture in Practice (Streams + EventEmitters)
Now we can connect everything together. Your first question was about Event-Driven Architecture (EDA). Node's core modules are fundamentally built by combining Streams and EventEmitters.

Every Stream in Node.js inherits from the EventEmitter class. This means Streams do not just move data—they broadcast events as the data flows through them.

Core Stream Events:
- data: Emitted when a new, small buffer chunk is available to read.
- end: Emitted when there is no more data left to read from the file.
- error: Emitted if something goes wrong (e.g., file permissions error).

Deep Dive Architectural Integration Code:

```js
const fs = require('fs');

const reader = fs.createReadStream('source.txt', { encoding: 'utf8' });

// Behind the scenes, the Stream uses .emit('data', chunk) inside Libuv
reader.on('data', (chunk) => {
    console.log("--- Received a 64KB Buffer Chunk ---");
    console.log(chunk); // Processes just this small chunk
});

reader.on('end', () => {
    console.log("--- Finished reading the entire stream! ---");
});

reader.on('error', (err) => {
    console.error("An error occurred:", err.message);
});
```

Why this architecture works beautifully:
Libuv reads a chunk from the disk on a background thread. It pushes the data to the Callback Queue. The Event Loop hits the Poll phase, grabs the callback, and uses an EventEmitter to alert your JavaScript code (reader.on('data')) that the data is ready. It is a completely connected, closed-loop machine.

Now that you have a deep conceptual foundation of Node.js internals, we can move toward building real systems. If you want to continue, let me know if you would like to explore:

- Writing a script that safely manipulates raw binary data using Buffers.
- Designing a custom module that extends EventEmitter to handle custom application business logic.
- Visualizing a complex code execution scenario to see how async/await interacts with the microtask queue.

### 13. Deep diving into how to spot and fix a memory leak in Node.js.
A memory leak occurs when your code creates data in the computer's memory (RAM) but accidentally keeps a reference to it long after it is no longer needed. Because Node.js thinks you might still use it, the Garbage Collector is not allowed to clean it up.

Over time, your RAM usage climbs higher and higher until your server runs out of memory and crashes.
Here is a deep dive into how memory leaks happen, how to spot them, and how to fix them.

Part 1: Three Common Ways We Accidentally Leak Memory
1. Global Variables or Long-Lived Closures
If you assign data to a global variable (or attach it to global), that memory lives forever until the server shuts down.

// ❌ THE LEAK: A global array that grows forever
const requestLogs = []; 

app.get('/user', (req, res) => {
    requestLogs.push(req.headers); // Memory grows with every single API call!
    res.send("User data");
});

The Fix: Never use global arrays to store request-scoped data. Use a proper external database (like Redis) or short-lived local variables that disappear when the function ends.

2. Forgotten setInterval or setTimeout
If you start a timer that references a massive object inside its callback, that object cannot be garbage collected as long as the timer is running.

app.get('/start-task', (req, res) => {
    const massiveData = new Array(1000000).fill("data");

    // ❌ THE LEAK: This interval runs forever and locks 'massiveData' in memory
    setInterval(() => {
        console.log("Task is still alive...");
    }, 1000); 

    res.send("Started");
});


The Fix: Always store the timer ID and clear it using clearInterval(timerId) when the work is complete.

3. Unclosed Event Listeners
If you attach a listener to a long-lived object (like process or a global emitter), but never remove it, that function pointer stays stuck in RAM forever.

const myGlobalEmitter = require('./globalEmitter');

app.get('/subscribe', (req, res) => {
    const userData = { name: "John", largePayload: {} };

    // ❌ THE LEAK: Every request attaches a NEW listener that never detaches
    myGlobalEmitter.on('update', () => {
        console.log(`Updating ${userData.name}`);
    });

    res.send("Subscribed");
});

The Fix: Use emitter.once() if you only need it to run one time, or manually call emitter.off() to clean it up when the user disconnects.

Part 2: How to Spot a Memory Leak

You cannot easily spot a memory leak by just staring at code. You need to observe the application's behavior under heavy traffic.

1. The Symptom (The Sawtooth Graph)
If you monitor your server's RAM usage over 24 hours:
- Healthy App: The RAM graph goes up, then abruptly drops back down to a baseline (this is the Garbage Collector working).
- Leaky App: The graph looks like a sawtooth blade—it goes up, drops slightly, but the baseline keeps creeping higher and higher until the app crashes.

2. Spotting it in Development (The Node Inspector)
You can look inside Node's memory using Google Chrome's developer tools.
- Start your Node app with the inspect flag:

node --inspect server.js

- Open Google Chrome and visit chrome://inspect.
- Click "Open dedicated DevTools for Node".
- Go to the Memory tab.
- Select Heap snapshot and click Take snapshot. This captures exactly what is in your RAM right now.
- Use a tool like autocannon to simulate 10,000 users hitting your server:

npx autocannon -c 100 -d 10 http://localhost:3000/user

- Take a Second Heap Snapshot and click Comparison. Chrome will show you exactly which objects grew in size and didn't get deleted.

Part 3: How to Fix a Leak (Production Safety Nets)
If you are running in production and want to automate memory protection, you can use built-in V8 flags to force Node.js to log leaks or crash safely before exhausting the host machine's RAM.
- Limit Max Memory: By default, Node.js might try to claim more RAM than your tiny AWS or Heroku server actually has. Prevent this by setting a strict limit

node --max-old-space-size=1500 server.js  

- Automatic Heap Dumps: You can tell Node.js to automatically take a snapshot file and write it to your disk right before it crashes from an out-of-memory error:

node --heapsnapshot-near-heap-limit=3 server.js

You can then load this snapshot file directly into Chrome DevTools later to see exactly who leaked the memory.

### 14. What is load balancing and how it works with an example?
Load balancing is the process of distributing incoming network traffic evenly across a group of backend servers.

Think of a load balancer as a traffic cop standing in front of your infrastructure. Instead of allowing millions of users to hit a single server and crash it, the load balancer intercepts every request and routes it to the least busy server in your fleet.

Real-World Analogy: The Bank Teller Line
Imagine a popular bank branch. If there is only one teller counter open (one server), a massive line forms. Customers get frustrated, and the teller gets completely overwhelmed and burns out (Server Crash).

Now, the bank manager upgrades the system:
- They open 4 separate teller counters (a cluster of 4 Node.js servers).
- They hire a security guard to stand at the entrance (The Load Balancer).
- When a customer walks into the bank, they do not choose a counter. The security guard looks at the open counters and says, "You go to Counter 1. Next customer, go to Counter 2."

Because of the security guard, no single teller is ever overwhelmed, and customers are served 4 times faster.

How it Works (Step-by-Step Example)

Let's look at how a load balancer handles traffic for a real website, like ://mycoolapp.com.
               [ USER TRAFFIC ]
         (Millions of HTTP Requests)
                     │
                     ▼
         ┌───────────────────────┐
         │     LOAD BALANCER     │  <-- Intercepts everything at Port 80/443
         └───────────┬───────────┘
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
┌───────────┐  ┌───────────┐  ┌───────────┐
│ Server A  │  │ Server B  │  │ Server C  │  <-- Identical Node.js instances
└───────────┘  └───────────┘  └───────────┘

Step 1: The Request Arrives
- A user types your website URL into their browser. The Domain Name System (DNS) points your domain directly to the IP address of the Load Balancer, not the actual backend servers.

Step 2: The Load Balancer Applies an Algorithm
The load balancer receives the request and decides which backend server should handle it using a specific strategy. The most common algorithms are:

- Round Robin: Passes requests sequentially down the line (Server A, then Server B, then Server C, then back to A).
- Least Connections: Checks the active workload and sends the user to whichever server currently has the fewest open connections.
- IP Hash: Uses the user's IP address to ensure that a specific user always lands on the exact same backend server (useful for keeping user sessions intact).

Step 3: Routing the Traffic
The load balancer acts as a reverse proxy. It forwards the request to the chosen server (e.g., Server B) via a private internal network.

Step 4: The Health Check (The Safety Net)
A load balancer continuously pings your backend servers every few seconds (called a Health Check). If Server C suddenly runs out of memory and crashes, the load balancer instantly flags it as "unhealthy" and stops sending traffic there. Users never see an error page because their requests are seamlessly routed to Server A and B instead.

Popular Tools Used for Load Balancing
In professional environments, developers rarely write load balancers from scratch. They use highly optimized, battle-tested software or cloud infrastructure:
- NGINX: A lightning-fast, open-source software reverse proxy frequently used to load balance Node.js applications.
- AWS ALB (Application Load Balancer): A cloud service managed by Amazon that automatically scales up to handle millions of requests without manual configuration.

======================================================
**************** REAL TIME SCENARIO ****************** 
======================================================

### 14. What we can do when CPU usage reaches 100%?
When your Node.js application hits 100% CPU usage, it means your single-threaded event loop is completely overwhelmed. It cannot accept new connections, and incoming HTTP requests will start timing out, causing your application to appear "frozen" to users.

Phase 1: Immediate Triage (Stop the Bleeding)
If your live production server is sitting at 100% CPU right now, do these three things immediately:
- Restart the Server with a Process Manager: If you are using a tool like PM2, a simple restart will clear the blocked call stack and drop CPU back to baseline.

pm2 reload all

- Horizontal Scaling: Temporarily spin up 2 or 3 more instances of your server behind your cloud load balancer (e.g., AWS, GCP, or DigitalOcean). This spreads the massive wave of traffic across more machines.

- Locate the Culprit Node: Check if a single route or a specific background task triggered the spike. Look at your server logs to see what was executing right before the 100% jump.


Phase 2: How to Identify the Exact Cause
If the 100% CPU usage keeps happening, you have a code-level bottleneck. You need to profile your app to find out which function is hogging the CPU core.

Use the Built-in Node.js Profiler
You can start your application in production or staging with a built-in profiler flag:

node --prof server.js

- Run a load test against your app.
- Node.js will generate a file that looks like isolate-0xnnnnnnnnnnnn-v8.log.
- Process this log into human-readable text using Node's built-in tool:

node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed_profile.txt

- Open processed_profile.txt. Look at the [Bottom up (heavy) functions] section. It will list the exact file name and line number of the JavaScript function consuming the most CPU cycles.

Phase 3: Long-Term Architectural Fixes
Once you find out what is causing the high CPU load, apply the correct Node.js architecture pattern to fix it permanently.

1. Implement the Cluster Module or PM2 Cluster Mode
If you are running your app on a multi-core server but haven't enabled clustering, only 1 core is working while the others sit idle.
- Run your application using PM2 Cluster Mode to automatically distribute the workload across every single CPU core on your machine.

pm2 start server.js -i max

2. Offload CPU-Bound Code to Worker Threads
If the 100% CPU is caused by heavy, non-I/O calculations within your code (such as image resizing, PDF generation, or heavy cryptography), do not run it on the main thread.

Move that specific blocking function into a separate Worker Thread so it executes on an isolated background core without freezing your main event loop.

3. Offload Tasks to a Background Job Queue
If the heavy task takes longer than a few seconds (e.g., sending 10,000 marketing emails or video transcoding), it does not belong in the Node.js runtime process at all.

- Use a robust queue system like BullMQ (backed by Redis).
- Your main Node.js app simply creates a job ticket and pushes it to Redis. A completely separate background worker script (running on a different server) processes the heavy job asynchronously.

4. Paginate Your Database Queries
A very common hidden cause of 100% CPU is fetching too much data. If an API route does a SELECT * FROM users on a database with 500,000 rows, Node.js has to spend a massive amount of CPU energy deserializing that gigantic JSON object into your memory.
- Always enforce database pagination limits (e.g., LIMIT 50) to keep payloads small and fast.

