import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createService } from "../api/servicesApi";

import type { ServiceRequest } from "../types/service.types";

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ServiceRequest) =>
      createService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });
}