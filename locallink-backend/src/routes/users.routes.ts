import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  listUsersHandler,
  updateUserHandler,
} from "../controllers/users.controller";

export const usersRouter = Router();

usersRouter.get("/", listUsersHandler);
usersRouter.get("/:id", getUserByIdHandler);
usersRouter.post("/", createUserHandler);
usersRouter.patch("/:id", updateUserHandler);
usersRouter.delete("/:id", deleteUserHandler);
