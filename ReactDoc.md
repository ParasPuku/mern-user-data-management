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

### 4. Difference between React 18 and React 19 with features?

React 18 and React 19 are both modern React versions, but their focus is different.

Interview answer:

```text
React 18 mainly introduced the concurrent rendering foundation, automatic batching, transitions, and better server-side rendering support.

React 19 builds on top of React 18 and adds more developer-friendly features like Actions, form-related hooks, the use API, ref as a normal prop, better hydration errors, document metadata support, and better support for async resources.
```

#### React 18 main features

React 18 focused on performance and rendering improvements.

Important features:

- concurrent rendering foundation
- automatic batching
- transitions using `startTransition` and `useTransition`
- new root API using `createRoot`
- improved Suspense support
- streaming server-side rendering
- `useId`
- `useSyncExternalStore`
- `useInsertionEffect`

Example: automatic batching

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Paras');

  function handleClick() {
    setCount((prev) => prev + 1);
    setName('React 18');

    // React 18 batches these updates into one render.
  }

  return <button onClick={handleClick}>{count} - {name}</button>;
}
```

Before React 18, batching was mostly limited to React event handlers. In React 18, updates inside promises, timeouts, native events, and other async operations are also batched.

#### React 19 main features

React 19 focuses more on async workflows, forms, server integration, and developer experience.

Important features:

- Actions for async form/state updates
- `useActionState`
- `useFormStatus`
- `useOptimistic`
- `use` API for reading promises and context
- `ref` can be passed as a normal prop
- better hydration error messages
- `<Context>` can be used directly as a provider
- cleanup functions for refs
- document metadata support
- stylesheet and async script handling
- resource preloading APIs
- stable React Server Components related APIs for frameworks

Example: React 19 Action style

```tsx
function UpdateName() {
  const [name, setName] = useState('');

  async function submitAction(formData: FormData) {
    const newName = formData.get('name') as string;

    await updateUserName(newName);
    setName(newName);
  }

  return (
    <form action={submitAction}>
      <input name="name" />
      <button type="submit">Update</button>
      <p>{name}</p>
    </form>
  );
}
```

#### React 18 vs React 19 comparison

| Topic | React 18 | React 19 |
|---|---|---|
| Main focus | Rendering performance and concurrency foundation | Async workflows, forms, server integration, and DX |
| Batching | Automatic batching added | Continues automatic batching |
| Concurrent features | Introduced concurrent rendering foundation | Builds on the same foundation |
| Forms | Mostly handled manually with state and submit handlers | Actions, `useActionState`, `useFormStatus`, `useOptimistic` |
| Async data | Usually handled with `useEffect`, libraries, or framework loaders | Adds `use` API for promise/context reading in supported cases |
| Refs | `forwardRef` commonly used to pass refs | Ref can be passed as a prop |
| Hydration errors | Less detailed mismatch messages | Better hydration error diagnostics |
| Metadata | Usually managed by framework or libraries | Built-in support for document metadata |
| Server rendering | Streaming SSR improvements | Better Server Components and async resource support |

#### Simple interview explanation

```text
React 18 made React's rendering engine more powerful with concurrent rendering, automatic batching, transitions, and streaming SSR.

React 19 improves the developer experience on top of that by making async actions, forms, refs, hydration errors, metadata, and server-related workflows easier.
```

#### Which version features affect daily React development?

Most commonly used React 18 features:

- automatic batching
- `useTransition`
- `useId`
- `createRoot`

Most commonly used React 19 features:

- Actions
- `useActionState`
- `useFormStatus`
- `useOptimistic`
- `ref` as a prop
- better hydration error messages

Important note:

```text
React 19 does not replace React 18 concepts. It builds on React 18. So understanding rendering, batching, transitions, Suspense, and hooks is still important.
```

### 5. What is JSX?

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

### 6. Why do we use React?

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

### 7. What is declarative UI?

Declarative UI means describing what the UI should look like, not manually telling the browser every DOM operation.

Example:

```tsx
return isLoggedIn ? <Dashboard /> : <SignIn />;
```

React decides how to update the DOM.

### 8. What is imperative UI?

Imperative UI means manually controlling each step.

Example:

```js
const div = document.createElement('div');
div.textContent = 'Hello';
document.body.appendChild(div);
```

React is declarative.

## Props and State

### 9. What are props?

Props are inputs passed from parent component to child component.

Example:

```tsx
const UserCard = ({ name }: { name: string }) => {
  return <p>{name}</p>;
};

<UserCard name="Paras" />;
```

Props are read-only.

### 10. What is state?

State is data managed inside a component.

When state changes, React re-renders the component.

Example:

```tsx
const Counter = () => {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

### 11. Difference between props and state?

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

### 12. Can props be modified?

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

### 13. What happens when state changes?

When state changes:

1. React schedules a re-render.
2. Component function runs again.
3. React compares old and new UI.
4. React updates only changed DOM parts.

## Rendering

### 14. What is rendering in React?

Rendering means React calls the component function to calculate UI.

Rendering does not always mean DOM changed.

Example:

```tsx
const App = () => {
  return <h1>Hello</h1>;
};
```

React runs `App()` to know what UI should be.

### 15. What causes a re-render?

Common causes:

- state update
- props change
- parent re-render
- context value change
- Redux selector result change

Note - Yes, by default in React, if a parent component re-renders, the child component will also re-render.

### 16. What is conditional rendering?

Conditional rendering means showing UI based on condition.

Example:

```tsx
return isAuthenticated ? <Dashboard /> : <SignIn />;
```

Another example:

```tsx
{error ? <p>{error}</p> : null}
```

### 17. What is list rendering?

Rendering array items using `map`.

Example:

```tsx
users.map((user) => <UserRow key={user.id} user={user} />);
```

### 18. Why is key important in list rendering?

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

### 19. What is Virtual DOM?

Virtual DOM is a lightweight, and in-memory representation of the real DOM.

When state changes:

1. React creates new virtual DOM.
2. React compares it with previous virtual DOM.
3. React updates only necessary real DOM parts.

### 20. What is reconciliation?

Reconciliation is React's process of comparing old and new element trees to decide what needs to update.

Interview answer:

```text
Reconciliation is the process where React compares previous and next UI trees and efficiently updates the real DOM.
```

### 21. Does React always update the real DOM on render?

No.

React may re-render components but only update the real DOM if output changes.

## Hooks

### 22. What are hooks?

Hooks are functions that let functional components use React features like state, effects, refs, and context.

Common hooks:

- `useState`
- `useEffect`
- `useLayoutEffect`
- `useMemo`
- `useCallback`
- `useTransition`
- `useDeferredValue`
- `useRef`
- `useContext`
- `useReducer`

### 23. Rules of hooks?

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

### 24. What is useState?

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

### 25. Why state updates are asynchronous?

React batches state updates for performance.

State updates in frameworks like React aren't asynchronous in the traditional sense; rather, they are queued and batched. Instead of re-rendering the component for every single setState call, React waits until the current execution block finishes, groups multiple updates together, and processes them in a single render pass.

Example:

```tsx
setCount(count + 1);
console.log(count); // old value
```

The state variable updates on next render.

### 26. What is batching?

Batching means React groups multiple state updates into one render.

Example:

```tsx
setName('Paras');
setRole('Admin');
```

React can render once instead of twice.

### 27. What is useEffect?

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

### 28. useEffect dependency array?

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

### 29. What is cleanup in useEffect?

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

### 30. What is useLayoutEffect?

`useLayoutEffect` is a React hook that runs after React updates the DOM but before the browser paints the screen.

It is similar to `useEffect`, but timing is different.

Interview answer:

```text
useLayoutEffect runs synchronously after DOM changes and before the browser paints. It is useful when we need to read layout from the DOM or make visual changes before the user sees the screen.
```

Simple difference:

```text
useEffect       -> runs after browser paint
useLayoutEffect -> runs before browser paint
```

#### How it differs from useEffect

| Point | useEffect | useLayoutEffect |
|---|---|---|
| Timing | Runs after the browser paints the UI | Runs after DOM update but before browser paint |
| Blocking | Does not block painting | Blocks painting until it finishes |
| Best for | API calls, subscriptions, timers, logging | DOM measurement and layout correction |
| User experience | User may briefly see initial layout before effect runs | User sees corrected layout immediately |
| Performance | Better default choice for most side effects | Can hurt performance if overused |

Execution order:

```text
React render
DOM update
useLayoutEffect runs
Browser paints
useEffect runs
```

Interview answer:

```text
The main difference is timing. useEffect runs after the browser has painted, so it is good for normal side effects like API calls. useLayoutEffect runs before the browser paints, so it is useful when we need to measure or change layout before the user sees it.
```

Example:

```tsx
import { useLayoutEffect, useRef, useState } from 'react';

function BoxHeight() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (boxRef.current) {
      const boxHeight = boxRef.current.getBoundingClientRect().height;
      setHeight(boxHeight);
    }
  }, []);

  return (
    <>
      <div ref={boxRef}>Hello React</div>
      <p>Height: {height}px</p>
    </>
  );
}
```

Why use `useLayoutEffect` here?

```text
We need to measure the DOM size before the browser paints the final UI.
This helps avoid flickering layout changes.
```

Common use cases:

- measuring DOM size
- reading element position
- synchronously adjusting scroll position
- positioning tooltip/popover before it appears
- preventing visual flicker

#### When to use useLayoutEffect

Use `useLayoutEffect` when the effect directly affects layout or visual position.

Good examples:

- measuring an element using `getBoundingClientRect`
- positioning a tooltip based on button position
- scrolling to a specific element before the user sees the screen
- calculating modal/popover placement
- fixing layout flicker before paint

Tooltip example:

```tsx
useLayoutEffect(() => {
  const buttonRect = buttonRef.current?.getBoundingClientRect();

  if (buttonRect) {
    setTooltipPosition({
      top: buttonRect.bottom + 8,
      left: buttonRect.left
    });
  }
}, []);
```

Use `useEffect` for normal side effects:

- API calls
- analytics events
- updating document title
- subscriptions
- timers
- logging

Cleanup works the same as `useEffect`:

```tsx
useLayoutEffect(() => {
  function handleResize() {
    console.log(window.innerWidth);
  }

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

When not to use:

- API calls
- normal data fetching
- logging
- simple subscriptions that do not affect layout
- heavy calculations

#### Important considerations

```text
useLayoutEffect blocks browser painting until it finishes. So use it only when layout measurement or pre-paint DOM updates are required. For most side effects, useEffect is better.
```

Important points:

- Prefer `useEffect` by default.
- Use `useLayoutEffect` only when the UI would flicker or show wrong layout without it.
- Keep the logic inside `useLayoutEffect` small and fast.
- Avoid API calls inside `useLayoutEffect`.
- State updates inside `useLayoutEffect` run before paint, so they can delay what the user sees.
- In StrictMode during development, React may run setup and cleanup one extra time to catch effect bugs.
- In server-side rendering, layout information is not available on the server, so avoid `useLayoutEffect` in server-rendered components unless the component is client-only.

Final interview shortcut:

```text
Use useEffect for side effects after paint.
Use useLayoutEffect only when you must read or change layout before paint.
```

### 31. Difference between Webpack and Babel?

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

### 32. What is React Fiber?

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

### 33. What is hydration in React, and what role does hydration play in server-side rendering?

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

### 34. Difference between Server-Side Rendering and Client-Side Rendering?

This is mainly a React/frontend architecture question, not a core JavaScript question.

Server-Side Rendering is also called SSR.

Client-Side Rendering is also called CSR.

Interview answer:

```text
Server-Side Rendering means the HTML is generated on the server and sent to the browser. The user can see meaningful content quickly, and React later hydrates that HTML to make it interactive.

Client-Side Rendering means the browser receives a basic HTML file and JavaScript bundle. Then JavaScript runs in the browser, renders React components, and builds the UI on the client side.
```

#### Server-Side Rendering

In SSR, the server prepares the HTML first.

Flow:

```text
Request page
  -> Server renders React component to HTML
  -> Browser receives HTML
  -> User sees content
  -> React JavaScript loads
  -> Hydration makes the page interactive
```

Good for:

- SEO
- faster first content display
- public pages
- blogs
- product pages
- landing pages
- pages shared on social media

Example:

```text
Product title, price, description, and reviews can be server-rendered.
```

#### Client-Side Rendering

In CSR, the browser renders the UI using JavaScript.

Flow:

```text
Request page
  -> Server sends basic HTML and JS bundle
  -> Browser downloads JavaScript
  -> React runs in browser
  -> UI is created on client side
```

Good for:

- dashboards
- admin panels
- authenticated pages
- highly interactive UI
- modals, dropdowns, tabs
- browser-only features like `localStorage`, `window`, and `document`

Example:

```text
Dashboard filters, charts, modals, and user-specific widgets are commonly client-rendered.
```

#### SSR vs CSR comparison

| Point | SSR | CSR |
|---|---|---|
| Where HTML is created | Server | Browser |
| Initial content | Visible faster | Visible after JavaScript loads |
| SEO | Better | Weaker unless handled separately |
| Interactivity | Needs hydration | Interactive after React renders |
| Server load | Higher | Lower |
| Browser work | Less initial rendering work | More initial rendering work |
| Best for | Public, SEO, content-heavy pages | App-like, private, interactive pages |

Simple rule:

```text
Use SSR when content should be visible fast and searchable.
Use CSR when the UI is private, interactive, or depends heavily on browser-side state.
```

Important interview point:

```text
SSR does not mean no JavaScript. If the page is interactive, React still needs JavaScript for hydration. CSR means JavaScript creates the UI in the browser from the beginning.
```

### 35. How do you decide whether a component should be server-rendered or client-rendered?

This is a valid and important interview question, especially for Next.js, SSR, and React Server Components.

Interview answer:

```text
I choose server rendering when the content should be visible quickly, SEO-friendly, shareable, or can be prepared on the server.

I choose client rendering when the component depends on browser APIs, user interaction, local state, real-time behavior, or data that should only be loaded after the page opens.
```

Use server rendering for:

- SEO-important pages
- blog pages
- product pages
- landing pages
- public profile pages
- static or mostly-read-only content
- content that should be visible before JavaScript loads
- data that can be safely fetched on the server

Use client rendering for:

- modals
- dropdowns
- tabs
- forms with heavy user interaction
- charts that depend on browser size
- components using `window`, `document`, or `localStorage`
- authenticated user-only widgets
- real-time notifications
- components with frequent client-side state changes

Simple rule:

```text
If the content must be fast, searchable, and available in initial HTML, prefer SSR.
If the component needs browser-only APIs or heavy interactivity, prefer client-side rendering.
```

Example:

```text
Product title, description, price -> server-rendered
Add to cart button, quantity selector, wishlist toggle -> client-rendered
```

Important interview point:

```text
SSR improves the initial HTML and SEO, but the component still needs hydration if it is interactive. Client rendering is better for browser-only and interaction-heavy UI.
```

### 36. What is infinite render loop?

An infinite render loop happens when state updates repeatedly during render or effect.

Bad:

```tsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

This changes `count`, effect runs again, and loop continues.

### 37. What is useRef?

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

### 38. useRef vs useState?

`useState`:

- causes re-render when updated
- used for UI data

`useRef`:

- does not cause re-render
- used for mutable values/DOM refs

### 39. What is useMemo?

`useMemo` memoizes a calculated value.

Example:

```tsx
const filteredUsers = useMemo(
  () => users.filter((user) => user.status === 'active'),
  [users]
);
```

Use it when calculation is expensive or reference stability matters.

### 40. What is useCallback?

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

### 41. What is useTransition?

`useTransition` is a React hook used to mark some state updates as non-urgent.

It helps keep the UI responsive when an update may cause expensive rendering.

Interview answer:

```text
useTransition lets React separate urgent updates from non-urgent updates. Urgent updates like typing should update immediately. Non-urgent updates like filtering a large list can be wrapped in startTransition so React can keep the UI responsive.
```

Syntax:

```tsx
const [isPending, startTransition] = useTransition();
```

Example:

```tsx
import { useState, useTransition } from 'react';

function SearchUsers({ users }) {
  const [inputValue, setInputValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleChange(event) {
    const value = event.target.value;

    setInputValue(value); // urgent update

    startTransition(() => {
      setSearchText(value); // non-urgent update
    });
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <input value={inputValue} onChange={handleChange} />
      {isPending ? <p>Updating list...</p> : null}

      {filteredUsers.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}
```

What happens here:

```text
Typing in the input is urgent, so it updates immediately.
Filtering the list is non-urgent, so React can delay it slightly if the UI is busy.
```

Use `useTransition` when:

- updating a large list
- switching heavy tabs
- rendering expensive UI after input
- route/page-like UI changes are slower
- you want the current UI to stay responsive while next UI is prepared

Important considerations:

- `useTransition` does not make slow code faster.
- It helps React prioritize urgent UI updates first.
- It is useful when rendering is expensive, not for every state update.
- It is not a replacement for debouncing API calls.
- `isPending` can be used to show lightweight pending UI.

Final interview shortcut:

```text
useTransition is used when a state update is expensive and can be treated as low priority.
```

### 42. What is useDeferredValue?

`useDeferredValue` is a React hook that lets you defer updating a value until the browser has time to handle less urgent rendering.

Interview answer:

```text
useDeferredValue keeps the previous value visible while React prepares the updated value in the background. It is useful when a fast-changing value causes expensive rendering, such as typing into a search box that filters a large list.
```

Syntax:

```tsx
const deferredValue = useDeferredValue(value);
```

Example:

```tsx
import { useDeferredValue, useMemo, useState } from 'react';

function SearchUsers({ users }) {
  const [searchText, setSearchText] = useState('');
  const deferredSearchText = useDeferredValue(searchText);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(deferredSearchText.toLowerCase())
    );
  }, [users, deferredSearchText]);

  return (
    <>
      <input
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      {searchText !== deferredSearchText ? <p>Updating results...</p> : null}

      {filteredUsers.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}
```

What happens here:

```text
searchText updates immediately as the user types.
deferredSearchText may lag behind slightly.
The expensive filtered list uses deferredSearchText, so typing stays responsive.
```

Use `useDeferredValue` when:

- a value changes quickly
- rendering based on that value is expensive
- you want to keep showing the old UI while the new UI is prepared
- the value comes from props or a parent component
- you cannot easily wrap the original state update with `startTransition`

#### useTransition vs useDeferredValue

| Point | useTransition | useDeferredValue |
|---|---|---|
| What it does | Marks a state update as non-urgent | Defers a value |
| You control | The state update | The value after it changes |
| Main API | `startTransition(() => setState())` | `useDeferredValue(value)` |
| Best when | You own the state setter | Value comes from props or existing state |
| Pending UI | Gives `isPending` | Compare original value with deferred value |

Example memory trick:

```text
useTransition -> defer the update
useDeferredValue -> defer the value
```

#### useDeferredValue vs debounce

```text
Debounce waits for a fixed time before running logic.
useDeferredValue does not wait for a fixed time. It lets React schedule lower-priority rendering when the browser has time.
```

Use debounce for:

- delaying API calls
- search requests
- autosave requests

Use `useDeferredValue` for:

- delaying expensive rendering
- filtering a big list in UI
- keeping typing smooth

Important considerations:

- It does not reduce the number of state updates.
- It helps make rendering feel smoother.
- It should be used for UI rendering performance, not API rate limiting.
- It works best with memoized expensive children or calculations.

Final interview shortcut:

```text
useDeferredValue is useful when a fast-changing value causes expensive rendering and we want React to show the previous UI until the new UI is ready.
```

### 43. useMemo vs useCallback?

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

### 44. How useMemo and useCallback works behind the scene?
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

### 45. What is useContext?

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

### 46. What is useReducer?

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

### 47. What is a custom hook?

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

### 48. Controlled vs uncontrolled components?
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

### 49. Which is better: controlled or uncontrolled?

Controlled is better when:

- validation is needed
- value controls UI
- submit button depends on fields
- instant feedback is needed

Uncontrolled is useful when:

- simple forms
- file inputs
- integration with non-React libraries

### 50. How to handle form validation?

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

### 51. How parent passes data to child?

Using props.

```tsx
<UserCard user={user} />
```

### 52. How child sends data to parent?

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

### 53. What is prop drilling?

Prop drilling means passing props through many levels just to reach a deeply nested component.

Solutions:

- Context
- Redux/Zustand
- component composition
- custom hooks

### 54. What is lifting state up?

Moving shared state to the nearest common parent.

Example:

```text
Sibling A needs selected user
Sibling B needs selected user
Move selectedUserId to parent
Pass value/callback to both
```

## Routing

### 55. What is React Router?

React Router is a routing library for React apps.

It maps URL paths to components.

Example:

```tsx
<Routes>
  <Route path="/signin" element={<SignInPage />} />
  <Route path="/" element={<Dashboard />} />
</Routes>
```

### 56. What is protected route?

Protected route allows access only when user is authenticated.

Concept:

```tsx
return isAuthenticated ? children : <Navigate to="/signin" />;
```

In this app:

```text
frontend/src/components/ProtectedRoute.tsx
```

### 57. What is public route?

Public route is accessible without login.

But if user is already authenticated, signin/signup pages may redirect to dashboard.

In this app:

```text
frontend/src/components/PublicRoute.tsx
```

### 58. What is Navigate?

`Navigate` redirects user to another route.

Example:

```tsx
<Navigate replace to="/signin" />
```

## State Management

### 59. When to use local state?

Use local state when data belongs to one component.

Examples:

- form input
- modal open/close
- selected tab
- local loading state

### 60. When to use global state?

Use global state when many parts of app need same data.

Examples:

- authenticated account
- user list
- teams
- skills
- notifications/toasts

### 61. What is Redux?

Redux is a predictable state management library.

It stores app state in a central store.

Core ideas:

- store
- actions
- reducers
- dispatch
- selectors

### 62. What is Redux Toolkit?

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

### 63. What is Thunk in Redux?
In Redux Toolkit (RTK), a thunk is a function that contains delayed, asynchronous logic. Because a standard Redux store can only handle synchronous data flow, Redux Toolkit automatically includes the Redux Thunk middleware by default to let you perform side effects like fetching API data.

- How createAsyncThunk Works
When you create an async thunk, you provide an action type prefix and a payload creator function that returns a Promise. The thunk then automatically generates and dispatches three separate lifecycle actions:

- pending: Dispatched immediately when the thunk starts running.

- fulfilled: Dispatched if the Promise resolves successfully with data.

- rejected: Dispatched if the Promise fails or rejects.

### 64. Difference between Thunk and Saga in Redux?

Thunk and Saga are both Redux middleware used to handle side effects like API calls, async flows, and delayed actions.

Interview answer:

```text
Redux Thunk is simpler and lets us write async logic inside functions that can dispatch actions.

Redux Saga is more powerful and uses generator functions to manage complex async flows like cancellation, retries, debouncing, background polling, and race conditions.
```

#### Redux Thunk

Thunk is a function that returns another function.

It receives:

- `dispatch`
- `getState`

Basic thunk example:

```ts
const fetchUsers = () => async (dispatch, getState) => {
  dispatch({ type: 'users/loading' });

  try {
    const response = await fetch('/api/users');
    const data = await response.json();

    dispatch({ type: 'users/success', payload: data });
  } catch (error) {
    dispatch({ type: 'users/error', payload: error.message });
  }
};
```

Redux Toolkit style:

```ts
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/api/users');
  return response.json();
});
```

Use Thunk when:

- async logic is simple
- you mostly call APIs and store response
- you use Redux Toolkit
- you want less boilerplate
- the team wants easier learning and maintenance

#### Redux Saga

Saga uses generator functions to handle side effects separately from components and reducers.

Saga example:

```ts
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchUsersSaga() {
  try {
    const response = yield call(fetch, '/api/users');
    const data = yield call([response, 'json']);

    yield put({ type: 'users/success', payload: data });
  } catch (error) {
    yield put({ type: 'users/error', payload: error.message });
  }
}

function* watchFetchUsers() {
  yield takeLatest('users/fetchUsers', fetchUsersSaga);
}
```

Use Saga when:

- async flow is complex
- you need cancellation
- you need retry logic
- you need debouncing/throttling
- you need background polling
- you need race handling
- many async actions depend on each other

#### Thunk vs Saga comparison

| Point | Thunk | Saga |
|---|---|---|
| Style | Normal functions | Generator functions |
| Complexity | Simple | More advanced |
| Learning curve | Easy | Higher |
| Best for | Simple API calls | Complex async workflows |
| Boilerplate | Less | More |
| Cancellation | Manual | Built-in patterns like `takeLatest` |
| Testing | Simple but mixed with async code | Easier to test step-by-step |
| Redux Toolkit support | Built-in by default | Needs extra setup |

#### When should we choose Thunk?

Choose Thunk for most normal React apps.

Example:

```text
Login API
Fetch users
Create user
Update profile
Load dashboard data
```

Strong interview line:

```text
If my async logic is mostly request -> success/failure -> update store, I prefer Redux Thunk or createAsyncThunk.
```

#### When should we choose Saga?

Choose Saga when async logic becomes orchestration-heavy.

Example:

```text
Search with debounce
Cancel previous request
Retry failed API
Background sync
Payment flow with multiple dependent steps
WebSocket/event-based flows
```

Strong interview line:

```text
If my app has complex async workflows like cancellation, race conditions, retries, or background tasks, Redux Saga can be a better choice.
```

Final answer:

```text
For most Redux Toolkit applications, I choose Thunk because it is simple and built in. I choose Saga only when the async flow becomes complex enough that Saga's generator-based control flow provides real value.
```

### 65. What is reducer?

Reducer is a pure function that calculates next state from current state and action.

Concept:

```ts
nextState = reducer(currentState, action);
```

### 66. What is action?

An action is an object describing what happened.

Example:

```ts
{
  type: 'users/createUser',
  payload: user
}
```

### 67. What is dispatch?

Dispatch sends an action to Redux store.

Example:

```tsx
dispatch(fetchUsers());
```

### 68. What is selector?

Selector reads data from Redux state.

Example:

```ts
const selectUsers = (state: RootState) => state.users.items;
```

Usage:

```tsx
const users = useAppSelector(selectUsers);
```

### 69. What is createAsyncThunk?

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

### 70. What is Redux middleware?

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

### 71. What is Immer?

Immer lets us write mutable-looking reducer code while keeping state immutable internally.

Example:

```ts
state.items.push(user);
```

Redux Toolkit uses Immer behind the scenes.

### 72. What is selector stability warning?

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

### 73. How to secure the React APP?
Securing a React app requires layers of protection at both the client level and the server level. The most critical step is preventing Cross-Site Scripting (XSS) by allowing React to auto-escape data, avoiding dangerouslySetInnerHTML, and sanitizing user inputs. Always treat the frontend as untrusted.

- Prevent Cross-Site Scripting (XSS)
- Protect Environment Variables & Secrets
- Implement Robust Authentication[JWT]
- Rely on the Backend for Security
- Keep Dependencies Updated [Vulnerability]

### 74. How to optimize React performance?

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

### 75. What is React.memo?

`React.memo` prevents re-render if props did not change.

Example:

```tsx
const UserRow = React.memo(({ user }: { user: User }) => {
  return <tr>{user.name}</tr>;
});
```

Useful for expensive child components.

### 76. React.memo vs useMemo?

`React.memo` memoizes a component render based on props.

`useMemo` memoizes a calculated value inside a component.

### 77. What causes unnecessary re-render?

Common causes:

- parent re-render
- new object/array/function references
- global state changes
- context value changes
- selector returning new array/object every time
- unstable keys

### 78. Difference between `npm create vite@latest my-react-app -- --template react` and `npx create-react-app my-react-app`?

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

### 79. What happens behind the scenes when we create a React project using Vite or Create React App?

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

### 80. How to avoid new object prop each render?

Bad:

```tsx
<Table filters={{ status: 'active' }} />
```

Good:

```tsx
const filters = useMemo(() => ({ status: 'active' }), []);

<Table filters={filters} />;
```

### 81. What is lazy loading in React?

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

### 82. What is code splitting?

Code splitting breaks app bundle into smaller chunks.

Benefits:

- faster initial load
- load feature code only when needed

### 83. What is list virtualization?

Virtualization renders only visible rows in a large list.

Useful for:

- thousands of rows
- large tables
- chat messages

Libraries:

- `react-window`
- `react-virtualized`

## API Calls

### 84. Where should API calls be made?

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

### 85. How to fetch data in useEffect?

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

### 86. Why avoid directly making useEffect callback async?

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

### 87. How to handle loading and error state?

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

### 88. How to cancel API request?

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

### 89. How does React know user is logged in?

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

### 90. Can React read HTTP-only cookie?

No.

HTTP-only cookie cannot be read using JavaScript.

Frontend checks auth by calling backend session API.

Example:

```text
GET /api/auth/session
```

### 91. Why use credentials: include?

In fetch:

```ts
credentials: 'include'
```

This tells browser to include cookies in API requests.

In this app:

```text
frontend/src/services/http.ts
```

### 92. How protected route works in this app?

Concept:

```tsx
if (authStatus !== 'authenticated') {
  return <Navigate to="/signin" />;
}

return children;
```

The route guard uses Redux auth state.

### 93. How role-based UI works?

Example:

```tsx
account?.role === 'admin' ? <AdminSettingsPage /> : <Navigate to="/" />
```

Important:

Frontend role checks improve UX but are not security by themselves.

Backend must also enforce authorization.

## TypeScript With React

### 94. Why use TypeScript with React?

Benefits:

- catches mistakes early
- typed props
- typed API responses
- better autocomplete
- safer refactoring

### 95. How to type component props?

```tsx
type UserCardProps = {
  name: string;
  email: string;
};

const UserCard = ({ name, email }: UserCardProps) => {
  return <p>{name} - {email}</p>;
};
```

### 96. How to type useState?

```tsx
const [user, setUser] = useState<User | null>(null);
```

For inferred values:

```tsx
const [count, setCount] = useState(0);
```

### 97. How to type event handlers?

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

### 98. How to type useRef?

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

Use:

```tsx
inputRef.current?.focus();
```

## React Patterns

### 99. What is composition?

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

### 100. Controlled modal pattern?

Parent controls open/close state.

```tsx
const [isOpen, setIsOpen] = useState(false);

{isOpen ? <Modal onClose={() => setIsOpen(false)} /> : null}
```

### 101. Container vs presentational components?

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

### 102. What is children prop?

`children` lets component render nested content.

Example:

```tsx
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};
```

## Error Handling

### 103. What is Error Boundary?

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

### 104. How to handle API errors?

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

### 105. What is StrictMode?

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

### 106. Why does useEffect run twice in development?

Because React StrictMode intentionally mounts/unmounts/remounts components in development to detect unsafe effects.

Production does not behave the same way.

### 107. Why not update state directly?

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

### 108. Why state should be immutable?

Immutability helps React detect changes and makes updates predictable.

### 109. Why component names should start with capital letter?

React treats lowercase tags as HTML elements.

Good:

```tsx
<UserCard />
```

Bad:

```tsx
<userCard />
```

### 110. Why hooks cannot be conditional?

React relies on hook call order.

If hooks are conditional, order can change between renders and React cannot match hook state correctly.

### 111. What is stale closure?

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

### 112. Why use functional state update?

Use when new state depends on previous state.

```tsx
setCount((current) => current + 1);
```

This avoids stale state issues.

### 113. Why not use array index as key?

Index key can break UI when list order changes.

Problems:

- wrong item state
- incorrect animations
- inefficient updates

Use stable ID instead.

### 114. What is client-side rendering?

Client-side rendering means browser receives minimal HTML and JavaScript builds the UI in the browser.

Vite React apps are usually client-side rendered.

## Testing

### 115. What should we test in React?

Test user behavior, not implementation details.

Examples:

- form validation
- button click
- API success/error state
- route protection
- role-based UI

### 116. What is React Testing Library?

React Testing Library helps test components from user perspective.

Example:

```tsx
expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
```

## React App Architecture

### 117. How is this app structured?

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

### 118. What is feature-based folder structure?

Feature-based structure groups code by business feature instead of file type.

Example:

```text
features/users/UserManagementPage.tsx
features/users/usersSlice.ts
features/users/usersApi.ts
features/users/types.ts
```

This is better for medium/large apps.

### 119. What is reusable component?

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

### 120. How does auth bootstrap work in this app?

On app load:

```tsx
if (authStatus === 'idle') {
  dispatch(bootstrapAuth());
}
```

Frontend calls backend session API.

If cookie is valid, user becomes authenticated.

If not, user is unauthenticated.

### 121. How does session refresh work in this app?

The app listens to user activity and periodically verifies/refreshes session.

Concept:

```text
User active -> refresh session
No activity -> verify session without extending it
```

### 122. How does role-based UI work in this app?

Admin route is visible only when:

```tsx
account?.role === 'admin'
```

But backend also enforces authorization.

Important interview answer:

```text
Frontend role checks are for UX. Backend authorization is the real security.
```

### 123. How are API calls centralized?

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

### 124. How are toasts handled?

This app uses Redux listener middleware.

When async actions succeed/fail, middleware dispatches toast notifications.

This keeps toast logic centralized instead of duplicating it in every component.

## Most Important Short Answers

### 125. React in one line

```text
React is a JavaScript library for building reusable, state-driven UI components.
```

### 126. Component in one line

```text
A component is a reusable function/class that returns UI.
```

### 127. Props in one line

```text
Props are read-only inputs passed from parent to child.
```

### 128. State in one line

```text
State is component-managed data that triggers re-render when changed.
```

### 129. useEffect in one line

```text
useEffect runs side effects after render and can clean them up.
```

### 130. useLayoutEffect in one line

```text
useLayoutEffect runs after DOM updates but before browser paint, mainly for layout measurement or pre-paint visual fixes.
```

### 131. useTransition in one line

```text
useTransition marks expensive state updates as non-urgent so urgent UI like typing can stay responsive.
```

### 132. useDeferredValue in one line

```text
useDeferredValue defers a fast-changing value so expensive rendering can update later without blocking urgent UI.
```

### 133. Virtual DOM in one line

```text
Virtual DOM is a lightweight representation of UI used to calculate efficient real DOM updates.
```

### 134. Redux in one line

```text
Redux is a centralized state management library where state changes through actions and reducers.
```

### 135. React Router in one line

```text
React Router maps URL paths to React components.
```

### 136. Controlled component in one line

```text
A controlled component is a form element whose value is controlled by React state.
```

### 137. Custom hook in one line

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
- `useLayoutEffect`
- `useRef`
- `useMemo`
- `useCallback`
- `useTransition`
- `useDeferredValue`
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

Using an array index as a key in React is considered an anti-pattern for dynamic lists because it identifies the position of the item rather than the item itself. When the array changes (items are added, removed, or sorted), the indexes change, which breaks React's reconciliation algorithm.

The Root Cause: React's Reconciliation
React uses the key prop to determine which elements in a list have changed, been added, or been removed.
- If you use a stable identifier (like a database ID), the key moves with the item.
- If you use the index, the key stays anchored to the position.

Example Scenario:
- You render a list of 3 items: [Apples (Index 0), Bananas (Index 1), Oranges (Index 2)].
- You check a checkbox inside the Bananas component (Index 1).
- You delete Apples from the top of the array.
- The array is now [Bananas (now Index 0), Oranges (now Index 1)].

The Bug: Because the checkbox state was tied to Index 1, React assumes the new item at Index 1 (Oranges) should be checked. Bananas will suddenly lose its checked state.

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

## Low Priority SSR and Hydration Questions

These questions are more common in Next.js, SSR, and React Server Components interviews. They are useful after you understand normal React rendering, hydration, and client-side rendering.

### 21. What is hydration mismatch?

Hydration mismatch happens when the HTML generated on the server is different from what React renders on the client during hydration.

Interview answer:

```text
Hydration mismatch means the server-rendered HTML and the client-rendered React output are not the same. React expects both to match during hydration. If they do not match, React may warn, patch the DOM, or re-render parts of the UI.
```

Example:

```tsx
function CurrentTime() {
  return <p>{new Date().toLocaleTimeString()}</p>;
}
```

Why this can mismatch:

```text
The server renders one time value.
The browser renders another time value.
Both HTML outputs are different.
```

Common causes:

- using `Date.now()` during render
- using `Math.random()` during render
- reading `window`, `document`, or `localStorage` during render
- rendering different UI on server and client
- different API data on server and client
- user-specific content rendered before client auth state is ready

Fix:

```tsx
function CurrentTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <p>{time}</p>;
}
```

Important point:

```text
If a value can be different between server and browser, avoid rendering it directly during SSR. Render it after mount using useEffect or make the component client-only.
```

### 22. Why can window, document, or localStorage cause issues in SSR?

`window`, `document`, and `localStorage` exist only in the browser.

They do not exist on the server.

Bad:

```tsx
function ThemeLabel() {
  const theme = localStorage.getItem('theme');

  return <p>{theme}</p>;
}
```

Problem:

```text
During SSR, this code runs on the server.
The server does not have localStorage.
So the app can crash with "localStorage is not defined".
```

Correct approach:

```tsx
function ThemeLabel() {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  return <p>{theme}</p>;
}
```

Why this works:

```text
useEffect runs only in the browser after the component mounts.
So browser-only APIs are accessed safely.
```

Other safe checks:

```tsx
if (typeof window !== 'undefined') {
  console.log(window.innerWidth);
}
```

Interview answer:

```text
Browser APIs like window, document, and localStorage are not available during server rendering. I avoid using them during render. If I need them, I access them inside useEffect or guard them with typeof window !== 'undefined'.
```

### 23. What is the difference between Server Component and Client Component?

Server Components render on the server.

Client Components render and run in the browser.

This is mostly asked in Next.js App Router interviews.

#### Server Component

A Server Component is rendered on the server and its result is sent to the client.

Good for:

- fetching data on the server
- reading from database
- reading server-only environment variables
- rendering static or content-heavy UI
- reducing client JavaScript bundle size

Server Component example:

```tsx
async function ProductsPage() {
  const products = await getProductsFromDatabase();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

Server Components cannot use:

- `useState`
- `useEffect`
- browser APIs
- event handlers like `onClick`

#### Client Component

A Client Component runs in the browser and can use React hooks and browser APIs.

In Next.js, it is marked with:

```tsx
'use client';
```

Client Component example:

```tsx
'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

Use Client Components for:

- buttons with `onClick`
- forms with local state
- modals
- dropdowns
- tabs
- browser APIs
- animations
- interactive widgets

Simple difference:

| Point | Server Component | Client Component |
|---|---|---|
| Runs on | Server | Browser |
| Can use `useState` | No | Yes |
| Can use `useEffect` | No | Yes |
| Can access database directly | Yes | No |
| Can use `window/localStorage` | No | Yes, after mount |
| Best for | Data fetching and static UI | Interactivity and browser behavior |

Interview answer:

```text
Server Components are used for server-side data fetching and rendering UI without shipping extra JavaScript to the browser. Client Components are used when the UI needs interactivity, hooks, browser APIs, or event handlers.
```

### 24. When should we use SSR vs CSR?

Use SSR when the page should be visible quickly, SEO-friendly, and available in the initial HTML.

Use CSR when the page is mostly private, app-like, and highly interactive.

Use SSR for:

- product pages
- blog pages
- news articles
- marketing pages
- public profile pages
- pages shared on social media
- SEO-important pages

Use CSR for:

- dashboards
- admin panels
- authenticated-only pages
- chat widgets
- interactive charts
- modals, filters, tabs
- pages that depend heavily on browser state

Example:

```text
E-commerce product page:
- Product title, price, description -> SSR
- Add to cart button, wishlist toggle -> CSR/client component
```

Decision checklist:

```text
Need SEO? Use SSR.
Need fast first content? Use SSR.
Need browser APIs? Use CSR.
Need local state and interactions? Use CSR.
Need private authenticated data only after login? CSR can be simpler.
Need server-only data access? Use SSR or Server Component.
```

Final interview answer:

```text
I use SSR for public, SEO-heavy, content-first pages. I use CSR for private, interactive, browser-dependent UI. In modern React frameworks, we often combine both: render the content on the server and make interactive parts client-rendered.
```

## Additional Low Priority React Questions

These topics are useful for mid-level React interviews and real-world frontend discussions.

### 25. What is React Suspense?

React Suspense lets a component wait for something before rendering and show a fallback UI during that waiting time.

Most common uses:

- lazy loading components
- showing fallback UI while a component loads
- framework-supported data fetching
- streaming/server rendering workflows

Interview answer:

```text
React Suspense is a React feature that lets us show a fallback UI while some part of the component tree is not ready yet, such as a lazy-loaded component or async data in supported frameworks.
```

Example with lazy loading:

```tsx
import { lazy, Suspense } from 'react';

const UserReports = lazy(() => import('./UserReports'));

function Dashboard() {
  return (
    <Suspense fallback={<p>Loading reports...</p>}>
      <UserReports />
    </Suspense>
  );
}
```

What happens:

```text
React starts loading UserReports.
Until it is ready, React shows Loading reports...
When the component is loaded, React renders UserReports.
```

Important points:

- Suspense is not an error handler.
- Use Error Boundary to catch rendering/loading errors.
- Suspense fallback should be small and useful.
- Suspense is commonly used with `React.lazy`.
- Data fetching with Suspense usually depends on a framework or library setup.

When to use:

```text
Use Suspense when part of the UI can wait and you want to show a fallback while that part loads.
```

### 26. What is React Portal?

React Portal lets us render a component outside its normal parent DOM hierarchy.

It is commonly used for:

- modals
- tooltips
- dropdown menus
- popovers
- toast containers

Interview answer:

```text
React Portal allows a component to be rendered into a different DOM node while still behaving like part of the React component tree.
```

Example:

```tsx
import { createPortal } from 'react-dom';

function Modal({ children, onClose }) {
  return createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.body
  );
}
```

Why use Portal?

```text
Sometimes a modal or tooltip should visually appear above the whole app. If it stays inside a deeply nested parent, CSS overflow, z-index, or positioning can break it. Portal renders it somewhere safer, like document.body.
```

Important points:

- Portal changes DOM placement, not React ownership.
- Events still bubble through the React tree.
- Useful for escaping `overflow: hidden` and stacking context issues.
- Very useful for accessible modals and dropdowns.

When to use:

```text
Use Portal when the UI should visually escape its parent container, such as modals, tooltips, dropdowns, and toast overlays.
```

### 27. What is React Performance Profiling?

React performance profiling means measuring component render behavior to find slow renders or unnecessary re-renders.

Interview answer:

```text
React performance profiling is the process of using tools like React DevTools Profiler to identify which components render, why they render, and how long they take to render.
```

Common tools:

- React DevTools Profiler
- browser Performance tab
- console timing for small checks
- why-did-you-render library in development

What to check:

- component render time
- unnecessary re-renders
- expensive calculations
- unstable props
- large lists
- slow child components
- selectors returning new references

Common fixes:

- move state closer to where it is used
- split large components
- use stable keys
- use `React.memo` for expensive child components
- use `useMemo` for expensive calculated values
- use `useCallback` for callbacks passed to memoized children
- virtualize long lists
- avoid creating new object/array props every render

Important interview point:

```text
Do not optimize blindly. First measure the problem, then optimize the specific component or render path causing the issue.
```

Example:

```tsx
const filteredUsers = useMemo(() => {
  return users.filter((user) => user.name.includes(searchText));
}, [users, searchText]);
```

Use this only when filtering is expensive or the list is large.

Final answer:

```text
I use React DevTools Profiler to find slow or unnecessary renders. Then I optimize only the measured problem using memoization, state placement, list virtualization, or component splitting.
```

### 28. What are React Query and RTK Query?

React Query and RTK Query are libraries for managing server state.

Server state means data that comes from the backend, such as:

- users
- products
- orders
- notifications
- dashboard data

Interview answer:

```text
React Query and RTK Query help manage API data in React apps. They handle loading state, error state, caching, refetching, retries, and stale data better than manually writing every API call inside useEffect.
```

#### Why not always use useEffect for API calls?

With only `useEffect`, we manually handle:

- loading
- error
- success
- cache
- retries
- refetching
- duplicate requests
- stale data
- request cancellation

React Query or RTK Query handles much of this for us.

#### React Query

React Query is commonly used for server-state management in React apps. It is also known as TanStack Query.

Good for:

- apps not using Redux
- caching API data
- background refetching
- pagination/infinite queries
- retrying failed requests
- keeping server state separate from UI state

Example idea:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
});
```

#### RTK Query

RTK Query is part of Redux Toolkit.

Good for:

- apps already using Redux Toolkit
- centralized API definitions
- auto-generated hooks
- caching inside Redux store
- consistent Redux-based architecture

Example idea:

```tsx
const { data, isLoading, error } = useGetUsersQuery();
```

#### React Query vs RTK Query

| Point | React Query | RTK Query |
|---|---|---|
| Best fit | Apps without Redux or with lightweight state | Apps already using Redux Toolkit |
| Store dependency | Does not require Redux | Uses Redux Toolkit |
| API setup | Query functions | API slice/endpoints |
| Strength | Flexible server-state caching | Strong Redux integration |
| Generated hooks | Based on query setup | Auto-generated from endpoints |

When to choose:

```text
Choose React Query if the app does not need Redux and you mainly want powerful server-state caching.

Choose RTK Query if the app already uses Redux Toolkit and you want API logic integrated with Redux.
```

Final interview answer:

```text
For simple or medium apps, React Query is great for API caching without Redux. If the project already uses Redux Toolkit, RTK Query is often a natural choice because API calls, caching, and generated hooks fit into the Redux architecture.
```

### 29. What is Accessibility in React?

Accessibility means building UI that can be used by everyone, including users who use keyboard navigation, screen readers, or assistive technologies.

Interview answer:

```text
Accessibility in React means building components with semantic HTML, proper labels, keyboard support, focus management, readable text, and ARIA only when needed.
```

Important practices:

- use semantic HTML
- use real `button` for clickable actions
- use real `label` for form inputs
- support keyboard navigation
- manage focus in modals
- provide `alt` text for images
- keep color contrast readable
- show clear validation errors
- avoid clickable `div` when a `button` is correct
- use ARIA only when semantic HTML is not enough

Good form example:

```tsx
function EmailField() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />
    </div>
  );
}
```

Bad:

```tsx
<div onClick={handleSubmit}>Submit</div>
```

Better:

```tsx
<button type="button" onClick={handleSubmit}>
  Submit
</button>
```

Accessible modal considerations:

- focus should move into the modal when it opens
- focus should return to the trigger when it closes
- Escape key should close the modal if appropriate
- background content should not be reachable by keyboard
- modal should have a clear title

Example ARIA usage:

```tsx
<button aria-label="Close modal" onClick={onClose}>
  X
</button>
```

Important interview point:

```text
Accessibility should be built from the start. It is not only about ARIA. Most accessibility comes from correct semantic HTML, keyboard support, labels, and focus management.
```

Final answer:

```text
In React, I make components accessible by using semantic HTML, proper form labels, keyboard-friendly controls, focus management for modals, alt text for images, and ARIA only when necessary.
```
