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

### [{}], [[]], [true], [1], ["hello"], [{id: 1}], [0], [4354] - How it checks behind the scene and render and re-render?

- Behind the scenes, React uses a standard JavaScript mechanism called Object.is() to compare dependencies.
- Every time your component renders, React loops through your dependency array and compares each item from the current render to the same item from the previous render. If even one item fails the Object.is() check, React re-runs your useEffect.

```tsx
//  Standard, clean way to run code exactly once
useEffect(() => { 
  console.log("Running now!!!"); 
}, []); 
```


1. Primitive Values (Booleans, Numbers, Strings)
For primitives, Object.is() compares the actual value. Since these literal values never change between renders, the comparison returns true, and React will NOT re-run the effect. They run exactly once (on mount).

[true]
- Behind the scenes: Object.is(true, true) → true
- Result: Runs once.

[1]
- Behind the scenes: Object.is(1, 1) → true
- Result: Runs once.

["hello"]
- Behind the scenes: Object.is("hello", "hello") → true
- Result: Runs once.

[0]
- Behind the scenes: Object.is(0, 0) → true
Result: Runs once.

[4354]
Behind the scenes: Object.is(4354, 4354) → true
Result: Runs once.

2. Reference Values (Objects and Arrays)
For objects and arrays, Object.is() compares the memory address (reference), not the content inside them.

Because you declared these inline inside the dependency array, JavaScript allocates a brand new slot in your computer's memory on every single render. To React, a new memory address means a brand new value, so the comparison returns false. React will re-run the effect on EVERY re-render.

[{}]
- Behind the scenes: Object.is(NewObjectA, NewObjectB) → false
- Result: Re-runs every render ❌.

[[]]
- Behind the scenes: Object.is(NewArrayA, NewArrayB) → false
- Result: Re-runs every render ❌.

[{id: 1}]
- Behind the scenes: Even though the data id: 1 looks identical, the container object has a new memory address. Object.is(NewObjectA, NewObjectB) → false
- Result: Re-runs every render ❌.

Summary Checklist
- Primitives are compared by Value. Same value = No re-run.
- Objects/Arrays are compared by Reference. New reference = Re-runs every time.

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

### 31. What is hydration in React, and what role does hydration play in server-side rendering?

Hydration is the process where React takes HTML that was already generated on the server and makes it interactive in the browser.

Interview answer:

```text
Hydration happens in server-side rendered React apps. The server sends already-rendered HTML to the browser, so the user can see content quickly. Then React loads JavaScript, attaches event handlers, connects the existing HTML with React's virtual DOM, and makes the page interactive.
```

Simple flow:

```text
Server renders React component to HTML
  -> Browser receives visible HTML
  -> React JavaScript loads
  -> React hydrates existing HTML
  -> Buttons, forms, state, and events start working
```

Example:

```tsx
// Server sends HTML like this:
<button>Count: 0</button>
```

Before hydration:

```text
User can see the button, but React event handlers are not attached yet.
```

After hydration:

```text
React attaches onClick, state, effects, and component logic.
The button becomes interactive.
```

In React 18, hydration is commonly started with:

```tsx
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document.getElementById('root')!, <App />);
```

This is different from normal client-side rendering:

```tsx
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(<App />);
```

#### Role of hydration in React

Hydration is important because it combines the benefits of server-rendered HTML and client-side React interactivity.

Main roles:

- shows meaningful HTML quickly before JavaScript fully loads
- improves initial page load experience
- helps SEO because crawlers can read server-rendered HTML
- attaches event handlers to existing HTML
- connects server-rendered markup with React state and components
- avoids throwing away the server HTML and rebuilding everything from scratch

#### Hydration mismatch

A hydration mismatch happens when the HTML generated on the server does not match what React renders on the client.

Example:

```tsx
function CurrentTime() {
  return <p>{new Date().toLocaleTimeString()}</p>;
}
```

The server time and client time may be different, so React may warn about a mismatch.

Common causes:

- using `Date.now()` directly during render
- using `Math.random()` during render
- rendering different UI on server and client
- reading `window`, `document`, or `localStorage` during server render
- different data available on server vs client

Fix example:

```tsx
function CurrentTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <p>{time}</p>;
}
```

`useEffect` runs only in the browser after hydration, so it avoids server/client mismatch.

Important interview point:

```text
Hydration does not create HTML from scratch. It reuses server-rendered HTML and attaches React behavior to it.
```

### 32. What is infinite render loop?

An infinite render loop happens when state updates repeatedly during render or effect.

Bad:

```tsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

This changes `count`, effect runs again, and loop continues.

### 33. What is useRef?

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

### 34. useRef vs useState?

`useState`:

- causes re-render when updated
- used for UI data

`useRef`:

- does not cause re-render
- used for mutable values/DOM refs

### 35. What is useMemo?

`useMemo` memoizes a calculated value.

Example:

```tsx
const filteredUsers = useMemo(
  () => users.filter((user) => user.status === 'active'),
  [users]
);
```

Use it when calculation is expensive or reference stability matters.

### 36. What is useCallback?

`useCallback` memoizes a function reference.

useCallback is a React Hook that caches (memoizes) a function definition between renders so React does not recreate the function every time the component updates.

Example:

```tsx
const handleDelete = useCallback((id: string) => {
  dispatch(deleteUser(id));
}, [dispatch]);
```
Useful when passing callbacks to memoized child components.

- Why use useCallback?

useCallback memoizes the function, meaning React returns the same function instance between renders (unless its dependencies change). This is useful when:

- Passing the function to child components wrapped with React.memo.
- Including the function in dependency arrays of useEffect or other hooks.
- Avoiding unnecessary re-renders caused by changing function references.

### 37. useMemo vs useCallback?

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

### 38. How useMemo and useCallback works behind the scene?
The reason they look different is because useCallback and useMemo are designed for different purposes, even though they're closely related.

In fact, useCallback is essentially a special case of useMemo.

1. useCallback memoizes a function
```jsx
const result = useCallback((num1, num2) => {
  return num1 * num2;
}, []);
```
What are you passing to useCallback?
You're passing the function itself.

```jsx
(num1, num2) => {
  return num1 * num2;
}
```
React stores this function and returns the same function reference on every render (until dependencies change).

So result becomes:
```jsx
(num1, num2) => {
  return num1 * num2;
}
```

Later you call it:
```jsx
result(10, 20);
```

Output: 200

2. useMemo memoizes the result of a calculation
```jsx
const result = useMemo(() => {
  return num1 + num2;
}, [num1, num2]);
```

Here you're not passing the calculation directly.

You're passing a function with no parameters:
```jsx
() => {
   return num1 + num2;
}
```

Why?
Because num1 and num2 are already available from the outer scope (the custom hook's parameters). This is called a closure in JavaScript.

```jsx
const useAddition = (num1, num2) => {
  useMemo(() => {
      return num1 + num2;
  }, [num1, num2])
}
```
When you call:

```jsx
useAddition(10, 20);
```
React already knows:

```jsx
num1 = 10
num2 = 20
```

It simply executes:
```jsx
10 + 20
```
and stores the value.

Therefore the callback doesn't need parameters.

Why doesn't useMemo accept parameters like useCallback?

Imagine it did:
```jsx
useMemo((num1, num2) => {
   return num1 + num2;
}, []);
```
React would ask:

- "Where am I supposed to get num1 and num2 from?"

Nobody is calling that callback with arguments.

With useMemo, React internally does something like:

```jsx
callback();
```

not

```jsx
callback(10,20);
```
So parameters would always be undefined.

Why does useCallback allow parameters?

Because React is not executing that function. React simply stores it. Later you execute it.

Example:
```jsx
const multiply = useCallback((a, b) => {
   return a * b;
}, []);
```
React stores:

```jsx
(a, b) => a * b
```
Later:

```jsx
multiply(5, 6);
```
Now you supply the parameters.

Think of it like this

useMemo

You ask React: "Please calculate this value for me."
```jsx
const sum = useMemo(() => 10 + 20, []);
```

React immediately executes:
```jsx
() => 10 + 20
```
and stores

30


useCallback

You ask React: "Please remember this function."
```jsx
const multiply = useCallback((a,b)=>a*b, []);
```

React stores
```jsx
(a,b)=>a*b
```
It doesn't execute it.

Later you do:
```jsx
multiply(10,20);
```

Now it runs.

Under the hood

useCallback is essentially implemented like this:
```jsx
function useCallback(callback, deps) {
    return useMemo(() => callback, deps);
}
```

Notice what useMemo returns here:
```jsx
() => callback
```
It returns the function itself, not the result of calling it.

One more important point about your code

Both hooks should include a dependency array. Without it, the memoization is ineffective because React treats it as needing to recompute every render.

The key difference is:
- useMemo returns a memoized value.
- useCallback returns a memoized function.

### What is React.memo?
React.memo is a function that takes a functional component and returns a new memoized component.

const MemoizedComponent = React.memo(MyComponent);

or

export default React.memo(MyComponent);

It works only with functional components.

Syntax
```jsx
const MyComponent = () => {
    return <h1>Hello</h1>;
}

export default React.memo(MyComponent);
```

Here,

```jsx
React.memo() wraps MyComponent.
```

How does it work?

Suppose you have

```jsx
function Parent() {
    const [count, setCount] = useState(0);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>

            <Child />
        </>
    );
}
```

Child

```jsx
function Child() {
    console.log("Child Rendered");

    return <h2>Child</h2>;
}
```

Without React.memo

Every time Parent renders,

Parent Render
      ↓
Child Render

Even though Child has no props.

Console

Child Rendered
Child Rendered
Child Rendered

With React.memo
```jsx
const Child = React.memo(() => {

    console.log("Child Rendered");

    return <h2>Child</h2>;
});
```

Now

Parent Render
      ↓
React.memo checks props
      ↓
Props changed?
      ↓
No
      ↓
Don't render Child

Console

Child Rendered

Only once.

Why?

React.memo compares

Old props

vs

New props

If they are equal,

it skips rendering.

Example

First render

```jsx
<Child name="Paras" />
```

Second render

```jsx
<Child name="Paras" />
```

React compares

Old
```jsx
{
   name: "Paras"
}
```
New
```jsx
{
   name: "Paras"
}
```
Same value

↓

Skip render.

Now
```jsx
<Child name="Rahul" />
```
Comparison

Old
```jsx
{
   name: "Paras"
}
```
New
```jsx
{
   name: "Rahul"
}
```
Different

↓

Render Child again.

Why do we use useCallback with React.memo?

Consider
```jsx
const Child = React.memo(({ onClick }) => {

    console.log("Child");

    return <button onClick={onClick}>Click</button>;
});
```
Parent
```jsx
function Parent() {

    const [count, setCount] = useState(0);

    const handleClick = () => {
        console.log("Clicked");
    };

    return (
        <>
            <button onClick={() => setCount(count + 1)}>
                Count
            </button>

            <Child onClick={handleClick} />
        </>
    );
}
```

Looks okay.

But every render creates
```jsx
const handleClick = () => {};
```
A new function object.

Old

handleClick → Address 100

New

handleClick → Address 200

React.memo compares props.

Old prop
```jsx
{
    onClick : Address100
}
```
New prop
```jsx
{
    onClick : Address200
}
```

Different reference

↓

Child renders again.

Now use
```jsx
const handleClick = useCallback(() => {

    console.log("Clicked");

}, []);
```
Now

Address100

remains

Address100

React.memo sees

Old

Address100

New

Address100

Same reference

↓

Child doesn't render.

This is why useCallback and React.memo are often used together.

Does React.memo work with class components?

No.

For class components, React provides a similar optimization through:

PureComponent

Example:
```jsx
class Child extends React.PureComponent {
    render() {
        console.log("Rendered");
        return <h1>Hello</h1>;
    }
}
```
PureComponent automatically performs a shallow comparison of props and state before re-rendering.

Easy way to remember
- React.memo → Memoize the entire component (skip re-render if props haven't changed).
- useMemo → Memoize a calculated value.
- useCallback → Memoize a function.
- PureComponent → Class component equivalent of React.memo with shallow prop and state comparison.

### 38. What is useContext?

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

### 39. What is useReducer?

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

### 40. What is a custom hook?

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

### 41. Controlled vs uncontrolled components?
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

### 42. Which is better: controlled or uncontrolled?

Controlled is better when:

- validation is needed
- value controls UI
- submit button depends on fields
- instant feedback is needed

Uncontrolled is useful when:

- simple forms
- file inputs
- integration with non-React libraries

### 43. How to handle form validation?

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

### 44. How parent passes data to child?

Using props.

```tsx
<UserCard user={user} />
```

### 45. How child sends data to parent?

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

### 46. What is prop drilling?

Prop drilling means passing props through many levels just to reach a deeply nested component.

Solutions:

- Context
- Redux/Zustand
- component composition
- custom hooks

### 47. What is lifting state up?

Moving shared state to the nearest common parent.

Example:

```text
Sibling A needs selected user
Sibling B needs selected user
Move selectedUserId to parent
Pass value/callback to both
```

## Routing

### 48. What is React Router?

React Router is a routing library for React apps.

It maps URL paths to components.

Example:

```tsx
<Routes>
  <Route path="/signin" element={<SignInPage />} />
  <Route path="/" element={<Dashboard />} />
</Routes>
```

### 49. What is protected route?

Protected route allows access only when user is authenticated.

Concept:

```tsx
return isAuthenticated ? children : <Navigate to="/signin" />;
```

In this app:

```text
frontend/src/components/ProtectedRoute.tsx
```

### 50. What is public route?

Public route is accessible without login.

But if user is already authenticated, signin/signup pages may redirect to dashboard.

In this app:

```text
frontend/src/components/PublicRoute.tsx
```

### 51. What is Navigate?

`Navigate` redirects user to another route.

Example:

```tsx
<Navigate replace to="/signin" />
```

## State Management

### 52. When to use local state?

Use local state when data belongs to one component.

Examples:

- form input
- modal open/close
- selected tab
- local loading state

### 53. When to use global state?

Use global state when many parts of app need same data.

Examples:

- authenticated account
- user list
- teams
- skills
- notifications/toasts

### 54. What is Redux?

Redux is a predictable state management library.

It stores app state in a central store.

Core ideas:

- store
- actions
- reducers
- dispatch
- selectors

### 55. What is Redux Toolkit?

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

### 56. What is Thunk in Redux?
In Redux Toolkit (RTK), a thunk is a function that contains delayed, asynchronous logic. Because a standard Redux store can only handle synchronous data flow, Redux Toolkit automatically includes the Redux Thunk middleware by default to let you perform side effects like fetching API data.

- How createAsyncThunk Works
When you create an async thunk, you provide an action type prefix and a payload creator function that returns a Promise. The thunk then automatically generates and dispatches three separate lifecycle actions:

- pending: Dispatched immediately when the thunk starts running.

- fulfilled: Dispatched if the Promise resolves successfully with data.

- rejected: Dispatched if the Promise fails or rejects.

### 57. What is reducer?

Reducer is a pure function that calculates next state from current state and action.

Concept:

```ts
nextState = reducer(currentState, action);
```

### 58. What is action?

An action is an object describing what happened.

Example:

```ts
{
  type: 'users/createUser',
  payload: user
}
```

### 59. What is dispatch?

Dispatch sends an action to Redux store.

Example:

```tsx
dispatch(fetchUsers());
```

### 60. What is selector?

Selector reads data from Redux state.

Example:

```ts
const selectUsers = (state: RootState) => state.users.items;
```

Usage:

```tsx
const users = useAppSelector(selectUsers);
```

### 61. What is createAsyncThunk?

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

### 62. What is Redux middleware?

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

### 63. What is Immer?

Immer lets us write mutable-looking reducer code while keeping state immutable internally.

Example:

```ts
state.items.push(user);
```

Redux Toolkit uses Immer behind the scenes.

### 64. What is selector stability warning?

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

### 65. How to secure the React APP?
Securing a React app requires layers of protection at both the client level and the server level. The most critical step is preventing Cross-Site Scripting (XSS) by allowing React to auto-escape data, avoiding dangerouslySetInnerHTML, and sanitizing user inputs. Always treat the frontend as untrusted.

- Prevent Cross-Site Scripting (XSS)
- Protect Environment Variables & Secrets
- Implement Robust Authentication[JWT]
- Rely on the Backend for Security
- Keep Dependencies Updated [Vulnerability]

### 65. How to optimize React performance?

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

### 66. What is React.memo?

`React.memo` prevents re-render if props did not change.

Example:

```tsx
const UserRow = React.memo(({ user }: { user: User }) => {
  return <tr>{user.name}</tr>;
});
```

Useful for expensive child components.

### 67. React.memo vs useMemo?

`React.memo` memoizes a component render based on props.

`useMemo` memoizes a calculated value inside a component.

### 68. What causes unnecessary re-render?

Common causes:

- parent re-render
- new object/array/function references
- global state changes
- context value changes
- selector returning new array/object every time
- unstable keys

### 69. Difference between `npm create vite@latest my-react-app -- --template react` and `npx create-react-app my-react-app`?

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

### 70. What happens behind the scenes when we create a React project using Vite or Create React App?

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

### 71. How to avoid new object prop each render?

Bad:

```tsx
<Table filters={{ status: 'active' }} />
```

Good:

```tsx
const filters = useMemo(() => ({ status: 'active' }), []);

<Table filters={filters} />;
```

### 72. What is lazy loading in React?

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

### 73. What is code splitting?

Code splitting breaks app bundle into smaller chunks.

Benefits:

- faster initial load
- load feature code only when needed

### 74. What is list virtualization?

Virtualization renders only visible rows in a large list.

Useful for:

- thousands of rows
- large tables
- chat messages

Libraries:

- `react-window`
- `react-virtualized`

## API Calls

### 75. Where should API calls be made?

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

### 76. How to fetch data in useEffect?

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

### 77. Why avoid directly making useEffect callback async?

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

### 78. How to handle loading and error state?

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

### 79. How to cancel API request?

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

### 80. How does React know user is logged in?

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

### 81. Can React read HTTP-only cookie?

No.

HTTP-only cookie cannot be read using JavaScript.

Frontend checks auth by calling backend session API.

Example:

```text
GET /api/auth/session
```

### 82. Why use credentials: include?

In fetch:

```ts
credentials: 'include'
```

This tells browser to include cookies in API requests.

In this app:

```text
frontend/src/services/http.ts
```

### 83. How protected route works in this app?

Concept:

```tsx
if (authStatus !== 'authenticated') {
  return <Navigate to="/signin" />;
}

return children;
```

The route guard uses Redux auth state.

### 84. How role-based UI works?

Example:

```tsx
account?.role === 'admin' ? <AdminSettingsPage /> : <Navigate to="/" />
```

Important:

Frontend role checks improve UX but are not security by themselves.

Backend must also enforce authorization.

## TypeScript With React

### 85. Why use TypeScript with React?

Benefits:

- catches mistakes early
- typed props
- typed API responses
- better autocomplete
- safer refactoring

### 86. How to type component props?

```tsx
type UserCardProps = {
  name: string;
  email: string;
};

const UserCard = ({ name, email }: UserCardProps) => {
  return <p>{name} - {email}</p>;
};
```

### 87. How to type useState?

```tsx
const [user, setUser] = useState<User | null>(null);
```

For inferred values:

```tsx
const [count, setCount] = useState(0);
```

### 88. How to type event handlers?

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

### 89. How to type useRef?

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

Use:

```tsx
inputRef.current?.focus();
```

## React Patterns

### 90. What is composition?

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

### 91. Controlled modal pattern?

Parent controls open/close state.

```tsx
const [isOpen, setIsOpen] = useState(false);

{isOpen ? <Modal onClose={() => setIsOpen(false)} /> : null}
```

### 92. Container vs presentational components?

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

### 93. What is children prop?

`children` lets component render nested content.

Example:

```tsx
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};
```

## Error Handling

### 94. What is Error Boundary?

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

### 95. How to handle API errors?

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

### 96. What is StrictMode?

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

### 97. Why does useEffect run twice in development?

Because React StrictMode intentionally mounts/unmounts/remounts components in development to detect unsafe effects.

Production does not behave the same way.

### 98. Why not update state directly?

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

### 99. Why state should be immutable?

Immutability helps React detect changes and makes updates predictable.

### 100. Why component names should start with capital letter?

React treats lowercase tags as HTML elements.

Good:

```tsx
<UserCard />
```

Bad:

```tsx
<userCard />
```

### 101. Why hooks cannot be conditional?

React relies on hook call order.

If hooks are conditional, order can change between renders and React cannot match hook state correctly.

### 102. What is stale closure?

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

### 103. Why use functional state update?

Use when new state depends on previous state.

```tsx
setCount((current) => current + 1);
```

This avoids stale state issues.

### 104. Why not use array index as key?

Index key can break UI when list order changes.

Problems:

- wrong item state
- incorrect animations
- inefficient updates

Use stable ID instead.

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

## DEEP Understanding TOPICS

This section is for deeper interview answers. The goal is not only to define each concept, but to explain how React thinks internally and what mistakes developers usually make.

### 1. Rendering Cycle

Interview answer:

```text
Rendering in React means React calls a component function to calculate what the UI should look like for the current props, state, and context. A render does not always mean the real DOM changes. After rendering, React compares the new UI description with the previous one, then commits only the required changes to the real DOM.
```

Rendering has two important parts:

- render phase: React calls components and creates the next React element tree.
- commit phase: React applies the necessary changes to the real DOM and runs effects.

#### Initial render vs re-render

Initial render means the first time React renders the component tree.

Example:

```tsx
createRoot(document.getElementById('root')!).render(<App />);
```

React starts from `App`, calls component functions, creates the initial UI tree, and commits it to the DOM.

Re-render means React calls a component again after something changed.

Common reasons for re-render:

- local state changes
- parent component re-renders
- props change
- context value changes
- external store or Redux selector result changes

Important interview point:

```text
A component re-render means its function runs again. It does not guarantee that the DOM is changed.
```

#### What causes a component to re-render?

Example:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log('Counter rendered');

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

When `setCount` runs:

1. React schedules a state update.
2. React calls `Counter` again.
3. React calculates the new UI.
4. React compares old and new output.
5. React updates the button text in the DOM if needed.

#### Parent re-render vs child re-render

By default, when a parent renders, React also renders its child components.

Example:

```tsx
function Parent() {
  const [count, setCount] = useState(0);

  console.log('Parent rendered');

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child />
    </>
  );
}

function Child() {
  console.log('Child rendered');
  return <p>Child component</p>;
}
```

When `count` changes:

```text
Parent state update
  -> Parent renders again
  -> Child renders again
  -> React checks what actually changed in the DOM
```

Even if `Child` has no props, its function runs again because it is part of the parent output. This does not always mean the real DOM inside `Child` changes.

To skip child rendering when props are the same, use `React.memo`.

```tsx
const Child = React.memo(function Child() {
  console.log('Child rendered');
  return <p>Child component</p>;
});
```

Now when `Parent` re-renders, React checks whether `Child` props changed. If not, React can skip calling `Child`.

#### State update -> render -> commit

The high-level flow:

```text
User event
  -> setState
  -> React schedules update
  -> render phase
  -> reconciliation
  -> commit phase
  -> browser paints updated UI
  -> effects run after paint
```

Example:

```tsx
function App() {
  const [name, setName] = useState('Paras');

  return (
    <>
      <h1>{name}</h1>
      <button onClick={() => setName('Rahul')}>Change</button>
    </>
  );
}
```

When button is clicked:

1. `setName('Rahul')` schedules update.
2. `App` runs again.
3. React sees old output had `Paras`, new output has `Rahul`.
4. React commits text update to DOM.

Common mistake:

```text
Do not say "React re-renders the whole DOM." React re-renders component functions, then updates only the necessary DOM parts.
```

### 2. Component Lifecycle in Functional Components

Interview answer:

```text
Functional components do not have lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount. Instead, React gives us hooks like useEffect to run code after mount, after updates, and during cleanup before unmount or before the next effect run.
```

Lifecycle means the stages a component goes through:

- mount: component appears on the screen for the first time
- update: component re-renders because props, state, or context changed
- unmount: component is removed from the screen

#### Mount

Mount happens when the component is first added to the UI.

```tsx
useEffect(() => {
  console.log('Component mounted');
}, []);
```

An empty dependency array means the effect runs after the initial render.

Class component equivalent:

```text
componentDidMount
```

#### Update

Update happens when state, props, or context changes.

```tsx
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);
```

This effect runs after mount and whenever `count` changes.

Class component equivalent:

```text
componentDidMount + componentDidUpdate for count
```

#### Unmount

Unmount happens when the component is removed.

```tsx
useEffect(() => {
  const timerId = window.setInterval(() => {
    console.log('tick');
  }, 1000);

  return () => {
    window.clearInterval(timerId);
    console.log('Component cleanup');
  };
}, []);
```

The returned function is the cleanup function.

Class component equivalent:

```text
componentWillUnmount
```

Important detail:

```text
Cleanup does not only run on unmount. If dependencies change, React runs the previous cleanup before running the next effect.
```

Example:

```tsx
useEffect(() => {
  console.log('Subscribe to user:', userId);

  return () => {
    console.log('Unsubscribe from user:', userId);
  };
}, [userId]);
```

When `userId` changes from `1` to `2`:

```text
cleanup for userId 1
run effect for userId 2
```

### 3. useEffect Deep Dive

Interview answer:

```text
useEffect is used to run side effects after React has rendered and committed the UI. A side effect is any work that interacts with something outside React's render calculation, such as API calls, timers, subscriptions, event listeners, localStorage, or manually changing document title.
```

React component rendering should be pure:

```tsx
function UserProfile({ userId }: { userId: string }) {
  return <h1>User {userId}</h1>;
}
```

The component should calculate UI. It should not directly perform side effects during render.

Bad:

```tsx
function UserProfile({ userId }: { userId: string }) {
  fetch(`/api/users/${userId}`);
  return <h1>User</h1>;
}
```

Why bad?

- render can happen multiple times
- render may be interrupted
- React expects rendering to be pure
- API calls during render can create duplicate requests

Good:

```tsx
function UserProfile({ userId }: { userId: string }) {
  useEffect(() => {
    fetch(`/api/users/${userId}`);
  }, [userId]);

  return <h1>User</h1>;
}
```

#### Empty dependency array

```tsx
useEffect(() => {
  console.log('Runs after initial render');
}, []);
```

This runs after the component mounts.

Use cases:

- initial API call
- attach global event listener once
- start timer once
- initialize third-party library

Important:

```text
In React StrictMode during development, React may run effects twice to help detect unsafe side effects. This does not happen the same way in production.
```

#### No dependency array

```tsx
useEffect(() => {
  console.log('Runs after every render');
});
```

This runs after every render.

Use this rarely. It is useful when the effect truly depends on every render, but in most real code you should provide dependencies.

#### With dependencies

```tsx
useEffect(() => {
  console.log('User changed:', userId);
}, [userId]);
```

This runs:

- after initial render
- again whenever `userId` changes

Multiple dependencies:

```tsx
useEffect(() => {
  console.log('Filters changed');
}, [searchText, status, page]);
```

React compares each dependency using `Object.is`.

#### Cleanup function

```tsx
useEffect(() => {
  const handleResize = () => {
    console.log(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

Cleanup prevents:

- memory leaks
- duplicate subscriptions
- old timers running
- old network requests updating state

#### API calls in useEffect

Basic example:

```tsx
function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);

      const response = await fetch('/api/users');
      const data = await response.json();

      setUsers(data);
      setLoading(false);
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <UserList users={users} />;
}
```

Better API example with request cancellation:

```tsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUsers() {
    try {
      const response = await fetch('/api/users', {
        signal: controller.signal,
      });

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      console.error(error);
    }
  }

  loadUsers();

  return () => {
    controller.abort();
  };
}, []);
```

#### Why not make the effect callback async?

Bad:

```tsx
useEffect(async () => {
  const response = await fetch('/api/users');
}, []);
```

`async` functions return a Promise, but `useEffect` expects the callback to return either:

- nothing
- a cleanup function

Good:

```tsx
useEffect(() => {
  async function loadUsers() {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  }

  loadUsers();
}, []);
```

#### Infinite loops

Bad:

```tsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

Why it loops:

```text
effect runs
  -> setCount changes count
  -> component re-renders
  -> count dependency changed
  -> effect runs again
```

Sometimes the fix is a functional update:

```tsx
useEffect(() => {
  setCount((prev) => prev + 1);
}, []);
```

Sometimes the fix is removing unnecessary state or moving derived values into render.

Common interview mistake:

```text
Do not use useEffect for every calculation. If a value can be calculated from props or state during render, calculate it during render or use useMemo if it is expensive.
```

### 4. useRef

Interview answer:

```text
useRef returns a stable object whose current property can hold a mutable value across renders. Updating ref.current does not trigger a re-render because React does not track ref changes as UI state.
```

Example:

```tsx
const countRef = useRef(0);

countRef.current += 1;
```

React keeps the same ref object between renders:

```tsx
const refObject = {
  current: initialValue,
};
```

#### Why updating ref.current does not re-render

State is part of React's render scheduling system:

```tsx
setCount(10);
```

This tells React:

```text
state changed, render again
```

Ref is just a mutable container:

```tsx
countRef.current = 10;
```

This does not tell React to render again.

Use `useState` when the UI should update.

Use `useRef` when you need to remember a value without updating UI.

#### DOM references

```tsx
function SearchBox() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

Here, React assigns the actual input DOM element to `inputRef.current`.

#### Storing previous values

```tsx
function Counter({ count }: { count: number }) {
  const previousCountRef = useRef<number | null>(null);

  useEffect(() => {
    previousCountRef.current = count;
  }, [count]);

  return (
    <p>
      Current: {count}, Previous: {previousCountRef.current}
    </p>
  );
}
```

The ref remembers the previous value without causing an extra render.

#### Avoiding unnecessary renders

Example: store timer ID.

```tsx
function Timer() {
  const timerRef = useRef<number | null>(null);

  const start = () => {
    timerRef.current = window.setInterval(() => {
      console.log('tick');
    }, 1000);
  };

  const stop = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
    }
  };

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
```

The timer ID does not need to appear in the UI, so ref is better than state.

Common mistake:

```text
Do not store UI data in refs. If changing the value should update the screen, use state.
```

### 5. useMemo

Interview answer:

```text
useMemo memoizes the result of a calculation between renders. React reuses the previous calculated value until one of the dependencies changes.
```

Syntax:

```tsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(input);
}, [input]);
```

Example:

```tsx
function UserTable({ users, searchText }: Props) {
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [users, searchText]);

  return <Table users={filteredUsers} />;
}
```

Without `useMemo`, filtering runs on every render. With `useMemo`, filtering runs only when `users` or `searchText` changes.

#### When to use useMemo

Use it when:

- calculation is expensive
- derived value is passed to memoized children
- stable object or array reference matters

Example with stable object:

```tsx
const chartOptions = useMemo(() => {
  return {
    showLegend: true,
    color: themeColor,
  };
}, [themeColor]);
```

#### When not to use useMemo

Do not use it for every small calculation.

Bad:

```tsx
const fullName = useMemo(() => {
  return `${firstName} ${lastName}`;
}, [firstName, lastName]);
```

This calculation is cheap, so `useMemo` adds unnecessary complexity.

Better:

```tsx
const fullName = `${firstName} ${lastName}`;
```

Important:

```text
useMemo is a performance optimization, not a guarantee of business logic correctness.
```

### 6. useCallback

Interview answer:

```text
useCallback memoizes a function reference between renders. It is mainly useful when passing callbacks to memoized child components or when a function is used inside another hook dependency array.
```

Syntax:

```tsx
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);
```

Every render normally creates new function objects.

Example without `useCallback`:

```tsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleSave = () => {
    console.log('save');
  };

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onSave={handleSave} />
    </>
  );
}
```

Every time `Parent` renders, `handleSave` gets a new reference.

If `Child` uses `React.memo`, the new function reference can still make it re-render.

Fix:

```tsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleSave = useCallback(() => {
    console.log('save');
  }, []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onSave={handleSave} />
    </>
  );
}
```

`useCallback(fn, deps)` is similar to:

```tsx
useMemo(() => fn, deps);
```

Use `useCallback` when:

- passing a callback to a `React.memo` child
- function is a dependency of `useEffect`, `useMemo`, or another `useCallback`
- a library depends on stable callback references

Do not use it everywhere. If the child is not memoized and the function reference is not used as a dependency, `useCallback` may not help.

### 7. React.memo

Interview answer:

```text
React.memo memoizes a functional component. It tells React to skip re-rendering that component if its props are shallowly equal to the previous props.
```

Example:

```tsx
const UserCard = React.memo(function UserCard({ name }: { name: string }) {
  console.log('UserCard rendered');
  return <p>{name}</p>;
});
```

If parent re-renders with the same `name`, React can skip rendering `UserCard`.

#### Shallow comparison of props

`React.memo` compares previous props and next props shallowly.

Primitive prop:

```tsx
<UserCard name="Paras" />
```

If `name` is still `"Paras"`, React skips.

Object prop:

```tsx
<UserCard user={{ name: 'Paras' }} />
```

This creates a new object every render, so shallow comparison fails.

Better:

```tsx
const user = useMemo(() => {
  return { name: 'Paras' };
}, []);

<UserCard user={user} />;
```

#### Why children re-render

Parent:

```tsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child title="Profile" />
    </>
  );
}
```

Without `React.memo`, `Child` renders whenever `Parent` renders.

With `React.memo`, `Child` can skip rendering if its props are unchanged.

#### Custom comparison function

```tsx
const UserRow = React.memo(
  function UserRow({ user }: { user: User }) {
    return <p>{user.name}</p>;
  },
  (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id;
  }
);
```

Return `true` to skip re-render.

Return `false` to re-render.

Important caution:

```text
Custom comparison functions can create bugs if they ignore props that affect rendering.
```

Bad comparison:

```tsx
(prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id;
}
```

If UI displays `user.name` and name changes while id stays same, the component may show stale data.

### 8. Shallow vs Deep Comparison

Interview answer:

```text
Shallow comparison checks whether top-level values are equal. For objects, arrays, and functions, it checks reference equality, not nested content. Deep comparison checks nested values recursively, but it is more expensive.
```

Primitive comparison:

```tsx
Object.is(10, 10); // true
Object.is('Paras', 'Paras'); // true
```

Reference comparison:

```tsx
const obj1 = { name: 'Paras' };
const obj2 = { name: 'Paras' };

console.log(obj1 === obj2); // false
```

Even though contents are same, both objects live at different memory addresses.

Same reference:

```tsx
const obj1 = { name: 'Paras' };
const obj2 = obj1;

console.log(obj1 === obj2); // true
```

#### Why this matters in React

React uses shallow comparison in many places:

- `React.memo`
- `PureComponent`
- dependency arrays using `Object.is`
- Redux selector equality checks in some cases

Example:

```tsx
function Parent() {
  const user = { name: 'Paras' };

  return <MemoizedChild user={user} />;
}
```

Every parent render creates a new `user` object. `React.memo` sees:

```text
old user reference !== new user reference
```

So child re-renders.

Fix:

```tsx
const user = useMemo(() => {
  return { name: 'Paras' };
}, []);
```

#### Shallow comparison example

```tsx
const oldProps = {
  user: { name: 'Paras' },
};

const newProps = {
  user: { name: 'Paras' },
};
```

Shallow comparison:

```text
oldProps.user === newProps.user -> false
```

Deep comparison would check:

```text
oldProps.user.name === newProps.user.name -> true
```

React usually avoids deep comparison because it can be expensive for large objects.

### 9. Closures in JavaScript

Interview answer:

```text
A closure is created when a function remembers variables from the scope where it was created, even after that outer function has finished running. React hooks rely heavily on closures because every render creates a new scope with its own props, state, and functions.
```

Basic example:

```tsx
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const increment = createCounter();

console.log(increment()); // 1
console.log(increment()); // 2
```

`increment` remembers `count`.

#### Closure in React

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log(count);
  };

  return <button onClick={handleClick}>Log</button>;
}
```

`handleClick` closes over the `count` value from the render where it was created.

Every render has its own values:

```text
render 1 -> count is 0 -> handleClick remembers 0
render 2 -> count is 1 -> handleClick remembers 1
render 3 -> count is 2 -> handleClick remembers 2
```

#### Stale closure

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      console.log(count);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  return <button onClick={() => setCount(count + 1)}>Increment</button>;
}
```

The interval logs the initial `count` forever because the effect runs once and the callback closes over the first render's `count`.

Fix with dependency:

```tsx
useEffect(() => {
  const timerId = window.setInterval(() => {
    console.log(count);
  }, 1000);

  return () => window.clearInterval(timerId);
}, [count]);
```

Fix with ref:

```tsx
const countRef = useRef(count);

useEffect(() => {
  countRef.current = count;
}, [count]);

useEffect(() => {
  const timerId = window.setInterval(() => {
    console.log(countRef.current);
  }, 1000);

  return () => window.clearInterval(timerId);
}, []);
```

Important interview point:

```text
Dependency arrays are connected to closures. Dependencies tell React when to recreate an effect or memoized callback so it can see fresh values.
```

### 10. Dependency Arrays

Interview answer:

```text
A dependency array tells React when to re-run an effect or recompute a memoized value/function. React compares each dependency with its previous value using Object.is. If any dependency changed, React runs the hook logic again.
```

Used by:

- `useEffect`
- `useMemo`
- `useCallback`

#### useEffect with empty array

```tsx
useEffect(() => {
  console.log('Runs after mount');
}, []);
```

Meaning:

```text
This effect does not depend on changing values from renders.
```

It runs after initial mount.

#### useEffect with dependencies

```tsx
useEffect(() => {
  console.log(count);
}, [count]);
```

Meaning:

```text
Run this effect after mount and whenever count changes.
```

#### useEffect without dependency array

```tsx
useEffect(() => {
  console.log('Runs after every render');
});
```

Meaning:

```text
React should run this effect after every render.
```

#### Object and array dependencies

Bad:

```tsx
useEffect(() => {
  console.log('filter changed');
}, [{ status: 'active' }]);
```

This object is recreated on every render, so the effect runs every render.

Better:

```tsx
const filter = useMemo(() => {
  return { status: 'active' };
}, []);

useEffect(() => {
  console.log('filter changed');
}, [filter]);
```

Or depend on the primitive value:

```tsx
const status = 'active';

useEffect(() => {
  console.log('status changed');
}, [status]);
```

#### Dependency array and useMemo

```tsx
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);
```

React recalculates `total` when `items` reference changes.

#### Dependency array and useCallback

```tsx
const handleDelete = useCallback((id: string) => {
  dispatch(deleteUser(id));
}, [dispatch]);
```

React returns the same function reference until `dispatch` changes.

Common mistake:

```text
Do not remove dependencies just to stop an effect from running. That usually creates stale closure bugs.
```

### 11. State Batching

Interview answer:

```text
State batching means React groups multiple state updates together and performs one render for better performance. Because state values inside the current render are fixed, multiple setState calls using the same old value may not produce multiple increments. Use functional updates when the next state depends on the previous state.
```

Example:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={increment}>{count}</button>;
}
```

If `count` is `0`, both calls are:

```tsx
setCount(1);
setCount(1);
```

Final result is `1`, not `2`.

Correct way:

```tsx
const increment = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
};
```

Now React processes:

```text
previous 0 -> 1
previous 1 -> 2
```

Final result is `2`.

#### Why console shows old value

```tsx
const increment = () => {
  setCount(count + 1);
  console.log(count);
};
```

`console.log(count)` prints the value from the current render. The new value is available on the next render.

Important interview line:

```text
State behaves like a snapshot. Each render has its own state values.
```

### 12. Context API

Interview answer:

```text
Context API lets us pass data through the component tree without manually passing props at every level. It is useful for global or shared values like theme, language, authenticated user, and feature flags.
```

Steps:

1. Create context.
2. Wrap components with provider.
3. Read value using `useContext`.

Example:

```tsx
type Theme = 'light' | 'dark';

const ThemeContext = createContext<Theme>('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Layout />
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);

  return <header className={theme}>Header</header>;
}
```

#### Provider

The provider supplies the value:

```tsx
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
```

#### Consumer

Modern React usually uses `useContext`:

```tsx
const theme = useContext(ThemeContext);
```

Older style:

```tsx
<ThemeContext.Consumer>
  {(theme) => <Header theme={theme} />}
</ThemeContext.Consumer>
```

#### Why Context can cause many re-renders

When provider value changes, all components that consume that context re-render.

Example:

```tsx
<AuthContext.Provider value={{ user, login, logout }}>
  {children}
</AuthContext.Provider>
```

If this object is created inline, it gets a new reference every provider render.

Better:

```tsx
const value = useMemo(() => {
  return { user, login, logout };
}, [user, login, logout]);

<AuthContext.Provider value={value}>
  {children}
</AuthContext.Provider>
```

Good Context use cases:

- theme
- current user
- locale
- app configuration
- small shared state

Avoid using Context as a replacement for all state management. For frequently changing large state, Redux, Zustand, or colocated state may be better.

### 13. Custom Hooks

Interview answer:

```text
A custom hook is a reusable function that starts with use and can call other hooks. It is used to share stateful logic between components, not to share the same state automatically.
```

Example:

```tsx
function useAddition(num1: number, num2: number) {
  return useMemo(() => {
    return num1 + num2;
  }, [num1, num2]);
}
```

Usage:

```tsx
const total = useAddition(10, 20);
```

#### Sharing logic, not state

Important:

```text
If two components call the same custom hook, each component gets its own independent state unless the hook reads from shared external state or context.
```

Example:

```tsx
function useCounter() {
  const [count, setCount] = useState(0);

  return {
    count,
    increment: () => setCount((prev) => prev + 1),
  };
}
```

If `Header` and `Footer` both call `useCounter`, they do not share one count. Each call creates separate state for that component.

#### useFetch example

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const json = (await response.json()) as T;
        setData(json);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        setError(err as Error);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
```

Usage:

```tsx
const { data, loading, error } = useFetch<User[]>('/api/users');
```

#### Rules of Hooks still apply

Bad:

```tsx
function useUser(enabled: boolean) {
  if (enabled) {
    useEffect(() => {}, []);
  }
}
```

Good:

```tsx
function useUser(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    // fetch user
  }, [enabled]);
}
```

### 14. Reconciliation and Virtual DOM

Interview answer:

```text
The Virtual DOM is React's in-memory description of the UI. Reconciliation is the process React uses to compare the previous UI tree with the next UI tree and decide what needs to change in the real DOM.
```

When state changes:

```text
state update
  -> component renders
  -> new React element tree is created
  -> React compares old tree and new tree
  -> React calculates minimal required changes
  -> React commits changes to real DOM
```

React elements are plain objects that describe UI.

Example:

```tsx
const element = <h1>Hello</h1>;
```

Conceptually:

```tsx
{
  type: 'h1',
  props: {
    children: 'Hello',
  },
}
```

#### Diffing rules

React uses practical assumptions:

- different element types create different trees
- same element type can update existing DOM node
- keys help React match list items between renders

Example:

```tsx
return isLoggedIn ? <Dashboard /> : <Login />;
```

If `Dashboard` changes to `Login`, React removes one tree and mounts another.

Same type:

```tsx
return <h1>{title}</h1>;
```

If only `title` changes, React can keep the same `h1` DOM node and update text.

#### Why key is important during reconciliation

Without good keys, React may match list items by position.

```tsx
users.map((user) => <UserRow key={user.id} user={user} />);
```

`key` tells React:

```text
This item is the same logical item across renders.
```

This helps React preserve component state correctly and update lists efficiently.

Common mistake:

```text
Virtual DOM does not mean React avoids the DOM completely. React still updates the real DOM, but it calculates those updates efficiently.
```

### 15. key Prop

Interview answer:

```text
The key prop helps React identify list items between renders. It is used during reconciliation to decide which item was added, removed, moved, or updated.
```

Good:

```tsx
{users.map((user) => (
  <User key={user.id} user={user} />
))}
```

Bad when list can change:

```tsx
{users.map((user, index) => (
  <User key={index} user={user} />
))}
```

#### Why key is necessary

Suppose list is:

```text
1. Paras
2. Rahul
3. Neha
```

Then a new user is inserted at the top:

```text
1. Ankit
2. Paras
3. Rahul
4. Neha
```

With stable IDs, React knows `Paras`, `Rahul`, and `Neha` are the same items and only `Ankit` is new.

With index keys, React sees positions changed:

```text
old index 0 was Paras, new index 0 is Ankit
old index 1 was Rahul, new index 1 is Paras
```

This can cause incorrect UI state.

#### Problem with index as key

Example:

```tsx
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <>
      {todos.map((todo, index) => (
        <TodoInput key={index} todo={todo} />
      ))}
    </>
  );
}
```

If each `TodoInput` has internal state and the list order changes, state may stay with the position instead of the correct todo item.

When index is acceptable:

- list is static
- list never reorders
- list never inserts or deletes from middle
- items do not have internal state

Best practice:

```text
Use a stable unique ID from the data whenever possible.
```

### 16. Controlled vs Uncontrolled Components

Interview answer:

```text
A controlled component is a form element whose value is controlled by React state. An uncontrolled component stores its value in the DOM, and React reads it using a ref when needed.
```

#### Controlled input

```tsx
function ControlledForm() {
  const [email, setEmail] = useState('');

  return (
    <input
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
  );
}
```

React state is the source of truth.

Benefits:

- easy validation
- instant UI feedback
- conditional submit button
- controlled formatting
- predictable value

Example validation:

```tsx
const isValid = email.includes('@');
```

#### Uncontrolled input

```tsx
function UncontrolledForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    console.log(inputRef.current?.value);
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

The DOM is the source of truth.

Benefits:

- less state code
- useful for simple forms
- useful for file inputs
- can integrate with non-React code

#### defaultValue vs value

Uncontrolled:

```tsx
<input defaultValue="Paras" />
```

Controlled:

```tsx
<input value={name} onChange={(event) => setName(event.target.value)} />
```

Common mistake:

```text
Do not switch an input from uncontrolled to controlled during its lifetime. For example, avoid value={undefined} first and value="Paras" later.
```

### 17. useReducer

Interview answer:

```text
useReducer is a hook for managing state with a reducer function and dispatch actions. It is useful when state logic is complex, when next state depends on previous state, or when multiple related state transitions should be handled in one predictable place.
```

Basic example:

```tsx
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
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  );
}
```

#### When to use useReducer instead of useState

Use `useState` when state is simple:

```tsx
const [isOpen, setIsOpen] = useState(false);
```

Use `useReducer` when:

- state has multiple fields
- updates are based on action types
- state transitions are complex
- next state depends on previous state
- you want reducer logic to be easy to test

Example form state:

```tsx
type FormState = {
  email: string;
  password: string;
  touched: boolean;
  error: string | null;
};
```

This can become messy with many `useState` calls. `useReducer` keeps transitions centralized.

Important:

```text
The reducer must be pure. It should not mutate state, call APIs, or cause side effects.
```

Bad:

```tsx
state.count += 1;
return state;
```

Good:

```tsx
return { count: state.count + 1 };
```

### 18. State vs Props

Interview answer:

```text
Props are read-only inputs passed from parent to child. State is data managed inside a component that can change over time. Props flow down the component tree, and state changes trigger re-renders.
```

#### Props

Props are external data.

```tsx
function UserCard({ name }: { name: string }) {
  return <p>{name}</p>;
}

<UserCard name="Paras" />;
```

The parent owns the value. The child receives it.

Props are read-only:

```tsx
function UserCard(props: { name: string }) {
  props.name = 'Rahul'; // wrong
  return <p>{props.name}</p>;
}
```

Correct pattern:

```tsx
function UserCard({
  name,
  onNameChange,
}: {
  name: string;
  onNameChange: (name: string) => void;
}) {
  return (
    <input
      value={name}
      onChange={(event) => onNameChange(event.target.value)}
    />
  );
}
```

The child asks the parent to update the value.

#### State

State is internal component data.

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

When state changes, React re-renders the component.

#### Data flow in React

React uses one-way data flow:

```text
Parent state
  -> passed as props
  -> child renders UI
  -> child sends event/callback
  -> parent updates state
  -> new props go down
```

Example:

```tsx
function Parent() {
  const [name, setName] = useState('Paras');

  return <Child name={name} onNameChange={setName} />;
}

function Child({
  name,
  onNameChange,
}: {
  name: string;
  onNameChange: (name: string) => void;
}) {
  return (
    <input
      value={name}
      onChange={(event) => onNameChange(event.target.value)}
    />
  );
}
```

Key interview summary:

```text
State is owned and changed by a component. Props are received from a parent and should not be mutated. Data flows down through props, and events flow up through callbacks.
```

### 19. Handling Double Click on Payment Button

Interview question:

```text
What happens if a user clicks the payment button two times? Will the API break? How should we handle this?
```

Interview answer:

```text
If a user clicks a payment button twice, the API may receive two requests. The API usually will not "break", but the application can create duplicate payment attempts, duplicate orders, or even charge the user twice if the backend and payment gateway are not designed safely. Disabling the button on the frontend is a good UX protection, but the real protection must be on the backend using idempotency, order status checks, database constraints, and payment gateway verification.
```

#### Frontend approach: disable button during API call

Your answer is correct for frontend UX.

Example:

```tsx
function PaymentButton({ orderId }: { orderId: string }) {
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    if (isPaying) {
      return;
    }

    try {
      setIsPaying(true);
      setError('');

      await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      <button disabled={isPaying} onClick={handlePayment}>
        {isPaying ? 'Processing...' : 'Pay Now'}
      </button>

      {error && <p>{error}</p>}
    </>
  );
}
```

This prevents accidental double-clicks from the UI.

But important:

```text
Frontend protection is not enough because users can refresh, retry, use DevTools, call the API from Postman, or network retries can send duplicate requests.
```

#### Backend approach: idempotency key

The strongest answer is idempotency.

An idempotency key is a unique key for one payment attempt.

Example:

```text
Idempotency-Key: order_123_payment_attempt_abc
```

If the same request comes again with the same key, backend should not create a new payment.

Instead, backend returns the same previous result.

Concept:

```text
First request with key ABC
  -> create payment
  -> save result against key ABC

Second request with same key ABC
  -> do not create payment again
  -> return saved result
```

#### Backend approach: payment status check

Maintain payment/order states:

```text
CREATED
PROCESSING
PAID
FAILED
CANCELLED
```

Before starting payment:

```text
If order is already PROCESSING, do not create another payment.
If order is already PAID, return payment already completed.
If order is FAILED, allow retry based on business rule.
```

Example logic:

```ts
if (order.paymentStatus === 'PAID') {
  return existingPayment;
}

if (order.paymentStatus === 'PROCESSING') {
  return pendingPayment;
}

order.paymentStatus = 'PROCESSING';
await order.save();
```

#### Backend approach: database unique constraint

Add a unique constraint on values like:

```text
orderId + paymentAttemptId
or
idempotencyKey
```

Even if two requests hit the backend at the exact same time, the database allows only one record.

This protects against race conditions.

#### Payment gateway idempotency

Real payment gateways often support idempotency keys.

For example:

```text
Backend sends idempotency key to payment gateway.
Payment gateway ensures the same payment request is not charged twice.
```

This is important because payment safety should not depend only on frontend state.

#### Webhook as source of truth

Do not mark payment successful only because frontend says success.

Better flow:

```text
1. Frontend starts payment.
2. Payment gateway processes payment.
3. Gateway sends webhook to backend.
4. Backend verifies webhook signature.
5. Backend marks order as PAID.
```

The backend or payment gateway should be the source of truth for payment status.

Strong final interview answer:

```text
I will disable the payment button after the first click to prevent accidental double submission in the UI. But I will not rely only on frontend logic. On the backend, I will use an idempotency key, check order/payment status, add database constraints, and use payment gateway idempotency or webhooks. This ensures that even if two API requests are sent, only one payment is actually processed.
```

### 20. Route Change or Component Unmount During API Call

Interview questions:

```text
What if user changes route during API call?
How do you avoid setting state on an unmounted component?
What if component unmounts before API response?
What could be the real user experience here?
```

Interview answer:

```text
If a user changes route while an API call is still running, the component that started the request may unmount before the response comes back. The API itself usually continues unless we cancel it. When the response arrives, old code may try to update state for a component that is no longer on the screen. The right approach is to cancel the request using AbortController or ignore the stale response during cleanup.
```

#### Real experience in the app

Example situation:

```text
User opens /users
  -> users API starts loading
User quickly navigates to /dashboard
  -> UsersPage unmounts
Users API response comes back later
  -> old request tries to update UsersPage state
```

What can happen:

- unnecessary network request keeps running
- loader may behave incorrectly if state is global
- old response may overwrite newer data
- React 17 and older may show warning about updating unmounted component
- user may see stale data if the same component remounts with different params
- memory leaks can happen with subscriptions, timers, or event listeners

Important:

```text
Route change often causes component unmount. Component unmount means React removed that component from the UI.
```

#### Best approach: AbortController

Use `AbortController` to cancel the fetch request when the component unmounts.

Example:

```tsx
function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/users', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        setError('Something went wrong');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

When route changes:

```text
UsersPage unmounts
  -> cleanup runs
  -> controller.abort()
  -> fetch is cancelled
  -> old request does not update state
```

#### Alternative approach: ignore stale response

Sometimes you cannot cancel the request directly. In that case, you can ignore the response if the component is no longer active.

Example:

```tsx
useEffect(() => {
  let isActive = true;

  const loadUser = async () => {
    const response = await fetch('/api/user/1');
    const data = await response.json();

    if (!isActive) {
      return;
    }

    setUser(data);
  };

  loadUser();

  return () => {
    isActive = false;
  };
}, []);
```

This does not cancel the network request, but it prevents state update after unmount.

#### Race condition example

This problem also happens when the same component stays mounted but params change quickly.

Example:

```text
User opens /users/1
  -> request for user 1 starts
User quickly opens /users/2
  -> request for user 2 starts
Request for user 2 finishes first
  -> UI shows user 2
Request for user 1 finishes later
  -> old response may overwrite UI with user 1
```

Fix:

```text
Cancel the previous request when userId changes, or track latest request id and ignore older responses.
```

Example with route param:

```tsx
useEffect(() => {
  const controller = new AbortController();

  const loadUser = async () => {
    const response = await fetch(`/api/users/${userId}`, {
      signal: controller.signal,
    });

    const data = await response.json();
    setUser(data);
  };

  loadUser();

  return () => {
    controller.abort();
  };
}, [userId]);
```

When `userId` changes, React runs cleanup for the previous effect before running the new effect.

#### With React Query or similar libraries

In real projects, libraries like React Query, SWR, or RTK Query help with:

- request cancellation
- stale data handling
- cache management
- retries
- loading and error state
- ignoring outdated responses

Strong final interview answer:

```text
If the user changes route during an API call, the component may unmount before the response returns. I handle this by cleaning up the effect. For fetch, I use AbortController and abort the request in the cleanup function. If cancellation is not possible, I keep an isActive flag or request id and ignore stale responses. This prevents state updates on unmounted components, avoids stale UI, and reduces unnecessary work.
```
