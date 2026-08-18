import { useQuery } from "@tanstack/react-query";

import { getServiceById } from "../api/servicesApi";

export function useService(serviceId: number) {
  return useQuery({
    queryKey: ["service", serviceId],

    queryFn: () => getServiceById(serviceId),

    enabled: !!serviceId,
  });
}