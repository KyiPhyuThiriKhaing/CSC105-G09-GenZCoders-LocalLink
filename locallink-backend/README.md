# LocalLink Backend

Express + Prisma backend for LocalLink.

## Setup

```bash
npm install
```

Create a .env file:

```env
PORT=3000
DATABASE_URL="file:./dev.db"
```

Run migrations and generate Prisma client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Start the API server:

```bash
npm run dev
```

## Seed Data

Seed sample admin/users/jobs/submissions:

```bash
npx tsx src/seed.ts
```

Expected seed accounts:

- Admin: admin@locallink.test
- User: maya@locallink.test
- User: liam@locallink.test

Note: Password hashes are placeholders in seed data. Auth is not wired yet.

## Admin API (for testing)

Base URL: http://localhost:3000/api/admin

- GET /dashboard/stats
- GET /users?page=1&pageSize=10&search=&status=&sort=latest|oldest
- PATCH /users/:id/status
- DELETE /users/:id
- GET /submissions?page=1&pageSize=10&search=&status=&sort=latest|oldest
- GET /submissions/:id
- PATCH /submissions/:id/status

Sample payloads:

```json
{
  "status": "SUSPENDED",
  "actorId": "<adminId>"
}
```

```json
{
  "status": "APPROVED",
  "actorId": "<adminId>",
  "adminComment": "Approved in review",
  "notes": "All documents verified"
}
```
