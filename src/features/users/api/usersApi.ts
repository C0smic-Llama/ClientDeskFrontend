import api from "@/lib/axios";

import type {
  UserRequest,
  UserResponse,
  UserRole,
  UserUpdateRequest,
} from "../types/user.types";

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export async function getUsers(
  page = 0,
  size = 10,
  sort = "firstName,asc",
): Promise<PageResponse<UserResponse>> {
  const response = await api.get("/users", {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
}

export async function getUserById(
  id: number,
): Promise<UserResponse> {
  const response = await api.get(`/users/${id}`);

  return response.data;
}

export async function createUser(
  data: UserRequest,
): Promise<UserResponse> {
  const response = await api.post("/users", data);

  return response.data;
}

export async function updateUser(
  id: number,
  data: UserUpdateRequest,
): Promise<UserResponse> {
  const response = await api.put(
    `/users/${id}`,
    data,
  );

  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}

export async function searchUsers(
  keyword: string,
  page = 0,
  size = 10,
  sort = "firstName,asc",
): Promise<PageResponse<UserResponse>> {
  const response = await api.get("/users/search", {
    params: {
      keyword,
      page,
      size,
      sort,
    },
  });

  return response.data;
}

export async function getUsersByRole(
  role: UserRole,
  page = 0,
  size = 10,
  sort = "firstName,asc",
): Promise<PageResponse<UserResponse>> {
  const response = await api.get("/users/role", {
    params: {
      role,
      page,
      size,
      sort,
    },
  });

  return response.data;
}

export async function getUsersByStatus(
  active: boolean,
  page = 0,
  size = 10,
  sort = "firstName,asc",
): Promise<PageResponse<UserResponse>> {
  const response = await api.get("/users/status", {
    params: {
      active,
      page,
      size,
      sort,
    },
  });

  return response.data;
}