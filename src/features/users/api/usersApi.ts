import api from "@/lib/axios";

import type {
  User,
  UserPage,
  UserRole,
} from "../types/user.types";

/**
 * Get users by role
 */
export async function getUsersByRole(
  role: UserRole,
  page = 0,
  size = 50,
  sort = "firstName,asc",
): Promise<UserPage> {
  const response = await api.get<UserPage>(
    "/users/role",
    {
      params: {
        role,
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}

/**
 * Get a user by ID
 */
export async function getUserById(
  userId: number,
): Promise<User> {
  const response = await api.get<User>(
    `/users/${userId}`,
  );

  return response.data;
}