# MERN User Data Management

A full-stack MERN workspace with a Vite React TypeScript frontend and a plain JavaScript Express/MongoDB backend.

## Stack

- Frontend: React, TypeScript, Vite, Redux Toolkit, React Redux
- Backend: Node.js, Express, MongoDB, Mongoose
- Tooling: npm workspaces, Vite HMR/Fast Refresh, Nodemon

## Project Structure

```text
mern-user-data-management/
  frontend/   # Vite + React + TypeScript + Redux Toolkit
  backend/    # Express + MongoDB backend in plain JavaScript
```

## Getting Started

Use Node.js 22 LTS or another supported runtime line from the current tooling ecosystem.

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev
```

The frontend runs on `http://localhost:5173` with Vite HMR enabled. The backend runs on `http://localhost:5001`.

Make sure MongoDB is running locally, or update `backend/.env` with your MongoDB Atlas connection string.

## Useful Scripts

```bash
npm run dev            # Run frontend and backend together
npm run dev:frontend   # Run only the Vite frontend
npm run dev:backend    # Run only the Express backend
npm run build          # Build the frontend
npm run check          # Run available validation checks
```

## API Endpoints

- `GET /api/health`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`
