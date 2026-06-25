# TypeScript Problem Solving Interview Programs

This document contains TypeScript coding/programming questions commonly asked in interviews.

The focus is on:

- writing typed functions
- using interfaces and type aliases
- generics
- union types
- type guards
- utility types
- API response typing
- practical frontend/backend style examples

These examples are intentionally simple enough to understand, but they cover the TypeScript concepts interviewers usually test through code.

---

## How To Use This Document

For every problem, try to explain:

1. What type is required?
2. What input does the function accept?
3. What output does the function return?
4. How TypeScript prevents mistakes here?

---

# Basic TypeScript Coding Questions

## 1. Write A Function To Add Two Numbers

### Question

Write a TypeScript function that accepts two numbers and returns their sum.

### Code

```ts
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(10, 20));
```

### Output

```ts
30
```

### Explanation

Both parameters are typed as `number`.

The function return type is also `number`.

This prevents calling the function with invalid values like:

```ts
add('10', 20);
```

TypeScript will show an error before runtime.

---

## 2. Create A User Interface And Print User Details

### Question

Create an interface for a user and write a function to print user details.

### Code

```ts
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function printUser(user: User): string {
  return `${user.name} (${user.email})`;
}

const user: User = {
  id: 1,
  name: 'Paras',
  email: 'paras@gmail.com',
  isActive: true
};

console.log(printUser(user));
```

### Output

```ts
'Paras (paras@gmail.com)'
```

### Explanation

The `User` interface defines the exact shape of the object.

If any required field is missing, TypeScript will show an error.

---

## 3. Filter Active Users From A User Array

### Question

Given an array of users, return only active users.

### Code

```ts
interface User {
  id: number;
  name: string;
  isActive: boolean;
}

function getActiveUsers(users: User[]): User[] {
  return users.filter((user) => user.isActive);
}

const users: User[] = [
  { id: 1, name: 'Amit', isActive: true },
  { id: 2, name: 'Neha', isActive: false },
  { id: 3, name: 'Ravi', isActive: true }
];

console.log(getActiveUsers(users));
```

### Output

```ts
[
  { id: 1, name: 'Amit', isActive: true },
  { id: 3, name: 'Ravi', isActive: true }
]
```

### Explanation

`User[]` means an array of `User` objects.

The return type is also `User[]`.

---

## 4. Use Union Type For Status

### Question

Create a user status type where status can only be `active`, `inactive`, or `pending`.

### Code

```ts
type UserStatus = 'active' | 'inactive' | 'pending';

interface User {
  id: number;
  name: string;
  status: UserStatus;
}

function getStatusMessage(status: UserStatus): string {
  if (status === 'active') {
    return 'User is active';
  }

  if (status === 'inactive') {
    return 'User is inactive';
  }

  return 'User is pending approval';
}

console.log(getStatusMessage('active'));
```

### Output

```ts
'User is active'
```

### Explanation

The `UserStatus` type allows only fixed string values.

This prevents invalid statuses like:

```ts
const status: UserStatus = 'deleted';
```

---

## 5. Handle Optional Properties

### Question

Create a product type where discount is optional.

### Code

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
}

function getFinalPrice(product: Product): number {
  const discount = product.discount ?? 0;
  return product.price - discount;
}

const product: Product = {
  id: 1,
  name: 'Keyboard',
  price: 1000
};

console.log(getFinalPrice(product));
```

### Output

```ts
1000
```

### Explanation

`discount?: number` means discount is optional.

`?? 0` gives a default value when discount is missing.

---

## 6. Convert Array Of Users Into Array Of Emails

### Question

Return only emails from a user array.

### Code

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

function getUserEmails(users: User[]): string[] {
  return users.map((user) => user.email);
}

const users: User[] = [
  { id: 1, name: 'Paras', email: 'paras@gmail.com' },
  { id: 2, name: 'Amit', email: 'amit@gmail.com' }
];

console.log(getUserEmails(users));
```

### Output

```ts
['paras@gmail.com', 'amit@gmail.com']
```

### Explanation

Input is `User[]`.

Output is `string[]` because only emails are returned.

---

# Generic TypeScript Coding Questions

## 7. Create A Generic Identity Function

### Question

Create a function that returns the same value it receives, while preserving the type.

### Code

```ts
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>('hello'));
console.log(identity<number>(100));
```

### Output

```ts
'hello'
100
```

### Explanation

`T` is a generic type parameter.

If input is `string`, return type is `string`.

If input is `number`, return type is `number`.

---

## 8. Create A Generic Function To Wrap Value In Array

### Question

Create a function that accepts any value and returns it inside an array.

### Code

```ts
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const numberArray = wrapInArray(10);
const stringArray = wrapInArray('React');

console.log(numberArray);
console.log(stringArray);
```

### Output

```ts
[10]
['React']
```

### Explanation

If input is `number`, output becomes `number[]`.

If input is `string`, output becomes `string[]`.

---

## 9. Remove Duplicates Using Generic Function

### Question

Create a generic function to remove duplicate values from an array.

### Code

```ts
function removeDuplicates<T>(items: T[]): T[] {
  return [...new Set(items)];
}

console.log(removeDuplicates<number>([1, 2, 2, 3, 3]));
console.log(removeDuplicates<string>(['React', 'Node', 'React']));
```

### Output

```ts
[1, 2, 3]
['React', 'Node']
```

### Explanation

The function works with different data types.

`T[]` means array of any type `T`.

---

## 10. Get Object Property Using keyof

### Question

Create a function that receives an object and a key, then returns the value of that key.

### Code

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: 'Paras',
  email: 'paras@gmail.com'
};

console.log(getProperty(user, 'name'));
console.log(getProperty(user, 'email'));
```

### Output

```ts
'Paras'
'paras@gmail.com'
```

### Explanation

`K extends keyof T` means the key must exist inside the object.

This prevents invalid code:

```ts
getProperty(user, 'mobile');
```

TypeScript will show an error because `mobile` does not exist.

---

## 11. Merge Two Objects With Generics

### Question

Create a function to merge two objects while preserving both object types.

### Code

```ts
function mergeObjects<T, U>(first: T, second: U): T & U {
  return {
    ...first,
    ...second
  };
}

const user = {
  name: 'Paras'
};

const role = {
  role: 'admin'
};

const result = mergeObjects(user, role);

console.log(result.name);
console.log(result.role);
```

### Output

```ts
'Paras'
'admin'
```

### Explanation

`T & U` means the result has properties from both objects.

---

## 12. Create A Generic API Response Type

### Question

Create a reusable API response type for different data.

### Code

```ts
type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: {
    id: 1,
    name: 'Paras'
  },
  message: 'User fetched successfully',
  success: true
};

console.log(userResponse.data.name);
```

### Output

```ts
'Paras'
```

### Explanation

`ApiResponse<T>` can be reused for:

- user response
- product response
- skill response
- paginated response

```ts
// Import stylesheets
import './style.css';

// ==========================================
// 1. Enum Logic (From your original code)
// ==========================================
const enum Shape {
  Circle,
  Square,
}

// This will print "Square" to the browser console (F12)
console.log(Shape['1']);

// ==========================================
// 2. Product API Logic (Strict Handling)
// ==========================================

// Enforce the strict structural typing you defined
interface Product {
  title: string;
}

interface ApiResponse {
  products: Product[];
}

// Select the main container element
const appDiv: HTMLElement | null = document.getElementById('app');

async function loadProducts(): Promise<void> {
  if (!appDiv) return;

  // Set the structural container titles
  appDiv.innerHTML = `
    <h1>Product Titles</h1>
    <div id="content-area">
      <p id="loading">Loading products...</p>
    </div>
  `;

  const contentArea = document.getElementById('content-area');
  if (!contentArea) return;

  try {
    const response = await fetch('https://dummyjson.com/products');
    const contentType = response.headers.get('content-type');

    // Check if the response contains an HTML payload instead of actual JSON
    if (contentType && contentType.includes('text/html')) {
      const interceptedHtml = await response.text();
      throw new Error(`
        Network Blocked: The server or your local proxy returned HTML content instead of JSON data. 
        Raw Intercepted Characters: "${interceptedHtml
          .substring(0, 45)
          .replace(/</g, '&lt;')}"
      `);
    }

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // Parse strictly against your interface schema
    const data: ApiResponse = await response.json();
    contentArea.innerHTML = '';

    // Generate and render the dynamic layout list items
    const list = document.createElement('ul');
    data.products.forEach((product: Product) => {
      const listItem = document.createElement('li');
      listItem.textContent = product.title;
      list.appendChild(listItem);
    });

    contentArea.appendChild(list);
  } catch (error: any) {
    console.error('API Stream Exception:', error);

    contentArea.innerHTML = `
      <div style="color: #d32f2f; background: #ffebee; padding: 16px; border-radius: 4px; border: 1px solid #ffcdd2;">
        <p style="margin-top: 0;"><strong>🚫 Request Terminated</strong></p>
        <p style="font-family: monospace; font-size: 13px; line-height: 1.5; margin: 8px 0; white-space: pre-wrap;">
          ${error.message || error}
        </p>
      </div>
    `;
  }
}

// Run the asynchronous processing cycle
loadProducts();

```

---

## 13. Create A Generic Paginated Response

### Question

Create a reusable type for paginated API results.

### Code

```ts
type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type User = {
  id: number;
  name: string;
};

const response: PaginatedResponse<User> = {
  data: [
    { id: 1, name: 'Paras' },
    { id: 2, name: 'Amit' }
  ],
  pagination: {
    page: 1,
    limit: 10,
    total: 2,
    totalPages: 1
  }
};

console.log(response.data[0].name);
```

### Output

```ts
'Paras'
```

### Explanation

This is useful for real APIs like:

```text
GET /api/users?page=1&limit=10
```

---

# Union, Narrowing, And Type Guard Questions

## 14. Handle String Or Number Using Union Type

### Question

Create a function that accepts either string or number and returns a formatted value.

### Code

```ts
function formatValue(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }

  return value.toFixed(2);
}

console.log(formatValue('hello'));
console.log(formatValue(99.5));
```

### Output

```ts
'HELLO'
'99.50'
```

### Explanation

`typeof value === 'string'` narrows the type to string.

Inside the `if`, TypeScript allows string methods.

Outside the `if`, TypeScript knows it is a number.

---

## 15. Create A Custom Type Guard

### Question

Create a type guard to check whether an object is an admin user.

### Code

```ts
type AdminUser = {
  id: number;
  name: string;
  role: 'admin';
  permissions: string[];
};

type NormalUser = {
  id: number;
  name: string;
  role: 'member';
};

type AppUser = AdminUser | NormalUser;

function isAdminUser(user: AppUser): user is AdminUser {
  return user.role === 'admin';
}

function printPermissions(user: AppUser): void {
  if (isAdminUser(user)) {
    console.log(user.permissions);
    return;
  }

  console.log('No admin permissions');
}

printPermissions({
  id: 1,
  name: 'Paras',
  role: 'admin',
  permissions: ['delete:user']
});
```

### Output

```ts
['delete:user']
```

### Explanation

`user is AdminUser` tells TypeScript that after this check, the user is definitely an admin.

---

## 16. Calculate Area Using Discriminated Union

### Question

Create a function to calculate area of circle, square, and rectangle.

### Code

```ts
type Circle = {
  type: 'circle';
  radius: number;
};

type Square = {
  type: 'square';
  side: number;
};

type Rectangle = {
  type: 'rectangle';
  width: number;
  height: number;
};

type Shape = Circle | Square | Rectangle;

function calculateArea(shape: Shape): number {
  switch (shape.type) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius;
    case 'square':
      return shape.side * shape.side;
    case 'rectangle':
      return shape.width * shape.height;
  }
}

console.log(calculateArea({ type: 'square', side: 5 }));
```

### Output

```ts
25
```

### Explanation

The `type` property is the discriminator.

Based on `shape.type`, TypeScript knows which properties are available.

---

## 17. Add Exhaustive Checking With never

### Question

Make sure all union cases are handled in a switch statement.

### Code

```ts
type PaymentStatus = 'success' | 'failed' | 'pending';

function getPaymentMessage(status: PaymentStatus): string {
  switch (status) {
    case 'success':
      return 'Payment completed';
    case 'failed':
      return 'Payment failed';
    case 'pending':
      return 'Payment pending';
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

console.log(getPaymentMessage('success'));
```

### Output

```ts
'Payment completed'
```

### Explanation

`never` helps catch missing union cases.

If a new status is added but not handled, TypeScript will show an error.

---

# Utility Type Coding Questions

## 18. Update User Using Partial

### Question

Create a function where only some user fields can be updated.

### Code

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
}

function updateUser(user: User, updates: Partial<User>): User {
  return {
    ...user,
    ...updates
  };
}

const user: User = {
  id: 1,
  name: 'Paras',
  email: 'paras@gmail.com',
  role: 'member'
};

console.log(updateUser(user, { role: 'admin' }));
```

### Output

```ts
{
  id: 1,
  name: 'Paras',
  email: 'paras@gmail.com',
  role: 'admin'
}
```

### Explanation

`Partial<User>` makes all `User` fields optional for update.

---

## 19. Create User DTO Using Omit

### Question

Create a type for creating users where `id` should not be accepted from frontend.

### Code

```ts
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

type CreateUserDto = Omit<User, 'id' | 'createdAt'>;

function createUser(payload: CreateUserDto): void {
  console.log('Creating user', payload);
}

createUser({
  name: 'Paras',
  email: 'paras@gmail.com'
});
```

### Explanation

`Omit<User, 'id' | 'createdAt'>` removes fields that should be generated by backend.

This is common in real APIs.

---

## 20. Create User Summary Using Pick

### Question

Create a type that only contains selected fields from `User`.

### Code

```ts
interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

type UserSummary = Pick<User, 'id' | 'name' | 'email'>;

const summary: UserSummary = {
  id: 1,
  name: 'Paras',
  email: 'paras@gmail.com'
};

console.log(summary);
```

### Explanation

`Pick` is useful when only a few fields should be exposed.

Example:

- never expose `passwordHash`
- expose only safe user fields

---

## 21. Use Record For Role Permissions

### Question

Create a permissions object where each role has a list of permissions.

### Code

```ts
type Role = 'admin' | 'manager' | 'member';

const rolePermissions: Record<Role, string[]> = {
  admin: ['create', 'read', 'update', 'delete'],
  manager: ['create', 'read', 'update'],
  member: ['read']
};

function canDelete(role: Role): boolean {
  return rolePermissions[role].includes('delete');
}

console.log(canDelete('admin'));
console.log(canDelete('member'));
```

### Output

```ts
true
false
```

### Explanation

`Record<Role, string[]>` means every role must exist as a key.

If `member` is missing, TypeScript will show an error.

---

## 22. Use Readonly To Prevent Mutation

### Question

Create a readonly user object that cannot be modified.

### Code

```ts
interface User {
  id: number;
  name: string;
}

const user: Readonly<User> = {
  id: 1,
  name: 'Paras'
};

console.log(user.name);

// This will give TypeScript error:
// user.name = 'Amit';
```

### Explanation

`Readonly<User>` prevents direct modification of object properties.

This is useful for immutable data patterns.

---

# Function And Class Coding Questions

## 23. Use Function Overloading

### Question

Create a function that accepts either string or number and returns different output.

### Code

```ts
function formatInput(value: string): string;
function formatInput(value: number): string;
function formatInput(value: string | number): string {
  if (typeof value === 'string') {
    return value.trim().toUpperCase();
  }

  return value.toFixed(2);
}

console.log(formatInput('  react  '));
console.log(formatInput(10));
```

### Output

```ts
'REACT'
'10.00'
```

### Explanation

Function overloads define allowed function signatures.

The final implementation handles all possible input types.

---

## 24. Create A Class With Access Modifiers

### Question

Create a class with public, private, and readonly properties.

### Code

```ts
class BankAccount {
  public readonly accountNumber: string;
  private balance: number;

  constructor(accountNumber: string, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  public deposit(amount: number): void {
    this.balance = this.balance + amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount('ACC123', 1000);
account.deposit(500);

console.log(account.accountNumber);
console.log(account.getBalance());
```

### Output

```ts
'ACC123'
1500
```

### Explanation

- `public` can be accessed outside class
- `private` can be accessed only inside class
- `readonly` can be assigned only once

---

## 25. Type A Reducer Function

### Question

Create a typed counter reducer.

### Code

```ts
type CounterState = {
  count: number;
};

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' };

function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
  }
}

console.log(counterReducer({ count: 1 }, { type: 'increment' }));
```

### Output

```ts
{ count: 2 }
```

### Explanation

The action union allows only valid reducer actions.

Invalid action types are blocked by TypeScript.

---

# Practical Interview Coding Questions

## 26. Type A Debounce Function

### Question

Create a typed debounce function.

### Code

```ts
function debounce<T extends (...args: never[]) => void>(
  callback: T,
  delay: number
) {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const search = debounce((keyword: string) => {
  console.log('Searching', keyword);
}, 500);

search('React');
```

### Explanation

`Parameters<T>` keeps the same parameter types as the original function.

If `search` expects a string, TypeScript prevents passing a number.

---

## 27. Handle unknown Error In catch

### Question

Safely handle errors inside a `catch` block.

### Code

```ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Something went wrong';
}

try {
  throw new Error('API failed');
} catch (error) {
  console.log(getErrorMessage(error));
}
```

### Output

```ts
'API failed'
```

### Explanation

In real projects, caught errors should be treated as `unknown`.

Before accessing `.message`, first narrow the type.

---

## 28. Create A Typed Fetch Wrapper

### Question

Create a reusable fetch function that returns typed data.

### Code

```ts
async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json() as Promise<T>;
}

type User = {
  id: number;
  name: string;
  email: string;
};

async function loadUser() {
  const user = await apiGet<User>('/api/users/1');
  console.log(user.name);
}
```

### Explanation

`apiGet<T>` lets the caller decide the expected response type.

This is common in frontend API service layers.

---

## 29. Create A Type From Constant Object

### Question

Create a type from constant object values.

### Code

```ts
const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  MEMBER: 'member'
} as const;

type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

function assignRole(role: UserRole): void {
  console.log(`Assigned role: ${role}`);
}

assignRole('admin');
assignRole('member');
```

### Explanation

`as const` keeps values as exact literal types.

`UserRole` becomes:

```ts
'admin' | 'manager' | 'member'
```

---

## 30. Create A Tuple Return Type

### Question

Create a function that returns success or error as a tuple.

### Code

```ts
function parseNumber(value: string): [number | null, string | null] {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return [null, 'Invalid number'];
  }

  return [parsed, null];
}

const [value, error] = parseNumber('100');

console.log(value);
console.log(error);
```

### Output

```ts
100
null
```

### Explanation

A tuple defines fixed positions and fixed types.

Here:

- first value is number or null
- second value is error string or null

---

# Type Level Coding Questions

## 31. Create A Nullable Mapped Type

### Question

Create a type where every property can also be `null`.

### Code

```ts
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type User = {
  id: number;
  name: string;
  email: string;
};

type NullableUser = Nullable<User>;

const user: NullableUser = {
  id: 1,
  name: null,
  email: 'paras@gmail.com'
};

console.log(user);
```

### Explanation

This is a mapped type.

It loops over every key of `T` and adds `null` to each property type.

---

## 32. Create A Type To Extract Array Item

### Question

Create a type that extracts the item type from an array.

### Code

```ts
type ArrayItem<T> = T extends Array<infer U> ? U : never;

type Users = {
  id: number;
  name: string;
}[];

type User = ArrayItem<Users>;

const user: User = {
  id: 1,
  name: 'Paras'
};

console.log(user.name);
```

### Explanation

`infer U` extracts the inner item type from an array.

This is a conditional type.

---

## 33. Create A DeepPartial Type

### Question

Create a type where nested object properties are optional.

### Code

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type UserSettings = {
  profile: {
    name: string;
    email: string;
  };
  preferences: {
    theme: string;
    language: string;
  };
};

const settings: DeepPartial<UserSettings> = {
  profile: {
    name: 'Paras'
  }
};

console.log(settings);
```

### Explanation

`Partial<T>` only makes first-level fields optional.

`DeepPartial<T>` makes nested fields optional too.

---

## 34. Create A RequiredFields Type

### Question

Create a type where selected keys are required and the remaining keys stay optional.

### Code

```ts
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

type UserForm = {
  name?: string;
  email?: string;
  mobile?: string;
};

type SignUpForm = RequiredFields<UserForm, 'name' | 'email'>;

const form: SignUpForm = {
  name: 'Paras',
  email: 'paras@gmail.com'
};

console.log(form);
```

### Explanation

This is useful when some fields are mandatory for one screen but optional for another.

---

## 35. Create A Type-Safe Event Map

### Question

Create a function that only allows valid event names and payloads.

### Code

```ts
type AppEvents = {
  login: {
    userId: string;
  };
  logout: {
    userId: string;
  };
  error: {
    message: string;
  };
};

function emitEvent<K extends keyof AppEvents>(
  eventName: K,
  payload: AppEvents[K]
): void {
  console.log(eventName, payload);
}

emitEvent('login', {
  userId: 'user_123'
});

emitEvent('error', {
  message: 'Something failed'
});
```

### Explanation

If event is `login`, payload must have `userId`.

If event is `error`, payload must have `message`.

This is a practical example of type-safe event handling.

---

# Common TypeScript Program Interview Follow-Ups

## 1. Why use generics instead of any?

`any` removes type safety.

Generics preserve type safety while keeping code reusable.

Example:

```ts
function identity<T>(value: T): T {
  return value;
}
```

If input is string, output is string.

If input is number, output is number.

---

## 2. What is the difference between unknown and any?

`any` allows everything without checking.

`unknown` forces you to check the type before using it.

Safer code:

```ts
function printValue(value: unknown) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  }
}
```

---

## 3. Where do we use keyof in real projects?

`keyof` is useful when working with object keys safely.

Common examples:

- sorting by object key
- filtering by field
- getting object property
- table column definitions
- form field helpers

---

## 4. Where do we use utility types in real projects?

Common examples:

```ts
Partial<User>         // update payload
Pick<User, 'id'>      // selected fields
Omit<User, 'password'> // safe response
Record<Role, string[]> // role permissions
Readonly<User>        // immutable object
```

---

## 5. How to explain TypeScript in coding round?

Say this:

```text
I am defining the shape of inputs and outputs first. This helps TypeScript catch invalid usage during development. Then I write the runtime logic like normal JavaScript.
```

---

# Final Practice Checklist

Practice writing these without looking:

- typed add function
- user interface
- filter active users
- union type status
- optional property handling
- generic identity function
- generic remove duplicates
- generic get property with `keyof`
- generic API response
- paginated API response
- custom type guard
- discriminated union
- exhaustive `never` check
- update object using `Partial`
- DTO using `Omit`
- summary using `Pick`
- permissions using `Record`
- readonly object
- function overload
- class with private/public/readonly
- typed reducer
- typed debounce
- unknown error handling
- typed fetch wrapper
- tuple return type
- mapped type
- conditional type
- DeepPartial type
- type-safe event map

