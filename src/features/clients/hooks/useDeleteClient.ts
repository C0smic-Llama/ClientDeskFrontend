import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteClient } from "../api/clientsApi";

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId: number) =>
      deleteClient(clientId),

    onSuccess: (_, clientId) => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });

      queryClient.removeQueries({
        queryKey: ["client", clientId],
      });
    },
  });
}