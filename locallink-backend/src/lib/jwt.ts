import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? "1h") as jwt.SignOptions["expiresIn"];

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

export type AdminTokenPayload = {
  sub: string;
  role: "ADMIN";
};

export type TokenPayload = {
  sub: string;
  role: string;
};

export const signToken = (payload: TokenPayload): string =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const verifyToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded !== "object" || decoded === null) {
    throw new JsonWebTokenError("Invalid token");
  }
  return decoded as TokenPayload;
};

export const signAdminToken = (payload: AdminTokenPayload): string =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const verifyAdminToken = (token: string): AdminTokenPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded !== "object" || decoded === null) {
    throw new JsonWebTokenError("Invalid token");
  }
  return decoded as AdminTokenPayload;
};

export const isTokenExpired = (error: unknown): boolean =>
  error instanceof TokenExpiredError;

export const isTokenInvalid = (error: unknown): boolean =>
  error instanceof JsonWebTokenError && !(error instanceof TokenExpiredError);
