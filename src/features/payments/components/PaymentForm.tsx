import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { paymentSchema, type PaymentFormData } from "../schemas/paymentSchema";
import type { DefaultValues, SubmitHandler } from "react-hook-form";
interface PaymentFormProps {
  invoiceId: number;
  pendingAmount: number;
  defaultValues?: DefaultValues<PaymentFormData>;

  onSubmit: SubmitHandler<PaymentFormData>;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export default function PaymentForm({
  invoiceId,
  pendingAmount,
  defaultValues,
  onSubmit,
  isSubmitting = false,
  onCancel,
}: PaymentFormProps) {
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<PaymentFormData>({
  resolver: zodResolver(paymentSchema),

  defaultValues: defaultValues ?? {
    invoiceId,
    amount: undefined,
    paymentDate: new Date()
      .toISOString()
      .split("T")[0],
    paymentMethod: "BANK_TRANSFER",
    transactionReference: "",
    remarks: "",
  },
});

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Invoice */}
      <div>
        <label className="block mb-1 font-medium">Invoice</label>

        <input
          type="number"
          {...register("invoiceId", {
            valueAsNumber: true,
          })}
          disabled
          className="w-full rounded-md border px-3 py-2 bg-gray-100"
        />

        {errors.invoiceId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.invoiceId.message}
          </p>
        )}
      </div>
      <div className="rounded-md bg-gray-50 p-4">
        <p className="text-sm text-gray-500">Pending Amount</p>

        <p className="text-xl font-semibold">
          ₹
          {pendingAmount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      {/* Amount */}
      <div>
        <label className="block mb-1 font-medium">Amount</label>

        <input
          type="number"
          step="0.01"
          min="0.01"
          max={pendingAmount}
          {...register("amount", {
            valueAsNumber: true,
          })}
          className="w-full rounded-md border px-3 py-2"
          placeholder="Enter payment amount"
        />

        {errors.amount && (
          <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      {/* Payment Date */}
      <div>
        <label className="block mb-1 font-medium">Payment Date</label>

        <input
          type="date"
          {...register("paymentDate")}
          className="w-full rounded-md border px-3 py-2"
        />

        {errors.paymentDate && (
          <p className="mt-1 text-sm text-red-500">
            {errors.paymentDate.message}
          </p>
        )}
      </div>

      {/* Payment Method */}
      <div>
        <label className="block mb-1 font-medium">Payment Method</label>

        <select
          {...register("paymentMethod")}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="BANK_TRANSFER">Bank Transfer</option>

          <option value="UPI">UPI</option>

          <option value="CASH">Cash</option>

          <option value="CARD">Card</option>

          <option value="CHEQUE">Cheque</option>

          <option value="OTHER">Other</option>
        </select>

        {errors.paymentMethod && (
          <p className="mt-1 text-sm text-red-500">
            {errors.paymentMethod.message}
          </p>
        )}
      </div>

      {/* Transaction Reference */}
      <div>
        <label className="block mb-1 font-medium">Transaction Reference</label>

        <input
          type="text"
          {...register("transactionReference")}
          className="w-full rounded-md border px-3 py-2"
          placeholder="Optional"
        />

        {errors.transactionReference && (
          <p className="mt-1 text-sm text-red-500">
            {errors.transactionReference.message}
          </p>
        )}
      </div>

      {/* Remarks */}
      <div>
        <label className="block mb-1 font-medium">Remarks</label>

        <textarea
          {...register("remarks")}
          rows={4}
          className="w-full rounded-md border px-3 py-2"
          placeholder="Optional"
        />

        {errors.remarks && (
          <p className="mt-1 text-sm text-red-500">{errors.remarks.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border px-4 py-2"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Recording..." : "Record Payment"}
        </button>
      </div>
    </form>
  );
}
