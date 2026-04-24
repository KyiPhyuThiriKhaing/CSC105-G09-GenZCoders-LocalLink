import { Router } from "express";
import { getDashboardStatsHandler } from "../controllers/admin.controller";

export const adminRouter = Router();

adminRouter.get("/dashboard/stats", getDashboardStatsHandler);
