import type { ProjectStatus } from "../types/project.types";

interface ProjectSearchProps {
  search: string;
  status?: ProjectStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (value?: ProjectStatus) => void;
}

const statuses: {
  value: ProjectStatus;
  label: string;
}[] = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

export function ProjectSearch({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ProjectSearchProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search projects..."
          className="w-full rounded-md border border-clientdesk-light bg-white px-4 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
        />
      </div>

      {/* Status */}
      <select
        value={status ?? ""}
        onChange={(event) => {
          const value = event.target.value;

          onStatusChange(
            value
              ? (value as ProjectStatus)
              : undefined,
          );
        }}
        className="rounded-md border border-clientdesk-light bg-white px-4 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
      >
        <option value="">All Statuses</option>

        {statuses.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}