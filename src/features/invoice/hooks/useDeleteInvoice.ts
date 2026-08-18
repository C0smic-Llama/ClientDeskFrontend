import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteInvoice } from "../api/invoiceApi";

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteInvoice(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });

      queryClient.removeQueries({
        queryKey: ["invoice", id],
      });
    },
  });
}