export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface VerifyAccountInput {
  code: string;
}

export interface AuthResponse {
  userId: string;
  token: string;
}
