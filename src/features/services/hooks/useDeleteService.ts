import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteService } from "../api/servicesApi";

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId: number) =>
      deleteService(serviceId),

    onSuccess: (_, serviceId) => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });

      queryClient.removeQueries({
        queryKey: ["service", serviceId],
      });
    },
  });
}