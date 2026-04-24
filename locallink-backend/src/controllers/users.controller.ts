import type { RequestHandler, Response } from "express";
import { createUser, deleteUser, getUserById, listUsers, updateUser } from "../services/users.service";

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
