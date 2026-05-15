import { Router } from "express";
import {
    addMySkill,
    getMySkills,
    login,
    logout,
    me,
    register,
    removeMySkill,
    requestMyEmailVerification,
    updateMe,
    updatePassword,
    verifyAccount,
    getMyHistory,
} from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/verify", verifyAccount);
authRouter.post("/logout", logout);
authRouter.get("/me", requireUser, me);
authRouter.get("/me/history", requireUser, getMyHistory);
authRouter.patch("/me", requireUser, updateMe);
authRouter.patch("/me/password", requireUser, updatePassword);
authRouter.get("/me/skills", requireUser, getMySkills);
authRouter.post("/me/skills", requireUser, addMySkill);
authRouter.delete("/me/skills/:name", requireUser, removeMySkill);
authRouter.post("/me/request-email-verification", requireUser, requestMyEmailVerification);
