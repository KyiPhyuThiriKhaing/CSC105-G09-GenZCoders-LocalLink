import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma";
import { isTokenExpired, isTokenInvalid, verifyAdminToken } from "../lib/jwt";

export const requireAdmin: RequestHandler = async (req, res, next) => {
  const header = req.headers.authorization ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ message: "Missing admin token" });
    return;
  }

  try {
    const payload = verifyAdminToken(token);
    if (payload.role !== "ADMIN") {
      res.status(403).json({ message: "Not authorized" });
      return;
    }

    const admin = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true, status: true },
    });

    if (!admin || admin.role !== "ADMIN" || admin.status !== "ACTIVE") {
      res.status(403).json({ message: "Admin access denied" });
      return;
    }

    (req as { adminUserId?: string }).adminUserId = admin.id;
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
