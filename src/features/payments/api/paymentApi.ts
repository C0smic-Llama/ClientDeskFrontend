import api from "../../../lib/axios";

import type {
  Payment,
  PaymentPage,
  PaymentRequest,
  PaymentMethod,
} from "../types/payment.types";


export interface PaymentPageParams {
  page: number;
  size: number;
}


export async function getAllPayments(
  page: number,
  size: number,
  sort: string,
) {
  const response = await api.get("/payments", {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
}
export async function getPayments(
  params: PaymentPageParams
): Promise<PaymentPage> {
  const response = await api.get<PaymentPage>(
    "/payments",
    {
      params,
    }
  );

  return response.data;
}
/**
 * Create a payment
 */
export const createPayment = async (
  request: PaymentRequest
): Promise<Payment> => {
  const response = await api.post<Payment>(
    "/payments",
    request
  );

  return response.data;
};

/**
 * Update a payment
 */
export const updatePayment = async (
  id: number,
  request: PaymentRequest
): Promise<Payment> => {
  const response = await api.put<Payment>(
    `/payments/${id}`,
    request
  );

  return response.data;
};

/**
 * Delete a payment
 */
export async function deletePayment(id: number): Promise<void> {
  await api.delete(`/payments/${id}`);
}

/**
 * Get payment by ID
 */
export const getPaymentById = async (
  id: number
): Promise<Payment> => {
  const response = await api.get<Payment>(
    `/payments/${id}`
  );

  return response.data;
};

/**
 * Get payment by receipt number
 */
export const getPaymentByReceiptNumber = async (
  receiptNumber: string
): Promise<Payment> => {
  const response = await api.get<Payment>(
    `/payments/receipt-number/${encodeURIComponent(receiptNumber)}`
  );

  return response.data;
};

/**
 * Get payments for an invoice
 */
export const getPaymentsByInvoice = async (
  invoiceId: number,
  page = 0,
  size = 10,
  sort = "paymentDate,desc"
): Promise<PaymentPage> => {
  const response = await api.get<PaymentPage>(
    `/payments/invoice/${invoiceId}`,
    {
      params: {
        page,
        size,
        sort,
      },
    }
  );

  return response.data;
};

/**
 * Get payments for a client
 */
export const getPaymentsByClient = async (
  clientId: number,
  page = 0,
  size = 10,
  sort = "paymentDate,desc"
): Promise<PaymentPage> => {
  const response = await api.get<PaymentPage>(
    `/payments/client/${clientId}`,
    {
      params: {
        page,
        size,
        sort,
      },
    }
  );

  return response.data;
};

/**
 * Get payments by payment method
 */
export const getPaymentsByPaymentMethod = async (
  paymentMethod: PaymentMethod,
  page = 0,
  size = 10,
  sort = "paymentDate,desc"
): Promise<PaymentPage> => {
  const response = await api.get<PaymentPage>(
    `/payments/payment-method/${paymentMethod}`,
    {
      params: {
        page,
        size,
        sort,
      },
    }
  );

  return response.data;
};

/**
 * Get payments within a date range
 */
export const getPaymentsByDateRange = async (
  startDate: string,
  endDate: string,
  page = 0,
  size = 10,
  sort = "paymentDate,desc"
): Promise<PaymentPage> => {
  const response = await api.get<PaymentPage>(
    "/payments/date-range",
    {
      params: {
        startDate,
        endDate,
        page,
        size,
        sort,
      },
    }
  );

  return response.data;
};