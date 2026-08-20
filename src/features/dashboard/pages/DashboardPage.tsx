import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FolderKanban,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DashboardStatCard from "../components/DashboardStatCard";
import { useDashboard } from "../hooks/useDashboard";
import RevenueChart from "../components/RevenueChart";
import TopClients from "../components/TopClients";
import MostRequestedServices from "../components/MostRequestedServices";
import InvoiceStatusChart from "../components/InvoiceStatusChart";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { summary, revenue, topClients, services, isLoading, isError } =
    useDashboard();

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-xl" />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-[380px] rounded-xl" />
          <Skeleton className="h-[380px] rounded-xl" />
        </div>

        <Skeleton className="h-[350px] rounded-xl" />
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="p-6">
        <p className="text-red-500">Failed to load dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <p className="text-sm text-muted-foreground">
          Overview of your agency's performance
        </p>
      </div>

      {/* Main Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          title="Total Clients"
          value={summary.totalClients}
          icon={Users}
          href="/clients"
        />

        <DashboardStatCard
          title="Total Projects"
          value={summary.totalProjects}
          icon={FolderKanban}
          href="/projects"
        />

        <DashboardStatCard
          title="Total Revenue"
          value={formatCurrency(summary.totalRevenue)}
          icon={CircleDollarSign}
        />

        <DashboardStatCard
          title="Outstanding Amount"
          value={formatCurrency(summary.outstandingAmount)}
          icon={Clock3}
        />
      </div>

      {/* Project Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardStatCard
          title="Active Projects"
          value={summary.activeProjects}
          icon={BriefcaseBusiness}
          href="/projects"
        />

        <DashboardStatCard
          title="Completed Projects"
          value={summary.completedProjects}
          icon={CheckCircle2}
          href="/projects"
        />
      </div>
      {/* Revenue + Rankings */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <RevenueChart data={revenue} />
          </CardContent>
        </Card>
        {/* Top Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Top Clients</CardTitle>
          </CardHeader>

          <CardContent>
            <TopClients clients={topClients} />
          </CardContent>
        </Card>
      </div>

      {/* Invoice Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <InvoiceStatusChart
            paid={summary.paidInvoices}
            partiallyPaid={summary.partiallyPaidInvoices}
            overdue={summary.overdueInvoices}
          />
        </CardContent>
      </Card>

      {/* Most Requested Services */}
      <Card>
        <CardHeader>
          <CardTitle>Most Requested Services</CardTitle>
        </CardHeader>

        <CardContent>
          <MostRequestedServices services={services} />
        </CardContent>
      </Card>
    </div>
  );
}
