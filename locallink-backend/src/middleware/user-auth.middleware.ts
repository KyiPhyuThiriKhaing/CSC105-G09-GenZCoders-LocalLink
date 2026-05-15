import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma";
import { isTokenExpired, isTokenInvalid, verifyToken } from "../lib/jwt";

export const requireUser: RequestHandler = async (req, res, next) => {
    const header = req.headers.authorization ?? "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
        res.status(401).json({ message: "Missing auth token" });
        return;
    }

    try {
        const payload = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: { id: payload.sub },
            select: { id: true, status: true, role: true },
        });

        if (!user) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }

        if (user.status === "SUSPENDED") {
            res.status(403).json({ message: "Account suspended" });
            return;
        }

        (req as { userId?: string }).userId = user.id;
        next();
    } catch (error) {
        if (isTokenExpired(error)) {
            res.status(401).json({ message: "Token expired" });
            return;
        }
        if (isTokenInvalid(error)) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        next(error);
    }
};
