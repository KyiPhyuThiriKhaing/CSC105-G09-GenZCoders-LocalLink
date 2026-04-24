# LocalLink Frontend

This is the React + TypeScript client for LocalLink.

## Stack

- React 19
- TypeScript
- Vite
- React Router v7
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Radix UI icons/dialog
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

Implemented UI is extensive, but many pages currently use mock/static data and are not wired to backend APIs yet.

Examples:

- Login and Sign Up currently validate form input but do not send API requests.
- Jobs, Job Details, Chat, History, Admin Dashboard, Submissions, and Users pages use in-file mock data.

For full project overview and backend setup, see the root README at `../README.md`.
