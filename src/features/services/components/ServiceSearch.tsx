import type { ServiceCategory } from "../types/service.types";

interface ServiceSearchProps {
  search: string;
  category?: ServiceCategory;
  active?: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value?: ServiceCategory) => void;
  onActiveChange: (value?: boolean) => void;
}

const categories: {
  value: ServiceCategory;
  label: string;
}[] = [
  { value: "PRODUCTION", label: "Production" },
  { value: "EDITING", label: "Editing" },
  { value: "DESIGN", label: "Design" },
  { value: "BRANDING", label: "Branding" },
  { value: "DIGITAL_MARKETING", label: "Digital Marketing" },
  { value: "WEB_DEVELOPMENT", label: "Web Development" },
  { value: "PHOTOGRAPHY", label: "Photography" },
  { value: "CONTENT_WRITING", label: "Content Writing" },
  { value: "OTHER", label: "Other" },
];

export function ServiceSearch({
  search,
  category,
  active,
  onSearchChange,
  onCategoryChange,
  onActiveChange,
}: ServiceSearchProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search services..."
          className="w-full rounded-md border border-clientdesk-light bg-white px-4 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
        />
      </div>

      {/* Category */}
      <select
        value={category ?? ""}
        onChange={(event) =>
          onCategoryChange(
            event.target.value
              ? (event.target.value as ServiceCategory)
              : undefined,
          )
        }
        className="rounded-md border border-clientdesk-light bg-white px-4 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
      >
        <option value="">All Categories</option>

        {categories.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        value={active === undefined ? "" : active ? "ACTIVE" : "INACTIVE"}
        onChange={(event) => {
          const value = event.target.value;

          if (value === "") {
            onActiveChange(undefined);
          } else {
            onActiveChange(value === "ACTIVE");
          }
        }}
        className="rounded-md border border-clientdesk-light bg-white px-4 py-2 text-sm outline-none transition focus:border-clientdesk-gray focus:ring-1 focus:ring-clientdesk-gray"
      >
        <option value="">All Statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </div>
  );
}
