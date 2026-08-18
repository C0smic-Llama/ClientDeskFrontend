import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateService } from "../api/servicesApi";

import type { ServiceRequest } from "../types/service.types";

interface UpdateServiceVariables {
  serviceId: number;
  data: ServiceRequest;
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      serviceId,
      data,
    }: UpdateServiceVariables) =>
      updateService(serviceId, data),

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