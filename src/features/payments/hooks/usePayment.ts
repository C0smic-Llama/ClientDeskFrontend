import { useQuery } from "@tanstack/react-query";

import { getPaymentById } from "../api/paymentApi";

export function usePayment(id: number) {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: () => getPaymentById(id),
    enabled: Number.isFinite(id),
  });
}