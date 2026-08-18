import { useQuery } from "@tanstack/react-query";

import {
  getProjects,
  searchProjects,
  getProjectsByStatus,
  getProjectsByClient,
  getProjectsByUser,
} from "../api/projectsApi";

import type { ProjectStatus } from "../types/project.types";

interface UseProjectsOptions {
  page?: number;
  size?: number;
  sort?: string;
  keyword?: string;
  status?: ProjectStatus;
  clientId?: number;
  userId?: number;
}

export function useProjects({
  page = 0,
  size = 10,
  sort = "projectName,asc",
  keyword = "",
  status,
  clientId,
  userId,
}: UseProjectsOptions = {}) {
  return useQuery({
    queryKey: [
      "projects",
      {
        page,
        size,
        sort,
        keyword,
        status,
        clientId,
        userId,
      },
    ],

    queryFn: () => {
      // Search takes priority
      if (keyword.trim()) {
        return searchProjects(
          keyword.trim(),
          page,
          size,
          sort,
        );
      }

      // Status filter
      if (status) {
        return getProjectsByStatus(
          status,
          page,
          size,
          sort,
        );
      }

      // Client filter
      if (clientId) {
        return getProjectsByClient(
          clientId,
          page,
          size,
          sort,
        );
      }

      // Assigned user filter
      if (userId) {
        return getProjectsByUser(
          userId,
          page,
          size,
          sort,
        );
      }

      // All projects
      return getProjects(
        page,
        size,
        sort,
      );
    },

    placeholderData: (previousData) => previousData,
  });
}