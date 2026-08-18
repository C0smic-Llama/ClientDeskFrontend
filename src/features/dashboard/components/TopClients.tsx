import type { DashboardRanking } from "../types/dashboard.types";

interface TopClientsProps {
  clients: DashboardRanking[];
}

export default function TopClients({
  clients,
}: TopClientsProps) {
  const formatCurrency = (value: number) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  if (clients.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No client revenue data available.
        </p>
      </div>
    );
  }

  const maxValue = Math.max(
    ...clients.map((client) => client.value)
  );

  return (
    <div className="space-y-5">
      {clients.map((client, index) => {
        const percentage =
          maxValue > 0
            ? (client.value / maxValue) * 100
            : 0;

        return (
          <div key={client.id} className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="w-6 text-sm font-medium text-muted-foreground">
                  #{index + 1}
                </span>

                <span className="truncate font-medium">
                  {client.name}
                </span>
              </div>

              <span className="shrink-0 text-sm font-medium">
                {formatCurrency(client.value)}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}