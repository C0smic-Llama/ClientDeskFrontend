import { useQuery } from "@tanstack/react-query";

import {
  getServices,
  searchServices,
  getActiveServices,
  getServicesByCategory,
} from "../api/servicesApi";

import type { ServiceCategory } from "../types/service.types";

interface UseServicesOptions {
  page?: number;
  size?: number;
  sort?: string;
  keyword?: string;
  category?: ServiceCategory;
  active?: boolean;
}

export function useServices({
  page = 0,
  size = 10,
  sort = "serviceName,asc",
  keyword = "",
  category,
  active,
}: UseServicesOptions = {}) {
  return useQuery({
    queryKey: [
      "services",
      {
        page,
        size,
        sort,
        keyword,
        category,
        active,
      },
    ],

    queryFn: () => {
      // Search takes priority
      if (keyword.trim()) {
        return searchServices(
          keyword.trim(),
          page,
          size,
          sort,
        );
      }

      // Category filter
      if (category) {
        return getServicesByCategory(
          category,
          page,
          size,
          sort,
        );
      }

      // Active services
      if (active === true) {
        return getActiveServices(
          page,
          size,
          sort,
        );
      }

      // All services
      return getServices(
        page,
        size,
        sort,
      );
    },

    placeholderData: (previousData) => previousData,
  });
}