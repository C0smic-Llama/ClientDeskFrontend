import { useQuery } from "@tanstack/react-query";

import { getClientById } from "../api/clientsApi";

export function useClient(clientId: number) {
  return useQuery({
    queryKey: ["client", clientId],

    queryFn: () => getClientById(clientId),

    enabled: !!clientId,
  });
}