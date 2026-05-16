import { Router } from "express";
import {
  createUserHandler,
  createUserReviewHandler,
  deleteUserHandler,
  getUserByIdHandler,
  listUsersHandler,
  updateUserHandler,
} from "../controllers/users.controller";
import { requireDocumentVerified, requireUser } from "../middleware/user-auth.middleware";

export const usersRouter = Router();

usersRouter.get("/", listUsersHandler);
usersRouter.get("/:id", getUserByIdHandler);
usersRouter.post("/:id/reviews", requireUser, requireDocumentVerified, createUserReviewHandler);
usersRouter.post("/", createUserHandler);
usersRouter.patch("/:id", updateUserHandler);
usersRouter.delete("/:id", deleteUserHandler);
