# TypeScript Interview Questions and Answers

This document explains TypeScript from a beginner-friendly point of view. The goal is not only to memorize interview answers, but to understand what TypeScript is doing and why it helps in a real React/MERN frontend.

## How to Use This Document

Read each answer in this order:

- First understand the plain-English meaning.
- Then read the code example slowly.
- Then ask: "What bug would TypeScript catch here?"
- Finally connect it to this project's frontend code.

Important mental model:

```text
TypeScript checks your code before it runs.
JavaScript is what actually runs in the browser or Node.js.
```

## TypeScript Mental Model Before Questions

Before learning many individual TypeScript topics, understand these core ideas. They remove a lot of confusion.

### Types Are Development-Time Information

TypeScript types help your editor and compiler understand your code.

This:

```ts
const age: number = 25;
```

becomes plain JavaScript:

```js
const age = 25;
```

So TypeScript types do not protect the app at runtime by themselves. They protect you while writing, building, and refactoring the code.

### TypeScript Mostly Asks One Question

```text
Is this value allowed here?
```

Example:

```ts
function sendEmail(email: string) {}

sendEmail('paras@example.com'); // allowed
sendEmail(123); // error
```

TypeScript checks whether `123` is allowed where a `string` is expected.

### Learn To Read Common TypeScript Syntax From Left To Right

Most TypeScript syntax becomes easier if you translate it into English.

This is not every TypeScript syntax, but it covers the patterns you will see most often while reading React + TypeScript code.

| Syntax | How to read it |
| --- | --- |
| `name: string` | `name` must be a string |
| `age?: number` | `age` is optional and, if present, must be a number |
| `string \| null` | value can be string or null |
| `User & Timestamps` | value must have both User fields and Timestamps fields |
| `User[]` | array of User objects |
| `Array<User>` | array of User objects, same idea as `User[]` |
| `[string, number]` | tuple: first string, second number |
| `<T>` | reusable placeholder type |
| `<T extends User>` | placeholder type, but it must match User's shape |
| `Promise<User>` | promise that resolves to User |
| `Record<string, User>` | object with string keys and User values |
| `value as User` | treat value as User; compiler trust only |
| `as const` | infer the most specific readonly literal type |
| `keyof User` | union of User's keys |
| `typeof value` | create/read the type of an existing value |
| `value is User` | custom type guard result |
| `readonly id: string` | `id` cannot be reassigned |
| `const value = ...` | variable binding cannot be reassigned |
| `interface Admin extends User` | Admin inherits User's fields |
| `class Service implements Contract` | class must follow the Contract interface |
| `T extends U ? X : Y` | if T matches U, use X; otherwise use Y |
| `infer Result` | capture/extract a type inside a conditional type |
| `[K in keyof T]` | loop over all keys of T at type level |
| `Partial<User>` | make all User properties optional |
| `Pick<User, 'id'>` | keep only selected User properties |
| `Omit<User, 'id'>` | remove selected User properties |
| `satisfies SomeType` | check shape without losing precise inference |
| `inputRef.current!` | tell TypeScript this is not null or undefined |
| `inputRef.current?.focus()` | call focus only if current exists |
| `import type { User }` | import only the type, not runtime code |
| `export type User = ...` | export a type only |
| `React.ReactNode` | anything React can render as children |
| `React.ChangeEvent<HTMLInputElement>` | input change event type |
| `ReturnType<typeof fn>` | get the return type of a function |
| `Parameters<typeof fn>` | get the parameter types of a function |

### Annotation, Inference, And Assertion Are Different

Annotation means you tell TypeScript the type:

```ts
const age: number = 25;
```

Inference means TypeScript guesses the type:

```ts
const age = 25; // TypeScript infers number
```

Assertion means you tell TypeScript to trust you:

```ts
const input = element as HTMLInputElement;
```

These are not the same. Prefer inference when it is obvious, annotation when clarity is needed, and assertion only when you really know more than TypeScript.

### TypeScript Checks Shapes, Not Names

TypeScript uses structural typing. That means if the shape matches, the value is allowed.

```ts
type User = {
  id: string;
  name: string;
};

const account = {
  id: '1',
  name: 'Paras',
  role: 'admin'
};

const user: User = account; // allowed
```

This is allowed because `account` has at least the required `User` fields: `id` and `name`.

### External Data Is Still Risky

TypeScript trusts the types you write, but API responses come from runtime.

```ts
const response = await http.get<ApiItemResponse<User>>('/users/1');
```

This tells TypeScript what you expect. It does not prove the backend actually returned that shape. For highly important data, pair TypeScript types with runtime validation.

### A Practical Learning Path

If TypeScript feels confusing, learn in this order:

1. primitive types: `string`, `number`, `boolean`
2. arrays and objects
3. union types: `A | B`
4. optional and nullable values
5. functions and React props
6. type narrowing: `typeof`, `instanceof`, `in`
7. generics: `<T>`
8. utility types: `Partial`, `Pick`, `Omit`, `Record`
9. advanced types only after the basics feel comfortable

## TypeScript Basics

### 1. What is TypeScript?

TypeScript is JavaScript with a type system added on top.

JavaScript lets you write:

```js
let age = 25;
age = 'twenty five';
```

That is allowed in JavaScript because JavaScript is dynamically typed. TypeScript lets you tell the editor and compiler what kind of value is expected:

```ts
let age: number = 25;
age = 'twenty five'; // error
```

The important point is that TypeScript catches this mistake before the app runs. It helps you find bugs while coding instead of discovering them in the browser.

Interview answer:

```text
TypeScript is a superset of JavaScript that adds static type checking. It helps catch errors during development and improves maintainability, autocomplete, and refactoring.
```

### 2. Is TypeScript a separate language from JavaScript?

TypeScript is not a completely separate world. It is built on JavaScript.

Every normal JavaScript concept still matters:

- variables
- functions
- arrays
- objects
- promises
- classes
- modules

TypeScript only adds extra syntax for types.

Example:

```ts
const name: string = 'Paras';
```

When TypeScript compiles, the type disappears and plain JavaScript remains:

```js
const name = 'Paras';
```

So the simple way to think is:

```text
TypeScript = JavaScript + type checking
```

### 3. Does TypeScript run in the browser?

No. Browsers do not understand TypeScript syntax directly.

This code is TypeScript:

```ts
const age: number = 25;
```

The browser only runs JavaScript:

```js
const age = 25;
```

That is why tools like Vite and TypeScript compile/transpile `.ts` and `.tsx` files into JavaScript. In this project, the frontend uses Vite, so you write TypeScript during development and Vite handles the browser-ready output.

Beginner rule:

```text
Types help during development. They are removed before runtime.
```

### 4. Why use TypeScript?

TypeScript helps because real apps have many moving parts: API data, forms, user roles, routes, Redux state, and reusable components.

Without types, this mistake might only show up at runtime:

```js
user.emial.toLowerCase();
```

With TypeScript, if the correct property is `email`, TypeScript warns you that `emial` does not exist.

Benefits:

- catches many mistakes before runtime
- improves autocomplete
- makes refactoring safer
- documents what data should look like
- helps with API response shapes
- helps teams understand code faster

- Autocomplete becomes better because the editor knows the exact fields and functions available on a value. For example, if `user` is typed as `User`, the editor can suggest `user.email`, `user.name`, or `user.role`.

Example:

```ts
type User = {
  name: string;
  email: string;
  role: 'admin' | 'member';
};

function showUser(user: User) {
  user.email.toLowerCase();
}
```

Inside `showUser`, when you type `user.`, the editor can suggest `name`, `email`, and `role` because TypeScript knows the shape of `User`.

- Refactoring becomes safer because TypeScript can show all places affected by a change. For example, if you rename `email` to `primaryEmail` in the `User` type, TypeScript can warn wherever the old `email` property is still used.

Example:

```ts
type User = {
  name: string;
  primaryEmail: string;
};

function sendWelcomeEmail(user: User) {
  sendEmail(user.email); // Error: Property 'email' does not exist on type 'User'
}
```

TypeScript is warning you because the type now has `primaryEmail`, but the function still uses the old `email` name.

- TypeScript documents what data should look like because a type works like a small contract. Anyone reading the code can understand which fields are required, which fields are optional, and what values are allowed.

Example:

```ts
type CreateUserRequest = {
  fullName: string;
  email: string;
  mobile?: string;
  role: 'admin' | 'member';
};

const payload: CreateUserRequest = {
  fullName: 'Paras Mahto',
  email: 'paras@example.com',
  role: 'owner' // Error: only 'admin' or 'member' is allowed
};
```

From this type, we can understand the data shape without guessing:

- `fullName` is required
- `email` is required
- `mobile` is optional because it has `?`
- `role` can only be `admin` or `member`

In this app, TypeScript helps with things like `Account`, `User`, `UserRole`, `RequestStatus`, API responses, Redux state, and React props.

### 5. How TypeScript works?

TypeScript works by checking your code before JavaScript runs.

The browser and Node.js do not run TypeScript directly. TypeScript is first checked and converted into normal JavaScript.

Simple flow:

```text
write TypeScript -> TypeScript checks types[tsc(TypeScript compiler) checks types] -> Vite compile/transpile[Vite ] -> run JavaScript
```

```text
tsc checks whether the code is type-safe.
Vite prepares the code that the browser can actually run.
```

Example TypeScript code:

```ts
function greet(name: string) {
  return `Hello ${name}`;
}

greet('Paras'); // allowed
greet(123); // error
```

TypeScript sees that `name` must be a `string`, so it warns when we pass `123`.

After compilation, the type information is removed:

```js
function greet(name) {
  return `Hello ${name}`;
}
```

This is important:

```text
TypeScript checks code during development.
JavaScript runs at runtime.
```

In this project, the frontend uses TypeScript with Vite. When you write files like `.ts` and `.tsx`, TypeScript checks whether your variables, props, API responses, Redux state, and function arguments are being used correctly.

For example, if a React component expects a `User` object:

```tsx
type User = {
  id: string;
  name: string;
  email: string;
};

function UserCard({ user }: { user: User }) {
  return <p>{user.email}</p>;
}
```

TypeScript will warn if you pass an object without `email`:

```tsx
<UserCard user={{ id: '1', name: 'Paras' }} />; // error
```

But TypeScript does not automatically validate real API data at runtime. If the backend sends wrong data, TypeScript will not magically fix it. It only checks based on the types you declared.

In this project:

- `npm run check` runs TypeScript validation for the frontend
- `npm run build` checks TypeScript and creates browser-ready JavaScript
- Vite helps convert the frontend TypeScript code into JavaScript for the browser

Interview answer:

```text
TypeScript works by statically checking JavaScript code using type annotations and inference. It reports type errors during development or build time, then compiles/transpiles the code to plain JavaScript because browsers and Node.js run JavaScript, not TypeScript types.
```

### 5. What are disadvantages of TypeScript?

TypeScript is helpful, but it is not free.

Disadvantages:

- you must learn type syntax
- setup is slightly more complex
- type errors can feel confusing at first
- too many advanced types can make code hard to read
- wrong type assertions can give false confidence

Example of false confidence:

```ts
const account = response as Account;
```

This only tells TypeScript to trust you. It does not check if `response` is really an `Account` at runtime.

Interview answer:

```text
TypeScript improves safety and maintainability, but it adds learning curve, build step, and type complexity. It is most valuable in medium and large projects.
```

### 6. TypeScript vs JavaScript?

JavaScript is dynamically typed. TypeScript is statically typed.

Dynamic typing means the type is checked while the code runs:

```js
function add(a, b) {
  return a + b;
}

add(2, '3'); // '23'
```

Static typing means TypeScript checks the expected types before running:

```ts
function add(a: number, b: number): number {
  return a + b;
}

add(2, '3'); // error
```

The runtime language is still JavaScript. TypeScript is the safety layer during development.

## Basic Types

### 7. What are basic TypeScript types?

Basic types describe the kind of value a variable can hold.

Common types:

```ts
string
number
boolean
null
undefined
symbol
bigint
object
array
tuple
enum
unknown
any
void
never
```

Examples:

```ts
const name: string = 'Paras';
const age: number = 25;
const isActive: boolean = true;
const emptyValue: null = null;
```

Think of types like labels on boxes. If a box is labeled `number`, TypeScript stops you from putting a string inside it.

### 8. How to type string, number, boolean?

These are the most common primitive types.

```ts
const name: string = 'Paras';
const age: number = 25;
const isActive: boolean = true;
```

You do not always need to write the type because TypeScript can infer it:

```ts
const name = 'Paras'; // inferred as string
const age = 25; // inferred as number
```

Beginner rule:

```text
If TypeScript can clearly guess the type, you can let it infer.
If the type is not obvious, write it explicitly.
```

### 9. How to type arrays?

An array type tells TypeScript what kind of items are inside the array.

Two common ways:

```ts
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ['Paras', 'Amit'];
```

Both mean the same thing.

This will fail:

```ts
numbers.push('four'); // error
```

Why? Because `numbers` is a `number[]`, so every item must be a number.

In React apps, arrays are common for lists:

```ts
const users: User[] = [];
```

This means `users` is an array where every item must match the `User` type.

### 10. What is tuple?

A tuple is an array with a fixed number of positions, and each position has a known type.

Example:

```ts
const user: [string, number] = ['Paras', 25];
```

Here:

- first item must be a `string`
- second item must be a `number`

This is invalid:

```ts
const user: [string, number] = [25, 'Paras']; // error
```

Use tuples when position has meaning, like coordinates or fixed pairs:

```ts
const point: [number, number] = [10, 20];
```

### 11. What are readonly tuples?

A readonly tuple is a tuple that cannot be changed after creation.

Example:

```ts
const user: readonly [string, number] = ['Paras', 25];

user[0] = 'Amit'; // error
```

This is useful when a fixed value should not be modified accidentally.

You can also use `as const`:

```ts
const coordinates = [10, 20] as const;
```

Now TypeScript treats it like a readonly tuple:

```ts
readonly [10, 20]
```

Beginner idea:

```text
Normal tuple = fixed shape.
Readonly tuple = fixed shape and cannot be changed.
```

### 12. What is union type?

A union type means a value can be one of several allowed types.

Example:

```ts
type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

const status: Status = 'loading';
```

The `|` means "or".

So this type means:

```text
status can be idle OR loading OR succeeded OR failed
```

This is useful for values that have limited valid options.

In this app:

```ts
export type AccountRole = 'admin' | 'manager' | 'member';
export type UserStatus = 'active' | 'inactive';
```

This prevents invalid values:

```ts
const role: AccountRole = 'owner'; // error
```

### 13. What is literal type?

A literal type means the value must be exactly one specific value or one of a small set of exact values.

Example:

```ts
type Direction = 'left' | 'right' | 'up' | 'down';
```

This is not just saying "string". It is saying "only these exact strings are allowed".

Another example:

```ts
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
```

Literal types are useful when your app has known values like:

- roles
- statuses
- tabs
- modes
- API methods

### 14. Difference between union type and literal type?

Union type and literal type are connected, but they are not exactly the same thing.

A literal type means one exact value is allowed.

Example:

```ts
type AdminRole = 'admin';

const role: AdminRole = 'admin'; // ok
const role2: AdminRole = 'member'; // error
```

Here, `AdminRole` is a literal type because it allows only the exact string `'admin'`.

A union type means a value can be one of multiple allowed types or values.

Example:

```ts
type Id = string | number;

const id1: Id = 'user-1'; // ok
const id2: Id = 101; // ok
const id3: Id = true; // error
```

Here, `Id` is a union type because it allows `string` OR `number`.

The part that often confuses beginners:

```ts
type Status = 'idle' | 'loading' | 'success' | 'error';
```

This is both:

- a union type, because it uses `|`
- a union of literal types, because each option is an exact string value

Read it like this:

```text
Status can be exactly 'idle'
OR exactly 'loading'
OR exactly 'success'
OR exactly 'error'
```

Simple comparison:

```text
Literal type = exact value
Union type = one of multiple allowed options
Union of literal types = one of multiple exact values
```

Another example:

```ts
type ButtonSize = 'small' | 'medium' | 'large';

function Button(size: ButtonSize) {
  console.log(size);
}

Button('small'); // ok
Button('extra-large'); // error
```

Here, each value like `'small'` is a literal type, and `ButtonSize` is a union type made from those literals.

Beginner rule:

```text
Use literal types when only exact values are valid.
Use union types when there is more than one valid option.
```

### 15. What is any?

`any` disable TypeScript checking for that value.

Example:

```ts
let data: any = 'hello';
data = 10;
data.test(); // TypeScript allows this
```

The danger is that `data.test()` may crash at runtime if `data` does not actually have a `test` method.

Think of `any` as telling TypeScript:

```text
Do not check this. I know what I am doing.
```

That can be useful during migration, but it removes TypeScript's safety. Prefer specific types or `unknown`.

### 16. What is unknown?

`unknown` means "I do not know the type yet".

The difference from `any` is that TypeScript forces you to check before using it.

Example:

```ts
let value: unknown = 'hello';

if (typeof value === 'string') {
  console.log(value.toUpperCase());
}
```

This is safer because TypeScript does not let you blindly use the value.

Common use case:

```ts
function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
}
```

Beginner rule:

```text
Use unknown when data is unpredictable.
Use type checks before using it.
```

### 17. any vs unknown?

Both can hold any value, but they behave differently.

`any` allows everything:

```ts
let a: any = 'hello';
a.toUpperCase(); // allowed
a.fakeMethod(); // also allowed, but may crash
```

`unknown` requires checking:

```ts
let b: unknown = 'hello';
b.toUpperCase(); // error

if (typeof b === 'string') {
  b.toUpperCase(); // ok
}
```

Interview answer:

```text
any disables type checking. unknown keeps type safety because you must narrow the value before using it.
```

### 18. What is void?

`void` means a function does not return a useful value.

Example:

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

This function does some work, but it does not return data to the caller.

Think:

```text
void = function finishes, but returns nothing useful
```

Common examples:

- logging
- event handlers
- dispatching actions
- setting state

### 19. What is never?

`never` means a value should never exist or a function never finishes normally.

Example: function always throws:

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

Example: infinite loop:

```ts
function keepRunning(): never {
  while (true) {
    console.log('Running');
  }
}
```

The most useful interview example is exhaustive checking:

```ts
type Role = 'admin' | 'member';

function checkRole(role: Role) {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'member':
      return 'Member';
    default: {
      const neverRole: never = role;
      return neverRole;
    }
  }
}
```

If later you add a new role and forget to handle it, TypeScript can warn you.

### 20. null vs undefined in TypeScript?

`undefined` usually means a value was not assigned.

`null` usually means the developer intentionally set the value to empty.

Example:

```ts
let name: string | undefined;
let selectedUser: User | null = null;
```

Use `null` when you want to clearly say:

```text
There is no value right now.
```

In this app:

```ts
type Account = {
  sessionExpiresAt: string | null;
};
```

This means the property exists, but its value may intentionally be empty.

## Type Alias and Interface

### 21. What is type alias?

- A type alias gives a name to a type.

- Think of a type alias as a custom nickname for a data type. It does not create new data. It just gives an existing data shape a shorter, clearer name so you can reuse it.

What does it do?
- It acts as a shortcut. Instead of typing out long, complex data descriptions over and over again, you type your short custom nickname.

How does it work? (Step-by-Step)
- You define the nickname using the type keyword.
- You use the nickname where you would normally write a type.
- TypeScript replaces the nickname with the real definition behind the scenes when checking your code for mistakes.

Example:

```ts
// 1. Define the nickname (Type Alias)
type AgeList = number[];

// 2. Use the nickname on your variables
const studentAges: AgeList =;
const teacherAges: AgeList =;
```

Why use them?
- It saves time: You write the definition once and reuse it everywhere.
- It is easy to change: If AgeList needs to allow strings later (e.g., (number | string)[]), you only change it in one place, not on every single variable.

type aliases for both a user profile object and a function.

User Profile Object:
- When you have complex data structures, typing them inline over and over is messy. A type alias gives the object structure a clean name.

```ts
// Step 1: Create the type alias (the blueprint)
type UserProfile = {
  id: number;
  username: string;
  isAdmin: boolean;
};

// Step 2: Use the nickname on your variables
const adminUser: UserProfile = {
  id: 101,
  username: "Alice",
  isAdmin: true
};

const regularUser: UserProfile = {
  id: 102,
  username: "Bob",
  isAdmin: false
};
```

Functions
- You can use type aliases for functions in two different ways: typing the function's arguments, or typing the entire function math signature.

Approach A: Typing the Arguments
- This is the most common way. You use a type alias for the data coming into the function.

```ts
type ID = number | string; // Can be a number OR a string

// The function uses the 'ID' alias for its parameter
function deleteUser(userId: ID) {
  console.log(`Deleting user with ID: ${userId}`);
}

deleteUser(101);     // Works!
deleteUser("usr_25"); // Works!
```

Approach B: Typing the Whole Function Shape
- You can define a custom nickname for a complete function signature (the inputs and the output). This is incredibly useful for callbacks.

```ts
// Step 1: Define a nickname for a function that takes 2 numbers and returns a number
type MathOperation = (a: number, b: number) => number;

// Step 2: Apply that nickname to your functions
const add: MathOperation = (x, y) => x + y;
const multiply: MathOperation = (x, y) => x * y;

console.log(add(5, 3));      // Output: 8
console.log(multiply(5, 3)); // Output: 15
```

Notice that for add and multiply, you do not have to type (x: number, y: number): number. TypeScript already knows the types because you attached the MathOperation alias!

Example:

```ts
type User = {
  id: string;
  name: string;
};
```

Now you can reuse `User` instead of rewriting the object shape again and again.

Type aliases can describe:

- objects
- unions
- primitive aliases
- tuples
- intersections

Example:

```ts
type DoorState = 'open' | 'closed' | 'locked';
type ID = string | number;
```

Beginner idea:

```text
type alias = nickname for a type
```

### 22. What is interface?

An interface in TypeScript is a powerful tool used to define the exact structural shape of an object. Unlike type aliases, interfaces are strictly designed to describe objects and classes.

An interface is a TypeScript way to describe the shape of an object.

In simple words:

```text
interface tells TypeScript which properties an object must have,
and what type each property should be.
```

Think of an interface like a checklist for an object.

If the interface says a user must have `id`, `name`, and `email`, then TypeScript checks that every `User` object follows that checklist.

Example:

```ts
interface User {
  id: string;
  name: string;
  email: string;
}
```

This means:

- `id` must exist and must be a `string`
- `name` must exist and must be a `string`
- `email` must exist and must be a `string`

Now when we use this interface:

```ts
const user: User = {
  id: 'u1',
  name: 'Paras',
  email: 'paras@example.com'
};
```

TypeScript checks the object step by step:

1. Does the object have `id`? Yes.
2. Is `id` a string? Yes.
3. Does the object have `name`? Yes.
4. Is `name` a string? Yes.
5. Does the object have `email`? Yes.
6. Is `email` a string? Yes.

So this object is valid.

Invalid example:

```ts
const user: User = {
  id: 'u1',
  name: 'Paras'
};
```

TypeScript gives an error because `email` is missing.

Another invalid example:

```ts
const user: User = {
  id: 101,
  name: 'Paras',
  email: 'paras@example.com'
};
```

TypeScript gives an error because `id` should be a `string`, but we used a `number`.

Important point:

```text
interface exists only for TypeScript checking.
It does not become JavaScript code in the browser.
```

So this:

```ts
interface User {
  id: string;
  name: string;
}
```

is removed when TypeScript is converted to JavaScript.

Why do we have interfaces?

1. To reuse object shapes instead of writing them again and again.
2. To make function parameters clear.
3. To type React props.
4. To type API response data.
5. To create contracts that classes or objects must follow.

Example with a function:

```ts
interface User {
  id: string;
  name: string;
  email: string;
}

function printUser(user: User) {
  console.log(user.name);
  console.log(user.email);
}
```

Here, `printUser` is saying:

```text
Give me an object that matches the User interface.
Then I can safely use user.name and user.email.
```

Example with React props:

```tsx
interface UserCardProps {
  name: string;
  email: string;
  isAdmin: boolean;
}

function UserCard(props: UserCardProps) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <p>{props.isAdmin ? 'Admin' : 'Member'}</p>
    </div>
  );
}
```

Here, `UserCardProps` tells us exactly what props the component expects.

If someone uses the component incorrectly:

```tsx
<UserCard name="Paras" email="paras@example.com" />
```

TypeScript warns because `isAdmin` is missing.

Optional properties:

```ts
interface User {
  id: string;
  name: string;
  mobile?: string;
}
```

The `?` means `mobile` is optional.

So both are valid:

```ts
const user1: User = {
  id: 'u1',
  name: 'Paras'
};

const user2: User = {
  id: 'u2',
  name: 'Amit',
  mobile: '9999999999'
};
```

Interfaces can extend other interfaces:

```ts
interface BaseUser {
  id: string;
  name: string;
}

interface AdminUser extends BaseUser {
  permissions: string[];
}
```

Now `AdminUser` has:

- `id`
- `name`
- `permissions`

Example:

```ts
const admin: AdminUser = {
  id: 'a1',
  name: 'Paras',
  permissions: ['users:read', 'users:delete']
};
```

Step-by-step mental model:

```text
1. Create an interface.
2. Add property names and their types.
3. Use the interface with a variable, function, component, or class.
4. TypeScript checks whether the real object matches the interface.
5. If something is missing or has the wrong type, TypeScript shows an error before runtime.
```

Beginner idea:

```text
interface = object contract/checklist
```

### 23. type vs interface?

Both can define object shapes, so beginners often get confused.

Use either for normal object shapes:

```ts
type UserType = {
  id: string;
};

interface UserInterface {
  id: string;
}
```

Main difference:

- `interface` is best for object contracts and extension
- `type` is more flexible

`type` can do this:

```ts
type Status = 'idle' | 'loading';
type ID = string | number;
type Point = [number, number];
```

`interface` cannot directly represent unions or tuples.

Interview answer:

```text
interface is best for object contracts. type is more flexible because it can represent unions, primitives, tuples, intersections, and advanced type operations.
```

### 24. Can interface extend another interface?

Yes. Extending means one interface can reuse another interface.

Example:

```ts
interface BaseUser {
  id: string;
}

interface AdminUser extends BaseUser {
  role: 'admin';
}
```

Now `AdminUser` must have:

- `id`
- `role`

This is useful when multiple objects share common fields.

### 25. What is intersection type?

An intersection combines multiple types into one type.

The `&` means "and".

Example:

```ts
type UserFormValues = {
  name: string;
  email: string;
};

type User = UserFormValues & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
```

This means `User` has:

- `name`
- `email`
- `id`
- `createdAt`
- `updatedAt`

In this app, this pattern is useful because a form may collect only some fields, while the server returns those fields plus database fields like `id`.

## Object Types

### 26. How to type an object?

To type an object, describe the properties it must have.

Example:

```ts
type User = {
  id: string;
  name: string;
  email: string;
};
```

Now this works:

```ts
const user: User = {
  id: '1',
  name: 'Paras',
  email: 'paras@example.com'
};
```

This fails:

```ts
const user: User = {
  id: '1',
  name: 'Paras'
}; // error because email is missing
```

### 27. Optional property?

An optional property is a property that may or may not exist.

Use `?`.

```ts
type OtpRequestResult = {
  deliveryTarget: string;
  devOtp?: string;
};
```

This means:

- `deliveryTarget` is required
- `devOtp` is optional

So both are valid:

```ts
const result1: OtpRequestResult = {
  deliveryTarget: 'email'
};

const result2: OtpRequestResult = {
  deliveryTarget: 'email',
  devOtp: '123456'
};
```

Beginner rule:

```text
property?: type means the property can be missing.
```

### 28. Readonly property?

A readonly property cannot be reassigned after it is created.

Example:

```ts
type User = {
  readonly id: string;
  name: string;
};

const user: User = {
  id: '1',
  name: 'Paras'
};

user.name = 'Amit'; // ok
user.id = '2'; // error
```

This is useful for values like IDs because they should not change after creation.

### 29. What is the difference between readonly and const in TypeScript?

`const` protects the variable binding.

`readonly` protects an object property.

Example:

```ts
const user = {
  id: '1',
  name: 'Paras'
};

user.name = 'Amit'; // allowed
```

Why is this allowed? Because `const` only means `user` cannot point to a different object.

This is not allowed:

```ts
user = { id: '2', name: 'Amit' }; // error
```

Readonly protects a property:

```ts
type User = {
  readonly id: string;
  name: string;
};
```

Simple difference:

```text
const = cannot reassign variable
readonly = cannot reassign property
```

### 30. Index signature?

An index signature is used when an object can have dynamic keys.

Example:

```ts
type Errors = {
  [field: string]: string;
};
```

This means:

```text
Any string key is allowed, and every value must be a string.
```

Example:

```ts
const errors: Errors = {
  email: 'Invalid email',
  password: 'Required'
};
```

Use this when you do not know all property names in advance.

## Functions

### 31. How to type function parameters and return?

Function parameters should have types, and the return value can also have a type.

Example:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Here:

- `a: number` means `a` must be a number
- `b: number` means `b` must be a number
- `: number` after parentheses means the function returns a number

Arrow function:

```ts
const add = (a: number, b: number): number => a + b;
```

Beginner rule:

```text
Type inputs first. Then type output if it helps readability.
```

### 32. Optional function parameter?

An optional parameter may be skipped when calling the function.

Use `?`.

```ts
function greet(name?: string) {
  return `Hello ${name || 'Guest'}`;
}

greet('Paras'); // Hello Paras
greet(); // Hello Guest
```

Inside the function, TypeScript treats `name` as:

```ts
string | undefined
```

So you should handle the missing case.

### 33. Default parameter?

A default parameter gives a value when the caller does not pass one.

```ts
function greet(name = 'Guest') {
  return `Hello ${name}`;
}
```

TypeScript infers `name` as `string` because the default value is a string.

Calls:

```ts
greet('Paras'); // Hello Paras
greet(); // Hello Guest
```

Default parameters are often cleaner than checking `undefined` manually.

### 34. Rest parameter?

A rest parameter collects many arguments into an array.

Example:

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}

sum(1, 2, 3); // 6
```

`...numbers: number[]` means:

```text
Accept any number of number arguments and store them in an array.
```

### 35. Function type?

A function type describes the shape of a function.

Example:

```ts
type OnSave = (id: string) => void;
```

This means:

- the function receives one `string`
- the function returns nothing useful

Usage:

```ts
const handleSave: OnSave = (id) => {
  console.log(id);
};
```

This is very common in React props:

```ts
type ButtonProps = {
  onClick: () => void;
};
```

### 36. What is function overload?

Function overload lets one function support multiple call patterns.

Example:

```ts
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return String(value);
}
```

The first two lines are overload signatures. They tell TypeScript how the function can be called.

The last function is the implementation.

Use overloads when one function behaves differently depending on input types. Do not overuse them; union types are simpler for many cases.

## Type Inference

### 37. What is type inference?

Type inference means TypeScript guesses the type from the value.

Example:

```ts
const name = 'Paras';
```

TypeScript infers:

```ts
string
```

You do not need to write:

```ts
const name: string = 'Paras';
```

Beginner rule:

```text
If the value clearly shows the type, let TypeScript infer it.
```

### 38. What is type inference in array?

TypeScript can infer the type of array items.

Example:

```ts
const names = ['Paras', 'Amit'];
```

TypeScript infers:

```ts
string[]
```

Mixed values create a union:

```ts
const ids = ['u1', 101];
```

TypeScript infers:

```ts
(string | number)[]
```

For empty arrays, give an explicit type:

```ts
const users: User[] = [];
```

Without the type, TypeScript may not know what items will be added later.

### 39. When should we add explicit types?

Add explicit types when TypeScript cannot safely guess or when the type is important for readers.

Good places:

- function parameters
- API responses
- Redux state
- public exported functions
- values starting as `null`
- empty arrays
- complex objects

Example:

```ts
const [account, setAccount] = useState<Account | null>(null);
```

Why explicit? Because `null` alone does not tell TypeScript that later the value can become an `Account`.

### 40. What is contextual typing?

Contextual typing means TypeScript understands a type from where the code is used.

Example:

```tsx
<input
  onChange={(event) => {
    console.log(event.target.value);
  }}
/>
```

You did not manually type `event`, but TypeScript knows it is an input change event because it is inside an input `onChange`.

This is common in React. TypeScript uses the JSX context to infer event types.

## Type Narrowing

### 41. What is type narrowing, and how do type guards work?

Type narrowing is when TypeScript looks at code level and figures out a more specific type for a variable.

Type narrowing is the process of refining a variable's type from a broad, general type (like a string or number) to a more specific type (like a specific string or boolean) within a specific code block. It is commonly used when handling union types.

- The Problem: Sometimes a variable can be more than one thing (like a string OR a number).

- The Solution: TypeScript watches your logic. If you write code that only works for strings, TypeScript "narrows" the type to just string inside that section.

Example:

```ts
function print(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

At first, `value` is:

```ts
string | number
```

Inside the `if`, TypeScript knows it is a `string`. Inside the `else`, TypeScript knows it is a `number`.

Common narrowing tools:

- `typeof`
- `instanceof`
- `in`
- equality checks
- truthy/falsy checks
- custom type guards using `is`

Custom type guard:

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

How Do Type Guards Work?
-  A type guard is the actual test you write to check the type. It is the condition inside an if statement that filters out the wrong types.

Here are the three most common ways to write a type guard:
- Using typeof: Checks basic types like strings or numbers.
- Using instanceof: Checks if something was made from a specific blueprint (class).
- Using in: Checks if an object contains a specific property.


### 42. typeof narrowing?

`typeof` checks primitive JavaScript types.

Example:

```ts
function print(value: string | number) {
  if (typeof value === 'string') {
    value.toUpperCase();
  } else {
    value.toFixed(2);
  }
}
```

Use `typeof` for:

- `string`
- `number`
- `boolean`
- `undefined`
- `function`
- `symbol`
- `bigint`

### 43. instanceof narrowing?

`instanceof` checks whether a value was created from a class or constructor.

Example:

```ts
function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
}
```

This is useful in `catch` blocks because caught errors can be unpredictable.

In this app, this pattern appears in error handling:

```ts
error instanceof Error ? error.message : 'Something went wrong'
```

### 44. in operator narrowing?

The `in` operator checks whether a property exists in an object.

Example:

```ts
type Admin = { role: 'admin'; permissions: string[] };
type Member = { role: 'member' };

function printUser(user: Admin | Member) {
  if ('permissions' in user) {
    console.log(user.permissions);
  }
}
```

Inside the `if`, TypeScript knows `user` must be `Admin` because only `Admin` has `permissions`.

Use this when different object types have different properties.

### 45. Discriminated union?

A discriminated union is a union where every option has a common literal property.

Example:

```ts
type State =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };
```

The shared property is `status`.

Now TypeScript can understand the exact shape:

```ts
function render(state: State) {
  switch (state.status) {
    case 'loading':
      return 'Loading';
    case 'success':
      return state.data.join(', ');
    case 'error':
      return state.message;
  }
}
```

When `status` is `'success'`, TypeScript knows `data` exists. When `status` is `'error'`, TypeScript knows `message` exists.

## Generics

### 46. What are Generics in TypeScript? Give examples in functions, classes, and type aliases.

Generics let you write reusable code without losing type information.

Without generics, people often use `any`:

```ts
function wrapInArray(value: any): any[] {
  return [value];
}
```

This works, but it loses safety.

With generics:

```ts
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const names = wrapInArray('Paras'); // string[]
const ages = wrapInArray(25); // number[]
```

`T` is a placeholder for a type. TypeScript fills it in based on what you pass.

Generic class:

```ts
class Store<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}
```

Generic type alias:

```ts
type ApiResponse<T> = {
  data: T;
  message: string;
};
```

In this app, generic API response types allow the same wrapper to work with `Account`, `User`, `Team`, or other models.

### 47. Generic constraint?

A generic constraint limits what type is allowed.

Example:

```ts
function getId<T extends { id: string }>(item: T): string {
  return item.id;
}
```

This means:

```text
T can be any type, but it must have an id property of type string.
```

Valid:

```ts
getId({ id: '1', name: 'Paras' });
```

Invalid:

```ts
getId({ name: 'Paras' }); // error
```

Constraints are useful when you want flexibility, but still need certain properties.

## Utility Types

### 48. What are utility types?

Utility types are built-in TypeScript helpers that transform existing types.

Instead of writing new types manually every time, you can reuse and modify existing ones.

Common utility types:

- `Partial<T>`
- `Required<T>`
- `Readonly<T>`
- `Pick<T, K>`
- `Omit<T, K>`
- `Record<K, T>`
- `Exclude<T, U>`
- `ReturnType<T>`
- `Parameters<T>`
- `Awaited<T>`

Beginner idea:

```text
Utility types are type shortcuts.
```

### 49. Partial?

`Partial<T>` makes every property optional.

Example:

```ts
type User = {
  name: string;
  email: string;
};

type UserUpdate = Partial<User>;
```

`UserUpdate` becomes:

```ts
{
  name?: string;
  email?: string;
}
```

This is useful when updating only some fields.

In this app:

```ts
setFilters(state, action: PayloadAction<Partial<UserFilters>>) {
  state.filters = {
    ...state.filters,
    ...action.payload
  };
}
```

Only the changed filter fields need to be passed.

### 50. Required?

`Required<T>` makes every optional property required.

Example:

```ts
type DraftUser = {
  name?: string;
  email?: string;
};

type CompleteDraftUser = Required<DraftUser>;
```

`CompleteDraftUser` becomes:

```ts
{
  name: string;
  email: string;
}
```

Use it when you have a draft shape but later need the complete version.

### 51. Readonly?

`Readonly<T>` makes every property readonly.

Example:

```ts
type User = {
  id: string;
  name: string;
};

type ReadonlyUser = Readonly<User>;
```

Now this is not allowed:

```ts
const user: ReadonlyUser = {
  id: '1',
  name: 'Paras'
};

user.name = 'Amit'; // error
```

Use it when a function should read data but not mutate it.

### 52. Pick?

`Pick<T, K>` selects only some properties from a type.

Example:

```ts
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type UserPreview = Pick<User, 'id' | 'name'>;
```

`UserPreview` becomes:

```ts
{
  id: string;
  name: string;
}
```

Use `Pick` when you only need part of a larger type.

### 53. Omit?

`Omit<T, K>` removes some properties from a type.

Example:

```ts
type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type CreateUser = Omit<User, 'id' | 'createdAt'>;
```

`CreateUser` becomes:

```ts
{
  name: string;
  email: string;
}
```

Use `Omit` when creating data where server-generated fields should not be provided by the frontend.

### 54. Record?

`Record<K, T>` creates an object type with known key types and value types.

Example:

```ts
type RoleLabels = Record<'admin' | 'member', string>;

const roleLabels: RoleLabels = {
  admin: 'Admin',
  member: 'Member'
};
```

This means:

```text
The keys must be admin/member, and each value must be a string.
```

In this app, lookup maps can use `Record`:

```ts
Record<string, UserProfile | null>
```

That means keys are strings and values are either `UserProfile` or `null`.

### 55. Exclude?

`Exclude<T, U>` removes members from a union.

Example:

```ts
type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
type FinishedStatus = Exclude<Status, 'idle' | 'loading'>;
```

`FinishedStatus` becomes:

```ts
'succeeded' | 'failed'
```

Use it when you already have a union but need a smaller version of it.

### 56. ReturnType?

`ReturnType<T>` gets the return type of a function.

Example:

```ts
function getUser() {
  return { id: '1', name: 'Paras' };
}

type User = ReturnType<typeof getUser>;
```

TypeScript looks at what `getUser` returns and creates a type from it.

Use this when you do not want to manually duplicate a function's return shape.

### 57. Parameters?

`Parameters<T>` gets the parameter types of a function as a tuple.

Example:

```ts
function createUser(name: string, age: number) {}

type CreateUserParams = Parameters<typeof createUser>;
```

`CreateUserParams` becomes:

```ts
[string, number]
```

This is useful when wrapping or reusing function signatures.

### 58. Awaited?

`Awaited<T>` gets the resolved value type of a Promise.

Example:

```ts
type User = Awaited<Promise<{ id: string }>>;
```

`User` becomes:

```ts
{ id: string }
```

This is useful when working with async functions and API calls.

## Classes and Access Modifiers

### 59. Does TypeScript support classes?

Yes. TypeScript supports JavaScript classes and adds type checking.

Example:

```ts
class User {
  constructor(public name: string) {}

  greet() {
    return `Hello ${this.name}`;
  }
}
```

The `public name: string` shortcut creates a property and assigns it from the constructor argument.

Classes are less common in React components now, but they still appear in services, models, utilities, and backend code.

### 60. public, private, protected?

These control where class properties can be accessed.

`public` means accessible everywhere.

```ts
class Account {
  public email: string;
}
```

`private` means accessible only inside the class.

```ts
class Account {
  private passwordHash: string;
}
```

`protected` means accessible inside the class and subclasses.

```ts
class Account {
  protected role: string;
}
```

Beginner idea:

```text
public = everyone
private = only this class
protected = this class and child classes
```

### 61. What is the difference between extends and implements in TypeScript?

`extends` is for inheritance.

`implements` is for checking that a class follows an interface.

Interface extends interface:

```ts
interface BaseUser {
  id: string;
}

interface AdminUser extends BaseUser {
  role: 'admin';
}
```

Class extends class:

```ts
class Animal {
  move() {
    return 'moving';
  }
}

class Dog extends Animal {}
```

Class implements interface:

```ts
interface CanLogin {
  login(): void;
}

class AccountService implements CanLogin {
  login() {
    console.log('Logged in');
  }
}
```

Simple answer:

```text
extends reuses behavior or fields. implements checks that a class matches a required shape.
```

### 62. readonly?

In a class, `readonly` means a property can be assigned when created, but not changed later.

Example:

```ts
class User {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
```

This is valid:

```ts
const user = new User('1');
```

This is invalid:

```ts
user.id = '2'; // error
```

Use it for values that should stay stable, like IDs.

## Enums and Alternatives

### 63. What is enum?

An enum defines named constants.

Example:

```ts
enum Role {
  Admin = 'admin',
  Member = 'member'
}
```

You can use it like:

```ts
const role = Role.Admin;
```

Enums are useful, but many React TypeScript projects prefer string union types because they are simpler and produce less JavaScript.

### 64. enum vs union type?

Union type:

```ts
type Role = 'admin' | 'member';
```

Enum:

```ts
enum Role {
  Admin = 'admin',
  Member = 'member'
}
```

Union types are often enough:

```ts
const role: Role = 'admin';
```

This app uses unions:

```ts
export type AccountRole = 'admin' | 'manager' | 'member';
```

Beginner recommendation:

```text
For simple fixed string choices, use union types.
```

## Type Assertions

### 65. What is type assertion?

Type assertion tells TypeScript to treat a value as a specific type.

Example:

```ts
const input = document.querySelector('input') as HTMLInputElement;
```

This tells TypeScript:

```text
Trust me, this element is an HTMLInputElement.
```

Important: assertion does not change the runtime value.

If you assert incorrectly, TypeScript may stop warning you but the app can still crash.

Use assertions carefully.

### 66. as vs angle bracket assertion?

Both can assert types:

```ts
const value = input as string;
const value2 = <string>input;
```

In React/TSX, prefer `as`.

Why? Because angle brackets conflict with JSX syntax:

```tsx
<UserCard />
```

So in React projects, this is the common style:

```ts
const input = element as HTMLInputElement;
```

### 67. What is non-null assertion?

The non-null assertion operator `!` tells TypeScript:

```text
This value is not null or undefined.
```

Example:

```ts
inputRef.current!.focus();
```

This removes the TypeScript error, but it can be dangerous. If `current` is actually null, the app crashes.

Safer:

```ts
inputRef.current?.focus();
```

Beginner rule:

```text
Prefer checking or optional chaining. Use ! only when you are truly sure.
```

## TypeScript With React

### 68. How to type React component props?

Create a type for the props object.

Example:

```tsx
type UserCardProps = {
  name: string;
  email: string;
};

const UserCard = ({ name, email }: UserCardProps) => {
  return <p>{name} - {email}</p>;
};
```

This means the component must receive:

- `name`
- `email`

This is invalid:

```tsx
<UserCard name="Paras" /> // error because email is missing
```

Props typing helps prevent wrong component usage.

### 69. How to type children?

`children` is the content placed inside a component.

Example:

```tsx
<Card>
  <p>Hello</p>
</Card>
```

Type it with `React.ReactNode`:

```tsx
type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <section>{children}</section>;
};
```

`React.ReactNode` allows text, elements, fragments, null, and more.

### 70. How to type useState?

Sometimes TypeScript can infer state:

```tsx
const [count, setCount] = useState(0);
```

Here TypeScript knows `count` is a number.

But when starting with `null`, you should provide a type:

```tsx
const [account, setAccount] = useState<Account | null>(null);
```

This means:

```text
account starts as null, but later can be an Account.
```

Without the explicit type, TypeScript may think the state can only be `null`.

### 71. How to type event handlers?

React events have specific types.

Input change:

```tsx
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setName(event.target.value);
};
```

Form submit:

```tsx
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};
```

Why type events? Because then TypeScript knows what properties exist on `event.target` or `event.currentTarget`.

### 72. How to type useRef?

`useRef` can store a DOM element or a mutable value.

DOM ref example:

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);

inputRef.current?.focus();
```

Why `null`? Before the input renders, the ref has no element yet.

So the type is:

```ts
HTMLInputElement | null
```

Use optional chaining to avoid crashes:

```ts
inputRef.current?.focus();
```

### 73. How to type button props?

If you build a reusable button, you may want it to accept normal button props plus custom props.

Example:

```tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};
```

This means the component supports:

- normal button props like `onClick`, `disabled`, `type`
- custom `isLoading`

This pattern is useful for components like `LoadingButton`.

### 74. React.FC vs normal function?

`React.FC` is one way to type components, but many teams prefer normal functions with explicit props.

With normal function:

```tsx
type Props = {
  name: string;
};

const UserCard = ({ name }: Props) => {
  return <p>{name}</p>;
};
```

This is simple and clear.

`React.FC` can be okay, but it adds opinions that are not always needed. For beginners, explicit props are easier to understand.

## TypeScript With Redux Toolkit

### 75. How to type RootState?

`RootState` is the type of the entire Redux state.

In this app:

```ts
export type RootState = ReturnType<typeof store.getState>;
```

This means TypeScript asks the store:

```text
What shape does your state have?
```

Then it creates the `RootState` type automatically.

This is better than manually writing the whole state shape.

### 76. How to type AppDispatch?

`AppDispatch` is the type of the Redux dispatch function.

In this app:

```ts
export type AppDispatch = typeof store.dispatch;
```

This matters because Redux Toolkit dispatch can handle async thunks.

If you use a typed dispatch, TypeScript understands calls like:

```ts
dispatch(fetchUsers());
```

### 77. Why create typed Redux hooks?

Typed hooks let React components use Redux with proper TypeScript support.

In this app:

```ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

Benefits:

- `dispatch` understands async thunks
- selectors know the state shape
- autocomplete improves
- mistakes are caught earlier

Instead of using raw `useDispatch` and `useSelector`, components use `useAppDispatch` and `useAppSelector`.

### 78. How to type createAsyncThunk?

`createAsyncThunk` has generic type parameters.

Example:

```ts
export const fetchUsers = createAsyncThunk<
  ApiListResponse<User>,
  UserListQuery | undefined,
  { state: RootState; rejectValue: string }
>('users/fetchUsers', async (query, { rejectWithValue }) => {
  try {
    return await usersApi.getUsers(query);
  } catch {
    return rejectWithValue('Unable to load users');
  }
});
```

The three generic parts mean:

```text
1. What the thunk returns on success
2. What argument the thunk accepts
3. Extra config, such as state and rejectValue
```

This makes async Redux logic much safer.

### 79. How to type PayloadAction?

`PayloadAction<T>` tells TypeScript what type `action.payload` has.

Example:

```ts
import type { PayloadAction } from '@reduxjs/toolkit';

setFilters(state, action: PayloadAction<Partial<UserFilters>>) {
  state.filters = {
    ...state.filters,
    ...action.payload
  };
}
```

Here TypeScript knows:

```ts
action.payload // Partial<UserFilters>
```

That prevents reducers from using the wrong payload shape.

## API Typing

### 80. How to type API response?

API response types describe what the backend sends.

Example:

```ts
export type ApiItemResponse<T> = {
  data: T;
};
```

Usage:

```ts
const response = await http.get<ApiItemResponse<Account>>('/auth/session');
```

Now TypeScript knows:

```ts
response.data // Account
```

This gives autocomplete and catches wrong property access.

### 81. How to type list API response?

List APIs usually return an array and sometimes metadata.

Example:

```ts
export type ApiListResponse<T> = {
  data: T[];
  meta: {
    pagination: UserPagination;
    summary: UserSummary;
  };
};
```

Usage:

```ts
const response = await http.get<ApiListResponse<User>>('/users');
```

Now TypeScript knows:

```ts
response.data // User[]
response.meta.pagination.page // number
```

### 82. Why type API responses?

API responses are one of the most important places to use TypeScript.

Without types:

```ts
const userName = response.user.full_name;
```

This might be wrong, but JavaScript will not warn you until runtime.

With types, TypeScript can catch mistakes:

- wrong property names
- missing data
- wrong assumptions about arrays vs objects
- wrong nullable values

Important limitation:

```text
TypeScript does not validate runtime API data by itself.
```

For critical data, use runtime validation with tools like Zod.

### 83. How to type fetch wrapper?

A fetch wrapper can use generics so every API call can specify its response type.

Example:

```ts
const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(path);
  return (await response.json()) as T;
};
```

Usage:

```ts
const account = await request<ApiItemResponse<Account>>('/auth/session');
```

In this project, `frontend/src/services/http.ts` uses this idea. The caller says what type is expected, and the wrapper returns `Promise<T>`.

## tsconfig and Compiler

### 84. How would you migrate a JavaScript project to TypeScript?

Do it gradually. Do not rewrite everything in one attempt.

Steps:

- install `typescript`
- install needed `@types/*` packages
- add `tsconfig.json`
- rename a few files from `.js` to `.ts`
- rename React files from `.jsx` to `.tsx`
- type shared utilities first
- type API responses
- type components and state
- slowly enable stricter checks

Beginner advice:

```text
Start with boundaries: API data, props, forms, and shared functions.
```

That gives the most value early.

### 85. What is tsconfig.json, and why is it important?

`tsconfig.json` tells TypeScript how to check and compile the project.

It controls:

- JavaScript target version
- module format
- JSX support
- strict mode
- included files
- path aliases
- module resolution

Example:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
```

In this app, `frontend/tsconfig.app.json` enables `strict: true`, which helps catch hidden bugs.

### 86. What is strict mode?

`strict` turns on TypeScript's strongest common safety checks.

It includes checks like:

- `strictNullChecks`
- `noImplicitAny`
- `strictFunctionTypes`
- more careful type checking

Why it matters:

```ts
let name: string = null; // error with strictNullChecks
```

Strict mode may feel difficult at first, but it prevents many real bugs.

Interview answer:

```text
Strict mode makes TypeScript safer by catching more possible bugs during compilation.
```

### 87. What is noImplicitAny?

`noImplicitAny` reports an error when TypeScript would silently use `any`.

Example:

```ts
function add(a, b) {
  return a + b;
}
```

If TypeScript cannot infer `a` and `b`, it may treat them as `any`. With `noImplicitAny`, TypeScript asks you to be explicit:

```ts
function add(a: number, b: number) {
  return a + b;
}
```

This keeps type safety from silently disappearing.

### 88. What is strictNullChecks?

`strictNullChecks` means `null` and `undefined` are not allowed unless you explicitly include them.

Example:

```ts
let name: string = null; // error
let value: string | null = null; // ok
```

This prevents common crashes like:

```ts
account.name.toUpperCase();
```

If `account` can be null, TypeScript forces you to handle it:

```ts
account?.name.toUpperCase();
```

## Advanced Types

### 89. What is conditional type?

A conditional type chooses one type or another based on a condition.

Example:

```ts
type IsString<T> = T extends string ? true : false;
```

Meaning:

```text
If T is a string, type is true. Otherwise, type is false.
```

Example:

```ts
type A = IsString<string>; // true
type B = IsString<number>; // false
```

Conditional types are advanced. You do not need them every day, but utility types often use them internally.

### 90. What is the infer keyword used for in TypeScript?

`infer` is used inside conditional types to extract a type.

Example:

```ts
type UnwrapPromise<T> = T extends Promise<infer Result> ? Result : T;
```

Meaning:

```text
If T is a Promise, extract the promised result type.
Otherwise, keep T as it is.
```

Example:

```ts
type AccountResult = UnwrapPromise<Promise<Account>>;
```

`AccountResult` becomes:

```ts
Account
```

This is advanced, but the simple idea is:

```text
infer lets TypeScript capture part of another type.
```

### 91. What is mapped type?

A mapped type creates a new type by looping over keys of another type.

Example:

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

This means:

```text
For every key K in T, make that property optional.
```

This is similar to how `Partial<T>` works.

If this feels difficult, remember:

```text
Mapped type = loop over properties at type level
```

### 92. What are keyof, typeof, and in in TypeScript?

`keyof` creates a union of object keys.

```ts
type User = {
  id: string;
  name: string;
};

type UserKey = keyof User; // 'id' | 'name'
```

`typeof` creates a type from an existing value.

```ts
const roles = ['admin', 'manager', 'member'] as const;
type Role = (typeof roles)[number];
```

`in` can narrow object unions at runtime.

```ts
if ('permissions' in user) {
  console.log(user.permissions);
}
```

Beginner memory:

```text
keyof = keys of a type
typeof = type of a value
in = check property exists
```

### 93. What is template literal type?

Template literal types build string types using template syntax.

Example:

```ts
type Method = 'GET' | 'POST';
type ApiRoute = `/api/${string}`;
type RequestKey = `${Method} ${ApiRoute}`;
```

This can create types like:

```text
GET /api/users
POST /api/auth/login
```

Use this when strings follow a pattern.

### 94. What is satisfies operator?

`satisfies` checks that a value matches a type without losing the specific inferred type.

Example:

```ts
const routes = {
  home: '/',
  signin: '/signin'
} satisfies Record<string, string>;
```

This means:

```text
Make sure routes is a Record<string, string>, but keep the exact keys home and signin.
```

It is useful when you want checking without widening too much.

### 95. What is const assertion?

`as const` tells TypeScript to infer the most specific readonly type.

Example:

```ts
const roles = ['admin', 'manager', 'member'] as const;
```

Without `as const`, TypeScript may infer:

```ts
string[]
```

With `as const`, TypeScript infers:

```ts
readonly ['admin', 'manager', 'member']
```

Then you can create a union:

```ts
type Role = (typeof roles)[number];
```

`Role` becomes:

```ts
'admin' | 'manager' | 'member'
```

## Common TypeScript Mistakes

### 96. Overusing any

Using `any` too much removes TypeScript's benefit.

Bad:

```ts
const data: any = await api.get();
data.whatever.deep.fake.call();
```

TypeScript will not warn you.

Better:

```ts
const data = await api.get<ApiItemResponse<Account>>();
```

Now TypeScript knows the response shape.

Use `any` only as a temporary escape hatch.

### 97. Trusting type assertion too much

Type assertions do not validate runtime data.

Bad:

```ts
const account = response as Account;
```

This only tells TypeScript:

```text
Trust me.
```

If the backend returns the wrong shape, the app can still break.

Better:

- type API responses
- validate critical data
- avoid unnecessary assertions
- use runtime validation for important external data

### 98. Ignoring null and undefined

Many runtime crashes happen because a value is `null` or `undefined`.

Bad:

```ts
account.name.toUpperCase();
```

If `account` is null, this crashes.

Good:

```ts
account?.name.toUpperCase();
```

Or:

```ts
if (account) {
  account.name.toUpperCase();
}
```

TypeScript helps only if your types honestly include `null` when it is possible.

### 99. Creating too complex types

Types should make code easier to understand.

Bad sign:

```text
You cannot explain the type in plain English.
```

If a type becomes too complex:

- split it into smaller named types
- use simpler object shapes
- avoid clever conditional types unless needed
- prefer readability over showing off

Good TypeScript should help the next developer.

### 100. Confusing optional and nullable

Optional means the property may be missing.

```ts
type Result = {
  devOtp?: string;
};
```

Nullable means the property exists, but its value may be null.

```ts
type Account = {
  sessionExpiresAt: string | null;
};
```

Difference:

```text
optional = property may not exist
nullable = property exists, value can be null
```

This distinction matters when reading API responses.

## TypeScript With This App

### 101. How this app types auth status?

This app uses literal union types for auth status.

Example:

```ts
export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';
```

This prevents invalid statuses:

```ts
const status: AuthStatus = 'done'; // error
```

Why it helps:

- components know all possible states
- reducers cannot set random strings
- UI conditions become safer

### 102. How this app types roles?

Roles are typed with string unions.

```ts
export type AccountRole = 'admin' | 'manager' | 'member';
export type UserRole = 'admin' | 'manager' | 'member';
```

This means only these roles are allowed.

Invalid:

```ts
const role: AccountRole = 'owner'; // error
```

This is useful for role-based UI and access checks.

### 103. How this app types form values?

Forms use object types to describe the exact fields.

Example:

```ts
export type SignUpValues = {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};
```

This helps because submit handlers know exactly what data exists.

If you misspell a field:

```ts
values.fullname; // error
```

TypeScript catches it.

### 104. How this app types paginated users?

Pagination data has its own type.

```ts
export type UserPagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
```

The list response includes data and metadata:

```ts
export type ApiListResponse<T> = {
  data: T[];
  meta: {
    pagination: UserPagination;
    summary: UserSummary;
  };
};
```

This tells components:

- `data` is an array
- `pagination.page` is a number
- `hasNextPage` is a boolean

### 105. How this app types selectors?

Selectors read data from Redux state.

Example:

```ts
export const selectAccount = (state: RootState) => state.auth.account;
```

Usage:

```ts
const account = useAppSelector(selectAccount);
```

Because `state` is typed as `RootState`, TypeScript knows:

- what slices exist
- what fields exist inside each slice
- what type the selector returns

This improves autocomplete and prevents wrong state access.

## Negative Oriented TypeScript Interview Questions

### 106. Can TypeScript prevent all runtime errors?

No. TypeScript catches many type mistakes before runtime, but it cannot guarantee runtime data is correct.

Example:

```ts
const response = await fetch('/api/account');
const data = (await response.json()) as Account;
```

If the backend returns the wrong shape, TypeScript will not magically know.

TypeScript is compile-time safety. Runtime data still needs runtime validation when it matters.

### 107. Does TypeScript exist at runtime?

No. TypeScript types are removed during compilation.

This:

```ts
type User = { name: string };
```

does not exist in the final JavaScript.

That means you cannot do runtime checks like:

```ts
if (user instanceof User) {} // not valid for type aliases
```

Types help before the code runs.

### 108. Is type assertion safe?

Not always.

Type assertion tells TypeScript to trust you.

Example:

```ts
const account = response as Account;
```

This does not check if `response` really has account fields.

Safer approach:

- use accurate API types
- check unknown data
- validate critical data
- avoid assertions when TypeScript can infer correctly

### 109. Why can any be dangerous?

`any` disables type checking.

Example:

```ts
const user: any = null;
user.name.toUpperCase(); // compiles, crashes
```

TypeScript does not warn because `any` says:

```text
Do not check this value.
```

Use `unknown` when data is unpredictable and then narrow it safely.

### 110. Can TypeScript replace backend validation?

No.

Frontend TypeScript can be bypassed because users can send requests directly to the backend.

Backend must validate:

- required fields
- field types
- permissions
- business rules
- security rules

TypeScript improves frontend correctness, but backend validation protects the system.

### 111. Can TypeScript make JavaScript faster?

Not directly.

TypeScript compiles to JavaScript. Runtime speed depends on the JavaScript that runs and the app logic.

TypeScript can indirectly help performance by making refactors safer and preventing bugs, but it is not a performance optimizer by itself.

### 112. What happens if types are wrong?

Wrong types give false confidence.

Example:

```ts
type ApiResponse = { data: Account };
```

But backend returns:

```json
{
  "account": {}
}
```

TypeScript may think `data` exists, but runtime data does not match.

This is why API contracts and runtime validation matter.

Beginner warning:

```text
Types are only useful if they describe reality.
```

### 113. When should we avoid complex generic types?

Avoid complex generics when they make code harder to understand than the problem itself.

Bad sign:

```text
You need five minutes to understand one type.
```

Prefer simple types when possible:

```ts
type UserFormValues = {
  name: string;
  email: string;
};
```

Use advanced generics only when they remove real duplication or protect important shared logic.

## Final TypeScript Interview Checklist

Must know:

- TypeScript basics
- static typing
- primitive types
- array and tuple
- readonly tuple
- array type inference
- union and intersection
- literal types
- type alias
- interface
- type vs interface
- extends vs implements
- optional properties
- readonly
- readonly vs const
- any vs unknown
- void vs never
- type inference
- type narrowing
- type guards
- generics
- generics in functions/classes/type aliases
- generic constraints
- keyof
- typeof/in
- utility types
- Partial/Required/Readonly/Pick/Omit/Record/Exclude
- infer
- satisfies/as const
- type assertions
- non-null assertion
- enum vs union type
- tsconfig
- JavaScript to TypeScript migration
- strict mode
- React props typing
- React state typing
- event typing
- useState/useRef typing
- Redux RootState/AppDispatch
- API response typing
- runtime validation limitations

Strong answer pattern:

```text
Definition -> Simple example -> Why it matters -> Common mistake
```

Example:

```text
unknown means a value can be anything, but TypeScript forces us to narrow it before use. For example, in a catch block we check error instanceof Error before reading error.message. It is safer than any because any disables type checking. The pitfall is using type assertion to bypass narrowing too often.
```
