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
- better autocomplete
- safer refactoring
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

### 11. What is union type?

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

### 12. What is literal type?

Literal type allows exact values.

Example:

```ts
type Direction = 'left' | 'right' | 'up' | 'down';
```

Only those values are allowed.

### 13. What is any?

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

### 14. What is unknown?

`unknown` means value can be anything, but you must narrow it before using.

Example:

```ts
let value: unknown = 'hello';

if (typeof value === 'string') {
  console.log(value.toUpperCase());
}
```

`unknown` is safer than `any`.

### 15. any vs unknown?

`any` allows everything without checks.

`unknown` requires type checking before use.

Example:

```ts
let a: any = 'hello';
a.toUpperCase(); // allowed

let b: unknown = 'hello';
b.toUpperCase(); // error
```

### 16. What is void?

`void` means function returns nothing.

Example:

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

### 17. What is never?

`never` means value never occurs.

Use cases:

- function always throws
- infinite loop
- exhaustive checks

Example:

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

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

### 18. null vs undefined in TypeScript?

`undefined` usually means value is not assigned.

`null` usually means intentionally empty.

Example:

```ts
type Account = {
  sessionExpiresAt: string | null;
};
```

## Type Alias and Interface

### 19. What is type alias?

Type alias gives a name to a type.

Example:

```ts
type User = {
  id: string;
  name: string;
};
```

### 20. What is interface?

Interface defines object shape.

Example:

```ts
interface User {
  id: string;
  name: string;
}
```

### 21. type vs interface?

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

### 22. Can interface extend another interface?

Yes.

```ts
interface BaseUser {
  id: string;
}

interface AdminUser extends BaseUser {
  role: 'admin';
}
```

### 23. Can type extend another type?

Yes, using intersection.

```ts
type BaseUser = {
  id: string;
};

type AdminUser = BaseUser & {
  role: 'admin';
};
```

### 24. What is intersection type?

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

## Object Types

### 25. How to type an object?

```ts
type User = {
  id: string;
  name: string;
  email: string;
};
```

### 26. Optional property?

Use `?`.

```ts
type OtpRequestResult = {
  deliveryTarget: string;
  devOtp?: string;
};
```

`devOtp` may be `string` or `undefined`.

### 27. Readonly property?

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

### 28. Index signature?

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

### 29. Record type?

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

### 30. How to type function parameters and return?

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Arrow function:

```ts
const add = (a: number, b: number): number => a + b;
```

### 31. Optional function parameter?

```ts
function greet(name?: string) {
  return `Hello ${name || 'Guest'}`;
}
```

### 32. Default parameter?

```ts
function greet(name = 'Guest') {
  return `Hello ${name}`;
}
```

TypeScript infers `name` as string.

### 33. Rest parameter?

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}
```

### 34. Function type?

```ts
type OnSave = (id: string) => void;

const handleSave: OnSave = (id) => {
  console.log(id);
};
```

### 35. What is function overload?

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

### 36. What is type inference?

TypeScript can automatically infer types.

Example:

```ts
const name = 'Paras';
```

TypeScript infers:

```ts
string
```

### 37. When should we add explicit types?

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

### 38. What is contextual typing?

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

### 39. What is type narrowing?

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

### 40. typeof narrowing?

```ts
if (typeof value === 'string') {
  value.toUpperCase();
}
```

### 41. instanceof narrowing?

```ts
if (error instanceof Error) {
  console.log(error.message);
}
```

This pattern is used in this app:

```ts
error instanceof Error ? error.message : 'Something went wrong'
```

### 42. in operator narrowing?

```ts
type Admin = { role: 'admin'; permissions: string[] };
type Member = { role: 'member' };

function printUser(user: Admin | Member) {
  if ('permissions' in user) {
    console.log(user.permissions);
  }
}
```

### 43. Discriminated union?

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

### 44. What are generics?

Generics allow types to be passed as parameters.

Example:

```ts
function identity<T>(value: T): T {
  return value;
}

identity<string>('hello');
identity<number>(10);
```

### 45. Why use generics?

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

### 46. Generic API response example?

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

### 47. Generic list response example?

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

### 48. Generic constraint?

Constraint limits allowed type.

```ts
function getId<T extends { id: string }>(item: T): string {
  return item.id;
}
```

Only objects with `id` are allowed.

### 49. keyof operator?

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

### 50. What are utility types?

Utility types are built-in helpers for transforming types.

Common utility types:

- `Partial<T>`
- `Required<T>`
- `Readonly<T>`
- `Pick<T, K>`
- `Omit<T, K>`
- `Record<K, T>`
- `ReturnType<T>`
- `Parameters<T>`
- `Awaited<T>`

### 51. Partial?

Makes all properties optional.

```ts
type UserUpdate = Partial<User>;
```

### 52. Required?

Makes all properties required.

```ts
type CompleteUser = Required<User>;
```

### 53. Pick?

Selects specific properties.

```ts
type UserPreview = Pick<User, 'id' | 'name'>;
```

### 54. Omit?

Removes properties.

```ts
type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
```

### 55. ReturnType?

Gets return type of a function.

```ts
function getUser() {
  return { id: '1', name: 'Paras' };
}

type User = ReturnType<typeof getUser>;
```

### 56. Parameters?

Gets parameter tuple type of a function.

```ts
function createUser(name: string, age: number) {}

type CreateUserParams = Parameters<typeof createUser>; // [string, number]
```

### 57. Awaited?

Gets resolved type of a Promise.

```ts
type User = Awaited<Promise<{ id: string }>>;
```

## Classes and Access Modifiers

### 58. Does TypeScript support classes?

Yes.

```ts
class User {
  constructor(public name: string) {}

  greet() {
    return `Hello ${this.name}`;
  }
}
```

### 59. public, private, protected?

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

### 60. readonly?

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

### 61. What is enum?

Enum defines named constants.

```ts
enum Role {
  Admin = 'admin',
  Member = 'member'
}
```

### 62. enum vs union type?

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

### 63. What is type assertion?

Type assertion tells TypeScript to treat value as a specific type.

Example:

```ts
const input = document.querySelector('input') as HTMLInputElement;
```

Use carefully. It does not change runtime value.

### 64. as vs angle bracket assertion?

Both can assert types:

```ts
const value = input as string;
const value2 = <string>input;
```

In React/TSX, prefer `as` because angle brackets conflict with JSX.

### 65. What is non-null assertion?

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

### 66. How to type React component props?

```tsx
type UserCardProps = {
  name: string;
  email: string;
};

const UserCard = ({ name, email }: UserCardProps) => {
  return <p>{name} - {email}</p>;
};
```

### 67. How to type children?

```tsx
type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <section>{children}</section>;
};
```

### 68. How to type useState?

Inferred:

```tsx
const [count, setCount] = useState(0);
```

Explicit:

```tsx
const [account, setAccount] = useState<Account | null>(null);
```

### 69. How to type event handlers?

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

### 70. How to type useRef?

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

Use:

```tsx
inputRef.current?.focus();
```

### 71. How to type button props?

```tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};
```

This allows all normal button props plus custom props.

### 72. React.FC vs normal function?

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

### 73. How to type RootState?

This app uses:

```ts
export type RootState = ReturnType<typeof store.getState>;
```

This automatically derives state type from store.

### 74. How to type AppDispatch?

This app uses:

```ts
export type AppDispatch = typeof store.dispatch;
```

### 75. Why create typed Redux hooks?

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

### 76. How to type createAsyncThunk?

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

### 77. How to type PayloadAction?

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

### 78. How to type API response?

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

### 79. How to type list API response?

```ts
export type ApiListResponse<T> = {
  data: T[];
  meta: {
    pagination: UserPagination;
    summary: UserSummary;
  };
};
```

### 80. Why type API responses?

Benefits:

- frontend knows exact response shape
- prevents wrong property access
- safer refactoring
- better autocomplete
- catches backend/frontend contract mismatch early

### 81. How to type fetch wrapper?

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

### 82. What is tsconfig.json?

`tsconfig.json` configures TypeScript compiler.

It controls:

- target JavaScript version
- module system
- strict mode
- JSX
- included files
- path aliases

### 83. What is strict mode?

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

### 84. What is noImplicitAny?

It reports error when TypeScript cannot infer a type and would use `any`.

Example:

```ts
function add(a, b) {
  return a + b;
}
```

With `noImplicitAny`, `a` and `b` need types.

### 85. What is strictNullChecks?

When enabled, `null` and `undefined` are not assignable to other types unless explicitly included.

Example:

```ts
let name: string = null; // error
let value: string | null = null; // ok
```

## Advanced Types

### 86. What is conditional type?

Conditional type chooses type based on condition.

```ts
type IsString<T> = T extends string ? true : false;
```

### 87. What is mapped type?

Mapped type creates new type by mapping over keys.

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

This is similar to `Partial<T>`.

### 88. What is template literal type?

Template literal types build string types.

```ts
type Method = 'GET' | 'POST';
type ApiRoute = `/api/${string}`;
type RequestKey = `${Method} ${ApiRoute}`;
```

### 89. What is satisfies operator?

`satisfies` checks that value matches a type without changing inferred literal type.

Example:

```ts
const routes = {
  home: '/',
  signin: '/signin'
} satisfies Record<string, string>;
```

### 90. What is const assertion?

`as const` makes values readonly and literal.

```ts
const roles = ['admin', 'manager', 'member'] as const;

type Role = (typeof roles)[number];
```

## Common TypeScript Mistakes

### 91. Overusing any

Bad:

```ts
const data: any = await api.get();
```

Better:

```ts
const data = await api.get<ApiItemResponse<Account>>();
```

### 92. Trusting type assertion too much

Bad:

```ts
const account = response as Account;
```

If response is wrong at runtime, TypeScript cannot save you.

Better:

- type API responses
- validate critical server data
- avoid unnecessary assertions

### 93. Ignoring null and undefined

Bad:

```ts
account.name.toUpperCase();
```

If account can be null, this crashes.

Good:

```ts
account?.name.toUpperCase();
```

### 94. Creating too complex types

Types should help readability.

If type becomes impossible to understand, simplify it.

### 95. Confusing optional and nullable

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

### 96. How this app types auth status?

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

### 97. How this app types roles?

```ts
export type AccountRole = 'admin' | 'manager' | 'member';
export type UserRole = 'admin' | 'manager' | 'member';
```

This ensures only supported roles are used.

### 98. How this app types form values?

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

### 99. How this app types paginated users?

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

### 100. How this app types Redux state?

```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

This avoids manually writing the entire Redux state type.

### 101. How this app types selectors?

```ts
export const selectAccount = (state: RootState) => state.auth.account;
```

Usage:

```ts
const account = useAppSelector(selectAccount);
```

### 102. Why typed hooks are useful?

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

### 103. Can TypeScript prevent all runtime errors?

No.

TypeScript checks types at compile time, but runtime data can still be wrong.

Example:

```ts
const response = await fetch('/api/account');
const data = (await response.json()) as Account;
```

If backend returns wrong shape, TypeScript will not know at runtime.

Use runtime validation for critical data.

### 104. Does TypeScript exist at runtime?

No.

Types are removed during compilation.

Example:

```ts
type User = { name: string };
```

This type does not exist in generated JavaScript.

### 105. Is type assertion safe?

Not always.

Type assertion tells compiler to trust you.

It does not validate runtime value.

### 106. Why can any be dangerous?

`any` disables type checking.

This can hide bugs.

Example:

```ts
const user: any = null;
user.name.toUpperCase(); // compiles, crashes
```

### 107. Can TypeScript replace backend validation?

No.

Frontend TypeScript can be bypassed.

Backend must still validate request data.

### 108. Can TypeScript make JavaScript faster?

Not directly.

TypeScript improves developer experience and correctness, but it compiles to JavaScript.

Runtime performance depends on generated JavaScript and app logic.

### 109. What happens if types are wrong?

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

### 110. When should we avoid complex generic types?

Avoid them when they make code hard to understand.

Good TypeScript should improve readability, not become a puzzle.

## Most Important Short Answers

### 111. TypeScript in one line

```text
TypeScript is JavaScript with static type checking.
```

### 112. type vs interface in one line

```text
interface is best for object contracts; type is more flexible for unions, intersections, primitives, and advanced types.
```

### 113. any vs unknown in one line

```text
any disables type checking, while unknown requires narrowing before use.
```

### 114. Generic in one line

```text
Generics allow reusable code while preserving type information.
```

### 115. Union type in one line

```text
A union type allows a value to be one of multiple possible types.
```

### 116. Type narrowing in one line

```text
Type narrowing refines a broad type into a specific type using checks like typeof, instanceof, or in.
```

### 117. Utility types in one line

```text
Utility types are built-in helpers like Partial, Pick, Omit, and Record that transform existing types.
```

### 118. RootState in one line

```text
RootState is the inferred type of the Redux store state.
```

### 119. Optional property in one line

```text
An optional property may be missing or undefined.
```

### 120. never in one line

```text
never represents a value that should never occur.
```

## Final TypeScript Interview Checklist

Must know:

- TypeScript basics
- static typing
- primitive types
- array and tuple
- union and intersection
- literal types
- type alias
- interface
- type vs interface
- optional properties
- readonly
- any vs unknown
- void vs never
- type inference
- type narrowing
- generics
- generic constraints
- keyof
- utility types
- Partial/Pick/Omit/Record
- type assertions
- non-null assertion
- enum vs union type
- tsconfig
- strict mode
- React props typing
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
