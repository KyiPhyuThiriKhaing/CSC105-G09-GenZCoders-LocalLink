import { Router } from "express";
import {
	deleteAdminUserHandler,
	getAdminSubmissionByIdHandler,
	getDashboardStatsHandler,
	listAdminSubmissionsHandler,
	listAdminUsersHandler,
	updateAdminSubmissionStatusHandler,
	updateAdminUserStatusHandler,
} from "../controllers/admin.controller";

export const adminRouter = Router();

adminRouter.get("/dashboard/stats", getDashboardStatsHandler);
adminRouter.get("/users", listAdminUsersHandler);
adminRouter.patch("/users/:id/status", updateAdminUserStatusHandler);
adminRouter.delete("/users/:id", deleteAdminUserHandler);

adminRouter.get("/submissions", listAdminSubmissionsHandler);
adminRouter.get("/submissions/:id", getAdminSubmissionByIdHandler);
adminRouter.patch("/submissions/:id/status", updateAdminSubmissionStatusHandler);
