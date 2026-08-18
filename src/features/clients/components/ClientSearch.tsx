import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { ClientStatus } from "../types/client.types";

interface ClientSearchProps {
  search: string;
  status?: ClientStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (status?: ClientStatus) => void;
}

export function ClientSearch({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ClientSearchProps) {
  const hasFilters = search.trim() !== "" || !!status;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-clientdesk-gray" />

        <Input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search clients..."
          className="pl-9"
        />
      </div>

      {/* Status */}
      <select
        value={status ?? ""}
        onChange={(event) => {
          const value = event.target.value;

          onStatusChange(
            value === ""
              ? undefined
              : (value as ClientStatus),
          );
        }}
        className="h-10 rounded-md border border-clientdesk-light bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-clientdesk-red/20"
      >
        <option value="">All statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>

      {/* Clear */}
      {hasFilters && (
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            onSearchChange("");
            onStatusChange(undefined);
          }}
        >
          <X className="mr-2 size-4" />
          Clear
        </Button>
      )}
    </div>
  );
}