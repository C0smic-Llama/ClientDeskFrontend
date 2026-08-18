import { useQuery } from "@tanstack/react-query";

import {
  getClients,
  searchClients,
  getClientsByStatus,
} from "../api/clientsApi";

import type { ClientStatus } from "../types/client.types";

interface UseClientsOptions {
  page?: number;
  size?: number;
  sort?: string;
  keyword?: string;
  status?: ClientStatus;
}

export function useClients({
  page = 0,
  size = 10,
  sort = "companyName,asc",
  keyword = "",
  status,
}: UseClientsOptions = {}) {
  return useQuery({
    queryKey: [
      "clients",
      {
        page,
        size,
        sort,
        keyword,
        status,
      },
    ],

    queryFn: () => {
      if (keyword.trim()) {
        return searchClients(
          keyword.trim(),
          page,
          size,
          sort,
        );
      }

      if (status) {
        return getClientsByStatus(
          status,
          page,
          size,
          sort,
        );
      }

      return getClients(page, size, sort);
    },

    placeholderData: (previousData) => previousData,
  });
}