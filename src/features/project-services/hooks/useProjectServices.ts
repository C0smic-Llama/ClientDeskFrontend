import { useQuery } from "@tanstack/react-query";

import { getProjectServicesByProject } from "../api/projectServicesApi";

interface UseProjectServicesOptions {
  page?: number;
  size?: number;
  sort?: string;
}

export function useProjectServices(
  projectId: number,
  {
    page = 0,
    size = 10,
    sort = "serviceName,asc",
  }: UseProjectServicesOptions = {},
) {
  return useQuery({
    queryKey: [
      "project-services",
      {
        projectId,
        page,
        size,
        sort,
      },
    ],

    queryFn: () =>
      getProjectServicesByProject(
        projectId,
        page,
        size,
        sort,
      ),

    enabled: !!projectId,

    placeholderData: (previousData) =>
      previousData,
  });
}