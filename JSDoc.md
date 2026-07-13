# JavaScript Interview Questions and Answers

This document covers commonly asked JavaScript interview questions with concise explanations and code examples.

## How to Use This Document

Use this file for:

- interview revision
- explaining JavaScript concepts clearly
- preparing short answers
- practicing tricky output questions
- understanding frontend and backend JavaScript fundamentals

## JavaScript Basics

### 1. What is JavaScript?

JavaScript is a high-level, interpreted programming language used mainly for web development.

It runs in:

- browsers
- Node.js backend
- desktop apps
- mobile apps
- serverless functions

Interview answer:

```text
JavaScript is a single-threaded, dynamically typed, high-level language mainly used to build interactive web applications. It runs in browsers and also on servers through Node.js.
```

### 2. Is JavaScript compiled or interpreted?

JavaScript is often called interpreted, but modern JavaScript engines use Just-In-Time compilation.

Example:

```text
Source code -> parser -> bytecode/intermediate representation -> optimized machine code
```

Interview answer:

```text
JavaScript is traditionally interpreted, but modern engines like V8 use JIT compilation to optimize and execute code faster.
```

### 3. Is JavaScript single-threaded?

Yes, JavaScript execution is single-threaded.

But JavaScript can handle asynchronous work using:

- event loop
- callback queue
- microtask queue
- browser APIs
- Node.js APIs

Interview answer:

```text
JavaScript is single-threaded, but it handles asynchronous operations using the event loop and external APIs provided by the browser or Node.js.
```

### 4. What are JavaScript data types?

Primitive types:

- `string`
- `number`
- `bigint`
- `boolean`
- `undefined`
- `symbol`
- `null`

Non-primitive type:

- `object`

Examples:

```js
typeof 'hello'; // 'string'
typeof 10; // 'number'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof Symbol('id'); // 'symbol'
typeof 10n; // 'bigint'
typeof {}; // 'object'
typeof null; // 'object'
```

Important:

```js
typeof null; // 'object'
```

This is a historical JavaScript bug.

### 5. Difference between primitive and reference values?

Primitive values are copied by value.

Objects and arrays are copied by reference.

Example:

```js
let a = 10;
let b = a;
b = 20;

console.log(a); // 10
```

Reference example:

```js
const user1 = { name: 'Paras' };
const user2 = user1;

user2.name = 'Amit';

console.log(user1.name); // 'Amit'
```

Interview answer:

```text
Primitive values are copied directly, while objects and arrays are copied by reference, so multiple variables can point to the same object in memory.
```

## var, let, const

### 6. Difference between var, let, and const?

`var`:

- Scope - function scoped
- ReDeclaration - Allowed
- ReAssignment - Allowed
- Initialization - Optional
- Hoisting - hoisted with `undefined`
- Use Case - Suitable for legacy code but avoid


`let`:

- Scope - block scoped
- ReDeclaration - Not allowed in the same scope
- ReAssignment - Allowed
- Initialization - Optional
- Hoisting - hoisted but not initialized [in temporal dead zone]
- Use Case - Recommended for variables that change

`const`:

- Scope - block scoped
- ReDeclaration - Not allowed in the same scope
- ReAssignment - Not allowed(value must remain constant)
- Initialization - Required at the same time of declaration
- Hoisting - Hoisted but not initialized [in temporal dead zone]
- Use Case - Use for values that shouldn't change

Example:

```js
if (true) {
  var a = 1;
  let b = 2;
  const c = 3;
}

console.log(a); // 1
console.log(b); // ReferenceError
console.log(c); // ReferenceError
```




### 7. Do let and const get hoisted during compilation time?

Yes, let and const are hoisted during the compile phase, but unlike var, they are not initialized with undefined.

How hoisting works for let and const?

1. Compilation phase (Creation): The JavaScript engine reads your code and registers the variable in Memory.

2. Execution Phase (Initialization): Memory is allocated, but the variable in an uninitialized state.

The Temporal Dead Zone (TDZ) -
 Because they are hoisted but not initialized, let and const enter a Temporal Dead Zone (TDZ) from the top of the block until the line where they are actually declared and assigned a value. 
 
If you attempt to access or use the variable while it is in TDZ, JavaScript will throw a ReferenceError. 

Var Variable
Hoisted - Yes
Initialized during Hoisting - Yes(as undefined)
Accessing becomes declaration - Returns undefined

let/const Variable 
Hoisted - Yes
Initialized during Hoisting - No
Accessing becomes declaration - Throws ReferenceError

### 8. Can const object be changed?

Yes. `const` prevents reassignment, not mutation.

Example:

```js
const user = { name: 'Paras' };
user.name = 'Amit';

console.log(user.name); // 'Amit'
```

But this is not allowed:

```js
user = { name: 'Rahul' }; // TypeError
```

### 9. Difference between Object.freeze() and Object.seal() method

`Object.freeze()` prevents adding, deleting, or changing properties.

`Object.seal()` prevents adding or deleting properties, but existing writable properties can still be changed.

Example:

```js
const frozenUser = Object.freeze({ name: 'Paras' });
frozenUser.name = 'Amit';
console.log(frozenUser.name); // 'Paras' in strict-safe environments, mutation ignored or throws in strict mode

const sealedUser = Object.seal({ name: 'Paras' });
sealedUser.name = 'Amit';
sealedUser.role = 'admin';

console.log(sealedUser.name); // 'Amit'
console.log(sealedUser.role); // undefined
```

Interview answer:

```text
freeze makes an object non-extensible and makes existing properties read-only. seal makes an object non-extensible and prevents deleting properties, but writable existing properties can still be updated.
```

### 10. Feature-wise difference between ES5, ES6, ES7, and ES8?

JavaScript versions are based on ECMAScript standards.

Simple meaning:

```text
ES5, ES6, ES7, and ES8 are versions of JavaScript standards.
Each version added new language features.
```

Quick comparison:

| Version | Year | Main focus |
|---|---:|---|
| ES5 | 2009 | Strict mode, array methods, JSON, object utilities |
| ES6 / ES2015 | 2015 | Modern JavaScript: let/const, arrow functions, classes, promises, modules |
| ES7 / ES2016 | 2016 | Small update: includes and exponentiation |
| ES8 / ES2017 | 2017 | Async/await and object utilities |

#### ES5 important features

ES5 made JavaScript more reliable and added many methods still used today.

Important features:

- `strict mode`
- `Array.prototype.map`
- `Array.prototype.filter`
- `Array.prototype.reduce`
- `Array.prototype.forEach`
- `JSON.parse`
- `JSON.stringify`
- `Object.keys`
- `Object.create`
- `Function.prototype.bind`

Example:

```js
'use strict';

const numbers = [1, 2, 3, 4];

const doubled = numbers.map(function (num) {
  return num * 2;
});

console.log(doubled); // [2, 4, 6, 8]
```

Object example:

```js
const user = {
  name: 'Paras',
  role: 'Developer',
};

console.log(Object.keys(user)); // ['name', 'role']
```

#### ES6 / ES2015 important features

ES6 is one of the biggest JavaScript updates.

Important features:

- `let` and `const`
- arrow functions
- template literals
- default parameters
- destructuring
- spread operator
- rest parameters
- classes
- modules
- promises
- `Map`
- `Set`
- `Symbol`
- `for...of`

Example:

```js
const name = 'Paras';

const greet = (userName = 'Guest') => {
  return `Hello ${userName}`;
};

console.log(greet(name)); // Hello Paras
```

Destructuring example:

```js
const user = {
  id: 1,
  name: 'Paras',
};

const { id, name } = user;

console.log(id, name); // 1 Paras
```

Promise example:

```js
const promise = new Promise((resolve) => {
  resolve('Data loaded');
});

promise.then((result) => console.log(result));
```

#### ES7 / ES2016 important features

ES7 was a smaller update.

Important features:

- `Array.prototype.includes`
- exponentiation operator `**`

Example: `includes`

```js
const skills = ['JavaScript', 'React', 'Node'];

console.log(skills.includes('React')); // true
```

Example: exponentiation

```js
console.log(2 ** 3); // 8
```

Before ES7, we used:

```js
console.log(Math.pow(2, 3)); // 8
```

#### ES8 / ES2017 important features

ES8 made asynchronous JavaScript easier with `async/await`.

Important features:

- `async`
- `await`
- `Object.values`
- `Object.entries`
- `String.prototype.padStart`
- `String.prototype.padEnd`
- `Object.getOwnPropertyDescriptors`

Example: `async/await`

```js
async function loadUsers() {
  const response = await fetch('/api/users');
  const users = await response.json();

  return users;
}
```

Object values and entries:

```js
const user = {
  name: 'Paras',
  role: 'Developer',
};

console.log(Object.values(user)); // ['Paras', 'Developer']
console.log(Object.entries(user)); // [['name', 'Paras'], ['role', 'Developer']]
```

String padding:

```js
const invoiceNumber = '42';

console.log(invoiceNumber.padStart(5, '0')); // 00042
console.log(invoiceNumber.padEnd(5, '*')); // 42***
```

#### Feature-wise summary

| Feature | ES5 | ES6 | ES7 | ES8 |
|---|---|---|---|---|
| Variable declaration | `var` | `let`, `const` | Same | Same |
| Functions | normal functions | arrow functions | Same | Same |
| String improvements | basic strings | template literals | Same | padding methods |
| Arrays | map/filter/reduce | spread/rest usage | `includes` | Same |
| Objects | `Object.keys` | enhanced object syntax | Same | `Object.values`, `Object.entries` |
| Classes | constructor functions | `class` syntax | Same | Same |
| Modules | no native modules | `import/export` | Same | Same |
| Async handling | callbacks | promises | Same | `async/await` |
| Math | `Math.pow` | Same | `**` operator | Same |

Interview answer:

```text
ES5 added strict mode, JSON support, array methods like map/filter/reduce, and object utilities. ES6 was the biggest modern JavaScript update with let/const, arrow functions, template literals, classes, modules, promises, destructuring, spread/rest, Map and Set. ES7 added includes and the exponentiation operator. ES8 added async/await, Object.values, Object.entries, and string padding methods.
```

### 11. What is hoisting?

Hoisting means declarations are moved to the top of their scope during compilation.

Example with `var`:

```js
console.log(a); // undefined
var a = 10;
```

JavaScript treats it like:

```js
var a;
console.log(a);
a = 10;
```

Example with function declaration:

```js
sayHello();

function sayHello() {
  console.log('Hello');
}
```

### 12. What is Temporal Dead Zone?

Temporal Dead Zone is the time between entering a scope and the actual declaration of `let` or `const`.

Example:

```js
console.log(name); // ReferenceError
let name = 'Paras';
```

`let` and `const` are hoisted, but they cannot be accessed before declaration.

## Equality and Type Conversion

### 13. Difference between == and ===?

`==` compares after type conversion.

`===` compares without type conversion.

Example:

```js
console.log(5 == '5'); // true
console.log(5 === '5'); // false
```

Interview answer:

```text
== allows type coercion, while === checks both value and type. In real code, prefer ===.
```

### 14. What is type coercion?

Type coercion means JavaScript automatically converts one data type to another.

Example:

```js
console.log('5' + 2); // '52'
console.log('5' - 2); // 3
console.log(true + 1); // 2
```

### 15. What are truthy and falsy values?

Falsy values:

```js
false
0
-0
0n
''
null
undefined
NaN
```

Everything else is truthy.

Example:

```js
if ('hello') {
  console.log('truthy');
}
```

### 16. Difference between null and undefined?

`undefined` means variable is declared but not assigned.

`null` means intentional empty value.

Example:

```js
let a;
const b = null;

console.log(a); // undefined
console.log(b); // null
```

### 17. What is NaN?

`NaN` means Not-a-Number.

Example:

```js
console.log(Number('abc')); // NaN
```

Important:

```js
console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // true
```

## Scope and Closures

### 18. What is scope?

Scope defines where variables are accessible.

Types:

- global scope
- function scope
- block scope
- module scope

Example:

```js
function test() {
  const name = 'Paras';
  console.log(name);
}

console.log(name); // ReferenceError
```

### 19. What is lexical scope?

"Lexical Scope means variable access is defined by the physical location of the code structure. Inner functions have permanent access to the variables declared in their outer parent scopes, but parent scopes cannot access the inner contents of their children."

Lexical scope means a function can access variables from the place where it was defined.

Example:

```js
function outer() {
  const name = 'Paras';

  function inner() {
    const age = 10;
    console.log("Person Name", name);
  }

  inner();
  // console.log("Person Age", age) // ❌ ERROR: Parent cannot see age. It would throw a ReferenceError!
}

outer(); // Paras
```

### 20. What is closure?

A closure is when a function remembers variables from its outer scope even after the outer function has finished executing.

Example:

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Interview answer:

```text
A closure is a function bundled with its lexical environment. It allows an inner function to access variables from an outer function even after the outer function has returned.
```

### 21. Real use cases of closure?

Use cases:

- private variables
- currying
- memoization
- function factories
- event handlers
- debounce/throttle

Example private variable:

```js
function createUser() {
  let password = 'secret';

  return {
    checkPassword(value) {
      return value === password;
    }
  };
}
```

### 22. What are the disadvantage of closures?
  - High Memory Usage and leaks
  - Garbage Collection Complications
  - Debugging Complexity
  - Overuse can Hurt Performance

### 23. What are the advantages of closures?

Closures are useful because they allow a function to remember variables from its outer scope.

Main advantages:

- data privacy
- function remembers previous values
- useful for callbacks and event handlers
- useful for function factories
- useful for currying
- useful for debounce and throttle
- useful for memoization and caching

#### 1. Data privacy

Closures can create private variables that cannot be accessed directly from outside.

Example:

```js
function createCounter() {
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2

console.log(counter.count); // undefined
```

Here `count` is private. It can be changed only through `increment()`.

#### 2. Remembering values

Closures help a function remember values even after the outer function is finished.

Example:

```js
function greetUser(name) {
  return function () {
    console.log('Hello ' + name);
  };
}

const greetParas = greetUser('Paras');

greetParas(); // Hello Paras
```

Even after `greetUser()` finishes, the inner function remembers `name`.

#### 3. Function factory

Closure can create customized functions.

Example:

```js
function multiplyBy(number) {
  return function (value) {
    return value * number;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

Here `double` remembers `2`, and `triple` remembers `3`.

#### 4. Useful in callbacks

Closures are useful when a callback needs to remember some value.

Example:

```js
function handleButtonClick(buttonName) {
  return function () {
    console.log(buttonName + ' button clicked');
  };
}

const saveClick = handleButtonClick('Save');

saveClick(); // Save button clicked
```

#### 5. Useful in memoization

Closures can store cached values.

Example:

```js
function memoizeAdd() {
  const cache = {};

  return function (a, b) {
    const key = a + ',' + b;

    if (cache[key]) {
      return cache[key];
    }

    cache[key] = a + b;
    return cache[key];
  };
}

const add = memoizeAdd();

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // returns cached 5
```

Interview answer:

```text
The main advantage of closures is that a function can remember variables from its outer scope even after the outer function has completed. This helps with data privacy, function factories, callbacks, currying, memoization, debounce, and throttle.
```

### 24. What are the potential pitfalls of using closures?
Closures can lead to memory leaks if not managed properly, especially when they capture variables that are no longer needed. They can also make debugging more difficult due to the complexity of the scope chain. Additionally, closures can cause performance issues if they are overused or used inappropriately, as they keep references to variables in their scope, which can prevent garbage collection.


### 25. Garbage collection in Javascript?
JavaScript automatically allocates memory when objects are created and frees it when they are not used anymore (garbage collection). This automaticity is a potential source of confusion: it can give developers the false impression that they don't need to worry about memory management.

Memory Life Cycle - 
Regardless of the programming language, the memory life cycle is pretty much always the same:
- Allocate the memory you need
- Use the allocated memory (read, write)
- Release the allocated memory when it is not needed anymore

The second part is explicit in all languages. The first and last parts are explicit in low-level languages but are mostly implicit in high-level languages like JavaScript.

Allocation in JavaScript - 
Value initialization
- In order to not bother the programmer with allocations, JavaScript will automatically allocate memory when values are initially declared.

```js
const n = 123; // allocates memory for a number
const s = "string"; // allocates memory for a string

const o = {
  a: 1,
  b: null,
}; // allocates memory for an object and contained values

// (like object) allocates memory for the array and
// contained values
const a = [1, null, "str2"];

function f(a) {
  return a + 2;
} // allocates a function (which is a callable object)

// function expressions also allocate an object
someElement.addEventListener("click", () => {
  someElement.style.backgroundColor = "blue";
});

```

## Functions

### 26. Function declaration vs function expression?

Function declaration is hoisted.

```js
sayHello();

function sayHello() {
  console.log('Hello');
}
```

Function expression is not usable before initialization.

```js
sayHi(); // ReferenceError

const sayHi = function () {
  console.log('Hi');
};
```

### 27. What is an arrow function?

Arrow function is a shorter syntax for writing functions, and its introduced in ES6 features. It does not create its own this context—instead, it inherits the this value from its surrounding code.

1. No Personal this - It captures the this value of the enclosing lexical context. It can never be bound dynamically.

2. No arguments Object - Regular functions have a built-in local array tracker called arguments that catches every input passed to it. Arrow functions do not have this. If you need a list of inputs, you use the rest parameter (...args) instead:

3. Cannot be used as Constructors (new keyword) - You cannot use an arrow function to build a classical blueprint object class. Trying to run const user = new MyArrowFunction() will throw an immediate runtime crash error.

Example:

```js
const add = (a, b) => a + b;
```

Important:

Arrow functions do not have their own `this`.

### 28. Difference between normal function and arrow function?

Normal function:

- has its own `this`
- has `arguments`
- can be used as constructor

Arrow function:

- does not have its own `this`
- does not have `arguments`
- cannot be used as constructor

Example:

```js
const user = {
  name: 'Paras',
  normal() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  }
};

user.normal(); // Paras
user.arrow(); // undefined
```

### 29. What is a callback function?

A callback is a function passed as an argument to another function.

A callback is a function passed as an argument (input) into another function, with the expectation that it will be executed ("called back") later on.

Example:

```js
function greet(name, callback) {
  callback(`Hello ${name}`);
}

greet('Paras', (message) => {
  console.log(message);
});
```

### 30. What is the typical use case for anonymous functions?

Anonymous functions are commonly used when a function is needed only once.

Use cases:

- callbacks
- event handlers
- array methods
- IIFEs
- promise handlers

Example:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(function (number) {
  return number * 2;
});
```

Arrow functions are also often anonymous:

```js
button.addEventListener('click', () => {
  console.log('Clicked');
});
```

### 31. What is a higher-order function?

A higher-order function a function that does at least one of two things: it either takes one or more functions as arguments, or it returns a new function as its output.

A higher-order function either:

- accepts a function as argument


Example:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((number) => number * 2);
```

`map` is a higher-order function.

- Returns a New Function as an Output

// multiplier is a HIGHER-ORDER FUNCTION because it returns a function
```js
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

// Manufacture custom functions using the HOF
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15
```

### 32. Explain the concept of data binding in JavaScript?

Data binding means keeping data and UI in sync.

In plain JavaScript, you usually update the DOM manually when data changes.

Example:

```js
let count = 0;
const button = document.querySelector('#counter');

button.textContent = count;

button.addEventListener('click', () => {
  count += 1;
  button.textContent = count;
});
```

Types of binding:

- one-way binding: data updates UI
- two-way binding: data updates UI and UI updates data

React mostly uses one-way data flow: state changes, then UI re-renders from that state.

### 33. What are iterators and generators in JavaScript and what are they used for?

An iterator is an object that follows the iterator protocol and returns values using `next()`.

Example:

```js
const iterator = [10, 20][Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

A generator is a special function that can pause and resume using `yield`.

Example:

```js
function* idGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

for (const id of idGenerator()) {
  console.log(id);
}
```

Use cases:

- custom iteration
- lazy sequences
- processing large data step by step
- generating IDs or streams of values

### 34. What are Web Workers and how can they be used to improve performance?

Web Workers enable JavaScript code to run in the background, separate from the main execution thread of a web application. They handle intensive computations without freezing the user interface. Here's a concise example:

```js
main.js:
const worker = new Worker('worker.js');
worker.postMessage('Hello, worker!');

worker.onmessage = (event) => console.log('Message from worker:', event.data);
```

```js
worker.js:
onmessage = (event) => {
  console.log('Message from main script:', event.data);
  postMessage('Hello, main script!');
};
```

There are three main types of workers in JavaScript: Web Workers / Dedicated Workers, Service Workers and Shared Workers.

```js
// Check if the browser supports workers
if (window.Worker) {
  // Create a new Worker
  const myWorker = new Worker('worker.js');

  // Post a message to the worker
  myWorker.postMessage('Hello, Worker!');

  // Listen for messages from the worker
  myWorker.onmessage = function (event) {
    console.log('Message from Worker:', event.data);
  };

  // Error handling
  myWorker.onerror = function (error) {
    console.error('Error from Worker:', error);
  };
}
```

Web Workers / Dedicated Workers
  - Purpose: Handle CPU-intensive tasks (e.g., data processing, computations).
  - Communication: Use postMessage() and onmessage.
  - Security: No direct DOM access.
  - Termination: Ends when the main script unloads or explicitly terminated.

Example: Creating a Web Worker
// Check if the browser supports workers
main.js
if (window.Worker) {
  // Create a new Worker
  const myWorker = new Worker('worker.js');

  // Post a message to the worker
  myWorker.postMessage('Hello, Worker!');

  // Listen for messages from the worker
  myWorker.onmessage = function (event) {
    console.log('Message from Worker:', event.data);
  };

  // Error handling
  myWorker.onerror = function (error) {
    console.error('Error from Worker:', error);
  };
}
worker.js:
// Listen for messages from the main script
onmessage = function (event) {
  console.log('Message from Main Script:', event.data);

  // Perform a task (e.g., some computation)
  const result = event.data + ' - Processed by Worker';

  // Post the result back to the main script
  postMessage(result);
};


Service Workers
- Purpose: Act as a network proxy, handle requests, and cache resources.
- Capabilities: Enable offline functionality and push notifications.
- Lifecycle: Managed by the browser (install, activate, update).
- Security: No direct DOM access.

Example: Creating a Service Worker

main.js:

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((err) => {
      console.log('Service Worker registration failed:', err);
    });
}

service-worker.js:


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});


Shared Workers

Purpose: Shared across multiple scripts in different windows/tabs/iframes.
Use Case: State sharing across multiple browser contexts.



### 35. Difference between normal script, async script, and defer script?

This is a browser JavaScript question.

It explains how the browser loads and executes JavaScript files while parsing HTML.

There are three common ways to load a script:

```html
<script src="app.js"></script>
<script async src="app.js"></script>
<script defer src="app.js"></script>
```

#### 1. Normal script

```html
<script src="app.js"></script>
```

How it works:

```text
HTML parsing starts
  -> browser finds script
  -> HTML parsing stops
  -> script downloads
  -> script executes
  -> HTML parsing continues
```

Meaning:

- blocks HTML parsing
- downloads and executes immediately
- can slow down page rendering
- order is maintained if multiple normal scripts are written one after another

Use case:

```text
Use normal script only when the script must run immediately at that exact position in the HTML.
```

#### 2. async script

```html
<script async src="analytics.js"></script>
```

How it works:

```text
HTML parsing starts
  -> script downloads in parallel
  -> when download completes, HTML parsing pauses
  -> script executes
  -> HTML parsing continues
```

Meaning:

- does not block HTML parsing while downloading
- executes as soon as it is downloaded
- execution order is not guaranteed
- good for independent scripts

Use cases:

- analytics
- ads
- tracking scripts
- third-party widgets that do not depend on other scripts

Important:

```text
Do not use async when scripts depend on each other.
```

Example problem:

```html
<script async src="jquery.js"></script>
<script async src="plugin-that-needs-jquery.js"></script>
```

This can break because the plugin may execute before `jquery.js`.

#### 3. defer script

```html
<script defer src="app.js"></script>
```

How it works:

```text
HTML parsing starts
  -> script downloads in parallel
  -> HTML parsing continues
  -> after HTML parsing completes
  -> script executes before DOMContentLoaded
```

Meaning:

- does not block HTML parsing while downloading
- executes after the HTML document is parsed
- maintains script order
- best for most application scripts

Use case:

```text
Use defer for main application JavaScript because it waits until the DOM is ready and preserves script order.
```

Example:

```html
<script defer src="vendor.js"></script>
<script defer src="app.js"></script>
```

Here `vendor.js` executes before `app.js`.

#### Quick comparison

| Type | Downloads while parsing HTML? | Blocks HTML parsing? | Execution time | Maintains order? |
| --- | --- | --- | --- | --- |
| Normal | No | Yes | Immediately when found | Yes |
| async | Yes | Only during execution | As soon as downloaded | No |
| defer | Yes | No | After HTML parsing completes | Yes |

#### DOMContentLoaded behavior

- Normal script can delay HTML parsing and therefore delay `DOMContentLoaded`.
- `async` script does not wait for HTML parsing and does not wait for `DOMContentLoaded`.
- `defer` script runs after HTML parsing and before `DOMContentLoaded`.

Interview answer:

```text
A normal script blocks HTML parsing while it downloads and executes. An async script downloads in parallel and executes as soon as it is ready, so order is not guaranteed. A defer script downloads in parallel but executes only after HTML parsing is complete, and deferred scripts maintain order. For most app scripts, defer is preferred. For independent third-party scripts like analytics, async is useful.
```

### 36. Explain the concept of memoization in JavaScript and how it can be implemented.

Memoization caches the result of an expensive function call so repeated calls with the same inputs can return quickly.

Example:

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowAdd = memoize((a, b) => a + b);
```

Use memoization for expensive pure functions. Avoid it when inputs are huge, constantly changing, or difficult to serialize safely.

### 37. What is an IIFE?

IIFE means Immediately Invoked Function Expression, and IIFE is a function that gets executes automatically as soon as it is defined. It requires no explicit call later in the script and is primarily used to create local lexical scopes. This isolation prevents variable name bleeding into the global namespace.

Example:

```js
(function () {
  console.log('Runs immediately');
})();
```

Use cases:

- creating a private scope
- avoiding global variable pollution
- running setup code immediately
- older module-like patterns before ES modules

### 38. What is prototypal inheritance in JS?

Prototypal inheritance means one object can access properties and methods from another object through the prototype chain.

In JavaScript, objects do not directly copy methods from another object. Instead, each object has an internal prototype link. If JavaScript does not find a property or method on the current object, it looks for it in the prototype object.

Interview answer:

```text
Prototypal inheritance is JavaScript's inheritance mechanism where objects can inherit properties and methods from other objects through the prototype chain.
```

Example:

```js
const person = {
  greet() {
    return `Hello ${this.name}`;
  }
};

const user = Object.create(person);
user.name = 'Paras';

console.log(user.greet()); // Hello Paras
```

What happens here:

```text
user does not have greet directly.
JavaScript checks user first.
greet is not found on user.
JavaScript checks user's prototype, which is person.
greet is found on person and executed.
```

Prototype chain:

```text
user -> person -> Object.prototype -> null
```

Important:

```text
JavaScript inheritance is prototype-based internally. Classes in JavaScript also use prototypes behind the scenes.
```

#### How to achieve inheritance using functions in JS?

Before ES6 classes, JavaScript used constructor functions and prototypes to create reusable object behavior.

Step 1: Create a parent constructor function.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello ${this.name}`;
};
```

Step 2: Create a child constructor function.

```js
function Employee(name, role) {
  Person.call(this, name); // call parent constructor
  this.role = role;
}
```

Step 3: Connect child prototype with parent prototype.

```js
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;
```

Step 4: Add child-specific methods.

```js
Employee.prototype.work = function () {
  return `${this.name} is working as ${this.role}`;
};
```

Full example:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello ${this.name}`;
};

function Employee(name, role) {
  Person.call(this, name);
  this.role = role;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.work = function () {
  return `${this.name} is working as ${this.role}`;
};

const employee = new Employee('Paras', 'Frontend Developer');

console.log(employee.greet()); // Hello Paras
console.log(employee.work()); // Paras is working as Frontend Developer
```

Interview explanation:

```text
Person.call(this, name) copies parent properties into the child object.
Object.create(Person.prototype) connects the child prototype to the parent prototype.
Employee.prototype.constructor = Employee fixes the constructor reference.
```

What `new Employee()` does:

```text
1. Creates a new empty object.
2. Links the object to Employee.prototype.
3. Calls Employee with this pointing to the new object.
4. Returns the new object.
```

Prototype chain:

```text
employee -> Employee.prototype -> Person.prototype -> Object.prototype -> null
```

#### Why do we have class if we can do inheritance using functions in JS?

JavaScript classes were introduced to make object creation and inheritance easier to read and write.

Important interview point:

```text
class is cleaner syntax over JavaScript's prototype-based inheritance. It does not remove prototypes. It makes prototype inheritance easier to use.
```

Same example using class:

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}

class Employee extends Person {
  constructor(name, role) {
    super(name);
    this.role = role;
  }

  work() {
    return `${this.name} is working as ${this.role}`;
  }
}

const employee = new Employee('Paras', 'Frontend Developer');

console.log(employee.greet()); // Hello Paras
console.log(employee.work()); // Paras is working as Frontend Developer
```

Why classes are useful:

- cleaner and more readable syntax
- easier inheritance using `extends`
- easier parent constructor call using `super`
- less manual prototype setup
- reduces mistakes like forgetting to reset `constructor`
- familiar syntax for developers from other languages

Function constructor vs class:

```text
Function constructor:
Employee.prototype = Object.create(Person.prototype);
Person.call(this, name);

Class:
class Employee extends Person {
  constructor(name) {
    super(name);
  }
}
```

Interview answer:

```text
We can achieve inheritance using constructor functions and prototypes, but classes make the syntax cleaner, safer, and easier to understand. Internally, JavaScript classes still use prototypes.
```

#### What is the difference between `__proto__` and `prototype`?

`prototype` is a property on constructor functions and classes. It defines methods and properties that instances can inherit.

`__proto__` is the prototype link of an object. It points to the object from which the current object inherits.

Example:

```js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return `Hello ${this.name}`;
};

const user = new User('Paras');

console.log(User.prototype); // object containing greet
console.log(user.__proto__ === User.prototype); // true
console.log(user.greet()); // Hello Paras
```

Interview answer:

```text
prototype belongs to constructor functions and classes. It is used to define shared behavior for instances.

__proto__ belongs to objects. It points to the prototype object from which the object inherits.
```

Modern recommendation:

```js
console.log(Object.getPrototypeOf(user) === User.prototype); // true
```

Prefer `Object.getPrototypeOf(obj)` instead of directly using `__proto__`.

### 39. What is pure function?

In JavaScript, a pure function is a function that always returns the same output given the same input arguments and produces absolutely no side effects. It is a foundational concept in functional programming.


### 40. What is currying?

Currying transforms/converts a function with multiple arguments into a sequence of functions. 

Ex - f(a,b,c) => f(a)(b)(c)

Note - Currying is a functional programming technique in JavaScript that transforms a function with multiple arguments into a nested sequence of functions, each taking a single argument. Instead of taking all its parameters at once, the function accepts the first parameter, returns a new function to handle the second parameter, and repeats this chain until all arguments are resolved.

This approach works by leveraging JavaScript closures, allowing inner functions to remember and access variables declared in their outer scopes.

Currying (The Transformation Step) - 
Definition: This is the structural conversion itself.Action: Taking a function like f(a, b, c) and rewriting it into a structure like f(a)(b)(c).
Mechanism: It relies on lexical scoping and closures to remember each argument as it is passed down the chain.

Example:

```js
function add(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add(2)(3)); // 5
```

Arrow version:

```js
const add = (a) => (b) => a + b;
```

## this Keyword

### 41. What is this in JavaScript?

`this` refers to the object that is calling the function.

this is a keyword that acts as a reference to an object, and its value is determined at runtime depending entirely on how and where a function is called.

this is not static and its value changes contextually based on the "call-site" of the code.

Example:

```js
const user = {
  name: 'Paras',
  greet() {
    console.log(this.name);
  }
};

user.greet(); // Paras
```

### 42. How is this decided?

`this` depends on how a function is called.

Rules:

- object method call -> object
- normal function call -> global object or undefined in strict mode
- constructor call -> new object
- call/apply/bind -> explicitly set
- arrow function -> lexical this

### 43. What are call, apply, and bind?

In JavaScript, call, apply, and bind are built-in methods used to explicitly set the this context (the execution context) inside a function. 

They allow you to control which object the this keyword refers to, enabling powerful code reuse and method borrowing.

Note - Basically They are used to set `this`.

`call` passes arguments one by one.

```js
greet.call(user, 'Hello');
```

`apply` passes arguments as array.

```js
greet.apply(user, ['Hello']);
```

`bind` returns a new function.

```js
const boundGreet = greet.bind(user);
boundGreet('Hello');
```

Example:

```js
function greet(message) {
  console.log(`${message}, ${this.name}`);
}

const user = { name: 'Paras' };

greet.call(user, 'Hi'); // Hi, Paras
```

## Objects and Prototypes

### 44. What is an object?

An object is a collection of key-value pairs.

Example:

```js
const user = {
  name: 'Paras',
  age: 25
};
```

### 45. How to access object properties?

Dot notation:

```js
user.name;
```

Bracket notation:

```js
user['name'];
```

Use bracket notation for dynamic keys:

```js
const key = 'name';
console.log(user[key]);
```

### 46. What is prototype?

Every JavaScript object has an internal link to another object called prototype.

Objects can inherit properties and methods from their prototype.

Example:

```js
const arr = [];
console.log(arr.__proto__ === Array.prototype); // true
```

### 47. What is prototype chain?

When JavaScript cannot find a property on an object, it looks up the prototype chain.

Example:

```js
const user = { name: 'Paras' };

console.log(user.toString);
```

`toString` is found through prototype chain.

### 48. What is class in JavaScript?

Class - A class is a blueprint for creating objects.
Class is syntactic sugar over prototype-based inheritance.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello ${this.name}`);
  }
}

const user = new User('Paras');
user.greet();
```

### 49. What is inheritance?

Inheritance allows one class/object to reuse properties and methods from another.

Example:

```js
class Admin extends User {
  deleteUser() {
    console.log('User deleted');
  }
}
```

## Arrays

### 50. Difference between map, filter, and reduce?

`map` transforms each item.

```js
[1, 2, 3].map((n) => n * 2); // [2, 4, 6]
```

`filter` keeps matching items.

```js
[1, 2, 3].filter((n) => n > 1); // [2, 3]
```

`reduce` reduces array to a single value.

```js
[1, 2, 3].reduce((sum, n) => sum + n, 0); // 6
```

### 51. Difference between forEach and map?

`forEach` runs a function for each item and returns `undefined`.

`map` returns a new array.

Example:

```js
const numbers = [1, 2, 3];

const a = numbers.forEach((n) => n * 2);
const b = numbers.map((n) => n * 2);

console.log(a); // undefined
console.log(b); // [2, 4, 6]
```

### 52. How to remove duplicates from an array?

```js
const unique = [...new Set([1, 2, 2, 3])];

console.log(unique); // [1, 2, 3]
```

### 53. How to flatten an array?

```js
const arr = [1, [2, [3]]];

console.log(arr.flat(2)); // [1, 2, 3]
```

Recursive version:

```js
const flatten = (arr) =>
  arr.reduce(
    (result, item) =>
      result.concat(Array.isArray(item) ? flatten(item) : item),
    []
  );
```

### 54. Difference between Stateful and Stateless.

Stateful means an application or system remembers previous interactions (its context or "state").

Stateless means each request is treated as brand new, with no memory of past events.

### 55. Difference between slice and splice?

`slice` returns a copy and does not mutate original array.

```js
const arr = [1, 2, 3];
console.log(arr.slice(1)); // [2, 3]
console.log(arr); // [1, 2, 3]
```

`splice` mutates original array.

```js
const arr = [1, 2, 3];
arr.splice(1, 1);
console.log(arr); // [1, 3]
```

## ES6+ Features

### 56. What are template literals?

Template literals allow string interpolation.

```js
const name = 'Paras';
console.log(`Hello ${name}`);
```

### 57. What is destructuring?

Destructuring extracts values from arrays or objects.

Array:

```js
const [a, b] = [1, 2];
```

Object:

```js
const { name, email } = user;
```

### 58. What is spread operator?

Spread expands values.

Array:

```js
const arr = [1, 2];
const next = [...arr, 3];
```

Object:

```js
const user = { name: 'Paras' };
const updated = { ...user, age: 25 };
```

### 59. What is rest operator?

Rest collects remaining values.

Function:

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
```

Object:

```js
const { name, ...rest } = user;
```

### 60. What are default parameters?

```js
function greet(name = 'Guest') {
  console.log(`Hello ${name}`);
}
```

### 61. What are modules?

Modules allow code to be split and reused.

Export:

```js
export const add = (a, b) => a + b;
```

Import:

```js
import { add } from './math.js';
```

## Copying and Immutability

### 62. Shallow copy vs deep copy?

Shallow copy copies only the first level.

```js
const user = {
  name: 'Paras',
  address: {
    city: 'Bengaluru'
  }
};

const copy = { ...user };
copy.address.city = 'Pune';

console.log(user.address.city); // Pune
```

Deep copy copies nested objects also.

```js
const deepCopy = structuredClone(user);
```

### 63. How to deep clone an object?

Modern way:

```js
const copy = structuredClone(obj);
```

JSON way:

```js
const copy = JSON.parse(JSON.stringify(obj));
```

JSON method limitations:

- removes functions
- converts Date to string
- does not support undefined
- fails for circular references

Difference between Shallow Copy and Deep Copy: 
👥 Shallow Copy
Definition: 
- Copies only the first layer of an object or array.
- Nested Data: Shared by reference between the original and the copy.
- Side Effect: Changing nested items in the copy mutates the original.
- Methods: [...arr], {...obj}, Object.assign(), or arr.slice().

🧬 Deep Copy
- Definition: Copies all layers of an object or array recursively.
- Nested Data: Fully duplicated into brand new memory locations.
- Side Effect: Changing any item in the copy never affects the original.
- Methods: structuredClone(obj) or JSON.parse(JSON.stringify(obj)).

## Asynchronous JavaScript

### 64. What is asynchronous JavaScript?

Asynchronous JavaScript allows long-running work without blocking the main thread.

Asynchronous allows your code to start a long-running task and move on to other tasks immediately, instead of waiting for that task to finish.

Examples:

- API calls
- timers
- file system operations in Node.js
- database calls

⏳ Difference between Synchronous and Asynchronous - 

- Synchronous (Blocking): Tasks execute sequentially one by one. A heavy task blocks the entire webpage.
- Asynchronous (Non-Blocking): Tasks start now and finish later. The webpage remains responsive during execution.

⚙️ How it Works Under the Hood
- Single-Threaded: JavaScript can only execute one line of code at a time.
- Web APIs: Heavy tasks (like fetching data) are handed over to the browser environment.
- Event Loop: This mechanism monitors and pushes completed asynchronous tasks back into the JavaScript execution thread when it becomes empty.

### 65. What is event loop?

Event loop coordinates execution of:

- call stack
- microtask queue
- callback/macrotask queue
- browser/Node APIs

Interview answer:

```text
The event loop checks if the call stack is empty, then pushes queued callbacks or microtasks into the call stack for execution. Microtasks like Promise callbacks run before macrotasks like setTimeout.
```

### 66. Output question: event loop

```js
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');
```

Output:

```text
A
D
C
B
```

Why?

```text
Synchronous code runs first.
Promise microtask runs next.
setTimeout macrotask runs after microtasks.
```

### 67. What is a Promise?

A Promise is an object represents the eventual completion (or failure) of an asynchronous operation and its resulting value, and promise represents a future value.

Think of it like ordering food at a restaurant: 
you get a receipt (the Promise) immediately, which guarantees you will eventually get food (the resolved value) or an error message if the kitchen runs out of ingredients (the rejected reason).

States:

- pending: The initial state; the asynchronous operation is still running.
- fulfilled: The operation completed successfully, and a value is now available.
- rejected: The operation failed, and an error reason is available.

Example:

```js
const promise = new Promise((resolve, reject) => {
  resolve('Done');
});
```

### 68. What is async/await?

`async/await` is syntax built on promises.

Example:

```js
async function fetchUser() {
  try {
    const response = await fetch('/api/users');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
```

### 69. Promise methods: all, allSettled, race, and any

Assume we have three async tasks:

1. Create user
2. Send email
3. Send notification

Interview note:

```text
In a real application, user creation is usually the main task. Email and notification are side effects. So we often create the user first, then run email and notification after that.

But to understand Promise methods clearly, we can use these three promises together and compare their behavior.
```

Base promises:

```js
function createUser(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject('Create user failed');
      } else {
        resolve({ id: 1, name: 'Paras', email: 'paras@example.com' });
      }
    }, 1000);
  });
}

function sendEmail(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject('Email failed');
      } else {
        resolve('Email sent successfully');
      }
    }, 1500);
  });
}

function sendNotification(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject('Notification failed');
      } else {
        resolve('Notification sent successfully');
      }
    }, 500);
  });
}
```

#### Promise states

A promise can be in one of three states:

- `pending`: promise is still running
- `fulfilled`: promise completed successfully
- `rejected`: promise failed

Example:

```js
const promise = createUser();

console.log(promise); // Promise { <pending> }

promise
  .then((result) => {
    console.log('Fulfilled:', result);
  })
  .catch((error) => {
    console.log('Rejected:', error);
  });
```

Important:

```text
Pending does not mean failed. It only means the async task has not finished yet.
```

#### Promise.all()

`Promise.all()` is used when all promises must succeed or resolve, and it will all resolved Promise object in a array. If any of the Promise gets reject means it will return the rejected Promise value[string, object, array].

- Promise.all() is used when multiple promises should run together and all of them must succeed.
- If all promises are fulfilled, Promise.all() returns an array of resolved values in the same order as the promises passed.
- If any one the promise gets rejects, Promise.all() immediately rejects with that rejected reason/value.

Example:

```js
async function registerUserWithAll() {
  try {
    const result = await Promise.all([
      createUser(),
      sendEmail(),
      sendNotification()
    ]);

    console.log(result);
  } catch (error) {
    console.log('Failed:', error);
  }
}

registerUserWithAll();
```

Output after all promises are fulfilled:

```js
[
  { id: 1, name: 'Paras', email: 'paras@example.com' },
  'Email sent successfully',
  'Notification sent successfully'
]
```

Rejected case:

```js
async function registerUserWithAllFailure() {
  try {
    const result = await Promise.all([
      createUser(),
      sendEmail(true),
      sendNotification()
    ]);

    console.log(result);
  } catch (error) {
    console.log('Failed:', error);
  }
}

registerUserWithAllFailure();
```

Output:

```text
Failed: Email failed
```

Important interview point:

```text
Promise.all rejects as soon as any one promise rejects.
But it does not cancel the other promises automatically. Other promises may still continue running in the background.
```

When to use:

```text
Use Promise.all when every task is required.
Example: fetch user details, permissions, and settings before showing dashboard.
```

#### Promise.allSettled()

`Promise.allSettled()` waits for all promises to finish, whether they are fulfilled or rejected.

- Promise.allSettled() is used when multiple promises should run together, but we want the result of every promise whether it succeeds or fails and it returns as a array.
- It always waits for all promises to complete.
- If a promise succeeds, its result will have status: "fulfilled" and value.
- If a promise fails, its result will have status: "rejected" and reason.

Example:

```js
async function registerUserWithAllSettled() {
  const result = await Promise.allSettled([
    createUser(),
    sendEmail(true),
    sendNotification()
  ]);

  console.log(result);
}

registerUserWithAllSettled();
```

Output:

```js
[
  {
    status: 'fulfilled',
    value: { id: 1, name: 'Paras', email: 'paras@example.com' }
  },
  {
    status: 'rejected',
    reason: 'Email failed'
  },
  {
    status: 'fulfilled',
    value: 'Notification sent successfully'
  }
]
```

Important interview point:

```text
Promise.allSettled never fails fast. It gives the final status of every promise.
```

When to use:

```text
Use Promise.allSettled when tasks are independent and you want to know which succeeded and which failed.
Example: create user succeeds, but email fails. You can still return success to the user and retry email later.
```

Real-world style:

```js
async function registerUser() {
  const user = await createUser();

  const sideEffects = await Promise.allSettled([
    sendEmail(),
    sendNotification()
  ]);

  return {
    user,
    sideEffects
  };
}
```

In this flow:

```text
User creation is mandatory.
Email and notification are optional side effects.
```

#### Promise.race()

`Promise.race()` returns the first promise that settles.

Settled means:

- fulfilled, or
- rejected

- Promise.race() is used when multiple promises run together, but we only care about the first promise that finishes.
- It returns the result of the first settled promise whether its resolved or rejected.
- Settled means either resolved or rejected.
- If the first finished promise succeeds, Promise.race() resolves with that value.
- If the first finished promise fails, Promise.race() rejects with that reason.

Promise.race() is useful for timeout handling because whichever finishes first wins: the API response or the timeout.

Example:

```js
async function firstCompletedTask() {
  try {
    const result = await Promise.race([
      createUser(),
      sendEmail(),
      sendNotification()
    ]);

    console.log(result);
  } catch (error) {
    console.log('Failed first:', error);
  }
}

firstCompletedTask();
```

Output:

```text
Notification sent successfully
```

Why?

```text
sendNotification finishes in 500ms, createUser in 1000ms, and sendEmail in 1500ms.
So Promise.race returns the notification result first.
```

Rejected case:

```js
async function raceFailure() {
  try {
    const result = await Promise.race([
      createUser(),
      sendEmail(),
      sendNotification(true)
    ]);

    console.log(result);
  } catch (error) {
    console.log('Failed first:', error);
  }
}

raceFailure();
```

Output:

```text
Failed first: Notification failed
```

When to use:

```text
Use Promise.race when you care about the first completed result, whether success or failure.
Common use case: API timeout.
```

Timeout example:

```js
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('Request timeout');
    }, ms);
  });
}

async function createUserWithTimeout() {
  try {
    const result = await Promise.race([
      createUser(),
      timeout(700)
    ]);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

createUserWithTimeout();
```

Output:

```text
Request timeout
```

#### Promise.any()

`Promise.any()` returns the first fulfilled promise.
It ignores rejected promises until all promises fail.

- Promise.any() is used when multiple promises run together, but we only care about the first successful promise.
- It ignores rejected promises until one promise is fulfilled.
- If any promise succeeds, Promise.any() resolves with the first fulfilled value.
- *** If all promises fail, Promise.any() rejects with an AggregateError: [All promises were rejected]

Example:

```js
async function firstSuccessfulTask() {
  try {
    const result = await Promise.any([
      sendEmail(true),
      sendNotification(),
      createUser()
    ]);

    console.log(result);
  } catch (error) {
    console.log('All promises failed:', error);
  }
}

firstSuccessfulTask();
```

Output:

```text
Notification sent successfully
```

Why?

```text
sendEmail rejects, but Promise.any ignores it.
sendNotification fulfills first, so Promise.any returns that result.
```

All rejected case:

```js
async function allFailedWithAny() {
  try {
    const result = await Promise.any([
      createUser(true),
      sendEmail(true),
      sendNotification(true)
    ]);

    console.log(result);
  } catch (error) {
    console.log(error.name);
    console.log(error.errors);
  }
}

allFailedWithAny();
```

Output:

```text
AggregateError
[
  'Create user failed',
  'Email failed',
  'Notification failed'
]
```

When to use:

```text
Use Promise.any when you need the first successful result and failure of some promises is acceptable.
Example: call multiple mirror APIs and use the first successful response.
```

#### Promise methods interview questions

#### 1. Difference between Promise.all and Promise.allSettled?

Answer:

```text
Promise.all is fail-fast. If one promise rejects, the whole Promise.all rejects.

Promise.allSettled waits for every promise to complete and returns each promise status as fulfilled or rejected.
```

Example use:

```text
Use Promise.all when all data is required.
Use Promise.allSettled when partial success is acceptable.
```

#### 2. Difference between Promise.race and Promise.any?

Answer:

```text
Promise.race returns the first settled promise. It can be success or failure.

Promise.any returns the first fulfilled promise. It ignores rejected promises unless all promises reject.
```

#### 3. Which promise method is best for create user, send email, and send notification?

Answer:

```text
First create the user because it is the main operation.
After that, use Promise.allSettled for sending email and notification, because those are side effects.

If email fails, user creation should not always fail.
```

Example:

```js
async function registerUserSafely() {
  const user = await createUser();

  const result = await Promise.allSettled([
    sendEmail(),
    sendNotification()
  ]);

  return {
    message: 'User created',
    user,
    result
  };
}
```

#### 4. What happens if one promise rejects in Promise.all?

Answer:

```text
Promise.all immediately rejects with that error.
The catch block runs.
```

Important:

```text
Promise.all does not automatically cancel other promises.
```

#### 5. What happens if one promise rejects in Promise.allSettled?

Answer:

```text
Promise.allSettled still waits for all promises.
It returns an array where each item has status fulfilled or rejected.
```

#### 6. What happens if the first promise rejects in Promise.race?

Answer:

```text
Promise.race rejects immediately because it returns the first settled promise.
Settled can mean fulfilled or rejected.
```

#### 7. What happens if some promises reject in Promise.any?

Answer:

```text
Promise.any ignores rejected promises and waits for the first fulfilled promise.
It rejects only when all promises reject.
```

#### 8. What error does Promise.any throw if all promises reject?

Answer:

```text
Promise.any throws AggregateError when all promises reject.
```

#### 9. What if one promise stays pending forever?

Answer:

```text
Promise.all waits forever if any promise remains pending and no promise rejects.
Promise.allSettled waits forever because it needs every promise to settle.
Promise.race may still finish if another promise settles first.
Promise.any may still finish if another promise fulfills first.
```

#### 10. Do promises start only when passed to Promise.all?

Answer:

```text
No. A promise starts executing as soon as it is created.
Promise.all, allSettled, race, and any only observe promises that are already running.
```

Example:

```js
const p1 = createUser(); // starts here
const p2 = sendEmail(); // starts here

await Promise.all([p1, p2]); // waits here
```

#### 11. Quick memory trick

```text
Promise.all        -> all must pass
Promise.allSettled -> wait for all results
Promise.race       -> first finished wins, success or failure
Promise.any        -> first success wins
```

### 70. What is anonymous function with an example?

An anonymous function is a function without a name.

It is usually created when we need a function for a short time, especially as a callback.

Interview answer:

```text
An anonymous function is a function that does not have a name. It is commonly used when a function is needed only once, such as in callbacks, event handlers, array methods, or timers.
```

Normal named function:

```js
function greet() {
  console.log('Hello');
}

greet();
```

Anonymous function assigned to a variable:

```js
const greet = function () {
  console.log('Hello');
};

greet();
```

Here:

```text
The function itself has no name.
But it is stored inside the greet variable.
So we can call it using greet().
```

Anonymous function as a callback:

```js
setTimeout(function () {
  console.log('Runs after 2 seconds');
}, 2000);
```

Anonymous function with array method:

```js
const numbers = [1, 2, 3];

const doubled = numbers.map(function (number) {
  return number * 2;
});

console.log(doubled); // [2, 4, 6]
```

Arrow functions are also commonly anonymous:

```js
const numbers = [1, 2, 3];

const doubled = numbers.map((number) => {
  return number * 2;
});

console.log(doubled); // [2, 4, 6]
```

Event handler example:

```js
button.addEventListener('click', function () {
  console.log('Button clicked');
});
```

Important interview point:

```text
Anonymous functions are useful for short one-time logic, but if the same logic is reused or needs better readability, a named function is better.
```

Named function vs anonymous function:

```js
// Named function
function add(a, b) {
  return a + b;
}

// Anonymous function
const addNumbers = function (a, b) {
  return a + b;
};
```

Simple difference:

```text
Named function has a function name.
Anonymous function does not have a function name.
```

### 71. What is callback with an example?

A callback is a function that is passed as an argument to another function and is executed later.

Interview answer:

```text
A callback is a function passed into another function so that it can be called later, usually after some work is completed.
```

Simple example:

```js
function greet(name, callback) {
  const message = `Hello ${name}`;
  callback(message);
}

function printMessage(message) {
  console.log(message);
}

greet('Paras', printMessage);
```

Output:

```text
Hello Paras
```

Here:

```text
printMessage is passed as a callback.
greet receives it as an argument.
greet calls the callback after preparing the message.
```

Anonymous callback example:

```js
greet('Paras', function (message) {
  console.log(message);
});
```

Arrow function callback example:

```js
greet('Paras', (message) => {
  console.log(message);
});
```

Real-world async callback example:

```js
console.log('Start');

setTimeout(() => {
  console.log('Runs after 2 seconds');
}, 2000);

console.log('End');
```

Output:

```text
Start
End
Runs after 2 seconds
```

Why?

```text
setTimeout takes a callback function.
JavaScript does not wait for 2 seconds.
It continues running the next line.
After 2 seconds, the callback is executed.
```

Common places where callbacks are used:

- event listeners
- `setTimeout`
- `setInterval`
- array methods like `map`, `filter`, `forEach`
- older asynchronous code before promises and async/await

Example with array method:

```js
const numbers = [1, 2, 3];

const doubled = numbers.map((number) => {
  return number * 2;
});

console.log(doubled); // [2, 4, 6]
```

Important interview point:

```text
Callbacks are useful, but too many nested callbacks can make code hard to read. This problem is called callback hell.
```

### 72. What is callback hell?

Callback hell is nested callbacks that make code hard to read.

Example:

```js
login(() => {
  getUser(() => {
    getOrders(() => {
      sendEmail(() => {});
    });
  });
});
```

Solution:

- promises
- async/await
- smaller functions

## Error Handling

### 73. How to handle errors in JavaScript?

Synchronous:

```js
try {
  throw new Error('Something failed');
} catch (error) {
  console.log(error.message);
}
```

Async:

```js
try {
  await fetchData();
} catch (error) {
  console.log(error.message);
}
```

### 74. What is finally?

`finally` runs whether error happens or not.

```js
try {
  await saveData();
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}
```

## DOM and Browser

### 75. What is DOM?

DOM means Document Object Model.

It is a tree representation of HTML that JavaScript can read and modify.

### 76. Event bubbling vs capturing?

Capturing:

```text
document -> parent -> child
```

Bubbling:

```text
child -> parent -> document
```

By default, events bubble.

### 77. What is event delegation?

Event delegation means adding one event listener to a parent instead of many children.

Example:

```js
document.querySelector('#list').addEventListener('click', (event) => {
  if (event.target.matches('button')) {
    console.log('Button clicked');
  }
});
```

Benefits:

- better performance
- works for dynamic elements

### 78. localStorage vs sessionStorage vs cookies?

`localStorage`:

- persists until manually cleared
- around 5-10 MB
- accessible by JavaScript

`sessionStorage`:

- persists only for browser tab session
- accessible by JavaScript

Cookies:

- sent with HTTP requests
- can be HTTP-only
- useful for auth

### 79. What is CORS?

CORS means Cross-Origin Resource Sharing.

It controls whether browser allows frontend from one origin to access backend from another origin.

Example:

```text
Frontend: http://localhost:5174
Backend: http://localhost:5001
```

These are different origins.

## Node.js Basics

### 80. What is Node.js?

Node.js is a JavaScript runtime built on Chrome V8 engine.

It allows JavaScript to run outside the browser.

### 81. CommonJS vs ES Modules?

CommonJS:

```js
const express = require('express');
module.exports = app;
```

ES Modules:

```js
import express from 'express';
export { app };
```

This app uses ES Modules:

```json
"type": "module"
```

### 82. What is middleware?

Middleware is a function that runs between request and response.

Example:

```js
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
```

In Express:

```js
app.use(logger);
```

## Security Questions

### 83. What is XSS?

XSS means Cross-Site Scripting.

It happens when attacker injects malicious JavaScript into a page.

Prevention:

- escape output
- sanitize input
- use Content Security Policy
- avoid dangerously setting HTML

### 84. What is CSRF?

CSRF means Cross-Site Request Forgery.

It tricks authenticated users into sending unwanted requests.

Prevention:

- SameSite cookies
- CSRF tokens
- origin checks

### 85. Why should JWT not be stored in localStorage?

Because XSS can read localStorage.

Better for browser apps:

```text
HTTP-only secure cookie
```

## Performance Questions

### 86. What is debounce?

Debounce delays function execution until user stops triggering it.

Use case:

- search input
- resize event

Implementation:

```js
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

### 87. What is throttle?

Throttle ensures function runs at most once in a given time.

Use case:

- scroll event
- mouse move

Implementation:

```js
function throttle(fn, delay) {
  let lastRun = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastRun >= delay) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}
```

### 88. What is memoization?

Memoization caches expensive function results.

Example:

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

## Tricky Output Questions

### 89. Output question: var loop

```js
for (var i = 0; i < 3; i += 1) {
  setTimeout(() => console.log(i), 0);
}
```

Output:

```text
3
3
3
```

Reason:

`var` is function scoped. All callbacks share same `i`.

### 90. Output question: let loop

```js
for (let i = 0; i < 3; i += 1) {
  setTimeout(() => console.log(i), 0);
}
```

Output:

```text
0
1
2
```

Reason:

`let` creates a new binding for each loop iteration.

### 91. Output question: object reference

```js
const a = { value: 1 };
const b = a;

b.value = 2;

console.log(a.value);
```

Output:

```text
2
```

Reason:

`a` and `b` point to same object.

### 92. Output question: typeof null

```js
console.log(typeof null);
```

Output:

```text
object
```

Reason:

Historical JavaScript behavior.

### 93. Output question: equality

```js
console.log([] == false);
console.log([] === false);
```

Output:

```text
true
false
```

Reason:

`==` does coercion, `===` does not.

### 94. Output question: closure

```js
function outer() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

const counter = outer();

console.log(counter());
console.log(counter());
```

Output:

```text
1
2
```

Reason:

Inner function remembers outer `count`.

## Coding Questions

### 95. Reverse a string

```js
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString('hello')); // 'olleh'
```

### 96. Check palindrome

```js
function isPalindrome(str) {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === normalized.split('').reverse().join('');
}
```

### 97. Find max number

```js
function findMax(numbers) {
  return Math.max(...numbers);
}
```

Without `Math.max`:

```js
function findMax(numbers) {
  return numbers.reduce(
    (max, number) => (number > max ? number : max),
    numbers[0]
  );
}
```

### 98. Count character frequency

```js
function countChars(str) {
  return str.split('').reduce((result, char) => {
    result[char] = (result[char] || 0) + 1;
    return result;
  }, {});
}
```

### 99. Group array by property

```js
function groupBy(items, key) {
  return items.reduce((result, item) => {
    const groupKey = item[key];
    result[groupKey] = result[groupKey] || [];
    result[groupKey].push(item);
    return result;
  }, {});
}

const users = [
  { name: 'Paras', role: 'admin' },
  { name: 'Amit', role: 'member' },
  { name: 'Rahul', role: 'admin' }
];

console.log(groupBy(users, 'role'));
```

### 100. Check anagram

```js
function sortText(text) {
  return text.toLowerCase().split('').sort().join('');
}

function isAnagram(a, b) {
  return sortText(a) === sortText(b);
}
```

### 101. Implement once function

```js
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}
```

### 102. Implement sleep

```js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await sleep(1000);
```

### 103. Retry async function

```js
async function retry(fn, attempts = 3) {
  let lastError;

  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}
```

## React/Frontend JavaScript Questions

### 104. What is immutability and why is it important?

Immutability means not changing existing data directly.

Instead, create a new value.

Example:

```js
const nextUsers = users.map((user) =>
  user.id === id ? { ...user, name: 'Updated' } : user
);
```

Why important:

- predictable state updates
- easier debugging
- React change detection
- Redux best practice

### 105. Why should keys be stable in React lists?

Stable keys help React identify which items changed.

Bad:

```jsx
users.map((user, index) => <User key={index} user={user} />);
```

Good:

```jsx
users.map((user) => <User key={user.id} user={user} />);
```

### 106. What is optional chaining?

Optional chaining safely accesses nested values.

```js
const city = user?.address?.city;
```

Without optional chaining:

```js
const city = user && user.address && user.address.city;
```

### 107. What is nullish coalescing?

`??` returns right side only if left side is `null` or `undefined`.

```js
const limit = inputLimit ?? 10;
```

Difference from `||`:

```js
console.log(0 || 10); // 10
console.log(0 ?? 10); // 0
```

## Backend JavaScript Questions

### 108. What is asyncHandler in Express?

`asyncHandler` wraps async route handlers and forwards errors to Express error middleware.

Example:

```js
const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);
```

Use:

```js
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

### 109. Why use environment variables?

Environment variables store configuration outside code.

Examples:

- database URL
- JWT secret
- Redis URL
- port

Never hardcode secrets in code.

### 110. What is JSON?

JSON means JavaScript Object Notation.

It is a text format used for data exchange.

Example:

```json
{
  "name": "Paras",
  "role": "admin"
}
```

### 111. JSON.stringify vs JSON.parse?

`JSON.stringify` converts object to JSON string.

```js
JSON.stringify({ name: 'Paras' });
```

`JSON.parse` converts JSON string to object.

```js
JSON.parse('{"name":"Paras"}');
```

## Most Important Short Interview Answers

### 112. Explain closure in one line.

```text
A closure is when a function remembers variables from its outer scope even after the outer function has returned.
```

### 113. Explain event loop in one line.

```text
The event loop moves async callbacks and microtasks into the call stack when the stack is empty.
```

### 114. Explain promise in one line.

```text
A promise represents a future value that can be pending, fulfilled, or rejected.
```

### 115. Explain this in one line.

```text
this refers to the execution context and depends on how a function is called.
```

### 116. Explain prototype in one line.

```text
Prototype is JavaScript's inheritance mechanism where objects can access properties and methods from another object.
```

### 117. Explain hoisting in one line.

```text
Hoisting is JavaScript's behavior of processing declarations before code execution.
```

## Final Interview Preparation Checklist

Must know:

- `var`, `let`, `const`
- hoisting
- temporal dead zone
- closures
- scope
- `this`
- arrow functions
- prototypes
- promises
- async/await
- event loop
- microtask vs macrotask
- array methods
- object copying
- equality and coercion
- DOM events
- debounce/throttle
- error handling
- modules
- security basics

Strong answer pattern:

```text
Definition -> Example -> Use case -> Pitfall
```

Example:

```text
Closure is when a function remembers variables from its outer scope. For example, a counter function can keep count private. It is useful for private variables, memoization, and debounce. The pitfall is accidental memory retention if closures hold large objects.
```
