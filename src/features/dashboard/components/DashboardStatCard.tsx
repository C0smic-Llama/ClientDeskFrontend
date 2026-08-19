import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  href?: string;
}

export default function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  href,
}: DashboardStatCardProps) {
  const content = (
    <CardContent className="flex items-center justify-between p-6">
      <div>
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <p className="mt-2 text-2xl font-semibold">
          {value}
        </p>

        {description && (
          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div className="rounded-lg bg-muted p-3">
        <Icon className="size-5" />
      </div>
    </CardContent>
  );

  if (href) {
    return (
      <Link
        to={href}
        className="block transition-transform hover:-translate-y-0.5"
      >
        <Card className="transition-shadow hover:shadow-md">
          {content}
        </Card>
      </Link>
    );
  }

  return <Card>{content}</Card>;
}