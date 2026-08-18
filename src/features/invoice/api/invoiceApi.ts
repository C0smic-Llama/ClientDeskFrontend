import api from "@/lib/axios";
import type {
  Invoice,
  InvoicePage,
  InvoiceRequest,
  InvoiceStatus,
} from "../types/invoice.types";

export const getInvoices = async (
  page: number = 0,
  size: number = 10,
  sort: string = "invoiceDate,desc",
): Promise<InvoicePage> => {
  const response = await api.get<InvoicePage>("/invoices", {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
};

export const getInvoiceById = async (id: number): Promise<Invoice> => {
  const response = await api.get<Invoice>(`/invoices/${id}`);

  return response.data;
};

export const createInvoice = async (data: InvoiceRequest): Promise<Invoice> => {
  const response = await api.post<Invoice>("/invoices", data);

  return response.data;
};

export const updateInvoice = async (
  id: number,
  data: InvoiceRequest,
): Promise<Invoice> => {
  const response = await api.put<Invoice>(`/invoices/${id}`, data);

  return response.data;
};

export const deleteInvoice = async (id: number): Promise<void> => {
  await api.delete(`/invoices/${id}`);
};

export const getInvoiceByNumber = async (
  invoiceNumber: string,
): Promise<Invoice> => {
  const response = await api.get<Invoice>(`/invoices/number/${invoiceNumber}`);

  return response.data;
};

export const getInvoiceByProject = async (
  projectId: number,
): Promise<Invoice> => {
  const response = await api.get<Invoice>(`/invoices/project/${projectId}`);

  return response.data;
};

export const getInvoicesByClient = async (
  clientId: number,
  page: number = 0,
  size: number = 10,
  sort: string = "invoiceDate,desc",
): Promise<InvoicePage> => {
  const response = await api.get<InvoicePage>(`/invoices/client/${clientId}`, {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
};

export const getInvoicesByStatus = async (
  status: InvoiceStatus,
  page: number = 0,
  size: number = 10,
  sort: string = "invoiceDate,desc",
): Promise<InvoicePage> => {
  const response = await api.get<InvoicePage>(`/invoices/status/${status}`, {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
};

export const getOverdueInvoices = async (
  page: number = 0,
  size: number = 10,
  sort: string = "invoiceDate,desc",
): Promise<InvoicePage> => {
  const response = await api.get<InvoicePage>("/invoices/overdue", {
    params: {
      page,
      size,
      sort,
    },
  });

  return response.data;
};

export const getInvoicesByInvoiceDate = async (
  startDate: string,
  endDate: string,
  page: number = 0,
  size: number = 10,
  sort: string = "invoiceDate,desc",
): Promise<InvoicePage> => {
  const response = await api.get<InvoicePage>("/invoices/invoice-date", {
    params: {
      startDate,
      endDate,
      page,
      size,
      sort,
    },
  });

  return response.data;
};

export const getInvoicesByDueDate = async (
  startDate: string,
  endDate: string,
  page: number = 0,
  size: number = 10,
  sort: string = "invoiceDate,desc",
): Promise<InvoicePage> => {
  const response = await api.get<InvoicePage>("/invoices/due-date", {
    params: {
      startDate,
      endDate,
      page,
      size,
      sort,
    },
  });

  return response.data;
};

export const downloadInvoicePdf = async (invoiceId: number): Promise<Blob> => {
  const response = await api.get(`/invoices/${invoiceId}/pdf`, {
    responseType: "blob",
  });

  return response.data;
};
