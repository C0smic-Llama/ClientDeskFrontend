import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createClient } from "../api/clientsApi";

import type { ClientRequest } from "../types/client.types";

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClientRequest) =>
      createClient(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
  });
}