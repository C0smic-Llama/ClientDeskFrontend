import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProject } from "../api/projectsApi";

import type { ProjectRequest } from "../types/project.types";

interface UpdateProjectVariables {
  projectId: number;
  data: ProjectRequest;
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: UpdateProjectVariables) =>
      updateProject(projectId, data),

    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.setQueryData(
        ["project", updatedProject.id],
        updatedProject,
      );
    },
  });
}