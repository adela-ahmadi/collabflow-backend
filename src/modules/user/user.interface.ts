export type UserRole = "USER" | "ADMIN";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isDeleted?: boolean;
}
