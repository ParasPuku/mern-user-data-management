# TypeScript Interview Questions and Answers

This document covers commonly asked TypeScript interview questions with concise answers, examples, and practical notes from this MERN app frontend.

## How to Use This Document

Use this file for:

- TypeScript interview revision
- understanding type system fundamentals
- preparing React + TypeScript answers
- revising Redux Toolkit typing
- learning common TypeScript mistakes
- explaining app-specific TypeScript usage

## TypeScript Basics

### 1. What is TypeScript?

TypeScript is a strongly typed superset of JavaScript.

It adds static typing to JavaScript and compiles to plain JavaScript.

Interview answer:

```text
TypeScript is a superset of JavaScript that adds static type checking. It helps catch errors during development and improves code maintainability, autocomplete, and refactoring.
```

### 2. Is TypeScript a separate language from JavaScript?

TypeScript is built on JavaScript.

Every valid JavaScript file is valid TypeScript, but TypeScript adds extra syntax for types.

Example:

```ts
const name: string = 'Paras';
```

This compiles to JavaScript:

```js
const name = 'Paras';
```

### 3. Does TypeScript run in the browser?

No.

Browsers run JavaScript, not TypeScript.

TypeScript must be compiled/transpiled to JavaScript.

### 4. Why use TypeScript?

Benefits:

- catches errors before runtime
- better autocomplete - Autocomplete in TypeScript works through a background mechanism called the TypeScript Language Service (TSServer), which parses your code structure and maps data types to provide real-time editor suggestions.
- safer refactoring - Refactoring in TypeScript is the process of improving the internal structure of your code without altering its external runtime behavior.
- self-documenting code
- better large-app maintainability
- typed API responses
- fewer runtime bugs

### 5. What are disadvantages of TypeScript?

Disadvantages:

- learning curve
- extra setup
- more code for types
- compile-time errors to manage
- types can become complex
- wrong types can give false confidence

Interview answer:

```text
TypeScript improves safety and maintainability, but it adds learning curve, build step, and type complexity. It is most valuable in medium and large projects.
```

### 6. TypeScript vs JavaScript?

JavaScript:

- dynamically typed
- errors often found at runtime
- no compilation required

TypeScript:

- statically typed
- errors found at compile time
- compiles to JavaScript

Example:

```js
function add(a, b) {
  return a + b;
}
```

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

## Basic Types

### 7. What are basic TypeScript types?

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

### 8. How to type string, number, boolean?

```ts
const name: string = 'Paras';
const age: number = 25;
const isActive: boolean = true;
```

### 9. How to type arrays?

Two common ways:

```ts
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ['Paras', 'Amit'];
```

### 10. What is tuple?

Tuple is an array with fixed length and fixed types.

Example:

```ts
const user: [string, number] = ['Paras', 25];
```

Tuple order matters.

### 11. What are readonly tuples?

Readonly tuples are tuples whose items cannot be reassigned after creation.

Example:

```ts
const user: readonly [string, number] = ['Paras', 25];

user[0] = 'Amit'; // error
```

You can also use `as const` to infer a readonly tuple:

```ts
const coordinates = [10, 20] as const;
```

Readonly tuples are useful when a fixed-position array should behave like immutable data.

### 12. What is union type?

Union type allows a value to be one of multiple types.

Example:

```ts
type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

const status: Status = 'loading';
```

In this app:

```ts
export type AccountRole = 'admin' | 'manager' | 'member';
export type UserStatus = 'active' | 'inactive';
```

### 13. What is literal type?

Literal type allows exact values.

Example:

```ts
type Direction = 'left' | 'right' | 'up' | 'down';
```

Only those values are allowed.

### 14. What is any?

`any` disables TypeScript checking for a value.

Example:

```ts
let data: any = 'hello';
data = 10;
data.test();
```

Avoid `any` unless truly necessary.

Interview answer:

```text
any tells TypeScript to skip type checking. It is flexible but unsafe because it removes the benefits of TypeScript.
```

### 15. What is unknown?

`unknown` means value can be anything, but you must narrow it before using.

Example:

```ts
let value: unknown = 'hello';

if (typeof value === 'string') {
  console.log(value.toUpperCase());
}
```

`unknown` is safer than `any`.

### 16. any vs unknown?

`any` allows everything without checks.

`unknown` requires type checking before use.

Example:

```ts
let a: any = 'hello';
a.toUpperCase(); // allowed

let b: unknown = 'hello';
b.toUpperCase(); // error
```

### 17. What is void?

`void` means function returns nothing.

void (Returns Nothing): The function starts, does its job, reaches the bottom curly brace }, and successfully stops. It returns nothing to you, but it successfully finishes.

Example:

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

### 18. What is never?

`never` means value never occurs. 

In TypeScript - never is a special type that represents values that will never exist.

Think of it as a dead end. If a variable or a function has the type never, it means that point in your code can absolutely never be reached.

Use cases:

- function always throws
- infinite loop
- exhaustive checks

Example:

```ts
function fail(message: string): never {
  throw new Error(message);
}

function keepRunning(): never {
  while (true) {
    console.log("Running..."); // This loop goes on forever. It never stops to return anything.
  }
}

```

Note - never (Never Finishes): The function starts, but it gets permanently stuck or crashes. It never reaches the bottom of the function. It is physically impossible for the execution to get past it.

Exhaustive check:

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

### 19. null vs undefined in TypeScript?

`undefined` usually means value is not assigned.

`null` usually means intentionally empty.

Example:

```ts
type Account = {
  sessionExpiresAt: string | null;
};
```

## Type Alias and Interface

### 20. What is type alias?

Type alias gives a name to a type. 

Type Alias: Requires an = sign.

Type aliases can represent unions, intersections, primitives, and more complex composite types.

Example:

```ts
type User = {
  id: string;
  name: string;
};
```

Type Alias: Can be anything, including Union Types (a list of allowed choices).

```ts
// You CANNOT do this with an interface
type DoorState = "open" | "closed" | "locked"; 
type ID = string | number;
```

### 21. What is interface?

Interface defines object shape.

Interface: Does not use an = sign. 

Interfaces can be extended using extends, which makes them ideal for hierarchical object models.

Example:

```ts
interface User {
  id: string;
  name: string;
}
```

Interface uses extends -

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string; // Dog now has name and breed
}
```

Interface: Can only be an object { }.

### 22. type vs interface?

Both can define object shapes.

`interface`:

- extendable
- supports declaration merging
- commonly used for public object contracts

`type`:

- can represent unions
- can represent primitives
- can represent tuples
- can use mapped/conditional types

Example:

```ts
type Status = 'idle' | 'loading';
```

This cannot be done with interface.

Interview answer:

```text
interface is best for object contracts and extension. type is more flexible because it can represent unions, primitives, tuples, and advanced type operations.
```

### 23. Can interface extend another interface?

Yes.

```ts
interface BaseUser {
  id: string;
}

interface AdminUser extends BaseUser {
  role: 'admin';
}
```

### 24. Can type extend another type?

Yes, using intersection.

```ts
type BaseUser = {
  id: string;
};

type AdminUser = BaseUser & {
  role: 'admin';
};
```

### 25. What is intersection type?

Intersection combines multiple types.

Example from this app pattern:

```ts
export type User = UserFormValues & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
```

This means `User` has all fields from `UserFormValues` plus `id`, `createdAt`, and `updatedAt`.

### 26. What are union and intersection types in TypeScript?

Union means one of several possible types.

Intersection means all combined types together.

Union example:

```ts
type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
```

The value must be one of those exact strings.

Intersection example:

```ts
type User = UserFormValues & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
```

The final `User` type contains the fields from `UserFormValues` plus the extra fields.

Interview answer:

```text
A union type represents alternatives, while an intersection type combines multiple types into one.
```

## Object Types

### 27. How to type an object?

```ts
type User = {
  id: string;
  name: string;
  email: string;
};
```

### 28. Optional property?

Use `?`.

```ts
type OtpRequestResult = {
  deliveryTarget: string;
  devOtp?: string;
};
```

`devOtp` may be `string` or `undefined`.

### 29. Readonly property?

```ts
type User = {
  readonly id: string;
  name: string;
};
```

Cannot reassign:

```ts
user.id = '2'; // error
```

### 30. What is the difference between readonly and const in TypeScript?

`const` applies to a variable binding.

`readonly` applies to object properties or class properties.

Example:

```ts
const user = {
  id: '1',
  name: 'Paras'
};

user.name = 'Amit'; // allowed because object properties are still mutable
```

Readonly example:

```ts
type User = {
  readonly id: string;
  name: string;
};

user.id = '2'; // error
```

Interview answer:

```text
const prevents reassigning a variable. readonly prevents changing a property through TypeScript.
```

### 31. Index signature?

Index signature allows dynamic keys.

```ts
type Errors = {
  [field: string]: string;
};
```

Example:

```ts
const errors: Errors = {
  email: 'Invalid email',
  password: 'Required'
};
```

### 32. Record type?

`Record<K, V>` creates object type with keys K and values V.

Example:

```ts
type RoleLabels = Record<'admin' | 'member', string>;

const labels: RoleLabels = {
  admin: 'Admin',
  member: 'Member'
};
```

## Functions

### 33. How to type function parameters and return?

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Arrow function:

```ts
const add = (a: number, b: number): number => a + b;
```

### 34. Optional function parameter?

```ts
function greet(name?: string) {
  return `Hello ${name || 'Guest'}`;
}
```

### 35. Default parameter?

```ts
function greet(name = 'Guest') {
  return `Hello ${name}`;
}
```

TypeScript infers `name` as string.

### 36. Rest parameter?

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}
```

### 37. What are optional and rest parameters in TypeScript?

Optional parameters use `?` and may be `undefined`.

```ts
function greet(name?: string) {
  return `Hello ${name ?? 'Guest'}`;
}
```

Rest parameters collect multiple arguments into an array.

```ts
function sum(...numbers: number[]) {
  return numbers.reduce((total, number) => total + number, 0);
}
```

Optional parameters are useful when an argument may not be passed. Rest parameters are useful when a function accepts any number of values of the same type.

### 38. Function type?

```ts
type OnSave = (id: string) => void;

const handleSave: OnSave = (id) => {
  console.log(id);
};
```

### 39. What is function overload?

Function overload defines multiple call signatures.

Example:

```ts
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return String(value);
}
```

## Type Inference

### 40. What is type inference?

TypeScript can automatically infer types.

Example:

```ts
const name = 'Paras';
```

TypeScript infers:

```ts
string
```

### 41. What is type inference in array?

TypeScript can infer an array's item type from its values.

Example:

```ts
const names = ['Paras', 'Amit'];
```

TypeScript infers:

```ts
string[]
```

Mixed values create a union array:

```ts
const ids = ['u1', 101];
```

TypeScript infers:

```ts
(string | number)[]
```

If the array starts empty, add an explicit type:

```ts
const users: User[] = [];
```

### 42. When should we add explicit types?

Add explicit types for:

- function parameters
- API responses
- complex objects
- public exports
- state that starts as null/empty

Example:

```ts
const [account, setAccount] = useState<Account | null>(null);
```

### 43. What is contextual typing?

TypeScript infers type from context.

Example:

```tsx
<input
  onChange={(event) => {
    console.log(event.target.value);
  }}
/>
```

TypeScript knows `event` is an input change event because of JSX context.

## Type Narrowing

### 44. What is type narrowing?

Narrowing means TypeScript reduces a broad type to a specific type after checks.

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

### 45. What is type narrowing, and how does TypeScript implement it?

TypeScript implements narrowing through control-flow analysis.

It watches checks like:

- `typeof`
- `instanceof`
- `in`
- equality checks
- truthy/falsy checks
- discriminated union switches
- custom type guard functions

Example:

```ts
function printLength(value: string | string[] | null) {
  if (!value) {
    return 0;
  }

  if (typeof value === 'string') {
    return value.length;
  }

  return value.length;
}
```

After `if (!value)`, TypeScript removes `null`. After `typeof value === 'string'`, TypeScript knows that branch is a string and the final branch is `string[]`.

### 46. What is type narrowing, and how do type guards work?

Type narrowing means reducing a broad type to a more specific type after a runtime check.

Common type guards:

- `typeof`
- `instanceof`
- `in`
- custom functions using `is`

Example:

```ts
function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
}
```

Custom type guard:

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

After `isString(value)` is true, TypeScript knows `value` is a string.

### 47. typeof narrowing?

```ts
if (typeof value === 'string') {
  value.toUpperCase();
}
```

### 48. instanceof narrowing?

```ts
if (error instanceof Error) {
  console.log(error.message);
}
```

This pattern is used in this app:

```ts
error instanceof Error ? error.message : 'Something went wrong'
```

### 49. in operator narrowing?

```ts
type Admin = { role: 'admin'; permissions: string[] };
type Member = { role: 'member' };

function printUser(user: Admin | Member) {
  if ('permissions' in user) {
    console.log(user.permissions);
  }
}
```

### 50. Discriminated union?

A union where each type has a common literal property.

Example:

```ts
type State =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

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

## Generics

### 51. What are generics?

Generics allow types to be passed as parameters.

Example:

```ts
function identity<T>(value: T): T {
  return value;
}

identity<string>('hello');
identity<number>(10);
```

### 52. Why use generics?

Generics make code reusable while preserving type safety.

Without generic:

```ts
function identity(value: any): any {
  return value;
}
```

With generic:

```ts
function identity<T>(value: T): T {
  return value;
}
```

### 53. What are Generics in TypeScript? Give examples in functions, classes, and type aliases.

Generics let you write reusable code where the type is provided later.

Generic function:

```ts
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const names = wrapInArray('Paras'); // string[]
const ages = wrapInArray(25); // number[]
```

Generic class:

```ts
class Store<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}

type SimpleUser = {
  id: string;
  name: string;
};

const userStore = new Store<SimpleUser>({ id: '1', name: 'Paras' });
```

Generic type alias:

```ts
type ApiResponse<T> = {
  data: T;
  message: string;
};

type UserResponse = ApiResponse<User>;
```

In this app, generic API response types like `ApiItemResponse<T>` allow the same response wrapper to work with `Account`, `User`, `Team`, or any other data model safely.

### 54. Generic API response example?

This app uses:

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

### 55. Generic list response example?

This app uses:

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

### 56. Generic constraint?

Constraint limits allowed type.

```ts
function getId<T extends { id: string }>(item: T): string {
  return item.id;
}
```

Only objects with `id` are allowed.

### 57. keyof operator?

`keyof` creates union of object keys.

```ts
type User = {
  id: string;
  name: string;
};

type UserKey = keyof User; // 'id' | 'name'
```

Generic example:

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

## Utility Types

### 58. What are utility types?

Utility types are built-in helpers for transforming types.

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

### 59. Partial?

Makes all properties optional.

```ts
type UserUpdate = Partial<User>;
```

Use case:

```ts
setFilters(state, action: PayloadAction<Partial<UserFilters>>) {
  state.filters = {
    ...state.filters,
    ...action.payload
  };
}
```

This is useful when updating only some fields of an object.

### 60. Required?

Makes all properties required.

```ts
type CompleteUser = Required<User>;
```

Example:

```ts
type DraftUser = {
  name?: string;
  email?: string;
};

type CompleteDraftUser = Required<DraftUser>;
```

Now `name` and `email` must both be present.

### 61. Readonly?

Makes all properties readonly.

```ts
type ReadonlyUser = Readonly<User>;
```

Example:

```ts
const user: Readonly<User> = {
  id: '1',
  name: 'Paras',
  email: 'paras@example.com',
  role: 'admin',
  status: 'active',
  createdAt: '2026-06-27',
  updatedAt: '2026-06-27'
};

user.name = 'Amit'; // error
```

`Readonly<T>` is useful when a function should read data but not mutate it.

### 62. Pick?

Selects specific properties.

```ts
type UserPreview = Pick<User, 'id' | 'name'>;
```

Use case:

```ts
type UserContact = Pick<User, 'name' | 'email'>;
```

### 63. Omit?

Removes properties.

```ts
type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
```

Use case:

```ts
type NewUserValues = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
```

### 64. Record?

Creates an object type with known key types and value types.

```ts
type RoleLabels = Record<UserRole, string>;

const roleLabels: RoleLabels = {
  admin: 'Admin',
  manager: 'Manager',
  member: 'Member'
};
```

In this app, `Record<string, UserProfile | null>` is useful for lookup maps like `profilesByUserId`.

### 65. Exclude?

Removes members from a union type.

```ts
type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
type FinishedStatus = Exclude<Status, 'idle' | 'loading'>;
```

`FinishedStatus` becomes:

```ts
'succeeded' | 'failed'
```

### 66. ReturnType?

Gets return type of a function.

```ts
function getUser() {
  return { id: '1', name: 'Paras' };
}

type User = ReturnType<typeof getUser>;
```

### 67. Parameters?

Gets parameter tuple type of a function.

```ts
function createUser(name: string, age: number) {}

type CreateUserParams = Parameters<typeof createUser>; // [string, number]
```

### 68. Awaited?

Gets resolved type of a Promise.

```ts
type User = Awaited<Promise<{ id: string }>>;
```

## Classes and Access Modifiers

### 69. Does TypeScript support classes?

Yes.

```ts
class User {
  constructor(public name: string) {}

  greet() {
    return `Hello ${this.name}`;
  }
}
```

### 70. public, private, protected?

`public`: accessible everywhere.

`private`: accessible only inside class.

`protected`: accessible inside class and subclasses.

Example:

```ts
class Account {
  public email: string;
  private passwordHash: string;
  protected role: string;
}
```

### 71. What is the difference between extends and implements in TypeScript?

`extends` inherits from another class or interface.

`implements` checks that a class follows an interface contract.

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

Interview answer:

```text
extends is for inheritance. implements is for making sure a class satisfies an interface shape.
```

### 72. readonly?

Readonly property cannot be changed after assignment.

```ts
class User {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
```

## Enums and Alternatives

### 73. What is enum?

Enum defines named constants.

```ts
enum Role {
  Admin = 'admin',
  Member = 'member'
}
```

### 74. enum vs union type?

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

For many React apps, string union types are simpler and compile to less JavaScript.

This app uses union types:

```ts
export type AccountRole = 'admin' | 'manager' | 'member';
```

## Type Assertions

### 75. What is type assertion?

Type assertion tells TypeScript to treat value as a specific type.

Example:

```ts
const input = document.querySelector('input') as HTMLInputElement;
```

Use carefully. It does not change runtime value.

### 76. as vs angle bracket assertion?

Both can assert types:

```ts
const value = input as string;
const value2 = <string>input;
```

In React/TSX, prefer `as` because angle brackets conflict with JSX.

### 77. What is non-null assertion?

`!` tells TypeScript value is not null/undefined.

```ts
inputRef.current!.focus();
```

Use carefully. If value is actually null at runtime, app crashes.

Prefer safer:

```ts
inputRef.current?.focus();
```

## TypeScript With React

### 78. How to type React component props?

```tsx
type UserCardProps = {
  name: string;
  email: string;
};

const UserCard = ({ name, email }: UserCardProps) => {
  return <p>{name} - {email}</p>;
};
```

### 79. How to type children?

```tsx
type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <section>{children}</section>;
};
```

### 80. How to type useState?

Inferred:

```tsx
const [count, setCount] = useState(0);
```

Explicit:

```tsx
const [account, setAccount] = useState<Account | null>(null);
```

### 81. How would you define types for props and state of a React component with TypeScript?

Use a props type for data received from the parent and `useState<T>` when TypeScript cannot infer the state safely.

Example:

```tsx
type UserProfileCardProps = {
  user: User;
  onEdit: (id: string) => void;
};

const UserProfileCard = ({ user, onEdit }: UserProfileCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <button onClick={() => onEdit(user.id)} type="button">
      {isOpen ? user.name : user.email}
    </button>
  );
};
```

Common patterns:

- `useState(false)` can infer `boolean`
- `useState<User | null>(null)` needs an explicit union
- callback props should type their parameters and return value
- optional props should use `?`

### 82. How to type event handlers?

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

### 83. How to type useRef?

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

Use:

```tsx
inputRef.current?.focus();
```

### 84. How to type button props?

```tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};
```

This allows all normal button props plus custom props.

### 85. React.FC vs normal function?

`React.FC` automatically includes children in older patterns and has some opinions.

Many teams prefer normal function with explicit props:

```tsx
type Props = {
  name: string;
};

const UserCard = ({ name }: Props) => {
  return <p>{name}</p>;
};
```

## TypeScript With Redux Toolkit

### 86. How to type RootState?

This app uses:

```ts
export type RootState = ReturnType<typeof store.getState>;
```

This automatically derives state type from store.

### 87. How to type AppDispatch?

This app uses:

```ts
export type AppDispatch = typeof store.dispatch;
```

### 88. Why create typed Redux hooks?

This app uses:

```ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

Benefits:

- typed dispatch
- typed selectors
- better autocomplete
- safer async thunk dispatch

### 89. How to type createAsyncThunk?

Example pattern:

```ts
export const fetchUsers = createAsyncThunk<
  ApiListResponse<User>,
  UserListQuery | undefined,
  { state: RootState; rejectValue: string }
>('users/fetchUsers', async (query, { rejectWithValue }) => {
  try {
    return await usersApi.getUsers(query);
  } catch (error) {
    return rejectWithValue('Unable to load users');
  }
});
```

Generic parameters:

```text
Returned payload type
Argument type
Thunk config type
```

### 90. How to type PayloadAction?

```ts
import type { PayloadAction } from '@reduxjs/toolkit';

setFilters(state, action: PayloadAction<Partial<UserFilters>>) {
  state.filters = {
    ...state.filters,
    ...action.payload
  };
}
```

## API Typing

### 91. How to type API response?

This app uses generic API response types:

```ts
export type ApiItemResponse<T> = {
  data: T;
};
```

Usage:

```ts
const response = await http.get<ApiItemResponse<Account>>('/auth/session');
```

### 92. How to type list API response?

```ts
export type ApiListResponse<T> = {
  data: T[];
  meta: {
    pagination: UserPagination;
    summary: UserSummary;
  };
};
```

### 93. Why type API responses?

Benefits:

- frontend knows exact response shape
- prevents wrong property access
- safer refactoring
- better autocomplete
- catches backend/frontend contract mismatch early

### 94. How to type fetch wrapper?

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

## tsconfig and Compiler

### 95. How would you migrate a JavaScript project to TypeScript?

Migrate gradually instead of rewriting everything at once.

Practical steps:

- install `typescript` and required `@types/*` packages
- add a `tsconfig.json`
- start with important boundaries like API responses, shared utilities, and React props
- rename `.js` to `.ts` and `.jsx` to `.tsx` feature by feature
- replace unsafe `any` with proper types or `unknown`
- enable stricter compiler options as the codebase becomes cleaner

Interview answer:

```text
I would migrate incrementally. First I would add TypeScript configuration and type packages, then type shared utilities, API contracts, state, and components. I would avoid a big-bang rewrite and gradually increase strictness until the project is safe.
```

### 96. What is tsconfig.json, and why is it important?

`tsconfig.json` tells TypeScript how to compile and check a project.

It controls things like:

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

In this app, `frontend/tsconfig.app.json` enables `strict: true`, which makes the frontend safer by catching more type issues during development.

### 97. What is strict mode?

`strict` enables stricter type checking.

It includes:

- `strictNullChecks`
- `noImplicitAny`
- `strictFunctionTypes`
- `strictBindCallApply`
- more checks

Interview answer:

```text
Strict mode makes TypeScript safer by catching more possible bugs during compilation.
```

### 98. What is noImplicitAny?

It reports error when TypeScript cannot infer a type and would use `any`.

Example:

```ts
function add(a, b) {
  return a + b;
}
```

With `noImplicitAny`, `a` and `b` need types.

### 99. What is strictNullChecks?

When enabled, `null` and `undefined` are not assignable to other types unless explicitly included.

Example:

```ts
let name: string = null; // error
let value: string | null = null; // ok
```

## Advanced Types

### 100. What is conditional type?

Conditional type chooses type based on condition.

```ts
type IsString<T> = T extends string ? true : false;
```

### 101. What is the infer keyword used for in TypeScript?

`infer` is used inside conditional types to extract part of another type.

Example:

```ts
type UnwrapPromise<T> = T extends Promise<infer Result> ? Result : T;

type AccountResult = UnwrapPromise<Promise<Account>>;
```

`AccountResult` becomes `Account`.

Common use cases:

- extracting Promise result types
- extracting function return types
- extracting array item types
- building reusable advanced utility types

### 102. What is mapped type?

Mapped type creates new type by mapping over keys.

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

This is similar to `Partial<T>`.

### 103. What are keyof, typeof, and in in TypeScript?

`keyof` creates a union of an object type's keys.

```ts
type User = {
  id: string;
  name: string;
};

type UserKey = keyof User; // 'id' | 'name'
```

`typeof` can create a type from an existing value.

```ts
const roles = ['admin', 'manager', 'member'] as const;

type Role = (typeof roles)[number];
```

`in` can narrow unions at runtime.

```ts
type Admin = { permissions: string[] };
type Member = { teamId: string };

function printUser(user: Admin | Member) {
  if ('permissions' in user) {
    console.log(user.permissions);
  }
}
```

### 104. What is template literal type?

Template literal types build string types.

```ts
type Method = 'GET' | 'POST';
type ApiRoute = `/api/${string}`;
type RequestKey = `${Method} ${ApiRoute}`;
```

### 105. What is satisfies operator?

`satisfies` checks that value matches a type without changing inferred literal type.

Example:

```ts
const routes = {
  home: '/',
  signin: '/signin'
} satisfies Record<string, string>;
```

### 106. What is const assertion?

`as const` makes values readonly and literal.

```ts
const roles = ['admin', 'manager', 'member'] as const;

type Role = (typeof roles)[number];
```

## Common TypeScript Mistakes

### 107. Overusing any

Bad:

```ts
const data: any = await api.get();
```

Better:

```ts
const data = await api.get<ApiItemResponse<Account>>();
```

### 108. Trusting type assertion too much

Bad:

```ts
const account = response as Account;
```

If response is wrong at runtime, TypeScript cannot save you.

Better:

- type API responses
- validate critical server data
- avoid unnecessary assertions

### 109. Ignoring null and undefined

Bad:

```ts
account.name.toUpperCase();
```

If account can be null, this crashes.

Good:

```ts
account?.name.toUpperCase();
```

### 110. Creating too complex types

Types should help readability.

If type becomes impossible to understand, simplify it.

### 111. Confusing optional and nullable

Optional:

```ts
devOtp?: string;
```

Means property may be missing or undefined.

Nullable:

```ts
sessionExpiresAt: string | null;
```

Means property exists but value may be null.

## TypeScript With This App

### 112. How this app types auth status?

```ts
export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';
```

This prevents invalid values:

```ts
const status: AuthStatus = 'done'; // error
```

### 113. How this app types roles?

```ts
export type AccountRole = 'admin' | 'manager' | 'member';
export type UserRole = 'admin' | 'manager' | 'member';
```

This ensures only supported roles are used.

### 114. How this app types form values?

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

Form submit handlers can safely use these fields.

### 115. How this app types paginated users?

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

API list response:

```ts
export type ApiListResponse<T> = {
  data: T[];
  meta: {
    pagination: UserPagination;
    summary: UserSummary;
  };
};
```

### 116. How this app types Redux state?

```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

This avoids manually writing the entire Redux state type.

### 117. How this app types selectors?

```ts
export const selectAccount = (state: RootState) => state.auth.account;
```

Usage:

```ts
const account = useAppSelector(selectAccount);
```

### 118. Why typed hooks are useful?

Typed hooks:

```ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

Benefits:

- `dispatch` knows async thunks
- selectors know state shape
- better autocomplete
- fewer mistakes

## Negative Oriented TypeScript Interview Questions

### 119. Can TypeScript prevent all runtime errors?

No.

TypeScript checks types at compile time, but runtime data can still be wrong.

Example:

```ts
const response = await fetch('/api/account');
const data = (await response.json()) as Account;
```

If backend returns wrong shape, TypeScript will not know at runtime.

Use runtime validation for critical data.

### 120. Does TypeScript exist at runtime?

No.

Types are removed during compilation.

Example:

```ts
type User = { name: string };
```

This type does not exist in generated JavaScript.

### 121. Is type assertion safe?

Not always.

Type assertion tells compiler to trust you.

It does not validate runtime value.

### 122. Why can any be dangerous?

`any` disables type checking.

This can hide bugs.

Example:

```ts
const user: any = null;
user.name.toUpperCase(); // compiles, crashes
```

### 123. Can TypeScript replace backend validation?

No.

Frontend TypeScript can be bypassed.

Backend must still validate request data.

### 124. Can TypeScript make JavaScript faster?

Not directly.

TypeScript improves developer experience and correctness, but it compiles to JavaScript.

Runtime performance depends on generated JavaScript and app logic.

### 125. What happens if types are wrong?

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

TypeScript may not catch it unless the fetch layer validates runtime data.

### 126. When should we avoid complex generic types?

Avoid them when they make code hard to understand.

Good TypeScript should improve readability, not become a puzzle.

## Most Important Short Answers

### 127. TypeScript in one line

```text
TypeScript is JavaScript with static type checking.
```

### 128. type vs interface in one line

```text
interface is best for object contracts; type is more flexible for unions, intersections, primitives, and advanced types.
```

### 129. any vs unknown in one line

```text
any disables type checking, while unknown requires narrowing before use.
```

### 130. Generic in one line

```text
Generics allow reusable code while preserving type information.
```

### 131. Union type in one line

```text
A union type allows a value to be one of multiple possible types.
```

### 132. Type narrowing in one line

```text
Type narrowing refines a broad type into a specific type using checks like typeof, instanceof, or in.
```

### 133. Utility types in one line

```text
Utility types are built-in helpers like Partial, Pick, Omit, and Record that transform existing types.
```

### 134. RootState in one line

```text
RootState is the inferred type of the Redux store state.
```

### 135. Optional property in one line

```text
An optional property may be missing or undefined.
```

### 136. never in one line

```text
never represents a value that should never occur.
```

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
Definition -> Example -> Use case -> Pitfall
```

Example:

```text
unknown means a value can be anything, but TypeScript forces us to narrow it before use. For example, in a catch block we check error instanceof Error before reading error.message. It is safer than any because any disables type checking. The pitfall is using type assertion to bypass narrowing too often.
```
