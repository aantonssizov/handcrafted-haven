import { UserRoleType } from "./roles";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: UserRoleType;
};

export type LoginData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};