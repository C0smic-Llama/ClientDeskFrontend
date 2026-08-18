import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { usePayment } from "../hooks/usePayment";

export default function PaymentDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const paymentId = Number(id);

  const {
    data: payment,
    isLoading,
    isError,
  } = usePayment(paymentId);

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

  const formatAmount = (amount: number) =>
    amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            title="Back"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-semibold">
              Payment Details
            </h1>

            <p className="text-sm text-muted-foreground">
              {payment.receiptNumber}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
          >
            <Link to={`/payments/${payment.id}/edit`}>
              <Edit className="mr-2 size-4" />
              Edit
            </Link>
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              // Delete functionality will be added next.
              console.log("Delete payment", payment.id);
            }}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Payment Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Payment Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Receipt Number
              </p>

              <p className="font-medium">
                {payment.receiptNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Payment Amount
              </p>

              <p className="text-xl font-semibold">
                ₹{formatAmount(payment.amount)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Payment Date
              </p>

              <p className="font-medium">
                {payment.paymentDate}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Payment Method
              </p>

              <p className="font-medium">
                {payment.paymentMethod}
              </p>
            </div>

            {payment.transactionReference && (
              <div>
                <p className="text-sm text-muted-foreground">
                  Transaction Reference
                </p>

                <p className="font-medium">
                  {payment.transactionReference}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invoice Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              Invoice Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Invoice
              </p>

              <Link
                to={`/invoices/${payment.invoiceId}`}
                className="font-medium text-primary hover:underline"
              >
                {payment.invoiceNumber}
              </Link>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Client
              </p>

              <p className="font-medium">
                {payment.clientName}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Project
              </p>

              <p className="font-medium">
                {payment.projectName}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Invoice Status
              </p>

              <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {payment.status}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              Payment Summary
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Paid
                </p>

                <p className="text-xl font-semibold">
                  ₹{formatAmount(payment.totalPaid)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Amount
                </p>

                <p className="text-xl font-semibold">
                  ₹{formatAmount(payment.pendingAmount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remarks */}
        {payment.remarks && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                Remarks
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                {payment.remarks}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}