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

The frontend layout and navigation are implemented, including the home page, job listings, job posting flow, profile sections, chat, and admin views.

Many pages still rely on mock/static data and are not fully wired to backend APIs.

Examples:

- Login and Sign Up validate form input but do not yet dispatch real authentication requests.
- Job details, profile sections, chat, admin dashboard, submissions, and users pages use local mock data.
- `/jobs/post` provides a UI for posting a job, but backend submission integration is pending.

For full project overview and backend setup, see the root README at `../README.md`.
