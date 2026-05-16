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
            select: { id: true, status: true, role: true, emailVerifiedAt: true, idVerifiedAt: true },
        });

        if (!user) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }

        if (user.status === "SUSPENDED") {
            res.status(403).json({ message: "Account suspended" });
            return;
        }

        (req as { userId?: string; userEmailVerified?: boolean; userIdVerified?: boolean }).userId = user.id;
        (req as { userId?: string; userEmailVerified?: boolean; userIdVerified?: boolean }).userEmailVerified = !!user.emailVerifiedAt;
        (req as { userId?: string; userEmailVerified?: boolean; userIdVerified?: boolean }).userIdVerified = !!user.idVerifiedAt;
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

export const requireEmailVerified: RequestHandler = (req, res, next) => {
    const emailVerified = (req as { userEmailVerified?: boolean }).userEmailVerified;
    if (!emailVerified) {
        res.status(403).json({ message: "Email not verified" });
        return;
    }
    next();
};

export const requireDocumentVerified: RequestHandler = (req, res, next) => {
    const idVerified = (req as { userIdVerified?: boolean }).userIdVerified;
    if (!idVerified) {
        res.status(403).json({ message: "Document not verified" });
        return;
    }
    next();
};
