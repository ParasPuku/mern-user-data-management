# MongoDB Interview Questions and Answers

This document is ordered by interview priority.

Use it like this:

- First revise Priority 1 to Priority 5 for most MERN interviews.
- Then revise Aggregation, Scaling, Transactions, and Security.
- Use Real Time Queries for practical MongoDB query rounds.

Low-value repeated points were merged into bigger answers. For example, `trim`, `lowercase`, `enum`, `select: false`, and `timestamps` are covered inside schema options instead of separate tiny questions.

## Priority 1: MongoDB Core Concepts

### 1. What is MongoDB?

MongoDB is a NoSQL document database.

It stores data in collections as BSON documents.

Interview answer:

```text
MongoDB is a NoSQL document-oriented database. It stores data as flexible BSON documents inside collections, which makes it useful for modern applications where data can be nested, flexible, and scalable.
```

Example document:

```json
{
  "_id": "ObjectId",
  "name": "Paras",
  "email": "paras@example.com",
  "status": "active"
}
```

### 2. MongoDB vs SQL database?

SQL databases:

- store data in tables
- use rows and columns
- usually have fixed schema
- use SQL language
- are strong for relational data

MongoDB:

- stores data in collections
- uses documents
- supports nested data
- has flexible schema
- uses JavaScript-like query syntax
- supports horizontal scaling with sharding

Interview answer:

```text
SQL stores data in tables with rows and columns, while MongoDB stores data as flexible documents inside collections. MongoDB is useful when data is document-shaped, changes frequently, or needs horizontal scaling.
```

### 3. What are database, collection, and document in MongoDB?

Database:

```text
A container for collections.
```

Collection:

```text
A group of documents, similar to a table in SQL.
```

Document:

```text
One record in MongoDB, stored as BSON.
```

Example:

```text
Database: mern_user_data_management
Collection: users
Document: one user record
```

This app uses collections like:

```text
accounts
users
userprofiles
skills
userskills
teams
teammemberships
otptokens
```

### 4. What are BSON, _id, and ObjectId?

BSON means Binary JSON.

MongoDB stores documents internally as BSON, not plain JSON.

BSON supports extra data types like:

- ObjectId
- Date
- Decimal128
- Binary data

`_id` is the unique identifier for every document.

By default, MongoDB creates an ObjectId.

ObjectId contains:

- timestamp
- machine/process information
- counter

Mongoose type:

```js
mongoose.Schema.Types.ObjectId
```

Interview answer:

```text
BSON is MongoDB's binary document format. Every document has an _id field, and by default MongoDB uses ObjectId as the unique identifier.
```

### 5. Is MongoDB schema-less?

MongoDB is schema-flexible, not completely schema-less.

MongoDB allows flexible documents, but real applications usually enforce structure using:

- Mongoose schemas
- backend validation
- MongoDB schema validation

Interview answer:

```text
MongoDB is schema-flexible. It does not force every document to have the same shape, but production apps usually enforce structure through Mongoose schemas and backend validation.
```

## Priority 2: CRUD and Querying

### 6. How do you create, read, update, and delete documents?

Create:

```js
await User.create({
  name: 'Paras',
  email: 'paras@example.com'
});
```

Read:

```js
await User.find({ status: 'active' });
await User.findOne({ email: 'paras@example.com' });
await User.findById(userId);
```

Update:

```js
await User.findByIdAndUpdate(
  userId,
  { status: 'inactive' },
  { new: true }
);
```

Delete:

```js
await User.findByIdAndDelete(userId);
```

### 7. `create()` vs `save()`?

`create()` creates and saves in one step.

```js
await User.create(data);
```

`save()` is used on a model instance.

```js
const user = new User(data);
await user.save();
```

Use `create()` for simple creation.

Use `save()` when you want to build or modify the document before saving.

### 8. `find()` vs `findOne()`?

`find()` returns an array.

```js
const users = await User.find({ status: 'active' });
```

`findOne()` returns one document or `null`.

```js
const user = await User.findOne({ email });
```

Interview answer:

```text
find returns multiple matching documents as an array. findOne returns the first matching document or null.
```

### 9. Common MongoDB query operators?

Common operators:

```text
$gt  -> greater than
$gte -> greater than or equal
$lt  -> less than
$lte -> less than or equal
$ne  -> not equal
$in  -> value exists in array of options
$or  -> match any condition
$and -> match all conditions
$regex -> pattern matching
```

Examples:

```js
await User.find({ age: { $gte: 18 } });

await User.find({
  role: { $in: ['admin', 'manager'] }
});

await User.find({
  $or: [{ name: /paras/i }, { email: /paras/i }]
});
```

### 9. What is Projection in MongoDB?
In MongoDB, projection is the process of selecting only specific fields from a document to be returned in a query result, rather than fetching the entire document. It is equivalent to specifying the SELECT columns in standard SQL (e.g., SELECT name FROM users).

By default, MongoDB returns all fields of a matching document during a find() operation. Using projections optimizes application performance by reducing network bandwidth usage and memory consumption.

Core Rules of Projection

- Syntax: Passed as the optional second argument in the .find(query, projection) method.
- Inclusion (1 or true): Explicitly specifies the fields you want to return.
- Exclusion (0 or false): Explicitly specifies the fields you want to omit.
- The _id Exception: The _id field is always included by default. You must explicitly set _id: 0 to hide it.
- No Mixing: You cannot combine inclusion and exclusion integers in the same projection document (e.g., {name: 1, age: 0} is invalid). The only exception is suppressing the _id field while including other fields.

1. Inclusion Projection (Fetch specific fields)This query searches for all users but only returns their name and email fields (plus the default _id). Everything else is implicitly excluded.

db.users.find({}, { name: 1, email: 1 })

2. Excluding the _id FieldTo get a completely clean output containing only the name and email, suppress the _id field explicitly:

db.users.find({}, { name: 1, email: 1, _id: 0 })

3. Exclusion Projection (Drop specific fields)If a document has dozens of fields and you want all of them except sensitive data like passwords, use exclusion:

db.users.find({}, { password: 0, ssn: 0 })

### 10. What are projection, pagination, and sorting?

Projection selects only required fields.

```js
await User.find({}, 'name email status');
```

Pagination:

```js
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
const skip = (page - 1) * limit;

await User.find(filters)
  .skip(skip)
  .limit(limit);
```

Sorting:

```js
await User.find(filters).sort({ createdAt: -1 });
```

Interview answer:

```text
Projection reduces returned fields, pagination limits large result sets, and sorting controls result order.
```

## Priority 3: Mongoose Essentials

### 11. What is Mongoose?

Mongoose is an ODM for MongoDB.

ODM means Object Data Modeling.

It provides:

- schemas
- models
- validation
- middleware/hooks
- query helpers
- relationships using refs
- indexes

Interview answer:

```text
Mongoose is an ODM library for MongoDB that lets us define schemas, models, validations, hooks, and query methods in Node.js.
```

### 12. What are schema and model in Mongoose?

Schema defines the shape and rules of documents.

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});
```

Model is created from schema and represents a collection.

```js
export const User = mongoose.model('User', userSchema);
```

Use:

```js
await User.find();
await User.create(data);
```

### 13. Important Mongoose schema options?

Common options:

- `required`: field must exist
- `enum`: field must match allowed values
- `trim`: removes leading/trailing spaces
- `lowercase`: converts string to lowercase
- `select: false`: hides sensitive field by default
- `timestamps: true`: adds `createdAt` and `updatedAt`

Example:

```js
const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member'
    }
  },
  {
    timestamps: true
  }
);
```

Important:

```text
Use select: false for sensitive fields like passwordHash.
```

### 14. What are Mongoose hooks, instance methods, and static methods?

Hooks run before or after operations.

```js
userSchema.pre('save', function () {
  this.email = this.email.toLowerCase();
});
```

Instance methods run on one document.

```js
userSchema.methods.isActive = function () {
  return this.status === 'active';
};
```

Static methods run on the model.

```js
userSchema.statics.findActive = function () {
  return this.find({ status: 'active' });
};
```

Interview answer:

```text
Hooks add lifecycle logic, instance methods work on a single document, and static methods work on the model.
```

## Priority 4: Relationships and Joins

### 15. Does MongoDB support relationships?

Yes, but differently from SQL.

MongoDB supports relationships using:

- embedded documents
- referenced documents
- manual queries
- Mongoose `populate()`
- aggregation `$lookup`

### 16. Embedding vs referencing?

Embedding stores related data inside the same document.

```json
{
  "name": "Paras",
  "address": {
    "city": "Bengaluru"
  }
}
```

Referencing stores ObjectId to another document.

```json
{
  "user": "ObjectId('...')"
}
```

Use embedding when:

- data is small
- data is usually read together
- data does not change independently often

Use referencing when:

- data is large
- data is shared
- data changes independently
- relationship is many-to-many

### 17. What is a join collection?

A join collection connects two collections.

Example:

```text
User <-> Skill
```

Join collection:

```text
UserSkill
```

It can store extra fields:

```text
level
yearsOfExperience
```

This is useful for many-to-many relationships.

### 18. What is populate in Mongoose?

`populate()` replaces referenced ObjectId fields with actual document data.

Example:

```js
await UserSkill.find({ user: userId }).populate('skill');
```

Interview answer:

```text
populate is a Mongoose feature that performs a reference lookup and replaces ObjectId references with actual documents.
```

### 19. Populate vs aggregation `$lookup`?

`populate`:

- Mongoose-level feature
- good for simple refs
- easy to use in app code

`$lookup`:

- MongoDB aggregation stage
- good for reporting
- useful for complex joins and filtering

Interview answer:

```text
Use populate for simple Mongoose references. Use $lookup when you need aggregation, reporting, filtering, grouping, or complex joins.
```

### 20. How do we join MongoDB collections?

Common ways:

- `$lookup` in aggregation
- Mongoose `populate()`
- manual queries in application code
- embedding documents when data is usually read together

Example collections:

```js
// users
{
  _id: 1,
  name: 'Paras'
}

// orders
{
  _id: 101,
  userId: 1,
  total: 500
}
```

Join using `$lookup`:

```js
db.users.aggregate([
  {
    $lookup: {
      from: 'orders',
      localField: '_id',
      foreignField: 'userId',
      as: 'orders'
    }
  }
]);
```

Important:

```text
$lookup returns matched documents as an array field.
```

### 21. Joining two collections with lookup and without lookup?

With `$lookup`:

```js
db.users.aggregate([
  {
    $lookup: {
      from: 'orders',
      localField: '_id',
      foreignField: 'userId',
      as: 'orders'
    }
  }
]);
```

Without `$lookup`, use manual queries:

```js
const user = await db.collection('users').findOne({ _id: 1 });

const orders = await db.collection('orders').find({
  userId: user._id
}).toArray();

const result = {
  ...user,
  orders
};
```

In Mongoose, use `populate()` when schema has refs.

```js
const orders = await Order.find().populate('userId');
```

### 22. How can we join more than two collections?

Use multiple `$lookup` stages.

Example:

```js
db.users.aggregate([
  {
    $lookup: {
      from: 'orders',
      localField: '_id',
      foreignField: 'userId',
      as: 'orders'
    }
  },
  {
    $lookup: {
      from: 'payments',
      localField: '_id',
      foreignField: 'userId',
      as: 'payments'
    }
  }
]);
```

Use `$unwind` when the next join depends on each array item.

```js
db.users.aggregate([
  { $lookup: { from: 'orders', localField: '_id', foreignField: 'userId', as: 'orders' } },
  { $unwind: '$orders' },
  { $lookup: { from: 'payments', localField: 'orders._id', foreignField: 'orderId', as: 'paymentDetails' } }
]);
```

### 23. MongoDB join two collections with where clause?

In MongoDB, SQL `WHERE` is usually `$match`.

Filter before join:

```js
db.users.aggregate([
  {
    $match: {
      status: 'active'
    }
  },
  {
    $lookup: {
      from: 'orders',
      localField: '_id',
      foreignField: 'userId',
      as: 'orders'
    }
  }
]);
```

Filter inside joined collection:

```js
db.users.aggregate([
  {
    $lookup: {
      from: 'orders',
      let: { userId: '$_id' },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$userId', '$$userId']
            }
          }
        },
        {
          $match: {
            status: 'paid'
          }
        }
      ],
      as: 'paidOrders'
    }
  }
]);
```

Strong answer:

```text
Use $match before $lookup when filtering the main collection. Use $lookup with pipeline when filtering the joined collection.
```

## Priority 5: Indexes and Performance

### 24. What is index in MongoDB?

An index is a data structure that improves query speed.

Without index:

```text
MongoDB may scan many documents.
```

With index:

```text
MongoDB can find matching documents faster.
```

Example:

```js
userSchema.index({ email: 1 });
```

Important tradeoff:

```text
Indexes improve reads but add storage and write overhead.
```

### 25. Important index types?

Single-field index:

```js
userSchema.index({ email: 1 });
```

Compound index:

```js
userSchema.index({ owner: 1, email: 1 });
```

Unique index:

```js
userSchema.index({ owner: 1, email: 1 }, { unique: true });
```

Text index:

```js
userSchema.index({ name: 'text', email: 'text' });
```

TTL index:

```js
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

### 26. Why does compound unique index include owner?

In this app:

```js
userSchema.index({ owner: 1, email: 1 }, { unique: true });
```

Meaning:

```text
Same email cannot repeat inside one account workspace.
Different accounts can still have the same managed user email.
```

This supports multi-tenancy.

### 27. What is `explain()`?

`explain()` shows how MongoDB executes a query.

Example:

```js
db.users.find({ email: 'paras@example.com' }).explain('executionStats');
```

Important metrics:

- `executionTimeMillis`: query time
- `nReturned`: documents returned
- `totalDocsExamined`: documents scanned
- `totalKeysExamined`: index keys scanned

Good query:

```text
totalDocsExamined should be close to nReturned.
```

### 28. How to improve MongoDB performance?

Important practices:

- create proper indexes
- use projection
- use pagination
- use `lean()` for read-only Mongoose queries
- avoid unbounded arrays
- avoid regex without index
- design schema based on query patterns
- use aggregation carefully
- check slow queries with `explain()`

### 29. What is `lean()` in Mongoose?

`lean()` returns plain JavaScript objects instead of full Mongoose documents.

Example:

```js
const users = await User.find(filters).lean();
```

Benefit:

```text
Faster reads and less memory usage.
```

Tradeoff:

```text
No document methods, virtuals, getters, or save().
```

### 30. Why avoid unbounded arrays and N+1 queries?

Unbounded array problem:

```json
{
  "accountId": "...",
  "logs": [1000000 items]
}
```

This can make documents too large and slow.

Better:

```text
Store logs in a separate collection.
```

N+1 query problem:

```text
Find 100 users.
Then query profile for each user separately.
Total = 101 queries.
```

Fix:

- use populate carefully
- use `$lookup`
- batch queries
- redesign data model

## Priority 6: Aggregation

### 31. What is aggregation in MongoDB?

Aggregation is a way to process MongoDB documents step by step and return calculated or transformed results.

Beginner definition:

```text
Aggregation means taking documents from a collection, passing them through multiple stages, and producing a final result.
```

Pipeline idea:

```text
documents
  -> stage 1
  -> stage 2
  -> stage 3
  -> final result
```

MongoDB syntax:

```js
db.collection.aggregate([
  { stage1 },
  { stage2 },
  { stage3 }
]);
```

Use aggregation for:

- counting records by group
- calculating sum or average
- joining collections using `$lookup`
- flattening arrays using `$unwind`
- selecting or renaming fields using `$project`
- building dashboards and reports

### 32. Sample collection for aggregation examples

Assume `orders` collection:

```js
{
  _id: 1,
  customerId: 101,
  customerName: 'Paras',
  status: 'paid',
  amount: 1200,
  items: [
    { name: 'Keyboard', price: 800 },
    { name: 'Mouse', price: 400 }
  ],
  createdAt: ISODate('2026-07-10')
}
```

### 33. Important aggregation stages?

`$match` filters documents.

```js
{ $match: { status: 'paid' } }
```

`$group` groups documents and calculates values.

```js
{
  $group: {
    _id: '$customerId',
    totalSpent: { $sum: '$amount' }
  }
}
```

`$project` controls output fields.

```js
{
  $project: {
    _id: 0,
    customerName: 1,
    orderAmount: '$amount'
  }
}
```

`$sort`, `$skip`, `$limit` are used for sorting and pagination.

```js
{ $sort: { amount: -1 } },
{ $skip: 0 },
{ $limit: 5 }
```

`$unwind` breaks an array into multiple documents.

```js
{ $unwind: '$items' }
```

`$lookup` joins another collection.

```js
{
  $lookup: {
    from: 'customers',
    localField: 'customerId',
    foreignField: '_id',
    as: 'customerDetails'
  }
}
```

### 34. Complete beginner aggregation example

Question:

```text
Find total amount spent by each customer and sort highest spender first.
```

Query:

```js
db.orders.aggregate([
  {
    $match: {
      status: 'paid'
    }
  },
  {
    $group: {
      _id: '$customerId',
      customerName: {
        $first: '$customerName'
      },
      totalSpent: {
        $sum: '$amount'
      },
      totalOrders: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      totalSpent: -1
    }
  }
]);
```

Step-by-step:

```text
1. $match keeps only paid orders.
2. $group groups orders by customerId.
3. $sum adds each customer's order amount.
4. $sum: 1 counts total orders.
5. $sort puts highest spender first.
```

## Priority 7: Scaling

### 35. What is horizontal scaling?

Horizontal scaling means increasing capacity by adding more machines or servers.

Interview answer:

```text
Horizontal scaling means scaling by adding more servers instead of making one server bigger. In databases, it means distributing data and traffic across multiple machines so the system can handle more storage, reads, and writes.
```

Horizontal scaling vs vertical scaling:

```text
Vertical scaling   -> make one server bigger
Horizontal scaling -> add more servers
```

### 36. How does MongoDB support horizontal scaling?

MongoDB supports horizontal scaling using sharding.

Interview answer:

```text
MongoDB implements horizontal scaling through sharding. In a sharded cluster, MongoDB splits data into chunks based on a shard key and distributes those chunks across multiple shards. The application talks to mongos, which routes queries to the correct shard or shards.
```

Components:

```text
Shard          -> stores part of the data
Shard key      -> field used to distribute data
mongos         -> query router
Config servers -> cluster metadata
Balancer       -> moves chunks across shards
```

### 37. What is MongoDB sharding?

Sharding means splitting a large collection into smaller parts and distributing those parts across multiple servers.

Example:

```text
users collection has 100 million documents
  -> shard 1 stores some users
  -> shard 2 stores some users
  -> shard 3 stores some users
```

Use sharding when:

- one server is not enough
- collection is very large
- write traffic is high
- vertical scaling is expensive

Common mistake:

```text
Sharding is not a replacement for good indexes or good schema design.
```

### 38. What is shard key?

A shard key is the field MongoDB uses to decide where a document should live.

Example:

```js
{
  accountId: 'account-1',
  email: 'paras@example.com'
}
```

If `accountId` is shard key:

```text
MongoDB distributes documents based on accountId.
```

Good shard key:

- high cardinality
- evenly distributed
- used often in queries
- avoids hot shards

Bad shard key:

```text
status: active/inactive
```

Only a few values means poor distribution.

### 39. Sharding vs replication?

Replication:

```text
Copies same data to multiple servers for high availability.
```

Sharding:

```text
Splits different parts of data across multiple servers for horizontal scaling.
```

Simple difference:

```text
Replication = same data copied
Sharding = data divided
```

## Priority 8: Transactions and Data Modeling

### 40. What is transaction in MongoDB?

A transaction ensures multiple database operations succeed or fail together.

Example:

```text
Create order
Reduce inventory
Create payment record
```

If one fails, all should roll back.

MongoDB supports multi-document transactions with replica sets and sharded clusters.

### 41. When should we use transactions?

Use transactions when multiple writes must stay consistent.

Good examples:

- payment flow
- wallet transfer
- inventory update
- order creation with related records

Avoid transactions for simple single-document updates.

### 42. How to design MongoDB schema?

Design schema based on query patterns.

Ask:

- What data is read together?
- What data changes together?
- Is the relationship one-to-one, one-to-many, or many-to-many?
- Can the array grow forever?
- Do we need indexes?

Rule:

```text
Embed when data is small and read together. Reference when data is large, shared, or independently updated.
```

### 43. What is denormalization?

Denormalization means duplicating some data to make reads faster.

Example:

```js
{
  userId: ObjectId('...'),
  userName: 'Paras',
  skillName: 'React'
}
```

Benefit:

```text
Faster reads and fewer joins.
```

Tradeoff:

```text
Duplicated data must be kept consistent.
```

### 44. What is document size limit?

MongoDB document size limit is 16 MB.

This is one reason to avoid unbounded arrays inside one document.

## Priority 9: Security and Reliability

### 45. How to protect MongoDB data?

Important practices:

- validate input
- use authentication
- use least privilege DB user
- do not expose MongoDB publicly
- store URI in environment variables
- avoid logging secrets
- sanitize query input
- use indexes to avoid expensive scans
- do not expose sensitive fields

### 46. What is NoSQL injection?

NoSQL injection happens when user input changes query structure.

Bad:

```js
const user = await User.findOne(req.body);
```

If attacker sends:

```json
{
  "email": { "$ne": null },
  "password": { "$ne": null }
}
```

It may bypass expected checks if code is unsafe.

Better:

```js
const { email } = req.body;

const user = await User.findOne({
  email: String(email).toLowerCase()
});
```

### 47. Why not expose passwordHash?

Password hash should never be returned in API responses.

In this app:

```js
passwordHash: {
  type: String,
  select: false
}
```

Use `select('+passwordHash')` only when verifying login.

### 48. What happens if MongoDB is down?

Possible effects:

- API requests fail
- login/signup may fail
- reads/writes fail
- app may return 500 errors

Good handling:

- connect DB before `app.listen`
- return safe error response
- log the error
- use health checks
- use retry/monitoring in production

### 49. What happens if indexes are missing or too many?

Missing indexes:

- slow queries
- collection scans
- high CPU
- bad API response time

Too many indexes:

- slower writes
- more storage
- more index maintenance

Interview answer:

```text
Indexes improve read performance but add write and storage overhead, so we should index based on real query patterns.
```

### 50. Can MongoDB replace Redis?

Sometimes, but not always.

MongoDB is for durable persistent data.

Redis is for fast in-memory use cases like:

- OTP
- cache
- sessions
- rate limiting
- temporary tokens

In this app, OTP moved from MongoDB to Redis because Redis expiry and fast temporary storage fit OTP better.

## Priority 10: App-Specific MongoDB Questions

### 51. Explain MongoDB design of this app.

This app uses MongoDB with Mongoose models for:

```text
Account
User
UserProfile
Skill
UserSkill
Team
TeamMembership
OtpToken
```

Each authenticated account owns its managed data using `owner`.

### 52. How Account and User are related?

One account can own many users.

```text
Account -> Users
```

`User.owner` stores Account ObjectId.

### 53. How User and UserProfile are related?

One user has one profile.

```text
User -> UserProfile
```

Unique index:

```js
userProfileSchema.index({ owner: 1, user: 1 }, { unique: true });
```

### 54. How User and Skill are related?

Many-to-many through `UserSkill`.

```text
User -> UserSkill -> Skill
```

`UserSkill` stores:

```text
level
yearsOfExperience
```

### 55. How duplicate managed user email is prevented?

Using compound unique index:

```js
userSchema.index({ owner: 1, email: 1 }, { unique: true });
```

This means:

```text
Same email cannot repeat inside one account workspace.
Different accounts can still have same managed user email.
```

### 56. How indexes are synchronized in this app?

This app calls `syncIndexes()` for models.

Example:

```js
await Promise.all([
  Account.syncIndexes(),
  User.syncIndexes(),
  UserProfile.syncIndexes()
]);
```

Use carefully in production because index changes can be expensive.

## Most Important Short Answers

### 57. MongoDB in one line

```text
MongoDB is a NoSQL document database that stores data as BSON documents in collections.
```

### 58. Mongoose in one line

```text
Mongoose is an ODM that provides schemas, models, validation, hooks, and query helpers for MongoDB in Node.js.
```

### 59. Index in one line

```text
An index improves query performance but adds write and storage overhead.
```

### 60. Aggregation in one line

```text
Aggregation processes documents through pipeline stages to filter, group, join, sort, and calculate data.
```

### 61. populate in one line

```text
populate replaces referenced ObjectId fields with actual document data.
```

### 62. Transaction in one line

```text
A transaction ensures multiple database operations succeed or fail together.
```

### 63. Sharding in one line

```text
Sharding splits large MongoDB data across multiple servers to horizontally scale storage and traffic.
```

## Final MongoDB Interview Checklist

Must know:

- MongoDB basics
- BSON
- database/collection/document
- ObjectId
- CRUD operations
- query operators
- Mongoose schema/model
- validation
- indexes
- unique index
- compound index
- TTL index
- relationships
- embedding vs referencing
- populate
- `$lookup`
- aggregation
- pagination
- transactions
- schema design
- multi-tenancy with owner
- performance optimization
- horizontal scaling
- sharding
- NoSQL injection
- MongoDB vs Redis

Strong answer pattern:

```text
Definition -> Example -> Why it matters -> App usage
```

Example:

```text
An index is a data structure that improves query performance. For example, this app uses a compound unique index on owner and email in the User collection. It matters because queries by owner/email become faster and duplicate emails are prevented within the same account workspace.
```

## Real Time Queries

These are practical MongoDB aggregation questions commonly asked in interviews.

Assume an `orders` collection like this:

```js
{
  _id: ObjectId('...'),
  customerId: ObjectId('...'),
  customerName: 'Paras',
  amount: 1200,
  status: 'paid',
  items: [
    { name: 'Keyboard', price: 800 },
    { name: 'Mouse', price: 400 }
  ],
  createdAt: ISODate('2026-07-10')
}
```

### 1. Calculate average order amount for each customer and sort descending

Question:

```text
Write a query to calculate the average order amount for each customer and sort by the average amount in descending order.
```

Query:

```js
db.orders.aggregate([
  {
    $group: {
      _id: '$customerId',
      customerName: {
        $first: '$customerName'
      },
      averageOrderAmount: {
        $avg: '$amount'
      },
      totalOrders: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      averageOrderAmount: -1
    }
  }
]);
```

### 2. Flatten nested arrays using aggregation

Question:

```text
How can you flatten nested arrays using aggregation?
```

Query:

```js
db.orders.aggregate([
  {
    $unwind: '$items'
  },
  {
    $project: {
      _id: 0,
      customerName: 1,
      itemName: '$items.name',
      itemPrice: '$items.price'
    }
  }
]);
```

### 3. Find top 3 customers who spent the most

Question:

```text
Write a query to find the top 3 customers who spent the most.
```

Query:

```js
db.orders.aggregate([
  {
    $match: {
      status: 'paid'
    }
  },
  {
    $group: {
      _id: '$customerId',
      customerName: {
        $first: '$customerName'
      },
      totalSpent: {
        $sum: '$amount'
      },
      totalOrders: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      totalSpent: -1
    }
  },
  {
    $limit: 3
  }
]);
```

### 4. Count orders by status

```js
db.orders.aggregate([
  {
    $group: {
      _id: '$status',
      totalOrders: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      totalOrders: -1
    }
  }
]);
```

### 5. Calculate total sales per month

```js
db.orders.aggregate([
  {
    $match: {
      status: 'paid'
    }
  },
  {
    $group: {
      _id: {
        year: {
          $year: '$createdAt'
        },
        month: {
          $month: '$createdAt'
        }
      },
      totalSales: {
        $sum: '$amount'
      },
      totalOrders: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      '_id.year': 1,
      '_id.month': 1
    }
  }
]);
```

### 6. Find latest order for each customer

```js
db.orders.aggregate([
  {
    $sort: {
      createdAt: -1
    }
  },
  {
    $group: {
      _id: '$customerId',
      customerName: {
        $first: '$customerName'
      },
      latestOrderId: {
        $first: '$_id'
      },
      latestAmount: {
        $first: '$amount'
      },
      latestOrderDate: {
        $first: '$createdAt'
      }
    }
  }
]);
```

### 7. Join orders with customer details

```js
db.orders.aggregate([
  {
    $lookup: {
      from: 'customers',
      localField: 'customerId',
      foreignField: '_id',
      as: 'customer'
    }
  },
  {
    $unwind: '$customer'
  },
  {
    $project: {
      _id: 1,
      amount: 1,
      status: 1,
      customerName: '$customer.name',
      customerEmail: '$customer.email'
    }
  }
]);
```

### 8. Find duplicate emails in users collection

```js
db.users.aggregate([
  {
    $group: {
      _id: '$email',
      count: {
        $sum: 1
      },
      users: {
        $push: {
          id: '$_id',
          name: '$name'
        }
      }
    }
  },
  {
    $match: {
      count: {
        $gt: 1
      }
    }
  }
]);
```

### 9. Pagination using aggregation

```js
db.orders.aggregate([
  {
    $sort: {
      createdAt: -1
    }
  },
  {
    $skip: 10
  },
  {
    $limit: 10
  }
]);
```

### 10. Count total paid and failed orders in one query

```js
db.orders.aggregate([
  {
    $group: {
      _id: null,
      paidOrders: {
        $sum: {
          $cond: [{ $eq: ['$status', 'paid'] }, 1, 0]
        }
      },
      failedOrders: {
        $sum: {
          $cond: [{ $eq: ['$status', 'failed'] }, 1, 0]
        }
      },
      totalOrders: {
        $sum: 1
      }
    }
  }
]);
```

### 11. Filter nested array items

```js
db.orders.aggregate([
  {
    $project: {
      customerName: 1,
      expensiveItems: {
        $filter: {
          input: '$items',
          as: 'item',
          cond: {
            $gt: ['$$item.price', 500]
          }
        }
      }
    }
  }
]);
```

### 12. Find customers with more than 5 orders

```js
db.orders.aggregate([
  {
    $group: {
      _id: '$customerId',
      customerName: {
        $first: '$customerName'
      },
      totalOrders: {
        $sum: 1
      }
    }
  },
  {
    $match: {
      totalOrders: {
        $gt: 5
      }
    }
  },
  {
    $sort: {
      totalOrders: -1
    }
  }
]);
```
