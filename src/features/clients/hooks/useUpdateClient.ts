import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateClient } from "../api/clientsApi";

import type { ClientRequest } from "../types/client.types";

interface UpdateClientVariables {
  clientId: number;
  data: ClientRequest;
}

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      clientId,
      data,
    }: UpdateClientVariables) =>
      updateClient(clientId, data),

    onSuccess: (updatedClient) => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });

      queryClient.setQueryData(
        ["client", updatedClient.id],
        updatedClient,
      );
    },
  });
}