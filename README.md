# LocalLink

LocalLink is a community-focused web platform where users can browse local jobs, build a profile, submit verification documents, and track application history. The project includes:

- A React + TypeScript frontend (`locallink-frontend`)
- A Node.js + Express + TypeScript backend scaffold (`locallink-backend`)

## Team

| Profile | Name | GitHub | ID |
|-------|------|--------|----|
| [<img src="https://github.com/wunnakueleon.png?size=20" width="20" height="20" alt="Wunna" style="border-radius:50%; vertical-align:middle;" />](https://github.com/wunnakueleon) | [Wunna Moe San](https://github.com/wunnakueleon) | [wunnakueleon](https://github.com/wunnakueleon) | 68130500835 |
| [<img src="https://github.com/YuukinoTakkashi1998.png?size=20" width="20" height="20" alt="Min" style="border-radius:50%; vertical-align:middle;" />](https://github.com/YuukinoTakkashi1998) | [Min Thuta](https://github.com/YuukinoTakkashi1998) | [YuukinoTakkashi1998](https://github.com/YuukinoTakkashi1998) | 68130500839 |
| [<img src="https://github.com/KyiPhyuThiriKhaing.png?size=20" width="20" height="20" alt="Kyi" style="border-radius:50%; vertical-align:middle;" />](https://github.com/KyiPhyuThiriKhaing) | [Kyi Phyu Thiri Khaing](https://github.com/KyiPhyuThiriKhaing) | [KyiPhyuThiriKhaing](https://github.com/KyiPhyuThiriKhaing) | 68130500851 |
| [<img src="https://github.com/laurahsu-loop.png?size=20" width="20" height="20" alt="Nan" style="border-radius:50%; vertical-align:middle;" />](https://github.com/laurahsu-loop) | [Nan Thiri Htet Su](https://github.com/laurahsu-loop) | [laurahsu-loop](https://github.com/laurahsu-loop) | 68130500853 |

## Repository Structure

```text
.
├── locallink-frontend/   # React app (UI, routes, pages, admin screens)
├── locallink-backend/    # Express API scaffold + Prisma setup
└── README.md
```

For detailed setup and folder-specific instructions, see:

- `locallink-frontend/README.md`
- `locallink-backend/README.md`

## Current Implementation Status

### Frontend

The frontend includes the main public pages, profile sections, and admin views. UI implementation is largely complete, while backend integration and data wiring are still in progress.

### Backend

The backend scaffold is set up with Express and Prisma. Core API routes, controllers, and services remain under development.

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
| 839 | YuukinoTakkashi1998 | Admin Panel |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

## Notes

- Each member should update their own weekly progress.
- Recommended commit format:
  - `XXX - [Add/Update/Remove/Fix] description`
