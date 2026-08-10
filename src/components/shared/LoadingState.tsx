import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <Loader2 className="size-6 animate-spin text-clientdesk-red" />
    </div>
  );
}