import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePayment } from "../api/paymentApi";
import type { PaymentRequest } from "../types/payment.types";

interface UpdatePaymentVariables {
  id: number;
  data: PaymentRequest;
}

export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdatePaymentVariables) =>
      updatePayment(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["payment", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });

      queryClient.invalidateQueries({
        queryKey: ["invoice"],
      });
    },
  });
}