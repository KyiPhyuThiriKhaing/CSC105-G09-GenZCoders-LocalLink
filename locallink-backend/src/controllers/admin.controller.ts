import type { RequestHandler, Response } from "express";
import { getDashboardStats } from "../services/admin.service";

const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

const sendNotImplemented = (res: Response, feature: string): void => {
  res.status(501).json({ message: `${feature} is not implemented yet` });
};

export const getDashboardStatsHandler: RequestHandler = async (_req, res, next) => {
  try {
    const data = await getDashboardStats();
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Error && error.message === NOT_IMPLEMENTED) {
      sendNotImplemented(res, "admin dashboard stats");
      return;
    }
    next(error);
  }
};
