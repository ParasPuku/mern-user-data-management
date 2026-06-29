# React Interview Questions and Answers

This document covers commonly asked React interview questions with concise answers, examples, and practical notes from this MERN app.

## How to Use This Document

Use this file for:

- React interview revision
- understanding hooks clearly
- preparing short interview answers
- revising Redux Toolkit and routing basics
- explaining real app architecture
- practicing tricky React behavior questions

## React Basics

### 1. What is React?

React is a JavaScript library for building user interfaces.

It is mainly used to build component-based frontend applications.

Interview answer:

```text
React is a JavaScript library for building reusable UI components. It helps manage UI state efficiently and updates the DOM using a virtual DOM/reconciliation process.
```

### 2. Is React a framework or library?

React is a library, not a full framework.

React mainly handles the view layer.

For a complete app, we commonly add:

- routing: `react-router-dom`
- state management: Redux Toolkit, Zustand, Context
- API calls: fetch, axios, RTK Query
- build tool: Vite

### 3. What are React components?

Components are reusable UI building blocks.

Example:

```tsx
const Greeting = ({ name }: { name: string }) => {
  return <h1>Hello {name}</h1>;
};
```

Components can be:

- functional components
- class components

Modern React mostly uses functional components with hooks.

### 4. What is JSX?

JSX is a syntax extension that lets us write HTML-like code inside JavaScript/TypeScript.

Example:

```tsx
const element = <h1>Hello React</h1>;
```

JSX is compiled to JavaScript.

Conceptually:

```tsx
<h1>Hello</h1>
```

becomes:

```js
React.createElement('h1', null, 'Hello');
```

### 5. Why do we use React?

Reasons:

- reusable components
- declarative UI
- efficient updates
- strong ecosystem
- easier state-driven UI
- works well with TypeScript
- good for SPAs and complex UIs

Interview answer:

```text
React helps build reusable, state-driven UI components. We describe what UI should look like for a given state, and React updates the DOM efficiently when state changes.
```

### 6. What is declarative UI?

Declarative UI means describing what the UI should look like, not manually telling the browser every DOM operation.

Example:

```tsx
return isLoggedIn ? <Dashboard /> : <SignIn />;
```

React decides how to update the DOM.

### 7. What is imperative UI?

Imperative UI means manually controlling each step.

Example:

```js
const div = document.createElement('div');
div.textContent = 'Hello';
document.body.appendChild(div);
```

React is declarative.

## Props and State

### 8. What are props?

Props are inputs passed from parent component to child component.

Example:

```tsx
const UserCard = ({ name }: { name: string }) => {
  return <p>{name}</p>;
};

<UserCard name="Paras" />;
```

Props are read-only.

### 9. What is state?

State is data managed inside a component.

When state changes, React re-renders the component.

Example:

```tsx
const Counter = () => {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

### 10. Difference between props and state?

Props:

- passed from parent
- read-only
- used for communication

State:

- managed inside component
- can change over time
- triggers re-render when updated

Interview answer:

```text
Props are external inputs passed to a component, while state is internal data managed by the component.
```

### 11. Can props be modified?

No. Props should not be modified by child components.

Bad:

```tsx
props.name = 'New Name';
```

Good:

```tsx
onChange('New Name');
```

Child should notify parent through callback.

### 12. What happens when state changes?

When state changes:

1. React schedules a re-render.
2. Component function runs again.
3. React compares old and new UI.
4. React updates only changed DOM parts.

## Rendering

### 13. What is rendering in React?

Rendering means React calls the component function to calculate UI.

Rendering does not always mean DOM changed.

Example:

```tsx
const App = () => {
  return <h1>Hello</h1>;
};
```

React runs `App()` to know what UI should be.

### 14. What causes a re-render?

Common causes:

- state update
- props change
- parent re-render
- context value change
- Redux selector result change

Note - Yes, by default in React, if a parent component re-renders, the child component will also re-render.

### 15. What is conditional rendering?

Conditional rendering means showing UI based on condition.

Example:

```tsx
return isAuthenticated ? <Dashboard /> : <SignIn />;
```

Another example:

```tsx
{error ? <p>{error}</p> : null}
```

### 16. What is list rendering?

Rendering array items using `map`.

Example:

```tsx
users.map((user) => <UserRow key={user.id} user={user} />);
```

### 17. Why is key important in list rendering?

`key` helps React identify which list item changed, added, or removed.

Good:

```tsx
users.map((user) => <UserRow key={user.id} user={user} />);
```

Bad:

```tsx
users.map((user, index) => <UserRow key={index} user={user} />);
```

Using index can cause bugs when list order changes.

## Virtual DOM and Reconciliation

### 18. What is Virtual DOM?

Virtual DOM is a lightweight, and in-memory representation of the real DOM.

When state changes:

1. React creates new virtual DOM.
2. React compares it with previous virtual DOM.
3. React updates only necessary real DOM parts.

### 19. What is reconciliation?

Reconciliation is React's process of comparing old and new element trees to decide what needs to update.

Interview answer:

```text
Reconciliation is the process where React compares previous and next UI trees and efficiently updates the real DOM.
```

### 20. Does React always update the real DOM on render?

No.

React may re-render components but only update the real DOM if output changes.

## Hooks

### 21. What are hooks?

Hooks are functions that let functional components use React features like state, effects, refs, and context.

Common hooks:

- `useState`
- `useEffect`
- `useMemo`
- `useCallback`
- `useRef`
- `useContext`
- `useReducer`

### 22. Rules of hooks?

Rules:

- call hooks only at top level
- do not call hooks inside loops, conditions, or nested functions
- call hooks only from React components or custom hooks

Bad:

```tsx
if (isLoggedIn) {
  useEffect(() => {}, []);
}
```

Good:

```tsx
useEffect(() => {
  if (!isLoggedIn) {
    return;
  }
}, [isLoggedIn]);
```

### 23. What is useState?

`useState` stores local component state.

Example:

```tsx
const [count, setCount] = useState(0);
```

Update:

```tsx
setCount(count + 1);
```

Functional update:

```tsx
setCount((current) => current + 1);
```

Use functional update when next value depends on previous value.

### 24. Why state updates are asynchronous?

React batches state updates for performance.

State updates in frameworks like React aren't asynchronous in the traditional sense; rather, they are queued and batched. Instead of re-rendering the component for every single setState call, React waits until the current execution block finishes, groups multiple updates together, and processes them in a single render pass.

Example:

```tsx
setCount(count + 1);
console.log(count); // old value
```

The state variable updates on next render.

### 25. What is batching?

Batching means React groups multiple state updates into one render.

Example:

```tsx
setName('Paras');
setRole('Admin');
```

React can render once instead of twice.

### 26. What is useEffect?

`useEffect` runs side effects after render.

Examples:

- API calls
- subscriptions
- timers
- event listeners
- syncing with external systems

Example:

```tsx
useEffect(() => {
  document.title = 'Dashboard';
}, []);
```

### 27. useEffect dependency array?

No dependency array:

```tsx
useEffect(() => {
  console.log('Runs after every render');
});
```

Empty dependency array:

```tsx
useEffect(() => {
  console.log('Runs once after mount');
}, []);
```

With dependencies:

```tsx
useEffect(() => {
  console.log(userId);
}, [userId]);
```

Runs when `userId` changes.

### 28. What is cleanup in useEffect?

Cleanup runs before effect re-runs or component unmounts.

Example:

```tsx
useEffect(() => {
  const timerId = window.setInterval(() => {
    console.log('tick');
  }, 1000);

  return () => {
    window.clearInterval(timerId);
  };
}, []);
```

Use cleanup for:

- timers
- subscriptions
- event listeners
- aborting requests

### 29. Difference between Webpack and Babel?

Webpack and Babel solve different problems in a React app.

`Babel` is a compiler/transpiler.

It converts modern JavaScript, JSX, or TypeScript syntax into JavaScript that browsers can understand.

Example:

```text
JSX / modern JS -> Babel -> browser-friendly JavaScript
```

`Webpack` is a bundler.

It starts from an entry file, follows all imports, processes assets through loaders, and creates bundled files for the browser.

Example:

```text
React files + CSS + images + dependencies -> Webpack -> bundled output
```

Simple difference:

```text
Babel changes syntax.
Webpack bundles files.
```

Example in React:

```tsx
const element = <h1>Hello</h1>;
```

Babel can convert JSX syntax into JavaScript.

Webpack can bundle that JavaScript with other files like:

- components
- CSS
- images
- npm packages

Interview answer:

```text
Babel transpiles modern JavaScript or JSX into browser-compatible JavaScript. Webpack bundles JavaScript, CSS, images, and dependencies into output files for the browser. In many older React setups, Webpack uses Babel through babel-loader.
```

In this project, we use Vite instead of Webpack. Vite handles development/build tooling, and the React plugin handles React/JSX transformation.

### 30. What is React Fiber?

React Fiber is React's internal rendering architecture.

It lets React split rendering work into smaller units so it can pause, resume, prioritize, or discard work when needed.

Why Fiber matters:

- enables interruptible rendering
- supports prioritizing urgent updates
- improves responsiveness for complex UIs
- powers modern concurrent rendering features

Interview answer:

```text
React Fiber is React's internal reconciliation engine. It breaks rendering work into units so React can prioritize updates and keep the UI responsive.
```

### 31. What is infinite render loop?

An infinite render loop happens when state updates repeatedly during render or effect.

Bad:

```tsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

This changes `count`, effect runs again, and loop continues.

### 32. What is useRef?

`useRef` stores a mutable value that does not cause re-render.

The useRef Hook in React creates a mutable object that persists across component renders without triggering a re-render when its value changes. It acts like a private "box" where your component can store data that does not directly impact what is displayed on the screen.

Example DOM ref:

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);

inputRef.current?.focus();
```

Example mutable value:

```tsx
const renderCount = useRef(0);
renderCount.current += 1;
```

### 33. useRef vs useState?

`useState`:

- causes re-render when updated
- used for UI data

`useRef`:

- does not cause re-render
- used for mutable values/DOM refs

### 34. What is useMemo?

`useMemo` memoizes a calculated value.

Example:

```tsx
const filteredUsers = useMemo(
  () => users.filter((user) => user.status === 'active'),
  [users]
);
```

Use it when calculation is expensive or reference stability matters.

### 35. What is useCallback?

`useCallback` memoizes a function reference.

useCallback is a React Hook that caches (memoizes) a function definition between renders so React does not recreate the function every time the component updates.

Example:

```tsx
const handleDelete = useCallback((id: string) => {
  dispatch(deleteUser(id));
}, [dispatch]);
```

Useful when passing callbacks to memoized child components.

### 36. useMemo vs useCallback?

`useMemo` memoizes a value.

```tsx
const value = useMemo(() => compute(), [dependency]);
```

`useCallback` memoizes a function.

```tsx
const fn = useCallback(() => doSomething(), [dependency]);
```

This is roughly:

```tsx
useCallback(fn, deps) === useMemo(() => fn, deps)
```

### 37. What is useContext?

`The useContext hook` in React is a built-in function that lets functional components read and subscribe to data from a context object without manually passing props through intermediate components. It provides an elegant solution to prop drilling, which is the tedious process of passing props down multiple levels of a component tree just to reach a deeply nested child.

`useContext` reads value from React Context.

Example:

```tsx
const ThemeContext = createContext('light');

const theme = useContext(ThemeContext);
```

Use Context for app-wide values like:

- theme
- locale
- authenticated user summary

Avoid putting frequently changing large state in Context if it causes unnecessary renders.

### 38. What is useReducer?

`useReducer` manages complex local state using reducer function.

Example:

```tsx
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
```

### 39. What is a custom hook?

A custom hook is a reusable function that uses React hooks.

Example:

```tsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

Custom hook name should start with `use`.

## Forms

### 40. Controlled vs uncontrolled components?
- Controlled components rely on React state to manage form data
- Controlled input: 

```tsx
const [name, setName] = useState('');

<input value={name} onChange={(event) => setName(event.target.value)} />;
```

React controls the input value.

- Uncontrolled components let the DOM handle form data internally.
- Uncontrolled input:

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);

<input ref={inputRef} />;
```

DOM controls the value.

### 41. Which is better: controlled or uncontrolled?

Controlled is better when:

- validation is needed
- value controls UI
- submit button depends on fields
- instant feedback is needed

Uncontrolled is useful when:

- simple forms
- file inputs
- integration with non-React libraries

### 42. How to handle form validation?

Common approach:

```tsx
const isValid = email.trim() && password.length >= 8;

<button disabled={!isValid}>Sign In</button>;
```

For large apps:

- central validation helpers
- schema validation
- reusable form components
- server-side validation too

## Component Communication

### 43. How parent passes data to child?

Using props.

```tsx
<UserCard user={user} />
```

### 44. How child sends data to parent?

Using callback prop.

```tsx
const Parent = () => {
  const handleSelect = (id: string) => {
    console.log(id);
  };

  return <Child onSelect={handleSelect} />;
};
```

Child:

```tsx
const Child = ({ onSelect }: { onSelect: (id: string) => void }) => {
  return <button onClick={() => onSelect('1')}>Select</button>;
};
```

### 45. What is prop drilling?

Prop drilling means passing props through many levels just to reach a deeply nested component.

Solutions:

- Context
- Redux/Zustand
- component composition
- custom hooks

### 46. What is lifting state up?

Moving shared state to the nearest common parent.

Example:

```text
Sibling A needs selected user
Sibling B needs selected user
Move selectedUserId to parent
Pass value/callback to both
```

## Routing

### 47. What is React Router?

React Router is a routing library for React apps.

It maps URL paths to components.

Example:

```tsx
<Routes>
  <Route path="/signin" element={<SignInPage />} />
  <Route path="/" element={<Dashboard />} />
</Routes>
```

### 48. What is protected route?

Protected route allows access only when user is authenticated.

Concept:

```tsx
return isAuthenticated ? children : <Navigate to="/signin" />;
```

In this app:

```text
frontend/src/components/ProtectedRoute.tsx
```

### 49. What is public route?

Public route is accessible without login.

But if user is already authenticated, signin/signup pages may redirect to dashboard.

In this app:

```text
frontend/src/components/PublicRoute.tsx
```

### 50. What is Navigate?

`Navigate` redirects user to another route.

Example:

```tsx
<Navigate replace to="/signin" />
```

## State Management

### 51. When to use local state?

Use local state when data belongs to one component.

Examples:

- form input
- modal open/close
- selected tab
- local loading state

### 52. When to use global state?

Use global state when many parts of app need same data.

Examples:

- authenticated account
- user list
- teams
- skills
- notifications/toasts

### 53. What is Redux?

Redux is a predictable state management library.

It stores app state in a central store.

Core ideas:

- store
- actions
- reducers
- dispatch
- selectors

### 54. What is Redux Toolkit?

Redux Toolkit is the recommended way to write Redux.

It reduces boilerplate and includes:

- `configureStore`
- `createSlice`
- `createAsyncThunk`
- Immer support

In this app:

```text
frontend/src/app/store.ts
```

Code snapshot:

```ts
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    teams: teamsReducer,
    skills: skillsReducer
  }
});
```

### 55. What is Thunk in Redux?
In Redux Toolkit (RTK), a thunk is a function that contains delayed, asynchronous logic. Because a standard Redux store can only handle synchronous data flow, Redux Toolkit automatically includes the Redux Thunk middleware by default to let you perform side effects like fetching API data.

- How createAsyncThunk Works
When you create an async thunk, you provide an action type prefix and a payload creator function that returns a Promise. The thunk then automatically generates and dispatches three separate lifecycle actions:

- pending: Dispatched immediately when the thunk starts running.

- fulfilled: Dispatched if the Promise resolves successfully with data.

- rejected: Dispatched if the Promise fails or rejects.

### 56. What is reducer?

Reducer is a pure function that calculates next state from current state and action.

Concept:

```ts
nextState = reducer(currentState, action);
```

### 57. What is action?

An action is an object describing what happened.

Example:

```ts
{
  type: 'users/createUser',
  payload: user
}
```

### 58. What is dispatch?

Dispatch sends an action to Redux store.

Example:

```tsx
dispatch(fetchUsers());
```

### 59. What is selector?

Selector reads data from Redux state.

Example:

```ts
const selectUsers = (state: RootState) => state.users.items;
```

Usage:

```tsx
const users = useAppSelector(selectUsers);
```

### 60. What is createAsyncThunk?

`createAsyncThunk` handles async Redux logic.

Example:

```ts
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await usersApi.getUsers();
});
```

It creates:

- pending action
- fulfilled action
- rejected action

### 61. What is Redux middleware?

Middleware runs between dispatching action and reducer.

Use cases:

- logging
- async work
- toast notifications
- analytics

In this app:

```text
frontend/src/app/toastMiddleware.ts
```

### 62. What is Immer?

Immer lets us write mutable-looking reducer code while keeping state immutable internally.

Example:

```ts
state.items.push(user);
```

Redux Toolkit uses Immer behind the scenes.

### 63. What is selector stability warning?

React Redux warns when a selector returns a new reference for same input.

Bad:

```ts
const selectItems = (state) => state.items || [];
```

If `[]` is created every time, component re-renders unnecessarily.

Good:

```ts
const emptyItems = [];
const selectItems = (state) => state.items || emptyItems;
```

This issue happened in this app in the skills selector and was fixed by using a stable empty array.

## Performance Optimization

### 64. How to optimize React performance?

Common ways:

- avoid unnecessary state
- keep state close to usage
- use stable keys
- memoize expensive calculations
- use `React.memo`
- use `useMemo`
- use `useCallback`
- virtualize large lists
- split code with lazy loading
- avoid unnecessary global state changes

### 65. What is React.memo?

`React.memo` prevents re-render if props did not change.

Example:

```tsx
const UserRow = React.memo(({ user }: { user: User }) => {
  return <tr>{user.name}</tr>;
});
```

Useful for expensive child components.

### 66. React.memo vs useMemo?

`React.memo` memoizes a component render based on props.

`useMemo` memoizes a calculated value inside a component.

### 67. What causes unnecessary re-render?

Common causes:

- parent re-render
- new object/array/function references
- global state changes
- context value changes
- selector returning new array/object every time
- unstable keys

### 68. Difference between `npm create vite@latest my-react-app -- --template react` and `npx create-react-app my-react-app`?

Both commands create a new React project, but they use different project setup tools.

`npm create vite@latest my-react-app -- --template react` creates a React project using Vite.

`npx create-react-app my-react-app` creates a React project using Create React App.

Simple difference:

```text
Vite = modern, faster development tool
Create React App = older React setup tool based on react-scripts
```

In the Vite command:

```bash
npm create vite@latest my-react-app -- --template react
```

Meaning:

- `npm create` runs a project creation package
- `vite@latest` means use the latest Vite project creator
- `my-react-app` is the project folder name
- `--` means pass the next options to Vite
- `--template react` means create a React template

For TypeScript with Vite, the command is usually:

```bash
npm create vite@latest my-react-app -- --template react-ts
```

In the Create React App command:

```bash
npx create-react-app my-react-app
```

Meaning:

- `npx` downloads and runs a package command
- `create-react-app` is the project creator
- `my-react-app` is the project folder name

For TypeScript with Create React App, the command is:

```bash
npx create-react-app my-react-app --template typescript
```

Important tooling difference:

```text
Vite uses native browser ES modules during development.
Create React App uses react-scripts, which hides Webpack and Babel configuration.
```

Vite usually feels faster because it does not bundle the whole app before starting the dev server.

Create React App gives a preconfigured setup, but most of the build configuration is hidden inside `react-scripts`.

Interview answer:

```text
Vite and Create React App both scaffold React projects. Vite creates a lighter and faster setup using Vite's dev server and Rollup-based production build. Create React App creates a React project using react-scripts, which internally uses Webpack, Babel, ESLint, and Jest.
```

In this project, we are using Vite.

You can see that from:

```json
"dev": "vite --host 0.0.0.0",
"build": "tsc -b && vite build"
```

### 69. What happens behind the scenes when we create a React project using Vite or Create React App?

When you run a project setup command, it does not magically create React by itself.

It creates a folder, adds starter files, adds dependencies, and prepares scripts so you can run the app.

Behind the scenes with Vite:

```bash
npm create vite@latest my-react-app -- --template react
```

Steps:

1. npm runs the Vite project creator package.
2. Vite creates a new folder named `my-react-app`.
3. Vite copies React starter template files into that folder.
4. It creates files like `package.json`, `index.html`, `src/main.jsx`, and `src/App.jsx`.
5. It adds scripts like `dev`, `build`, and `preview`.
6. After you run `npm install`, dependencies are downloaded into `node_modules`.
7. When you run `npm run dev`, Vite starts a local development server.
8. The browser opens the app through that dev server.
9. Vite transforms JSX, TypeScript, CSS, and imports when the browser requests them.
10. When you edit code, Vite updates the browser quickly using hot module replacement.

Behind the scenes with Create React App:

```bash
npx create-react-app my-react-app
```

Steps:

1. npx downloads and runs the Create React App package.
2. Create React App creates a new folder named `my-react-app`.
3. It creates starter React files.
4. It creates `package.json`.
5. It installs dependencies like `react`, `react-dom`, and `react-scripts`.
6. `react-scripts` contains the hidden Webpack, Babel, ESLint, and Jest setup.
7. When you run `npm start`, `react-scripts` starts the development server.
8. Babel converts JSX into JavaScript.
9. Webpack bundles modules and serves the app in development.
10. When you run `npm run build`, Webpack creates optimized production files.

Simple mental model:

```text
Project creator command
  -> creates starter files
  -> creates package.json
  -> installs or prepares dependencies
  -> gives scripts like dev/start/build
  -> dev server runs the React app in browser
```

The actual React app starts from an entry file.

In a Vite React app, it is commonly:

```tsx
createRoot(document.getElementById('root')!).render(<App />);
```

That line means:

```text
Find the HTML element with id="root"
Mount the React App component inside that element
```

So the setup command creates the project structure, but React starts running when the browser loads the entry file and React renders `<App />`.

### 70. How to avoid new object prop each render?

Bad:

```tsx
<Table filters={{ status: 'active' }} />
```

Good:

```tsx
const filters = useMemo(() => ({ status: 'active' }), []);

<Table filters={filters} />;
```

### 71. What is lazy loading in React?

Lazy loading loads components only when needed.

Example:

```tsx
const AdminPage = lazy(() => import('./AdminPage'));
```

Use with:

```tsx
<Suspense fallback={<Loader />}>
  <AdminPage />
</Suspense>
```

### 72. What is code splitting?

Code splitting breaks app bundle into smaller chunks.

Benefits:

- faster initial load
- load feature code only when needed

### 73. What is list virtualization?

Virtualization renders only visible rows in a large list.

Useful for:

- thousands of rows
- large tables
- chat messages

Libraries:

- `react-window`
- `react-virtualized`

## API Calls

### 74. Where should API calls be made?

Common places:

- `useEffect` in component
- custom hook
- Redux thunk
- RTK Query
- React Query

In this app:

```text
API calls are mostly handled through Redux thunks and service files.
```

### 75. How to fetch data in useEffect?

```tsx
useEffect(() => {
  let ignore = false;

  async function loadUsers() {
    const users = await usersApi.getUsers();

    if (!ignore) {
      setUsers(users);
    }
  }

  loadUsers();

  return () => {
    ignore = true;
  };
}, []);
```

### 76. Why avoid directly making useEffect callback async?

Bad:

```tsx
useEffect(async () => {
  await fetchUsers();
}, []);
```

`useEffect` callback should return cleanup function or nothing, not a Promise.

Good:

```tsx
useEffect(() => {
  async function load() {
    await fetchUsers();
  }

  load();
}, []);
```

### 77. How to handle loading and error state?

Example:

```tsx
if (status === 'loading') {
  return <Loader />;
}

if (error) {
  return <ErrorBanner message={error} />;
}

return <UsersTable users={users} />;
```

In Redux apps, common statuses are:

```ts
'idle' | 'loading' | 'succeeded' | 'failed'
```

### 78. How to cancel API request?

Use `AbortController`.

Example:

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/users', {
    signal: controller.signal
  });

  return () => {
    controller.abort();
  };
}, []);
```

## Authentication in React

### 79. How does React know user is logged in?

Usually by auth state.

In this app:

```text
authSlice.account
authSlice.status
```

On app startup:

```tsx
dispatch(bootstrapAuth());
```

Backend checks HTTP-only cookie and returns session/account.

### 80. Can React read HTTP-only cookie?

No.

HTTP-only cookie cannot be read using JavaScript.

Frontend checks auth by calling backend session API.

Example:

```text
GET /api/auth/session
```

### 81. Why use credentials: include?

In fetch:

```ts
credentials: 'include'
```

This tells browser to include cookies in API requests.

In this app:

```text
frontend/src/services/http.ts
```

### 82. How protected route works in this app?

Concept:

```tsx
if (authStatus !== 'authenticated') {
  return <Navigate to="/signin" />;
}

return children;
```

The route guard uses Redux auth state.

### 83. How role-based UI works?

Example:

```tsx
account?.role === 'admin' ? <AdminSettingsPage /> : <Navigate to="/" />
```

Important:

Frontend role checks improve UX but are not security by themselves.

Backend must also enforce authorization.

## TypeScript With React

### 84. Why use TypeScript with React?

Benefits:

- catches mistakes early
- typed props
- typed API responses
- better autocomplete
- safer refactoring

### 85. How to type component props?

```tsx
type UserCardProps = {
  name: string;
  email: string;
};

const UserCard = ({ name, email }: UserCardProps) => {
  return <p>{name} - {email}</p>;
};
```

### 86. How to type useState?

```tsx
const [user, setUser] = useState<User | null>(null);
```

For inferred values:

```tsx
const [count, setCount] = useState(0);
```

### 87. How to type event handlers?

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

### 88. How to type useRef?

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

Use:

```tsx
inputRef.current?.focus();
```

## React Patterns

### 89. What is composition?

Composition means building components by combining smaller components.

Example:

```tsx
const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="card">{children}</div>;
};
```

Usage:

```tsx
<Card>
  <h2>Profile</h2>
</Card>
```

### 90. Controlled modal pattern?

Parent controls open/close state.

```tsx
const [isOpen, setIsOpen] = useState(false);

{isOpen ? <Modal onClose={() => setIsOpen(false)} /> : null}
```

### 91. Container vs presentational components?

Container component:

- fetches data
- manages state
- dispatches actions

Presentational component:

- receives props
- renders UI
- minimal logic

Example:

```text
UserManagementPage -> container
UserTable -> presentational
```

### 92. What is children prop?

`children` lets component render nested content.

Example:

```tsx
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};
```

## Error Handling

### 93. What is Error Boundary?

Error Boundary catches rendering errors in child component tree.

Class component example:

```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong</p>;
    }

    return this.props.children;
  }
}
```

Error boundaries do not catch:

- event handler errors
- async errors
- server errors

### 94. How to handle API errors?

Common pattern:

```tsx
try {
  await dispatch(createUser(values)).unwrap();
} catch (error) {
  setLocalError(error instanceof Error ? error.message : 'Failed');
}
```

In this app, toast middleware also shows success/error messages.

## React Strict Mode

### 95. What is StrictMode?

StrictMode helps find problems during development.

It can intentionally run effects twice in development to detect unsafe side effects.

Example:

```tsx
<React.StrictMode>
  <App />
</React.StrictMode>
```

Interview answer:

```text
StrictMode is a development-only tool that helps detect unsafe side effects and deprecated patterns. It does not affect production behavior.
```

## Common Tricky Questions

### 96. Why does useEffect run twice in development?

Because React StrictMode intentionally mounts/unmounts/remounts components in development to detect unsafe effects.

Production does not behave the same way.

### 97. Why not update state directly?

Bad:

```tsx
user.name = 'New Name';
setUser(user);
```

React may not detect change because reference is same.

Good:

```tsx
setUser({ ...user, name: 'New Name' });
```

### 98. Why state should be immutable?

Immutability helps React detect changes and makes updates predictable.

### 99. Why component names should start with capital letter?

React treats lowercase tags as HTML elements.

Good:

```tsx
<UserCard />
```

Bad:

```tsx
<userCard />
```

### 100. Why hooks cannot be conditional?

React relies on hook call order.

If hooks are conditional, order can change between renders and React cannot match hook state correctly.

### 101. What is stale closure?

Stale closure happens when a function captures old state/props.

Example:

```tsx
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

This logs old `count`.

Fix:

- add dependency
- use functional update
- use ref for latest value

### 102. Why use functional state update?

Use when new state depends on previous state.

```tsx
setCount((current) => current + 1);
```

This avoids stale state issues.

### 103. Why not use array index as key?

Index key can break UI when list order changes.

Problems:

- wrong item state
- incorrect animations
- inefficient updates

Use stable ID instead.

### 104. What is hydration?

Hydration is when React attaches event handlers to server-rendered HTML.

Common in SSR frameworks like Next.js.

### 105. What is client-side rendering?

Client-side rendering means browser receives minimal HTML and JavaScript builds the UI in the browser.

Vite React apps are usually client-side rendered.

## Testing

### 106. What should we test in React?

Test user behavior, not implementation details.

Examples:

- form validation
- button click
- API success/error state
- route protection
- role-based UI

### 107. What is React Testing Library?

React Testing Library helps test components from user perspective.

Example:

```tsx
expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
```

## React App Architecture

### 108. How is this app structured?

This app uses feature-based structure:

```text
frontend/src/features/auth
frontend/src/features/users
frontend/src/features/teams
frontend/src/features/skills
frontend/src/features/admin
frontend/src/components
frontend/src/app
frontend/src/services
```

Benefits:

- related code stays together
- easier scaling
- easier maintenance

### 109. What is feature-based folder structure?

Feature-based structure groups code by business feature instead of file type.

Example:

```text
features/users/UserManagementPage.tsx
features/users/usersSlice.ts
features/users/usersApi.ts
features/users/types.ts
```

This is better for medium/large apps.

### 110. What is reusable component?

A reusable component is generic enough to be used in many places.

Examples in this app:

```text
LoadingButton
StatusBanner
CustomDropdown
ToastViewport
ProtectedRoute
PublicRoute
```

## Interview Questions Based on This App

### 111. How does auth bootstrap work in this app?

On app load:

```tsx
if (authStatus === 'idle') {
  dispatch(bootstrapAuth());
}
```

Frontend calls backend session API.

If cookie is valid, user becomes authenticated.

If not, user is unauthenticated.

### 112. How does session refresh work in this app?

The app listens to user activity and periodically verifies/refreshes session.

Concept:

```text
User active -> refresh session
No activity -> verify session without extending it
```

### 113. How does role-based UI work in this app?

Admin route is visible only when:

```tsx
account?.role === 'admin'
```

But backend also enforces authorization.

Important interview answer:

```text
Frontend role checks are for UX. Backend authorization is the real security.
```

### 114. How are API calls centralized?

This app uses:

```text
frontend/src/services/http.ts
```

It centralizes:

- base URL
- JSON headers
- request timeout
- `credentials: 'include'`
- error parsing

### 115. How are toasts handled?

This app uses Redux listener middleware.

When async actions succeed/fail, middleware dispatches toast notifications.

This keeps toast logic centralized instead of duplicating it in every component.

## Most Important Short Answers

### 116. React in one line

```text
React is a JavaScript library for building reusable, state-driven UI components.
```

### 117. Component in one line

```text
A component is a reusable function/class that returns UI.
```

### 118. Props in one line

```text
Props are read-only inputs passed from parent to child.
```

### 119. State in one line

```text
State is component-managed data that triggers re-render when changed.
```

### 120. useEffect in one line

```text
useEffect runs side effects after render and can clean them up.
```

### 121. Virtual DOM in one line

```text
Virtual DOM is a lightweight representation of UI used to calculate efficient real DOM updates.
```

### 122. Redux in one line

```text
Redux is a centralized state management library where state changes through actions and reducers.
```

### 123. React Router in one line

```text
React Router maps URL paths to React components.
```

### 124. Controlled component in one line

```text
A controlled component is a form element whose value is controlled by React state.
```

### 125. Custom hook in one line

```text
A custom hook is a reusable function that uses React hooks to share stateful logic.
```

## Final React Interview Checklist

Must know:

- components
- JSX
- props
- state
- rendering
- keys
- virtual DOM
- reconciliation
- hooks
- `useState`
- `useEffect`
- `useRef`
- `useMemo`
- `useCallback`
- `useContext`
- controlled forms
- routing
- protected routes
- Redux basics
- async thunks
- selectors
- performance optimization
- memoization
- error boundaries
- StrictMode
- authentication flow
- role-based UI
- TypeScript props/events

Strong answer pattern:

```text
Definition -> Example -> Use case -> Common mistake
```

Example:

```text
useEffect is a hook for side effects after render. For example, we use it to call an API or attach an event listener. It is useful for syncing React with external systems. A common mistake is missing dependencies or updating state in a way that creates an infinite loop.
```
