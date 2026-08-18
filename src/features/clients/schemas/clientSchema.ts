import { z } from "zod";

export const clientSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name cannot exceed 100 characters"),

  contactPerson: z
    .string()
    .trim()
    .min(1, "Contact person is required"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  contactNumber: z
    .string()
    .regex(
      /^[0-9]{10}$/,
      "Phone number must contain exactly 10 digits",
    ),

  status: z
    .enum(["ACTIVE", "INACTIVE"])
    .optional(),

  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(250, "Address cannot exceed 250 characters"),
});

export type ClientFormData = z.infer<typeof clientSchema>;