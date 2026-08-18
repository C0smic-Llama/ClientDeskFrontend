import { useQuery } from "@tanstack/react-query";

import { getProjectById } from "../api/projectsApi";

export function useProject(projectId?: number) {
  return useQuery({
    queryKey: ["project", projectId],

    queryFn: () => getProjectById(projectId!),

    enabled: !!projectId,
  });
}