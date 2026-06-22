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

- function scoped
- hoisted with `undefined`
- can be redeclared

`let`:

- block scoped
- hoisted but in temporal dead zone
- cannot be redeclared in same scope

`const`:

- block scoped
- must be initialized
- cannot be reassigned

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

## Does let and const gets hoisted during compilation time?

Yes, let and const are hoisted during the compile phase, but unlike var, they are not initialized with undefined.

How hoisting works for let and const?

1. Compilation phase (Creation): The JavaScript engine reads your code and registers the variable in Memory.

2. Execution Phase (Initialization): Memory is allocated, but the variable in an uninitialized state.

The Temporal Dead Zone (TDZ) -
 Because they are hoised but not initialized, let and const enter a Temporal Dead Zone (TDZ) from the top of the block untill the line where they are actually decalred and assigned a value. 
 
If you attempt to access or use the variable while it is in TDZ, JavaScript will throw a ReferenceError. 

Var Variable
Hoisted - Yes
Initialized during Hoisting - Yes(as undefined)
Accessing becomes declaration - Returns undefined

let/const Variable 
Hoisted - Yes
Initialized during Hoisting - No
Accessing becomes declaration - Throws ReferenceError

### 7. Can const object be changed?

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

### 8. What is hoisting?

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

### 9. What is Temporal Dead Zone?

Temporal Dead Zone is the time between entering a scope and the actual declaration of `let` or `const`.

Example:

```js
console.log(name); // ReferenceError
let name = 'Paras';
```

`let` and `const` are hoisted, but they cannot be accessed before declaration.

## Equality and Type Conversion

### 10. Difference between == and ===?

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

### 11. What is type coercion?

Type coercion means JavaScript automatically converts one data type to another.

Example:

```js
console.log('5' + 2); // '52'
console.log('5' - 2); // 3
console.log(true + 1); // 2
```

### 12. What are truthy and falsy values?

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

### 13. Difference between null and undefined?

`undefined` means variable is declared but not assigned.

`null` means intentional empty value.

Example:

```js
let a;
const b = null;

console.log(a); // undefined
console.log(b); // null
```

### 14. What is NaN?

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

### 15. What is scope?

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

### 16. What is lexical scope?

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

### 17. What is closure?

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

### 18. Real use cases of closure?

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

## Functions

### 19. Function declaration vs function expression?

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

### 20. What is an arrow function?

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

### 21. Difference between normal function and arrow function?

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

### 22. What is a callback function?

A callback is a function passed as an argument to another function.

Example:

```js
function greet(name, callback) {
  callback(`Hello ${name}`);
}

greet('Paras', (message) => {
  console.log(message);
});
```

### 23. What is a higher-order function?

A higher-order function either:

- accepts a function as argument
- returns a function

Example:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((number) => number * 2);
```

`map` is a higher-order function.

### 24. What is an IIFE?

IIFE means Immediately Invoked Function Expression, and IIFE is a function that gets executes automatically as soon as it is defined. It requires no explicit call later in the script and is primarily used to create local lexical scopes. This isolation prevents variable name bleeding into the global namespace.

Example:

```js
(function () {
  console.log('Runs immediately');
})();
```

Use cases:

- avoid polluting global scope
- create private scope

### 25. What is currying?

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

### 26. What is this in JavaScript?

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

### 27. How is this decided?

`this` depends on how a function is called.

Rules:

- object method call -> object
- normal function call -> global object or undefined in strict mode
- constructor call -> new object
- call/apply/bind -> explicitly set
- arrow function -> lexical this

### 28. What are call, apply, and bind?

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

### 29. What is an object?

An object is a collection of key-value pairs.

Example:

```js
const user = {
  name: 'Paras',
  age: 25
};
```

### 30. How to access object properties?

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

### 31. What is prototype?

Every JavaScript object has an internal link to another object called prototype.

Objects can inherit properties and methods from their prototype.

Example:

```js
const arr = [];
console.log(arr.__proto__ === Array.prototype); // true
```

### 32. What is prototype chain?

When JavaScript cannot find a property on an object, it looks up the prototype chain.

Example:

```js
const user = { name: 'Paras' };

console.log(user.toString);
```

`toString` is found through prototype chain.

### 33. What is class in JavaScript?

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

### 34. What is inheritance?

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

### 35. Difference between map, filter, and reduce?

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

### 36. Difference between forEach and map?

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

### 37. How to remove duplicates from an array?

```js
const unique = [...new Set([1, 2, 2, 3])];

console.log(unique); // [1, 2, 3]
```

### 38. How to flatten an array?

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

#### 39. Difference between Statefull and Stateless.

Stateful means an application or system remembers previous interactions (its context or "state").

Stateless means each request is treated as brand new, with no memory of past events.

### 39. Difference between slice and splice?

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

### 40. What are template literals?

Template literals allow string interpolation.

```js
const name = 'Paras';
console.log(`Hello ${name}`);
```

### 41. What is destructuring?

Destructuring extracts values from arrays or objects.

Array:

```js
const [a, b] = [1, 2];
```

Object:

```js
const { name, email } = user;
```

### 42. What is spread operator?

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

### 43. What is rest operator?

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

### 44. What are default parameters?

```js
function greet(name = 'Guest') {
  console.log(`Hello ${name}`);
}
```

### 45. What are modules?

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

### 46. Shallow copy vs deep copy?

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

### 47. How to deep clone an object?

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

### 48. What is asynchronous JavaScript?

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

### 49. What is event loop?

Event loop coordinates execution of:

- call stack
- microtask queue
- callback/macrotask queue
- browser/Node APIs

Interview answer:

```text
The event loop checks if the call stack is empty, then pushes queued callbacks or microtasks into the call stack for execution. Microtasks like Promise callbacks run before macrotasks like setTimeout.
```

### 50. Output question: event loop

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

### 51. What is a Promise?

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

### 52. What is async/await?

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

### 53. Promise.all vs Promise.allSettled?

`Promise.all` fails if any promise rejects.

```js
await Promise.all([p1, p2, p3]);
```

`Promise.allSettled` waits for all promises, whether fulfilled or rejected.

```js
await Promise.allSettled([p1, p2, p3]);
```

### 54. Promise.race vs Promise.any?

`Promise.race` returns first settled promise, success or failure.

`Promise.any` returns first fulfilled promise and ignores rejections until all fail.

### 55. What is callback hell?

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

### 56. How to handle errors in JavaScript?

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

### 57. What is finally?

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

### 58. What is DOM?

DOM means Document Object Model.

It is a tree representation of HTML that JavaScript can read and modify.

### 59. Event bubbling vs capturing?

Capturing:

```text
document -> parent -> child
```

Bubbling:

```text
child -> parent -> document
```

By default, events bubble.

### 60. What is event delegation?

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

### 61. localStorage vs sessionStorage vs cookies?

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

### 62. What is CORS?

CORS means Cross-Origin Resource Sharing.

It controls whether browser allows frontend from one origin to access backend from another origin.

Example:

```text
Frontend: http://localhost:5174
Backend: http://localhost:5001
```

These are different origins.

## Node.js Basics

### 63. What is Node.js?

Node.js is a JavaScript runtime built on Chrome V8 engine.

It allows JavaScript to run outside the browser.

### 64. CommonJS vs ES Modules?

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

### 65. What is middleware?

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

### 66. What is XSS?

XSS means Cross-Site Scripting.

It happens when attacker injects malicious JavaScript into a page.

Prevention:

- escape output
- sanitize input
- use Content Security Policy
- avoid dangerously setting HTML

### 67. What is CSRF?

CSRF means Cross-Site Request Forgery.

It tricks authenticated users into sending unwanted requests.

Prevention:

- SameSite cookies
- CSRF tokens
- origin checks

### 68. Why should JWT not be stored in localStorage?

Because XSS can read localStorage.

Better for browser apps:

```text
HTTP-only secure cookie
```

## Performance Questions

### 69. What is debounce?

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

### 70. What is throttle?

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

### 71. What is memoization?

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

### 72. Output question: var loop

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

### 73. Output question: let loop

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

### 74. Output question: object reference

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

### 75. Output question: typeof null

```js
console.log(typeof null);
```

Output:

```text
object
```

Reason:

Historical JavaScript behavior.

### 76. Output question: equality

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

### 77. Output question: closure

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

### 78. Reverse a string

```js
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString('hello')); // 'olleh'
```

### 79. Check palindrome

```js
function isPalindrome(str) {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === normalized.split('').reverse().join('');
}
```

### 80. Find max number

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

### 81. Count character frequency

```js
function countChars(str) {
  return str.split('').reduce((result, char) => {
    result[char] = (result[char] || 0) + 1;
    return result;
  }, {});
}
```

### 82. Group array by property

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

### 83. Check anagram

```js
function sortText(text) {
  return text.toLowerCase().split('').sort().join('');
}

function isAnagram(a, b) {
  return sortText(a) === sortText(b);
}
```

### 84. Implement once function

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

### 85. Implement sleep

```js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await sleep(1000);
```

### 86. Retry async function

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

### 87. What is immutability and why is it important?

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

### 88. Why should keys be stable in React lists?

Stable keys help React identify which items changed.

Bad:

```jsx
users.map((user, index) => <User key={index} user={user} />);
```

Good:

```jsx
users.map((user) => <User key={user.id} user={user} />);
```

### 89. What is optional chaining?

Optional chaining safely accesses nested values.

```js
const city = user?.address?.city;
```

Without optional chaining:

```js
const city = user && user.address && user.address.city;
```

### 90. What is nullish coalescing?

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

### 91. What is asyncHandler in Express?

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

### 92. Why use environment variables?

Environment variables store configuration outside code.

Examples:

- database URL
- JWT secret
- Redis URL
- port

Never hardcode secrets in code.

### 93. What is JSON?

JSON means JavaScript Object Notation.

It is a text format used for data exchange.

Example:

```json
{
  "name": "Paras",
  "role": "admin"
}
```

### 94. JSON.stringify vs JSON.parse?

`JSON.stringify` converts object to JSON string.

```js
JSON.stringify({ name: 'Paras' });
```

`JSON.parse` converts JSON string to object.

```js
JSON.parse('{"name":"Paras"}');
```

## Most Important Short Interview Answers

### 95. Explain closure in one line.

```text
A closure is when a function remembers variables from its outer scope even after the outer function has returned.
```

### 96. Explain event loop in one line.

```text
The event loop moves async callbacks and microtasks into the call stack when the stack is empty.
```

### 97. Explain promise in one line.

```text
A promise represents a future value that can be pending, fulfilled, or rejected.
```

### 98. Explain this in one line.

```text
this refers to the execution context and depends on how a function is called.
```

### 99. Explain prototype in one line.

```text
Prototype is JavaScript's inheritance mechanism where objects can access properties and methods from another object.
```

### 100. Explain hoisting in one line.

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
