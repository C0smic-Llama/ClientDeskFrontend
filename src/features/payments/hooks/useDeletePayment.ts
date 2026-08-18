import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePayment } from "../api/paymentApi";

export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePayment(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["payment"],
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