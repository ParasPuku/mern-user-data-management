# MongoDB Interview Questions and Answers

This file is reorganized for interview preparation.

Goal:

```text
Understand MongoDB concepts in a simple way.
Answer clearly in interviews.
Practice real query questions.
Prepare for product-company style MongoDB rounds.
```

Use this file in this order:

1. First understand fundamentals.
2. Then understand schema design.
3. Then learn CRUD and update operators.
4. Then focus deeply on indexes and aggregation.
5. Then revise scaling, transactions, and production issues.
6. Finally practice coding queries.

## Quick Revision Map

### Must Know

- MongoDB document model
- collection vs document
- BSON and ObjectId
- embed vs reference
- indexes
- compound indexes
- aggregation pipeline
- `$lookup`
- pagination
- transactions
- replication
- sharding
- `explain()`
- slow query debugging

### Most Asked for 4-8 Years Experience

- schema design
- indexing strategy
- aggregation queries
- query performance
- production debugging
- sharding and replication
- transactions
- data modeling scenarios

## Section 1: MongoDB Fundamentals

### 1. What is MongoDB?

MongoDB is a NoSQL document database.

It stores data in documents.

Documents look like JSON objects, but MongoDB stores them internally as BSON.

Example document:

```json
{
  "_id": "ObjectId",
  "name": "Paras",
  "email": "paras@example.com",
  "city": "Bangalore"
}
```

Simple meaning:

```text
MongoDB stores one record as one document.
Many documents are stored inside a collection.
```

Interview answer:

```text
MongoDB is a NoSQL document-oriented database. It stores data as flexible BSON documents inside collections. It is useful when data is nested, flexible, and needs to scale horizontally.
```

### 2. Why would you choose MongoDB over SQL databases?

Choose MongoDB when:

- data is document-shaped
- data structure changes frequently
- nested data is common
- application needs fast reads
- horizontal scaling is important
- schema flexibility is needed

SQL is better when:

- data is highly relational
- strong joins are required
- strict schema is important
- complex transactions are common

Simple example:

```text
User profile with address, preferences, skills, and settings can fit naturally in one MongoDB document.
```

Interview answer:

```text
I choose MongoDB when the data is flexible, nested, and document-based. It is good for modern applications where records can have different shapes. SQL is better when the data is strongly relational and needs many joins.
```

### 3. What are collections and documents?

Database:

```text
A database contains collections.
```

Collection:

```text
A collection is a group of documents.
It is similar to a table in SQL.
```

Document:

```text
A document is one record.
It is similar to a row in SQL.
```

Example:

```text
Database: ecommerce
Collection: users
Document: one user record
```

### 4. What is BSON? How is it different from JSON?

JSON is a text format.

BSON means Binary JSON.

MongoDB stores documents as BSON internally.

BSON supports more data types than JSON.

Examples:

- ObjectId
- Date
- Decimal128
- Binary data

Difference:

| Point | JSON | BSON |
|---|---|---|
| Format | Text | Binary |
| Used by | APIs/frontend | MongoDB internal storage |
| Extra types | Limited | More types |
| Example | string, number | ObjectId, Date, Decimal128 |

Interview answer:

```text
BSON is MongoDB's binary format for storing documents. It is similar to JSON but supports extra types like ObjectId, Date, and Decimal128.
```

### 5. Explain ObjectId. How is it generated?

`ObjectId` is the default value for `_id`.

Every MongoDB document needs an `_id`.

ObjectId is usually 12 bytes.

It contains:

- timestamp
- machine/process information
- counter

Example:

```json
{
  "_id": ObjectId("64f1a9b5c7a1e2b3c4d5e6f7")
}
```

Why useful:

```text
It is unique and MongoDB can generate it automatically.
```

Interview answer:

```text
ObjectId is MongoDB's default unique id for documents. It contains timestamp and uniqueness information, so MongoDB can generate unique document ids automatically.
```

### 6. What data types does MongoDB support?

Common types:

- String
- Number
- Boolean
- Object
- Array
- Date
- ObjectId
- Null
- Decimal128

Example:

```json
{
  "name": "Paras",
  "age": 30,
  "isActive": true,
  "skills": ["React", "Node"],
  "createdAt": "Date",
  "profileId": "ObjectId"
}
```

### 7. What are embedded documents?

Embedded documents means storing related data inside the same document.

Example:

```json
{
  "name": "Paras",
  "address": {
    "city": "Bangalore",
    "country": "India"
  }
}
```

Use embedding when:

- data is usually read together
- child data belongs only to parent
- child data is small
- child data does not grow without limit

Interview answer:

```text
Embedded documents store related data inside the same document. It improves read performance when parent and child data are usually needed together.
```

### 8. What are references in MongoDB?

References means storing another document's `_id`.

Example:

```json
{
  "userId": ObjectId("user_id"),
  "title": "First Post"
}
```

Here `userId` refers to a user document.

Use references when:

- data is large
- data is shared
- relationship changes often
- child data grows a lot

Interview answer:

```text
References store ObjectId of another document. They are useful when data is large, shared, or should be managed separately.
```

### 9. What is schema validation?

MongoDB is flexible, but we can still add validation rules.

Schema validation means MongoDB checks document structure before saving.

Example:

```js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: { bsonType: "string" },
        email: { bsonType: "string" }
      }
    }
  }
});
```

Simple meaning:

```text
Validation prevents bad or incomplete data from entering the collection.
```

### 10. What are capped collections?

A capped collection is a fixed-size collection.

When it reaches the limit, old documents are removed automatically.

Use cases:

- logs
- events
- temporary records

Example:

```js
db.createCollection("logs", {
  capped: true,
  size: 100000
});
```

## Section 2: Schema Design

### 11. When should you embed documents?

Embed when the child data belongs to the parent and is read together.

Good for:

- user address
- order items
- profile settings
- small comments

Example:

```json
{
  "orderId": "ORD001",
  "items": [
    { "productId": "p1", "name": "Keyboard", "qty": 1 },
    { "productId": "p2", "name": "Mouse", "qty": 2 }
  ]
}
```

Why:

```text
One read gives the full order with items.
```

### 12. When should you use references?

Use references when related data is large, shared, or changes independently.

Good for:

- user and posts
- product and reviews
- students and courses
- teams and members

Example:

```json
{
  "title": "MongoDB Notes",
  "authorId": ObjectId("user_id")
}
```

Why:

```text
The user can exist separately and many posts can reference the same user.
```

### 13. Explain one-to-one relationship.

One-to-one means one document is related to one other document.

Example:

```text
User -> UserProfile
```

Option 1: embed profile inside user.

```json
{
  "name": "Paras",
  "profile": {
    "bio": "Developer",
    "city": "Bangalore"
  }
}
```

Option 2: reference profile.

```json
{
  "userId": ObjectId("user_id"),
  "bio": "Developer"
}
```

Simple rule:

```text
Embed if always read together.
Reference if profile is large or separate.
```

### 14. Explain one-to-many relationship.

One-to-many means one document has many related documents.

Example:

```text
User -> Orders
```

Small many:

```text
Embed if list is small.
```

Large many:

```text
Use references if list can grow a lot.
```

Example reference:

```json
{
  "orderId": "ORD001",
  "userId": ObjectId("user_id"),
  "amount": 1000
}
```

### 15. Explain many-to-many relationship.

Many-to-many means many documents are related to many other documents.

Example:

```text
Users <-> Skills
Students <-> Courses
Products <-> Categories
```

Use a join collection.

Example:

```json
{
  "userId": ObjectId("user_id"),
  "skillId": ObjectId("skill_id"),
  "level": "advanced"
}
```

Simple meaning:

```text
Join collection connects two collections.
```

### 16. How do you design schemas for high-performance applications?

Step-by-step:

1. Understand most common queries.
2. Store together what is read together.
3. Avoid unnecessary joins.
4. Add indexes for frequent filters and sorting.
5. Avoid unbounded arrays.
6. Use pagination.
7. Store only required fields.
8. Denormalize carefully.

Interview answer:

```text
I design MongoDB schema based on query patterns. I embed data that is read together, reference data that grows or is shared, add indexes for frequent queries, and avoid unbounded arrays.
```

### 17. How do you avoid document growth issues?

Document growth happens when arrays keep increasing inside one document.

Bad example:

```json
{
  "postId": "p1",
  "comments": [
    "comment1",
    "comment2",
    "thousands of comments..."
  ]
}
```

Problem:

```text
Document becomes too large and slow.
```

Better:

```json
{
  "postId": ObjectId("post_id"),
  "userId": ObjectId("user_id"),
  "comment": "Nice post"
}
```

Store comments in a separate collection.

### 18. What is document size limit?

MongoDB document size limit is 16 MB.

Meaning:

```text
One document cannot be bigger than 16 MB.
```

If document becomes too large:

- split data into multiple documents
- use references
- move large arrays to separate collections
- store large files in GridFS or object storage

### 19. How would you model an e-commerce order?

Order should usually embed order items.

Why?

```text
Order items belong to that order.
Order history should not change if product name/price changes later.
```

Example:

```json
{
  "orderNumber": "ORD001",
  "customerId": ObjectId("customer_id"),
  "status": "paid",
  "items": [
    {
      "productId": ObjectId("product_id"),
      "name": "Keyboard",
      "price": 1200,
      "quantity": 1
    }
  ],
  "totalAmount": 1200,
  "createdAt": "Date"
}
```

Indexes:

```js
db.orders.createIndex({ customerId: 1, createdAt: -1 });
db.orders.createIndex({ status: 1 });
```

### 20. How would you model a social media post with comments?

If comments are few, embed recent comments.

If comments can be thousands, use separate collection.

Post:

```json
{
  "_id": ObjectId("post_id"),
  "userId": ObjectId("user_id"),
  "text": "Hello MongoDB",
  "commentCount": 100,
  "createdAt": "Date"
}
```

Comments:

```json
{
  "postId": ObjectId("post_id"),
  "userId": ObjectId("user_id"),
  "text": "Nice post",
  "createdAt": "Date"
}
```

Index:

```js
db.comments.createIndex({ postId: 1, createdAt: -1 });
```

## Section 3: CRUD Operations

### 21. Difference between insertOne() and insertMany().

`insertOne()` inserts one document.

```js
db.users.insertOne({ name: "Paras" });
```

`insertMany()` inserts multiple documents.

```js
db.users.insertMany([
  { name: "Paras" },
  { name: "Amit" }
]);
```

### 22. Difference between updateOne() and replaceOne().

`updateOne()` updates selected fields.

```js
db.users.updateOne(
  { email: "paras@example.com" },
  { $set: { city: "Bangalore" } }
);
```

`replaceOne()` replaces the full document except `_id`.

```js
db.users.replaceOne(
  { email: "paras@example.com" },
  { name: "Paras", city: "Bangalore" }
);
```

Simple rule:

```text
Use updateOne for field updates.
Use replaceOne when you want to replace the whole document.
```

### 23. Difference between deleteOne() and deleteMany().

`deleteOne()` deletes first matching document.

```js
db.users.deleteOne({ email: "paras@example.com" });
```

`deleteMany()` deletes all matching documents.

```js
db.users.deleteMany({ status: "inactive" });
```

### 24. Difference between find() and findOne().

`find()` returns a cursor with multiple documents.

```js
db.users.find({ city: "Bangalore" });
```

`findOne()` returns one document or `null`.

```js
db.users.findOne({ email: "paras@example.com" });
```

### 25. How do projections improve performance?

Projection returns only selected fields.

Example:

```js
db.users.find(
  { city: "Bangalore" },
  { name: 1, email: 1, _id: 0 }
);
```

Why useful:

- less data transferred
- less memory used
- faster response
- avoids exposing sensitive fields

### 26. What are update operators like $set, $push, $pull, $inc, $unset?

Common update operators:

```text
$set   -> set/update field
$unset -> remove field
$inc   -> increase/decrease number
$push  -> add item to array
$pull  -> remove item from array
```

Examples:

```js
db.users.updateOne(
  { email: "paras@example.com" },
  { $set: { city: "Bangalore" } }
);

db.products.updateOne(
  { _id: productId },
  { $inc: { stock: -1 } }
);

db.posts.updateOne(
  { _id: postId },
  { $push: { tags: "mongodb" } }
);

db.posts.updateOne(
  { _id: postId },
  { $pull: { tags: "old" } }
);
```

### 27. What is an upsert?

Upsert means:

```text
update if document exists
insert if document does not exist
```

Example:

```js
db.users.updateOne(
  { email: "paras@example.com" },
  { $set: { name: "Paras" } },
  { upsert: true }
);
```

### 28. How do you update nested fields?

Use dot notation.

Example:

```js
db.users.updateOne(
  { _id: userId },
  { $set: { "address.city": "Bangalore" } }
);
```

### 29. How do you update array elements?

Use positional operators.

Example document:

```json
{
  "items": [
    { "productId": "p1", "qty": 1 },
    { "productId": "p2", "qty": 2 }
  ]
}
```

Update matching item:

```js
db.orders.updateOne(
  { "items.productId": "p1" },
  { $set: { "items.$.qty": 3 } }
);
```

### 30. Explain positional operators ($, $[], $[identifier]).

`$` updates first matching array element.

```js
db.orders.updateOne(
  { "items.productId": "p1" },
  { $set: { "items.$.qty": 5 } }
);
```

`$[]` updates all elements.

```js
db.orders.updateOne(
  { _id: orderId },
  { $set: { "items.$[].status": "checked" } }
);
```

`$[identifier]` updates elements matching array filter.

```js
db.orders.updateOne(
  { _id: orderId },
  { $set: { "items.$[item].qty": 10 } },
  { arrayFilters: [{ "item.productId": "p1" }] }
);
```

## Section 4: Indexing

### 31. Why are indexes important?

Indexes help MongoDB find data faster.

Without index:

```text
MongoDB scans all documents.
```

With index:

```text
MongoDB jumps quickly to matching documents.
```

Example:

```js
db.users.createIndex({ email: 1 });
```

Interview answer:

```text
Indexes improve read performance by helping MongoDB find documents without scanning the whole collection.
```

### 32. How does MongoDB index work internally?

MongoDB indexes are usually B-tree based structures.

Simple meaning:

```text
Index keeps field values sorted with pointers to documents.
```

Example:

```text
email index:
amit@example.com  -> document location
paras@example.com -> document location
```

This makes search faster.

### 33. What is a compound index?

A compound index is an index on multiple fields.

Example:

```js
db.orders.createIndex({ customerId: 1, createdAt: -1 });
```

Good for query:

```js
db.orders.find({ customerId: "c1" }).sort({ createdAt: -1 });
```

Important:

```text
Field order matters in compound indexes.
```

### 34. What is a multikey index?

Multikey index is created when indexing an array field.

Example:

```js
db.products.createIndex({ tags: 1 });
```

Document:

```json
{
  "name": "Laptop",
  "tags": ["electronics", "computer"]
}
```

MongoDB indexes each array value.

### 35. What is a unique index?

Unique index prevents duplicate values.

Example:

```js
db.users.createIndex({ email: 1 }, { unique: true });
```

Use case:

```text
No two users should have same email.
```

### 36. What is a sparse index?

Sparse index includes only documents that have the indexed field.

Example:

```js
db.users.createIndex({ phone: 1 }, { sparse: true });
```

If some users do not have `phone`, they are not included in the index.

### 37. What is a partial index?

Partial index indexes only documents matching a filter.

Example:

```js
db.users.createIndex(
  { email: 1 },
  { partialFilterExpression: { status: "active" } }
);
```

Meaning:

```text
Only active users are indexed.
```

### 38. What is a TTL index?

TTL means Time To Live.

TTL index automatically deletes documents after a time.

Example:

```js
db.otptokens.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 300 }
);
```

Use cases:

- OTP tokens
- temporary sessions
- logs
- password reset tokens

### 39. What is a text index?

Text index is used for text search.

Example:

```js
db.products.createIndex({ name: "text", description: "text" });
```

Search:

```js
db.products.find({ $text: { $search: "gaming laptop" } });
```

### 40. Why can too many indexes slow down writes?

Every insert/update/delete must update indexes also.

More indexes means:

- slower writes
- more storage usage
- more memory usage
- longer index maintenance

Interview answer:

```text
Indexes improve reads but slow writes because MongoDB must update every related index whenever data changes.
```

## Section 5: Aggregation Framework

### 41. What is the Aggregation Pipeline?

Aggregation pipeline processes data step by step.

Think of it like:

```text
filter -> group -> sort -> shape output
```

Example:

```js
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);
```

### 42. Explain $match.

`$match` filters documents.

It is like `find()`.

Example:

```js
db.orders.aggregate([
  { $match: { status: "paid" } }
]);
```

Tip:

```text
Put $match early to reduce data for next stages.
```

### 43. Explain $group.

`$group` groups documents and calculates values.

Example:

```js
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalAmount: { $sum: "$amount" },
      orderCount: { $sum: 1 }
    }
  }
]);
```

### 44. Explain $project.

`$project` chooses or creates fields in output.

Example:

```js
db.users.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1
    }
  }
]);
```

### 45. Explain $lookup.

`$lookup` joins collections.

Example: join orders with users.

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  }
]);
```

Simple meaning:

```text
Bring related documents from another collection.
```

### 46. Difference between $lookup and embedding.

Embedding:

```text
Data is stored inside same document.
Fast reads.
Good when data is read together.
```

`$lookup`:

```text
Data is stored in separate collections.
Joined during query.
Good when data is large or shared.
```

### 47. Explain $sort, $limit, and $skip.

`$sort` sorts documents.

`$limit` limits results.

`$skip` skips documents.

Example:

```js
db.orders.aggregate([
  { $sort: { createdAt: -1 } },
  { $skip: 20 },
  { $limit: 10 }
]);
```

For large collections:

```text
Avoid large skip. Use cursor-based pagination.
```

### 48. Explain $unwind.

`$unwind` breaks array items into separate documents.

Example document:

```json
{
  "orderId": 1,
  "items": ["Mouse", "Keyboard"]
}
```

Aggregation:

```js
db.orders.aggregate([
  { $unwind: "$items" }
]);
```

Output:

```text
One document for Mouse
One document for Keyboard
```

### 49. Explain $facet.

`$facet` runs multiple pipelines in one query.

Example:

```js
db.orders.aggregate([
  {
    $facet: {
      totalOrders: [{ $count: "count" }],
      paidOrders: [{ $match: { status: "paid" } }, { $count: "count" }]
    }
  }
]);
```

Use case:

```text
Pagination data + total count in one aggregation.
```

### 50. Explain $bucket.

`$bucket` groups documents into ranges.

Example:

```js
db.products.aggregate([
  {
    $bucket: {
      groupBy: "$price",
      boundaries: [0, 1000, 5000, 10000],
      default: "10000+",
      output: {
        count: { $sum: 1 }
      }
    }
  }
]);
```

Use case:

```text
Group products by price ranges.
```

## Section 6: Advanced and Frequently Asked

### 51. What is replication?

Replication means keeping copies of data on multiple MongoDB servers.

Why:

- high availability
- backup
- failover

### 52. What is a Replica Set?

A replica set is a group of MongoDB nodes.

Usually:

```text
1 primary
multiple secondary nodes
```

Primary handles writes.

Secondary copies data from primary.

### 53. How does Primary-Secondary replication work?

Flow:

```text
Client writes to primary.
Primary records operation in oplog.
Secondaries copy and apply oplog.
```

### 54. What happens if the primary node fails?

Replica set elects a new primary.

This is called failover.

During election, writes may pause briefly.

### 55. What is Read Preference?

Read preference controls where reads go.

Examples:

- primary
- secondary
- nearest

Use secondary reads only when stale data is acceptable.

### 56. What is Write Concern?

Write concern controls how many nodes must confirm a write.

Example:

```js
{ w: "majority" }
```

Meaning:

```text
Write is confirmed by majority of replica set nodes.
```

### 57. What is Journaling?

Journaling writes changes to a journal before applying them.

Why:

```text
It helps recover data after crash.
```

### 58. What are transactions?

Transaction means multiple operations succeed together or fail together.

Example:

```text
Debit wallet
Create order
Update inventory
```

If one fails, all should rollback.

### 59. How do transactions work internally?

Basic steps:

1. Start session.
2. Start transaction.
3. Run operations.
4. Commit if all succeed.
5. Abort if any fail.

Example:

```js
const session = await mongoose.startSession();

try {
  session.startTransaction();

  await Order.create([orderData], { session });
  await Product.updateOne(
    { _id: productId },
    { $inc: { stock: -1 } },
    { session }
  );

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
} finally {
  session.endSession();
}
```

### 60. What are ACID properties in MongoDB?

ACID means:

```text
Atomicity    -> all or nothing
Consistency -> data remains valid
Isolation   -> transactions do not disturb each other
Durability  -> committed data is saved
```

### 61. What is sharding?

Sharding means splitting data across multiple servers.

Why:

```text
One server cannot handle unlimited data or traffic.
```

MongoDB uses sharding for horizontal scaling.

### 62. How does MongoDB distribute data?

MongoDB splits data into chunks.

Chunks are distributed across shards.

Simple flow:

```text
collection -> chunks -> shards
```

### 63. What is a shard key?

Shard key is the field MongoDB uses to distribute data.

Example:

```js
{ customerId: 1 }
```

Bad shard key can cause uneven data distribution.

### 64. How do you choose a good shard key?

Good shard key should:

- have high cardinality
- distribute writes evenly
- match common queries
- avoid hot partitions

Bad shard key:

```text
status: active/inactive
```

Why bad:

```text
Only few values, data distribution is poor.
```

### 65. What is chunk migration?

Chunk migration means MongoDB moves chunks from one shard to another.

Why:

```text
To balance data between shards.
```

### 66. What is Balancer?

Balancer is MongoDB process that keeps shards balanced.

It moves chunks when some shards have too much data.

### 67. What is Query Planner?

Query planner decides how MongoDB should run a query.

It chooses:

- collection scan
- index scan
- best available index

### 68. Explain explain() output.

`explain()` shows how MongoDB executed a query.

Example:

```js
db.users.find({ email: "paras@example.com" }).explain("executionStats");
```

Important fields:

```text
COLLSCAN -> collection scan, usually bad for large data
IXSCAN   -> index scan, usually good
totalDocsExamined -> how many documents MongoDB checked
totalKeysExamined -> how many index keys checked
executionTimeMillis -> query time
```

### 69. What is a Covered Query?

A covered query is answered fully from index.

MongoDB does not need to read full documents.

Example:

```js
db.users.createIndex({ email: 1, name: 1 });

db.users.find(
  { email: "paras@example.com" },
  { email: 1, name: 1, _id: 0 }
);
```

### 70. How do you optimize slow MongoDB queries?

Step-by-step:

1. Run `explain("executionStats")`.
2. Check if query uses index.
3. Check `totalDocsExamined`.
4. Add proper index.
5. Use projection.
6. Avoid large skip.
7. Reduce `$lookup` if possible.
8. Put `$match` early in aggregation.
9. Limit returned data.

### 71. How do you identify missing indexes?

Signs:

- `COLLSCAN` in explain
- high `totalDocsExamined`
- query slow on large data
- frequent filter/sort fields have no index

Example:

```js
db.users.find({ email: "paras@example.com" }).explain("executionStats");
```

If output shows `COLLSCAN`, add index.

### 72. What are execution statistics?

Execution statistics show query performance details.

Check:

- execution time
- documents examined
- keys examined
- index used
- documents returned

### 73. Difference between count() and countDocuments().

`count()` is older and can be inaccurate in some cases.

`countDocuments()` counts matching documents accurately.

Use:

```js
db.users.countDocuments({ status: "active" });
```

### 74. Difference between estimatedDocumentCount() and countDocuments().

`estimatedDocumentCount()` is fast but approximate.

```js
db.users.estimatedDocumentCount();
```

`countDocuments()` is accurate but can be slower.

```js
db.users.countDocuments({ city: "Bangalore" });
```

### 75. What is Change Stream?

Change Stream listens to changes in collection.

Use cases:

- real-time notifications
- sync systems
- audit logs

Example:

```js
db.orders.watch();
```

### 76. What are MongoDB Views?

View is a saved aggregation query.

It does not store data separately.

Use case:

```text
Show only active users or summarized reports.
```

### 77. Explain Atlas Search.

Atlas Search is MongoDB Atlas feature for advanced search.

It supports:

- full-text search
- autocomplete
- relevance scoring
- fuzzy search

Use it when normal text index is not enough.

### 78. Explain Time Series Collections.

Time Series collections store time-based data.

Use cases:

- IoT data
- metrics
- logs
- stock prices

Example:

```text
temperature readings every minute
```

### 79. Explain Wildcard Indexes.

Wildcard index indexes many fields dynamically.

Example:

```js
db.products.createIndex({ "$**": 1 });
```

Useful when document fields are flexible.

But do not use everywhere blindly because it can increase index size.

### 80. What are Retryable Writes?

Retryable writes allow MongoDB driver to retry certain write operations if network error happens.

Simple meaning:

```text
If temporary network issue happens, driver can safely retry the write.
```

## Section 7: Scenario-Based Questions

### 81. Your query takes 10 seconds. How do you debug it?

Step-by-step:

1. Run `explain("executionStats")`.
2. Check if it uses `COLLSCAN` or `IXSCAN`.
3. Check `totalDocsExamined`.
4. Check if filter/sort fields have index.
5. Use projection.
6. Check if aggregation stages are in good order.
7. Check server CPU/memory.
8. Check if query returns too much data.

Short answer:

```text
I start with explain(), check index usage, documents examined, execution time, sort stage, and then add or adjust indexes based on query pattern.
```

### 82. A collection has 50 million documents. Pagination is slow. How would you improve it?

Problem:

```js
db.orders.find().skip(1000000).limit(20);
```

Large `skip` is slow because MongoDB still walks through skipped records.

Better: cursor-based pagination.

```js
db.orders.find({
  _id: { $lt: lastSeenId }
})
.sort({ _id: -1 })
.limit(20);
```

Add index:

```js
db.orders.createIndex({ _id: -1 });
```

### 83. An index exists but MongoDB is not using it. Why?

Possible reasons:

- query does not match index order
- low selectivity index
- collection scan is cheaper
- wrong compound index order
- query uses different field type
- sort does not match index
- index is partial and filter does not match

Debug:

```js
db.users.find({ email: "a@test.com" }).explain("executionStats");
```

### 84. A document exceeds the 16 MB limit. What would you do?

Fix:

- split large arrays into separate collection
- use references
- store files in GridFS/object storage
- keep only summary data in parent document

Example:

```text
Do not store all comments inside post if comments can grow forever.
```

### 85. Write operations have become slow after adding several indexes. Why?

Because every write must update all indexes.

Fix:

- remove unused indexes
- keep only query-needed indexes
- check index usage
- avoid indexing fields with low value

### 86. How would you design a chat application's database?

Collections:

```text
users
conversations
messages
```

Conversation:

```json
{
  "_id": ObjectId("conversation_id"),
  "participantIds": ["user1", "user2"],
  "lastMessage": "Hello",
  "updatedAt": "Date"
}
```

Message:

```json
{
  "conversationId": ObjectId("conversation_id"),
  "senderId": ObjectId("user_id"),
  "text": "Hello",
  "createdAt": "Date",
  "readBy": []
}
```

Indexes:

```js
db.messages.createIndex({ conversationId: 1, createdAt: -1 });
db.conversations.createIndex({ participantIds: 1, updatedAt: -1 });
```

### 87. How would you store product reviews?

If reviews are many, store in separate collection.

Product:

```json
{
  "_id": ObjectId("product_id"),
  "name": "Laptop",
  "averageRating": 4.5,
  "reviewCount": 120
}
```

Review:

```json
{
  "productId": ObjectId("product_id"),
  "userId": ObjectId("user_id"),
  "rating": 5,
  "comment": "Good",
  "createdAt": "Date"
}
```

Index:

```js
db.reviews.createIndex({ productId: 1, createdAt: -1 });
```

### 88. How would you design an inventory management system?

Collections:

```text
products
warehouses
inventory
stock_movements
```

Inventory:

```json
{
  "productId": ObjectId("product_id"),
  "warehouseId": ObjectId("warehouse_id"),
  "quantity": 100
}
```

Stock movement:

```json
{
  "productId": ObjectId("product_id"),
  "warehouseId": ObjectId("warehouse_id"),
  "type": "OUT",
  "quantity": 2,
  "createdAt": "Date"
}
```

### 89. Users frequently search by name and email. What indexes would you create?

If exact email search:

```js
db.users.createIndex({ email: 1 }, { unique: true });
```

If name search:

```js
db.users.createIndex({ name: 1 });
```

If searching both:

```js
db.users.createIndex({ name: 1, email: 1 });
```

For text search:

```js
db.users.createIndex({ name: "text", email: "text" });
```

### 90. How would you migrate data from SQL to MongoDB?

Step-by-step:

1. Understand SQL tables and relationships.
2. Identify read patterns.
3. Decide embed vs reference.
4. Export SQL data.
5. Transform rows into MongoDB documents.
6. Import into MongoDB.
7. Create indexes.
8. Validate counts and sample records.
9. Run both systems in parallel if needed.
10. Switch traffic carefully.

## Section 8: Coding Query Questions

### 91. Find duplicate documents by email.

```js
db.users.aggregate([
  {
    $group: {
      _id: "$email",
      count: { $sum: 1 },
      ids: { $push: "$_id" }
    }
  },
  { $match: { count: { $gt: 1 } } }
]);
```

### 92. Remove duplicate documents by email.

Keep first document and delete remaining duplicates.

```js
db.users.aggregate([
  {
    $group: {
      _id: "$email",
      ids: { $push: "$_id" },
      count: { $sum: 1 }
    }
  },
  { $match: { count: { $gt: 1 } } }
]).forEach((doc) => {
  doc.ids.shift();
  db.users.deleteMany({ _id: { $in: doc.ids } });
});
```

### 93. Return the top 5 highest-paid employees.

```js
db.employees.find()
  .sort({ salary: -1 })
  .limit(5);
```

### 94. Find the second-highest salary.

```js
db.employees.find()
  .sort({ salary: -1 })
  .skip(1)
  .limit(1);
```

For distinct salaries:

```js
db.employees.aggregate([
  { $group: { _id: "$salary" } },
  { $sort: { _id: -1 } },
  { $skip: 1 },
  { $limit: 1 }
]);
```

### 95. Count users by city.

```js
db.users.aggregate([
  {
    $group: {
      _id: "$city",
      totalUsers: { $sum: 1 }
    }
  }
]);
```

### 96. Calculate monthly sales.

```js
db.orders.aggregate([
  { $match: { status: "paid" } },
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      totalSales: { $sum: "$amount" }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
]);
```

### 97. Join Orders and Users using $lookup.

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" }
]);
```

### 98. Flatten nested arrays using $unwind.

```js
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $project: {
      orderId: 1,
      productName: "$items.name",
      quantity: "$items.quantity"
    }
  }
]);
```

### 99. Calculate average ratings.

```js
db.reviews.aggregate([
  {
    $group: {
      _id: "$productId",
      averageRating: { $avg: "$rating" },
      reviewCount: { $sum: 1 }
    }
  }
]);
```

### 100. Find products never ordered.

```js
db.products.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "items.productId",
      as: "orders"
    }
  },
  { $match: { orders: { $size: 0 } } }
]);
```

### 101. Implement pagination with sorting.

Basic pagination:

```js
db.orders.find()
  .sort({ createdAt: -1 })
  .skip(20)
  .limit(10);
```

Better cursor pagination:

```js
db.orders.find({
  createdAt: { $lt: lastCreatedAt }
})
.sort({ createdAt: -1 })
.limit(10);
```

Index:

```js
db.orders.createIndex({ createdAt: -1 });
```

### 102. Return latest order per customer.

```js
db.orders.aggregate([
  { $sort: { createdAt: -1 } },
  {
    $group: {
      _id: "$customerId",
      latestOrder: { $first: "$$ROOT" }
    }
  }
]);
```

### 103. Update nested array elements.

```js
db.orders.updateOne(
  { _id: orderId },
  { $set: { "items.$[item].status": "cancelled" } },
  {
    arrayFilters: [
      { "item.productId": productId }
    ]
  }
);
```

### 104. Delete duplicate emails.

```js
db.users.aggregate([
  {
    $group: {
      _id: "$email",
      ids: { $push: "$_id" },
      count: { $sum: 1 }
    }
  },
  { $match: { count: { $gt: 1 } } }
]).forEach((user) => {
  user.ids.shift();
  db.users.deleteMany({ _id: { $in: user.ids } });
});
```

### 105. Find users inactive for the last 6 months.

```js
db.users.find({
  lastLoginAt: {
    $lt: new Date(new Date().setMonth(new Date().getMonth() - 6))
  }
});
```

## Section 9: App-Specific MongoDB Notes

### 106. Explain MongoDB design of this MERN app.

This app has collections like:

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

Simple design:

- `accounts` handles login/auth.
- `users` stores managed users.
- `userprofiles` stores extra user profile details.
- `skills` stores skill master data.
- `userskills` connects users and skills.
- `teams` stores team details.
- `teammemberships` connects users and teams.
- `otptokens` stores temporary OTP data.

### 107. How Account and User are related?

Account is for authentication.

User is business data managed inside app.

This separation is useful because login identity and managed user records are different concepts.

### 108. How User and Skill are related?

User and Skill are many-to-many.

One user can have many skills.

One skill can belong to many users.

Use join collection:

```text
userskills
```

### 109. Why use indexes in this app?

Indexes help:

- prevent duplicate email
- speed up search
- speed up filters
- speed up joins
- improve pagination

Example:

```js
db.users.createIndex({ ownerAccountId: 1, email: 1 }, { unique: true });
```

### 110. Why use TTL index for OTP tokens?

OTP should expire automatically.

Example:

```js
db.otptokens.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 300 }
);
```

This removes old OTP records after 5 minutes.

## Most Important Short Answers

### 111. MongoDB in one line

```text
MongoDB is a NoSQL document database that stores data as BSON documents inside collections.
```

### 112. Collection in one line

```text
A collection is a group of MongoDB documents, similar to a table in SQL.
```

### 113. Document in one line

```text
A document is one record in MongoDB, stored in BSON format.
```

### 114. Index in one line

```text
An index helps MongoDB find data faster without scanning the whole collection.
```

### 115. Aggregation in one line

```text
Aggregation is a pipeline that processes documents step by step for filtering, grouping, joining, and reporting.
```

### 116. Sharding in one line

```text
Sharding splits data across multiple servers for horizontal scaling.
```

### 117. Replication in one line

```text
Replication keeps copies of data on multiple servers for high availability.
```

### 118. Transaction in one line

```text
A transaction makes multiple operations succeed together or fail together.
```

## Final MongoDB Interview Checklist

Before interview, revise:

- MongoDB vs SQL
- BSON and ObjectId
- embed vs reference
- one-to-one, one-to-many, many-to-many
- CRUD differences
- update operators
- positional operators
- indexes and index types
- compound index order
- aggregation stages
- `$lookup` vs embedding
- replication and replica set
- transactions and ACID
- sharding and shard key
- `explain()` output
- query optimization
- slow pagination
- coding queries

Final confidence answer:

```text
In MongoDB, I focus first on schema design based on query patterns. Then I add proper indexes, use aggregation for reporting, avoid unbounded arrays, use references where data grows, use transactions only when needed, and debug slow queries using explain().
```
