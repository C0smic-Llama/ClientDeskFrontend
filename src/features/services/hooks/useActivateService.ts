import { useMutation, useQueryClient } from "@tanstack/react-query";

import { activateService } from "../api/servicesApi";

export function useActivateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId: number) =>
      activateService(serviceId),

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
