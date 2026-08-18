import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deactivateService } from "../api/servicesApi";

export function useDeactivateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId: number) =>
      deactivateService(serviceId),

    onSuccess: (updatedService) => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });

      queryClient.setQueryData(
        ["service", updatedService.id],
        updatedService,
      );
    },
  });
}