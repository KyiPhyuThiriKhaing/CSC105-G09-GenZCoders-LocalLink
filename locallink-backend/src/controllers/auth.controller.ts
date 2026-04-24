import type { RequestHandler, Response } from "express";
import { loginUser, registerUser, verifyUserAccount } from "../services/auth.service";

const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

const sendNotImplemented = (res: Response, feature: string): void => {
  res.status(501).json({ message: `${feature} is not implemented yet` });
};

export const register: RequestHandler = async (req, res, next) => {
  try {
    const data = await registerUser(req.body);
    res.status(201).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "register");
      return;
    }
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const data = await loginUser(req.body);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "login");
      return;
    }
    next(error);
  }
};

export const verifyAccount: RequestHandler = async (req, res, next) => {
  try {
    const data = await verifyUserAccount(req.body);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "verify account");
      return;
    }
    next(error);
  }
};
