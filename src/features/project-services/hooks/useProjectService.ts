import { useQuery } from "@tanstack/react-query";

import { getProjectServiceById } from "../api/projectServicesApi";

export function useProjectService(
  projectServiceId: number,
) {
  return useQuery({
    queryKey: [
      "project-service",
      projectServiceId,
    ],

    queryFn: () =>
      getProjectServiceById(
        projectServiceId,
      ),

    enabled: !!projectServiceId,
  });
}