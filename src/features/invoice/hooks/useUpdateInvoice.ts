import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateInvoice } from "../api/invoiceApi";
import type { InvoiceRequest } from "../types/invoice.types";

interface UpdateInvoiceVariables {
  id: number;
  data: InvoiceRequest;
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateInvoiceVariables) =>
      updateInvoice(id, data),

    onSuccess: (updatedInvoice) => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });

      queryClient.invalidateQueries({
        queryKey: ["invoice", updatedInvoice.id],
      });
    },
  });
}