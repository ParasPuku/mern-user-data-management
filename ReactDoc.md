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

This document intentionally keeps both:

- short interview-ready answers
- longer explanations with examples

Use the short answer for quick revision, then read the detailed explanation when the topic feels unclear.

## Revision Priority Guide

Use these priority levels while revising:

| Priority | Meaning | How to revise |
|---|---|---|
| Must Know | Very common interview topics | Revise deeply and practice explaining aloud |
| Frequently Asked | Asked often in practical interviews | Know definition, example, and common mistake |
| Advanced | Useful for senior/deeper interviews | Understand concept and real-world use case |
| Low Priority | Good to know but less frequently asked | Revise after core topics are strong |

## Table of Contents

Quick navigation:

- React Basics
- Props and State
- Rendering
- Virtual DOM and Reconciliation
- Hooks
- Forms
- Component Communication
- Routing
- State Management
- Performance Optimization
- API Calls
- Authentication in React
- TypeScript With React
- React Patterns
- Error Handling
- React Strict Mode
- Common Tricky Questions
- Testing
- React App Architecture
- Most Important Short Answers
- Final React Interview Checklist
- DEEP Understanding TOPICS
- Low Priority SSR and Hydration Questions
- Additional Low Priority React Questions
- React 19 Features

## Fast Revision Path

If you have only 1 hour:

1. Read `Most Important Short Answers`.
2. Read `Final React Interview Checklist`.
3. Revise `Rendering`, `Props and State`, and `Hooks`.
4. Read `React.memo`, `useMemo`, `useCallback`, and dependency arrays.
5. Revise API calls, cleanup, and route-change/unmount scenarios.

If you have 1 day:

1. Finish all Must Know topics from `DEEP Understanding TOPICS`.
2. Practice code-output questions from `ReactCodeSnippet.md`.
3. Revise Redux, routing, auth, and performance sections.
4. Review SSR, hydration, Suspense, lazy loading, and accessibility.

Recommended interview answer format:

```text
Short definition -> Why it is used -> Example -> Common mistake -> Real-world use case
```

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

#### What is the difference between `createElement` and `cloneElement`?

`React.createElement` creates a new React element from scratch.

It is what JSX becomes after compilation.

Example:

```tsx
const element = React.createElement(
  'button',
  { className: 'primary' },
  'Click Me'
);
```

This is similar to writing:

```tsx
const element = <button className="primary">Click Me</button>;
```

`React.cloneElement` takes an existing React element and returns a new element with extra or changed props.

Example:

```tsx
const button = <button>Save</button>;

const disabledButton = React.cloneElement(button, {
  disabled: true,
});
```

Now `disabledButton` behaves like:

```tsx
<button disabled>Save</button>
```

Comparison:

| Point | createElement | cloneElement |
|---|---|---|
| Purpose | Creates a new element | Copies an existing element |
| Input | Type, props, children | Existing element, new props, children |
| Common use | JSX compilation | Advanced component composition |
| Mutates original? | No | No |

Interview answer:

```text
createElement creates a new React element from a type, props, and children. JSX is compiled into createElement calls. cloneElement takes an existing React element and returns a new element with merged or overridden props. cloneElement is useful in advanced composition cases, but it should be used carefully because it can make data flow less obvious.
```

#### What are React Fragments and when would you use them?

React Fragment lets a component return multiple elements without adding an extra DOM node.

Without Fragment, we may add an unnecessary wrapper:

```tsx
function UserInfo() {
  return (
    <div>
      <h2>Paras</h2>
      <p>Frontend Developer</p>
    </div>
  );
}
```

With Fragment:

```tsx
function UserInfo() {
  return (
    <>
      <h2>Paras</h2>
      <p>Frontend Developer</p>
    </>
  );
}
```

Long syntax:

```tsx
function UserInfo() {
  return (
    <React.Fragment>
      <h2>Paras</h2>
      <p>Frontend Developer</p>
    </React.Fragment>
  );
}
```

Use Fragment when:

- you need to return multiple sibling elements
- you do not want an unnecessary `div`
- extra DOM wrappers can break CSS layout
- extra wrappers can break table structure

Table example:

```tsx
function UserRow() {
  return (
    <>
      <td>Paras</td>
      <td>Admin</td>
    </>
  );
}
```

If you need a `key`, use the long syntax:

```tsx
users.map((user) => (
  <React.Fragment key={user.id}>
    <h2>{user.name}</h2>
    <p>{user.role}</p>
  </React.Fragment>
));
```

Interview answer:

```text
React Fragment lets us group multiple elements without adding an extra DOM node. It is useful when a component needs to return sibling elements but we do not want an unnecessary wrapper div. The short syntax is <>...</>, and the long syntax React.Fragment is used when we need to pass a key.
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

### 14. Is react unidirectional or bidirectional?
React uses a strict unidirectional (one-way) data flow. This design choice means data moves in a single direction throughout your application, specifically from parent components down to child components.

How Unidirectional Flow Works in React
- Data Down: Parent components pass state information down to child components exclusively through read-only props.

- Immutable Props: Child components cannot directly alter or mutate the props they receive from above.

- Actions Up: If a child component needs to trigger a change in the parent's data, it does so by executing a callback function passed down by that parent.

- Re-rendering: The callback updates the parent component's state, causing the application to re-render and pass the newly updated data back down the tree.

Why React Rejects Bidirectional Flow
Unlike frameworks that feature implicit two-way data binding (such as Angular or Vue's v-model), React intentionally requires explicit manual updates.

The primary benefits of this choice include:
- High Predictability: Because data travels along a single path, it is incredibly easy to track exactly where a state change originated.

- Simpler Debugging: You always look "up" the component hierarchy to find out why a specific variable changed.

- Performance Control: React can seamlessly minimize unnecessary browser updates by knowing exactly which branch of the tree modified its state.

### 15. how can we change the props value in react?
In React, you cannot change props values directly within a child component because props are immutable (read-only). React follows a strict strict unidirectional data flow, meaning data can only flow downward from parent to child.

To change a prop value, you must manage that data as state in the parent component and update it from there.

Here are the three standard patterns used to handle this in React.

1. The Standard Way: Pass a Callback Function (Lift State Up)If a child component needs to trigger a change to its props, the parent component must pass down a function along with the prop. The child calls this function, which updates the state in the parent and forces a re-render with the new prop values.

Parent Component

```jsx
import { useState } from 'react';
import Child from './Child';

function Parent() {
  // 1. Define state in the parent
  const [name, setName] = useState("John");

  rconst handleNameChange = (newName) => {
    setName(newName);
  }

  return (
    <div>
      {/* 2. Pass both the state and the setter function as props */}
      <Child userName={name} onNameChange={handleNameChange} />
    </div>
  );
}

OR

import { useState } from 'react';
import Child from './Child';

function Parent() {
  // 1. Define state in the parent
  const [name, setName] = useState("John");

  return (
    <div>
      {/* 2. Pass both the state and the setter function as props */}
      <Child userName={name} onNameChange={setName} />
    </div>
  );
}
```

Child Component

```jsx
function Child({ userName, onNameChange }) {
  return (
    <div>
      <p>Current User: {userName}</p>
      {/* 3. Execute the parent's function to trigger an update */}
      <button onClick={() => onNameChange("Paras")}>
        Change Name to Alice
      </button>
    </div>
  );
}
```

2. For Local Tweaks: Use the Prop as Initial State

If you want to use the incoming prop value merely as a starting point, and the parent doesn't care about subsequent changes, convert it into local state inside the child.

```jsx
import { useState } from 'react';

function Counter({ initialCount }) {
  // Copy the prop value into a local state variable
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Note: If the parent updates initialCount later, the local count state will not automatically update. It only sets the value on the initial mount.

3. For UI Formatting: Create a Local Variable

If you just want to transform the prop's appearance (e.g., formatting text or calculating a total) without modifying the original data structure, store the result in a local variable or inline it.

```jsx
function UserCard({ firstName }) {
  // Create a new local variable instead of changing props.firstName directly
  const upperName = firstName.toUpperCase();

  return <h1>{upperName}</h1>;
}
```

### 14. can we render list of item using for loop or forEach or filter?

Yes, you can use a for loop or forEach to render a list of items in React, but you cannot use them inline inside your JSX block.

JSX only accepts expressions that return a value (like .map()). Because for and forEach are statements that return undefined, you must build an array of JSX elements outside of the JSX return block first.

Here is how to do it correctly with both methods, along with the standard React approach.

1. Using a Standard for LoopTo use a for loop, create an empty array before your return statement, push the JSX elements into it, and then inject that array into your JSX.
```jsx
function NumberList() {
  const items = ['Apple', 'Banana', 'Cherry'];
  const listItems = []; // 1. Create an empty array

  // 2. Loop and push JSX into the array
  for (let i = 0; i < items.length; i++) {
    listItems.push(<li key={i}>{items[i]}</li>);
  }

  // 3. Render the array inside JSX
  return <ul>{listItems}</ul>;
}

OR

import React, { useState } from 'react';
function App() {
  const renderListItem = () => {
    const items = [];
    for(var i=0; i<10; i++) {
      items.push((<li key={i}>List - {i}</li>))
    }
    return items;
  }
  return (
    <div>
      <ul>{renderListItem()}</ul>
    </div>
  );
}
export default App
```

2. Using forEach

Like the for loop, forEach does not return anything. You must manually push items into an external array before the return statement.

```jsx
function GroceryList() {
  const items = ['Milk', 'Eggs', 'Bread'];
  const listItems = [];

  // Loop and populate the array
  items.forEach((item, index) => {
    listItems.push(<li key={index}>{item}</li>);
  });

  return <ul>{listItems}</ul>;
}
```

Why React Developers Prefer .map() InsteadWhile for and forEach work, the standard React convention is to use .map().The .map() method transforms an array of data into an array of JSX elements and returns it instantly. This allows you to write the loop inline directly inside your JSX, keeping your code cleaner and more declarative.

```jsx
function StandardList() {
  const items = ['Sony', 'LG', 'Samsung'];

  // Clean, inline rendering
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

Important Rule: Always Use a key PropNo matter which loop you choose, you must always provide a unique key prop to the outermost element in your loop. This helps React identify which items have changed, been added, or been removed, ensuring optimal performance.

### 14. What are the ways to make a responsive application that supports all devices?

A responsive application adapts properly across mobile, tablet, laptop, desktop, and large screens.

It should handle:

- layout
- font size
- images
- tables
- forms
- navigation
- touch interactions
- accessibility

Interview answer:

```text
To make a responsive application, I use mobile-first CSS, flexible layouts with flexbox/grid, relative units like rem and %, media queries, responsive images, fluid typography, accessible forms, and special handling for tables on small screens. I also test using browser dev tools and real devices.
```

#### 1. Use mobile-first CSS

Mobile-first means writing default styles for small screens first, then adding styles for larger screens.

```css
.container {
  padding: 16px;
}

@media (min-width: 768px) {
  .container {
    padding: 32px;
  }
}
```

Why useful:

```text
Most users may open the app on smaller screens. Mobile-first CSS keeps the default UI lightweight and easier to scale upward.
```

#### 2. Use flexible layouts with Flexbox and Grid

Flexbox is good for one-dimensional layouts:

```css
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
```

Grid is good for two-dimensional layouts:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

This automatically adjusts cards based on available width.

#### 3. Use relative units for spacing and sizing

Prefer responsive units:

- `%`
- `rem`
- `em`
- `vw`
- `vh`
- `clamp()`
- `minmax()`

Example:

```css
.page {
  width: min(100% - 32px, 1200px);
  margin: 0 auto;
}
```

Avoid hardcoding everything in fixed pixels.

#### 4. Use fluid typography for font size

Use `clamp()` to keep text readable across devices:

```css
h1 {
  font-size: clamp(1.75rem, 4vw, 3rem);
}

p {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
}
```

Meaning:

```text
minimum size -> preferred responsive size -> maximum size
```

This prevents text from becoming too small on mobile or too large on desktop.

#### 5. Make images responsive

Basic responsive image:

```css
img {
  max-width: 100%;
  height: auto;
}
```

Better HTML:

```tsx
<img
  src="/profile.jpg"
  alt="User profile"
  loading="lazy"
/>
```

For different screen sizes, use `srcSet`:

```tsx
<img
  src="/banner-800.jpg"
  srcSet="/banner-400.jpg 400w, /banner-800.jpg 800w, /banner-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Dashboard banner"
/>
```

Important image points:

- use `max-width: 100%`
- use correct aspect ratio
- use `loading="lazy"` for below-the-fold images
- compress images
- always add useful `alt` text

#### 6. Make tables responsive

Tables are difficult on mobile because they are naturally wide.

Option 1: horizontal scroll wrapper

```tsx
<div className="tableWrapper">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Paras</td>
        <td>paras@example.com</td>
        <td>Admin</td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.tableWrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
}
```

Option 2: convert rows into cards on mobile:

```css
@media (max-width: 600px) {
  table,
  thead,
  tbody,
  tr,
  td {
    display: block;
  }

  thead {
    display: none;
  }

  td::before {
    content: attr(data-label);
    font-weight: 600;
    display: block;
  }
}
```

```tsx
<td data-label="Name">Paras</td>
<td data-label="Email">paras@example.com</td>
<td data-label="Role">Admin</td>
```

#### 7. Use responsive navigation

For desktop:

```text
full horizontal navigation
```

For mobile:

```text
hamburger menu, bottom navigation, drawer, or compact tabs
```

Important:

- buttons should be easy to tap
- touch targets should be large enough
- active route should be visible
- keyboard navigation should work

#### 8. Make forms mobile-friendly

Good practices:

- labels should be visible
- inputs should be full width on mobile
- use correct input types like `email`, `tel`, `password`
- show validation messages clearly
- avoid tiny buttons

Example:

```tsx
<label htmlFor="email">Email</label>
<input id="email" name="email" type="email" />
```

```css
input,
button {
  width: 100%;
  min-height: 44px;
}

@media (min-width: 768px) {
  button {
    width: auto;
  }
}
```

#### 9. Use CSS variables for consistent scaling

```css
:root {
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --radius: 8px;
}

.card {
  padding: var(--space-md);
  border-radius: var(--radius);
}
```

This keeps spacing consistent across the application.

#### 10. Test on different devices

Testing checklist:

- Chrome DevTools device toolbar
- real mobile devices
- tablet viewport
- keyboard navigation
- landscape mode
- slow network
- high zoom level
- large text settings

Common breakpoints:

```css
/* mobile default */

@media (min-width: 640px) {
  /* small tablet */
}

@media (min-width: 768px) {
  /* tablet */
}

@media (min-width: 1024px) {
  /* laptop */
}

@media (min-width: 1280px) {
  /* desktop */
}
```

#### Common mistakes

- using fixed widths like `width: 1200px`
- not testing long text
- images overflowing containers
- tables breaking mobile layout
- small tap targets
- hiding important content on mobile
- using font sizes that are too small
- forgetting landscape mode
- relying only on desktop browser testing

Final interview answer:

```text
I build responsive applications using a mobile-first approach, flexbox/grid layouts, relative units, media queries, clamp-based font sizes, responsive images, and special handling for tables. For tables, I either provide horizontal scroll or convert rows into cards on mobile. I also test with real devices, DevTools, different zoom levels, and accessibility checks.
```

## Rendering

### 15. What is rendering in React?

Rendering means React calls the component function to calculate UI.

Rendering does not always mean DOM changed.

Example:

```tsx
const App = () => {
  return <h1>Hello</h1>;
};
```

React runs `App()` to know what UI should be.

### 16. Difference between Render phase and Commit phase in React?

React update has two main phases:

```text
Render phase -> Commit phase
```

Render phase means React calculates what the UI should look like.

Commit phase means React applies the required changes to the real DOM.

Simple difference:

| Point | Render phase | Commit phase |
|---|---|---|
| What happens | React calls components and creates new UI description | React updates the real DOM |
| DOM changed? | No | Yes, if something changed |
| Can be interrupted? | Yes, in concurrent rendering | No, commit is synchronous |
| Should be pure? | Yes | Side effects are allowed after commit |
| Examples | calling component functions, comparing elements | DOM updates, refs updated, effects scheduled |

Example:

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log('Render phase:', count);

  useEffect(() => {
    console.log('Effect after commit:', count);
  }, [count]);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      Count: {count}
    </button>
  );
}
```

When button is clicked:

```text
setCount runs
-> React enters render phase
-> Counter function runs
-> React calculates new UI
-> React enters commit phase
-> DOM button text updates
-> useEffect runs after commit
```

Important point:

```text
Render does not mean DOM update. React may render a component, compare the result, and decide that no real DOM change is needed.
```

Interview answer:

```text
In the render phase, React calls component functions and calculates the next UI tree. This phase should be pure and does not change the real DOM. In the commit phase, React applies the necessary changes to the real DOM, updates refs, and runs layout/effect lifecycles. Render can be paused or discarded in modern React, but commit is applied synchronously.
```

### 17. What causes a re-render?

Common causes:

- state update
- props change
- parent re-render
- context value change
- Redux selector result change

Note - Yes, by default in React, if a parent component re-renders, the child component will also re-render.

### 18. What is conditional rendering?

Conditional rendering means showing UI based on condition.

Example:

```tsx
return isAuthenticated ? <Dashboard /> : <SignIn />;
```

Another example:

```tsx
{error ? <p>{error}</p> : null}
```

### 19. What is list rendering?

Rendering array items using `map`.

Example:

```tsx
users.map((user) => <UserRow key={user.id} user={user} />);
```

### 20. Why is key important in list rendering?

`key` helps React identify which list item changed, added, or removed.

Good:

```tsx
users.map((user) => <UserRow key={user.id} user={user} />);
```

Bad:

```tsx
users.map((user, index) => <UserRow key={index} user={user} />);
```

Using index can cause bugs when list order changes, as index are position of the elements so if any elements gets deleted the from the list, the item position will get shift so in this case React will have challenge to figure out which element gets updated. 

If we have a unique key for all of the element and it gets deleted then element of the unique key of others will not change. 

## Virtual DOM and Reconciliation

### 21. What is Virtual DOM?

Virtual DOM is a lightweight, and in-memory representation of the real DOM.

When state changes:

1. React creates new virtual DOM.
2. React compares it with previous virtual DOM.
3. React updates only necessary real DOM parts.

### 22. What is reconciliation?

Reconciliation is React's process of comparing old and new element trees to decide what needs to update.

Interview answer:

```text
Reconciliation is the process where React compares previous and next UI trees and efficiently updates the real DOM.
```

### 22. How re-rendered gets happened when a state gets changes?

```jsx
import { useState } from 'react';
const App = () => {
  const [firstName, setFirstName] = useState("paras");
  const [lastName, setLastName] = useState("puru");
  const [address, setAddress] = useState("Bengaluru");
  const [sex, setSex] = useState("Male");

  const handleAddress = () => {
    setAddress("Ranchi");
  };

  return (
    <UserCard 
      firstName={firstName}  
      lastName={lastName}  
      address={address}  
      sex={sex} 
      handleAddressChange={handleAddress}
    />
  );
};
```

```jsx
function UserCard({ firstName, lastName, sex, address, handleAddressChange }) {
  const upperName = firstName.toUpperCase();

  return (
    <div className="wrapper">
      <div>{upperName}</div>
      <div>{lastName}</div>
      <div>{sex}</div>
      <div onClick={handleAddressChange} className="address">
        {address}
      </div>
    </div>
  );
}
export default App;
```
1. Will React only compare the address div, or re-create the UserCard?

React will execute the entire UserCard component function from scratch.

Here is the step-by-step breakdown of how it executes:

- State Change triggers Root Update: Clicking the address calls handleAddress(), which calls setAddress("Ranchi") inside <App />.

- App Re-renders: Because state changed, the entire App component function re-runs.

- UserCard Recalculates: Inside App, React encounters <UserCard ... /> with a new address prop value ("Ranchi").

- Function Re-execution: React calls the UserCard function again. Every line of code inside UserCard runs again, including the recreation of your local upperName variable.

2. How many Virtual DOMs get created, and for which component?

Conceptually, only 1 new Virtual DOM tree is created for this entire tree snapshot, but let's break down exactly what gets created for your components:V

- irtual DOM Element Creation: When App and UserCard re-run, React builds a brand new Virtual DOM representation (a lightweight JavaScript tree object) for both the App component and the entire UserCard component structure (the wrapper div and all four inner child divs).

- The Reconciliation (Diffing) Process: React takes this newly generated Virtual DOM tree and compares it side-by-side with the old Virtual DOM tree from before the click.

- The Target Update: During this comparison, React's diffing algorithm notices that firstName, lastName, and sex have identical values as before. The only difference it finds is the text node inside the address div ("Bengaluru" vs "Ranchi").

- Real DOM Paint: Because React is highly optimised, it skips updating the other elements in the real browser DOM. It updates only the single text node inside the real .address HTML element.

### 23. Difference between Reconciliation and Diffing, and are both the same?
No, Reconciliation and Diffing are not the same thing, but they are closely related.

Think of Reconciliation as the entire project and Diffing as the specific step used to complete that project.

Here is the precise breakdown of the differences:

1. The Core Definitions

Reconciliation is the whole process. It is React’s entire workflow of syncronizing the Virtual DOM with the Real Browser DOM. It includes everything from detecting a state change, running the component functions, generating the new Virtual DOM, comparing it to the old one, and finally updating the screen.

Diffing is the comparison algorithm. It is a specific sub-step inside the reconciliation process. 
It is the raw mathematical calculation that compares the old Virtual DOM tree with the new Virtual DOM tree to find exactly what changed.

2. A Real-World Analogy: Renovating a House
Imagine you want to renovate a room in your house:

The Blueprint: The Virtual DOM.

The Real House: The Real Browser DOM.

Diffing: This is the inspector walking in with the old blueprint and the new blueprint, comparing them side-by-side, and marking with a red pen: "The couch moved, but the windows and walls are exactly the same.

"Reconciliation: This is the entire renovation process. It includes drawing the new blueprint, hiring the inspector to do the Diffing, and then sending the construction crew to move only the couch without knocking down the walls.

3. How They Fit Into Your UserCard Example

When you clicked the address div in your previous example, here is how both concepts played out:

- Reconciliation Starts: You clicked the button, state changed to "Ranchi", and React kicked off the Reconciliation process.

- New Tree Generation: React executed UserCard and generated a new Virtual DOM tree.

- The Diffing Step (The Algorithm): React ran its Diffing algorithm. It compared the old tree to the new tree. It quickly determined:
  - First 3 divs? No change.
  - Address div text node? Changed from "Bengaluru" to "Ranchi".

- Reconciliation Completes: React took the results of that Diffing step, went to the real browser DOM, and updated just that one text node. The reconciliation process is now complete.

### 23. Does React always update the real DOM on render?

No.

React may re-render components but only update the real DOM if output changes.

## Hooks

### 24. What are hooks?

Hooks are functions that let functional components use React features like state, effects, refs, and context.

Common hooks:

- `useState`
- `useEffect`
- `useLayoutEffect`
- `useMemo`
- `useCallback`
- `useTransition`
- `useDeferredValue`
- `useId`
- `use` React 19 API
- `useRef`
- `useContext`
- `useReducer`

### 25. Rules of hooks?

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

### 26. What is the `use()` API in React 19?

The React `use()` API is a React 19 feature that lets a component read a resource directly during render.

The resource can be:

- a Promise
- a Context

Important difference from normal hooks:

```text
Normal hooks like useState and useEffect must be called at the top level.
The use() API can be called inside conditions and loops.
```

Example:

```tsx
if (shouldLoadData) {
  const data = use(dataPromise);
}
```

When we pass a Promise to `use()`, React suspends the component until the Promise resolves.

That means we need a `Suspense` boundary to show fallback UI while waiting.

#### Example with React 19 `use()`

```tsx
import { Suspense, use } from 'react';

const dataPromise = fetch('https://example.com')
  .then((res) => res.json());

function DataComponent() {
  const data = use(dataPromise);

  return <div>Data: {data.message}</div>;
}

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DataComponent />
    </Suspense>
  );
}
```

What happens here:

```text
DataComponent renders
-> use(dataPromise) reads the promise
-> promise is still pending
-> React suspends DataComponent
-> Suspense shows Loading...
-> promise resolves
-> DataComponent renders with data
```

Why `use()` is useful:

- it reduces `useState + useEffect` boilerplate for some async reads
- it works naturally with `Suspense`
- it lets React control loading fallback UI
- it can make async rendering code easier to read
- it can read Context conditionally

Important considerations:

- `use()` is not exactly the same as normal hooks.
- It can be called conditionally, unlike `useState` or `useEffect`.
- Promise usage should be stable/cached, not recreated on every render.
- Errors from the Promise should be handled with an Error Boundary.
- In real apps, frameworks and data libraries often manage the cache around `use()`.

Bad pattern:

```tsx
function DataComponent() {
  const data = use(fetch('/api/users').then((res) => res.json()));

  return <div>{data.length}</div>;
}
```

Why bad?

```text
This creates a new Promise on every render.
It can cause repeated fetching or unstable behavior.
```

Better:

```tsx
const usersPromise = fetch('/api/users').then((res) => res.json());

function Users() {
  const users = use(usersPromise);

  return <p>Total users: {users.length}</p>;
}
```

#### Traditional API Calls with `useEffect` and `fetch`

In React projects before React 19, or when using traditional client-side fetching, we usually use `fetch` or Axios with `useState` and `useEffect`.

Example:

```tsx
import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
};

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load users');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

Traditional approach:

```text
useEffect starts API call
-> useState stores loading/data/error
-> component re-renders when state changes
```

React 19 `use()` approach:

```text
Promise is read during render
-> component suspends while pending
-> Suspense shows fallback
-> component renders when data is ready
```

#### Industry Best Practices for External APIs

For real-world apps, plain `fetch + useEffect` is often not enough.

Dedicated server-state libraries handle common problems automatically:

- caching
- loading state
- error state
- retries
- background refetching
- pagination
- stale data
- request deduplication

Common choices:

- [TanStack Query / React Query](https://tanstack.com/query/latest)
- [SWR by Vercel](https://swr.vercel.app/)
- RTK Query if the project already uses Redux Toolkit

When to choose:

```text
Use fetch + useEffect for simple one-off calls.
Use React Query or SWR when the app needs caching, refetching, retries, pagination, or shared server state.
Use RTK Query when the app already uses Redux Toolkit and API state should live with Redux.
```

Interview answer:

```text
The React 19 use() API lets a component read a Promise or Context during render. When a Promise is passed to use(), React suspends the component until the Promise resolves, so we wrap it with Suspense to show fallback UI. It can reduce useState and useEffect boilerplate for async data, but promises should be stable or cached. For large real-world apps, React Query, SWR, or RTK Query are often better for external API server-state management.
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

### 27. What is useState?

`useState` stores local component state. 

useState is a built-in React Hook that allows you to add state variables to functional components.

It is used to track, store, and update data that changes over time (like form inputs, counters, or toggle menus), automatically triggering a UI re-render whenever the data changes.

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

### 28. Why state updates are asynchronous?

React batches state updates for performance.

State updates in frameworks like React aren't asynchronous in the traditional sense; rather, they are queued and batched. Instead of re-rendering the component for every single setState call, React waits until the current execution block finishes, groups multiple updates together, and processes them in a single render pass.

Example:

```tsx
setCount(count + 1);
console.log(count); // old value
```

The state variable updates on next render.

### 29. What is the purpose of callback function argument format of setState, and when should it be used?

The callback function argument format means passing a function to the state setter instead of passing a direct value.

In functional components:

```tsx
setCount((prevCount) => prevCount + 1);
```

Here, `prevCount` is the latest pending state value provided by React.

Simple meaning:

```text
Do not calculate next state from the old render value.
Ask React for the latest previous state and calculate from that.
```

Direct value update:

```tsx
setCount(count + 1);
```

Functional update:

```tsx
setCount((prevCount) => prevCount + 1);
```

Why it is useful:

- React batches state updates.
- State values inside the current render are fixed.
- Multiple updates may read the same old value.
- Functional update always receives the latest pending state.

Example: direct update problem

```tsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
```

If `count` is `0`, all three calls become:

```tsx
setCount(1);
setCount(1);
setCount(1);
```

Final result:

```text
count = 1
```

Example: functional update solution

```tsx
const [count, setCount] = useState(0);

function handleClick() {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
}
```

React applies each update to the latest pending state:

```text
0 -> 1
1 -> 2
2 -> 3
```

Final result:

```text
count = 3
```

Use functional updates when:

- next state depends on previous state
- incrementing or decrementing counters
- toggling boolean values
- updating arrays based on previous array
- updating objects based on previous object
- calling multiple state updates in the same handler
- updating state inside timers, promises, or event listeners where closures may become stale

Toggle example:

```tsx
setIsOpen((prev) => !prev);
```

Array example:

```tsx
setTodos((prevTodos) => [...prevTodos, newTodo]);
```

Object example:

```tsx
setUser((prevUser) => ({
  ...prevUser,
  name: 'Paras',
}));
```

Class component version:

```tsx
this.setState((prevState, props) => ({
  count: prevState.count + props.step,
}));
```

Do not confuse this with the second callback argument in class components:

```tsx
this.setState({ count: 1 }, () => {
  console.log('State updated');
});
```

In modern functional components, `useState` setter does not support a second callback argument. Use `useEffect` if you need to run logic after a state value changes.

Interview answer:

```text
The callback function format of setState is used when the next state depends on the previous state. React may batch state updates, so reading the state variable directly can give the old render value. By passing a function like setCount(prev => prev + 1), React gives us the latest pending state and avoids stale state bugs. Use it for counters, toggles, array/object updates, multiple updates in one handler, and async callbacks.
```

### 30. What is batching?

Batching means React groups multiple state updates into one render.

Example:

```tsx
setName('Paras');
setRole('Admin');
```

React can render once instead of twice.

### 31. What is useEffect?

`useEffect` is a React Hook that allows you to run side effects in function components — things like fetching data, subscribing to something, manually changing the DOM, or setting timers. It runs after React renders the component.

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

### 32. useEffect dependency array?

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

### 33. What is cleanup in useEffect?

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

### 34. What is useLayoutEffect?

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

### 35. How to use the `useId` hook to generate unique IDs?

`useId` is a React hook used to generate a unique, stable ID for accessibility attributes.

It is mainly useful when we need to connect form labels, inputs, descriptions, and error messages.

Syntax:

```tsx
const id = useId();
```

Basic example:

```tsx
import { useId } from 'react';

function EmailField() {
  const emailId = useId();

  return (
    <div>
      <label htmlFor={emailId}>Email</label>
      <input id={emailId} type="email" />
    </div>
  );
}
```

Here, React generates a unique ID and uses it in both places:

```tsx
<label htmlFor={emailId}>Email</label>
<input id={emailId} type="email" />
```

This connects the label with the input.

Real use case with error text:

```tsx
import { useId } from 'react';

function PasswordField({ error }: { error?: string }) {
  const passwordId = useId();
  const errorId = `${passwordId}-error`;

  return (
    <div>
      <label htmlFor={passwordId}>Password</label>

      <input
        id={passwordId}
        type="password"
        aria-describedby={error ? errorId : undefined}
      />

      {error ? (
        <p id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
```

Why `useId` is useful:

- it avoids duplicate IDs when the same component is reused many times
- it improves accessibility by connecting labels and inputs
- it works well with server rendering and hydration
- it gives stable IDs between renders
- it avoids manually hardcoding IDs like `email`, `password`, or `input-1`

Example with multiple fields:

```tsx
function TextField({ label }: { label: string }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  );
}

function Form() {
  return (
    <>
      <TextField label="First Name" />
      <TextField label="Last Name" />
      <TextField label="Email" />
    </>
  );
}
```

Each `TextField` gets a different ID automatically.

When not to use `useId`:

- do not use it for list keys
- do not use it for database IDs
- do not use it for random IDs
- do not use it when the ID must come from backend data

#### Can we use `useId` while rendering map/listing elements?

No, we should not use `useId` for list keys while rendering `.map()` lists.

Bad:

```tsx
users.map((user) => <UserRow key={useId()} user={user} />);
```

This is wrong for two reasons.

First, `useId` is a hook, and hooks cannot be called inside loops, conditions, or `.map()` callbacks.

Second, React list keys should come from stable data, such as a database ID.

Good:

```tsx
users.map((user) => <UserRow key={user.id} user={user} />);
```

If there is no stable ID, create one when the data is created or received, not during render.

Important rule:

```text
useId is for accessibility IDs, not for React list keys.
```

Interview answer:

```text
useId is a React hook that generates a unique and stable ID for a component. It is mainly used for accessibility, such as connecting label with input using htmlFor and id, or connecting input with helper/error text using aria-describedby. We should not use useId for list keys because keys should come from stable data like database IDs. Also, hooks cannot be called inside map callbacks.
```

### 36. Difference between Webpack and Babel?

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

### 37. What is React Fiber?

Earlier React used to do all rendering task in one single go. If the task was heavy to filter/Search the record, UI used to get freeze.

React Fiber is React's internal rendering architecture.

React Fiber breaking/split rendering work into smaller units/chunks so it can pause, resume, prioritize, or discard work when needed.

Why Fiber matters:

- enables interruptible rendering
- supports prioritizing urgent updates
- improves responsiveness for complex UIs
- powers modern concurrent rendering features

Interview answer:

```text
React Fiber is React's internal reconciliation engine. It breaks rendering work into units so React can prioritize updates and keep the UI responsive.
```

A real-world example of React Fiber’s ability to pause, resume, prioritize, and discard rendering work is the Search-and-Filter Data Grid.

Imagine typing into a filter input while rendering 10,000 complex rows. Fiber manages this through Concurrent Rendering and useDeferredValue.

How Fiber Manages the Operations 
- Pause: As you start typing a letter, React begins rendering the filtered grid. If the render takes too long, React pauses midway to let the browser paint the screen and handle your next keystroke.
- Resume: Once the user pauses typing and the main thread is idle, React resumes the pending rendering task exactly where it left off.
- Priority: User keystrokes are assigned High Priority to keep the UI smooth. Off-screen or background updates (like calculating the new grid) are Low Priority.
- Discard: If you quickly delete your search term and type a new one, the previous search's rendering is now obsolete. React discards the stalled rendering work to immediately focus on calculating and displaying the newest search results.

Code Example

Using useDeferredValue, you tell React to de-prioritize the heavy grid's update, allowing the text input to remain snappy:
```jsx
import { useState, useDeferredValue, useMemo } from 'react';

function ProductList({ products }) {
  const [filterQuery, setFilterQuery] = useState('');
  
  // React can pause/discard work on this heavy list because it's deferred
  const deferredQuery = useDeferredValue(filterQuery);

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(deferredQuery)
    );
  }, [deferredQuery, products]);

  return (
    <div>
      <input 
        type="text" 
        value={filterQuery} 
        onChange={(e) => setFilterQuery(e.target.value)}
        placeholder="Search products..."
      />
      
      {/* Heavy grid rendering */}
      <Grid items={filteredProducts} />
    </div>
  );
}
```

### 38. What is React Portal?

React Portal lets a component render its JSX into a different DOM node outside its normal parent DOM hierarchy.

Normally, React renders child components inside their parent element.

Example:

```text
App
  -> Modal
     -> rendered inside App DOM
```

With Portal:

```text
App
  -> Modal component exists in React tree
  -> Modal DOM is rendered inside document.body or #modal-root
```

This is useful when UI must visually escape the parent container.

Common use cases:

- modals
- tooltips
- dropdowns
- popovers
- toast notifications
- full-screen overlays

Example:

```tsx
import { createPortal } from 'react-dom';

function Modal({ children, onClose }) {
  return createPortal(
    <div className="modalBackdrop">
      <div className="modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.body
  );
}
```

Even though the modal DOM is placed under `document.body`, it still belongs to the same React component tree.

Important interview points:

- Portal changes DOM placement, not React parent-child relationship.
- Context still works normally.
- React events still bubble through the React tree.
- Useful when parent has `overflow: hidden`, `z-index`, or layout restrictions.

Interview answer:

```text
React Portal is used to render a component's UI into a different DOM node outside the parent DOM hierarchy. It is commonly used for modals, tooltips, dropdowns, and overlays. The DOM position changes, but the component still remains part of the same React tree, so context and React event bubbling still work.
```

### 39. What is React Profiler?

React Profiler is a tool used to measure rendering performance in a React application.

It helps answer questions like:

- which component rendered?
- why did it render?
- how long did it take?
- did it render too often?
- which interaction caused the render?

There are two common ways to use profiling:

1. React DevTools Profiler tab
2. React `<Profiler>` component

#### React DevTools Profiler

React DevTools Profiler is commonly used in real projects.

It shows:

- render duration
- component render tree
- slow components
- repeated renders
- commit timeline

Use it when:

- page feels slow
- typing lags
- large list is slow
- parent update re-renders many children
- memoization may be needed but you want proof first

#### Profiler component example

```tsx
import { Profiler } from 'react';

function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log('Profiler ID:', id);
  console.log('Phase:', phase);
  console.log('Actual duration:', actualDuration);
  console.log('Base duration:', baseDuration);
}

function App() {
  return (
    <Profiler id="UserList" onRender={onRender}>
      <UserList />
    </Profiler>
  );
}
```

Meaning:

- `id` means the profiler name.
- `phase` tells whether it was `mount` or `update`.
- `actualDuration` tells how long the current render took.
- `baseDuration` estimates how long rendering would take without memoization.

Important interview points:

- Profiler does not optimize automatically.
- It helps identify performance problems.
- Use it before adding `useMemo`, `useCallback`, or `React.memo` everywhere.
- Profiling is usually done in development or profiling builds, not normal production debugging.

Interview answer:

```text
React Profiler is used to measure component rendering performance. It helps identify slow components, unnecessary re-renders, and expensive updates. We can use the React DevTools Profiler or the Profiler component. It does not fix performance by itself, but it helps us decide where optimization is actually needed.
```

### 40. What is React Compiler?

React Compiler is a build-time optimization tool from the React team.

Its goal is to automatically optimize React components by memoizing values, functions, and component output when it is safe to do so.

Without React Compiler, developers often manually use:

- `React.memo`
- `useMemo`
- `useCallback`

With React Compiler, React can automatically apply many of these optimizations during build time.

Simple idea:

```text
Developer writes normal React code
  -> React Compiler analyzes it
  -> Compiler adds safe memoization
  -> Fewer unnecessary re-renders
```

Example without compiler:

```tsx
const filteredUsers = useMemo(() => {
  return users.filter((user) => user.name.includes(search));
}, [users, search]);

const handleSelect = useCallback((id) => {
  setSelectedId(id);
}, []);
```

With compiler-friendly code, we may write simpler code:

```tsx
const filteredUsers = users.filter((user) => user.name.includes(search));

function handleSelect(id) {
  setSelectedId(id);
}
```

The compiler can analyze whether these values/functions can be safely reused.

Important rule:

```text
React Compiler works best when components are pure and follow the Rules of React.
```

Good compiler-friendly component:

```tsx
function UserList({ users, search }) {
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ul>
      {filteredUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

Bad pattern:

```tsx
function UserList({ users }) {
  users.sort((a, b) => a.name.localeCompare(b.name));

  return users.map((user) => <p key={user.id}>{user.name}</p>);
}
```

The bad example mutates props during render, which breaks React purity rules.

React Compiler does not replace:

- good component design
- stable keys
- virtualization for huge lists
- server-state libraries like React Query
- measuring performance with Profiler

Interview answer:

```text
React Compiler is a build-time optimization tool that automatically memoizes React code where it is safe. It can reduce the need for manual useMemo, useCallback, and React.memo. It depends on components being pure and following the Rules of React. It improves performance by reducing unnecessary re-renders, but it does not replace good architecture or profiling.
```

### 41. How to find out the root cause for API slowness?

API slowness can happen because of frontend code, network, backend logic, database queries, external services, server load, or very large response payloads.

The important interview point is:

```text
Do not guess. Measure each layer and isolate where time is spent.
```

Interview answer:

```text
To find the root cause of API slowness, I first check the browser Network tab to see total time, TTFB, payload size, and whether the delay is network or server related. Then I add timing logs and request IDs from frontend to backend. On the backend, I check route execution time, database query time, external API calls, logs, CPU, memory, and error rates. Once I know which layer is slow, I fix that specific bottleneck instead of randomly optimizing React.
```

#### 1. Confirm whether the API is actually slow

Sometimes the API is fast, but the UI feels slow because React rendering, table rendering, or state updates are expensive.

Check:

- browser Network tab API duration
- React Profiler render time
- frontend loading state behavior
- whether the same API is slow in Postman/curl

Simple rule:

```text
If Network tab shows API is fast but UI updates slowly, the problem is frontend rendering.
If Network tab shows API itself is slow, investigate network/backend/database.
```

#### 2. Use browser Network tab

Open DevTools -> Network -> select the API request.

Check:

- status code
- total request time
- request payload
- response payload size
- TTFB, meaning Time To First Byte
- content download time
- whether preflight `OPTIONS` request is happening
- whether request is repeated multiple times

Useful interpretation:

```text
High TTFB usually means backend/server/database delay.
High content download time usually means response payload is too large or network is slow.
Many duplicate requests usually means frontend logic issue.
```

#### 3. Add frontend timing logs

Example:

```tsx
async function fetchUsers() {
  const requestId = crypto.randomUUID();
  const startedAt = performance.now();

  try {
    const response = await fetch('/api/users', {
      headers: {
        'X-Request-Id': requestId,
      },
    });

    const data = await response.json();
    return data;
  } finally {
    const endedAt = performance.now();
    console.log('API:', '/api/users');
    console.log('Request ID:', requestId);
    console.log('Duration:', Math.round(endedAt - startedAt), 'ms');
  }
}
```

Why request ID is useful:

```text
The same request ID can be searched in frontend logs, backend logs, database logs, and monitoring tools.
```

#### 4. Check if frontend is calling the API too many times

Common React causes:

- wrong `useEffect` dependency array
- object/array dependency recreated on every render
- StrictMode double effect in development
- search input calling API on every key press without debounce
- parent re-render causing child API call again
- route remounting the component repeatedly

Bad example:

```tsx
useEffect(() => {
  fetchUsers();
}, [{ status: 'active' }]);
```

This runs repeatedly because a new object is created on every render.

Better:

```tsx
const filters = useMemo(() => ({ status: 'active' }), []);

useEffect(() => {
  fetchUsers(filters);
}, [filters]);
```

For search:

```text
Use debounce or call API only after user pauses typing.
```

#### 5. Check backend route timing

Backend should log how much time each API takes.

Example Express-style idea:

```js
import crypto from 'node:crypto';

app.use((req, res, next) => {
  const startedAt = Date.now();
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();

  res.on('finish', () => {
    console.log({
      requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - startedAt,
    });
  });

  next();
});
```

This helps identify:

- slow routes
- slow status codes
- specific user/session causing issue
- whether slowness is random or consistent

#### 6. Check database queries

Many API slowness issues come from the database.

Check:

- missing indexes
- slow query logs
- full collection/table scans
- N+1 query problem
- large joins/lookups
- fetching too many records
- sorting without index
- aggregation pipeline taking too long

Example:

```text
GET /api/users?search=pa
```

If this searches millions of users without an index, the API will be slow even if React is perfect.

Fixes:

- add indexes
- use pagination
- select only required fields
- avoid unnecessary joins
- cache frequently used data

#### 7. Check external dependencies

The API may be slow because it calls another service.

Examples:

- payment gateway
- email service
- notification service
- third-party auth service
- file upload service

Important:

```text
Log external API duration separately from your own API duration.
```

If payment API takes 4 seconds, your API will also feel slow unless you handle it asynchronously.

#### 8. Check payload size

Large responses slow down both API and frontend rendering.

Bad:

```text
Returning 20,000 records with all fields
```

Better:

```text
Return paginated records with only required fields.
```

Example:

```text
GET /api/users?page=1&limit=20
```

Also check:

- image size
- unnecessary nested objects
- repeated data
- compression like gzip/br
- frontend rendering large lists without virtualization

#### 9. Check server and infrastructure metrics

Check:

- CPU usage
- memory usage
- server response time
- database CPU/memory
- connection pool saturation
- queue length
- rate limiting
- cold starts in serverless
- deployment region vs user region

If the API is fast locally but slow in production, it may be infrastructure, database, region, or traffic related.

#### 10. Fix based on measured root cause

| Root cause | Possible fix |
|---|---|
| Duplicate frontend calls | Fix `useEffect`, debounce, cache API data |
| Slow backend logic | Optimize route logic, avoid blocking work |
| Slow database query | Add index, paginate, optimize query |
| Large response | Return fewer fields, paginate, compress |
| Slow external API | Add timeout, queue/background job, retry carefully |
| Slow frontend rendering | Virtualize lists, memoize expensive UI, use pagination |
| Network/geography issue | CDN, closer region, compression |

Final interview answer:

```text
For API slowness, I debug layer by layer: browser Network tab, frontend duplicate calls, request timing, backend logs, database query time, external services, payload size, and infrastructure metrics. I use request IDs to connect frontend and backend logs. After measuring, I fix the actual bottleneck, such as adding indexes, pagination, caching, debouncing, reducing payload size, or moving slow work to background jobs.
```

### 42. What is hydration in React, and what role does hydration play in server-side rendering?

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

### 43. Difference between Server-Side Rendering and Client-Side Rendering?

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

### 44. How do you decide whether a component should be server-rendered or client-rendered?

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

### 45. What is infinite render loop?

An infinite render loop happens when state updates repeatedly during render or effect.

Bad:

```tsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

This changes `count`, effect runs again, and loop continues.

### 46. What is useRef?

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

### 47. useRef vs useState?

`useState`:

- causes re-render when updated
- used for UI data

`useRef`:

- does not cause re-render
- used for mutable values/DOM refs

### 48. What is useMemo?

`useMemo` memoizes a calculated value.

Example:

```tsx
const filteredUsers = useMemo(
  () => users.filter((user) => user.status === 'active'),
  [users]
);
```

Use it when calculation is expensive or reference stability matters.

### 49. What is useCallback?

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

### 50. What is useTransition?

`useTransition` is a React hook used to mark some state updates as non-urgent, and It helps React prioritize urgent UI updates first.

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

### 51. What is useDeferredValue and why is React's useDeferredValue hook useful?

`useDeferredValue` is a React hook that lets you defer updating a value until the browser has time to handle less urgent rendering.

Interview answer:

```text
useDeferredValue keeps the previous value visible while React prepares the updated value in the background. It is useful when a fast-changing value causes expensive rendering, such as typing into a search box that filters a large list.
```

Simple meaning:

```text
Original value updates immediately.
Deferred value updates later with lower priority.
```

Syntax:

```tsx
const deferredValue = useDeferredValue(value);
```

Why it is useful:

- it keeps typing, clicking, and urgent UI interactions responsive
- it lets expensive UI rendering lag slightly behind the latest value
- it avoids blocking the browser while rendering a large list or heavy component
- it keeps showing the previous UI until the new UI is ready
- it is helpful when the value comes from props and we cannot wrap the original state update with `startTransition`

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

Same mental model as `useTransition`:

```text
searchText         -> urgent value, used by input
deferredSearchText -> non-urgent value, used by expensive UI
```

Example in a simpler form:

```tsx
import { useDeferredValue, useState } from 'react';

function SearchPage({ users }) {
  const [searchText, setSearchText] = useState('');
  const deferredSearchText = useDeferredValue(searchText);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(deferredSearchText.toLowerCase())
  );

  return (
    <>
      <input
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      {searchText !== deferredSearchText ? <p>Updating list...</p> : null}

      {filteredUsers.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}
```

Here:

```text
Input uses searchText, so typing updates immediately.
List uses deferredSearchText, so expensive rendering can wait.
```

Important difference from `useTransition`:

```text
useTransition marks a state update as low priority.
useDeferredValue marks a value as low priority after it has already changed.
```

Without `useDeferredValue`:

```text
User types
searchText updates
Large list filters immediately
Rendering may feel slow or stuck
```

With `useDeferredValue`:

```text
User types
searchText updates immediately
Input stays responsive
deferredSearchText updates slightly later
Large list renders when React gets time
```

Real experience:

```text
Without useDeferredValue, typing in a search box can feel laggy if every keystroke renders thousands of rows.
With useDeferredValue, the input updates immediately, and the results can update a moment later without blocking typing.
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
- It does not make the filtering/calculation itself faster.
- It changes the priority of rendering work so urgent updates can appear first.

Final interview shortcut:

```text
useDeferredValue is useful when a fast-changing value causes expensive rendering and we want React to keep urgent UI responsive by showing the previous UI until the new UI is ready.
```

### 52. useMemo vs useCallback?

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

### 53. How useMemo and useCallback works behind the scene?
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

### 54. What is useContext?

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

### 55. What is useReducer?

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

### 56. What is a custom hook?

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

### 57. Controlled vs uncontrolled components?
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

### 58. Which is better: controlled or uncontrolled?

Controlled is better when:

- validation is needed
- value controls UI
- submit button depends on fields
- instant feedback is needed

Uncontrolled is useful when:

- simple forms
- file inputs
- integration with non-React libraries

### 59. How to handle form validation?

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

### 60. How parent passes data to child?

Using props.

```tsx
<UserCard user={user} />
```

### 61. How child sends data to parent?

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

### 62. What is prop drilling?

Prop drilling means passing props through many levels just to reach a deeply nested component.

Solutions:

- Context
- Redux/Zustand
- component composition
- custom hooks

### 63. What is lifting state up?

Moving shared state to the nearest common parent.

Lifting state up is a pattern used when several components need to share the same changing data. Instead of keeping the state in child components, you move it up to their closest common ancestor.

Example:

```text
Sibling A needs selected user
Sibling B needs selected user
Move selectedUserId to parent
Pass value/callback to both
```

## Routing

### 64. What is React Router?

React Router is a routing library for React apps.

It maps URL paths to components.

Example:

```tsx
<Routes>
  <Route path="/signin" element={<SignInPage />} />
  <Route path="/" element={<Dashboard />} />
</Routes>
```

### 65. What is protected route?

Protected route allows access only when user is authenticated.

Concept:

```tsx
return isAuthenticated ? children : <Navigate to="/signin" />;
```

In this app:

```text
frontend/src/components/ProtectedRoute.tsx
```

### 66. What is public route?

Public route is accessible without login.

But if user is already authenticated, signin/signup pages may redirect to dashboard.

In this app:

```text
frontend/src/components/PublicRoute.tsx
```

### 67. What is Navigate?

`Navigate` redirects user to another route.

Example:

```tsx
<Navigate replace to="/signin" />
```

## State Management

### 68. When to use local state?

Use local state when data belongs to one component.

Examples:

- form input
- modal open/close
- selected tab
- local loading state

### 69. When to use global state?

Use global state when many parts of app need same data.

Examples:

- authenticated account
- user list
- teams
- skills
- notifications/toasts

### 70. What is Redux?

Redux is a predictable state management library.

It stores app state in a central store.

Core ideas:

- store
- actions
- reducers
- dispatch
- selectors

### 71. What is Redux Toolkit?

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

### 72. What is Thunk in Redux?
In Redux Toolkit (RTK), a thunk is a function that contains delayed, asynchronous logic. Because a standard Redux store can only handle synchronous data flow, Redux Toolkit automatically includes the Redux Thunk middleware by default to let you perform side effects like fetching API data.

- How createAsyncThunk Works
When you create an async thunk, you provide an action type prefix and a payload creator function that returns a Promise. The thunk then automatically generates and dispatches three separate lifecycle actions:

- pending: Dispatched immediately when the thunk starts running.

- fulfilled: Dispatched if the Promise resolves successfully with data.

- rejected: Dispatched if the Promise fails or rejects.

### 73. Difference between Thunk and Saga in Redux?

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

### 74. What is reducer?

Reducer is a pure function that calculates next state from current state and action.

Concept:

```ts
nextState = reducer(currentState, action);
```

### 75. What is action?

An action is an object describing what happened.

Example:

```ts
{
  type: 'users/createUser',
  payload: user
}
```

### 76. What is dispatch?

Dispatch sends an action to Redux store.

Example:

```tsx
dispatch(fetchUsers());
```

### 77. What is selector?

Selector reads data from Redux state.

Example:

```ts
const selectUsers = (state: RootState) => state.users.items;
```

Usage:

```tsx
const users = useAppSelector(selectUsers);
```

### 78. What is createAsyncThunk?

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

### 79. What is Redux middleware?

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

### 80. What is Immer?

Immer lets us write mutable-looking reducer code while keeping state immutable internally.

Example:

```ts
state.items.push(user);
```

Redux Toolkit uses Immer behind the scenes.

### 81. What is selector stability warning?

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

### 82. How to secure the React APP?
Securing a React app requires layers of protection at both the client level and the server level. The most critical step is preventing Cross-Site Scripting (XSS) by allowing React to auto-escape data, avoiding dangerouslySetInnerHTML, and sanitizing user inputs. Always treat the frontend as untrusted.

- Prevent Cross-Site Scripting (XSS)
- Protect Environment Variables & Secrets
- Implement Robust Authentication[JWT]
- Rely on the Backend for Security
- Keep Dependencies Updated [Vulnerability]

### 83. How to optimize React performance?

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

### 84. What is React.memo?

`React.memo` prevents re-render if props did not change.

Example:

```tsx
const UserRow = React.memo(({ user }: { user: User }) => {
  return <tr>{user.name}</tr>;
});
```

Useful for expensive child components.

### 85. React.memo vs useMemo?

`React.memo` memoizes a component render based on props.

`useMemo` memoizes a calculated value inside a component.

### 86. What causes unnecessary re-render?

Common causes:

- parent re-render
- new object/array/function references
- global state changes
- context value changes
- selector returning new array/object every time
- unstable keys

### 87. Difference between `npm create vite@latest my-react-app -- --template react` and `npx create-react-app my-react-app`?

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

### 88. What happens behind the scenes when we create a React project using Vite or Create React App?

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

### 89. What is the new root API using `createRoot` in React 18?

React 18 introduced the new root API using `createRoot`.

Before React 18, apps commonly used:

```tsx
ReactDOM.render(<App />, document.getElementById('root'));
```

In React 18 and newer, we use:

```tsx
import { createRoot } from 'react-dom/client';
```

This modern root API enables React 18 features like:

- automatic batching
- concurrent rendering foundation
- better scheduling
- modern hydration/rendering behavior

Core implementation:

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const domNode = document.getElementById('root');

if (!domNode) {
  throw new Error('Root element not found');
}

const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

What happens here:

```text
Find root DOM node
-> create React root container
-> render App inside that root
```

#### Difference from legacy `ReactDOM.render`

Legacy API:

```tsx
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));
```

Modern API:

```tsx
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
```

Comparison:

| Point | Legacy `ReactDOM.render` | Modern `createRoot` |
|---|---|---|
| React version | React 17 and older style | React 18+ |
| Root creation | Container passed directly to render | Root object is created first |
| Concurrent features | Not enabled | Enabled |
| Render callback | Supported | Removed |
| SSR hydration | Used `hydrate` separately | Use `hydrateRoot` |

#### Callback removal

Old API allowed an optional callback:

```tsx
ReactDOM.render(<App />, container, () => {
  console.log('Rendered');
});
```

In React 18 `createRoot`, this callback is removed because modern rendering can be asynchronous and timing can be unpredictable with Suspense/concurrent features.

Use effects inside components instead:

```tsx
useEffect(() => {
  console.log('App mounted');
}, []);
```

#### Hydration separation

For normal client-side rendering:

```tsx
createRoot(rootElement).render(<App />);
```

For server-side rendered apps:

```tsx
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(rootElement, <App />);
```

Important:

```text
Use createRoot for client-side rendering.
Use hydrateRoot for server-rendered HTML.
```

#### Important constraints

- call `createRoot` only once for the same DOM node
- do not call `createRoot` repeatedly during re-renders
- keep the root object if you need to unmount later
- use `root.unmount()` to remove the React tree cleanly

Unmount example:

```tsx
root.unmount();
```

Interview answer:

```text
createRoot is the React 18 root API used to mount a React application. Instead of calling ReactDOM.render directly, we first create a root object using createRoot(container), then call root.render(<App />). This enables React 18 features like automatic batching and concurrent rendering foundation. For SSR, we should use hydrateRoot instead of createRoot.
```

### 90. How can we render multiple separate React roots on a single web page?

We can render multiple separate React roots by calling `createRoot` independently for each target DOM container.

This is useful when:

- adding React widgets to an existing non-React page
- building micro-frontends
- injecting independent UI islands
- migrating a legacy app to React slowly
- rendering separate dashboard widgets

Example HTML:

```html
<div id="global-header"></div>
<main>Static or legacy HTML content</main>
<div id="sidebar-widget"></div>
```

Core implementation:

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import HeaderComponent from './HeaderComponent';
import SidebarWidget from './SidebarWidget';

const headerContainer = document.getElementById('global-header');
const sidebarContainer = document.getElementById('sidebar-widget');

if (headerContainer) {
  const headerRoot = createRoot(headerContainer);
  headerRoot.render(<HeaderComponent />);
}

if (sidebarContainer) {
  const sidebarRoot = createRoot(sidebarContainer);
  sidebarRoot.render(<SidebarWidget />);
}
```

#### Key architectural behavior

Each root is a separate React application tree.

That means:

- each root has its own render lifecycle
- each root has isolated component state
- each root has its own Context tree
- one root re-rendering does not automatically re-render another root
- React Context does not cross root boundaries

Example:

```text
Header root updates
-> Header root re-renders
-> Sidebar root does not re-render
```

#### Event bubbling

Browser DOM events still bubble normally through the DOM.

Example:

```text
Click inside sidebar root
-> event bubbles through sidebar container
-> event can continue to parent DOM nodes
```

But React state/context is still separate between roots.

#### Cross-root communication strategies

Because separate roots cannot share one React Context provider directly, use external communication strategies.

Common options:

- Custom DOM Events
- external state store like Zustand, Redux, or Nanostores
- browser storage events
- URL/query params
- shared backend/API state
- global functions only when necessary

Custom DOM Event example:

```tsx
window.dispatchEvent(
  new CustomEvent('cart:update', {
    detail: { totalItems: 3 },
  })
);
```

Listening in another root:

```tsx
useEffect(() => {
  function handleCartUpdate(event) {
    console.log(event.detail.totalItems);
  }

  window.addEventListener('cart:update', handleCartUpdate);

  return () => {
    window.removeEventListener('cart:update', handleCartUpdate);
  };
}, []);
```

Interview answer:

```text
To render multiple React roots on one page, we call createRoot separately for each DOM container. Each root is isolated, with its own state, context, and lifecycle. This is useful for widgets, micro-frontends, or gradual migration from legacy apps. If roots need to communicate, we use external stores, custom DOM events, URL state, or backend state because React Context does not cross root boundaries.
```

### 91. How do we implement Micro-Frontend Architecture in React?

Micro-frontend architecture means splitting a frontend application into smaller independently owned and independently deployable frontend apps.

Simple meaning:

```text
Microservices split backend by business domain.
Micro-frontends split frontend by business domain.
```

Example domains:

- Auth app
- Dashboard app
- User management app
- Billing app
- Reports app

Each micro-frontend can be owned by a different team and can be built/deployed independently.

#### Common implementation approaches

| Approach | Meaning |
|---|---|
| Build-time integration | Apps are imported during build |
| Runtime integration | Apps are loaded dynamically in browser |
| Module Federation | Webpack/Vite plugin exposes and consumes remote modules |
| iframe-based | Each app runs inside iframe |
| Web Components | Micro-apps expose custom elements |
| Multiple React roots | Different roots mounted into different DOM nodes |

#### Basic shell/container architecture

```text
Shell App
  -> handles routing/layout/auth
  -> loads Auth micro-frontend
  -> loads Dashboard micro-frontend
  -> loads Billing micro-frontend
```

Shell example:

```tsx
function AppShell() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardApp />} />
        <Route path="/billing/*" element={<BillingApp />} />
        <Route path="/users/*" element={<UserManagementApp />} />
      </Routes>
    </Layout>
  );
}
```

#### Multiple roots approach

For simple micro-frontend/widget scenarios, each micro-app can mount itself into its own DOM node:

```tsx
import { createRoot } from 'react-dom/client';
import BillingWidget from './BillingWidget';

const container = document.getElementById('billing-widget');

if (container) {
  createRoot(container).render(<BillingWidget />);
}
```

#### Communication between micro-frontends

Micro-frontends should avoid tight coupling.

Common communication options:

- URL state for route-level communication
- shared backend APIs
- shared auth token/session
- custom browser events
- external state store if apps run in the same page
- message bus/event bus

Example with custom event:

```tsx
window.dispatchEvent(
  new CustomEvent('user:changed', {
    detail: { userId: 'U101' },
  })
);
```

#### Shared concerns

Micro-frontends need clear standards for:

- authentication
- routing
- design system
- shared dependencies
- error handling
- logging/monitoring
- deployment/versioning
- performance budgets

#### Benefits

- independent team ownership
- independent deployment
- easier scaling for large organizations
- isolated business domains
- gradual migration from legacy frontend

#### Challenges

- more architecture complexity
- shared dependency/version conflicts
- duplicated bundle size
- routing coordination
- cross-app communication
- consistent design system
- testing and monitoring across apps

When to use:

```text
Use micro-frontends for large products with multiple teams and independent release needs.
Do not use micro-frontends for small or medium apps where normal modular React architecture is enough.
```

Interview answer:

```text
Micro-frontend architecture splits a large frontend into smaller independently owned and deployable applications. A shell/container app usually handles layout, routing, authentication, and loads domain-specific micro-apps like dashboard, billing, or users. Communication should happen through URL state, browser events, shared APIs, or external stores. It is useful for large teams and large products, but it adds complexity, so I would not use it for small apps.
```

### 92. What is Suspense and what is the use of Suspense?

`Suspense` is a React component that lets us show fallback UI while part of the UI is not ready yet.

Most common use:

- lazy loading components
- showing loader while a code chunk is loading
- waiting for async data in frameworks/libraries that support Suspense

Example with lazy loading:

```tsx
import { lazy, Suspense } from 'react';

const AdminPage = lazy(() => import('./AdminPage'));

function App() {
  return (
    <Suspense fallback={<p>Loading admin page...</p>}>
      <AdminPage />
    </Suspense>
  );
}
```

How it works:

```text
AdminPage code is not loaded yet
-> Suspense shows fallback
-> AdminPage code finishes loading
-> Suspense replaces fallback with AdminPage
```

Important points:

- `Suspense` is not an error handler.
- For errors, use Error Boundary.
- `Suspense` is commonly used with `React.lazy`.
- The fallback should be small and useful.

Interview answer:

```text
Suspense is used to show fallback UI while a component or resource is not ready. In normal React apps, it is commonly used with React.lazy for lazy loading components. While the lazy component is loading, Suspense shows a loader, and once the component code is loaded, React renders the actual component.
```

### 93. How to avoid new object prop each render?

Bad:

```tsx
<Table filters={{ status: 'active' }} />
```

Good:

```tsx
const filters = useMemo(() => ({ status: 'active' }), []);

<Table filters={filters} />;
```

### 94. When should we use Lazy Loading in React?

Lazy loading means loading a component only when it is needed instead of loading it in the initial JavaScript bundle.

Use lazy loading when:

- a page is not needed on initial load
- a component is heavy
- a route is visited only sometimes
- a modal, chart, editor, or admin page is rarely opened
- you want to reduce initial bundle size
- you want the first page load to be faster

Example:

```tsx
import { lazy, Suspense } from 'react';

const AdminPage = lazy(() => import('./AdminPage'));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AdminPage />
    </Suspense>
  );
}
```

Route-based lazy loading example:

```tsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Reports = lazy(() => import('./pages/Reports'));

function AppRoutes() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Suspense>
  );
}
```

When not to use lazy loading:

- for very small components
- for components needed immediately on first screen
- when lazy loading creates too many tiny network requests

Interview answer:

```text
We should use lazy loading for components or routes that are not required immediately, especially heavy or rarely used parts like admin pages, reports, charts, editors, or modals. It helps reduce the initial bundle size and improves first load performance. In React, lazy loading is usually done with React.lazy and Suspense.
```

### 95. Difference between Suspense and Manual Loader?

Both `Suspense` and manual loaders show loading UI, but they are used for different waiting situations.

`Suspense` is used when React is waiting for a component or supported resource to become ready.

Manual loader is used when we manually manage loading state, usually for API calls.

Suspense example:

```tsx
const ProfilePage = lazy(() => import('./ProfilePage'));

function App() {
  return (
    <Suspense fallback={<p>Loading profile page...</p>}>
      <ProfilePage />
    </Suspense>
  );
}
```

Manual loader example:

```tsx
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return <UserList users={users} />;
}
```

Comparison:

| Point | Suspense | Manual Loader |
|---|---|---|
| Loading state | Managed by React boundary | Managed by our state |
| Common use | Lazy component loading | API calls with `useEffect` |
| Example | `React.lazy` | `loading` state |
| Fallback | `fallback` prop | Conditional rendering |
| Error handling | Needs Error Boundary | Usually handled with `error` state |

Interview answer:

```text
Suspense shows fallback UI while a lazy component or supported async resource is not ready. Manual loader means we create our own loading state, usually for API calls. Suspense is declarative and boundary-based, while manual loaders are state-based and controlled by our component logic.
```

### 96. What is code splitting?

Code splitting breaks app bundle into smaller chunks.

Benefits:

- faster initial load
- load feature code only when needed

### 97. What is list virtualization?

Virtualization renders only visible rows in a large list.

Useful for:

- thousands of rows
- large tables
- chat messages

Libraries:

- `react-window`
- `react-virtualized`

## API Calls

### 98. Where should API calls be made?

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

### 99. How to fetch data in useEffect?

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

### 100. Why avoid directly making useEffect callback async?

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

### 101. How to handle loading and error state?

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

### 102. How to cancel API request?

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

### 102A. Suppose a user searches quickly and multiple search APIs are triggered. How do you prevent stale results from being displayed?

This is a frontend race condition.

Example:

```text
User types "r"
  -> search API 1 starts
User types "re"
  -> search API 2 starts
API 2 finishes first
  -> UI shows correct "re" result
API 1 finishes later
  -> old "r" result overwrites the UI
```

Interview answer:

```text
I prevent stale search results by cancelling the previous request using AbortController, or by tracking the latest request id and ignoring older responses. I also debounce the search input so fewer requests are fired. The key rule is: only the latest search response should be allowed to update the UI.
```

#### Best approach: cancel previous request

For `fetch`, use `AbortController` in the effect cleanup.

```tsx
function SearchUsers({ query }: { query: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    const controller = new AbortController();

    async function searchUsers() {
      try {
        setLoading(true);

        const response = await fetch(`/api/users/search?q=${query}`, {
          signal: controller.signal,
        });

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.error('Search failed', error);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    searchUsers();

    return () => {
      controller.abort();
    };
  }, [query]);

  return loading ? <p>Searching...</p> : <UsersList users={users} />;
}
```

When `query` changes, React runs the cleanup for the previous effect first. That aborts the previous request before starting the next one.

#### Alternative: ignore old responses using request id

Use this when the request cannot be cancelled, or when using a client that does not support cancellation.

```tsx
function SearchUsers({ query }: { query: string }) {
  const latestRequestId = useRef(0);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    const requestId = latestRequestId.current + 1;
    latestRequestId.current = requestId;

    async function searchUsers() {
      const data = await usersApi.search(query);

      if (requestId !== latestRequestId.current) {
        return;
      }

      setUsers(data);
    }

    searchUsers();
  }, [query]);

  return <UsersList users={users} />;
}
```

Here, an older response can still finish, but it cannot update the UI because its request id is no longer the latest.

#### Also use debounce

Debounce reduces unnecessary API calls while the user is typing.

```text
Debounce reduces API traffic.
AbortController/request id prevents stale UI.
```

Strong final answer:

```text
For fast search, I debounce the input to reduce API calls and handle race conditions by cancelling the previous request with AbortController. If cancellation is not possible, I store a latest request id in a ref and update state only when the response belongs to the latest request. This ensures older responses cannot overwrite newer search results.
```

## Authentication in React

### 103. How does React know user is logged in?

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

### 104. Can React read HTTP-only cookie?

No.

HTTP-only cookie cannot be read using JavaScript.

Frontend checks auth by calling backend session API.

Example:

```text
GET /api/auth/session
```

### 105. Why use credentials: include?

In fetch:

```ts
credentials: 'include'
```

This tells browser to include cookies in API requests.

In this app:

```text
frontend/src/services/http.ts
```

### 106. How protected route works in this app?

Concept:

```tsx
if (authStatus !== 'authenticated') {
  return <Navigate to="/signin" />;
}

return children;
```

The route guard uses Redux auth state.

### 107. How role-based UI works?

Example:

```tsx
account?.role === 'admin' ? <AdminSettingsPage /> : <Navigate to="/" />
```

Important:

Frontend role checks improve UX but are not security by themselves.

Backend must also enforce authorization.

## TypeScript With React

### 108. Why use TypeScript with React?

Benefits:

- catches mistakes early
- typed props
- typed API responses
- better autocomplete
- safer refactoring

### 109. How to type component props?

```tsx
type UserCardProps = {
  name: string;
  email: string;
};

const UserCard = ({ name, email }: UserCardProps) => {
  return <p>{name} - {email}</p>;
};
```

### 110. How to type useState?

```tsx
const [user, setUser] = useState<User | null>(null);
```

For inferred values:

```tsx
const [count, setCount] = useState(0);
```

### 111. How to type event handlers?

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

### 112. How to type useRef?

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

Use:

```tsx
inputRef.current?.focus();
```

## React Patterns

### 113. What is composition?

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

### 114. What are Higher-Order Components (HOCs)?

A Higher-Order Component, or HOC, is a function that takes a component as input and returns a new enhanced component.

Simple definition:

```text
HOC = function that receives a component and returns another component with extra behavior.
```

Basic syntax:

```tsx
const EnhancedComponent = higherOrderComponent(OriginalComponent);
```

HOCs are used when we want to reuse component logic across multiple components, such as:

- authentication checks
- role-based access
- loading state handling
- logging
- analytics tracking
- adding common props
- permission-based rendering

Example: `withAuth` HOC

```tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

type User = {
  id: string;
  name: string;
};

type WithAuthProps = {
  user: User | null;
};

function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P & WithAuthProps) {
    const { user, ...restProps } = props;

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...(restProps as P)} />;
  };
}
```

Using the HOC:

```tsx
type DashboardProps = {
  title: string;
};

function Dashboard({ title }: DashboardProps) {
  return <h1>{title}</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);

export default function App() {
  const user = { id: '1', name: 'Paras' };

  return <ProtectedDashboard user={user} title="Dashboard" />;
}
```

If `user` exists, it renders:

```tsx
<Dashboard title="Dashboard" />
```

If `user` is `null`, it redirects:

```tsx
<Navigate to="/login" replace />
```

Important points:

- HOCs do not modify the original component.
- HOCs return a new component.
- HOCs are based on composition.
- HOC names usually start with `with`, like `withAuth`, `withLogger`, `withRole`.
- In modern React, many HOC use cases can also be solved with custom hooks.

HOC vs custom hook:

| Topic | HOC | Custom Hook |
|---|---|---|
| What it reuses | Component behavior/wrapping | Stateful logic |
| Input | Component | Values/functions |
| Output | New component | Data/functions |
| Example | `withAuth(Component)` | `useAuth()` |

Interview answer:

```text
A Higher-Order Component is a function that takes a component and returns a new component with extra behavior. It is useful for reusing common component logic like authentication, permissions, logging, or loading UI. HOCs follow composition and do not mutate the original component. In modern React, custom hooks are often preferred for sharing stateful logic, but HOCs are still important to understand.
```

### 115. Controlled modal pattern?

Parent controls open/close state.

```tsx
const [isOpen, setIsOpen] = useState(false);

{isOpen ? <Modal onClose={() => setIsOpen(false)} /> : null}
```

### 116. Container vs presentational components?

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

### 117. What is children prop?

`children` lets component render nested content.

Example:

```tsx
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};
```

## Error Handling

### 118. What is Error Boundary?

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

### 119. How to handle API errors?

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

### 120. What is StrictMode?

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

### 121. Why does useEffect run twice in development?

Because React StrictMode intentionally mounts/unmounts/remounts components in development to detect unsafe effects.

Production does not behave the same way.

### 122. Why not update state directly?

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

### 123. Why state should be immutable?

Immutability helps React detect changes and makes updates predictable.

### 124. Why component names should start with capital letter?

React treats lowercase tags as HTML elements.

Good:

```tsx
<UserCard />
```

Bad:

```tsx
<userCard />
```

### 125. Why hooks cannot be conditional?

React relies on hook call order.

If hooks are conditional, order can change between renders and React cannot match hook state correctly.

### 126. What is stale closure?

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

### 127. Why use functional state update?

Use when new state depends on previous state.

```tsx
setCount((current) => current + 1);
```

This avoids stale state issues.

### 128. Why not use array index as key?

Index key can break UI when list order changes.

Problems:

- wrong item state
- incorrect animations
- inefficient updates

Use stable ID instead.

### 129. What is client-side rendering?

Client-side rendering means browser receives minimal HTML and JavaScript builds the UI in the browser.

Vite React apps are usually client-side rendered.

## Testing

### 130. What should we test in React?

Test user behavior, not implementation details.

Examples:

- form validation
- button click
- API success/error state
- route protection
- role-based UI

### 131. What is React Testing Library?

React Testing Library helps test components from user perspective.

Example:

```tsx
expect(screen.getByRole('button', { name: /save/i })).toBeDisabled();
```

## React App Architecture

### 132. How is this app structured?

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

### 133. What is feature-based folder structure?

Feature-based structure groups code by business feature instead of file type.

Example:

```text
features/users/UserManagementPage.tsx
features/users/usersSlice.ts
features/users/usersApi.ts
features/users/types.ts
```

This is better for medium/large apps.

### 134. What is reusable component?

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

### 135. How does auth bootstrap work in this app?

On app load:

```tsx
if (authStatus === 'idle') {
  dispatch(bootstrapAuth());
}
```

Frontend calls backend session API.

If cookie is valid, user becomes authenticated.

If not, user is unauthenticated.

### 136. How does session refresh work in this app?

The app listens to user activity and periodically verifies/refreshes session.

Concept:

```text
User active -> refresh session
No activity -> verify session without extending it
```

### 137. How does role-based UI work in this app?

Admin route is visible only when:

```tsx
account?.role === 'admin'
```

But backend also enforces authorization.

Important interview answer:

```text
Frontend role checks are for UX. Backend authorization is the real security.
```

### 138. How are API calls centralized?

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

### 139. How are toasts handled?

This app uses Redux listener middleware.

When async actions succeed/fail, middleware dispatches toast notifications.

This keeps toast logic centralized instead of duplicating it in every component.

## Most Important Short Answers

### 140. React in one line

```text
React is a JavaScript library for building reusable, state-driven UI components.
```

### 141. Component in one line

```text
A component is a reusable function/class that returns UI.
```

### 142. Props in one line

```text
Props are read-only inputs passed from parent to child.
```

### 143. State in one line

```text
State is component-managed data that triggers re-render when changed.
```

### 144. useEffect in one line

```text
useEffect runs side effects after render and can clean them up.
```

### 145. useLayoutEffect in one line

```text
useLayoutEffect runs after DOM updates but before browser paint, mainly for layout measurement or pre-paint visual fixes.
```

### 146. useTransition in one line

```text
useTransition marks expensive state updates as non-urgent so urgent UI like typing can stay responsive.
```

### 147. useDeferredValue in one line

```text
useDeferredValue defers a fast-changing value so expensive rendering can update later without blocking urgent UI.
```

### 148. Virtual DOM in one line

```text
Virtual DOM is a lightweight representation of UI used to calculate efficient real DOM updates.
```

### 149. Redux in one line

```text
Redux is a centralized state management library where state changes through actions and reducers.
```

### 150. React Router in one line

```text
React Router maps URL paths to React components.
```

### 151. Controlled component in one line

```text
A controlled component is a form element whose value is controlled by React state.
```

### 152. Custom hook in one line

```text
A custom hook is a reusable function that uses React hooks to share stateful logic.
```

## Quick Revision Map

### Must Know

Revise these first:

- React basics: component, JSX, props, state
- rendering and re-rendering
- state batching and functional updates
- `useState`
- `useEffect`
- dependency arrays
- cleanup functions
- `useRef`
- `useMemo`
- `useCallback`
- `React.memo`
- shallow vs deep comparison
- list keys
- controlled vs uncontrolled forms
- API calls and cleanup with `AbortController`
- routing and protected routes
- Redux Toolkit basics
- Context API and re-render behavior

### Frequently Asked

Revise these after the Must Know list:

- React 18 vs React 19
- React 19 `use()` API
- `useLayoutEffect`
- `useTransition`
- `useDeferredValue`
- `useId`
- custom hooks
- `useReducer`
- prop drilling and lifting state up
- code splitting
- lazy loading
- Suspense
- Suspense vs manual loader
- error boundaries
- StrictMode
- stale closure
- functional state update
- avoiding new object/function props

### Advanced

Revise these for deeper rounds:

- React Fiber
- React Compiler
- reconciliation
- hydration
- hydration mismatch
- SSR vs CSR
- server component vs client component
- performance profiling
- React Query vs RTK Query
- accessibility in React
- Higher-Order Components
- portals
- route change during API call
- component unmount before API response

### Low Priority

Revise these after the above topics:

- detailed Vite vs Create React App setup
- Webpack vs Babel
- low-priority SSR edge cases
- extra architecture questions specific to this app

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

Use this section for deeper explanations after you understand the short answers above.

The main numbered section is for quick interview answers.

The deep section is for:

- explaining internals
- answering follow-up questions
- understanding real-world behavior
- preparing for senior-level React discussions

Do not skip the short answers. In interviews, start with the short answer first, then expand using the deep explanation if the interviewer asks follow-up questions.

This section is for deeper interview answers. The goal is not only to define each concept, but to explain how React thinks internally and what mistakes developers usually make.

### 1. Rendering Cycle

Interview answer:

```text
Rendering in React means React calls a component function to calculate what the UI should look like for the current props, state, and context. A render does not always mean the real DOM changes. After rendering, React compares the new UI description with the previous one, then commits only the required changes to the real DOM.
```

Rendering has two important parts:

- render phase: React calls components and creates the next React element tree.
- commit phase: React applies the necessary changes to the real DOM and runs effects.

#### Render phase vs Commit phase

Render phase is the calculation phase.

React asks:

```text
What should the UI look like now?
```

During render phase:

- React calls component functions
- React reads props and state
- React creates React elements
- React compares new tree with old tree
- React decides what needs to change
- React should not touch the real DOM yet

Commit phase is the application phase.

React applies the result of render to the real browser DOM.

During commit phase:

- React updates the real DOM
- React updates refs
- `useLayoutEffect` runs before browser paint
- browser paints the updated UI
- `useEffect` runs after browser paint

Comparison:

| Point | Render phase | Commit phase |
|---|---|---|
| Main job | Calculate next UI | Apply changes |
| Calls component function? | Yes | No |
| Updates real DOM? | No | Yes |
| Runs `useEffect`? | No | After commit |
| Runs `useLayoutEffect`? | No | During commit before paint |
| Can be interrupted? | Yes in concurrent rendering | No |
| Should be pure? | Yes | Effects/DOM work happen here |

Flow:

```text
State/props change
-> render phase calculates new UI
-> reconciliation finds differences
-> commit phase updates DOM
-> browser paints
-> useEffect runs
```

Important interview point:

```text
React may render without committing if the work is abandoned, interrupted, or produces no DOM changes. That is why render logic must be pure and should not perform side effects.
```

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

#### What are cleanup functions for refs?

In React 19, callback refs can return a cleanup function.

This is useful when a ref callback sets up something related to a DOM node and we need to clean it up when the node is removed.

Before this, cleanup was usually handled separately with `useEffect`.

Basic callback ref:

```tsx
function SearchBox() {
  return (
    <input
      ref={(node) => {
        if (node) {
          node.focus();
        }
      }}
    />
  );
}
```

React 19 callback ref cleanup:

```tsx
function ResizeLogger() {
  return (
    <div
      ref={(node) => {
        if (!node) {
          return;
        }

        const observer = new ResizeObserver(() => {
          console.log('Element resized');
        });

        observer.observe(node);

        return () => {
          observer.disconnect();
        };
      }}
    >
      Resize me
    </div>
  );
}
```

What happens here:

```text
DOM node is attached
-> ref callback runs
-> ResizeObserver starts observing
-> DOM node is removed
-> cleanup function runs
-> observer disconnects
```

Old approach with `useEffect`:

```tsx
function ResizeLogger() {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    const observer = new ResizeObserver(() => {
      console.log('Element resized');
    });

    observer.observe(divRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={divRef}>Resize me</div>;
}
```

When cleanup functions for refs are useful:

- attaching DOM observers
- setting up third-party widgets
- subscribing to DOM-level events
- measuring or tracking DOM nodes
- cleaning up when a DOM node is removed

Important points:

- This is related to callback refs, not `useRef.current` assignment.
- The cleanup runs when the ref is detached.
- It helps keep setup and cleanup close together.
- For normal values that do not touch the DOM, `useRef` cleanup is not needed.
- For general side effects not directly tied to a DOM node, `useEffect` is still a good choice.

Interview answer:

```text
In React 19, a callback ref can return a cleanup function. This lets us set up logic when a DOM node is attached and clean it up when that node is removed. It is useful for DOM observers, third-party widgets, and DOM event subscriptions. It keeps ref setup and cleanup together, but normal useRef values do not need cleanup.
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

#### What does it mean that `<Context>` can be used directly as a provider?

In React 19, a Context object can be used directly as a provider.

Before React 19, we usually wrote:

```tsx
<ThemeContext.Provider value="dark">
  <Layout />
</ThemeContext.Provider>
```

In React 19, we can write:

```tsx
<ThemeContext value="dark">
  <Layout />
</ThemeContext>
```

Both examples provide the `dark` value to child components that read the context.

Full example:

```tsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext value="dark">
      <Header />
    </ThemeContext>
  );
}

function Header() {
  const theme = useContext(ThemeContext);

  return <h1>Current theme: {theme}</h1>;
}
```

Important points:

- This is a React 19 improvement.
- The older `<ThemeContext.Provider>` syntax still works.
- `useContext(ThemeContext)` is still used to read the value.
- The direct `<ThemeContext>` syntax is shorter and cleaner.
- The `value` prop is still required.

React 18 style:

```tsx
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>
```

React 19 style:

```tsx
<ThemeContext value={theme}>
  <App />
</ThemeContext>
```

Interview answer:

```text
In React 19, the Context object itself can be used directly as a provider. Instead of writing <ThemeContext.Provider value={theme}>, we can write <ThemeContext value={theme}>. It is mainly a cleaner syntax improvement. Consumers still read the value using useContext(ThemeContext), and the old Provider syntax still works.
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

## React 19 Features

This section covers important React 19 features with legacy comparison, new syntax, examples, and interview-ready explanations.

### 1. What are Actions for async form/state updates in React 19?

Actions are functions that handle async updates, usually from forms or transitions.

They help React manage:

- pending state
- form submission
- optimistic updates
- errors
- automatic form reset after successful action

#### Legacy approach before React 19

Before React 19, we usually handled form submission manually:

```tsx
import { useState } from 'react';

function UpdateName() {
  const [name, setName] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const nextName = String(formData.get('name'));

    try {
      await updateUserName(nextName);
      setName(nextName);
    } catch {
      setError('Failed to update name');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" />
      <button disabled={pending}>Save</button>
      {error ? <p>{error}</p> : null}
      <p>{name}</p>
    </form>
  );
}
```

#### React 19 Action approach

In React 19, a form can receive an async function through the `action` prop:

```tsx
import { useState } from 'react';

function UpdateName() {
  const [name, setName] = useState('');

  async function submitAction(formData: FormData) {
    const nextName = String(formData.get('name'));

    await updateUserName(nextName);
    setName(nextName);
  }

  return (
    <form action={submitAction}>
      <input name="name" />
      <button type="submit">Save</button>
      <p>{name}</p>
    </form>
  );
}
```

#### Main difference

| Legacy | React 19 Actions |
|---|---|
| Use `onSubmit` manually | Use `action` function |
| Manually call `event.preventDefault()` | React handles form submission |
| Manually create `FormData` | Action receives `FormData` |
| Manually manage pending/error state | Works well with `useActionState` and `useFormStatus` |

Interview answer:

```text
Actions in React 19 let us pass async functions to forms or transitions. They simplify async form/state updates by letting React coordinate submission, pending states, errors, and UI updates. Instead of manually handling onSubmit, preventDefault, FormData, and loading state, we can use form action functions with hooks like useActionState and useFormStatus.
```

### 2. What is `useOptimistic` in React 19?

`useOptimistic` lets the UI show an expected result immediately before the server confirms the change.

It is useful for:

- comments
- likes
- chat messages
- todo creation
- fast-feeling form submissions

#### Legacy approach

Without optimistic UI, the user waits for the API response:

```tsx
async function handleLike() {
  await likePost(postId);
  setLikes((prev) => prev + 1);
}
```

The UI updates only after the server responds.

#### React 19 `useOptimistic` approach

```tsx
import { useOptimistic } from 'react';

function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (currentLikes) => currentLikes + 1
  );

  async function likeAction() {
    addOptimisticLike(null);
    await likePost();
  }

  return (
    <form action={likeAction}>
      <button type="submit">Like</button>
      <p>{likes} likes</p>
    </form>
  );
}
```

#### Example with comments

```tsx
import { useOptimistic } from 'react';

type Comment = {
  id: string;
  text: string;
  pending?: boolean;
};

function CommentList({ comments }: { comments: Comment[] }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, text: string) => [
      ...currentComments,
      {
        id: crypto.randomUUID(),
        text,
        pending: true,
      },
    ]
  );

  async function submitAction(formData: FormData) {
    const text = String(formData.get('comment'));

    addOptimisticComment(text);
    await saveComment(text);
  }

  return (
    <>
      <form action={submitAction}>
        <input name="comment" />
        <button type="submit">Post</button>
      </form>

      {optimisticComments.map((comment) => (
        <p key={comment.id}>
          {comment.text} {comment.pending ? '(sending...)' : null}
        </p>
      ))}
    </>
  );
}
```

Interview answer:

```text
useOptimistic lets us show an optimistic UI update before the server confirms the result. It improves perceived performance. For example, a comment can appear immediately with a sending state while the API request is still pending.
```

### 3. What is `useActionState` in React 19?

`useActionState` helps manage state returned from an Action.

It is useful for form submissions that need:

- success message
- error message
- validation errors
- pending state
- returned server/action state

#### Legacy approach

Before React 19, we often used multiple `useState` values:

```tsx
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
const [pending, setPending] = useState(false);
```

#### React 19 `useActionState` approach

```tsx
import { useActionState } from 'react';

type FormState = {
  message: string;
};

async function updateNameAction(
  previousState: FormState,
  formData: FormData
) {
  const name = String(formData.get('name'));

  if (!name) {
    return { message: 'Name is required' };
  }

  await updateUserName(name);

  return { message: 'Name updated successfully' };
}

function UpdateName() {
  const [state, formAction, isPending] = useActionState(
    updateNameAction,
    { message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" />
      <button disabled={isPending}>Save</button>
      <p>{state.message}</p>
    </form>
  );
}
```

#### Main difference

| Legacy | React 19 `useActionState` |
|---|---|
| Multiple local states | One action state |
| Manual pending state | `isPending` provided |
| Manual submit handler | `formAction` handles submission |
| More boilerplate | Cleaner form flow |

Interview answer:

```text
useActionState is used with React 19 Actions to manage the result of an async form action. It returns the latest action state, a form action function, and pending status. It is useful for validation messages, success messages, and form submission state.
```

### 4. What is `useFormStatus` in React 19?

`useFormStatus` reads the status of the nearest parent form submission.

It is useful when a child button component needs to know whether the form is currently submitting.

#### Legacy approach

Before React 19, pending state was passed manually:

```tsx
function SubmitButton({ pending }: { pending: boolean }) {
  return <button disabled={pending}>Submit</button>;
}
```

#### React 19 `useFormStatus` approach

```tsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}

function ProfileForm() {
  async function submitAction(formData: FormData) {
    await updateProfile(formData);
  }

  return (
    <form action={submitAction}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}
```

Important:

```text
useFormStatus must be used inside a child component of the form.
It reads the status of the nearest parent form.
```

Interview answer:

```text
useFormStatus gives information about the nearest parent form submission, such as pending status. It is useful for reusable submit buttons because the button can disable itself or show loading text without receiving pending as a prop.
```

### 5. What is the `use()` API for reading Promises and Context?

The React 19 `use()` API lets us read a resource during render.

It can read:

- Promise
- Context

Unlike normal hooks, `use()` can be called inside conditions and loops.

#### Reading a Promise

```tsx
import { Suspense, use } from 'react';

const userPromise = fetch('/api/user').then((res) => res.json());

function UserProfile() {
  const user = use(userPromise);

  return <h1>{user.name}</h1>;
}

export default function App() {
  return (
    <Suspense fallback={<p>Loading user...</p>}>
      <UserProfile />
    </Suspense>
  );
}
```

When the Promise is pending:

```text
component suspends
-> Suspense fallback shows
-> Promise resolves
-> component renders with data
```

#### Reading Context conditionally

```tsx
import { createContext, use } from 'react';

const ThemeContext = createContext('light');

function Button({ showTheme }: { showTheme: boolean }) {
  if (showTheme) {
    const theme = use(ThemeContext);
    return <button className={theme}>Save</button>;
  }

  return <button>Save</button>;
}
```

#### Legacy comparison

Legacy data fetching:

```tsx
useEffect(() => {
  fetch('/api/user')
    .then((res) => res.json())
    .then(setUser);
}, []);
```

React 19 `use()`:

```tsx
const user = use(userPromise);
```

Interview answer:

```text
The React 19 use() API lets components read Promises or Context during render. When reading a Promise, React suspends the component until the Promise resolves, so we use Suspense for fallback UI. Unlike normal hooks, use() can be called conditionally or inside loops.
```

### 6. How can `ref` be passed as a normal prop in React 19?

In React 19, `ref` can be passed as a normal prop to function components.

Before React 19, function components needed `forwardRef`.

#### Legacy `forwardRef` approach

```tsx
import { forwardRef } from 'react';

const MyInput = forwardRef<HTMLInputElement, { placeholder: string }>(
  function MyInput(props, ref) {
    return <input ref={ref} placeholder={props.placeholder} />;
  }
);
```

#### React 19 approach

```tsx
function MyInput({
  ref,
  placeholder,
}: {
  ref: React.Ref<HTMLInputElement>;
  placeholder: string;
}) {
  return <input ref={ref} placeholder={placeholder} />;
}
```

Usage:

```tsx
function Form() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <MyInput ref={inputRef} placeholder="Email" />
      <button onClick={() => inputRef.current?.focus()}>
        Focus
      </button>
    </>
  );
}
```

Interview answer:

```text
React 19 allows ref to be passed as a normal prop to function components, reducing the need for forwardRef in many cases. The component can receive ref in its props and pass it to a DOM element.
```

### 7. What are cleanup functions for refs in React 19?

In React 19, callback refs can return a cleanup function.

This helps clean up DOM-related setup when the element is removed.

#### Legacy approach with `useEffect`

```tsx
function ResizeBox() {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    const observer = new ResizeObserver(() => {
      console.log('resized');
    });

    observer.observe(divRef.current);

    return () => observer.disconnect();
  }, []);

  return <div ref={divRef}>Resize me</div>;
}
```

#### React 19 callback ref cleanup

```tsx
function ResizeBox() {
  return (
    <div
      ref={(node) => {
        if (!node) {
          return;
        }

        const observer = new ResizeObserver(() => {
          console.log('resized');
        });

        observer.observe(node);

        return () => {
          observer.disconnect();
        };
      }}
    >
      Resize me
    </div>
  );
}
```

Interview answer:

```text
React 19 allows callback refs to return cleanup functions. This is useful when attaching observers, third-party widgets, or DOM event listeners to a DOM node. When the ref is detached, React runs the cleanup function.
```

### 8. What does `<Context>` can be used directly as a provider mean?

In React 19, a Context object itself can be rendered directly as a provider.

#### Legacy provider syntax

```tsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

#### React 19 provider syntax

```tsx
<ThemeContext value="dark">
  <App />
</ThemeContext>
```

Full example:

```tsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext value="dark">
      <Header />
    </ThemeContext>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  return <h1>{theme}</h1>;
}
```

Interview answer:

```text
React 19 lets us use the Context object directly as a provider. Instead of writing <ThemeContext.Provider value={theme}>, we can write <ThemeContext value={theme}>. It is a cleaner syntax improvement, and useContext still reads the value.
```

### 9. What is document metadata support in React 19?

React 19 supports rendering document metadata tags directly from components.

Examples:

- `<title>`
- `<meta>`
- `<link>`

#### Legacy approach

Before this, many apps used libraries like React Helmet or framework APIs.

```tsx
import { Helmet } from 'react-helmet';

function ProductPage() {
  return (
    <>
      <Helmet>
        <title>Product Details</title>
        <meta name="description" content="Product page" />
      </Helmet>
      <h1>Product</h1>
    </>
  );
}
```

#### React 19 approach

```tsx
function ProductPage() {
  return (
    <>
      <title>Product Details</title>
      <meta name="description" content="Product page" />
      <h1>Product</h1>
    </>
  );
}
```

React can hoist these metadata tags into the document head.

Interview answer:

```text
React 19 supports document metadata tags like title, meta, and link directly inside components. This makes page-specific metadata easier without always needing an external library. React handles placing the metadata correctly in the document.
```

### 10. What are stylesheet and async script handling improvements in React 19?

React 19 improves how stylesheets and async scripts are handled during rendering.

#### Stylesheet support

React can understand stylesheet precedence so styles load in a predictable order.

```tsx
function Page() {
  return (
    <>
      <link
        rel="stylesheet"
        href="/styles/page.css"
        precedence="default"
      />
      <h1>Page</h1>
    </>
  );
}
```

Why useful:

- avoids style ordering bugs
- helps React coordinate stylesheet loading
- useful with streaming rendering and Suspense

#### Async script support

React can also handle async scripts more safely.

```tsx
function AnalyticsScript() {
  return (
    <script
      async
      src="https://example.com/analytics.js"
    />
  );
}
```

React can avoid adding the same async script multiple times when rendered by multiple components.

#### Legacy approach

Before this, teams often manually inserted scripts/styles in `index.html` or inside effects.

```tsx
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://example.com/analytics.js';
  script.async = true;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);
```

Interview answer:

```text
React 19 improves support for stylesheets and async scripts. Stylesheets can declare precedence so React can manage ordering, and async scripts can be rendered from components without manually appending script tags in useEffect. This is especially useful for streaming, Suspense, and component-based resource loading.
```

### 11. What are resource preloading APIs in React 19?

React 19 provides resource loading APIs to help tell the browser about important resources early.

Common APIs include:

- `preload`
- `preinit`
- `preconnect`
- `prefetchDNS`
- `preloadModule`
- `preinitModule`

These are imported from `react-dom`.

#### Example

```tsx
import {
  preconnect,
  prefetchDNS,
  preinit,
  preload,
} from 'react-dom';

function ProductPage() {
  preconnect('https://cdn.example.com');
  prefetchDNS('https://api.example.com');

  preload('/fonts/inter.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  });

  preinit('/styles/product.css', {
    as: 'style',
  });

  return <h1>Product Page</h1>;
}
```

#### Legacy approach

Before this, resource hints were commonly written manually in HTML:

```html
<link rel="preconnect" href="https://cdn.example.com" />
<link rel="dns-prefetch" href="https://api.example.com" />
<link rel="preload" href="/fonts/inter.woff2" as="font" />
```

React 19 lets components declare important resources closer to where they are used.

When to use:

- important fonts
- critical CSS
- important scripts
- CDN connections
- route-level resources
- module resources needed soon

Interview answer:

```text
React 19 resource preloading APIs let components hint important resources to the browser early. APIs like preload, preinit, preconnect, and prefetchDNS help improve loading performance by preparing fonts, styles, scripts, modules, or network connections before they are needed.
```
