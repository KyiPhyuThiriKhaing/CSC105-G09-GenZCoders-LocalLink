# LocalLink

LocalLink is a community-focused web platform where users can browse local jobs, build a profile, submit verification documents, and track application history.

- **Frontend** — React + TypeScript SPA (`locallink-frontend/`)
- **Backend** — Node.js + Express REST API + Prisma ORM (`locallink-backend/`)

---

## Team

| Profile | Name | GitHub | ID |
|-------|------|--------|----|
| [<img src="https://github.com/wunnakueleon.png?size=20" width="20" height="20" alt="Wunna" style="border-radius:50%; vertical-align:middle;" />](https://github.com/wunnakueleon) | [Wunna Moe San](https://github.com/wunnakueleon) | [wunnakueleon](https://github.com/wunnakueleon) | 68130500835 |
| [<img src="https://github.com/YuukinoTakkashi1998.png?size=20" width="20" height="20" alt="Min" style="border-radius:50%; vertical-align:middle;" />](https://github.com/YuukinoTakkashi1998) | [Min Thuta](https://github.com/YuukinoTakkashi1998) | [YuukinoTakkashi1998](https://github.com/YuukinoTakkashi1998) | 68130500839 |
| [<img src="https://github.com/KyiPhyuThiriKhaing.png?size=20" width="20" height="20" alt="Kyi" style="border-radius:50%; vertical-align:middle;" />](https://github.com/KyiPhyuThiriKhaing) | [Kyi Phyu Thiri Khaing](https://github.com/KyiPhyuThiriKhaing) | [KyiPhyuThiriKhaing](https://github.com/KyiPhyuThiriKhaing) | 68130500851 |
| [<img src="https://github.com/laurahsu-loop.png?size=20" width="20" height="20" alt="Nan" style="border-radius:50%; vertical-align:middle;" />](https://github.com/laurahsu-loop) | [Nan Thiri Htet Su](https://github.com/laurahsu-loop) | [laurahsu-loop](https://github.com/laurahsu-loop) | 68130500853 |

---

## Repository Structure

```
.
├── locallink-frontend/     # React app (pages, components, routing)
├── locallink-backend/      # Express API, Prisma schema, migrations, seed
└── README.md
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Axios | HTTP client |
| React Hook Form + Zod | Form handling & validation |
| Socket.IO Client | Real-time chat |
| Radix UI | Accessible icons & dialog primitives |
| Sonner | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express v5 | HTTP framework |
| TypeScript (tsx) | Type safety + live reload |
| Prisma ORM | Database access & migrations |
| SQLite | Local database (`dev.db`) |
| JWT (jsonwebtoken) | Authentication tokens |
| bcrypt | Password hashing |
| Multer | File / document uploads |
| Socket.IO | Real-time WebSocket server |
| Zod | Request validation |
| Morgan | HTTP request logging |

---

## Prerequisites

- **Node.js** v18 or later — https://nodejs.org
- **npm** v9 or later (bundled with Node.js)
- **Git**

Verify before starting:

```bash
node -v   # v18.x.x or higher
npm -v    # v9.x.x or higher
```

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/wunnakueleon/CSC105-G09-GenZCoders-LocalLink.git
cd CSC105-G09-GenZCoders-LocalLink
```

### 2. Install dependencies

```bash
# Backend
cd locallink-backend
npm install

# Frontend (in a new terminal or after the above)
cd ../locallink-frontend
npm install
```

> `npm install` on the backend automatically runs `prisma generate` via the `postinstall` script — the Prisma TypeScript client is generated for you.

---

### 3. Set up environment variables

#### Backend

Copy the example file and edit it:

```bash
cp locallink-backend/.env.example locallink-backend/.env
```

Open `locallink-backend/.env` and fill in the values:

```env
# Port the Express server listens on
PORT=3000

# Path to the SQLite database — do not change this for local development
DATABASE_URL="file:./dev.db"

# Secret key used to sign JWT auth tokens
# Use any long random string — keep this private, never commit it
JWT_SECRET=mysecretkey123

# How long login sessions stay valid
# Examples: 1h, 7d, 30d
JWT_EXPIRES_IN=1h
```

**Variable reference:**

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | Yes | `3000` | Express server port |
| `DATABASE_URL` | Yes | `file:./dev.db` | SQLite file path — relative to `locallink-backend/` |
| `JWT_SECRET` | Yes | *(none)* | Secret for signing tokens — change before deploying |
| `JWT_EXPIRES_IN` | No | `1h` | Token expiry (e.g. `1h`, `7d`) |

#### Frontend

No `.env` file is needed for local development. The frontend defaults to `http://localhost:3000/api`.

If your backend runs on a different port, create `locallink-frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

### 4. Initialize the database

Run both commands from inside `locallink-backend/`:

```bash
cd locallink-backend

# Step 1 — Apply schema migrations (creates all tables in dev.db)
npx prisma migrate deploy

# Step 2 — Regenerate the Prisma TypeScript client
npx prisma generate
```

> **When to re-run:** Only after a `git pull` that includes new files inside `locallink-backend/prisma/migrations/`. For normal daily work, skip this — just start the dev server.

---

### 5. Seed sample data *(optional)*

Populates the database with test users, jobs, and applications:

```bash
# Run from locallink-backend/
npx tsx src/seed.ts
```

Safe to run multiple times — uses upserts and will not create duplicates.

---

### 6. Start the development servers

Open **two terminals** and run one command in each:

```bash
# Terminal 1 — Backend (auto-reloads on file save via tsx watch)
cd locallink-backend
npm run dev
```

```bash
# Terminal 2 — Frontend (hot module replacement via Vite)
cd locallink-frontend
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000/api |
| Admin Portal | http://localhost:5173/admin |

---

## Day-to-Day Workflow

Normal days — just start both servers:

```bash
npm run dev   # in locallink-backend/
npm run dev   # in locallink-frontend/
```

After a `git pull` that includes new migration files:

```bash
cd locallink-backend
npx prisma migrate deploy
npx prisma generate
npm run dev
```

---

## Test Accounts

Created by running `npx tsx src/seed.ts`. All passwords are `password123`.

| Account | Email | Password | Role | Status |
|---|---|---|---|---|
| Admin User | `admin@locallink.test` | `password123` | Admin | Active |
| Maya Rivera | `maya@locallink.test` | `password123` | User | Active, ID-verified |
| Liam Carter | `liam@locallink.test` | `password123` | User | Pending verification |

### Account details

**Maya Rivera** — `maya@locallink.test`
- Document-verified (`idVerifiedAt` is set) — can post jobs and apply
- Has posted 7 sample jobs (furniture moving, dog walking, grocery runs, etc.)
- Has an approved verification submission

**Liam Carter** — `liam@locallink.test`
- Not yet verified — limited access, cannot post jobs
- Has 5 job applications across various statuses (Applied, Contacted, Accepted, Completed, Rejected)
- Has a pending verification submission visible in the admin panel

**Admin User** — `admin@locallink.test`
- Can access the `/admin` portal
- Can review and approve/reject verification submissions
- Can manage user accounts and suspend users

---

## Admin Portal Access

The admin portal at `http://localhost:5173/admin` is accessible to accounts that either:

1. Have `role: ADMIN` in the database (set by the seed for `admin@locallink.test`)
2. Match the `ADMIN_EMAIL` environment variable in the backend `.env`

The default hardcoded fallback is `minthuta@gmail.com` — this works without seeding on any machine.

To grant admin access to a different email, add to `locallink-backend/.env`:

```env
ADMIN_EMAIL=youremail@example.com
```

---

## Weekly Progress

| Student ID | GitHub Username | Week 6–8 (Assigned Feature) | Week 11 (Progress Report) | Week 12 (Progress Report) |
|------------|-----------------|------------------------------|---------------------------|---------------------------|
| 835 | wunnakueleon | Backend / API | React routing setup, Login & Sign Up validation (Zod + Hook Form), Initial Tailwind CSS layout | Backend user endpoints, job application/view logic, Axios routing integrations |
| 839 | YuukinoTakkashi1998 | Admin Panel | Admin dashboard layout, user management hooks, submissions filters, initial backend setup | Backend admin API, chat integrations, verification logic, suspensions, DB schema |
| 851 | KyiPhyuThiriKhaing | Frontend / Jobs | Job listing forms, job details screens, mobile navigation updates, mock data abstraction | Job details UI integration with API, seed data setup, documentation, backend routing |
| 853 | laurahsu-loop | Profile / Uploads | Pop-out sidebars, initial profile pages, verification & history pages layout | Integrated profiles, document settings, tracking models, history pages with routing logic |

---

## Notes

- `locallink-backend/dev.db` is git-ignored — each developer has their own local database.
- `locallink-backend/uploads/` is created automatically when files are uploaded and is also git-ignored.
- Recommended commit format: `XXX - [Add/Update/Fix/Remove] short description`
