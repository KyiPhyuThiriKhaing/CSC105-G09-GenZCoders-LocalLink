import { Router } from "express";
import {
  adminLoginHandler,
  changeAdminPasswordHandler,
  createAdminHandler,
	deleteAdminUserHandler,
	getAdminProfileHandler,
	getAdminSubmissionByIdHandler,
	getDashboardStatsHandler,
	listAdminActionsHandler,
	listAdminsHandler,
	listAdminSubmissionsHandler,
	listAdminUsersHandler,
	updateAdminAccountStatusHandler,
	updateAdminSubmissionStatusHandler,
	updateAdminUserStatusHandler,
} from "../controllers/admin.controller";
import { requireAdmin } from "../middleware/admin-auth.middleware";

export const adminRouter = Router();

adminRouter.post("/login", adminLoginHandler);

adminRouter.use(requireAdmin);

adminRouter.get("/me", getAdminProfileHandler);
adminRouter.get("/dashboard/stats", getDashboardStatsHandler);

adminRouter.get("/admins", listAdminsHandler);
adminRouter.post("/admins", createAdminHandler);
adminRouter.patch("/admins/:id/status", updateAdminAccountStatusHandler);
adminRouter.patch("/password", changeAdminPasswordHandler);
adminRouter.get("/actions", listAdminActionsHandler);

adminRouter.get("/users", listAdminUsersHandler);
adminRouter.patch("/users/:id/status", updateAdminUserStatusHandler);
adminRouter.delete("/users/:id", deleteAdminUserHandler);

adminRouter.get("/submissions", listAdminSubmissionsHandler);
adminRouter.get("/submissions/:id", getAdminSubmissionByIdHandler);
adminRouter.patch("/submissions/:id/status", updateAdminSubmissionStatusHandler);
