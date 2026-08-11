export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export type UserRole =
  | "ADMIN"
  | "STAFF"
  | "EDITOR"
  | "VIDEOGRAPHER"
  | "PHOTOGRAPHER";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}