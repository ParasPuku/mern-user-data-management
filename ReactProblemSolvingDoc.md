# React Problem Solving Interview Questions and Answers

This document covers 15 commonly asked React problem-solving interview questions.

The examples are intentionally simple so the logic is easy to understand and explain in interviews.

Most snippets use React functional components, hooks, and plain JavaScript logic.

## How to Use This Document

Use this file for:

- practicing small React machine-coding rounds
- explaining logic step by step in interviews
- revising hooks through practical examples
- preparing simple UI problem statements
- understanding common frontend patterns

## API Used In Examples

Some examples use DummyJSON:

- Products API: `https://dummyjson.com/products`
- Search API: `https://dummyjson.com/products/search?q=phone`
- Pagination API: `https://dummyjson.com/products?limit=10&skip=0`

DummyJSON supports product search and pagination using `limit` and `skip`.

---

## 1. Search Based On Keyword Using Debounce

### Question

Create a search input. When the user types, call an API after a small delay instead of calling the API on every key press.

### What Interviewer Checks

- controlled input
- `useEffect`
- debounce using `setTimeout`
- cleanup using `clearTimeout`
- API call based on search text

### Simple Answer

Debounce means waiting for the user to stop typing before calling the API.

If the user types quickly, previous timers are cleared.

### Code

```jsx
import { useEffect, useState } from 'react';

export const DebouncedSearch = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setProducts([]);
      return;
    }

    const timerId = window.setTimeout(async () => {
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${search}`
      );
      const data = await response.json();

      setProducts(data.products);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  return (
    <div>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products"
      />

      {loading && <p>Searching...</p>}

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Interview Explanation

When `search` changes, `useEffect` starts a timer.

If the user types again before 500ms, cleanup clears the previous timer.

The API is called only when the user pauses typing.

---

## 2. Todo Tasks With LocalStorage

### Question

Create a todo app where users can add, edit, delete, and mark tasks as complete.

Store todos in `localStorage`.

### What Interviewer Checks

- CRUD operations
- array state update
- controlled input
- localStorage persistence
- simple conditional rendering

### Code

```jsx
import { useEffect, useState } from 'react';

export const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = () => {
    if (!text.trim()) return;

    if (editId) {
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === editId ? { ...todo, text } : todo
        )
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false
      };

      setTodos((currentTodos) => [...currentTodos, newTodo]);
    }

    setText('');
  };

  const handleEdit = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  };

  const handleDelete = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter task"
      />

      <button onClick={handleSubmit}>{editId ? 'Update' : 'Add'}</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />

            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>

            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### Interview Explanation

The first `useState` reads old todos from localStorage.

Whenever todos change, `useEffect` saves the latest todos.

Each action creates a new array instead of mutating the existing state.

---

## 3. Pagination Using Dummy Users API

### Question

Fetch users from an API and show pagination with previous, next, current page, and limit dropdown.

### What Interviewer Checks

- API query parameters
- page state
- loading state
- limit dropdown
- total pages calculation

### Code

```jsx
import { useEffect, useState } from 'react';

export const UsersPaginationExample = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(totalUsers / limit);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const skip = (currentPage - 1) * limit;

      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();

      setUsers(data.users);
      setTotalUsers(data.total);
      setLoading(false);
    };

    fetchUsers();
  }, [currentPage, limit]);

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}

      <label>
        Limit:
        <select value={limit} onChange={handleLimitChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </label>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>

      <button disabled={currentPage === 1} onClick={handlePrevious}>
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button disabled={currentPage >= totalPages} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};
```

### Interview Explanation

API endpoint:

`https://dummyjson.com/users?limit=10&skip=0`

For page 1 with limit 10, `skip` is `0`.

For page 2 with limit 10, `skip` is `10`.

For page 3 with limit 10, `skip` is `20`.

Formula:

```js
const skip = (currentPage - 1) * limit;
```

When the limit dropdown changes, page is reset to `1`.

---

## 4. Lazy Loading Component

### Question

Load a component only when it is needed.

### What Interviewer Checks

- `React.lazy`
- `Suspense`
- code splitting
- fallback UI

### Code

```jsx
import { lazy, Suspense, useState } from 'react';

const Profile = lazy(() => import('./Profile'));

export const LazyLoadingExample = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div>
      <button onClick={() => setShowProfile(true)}>Show Profile</button>

      {showProfile && (
        <Suspense fallback={<p>Loading profile...</p>}>
          <Profile />
        </Suspense>
      )}
    </div>
  );
};
```

Example `Profile.jsx`:

```jsx
const Profile = () => {
  return <h2>User Profile</h2>;
};

export default Profile;
```

### Interview Explanation

`React.lazy` loads the component file only when React needs to render it.

`Suspense` shows fallback UI while that component is loading.

---

## 5. Infinite Scrolling

### Question

Load more products when the user reaches the bottom of the page.

### What Interviewer Checks

- scroll event
- page/skip state
- appending data
- cleanup event listener

### Code

```jsx
import { useEffect, useState } from 'react';

export const InfiniteScrollExample = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!hasMore) return;

      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();

      setProducts((currentProducts) => [...currentProducts, ...data.products]);
      setHasMore(skip + limit < data.total);
      setLoading(false);
    };

    fetchProducts();
  }, [skip, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (nearBottom && !loading && hasMore) {
        setSkip((currentSkip) => currentSkip + limit);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>

      {loading && <p>Loading more...</p>}
      {!hasMore && <p>No more products</p>}
    </div>
  );
};
```

### Interview Explanation

When the user reaches near the bottom, `skip` increases.

Changing `skip` triggers the API call.

New products are added to the old products using spread syntax.

---

## 6. Write a custom hook that uses useCallback to multiply two numbers in React.
### Code 

```jsx

import { useCallback } from "react";

const useMultiply = () => {
  const multiply = useCallback((num1, num2) => {
    return num1 * num2;
  }, []);

  return multiply;
};

export default useMultiply;

----------------------------------

import React from "react";
import useMultiply from "./useMultiply";

function App() {
  const multiply = useMultiply();

  const result = multiply(10, 20);

  return (
    <div>
      <h2>Result: {result}</h2>
    </div>
  );
}

export default App;

```
If you don't need a custom hook
If the callback is only used in one component, you can use useCallback directly:

```jsx
import { useCallback } from "react";
function App() {
  const multiply = useCallback((a, b) => a * b, []);

  return <h2>{multiply(5, 8)}</h2>;
}
```

## 7. Custom hooks of useMemo to calculate the addition two number in react?
### Code
useMemo is used to memoize a computed value, not a function. If you want a custom hook that calculates the addition of two numbers and only recalculates when either number changes, you can do this:

```jsx
// Custom Hook (useAddition.js)
import { useMemo } from "react";
const useAddition = (num1, num2) => {
  const sum = useMemo(() => {
    console.log("Calculating...");
    return num1 + num2;
  }, [num1, num2]);

  return sum;
};
export default useAddition;

// Using the Custom Hook
import React, { useState } from "react";
import useAddition from "./useAddition";
function App() {
  const [num1, setNum1] = useState(10);
  const [num2, setNum2] = useState(20);

  const sum = useAddition(num1, num2);

  return (
    <div>
      <h2>Number 1: {num1}</h2>
      <h2>Number 2: {num2}</h2>
      <h2>Sum: {sum}</h2>

      <button onClick={() => setNum1(num1 + 1)}>
        Increase Number 1
      </button>

      <button onClick={() => setNum2(num2 + 1)}>
        Increase Number 2
      </button>
    </div>
  );
}

export default App;

```

## 6. Fetch Data From An API

### Question

Fetch data from an API and handle loading and error states.

### What Interviewer Checks

- `useEffect`
- async function inside effect
- loading state
- error state
- rendering list

### Code

```jsx
import { useEffect, useState } from 'react';

export const FetchDataExample = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('https://dummyjson.com/products');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};
```

### Interview Explanation

The API is called once because dependency array is empty.

`try/catch/finally` makes loading and error handling clear.

---

## 7. Simple Multi Step Form

### Question

Create a form with multiple steps.

Example:

- Step 1: personal details
- Step 2: address details
- Step 3: review and submit

### What Interviewer Checks

- single form state
- step state
- next/back navigation
- conditional rendering

### Code

```jsx
import { useState } from 'react';

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    country: ''
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <h2>Step {step}</h2>

      {step === 1 && (
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
          />
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <p>Name: {form.name}</p>
          <p>Email: {form.email}</p>
          <p>City: {form.city}</p>
          <p>Country: {form.country}</p>
        </div>
      )}

      {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}

      {step < 3 ? (
        <button onClick={() => setStep(step + 1)}>Next</button>
      ) : (
        <button onClick={() => console.log(form)}>Submit</button>
      )}
    </div>
  );
};
```

### Interview Explanation

The current step decides which fields are shown.

All form values are kept in one state object.

This makes final submission simple.

---

## 8. Simple Form Validation

### Question

Create a login form with email and password validation.

### What Interviewer Checks

- controlled form
- validation logic
- disabled submit button
- error messages

### Code

```jsx
import { useState } from 'react';

export const LoginValidation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailError = !email.includes('@') ? 'Enter valid email' : '';
  const passwordError =
    password.length < 6 ? 'Password must be at least 6 characters' : '';

  const isFormValid = !emailError && !passwordError;

  const handleSubmit = () => {
    setSubmitted(true);

    if (!isFormValid) return;

    console.log({ email, password });
  };

  return (
    <div>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />
      {submitted && emailError && <p>{emailError}</p>}

      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        type="password"
      />
      {submitted && passwordError && <p>{passwordError}</p>}

      <button disabled={!isFormValid} onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};
```

### Interview Explanation

Validation values are derived from state.

The button is disabled until the form is valid.

After submit, error messages are shown.

---

## 9. Filter List By Dropdown

### Question

Show a list of users and filter them by role.

### What Interviewer Checks

- array filter
- select dropdown
- derived data
- simple state

### Code

```jsx
import { useState } from 'react';

const users = [
  { id: 1, name: 'Amit', role: 'admin' },
  { id: 2, name: 'Ravi', role: 'manager' },
  { id: 3, name: 'Neha', role: 'member' }
];

export const FilterByDropdown = () => {
  const [role, setRole] = useState('all');

  const filteredUsers =
    role === 'all' ? users : users.filter((user) => user.role === role);

  return (
    <div>
      <select value={role} onChange={(event) => setRole(event.target.value)}>
        <option value="all">All</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="member">Member</option>
      </select>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### Interview Explanation

The original users array is not changed.

`filteredUsers` is calculated from current selected role.

---

## 10. Modal Open And Close

### Question

Create a modal that opens on button click and closes on close button.

### What Interviewer Checks

- conditional rendering
- boolean state
- event handling

### Code

```jsx
import { useState } from 'react';

export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      {isOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Simple Modal</h2>
            <p>This is modal content.</p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
```

### Simple CSS

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
```

### Interview Explanation

When `isOpen` is true, modal is rendered.

When `isOpen` is false, modal is removed from the DOM.

---

## 11. Shopping Cart Quantity And Total

### Question

Create a simple shopping cart where quantity can increase/decrease and total price is shown.

### What Interviewer Checks

- array map
- derived total
- immutable state update
- button disabled state

### Code

```jsx
import { useState } from 'react';

const initialCart = [
  { id: 1, name: 'Keyboard', price: 1000, quantity: 1 },
  { id: 2, name: 'Mouse', price: 500, quantity: 2 }
];

export const CartExample = () => {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      {cart.map((item) => (
        <div key={item.id}>
          <span>
            {item.name} - Rs {item.price}
          </span>

          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
        </div>
      ))}

      <h3>Total: Rs {total}</h3>
    </div>
  );
};
```

### Interview Explanation

Quantity is updated by mapping over cart items.

Total is calculated using `reduce`.

---

## 12. Tabs Component

### Question

Create tabs where clicking each tab changes the visible content.

### What Interviewer Checks

- active tab state
- rendering based on selected value
- array map

### Code

```jsx
import { useState } from 'react';

const tabs = [
  { id: 'profile', label: 'Profile', content: 'This is profile tab' },
  { id: 'settings', label: 'Settings', content: 'This is settings tab' },
  { id: 'billing', label: 'Billing', content: 'This is billing tab' }
];

export const TabsExample = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const selectedTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div>
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)}>
          {tab.label}
        </button>
      ))}

      <p>{selectedTab?.content}</p>
    </div>
  );
};
```

### Interview Explanation

The clicked tab id is stored in state.

The selected tab content is found from the tabs array.

---

## 13. Counter Using useReducer

### Question

Create a counter using `useReducer`.

### What Interviewer Checks

- reducer function
- action object
- dispatch
- state transition

### Code

```jsx
import { useReducer } from 'react';

const reducer = (state, action) => {
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
};

export const CounterReducer = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h2>{state.count}</h2>

      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
};
```

### Interview Explanation

`useReducer` is useful when state changes are based on actions.

The reducer receives current state and action, then returns new state.

---

## 14. Parent To Child And Child To Parent Communication

### Question

Pass data from parent to child and send selected data back to parent.

### What Interviewer Checks

- props
- callback function
- lifting state up

### Code

```jsx
import { useState } from 'react';

const UserList = ({ users, onSelect }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => onSelect(user)}>Select</button>
        </li>
      ))}
    </ul>
  );
};

export const ParentChildExample = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'Paras' },
    { id: 2, name: 'Rahul' }
  ];

  return (
    <div>
      <UserList users={users} onSelect={setSelectedUser} />

      {selectedUser && <h3>Selected: {selectedUser.name}</h3>}
    </div>
  );
};
```

### Interview Explanation

Parent passes users and a callback to child.

Child calls the callback when a user is selected.

Parent stores selected user in state.

---

## 15. Search And Sort A List

### Question

Create a list that supports search and sorting.

### What Interviewer Checks

- controlled search input
- select sorting
- derived list
- `filter` and `sort`

### Code

```jsx
import { useState } from 'react';

const employees = [
  { id: 1, name: 'Amit', salary: 50000 },
  { id: 2, name: 'Neha', salary: 70000 },
  { id: 3, name: 'Ravi', salary: 60000 }
];

export const SearchAndSort = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredEmployees = employees
    .filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((first, second) => {
      if (sortBy === 'salary') {
        return first.salary - second.salary;
      }

      return first.name.localeCompare(second.name);
    });

  return (
    <div>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search employee"
      />

      <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
        <option value="name">Sort by name</option>
        <option value="salary">Sort by salary</option>
      </select>

      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - Rs {employee.salary}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### Interview Explanation

Search filters the list.

Sort arranges the filtered list.

For small lists, this simple approach is enough.

For very large lists, use `useMemo`, backend search, backend sorting, or virtualization.

---

## Quick Interview Revision Notes

### Debounce

Use debounce when you want to delay an operation until the user stops typing.

Common use cases:

- search API
- auto-save
- checking username availability

### Pagination

Use pagination when data should load page by page.

Common use cases:

- tables
- product lists
- user lists
- admin dashboards

### Infinite Scroll

Use infinite scroll when users should keep browsing without clicking next.

Common use cases:

- feeds
- product browsing
- notifications

### Lazy Loading

Use lazy loading to reduce initial bundle size.

Common use cases:

- rarely used pages
- admin screens
- modals
- heavy charts

### LocalStorage

Use localStorage for simple browser persistence.

Good for:

- theme
- todo practice app
- temporary filters
- small preferences

Do not use localStorage for:

- passwords
- sensitive tokens
- secure user data

---

## Common Follow-Up Interview Questions

### 1. Why should we not call search API on every key press?

Because it creates too many API calls and can slow down the app and server.

Debounce reduces unnecessary calls.

### 2. Why do we use cleanup inside useEffect?

Cleanup prevents old timers, old API effects, and old event listeners from continuing after state changes or component unmount.

### 3. Why should state not be mutated directly?

React detects state changes by reference.

If we mutate the same object or array, React may not re-render correctly.

### 4. What is the difference between pagination and infinite scroll?

Pagination uses page buttons.

Infinite scroll loads more data automatically when the user reaches the bottom.

### 5. When should we use useReducer instead of useState?

Use `useReducer` when state logic has multiple action types or related updates.

Example:

- cart
- multi-step form
- complex filters
- todo reducer

### 6. Why use keys while rendering lists?

Keys help React identify which item changed, added, or removed.

Use stable unique ids as keys.

Avoid using array index when the list can change order.

### 7. What is controlled input?

A controlled input is an input whose value comes from React state.

Example:

```jsx
<input value={name} onChange={(event) => setName(event.target.value)} />
```

### 8. What is derived state?

Derived state is calculated from existing state instead of being stored separately.

Example:

```jsx
const completedTodos = todos.filter((todo) => todo.completed);
```

Here `completedTodos` does not need a separate `useState`.

### 9. Why should API loading and error states be handled?

Because users should know what is happening.

Without loading/error states, the UI may look broken or confusing.

### 10. What should you explain during machine coding?

Explain:

- state variables
- event handlers
- API call flow
- loading/error handling
- how list rendering works
- why cleanup is needed

---

## Final Checklist

Before an interview, practice these:

- create controlled inputs
- add and remove items from array state
- update one item inside array state
- use `useEffect` for API calls
- use cleanup in `useEffect`
- show loading and error states
- implement debounce
- implement pagination
- implement infinite scroll
- use localStorage
- pass props from parent to child
- pass callback from child to parent
- conditionally render modal/tabs/steps
- explain why state should be immutable
- explain why keys are needed in lists
