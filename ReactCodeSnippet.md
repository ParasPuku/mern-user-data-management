# React Code Snippets

This file contains React code snippets with expected output and interview-style explanations.

## 1. Multiple setState Calls With Same State Value

### Question

What will happen when we call `setCount(count + 1)` three times inside one click handler?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    console.log('inside state update');

    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    console.log('Count1: ', count);
  };

  console.log('Count2: ', count);

  return (
    <div>
      <button onClick={handleCount}>
        count3::: {count}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
Count2: 0
```

Button value:

```text
count3::: 0
```

### First Button Click

Console:

```text
inside state update
Count1: 0
Count2: 1
```

Button value after render:

```text
count3::: 1
```

### Second Button Click

Console:

```text
inside state update
Count1: 1
Count2: 2
```

Button value after render:

```text
count3::: 2
```

### Third Button Click

Console:

```text
inside state update
Count1: 2
Count2: 3
```

Button value after render:

```text
count3::: 3
```

### Why Count Increases Only By 1

Inside one render, `count` has one fixed value.

On first click, `count` is `0`, so all three updates become:

```jsx
setCount(0 + 1);
setCount(0 + 1);
setCount(0 + 1);
```

That means React receives:

```jsx
setCount(1);
setCount(1);
setCount(1);
```

React batches these updates and the final state becomes `1`, not `3`.

### Why Count1 Shows Old Value

```jsx
console.log('Count1: ', count);
```

This logs the value from the current render.

State does not update immediately inside the same function.

So after calling `setCount`, `count` is still the old value inside `handleCount`.

### Why Count2 Shows Updated Value

```jsx
console.log('Count2: ', count);
```

This line runs during render.

After React updates the state, the component renders again, so `Count2` logs the new value.

### If You Want Count To Increase By 3

Use functional updates:

```jsx
const handleCount = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
};
```

Now React applies each update one by one:

```text
0 -> 1 -> 2 -> 3
```

After first click, button value becomes:

```text
count3::: 3
```

### Important Interview Answer

```text
React batches state updates inside event handlers. When we call setCount(count + 1) multiple times, each call uses the same old count value from the current render. So the count increases only by 1. To update based on previous state multiple times, use functional updates like setCount(prev => prev + 1).
```

### StrictMode Note

In React development mode with `React.StrictMode`, render logs like `Count2` may appear twice.

Event handler logs like `inside state update` and `Count1` do not run twice unless the user actually clicks twice.

## 2. Multiple Functional setState Calls

### Question

What will happen when we call `setCount((prev) => prev + 1)` three times inside one click handler?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    console.log('inside state update');

    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);

    console.log('Count1: ', count);
  };

  console.log('Count2: ', count);

  return (
    <div>
      <button onClick={handleCount}>
        count3::: {count}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
Count2: 0
```

Button value:

```text
count3::: 0
```

### First Button Click

Console:

```text
inside state update
Count1: 0
Count2: 3
```

Button value after render:

```text
count3::: 3
```

### Second Button Click

Console:

```text
inside state update
Count1: 3
Count2: 6
```

Button value after render:

```text
count3::: 6
```

### Third Button Click

Console:

```text
inside state update
Count1: 6
Count2: 9
```

Button value after render:

```text
count3::: 9
```

### Why Count Increases By 3

Functional state updates do not depend on the old `count` value from the current render.

Each updater receives the latest pending state.

On first click:

```jsx
setCount((prev) => prev + 1); // prev = 0, next = 1
setCount((prev) => prev + 1); // prev = 1, next = 2
setCount((prev) => prev + 1); // prev = 2, next = 3
```

So the final count becomes:

```text
0 -> 1 -> 2 -> 3
```

### Why Count1 Still Shows Old Value

```jsx
console.log('Count1: ', count);
```

Even with functional updates, this `count` still belongs to the current render.

React schedules the state update and re-renders later.

So during the first click, `Count1` still logs:

```text
Count1: 0
```

### Why Count2 Shows The New Value

```jsx
console.log('Count2: ', count);
```

This line runs during render.

After React applies the three functional updates, the component renders again with the new count.

So after the first click, it logs:

```text
Count2: 3
```

### Difference From setCount(count + 1)

```text
setCount(count + 1)
uses the same count value from the current render.

setCount((prev) => prev + 1)
uses the latest pending state from React's update queue.
```

That is why:

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

increases by:

```text
1
```

But:

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

increases by:

```text
3
```

### Important Interview Answer

```text
Functional updates are used when the next state depends on the previous state. React puts each updater function in a queue and runs them one by one with the latest pending state. That is why three setCount(prev => prev + 1) calls increase the count by 3.
```

### StrictMode Note

In React development mode with `React.StrictMode`, render logs like `Count2` may appear twice.

React may also call state updater functions more than once in development to check that they are pure.

The final state is still correct. Event handler logs like `inside state update` and `Count1` do not run twice unless the user actually clicks twice.

## 3. Using count++ Inside setState

### Question

What will happen when we call `setCount(count++)` three times inside one click handler?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    console.log('inside state update');

    setCount(count++);
    setCount(count++);
    setCount(count++);

    console.log('Count1: ', count);
  };

  console.log('Count2: ', count);

  return (
    <div>
      <button onClick={handleCount}>
        count3::: {count}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
Count2: 0
```

Button value:

```text
count3::: 0
```

### First Button Click

Console:

```text
inside state update
```

Then the app throws an error:

```text
TypeError: Assignment to constant variable.
```

Button value after click:

```text
count3::: 0
```

### Second And Third Button Click

The same error happens again if the component is still visible and the user clicks again.

Console:

```text
inside state update
TypeError: Assignment to constant variable.
```

Button value:

```text
count3::: 0
```

### Why This Fails

This line is the problem:

```jsx
setCount(count++);
```

`count++` means:

```text
Use the current value of count, then increase count by 1.
```

But in this component, `count` comes from:

```jsx
const [count, setCount] = useState(0);
```

So `count` is a `const` variable for the current render.

JavaScript does not allow changing a `const` variable.

That is why `count++` throws:

```text
Assignment to constant variable.
```

### Important Point

The first `setCount(count++)` does not successfully update state because JavaScript must evaluate `count++` before calling `setCount`.

So this fails before React can apply the state update.

### Correct Way

Use functional updates:

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

This increases the count by `3`.

Or use one update:

```jsx
setCount((prev) => prev + 3);
```

### Important Interview Answer

```text
Never mutate React state variables directly. count++ tries to mutate the count variable from the current render. Since count is declared with const, it throws an error. State should be updated only through setCount, preferably using functional updates when the next state depends on the previous state.
```

## 4. Setting State to the Same Value

### Question

What will happen when the initial state is already `10` and we call `setCount(10)` on button click?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(10);

  const handleCount = () => {
    console.log('inside state update');
    setCount(10);
    console.log('Count1: ', count);
  };

  console.log('Count2: ', count);

  return (
    <div>
      <button onClick={handleCount}>
        count3::: {count}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
Count2: 10
```

Button value:

```text
count3::: 10
```

### First Button Click

Console:

```text
inside state update
Count1: 10
```

Button value:

```text
count3::: 10
```

### Second Button Click

Console:

```text
inside state update
Count1: 10
```

Button value:

```text
count3::: 10
```

### Third Button Click

Console:

```text
inside state update
Count1: 10
```

Button value:

```text
count3::: 10
```

### Why Count2 Does Not Log Again

This line sets the state to the same value that React already has:

```jsx
setCount(10);
```

The current state is already:

```text
10
```

The new state is also:

```text
10
```

For primitive values like numbers, React compares the old state and new state using `Object.is`.

Since `Object.is(10, 10)` is `true`, React understands that the state did not actually change.

So React usually skips the re-render.

That is why this render-level log does not run again after the click:

```jsx
console.log('Count2: ', count);
```

### Why Count1 Logs 10

This log is inside the click handler:

```jsx
console.log('Count1: ', count);
```

The `count` value inside the click handler belongs to the current render.

Since the current render value is already `10`, `Count1` prints:

```text
Count1: 10
```

### Important Interview Answer

```text
If we call setState with the same primitive value as the current state, React does not need to re-render the component. In this example, count is already 10, and setCount(10) again does not change the state. The click handler still runs, so inside state update and Count1 are logged, but Count2 usually does not log again because the component render is skipped.
```

### Important StrictMode Note

```text
In React StrictMode during development, render logs can appear more than once because React intentionally checks components for unexpected side effects. The main concept is still the same: setting 10 to 10 does not change the state value.
```

## 5. Setting State to a New Value Once

### Question

What will happen when the initial state is `10` and we call `setCount(11)` on button click?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(10);

  const handleCount = () => {
    console.log('inside state update');
    setCount(11);
    console.log('Count1: ', count);
  };

  console.log('Count2: ', count);

  return (
    <div>
      <button onClick={handleCount}>
        count3::: {count}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
Count2: 10
```

Button value:

```text
count3::: 10
```

### First Button Click

Console:

```text
inside state update
Count1: 10
Count2: 11
```

Button value after re-render:

```text
count3::: 11
```

### Second Button Click

Console:

```text
inside state update
Count1: 11
```

Button value:

```text
count3::: 11
```

### Third Button Click

Console:

```text
inside state update
Count1: 11
```

Button value:

```text
count3::: 11
```

### Why First Click Re-renders

Initially, the state value is:

```text
10
```

On the first click, this line runs:

```jsx
setCount(11);
```

Now React compares the old state and new state:

```text
Old state: 10
New state: 11
```

Because the state value changed, React re-renders the component.

That is why `Count2` logs again with the updated value:

```text
Count2: 11
```

### Why Count1 Logs the Old Value on First Click

This line is inside the same click handler:

```jsx
console.log('Count1: ', count);
```

State updates are not reflected immediately inside the same function execution.

So during the first click, `count` is still the value from the current render:

```text
Count1: 10
```

After the event handler finishes, React applies the state update and renders again.

### Why Later Clicks Do Not Re-render

After the first click, the state is already:

```text
11
```

On the second and third clicks, this line tries to set the same value again:

```jsx
setCount(11);
```

React compares:

```text
Old state: 11
New state: 11
```

Since the value did not change, React usually skips the re-render.

That is why `Count2` does not normally log again on the second and third clicks.

### Important Interview Answer

```text
When setState receives a different value, React schedules a re-render. In this example, the first click changes count from 10 to 11, so the component renders again and Count2 logs 11. But inside the same click handler, Count1 still logs the old render value. After count becomes 11, later clicks call setCount(11) again, which is the same value, so React usually skips the re-render.
```

### Important StrictMode Note

```text
In React StrictMode during development, render logs may appear more than once. Focus on the state behavior: first click changes 10 to 11, later clicks keep 11 as 11.
```

## 6. Updating Object State With a New Object

### Question

What will happen when state is an object and we update it with a new object using `setUser`?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({ name: 'paras' });

  const handleCount = () => {
    console.log('inside state update');
    setUser(() => ({
      name: 'Paras Mahto',
    }));
    console.log('User1: ', user.name);
  };

  console.log('User2: ', user.name);

  return (
    <div>
      <button onClick={handleCount}>
        user3::: {user.name}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
User2: paras
```

Button value:

```text
user3::: paras
```

### First Button Click

Console:

```text
inside state update
User1: paras
User2: Paras Mahto
```

Button value after re-render:

```text
user3::: Paras Mahto
```

### Second Button Click

Console:

```text
inside state update
User1: Paras Mahto
User2: Paras Mahto
```

Button value:

```text
user3::: Paras Mahto
```

### Third Button Click

Console:

```text
inside state update
User1: Paras Mahto
User2: Paras Mahto
```

Button value:

```text
user3::: Paras Mahto
```

### Why First Click Logs Old User1 Value

This line schedules a state update:

```jsx
setUser(() => ({
  name: 'Paras Mahto',
}));
```

But React does not update the `user` variable immediately inside the same click handler.

So this line still reads the value from the current render:

```jsx
console.log('User1: ', user.name);
```

During the first click, the current render value is:

```text
paras
```

That is why it logs:

```text
User1: paras
```

After the click handler finishes, React applies the update and re-renders.

That is when this render-level log runs:

```text
User2: Paras Mahto
```

### Why Later Clicks Still Re-render

After the first click, the state value is:

```js
{ name: 'Paras Mahto' }
```

On the second and third clicks, this code creates a new object again:

```jsx
setUser(() => ({
  name: 'Paras Mahto',
}));
```

Even though the content looks the same, the object reference is new every time.

Example:

```js
const user1 = { name: 'Paras Mahto' };
const user2 = { name: 'Paras Mahto' };

console.log(user1 === user2); // false
```

React compares object state by reference using `Object.is`.

So React sees:

```text
Old object reference: different
New object reference: different
```

Because the reference changed, React re-renders the component.

That is why `User2: Paras Mahto` logs again on the second and third clicks.

### Important Interview Answer

```text
React state updates are based on value comparison for primitives and reference comparison for objects. In this example, setUser creates a new object every time. Even if the object has the same name value, the reference is different, so React re-renders. Also, User1 logs the old/current render value because state updates are not available immediately inside the same event handler.
```

### Better Way If Value Is Already Same

If we want to avoid unnecessary re-renders, we can check the previous value before returning a new object:

```jsx
setUser((prevUser) => {
  if (prevUser.name === 'Paras Mahto') {
    return prevUser;
  }

  return {
    name: 'Paras Mahto',
  };
});
```

Here, returning `prevUser` keeps the same object reference, so React can skip the re-render when nothing changed.

### Important StrictMode Note

```text
In React StrictMode during development, render logs may appear more than once. The main concept is still the same: a new object reference causes React to treat state as changed.
```

## 7. Updating Object State With Same Data but New Reference

### Question

What will happen when state is an object and we update it with a new object that has the same data?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({ name: 'paras' });

  const handleCount = () => {
    console.log('inside state update');
    setUser(() => ({
      name: 'paras',
    }));
    console.log('User1: ', user.name);
  };

  console.log('User2: ', user.name);

  return (
    <div>
      <button onClick={handleCount}>
        user3::: {user.name}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
User2: paras
```

Button value:

```text
user3::: paras
```

### First Button Click

Console:

```text
inside state update
User1: paras
User2: paras
```

Button value after re-render:

```text
user3::: paras
```

### Second Button Click

Console:

```text
inside state update
User1: paras
User2: paras
```

Button value:

```text
user3::: paras
```

### Third Button Click

Console:

```text
inside state update
User1: paras
User2: paras
```

Button value:

```text
user3::: paras
```

### Why It Re-renders Even Though Name Is Same

This code creates a new object every time the button is clicked:

```jsx
setUser(() => ({
  name: 'paras',
}));
```

The old state object and new state object look the same:

```js
{ name: 'paras' }
```

But they are not the same object in memory.

Example:

```js
const oldUser = { name: 'paras' };
const newUser = { name: 'paras' };

console.log(oldUser === newUser); // false
```

React compares object state by reference.

So React sees:

```text
Old state reference: old object
New state reference: new object
```

Because the reference changed, React re-renders the component.

That is why `User2: paras` logs again after every click.

### Why User1 Logs paras

This log is inside the click handler:

```jsx
console.log('User1: ', user.name);
```

The `user` variable still belongs to the current render.

Since the current render value is already:

```text
paras
```

It logs:

```text
User1: paras
```

After the click handler finishes, React applies the new object state and renders again.

### Important Interview Answer

```text
For objects and arrays, React compares state using reference comparison, not deep comparison. In this example, the name value is still paras, but setUser returns a new object every time. Because the object reference changes, React treats the state as changed and re-renders the component.
```

### Better Way If Data Is Same

If the value is already same, return the previous object:

```jsx
setUser((prevUser) => {
  if (prevUser.name === 'paras') {
    return prevUser;
  }

  return {
    name: 'paras',
  };
});
```

Returning `prevUser` keeps the same reference.

So React can skip the re-render when the data did not actually change.

### Important StrictMode Note

```text
In React StrictMode during development, render logs may appear more than once. The main concept is still the same: same object data with a new reference can still cause a re-render.
```

## 8. useEffect Dependency Array With Primitives, Objects, and Arrays

### Question

How does React check these dependency arrays behind the scenes?

```js
[{}]
[[]]
[true]
[1]
['hello']
[{ id: 1 }]
[0]
[4354]
```

### Core Rule

React compares every dependency with its previous value using `Object.is`.

Behind the scenes, React thinks like this:

```js
Object.is(previousDependency, currentDependency);
```

If all dependencies are same, the effect does not run again.

If even one dependency is different, the effect runs again after render.

### Important First Render Rule

On the first render, every `useEffect` runs once after the component is rendered and committed to the DOM.

After that, React checks the dependency array on every re-render.

### Example Code

```jsx
import React, { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  console.log('Render:', count);

  useEffect(() => {
    console.log('Effect with [{}]');
  }, [{}]);

  useEffect(() => {
    console.log('Effect with [[]]');
  }, [[]]);

  useEffect(() => {
    console.log('Effect with [true]');
  }, [true]);

  useEffect(() => {
    console.log('Effect with [1]');
  }, [1]);

  useEffect(() => {
    console.log('Effect with ["hello"]');
  }, ['hello']);

  useEffect(() => {
    console.log('Effect with [{ id: 1 }]');
  }, [{ id: 1 }]);

  useEffect(() => {
    console.log('Effect with [0]');
  }, [0]);

  useEffect(() => {
    console.log('Effect with [4354]');
  }, [4354]);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      count: {count}
    </button>
  );
}

export default App;
```

### Initial Render Logs

Console:

```text
Render: 0
Effect with [{}]
Effect with [[]]
Effect with [true]
Effect with [1]
Effect with ["hello"]
Effect with [{ id: 1 }]
Effect with [0]
Effect with [4354]
```

On first render, React runs all effects once because there is no previous dependency array to compare with.

### After First Button Click

Console:

```text
Render: 1
Effect with [{}]
Effect with [[]]
Effect with [{ id: 1 }]
```

Only object and array dependency effects run again.

### After Second Button Click

Console:

```text
Render: 2
Effect with [{}]
Effect with [[]]
Effect with [{ id: 1 }]
```

Same behavior again.

### After Third Button Click

Console:

```text
Render: 3
Effect with [{}]
Effect with [[]]
Effect with [{ id: 1 }]
```

The primitive dependency effects do not run again because their values are still the same.

### Primitive Dependencies

These are primitive values:

```js
[true]
[1]
['hello']
[0]
[4354]
```

React compares them by actual value:

```js
Object.is(true, true); // true
Object.is(1, 1); // true
Object.is('hello', 'hello'); // true
Object.is(0, 0); // true
Object.is(4354, 4354); // true
```

Since the values are same on every render, these effects run only on the initial render.

### Object and Array Dependencies

These are reference values:

```js
[{}]
[[]]
[{ id: 1 }]
```

Every render creates a new object or array in memory.

Example:

```js
Object.is({}, {}); // false
Object.is([], []); // false
Object.is({ id: 1 }, { id: 1 }); // false
```

Even though the data looks the same, the reference is different.

So React treats the dependency as changed and runs the effect again after every re-render.

### Do Not Confuse [] and [[]]

This is an empty dependency array:

```jsx
useEffect(() => {
  console.log('Runs once');
}, []);
```

It means there are no dependencies, so the effect runs once after the initial render.

This is different:

```jsx
useEffect(() => {
  console.log('Runs after every re-render');
}, [[]]);
```

`[[]]` means the dependency array contains one dependency, and that dependency is a new array created on every render.

### How React Checks Behind the Scene

React stores the previous dependency array after every render.

On the next render, React compares each dependency by index:

```text
Previous deps: [oldDependency]
Current deps:  [newDependency]
```

Then it checks:

```js
Object.is(oldDependency, newDependency);
```

For primitives:

```text
Object.is(1, 1) -> true
No effect re-run
```

For objects or arrays:

```text
Object.is(oldObject, newObject) -> false
Effect re-runs
```

### Can This Cause Infinite Loop?

Yes, if the effect updates state and the dependency is a new object or array every render.

Bad example:

```jsx
useEffect(() => {
  setCount((prev) => prev + 1);
}, [{}]);
```

Flow:

```text
Render
Effect runs
State updates
Component re-renders
New object is created in dependency array
React sees dependency changed
Effect runs again
Loop continues
```

### Better Ways

Depend on primitive values when possible:

```jsx
useEffect(() => {
  console.log('User id changed');
}, [user.id]);
```

Memoize object or array dependencies when the reference should stay stable:

```jsx
const filter = useMemo(() => {
  return { status: 'active' };
}, []);

useEffect(() => {
  console.log('Filter changed');
}, [filter]);
```

Or define constants outside the component if they never change:

```jsx
const ROLES = ['admin', 'user'];

function App() {
  useEffect(() => {
    console.log('Roles are stable');
  }, [ROLES]);
}
```

### Important Interview Answer

```text
React compares useEffect dependencies using Object.is. Primitive values like true, 1, "hello", 0, and 4354 are compared by value, so they do not trigger the effect again if the value is same. Objects and arrays are compared by reference, so [{}], [[]], and [{ id: 1 }] create new references on every render and cause the effect to run again after every re-render.
```

## 9. Parent and Child Rendering With useState and useEffect

### Interview Focus

Interviewers commonly ask:

- If parent state changes, will child render?
- If child state changes, will parent render?
- When does `useEffect` run?
- When does cleanup run?
- How does `React.memo` change child rendering?

### Example 1: Parent State Update Causes Child Render

### Code

```jsx
import React, { useEffect, useState } from 'react';

function Child({ count }) {
  console.log('Child render:', count);

  useEffect(() => {
    console.log('Child useEffect:', count);
  }, [count]);

  return <p>Child count: {count}</p>;
}

function App() {
  const [count, setCount] = useState(0);

  console.log('Parent render:', count);

  useEffect(() => {
    console.log('Parent useEffect:', count);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment Parent Count
      </button>

      <Child count={count} />
    </div>
  );
}

export default App;
```

### Initial Render Logs

```text
Parent render: 0
Child render: 0
Child useEffect: 0
Parent useEffect: 0
```

### First Button Click Logs

```text
Parent render: 1
Child render: 1
Child useEffect: 1
Parent useEffect: 1
```

### Second Button Click Logs

```text
Parent render: 2
Child render: 2
Child useEffect: 2
Parent useEffect: 2
```

### Why This Happens

When parent state changes:

```jsx
setCount((prev) => prev + 1);
```

React renders the parent again.

Since the child is inside the parent's JSX, React also renders the child again.

After the DOM is updated, `useEffect` runs because `count` changed.

1. The Initial Render Rule
- A dependency array does not mean "only run when this changes from its previous value". Instead, it means "only run if this value is different from the previous render's value".

On the very first render:
- There is no previous render.
- The dependency changes from "nothing" (non-existent) to 0.
- Because this is a transition from non-existence to existence, React treats it as a change and triggers the effect.

How to skip the initial render
If you absolutely do not want your useEffect to run on the first load, you must track the initial mount using a useRef:

```jsx
import { useEffect, useState, useRef } from 'react';

// Inside your component:
const isFirstRender = useRef(true);

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false; // Mark that first render is done
    return; // Exit early and do nothing
  }

  console.log('This will ONLY run when count changes, NOT on load:', count);
}, [count]);
```

### Important Interview Answer

```text
When parent state changes, the parent component re-renders. By default, its child components also render again because React needs to calculate the new UI tree. In this example, both Parent and Child render again, and their useEffect hooks run after the render is committed because count changed.
```

### Example 2: Child State Update Does Not Render Parent

### Code

```jsx
import React, { useEffect, useState } from 'react';

function Child() {
  const [childCount, setChildCount] = useState(0);

  console.log('Child render:', childCount);

  useEffect(() => {
    console.log('Child useEffect:', childCount);
  }, [childCount]);

  return (
    <button onClick={() => setChildCount((prev) => prev + 1)}>
      Child Count: {childCount}
    </button>
  );
}

function App() {
  console.log('Parent render');

  useEffect(() => {
    console.log('Parent useEffect');
  }, []);

  return (
    <div>
      <h2>Parent Component</h2>
      <Child />
    </div>
  );
}

export default App;
```

### Initial Render Logs

```text
Parent render
Child render: 0
Child useEffect: 0
Parent useEffect
```

### First Child Button Click Logs

```text
Child render: 1
Child useEffect: 1
```

### Second Child Button Click Logs

```text
Child render: 2
Child useEffect: 2
```

### Why Parent Does Not Render Again

The state belongs to the child:

```jsx
const [childCount, setChildCount] = useState(0);
```

When child state changes, React re-renders the child component.

The parent does not re-render because the parent's state or props did not change.

### Important Interview Answer

```text
State updates re-render the component where the state lives and its children. If state lives inside Child, updating it re-renders Child, not Parent. Parent will not render again unless its own state changes, its props change, or its parent renders it again.
```

### Example 3: Child Unmount and useEffect Cleanup

### Code

```jsx
import React, { useEffect, useState } from 'react';

function Child() {
  console.log('Child render');

  useEffect(() => {
    console.log('Child mounted');

    return () => {
      console.log('Child cleanup');
    };
  }, []);

  return <p>Child is visible</p>;
}

function App() {
  const [showChild, setShowChild] = useState(true);

  console.log('Parent render:', showChild);

  return (
    <div>
      <button onClick={() => setShowChild((prev) => !prev)}>
        Toggle Child
      </button>

      {showChild && <Child />}
    </div>
  );
}

export default App;
```

### Initial Render Logs

```text
Parent render: true
Child render
Child mounted
```

### First Button Click Logs

Child is removed from the UI.

```text
Parent render: false
Child cleanup
```

### Second Button Click Logs

Child is added again.

```text
Parent render: true
Child render
Child mounted
```

### Why Cleanup Runs

This cleanup function runs when the child unmounts:

```jsx
return () => {
  console.log('Child cleanup');
};
```

Cleanup is commonly used for:

- clearing timers
- removing event listeners
- aborting API calls
- unsubscribing from sockets or subscriptions

### Important Interview Answer

```text
useEffect cleanup runs before the component unmounts. In this example, when showChild becomes false, React removes Child from the UI and runs the cleanup function. When showChild becomes true again, React mounts Child again and runs the effect again.
```

### Example 4: React.memo Prevents Child Render When Props Are Same

### Code

```jsx
import React, { memo, useState } from 'react';

const Child = memo(function Child({ name }) {
  console.log('Child render:', name);

  return <p>Child name: {name}</p>;
});

function App() {
  const [count, setCount] = useState(0);

  console.log('Parent render:', count);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Parent Count: {count}
      </button>

      <Child name="Paras" />
    </div>
  );
}

export default App;
```

### Initial Render Logs

```text
Parent render: 0
Child render: Paras
```

### First Button Click Logs

```text
Parent render: 1
```

### Second Button Click Logs

```text
Parent render: 2
```

### Why Child Does Not Render Again

The child is wrapped with `memo`:

```jsx
const Child = memo(function Child({ name }) {
  console.log('Child render:', name);

  return <p>Child name: {name}</p>;
});
```

The prop is always the same primitive string:

```jsx
<Child name="Paras" />
```

Since `name` did not change, `React.memo` skips the child render.

### Important Interview Answer

```text
By default, a child renders when its parent renders. React.memo can skip the child render if the child props are the same. In this example, Parent renders when count changes, but Child does not render again because its name prop is still the same string.
```

### Example 5: React.memo Fails With Inline Object Prop

### Code

```jsx
import React, { memo, useState } from 'react';

const Child = memo(function Child({ user }) {
  console.log('Child render:', user.name);

  return <p>Child name: {user.name}</p>;
});

function App() {
  const [count, setCount] = useState(0);

  console.log('Parent render:', count);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Parent Count: {count}
      </button>

      <Child user={{ name: 'Paras' }} />
    </div>
  );
}

export default App;
```

### Initial Render Logs

```text
Parent render: 0
Child render: Paras
```

### First Button Click Logs

```text
Parent render: 1
Child render: Paras
```

### Second Button Click Logs

```text
Parent render: 2
Child render: Paras
```

### Why Child Still Renders

This line creates a new object on every parent render:

```jsx
<Child user={{ name: 'Paras' }} />
```

Even though the object data is same, the reference is different.

So `React.memo` sees the prop as changed.

### Fix With useMemo

```jsx
import React, { memo, useMemo, useState } from 'react';

const Child = memo(function Child({ user }) {
  console.log('Child render:', user.name);

  return <p>Child name: {user.name}</p>;
});

function App() {
  const [count, setCount] = useState(0);

  const user = useMemo(() => {
    return { name: 'Paras' };
  }, []);

  console.log('Parent render:', count);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Parent Count: {count}
      </button>

      <Child user={user} />
    </div>
  );
}

export default App;
```

Now the `user` object reference stays the same, so `React.memo` can skip the child render.

### Important Interview Answer

```text
React.memo does shallow comparison of props. Primitive props like strings and numbers are easy to compare, but object and array props are compared by reference. If we pass an inline object to a memoized child, a new object is created on every parent render, so the child still renders. useMemo can keep the object reference stable.
```

### Important StrictMode Note

```text
In React StrictMode during development, React may run render and effect logic more than once to detect side effects. In interviews, explain the normal production mental model first, then mention StrictMode if duplicate logs appear in development.
```

## 10. Using var With count++ Inside setState

### Question

What will happen if we declare React state variable with `var` and call `setCount(count++)` three times?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  var [count, setCount] = useState(0);

  const handleCount = () => {
    console.log('inside state update');
    setCount(count++);
    setCount(count++);
    setCount(count++);
    console.log('count1: ', count);
  };

  console.log('count2: ', count);

  return (
    <div>
      <button onClick={handleCount}>
        count3::: {count}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
count2: 0
```

Button value:

```text
count3::: 0
```

### First Button Click

Console:

```text
inside state update
count1: 3
count2: 2
```

Button value after re-render:

```text
count3::: 2
```

### Second Button Click

Console:

```text
inside state update
count1: 5
count2: 4
```

Button value after re-render:

```text
count3::: 4
```

### Third Button Click

Console:

```text
inside state update
count1: 7
count2: 6
```

Button value after re-render:

```text
count3::: 6
```

### Why This Happens

This line uses post-increment:

```jsx
setCount(count++);
```

`count++` means:

```text
First use current count value.
Then increase the local count variable by 1.
```

On the first click, `count` starts as `0`.

So these three calls become:

```jsx
setCount(0); // count becomes 1 after this
setCount(1); // count becomes 2 after this
setCount(2); // count becomes 3 after this
```

That is why this log prints `3`:

```text
count1: 3
```

But React state receives these queued values:

```text
0, 1, 2
```

React batches the updates and the final state becomes the last queued value:

```text
2
```

That is why the next render logs:

```text
count2: 2
```

### Important Point About var

This works differently from `const` because `var` allows reassignment.

With `const`, this would throw an error:

```text
TypeError: Assignment to constant variable.
```

But using `var` is still not recommended.

React state should not be mutated directly.

### Important Interview Answer

```text
Using count++ mutates only the local variable from the current render. It does not directly mutate React state. Because count++ returns the old value first, the three setCount calls become setCount(0), setCount(1), and setCount(2). React batches them and keeps the last value, so the UI becomes 2 after the first click. Always avoid count++ with React state and use functional updates instead.
```

### Correct Way

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

Or:

```jsx
setCount((prev) => prev + 3);
```

## 11. Using var With setCount(count + 1) Three Times

### Question

What will happen if we call `setCount(count + 1)` three times in the same click handler?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  var [count, setCount] = useState(0);

  const handleCount = () => {
    console.log('inside state update');
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log('count1: ', count);
  };

  console.log('count2: ', count);

  return (
    <div>
      <button onClick={handleCount}>
        count3::: {count}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
count2: 0
```

Button value:

```text
count3::: 0
```

### First Button Click

Console:

```text
inside state update
count1: 0
count2: 1
```

Button value after re-render:

```text
count3::: 1
```

### Second Button Click

Console:

```text
inside state update
count1: 1
count2: 2
```

Button value after re-render:

```text
count3::: 2
```

### Third Button Click

Console:

```text
inside state update
count1: 2
count2: 3
```

Button value after re-render:

```text
count3::: 3
```

### Why Count Increases Only By 1

On the first click, `count` is `0`.

So all three calls calculate the same value:

```jsx
setCount(count + 1); // setCount(1)
setCount(count + 1); // setCount(1)
setCount(count + 1); // setCount(1)
```

React batches these updates.

Since all three updates are setting the same value, the final state becomes:

```text
1
```

That is why the count increases by only `1`, not `3`.

### Why count1 Logs Old Value

This line runs before React finishes the state update and re-render:

```jsx
console.log('count1: ', count);
```

So it logs the value from the current render.

On the first click:

```text
count1: 0
```

Then React re-renders with:

```text
count2: 1
```

### Does var Change Anything Here?

No.

In this example, `var` does not change the result because we are not mutating `count`.

This:

```jsx
setCount(count + 1);
```

only reads `count`.

It does not change the local `count` variable immediately.

### Important Interview Answer

```text
Calling setCount(count + 1) three times uses the same count value from the current render. If count is 0, all three calls become setCount(1). React batches them, so the final state is 1. The count1 log still shows the old value because state updates are applied after the event handler completes.
```

### Correct Way To Increase By 3

Use functional updates:

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

React applies each function to the latest pending state.

So the count increases by `3`.

### Important StrictMode Note

```text
In React StrictMode during development, render logs may appear more than once. The state behavior is still the same: count++ creates confusing local mutation, while count + 1 reads the same render value each time.
```

## 12. Using let With count++ Inside setState

### Question

What will happen if we declare React state variable with `let` and call `setCount(count++)` three times?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  let [count, setCount] = useState(0);

  const handleCount = () => {
    console.log('inside state update');
    setCount(count++);
    setCount(count++);
    setCount(count++);
    console.log('count1: ', count);
  };

  console.log('count2: ', count);

  return (
    <div>
      <button onClick={handleCount}>
        count3::: {count}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
count2: 0
```

Button value:

```text
count3::: 0
```

### First Button Click

Console:

```text
inside state update
count1: 3
count2: 2
```

Button value after re-render:

```text
count3::: 2
```

### Second Button Click

Console:

```text
inside state update
count1: 5
count2: 4
```

Button value after re-render:

```text
count3::: 4
```

### Third Button Click

Console:

```text
inside state update
count1: 7
count2: 6
```

Button value after re-render:

```text
count3::: 6
```

### Why This Happens

`let` allows reassignment, so this line does not throw an error:

```jsx
setCount(count++);
```

On the first click, `count` starts as `0`.

These three calls become:

```jsx
setCount(0); // count becomes 1
setCount(1); // count becomes 2
setCount(2); // count becomes 3
```

So this log prints:

```text
count1: 3
```

React batches the queued state updates:

```text
0, 1, 2
```

The last queued value is `2`, so the UI becomes:

```text
count3::: 2
```

### Difference Between let and const

With `let`, this works because `count` can be reassigned:

```jsx
count++;
```

With `const`, it throws:

```text
TypeError: Assignment to constant variable.
```

### Difference Between let and var

For this specific example, `let` and `var` give the same output.

The main JavaScript difference is:

- `let` is block-scoped
- `var` is function-scoped

But for React state, the best practice is still to use `const`:

```jsx
const [count, setCount] = useState(0);
```

### Important Interview Answer

```text
let allows count++ because let variables can be reassigned. So setCount(count++) does not throw an error like const. However, it still mutates only the local render variable, not React state directly. The three calls become setCount(0), setCount(1), and setCount(2), so after batching the final UI becomes 2. This is still bad React practice; use functional updates instead.
```

### Correct Way

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

Or:

```jsx
setCount((prev) => prev + 3);
```

## 13. Using let With setCount(count + 1) Three Times

### Question

What will happen if we declare state with `let` and call `setCount(count + 1)` three times?

### Code

```jsx
import React from 'react';
import { useState } from 'react';

function App() {
  let [count, setCount] = useState(0);

  const handleCount = () => {
    console.log('inside state update');
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log('count1: ', count);
  };

  console.log('count2: ', count);

  return (
    <div>
      <button onClick={handleCount}>
        count3::: {count}
      </button>
    </div>
  );
}

export default App;
```

### Initial Render

Console:

```text
count2: 0
```

Button value:

```text
count3::: 0
```

### First Button Click

Console:

```text
inside state update
count1: 0
count2: 1
```

Button value after re-render:

```text
count3::: 1
```

### Second Button Click

Console:

```text
inside state update
count1: 1
count2: 2
```

Button value after re-render:

```text
count3::: 2
```

### Third Button Click

Console:

```text
inside state update
count1: 2
count2: 3
```

Button value after re-render:

```text
count3::: 3
```

### Why This Happens

On the first click, `count` is `0`.

All three calls read the same value from the current render:

```jsx
setCount(count + 1); // setCount(1)
setCount(count + 1); // setCount(1)
setCount(count + 1); // setCount(1)
```

React batches the updates, and the final state becomes:

```text
1
```

So the count increases by `1`, not by `3`.

### Does let Change Anything Here?

No.

This line only reads `count`:

```jsx
setCount(count + 1);
```

It does not mutate or reassign `count`.

So `let`, `var`, and `const` all behave the same for this specific `count + 1` example.

### Important Interview Answer

```text
Using let does not change the behavior of setCount(count + 1). Each call reads the same count value from the current render. If count is 0, all three updates become setCount(1), and React batches them into one final state value of 1. To increment three times, use functional updates.
```

### Correct Way To Increase By 3

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

Or:

```jsx
setCount((prev) => prev + 3);
```

### Important StrictMode Note

```text
In React StrictMode during development, render logs may appear more than once. The normal state behavior is still the same.
```

## 14. Skipping First useEffect Run in Parent and Child With useRef

### Question

What will happen when both parent and child components use `useRef` to skip the first `useEffect` run?

### Code

```jsx
import React, { useEffect, useRef, useState } from 'react';

function Child({ count }) {
  const isFirstRender = useRef(true);

  console.log('Child render:', count);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    console.log('Child useEffect:', count);
  }, [count]);

  return <p>Child count: {count}</p>;
}

function App() {
  const isFirstRender = useRef(true);
  const [count, setCount] = useState(0);

  console.log('Parent render:', count);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    console.log('Parent useEffect:', count);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Increment Parent Count
      </button>

      <Child count={count} />
    </div>
  );
}

export default App;
```

### Initial Render Logs

Console:

```text
Parent render: 0
Child render: 0
```

UI:

```text
Child count: 0
```

### Why useEffect Does Not Log on Initial Render

On initial render, both refs start as:

```js
isFirstRender.current = true;
```

So this condition is true:

```jsx
if (isFirstRender.current) {
  isFirstRender.current = false;
  return;
}
```

Both effects exit early.

That is why these logs do not print on initial render:

```text
Child useEffect: 0
Parent useEffect: 0
```

### First Button Click Logs

Console:

```text
Parent render: 1
Child render: 1
Child useEffect: 1
Parent useEffect: 1
```

UI:

```text
Child count: 1
```

### Second Button Click Logs

Console:

```text
Parent render: 2
Child render: 2
Child useEffect: 2
Parent useEffect: 2
```

UI:

```text
Child count: 2
```

### Third Button Click Logs

Console:

```text
Parent render: 3
Child render: 3
Child useEffect: 3
Parent useEffect: 3
```

UI:

```text
Child count: 3
```

### Why Later useEffect Logs Run

After the first render, both refs have been changed to:

```js
isFirstRender.current = false;
```

Changing `ref.current` does not cause a re-render.

But the value is preserved between renders.

So when `count` changes from `0` to `1`, the component renders again and then the effect runs.

This time, the condition is false:

```jsx
if (isFirstRender.current) {
  // does not enter here after first render
}
```

So the logs run:

```text
Child useEffect: 1
Parent useEffect: 1
```

### Important Points

- `useEffect` normally runs after the initial render.
- The `useRef` flag is used here to manually skip the first effect run.
- Parent and child each have their own separate `isFirstRender` ref.
- Updating `isFirstRender.current` does not trigger a re-render.
- When parent state changes, parent renders again and child also renders again.
- After render is committed, effects run because `count` changed.

### Important Interview Answer

```text
useEffect runs after the initial render by default. If we want to skip the first effect run, we can store a flag in useRef. On the first effect execution, the ref is true, so we set it to false and return early. Because useRef persists across renders and updating ref.current does not trigger a re-render, later count changes can run the effect normally.
```

### Important StrictMode Note

```text
In React StrictMode during development, React may run effects more than once to detect side effects. So console logs can look different in development. The normal production concept is: first effect run is skipped, later count changes run the effect.
```
