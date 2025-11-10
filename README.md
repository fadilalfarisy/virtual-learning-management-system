# Virtual Learning Management System

This repository contains a full-stack Virtual Learning Management System application with a Node.js backend and a React + Vite frontend.

## Requirements

- Node.js 18+ (LTS recommended)
- npm 9+ or yarn
- Docker & docker-compose (optional, for running with containers)
- Mongo
- Git

## Repository layout

- `backend/` — Node.js + Javascript API
- `frontend/` — React + TypeScript (Vite)
- `docker-compose.yml` — optional compose for running services

---

## Quick start (local, without Docker)

1. Clone repo and open project root:

```bash
git clone <repo-url>
cd virtual-learning-management-system
```

2. Backend setup

- Copy environment file template and edit values for your database and JWT secrets.

```bash
cd backend
cp .env.example .env
# edit .env to set DATABASE_URL, JWT_SECRET, PORT, etc.
```

- Install dependencies and build:

```bash
npm install
npm run dev
```

- Run database seeding in `src/config/database.js` file.

3. Frontend setup

```bash
cd ../frontend
cp .env.example .env
# edit .env (VITE_BACKEND_URL or similar)
npm install
npm run dev
```

Open the frontend URL shown by Vite (usually `http://localhost:5173`) and the backend API at the backend port (e.g., `http://localhost:3000`).

---

## Quick start (Docker)

If you prefer containers, docker-compose is provided. From project root:

```bash
docker-compose up --build
```

This will build and run the backend, frontend, and a database service. Check `docker-compose.yml` to confirm service names and ports.

---

## Screenshoot interface

![Login](<Screenshot (124).png>)

![Dashboard](<Screenshot (123).png>)

![Initiate Report](<Screenshot (126).png>)
