import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  assignServiceToProject,
} from "../api/projectServicesApi";

import type {
  ProjectServiceRequest,
} from "../types/project-service.types";

export function useAssignServiceToProject() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: ProjectServiceRequest,
    ) =>
      assignServiceToProject(data),

    onSuccess: (createdProjectService) => {
      queryClient.invalidateQueries({
        queryKey: ["project-services"],
      });

      queryClient.setQueryData(
        [
          "project-service",
          createdProjectService.id,
        ],
        createdProjectService,
      );
    },
  });
}