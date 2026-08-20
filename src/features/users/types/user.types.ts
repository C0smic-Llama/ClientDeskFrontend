export type UserRole = "ADMIN" | "STAFF";

export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
}

export interface UserUpdateRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  role: UserRole;
}

export interface UserResponse {
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
export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
}