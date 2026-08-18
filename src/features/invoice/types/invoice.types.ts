export type InvoiceStatus =
  | "SENT"
  | "PARTIALLY_PAID"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED";

export interface Invoice {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;

  status: InvoiceStatus;

  projectName: string;
  clientName: string;

  taxableAmount: number;
  gstAmount: number;
  discount: number;
  grandTotal: number;

  totalPaid: number;
  pendingAmount: number;
}

export interface InvoiceRequest {
  projectId: number;
  dueDate: string;
  discount?: number;
  notes?: string;
}

export interface InvoicePage {
  content: Invoice[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}