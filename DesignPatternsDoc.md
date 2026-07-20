# Design Patterns in JavaScript and React

Design patterns are reusable ways to solve common software design problems.

They are not fixed rules. They are proven approaches that make code easier to organize, reuse, test, and scale.

Interview answer:

```text
Design patterns are common reusable solutions for recurring coding problems. In JavaScript and React apps, patterns help us separate responsibilities, avoid duplication, make components reusable, and keep business logic maintainable.
```

## SOLID Principles in React

SOLID is a set of five design principles for keeping React components, hooks, and services easy to change and test. They are guidelines, not rules to apply everywhere. Start using them when a feature becomes large or changes often.

| Principle | React meaning |
|---|---|
| Single Responsibility (SRP) | A component, hook, or service should have one main job. |
| Open/Closed (OCP) | Add behavior through props, composition, or configuration instead of repeatedly editing a component. |
| Liskov Substitution (LSP) | Components that share a contract should be interchangeable without surprising the parent. |
| Interface Segregation (ISP) | Pass only the props a component needs; avoid large, unrelated prop objects. |
| Dependency Inversion (DIP) | Depend on injected props, Context, or small service contracts instead of hard-coded implementations. |

### 1. Single Responsibility Principle (SRP)

A class should have only one reason to change — i.e., one job.

Bad:
```jsx
class Report {
  generate() { /* ... */ }
  saveToFile(path) { /* persistence logic mixed in */ }
  sendEmail(address) { /* email logic mixed in */ }
}
```

Good:
```jsx
class Report {
  generate() { /* ... */ }
}
class ReportSaver {
  saveToFile(report, path) { /* ... */ }
}
class ReportMailer {
  sendEmail(report, address) { /* ... */ }
}
```
Now if the storage mechanism changes, only ReportSaver changes — Report and ReportMailer are untouched.

### 2. Open/Closed Principle (OCP)

Classes should be open for extension but closed for modification.

Bad: 
```jsx
class Discount {
  apply(customerType, price) {
    if (customerType === "regular") {
      return price * 0.95;
    } else if (customerType === "vip") {
      return price * 0.80;
    }
    // every new customer type means editing this method
  }
}
```
Good: 
```jsx
class Discount {
  apply(price) { return price; }
}
class RegularDiscount extends Discount {
  apply(price) { return price * 0.95; }
}
class VipDiscount extends Discount {
  apply(price) { return price * 0.80; }
}
```

Adding a new discount type means adding a new class, not editing existing code.


### 3. Liskov Substitution Principle (LSP)

Subclasses should be usable in place of their base class without breaking behavior.
Bad (classic violation):
```jsx
class Bird {
  fly() { /* ... */ }
}

class Penguin extends Bird {
  fly() { throw new Error("Can't fly!"); } // breaks the contract
}
```

Good: 
```jsx
class Bird {}

class FlyingBird extends Bird {
  fly() { /* ... */ }
}

class Penguin extends Bird {
  swim() { /* ... */ }
}
```

Now Penguin doesn't pretend to support a behavior it can't fulfill.


### 4. Interface Segregation Principle (ISP)

Don't force a class to implement methods it doesn't need — prefer many small, specific interfaces over one large one.

```jsx
class Worker {
  work() { /* ... */ }
  eat() { /* ... */ }
}

class Robot extends Worker {
  eat() { throw new Error("Robots don't eat"); } // forced, useless method
}
```

Bad: 
```jsx
class Worker {
  work() { /* ... */ }
  eat() { /* ... */ }
}

class Robot extends Worker {
  eat() { throw new Error("Robots don't eat"); } // forced, useless method
}
```

Good:
```jsx
const Workable = Base => class extends Base {
  work() { /* ... */ }
};
const Eatable = Base => class extends Base {
  eat() { /* ... */ }
};
class Human extends Eatable(Workable(class {})) {}
class Robot extends Workable(class {}) {}
```

This keeps `Avatar` reusable and prevents it from depending on unrelated user fields.

### 5. Dependency Inversion Principle (DIP)

Depend on abstractions, not concrete implementations.

Now UserService works with any database that implements the Database interface, and you can swap implementations freely (or mock it for testing).

Bad: 
```tsx
class MySQLDatabase {
  save(data) { /* ... */ }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase(); // tightly coupled to one implementation
  }
}
```
Good:

```tsx
class Database {
  save(data) { /* ... */ }
}

class MySQLDatabase extends Database {
  save(data) { /* MySQL-specific logic */ }
}

class MongoDatabase extends Database {
  save(data) { /* Mongo-specific logic */ }
}

class UserService {
  constructor(db) { // depends on the abstraction
    this.db = db;
  }
}
// Usage
const service = new UserService(new MySQLDatabase());
```

The same form can use a mock `saveUser` in tests or a different storage implementation later.

### React interview answer

```text
In React, I apply SOLID by keeping components and hooks focused, extending UI through props and composition, keeping shared component contracts consistent, passing only required props, and injecting services or callbacks instead of hard-coding dependencies. This keeps features easier to test and change as the app grows.
```

## 5 Most Useful Design Patterns for JavaScript and React Apps

| Pattern | JavaScript use | React use |
|---|---|---|
| Module Pattern | Encapsulate related logic | Feature folders, custom hooks, service files |
| Singleton Pattern | One shared instance | API client, auth service, config, global store |
| Factory Pattern | Create objects dynamically | Component factory, form field renderer |
| Observer Pattern | Notify subscribers on change | Store subscriptions, event bus, real-time updates |
| Strategy Pattern | Swap behavior dynamically | Dynamic validation, sorting, filtering, payment methods |

## 1. Module Pattern

### What it is

The Module Pattern groups related code together and hides internal details.

It helps avoid global variables and keeps code organized.

### JavaScript example

```js
const userService = (() => {
  const baseUrl = '/api/users';

  async function getUsers() {
    const response = await fetch(baseUrl);
    return response.json();
  }

  async function getUserById(id) {
    const response = await fetch(`${baseUrl}/${id}`);
    return response.json();
  }

  return {
    getUsers,
    getUserById,
  };
})();

userService.getUsers();
```

Here `baseUrl` is private, and only selected functions are exposed.

### Where it is used in JavaScript apps

- API services
- utility files
- validation helpers
- date formatting helpers
- business logic modules
- localStorage/sessionStorage helpers

### Why it is useful

- keeps related logic together
- avoids global scope pollution
- makes code easier to test
- hides implementation details

### React version of Module Pattern

In React, we usually apply the Module Pattern using feature folders, custom hooks, and service files.

Example folder structure:

```text
src/
  features/
    users/
      UserList.tsx
      userService.ts
      userHooks.ts
      userTypes.ts
```

Example:

```ts
// userService.ts
export async function fetchUsers() {
  const response = await fetch('/api/users');
  return response.json();
}

export async function fetchUserById(id: string) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

```tsx
// userHooks.ts
import { useEffect, useState } from 'react';
import { fetchUsers } from './userService';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
}
```

```tsx
// UserList.tsx
import { useUsers } from './userHooks';

function UserList() {
  const { users, loading } = useUsers();

  if (loading) return <p>Loading...</p>;

  return users.map((user) => <p key={user.id}>{user.name}</p>);
}
```

### Where to apply it in React

- API calls inside service files
- reusable logic inside custom hooks
- feature-based folder structure
- shared utility modules
- auth/session helpers
- form validation helpers

### React interview answer

```text
In React, the Module Pattern is commonly applied through feature-based folders, service files, utility files, and custom hooks. It keeps UI, API logic, types, and feature logic organized instead of mixing everything inside components.
```

## 2. Singleton Pattern

### What it is

The Singleton Pattern ensures that only one instance of something is created and reused across the app.

### JavaScript example

```js
class ApiClient {
  constructor(baseUrl) {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }

    this.baseUrl = baseUrl;
    ApiClient.instance = this;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);
    return response.json();
  }
}

const apiClient1 = new ApiClient('/api');
const apiClient2 = new ApiClient('/api');

console.log(apiClient1 === apiClient2); // true
```

### Where it is used in JavaScript apps

- API client
- logger
- database connection
- configuration object
- event bus
- cache manager

### Why it is useful

- avoids creating duplicate instances
- centralizes shared behavior
- keeps configuration consistent
- useful for app-wide services

### React version of Singleton Pattern

In React, Singleton is often used for shared service instances.

Example API client:

```js
// httpClient.js
class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);
    if (!response.ok) {
      throw new Error('API failed');
    }
    return response.json();
  }

  async post(path, data) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('API failed');
    }
    return response.json();
  }
}
const baseUrl = 'https://dummyjson.com';
export const httpClient = new HttpClient(baseUrl);
```

Usage:

```jsx
import { httpClient } from './HttpClient.js';

function UserPage() {
  async function loadUsers() {
    const users = await httpClient.get('/users');
    console.log(users);
  }

  async function createUser() {
    const newUser = await httpClient.post('/users/add', {
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
    });
    console.log(newUser);
  }

  return (
    <div>
      <button onClick={loadUsers}>Load Users</button>
      <button onClick={createUser}>Create User</button>
    </div>
  );
}

export default UserPage;

```

### Where to apply it in React

- centralized API client
- auth/session service
- analytics service
- logging service
- app configuration
- Redux store or Zustand store setup

### Important caution

Do not put everything in a Singleton.

Bad use:

```text
Using singleton object for all component state.
```

Why bad:

```text
React will not automatically re-render when a normal singleton object changes.
```

Use React state, Context, Redux, Zustand, or React Query for reactive state.

### React interview answer

```text
In React, Singleton is useful for shared service instances like an API client, logger, auth service, analytics service, or app configuration. But I avoid using singleton objects as a replacement for React state because React will not automatically track their changes.
```

## 3. Factory Pattern

### What it is

The Factory Pattern creates objects without exposing the exact creation logic everywhere.

Instead of writing many `if/else` blocks throughout the app, object creation is centralized in one place.

### JavaScript example

```js
function createNotification(type, message) {
  if (type === 'success') {
    return {
      type,
      message,
      icon: 'check',
      color: 'green',
    };
  }

  if (type === 'error') {
    return {
      type,
      message,
      icon: 'alert',
      color: 'red',
    };
  }

  return {
    type: 'info',
    message,
    icon: 'info',
    color: 'blue',
  };
}

const notification = createNotification('success', 'User created');
```

### Where it is used in JavaScript apps

- creating user roles
- creating notifications
- creating validators
- creating API request objects
- creating payment handlers
- creating objects based on type

### Why it is useful

- centralizes creation logic
- avoids repeated conditionals
- makes new types easier to add
- keeps calling code simple

### React version of Factory Pattern

In React, Factory Pattern is useful when UI is created based on config or type.

Example: form field factory.

```tsx
function TextInput({ label, value, onChange }) {
  return (
    <label>
      {label}
      <input value={value} onChange={onChange} />
    </label>
  );
}

function SelectInput({ label, value, onChange, options }) {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function FieldFactory({ field, value, onChange }) {
  if (field.type === 'text') {
    return (
      <TextInput
        label={field.label}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (field.type === 'select') {
    return (
      <SelectInput
        label={field.label}
        value={value}
        onChange={onChange}
        options={field.options}
      />
    );
  }

  return null;
}
```

Usage:

```tsx
const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
];

function UserForm() {
  return fields.map((field) => (
    <FieldFactory
      key={field.name}
      field={field}
      value=""
      onChange={() => {}}
    />
  ));
}
```

### Where to apply it in React

- dynamic forms
- dashboard widgets
- notification/toast UI
- modal rendering
- table cell rendering
- role-based menu creation
- component rendering based on CMS/config data

### React interview answer

```text
In React, the Factory Pattern is useful when components are created dynamically based on type or configuration. For example, a form field factory can render text input, select input, checkbox, or date picker based on field config. It avoids spreading if/else rendering logic across many components.
```

## 4. Observer Pattern

### What it is

The Observer Pattern allows one object to notify many subscribers when something changes.

It is also known as publish-subscribe in many JavaScript apps.

### JavaScript example

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  emit(eventName, data) {
    const callbacks = this.events[eventName] || [];

    callbacks.forEach((callback) => {
      callback(data);
    });
  }
}

const eventBus = new EventEmitter();

eventBus.on('userLoggedIn', (user) => {
  console.log('User logged in:', user.name);
});

eventBus.emit('userLoggedIn', { name: 'Paras' });
```

### Where it is used in JavaScript apps

- event emitters
- real-time notifications
- WebSocket messages
- browser events
- state store subscriptions
- logging/analytics events

### Why it is useful

- decouples sender and receiver
- one event can update many listeners
- useful for real-time apps
- useful when multiple parts of the app react to the same change

### React version of Observer Pattern

React already uses a similar idea in state updates.

When state changes, subscribed components re-render.

Observer-style patterns also appear in:

- Context API
- Redux store subscriptions
- Zustand store subscriptions
- React Query cache subscriptions
- WebSocket listeners
- custom event bus

Example with Context:

```tsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(userData) {
    setUser(userData);
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

Usage:

```tsx
function Header() {
  const { user } = useAuth();

  return <p>{user ? user.name : 'Guest'}</p>;
}
```

When `user` changes, components using `useAuth()` are notified and re-render.

### Where to apply it in React

- authentication changes
- theme changes
- cart updates
- notifications
- WebSocket updates
- global app events
- server-state cache updates

### Important caution

Context can cause many re-renders if the value changes frequently.

For high-frequency updates, prefer:

- Redux
- Zustand
- React Query
- event subscription with cleanup
- local state closer to where it is needed

### React interview answer

```text
In React, the Observer Pattern appears in Context, Redux, Zustand, React Query, and event subscriptions. Components subscribe to data, and when that data changes, subscribed components are notified or re-rendered. It is useful for auth, theme, cart, notifications, and real-time updates.
```

## 5. Strategy Pattern

### What it is

The Strategy Pattern lets us choose one behavior from multiple possible behaviors at runtime.

Instead of writing large `if/else` or `switch` blocks, each behavior is kept as a separate strategy.

### JavaScript example

```js
const paymentStrategies = {
  card(amount) {
    return `Paid ${amount} using card`;
  },

  upi(amount) {
    return `Paid ${amount} using UPI`;
  },

  wallet(amount) {
    return `Paid ${amount} using wallet`;
  },
};

function pay(amount, method) {
  const strategy = paymentStrategies[method];

  if (!strategy) {
    throw new Error('Invalid payment method');
  }

  return strategy(amount);
}

console.log(pay(1000, 'upi'));
```

### Where it is used in JavaScript apps

- payment methods
- validation rules
- sorting logic
- filtering logic
- formatting logic
- permission checks
- retry policies

### Why it is useful

- avoids large conditional blocks
- makes behavior easy to change
- makes each strategy easy to test
- makes adding new behavior safer

### React version of Strategy Pattern

In React, Strategy Pattern is useful when component behavior changes based on props, user role, config, or selected mode.

Example: validation strategy.

```ts
const validationStrategies = {
  email(value: string) {
    if (!value.includes('@')) {
      return 'Invalid email';
    }

    return '';
  },

  password(value: string) {
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }

    return '';
  },

  required(value: string) {
    if (!value.trim()) {
      return 'This field is required';
    }

    return '';
  },
};

function validateField(type: string, value: string) {
  const strategy = validationStrategies[type];

  if (!strategy) {
    return '';
  }

  return strategy(value);
}
```

Usage in React:

```tsx
function FormInput({ type, label }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleBlur() {
    const message = validateField(type, value);
    setError(message);
  }

  return (
    <label>
      {label}
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={handleBlur}
      />
      {error ? <p>{error}</p> : null}
    </label>
  );
}
```

### Where to apply it in React

- form validation
- sorting tables
- filtering lists
- role-based UI rules
- rendering different dashboard widgets
- payment method logic
- retry/backoff policies for API calls
- formatting date/currency based on locale

### React interview answer

```text
In React, the Strategy Pattern is useful when behavior changes based on type, role, mode, or configuration. For example, validation strategy can choose email, password, or required validation dynamically. It keeps the component clean and avoids large if/else blocks inside JSX.
```

## Same 5 Patterns Applied in a React Application

### Example: User Management App

| Requirement | Pattern to use | Why |
|---|---|---|
| Keep user API calls separate | Module Pattern | Keeps API logic out of components |
| Reuse one HTTP client | Singleton Pattern | Centralizes base URL, auth, error handling |
| Render dynamic form fields | Factory Pattern | Converts field config into UI |
| Update header when user logs in | Observer Pattern | Auth state change notifies subscribed components |
| Validate fields based on type | Strategy Pattern | Keeps validation logic flexible and testable |

## Quick Interview Summary

```text
The five useful patterns I commonly apply in JavaScript and React apps are Module, Singleton, Factory, Observer, and Strategy.

Module helps organize code into services, hooks, and feature folders.
Singleton is useful for shared instances like API clients and loggers.
Factory helps create objects or components based on type/config.
Observer helps notify multiple parts of the app when data changes.
Strategy helps switch behavior dynamically without large if/else blocks.
```

## When to Use Which Pattern in React

| Situation | Best pattern |
|---|---|
| Component has too much API logic | Module Pattern |
| Need one shared API client | Singleton Pattern |
| Need to render UI from config | Factory Pattern |
| Many components react to same state | Observer Pattern |
| Many if/else conditions for behavior | Strategy Pattern |

## Common Mistakes

- using Singleton for all app state instead of React state/store
- overusing patterns when a simple function is enough
- putting business logic directly inside JSX
- making one giant factory component with too many responsibilities
- using Context for frequently changing large data without optimization
- adding abstractions before the app actually needs them

Final interview answer:

```text
In JavaScript and React apps, design patterns should solve real maintainability problems. I use Module Pattern to organize feature logic, Singleton for shared services like API clients, Factory for dynamic UI creation, Observer for subscriptions and global state changes, and Strategy for swappable behavior like validation, sorting, filtering, or payment methods.
```
