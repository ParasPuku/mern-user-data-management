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

1. Data Structure: 
- SQL uses fixed tables, rows, and columns. Relational (Tables, Rows, Columns)
- MongoDB stores data as JSON-like documents. Non-Relational (Collections, BSON Documents)

2. Schema Flexibility: 
- SQL requires a strict schema defined upfront. 
- MongoDB allows dynamic schemas where fields vary by document.

3. Data Relationships: 
- SQL links tables together using foreign keys and JOIN operations. Handles complex connections natively via JOINs
- MongoDB prefers nesting related data inside a single document. Prefers nesting data internally over joins

4. Scalability: 
- SQL scales vertically by adding power to a single server. 
- MongoDB scales horizontally by distributing data across multiple servers.

5. Query Language: 
- SQL uses a standard declarative query language. 
- MongoDB uses object-oriented queries written in JSON syntax.

6. Data Integrity: 
- SQL prioritizes strict transactional consistency (ACID compliance). Strict compliance with ACID standards
- MongoDB prioritizes, high speed and continuous availability. Follows CAP Theorem (prioritizes availability/speed)

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

### 5. What is the default size limit of a document in MongoDB?
The default size limit is 16MB per document.

### 5. Explain ObjectId. How is it generated?

`ObjectId` is the default value for `_id`. ObjectId is a unique identifier automatically generated for each document. It includes a timestamp, machine ID, process ID, and counter.

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

### 7. What are embedded documents in mongoDB?

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

Embeded Query - To query embedded documents (also called nested documents or arrays) in MongoDB, you use dot notation ("array.field"). Here is how you can query the data based on your specific document structure.

1. Match a specific item in the array<br/>
To find orders that contain a specific product, wrap the dot notation path in quotes.

```js
db.orders.find({ "items.productName": "Keyboard" })
```

2. Match multiple conditions inside the same embedded document<br/>
If you want to find an order where a single item meets multiple conditions (e.g., product name is "Mouse" and quantity is 2), use the $elemMatch operator.

```js
db.orders.find({
  items: {
    $elemMatch: { productName: "Mouse", quantity: 2 }
  }
})
```

3. Match by exact array object (Order-sensitive)<br/>
To find an exact match for the entire embedded document, pass the exact object. Note: This requires the fields to be in the exact order they appear in the database.

```js
db.orders.find({
  items: { productName: "Keyboard", price: 1200, quantity: 1 }
})
```

4. Project (Return) only specific fields<br/>
If you want to find the document but only return the customerName and the items, use projection:

```js
db.orders.find(
  { orderId: "ORD001" },
  { customerName: 1, items: 1, _id: 0 }
)
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

### 53. What is Aggregation? How it works? Methods of Aggregation? How to implement it?
MongoDB aggregation is a way to process multiple documents in a collection, group them together, perform operations on them, and return a single combined or computed result. Think of it as an assembly line where raw data goes in, gets filtered, sorted, and rebuilt at different stations, and a finished report comes out the other side.

MongoDB provides three primary methods to perform - <br/>
- aggregation operations: the Aggregation Pipeline (the preferred and most powerful framework), 
- Single-Purpose Aggregation Methods (for simple counts and distinct values), and 
- Map-Reduce (a legacy batch-processing framework).

Aggregation Pipeline<br/>
The aggregation pipeline processes documents through a series of stages. Each stage transforms or computes data before passing the results to the next stage. You run it using db.collection.aggregate().
- $match: Filters documents to pass only those that meet specified conditions (like a WHERE clause in SQL).
- $group: Groups documents together by a key and uses accumulators (like $sum, $avg) to calculate values (like GROUP BY in SQL).
- $sort: Rearranges the order of documents or rrders the documents by specified field values.
- $project: Reshapes documents by adding, removing, or renaming fields.
- $limit / $skip: Restricts or skips the number of documents passed along the pipeline.
- $unwind: Splits an array field from input documents into separate individual documents.

Single-Purpose Aggregation Methods<br/>
These helper methods perform simple, specific operations on a single collection without building a full pipeline.
- db.collection.countDocuments(): Counts the exact number of documents matching a query.
- db.collection.estimatedDocumentCount(): Gives a fast, estimated count of all documents in a collection using collection metadata.
- db.collection.distinct(): Returns an array of unique values for a specified field.

Map-Reduce<br/>
Map-reduce is an older data processing technique that uses custom JavaScript functions (map and reduce) to perform large-scale batch aggregations. It has largely been replaced by the more efficient aggregation pipeline.

How to Implement It (Example)
Imagine an orders collection containing the following documents:

```js
[
  { _id: "12233", "cust_id": "A123", "amount": 50, "status": "paid" },
  { _id: "45444", "cust_id": "A123", "amount": 150, "status": "unpaid" },
  { _id: "11454", "cust_id": "B456", "amount": 100, "status": "paid" },
  { _id: "14566", "cust_id": "B456", "amount": 200, "status": "unpaid" }
]
```

To find the total amount spent by each customer, but only for orders with a status of "A", you implement the aggregate() method like this:

```js
db.orders.aggregate([
  // Stage 1: Filter to keep only status "A"
  { 
    $match: { status: "paid" } 
  },
  
  // Stage 2: Group by customer ID and sum their order amounts
  { 
    $group: { 
      _id: "$cust_id", 
      totalSpent: { $sum: "$amount" } 
    } 
  },
  
  // Stage 3: Sort by highest spender first
  {
    $sort: { totalSpent: -1 }
  }
]);
```

The Final Output:

```js
[
  { "_id": "B456", "totalSpent": 100 },
  { "_id": "A123", "totalSpent": 50 }
]
```

### 54. What is Sharding? How it works? is MongoDb automatically handled Sharding or do we need to configure it?
MongoDB sharding is a method for horizontal scaling that splits large datasets across multiple independent servers or replica sets. It works using a query router (mongos), config servers for metadata, and shards to store data subsets, distributing read and write loads evenly via a chosen shard key.

How Sharding Works<br/>
- Shards: Each shard holds a subset of the data and is deployed as a replica set for high availability.
- Config Servers: Store the cluster's metadata and the routing table that maps data chunks to specific shards.
- Query Routers (mongos): Act as an interface for applications, taking client requests and routing them to the correct shard.
- Shard Key: A field or group of fields in your documents that MongoDB uses to slice and distribute data into continuous blocks called chunks. A background balancer process moves these chunks across shards to keep the load even.

How to Implement Sharding<br/>
1. Start the Config Server Replica Set<br/>
Launch a 3-node replica set to act as the config server (configsvr).

2. Start the Shard Replica Sets<br/>
Launch your individual mongod instances and configure them as separate replica sets (shardsvr).

3. Start the mongos Query Router<br/>
Launch the mongos process pointing to your config server replica set.

4. Add Shards to the Cluster<br/>
Connect to the mongos instance via the Mongo shell (mongosh) and add your shards:

sh.addShard("shard-replica-set-name/host1:27017,host2:27017")

5. Enable Sharding for a Database<br/>
sh.enableSharding("myDatabase")

6. Shard a Collection<br/>
Create an index on your chosen shard key field, then run the shard command:
```js
db.myCollection.createIndex({ "userId": 1 })
sh.shardCollection("myDatabase.myCollection", { "userId": 1 })
```

### 55. In sharding, if one shard is overloaded and the others remain idle. How do you balance this?
Two potential issues could be the inappropriate selection of the shard key and uneven data distribution across shards.

Fix 1: Choose the right shard key

- Choose high cardinality columns as shard keys. That is, a shard key should have many unique values.
- If your workload is write-heavy, ensure your shard key doesn’t direct all writes to a single shard.
-  Choose a shard key that aligns with your most frequent queries. For instance, if your queries often join on a specific field, that field could be an effective shard key.

Fix 2: Rebalance the uneven distribution

This command below provides the overview of data distributed across shards. If the chunks are not well distributed, enable the balancer.

```js
sh.status()
```

The command below gets the balancer's state. If it’s disabled, use the later command to enable it.

```js
sh.getBalancerState()
sh.enableBalancing("db_name.collection_name")
```

### 55. What is Replication? How it works? is MongoDb automatically handled Replication or do we need to configure it?
Replication is the process of copying and synching and keeping data on multiple servers. If one server breaks, another server has the exact same data. This stops data loss and keeps your app online.

In MongoDB, replication uses a group of connected servers called a replica set.

How Replication Works
- Primary Node: This main server takes all write actions (inserts, updates, and deletes). It logs every change in a special list called an oplog.
- Secondary Nodes: These backup servers copy the oplog from the primary node. They run those same changes on their own data copies.
- Automatic Failover: All servers check each other with a quick health signal. If the primary server dies, the backup servers vote and pick a new primary in a few seconds.

Does MongoDB Handle It Automatically?<br/>
MongoDB does not set up replication by default when you spin up a single local instance. You must configure and start a replica set yourself.

However, once you configure it, MongoDB handles the day-to-day replication, syncing, and emergency elections automatically. You configure it once using commands like rs.initiate() on your primary database instance.

How to set up a MongoDB replica set and connect your application code to handle failovers seamlessly.?

Part 1: How to Set Up a MongoDB Replica Set<br/>
To configure replication, you need to start your MongoDB instances with a replica set name and then link them together. For testing, you can run three separate instances on your local machine using different ports.

Step 1: Start three separate MongoDB instances<br/>
Open three separate terminal windows and run these commands to start three nodes (Primary, Secondary 1, and Secondary 2):

```js
# Node 1 (Will become Primary)
mongod --dbpath ./data/db1 --port 27017 --replSet myReplicaSet

# Node 2 (Will become Secondary)
mongod --dbpath ./data/db2 --port 27018 --replSet myReplicaSet

# Node 3 (Will become Secondary)
mongod --dbpath ./data/db3 --port 27019 --replSet myReplicaSet
```
(Note: Ensure the folders ./data/db1, ./data/db2, and ./data/db3 exist before running these commands.)

Step 2: Initialize the Replica Set<br/>
Connect to your first MongoDB instance using the Mongo Shell (mongosh):
```js
mongosh --port 27017
```

Inside the shell, run the initiation command to tell Node 1 about itself and the other two nodes:

```js
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "localhost:27017" },
    { _id: 1, host: "localhost:27018" },
    { _id: 2, host: "localhost:27019" }
  ]
})
```

Step 3: Verify the Status<br/>
Check if the replication group is healthy by running:

```js
rs.status()
```

Look for "ok": 1 and ensure one node is labeled PRIMARY while the others are SECONDARY. Your database will now sync all data automatically.

Part 2: How to Connect Your App for Automatic Failovers<br/>
To ensure your application automatically switches to the new Primary if the original one crashes, you must pass all three node addresses in your database connection string (URI).

Here is how you do it in popular programming environments:

Node.js (with Mongoose)
```js
const mongoose = require('mongoose');

// Include all hosts separated by commas, and add the replica set name
const uri = "mongodb://localhost:27017,localhost:27018,localhost:27019/myDatabase?replicaSet=myReplicaSet";

mongoose.connect(uri)
  .then(() => console.log("Connected to Replica Set!"))
  .catch(err => console.error("Connection error:", err));

// MongoDB driver automatically routes writes to the Primary node
```

Example for replication in mongodb<br/>
Here is a concrete example of how MongoDB replication behaves in real time when you write data, read data, or experience a server crash.

The Setup<br/>
Imagine you run a food delivery app. You have a standard 3-node MongoDB replica set:

- Server A (Primary)
- Server B (Secondary)
- Server C (Secondary)

Scenario 1: Normal Operations (Data Syncing)<br/>
When a user places an order, your app sends the data to the replica set.
- The Write: Your app inserts a new document:  { orderId: 101, status: "Preparing" }.
- Primary Receives It: Server A (Primary) writes this order into its database and logs the action in its oplog (operation log).
- Secondaries Copy It: Server B and Server C constantly watch Server A's oplog. They see the new order, copy it, and apply it to their own databases.
- Result: All three servers now hold the exact same copy of Order 101.

Scenario 2: Server Crash (Automatic Failover)<br/>
Now, imagine a power outage happens at the data center housing Server A, and it goes completely offline.
- Heartbeat Detection: Every 2 seconds, the servers send a "heartbeat" ping to each other. Server B and Server C notice that Server A is not responding.
- The Election: Since the primary is gone, Server B and Server C start an automatic vote. They agree that Server B has the most up-to-date data.
- New Primary: Server B automatically becomes the new Primary. Server C remains a Secondary.
- App Continuity: Your food delivery app automatically notices Server B is the new Primary because of your connection string. The app keeps working smoothly, and users can still place orders without seeing any error screen.

Scenario 3: The Broken Server Returns
The power issue is fixed, and Server A boots back up.
- Re-joining: Server A connects back to the group.
- Role Check: It looks at the group and sees that Server B is already the elected Primary. Server A gracefully accepts this and demotes itself to a Secondary.
- Catching Up: Server A checks Server B's log for any orders placed while it was offline and copies them to catch up.


### 56. What is Replica Set? How it works? is MongoDb automatically handled Sharding or do we need to configure it?
In simple terms, a MongoDB Replica Set is a group of connected MongoDB servers (called nodes) that keep identical copies of your data. Its main job is to protect your application from losing data and going offline if a database server crashes.

The Components of a Replica Set<br/>
A standard replica set needs a minimum of three nodes to work properly. Each node has a specific role:
- Primary Node (The Leader): There is only one primary node. It is the only server that handles write operations (saving, updating, or deleting data). By default, it also handles read operations.
- Secondary Nodes (The Followers): There are usually two or more secondary nodes. They continuously copy data from the Primary node to stay completely synchronized.
- Arbiter Node (Optional): This node doesn't hold any data. It exists purely to vote in elections if one of your data-bearing servers goes down.

How It Works<br/>
MongoDB manages this system automatically through three core processes:<br/>

1. Data Replication (The Oplog)When your application saves data, it goes to the Primary node. The Primary logs every single change inside a special, ongoing history file called the oplog (operations log). The Secondary nodes constantly monitor this oplog, pull the new changes, and apply them to their own copies of the data.

2. Heartbeats (Checking the Pulse)All servers in the replica set "talk" to each other continuously using a heartbeat mechanism. Every 2 seconds, they send a ping to ensure everyone is alive and healthy.

3. Automatic Failover (The Election)If the Primary node crashes or disconnects, the heartbeat stops. If it stays silent for 10 seconds, the Secondary nodes notice and immediately trigger an election. The remaining nodes vote, and one of the Secondary nodes is automatically promoted to be the new Primary. This happens in seconds without requiring manual human intervention.

Why Use a Replica Set?<br/>
- High Availability: If a server catches fire, your app stays online because a secondary node takes over instantly.
- Data Safety (Redundancy): Your data lives in multiple physical locations, protecting you from hardware failures.
- Read Scaling: You can configure your app to read heavy reports from the Secondary nodes, freeing up the Primary node to focus strictly on heavy writing.



### 57. What is Views in MongoDb? How it works with an exmpale?
A View in MongoDB is a saved query that acts like a virtual table. It does not store physical data. When you call a view, MongoDB runs the underlying aggregation pipeline on a source collection to return live data.

Why Use Views in MongoDB<br/>
Views are helpful when you want to:

- hide complexity from application queries
- reuse the same aggregation logic in multiple places
- expose only selected data for reporting or restricted access
- create a cleaner abstraction over large collections

Because views do not store data separately, they consume very little storage. Only the view definition itself is saved.

Types of views in mongodb<br/>
1. Standard Views<br/>
A Standard View is a completely virtual collection. It computes the data on-demand every single time you query it. Computed on the fly every time you query them; they do not use extra disk storage for data and rely on the indexes of the underlying source collection.
- How it works: Think of it as a shortcut or an alias for a complex query.
- Best use case: Hiding sensitive fields for data privacy, or creating simple filters like active_users where data needs to be 100% accurate in real-time.

Standard Views <br/>
- Storage: Virtual. Only the query definition is saved to disk.
- Data Freshness: Real-time. Computes data instantly when read.
- Read Speed: Slower for complex computations.
- Custom Indexes: No. Uses indexes from the underlying base collection.

Creation example:
```js
db.createView("active_users", "users", [{ $match: { status: "active" } }])
```

2. On-Demand Materialized Views<br/>
An On-Demand Materialized View executes an aggregation query and dumps the physical results into a real, concrete collection on disk. Pre-computed results stored directly on disk using a $merge or $out aggregation stage, offering faster reads for heavy datasets.

Materialized Views<br/>
- Storage: Physical. The resulting data is saved to disk.
- Data Freshness: Stale until refreshed. Requires a manual update trigger.
- Read Speed: Fast. Reads directly from stored disk space.
- Custom Indexes: Yes. You can build custom indexes directly on it.

- How it works: It uses the $merge or $out pipeline stages to pre-compute and store data. Because the data is physically sitting on disk, reading from it is incredibly fast. However, it does not auto-update when the source data changes; you must re-run the pipeline to refresh it.
- Best use case: Heavy data analytics, daily sales summaries, or generating data reports where a slight delay in freshness (e.g., cached from 1 hour ago) is acceptable.
- Creation/Refresh example:

```js
db.orders.aggregate([
  { $group: { _id: "$date", totalSales: { $sum: "$price" } } },
  { $merge: { into: "daily_sales_summary", whenMatched: "replace" } }
])
```

Example of a View<br/>
Step 1: Source Collection<br/>
Imagine you have a collection named orders with these documents:

```js
{ item: "Apple", status: "completed", price: 10 }
{ item: "Banana", status: "pending", price: 5 }
{ item: "Orange", status: "completed", price: 8 }
```

Step 2: Create the View<br/>
You create a view named completed_orders that only shows orders where the status is "completed".

```js
db.createView(
  "completed_orders",
  "orders",
  [
    { $match: { status: "completed" } }
  ]
)
```

Step 3: Query the View<br/>
When you run a find command on the view:

```js
db.completed_orders.find()
```

Step 4: The Result<br/>
MongoDB runs the match filter behind the scenes and returns only the completed items:

```js
{ item: "Apple", status: "completed", price: 10 }
{ item: "Orange", status: "completed", price: 8 }
```

Updating a View<br/>
You cannot change data directly through a view because it is read-only. However, you can update the view's data or modify its definition.

Changing the Data<br/>
- Update the source: Modify the original documents in the base collection.
- Live sync: The view updates automatically because it queries the source collection in real-time.

Changing the View Definition<br/>
- Collisions: You cannot create a view with a name that already exists.
- Drop first: Delete the old view using db.completed_orders.drop().
- Recreate: Run db.createView() again with your new aggregation pipeline.

Data Security and Hiding Fields<br/>
Views are excellent for security. They let you share specific data with a user or client without exposing sensitive information.

Step 1: Source Collection (employees)<br/>
Imagine a collection that contains salaries and home addresses:
- { name: "Alice", role: "Dev", salary: 90000, phone: "555-1234" }
- { name: "Bob", role: "Designer", salary: 75000, phone: "555-5678" }

Step 2: Create a Public View<br/>
You can create a view called public_staff that hides the salary field using the $project stage.

```js
db.createView(
  "public_staff",
  "employees",
  [
    { $project: { name: 1, role: 1, phone: 1, salary: 0 } }
  ]
)
```

Step 3: Grant Access<br/>
- Restrict collection: Block the public database user from reading the employees collection.
- Allow view: Grant that same user read access only to the public_staff view.
- Result: The user can see names and roles but has no way to access the salary data.


### 58. What is Projection? How it works with an example?

Projection in MongoDB means picking only the specific fields you want to see in your query results. It helps you save network bandwidth by not sending extra data you do not need.

Projection in MongoDB is a way to choose which fields to show or hide in your search results. It helps you get only the data you need. This saves time and memory.

MongoDB Projection is a special feature allowing you to select only the necessary data rather than selecting the whole set of data from the document. For Example, If a Document contains 10 fields and only 5 fields are to be shown the same can be achieved using the Projections. 

How Projection Works?<br/>
- You pass a second argument to the find() method.
- You use a value of 1 to include a field.
- You use a value of 0 to exclude a field.
- You cannot mix 1 and 0 in the same query, except for the default _id field.
- The _id field is always shown by default unless you set it to 0.

Code Example<br/>
Imagine a collection named users with this document:

```js
{
  "_id": 1,
  "name": "Alice",
  "age": 25,
  "email": "alice@example.com",
  "city": "New York"
}
```

If you only want the name and email fields, run this command:

db.users.find({}, { name: 1, email: 1, _id: 0 })

Result:

```js
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

The four primary projection operators:<br/>
1. The $ Positional Operator
- Limits array data to return only the first element that matches your query condition.
- Requires the array field to be part of your search query filter.
- Works well when searching for a specific item inside an array.Example:

Example: 

```js
// Finds the document and returns ONLY the first semester grade that is 85 or higher
db.students.find(
  { grades: { $gte: 85 } }, 
  { "grades.$": 1 }
)
```

2. The $elemMatch Operator<br/>
- Limits array data to return only the first element that matches a specific criteria.
- Does not require the array field to be in your search query filter.
- Allows you to project based on conditions completely separate from your search query.

Example:

```js
// Finds all active students, but only returns the first book that matches the category
db.students.find(
  { status: "active" }, 
  { books: { $elemMatch: { category: "science" } } }
)
```

3. The $slice Operator<br/>
- Controls the number of items returned from an array.
- Accepts a single number to return the first n or last -n elements.
- Accepts an array [skip, limit] to skip a specific number of items and return a set limit.

```js
// Returns only the first 3 comments from the array
db.posts.find({}, { comments: { $slice: 3 } })

// Skips the first 2 comments and returns the next 5 comments
db.posts.find({}, { comments: { $slice: [2, 5] } })
```

4. The $meta Operator
- Returns metadata associated with the document.
- Used primarily with text search to return the relevance score of a text index search.
- Helps sort or display results based on how well they match your text search keyword.

Example:
```js
// Returns the text search relevance score under a new field called "score"
db.articles.find(
  { $text: { $search: "database" } },
  { score: { $meta: "textScore" } }
)
```

### 61. What is $lookup? How joining two collections work with an example?
In MongoDB, $lookup is a tool that joins data from two different collections. It works like an SQL LEFT OUTER JOIN. It looks at a field in your first collection, finds matching documents in a second collection, and adds those matches into your main documents as a new array field.

How $lookup Works<br/>
- From Collection: You start with your main collection.
- Local Field: This is the field in your main collection.
- Foreign Field: This is the matching field in the second collection.
- As: This is the name of the new field that holds the joined data.

Example: Orders and Customers<br/>
Imagine you have two collections in your database.

1. The orders collection<br/>
```js
{ "_id": 1, "item": "Laptop", "customerId": 101 }
```

2. The customers collection<br/>
```js
{ "_id": 101, "name": "Alice", "city": "New York" }
```

3. The Query<br/>
You want to attach customer details to each order. You run this aggregation:
```js
{
  "$lookup": {
    "from": "customers",
    "localField": "customerId",
    "foreignField": "_id",
    "as": "customerDetails"
  }
}
```

4. The Result<br/>
MongoDB finds the match where customerId equals _id and outputs this:
```js
{
  "_id": 1,
  "item": "Laptop",
  "customerId": 101,
  "customerDetails": [
    { "_id": 101, "name": "Alice", "city": "New York" }
  ]
}
```

1. Complex Joins (The pipeline Syntax)<br/>
You do not have to rely on a simple single-field match. You can pass variables (let) and run a full multi-step filtering pipeline on the joined collection.

Example<br/>
If you only want to join active users who made a purchase:

```js
{
  "$lookup": {
    "from": "users",
    "let": { "order_user_id": "$userId" },
    "pipeline": [
      { "$match": { 
        "$expr": { "$eq": ["$_id", "$$order_user_id"] },
        "status": "active" 
      }}
    ],
    "as": "activeUserInfo"
  }
}
```

- let: Defines variables from the main collection.
- $$: Used to reference those variables inside the pipeline.

2. Performance and Indexing (Critical)<br/>
$lookup can easily crash your database or slow it down to a crawl if you do not index.

- Missing Index Killers: If your foreignField is not indexed, MongoDB must do a full collection scan for every single document in your main collection.
- The Fix: Always create an index on the foreignField in the target collection.
- Memory Limits: Aggregation stages have a 100MB RAM limit. If your joined data exceeds this, you must pass { allowDiskUse: true } to your query.

3. Self-Joins
You can join a collection to itself. This is incredibly useful for hierarchical data like employee/manager relationships or threaded comment sections.
- Example: Matching a comment's replyToId to the _id of the exact same comments collection.

4. Correlated vs. Uncorrelated Joins
- Uncorrelated (Basic): Standard localField/foreignField matching. Highly optimized by MongoDB internally.
- Correlated (Advanced): Using the pipeline syntax. Gives you ultimate flexibility but requires more processing power.

### 60. What is Explain() method? How it works with an example?
The explain() method in MongoDB is a diagnostic tool that shows how MongoDB executes a query. It tells you what happens behind the scenes when you read, update, or delete data.

What is the Real Use?<br/>
The primary use of explain() is query optimization. It helps you:
- Check Index Usage: See if your query uses an index or scans the entire database.
- Fix Slow Queries: Pinpoint exactly why a specific database request is running slowly.
- Compare Performance: Test different index strategies to find the fastest execution path.
- Analyze Execution Statistics: View exact metrics like execution time and the number of documents scanned.

How it Works (With an Example)<br/>
Imagine you have a users collection with 1 million documents. You want to find a user named "Alice".

1. The Setup<br/>
Without explain(), you run this query:

```js
db.users.find({ name: "Alice" })
```

2. Using Explain<br/>
To see how MongoDB finds Alice, append .explain() to your query:

```js
db.users.find({ name: "Alice" }).explain("executionStats")
```

(Passing "executionStats" provides the most detailed real-world performance data).

3. Reading the Output
MongoDB returns a JSON document. Look for these two critical fields in the output.

stage: Tells you the strategy MongoDB used.<br/>
- COLLSCAN (Collection Scan): MongoDB searched every single one of the 1 million documents from start to finish. This is slow and inefficient.
- IXSCAN (Index Scan): MongoDB used an index (like a book index) to jump straight to "Alice". This is fast and efficient.

nReturned vs totalDocsExamined:<br/>
- nReturned: The number of documents that matched your query (e.g., 1).
- totalDocsExamined: The number of documents MongoDB had to open and look at.
- The Goal: You want totalDocsExamined to match nReturned as closely as possible. If totalDocsExamined is 1,000,000 but nReturned is 1, you need to add an index on the name field.

### 62. What is Embedding? How Embedding works with an example?
In MongoDB, embedding simply means storing related data together inside a single document instead of splitting it across separate tables or collections.

In simple terms, embedding in MongoDB means saving related data together inside a single document instead of splitting it into separate tables or collections.

Unlike traditional relational databases (like SQL) where you create separate tables and link them using foreign keys, MongoDB allows you to nest a JSON-like object (or an array of objects) directly inside a parent document. This structure is known as an embedded document or sub-document.

How Embedding Works<br/>
In a traditional relational database (like MySQL or PostgreSQL), you must create separate tables and connect them using foreign keys and JOIN commands.

MongoDB works differently. Because it uses flexible, JSON-like formats called documents, you can nested objects or arrays directly inside a main document. This concept is called denormalization. When you fetch the main document, all the nested information comes with it automatically in a single database operation.

A Practical Example: E-Commerce Customer<br/>
Imagine you are building a system to store customer data, including their shipping addresses.

The Traditional Way (Referencing / Relational)<br/>
You would need two separate collections, requiring your application to link them manually or run multiple lookups:

Customers Collection:<br/>

```js
{
  "_id": 1,
  "name": "Alice Smith"
}
```

Addresses Collection:<br/>
```js
{
  "_id": 101,
  "customer_id": 1, 
  "city": "New York",
  "zip": "10001"
}
```

The MongoDB Way (Embedding)<br/>
Using the MongoDB Embedding Data Model, you combine everything into one clean document:

```js
{
  "_id": 1,
  "name": "Alice Smith",
  "addresses": [
    {
      "type": "Shipping",
      "city": "New York",
      "zip": "10001"
    },
    {
      "type": "Billing",
      "city": "Los Angeles",
      "zip": "90001"
    }
  ]
}
```

Why Use Embedding? (The Benefits)<br/>
- Faster Performance: The database pulls the user and their addresses all at once. It eliminates the need for slow, resource-heavy join operations.- Atomic Updates: You can safely update the user's name and address at the exact same time. MongoDB guarantees that changes to a single document either succeed completely or fail completely.
- Simpler Code: Your application receives data exactly how it intends to use it, without needing to stitch separate pieces together.

When to Avoid It<br/>
Do not embed your data if the nested information grows continuously without limit (such as millions of log messages for a single server). MongoDB limits a single document's size to 16 Megabytes. For data sets that grow infinitely, storing data in separate collections and referencing them is the safer choice.

1. How to Query Embedded Data<br/>
MongoDB uses dot notation to reach inside arrays and nested objects.

Using our e-commerce example, here is how you find the customer who has a shipping address in New York:<br/>

```js
db.customers.find({ 
  "addresses.city": "New York" 
})
```

2. How to Update Embedded Data<br/>
To modify a specific item inside an embedded array, use the positional operator ($). The $ matches the exact array item that satisfied your query criteria.

Here is how you change the zip code for Alice's New York address:

```js
db.customers.updateOne(
  { _id: 1, "addresses.city": "New York" }, // 1. Find the document and the specific address
  { $set: { "addresses.$.zip": "10002" } }   // 2. Use $ to update ONLY that matched address
)
```

3. Embedding vs. Referencing Decision Matrix

Choose Embedding (All-in-One Folder) If:
- Exclusive Ownership: The nested data belongs strictly to the parent document (e.g., a street address belongs only to that specific user).
- Simultaneous Viewing: Your application always pulls and displays the parent and child data together (e.g., viewing a profile page with its settings).
- Predictable Growth: The data has a natural limit and will never grow indefinitely, keeping the document safely under the 16MB limit.
- Low Modification Frequency: The nested information remains relatively static and does not require constant, high-frequency updates.
- Atomic Requirements: You need to update the parent data and child data at the exact same moment in a single, guaranteed operation.

Choose Referencing (Separate Linked Collections) If:
- Shared Relationships: The data is shared across multiple documents (e.g., many different products point to a single, shared "Electronics" category).
- Unbounded Growth: The child data grows continuously without a clear ceiling (e.g., a single server asset gathering millions of system log entries).
- Independent Access: Your application frequently queries, filters, or paginates the sub-data completely on its own without needing the parent context.
- High-Frequency Writes: The sub-documents are constantly being added or updated, which would otherwise trigger heavy document resizing in an embedded structure.
- Data Duplication Concerns: You want to avoid updating identical information in hundreds of different places when a single shared detail changes.



### 63. Difference between $lookup and Embedding?
Embedding decides how your data is stored on the disk beforehand, whereas $lookup is used to combine separate collections on the fly when you run a query.

The Core Breakdown<br/>
- Embedding (Pre-joined Data): You intentionally save related data inside the same document. Because the data is already together, you use standard, fast search queries (db.collection.find()). No joins are needed.
- $lookup (On-demand Join): You intentionally store your data in separate collections. When you need to see them together, you use the $lookup stage inside an aggregation pipeline to link them together using a shared ID. This is MongoDB's version of a SQL LEFT OUTER JOIN.

Comparison Example: Orders and Products<br/>
Imagine an app where customers place orders for products.<br/>
Scenario A: Using Embedding<br/>

You save the product details directly inside the order document at the moment of purchase.<br/>
- The Stored Document:
```js
{
  "_id": 555,
  "customer": "John Doe",
  "embedded_product": { "name": "Wireless Mouse", "price": 25 }
}
```
- How you query it: You just use standard find. The product info is already there.

```js
db.orders.find({ _id: 555 })
```

Scenario B: Using $lookup<br/>
You keep orders and products in completely separate collections to keep product prices updated globally.

- The Stored Documents:
```js
// Orders Collection
{ "_id": 555, "customer": "John Doe", "product_id": 99 }

// Products Collection
{ "_id": 99, "name": "Wireless Mouse", "price": 25 }
```

- How you query it: You must use $lookup to temporarily stitch them together for your report.
```js
db.orders.aggregate([
  {
    $lookup: {
      from: "products",        // 1. Look at the products collection
      localField: "product_id",// 2. Use the ID from the order
      foreignField: "_id",     // 3. Match it to the ID in products
      as: "product_details"    // 4. Output the result into this new field
    }
  }
])
```

Key Differences Checklist
- Performance: Embedding is lightning fast because MongoDB reads a single contiguous block of disk space. $lookup is slower and memory-heavy because the database must scan multiple collections and stitch them in memory.
- Data Freshness: Embedding can result in stale data (if a product price changes, old embedded orders still show the historical price). $lookup always pulls the absolute latest, live data from the referenced collection.
- Database Size: Embedding can lead to data duplication across documents. $lookup keeps your database normalised and lean by storing data in exactly one place.


### 59. What is Populate in mongodb? How it works with an example?
Populate in MongoDB (specifically using Mongoose) is a way to automatically link documents from different collections together, similar to a "JOIN" operation in traditional SQL databases.

Populate in MongoDB (specifically using Mongoose) automatically replaces specific ID references in a document with the actual data from another collection. It works like a SQL JOIN but is handled at the application level by making extra database queries under the hood.

MongoDB stores data as independent documents, but sometimes you need to reference data from another collection without duplicating it. Populate automatically replaces a specified ID in a document with the actual data from the referenced document.

How It Works (Step-by-Step)
- Reference: You store a document's unique ID (_id) inside a field of another document.
- Link: You tell Mongoose which collection that ID belongs to using the ref property.
- Populate: When you query the data, you call .populate(). Mongoose reads the ID, fetches the matching document from the other collection, and swaps the ID for the full data.

Code Example<br/>
Imagine an e-commerce application with two collections: Users and Orders.

1. Define the Schemas<br/>
First, tell the Order schema that the userId field points to the User collection.

```js
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // <--- This links it to the User model
  }
});
const Order = mongoose.model('Order', orderSchema);
```

2. The Data in the Database<br/>
Without population, an order document looks like this, showing only a raw ID for the user:

```js
{
  "_id": "65a123456789",
  "productName": "Wireless Headphones",
  "price": 99,
  "userId": "65b987654321" 
}
```

3. Fetching Data WITH Populate<br/>
If you want to display the order details along with the customer's name, use .populate():

```js
// Fetch the order and swap the userId with the actual user document
const fullOrderDetails = await Order.findOne({ productName: "Wireless Headphones" })
                                    .populate('userId');

console.log(fullOrderDetails);
```

4. The Final Output<br/>
Mongoose automatically fetches the user data and embeds it directly into your query result:

```js
{
  "_id": "65a123456789",
  "productName": "Wireless Headphones",
  "price": 99,
  "userId": {
    "_id": "65b987654321",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 64. How to find a slow queries in mongodb?
To find slow queries in MongoDB, you can use the Database Profiler, check the MongoDB server logs, or analyze active requests using the $currentOp aggregation stage. By default, MongoDB logs any query that takes longer than 100 milliseconds to execute.

Here is how to use each method to identify slow operations.

1. The Visual Way: Use MongoDB Atlas Query Profiler<br/>
If you host your database on MongoDB Atlas (the official cloud service), you do not need to write any code.
- Log into your Atlas Account.
- Select your database Cluster.
- Click on the Query Insights tab.
- Click Query Profiler to see a visual chart of your slowest queries.

2. The Built-in Way: Use the Database Profiler
If you are managing MongoDB yourself, you can tell the database to automatically record slow queries into a hidden system list.
Open your MongoDB shell and follow these steps:

1. Turn on the profiler:<br/>
Run this command to log any query that takes longer than 100 milliseconds:

```js
db.setProfilingLevel(1, { slowms: 100 })
```

2. View the slowest query:<br/>
Run this to find the single slowest query recorded:

```js
db.system.profile.find().sort({ millis: -1 }).limit(1)
```

3. Turn it off when done:<br/>
Profiling uses server memory, so turn it off when you finish troubleshooting:
```js
db.setProfilingLevel(0)
```

3. The Live Check: See What is Slow Right Now<br/>
If your database is currently freezing up and you want to see what active query is causing the bottleneck, run this command:
```js
db.currentOp({"secs_running": {$gte: 5}})
```

What to Look for Inside a Slow Query?<br/>
When you extract a slow query using the methods above, look for these two red flags:

- COLLSCAN: This means MongoDB had to do a "Collection Scan," reading every single document in your database because it couldn't find an index.
- High docsExamined vs Low nreturned: This means MongoDB had to look through thousands of documents just to give you back 1 or 2 results.

The Fix: In 90% of cases, you can fix a slow query instantly by creating an Index on the fields you are searching by.

### 54. How to query a document in MongoDB?
In MongoDB, you can query documents using the find() method. To query all documents in a collection, use db.collection_name.find(). The find method has two input parameters: query and projection. The query parameter is used to filter documents that match a specific condition. 

Syntax for query parameter:

```js
db.collection_name.find({condition}) 
```

The second is a projection parameter that indicates the columns to include or exclude in the output. Assign 1 to the columns that you want to fetch. Here is the syntax:

```js
db.collection_name.find({},{column1: 1, column2: 1})
```

### 55. what is gridFS in mongodb?
GridFS is a built-in tool in MongoDB used to store and read large files (like videos, music, and big PDFs) that are too big to fit into a normal database record limit of 16 MB. It cuts large files into small pieces called chunks and saves them as separate parts.

How GridFS Works?<br/>
GridFS splits your file and saves it using two separate parts inside your database:
- Files collection (fs.files): Saves details about your file like the file name, size, and type.
- Chunks collection (fs.chunks): Saves the actual pieces of the file (usually sized at 255 KB each).

When you want to read or download the file later, the system automatically glues all the small pieces back together for you.

When to Use GridFS
- Big Files: Use it when your files are larger than 16 MB.
- Partial Reads: Use it when you need to read only a piece of a big file (like skipping to a timestamp in a movie) without loading the whole thing into your computer's memory.
- Sync Storage: Use it to keep your files backed up alongside your regular data automatically.

Simple example using the standard Node.js driver for MongoDB to upload and read a file.

1. Uploading a File<br/>
This script takes a large video file from your hard drive and streams it into GridFS.

```js
const { MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs');

async function uploadFile() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('myDatabase');
  
  // Create the GridFS bucket
  const bucket = new GridFSBucket(db);

  // Open the file from your computer and stream it into MongoDB
  fs.createReadStream('./large_movie.mp4')
    .pipe(bucket.openUploadStream('my_awesome_movie.mp4'))
    .on('finish', () => {
      console.log('Upload complete! File split into chunks.');
      client.close();
    });
}

uploadFile();
```

2. Reading a File<br/>
This script finds the file by its name, downloads the chunks, and stitches them back together into a new file on your computer.

```js
const { MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs');

async function downloadFile() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('myDatabase');
  
  const bucket = new GridFSBucket(db);

  // Find the file in MongoDB and stream it back to your computer
  bucket.openDownloadStreamByName('my_awesome_movie.mp4')
    .pipe(fs.createWriteStream('./downloaded_movie.mp4'))
    .on('finish', () => {
      console.log('Download complete! File stitched back together.');
      client.close();
    });
}

downloadFile();
```

### 56. What are capped collections in MongoDB?
Capped collections are fixed-size collections in MongoDB that automatically overwrite their oldest documents when they run out of space. They work exactly like a circular queue.

Key Characteristics
- Fixed Size: You set a maximum byte size or document limit during creation.
- First-In, First-Out (FIFO): Once full, the oldest data is deleted to make room for new data.
- Insertion Order: Data is permanently stored in the exact order it was inserted.
- No Sharding: You cannot shard a capped collection.
- No Manual Deletions: You cannot delete individual documents; you can only drop the entire collection.

Common Use Cases
- Application Logs: Storing high-volume logging data without filling up the disk.
- Caching: Keeping a small pool of recently used data readily available.
- Event Tracking: Storing recent user actions or system events in chronological order.

How to Create One<br/>
You must use the createCollection command explicitly to make a capped collection:

```js
db.createCollection("logCollection", { capped: true, size: 5242880, max: 5000 })
```

(This creates a collection capped at 5 MB or 5,000 documents, whichever limit is hit first).

How to Convert a Normal Collection?<br/>
You can convert an existing non-capped collection using the convertToCapped command.

```js
db.runCommand({ convertToCapped: "myOldCollection", size: 10485760 })
```

- Size Requirement: You must specify the size argument in bytes (e.g., 10485760 is 10 MB).
- Blocking Operation: This command takes a exclusive lock on the database. It will block other operations until finished.
- Index Loss: All existing indexes except the _id index are automatically dropped during conversion.

how to query a capped collection?<br/>
You query a capped collection using standard MongoDB find methods, but you can take advantage of special behaviors like guaranteed order and tailable cursors.

1. Basic Queries (Preserving Order)<br/>
By default, a basic search returns documents in the exact order they were inserted. You do not need to create an index or use a .sort() modifier to get chronological order.

```js
// Returns documents from oldest to newest
db.logCollection.find() 
```

2. Reverse Chronological Order<br/>
If you want to view the most recent entries first (like a live feed), use the $natural operator. Sorting by { $natural: -1 } is extremely fast because MongoDB just reads the disk allocation backwards.

```js
// Returns documents from newest to oldest
db.logCollection.find().sort({ $natural: -1 })
```

3. Real-Time Streaming (Tailable Cursors)<br/>
A Tailable Cursor remains open after the client exhausting the initial results. It behaves like the Linux tail -f command, waiting and streaming new data into your application as it is written to the database.

Here is how to implement it using the Node.js driver:
```js
const collection = db.collection('logCollection');

// Create a cursor that stays alive and awaits new data
const cursor = collection.find({}, {
  tailable: true,
  awaitData: true
});

// Stream the new incoming documents continuously
cursor.forEach(doc => {
  console.log("New log received:", doc);
}, err => {
  console.error("Cursor closed due to error:", err);
});
```

### 57. What is the role of the ObjectId?
An ObjectId is a unique ID value. Databases like MongoDB use it as a primary key for records. It helps find, update, or link data items quickly without duplicates.

Key Parts of an ObjectId
- Unique Tag: It ensures every single document in a collection has its own separate ID.
- Time Stamp: The first few bytes store the creation time. You can see when the record was made.
- Machine and Process ID: It includes codes for the server and process that made the ID. This stops conflicts when many servers write data at the same time.
- Counter: A random start number goes up by one each time to keep IDs in order during that second.

Why We Use It
- Fast Creation: Computers make it fast. They do not need to ask a central database for the next number.
- No Clashes: Two different servers can make IDs at the same time without making the same one.
- Easy Sorting: Because it holds the time, you can sort records by when they were made without an extra date column.

How to Query Data with ObjectId?<br/>
Database tools need the actual ID object to find a match. A plain text string will not work.

🖥️ In the MongoDB Shell (Mongosh)
Use the ObjectId() wrapper around your 24-character string:

```js
db.users.findOne({ _id: ObjectId("60c72b2f9b1d8b2bad000001") })
```

🟢 In Node.js (Mongoose / MongoDB Driver)
Import the type from your driver to convert a string into a database ID:

```js
const { ObjectId } = require('mongodb'); 

// Querying the database
const user = await db.collection('users').findOne({ 
  _id: new ObjectId("60c72b2f9b1d8b2bad000001") 
});
```

How to Generate a New ObjectId<br/>
The database automatically makes a new ID when you insert data. You can also make one manually in your code.

🖥️ In the MongoDB Shell
Just call the function without any arguments:

```js
let newId = ObjectId()
print(newId) // Outputs: ObjectId("65c3a2f...")
```

### 58. what is index in mongodb? how it works? types of indexes?
An index in MongoDB is like the alphabetical index at the back of a large book. Instead of reading every single page to find a specific word or topic, you look at the index first to see the exact page number. This helps MongoDB find data very fast.

How It Works Without and With an Index<br/>
- Without an index: MongoDB must look at every single document in a collection. This is called a collection scan and takes a lot of time.
- With an index: MongoDB keeps a small, sorted list of specific fields. It jumps straight to the matching data without checking the rest.

Key Things to Know<br/>
- Faster reads: Searching, filtering, and sorting data become much faster.
- Slower writes: Adding, changing, or deleting data takes a bit more time because MongoDB must update the index too.Uses more space: The database needs extra memory space to store these index lists.
- With an index: MongoDB keeps a small, sorted list of specific fields. It jumps straight to the matching data without checking the rest.

How to Create Core Indexes<br/>
- Single Field Index: Run db.collection.createIndex({ fieldName: 1 }). Use 1 for ascending or -1 for descending order.
- Compound Index: Run db.collection.createIndex({ fieldA: 1, fieldB: -1 }). Order matters here for sorting capabilities.
- Multikey Index: Run db.collection.createIndex({ arrayField: 1 }). MongoDB creates this automatically if the field holds an array.
- Text Index: Run db.collection.createIndex({ description: "text" }). You can only have one text index per collection.
- Geospatial Index: Run db.collection.createIndex({ location: "2dsphere" }) for coordinates stored in GeoJSON format.
- Hashed Index: Run db.collection.createIndex({ userId: "hashed" }) to support even distribution across shards.
- Wildcard Index: Run db.collection.createIndex({ "attributes.$**": 1 }) to index all sub-fields under a dynamic object.

How to Apply Specialized Properties
- Unique Index: Enforce unique values by running db.collection.createIndex({ email: 1 }, { unique: true }).
- Partial Index: Index specific data by running db.collection.createIndex({ status: 1 }, { partialFilterExpression: { rating: { $gt: 5 } } }).
- Sparse Index: Skip missing fields by running db.collection.createIndex({ middleName: 1 }, { sparse: true }).
- TTL Index: Expire data by running db.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }).

How to Check and Verify Usage
- List Existing Indexes: Run db.collection.getIndexes() to see all currently active indexes on a collection.
- Verify Index Usage: Append .explain("executionStats") to your query (e.g., db.collection.find({ age: 25 }).explain("executionStats")).
- Confirming Success: Look for IXSCAN (Index Scan) in the winning plan. Avoid COLLSCAN (Collection Scan), which means MongoDB scanned every document.

### 59. What is a compound index, and when would you use it?
A Compound Index is a single index structure that holds references to multiple fields within a collection's documents. MongoDB allows you to combine up to 32 fields in a single compound index. The order of the fields listed in the index is critical.

When to Use It
- Multi-Field Filters: When your queries frequently filter on more than one field simultaneously (e.g., searching for users by both status and age).
- Filter and Sort Combinations: When you need to filter by one field and sort the results by another field.
- Covered Queries: When the index contains all the fields returned by the query, allowing MongoDB to return results without reading the actual documents.
- The ESR Rule: Always order your index fields by Equalities first, Sort fields second, and Ranges last.

How to Use It<br/>
```js
// Creates a compound index on 'status' (ascending) and 'age' (descending)
db.users.createIndex({ status: 1, age: -1 })

// This index supports queries filtering on:
// 1. both 'status' and 'age'
// 2. 'status' alone (the prefix field)
db.users.find({ status: "active", age: { $gte: 21 } })
```

### 60. What is a TTL Index, when would you use it and how?
A TTL(Time to live) Index is a single-field index that MongoDB uses to automatically remove documents from a collection after a certain amount of time or at a specific clock time. It can only be built on fields that store a Date BSON type.

When to Use It<br/>
- Session Management: Automatically clearing out expired user sessions.
- Temporary Logs: Storing system or application logs that only need to be retained for a rolling 30-day window.
- Verification Tokens: Expiring password reset links or 2FA OTP codes after 10 or 15 minutes.

How to Use It<br/>
```js
// Automatically deletes documents 1 hour (3600 seconds) after the 'createdAt' time
db.sessions.createIndex(
  { createdAt: 1 }, 
  { expireAfterSeconds: 3600 }
)
```

you set up the Time-To-Live (TTL) expiration time by creating a specialized single-field TTL index on a Date field using the expireAfterSeconds option.

You configure this directly on the target collection through the db.collection.createIndex() command, rather than through global database settings.

1. Basic Setup (Expire after a specific duration)<br/>
To delete documents automatically after a specific number of seconds have passed since they were created, index your timestamp field and pass the duration in seconds:

```js
// Expiry after 1 hour (3600 seconds)
db.sessions.createIndex( 
  { "createdAt": 1 }, 
  { expireAfterSeconds: 3600 } 
)
```
- How it works: If a document has a createdAt field set to 10:00 AM, the background thread will flag it for deletion after 11:00 AM.

2. Advanced Setup (Expire at a specific clock time)<br/>
If you want individual documents to expire at completely different, pre-calculated times, set expireAfterSeconds to 0.

```js
// Dynamic expiry setup
db.orders.createIndex( 
  { "expireAt": 1 }, 
  { expireAfterSeconds: 0 } 
)
```

- How it works: When you insert data, you insert the exact future date/time you want that document to disappear (e.g., expireAt: ISODate("2026-12-31T23:59:59Z")).

3. Setup for Time Series Collections<br/>
For high-throughput time series data, you do not use createIndex(). Instead, you define the expiration directly in the collection options using db.createCollection():

```js
db.createCollection("sensorReadings", {
   timeseries: {
      timeField: "timestamp",
      metaField: "sensorId"
   },
   expireAfterSeconds: 604800 // Automatically delete after 7 days
})
```

### 61. What is Text Index, when would you use it and how?
A Text Index tokenizes and stems string content to support full-text search queries inside a collection. It strips out common stop words (like "the", "a", "and") and matches words based on their root forms (e.g., "running" matches "run"). A collection can only have one text index, but that single index can cover multiple fields.

When to Use It<br/>
- Search Bars: Building a search feature for product catalogs, blog articles, or forum posts where users type unstructured text.
- Multi-Language Search: Searching through text fields that support specific global languages.
- Weighted Relevance: When you need to search multiple string fields (like title and body) and give more priority/weight to matches found in the title.

How to Use It<br/>
```js
// Creates a text index on the 'description' field
db.products.createIndex({ description: "text" })

// Query the text index using the $text operator
db.products.find({ $text: { $search: "coffee maker" } })
```

How to perform Multi-field Text Index with Weights?<br/>
Creating the Index with Weights<br/>
When you index multiple fields, you assign a weight to each field. The higher the number, the more influence that field has on the final search relevance score (textScore).

```js
db.articles.createIndex(
  {
    title: "text",
    summary: "text",
    content: "text"
  },
  {
    weights: {
      title: 10,     // Highest priority
      summary: 5     // Medium priority
    },               // 'content' defaults to a weight of 1
    name: "ArticleTextSearchIndex"
  }
)
```

Querying and Sorting by Relevance<br/>

To see the weights in action, you must explicitly project the textScore and sort by it. Otherwise, MongoDB returns the matching documents in natural order rather than by relevance.

```js
db.articles.find(
  { $text: { $search: "database security" } },
  { score: { $meta: "textScore" } }             // Projects the calculated score
).sort(
  { score: { $meta: "textScore" } }             // Sorts highest score first
)
```

Why Use Weights?<br/>
- Matches in Titles Matter More: A document with "database" in the title will rank significantly higher than a document where "database" only appears in the body content.
- Fine-Tuning Control: It allows you to tweak search results based on user intent without changing your underlying data structure.

### 62. What is Sparse Index, when would you use it and how?
A Sparse Index is an index that only contains entries for documents that actually possess the indexed field. It completely skips documents where the indexed field is missing or contains an explicit null value.

When to Use It<br/>
- Optional Fields: When only a small percentage of your documents contain a specific field (e.g., middleName or twitterHandle), saving massive amounts of disk space and memory.
- Preventing Unique Constraints on Missing Fields: If you want a field to be unique (like phoneNumber), but many users don't provide one, a standard unique index will reject multiple documents missing the field. A Sparse Unique Index allows multiple documents to lack the field while ensuring uniqueness for the ones that do have it.

How to Use It<br/>
```js
// Creates a unique, sparse index on 'phoneNumber'
db.users.createIndex({ phoneNumber: 1 }, { unique: true, sparse: true })
```

### 63. Explain write concern and read concern in MongoDB?
In MongoDB, write concern controls how securely data is written to the database before the application gets a success acknowledgment, while read concern controls the isolation and freshness level of the data returned by queries. Together, they allow developers to balance application speed against data consistency and durability guarantees.

Write Concern: Securing Data Entry<br/>
Write concern dictates how many replica set nodes must log a write before it is marked complete. It is configured using three main options:
- w (Write Guarantee): Specifies the number of data-bearing nodes that must acknowledge the write.
- j (Journaling Guarantee): A boolean flag (true/false) determining if the write must be saved to the on-disk journal before returning success.
- wtimeout (Time Limit): Prevents the application from hanging indefinitely if replication fails to hit the specified w target.

Common Levels
- w: 0 (Fire-and-Forget): The driver does not wait for any acknowledgment from the server. This provides maximum throughput but zero durability guarantees.
- w: 1: The primary node acknowledges the write. If that primary node crashes before replicating the data to its secondaries, the data could be permanently rolled back.
- w: "majority": The write is acknowledged only after being saved to a majority of the replica set nodes. This is the default setting in modern MongoDB setups and ensures the data can survive a primary node failover.

Read Concern: Reading the Right Data State<br/>
Read concern defines what version of the data a query sees. It directly prevents issues like dirty reads (reading uncommitted or unsafe data that might get wiped out later).

Common Levels<br/>
- local: Returns the node’s most recent data instantly. It does not check if the data has been replicated to other nodes. This data can still be rolled back if a node crashes.
- available: Behaves exactly like local for standard replica sets, but optimizes performance for sharded clusters by skipping specific cross-shard isolation checks.
- majority: Only returns data that has successfully been acknowledged by a majority of the replica set nodes. It completely protects against dirty reads because majority-committed data is durable and cannot be rolled back.
- linearizable: The primary node checks with a majority of peers during the read operation to ensure it is still the actual primary. This prevents a split-brain scenario where a stale primary serves outdated data, giving you the strongest single-document consistency.
- snapshot: Used primarily inside multi-document transactions. It extracts a point-in-time view of the database to guarantee total data isolation throughout the transaction steps.

How do we implement?<br/>
MongoDB handles these tasks automatically using default settings, but you can easily override and implement custom configurations at different levels of your application.

By default in modern MongoDB versions, every write uses w: "majority" and every read uses level: "local". If these defaults fit your app, you do not need to write any extra code.

How to Implement Custom Concerns<br/>
If you need higher safety or faster performance, you can implement custom write and read concerns at three different levels. MongoDB applies them using a hierarchy: Operation Level overrides Collection Level, which overrides Database Level, which overrides Client Level.

1. At the Connection (Client) Level<br/>
This sets the global default for your entire application. You define it directly inside your MongoDB Connection URI string.

```js
// Example using Node.js connection string
const url = "mongodb://localhost:27017/mydb?w=majority&wtimeoutMS=5000&readConcernLevel=majority";
```

2. At the Database or Collection Level<br/>
You can set defaults for a specific database or collection when initializing them in your backend code.

```js
// Example using Node.js MongoDB Driver
const db = client.db("financial_db");

// Apply to a specific collection
const ordersCollection = db.collection("orders", {
  writeConcern: { w: "majority", j: true, wtimeout: 2000 },
  readConcern: { level: "majority" }
});
```

3. At the Individual Operation Level<br/>
You can override everything for a single, critical query or write operation by passing an options object at the end of the method.

```js
// A highly critical write that MUST be journaled to disk immediately
await db.collection("users").insertOne(
  { username: "alice", balance: 500 },
  { writeConcern: { w: "majority", j: true } }
);

// A highly critical read that cannot accept stale or rolled-back data
const safeData = await db.collection("users").find({ username: "alice" })
  .readConcern({ level: "linearizable" })
  .toArray();
```

Summary of Implementation Best Practices<br/>
- For standard apps (Blogs, Social Feeds): Do nothing. MongoDB's automatic defaults (w: "majority", local read) balance safety and speed perfectly.- For critical apps (Finance, Inventory): Explicitly implement readConcern: { level: "majority" } on your queries to prevent dirty reads, and ensure j: true on your write concerns to protect against sudden power loss.

### 56. What is Timestamp? How it works? What are the types of Timestamp?
Timestamping is the process of recording the exact time an event or operation happens. In databases, it helps track when data changes. MongoDB handles time using internal system counters and application-level date types to maintain data order and history.

In MongoDB, createdAt, updatedAt, and expiresAt are BSON Date timestamp fields used to track a document's lifecycle, but they serve completely different operational purposes.

Deep Dive<br/>
📅 createdAt
- What it does: Represents the permanent creation date of the document.
- Behavior: It remains immutable after it is set during the first insertion.
- Automation: MongoDB natively does not inject this automatically, but Object Data Model (ODM) libraries like Mongoose Timestamps generate it seamlessly when timestamps: true is configured in the schema.

🔄 updatedAt
- What it does: Tracks the last time any piece of data inside the document was changed.
- Behavior: Initially, it matches createdAt. Every subsequent update, save, or replace database command refreshes this field to the current execution time.
- Automation: Handled automatically by ODMs or manually via MongoDB's $currentDate operator during partial updates.

⏳ expiresAt
- What it does: Explicitly tells MongoDB when to automatically delete the document from the database.
- Behavior: It pairs with a Time-To-Live (TTL) Index. MongoDB runs a background thread once every 60 seconds, reads this index, and drops any document where the expiresAt clock time is in the past.
- Common Use Cases: Cleaning up temporary user sessions, verification OTP tokens, temporary carts, or short-lived system logs.

Implementation Example
If you are using Mongoose, you can configure all three fields inside your schema structure like this:

```js
const userSessionSchema = new Schema({
  userId: ObjectId,
  sessionToken: String,
  // 1. Manually managed or calculated target expiration
  expiresAt: { 
    type: Date, 
    required: true 
  }
}, { 
  // 2. Automatically manages createdAt and updatedAt
  timestamps: true 
});

// 3. Create the TTL index pointing to your expiration field
userSessionSchema.index({ "expiresAt": 1 }, { expireAfterSeconds: 0 });
```

(Note: Setting expireAfterSeconds: 0 means the document will be dropped precisely at the clock time saved inside the expiresAt property. Alternatively, you can index createdAt with expireAfterSeconds: 3600 to drop the file exactly one hour after creation).

If you are writing raw queries, you can review how to set up automated lifecycles directly within the MongoDB TTL Documentation.

Here is the quick comparison of the three fields:<br/>
- createdAt: Tracks when the record was born. It is set only once during initial document creation. It helps with auditing and sorting the newest records.
- updatedAt: Tracks the latest modifications. It updates every single time any field changes. It helps with cache busting and synchronization.
- expiresAt: Triggers automated data destruction. It is set to a future date to tell MongoDB when to delete the document via TTL indexes.

### 58. How have you scaled MongoDB in a high-traffic application?
To scale MongoDB in a high-traffic application, combine proactive query optimization, replica sets for read distribution, and horizontal sharding for massive write throughput. Ensuring that your active data set fits entirely within RAM remains the most critical factor for maintaining low latency under heavy loads.

Performance Optimization and Indexing<br/>
- Build precise compound indexes to support frequent query patterns and sort operations.
- Use the database profiler or explain() execution stats to catch and eliminate unindexed collection scans.
- Shape your aggregation pipelines to place $match and $limit stages as early as possible to minimize data processing overhead.

Managing Read and Write Loads<br/>
- Deploy replica sets to isolate high availability and handle fault tolerance.
- Route non-critical analytics or eventual-consistency reads to secondary nodes using read preferences like secondaryPreferred.
- Tune your write concerns (e.g., using { w: 1 } instead of { w: "majority" }) where absolute durability per individual write can be safely traded for higher ingestion speed.

Horizontal Scaling and Architecture<br/>
- Implement sharding only when a single replica set hits storage limits or CPU/write bottlenecks that vertical scaling cannot solve.
- Choose a high-cardinality shard key that aligns tightly with your read and write access patterns to avoid data hotspots.
- Utilize hashed sharding to distribute uniform write traffic evenly across shards, or range sharding if your application relies heavily on bounded range queries.

### 57. How to optimize MongoDB queries performance?
To optimize MongoDB queries, you can use the following techniques:

- Indexing: Create indexes on the fields you frequently search for to improve query performance.

Indexing in MongoDB is a way to improve query performance by creating an index on one or more fields in a collection. When you create an index, MongoDB creates a data structure that stores the values of the indexed field(s) in a way that allows for fast and efficient searching.

For example, consider a collection of blog posts with the following structure:

```js
{
   _id: ObjectId(...),
   title: "Hello World!",
   body: "Lorem ipsum...",
   tags: ["mongodb", "indexing"],
   date: ISODate("2022-01-01T00:00:00.000Z")
}
```

If you frequently search for blog posts by their tags, you can create an index on the tags field to improve query performance:

```js
db.posts.createIndex({ tags: 1 })
```

Now, when you search for blog posts with a specific tag, MongoDB can use the index to quickly find the relevant documents, rather than scanning the entire collection. For example:

```js
db.posts.find({ tags: "mongodb" })
```

In this example, MongoDB can use the tags index to quickly find all blog posts with the tag "mongodb". This makes the query much faster and more efficient than if MongoDB had to scan the entire collection to find the relevant documents.


- Query Optimization: Use the explain() method to analyze query performance and determine if additional indexes or other optimizations are needed.
db.posts.find({ tags: "mongodb" }).explain()

The explain() method in MongoDB is used to analyze query performance and determine if additional indexes or other optimizations are needed. It provides information about how the query is executed, including the query plan, the number of documents scanned, and the number of documents returned.

For example, consider the following query:

db.posts.find({ tags: "mongodb" })

You can use the explain() method to analyze the performance of this query:

db.posts.find({ tags: "mongodb" }).explain()

The output of the explain() method will show the query plan that MongoDB used to execute the query, including information about how the query was optimized and which indexes were used (if any).

- Projection: Limit the fields returned in a query to only the fields you need, reducing the amount of data transferred from the database to your application.

Projection in MongoDB is a way to limit the fields returned in a query to only the fields that you need, reducing the amount of data transferred from the database to your application. This can improve query performance and reduce the amount of memory required to store the query results.

For example, consider a collection of blog posts with the following structure:

```js
{
   _id: ObjectId(...),
   title: "Hello World!",
   body: "Lorem ipsum...",
   tags: ["mongodb", "indexing"],
   date: ISODate("2022-01-01T00:00:00.000Z")
}
```

If you only need the title and date fields from the blog posts, you can use projection to limit the fields returned in the query:

```js
db.posts.find({}, { title: 1, date: 1 })
```

In this example, the second argument to the find() method specifies the projection, and the 1 values indicate that the title and date fields should be included in the results. The _id field is included by default, so you don't need to include it in the projection.

This query returns the following results:

```js
{
   "_id" : ObjectId(...),
   "title" : "Hello World!",
   "date" : ISODate("2022-01-01T00:00:00.000Z")
}
```

Note that the body and tags fields are not included in the results, which reduces the amount of data transferred from the database to your application and improves query performance.

- Pagination: Use limit() and skip() to retrieve a subset of data and minimize the amount of data transferred.

Pagination in MongoDB is a way to retrieve a subset of data by limiting the number of documents returned in a query and skipping a specified number of documents. This can be useful when you need to retrieve a large number of documents from a collection, but you only want to display a limited number of documents at a time.

For example, consider a collection of blog posts with the following structure:

```js
{
   _id: ObjectId(...),
   title: "Hello World!",
   body: "Lorem ipsum...",
   tags: ["mongodb", "indexing"],
   date: ISODate("2022-01-01T00:00:00.000Z")
}
```

To retrieve the second page of blog posts, where each page displays 10 posts, you can use the limit() and skip() methods:

```js
db.posts.find({}).skip(10).limit(10)
```

In this example, the skip() method skips the first 10 documents, and the limit() method limits the number of documents returned to 10.

This query returns the following results:

```js
[   
    {      
      "_id" : ObjectId(...),      
      "title" : "Hello World!",      
      "body" : "Lorem ipsum...",      
      "tags" : ["mongodb", "indexing"],
      "date" : ISODate("2022-01-01T00:00:00.000Z")
    },
    ...
]
```
Note that the limit() method must be called after the skip() method in order to ensure that the correct number of documents are returned. Using pagination in this way minimizes the amount of data transferred from the database to your application and improves query performance.


- Caching: Use a caching layer, such as Redis, to store frequently used data and reduce the number of queries to the database.

Caching in MongoDB involves using a caching layer, such as Redis, to store frequently used data in memory, and reducing the number of queries to the database. This can improve the performance of your application by reducing the latency and load on the database.

For example, consider an e-commerce website that displays the top 10 products based on sales. The product data is stored in a MongoDB collection, and the sales data is stored in a separate collection.

To improve the performance of the website, you can use Redis to cache the top 10 products based on sales. Every time a sale is made, you update the Redis cache with the latest top 10 products.

Here’s an example of how you could implement this using Redis and Node.js:

```js
const redis = require("redis");
const client = redis.createClient();

// Query MongoDB for the top 10 products based on sales
const getTopProducts = async () => {
  const products = await db.products.aggregate([
    { $sort: { sales: -1 } },
    { $limit: 10 }
  ]);

  return products;
};

// Store the top 10 products in the Redis cache
const setTopProductsCache = async () => {
  const topProducts = await getTopProducts();
  client.set("topProducts", JSON.stringify(topProducts));
};

// Retrieve the top 10 products from the Redis cache
const getTopProductsCache = () => {
  return new Promise((resolve, reject) => {
    client.get("topProducts", (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
};

// Get the top 10 products from the Redis cache if it exists, otherwise query MongoDB
const getTopProductsWithCache = async () => {
  let topProducts;

  try {
    topProducts = await getTopProductsCache();
  } catch (err) {
    topProducts = await getTopProducts();
    setTopProductsCache();
  }

  return topProducts;
};
```

In this example, the getTopProducts function queries MongoDB for the top 10 products based on sales, the setTopProductsCache function stores the top 10 products in the Redis cache, and the getTopProductsCache function retrieves the top 10 products from the Redis cache. The getTopProductsWithCache function gets the top 10 products from the Redis cache if it exists, and otherwise queries MongoDB.

By using a caching layer like Redis, you can reduce the number of queries to the database, which can improve the performance of your application.

- Proper Data Modeling: Store related data together in the same document to reduce the number of database queries needed to retrieve all the data needed for a single request.
- Use Proper Data Types: Use the proper data type for each field to reduce the size of data stored and improve query performance.
- Monitoring and Maintenance: Regularly monitor the performance of your database and take proactive measures to address potential performance issues before they become problems.

### 28. How do you update nested fields?

Use dot notation.

Example:

```js
db.users.updateOne(
  { _id: userId },
  { $set: { "address.city": "Bangalore" } }
);
```

### 29. How to Handle Backups and Disaster Recovery in MongoDB?
Handling backups and disaster recovery in MongoDB involves regularly creating backups of your data and having a plan for restoring data in case of failure. Methods include:

- Mongodump/Mongorestore: Use the mongodump and mongorestore utilities to create and restore binary backups.
- File System Snapshots: Use file system snapshots to take consistent backups of the data files.
- Cloud Backups: If using MongoDB Atlas, leverage automated backups provided by the service.
- Replica Sets: Use replica sets to ensure data redundancy and high availability. Regularly test the failover and recovery process.

### 30. What is MongoDB Vector Search and how is it useful in AI applications?
MongoDB Vector Search is a built-in feature that stores and indexes mathematical representations of unstructured data—called vector embeddings—directly inside your standard JSON/BSON document database. It allows you to search data based on its semantic meaning and context rather than exact keyword matches.

How It Works?<br/>
- Stores Vectors with Data: Keeps your vector arrays right next to your operational text, numbers, and metadata in the same document.
- Uses Similarity Metrics: Compares mathematical distance using methods like Cosine Similarity, Euclidean Distance, or Dot Product.
- Fast Indexing: Employs the Hierarchical Navigable Small World (HNSW) algorithm for fast approximate nearest neighbor (ANN) searches.
- No Sync Required: Eliminates the need to sync data between a primary database and a separate, standalone vector database.

Use in AI Applications
- Retrieval-Augmented Generation (RAG): Grounds Large Language Models (LLMs) in your private or real-time business data by instantly fetching relevant context to answer user queries accurately.
- Semantic Search: Understands the intent behind natural language queries, allowing users to find relevant products or documents even if they do not use exact keywords.
- AI Agents & Memory: Powers agentic systems by serving as both the knowledge retrieval engine and the short/long-term conversational memory store.- Recommendation Engines: Delivers personalized content, media, or product recommendations based on behavioral proximity and profile similarity.
- Combined Filtering: Lets you combine vector similarity scores with strict operational filters (like date ranges, user permissions, or location) in a single query.

### 30. What is MongoDB Atlas Search and how is it different from MongoDB Vector Search?
MongoDB Atlas Search is a fully managed text-search tool built on Apache Lucene that performs fast keyword, fuzzy, and lexical searches. In contrast, MongoDB Atlas Vector Search evaluates numerical embedding arrays to execute semantic, meaning-based similarity matching for artificial intelligence workloads.

Core Definitions
- Atlas Search: Uses text-processing algorithms, stemming, and exact/fuzzy keyword matching to find literal strings and terms across documents.
- Atlas Vector Search: Translates unstructured inputs (text, images, audio) into high-dimensional numerical vectors and computes mathematical proximity (distance) to determine intent.

The key differences in a list format:
1. Search Method
- Atlas Search: Lexical and keyword-based.
- Atlas Vector Search: Semantic and meaning-based.
2. Underlying Engine
- Atlas Search: Apache Lucene.
- Atlas Vector Search: Lucene-based vector mechanics and HNSW algorithm.
3. Data Type Handled
- Atlas Search: Strings, numbers, and text fields.
- Atlas Vector Search: High-dimensional float arrays (embeddings).
4. Primary Use Cases
- Atlas Search: Traditional site search, autocomplete, and typo-tolerant filtering.
- Atlas Vector Search: RAG (Retrieval-Augmented Generation), image matching, and AI recommendations.
5. Query Operator
- Atlas Search: $search
- Atlas Vector Search: $vectorSearch

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

### 54. How does MongoDB ensure high availability?
MongoDB achieves high availability through replication. Replica sets store different copies of data across nodes so that if one node fails, another can take over.

### 54. What happens if the primary node fails?

Replica set elects a new primary.

This is called failover.

During election, writes may pause briefly.

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

### 76. What are Change Streams in MongoDB, and How are They Used?
Change Streams in MongoDB allow applications to listen for real-time changes to data in collections, databases, or entire clusters. They provide a powerful way to implement event-driven architectures by capturing insert, update, replace, and delete operations. To use Change Streams, you typically open a change stream cursor and process the change events as they occur.

Example:

```js
const changeStream = db.collection('orders').watch();
changeStream.on('change', (change) => {
  console.log(change);
});
```

This example listens for changes in the orders collection and logs the change events.

### 77. What is MongoDB Atlas, and How Does it Differ From Self-Hosted MongoDB?
MongoDB Atlas is a fully managed cloud database service provided by MongoDB. It offers automated deployment, scaling, and management of MongoDB clusters across various cloud providers (AWS, Azure, Google Cloud). Key differences from self-hosted MongoDB include:

- Managed Service: Atlas handles infrastructure management, backups, monitoring, and upgrades.
- Scalability: Easily scale clusters up or down based on demand.
- Security: Built-in security features such as encryption, access controls, and compliance certifications.
- Global Distribution: Deploy clusters across multiple regions for low-latency access and high availability.
- Integrations: Seamless integration with other cloud services and MongoDB tools.

### 78. How to Handle Transactions in MongoDB?
MongoDB supports multi-document ACID transactions by allowing us to perform a series of read and write operations across multiple documents and collections in a transaction. This ensures data consistency and integrity. To use transactions we typically start a session, begin a transaction, perform the operations and then commit or abort the transaction.

Example in JavaScript:

const session = client.startSession();

session.startTransaction();

```js 
try {
  db.collection1.insertOne({ name: "Alice" }, { session });
  db.collection2.insertOne({ name: "Bob" }, { session });
  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
} finally {
  session.endSession();
}
```

### 79. Describe the Process of Migrating Data from a Relational Database to MongoDB
Migrating data from a relational database to MongoDB involves several steps:

- Schema Design: Redesign the relational schema to fit MongoDB's document-oriented model. Decide on embedding vs. referencing, and plan for indexes and collections.
- Data Export: Export data from the relational database in a format suitable for MongoDB (e.g., CSV, JSON).
- Data Transformation: Restructure and convert data to fit the MongoDB schema and relationships.
- Data Import: Import the transformed data into MongoDB using tools like mongoimport or custom scripts.
- Validation: Validate the imported data to ensure consistency and completeness.
- Application Changes: Update the application code to interact with MongoDB instead of the relational database.
- Testing: Thoroughly test the application and the database to ensure everything works as expected.
- Go Live: Deploy the MongoDB database in production and monitor the transition.

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

NEW QUESTIONSSSSSSSSS
==========================

### 58. 

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
