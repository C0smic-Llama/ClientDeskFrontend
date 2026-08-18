export interface DashboardSummary {
  totalClients: number;

  totalProjects: number;
  activeProjects: number;
  completedProjects: number;

  totalRevenue: number;
  outstandingAmount: number;
  totalPaymentsReceived: number;

  paidInvoices: number;
  partiallyPaidInvoices: number;
  overdueInvoices: number;
}

export interface DashboardRevenue {
  period: string;
  revenue: number;
}

export interface DashboardRanking {
  id: number;
  name: string;
  value: number;
}