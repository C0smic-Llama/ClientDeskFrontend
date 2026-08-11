import { Badge } from "@/components/ui/badge";

type Status =
  | "active"
  | "pending"
  | "completed"
  | "in-progress"
  | "paid"
  | "overdue"
  | "cancelled"
  | "draft"
  | "inactive";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<
  Status,
  {
    label: string;
    className: string;
  }
> = {
  active: {
    label: "Active",
    className: "bg-clientdesk-mint text-black",
  },

  pending: {
    label: "Pending",
    className: "bg-clientdesk-light text-black",
  },

  completed: {
    label: "Completed",
    className: "bg-clientdesk-mint text-black",
  },

  "in-progress": {
    label: "In Progress",
    className: "bg-clientdesk-light text-black",
  },

  paid: {
    label: "Paid",
    className: "bg-clientdesk-mint text-black",
  },

  overdue: {
    label: "Overdue",
    className: "bg-clientdesk-red text-white",
  },

  cancelled: {
    label: "Cancelled",
    className: "bg-clientdesk-red text-white",
  },

  draft: {
    label: "Draft",
    className: "border border-clientdesk-light bg-transparent text-clientdesk-gray",
  },

  inactive: {
    label: "Inactive",
    className: "bg-clientdesk-light text-clientdesk-gray",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}
