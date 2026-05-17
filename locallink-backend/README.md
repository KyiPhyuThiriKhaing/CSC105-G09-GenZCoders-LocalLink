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
JWT_SECRET="replace-this-with-a-long-random-secret"
JWT_EXPIRES_IN="1h"
ADMIN_EMAIL="minthuta@gmail.com"
ADMIN_PASSWORD="68130500839"
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

*Note: All seeded users use `password` or their respective hashes for login.*

## Features Implemented

- **Authentication**: Email/password registration and login with JWT and Bcrypt caching.
- **REST APIs**: Complete sets of API endpoints for jobs, chat, verification submissions, and admin moderation.
- **Real-time Messaging**: Socket.io integrated for live chatting.
- **Database**: Prisma SQLite providing reliable, relational data modeling.

## API Endpoints

Base URL: `http://localhost:3000/api`

### Auth (`/auth`)
- `POST /register`: Register a new user
- `POST /login`: Login and receive a JWT

### Jobs (`/jobs`)
- `GET /`: List jobs
- `GET /:id`: Job details
- `POST /`: Create a new job (Authenticated)
- `PATCH /:id`: Update a job (Owner only)
- `DELETE /:id`: Delete a job (Owner only)
- `POST /:id/apply`: Apply to a job (Authenticated)

### Chat (`/chat`) *Authenticated*
- `GET /conversations`: Retrieve user conversations
- `GET /conversations/:id/messages`: Get messages for a specific conversation
- `POST /job/:jobId`: Get or create a chat for a job
- `DELETE /conversations/:id`: Delete a conversation

### Admin (`/admin`) *Admin Token Required*

- `POST /login`: Admin-specific login gateway
- `GET /dashboard/stats`: Retrieve top-level site statistics
- `GET /users`: List users with pagination and search
- `PATCH /users/:id/status`: Suspend or reinstate a user
- `DELETE /users/:id`: Delete a user permanently
- `GET /submissions`: List all identity verification requests
- `GET /submissions/:id`: Retrieve details for a specific documentation verification
- `PATCH /submissions/:id/status`: Approve or reject verify requests

Use the returned token for admin endpoints:

```http
Authorization: Bearer <token>
```

## Admin API (for testing)

Admin login:

- POST `/api/admin/login`

Body:

```json
{
  "email": "minthuta@gmail.com",
  "password": "68130500839"
}
```

Sample payloads for testing:

`PATCH /api/admin/users/:id/status`
```json
{
  "status": "SUSPENDED",
  "actorId": "<adminId>"
}
```

`PATCH /api/admin/submissions/:id/status`
```json
{
  "status": "APPROVED",
  "actorId": "<adminId>",
  "adminComment": "Approved in review",
  "notes": "All documents verified"
}
```

## Socket.io Testing

The Socket.io server runs on the same port as the API (e.g., `http://localhost:3000`).

To test real-time connections using a tool like Postman or Postwoman, or a custom script:

1. Connect to `ws://localhost:3000` or `http://localhost:3000` with the Socket.io client.
2. An `auth` token must be provided containing the user's JWT.

### Connection Example
```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  auth: {
    token: "YOUR_JWT_HERE"
  }
});
```

### Events

- Emit `join_conversation` with the `conversationId` string to start receiving messages for that chat loop.
- Emit `send_message` with `{ conversationId, body }` to send a message.
- Listen for `new_message` to receive the incoming chat payload from other users in the conversation.
