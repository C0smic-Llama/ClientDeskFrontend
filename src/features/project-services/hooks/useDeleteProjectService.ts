import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteProjectService,
} from "../api/projectServicesApi";

export function useDeleteProjectService() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      projectServiceId: number,
    ) =>
      deleteProjectService(
        projectServiceId,
      ),

    onSuccess: (_, projectServiceId) => {
      queryClient.invalidateQueries({
        queryKey: ["project-services"],
      });

      queryClient.removeQueries({
        queryKey: [
          "project-service",
          projectServiceId,
        ],
      });
    },
  });
}