import { useMutation } from "@tanstack/react-query";

import { downloadInvoicePdf } from "../api/invoiceApi";

export function useDownloadInvoicePdf() {
  return useMutation({
    mutationFn: (invoiceId: number) =>
      downloadInvoicePdf(invoiceId),

    onSuccess: (blob, invoiceId) => {
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });
}