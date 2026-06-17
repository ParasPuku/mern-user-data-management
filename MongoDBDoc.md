# MongoDB Interview Questions and Answers

This document covers commonly asked MongoDB interview questions with concise answers, examples, and practical notes from this MERN app.

## How to Use This Document

Use this file for:

- MongoDB interview revision
- Mongoose interview preparation
- understanding schemas, models, indexes, and relationships
- explaining this app's database design
- preparing positive and negative interview answers
- revising performance, aggregation, transactions, and security

## MongoDB Basics

### 1. What is MongoDB?

MongoDB is a NoSQL document database.

It stores data in flexible JSON-like documents called BSON documents.

Interview answer:

```text
MongoDB is a NoSQL document-oriented database that stores data as BSON documents inside collections. It is flexible, scalable, and commonly used in modern web applications.
```

### 2. What is BSON?

BSON means Binary JSON.

MongoDB stores documents internally as BSON, not plain JSON.

BSON supports additional data types like:

- ObjectId
- Date
- Decimal128
- Binary data

### 3. MongoDB vs SQL database?

SQL databases:

- table-based
- fixed schema
- rows and columns
- strong relational joins
- SQL query language

MongoDB:

- collection-based
- flexible schema
- documents
- nested data support
- JavaScript-like query syntax

Interview answer:

```text
SQL databases store data in tables with fixed schemas, while MongoDB stores data in flexible documents inside collections. MongoDB is useful when data is document-shaped, changes frequently, or needs horizontal scaling.
```

### 4. What is a database in MongoDB?

A database is a container for collections.

Example:

```text
mern_user_data_management
```

This app uses MongoDB database configured by:

```env
MONGO_URI=mongodb://127.0.0.1:27017/mern_user_data_management
```

### 5. What is a collection?

A collection is a group of documents.

Similar to a table in SQL, but documents in a collection can have flexible structure.

Examples in this app:

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

### 6. What is a document?

A document is one record in MongoDB.

Example:

```json
{
  "_id": "ObjectId",
  "name": "Paras",
  "email": "paras@example.com",
  "status": "active"
}
```

### 7. What is _id?

`_id` is the unique identifier for every MongoDB document.

By default, MongoDB creates an ObjectId.

Example:

```json
{
  "_id": {
    "$oid": "6a201abaaa424933fa63ee78"
  }
}
```

### 8. What is ObjectId?

ObjectId is a 12-byte unique identifier used by MongoDB.

It contains:

- timestamp
- machine/process information
- counter

Mongoose type:

```js
mongoose.Schema.Types.ObjectId
```

### 9. Is MongoDB schema-less?

MongoDB is schema-flexible, not completely schema-less.

MongoDB itself allows flexible documents, but in real apps we often enforce structure using:

- application validation
- Mongoose schemas
- MongoDB schema validation

In this app, Mongoose schemas define structure.

## Mongoose Basics

### 10. What is Mongoose?

Mongoose is an ODM for MongoDB.

ODM means Object Data Modeling.

It provides:

- schemas
- models
- validation
- middleware/hooks
- query helpers
- relationships using ObjectId refs
- indexes

Interview answer:

```text
Mongoose is an ODM library for MongoDB that lets us define schemas, models, validations, hooks, and query methods in Node.js.
```

### 11. What is a Mongoose schema?

A schema defines the shape and rules of documents.

Example from this app:

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  }
});
```

### 12. What is a Mongoose model?

A model is created from a schema and represents a MongoDB collection.

Example:

```js
export const User = mongoose.model('User', userSchema);
```

Use:

```js
await User.find();
await User.create(data);
await User.findById(id);
```

### 13. What is schema validation?

Schema validation ensures data follows rules before saving.

Examples:

```js
required: true
minlength: [2, 'Name must be at least 2 characters']
maxlength: [80, 'Name must be 80 characters or less']
enum: ['admin', 'manager', 'member']
```

### 14. What is enum in Mongoose?

`enum` restricts field value to specific allowed values.

Example:

```js
role: {
  type: String,
  enum: ['admin', 'manager', 'member'],
  default: 'member'
}
```

If value is not one of these, validation fails.

### 15. What is trim?

`trim: true` removes leading and trailing spaces from strings.

Example:

```text
" paras@example.com " -> "paras@example.com"
```

### 16. What is lowercase?

`lowercase: true` converts string to lowercase before saving.

Example:

```text
"PARAS@GMAIL.COM" -> "paras@gmail.com"
```

### 17. What is select: false?

`select: false` hides a field from query results by default.

In this app:

```js
passwordHash: {
  type: String,
  required: true,
  select: false
}
```

To include it:

```js
Account.findOne({ email }).select('+passwordHash');
```

Use case:

```text
Protect sensitive fields like passwordHash.
```

### 18. What are timestamps?

Mongoose can automatically add:

```text
createdAt
updatedAt
```

Example:

```js
new mongoose.Schema(fields, {
  timestamps: true
});
```

## MongoDB CRUD

### 19. How to create a document?

```js
const user = await User.create({
  name: 'Paras',
  email: 'paras@example.com'
});
```

Or:

```js
const user = new User(data);
await user.save();
```

### 20. create vs save?

`create` creates and saves in one step.

```js
await User.create(data);
```

`save` is used on a model instance.

```js
const user = new User(data);
await user.save();
```

### 21. How to find documents?

```js
const users = await User.find({ status: 'active' });
```

Find one:

```js
const user = await User.findOne({ email });
```

Find by id:

```js
const user = await User.findById(id);
```

### 22. How to update document?

```js
const user = await User.findByIdAndUpdate(
  id,
  { name: 'Updated Name' },
  { new: true, runValidators: true }
);
```

`new: true` returns updated document.

`runValidators: true` runs schema validators.

### 23. How to delete document?

```js
await User.findByIdAndDelete(id);
```

Or:

```js
await User.deleteOne({ _id: id });
```

### 24. findOne vs find?

`findOne` returns one document or null.

`find` returns an array.

Example:

```js
await User.findOne({ email });
await User.find({ status: 'active' });
```

### 25. deleteOne vs deleteMany?

`deleteOne` deletes first matching document.

`deleteMany` deletes all matching documents.

Example:

```js
await OtpToken.deleteMany({
  identifier,
  purpose,
  consumedAt: null
});
```

## Query Operators

### 26. Common MongoDB query operators?

Common operators:

- `$gt`
- `$gte`
- `$lt`
- `$lte`
- `$ne`
- `$in`
- `$nin`
- `$or`
- `$and`
- `$regex`
- `$exists`

### 27. Example of comparison query?

```js
const tokens = await OtpToken.find({
  expiresAt: { $gt: new Date() }
});
```

This finds non-expired OTP tokens.

### 28. Example of $or?

```js
const account = await Account.findOne({
  $or: [{ email }, { mobile }]
});
```

### 29. Example of $in?

```js
await User.find({
  role: { $in: ['admin', 'manager'] }
});
```

### 30. Example of regex search?

```js
await User.find({
  name: { $regex: search, $options: 'i' }
});
```

`i` means case-insensitive.

## Indexes

### 31. What is index in MongoDB?

Index is a data structure that improves query performance.

Without index:

```text
MongoDB may scan every document.
```

With index:

```text
MongoDB can quickly locate matching documents.
```

### 32. Why indexes are important?

Indexes improve:

- search speed
- filtering
- sorting
- unique constraints

Tradeoff:

```text
Indexes improve reads but add overhead to writes and consume storage.
```

### 33. What is single-field index?

Index on one field.

Example:

```js
owner: {
  type: mongoose.Schema.Types.ObjectId,
  index: true
}
```

### 34. What is compound index?

Index on multiple fields.

Example from this app:

```js
userSchema.index({ owner: 1, email: 1 }, { unique: true });
```

This helps queries by owner and email.

### 35. What is unique index?

Unique index prevents duplicate values.

Example:

```js
userProfileSchema.index({ owner: 1, user: 1 }, { unique: true });
```

This ensures one profile per user per owner.

### 36. What is text index?

Text index supports text search.

Example from this app:

```js
userSchema.index({ name: 'text', email: 'text' });
skillSchema.index({ name: 'text', category: 'text' });
```

### 37. What is TTL index?

TTL index automatically deletes documents after a time.

Example from OTP model:

```js
otpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

MongoDB deletes document when `expiresAt` time passes.

### 38. What is syncIndexes?

`syncIndexes()` syncs MongoDB indexes with Mongoose schema indexes.

In this app:

```js
await Promise.all([
  Account.syncIndexes(),
  OtpToken.syncIndexes(),
  Team.syncIndexes(),
  TeamMembership.syncIndexes(),
  User.syncIndexes(),
  UserProfile.syncIndexes()
]);
```

Use carefully in production because index changes can be expensive.

### 39. What is explain()?

`explain()` shows how MongoDB executes query.

Example:

```js
await User.find({ owner }).explain('executionStats');
```

Useful to check if indexes are being used.

## Relationships

### 40. Does MongoDB support relationships?

Yes, but differently from SQL.

MongoDB supports:

- embedded documents
- referenced documents
- manual joins using queries
- aggregation `$lookup`

### 41. Embedding vs referencing?

Embedding:

```json
{
  "name": "Paras",
  "address": {
    "city": "Bengaluru"
  }
}
```

Referencing:

```json
{
  "user": "ObjectId('...')"
}
```

Use embedding when data is small and usually read together.

Use referencing when data is large, shared, or independently updated.

### 42. One-to-one relationship example?

In this app:

```text
User -> UserProfile
```

Mongoose schema:

```js
userProfileSchema.index({ owner: 1, user: 1 }, { unique: true });
```

This ensures one profile for one user.

### 43. One-to-many relationship example?

In this app:

```text
Account -> Users
```

Each user has:

```js
owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Account',
  required: true
}
```

One account can own many users.

### 44. Many-to-many relationship example?

In this app:

```text
User <-> Skill
```

Join collection:

```text
UserSkill
```

Schema fields:

```js
user: ObjectId ref User
skill: ObjectId ref Skill
owner: ObjectId ref Account
```

Unique index:

```js
userSkillSchema.index({ owner: 1, user: 1, skill: 1 }, { unique: true });
```

This prevents duplicate skill assignment to same user.

### 45. What is a join collection?

A join collection connects two collections.

Example:

```text
users
skills
userskills
```

`userskills` stores relationship plus extra fields:

```js
level
yearsOfExperience
```

### 46. What is populate in Mongoose?

`populate` replaces ObjectId reference with actual document data.

Example:

```js
await UserSkill.find({ user: userId }).populate('skill');
```

### 47. Populate vs aggregation $lookup?

`populate` is Mongoose-level convenience.

`$lookup` is MongoDB aggregation stage.

Use `populate` for simple refs.

Use `$lookup` for complex aggregation/reporting.

## Aggregation

### 48. What is aggregation in MongoDB?

Aggregation processes documents through stages to calculate transformed results.

Example stages:

- `$match`
- `$group`
- `$sort`
- `$project`
- `$lookup`
- `$unwind`
- `$limit`
- `$skip`

### 49. Example aggregation?

Count users by status:

```js
await User.aggregate([
  { $match: { owner: accountId } },
  { $group: { _id: '$status', count: { $sum: 1 } } }
]);
```

### 50. What is $match?

Filters documents.

```js
{ $match: { status: 'active' } }
```

### 51. What is $group?

Groups documents and calculates values.

```js
{
  $group: {
    _id: '$role',
    total: { $sum: 1 }
  }
}
```

### 52. What is $lookup?

`$lookup` performs join-like operation.

Example:

```js
{
  $lookup: {
    from: 'skills',
    localField: 'skill',
    foreignField: '_id',
    as: 'skillDetails'
  }
}
```

### 53. What is $project?

`$project` controls output fields.

Example:

```js
{
  $project: {
    name: 1,
    email: 1,
    _id: 0
  }
}
```

## Pagination and Sorting

### 54. How to implement pagination?

Basic pagination:

```js
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
const skip = (page - 1) * limit;

const users = await User.find(filters)
  .skip(skip)
  .limit(limit);
```

### 55. Why pagination is important?

Without pagination:

- API can return too much data
- server memory increases
- frontend slows down
- database query becomes expensive

### 56. skip/limit disadvantage?

For very large offsets, `skip` can become slow because MongoDB still scans skipped documents.

Alternative:

```text
cursor-based pagination
```

Example:

```js
User.find({ _id: { $gt: lastSeenId } }).limit(20);
```

### 57. How to sort?

```js
await User.find(filters).sort({ createdAt: -1 });
```

`-1` descending.

`1` ascending.

## Transactions

### 58. What is transaction?

Transaction ensures multiple operations succeed or fail together.

Example:

```text
Create order
Reduce inventory
Create payment record
```

If one fails, all rollback.

### 59. Does MongoDB support transactions?

Yes.

MongoDB supports multi-document transactions.

With Mongoose:

```js
const session = await mongoose.startSession();

await session.withTransaction(async () => {
  await User.create([data], { session });
  await UserProfile.create([profile], { session });
});

await session.endSession();
```

### 60. When to use transactions?

Use transactions when multiple writes must be atomic.

Examples:

- payment + order
- transfer money
- create user + profile + audit log

Avoid transactions for simple single-document updates.

## Mongoose Middleware and Methods

### 61. What are Mongoose hooks?

Hooks run before or after operations.

Example from this app:

```js
accountSchema.pre('validate', function normalizeAccount(next) {
  if (this.email) {
    this.email = normalizeEmail(this.email);
  }

  next();
});
```

This normalizes account before validation.

### 62. What are instance methods?

Methods available on document instances.

Example:

```js
accountSchema.methods.setPassword = async function setPassword(password) {
  this.passwordHash = await bcrypt.hash(password, 12);
};
```

Use:

```js
await account.setPassword(password);
```

### 63. What are static methods?

Methods available on model itself.

Example:

```js
accountSchema.statics.findByIdentifier = function findByIdentifier(identifier) {
  return this.findOne({ email: normalizeEmail(identifier) });
};
```

Use:

```js
await Account.findByIdentifier(identifier);
```

### 64. What is toJSON transform?

`toJSON.transform` changes document output when converted to JSON.

Example from this app:

```js
transform: (_doc, ret) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
  delete ret.passwordHash;
  return ret;
}
```

Use cases:

- hide sensitive fields
- convert `_id` to `id`
- remove internal fields

## Data Modeling

### 65. How to design MongoDB schema?

Think about:

- how data is read
- how data is updated
- document size
- relationships
- indexes
- data duplication
- query patterns

MongoDB modeling starts from query patterns, not only entity diagrams.

### 66. When to embed documents?

Embed when:

- child data belongs only to parent
- data is read together
- child data is small
- no need to query child independently

Example:

```js
address: {
  city: String,
  state: String
}
```

### 67. When to reference documents?

Reference when:

- data is large
- data is shared
- data changes independently
- relationship is many-to-many
- document can grow unbounded

In this app, `UserSkill` references `User` and `Skill`.

### 68. What is document size limit?

MongoDB document size limit is 16 MB.

This is one reason not to embed unlimited arrays.

### 69. What is denormalization?

Denormalization means duplicating some data to improve read performance.

Example:

```json
{
  "userId": "...",
  "userName": "Paras"
}
```

Tradeoff:

```text
Faster reads but updates must keep duplicated data consistent.
```

## Multi-Tenancy in This App

### 70. What is multi-tenancy?

Multi-tenancy means one application serves multiple customers/accounts while keeping their data isolated.

In this app, each managed record has:

```js
owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Account',
  required: true,
  index: true
}
```

### 71. How data isolation works in this app?

Queries filter by logged-in account:

```js
User.find({ owner: req.account._id });
```

This ensures one account cannot access another account's users.

### 72. Why compound unique index includes owner?

Example:

```js
userSchema.index({ owner: 1, email: 1 }, { unique: true });
```

This means:

```text
Same email cannot repeat inside one account's workspace.
Different accounts can still have same managed user email.
```

## Performance

### 73. How to improve MongoDB performance?

Ways:

- create proper indexes
- query only required fields
- use pagination
- avoid unbounded arrays
- use lean reads where possible
- optimize schema for query patterns
- avoid regex without indexes
- monitor slow queries
- use aggregation carefully

### 74. What is projection?

Projection selects specific fields.

Example:

```js
await User.find({}, 'name email status');
```

Or:

```js
await User.find({}).select('name email status');
```

### 75. What is lean?

`lean()` returns plain JavaScript objects instead of full Mongoose documents.

Example:

```js
const users = await User.find(filters).lean();
```

Benefit:

```text
Faster reads and less memory.
```

Tradeoff:

```text
No document methods, virtuals, getters, save().
```

### 76. Why avoid unbounded arrays?

Arrays that grow forever can make documents too large.

Bad:

```json
{
  "accountId": "...",
  "logs": [1000000 items]
}
```

Better:

```text
Store logs in separate collection.
```

### 77. What is N+1 query problem?

N+1 happens when app makes one query, then one additional query for each result.

Example:

```text
Find 100 users
Then query profile for each user separately
Total 101 queries
```

Solutions:

- populate carefully
- aggregation `$lookup`
- batch queries
- redesign data model

## Security

### 78. How to protect MongoDB data?

Practices:

- validate input
- use authentication
- use least privilege DB user
- do not expose MongoDB publicly
- use environment variables for URI
- avoid logging secrets
- sanitize query input
- use indexes to avoid expensive scans

### 79. What is NoSQL injection?

NoSQL injection happens when user input changes query structure.

Bad:

```js
User.findOne(req.body);
```

If body contains:

```json
{
  "email": {
    "$ne": null
  }
}
```

it may bypass logic.

Better:

```js
User.findOne({ email: normalizeEmail(req.body.email) });
```

### 80. Why not expose passwordHash?

Password hash is sensitive.

This app uses:

```js
passwordHash: {
  type: String,
  select: false
}
```

And removes it in `toJSON`.

### 81. Why use environment variable for Mongo URI?

Mongo URI can contain username/password.

Keep it out of source code.

Use:

```env
MONGO_URI=mongodb://127.0.0.1:27017/mern_user_data_management
```

## MongoDB With Redis

### 82. Why use Redis if we already have MongoDB?

MongoDB stores permanent data.

Redis stores temporary fast data.

In this app:

```text
MongoDB -> accounts, users, profiles, teams, skills
Redis -> OTP temporary data
```

### 83. Why OTP moved from MongoDB to Redis?

OTP is temporary.

Redis supports TTL naturally and is faster for short-lived operational data.

MongoDB fallback still exists for local resilience.

## Common Negative Interview Questions

### 84. What happens if MongoDB is down?

The app cannot read/write permanent data.

Good handling:

- fail startup if DB is required
- log clear error
- return proper error response
- monitor DB health

### 85. What happens if indexes are missing?

Queries may scan many documents.

Problems:

- slow APIs
- high CPU
- high disk I/O
- timeouts

### 86. Can too many indexes be bad?

Yes.

Too many indexes:

- slow down writes
- consume storage
- increase memory usage
- make index maintenance expensive

### 87. What happens if unique index is missing?

Duplicate data can enter database.

Example:

```text
two profiles for same user
same skill assigned twice to same user
```

Unique indexes protect data integrity.

### 88. What happens if we store huge arrays in one document?

Problems:

- document can hit 16 MB limit
- updates become slower
- document becomes hard to manage
- concurrent writes may conflict

### 89. What happens if we use regex search without index?

MongoDB may scan collection.

For large collections this is slow.

Use:

- text index
- Atlas Search
- proper search service

### 90. What happens if we trust frontend owner/account id?

Security issue.

Bad:

```js
User.find({ owner: req.body.owner });
```

Good:

```js
User.find({ owner: req.account._id });
```

Backend must derive owner from authenticated account.

### 91. What happens if schema validation is only frontend?

Attackers can bypass frontend and call API directly.

Backend and database validation are required.

### 92. Can MongoDB replace Redis?

For some temporary data, yes MongoDB can work.

But Redis is better for:

- very fast temporary reads/writes
- TTL-heavy data
- rate limiting
- sessions
- cache

MongoDB is better for:

- permanent data
- complex queries
- durable records

## App-Specific MongoDB Questions

### 93. Explain MongoDB design of this app.

This app uses MongoDB with Mongoose models:

```text
Account
User
UserProfile
Team
TeamMembership
Skill
UserSkill
OtpToken
```

Each authenticated account owns its managed data using `owner`.

### 94. How Account and User are related?

One account can own many users.

```text
Account -> Users
```

`User.owner` stores Account ObjectId.

### 95. How User and UserProfile are related?

One user has one profile.

```text
User -> UserProfile
```

Unique index:

```js
userProfileSchema.index({ owner: 1, user: 1 }, { unique: true });
```

### 96. How User and Skill are related?

Many-to-many through `UserSkill`.

```text
User -> UserSkill -> Skill
```

`UserSkill` also stores:

```text
level
yearsOfExperience
```

### 97. How OTP was stored before Redis?

OTP was stored in MongoDB `OtpToken` collection with:

```text
identifier
purpose
codeHash
attempts
expiresAt
consumedAt
```

TTL index removed expired OTP documents.

### 98. How duplicate managed user email is prevented?

Using compound unique index:

```js
userSchema.index({ owner: 1, email: 1 }, { unique: true });
```

### 99. How passwordHash is protected?

`Account.passwordHash` has:

```js
select: false
```

And `toJSON` removes it before response.

### 100. How indexes are synchronized in this app?

In DB connection:

```js
await Promise.all([
  Account.syncIndexes(),
  OtpToken.syncIndexes(),
  Team.syncIndexes(),
  TeamMembership.syncIndexes(),
  User.syncIndexes(),
  UserProfile.syncIndexes()
]);
```

## Most Important Short Answers

### 101. MongoDB in one line

```text
MongoDB is a NoSQL document database that stores data as BSON documents in collections.
```

### 102. Collection in one line

```text
A collection is a group of MongoDB documents, similar to a table in SQL.
```

### 103. Document in one line

```text
A document is one MongoDB record stored as BSON.
```

### 104. Mongoose in one line

```text
Mongoose is an ODM that provides schemas, models, validation, hooks, and query helpers for MongoDB in Node.js.
```

### 105. Index in one line

```text
An index improves query performance but adds write and storage overhead.
```

### 106. ObjectId in one line

```text
ObjectId is MongoDB's default unique identifier type for documents.
```

### 107. populate in one line

```text
populate replaces referenced ObjectId fields with actual document data.
```

### 108. Aggregation in one line

```text
Aggregation processes documents through pipeline stages to transform, group, join, or calculate data.
```

### 109. Transaction in one line

```text
A transaction ensures multiple database operations succeed or fail together.
```

### 110. TTL index in one line

```text
A TTL index automatically deletes documents after a configured expiry time.
```

## Final MongoDB Interview Checklist

Must know:

- MongoDB basics
- BSON
- database/collection/document
- ObjectId
- CRUD operations
- Mongoose schema/model
- validation
- enum
- indexes
- unique index
- compound index
- text index
- TTL index
- relationships
- embedding vs referencing
- one-to-one
- one-to-many
- many-to-many
- populate
- aggregation
- pagination
- transactions
- hooks/methods/statics
- toJSON transform
- multi-tenancy with owner
- performance optimization
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
