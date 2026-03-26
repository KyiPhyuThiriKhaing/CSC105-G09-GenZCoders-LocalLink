export type UserStatus = "Active" | "Suspended" | "Pending";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  status: UserStatus;
};
