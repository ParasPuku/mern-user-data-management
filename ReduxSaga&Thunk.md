### 1. What is Redux Saga?
Redux Saga is a middleware library designed to manage application side effects (such as asynchronous data fetching and browser cache access) in Redux applications. It acts like a separate thread in your application that is solely responsible for side effects, allowing your main Redux actions to stay pure and predictable.

Core Architecture
Redux Saga intercepts ordinary Redux actions before they reach the reducer. It coordinates asynchronous flows using ES6 Generator functions (functions defined with an asterisk, like function*).

- The Watcher Saga: Listens for specific Redux actions to be dispatched.
- The Worker Saga: Executes the actual asynchronous logic when the Watcher catches an action.

Instead of executing async functions directly, Sagas yield plain JavaScript objects called Effects, which serve as instructions for the Redux-Saga Middleware to execute behind the scenes.

Common Saga Effects
- takeEvery: Starts a new worker task for every single matching action dispatched (handles concurrency).
- takeLatest: Automatically cancels any previous pending worker task if a new matching action is dispatched.
- call: Instructs the middleware to run an asynchronous function (like an API request).
- put: Instructs the middleware to dispatch a standard action to the Redux store (similar to dispatch).
- select: Extracts and retrieves specific data directly from the Redux store state.

A complete CRUD (Create, Read, Update, Delete) implementation using Redux-Saga handles asynchronous side effects via Generator functions (function*). Below is a complete, scalable structure utilizing modern @reduxjs/toolkit for actions/reducers, combined with redux-saga for asynchronous operations.

1. Define Action Types & Slice (Reducers)
This slice manages the state changes and serves up standard actions that our Sagas will listen to.

```jsx
// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Read (Fetch)
    getUsersFetch: (state) => { state.loading = true; },
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    getUsersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    // Create
    createUserRequest: (state, action) => { state.loading = true; },
    createUserSuccess: (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
    },
    
    // Update
    updateUserRequest: (state, action) => { state.loading = true; },
    updateUserSuccess: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) state.users[index] = action.payload;
      state.loading = false;
    },
    
    // Delete
    deleteUserRequest: (state, action) => { state.loading = true; },
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      state.loading = false;
    },
    
    // Generic Error catch for mutations
    apiFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const {
  getUsersFetch, getUsersSuccess, getUsersFailure,
  createUserRequest, createUserSuccess,
  updateUserRequest, updateUserSuccess,
  deleteUserRequest, deleteUserSuccess,
  apiFailure
} = userSlice.actions;

export default userSlice.reducer;
```

2. Create the API Request Layer
An explicit API file handles raw HTTP requests using standard fetch or Axios.

```jsx
// userApi.js
const BASE_URL = 'https://example.com';

export const userApi = {
  fetchUsers: () => fetch(BASE_URL).then(res => res.json()),
  
  createUser: (userData) => fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json()),
  
  updateUser: (userData) => fetch(`${BASE_URL}/${userData.id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json()),
  
  deleteUser: (userId) => fetch(`${BASE_URL}/${userId}`, {
    method: 'DELETE'
  }).then(() => userId) // return id to remove from state
};
```

3. Implement the CRUD Sagas
Sagas catch intercepted actions using effects like takeEvery or takeLatest, process them via call, and update the store using put.

```jsx
// userSagas.js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { userApi } from './userApi';
import {
  getUsersFetch, getUsersSuccess, getUsersFailure,
  createUserRequest, createUserSuccess,
  updateUserRequest, updateUserSuccess,
  deleteUserRequest, deleteUserSuccess,
  apiFailure
} from './userSlice';

// --- Worker Sagas ---

function* handleGetUsers() {
  try {
    const users = yield call(userApi.fetchUsers); // Pauses until Promise resolves
    yield put(getUsersSuccess(users));            // Dispatches to reducer
  } catch (error) {
    yield put(getUsersFailure(error.message));
  }
}

function* handleCreateUser(action) {
  try {
    const newUser = yield call(userApi.createUser, action.payload);
    yield put(createUserSuccess(newUser));
  } catch (error) {
    yield put(apiFailure(error.message));
  }
}

function* handleUpdateUser(action) {
  try {
    const updatedUser = yield call(userApi.updateUser, action.payload);
    yield put(updateUserSuccess(updatedUser));
  } catch (error) {
    yield put(apiFailure(error.message));
  }
}

function* handleDeleteUser(action) {
  try {
    const deletedId = yield call(userApi.deleteUser, action.payload);
    yield put(deleteUserSuccess(deletedId));
  } catch (error) {
    yield put(apiFailure(error.message));
  }
}

// --- Watcher Saga ---
// Intercepts the UI requests and passes them to the correct workers
export function* userSaga() {
  yield takeLatest(getUsersFetch.type, handleGetUsers);
  yield takeEvery(createUserRequest.type, handleCreateUser);
  yield takeEvery(updateUserRequest.type, handleUpdateUser);
  yield takeEvery(deleteUserRequest.type, handleDeleteUser);
}

```

4. Configure the Redux Store with Middleware
Wire the saga middleware directly into the configured Redux store instance.

```jsx
// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './userSlice';
import { userSaga } from './userSagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    users: userReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(userSaga); // Run the watcher saga
export default store;

```

5. Dispatching Actions from React Components
Use useDispatch to invoke mutations or read operations, and useSelector to read state values inside components.

```jsx
// UserComponent.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getUsersFetch, 
  createUserRequest, 
  updateUserRequest, 
  deleteUserRequest 
} from './userSlice';

export function UserComponent() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  // Read: Fetch all users on mount
  useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(createUserRequest({ name: 'Jane Doe', email: 'jane@example.com' }));
  };

  const handleUpdate = (id) => {
    dispatch(updateUserRequest({ id, name: 'Jane Smith' }));
  };

  const handleDelete = (id) => {
    dispatch(deleteUserRequest(id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleAdd}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} 
            <button onClick={() => handleUpdate(user.id)}>Update</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 2. What is difference between Redux Saga & Redux Thunk?

Thunk and Saga are both Redux middleware used to handle side effects like API calls, async flows, and delayed actions.

Interview answer:

```text
Redux Thunk is simpler and lets us write async logic inside functions that can dispatch actions.

Redux Saga is more powerful and uses generator functions to manage complex async flows like cancellation, retries, debouncing, background polling, and race conditions.