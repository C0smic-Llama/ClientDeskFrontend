import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInvoice } from "../api/invoiceApi";
import type { InvoiceRequest } from "../types/invoice.types";

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InvoiceRequest) => createInvoice(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
  });
}