import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface InvoiceStatusChartProps {
  paid: number;
  partiallyPaid: number;
  overdue: number;
}

export default function InvoiceStatusChart({
  paid,
  partiallyPaid,
  overdue,
}: InvoiceStatusChartProps) {
  const data = [
    {
      name: "Paid",
      value: paid,
    },
    {
      name: "Partially Paid",
      value: partiallyPaid,
    },
    {
      name: "Overdue",
      value: overdue,
    },
  ];

  const total = paid + partiallyPaid + overdue;

  if (total === 0) {
    return (
      <div className="flex h-[260px] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No invoice data available.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row">
      <div className="h-[240px] w-full md:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full space-y-4 md:w-1/2">
        {data.map((item) => {
          const percentage =
            total > 0
              ? Math.round((item.value / total) * 100)
              : 0;

          return (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium">
                  {item.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {percentage}% of invoices
                </p>
              </div>

              <span className="text-lg font-semibold">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}