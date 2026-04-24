# LocalLink

LocalLink is a community-focused web platform where users can browse local jobs, build a profile, submit verification documents, and track application history. The project includes:

- A React + TypeScript frontend (`locallink-frontend`)
- A Node.js + Express + TypeScript backend scaffold (`locallink-backend`)

## Team

| Name | Student ID | GitHub Username |
|------|------------|-----------------|
| Kyi Phyu Thiri Khaing | 68130500851 | KyiPhyuThiriKhaing |
| Min Thuta | 68130500839 | YukinoTakkashi1998 |
| Nan Thiri Htet Su | 68130500853 | laurahsu-loop |
| Wunna Moe San | 68130500835 | wunnakueleon |

## Repository Structure

```text
.
├── locallink-frontend/   # React app (UI, routes, pages, admin screens)
├── locallink-backend/    # Express API scaffold + Prisma setup
└── README.md
```

## Current Implementation Status

### Frontend

Implemented and navigable:

- Public pages: Home, Login, Sign Up, Jobs, Job Details
- Profile area: My Profile, Verification, History, Settings, Chat
- Admin area: Admin Login, Dashboard, Submissions, Users

Currently mocked/not connected to backend:

- Login and Sign Up submit handlers
- Jobs listing/details data
- Chat, history, verification, and settings updates
- Admin dashboard stats, submissions list, and users list

### Backend

Backend is currently a scaffold:

- Express server with `GET /` returning `Hello, World!`
- Prisma initialized with SQLite datasource config
- No implemented API routes/controllers/services yet

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router v7
- Tailwind CSS v4
- Radix UI (icons + dialog)
- React Hook Form + Zod

### Backend

- Node.js
- Express 5
- TypeScript
- Prisma ORM
- SQLite datasource setup
- Morgan + dotenv

## Frontend Routes

### Public

- `/` - Home
- `/login` - User login
- `/signup` - User registration
- `/jobs` - Job listings (mock)
- `/jobs/:id` - Job details (mock)

### Profile (nested)

- `/profile` - Default to My Profile
- `/profile/my-profile`
- `/profile/verify`
- `/profile/history`
- `/profile/settings`
- `/profile/chat`

### Admin

- `/admin` - Admin login UI
- `/admin/dashboard`
- `/admin/submissions`
- `/admin/users`

## Quick Start

## 1) Prerequisites

- Node.js 18+ (recommended latest LTS)
- npm

## 2) Install dependencies

```bash
cd locallink-frontend
npm install

cd ../locallink-backend
npm install
```

## 3) Environment setup (backend)

Minimum values:

```env
PORT=3000
DATABASE_URL="file:./dev.db"
```

## 4) Run development servers

Frontend:

```bash
cd locallink-frontend
npm run dev
```

Backend:

```bash
cd locallink-backend
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Weekly Progress

| Student ID | GitHub Username | Week 6-8 (Assigned Feature) | Week 11 (Progress Report) | Week 12 (Progress Report) |
|------------|-----------------|------------------------------|---------------------------|---------------------------|
| 839 | YukinoTakkashi1998 | Admin Panel |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

## Notes

- Each member should update their own weekly progress.
- Recommended commit format:
  - `XXX - [Add/Update/Remove/Fix] description`
