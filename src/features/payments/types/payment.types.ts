export type PaymentMethod =
  | "CASH"
  | "BANK_TRANSFER"
  | "UPI"
  | "CARD"
  | "CHEQUE"
  | "OTHER";

export type InvoiceStatus =
  | "SENT"
  | "PARTIALLY_PAID"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED";

export interface Payment {
  id: number;
  receiptNumber: string;

  invoiceId: number;
  invoiceNumber: string;

  status: InvoiceStatus;

  clientName: string;
  projectName: string;

  amount: number;
  paymentDate: string;

  paymentMethod: PaymentMethod;

  transactionReference: string | null;

  totalPaid: number;
  pendingAmount: number;

  remarks: string | null;
}

export interface PaymentRequest {
  invoiceId: number;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  transactionReference?: string;
  remarks?: string;
}

export interface PaymentPage {
  content: Payment[];

  totalElements: number;
  totalPages: number;

  size: number;
  number: number;

  first: boolean;
  last: boolean;
}