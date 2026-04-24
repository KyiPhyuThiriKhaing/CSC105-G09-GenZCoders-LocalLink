import { Router } from "express";
import { authRouter } from "./auth.routes";
import { usersRouter } from "./users.routes";
import { jobsRouter } from "./jobs.routes";
import { submissionsRouter } from "./submissions.routes";
import { adminRouter } from "./admin.routes";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/jobs", jobsRouter);
apiRouter.use("/submissions", submissionsRouter);
apiRouter.use("/admin", adminRouter);
