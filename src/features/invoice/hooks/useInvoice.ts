import { useQuery } from "@tanstack/react-query";

import { getInvoiceById } from "../api/invoiceApi";

export function useInvoice(id?: number) {
  return useQuery({
    queryKey: ["invoice", id],

    queryFn: () => getInvoiceById(id!),

    enabled: !!id,
  });
}