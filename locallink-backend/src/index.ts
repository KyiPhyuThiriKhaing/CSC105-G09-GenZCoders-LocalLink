import "dotenv/config";
import express from "express";
import http from "http";
import morgan from "morgan";
import { Server } from "socket.io";
import { apiRouter } from "./routes/index";
import { prisma } from "./lib/prisma";
import { verifyToken } from "./lib/jwt";
import { uploadsDir } from "./lib/uploads";
import {
  deleteMessageForUser,
  startJobConversationMessage,
  updateMessageBody,
} from "./services/chat.service";

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN = "http://localhost:5173";

app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

app.get("/", (_req, res) => {
  res.json({
    message: "LocalLink backend is running.",
  });
});

app.use("/api", apiRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
  },
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token || typeof token !== "string") {
    next(new Error("Unauthorized"));
    return;
  }

  try {
    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, status: true },
    });

    if (!user || user.status === "SUSPENDED") {
      next(new Error("Unauthorized"));
      return;
    }

    socket.data.userId = user.id;
    next();
  } catch {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  socket.on("conversation:join", async (conversationId: string) => {
    const userId = socket.data.userId as string | undefined;
    if (!userId || !conversationId) return;

    const participant = await prisma.conversationParticipant.findUnique({
      where: { conversationId_userId: { conversationId, userId } },
    });
    if (!participant) return;

    socket.join(conversationId);
  });

  socket.on("conversation:leave", (conversationId: string) => {
    if (!conversationId) return;
    socket.leave(conversationId);
  });

  socket.on(
    "message:send",
    async (
      payload: { conversationId?: string; body?: string },
      ack?: (response: { ok: boolean; message?: string; data?: unknown }) => void,
    ) => {
      const userId = socket.data.userId as string | undefined;
      const conversationId = payload?.conversationId ?? "";
      const body = typeof payload?.body === "string" ? payload.body.trim() : "";

      if (!userId || !conversationId || !body) {
        ack?.({ ok: false, message: "Invalid payload" });
        return;
      }

      const participant = await prisma.conversationParticipant.findUnique({
        where: { conversationId_userId: { conversationId, userId } },
      });
      if (!participant) {
        ack?.({ ok: false, message: "Forbidden" });
        return;
      }

      const message = await prisma.message.create({
        data: {
          conversationId,
          senderId: userId,
          body,
        },
        include: {
          sender: { select: { id: true, fullName: true, avatarUrl: true } },
        },
      });

      await prisma.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });

      const payloadOut = {
        id: message.id,
        conversationId,
        body: message.body,
        sentAt: message.sentAt,
        editedAt: message.editedAt,
        deletedAt: message.deletedAt,
        sender: message.sender,
      };

      io.to(conversationId).emit("message:new", payloadOut);
      ack?.({ ok: true, data: payloadOut });
    },
  );

  socket.on(
    "message:start",
    async (
      payload: { jobId?: string; body?: string },
      ack?: (response: { ok: boolean; message?: string; data?: unknown }) => void,
    ) => {
      const userId = socket.data.userId as string | undefined;
      const jobId = payload?.jobId ?? "";
      const body = typeof payload?.body === "string" ? payload.body.trim() : "";

      if (!userId || !jobId || !body) {
        ack?.({ ok: false, message: "Invalid payload" });
        return;
      }

      try {
        const result = await startJobConversationMessage(jobId, userId, body);
        const payloadOut = {
          id: result.message.id,
          conversationId: result.conversationId,
          body: result.message.body,
          sentAt: result.message.sentAt,
          sender: result.message.sender,
        };

        socket.join(result.conversationId);
        io.to(result.conversationId).emit("message:new", payloadOut);
        ack?.({ ok: true, data: { conversationId: result.conversationId, message: payloadOut } });
      } catch (error) {
        ack?.({ ok: false, message: error instanceof Error ? error.message : "Unable to send" });
      }
    },
  );

  socket.on(
    "message:edit",
    async (
      payload: { messageId?: string; body?: string },
      ack?: (response: { ok: boolean; message?: string; data?: unknown }) => void,
    ) => {
      const userId = socket.data.userId as string | undefined;
      const messageId = payload?.messageId ?? "";
      const body = typeof payload?.body === "string" ? payload.body.trim() : "";

      if (!userId || !messageId || !body) {
        ack?.({ ok: false, message: "Invalid payload" });
        return;
      }

      try {
        const updated = await updateMessageBody(messageId, userId, body);
        const payloadOut = {
          id: updated.id,
          conversationId: updated.conversationId,
          body: updated.body,
          sentAt: updated.sentAt,
          editedAt: updated.editedAt,
          deletedAt: updated.deletedAt,
          sender: updated.sender,
        };
        io.to(updated.conversationId).emit("message:updated", payloadOut);
        ack?.({ ok: true, data: payloadOut });
      } catch (error) {
        ack?.({ ok: false, message: error instanceof Error ? error.message : "Unable to edit" });
      }
    },
  );

  socket.on(
    "message:delete",
    async (
      payload: { messageId?: string },
      ack?: (response: { ok: boolean; message?: string; data?: unknown }) => void,
    ) => {
      const userId = socket.data.userId as string | undefined;
      const messageId = payload?.messageId ?? "";

      if (!userId || !messageId) {
        ack?.({ ok: false, message: "Invalid payload" });
        return;
      }

      try {
        const updated = await deleteMessageForUser(messageId, userId);
        const payloadOut = {
          id: updated.id,
          conversationId: updated.conversationId,
          body: updated.body,
          sentAt: updated.sentAt,
          editedAt: updated.editedAt,
          deletedAt: updated.deletedAt,
          sender: updated.sender,
        };
        io.to(updated.conversationId).emit("message:updated", payloadOut);
        ack?.({ ok: true, data: payloadOut });
      } catch (error) {
        ack?.({ ok: false, message: error instanceof Error ? error.message : "Unable to delete" });
      }
    },
  );
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
