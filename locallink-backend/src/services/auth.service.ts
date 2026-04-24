import type { AuthResponse, LoginInput, RegisterInput, VerifyAccountInput } from "../models/auth.model";

const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

export const registerUser = async (_payload: RegisterInput): Promise<AuthResponse> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const loginUser = async (_payload: LoginInput): Promise<AuthResponse> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const verifyUserAccount = async (_payload: VerifyAccountInput): Promise<{ verified: boolean }> => {
  throw new Error(NOT_IMPLEMENTED);
};
