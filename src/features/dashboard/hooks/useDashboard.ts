import { useQuery } from "@tanstack/react-query";

import {
  getDashboardSummary,
  getDashboardRevenue,
  getTopClients,
  getMostRequestedServices,
} from "../api/dashboardApi";

export function useDashboard() {
  const summaryQuery = useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: getDashboardSummary,
  });

  const revenueQuery = useQuery({
    queryKey: ["dashboard", "revenue"],
    queryFn: getDashboardRevenue,
  });

  const topClientsQuery = useQuery({
    queryKey: ["dashboard", "top-clients"],
    queryFn: getTopClients,
  });

  const servicesQuery = useQuery({
    queryKey: ["dashboard", "services"],
    queryFn: getMostRequestedServices,
  });

  return {
    summary: summaryQuery.data,
    revenue: revenueQuery.data ?? [],
    topClients: topClientsQuery.data ?? [],
    services: servicesQuery.data ?? [],

    isLoading:
      summaryQuery.isLoading ||
      revenueQuery.isLoading ||
      topClientsQuery.isLoading ||
      servicesQuery.isLoading,

    isError:
      summaryQuery.isError ||
      revenueQuery.isError ||
      topClientsQuery.isError ||
      servicesQuery.isError,
  };
}