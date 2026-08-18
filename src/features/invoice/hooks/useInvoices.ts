import { useQuery } from "@tanstack/react-query";

import {
  getInvoices,
  getInvoicesByStatus,
  getInvoicesByClient,
  getInvoicesByInvoiceDate,
  getInvoicesByDueDate,
  getOverdueInvoices,
} from "../api/invoiceApi";

import type { InvoiceStatus } from "../types/invoice.types";

interface UseInvoicesOptions {
  page?: number;
  size?: number;
  sort?: string;
  status?: InvoiceStatus;
  clientId?: number;
  invoiceStartDate?: string;
  invoiceEndDate?: string;
  dueStartDate?: string;
  dueEndDate?: string;
  overdue?: boolean;
}

export function useInvoices({
  page = 0,
  size = 10,
  sort = "invoiceDate,desc",
  status,
  clientId,
  invoiceStartDate,
  invoiceEndDate,
  dueStartDate,
  dueEndDate,
  overdue = false,
}: UseInvoicesOptions = {}) {
  return useQuery({
    queryKey: [
      "invoices",
      {
        page,
        size,
        sort,
        status,
        clientId,
        invoiceStartDate,
        invoiceEndDate,
        dueStartDate,
        dueEndDate,
        overdue,
      },
    ],

    queryFn: () => {
      // Overdue invoices
      if (overdue) {
        return getOverdueInvoices(
          page,
          size,
          sort,
        );
      }

      // Status filter
      if (status) {
        return getInvoicesByStatus(
          status,
          page,
          size,
          sort,
        );
      }

      // Client filter
      if (clientId) {
        return getInvoicesByClient(
          clientId,
          page,
          size,
          sort,
        );
      }

      // Invoice date range
      if (invoiceStartDate && invoiceEndDate) {
        return getInvoicesByInvoiceDate(
          invoiceStartDate,
          invoiceEndDate,
          page,
          size,
          sort,
        );
      }

      // Due date range
      if (dueStartDate && dueEndDate) {
        return getInvoicesByDueDate(
          dueStartDate,
          dueEndDate,
          page,
          size,
          sort,
        );
      }

      // All invoices
      return getInvoices(
        page,
        size,
        sort,
      );
    },

    placeholderData: (previousData) => previousData,
  });
}