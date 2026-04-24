export type UserRole = "student" | "employer" | "admin";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  fullName?: string;
  email?: string;
  role?: UserRole;
}
