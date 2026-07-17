# JavaScript Interview Code Snippets

## 1. What is the difference between `var`, `let`, and `const`?

```js
var city = 'Delhi';
var city = 'Mumbai'; // allowed: var can be redeclared

let count = 1;
count = 2; // allowed: let can be reassigned 
// let count = 3; // Error: let cannot be redeclared in the same scope

const user = { name: 'Asha' };
user.name = 'Ravi'; // allowed: object contents can change
// user = { name: 'Sam' }; // Error: const cannot be reassigned
```

Answer:

- `var` is function-scoped, can be redeclared, and is usually avoided in modern code.
- `let` is block-scoped and can be reassigned.
- `const` is block-scoped and cannot be reassigned. It does not make an object immutable.

## 2. What is hoisting?

```js
console.log(a); // undefined
var a = 10;

// console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

Answer:

JavaScript processes declarations before running the code. A `var` declaration is hoisted and initialized with `undefined`. `let` and `const` are also hoisted, but stay in the temporal dead zone until their declaration line runs.

Function declarations are fully available before their position:

```js
sayHello(); // Hello

function sayHello() {
  console.log('Hello');
}
```

## 3. What is an IIFE?

```js
(() => {
  const token = 'private-token';
  console.log('Application started');
})();

console.log(token); // ReferenceError
```

Answer:

IIFE means Immediately Invoked Function Expression. It is a function created and executed immediately. Before ES modules and block-scoped `let`/`const`, it was commonly used to avoid creating global variables.

## 4. What does `this` refer to?

```js
const user = {
  name: 'Asha',
  regularMethod() {
    console.log(this.name);
  },
  arrowMethod: () => {
    console.log(this.name);
  },
};

user.regularMethod(); // Asha
user.arrowMethod();   // usually undefined in a module
```

Answer:

For a regular function, `this` depends on how the function is called. In `user.regularMethod()`, `this` is `user`.

An arrow function does not create its own `this`; it captures `this` from its surrounding scope. Therefore, an arrow function is usually not suitable as an object method when the method needs the object as `this`.

```js
function greet() {
  console.log(`Hello ${this.name}`);
}

greet.call({ name: 'Ravi' }); // Hello Ravi
```

`call`, `apply`, and `bind` can explicitly control `this` for regular functions.

## 5. How does the event loop decide the output order?

```js
console.log('1: start');

setTimeout(() => console.log('2: timeout'), 0);

Promise.resolve().then(() => console.log('3: promise'));

console.log('4: end');
```

Output:

```text
1: start
4: end
3: promise
2: timeout
```

Answer:

Synchronous code runs first. Promise callbacks are microtasks, so they run after the current synchronous code but before timer callbacks. `setTimeout` callbacks are tasks (macrotasks), even when the delay is `0`.

## 6. What is a Promise?

```js
function getUser() {
  return Promise.resolve({ id: 1, name: 'Asha' });
}

getUser()
  .then((user) => console.log(user.name)) // Asha
  .catch((error) => console.error(error))
  .finally(() => console.log('Request finished'));
```

Answer:

A Promise represents a value that may be available later. It has three states: `pending`, `fulfilled`, and `rejected`. Use `.then()` for success, `.catch()` for errors, and `.finally()` for cleanup.

The same code using `async`/`await`:

```js
async function loadUser() {
  try {
    const user = await getUser();
    console.log(user.name); // Asha
  } catch (error) {
    console.error(error);
  }
}
```

## 7. What is the difference between `setTimeout` and `setInterval`?

```js
setTimeout(() => {
  console.log('Runs once after at least one second');
}, 1000);

const intervalId = setInterval(() => {
  console.log('Runs repeatedly about every second');
}, 1000);

setTimeout(() => {
  clearInterval(intervalId); // stop the repeated work
}, 5000);
```

Answer:

`setTimeout` schedules work once. `setInterval` schedules repeated work until `clearInterval` is called. Timers specify a minimum delay, not an exact execution time; a busy JavaScript thread can delay the callback.

Interview snippet: `var` shares one loop variable, while `let` creates one per iteration.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let:', j), 0);
}

// var: 3, var: 3, var: 3
// let: 0, let: 1, let: 2
```

## 8. What is the difference between `typeof` and `instanceof`?

```js
console.log(typeof 'hello');       // string
console.log(typeof 42);            // number
console.log(typeof undefined);     // undefined
console.log(typeof null);          // object (historical JavaScript bug)
console.log(typeof []);            // object

console.log([] instanceof Array);  // true
console.log([] instanceof Object); // true
console.log({} instanceof Array);  // false
```

Answer:

`typeof` returns a string describing a primitive type and is useful for checks such as `typeof value === 'function'`.

`instanceof` checks whether an object's prototype chain contains a constructor's `prototype`. Use `Array.isArray(value)` for arrays because it also works reliably across browser frames.

```js
console.log(Array.isArray([])); // true
```

## 9. What is type coercion?

```js
console.log('5' + 2);      // '52'  -> number becomes a string
console.log('5' - 2);      // 3     -> string becomes a number
console.log(Boolean(''));  // false
console.log(Boolean('0')); // true  -> non-empty strings are truthy
console.log(null == undefined);  // true
console.log(null === undefined); // false
```

Answer:

Type coercion is JavaScript automatically converting a value from one type to another when an operation needs it. This is convenient but can produce surprising results.

Prefer strict equality (`===` and `!==`) because it does not coerce types:

```js
console.log(0 == false);  // true
console.log(0 === false); // false
```

Convert values explicitly when needed:

```js
const price = Number('25');
const label = String(25);
const hasValue = Boolean('hello');
```


## 10. Guess the output of this code?
```js
let a = {};
let b = { key: "b" };
let c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```


## 11. Guess the output of this code?
```js
let obj1 = { key: "value" };
let obj2 = obj1;
let obj3 = obj2;

obj1.key = "new value";
obj2 = { key: "another value" };

console.log(obj1.key, obj2.key, obj3.key);
```

## 12. Guess the output of this code?
```js
const obj = {
  a: "foo",
  b: function () {
    console.log(this.a);
  },
};

const c = obj.b;

obj.b();
c();
```

## 13. Guess the output of this code?
```js
const x = { foo: 1 };
const y = { foo: 2 };

function addFoo(obj) {
  return obj.foo + 1;
}

console.log(addFoo(x));
console.log(addFoo(y));
```

## 14. Guess the output of this code?
```js
const arr = [1, 2, 3, 4, 5];

for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

## 15. Guess the output of this code?
```js
const arr = [1, 2, 3, 4, 5];
arr.forEach(function (element) {
  console.log(element);
});
```

## 16. Guess the output of this code?
```js
let x = 1;

if (function f() {}) {
  x += typeof f;
}
console.log(x);
```

## 17. Guess the output of this code?
```js
let a = {
  x: 1,
  y: 2,
};
let b = a;
a.x = 5;
console.log(a);
console.log(b);
```

## 18. Guess the output of this code?
```js
let x = [1, 2, 3];
let y = [1, 2, 3];
let z = y;

console.log(x == y);
console.log(x === y);
console.log(z == y);
console.log(z == x);
```

## 19. Guess the output of this code?
```js
var x = 0;
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    x++;
    console.log(x);
  }, 1000);
}
```


## 20. Guess the output of this code?
```js
let a = { x: 1 };
let b = { x: 2 };
let c = { x: 3 };
let d = { x: 4 };
let e = { x: 5 };

let arr = [a, b, c, d, e];
arr.forEach((obj) => (obj.x = obj.x * 2));

console.log(a.x, b.x, c.x, d.x, e.x);
```


## 21. Guess the output of this code?
```js
let num = 0;

function test() {
  var num = 1;
  return num;
}

console.log(test());
console.log(num);
```

## 22. Guess the output of this code?
```js
let obj = { name: "John", age: 25 };
let newObj = { ...obj, age: 30 };

console.log(obj.age);
console.log(newObj.age);
```

## 23. Guess the output of this code?
```js
const add = (a = 1, b = 2) => a + b;
console.log(add());
console.log(add(5));
console.log(add(undefined, 10));
```

## 24. Guess the output of this code?
```js
const name = "John";
const age = 25;

const user = { name, age };
console.log(user);
```


## 24. Guess the output of this code?
```js
const add = (a = 1, b = 2) => a + b;
console.log(add());
console.log(add(5));
console.log(add(undefined, 10));
```


## 25. Guess the output of this code?
```js
const name = "John";
const age = 25;

const user = { name, age };
console.log(user);
```

## 26. Guess the output of this code?
```js
const arr = [1, 2, 3];
const [a, b, c] = arr;

console.log(a);
console.log(b);
console.log(c);
```

## 27. Guess the output of this code?
```js
console.log(typeof null);
console.log(typeof undefined);
console.log(null === undefined);
console.log(null == undefined);
```

## 27. Guess the output of this code?
```js
let x = 5;
{
  let x = 10;
  console.log(x);
}
console.log(x);
```

## 28. Guess the output of this code?
```js
const obj = { a: 1, b: 2, c: 3 };
const { a, b } = obj;
console.log(a, b);
```

## 29. Guess the output of this code?
```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];
console.log(arr3);
```

## 30. Guess the output of this code?
```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

arr2.push(4);

console.log(arr1);
console.log(arr2);
```


## 31. Guess the output of this code?
```js
const x = 10;

function foo() {
  console.log(x);
  const x = 20;
}

foo();
```


## 32. Guess the output of this code?
```js
const a = [1, 2, 3];
const b = a;

b.push(4);

console.log(a);
console.log(b);
```

## 33. Guess the output of this code?
```js
const companies = [
  { id: "1", name: "Facebook" },
  { id: "2", name: "Apple" },
  { id: "3", name: "Google" },
];

companies.sort((a, b) => (a.name > b.name ? -1 : 1));
console.log(companies);
```

## 34. Guess the output of this code?
```js
console.log(typeof 42);
console.log(typeof "Hello");
console.log(typeof true);
console.log(typeof [1, 2, 3]);
console.log(typeof { name: "John", age: 25 });
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof function () {});
```

## 35. Guess the output of this code?
```js
console.log(getType(42));
console.log(getType("Hello"));
console.log(getType(true));
console.log(getType([1, 2, 3]));
console.log(getType({ name: "John", age: 25 }));
console.log(getType(null));
console.log(getType(undefined));
console.log(getType(function () {}));
//The function should print "array" for "[]" and "null" for "null" types.
```

## 36. Guess the output of this code?
```js
function calculateSum() {
  console.log(result);
  var num1 = 5;
  let num2 = 10;
  const num3 = 15;
  var result = num1 + num2 + num3;
}
calculateSum();
```

## 37. Guess the output of this code?
```js
let x = 10;

function updateX() {
  if (true) {
    let x = 20;
    console.log(x);
  }
  console.log(x);
}

updateX();
```

## 38. Guess the output of this code?
```js
const person = {
  name: "John",
  age: 30,
};

Object.freeze(person);
person.age = 40;

console.log(person.age);
```

## 39. Guess the output of this code?
```js
function foo() {
  let x = 1;
  function bar() {
    let y = 2;
    console.log(x + y);
  }
  bar();
}
foo();
```

## 40. Guess the output of this code?
```js
let x = 10;

function outer() {
  console.log(x);

  if (false) {
    var x = 20;
  }
}
outer();
```

## 41. Guess the output of this code?
```js
const obj = {
  a: 1,
  b: 2,
  c: {
    a: 3,
    b: 4,
  },
};

const {
  a,
  b,
  c: { a: nestedA },
} = obj;

console.log(a, b, nestedA);
```


## 42. Guess the output of this code?
```js
function* generatorFunction() {
  yield 1;
  yield 2;
  return 3;
}

const generator = generatorFunction();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

## 43. Guess the output of this code?
```js
console.log(sum(4, 6, 8, 10).value); //output - 28
console.log(sum(4)(6)(8)(10).value); //output - 28
```

## 44. Guess the output of this code?
```js
let numbers = [1, 2, 3, 4, 5];
numbers = numbers.map((number) => number * 2);
console.log(numbers.reduce((total, num) => total + num));
```

## 45. Guess the output of this code?
```js
console.log('Start');

setTimeout(function() {
  console.log('Timeout');
}, 0);

Promise.resolve('Promise'), then(function (value) {
  console.log(value);
});

console.log("End');
```


## 46. Guess the output of this code?
```js
//Original object
const original = {
  name: "John", 
  age: 30, 
  hobbies: ["reading", "cooking"],
  address: {
    city: "New York", 
    state: "NY"
};

// Shallow copy
const shallowCopy = Object.assign({}, original);

// Deep copy
const deepCopy = JSON.parse(JSON.stringify(original));

// Modifying a nested object
shallowCopy.address.city = "San Francisco";
deepCopy.address.city = "Los Angeles";

console.log(original.address city); // Output: "San Francisco" 
console.log(shallowCopy.address.city); // Output: "San Francisco" 
console.log(deepCopy.address.city); // Output: "Los Angeles"
```

## 47. Guess the output of this code?
```js
function* fibonacci() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();

console.log(fib.next().value); // Output: 0 
console.log(fib.next().value); // Output: 1
console.log(fib.next().value); // Output: 1
console.log(fib.next().value); // Output: 2
console.log(fib.next().value); // Output: 3
console.log(fib.next().value); // Output: 5
```


## 48. Guess the output of this code?
```js
function* fibonacci() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();

console.log(fib.next().value); // Output: 0 
console.log(fib.next().value); // Output: 1
console.log(fib.next().value); // Output: 1
console.log(fib.next().value); // Output: 2
console.log(fib.next().value); // Output: 3
console.log(fib.next().value); // Output: 5
```

## 48. Guess the output of this code?
```js
function example() {
  var x = 10;
  if (true) {
    let y = 20;
    console.log(x, y); // 10, 20
   }
   console.log(x, y); // throws an error, y is not defined
}
example();
```


## 49. Guess the output of this code?
```js
var x = null;
var y;
console.log(x === null); // true
console.log(y === undefined); // true
```


## 50. Guess the output of this code?
```js
console.log('Before setTimeout');
setTimeout(function() {
  console.log('Inside setTimeout');

}, 1000);
console.log('After setTimeout');
```

## 51. Guess the output of this code?
```js
console.log(1 == '1'); // true
console.log(1 === '1'); // false
```
## 52. What is a closure?

```js
function createCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Answer:

A closure is created when an inner function remembers variables from its outer function even after the outer function has finished running. Here `count` stays private and survives across calls through the returned function.

## 53. What is currying?

```js
function multiply(a) {
  return function (b) {
    return function (c) {
      return a * b * c;
    };
  };
}

console.log(multiply(2)(3)(4)); // 24

const multiplyES6 = (a) => (b) => (c) => a * b * c;
console.log(multiplyES6(2)(3)(4)); // 24
```

Answer:

Currying turns a function that takes multiple arguments into a chain of functions that each take one argument. It is useful for partial application and reusable specialized functions.

## 54. Implement a simple debounce function

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

const onSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

onSearch('j');
onSearch('ja');
onSearch('jav'); // only this call runs after 300ms of no further typing
```

Answer:

Debounce delays execution until a quiet period has passed. It is commonly used for search inputs, resize handlers, and button spam prevention.

## 55. Implement a simple throttle function

```js
function throttle(fn, limit) {
  let lastCalled = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCalled >= limit) {
      lastCalled = now;
      fn.apply(this, args);
    }
  };
}

const onScroll = throttle(() => {
  console.log('Scroll handler ran');
}, 1000);

// Even if scroll fires many times, the handler runs at most once per second
```

Answer:

Throttle guarantees a function runs at most once in a given time window. Debounce waits for silence; throttle enforces a rate limit.

## 56. Difference between `map`, `filter`, and `reduce`?

```js
const nums = [1, 2, 3, 4, 5];

const doubled = nums.map((n) => n * 2);
// [2, 4, 6, 8, 10]

const evens = nums.filter((n) => n % 2 === 0);
// [2, 4]

const sum = nums.reduce((total, n) => total + n, 0);
// 15
```

Answer:

- `map` transforms every item and returns a new array of the same length.
- `filter` keeps items that pass a condition and returns a new (usually shorter) array.
- `reduce` accumulates array values into a single result.

## 57. How do `call`, `apply`, and `bind` differ?

```js
function introduce(city, country) {
  console.log(`${this.name} from ${city}, ${country}`);
}

const user = { name: 'Asha' };

introduce.call(user, 'Delhi', 'India');
// Asha from Delhi, India

introduce.apply(user, ['Mumbai', 'India']);
// Asha from Mumbai, India

const boundIntroduce = introduce.bind(user, 'Pune');
boundIntroduce('India');
// Asha from Pune, India
```

Answer:

`call` and `apply` invoke the function immediately with a given `this`. `call` takes arguments one by one; `apply` takes them as an array. `bind` returns a new function with a permanently bound `this` (and optionally preset arguments).

## 58. What is the difference between shallow copy and deep copy?

```js
const original = {
  name: 'Asha',
  address: { city: 'Delhi' },
};

const shallow = { ...original };
const deep = structuredClone(original);

shallow.address.city = 'Mumbai';
deep.address.city = 'Pune';

console.log(original.address.city); // Mumbai (shared nested object)
console.log(shallow.address.city);  // Mumbai
console.log(deep.address.city);     // Pune
```

Answer:

A shallow copy duplicates only the top level. Nested objects are still shared by reference. A deep copy recursively clones nested values so changes to the copy do not affect the original.

## 59. What do `Promise.all`, `Promise.race`, `Promise.any`, and `Promise.allSettled` do?

```js
const p1 = Promise.resolve('A');
const p2 = Promise.resolve('B');
const p3 = Promise.reject('Error');

Promise.all([p1, p2])
  .then(console.log); // ['A', 'B']

Promise.all([p1, p3])
  .catch(console.log); // Error (fails fast)

Promise.allSettled([p1, p3]).then(console.log);
// [{ status: 'fulfilled', value: 'A' }, { status: 'rejected', reason: 'Error' }]

Promise.race([
  new Promise((resolve) => setTimeout(() => resolve('fast'), 100)),
  new Promise((resolve) => setTimeout(() => resolve('slow'), 500)),
]).then(console.log); // fast

Promise.any([p3, p1]).then(console.log); // A
```

Answer:

- `Promise.all`: fulfills when all succeed; rejects if any fail.
- `Promise.allSettled`: waits for all; never rejects for individual failures.
- `Promise.race`: settles with the first settled promise.
- `Promise.any`: fulfills with the first success; rejects only if all fail.

## 60. What is optional chaining and nullish coalescing?

```js
const user = {
  profile: {
    address: null,
  },
};

console.log(user.profile?.address?.city); // undefined (no error)
console.log(user.contact?.email);         // undefined

console.log(user.profile.address?.city ?? 'City not set'); // City not set
console.log(0 ?? 10);   // 0  (0 is not nullish)
console.log('' || 10);  // 10 (empty string is falsy)
```

Answer:

`?.` safely reads nested properties and short-circuits to `undefined` if a value is `null` or `undefined`. `??` returns the right-hand value only when the left-hand value is `null` or `undefined`, unlike `||` which also treats `0`, `''`, and `false` as missing.

## 61. Guess the output of this code?

```js
function createFunctions() {
  const result = [];

  for (var i = 0; i < 3; i++) {
    result.push(function () {
      return i;
    });
  }

  return result;
}

const fns = createFunctions();
console.log(fns[0](), fns[1](), fns[2]());
```

## 62. Guess the output of this code?

```js
function createFunctions() {
  const result = [];

  for (let i = 0; i < 3; i++) {
    result.push(function () {
      return i;
    });
  }

  return result;
}

const fns = createFunctions();
console.log(fns[0](), fns[1](), fns[2]());
```

## 63. Guess the output of this code?

```js
console.log(typeof NaN);
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));
console.log(Number.isNaN(NaN));
console.log(isNaN('hello'));
console.log(Number.isNaN('hello'));
```

## 64. Guess the output of this code?

```js
const obj = {
  value: 10,
  getValue() {
    return this.value;
  },
};

const unbound = obj.getValue;
const bound = obj.getValue.bind(obj);

console.log(obj.getValue());
console.log(unbound());
console.log(bound());
```

## 65. Guess the output of this code?

```js
async function run() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}

console.log('C');
run();
console.log('D');
```

## 66. Guess the output of this code?

```js
Promise.resolve()
  .then(() => {
    console.log('1');
    return Promise.resolve();
  })
  .then(() => console.log('2'));

Promise.resolve().then(() => console.log('3'));
```

## 67. Flatten a nested array (interview classic)

```js
function flatten(arr) {
  return arr.reduce((acc, item) => {
    return Array.isArray(item)
      ? acc.concat(flatten(item))
      : acc.concat(item);
  }, []);
}

console.log(flatten([1, [2, [3, [4]], 5]])); // [1, 2, 3, 4, 5]

// Built-in alternative:
console.log([1, [2, [3, [4]], 5]].flat(Infinity)); // [1, 2, 3, 4, 5]
```

Answer:

Recursively walk the array and concatenate nested arrays into one flat list. `Array.prototype.flat(depth)` is the modern built-in approach.

## 68. Remove duplicates from an array

```js
const nums = [1, 2, 2, 3, 4, 4, 5];

console.log([...new Set(nums)]); // [1, 2, 3, 4, 5]

const unique = nums.filter((value, index) => nums.indexOf(value) === index);
console.log(unique); // [1, 2, 3, 4, 5]
```

Answer:

`Set` stores unique values and is the cleanest approach for primitives. `filter` + `indexOf` is a common interview alternative without using `Set`.

## 69. What is prototypal inheritance?

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hi, I am ${this.name}`;
};

function Employee(name, role) {
  Person.call(this, name);
  this.role = role;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.getRole = function () {
  return this.role;
};

const emp = new Employee('Ravi', 'Developer');
console.log(emp.greet());   // Hi, I am Ravi
console.log(emp.getRole()); // Developer
console.log(emp instanceof Person);   // true
console.log(emp instanceof Employee); // true
```

Answer:

Objects inherit properties through the prototype chain. Setting `Employee.prototype` to an object whose prototype is `Person.prototype` lets employee instances reuse `Person` methods.

## 70. Class syntax vs constructor functions

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}

const dog = new Dog('Bruno');
console.log(dog.speak()); // Bruno barks
console.log(dog instanceof Animal); // true
```

Answer:

ES6 classes are primarily syntactic sugar over constructor functions and prototypes. Under the hood, methods still live on the prototype and `extends` still uses the prototype chain.

## 71. Guess the output of this code?

```js
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(Object.keys(a));
console.log(a[b]);
```

## 72. Guess the output of this code?

```js
console.log([] + []);
console.log([] + {});
console.log({} + []);
console.log(true + true);
console.log('5' - true);
```

## 73. Guess the output of this code?

```js
function foo() {
  return
  {
    bar: 'hello';
  };
}

console.log(foo());
```

## 74. Guess the output of this code?

```js
let x = 1;

function outer() {
  let x = 2;

  function inner() {
    console.log(x);
  }

  return inner;
}

const fn = outer();
fn();
```

## 75. Guess the output of this code?

```js
const person = {
  name: 'Asha',
  sayName: function () {
    console.log(this.name);

    setTimeout(function () {
      console.log(this.name);
    }, 0);

    setTimeout(() => {
      console.log(this.name);
    }, 0);
  },
};

person.sayName();
```

## 76. Implement memoization

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

const slowSquare = (n) => {
  console.log('computing...');
  return n * n;
};

const fastSquare = memoize(slowSquare);

console.log(fastSquare(4)); // computing... 16
console.log(fastSquare(4)); // 16 (from cache)
```

Answer:

Memoization caches function results for previously seen inputs so repeated calls with the same arguments skip expensive recalculation.

## 77. Rest vs spread

```js
function sum(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

const arr = [1, 2, 3];
const copy = [...arr, 4];
console.log(copy); // [1, 2, 3, 4]

const user = { name: 'Asha', age: 25 };
const updated = { ...user, age: 26 };
console.log(updated); // { name: 'Asha', age: 26 }
```

Answer:

Rest (`...` in parameters) collects multiple values into an array. Spread (`...` in arrays/objects) expands values into individual elements or properties.

## 78. `Map` vs plain object

```js
const obj = {};
const map = new Map();

const key = { id: 1 };

obj[key] = 'object value'; // key becomes "[object Object]"
map.set(key, 'map value');

console.log(obj['[object Object]']); // object value
console.log(map.get(key));           // map value
console.log(map.size);               // 1
```

Answer:

`Map` allows any value as a key (including objects), preserves insertion order, and exposes a reliable `.size`. Object keys are always strings or symbols.

## 79. Guess the output of this code?

```js
console.log(1);
setTimeout(() => console.log(2), 0);

Promise.resolve().then(() => {
  console.log(3);
  setTimeout(() => console.log(4), 0);
});

console.log(5);
```

## 80. Guess the output of this code?

```js
const arr = [1, 2, 3];

arr[10] = 99;

console.log(arr.length);
console.log(arr[5]);
console.log(Object.keys(arr));
```

## 81. Guess the output of this code?

```js
function Person(name) {
  this.name = name;
}

const p1 = new Person('Asha');
const p2 = Person('Ravi');

console.log(p1.name);
console.log(typeof p2);
console.log(name); // in non-strict mode / browser global leakage example
```

## 82. Guess the output of this code?

```js
const nums = [1, 2, 3, 4];

const result = nums
  .map((n) => n * 2)
  .filter((n) => n > 4)
  .reduce((sum, n) => sum + n, 0);

console.log(result);
```

## 83. Write a function that works both as `sum(1)(2)(3)` and `sum(1, 2, 3)`

```js
function sum(...args) {
  const add = (...next) => {
    args = args.concat(next);
    return add;
  };

  add.valueOf = () => args.reduce((total, n) => total + n, 0);
  add.value = add.valueOf();

  return typeof args[0] === 'undefined' ? 0 : add;
}

console.log(+sum(1)(2)(3));     // 6
console.log(+sum(1, 2, 3));     // 6
console.log(sum(4)(6)(8).value); // 18
```

Answer:

Return a callable function that keeps collecting arguments, and expose the accumulated total through `.value` / `valueOf` so the same API supports both curried and multi-argument calls.

## 84. Event delegation pattern

```js
// HTML: <ul id="list"><li>One</li><li>Two</li><li>Three</li></ul>

document.getElementById('list').addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log('Clicked:', event.target.textContent);
  }
});
```

Answer:

Event delegation attaches one listener to a parent and uses `event.target` to handle clicks on child elements. It reduces listeners, works for dynamically added children, and is efficient for large lists.

## 85. Guess the output of this code?

```js
let a = 10;

(function () {
  console.log(a);
  var a = 20;
})();
```

## 86. Guess the output of this code?

```js
const obj = Object.create(null);
console.log(obj.toString);
console.log({}.toString);
console.log(Object.getPrototypeOf(obj));
```

## 87. Guess the output of this code?

```js
function test(a, b = a * 2) {
  console.log(a, b);
}

test(5);
test(5, undefined);
test(5, 10);
```

## 88. Guess the output of this code?

```js
const promise = new Promise((resolve, reject) => {
  console.log('Executor');
  resolve('Done');
  reject('Fail');
  console.log('After settle');
});

promise
  .then((value) => console.log(value))
  .catch((error) => console.log(error));
```

## 89. Deep equality check (simple version)

```js
function deepEqual(a, b) {
  if (a === b) return true;

  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => deepEqual(a[key], b[key]));
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1 }, { a: 2 })); // false
```

Answer:

Compare by reference first, then recursively compare own keys and nested values. Production code usually also needs array, Date, Map, and circular-reference handling.

## 90. Compose and pipe utility functions

```js
const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);

const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

const add1 = (n) => n + 1;
const double = (n) => n * 2;
const square = (n) => n * n;

console.log(compose(square, double, add1)(3)); // ((3+1)*2)^2 = 64
console.log(pipe(add1, double, square)(3));    // ((3+1)*2)^2 = 64
```

Answer:

`compose` applies functions right-to-left; `pipe` applies them left-to-right. Both are useful for building readable transformation pipelines.
