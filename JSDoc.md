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

JavaScript happens entirely at runtime, but it uses a hybrid process where compilation and execution both occur simultaneously while the program is running.

Unlike ahead-of-time (AOT) languages like C++ or Rust—where compilation happens before the program is shipped—JavaScript code is processed, compiled, and executed all at once on the user's machine.

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

### 2. Is compile time the same as runtime?
Compile-time and Runtime are the two programming terms used in the software development. 

Compile-time is the time at which the source code is converted into an executable code while the run time is the time at which the executable code is started running.

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

Hoisting is the process of moving the variable declarations to the top of their scope during compilation.

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

### 12. What is Temporal Dead Zone(TDZ)?
A temporal dead zone (TDZ) is the area of a block where a variable is inaccessible until the moment the computer completely initializes it with a value.

The Temporal Dead Zone (TDZ) in JavaScript is the specific period from the start of a block scope until the moment a variable is declared and initialized. If you attempt to access, read, or write to a variable while it is trapped within this zone, JavaScript will immediately throw a ReferenceError.

Code Example of the TDZ
The zone is "temporal" (time-based) rather than spatial (location-based). It depends entirely on the execution order of your code, not just the physical layout of the lines.

```js
{
    // ─── START OF BLOCK SCOPE ───
    // The TDZ for 'myVariable' begins here.

    console.log(myVariable); 
    // ❌ Throws ReferenceError: Cannot access 'myVariable' before initialization

    // The TDZ is still active here...

    let myVariable = "Hello World"; 
    // ─── END OF TDZ ───
    // 'myVariable' is now initialized.

    console.log(myVariable); 
    //  Logs: "Hello World"
}
```
Why the TDZ Occurs
The TDZ is directly tied to hoisting. In JavaScript, all variable declarations are hoisted (lifted) to the top of their enclosing scope before execution begins. However, they are treated differently based on their keyword:

- let and const: They are hoisted to the top of their block, but they remain uninitialized. JavaScript forbids any interaction with an uninitialized variable, keeping it in the TDZ until the engine runs the exact line where it is declared.
- var: Variables declared with var do not have a TDZ. They are hoisted and instantly initialized with a default value of undefined. This allows them to be accessed before their actual declaration line without crashing your program.

Comparison: let/const vs var
Here is how let / const compare to var across key JavaScript features:

Hoisting
- let / const: Yes, they are hoisted.
- var: Yes, it is hoisted.
Initial Value
- let / const: Uninitialized.
- var: Automatically initialized as undefined.
Temporal Dead Zone (TDZ)
- let / const: Yes, the TDZ applies.
- var: No TDZ exists.
Early Access Behavior
- let / const: Immediately throws a ReferenceError.
- var: Returns undefined safely.
Scope Type
- let / const: Block scope { ... }.
- var: Function or Global scope.

Why Did JavaScript Introduce the TDZ?
The TDZ was introduced in ECMAScript 6 (ES6) as a safety mechanism to build more reliable software. It helps developers by:
- Catching Bugs Early: Accessing a variable before setting its value is usually an accidental programming mistake.
- Enforcing Best Practices: It forces you to write cleaner habits, ensuring you always declare variables before using them.
- Protecting const: A const variable can never change its value once set. If it were hoisted as undefined like a var, it would technically shift values later, breaking its core design rule.

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

### 18. Why everything in javascript is an Object?
The phase "everything in JavaScript is an object" is technically a myth, though it correctly describes how JavaScript behaves on the surface. In reality, JavaScript is divided into two distinct categories: primitives and objects.

The reason this misconception persists is due to two fundamental architectural designs in JavaScript: Prototypal Inheritance and a mechanism known as Autoboxing (Object Wrapping).

1. Complex Types are Literally Objects
In many programming languages, complex structures like arrays, functions, and dates are unique, distinct data types. In JavaScript, these are all built on top of the base Object prototype.
- Arrays: Under the hood, an array is just a specialized object with numeric keys, a tracked length property, and extra array-specific methods.
- Functions: Functions are "first-class citizens" and are actually callable objects. You can freely assign properties or pass methods to a function just like a normal object.
- Regular Expressions, Maps, and Sets: These are also specialized object instances built from their respective constructors.

2. The Illusion of Objects: Autoboxing
The biggest reason people think everything is an object is that you can run methods on primitive values like strings, numbers, and booleans (e.g., "hello".toUpperCase() or (4.567).toFixed(2)).

Primitives do not have methods or properties, and they are immutable. When you try to call a method on a primitive, JavaScript performs a temporary transformation behind the scenes:

const name = "alex";
const upper = name.toUpperCase(); 

Behind the scenes, JavaScript executes the equivalent of these steps:
- Boxes the string primitive into a temporary wrapper object: new String("alex").
- Runs the .toUpperCase() method on that temporary object.
- Returns the resulting new primitive string value.
- Disposes of the temporary object to free up memory stack space.

This architectural trick keeps primitives lightweight and fast, while giving developers the convenience of object-like functionality.

3. The Grandparent: The Prototype Chain
Every structural data type in JavaScript eventually traces back to Object.prototype. If you follow the internal prototype chain of an array, a custom class, or a function up to its logical end, it points back to the universal root object.

// Following an array's prototype lineage
myArray.__proto__ === Array.prototype;          // true
Array.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null;             // true (The end of the line)

Summary: What is Not an Object?
To understand JavaScript fully, you must know what is explicitly excluded from the object family. JavaScript contains 7 primitive data types that are not objects and do not have prototypes:

## Scope and Closures

### 18. What is scope?

Scope defines where variables are accessible.

Scope in JavaScript refers to the current context of execution, which determines the accessibility (visibility) of variables, functions, and objects to different parts of your code. If a variable is not within the current scope, it cannot be used or accessed.Think of scope as an automatic boundary that decides who can see and use your data.

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

## Global Scope
A variable has global scope when it is declared outside of any function or block. It can be accessed from anywhere in your entire JavaScript program. However, let/const and var treat the global object (like window in browsers or global in Node.js) very differently.

- Visibility: Everywhere in your entire code.
- Lifespan: Until the browser tab or application closes.

```js
Code Example: var vs let/const Globals
// Both are declared in the global scope
var globalVar = "I attach to the window object";
let globalLet = "I stay private to the global scope";

// 1. Both can be accessed directly anywhere:
console.log(globalVar); // 🟢 Logs: "I attach to the window object"
console.log(globalLet); // 🟢 Logs: "I stay private to the global scope"

// 2. Checking the global 'window' object properties:
console.log(window.globalVar); // 🟢 Logs: "I attach to the window object"
console.log(window.globalLet); // 🟡 Logs: undefined (It does not attach!)
```

Key Differences Added to the Comparison List - 

Global Object Attachment
- var: Automatically adds itself as a property on the global window object. This can accidentally overwrite existing browser properties and cause bugs.
- let / const: Does not attach to the global object. It is stored securely in an invisible declarative environment record.

Redeclaration Protection
- var: Allows you to redeclare the same global variable multiple times without warning.
- let / const: Throws a SyntaxError if you try to redeclare the same variable in the global scope.

## Block Scope (let / const)
Variables declared with let or const are bound to the nearest pair of curly braces {}. They do not exist outside of that specific block.

- Visibility: Only inside those exact curly braces.
- Keywords: Strictly enforced only by let and const.

```js
if (true) {
    let blockScoped = "I am trapped inside this block!";
    console.log(blockScoped); //  Logs: "I am trapped inside this block!"
}
// Trying to access it outside the block:
console.log(blockScoped); 
// ❌ Throws ReferenceError: blockScoped is not defined
```

## Function Scope (var)
Variables declared with var ignore blocks like if statements or for loops. They are only confined by the boundaries of an entire function.

- Visibility: Only inside that specific function.
- Keywords: Created by var, let, or const.

```js
function myFunction() {
    if (true) {
        var functionScoped = "I can escape if blocks!";
    }
    // Accessing it outside the if block, but inside the function:
    console.log(functionScoped); 
    //  Logs: "I can escape if blocks!"
}
myFunction();
// Trying to access it outside the function:
console.log(functionScoped); 
// ❌ Throws ReferenceError: functionScoped is not defined
```

## Module Scope - 
Variables declared inside a JavaScript Module (import/export files) live here.
- Visibility: Only within that specific file.
- Lifespan: As long as the module is loaded.
Example: Other files cannot see these variables unless you explicitly export them.

## Why This Matters: The for Loop Trap
Using var in loops can lead to unexpected bugs because the variable leaks out into the surrounding scope.

The var Issue
```js
for (var i = 0; i < 3; i++) {
    // Loop runs...
}
console.log(i); //  Logs: 3 (The variable leaked out!)
```

The let Fix
```js
for (let j = 0; j < 3; j++) {
    // Loop runs...
}
console.log(j); // ❌ Throws ReferenceError: j is not defined (Safely contained!)
```

### 19. What is Execution Context?
An execution context is the abstract environment where code is evaluated and executed in JavaScript. It acts as a container holding all the necessary information for the code to run—including local variables, function arguments, the this keyword, and a reference to outer scopes.

The Two Phases
Every execution context is created and managed in two main steps:
- Creation Phase: The JavaScript engine sets up the environment. It allocates memory for variables (assigning undefined as a placeholder) and functions, sets up the scope chain, and binds the this keyword.
- Execution Phase: The engine runs the code line by line, assigning actual values to the variables and executing the logic.

Types of Execution Contexts
There are three main types:
- Global Execution Context (GEC): The default environment. Created as soon as the JavaScript file loads, it represents the global scope. There is only one GEC for the entire program.
- Function Execution Context (FEC): Created every time a function is invoked. It handles all the code and variables specific to that function.
- Eval Execution Context: Created when executing code inside the eval() function (which is rarely used).

How the Engine Manages Them: The Call Stack
Because JavaScript is single-threaded, it handles multiple execution contexts using a Call Stack (which follows a Last-In, First-Out principle).

When a script starts, the Global Execution Context is pushed to the bottom of the stack. Whenever you call a function, the engine creates a new FEC, pushes it to the top of the stack, and executes it. Once the function finishes, its context is popped off the stack, and the engine resumes executing the context below it.

### 19. What is call stack?
The JavaScript Call Stack is a mechanism used by the JavaScript engine to keep track of function execution in a script. It acts like a digital "to-do list" that records which function is currently running and which functions are called from within that function.

Key Characteristics
- Single-Threaded: JavaScript has only one call stack. It can execute only one task or function at a time.
- LIFO Structure: It operates on a Last-In, First-Out (LIFO) principle. The last function pushed onto the stack is the first one to be popped off (completed and removed).
- Synchronous Execution: Code execution is synchronous. Each function call blocks the execution of the code below it until it finishes.

How It Works (Step-by-Step)
When your JavaScript file loads, the engine processes code sequentially through these phases:

- Global Execution Context: Before any custom functions run, the engine creates a Global Execution Context and pushes it to the bottom of the stack.

- Pushing a Function: When a function is invoked, a new execution context (called a stack frame) is created for it and pushed onto the top of the stack.

- Handling Nested Calls: If the current function calls another function, the script pauses execution, creates a new frame, and pushes the new function to the top of the stack.

- Popping a Function: Once a function hits a return statement or reaches its final bracket, it finishes executing. The engine pops it off the top of the stack and resumes where it left off in the function below it.

Code Example and Stack Visualization
Consider the following script:

function multiply(a, b) {
    return a * b;
}

function square(n) {
    let result = multiply(n, n);
    return result;
}

function printSquare(num) {
    let output = square(num);
    console.log(output);
}

printSquare(4);

As the JavaScript engine processes printSquare(4), the call stack changes dynamically:

Here is the step-by-step execution of the code example, broken down into chronological points:
- Step 1: The script starts running, and the engine pushes the Global Context to the bottom of the stack.
- Step 2: The engine invokes printSquare(4) and pushes printSquare onto the stack, right above the Global Context.
- Step 3: Inside printSquare, the engine encounters square(4). It pauses printSquare and pushes square to the top of the stack.
- Step 4: Inside square, the engine encounters multiply(4, 4). It pauses square and pushes multiply to the very top of the stack.
- Step 5: The multiply function finishes its calculation and returns 16. The engine pops multiply off the stack, leaving square back at the top.
- Step 6: The square function receives the value, completes its execution, and returns 16. The engine pops square off the stack, leaving printSquare at the top.
- Step 7: The printSquare function resumes, executes console.log(16), and finishes. The engine pops printSquare off the stack.
- Step 8: The script reaches the end of the file, the Global Context is popped off, and the stack becomes entirely empty.

### 19. What is a Stack Overflow?
Because the call stack has a limited size (usually between 10,000 to 15,000 frames depending on the browser), it can run out of memory.

A Stack Overflow occurs when a function calls itself recursively without a terminating base case (infinite recursion). The stack continuously grows until it exceeds its limit and crashes the script with a Maximum call stack size exceeded error.

```js
// This will cause a Stack Overflow error
function recurse() {
    recurse(); 
}
recurse();
```

If you are debugging complex code, you can open your browser's DevTools, look at the Sources or Debugger tab, and find the Call Stack window to inspect the exact path your application took to reach a breakpoint.

### 19. What is Event Loop?
The Event Loop is the core mechanism that allows JavaScript to perform non-blocking, asynchronous operations despite being a single-threaded language. It acts like an invisible coordinator, continuously monitoring your code's execution state and deciding exactly when to run pending asynchronous tasks.

The Core Architecture
To understand the Event Loop, you must understand the four primary parts of the JavaScript runtime environment:

- Call Stack: A Last-In, First-Out (LIFO) stack where JavaScript keeps track of functions currently executing.
- Web APIs / Node APIs: Background environments provided by the browser or Node.js to handle slow tasks like setTimeout, fetch() network requests, or DOM events.
- Microtask Queue: A high-priority staging line specifically for Promise callbacks (.then, .catch) and async/await continuations.
- Callback Queue (Macrotask Queue): A lower-priority staging line for older asynchronous APIs like setTimeout, setInterval, and UI event listeners.

How It Works Step-by-Step
The Event Loop runs continuously in the background and executes a strict lifecycle loop:

[ Step 1: Run Synchronous Code in Call Stack ] 
                       |
                       v
[ Step 2: Call Stack Becomes Completely Empty ]
                       |
                       v
[ Step 3: Flush ALL Tasks in Microtask Queue (Promises) ]
                       |
                       v
[ Step 4: Run ONE Task from Callback Queue (setTimeout) ]
                       |
                       v
            (Repeat indefinitely...)

1. Execute Synchronous Tasks: JavaScript runs code line-by-line, pushing and popping functions onto the Call Stack.
2. Offload Asynchronous Operations: When an async task appears (e.g., a network request), it is pushed to the Web APIs to run in the background, freeing up the Call Stack immediately.
3. Queue Completed Callbacks: Once the background Web API finishes, its corresponding callback function is sent to either the Microtask Queue or the Callback Queue.
4. The Event Loop Check: The Event Loop continuously monitors the Call Stack. The split-second the Call Stack is completely empty, it processes tasks:
- It executes all pending items in the Microtask Queue first.
- It then takes exactly one item from the Callback Queue and executes it.

Where are tasks executed?
They are executed in the Call Stack. No JavaScript code ever executes anywhere else.

The queues (Microtask and Callback queues) are purely holding areas for functions waiting for their turn. They do not have an execution engine of their own.

The exact handoff process:
1. The Call Stack becomes completely empty.
2. The Event Loop looks at the Microtask Queue and sees a waiting Promise callback.
3. The Event Loop plucks that callback out of the queue.
4. The Event Loop pushes that callback directly onto the empty Call Stack.
5. The JavaScript engine executes the code inside the Call Stack.
6. Once finished, the function is popped off the Call Stack, and the loop checks for the next task.

```js
Code Example & Execution Order
Consider this classic interview snippet:

console.log("Start");

setTimeout(() => {
  console.log("Timeout (Macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise (Microtask)");
});

console.log("End");
```

Output:
Start
End
Promise (Microtask)
Timeout (Macrotask)

Why did this happen?
- "Start" and "End" print instantly because they are synchronous.
- Even though setTimeout has a delay of 0ms, its callback must wait in the lower-priority Callback Queue.
- The Promise callback goes to the Microtask Queue.
- When the Call Stack clears, the Event Loop prioritizes the Microtask Queue over the Callback Queue, running the Promise log before the Timeout log.

### 19. Why do Microtasks(Promises) have higher priority than Macrotasks(setTimeout and setInterval)?
Microtasks have higher priority than macrotasks to ensure the application state remains consistent and updated immediately before the browser renders the next frame. By clearing the microtask queue first, JavaScript guarantees that asynchronous state changes (like Promise resolutions) are completely processed without giving the user interface a chance to render half-baked or outdated data.

🔄 The Event Loop Execution Order
The JavaScript Event Loop follows a strict order of operations during each cycle:
- Execute Synchronous Code: The call stack runs all immediate code until it is empty.
- Clear the Microtask Queue: JavaScript processes every single microtask in the queue, including any new ones added while processing.
- Render Updates: The browser updates the visual screen if a repaint is needed.
- Execute One Macrotask: The event loop picks exactly one macrotask from the queue and pushes it to the call stack.
- Repeat: The loop goes back to step 2.

💡 Why This Priority Matters
1. Preventing Visual FlickeringIf macrotasks ran before microtasks, the browser might render a frame showing an incomplete UI state. Executing microtasks first ensures all underlying data is stable before the browser paints the screen.
2. Immediate State ConsistencyMicrotasks usually handle critical asynchronous updates like data fetching callbacks or state changes. They need to execute as soon as possible after the synchronous code finishes, without waiting for heavier layout operations, rendering cycles, or user input events.

🔹 Common Examples
- Microtasks: Promise.then, queueMicrotask, and MutationObserver.
- Macrotasks: setTimeout, setInterval, setImmediate, I/O operations, and UI rendering events.

🔹 Execution Timing
- Microtasks: Run immediately after the current call stack becomes completely empty.
- Macrotasks: Run only after the call stack empties and the entire microtask queue is clear.

🔹 Queue Handling
- Microtasks: The event loop processes all queued items until the microtask queue is empty.
- Macrotasks: The event loop processes exactly one item per loop iteration before checking other queues.

🔹 Blocking Risk
- Microtasks: High risk, because infinite microtask loops will completely freeze the browser UI.
- Macrotasks: Low risk, because they naturally yield control back to the event loop after each task.

### 19. Difference between Microtask vs Macrotask in js?
In JavaScript, the core difference is that microtasks have a higher execution priority than macrotasks within the Event Loop. After the main synchronous script runs, the JavaScript engine will completely empty the entire Microtask Queue before moving on to execute a single task from the Macrotask Queue.

Microtask Queue
- Priority: Higher execution priority.
- Execution Rule: Entire queue is completely drained in one go.
- UI Rendering: Runs before the browser updates the UI.
- Common Examples: Promise.then/catch/finally, queueMicrotask(), MutationObserver.

Macrotask Queue (Task Queue)
- Priority: Lower execution priority.
- Execution Rule: Only one task is executed per Event Loop iteration.
- UI Rendering: Runs after UI updates or across separate ticks.
- Common Examples: setTimeout(), setInterval(), UI Events, I/O tasks.

Key Execution Differences
- Synchronous code always runs first and clears the Call Stack.
- The engine drains the entire microtask queue right after synchronous code finishes.
- New microtasks added during execution run immediately in the same cycle.
- Only one macrotask runs per Event Loop cycle.
- The engine checks for new microtasks again after that single macrotask finishes.

### 19. How call stack work when async await is used in js?
When an async function encounters an await keyword, the function's execution frame is popped entirely off the JavaScript call stack. This behavior prevents the engine from blocking the main thread while waiting for an asynchronous operation to finish. Instead of waiting, the JavaScript engine yields control back to the event loop, allows the caller function to continue running, and resumes the paused function later.

Here is a step-by-step breakdown of how the call stack, memory heap, and queues interact during this process.

1. Synchronous Execution Up to the await
When an async function is called, it initially executes synchronously.
- The engine creates an execution context frame for the async function.
- It pushes this frame onto the top of the Call Stack.
- It executes all the code inside the function line-by-line until it encounters the first await keyword.

2. Hitting the await Keyword
As soon as the engine evaluates the await expression:
- The expression is evaluated: The operation following await (e.g., a fetch() call or a Promise) is executed.
- State Preservation: The local variables, execution state, and exact point of code progression of the async function are saved into the Memory Heap.
- Popped from Stack: The async function's context frame is removed (popped) from the Call Stack.
- Implicit Promise Return: The function returns an implicit Promise to its initial caller.

3. Yielding Control back to the Event Loop
Because the call stack is now clear of that specific async function frame:
- The engine continues running any synchronous code left in the program (such as the code belonging to the caller function).
- The main execution thread remains completely responsive to user events, rendering tasks, or other scripts.

4. Promise Resolution and the Microtask Queue
Behind the scenes, the asynchronous operation continues to progress outside the main thread (via Web APIs in browsers or C++ threads in Node.js).
- Once the awaited Promise settles (resolves or rejects), the engine schedules a PromiseReactionJob.
- A callback representing the remaining portion of the async function is placed into the Microtask Queue.

5. Resuming Execution on the Call Stack
The final resumption relies entirely on the Event Loop.
- The Event Loop constantly monitors the Call Stack to see if it is empty.
- Once the Call Stack is completely clear of all synchronous execution frames, the Event Loop pulls the continuation callback from the Microtask Queue.
- The engine looks up the saved execution state from the Memory Heap, recreates the function's context frame, and pushes it back onto the Call Stack.
- The function resumes execution exactly where it left off, assigning the resolved value to your variable.

Code Execution Walkthrough
```js
async function fetchData() {
  console.log("2. Inside async function"); 
  const result = await Promise.resolve("Data Loaded");
  console.log("4. Resumed:", result); 
}

console.log("1. Global start");
fetchData();
console.log("3. Global end");
```

What happens to the Call Stack during this script?
- console.log("1...") goes to the stack, executes, and pops off.
- fetchData() is called. Its frame is pushed to the Call Stack.
- console.log("2...") is pushed to the stack, executes, and pops off.
- The engine hits await Promise.resolve().
  - fetchData() context is moved to the Heap.
  - fetchData() is popped off the Call Stack.
  - The remaining code of fetchData() is scheduled into the Microtask Queue.
- The stack is now empty, so control returns to the global context. console.log("3...") is pushed to the stack, executes, and pops off.
- The global script finishes. The Call Stack is now completely empty.
- The Event Loop picks up the remaining fetchData() callback from the Microtask Queue.
- fetchData() frame is pushed back onto the Call Stack.
- console.log("4. Resumed: Data Loaded") executes and pops off.
- fetchData() finishes and pops off the stack permanently.

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
  - High Memory Usage and leaks -A memory leak occurs when a closure retains references to outer variables, preventing the garbage collector from freeing up that memory, even after the outer function has finished executing. Because the inner function needs to "remember" its lexical scope, the referenced variables remain alive in memory.
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

### 26. What is Memory Leaks in Javascript?
A memory leak happens when a computer program keeps holding onto pieces of data it no longer needs, forgetting to release them back to the computer's memory pool. Think of it like renting a hotel room, checking out, but forgetting to return the keys—the hotel cannot rent that room to anyone else, so space is wasted. Over time, your application slows down or crashes.

### 27. What caused memory leaks?
JavaScript automatically manages memory using a system called Garbage Collection. This system looks for data that cannot be reached anymore and deletes it. However, if your code accidentally keeps a reference (a link) to that data, the garbage collector will not delete it.

The most common causes include:
- Accidental Global Variables: Creating variables without using const, let, or var attaches them permanently to the main window object.
- Forgotten Timers: Running a setInterval or setTimeout function that keeps executing code in the background forever.
- Detached DOM Nodes: Removing an element from the visual web page but still keeping it stored inside a JavaScript variable.
- Closures: Inner functions that hold onto large variables from their parent functions long after they are needed.

### 28. How to identify memory leaks?
You can spot memory leaks using the built-in Developer Tools in Google Chrome, Firefox, or Edge.
- Task Manager: Press Shift + Esc in Chrome to see if your tab's memory usage keeps climbing without ever dropping
- Performance Monitor: Open DevTools (F12), go to the Performance tab, and watch the real-time "JS Heap" graph. If it looks like a rising staircase, you have a leak.
- Memory Snapshots: Take a "Heap Snapshot" in the Memory tab, perform actions in your app, take another snapshot, and compare them to see what objects stayed behind.

### 29. How to handle/prevent memory leaks?
Preventing memory leaks is all about cleaning up after your code finishes its job.
- Use Strict Mode: Always write "use strict"; at the top of your files or use modern JS modules to stop accidental global variables.
- Clear Your Timers: Always save your timers to a variable and clear them when done using clearInterval() or clearTimeout().
- Remove Event Listeners: If you add a scroll or click listener to an element, remove it using removeEventListener() when that element is destroyed.
- Nullify References: Set large objects or variables to null once you are completely finished using them to signal the garbage collector to clear them.

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
function fetchData(callback, name) {
    const user = {age: 45}
    callback(name, user)
}

function showMsg(name, user) {
    console.log("Hello Mr...", name , "age is: ", user.age)
}

fetchData(showMsg, "paras")
```

### 30. What is AbortController, and how does it cancel or retry API requests?

The `AbortController` interface is a controller object that allows you to abort one or more Web requests as and when desired.

`AbortController` is a browser/Node API used to **cancel** async work, most commonly a `fetch` request.

Simple idea:

```text
AbortController = remote control
abort()         = press stop
signal          = wire connected to fetch / timeout / custom async work
```

When you call `controller.abort()`, anything listening to `controller.signal` should stop.

#### Main pieces

| Piece | Meaning |
|---|---|
| `AbortController` | Creates the controller |
| `controller.signal` | Pass this to `fetch` (or other APIs) |
| `controller.abort()` | Cancel the linked request/work |
| `AbortError` / `AbortSignal` reason | How you detect "cancelled on purpose" |

#### Step-by-step: cancel a fetch request

```text
1. Create controller = new AbortController()
2. Call fetch(url, { signal: controller.signal })
3. If user leaves page / types again / clicks cancel -> controller.abort()
4. fetch rejects with an abort error
5. You ignore abort errors (not a real failure) and handle real errors normally
```

Example:

```js
const controller = new AbortController();

async function loadUsers() {
  try {
    const response = await fetch('/api/users', {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const users = await response.json();
    console.log(users);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request was cancelled');
      return;
    }

    console.error('Real error:', error);
  }
}

loadUsers();

// later: cancel the in-flight request
controller.abort();
```

#### Step-by-step: cancel previous request (search / filter pattern)

This is the most common real UI case: user types fast, old API calls must die.

```text
1. Keep one currentController variable
2. On every new search, abort the previous controller
3. Create a new AbortController for the new request
4. Pass the new signal to fetch
5. Only the latest request is allowed to update UI
```

```js
let currentController = null;

async function searchUsers(query) {
  // Step 1: cancel previous in-flight request
  if (currentController) {
    currentController.abort();
  }

  // Step 2: create a fresh controller for this request
  currentController = new AbortController();

  try {
    const response = await fetch(`/api/users?q=${encodeURIComponent(query)}`, {
      signal: currentController.signal,
    });

    const users = await response.json();
    renderUsers(users); // only latest successful response should reach here
  } catch (error) {
    if (error.name === 'AbortError') {
      // expected when user typed again; ignore
      return;
    }
    showError(error);
  }
}

// user types: "p" -> "pa" -> "par"
// old requests for "p" and "pa" get aborted
searchUsers('p');
searchUsers('pa');
searchUsers('par');
```

Important clarification (common confusion):

`abort()` runs **before** creating the new controller, so it cancels the **old** request, not the new one.

```text
abort()                 = stop the request that is already running
new AbortController()   = prepare the new search
fetch(...)              = start the new search
```

What happens when user types `p` -> `pa` -> `par`:

**1. User types `p`**

```text
currentController = null

if (currentController) abort()   -> skipped (null)

currentController = new AbortController()   // Controller-A for "p"
fetch('/api/users?q=p', { signal: Controller-A.signal })
  -> "p" request is in flight
```

**2. User types `pa` (while `p` is still running)**

```text
currentController is still Controller-A  (the "p" one)

if (currentController) abort()
  -> Controller-A.abort()
  -> cancels the "p" fetch   (old request dies)

currentController = new AbortController()   // Controller-B for "pa"
fetch('/api/users?q=pa', { signal: Controller-B.signal })
  -> "pa" request starts
```

So on `pa`:
- `abort()` cancels **`p`**
- then a **new** controller starts **`pa`**

`pa` is not cancelled by that `if (currentController)` check. That check cancels whatever was stored from the **previous** call (`p`).

**3. User types `par` (while `pa` is still running)**

```text
abort Controller-B  -> cancels "pa"
new Controller-C    -> starts "par"
```

| Moment | What gets aborted | What starts |
|---|---|---|
| Type `p` | nothing | `p` |
| Type `pa` | `p` | `pa` |
| Type `par` | `pa` | `par` |

Why aborted requests do not update the UI:

When `p` is aborted, its `fetch` rejects with `AbortError`, and this runs:

```js
if (error.name === 'AbortError') {
  return; // ignore, do not call renderUsers
}
```

So only the latest successful response (usually `par`) calls `renderUsers`.

Key line order to remember:

```js
if (currentController) {
  currentController.abort();      // kill PREVIOUS request
}

currentController = new AbortController();  // create CURRENT request's controller
fetch(..., { signal: currentController.signal });
```

#### Step-by-step: timeout with AbortController

```js
async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
```

Modern browsers also support:

```js
await fetch(url, { signal: AbortSignal.timeout(5000) });
```

#### Step-by-step: retries with AbortController

Important point:

```text
Abort = cancel this attempt
Retry = start a new attempt with a new AbortController
```

Do not reuse one aborted controller for the next retry. Create a new one each attempt.

```js
async function fetchWithRetry(url, { retries = 3, signal } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    // If parent already cancelled (page unmount / user cancel), stop retrying
    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    // Each attempt gets its own controller, linked to parent signal
    const attemptController = new AbortController();

    const onParentAbort = () => attemptController.abort();
    signal?.addEventListener('abort', onParentAbort, { once: true });

    try {
      const response = await fetch(url, { signal: attemptController.signal });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;

      // Do not retry if user/parent cancelled
      if (error.name === 'AbortError') {
        throw error;
      }

      // Optional: small delay before next retry
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
      }
    } finally {
      signal?.removeEventListener('abort', onParentAbort);
    }
  }

  throw lastError;
}

// usage
const pageController = new AbortController();

fetchWithRetry('/api/users', {
  retries: 3,
  signal: pageController.signal,
})
  .then(console.log)
  .catch((error) => {
    if (error.name === 'AbortError') {
      console.log('Cancelled; no more retries');
      return;
    }
    console.error(error);
  });

// user leaves page -> cancel current attempt and prevent further retries
pageController.abort();
```

Retry flow in plain words:

```text
Attempt 1 fails (network/5xx)
  -> wait briefly
Attempt 2 starts with a NEW AbortController
  -> if parent.abort() happens, attempt stops and loop ends
Attempt 3 ...
  -> success or final error
```

#### What else can we do with AbortController?

| Use case | How |
|---|---|
| Cancel `fetch` | Pass `{ signal }` to fetch |
| Cancel previous search/filter calls | Abort old controller before new request |
| Request timeout | `abort()` after N ms, or `AbortSignal.timeout(ms)` |
| Cancel on page leave / component unmount | Abort in cleanup (`useEffect` return) |
| Stop retries | Pass parent signal into retry helper |
| Cancel `addEventListener` | `element.addEventListener('click', fn, { signal })` then abort |
| Cancel `setTimeout` / custom async loops | Check `signal.aborted` or listen to `abort` event |
| Cancel streams / ReadableStream work | Pass signal where supported, or stop reading on abort |
| Link multiple operations | One abort can cancel fetch + timeout + listeners together |

Event listener example:

```js
const controller = new AbortController();

button.addEventListener(
  'click',
  () => {
    console.log('clicked');
  },
  { signal: controller.signal }
);

// later: remove listener automatically
controller.abort();
```

React cleanup example:

```js
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/users', { signal: controller.signal })
    .then((res) => res.json())
    .then(setUsers)
    .catch((error) => {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    });

  return () => controller.abort(); // cancel when component unmounts
}, []);
```

#### Common mistakes

- Reusing an already aborted controller for a new request (create a new one)
- Treating `AbortError` like a real API failure (usually ignore it)
- Retrying after abort (should stop)
- Forgetting to pass `signal` into `fetch` (abort will do nothing)

#### Interview answer

```text
AbortController lets us cancel async work through a signal. For fetch, I pass controller.signal and call controller.abort() to cancel. For fast typing or filters, I abort the previous request before starting a new one. For retries, each attempt gets a new controller, and a parent signal can stop the whole retry loop. Besides fetch, it can cancel timeouts, event listeners, and unmount/cleanup work.
```

### 31. What is the typical use case for anonymous functions?

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

### 32. What is a higher-order function?

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

### 33. Explain the concept of data binding in JavaScript?

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

### 34. What are iterators and generators in JavaScript and what are they used for?

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

### 35. What are Web Workers and how can they be used to improve performance?

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
```js
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
```

Service Workers
- Purpose: Act as a network proxy, handle requests, and cache resources.
- Capabilities: Enable offline functionality and push notifications.
- Lifecycle: Managed by the browser (install, activate, update).
- Security: No direct DOM access.

Example: Creating a Service Worker

```js
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
```

Shared Workers

Purpose: Shared across multiple scripts in different windows/tabs/iframes.
Use Case: State sharing across multiple browser contexts.

### 36. Difference between normal script, async script, and defer script?

This is a browser JavaScript question.

It explains how the browser loads and executes JavaScript files while parsing HTML.

There are three common ways to load a script:

```html
<script src="app.js"></script>
<script async src="app.js"></script>
<script defer src="app.js"></script>
```

When loading external script files (<script src="...">), browsers block HTML parsing by default to download and run the script. async and defer prevent this blocking behavior during downloading, but they execute at different times.

- <script async>
- Download - Downloads in the background parallel to HTML parsing.
- Execution Timing - Executes immediately after downloading finishes, pausing HTML parsing.
- Execution Order - No order guaranteed. The script that downloads first runs first.
- DOM Dependency - Risky for DOM manipulation; the DOM might not be fully loaded yet.
- Best Used For - Independent scripts (e.g., Google Analytics, tracking ads).

- <script defer>
- Download - Downloads in the background parallel to HTML parsing.
- Execution Timing - Executes only after the HTML document is fully parsed.
- Execution Order - Strict document order. Scripts run exactly in the order they are written.
- DOM Dependency - Safe for DOM manipulation; always runs before DOMContentLoaded.
- Best Used For - Interdependent scripts or scripts that require page elements (e.g., UI logic).

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

### 37. Explain the concept of memoization in JavaScript and how it can be implemented.

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

### 38. What is an IIFE?

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

### 39. What is prototypal inheritance in JS?

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

### 40. What is pure function?

In JavaScript, a pure function is a function that always returns the same output given the same input arguments and produces absolutely no side effects. It is a foundational concept in functional programming.


### 41. What is currying?

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

### 42. What is this in JavaScript?

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

### 43. How is this decided?

`this` depends on how a function is called.

Rules:

- object method call -> object
- normal function call -> global object or undefined in strict mode
- constructor call -> new object
- call/apply/bind -> explicitly set
- arrow function -> lexical this

### 44. What are call, apply, and bind?

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

### 45. What is an object?

An object is a collection of key-value pairs.

Example:

```js
const user = {
  name: 'Paras',
  age: 25
};
```

### 46. How to access object properties?

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

### 47. What is prototype?

Every JavaScript object has an internal link to another object called prototype.

Objects can inherit properties and methods from their prototype.

Example:

```js
const arr = [];
console.log(arr.__proto__ === Array.prototype); // true
```

### 48. What is prototype chain?

When JavaScript cannot find a property on an object, it looks up the prototype chain.

Example:

```js
const user = { name: 'Paras' };

console.log(user.toString);
```

`toString` is found through prototype chain.

### 49. What is class in JavaScript?

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

### 50. What is inheritance?

Inheritance allows one class/object to reuse properties and methods from another.

Example:

```js
class Admin extends User {
  deleteUser() {
    console.log('User deleted');
  }
}
```

### 51. What is composition in JavaScript?

Composition means building complex behavior by **combining smaller parts**, instead of creating a long parent-child inheritance chain.

Composition in JS just means building something bigger by combining smaller, simple pieces — instead of one giant function or class trying to do everything, you build small focused pieces and snap them together like Lego blocks.
There are two common flavors:

Simple idea:

```text
Inheritance  -> is-a   (Admin is a User)
Composition  -> has-a  (User has an Address, has a Logger)
```

In interviews, "composition" usually means one of these two:

1. **Object composition** — an object uses other objects/functions as parts
2. **Function composition** — combine small functions into one pipeline

#### 1) Object composition (most common meaning)

Instead of forcing everything through `extends`, you create an object that **owns or uses** other helpers.

Inheritance style:

```js
class CanFly {
  fly() {
    console.log('flying');
  }
}

// Awkward: not every bird needs the same hierarchy
class Bird extends CanFly {}
```

Composition style:

```js
const canFly = {
  fly() {
    console.log(`${this.name} is flying`);
  },
};

const canSwim = {
  swim() {
    console.log(`${this.name} is swimming`);
  },
};

function createDuck(name) {
  return {
    name,
    ...canFly,
    ...canSwim,
  };
}

const duck = createDuck('Donald');
duck.fly();  // Donald is flying
duck.swim(); // Donald is swimming
```

Another practical example (has-a):

```js
function createLogger() {
  return {
    log(message) {
      console.log(`[log] ${message}`);
    },
  };
}

function createUser(name, logger = createLogger()) {
  return {
    name,
    login() {
      logger.log(`${name} logged in`);
    },
  };
}

const user = createUser('Paras');
user.login(); // [log] Paras logged in
```

Here `User` does not inherit from `Logger`. It **uses** a logger. That is composition.

#### 2) Function composition

Function composition means the output of one function becomes the input of the next.

```js
const trim = (text) => text.trim();
const toLower = (text) => text.toLowerCase();
const exclaim = (text) => `${text}!`;

// compose right-to-left: exclaim(toLower(trim(value)))
const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);

const formatMessage = compose(exclaim, toLower, trim);

formatMessage('  Hello  '); // "hello!"
```

Pipe style (left-to-right, often easier to read):

```js
const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

const formatMessage = pipe(trim, toLower, exclaim);
formatMessage('  Hello  '); // "hello!"
```

#### Composition vs inheritance

| Point | Inheritance | Composition |
|---|---|---|
| Relationship | is-a | has-a / uses |
| Flexibility | Can become rigid deep trees | Easy to mix behaviors |
| Coupling | Child depends on parent | Parts stay more independent |
| Common advice | Useful for true hierarchies | Prefer when behaviors vary |

Why many teams prefer composition:

- avoids deep and fragile class hierarchies
- easier to reuse small behaviors
- clearer ownership of responsibilities
- fits JavaScript well (objects + functions are easy to combine)

#### Interview answer

```text
Composition means building features by combining smaller objects or functions, instead of relying only on inheritance. In JavaScript, object composition is a has-a relationship, like a user using a logger. Function composition combines small functions into a pipeline. I prefer composition when behavior needs to be mixed flexibly, and I use inheritance only for clear is-a hierarchies.
```

## Arrays

### 52. Difference between map, filter, and reduce?

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

### 53. Difference between forEach and map?

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

### 54. How to remove duplicates from an array?

```js
const unique = [...new Set([1, 2, 2, 3])];

console.log(unique); // [1, 2, 3]
```

### 55. How to flatten an array?

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

### 56. Difference between Stateful and Stateless.

Stateful means an application or system remembers previous interactions (its context or "state").

Stateless means each request is treated as brand new, with no memory of past events.

### 57. Difference between slice and splice?

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

The Splice Arguments
The splice(start, deleteCount) method takes two primary numbers here:
1 (First argument): The starting index. This tells JavaScript to start looking at index 1 (which is the number 2).
1 (Second argument): The number of items to delete. This tells JavaScript to remove exactly 1 item starting from that position.

## ES6+ Features

### 58. What are template literals?

Template literals allow string interpolation.

```js
const name = 'Paras';
console.log(`Hello ${name}`);
```

### 59. What is destructuring?

Destructuring extracts values from arrays or objects.

Array:

```js
const [a, b] = [1, 2];
```

Object:

```js
const { name, email } = user;
```

### 60. What is spread operator?

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

### 61. What is rest operator?

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

### 62. What are default parameters?

```js
function greet(name = 'Guest') {
  console.log(`Hello ${name}`);
}
```

### 63. What are modules?

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

### 64. Shallow copy vs deep copy?

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

### 65. How to deep clone an object?

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

### 66. What is asynchronous JavaScript?

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

### 69. What is a Promise?

A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value, and promise represents a future value.

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

### 70. What is async/await?

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

### 71. Promise methods: all, allSettled, race, and any

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

### 72. What is anonymous function with an example?

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

### 73. What is callback with an example?

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

### 74. What is callback hell?

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

### 75. How to handle errors in JavaScript?

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

### 76. What is finally?

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

### 77. What is DOM?

DOM means Document Object Model.

It is a tree representation of HTML that JavaScript can read and modify.

### 78. Event bubbling vs capturing?

Capturing:

```text
document -> parent -> child
```

Bubbling:

```text
child -> parent -> document
```

By default, events bubble.

### 79. What is event delegation?

Event delegation means adding one event listener to a parent instead of many children.

Event delegation is a JavaScript design pattern used to handle events efficiently by attaching a single event listener to a parent element instead of adding separate listeners to multiple individual child elements.

This technique relies entirely on event bubbling, a mechanism where an event triggered on a nested child element propagates (bubbles) upward through its ancestor elements in the DOM tree. When the event reaches the parent container, the parent's listener fires, and you can identify the exact target that triggered the event using the event.target property.

How It Works (Step-by-Step)
- A user interacts with a child element (e.g., clicking a button inside a list).
- The browser triggers the event on that specific child element.
- The event bubbles up to the parent and higher ancestor nodes.
- The parent's event listener detects the bubbling event and executes its handler function.
- Inside the handler, event.target is checked to ensure the event originated from an element you care about.

Code Example
Imagine an unordered list (<ul>) containing multiple list items (<li>).

```js
❌ The Inefficient Way (Without Delegation)
Attaching a listener to every single <li> consumes more memory and breaks if you add new items dynamically.

const items = document.querySelectorAll('li');
items.forEach(item => {
  item.addEventListener('click', (e) => {
    console.log('Clicked:', e.target.textContent);
  });
});
```

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

The Efficient Way (With Event Delegation)
You attach exactly one listener to the <ul> and use event.target.matches() to target specific children.

```js
const list = document.querySelector('ul');

list.addEventListener('click', (event) => {
  // Filter out clicks that didn't happen on an LI element
  if (event.target.matches('li')) {
    console.log('Clicked item text:', event.target.textContent);
  }
});
```

Why Use Event Delegation?
- Lower Memory Footprint: Instead of initializing hundreds of separate event listeners, you only manage one, saving browser RAM.
- Handles Dynamic Elements: If your app frequently injects or removes elements via JavaScript, the parent listener will automatically pick up events from new children without needing manual re-binding.
- Cleaner Codebase: Consolidates event logic into a centralized place, keeping your DOM interaction tidier.

Limitations to Keep in Mind
- Not All Events Bubble: Certain native events do not bubble up the DOM tree. Common exceptions include focus, blur, scroll, mouseenter, and mouseleave. For these events, delegation will fail unless you use capturing alternatives like focusin or focusout.
- CPU Overhead: If the handler executes on a top-level element (like document) for a highly frequent event (like mousemove), checking event.target on every movement can occasionally cause a performance bottleneck.

### 80. localStorage vs sessionStorage vs cookies?

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

### 81. What is CORS?

CORS means Cross-Origin Resource Sharing.

It controls whether browser allows frontend from one origin to access backend from another origin.

Example:

```text
Frontend: http://localhost:5174
Backend: http://localhost:5001
```

These are different origins.


### 88. What is debounce?

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

### 89. What is throttle?

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

### 90. What is memoization?

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

### 91. Output question: var loop

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

### 92. Output question: let loop

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

### 93. Output question: object reference

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

### 94. Output question: typeof null

```js
console.log(typeof null);
```

Output:

```text
object
```

Reason:

Historical JavaScript behavior.

### 95. Output question: equality

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

### 96. Output question: closure

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

### 97. Reverse a string

```js
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString('hello')); // 'olleh'
```

### 98. Check palindrome

```js
function isPalindrome(str) {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === normalized.split('').reverse().join('');
}
```

### 99. Find max number

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

### 100. Count character frequency

```js
function countChars(str) {
  return str.split('').reduce((result, char) => {
    result[char] = (result[char] || 0) + 1;
    return result;
  }, {});
}
```

### 101. Group array by property

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

### 102. Check anagram

```js
function sortText(text) {
  return text.toLowerCase().split('').sort().join('');
}

function isAnagram(a, b) {
  return sortText(a) === sortText(b);
}
```

### 103. Implement once function

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

### 104. Implement sleep

```js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await sleep(1000);
```

### 105. Retry async function

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

### 106. What is immutability and why is it important?

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

### 107. Why should keys be stable in React lists?

Stable keys help React identify which items changed.

Bad:

```jsx
users.map((user, index) => <User key={index} user={user} />);
```

Good:

```jsx
users.map((user) => <User key={user.id} user={user} />);
```

### 108. What is optional chaining?

Optional chaining safely accesses nested values.

```js
const city = user?.address?.city;
```

Without optional chaining:

```js
const city = user && user.address && user.address.city;
```

### 109. What is nullish coalescing?

Nullish coalescing is a JavaScript logical operator (??) that returns its right-hand side operand when its left-hand side operand is either null or undefined.

`??` returns right side only if left side is `null` or `undefined`.

Otherwise, it returns its left-hand side operand. It is explicitly designed to handle missing or uninitialized data without accidentally treating valid "falsy" values (like 0, "", or false) as missing.

```js
const limit = inputLimit ?? 10;
```

Difference from `||`:

```js
console.log(0 || 10); // 10
console.log(0 ?? 10); // 0
```

Why It Was Created: Fixing the OR (||) Operator Problem
- Before the introduction of ?? in ES2020, developers used the logical OR (||) operator to assign default values. However, || checks for falsy values. In JavaScript, 0, empty strings "", and false are all falsy. This often created unintended bugs when those falsy values were actually valid, intentional inputs.

Code Examples
1. Setting Default Configuration Values

```js
const userSettings = {
  theme: "dark",
  animationSpeed: 0, // Valid setting!
  sidebarVisible: false // Valid setting!
};

// ❌ The old, buggy way using ||
const speedOld = userSettings.animationSpeed || 300; 
console.log(speedOld); // Output: 300 (Wrong! It overwrote the valid 0)

//  The modern way using ??
const speedNew = userSettings.animationSpeed ?? 300; 
console.log(speedNew); // Output: 0 (Correct! It preserved the 0)
```

2. Handling Missing Object Properties
```js
const profile = {
  nickname: "" // Valid choice, user wants no nickname
};

const displayName1 = profile.nickname || "Anonymous";
console.log(displayName1); // Output: "Anonymous" (Overwrote empty string)

const displayName2 = profile.nickname ?? "Anonymous";
console.log(displayName2); // Output: "" (Kept the empty string)
```

Key Syntax Rules

- Chaining with AND/OR: For safety and clarity, you cannot mix ?? directly with && or || operators without using parentheses.

```js
// ❌ Throws a SyntaxError
const value = a || b ?? "default"; 

//  Perfectly valid
const value = (a || b) ?? "default"; 
```

- Short-circuiting: Just like ||, the ?? operator only evaluates the right-hand side expression if the left-hand side is null or undefined. If the left side is valid, the right side is never run.


### 110. What is Symbol in js?
In JavaScript, a Symbol is a primitive data type introduced in ECMAScript 6 (ES6) that is guaranteed to be completely unique and immutable. They are primarily used as unique property keys for objects to prevent name collisions, ensuring that no other property key can accidentally overwrite or conflict with them.

Core Characteristics
- Guaranteed Uniqueness: Every time you invoke the Symbol() factory function, a brand-new, completely unique token is created.
- Debugging Labels: You can pass an optional string argument to Symbol('description'). This acts strictly as a description for logging and debugging; it does not impact the symbol's uniqueness.
- No new Keyword: You cannot use new Symbol(), as it is a primitive factory function rather than a standard constructor class.
- Hidden/Non-enumerable: Property keys defined by symbols are skipped in normal iterations like for...in loops, Object.keys(), and serialization tasks via JSON.stringify().

Code Example
```js
// Two symbols with identical descriptions are completely different
const firstId = Symbol("userId");
const secondId = Symbol("userId");

console.log(firstId === secondId); // false

// Using a symbol as an object property key
const user = {
  name: "Alice",
  [firstId]: 101 // Computed property syntax
};

console.log(user[firstId]); // 101
console.log(user[secondId]); // undefined (keys do not match)

// Symbol properties are non-enumerable
console.log(Object.keys(user)); // ["name"] (firstId is hidden)
```

### 111. What is the difference between map and set in javascript?
The primary difference is that a Map stores data as key-value pairs, whereas a Set stores a collection of unique individual values.

Here is the core comparison broken down into clear lists:

Map Overview
- Data Structure: Two-dimensional format storing pairs of keys and values.
- Elements: Stored as [key, value] pairs.
- Duplicates: Keys must be unique, but multiple keys can hold identical values.
- Primary Methods: .set(), .get(), .has(), and .delete().
- Primary Use Case: Ideal for dictionary lookups, caching, and data association.

Set Overview
- Data Structure: One-dimensional format storing a list of individual values.
- Elements: Stored as unique standalone values.
- Duplicates: All values must be strictly unique; duplicates are ignored.
- Primary Methods: .add(), .has(), and .delete().
- Primary Use Case: Ideal for tracking unique items and removing array duplicates.

Key Differences Explained
1. How Data is Accessed
  - Map: Elements are accessed via their specific keys using the .get(key) method.
  - Set: Elements cannot be accessed by an index or key. You primarily use .has(value) to check if a value exists within the collection.
2. Unique Constraints
  - Map: If you add a duplicate key using .set(), the new value will overwrite the old value associated with that key.
  - Set: If you add a duplicate value using .add(), the Set object will silently ignore it and keep only one instance
3. Iteration Behavior
  - Map: Iterating with a for...of loop yields a two-element array of [key, value] for each step.
  - Set: Iterating with a for...of loop yields the individual value directly

Code Examples
JavaScript Map Example
Use a Map when you need to link lookup descriptions to identifiers.

```js
const userRoles = new Map();

// Adding elements
userRoles.set('alice', 'admin');
userRoles.set('bob', 'editor');

// Accessing data
console.log(userRoles.get('alice')); // Output: 'admin'
console.log(userRoles.has('bob'));   // Output: true
console.log(userRoles.size);         // Output: 2
```

JavaScript Set Example
Use a Set when you want to enforce a list of unique entries.
```js
const uniqueTags = new Set();

// Adding elements
uniqueTags.add('js');
uniqueTags.add('css');
uniqueTags.add('js'); // Duplicate ignored!

// Accessing data
console.log(uniqueTags.has('js'));   // Output: true
console.log(uniqueTags.size);        // Output: 2

// Quick trick: Remove duplicates from a standard Array
const duplicateNumbers = [1, 2, 2, 3, 4, 4];
const cleanNumbers = [...new Set(duplicateNumbers)]; 
console.log(cleanNumbers);           // Output: [1, 2, 3, 4]
```

