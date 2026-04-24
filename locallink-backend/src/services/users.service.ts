import type { CreateUserInput, UpdateUserInput, User } from "../models/user.model";

const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

export const listUsers = async (): Promise<User[]> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const getUserById = async (_id: string): Promise<User | null> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const createUser = async (_payload: CreateUserInput): Promise<User> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const updateUser = async (_id: string, _payload: UpdateUserInput): Promise<User | null> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const deleteUser = async (_id: string): Promise<void> => {
  throw new Error(NOT_IMPLEMENTED);
};
