# Node.js Problem Solving Interview Programs

This document contains Node.js coding/programming questions commonly asked in interviews.

The focus is on:

- core Node.js programs
- async programming
- files and streams
- events
- Express-style APIs
- middleware
- error handling
- authentication helpers
- rate limiting
- caching
- background jobs
- scaling basics

Most examples use plain JavaScript with Node.js ES modules.

---

## How To Use This Document

For every problem, try to explain:

1. What problem are we solving?
2. Which Node.js module or backend concept is used?
3. Is the code async or sync?
4. How would this work in a real API?
5. What edge cases should be handled?

---

# Basic Node.js Programs

## 1. Create A Basic HTTP Server Without Express

### Question

Create a simple Node.js server using the built-in `http` module.

### Code

```js
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(
    JSON.stringify({
      message: 'Server is running'
    })
  );
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

### Explanation

`http.createServer()` creates a server.

The callback runs for every incoming request.

Express internally builds on top of Node.js HTTP concepts.

---

## 2. Create A Simple Router Using Node.js HTTP Module

### Question

Create routes without Express.

### Code

```js
import http from 'http';

const server = http.createServer((req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.url === '/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ id: 1, name: 'Paras' }]));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
});

server.listen(5000);
```

### Explanation

This shows how routing works at a low level.

Express makes this cleaner by giving us:

```js
app.get('/users', handler);
```

---

## 3. Read A File Asynchronously

### Question

Read a file using Node.js `fs/promises`.

### Code

```js
import fs from 'fs/promises';

async function readTextFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  return content;
}

readTextFile('./sample.txt')
  .then((content) => console.log(content))
  .catch((error) => console.error(error.message));
```

### Explanation

`fs/promises` gives promise-based file methods.

This is preferred over callback style in modern Node.js.

---

## 4. Write JSON Data To A File

### Question

Write JavaScript object data into a JSON file.

### Code

```js
import fs from 'fs/promises';

async function saveJson(filePath, data) {
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonData);
}

const user = {
  id: 1,
  name: 'Paras',
  role: 'admin'
};

saveJson('./user.json', user)
  .then(() => console.log('File saved'))
  .catch((error) => console.error(error.message));
```

### Explanation

`JSON.stringify(data, null, 2)` formats JSON with indentation.

This is useful for logs, config files, and simple local storage.

---

## 5. Check If A File Exists

### Question

Check whether a file exists before reading it.

### Code

```js
import fs from 'fs/promises';

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

console.log(await fileExists('./user.json'));
```

### Explanation

`fs.access()` checks whether the file can be accessed.

If file does not exist, it throws an error.

---

# Async Programming Questions

## 6. Convert Callback Function To Promise

### Question

Convert a callback-style function into a promise-based function.

### Code

```js
function getUserFromDb(id, callback) {
  setTimeout(() => {
    callback(null, {
      id,
      name: 'Paras'
    });
  }, 500);
}

function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    getUserFromDb(id, (error, user) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(user);
    });
  });
}

const user = await getUserPromise(1);
console.log(user);
```

### Explanation

Old Node.js code often uses callbacks.

Modern code usually wraps callback logic in promises or uses built-in promise APIs.

---

## 7. Run Async Tasks Sequentially

### Question

Run async tasks one after another.

### Code

```js
function delayTask(name, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(name);
      resolve(name);
    }, time);
  });
}

async function runSequentially() {
  await delayTask('Task 1', 500);
  await delayTask('Task 2', 500);
  await delayTask('Task 3', 500);

  console.log('All tasks done');
}

runSequentially();
```

### Explanation

Each task waits for the previous one to finish.

Use this when order matters.

---

## 8. Run Async Tasks In Parallel

### Question

Run multiple async tasks at the same time.

### Code

```js
function fetchUser() {
  return Promise.resolve({ id: 1, name: 'Paras' });
}

function fetchOrders() {
  return Promise.resolve([{ id: 101, total: 500 }]);
}

function fetchNotifications() {
  return Promise.resolve([{ id: 201, message: 'Welcome' }]);
}

const [user, orders, notifications] = await Promise.all([
  fetchUser(),
  fetchOrders(),
  fetchNotifications()
]);

console.log(user, orders, notifications);
```

### Explanation

`Promise.all()` runs independent async tasks together.

Use this when tasks do not depend on each other.

---

## 9. Retry A Failed Async Operation

### Question

Create a retry helper for unstable API calls.

### Code

```js
async function retry(task, maxAttempts) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${attempt} failed`);
    }
  }

  throw lastError;
}

let count = 0;

async function unstableApi() {
  count++;

  if (count < 3) {
    throw new Error('Temporary failure');
  }

  return 'Success';
}

console.log(await retry(unstableApi, 3));
```

### Output

```js
'Success'
```

### Explanation

Retry is useful for temporary failures like:

- network issue
- external API timeout
- temporary database failover

Do not retry forever.

---

## 10. Create A Timeout Wrapper For Promise

### Question

Fail an async task if it takes too long.

### Code

```js
function withTimeout(promise, timeoutMs) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out'));
    }, timeoutMs);
  });

  return Promise.race([promise, timeout]);
}

const slowTask = new Promise((resolve) => {
  setTimeout(() => resolve('Done'), 2000);
});

try {
  const result = await withTimeout(slowTask, 1000);
  console.log(result);
} catch (error) {
  console.log(error.message);
}
```

### Output

```js
'Request timed out'
```

### Explanation

`Promise.race()` returns whichever promise finishes first.

This pattern is useful when calling external services.

---

# Event And Stream Questions

## 11. Use EventEmitter

### Question

Create and listen to custom events in Node.js.

### Code

```js
import EventEmitter from 'events';

const eventBus = new EventEmitter();

eventBus.on('userCreated', (user) => {
  console.log(`Send welcome email to ${user.email}`);
});

eventBus.emit('userCreated', {
  id: 1,
  email: 'paras@gmail.com'
});
```

### Explanation

`EventEmitter` helps create event-driven code.

It is useful for internal events like:

- user registered
- order placed
- notification created

---

## 12. Read Large File Using Stream

### Question

Read a large file without loading the whole file into memory.

### Code

```js
import fs from 'fs';

const readStream = fs.createReadStream('./large-file.txt', {
  encoding: 'utf-8'
});

readStream.on('data', (chunk) => {
  console.log('Chunk received:', chunk.length);
});

readStream.on('end', () => {
  console.log('Finished reading file');
});

readStream.on('error', (error) => {
  console.error(error.message);
});
```

### Explanation

Streams process data chunk by chunk.

This is better for large files because it saves memory.

---

## 13. Copy File Using Pipe

### Question

Copy a large file using streams.

### Code

```js
import fs from 'fs';

const readStream = fs.createReadStream('./input.txt');
const writeStream = fs.createWriteStream('./output.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('File copied');
});
```

### Explanation

`.pipe()` sends data from readable stream to writable stream.

It is useful for:

- file upload
- file download
- video streaming
- log processing

---

## 14. Create A Simple Transform Stream

### Question

Convert stream data to uppercase.

### Code

```js
import { Transform } from 'stream';

const upperCaseStream = new Transform({
  transform(chunk, encoding, callback) {
    const upperCaseData = chunk.toString().toUpperCase();
    callback(null, upperCaseData);
  }
});

process.stdin.pipe(upperCaseStream).pipe(process.stdout);
```

### Explanation

Transform stream reads data, changes it, and writes new data.

This is useful for compression, encryption, and data formatting.

---

# Express Style API Coding Questions

## 15. Create A Basic Express API

### Question

Create a basic Express API route.

### Code

```js
import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok'
  });
});

app.listen(5000, () => {
  console.log('API running on port 5000');
});
```

### Explanation

Express makes API routing simple.

`express.json()` parses JSON request bodies.

---

## 16. Create A Logger Middleware

### Question

Create middleware that logs request method and URL.

### Code

```js
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.use(logger);
```

### Explanation

Middleware runs before the route handler.

`next()` passes control to the next middleware or route.

---

## 17. Create An Async Handler Wrapper

### Question

Avoid writing `try/catch` in every async Express route.

### Code

```js
const asyncHandler = (handler) => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

app.get(
  '/api/users',
  asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json({ data: users });
  })
);
```

### Explanation

If async route throws an error, it goes to Express error middleware.

This keeps controllers clean.

---

## 18. Create Central Error Middleware

### Question

Create centralized error handling middleware in Express.

### Code

```js
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Something went wrong'
  });
}

app.use(errorHandler);
```

### Explanation

Express error middleware has four parameters:

```js
(err, req, res, next)
```

It should be registered after all routes.

---

## 19. Create Custom HTTP Error Helper

### Question

Create a helper for throwing HTTP errors.

### Code

```js
function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

throw httpError(404, 'User not found');
```

### Explanation

This gives errors a status code.

The central error middleware can use that status code in the response.

---

## 20. Validate Request Body Manually

### Question

Validate a create user request body.

### Code

```js
function validateCreateUser(req, res, next) {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({
      message: 'Name and email are required'
    });
    return;
  }

  if (!email.includes('@')) {
    res.status(400).json({
      message: 'Email is invalid'
    });
    return;
  }

  next();
}

app.post('/api/users', validateCreateUser, (req, res) => {
  res.status(201).json({
    data: req.body
  });
});
```

### Explanation

Frontend validation is for UX.

Backend validation is mandatory because APIs can be called directly.

---

# Security And Auth Helper Questions

## 21. Hash Password Using Node crypto

### Question

Hash a password using Node.js built-in `crypto` module.

### Code

```js
import crypto from 'crypto';

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

const salt = crypto.randomBytes(16).toString('hex');
const hash = hashPassword('Password123', salt);

console.log({ salt, hash });
```

### Explanation

Password should never be stored as plain text.

In real projects, libraries like `bcrypt` or `argon2` are commonly used.

---

## 22. Generate Random OTP

### Question

Generate a 6-digit OTP.

### Code

```js
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

console.log(generateOtp());
```

### Explanation

This creates a number between `100000` and `999999`.

For stronger security, use `crypto.randomInt`.

### Better Version

```js
import crypto from 'crypto';

function generateSecureOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}

console.log(generateSecureOtp());
```

---

## 23. Create Basic Auth Middleware

### Question

Create middleware that checks whether a request has an authorization token.

### Code

```js
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message: 'Authentication required'
    });
    return;
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({
      message: 'Invalid token'
    });
    return;
  }

  req.token = token;
  next();
}

app.get('/api/profile', requireAuth, (req, res) => {
  res.json({
    message: 'Private profile',
    token: req.token
  });
});
```

### Explanation

This is a simplified auth middleware.

In real apps, the token must also be verified.

---

## 24. Create Role-Based Authorization Middleware

### Question

Allow only selected roles to access an API.

### Code

```js
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        message: 'You are not allowed to perform this action'
      });
      return;
    }

    next();
  };
}

app.delete('/api/users/:id', requireAuth, authorize('admin'), (req, res) => {
  res.status(204).send();
});
```

### Explanation

Authentication checks who the user is.

Authorization checks what the user can do.

---

## 25. Create In-Memory Rate Limiter

### Question

Create a simple rate limiter middleware.

### Code

```js
const requests = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  const userRequests = requests.get(ip) || [];
  const recentRequests = userRequests.filter((time) => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    res.status(429).json({
      message: 'Too many requests'
    });
    return;
  }

  recentRequests.push(now);
  requests.set(ip, recentRequests);

  next();
}

app.use(rateLimiter);
```

### Explanation

This works for learning.

In production with multiple Node instances, use Redis-based rate limiting.

---

# Data And Utility Coding Questions

## 26. Create A Pagination Helper

### Question

Create a helper to calculate `limit` and `skip`.

### Code

```js
function getPagination(query) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip
  };
}

console.log(getPagination({ page: '2', limit: '10' }));
```

### Output

```js
{ page: 2, limit: 10, skip: 10 }
```

### Explanation

This is useful for APIs like:

```text
GET /api/users?page=2&limit=10
```

---

## 27. Create A Simple TTL Cache

### Question

Create a cache where data expires after some time.

### Code

```js
class TtlCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttlMs) {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs
    });
  }

  get(key) {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }
}

const cache = new TtlCache();

cache.set('otp:123', '456789', 30000);
console.log(cache.get('otp:123'));
```

### Explanation

This is a simple in-memory cache.

In production, use Redis for shared TTL cache across multiple servers.

---

## 28. Create A Simple Background Queue

### Question

Create a simple queue that processes jobs one by one.

### Code

```js
class JobQueue {
  constructor() {
    this.jobs = [];
    this.processing = false;
  }

  add(job) {
    this.jobs.push(job);
    this.process();
  }

  async process() {
    if (this.processing) {
      return;
    }

    this.processing = true;

    while (this.jobs.length > 0) {
      const job = this.jobs.shift();
      await job();
    }

    this.processing = false;
  }
}

const queue = new JobQueue();

queue.add(async () => {
  console.log('Send email job');
});

queue.add(async () => {
  console.log('Generate report job');
});
```

### Explanation

This teaches background processing.

In production, use BullMQ, RabbitMQ, Kafka, or cloud queues.

---

## 29. Parse Query Params Using URL

### Question

Parse query params from a URL.

### Code

```js
const url = new URL('http://localhost:5000/api/users?page=2&limit=10');

const page = url.searchParams.get('page');
const limit = url.searchParams.get('limit');

console.log({ page, limit });
```

### Output

```js
{ page: '2', limit: '10' }
```

### Explanation

Node.js provides the `URL` class.

It is useful for parsing URLs safely.

---

## 30. Group Array Data On Backend

### Question

Group users by role.

### Code

```js
function groupByRole(users) {
  return users.reduce((result, user) => {
    if (!result[user.role]) {
      result[user.role] = [];
    }

    result[user.role].push(user);
    return result;
  }, {});
}

const users = [
  { id: 1, name: 'Paras', role: 'admin' },
  { id: 2, name: 'Amit', role: 'member' },
  { id: 3, name: 'Neha', role: 'member' }
];

console.log(groupByRole(users));
```

### Output

```js
{
  admin: [{ id: 1, name: 'Paras', role: 'admin' }],
  member: [
    { id: 2, name: 'Amit', role: 'member' },
    { id: 3, name: 'Neha', role: 'member' }
  ]
}
```

### Explanation

Backend APIs often transform data before sending it to frontend.

This is a common coding round question.

---

# Scaling And Production Coding Questions

## 31. Create A Health Check Endpoint

### Question

Create a health check endpoint for production monitoring.

### Code

```js
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
```

### Explanation

Health endpoints are used by:

- load balancers
- Docker
- Kubernetes
- monitoring tools

---

## 32. Handle Graceful Shutdown

### Question

Stop a Node.js server safely during deployment or restart.

### Code

```js
const server = app.listen(5000, () => {
  console.log('Server running');
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received');

  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
```

### Explanation

Graceful shutdown allows existing requests to finish before the process exits.

In real apps, also close:

- MongoDB connection
- Redis connection
- queue workers

---

## 33. Use Worker Thread For CPU Heavy Task

### Question

Move CPU-heavy work to a worker thread.

### Code

Main file:

```js
import { Worker } from 'worker_threads';

function runWorker(number) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./factorial-worker.js', {
      workerData: number
    });

    worker.on('message', resolve);
    worker.on('error', reject);
  });
}

const result = await runWorker(5);
console.log(result);
```

Worker file:

```js
import { parentPort, workerData } from 'worker_threads';

function factorial(number) {
  if (number <= 1) {
    return 1;
  }

  return number * factorial(number - 1);
}

parentPort.postMessage(factorial(workerData));
```

### Explanation

Node.js is good for I/O-heavy work.

CPU-heavy work can block the event loop.

Worker threads help move CPU-heavy work away from the main thread.

---

## 34. Use Cluster To Run Multiple Node Processes

### Question

Use all CPU cores for a Node.js server.

### Code

```js
import cluster from 'cluster';
import os from 'os';
import http from 'http';

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  http
    .createServer((req, res) => {
      res.end(`Handled by process ${process.pid}`);
    })
    .listen(5000);
}
```

### Explanation

Each worker is a separate Node.js process.

This helps use multiple CPU cores.

In production, PM2, Docker, or Kubernetes is commonly used.

---

## 35. Log Request Time Middleware

### Question

Create middleware that logs how long each request takes.

### Code

```js
function requestTimer(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${duration}ms`);
  });

  next();
}

app.use(requestTimer);
```

### Explanation

This helps identify slow APIs.

In production, send this data to logging or monitoring tools.

---

# Common Follow-Up Interview Questions

## 1. When should you use async/await?

Use `async/await` when working with promises.

It makes async code easier to read.

Examples:

- database queries
- API calls
- file operations
- Redis calls

---

## 2. When should you use streams?

Use streams for large data.

Examples:

- large file upload
- large file download
- video streaming
- reading huge logs

Streams avoid loading the entire file into memory.

---

## 3. Why is in-memory cache not enough in production?

In-memory cache is stored inside one Node process.

If there are multiple servers, each server has a different cache.

For production, use shared cache like Redis.

---

## 4. Why should heavy work be moved to queues?

Heavy work makes API responses slow.

Examples:

- sending emails
- generating reports
- image processing
- bulk imports

Better flow:

```text
API receives request
API saves main data
API pushes job to queue
Worker processes job later
API responds quickly
```

---

## 5. Why should backend validate data even if frontend validates?

Frontend validation can be bypassed.

Anyone can call backend APIs using:

- Postman
- curl
- scripts
- browser console

Backend validation protects the actual data.

---

## 6. What should you say when asked to debug a slow Node API?

Say this:

```text
I would first measure where the time is spent. I would check request logs, database query time, external API time, payload size, CPU, memory, and event loop blocking. Then I would fix the root cause, such as missing indexes, N+1 queries, blocking code, or large response payloads.
```

---

# Final Practice Checklist

Practice writing these without looking:

- basic HTTP server
- simple router without Express
- read file async
- write JSON file
- check file exists
- callback to promise
- sequential async tasks
- parallel async tasks
- retry helper
- timeout wrapper
- EventEmitter
- read stream
- pipe stream
- transform stream
- Express API route
- logger middleware
- async handler
- error middleware
- HTTP error helper
- request body validation
- password hash
- OTP generator
- auth middleware
- authorization middleware
- rate limiter
- pagination helper
- TTL cache
- background queue
- URL query parser
- group data by key
- health endpoint
- graceful shutdown
- worker thread
- cluster
- request timer middleware

