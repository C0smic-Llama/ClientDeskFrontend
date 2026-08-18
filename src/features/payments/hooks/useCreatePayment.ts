import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPayment } from "../api/paymentApi";
import type { PaymentRequest } from "../types/payment.types";

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: PaymentRequest) =>
      createPayment(request),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });

      // Payment changes invoice status, totalPaid and pendingAmount
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
  });
}