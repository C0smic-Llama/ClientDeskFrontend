import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProject } from "../api/projectsApi";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) =>
      deleteProject(projectId),

    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.removeQueries({
        queryKey: ["project", projectId],
      });
    },
  });
}