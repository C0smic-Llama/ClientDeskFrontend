import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateProjectService,
} from "../api/projectServicesApi";

import type {
  ProjectServiceRequest,
} from "../types/project-service.types";

interface UpdateProjectServiceVariables {
  projectServiceId: number;
  data: ProjectServiceRequest;
}

export function useUpdateProjectService() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      projectServiceId,
      data,
    }: UpdateProjectServiceVariables) =>
      updateProjectService(
        projectServiceId,
        data,
      ),

    onSuccess: (updatedProjectService) => {
      queryClient.invalidateQueries({
        queryKey: ["project-services"],
      });

      queryClient.setQueryData(
        [
          "project-service",
          updatedProjectService.id,
        ],
        updatedProjectService,
      );
    },
  });
}