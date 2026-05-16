import type { RequestHandler, Response } from "express";
import { z } from "zod";
import { createUser, deleteUser, getUserById, listUsers, updateUser } from "../services/users.service";
import { createUserReview } from "../services/users.service";

const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

const sendNotImplemented = (res: Response, feature: string): void => {
  res.status(501).json({ message: `${feature} is not implemented yet` });
};

const asId = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
};

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional().nullable(),
});

export const listUsersHandler: RequestHandler = async (_req, res, next) => {
  try {
    const data = await listUsers();
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "list users");
      return;
    }
    next(error);
  }
};

export const getUserByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await getUserById(asId(req.params.id));
    if (!data) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "get user by id");
      return;
    }
    next(error);
  }
};

export const createUserReviewHandler: RequestHandler = async (req, res, next) => {
  try {
    const reviewerId = (req as { userId?: string }).userId;
    if (!reviewerId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const revieweeId = asId(req.params.id);
    const payload = reviewSchema.parse(req.body);
    const data = await createUserReview(reviewerId, revieweeId, payload.rating, payload.comment ?? null);
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0]?.message ?? "Invalid input" });
      return;
    }
    if (error instanceof Error && error.message === "You cannot review yourself") {
      res.status(409).json({ message: error.message });
      return;
    }
    if (error instanceof Error && error.message === "You have already reviewed this user") {
      res.status(409).json({ message: error.message });
      return;
    }
    if (error instanceof Error && error.message === "No completed job found between these users") {
      res.status(400).json({ message: error.message });
      return;
    }
    next(error);
  }
};

export const createUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await createUser(req.body);
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "create user");
      return;
    }
    next(error);
  }
};

export const updateUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await updateUser(asId(req.params.id), req.body);
    if (!data) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "update user");
      return;
    }
    next(error);
  }
};

export const deleteUserHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteUser(asId(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "delete user");
      return;
    }
    next(error);
  }
};
