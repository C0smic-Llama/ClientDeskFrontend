import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createUser,
  deleteUser,
  getUsers,
  getUsersByRole,
  getUsersByStatus,
  searchUsers,
  updateUser,
} from "../api/usersApi";

import type {
  UserRequest,
  UserRole,
  UserUpdateRequest,
} from "../types/user.types";

interface UseUsersOptions {
  page?: number;
  size?: number;
  sort?: string;

  keyword?: string;
  role?: UserRole;
  active?: boolean;
}

export function useUsers({
  page = 0,
  size = 10,
  sort = "firstName,asc",

  keyword,
  role,
  active,
}: UseUsersOptions = {}) {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: [
      "users",
      {
        page,
        size,
        sort,
        keyword,
        role,
        active,
      },
    ],

    queryFn: () => {
      // Search
      if (keyword?.trim()) {
        return searchUsers(keyword.trim(), page, size, sort);
      }

      // Role filter
      if (role) {
        return getUsersByRole(role, page, size, sort);
      }

      // Status filter
      if (active !== undefined) {
        return getUsersByStatus(active, page, size, sort);
      }

      // No filter
      return getUsers(page, size, sort);
    },

    placeholderData: (previousData) => previousData,
  });

  const createMutation = useMutation({
    mutationFn: (data: UserRequest) => createUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserUpdateRequest }) =>
      updateUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    ...usersQuery,

    users: usersQuery.data?.content ?? [],
    totalElements: usersQuery.data?.totalElements ?? 0,
    totalPages: usersQuery.data?.totalPages ?? 0,
    currentPage: usersQuery.data?.number ?? page,

    createUser: createMutation.mutateAsync,
    updateUser: updateMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
}
