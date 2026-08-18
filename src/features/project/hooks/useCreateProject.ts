import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProject } from "../api/projectsApi";

import type { ProjectRequest } from "../types/project.types";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectRequest) =>
      createProject(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}