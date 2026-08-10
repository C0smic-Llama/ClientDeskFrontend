import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this information.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-clientdesk-light p-12 text-center">
      <AlertCircle className="mb-4 size-10 text-clientdesk-red" />

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-sm text-clientdesk-gray">
        {description}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          className="mt-5"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}