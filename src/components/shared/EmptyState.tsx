import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-clientdesk-light p-12 text-center">
      <Inbox className="mb-4 size-10 text-clientdesk-gray" />

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mt-1 max-w-sm text-sm text-clientdesk-gray">
          {description}
        </p>
      )}

      {actionLabel && (
        <Button
          className="mt-5 bg-clientdesk-red hover:bg-clientdesk-red/90"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}