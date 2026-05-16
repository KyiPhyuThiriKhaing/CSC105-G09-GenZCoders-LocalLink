import { Router } from "express";
import {
  deleteConversationHandler,
  getConversationMessagesHandler,
  getJobConversationHandler,
  listMyConversationsHandler,
} from "../controllers/chat.controller";
import { requireUser, requireEmailVerified } from "../middleware/user-auth.middleware";

export const chatRouter = Router();

chatRouter.use(requireUser, requireEmailVerified);

chatRouter.get("/conversations", listMyConversationsHandler);
chatRouter.get("/conversations/:id/messages", getConversationMessagesHandler);
chatRouter.delete("/conversations/:id", deleteConversationHandler);
chatRouter.post("/job/:jobId", getJobConversationHandler);
