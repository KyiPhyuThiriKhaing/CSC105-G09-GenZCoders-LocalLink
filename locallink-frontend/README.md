# LocalLink Frontend

This is the React + TypeScript client for LocalLink.

## Stack

- React 19
- TypeScript
- Vite
- React Router v7
- Tailwind CSS v4 (`tailwindcss` + `@tailwindcss/vite`)
- Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-icons`)
- Sonner for toast notifications
- React Hook Form + Zod

## Run Locally

Install dependencies:

```bash
npm install
```

Create a `.env` file to point to the backend API:

```env
VITE_API_URL="http://localhost:3000/api"
```

Start dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Routes

### Public

- `/`
- `/login`
- `/signup`
- `/jobs`
- `/jobs/post`
- `/jobs/:id`

### Profile

- `/profile` (default: My Profile)
- `/profile/my-profile`
- `/profile/verify`
- `/profile/history`
- `/profile/settings`
- `/profile/chat`

### Admin

- `/admin`
- `/admin/dashboard`
- `/admin/submissions`
- `/admin/users`

## Current Status

The frontend is fully functional and integrated with the backend APIs. Major features include:

- **Authentication:** Login and Sign Up dispatch real authentication requests using JWT and sync with backend endpoints (`/auth/login`, `/auth/register`).
- **Core Functionality:** Job lists, job details, and job posting (`/jobs/post`) are wired to backend services.
- **Communication:** Real-time and REST-based chat integrations are implemented in the profile sections (`/profile/chat`).
- **Admin & Profiles:** The admin dashboard, user management, identity verification (submissions), and personal profiles retrieve and dispatch live data using customized API clients (`adminApi.ts`, `authApi.ts`, `chatApi.ts`).

While some dummy artifacts remain for backward-compatibility or layout testing, the primary workflows are communicating with the server environment.

For full project overview and backend setup, see the root README at `../README.md`.
