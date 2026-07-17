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

// console.log(token); // ReferenceError
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