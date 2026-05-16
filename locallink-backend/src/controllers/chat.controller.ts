import type { RequestHandler } from "express";
import {
  getConversationMessages,
  getJobConversation,
  getUserConversations,
  removeConversationForUser,
} from "../services/chat.service";

const asId = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
};

const getUserId = (req: Parameters<RequestHandler>[0]): string | undefined =>
  (req as { userId?: string }).userId;

export const listMyConversationsHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }

    const data = await getUserConversations(userId);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const getConversationMessagesHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }

    const data = await getConversationMessages(asId(req.params.id), userId);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next(error);
  }
};

export const getJobConversationHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }

    const jobId = asId(req.params.jobId);
    const data = await getJobConversation(jobId, userId);
    if (!data) {
      res.status(404).json({ message: "Conversation not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Job not found") {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === "Cannot message yourself") {
        res.status(400).json({ message: error.message });
        return;
      }
    }
    next(error);
  }
};

export const deleteConversationHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ message: "Missing auth token" });
      return;
    }

    await removeConversationForUser(asId(req.params.id), userId);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === "Record to delete does not exist.") {
      res.status(404).json({ message: "Conversation not found" });
      return;
    }
    next(error);
  }
};
