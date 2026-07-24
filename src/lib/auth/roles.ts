export enum UserRole {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

export const USER_ROLES = [
  UserRole.CUSTOMER,
  UserRole.SELLER,
  UserRole.ADMIN,
] as const;

export type UserRoleType = (typeof USER_ROLES)[number];