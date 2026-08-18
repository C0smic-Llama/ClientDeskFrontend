import { z } from "zod";

export const paymentSchema = z.object({
  invoiceId: z
    .number()
    .int()
    .positive("Invoice is required"),

  amount: z
    .number()
    .positive("Payment amount must be greater than zero"),

  paymentDate: z
    .string()
    .min(1, "Payment date is required"),

  paymentMethod: z.enum([
    "CASH",
    "BANK_TRANSFER",
    "UPI",
    "CARD",
    "CHEQUE",
    "OTHER",
  ]),

  transactionReference: z
    .string()
    .max(100, "Transaction reference cannot exceed 100 characters")
    .optional(),

  remarks: z
    .string()
    .max(500, "Remarks cannot exceed 500 characters")
    .optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
