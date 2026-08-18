import { z } from "zod";

export const invoiceSchema = z.object({
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(`${date}T00:00:00`);

        return selectedDate >= today;
      },
      {
        message: "Due date cannot be in the past",
      },
    ),

  discount: z
    .number()
    .min(0, "Discount cannot be negative"),

  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
});

export type InvoiceFormValues = z.infer<
  typeof invoiceSchema
>;