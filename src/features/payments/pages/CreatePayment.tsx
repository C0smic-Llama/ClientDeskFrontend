import { useNavigate, useParams } from "react-router-dom";

import PaymentForm from "../components/PaymentForm";
import { useCreatePayment } from "../hooks/useCreatePayment";
import type { PaymentFormData } from "../schemas/paymentSchema";
import { useInvoice } from "../../invoice/hooks/useInvoice";
export default function CreatePayment() {
  const navigate = useNavigate();

  const { invoiceId } = useParams<{
    invoiceId: string;
  }>();

  const createPaymentMutation = useCreatePayment();

  const parsedInvoiceId = Number(invoiceId);
  const { data: invoice, isLoading, isError } = useInvoice(parsedInvoiceId);

  if (!invoiceId || Number.isNaN(parsedInvoiceId)) {
    return (
      <div className="p-6">
        <p className="text-red-500">Invalid invoice ID.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-6">Loading invoice...</div>;
  }

  if (isError || !invoice) {
    return (
      <div className="p-6">
        <p className="text-red-500">Unable to load invoice.</p>
      </div>
    );
  }

  const handleSubmit = (data: PaymentFormData) => {
    createPaymentMutation.mutate(
      {
        invoiceId: parsedInvoiceId,
        amount: data.amount,
        paymentDate: data.paymentDate,
        paymentMethod: data.paymentMethod,
        transactionReference: data.transactionReference || undefined,
        remarks: data.remarks || undefined,
      },
      {
        onSuccess: () => {
          navigate(`/invoices/${parsedInvoiceId}`);
        },
      },
    );
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-semibold">Record Payment</h1>

        <PaymentForm
          invoiceId={invoice.id}
          pendingAmount={invoice.pendingAmount}
          onSubmit={handleSubmit}
          isSubmitting={createPaymentMutation.isPending}
          onCancel={() => navigate(-1)}
        />

        {createPaymentMutation.isError && (
          <p className="mt-4 text-sm text-red-500">
            Failed to record payment. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
