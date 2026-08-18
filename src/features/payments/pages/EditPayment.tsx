import { useNavigate, useParams } from "react-router-dom";

import PaymentForm from "../components/PaymentForm";
import { usePayment } from "../hooks/usePayment";
import { useUpdatePayment } from "../hooks/useUpdatePayment";
import type { PaymentFormData } from "../schemas/paymentSchema";

export default function EditPayment() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const paymentId = Number(id);

  const {
    data: payment,
    isLoading,
    isError,
  } = usePayment(paymentId);

  const updatePaymentMutation =
    useUpdatePayment();

  if (!id || Number.isNaN(paymentId)) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          Invalid payment ID.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6">
        Loading payment...
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          Payment not found.
        </p>
      </div>
    );
  }

  const handleSubmit = (data: PaymentFormData) => {
    updatePaymentMutation.mutate(
      {
        id: paymentId,
        data: {
          invoiceId: payment.invoiceId,
          amount: data.amount,
          paymentDate: data.paymentDate,
          paymentMethod: data.paymentMethod,
          transactionReference:
            data.transactionReference || undefined,
          remarks: data.remarks || undefined,
        },
      },
      {
        onSuccess: () => {
          navigate(`/payments/${paymentId}`);
        },
      },
    );
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-semibold">
          Edit Payment
        </h1>

        <PaymentForm
          invoiceId={payment.invoiceId}
          pendingAmount={
            payment.pendingAmount + payment.amount
          }
          defaultValues={{
            invoiceId: payment.invoiceId,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            paymentMethod: payment.paymentMethod,
            transactionReference:
              payment.transactionReference ?? "",
            remarks: payment.remarks ?? "",
          }}
          onSubmit={handleSubmit}
          isSubmitting={
            updatePaymentMutation.isPending
          }
          onCancel={() => navigate(-1)}
        />

        {updatePaymentMutation.isError && (
          <p className="mt-4 text-sm text-red-500">
            Failed to update payment. Please try
            again.
          </p>
        )}
      </div>
    </div>
  );
}