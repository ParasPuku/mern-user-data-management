# GraphQL Notes — Interview + Full-Stack Guide

GraphQL is a **query language for APIs** and a **server runtime** that lets clients ask for exactly the fields they need from a single endpoint (usually `/graphql`).

This doc is split into:

1. **Core Concepts** — language & theory (must know)
2. **Backend Side** — schema, models, resolvers, auth, Express wiring
3. **Client Side** — Apollo Client setup, queries, mutations, calling the API

---

# ========================
# 1. CORE CONCEPTS
# ========================

### 1. What is GraphQL? How does it work?

GraphQL is an open-source query language for APIs and a server-side runtime that allows clients to request the exact data they need, and nothing more. Developed by Facebook in 2012 and open-sourced in 2015, it was created to solve inefficiencies of REST: **overfetching** (too much data) and **underfetching** (multiple round-trips for related data).

**Three pillars:**

| Pillar | Role |
|--------|------|
| **Schema (SDL)** | Strongly-typed contract: types, fields, relationships, operations |
| **Operations** | `Query` (read), `Mutation` (write), `Subscription` (real-time) |
| **Resolvers** | Functions that fetch/return data for each field |

**How it works (step-by-step):**

```text
[ Client ] --(1. Custom query)--> [ GraphQL Server ] --> (2. Parse & Validate vs Schema)
                                         │
                                         ├──> (3. Execute Resolvers — DB / APIs)
                                         │
[ Client ] <--(4. JSON shaped like the query)<─┘
```

1. Client sends a query/mutation describing exact fields.
2. Server parses into an AST and validates against the schema.
3. Server runs resolvers for each requested field.
4. Response JSON **mirrors the query shape**.

**Interview one-liner:**

```text
GraphQL is a typed query language + runtime. One endpoint, client-driven payload shape, schema as contract, resolvers as the data layer glue.
```

---

### 1.1 How does GraphQL send ONLY the fields you asked for?

This is the #1 thing people misunderstand. GraphQL does **not** magically change your MongoDB document. The **GraphQL execution engine** builds the response JSON field-by-field from the client's **selection set** — so unrequested fields never appear in the HTTP response.

#### Example

Schema / DB user has many fields:

```graphql
type User {
  id: ID!
  name: String!
  age: Int
  address: String
  mobile: String
  country: String
}

type Query {
  user(id: ID!): User
}
```

Client asks for **only** `name` and `country`:

```graphql
query {
  user(id: "1") {
    name
    country
  }
}
```

Response — **only those two fields** (plus nesting under `user`):

```json
{
  "data": {
    "user": {
      "name": "Paras",
      "country": "India"
    }
  }
}
```

`age`, `address`, `mobile` are **not** in the response — even if the resolver loaded the full user from MongoDB.

#### What actually happens step-by-step

```text
1. Client sends selection set: user { name, country }

2. Server validates: name & country exist on type User ✓

3. Execute Query.user resolver
   → returns a full JS object from DB, e.g.
     { id, name, age, address, mobile, country }

4. GraphQL runtime looks at the selection set again
   → for EACH requested field, call that field's resolver:
        User.name    → parent.name     → "Paras"
        User.country → parent.country  → "India"
   → age / address / mobile were NEVER requested
     → their resolvers are NEVER called
     → they are NEVER written into the response JSON

5. Final JSON mirrors the query shape exactly
```

So the “filter” happens in the **GraphQL response builder**, not because your resolver manually picked two fields.

#### Code view (resolvers)

```js
const resolvers = {
  Query: {
    // Parent resolver — often returns the WHOLE user document
    user: async (_parent, { id }) => {
      return User.findById(id); // may contain age, address, mobile too
    },
  },

  // Field resolvers — GraphQL only calls these if the client asked for them
  User: {
    name: (parent) => parent.name,       // called ✔ (requested)
    country: (parent) => parent.country, // called ✔ (requested)
    age: (parent) => parent.age,         // NOT called ✖ (not in query)
    address: (parent) => parent.address, // NOT called ✖
    mobile: (parent) => parent.mobile,   // NOT called ✖
  },
};
```

If you omit `User.name` / `User.country`, GraphQL’s **default field resolver** does the same thing: `parent[fieldName]` — still only for fields in the query.

#### REST vs GraphQL (same example)

| | REST `GET /users/1` | GraphQL query above |
|--|---------------------|---------------------|
| Response | Usually whole resource: name, age, address, mobile, country | Only `name` + `country` |
| Who decides shape? | Server (fixed DTO) | Client (selection set) |
| Extra fields on wire? | Yes (overfetch) | No |

#### Important interview nuance (DB vs response)

| Layer | What happens with `name` + `country` query? |
|-------|-----------------------------------------------|
| **HTTP response** | Guaranteed: only requested fields |
| **MongoDB `findById`** | By default may still load the **full document** |
| **Network to client** | Small — only selected fields serialized |

So:

- **Overfetching on the wire (client)** → solved by GraphQL selection sets automatically.
- **Overfetching from the database** → optional extra optimization (projection):

```js
user: async (_parent, { id }, _ctx, info) => {
  // Advanced: read info to know which fields were requested,
  // then project only those columns in Mongo:
  return User.findById(id).select('name country');
}
```

Most apps rely on GraphQL’s response filtering first; DB projection / DataLoader optimizations come later.

#### One-liner for interviews

```text
The client’s query is a selection set. GraphQL executes only those field resolvers and builds JSON that mirrors the query. Unrequested fields are never resolved and never sent — even if the parent object from the DB had more data.
```

---

### 2. GraphQL vs REST

| Topic | REST | GraphQL |
|-------|------|---------|
| Endpoints | Many URLs (`/users`, `/posts/:id`) | Usually one (`/graphql`) |
| Payload | Server-fixed | Client selects fields |
| Over/under fetch | Common | Avoided by design |
| Nested data | Multiple round-trips | One request |
| Operations | HTTP verbs | Query / Mutation / Subscription |
| Typing | Optional (OpenAPI) | Required schema |
| Versioning | `/v1`, `/v2` | Evolve via deprecate/add fields |
| Caching | Native HTTP cache | Client cache (Apollo) + custom |
| Errors | HTTP status codes | Often HTTP 200 + `errors[]` |

**Choose REST when:** simple CRUD, public APIs, strong HTTP caching, heavy file upload.

**Choose GraphQL when:** complex nested UI data, mobile bandwidth limits, many clients needing different shapes, real-time subscriptions.

---

### 3. What are Query, Mutation, and Subscription?

| Operation | Purpose | Side effects? | Example |
|-----------|---------|---------------|---------|
| **Query** | Read data | No (by convention) | `user(id)`, `posts` |
| **Mutation** | Create / update / delete | Yes | `createUser`, `login` |
| **Subscription** | Real-time push (WebSocket) | Listen | `messageAdded` |

```graphql
# Query
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}

# Mutation
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
  }
}

# Subscription
subscription OnMessageAdded($roomId: ID!) {
  messageAdded(roomId: $roomId) {
    id
    text
    sender { name }
  }
}
```

**Rule:** Prefer mutations for anything that changes state — even if a query *could* do it.

---

### 4. Schema Definition Language (SDL) — what goes in a schema?

The schema is the **contract**. Clients can only request what the schema exposes.

```graphql
# Object type
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  author: User!
}

# Root operations
type Query {
  user(id: ID!): User
  users: [User!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

# Input type (for arguments — NEVER reuse Object types as inputs)
input CreateUserInput {
  name: String!
  email: String!
  password: String!
}
```

`!` = **non-null** (must return a value; cannot be `null`).

---

### 5. GraphQL type system (complete checklist)

| Kind | Example | Notes |
|------|---------|-------|
| **Scalar** | `String`, `Int`, `Float`, `Boolean`, `ID` | Built-in leaf values |
| **Custom scalar** | `DateTime`, `Email` | You define serialize/parse |
| **Object** | `type User { ... }` | Nested fields |
| **Input** | `input LoginInput { ... }` | Arguments only |
| **Enum** | `enum Role { ADMIN USER }` | Fixed set of values |
| **Interface** | `interface Node { id: ID! }` | Shared fields + implementors |
| **Union** | `union SearchResult = User \| Post` | No shared fields required |
| **List** | `[User]`, `[User!]!` | Array semantics + nullability |
| **Non-Null** | `String!` | Guarantees value |

**Nullability mental model:**

- `[User]` → list can be null; items can be null
- `[User!]` → list can be null; items cannot
- `[User]!` → list cannot be null; items can
- `[User!]!` → list and items all required (most common for “array of users”)

---

### 6. Arguments, Variables, Aliases, Fragments, Directives

**Arguments** — inline or via variables:

```graphql
query {
  user(id: "1") { name }
}
```

**Variables** — preferred (safe, reusable, no string concat):

```graphql
query GetUser($id: ID!) {
  user(id: $id) { name email }
}
```

Variables JSON:

```json
{ "id": "1" }
```

**Aliases** — same field twice with different args:

```graphql
query {
  admin: user(id: "1") { name }
  guest: user(id: "2") { name }
}
```

**Fragments** — reusable field sets:

```graphql
fragment UserFields on User {
  id
  name
  email
}

query {
  user(id: "1") {
    ...UserFields
  }
}
```

**Directives (built-in):**

```graphql
query ($withEmail: Boolean!) {
  user(id: "1") {
    name
    email @include(if: $withEmail)
    phone @skip(if: $withEmail)
  }
}
```

- `@include(if:)` — include field if true
- `@skip(if:)` — skip field if true
- `@deprecated(reason:)` — schema evolution (on schema fields)

---

### 7. What is Introspection?

Introspection lets clients (and tools like Apollo Sandbox / GraphiQL) ask the server: *“What types and fields exist?”*

```graphql
{
  __schema {
    types { name kind }
  }
}
```

**Security:** Disable or restrict introspection in production.

---

### 8. GraphQL errors vs HTTP status

GraphQL often returns **HTTP 200** even when something fails, with:

```json
{
  "data": { "user": null },
  "errors": [
    {
      "message": "User not found",
      "path": ["user"],
      "extensions": { "code": "NOT_FOUND" }
    }
  ]
}
```

Partial success is allowed: some fields succeed, others fail.

Use `extensions.code` for machine-readable errors (`UNAUTHENTICATED`, `FORBIDDEN`, `BAD_USER_INPUT`, etc.).

---

### 9. N+1 problem and DataLoader

Classic bug: resolving `posts { author { name } }` for 50 posts runs **50 author DB queries**.

**Fix:** [DataLoader](https://github.com/graphql/dataloader) — batch + cache per request:

```js
import DataLoader from 'dataloader';
import User from './models/User.js';

export const createUserLoader = () =>
  new DataLoader(async (ids) => {
    const users = await User.find({ _id: { $in: ids } });
    const map = new Map(users.map((u) => [u.id, u]));
    return ids.map((id) => map.get(id) || null);
  });
```

Put loaders on **context** (new per request, never global).

---

### 10. Pagination patterns

**Offset (simple):**

```graphql
type Query {
  posts(limit: Int = 10, offset: Int = 0): [Post!]!
}
```

**Cursor / Relay-style (preferred at scale):**

```graphql
type PostConnection {
  edges: [PostEdge!]!
  pageInfo: PageInfo!
}

type PostEdge {
  cursor: String!
  node: Post!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}
```

---

### 11. Security checklist for GraphQL

| Risk | Mitigation |
|------|------------|
| Deep nested queries (DoS) | Query depth limit |
| Expensive queries | Query complexity analysis |
| Introspection leak | Disable in prod |
| Auth bypass | Auth in context + field/resolver checks |
| Batch abuse | Rate limiting / persisted queries |
| Injection | Never string-build queries; use variables |

---

# ========================
# 2. BACKEND SIDE
# ========================

Typical MERN + Apollo Server folder layout:

```text
backend/
  src/
    index.js              # Express + Apollo mount
    graphql/
      typeDefs/           # schema SDL (or .graphql files)
        index.js
        user.js
        post.js
      resolvers/
        index.js
        user.js
        post.js
      context.js          # auth + loaders
    models/
      User.js
      Post.js
    middleware/
      auth.js             # optional Express JWT helper
```

---

### 12. How do you set up GraphQL with Express? (index / entry)

GraphQL does **not** replace Express routing for everything — you mount Apollo as middleware on one path.

```bash
npm install @apollo/server graphql express cors body-parser
npm install mongoose jsonwebtoken dotenv
# optional
npm install dataloader graphql-tag
```

```js
// src/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import typeDefs from './graphql/typeDefs/index.js';
import resolvers from './graphql/resolvers/index.js';
import { buildContext } from './graphql/context.js';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // introspection: process.env.NODE_ENV !== 'production',
});

await mongoose.connect(process.env.MONGO_URI);
await server.start();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(
  '/graphql',
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

// You can still keep REST routes alongside GraphQL
app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
```

**Routing idea:**

- REST: many routes (`app.get('/api/users')`, …)
- GraphQL: **one route** `POST /graphql` (GET often used by playground/sandbox)

All “routes” become **schema fields** (`Query.users`, `Mutation.createUser`), not Express paths.

---

### 13. How do you write the Schema (typeDefs)?

**Option A — JS template strings (common):**

```js
// graphql/typeDefs/user.js
const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    posts: [Post!]!
    createdAt: String!
  }

  enum Role {
    USER
    ADMIN
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    deleteUser(id: ID!): Boolean!
  }
`;

export default userTypeDefs;
```

```js
// graphql/typeDefs/index.js
import userTypeDefs from './user.js';
import postTypeDefs from './post.js';

const root = `#graphql
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export default [root, userTypeDefs, postTypeDefs];
```

**Option B — `.graphql` files** loaded with `graphql-tag` / build tooling.

**Interview tip:** Keep schema modular with `extend type Query` / `extend type Mutation`.

---

### 14. How do Models fit with GraphQL? (Mongoose)

GraphQL types ≠ Mongoose models, but they usually map 1:1.

```js
// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function comparePassword(plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model('User', userSchema);
```

```js
// models/Post.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
```

**Important:** Never expose `password` in the GraphQL `User` type. Resolvers control what leaves the API.

---

### 15. What is a Resolver? Full signature and examples

In GraphQL, a resolver is a function responsible for fetching or computing the data for a single field in your API schema.

Think of the schema as a blueprint that defines what data a client can ask for, while resolvers act as the actual engine room that determines how to fetch that data at runtime. When a client submits a query, the GraphQL server passes the request to the corresponding resolver functions to construct the final response.

Resolver signature:

```text
(parent, args, context, info) => result
```

| Arg | Meaning |
|-----|---------|
| `parent` | Result from parent resolver (for nested fields) |
| `args` | Field arguments |
| `context` | Shared per-request object (user, db, loaders) |
| `info` | AST / field metadata (rarely needed) |

```js
// graphql/resolvers/user.js
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import Post from '../../models/Post.js';
import { AuthenticationError, ForbiddenError, UserInputError } from './errors.js';

const signToken = (user) =>
  jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

const userResolvers = {
  Query: {
    me: async (_parent, _args, { user }) => {
      if (!user) return null;
      return User.findById(user.id);
    },

    user: async (_parent, { id }) => User.findById(id),

    users: async (_parent, _args, { user }) => {
      if (!user || user.role !== 'ADMIN') {
        throw new ForbiddenError('Admins only');
      }
      return User.find().sort({ createdAt: -1 });
    },
  },

  Mutation: {
    register: async (_parent, { input }) => {
      const exists = await User.findOne({ email: input.email });
      if (exists) throw new UserInputError('Email already registered');

      const created = await User.create(input);
      return { token: signToken(created), user: created };
    },

    login: async (_parent, { input }) => {
      const found = await User.findOne({ email: input.email });
      if (!found || !(await found.comparePassword(input.password))) {
        throw new AuthenticationError('Invalid credentials');
      }
      return { token: signToken(found), user: found };
    },

    deleteUser: async (_parent, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      if (user.role !== 'ADMIN' && user.id !== id) {
        throw new ForbiddenError('Not allowed');
      }
      await User.findByIdAndDelete(id);
      return true;
    },
  },

  // Field-level resolvers (nested / computed)
  User: {
    id: (parent) => parent.id || parent._id.toString(),

    posts: async (parent, _args, { loaders }) => {
      // Prefer DataLoader in real apps
      if (loaders?.postsByUserId) {
        return loaders.postsByUserId.load(parent.id);
      }
      return Post.find({ author: parent.id });
    },
  },
};

export default userResolvers;
```

```js
// graphql/resolvers/post.js
import Post from '../../models/Post.js';
import { AuthenticationError } from './errors.js';

const postResolvers = {
  Query: {
    posts: async () => Post.find().sort({ createdAt: -1 }),
    post: async (_p, { id }) => Post.findById(id),
  },

  Mutation: {
    createPost: async (_p, { input }, { user }) => {
      if (!user) throw new AuthenticationError('Login required');
      return Post.create({ ...input, author: user.id });
    },
  },

  Post: {
    author: async (parent, _args, { loaders }) => {
      if (loaders?.userLoader) {
        return loaders.userLoader.load(parent.author.toString());
      }
      // fallback populate-style
      const { default: User } = await import('../../models/User.js');
      return User.findById(parent.author);
    },
  },
};

export default postResolvers;
```

```js
// graphql/resolvers/index.js
import userResolvers from './user.js';
import postResolvers from './post.js';

export default [userResolvers, postResolvers];
// Apollo merges arrays of resolver maps
```

**Default field resolver:** If you don’t write `User.name`, GraphQL returns `parent.name` automatically.

---

### 16. Auth middleware / Context (the GraphQL way)

In REST you use Express middleware per route. In GraphQL, **context** is the shared auth surface for all resolvers.

```js
// graphql/context.js
import jwt from 'jsonwebtoken';
import { createUserLoader, createPostsByUserLoader } from './loaders.js';

export async function buildContext({ req }) {
  let user = null;

  // 1) Authorization: Bearer <token>
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  // 2) Or httpOnly cookie (if you use cookie-parser)
  // const token = token || req.cookies?.token;

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      user = { id: payload.id, role: payload.role };
    } catch {
      user = null; // invalid/expired → treat as logged out
    }
  }

  return {
    user,
    loaders: {
      userLoader: createUserLoader(),
      postsByUserId: createPostsByUserLoader(),
    },
  };
}
```

**Protecting fields:**

```js
const requireAuth = (user) => {
  if (!user) throw new AuthenticationError('Not authenticated');
};

const requireAdmin = (user) => {
  requireAuth(user);
  if (user.role !== 'ADMIN') throw new ForbiddenError('Admins only');
};
```

**Optional Express middleware** (only if you want JWT parsed before Apollo):

```js
// middleware/auth.js
import jwt from 'jsonwebtoken';

export function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) {
    try {
      req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    } catch {
      req.user = null;
    }
  }
  next();
}

// then in index.js: app.use(optionalAuth) before /graphql
// and context: ({ req }) => ({ user: req.user, ... })
```

**Interview answer:**

```text
GraphQL auth is usually done in context: parse JWT once per request, attach user, then each resolver checks permissions. Field-level auth is preferred over “one middleware for the whole /graphql route” because one HTTP call can mix public and private fields.
```

---

### 17. Custom errors (clean API)

```js
// graphql/resolvers/errors.js
import { GraphQLError } from 'graphql';

export class AuthenticationError extends GraphQLError {
  constructor(message = 'Unauthenticated') {
    super(message, { extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } } });
  }
}

export class ForbiddenError extends GraphQLError {
  constructor(message = 'Forbidden') {
    super(message, { extensions: { code: 'FORBIDDEN', http: { status: 403 } } });
  }
}

export class UserInputError extends GraphQLError {
  constructor(message = 'Bad user input') {
    super(message, { extensions: { code: 'BAD_USER_INPUT', http: { status: 400 } } });
  }
}
```

---

### 18. Minimal standalone Apollo example (no Express)

Useful for learning / sandbox:

```js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Author {
    id: ID!
    name: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: Author!
  }

  type Query {
    post(id: ID!): Post
  }
`;

const authors = [
  { id: '101', name: 'Jane Doe' },
  { id: '102', name: 'John Smith' },
];

const posts = [
  { id: '45', title: 'Introduction to GraphQL', content: 'GraphQL is...', authorId: '101' },
  { id: '46', title: 'TypeScript Tips', content: 'Use strict mode...', authorId: '102' },
];

const resolvers = {
  Query: {
    post: (_parent, args) => posts.find((p) => p.id === args.id),
  },
  Post: {
    author: (parent) => authors.find((a) => a.id === parent.authorId),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 Server ready at: ${url}`);
```

Test query in Apollo Sandbox:

```graphql
query GetPostDetails {
  post(id: "45") {
    title
    content
    author { name }
  }
}
```

---

### 19. How do Subscriptions work on the backend?

Need a WebSocket transport (e.g. `graphql-ws`) + `PubSub`.

```js
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();
export const MESSAGE_ADDED = 'MESSAGE_ADDED';

// Mutation publishes:
await pubsub.publish(MESSAGE_ADDED, { messageAdded: message });

// Subscription resolver:
Subscription: {
  messageAdded: {
    subscribe: (_p, { roomId }) =>
      pubsub.asyncIterator([`${MESSAGE_ADDED}.${roomId}`]),
  },
}
```

Wire `httpServer` with a WS server that shares the same schema. (Exact bootstrap differs by Apollo version — know the idea: HTTP for query/mutation, WS for subscription.)

---

### 20. File uploads in GraphQL

GraphQL is JSON-first. Uploads usually use:

- **multipart requests** (`graphql-upload`), or
- Upload to **S3** from client, send URL via mutation, or
- Keep uploads on a **REST** endpoint and use GraphQL for metadata

---

### 21. Backend interview rapid-fire

**Where does business logic live?** Resolvers (or services called by resolvers) — schema stays declarative.

**Can GraphQL and REST coexist?** Yes — common pattern: GraphQL for app UI, REST for webhooks/files/health.

**How is versioning done?** Add fields; deprecate old ones (`@deprecated`). Avoid `/v2/graphql` unless breaking.

**Who runs the DB query?** Resolvers (or loaders/services they call). Schema never talks to Mongo directly.

---

# ========================
# 3. CLIENT SIDE
# ========================

Focus: **React + Apollo Client** (industry default). Alternatives: urql, Relay, `graphql-request`.

---

### 22. Client setup (install + ApolloProvider)

```bash
npm install @apollo/client graphql
```

```js
// src/apollo/client.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:4000/graphql',
  credentials: 'include', // if cookies / CORS credentials
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // or read cookie-less flow
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

**Flow:** React tree → `ApolloProvider` → hooks (`useQuery` / `useMutation`) → HTTP POST `/graphql` → Apollo Server → resolvers → JSON → cache → UI.

---

### 23. How do you write and run a Query on the client?

```js
// src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`;
```

```jsx
// src/components/UserList.jsx
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';

export default function UserList() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button type="button" onClick={() => refetch()}>Refresh</button>
      <ul>
        {data.users.map((u) => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}
```

**With variables:**

```jsx
const { data } = useQuery(GET_USER, {
  variables: { id: userId },
  skip: !userId,           // don't fire until id exists
  fetchPolicy: 'cache-first',
});
```

**Fetch policies (must know):**

| Policy | Behavior |
|--------|----------|
| `cache-first` | Cache, else network (default) |
| `network-only` | Always network, write cache |
| `cache-only` | Cache only |
| `no-cache` | Network, don’t write cache |
| `cache-and-network` | Show cache, still refetch network |

---

### 24. How do you run a Mutation on the client?

```js
// src/graphql/mutations.js
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user { id name email role }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user { id name email }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      content
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
```

```jsx
// src/components/LoginForm.jsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { ME } from '../graphql/queries';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (res) => {
      localStorage.setItem('token', res.login.token);
    },
    refetchQueries: [{ query: ME }], // refresh auth-dependent UI
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login({ variables: { input: { email, password } } });
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
```

**Update cache after mutation (manual):**

```js
const [createPost] = useMutation(CREATE_POST, {
  update(cache, { data: { createPost } }) {
    cache.modify({
      fields: {
        posts(existing = []) {
          const newRef = cache.writeFragment({
            data: createPost,
            fragment: gql`
              fragment NewPost on Post {
                id
                title
                content
              }
            `,
          });
          return [...existing, newRef];
        },
      },
    });
  },
});
```

**Optimistic UI:**

```js
createPost({
  variables: { input },
  optimisticResponse: {
    createPost: {
      __typename: 'Post',
      id: 'temp-id',
      title: input.title,
      content: input.content,
    },
  },
});
```

---

### 25. How does the client call the backend? (wire protocol)

Every GraphQL HTTP call is typically:

```http
POST /graphql
Content-Type: application/json
Authorization: Bearer <token>

{
  "query": "query GetUser($id: ID!) { user(id: $id) { id name } }",
  "variables": { "id": "123" },
  "operationName": "GetUser"
}
```

Response:

```json
{
  "data": {
    "user": { "id": "123", "name": "Paras" }
  }
}
```

Apollo Client builds this body from your `gql` document + `variables`. You rarely craft the JSON by hand.

**Without Apollo (raw fetch):**

```js
async function graphqlRequest(query, variables = {}) {
  const res = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}

// usage
const data = await graphqlRequest(
  `query { me { id name } }`
);
```

---

### 26. Client Subscriptions (real-time)

```js
import { split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000/graphql' })
);

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink
);
```

```jsx
import { useSubscription, gql } from '@apollo/client';

const MESSAGE_ADDED = gql`
  subscription ($roomId: ID!) {
    messageAdded(roomId: $roomId) {
      id
      text
    }
  }
`;

function Chat({ roomId }) {
  const { data } = useSubscription(MESSAGE_ADDED, { variables: { roomId } });
  return <div>{data?.messageAdded?.text}</div>;
}
```

---

### 27. Apollo Client cache concepts (interview)

- **Normalized cache:** entities stored by `__typename` + `id`/`_id`.
- **Cache reads** power `useQuery` without refetching.
- Configure `typePolicies` for merges/pagination:

```js
new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: ['filter'],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});
```

---

### 28. Error handling on the client

```jsx
const { error } = useQuery(GET_USERS);

// error.graphQLErrors  → from server `errors[]`
// error.networkError   → connection / 500 / CORS

useMutation(LOGIN, {
  onError: (err) => {
    const code = err.graphQLErrors?.[0]?.extensions?.code;
    if (code === 'UNAUTHENTICATED') {
      // redirect to login
    }
  },
});
```

Use an **error link** for global 401 → logout.

---

### 29. Client checklist — “don’t miss anything”

| Topic | What to know |
|-------|----------------|
| Provider | `ApolloProvider` wraps app |
| Documents | `gql` queries/mutations/subscriptions |
| Hooks | `useQuery`, `useLazyQuery`, `useMutation`, `useSubscription` |
| Variables | Always pass as object, never string-interpolate |
| Auth | `authLink` / cookies + CORS |
| Cache | `InMemoryCache`, refetch, `update`, optimistic |
| Loading/error | Always handle both |
| Codegen (optional) | GraphQL Code Generator → typed hooks |
| Devtools | Apollo Client DevTools browser extension |

---

# ========================
# 4. END-TO-END FLOW (PUTTING IT TOGETHER)
# ========================

### 30. Full request lifecycle example: “Create a post”

**1. Schema (backend)**

```graphql
input CreatePostInput {
  title: String!
  content: String!
}

extend type Mutation {
  createPost(input: CreatePostInput!): Post!
}
```

**2. Resolver (backend)**

```js
createPost: async (_p, { input }, { user }) => {
  if (!user) throw new AuthenticationError('Login required');
  return Post.create({ ...input, author: user.id });
}
```

**3. Context (backend)** — JWT → `context.user`

**4. Client mutation**

```jsx
const [createPost] = useMutation(CREATE_POST);
await createPost({
  variables: { input: { title: 'Hello', content: 'World' } },
});
```

**5. Network**

```text
React → Apollo Client → POST /graphql { query, variables }
  → Express middleware → Apollo Server
  → validate vs schema → Mutation.createPost resolver
  → Mongoose Post.create → JSON { data: { createPost: {...} } }
  → Apollo cache update → React re-render
```

---

# ========================
# 5. CONCEPT MAP — NOTHING MISSING
# ========================

### Language / Spec
- [x] Schema / SDL
- [x] Scalars, Objects, Inputs, Enums, Interfaces, Unions
- [x] Non-null & Lists
- [x] Query / Mutation / Subscription
- [x] Selection set → response only includes requested fields (see §1.1)
- [x] Arguments, Variables, Aliases
- [x] Fragments
- [x] Directives (`@include`, `@skip`, `@deprecated`)
- [x] Introspection
- [x] Errors + `extensions`

### Backend
- [x] Apollo Server + Express mount (`/graphql`)
- [x] typeDefs modular schema
- [x] Resolvers (`parent, args, context, info`)
- [x] Nested field resolvers
- [x] Mongoose models mapping
- [x] Context + JWT auth
- [x] Authorization in resolvers
- [x] Custom GraphQLError
- [x] DataLoader / N+1
- [x] Pagination
- [x] Subscriptions / PubSub (concept)
- [x] File upload strategies
- [x] Security (depth, complexity, disable introspection)

### Client
- [x] Apollo Client + Provider
- [x] HttpLink + AuthLink
- [x] useQuery / useMutation / useSubscription
- [x] Variables & skip
- [x] Fetch policies
- [x] Cache updates & optimistic UI
- [x] Raw fetch equivalent
- [x] Error handling

### Comparisons / Design
- [x] GraphQL vs REST
- [x] When to choose which
- [x] Coexistence with REST
- [x] Versioning via deprecation

---

# ========================
# 6. QUICK INTERVIEW ANSWERS
# ========================

**What is GraphQL?**  
Typed query language + runtime; client asks for exact fields from one endpoint; schema is the contract; resolvers fetch data.

**Resolver?**  
Function that resolves a field’s value: `(parent, args, context, info)`.

**Context?**  
Per-request object shared by all resolvers — auth user, DB, DataLoaders.

**Why not put auth only on `/graphql` middleware?**  
One request can mix public and private fields; authorize per field/resolver.

**N+1?**  
Nested resolvers fire one DB call per parent row → fix with DataLoader batching.

**Mutation vs Query?**  
Query reads; Mutation writes. Always use Mutation for side effects.

**How does React talk to GraphQL?**  
Apollo Client sends `POST` with `{ query, variables }`; hooks manage loading, errors, and cache.

**GraphQL vs REST one-liner?**  
REST = many resource URLs with fixed shapes; GraphQL = one endpoint with client-selected shapes and a strong schema.
