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

Embedded document means one document kept inside another document.

Think like this:

```text
User is the main document.
Address belongs to that user.
So we can keep address inside user.
```

In simple words:

```text
When related data is stored inside the same parent document, it is called embedded document.
```

Example:

```json
{
  "_id": "user1",
  "name": "Paras",
  "email": "paras@example.com",
  "address": {
    "city": "Bangalore",
    "state": "Karnataka",
    "country": "India"
  }
}
```

Here `address` is an embedded document because it is stored inside the `user` document.

Another example:

```json
{
  "orderId": "ORD001",
  "customerName": "Paras",
  "items": [
    {
      "productName": "Keyboard",
      "price": 1200,
      "quantity": 1
    },
    {
      "productName": "Mouse",
      "price": 500,
      "quantity": 2
    }
  ]
}
```

Here each object inside `items` is embedded inside the order document.

Use embedding when:

- data is usually read together
- child data belongs only to parent
- child data is small
- child data does not grow without limit

Good examples:

```text
User -> address
Order -> order items
Product -> specifications
Profile -> social links
```

Why we use embedded documents:

```text
If parent and child data are usually needed together, embedding makes reading faster because MongoDB can get everything in one query.
```

When not to embed:

```text
Do not embed if child data can grow too much, like thousands of comments inside one post. In that case, use a separate collection and reference.
```

Interview answer:

```text
Embedded documents are nested documents stored inside another MongoDB document. We use them when related data belongs to the parent and is usually read together. For example, storing address inside user or order items inside order.
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

Yes, that is exactly correct. In MongoDB, a projection is used to specify or restrict the fields returned from a query. Instead of transferring entire documents over the network, projection allows you to filter the data at the database level.

Projection is passed as the second argument to the find() method:

Key Rules of Projection
- Inclusion (1 or true): Specifies the exact fields you want to return. All other fields are automatically excluded.
- Exclusion (0 or false): Specifies fields you want to omit. All unlisted fields are returned.
- The _id Exception: The _id field is always returned by default. You must explicitly set _id: 0 to remove it.
- No Mixing: You cannot mix inclusion and exclusion rules in a single projection document (e.g., { name: 1, age: 0 } throws an error). The only exception to this rule is suppressing the _id field while including other fields.

Common Examples
- Return only specific fields:

// Returns ONLY the 'name', 'email', and default '_id' fields
```js
db.users.find({}, { name: 1, email: 1 })
```

- Return specific fields without _id:
// Returns ONLY 'name' and 'email'
```js
db.users.find({}, { name: 1, email: 1, _id: 0 })
```

- Exclude a noisy field:
// Returns all document fields EXCEPT the 'password' field
```js
db.users.find({}, { password: 0 })
```

Example:

```js

db.collection.find( { <query_filter> }, { <projection> } )

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

### 32. How to create an index in MongoDB?
MongoDB has a createIndex() function to create various types of indexes, such as single-field indexes, text indexes, and 2D indexes. The method has two input parameters: keys defining the columns to index and other options.

Syntax:
```js
db.collection.createIndex(keys, options)
```

- Keys: { field1: 1, field2: -1, ... }, 1 for ascending order and -1 for descending order
- Options: {unique: true}, {sparse: true}, { expireAfterSeconds: 3600 }

Example:

```js
db.users.createIndex({ email: 1 }, { unique: true });
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

An aggregation pipeline in MongoDB is a framework used to process and analyze data by passing documents through a multi-stage sequence. Each stage transforms the documents as they pass through, allowing you to filter, group, sort, and calculate results.

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

### 72. How to implement aggregation in MongoDB?<br/>
Aggregation typically contains three stages: match, group, and sort. Let’s see how we can implement these in code.

Example “products” document:

```js
[
  { "_id": 1, "product_id": "t2409", "amount": $250, "status": "done" },
  { "_id": 2, "product_id": "t2009", "amount": $300, "status": "done" },
  { "_id": 3, "product_id": "t1309", "amount": $150, "status": "pending" },
  { "_id": 4, "product_id": "t1919", "amount": $480, "status": "done" },
  { "_id": 5, "product_id": "t5459", "amount": $120, "status": "pending" },
  { "_id": 6, "product_id": "t3829", "amount": $280, "status": "done" }
]
```

- $match: To filter documents based on a condition
- $group: This groups the data and applies aggregation operation
- $sort: Order the output documents as you need

Example:

```js
db.products.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$product_id", totalAmount: { $sum: "$amount" },
  { $sort
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

Replication is a technique in MongoDB to copying and syncing documents data across multiple database servers. It uses a group of instances called a replica set to keep identical data. This setup provides high availability, data redundancy, and automatic recovery if a server crashes.

Replication copies an entire collection (or database/table), not just a single document. It is an ongoing process that keeps entire sets of data in sync across different servers. When a single document changes, that specific change is sent to update the replicated collection.

Why:

- high availability
- backup
- failover

### 52. What is a Replica Set?

A replica set is a group of MongoDB nodes/instances.

A replica set in MongoDB is a group of mongod database instances that maintain the same data set to provide data redundancy, fault tolerance, and high availability. It consists of a single primary node, multiple secondary nodes, and optionally an arbiter node.

Core Components
- Primary Node: Receives and processes all write operations from client applications, logging every data change into its oplog (operations log).
- Secondary Nodes: Copy the primary node's oplog asynchronously and apply the changes to maintain an identical copy of the data. They can also be configured to handle read operations.
- Arbiter Node: Does not hold any data or accept writes; it is used strictly to cast votes during automated primary elections to help achieve a voting majority.

Key Features
- Automatic Failover: If the primary node goes offline or stops responding, the remaining nodes hold an election to automatically promote a secondary node to the primary role.
- Read Scaling: Client applications can direct read queries to secondary nodes to reduce the load on the primary.
- Quorum Requirement: Most configurations require an odd number of voting members (minimum of 3 nodes recommended) to ensure proper consensus during elections.

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

Journaling in MongoDB is a safety mechanism that uses a write-ahead log (WAL) to provide crash resiliency and ensure data durability. It intercepts write operations and commits them to a sequential log on the disk before modifying the primary data files. This guarantees that if the server crashes or loses power unexpectedly, the system can fully recover missing data upon restarting.

How Journaling Works<br/>
MongoDB's default storage engine, WiredTiger, coordinates RAM, journal logs, and data files to handle writes.
- In-Memory Write: A client sends a write request (insert, update, delete). WiredTiger records the modification inside an in-memory buffer.
- Journal Logging: The database appends the operation details sequentially into the journal file on disk. By default, this flush occurs every 100 milliseconds.
- Data File Checkpoint: Every 60 seconds (or when 2 GB of journal data accumulates), WiredTiger creates a checkpoint, permanently flushing the modifications from RAM into the main database data files.
- Log Cleanup: Once a checkpoint succeeds, the old journal logs spanning before that timestamp are discarded because they are safely recorded in the data files.

The Recovery Process After a Crash<br/>
If the mongod process stops abruptly between checkpoints, data sitting in the volatile RAM is lost. Upon restarting, the database automatically performs the following steps:
- Identifies the ID of the last successful checkpoint inside the data files.
- Searches the journal files for records matching that checkpoint ID.
- Replays all operations written in the journal after that point, restoring the data to its proper state.

Controlling Journaling with Write Concern<br/>
Developers can enforce how safe a write operation must be using MongoDB's writeConcern configuration:
- Default Behavior (j: false / unspecified): MongoDB acknowledges a write command as soon as it updates the memory buffer. There is a minor 100ms vulnerability window where data could be lost if a hard crash occurs before the next journal flush.
- Immediate Durability (j: true): MongoDB will not send a "success" response back to the client application until the write log is safely written to the disk journal.

An execution example in Node.js or Mongo Shell:
```js
db.users.insertOne(
  { name: "John Doe", email: "john@example.com" },
  { writeConcern: { w: 1, j: true } } // Forces on-disk journal confirmation
)
```

Important Version Differences<br/>
- MongoDB 6.1 and Newer: Journaling is always enabled. The command-line flags --journal / --nojournal and the configuration property storage.journal.enabled have been deprecated and removed.
- MongoDB 4.0 to 6.0: Journaling is turned on by default for 64-bit systems but can be explicitly turned off manually to prioritize write performance over complete data safety.

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

Sharding is a horizontal scaling technique in MongoDB that splits large datasets (collections) into chunks and distributes them across multiple servers.

Sharding in MongoDB is a method for horizontal scaling that splits large datasets across multiple machines. The key components of a sharded cluster are shards, config servers, and query routers (mongos).

Core Components
- Shards: Store a subset of the actual data; each shard can be run as a replica set for high availability.
- Config Servers: Store metadata and the cluster's data routing configuration.
- Query Routers (mongos): Act as an interface for client applications, directing operations to the correct shard.

How It Works
- Shard Key: A field or group of fields in a collection used to slice data into smaller chunks.
- Distribution Strategies: Split data using either range-based methods (grouping by value ranges) or hashed methods (using an MD5 hash).
- Balancing: MongoDB tracks chunk distribution and auto-migrates data across shards to prevent performance bottlenecks.

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

### 72. where we should store the images, videos and files in nodejs app?
In a Node.js application, you should store images, videos, and files in Cloud Object Storage (like Amazon S3 or Google Cloud Storage) and save only the file metadata and URLs in your database. Storing raw files directly inside a database or on your local server's disk causes severe scaling, performance, and security issues.

The three main storage approaches, ranked from best to worst -<br/>
1. Cloud Object Storage (The Industry Standard) 🌟
You stream the files from your Node.js backend straight to a dedicated third-party storage provider. Your database only keeps a reference string (e.g., https://amazonaws.com).

- Best Options:
  1. General Files/Videos: Amazon S3, Google Cloud Storage, or DigitalOcean Spaces.
  2. Images & Media Optimization: Cloudinary or Uploadcare (they automatically handle resizing and compressions).
- Pros: Highly scalable, cost-effective, faster delivery via Content Delivery Networks (CDNs), and reduces load on your application server.Cons: 
- Requires external API integration and minor additional cloud costs.

2. Local File System (Good for Small/Prototyping Apps Only) 📁<br/>
You use Node.js middleware like Multer or express-fileupload to save files into a local folder (e.g., /public/uploads) on your server's hard drive.- Pros: Easy to implement; no external accounts required.
- Cons: Does not scale. If you deploy your app to multiple server instances or a serverless platform (like AWS Lambda or Vercel), local files will vanish because their file systems are ephemeral (temporary).

3. Inside the Database (Not Recommended) ❌ <br/>
You convert the file into a binary blob (Buffer) and save it directly inside SQL or NoSQL databases like MongoDB or PostgreSQL.
- Pros: Backing up your database backs up your files simultaneously.
- Cons: It severely degrades database read/write speeds, inflates database costs exponentially, and drastically slows down queries.

Recommended Node.js File Architecture<br/>
The diagram below shows the optimal production workflow:
- The user uploads a file.
- The Node.js server acts as a temporary pipeline (using memory storage via Multer) to push the file to the Cloud Bucket.
- The Cloud Bucket returns a public URL.
- The Node.js server saves that text URL into MongoDB/PostgreSQL.
```js

┌────────┐             ┌────────────┐             ┌──────────────┐
│        │  1. Upload  │  Node.js   │  2. Stream  │ Cloud Bucket │
│ Client ├────────────>│  Backend   ├────────────>│  (e.g., S3)  │
│        │             │  (Multer)  │             │              │
│        │<────────────┤            │<────────────┤              │
└────────┘   4. URL    └─────┬──────┘   3. URL    └──────────────┘
             Response        │
                             │ 3.5 Save URL
                             v
                       ┌────────────┐
                       │  Database  │
                       └────────────┘
```
Security & Optimization Checklist<br/>
- Enforce File Size Limits: Always set a strict size ceiling in your Multer configuration (e.g., 5MB for images, 50MB for videos) to prevent Denial of Service (DoS) attacks.
- Validate File Types: Never trust the user's file extension. Check the magic numbers/mime-type of the file buffer to ensure a malicious user isn't uploading an executable .exe disguised as a .jpg.
- Use Presigned URLs for Large Files: For large videos or assets, avoid routing the file through your Node.js server entirely. Generate an AWS S3 "presigned URL" in Node.js, send it to the client, and let the frontend upload directly to S3. This keeps your server memory completely clear.

### 72. How do you perform SQL join equivalent in MongoDB?
MongoDB provides aggregation operators like $lookup to perform SQL equivalent joins.

Syntax:
```js
db.collection_1_name.aggregate([
  {
    $lookup: {
      from: "collection_2_name",  // The other collection to join with
      localField: "field_in_collection_1", // The field on which you want to join
      foreignField: "field_in_collection_2", // The field from the second collection you want to perform join operation
      as: "result_field" // The name of the new field to store the joined result
    }
  }
])
```

Example: 

Say you have order and product collections with data as follows:

“Orders” collection:

```js
[
  { "_id": 1, "product_id": 101, "order_amount": 250 },
  { "_id": 2, "product_id": 102, "order_amount": 300 },
  { "_id": 3, "product_id": 101, "order_amount": 150 }
]
```

“Products” collection:

```js
[
   { "_id": 3789, "product_id": 102, "product_price": $100},
   { "_id": 3970, "product_id": 103, "product_price": $297},
   { "_id": 3509, "product_id": 101, "product_price": $300},
]
```

Join operation:

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "products",              
      localField: "customer_id",       
      foreignField: "_id",             
      as: "customer_info"             
    }
  }
])
```

### 72. How can you optimize MongoDB queries?
To optimize MongoDB queries and minimize database response times, you must ensure your queries perform an index scan (IXSCAN) instead of a full collection scan (COLLSCAN). This is primarily achieved by building strategic indexes, writing highly selective queries, utilizing projection, and refining your pipeline sequences.

1. Master Strategic Indexing <br/>
Indexes are the most impactful tool for database speed. Without them, MongoDB has to read every document in your collection sequentially.
- Follow the ESR Rule: Design compound indexes by ordering fields as Equality filters first, Sort fields second, and Range filters last.
- Run Covered Queries: Ensure your query searches and returns only fields present in the index. This allows MongoDB to return data directly from RAM without pulling documents from disk.
- Use Partial Indexes: Reduce write overhead by only indexing documents that match a filter expression (e.g., indexing status for active users only).
- Minimize Index Bloat: Every index slows down operations like insert and update. Avoid indexing highly volatile or unused fields.

2. Optimize Query & Schema Structures<br/>
How you write queries and structure data impacts CPU and memory consumption.

- Apply Projections: Never use a blanket query that returns full documents. Use .find({}, { field1: 1, field2: 1 }) to isolate and pull only necessary data.
- Avoid Key Slow Operators: Operators like $regex (without a prefix/index), $nin, and massive $in lists force expensive collection scans.
- Embed Data Wisely: Structure your schema to embed heavily related data into a single document. This avoids costly in-application or $lookup joins.

3. Refine Aggregation Pipelines<br/>
Aggregation pipelines process data in stages; their layout dictates efficiency.
- Filter Early: Place $match and $sort stages at the very beginning of your pipeline to leverage index capabilities and filter data volume down fast.
- Order Modifiers Correctly: Always execute $sort prior to $skip and $limit to minimize memory usage.
- Optimize Search Facets: If you use MongoDB Atlas Search, apply $limit before a $facet stage, and use $searchMeta for counts instead of counting the whole pipeline.

4. Implement Pagination Properly<br/>
- Ditch Large Skips: Avoid relying on .skip(10000).limit(10). Large skip values force MongoDB to scan thousands of index entries up to that point.
- Use Keyset Pagination: Paginate securely using the last retrieved value (e.g., querying _id: { $gt: last_id }), which provides immediate, direct access via index lookups.

5. Diagnose with Performance Tools<br/>
- Analyze Plans: Append .explain("executionStats") to your query. Pay close attention to totalDocsExamined versus nReturned; they should ideally be close to 1:1.
- Monitor Metrics: Use the built-in MongoDB Atlas Dashboard or the database profiler to track long-running queries (>100ms).

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

MongoDB views are read-only virtual collections whose contents are computed dynamically using an aggregation pipeline. MongoDB supports standard views, which calculate data on read without storing it to disk, and on-demand materialized views, which store pre-computed results on disk.

Key Characteristics
- Standard Views: Computed on the fly every time you query them; they do not use extra disk storage for data and rely on the indexes of the underlying source collection.
- On-Demand Materialized Views: Pre-computed results stored directly on disk using a $merge or $out aggregation stage, offering faster reads for heavy datasets.
- Read-Only: You cannot perform insert, update, or delete operations directly on a view.
- Creation: Built using the db.createView() method or via platform tools like the MongoDB Atlas UI.

Use case:

```text
Show only active users or summarized reports.
```

How to implement?<br/>
You can implement standard MongoDB views by executing the db.createView() method in your database shell or driver. MongoDB views are read-only virtual collections that do not store computed data on disk; instead, they dynamically run a pre-defined aggregation pipeline every time you query them.

Standard Views (db.createView)<br/>
To create a basic read-only view, provide a view name, a source collection, and an aggregation pipeline array.

```js
db.createView(
  "activeUsersView",     // Name of the view to create
  "users",               // Source collection
  [
    { $match: { status: "active" } },
    { $project: { passwordHash: 0, internalNotes: 0 } } // Hides sensitive fields
  ]
)
```

On-Demand Materialized Views ($merge)<br/>
If your aggregation involves resource-heavy calculations and you need the results cached on disk for fast read performance, implement an On-Demand Materialized View using the $merge stage in a standard aggregation pipeline:

```js
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$amount" }
    }
  },
  { 
    $merge: { 
      into: "customerSpendingReport", // Target collection on disk
      whenMatched: "replace", 
      whenNotMatched: "insert" 
    } 
  }
])
```

Step-by-Step Implementation Guide<br/>
Follow these steps to successfully design and manage your views:<br/>
1. Define Your Purpose
- Data Masking: Create views to exclude personally identifiable information (PII) from specific user roles.
- Pre-computed Fields: Simplify app-side queries by pre-calculating metrics and computed fields.
- Collection Joins: Combine multiple disjoint collections seamlessly.

2. Build and Test the PipelineTest your aggregation pipeline stages on the source collection via db.collection.aggregate() before converting them into a view to verify the final schema shape.

3. Execute View Creation<br/>
- Run the db.createView() command in mongosh.View definitions cannot be altered or renamed directly after execution.
- To alter a view, you must drop it using db.activeUsersView.drop() and recreate it.

4. Query the View<br/>
Interact with your newly built view exactly as you would with a typical, read-only collection:

```js
db.activeUsersView.find({ country: "US" })
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
