export type UserRole =
  | "ADMIN"
  | "STAFF";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  active: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserPage {
  content: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}