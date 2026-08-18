import { useQuery } from "@tanstack/react-query";

import {
  getPaymentsByInvoice,
  getPaymentsByClient,
  getPaymentsByPaymentMethod,
  getPaymentsByDateRange,
  getAllPayments,
} from "../api/paymentApi";

import type { PaymentMethod } from "../types/payment.types";

interface UsePaymentsOptions {
  page?: number;
  size?: number;
  sort?: string;

  invoiceId?: number;
  clientId?: number;
  paymentMethod?: PaymentMethod;

  startDate?: string;
  endDate?: string;
}

export function usePayments({
  page = 0,
  size = 10,
  sort = "paymentDate,desc",

  invoiceId,
  clientId,
  paymentMethod,

  startDate,
  endDate,
}: UsePaymentsOptions = {}) {
  return useQuery({
    queryKey: [
      "payments",
      {
        page,
        size,
        sort,
        invoiceId,
        clientId,
        paymentMethod,
        startDate,
        endDate,
      },
    ],

    queryFn: () => {
      // Invoice filter
      if (invoiceId) {
        return getPaymentsByInvoice(invoiceId, page, size, sort);
      }

      // Client filter
      if (clientId) {
        return getPaymentsByClient(clientId, page, size, sort);
      }

      // Payment method filter
      if (paymentMethod) {
        return getPaymentsByPaymentMethod(paymentMethod, page, size, sort);
      }

      // Date range filter
      if (startDate && endDate) {
        return getPaymentsByDateRange(startDate, endDate, page, size, sort);
      }

      // No filter
      //
      // Your backend currently does NOT have:
      // GET /payments
      //
      // so there is no general "get all payments" API
      // to call here.
      // No filter
      return getAllPayments(page, size, sort);
    },

    placeholderData: (previousData) => previousData,
  });
}
