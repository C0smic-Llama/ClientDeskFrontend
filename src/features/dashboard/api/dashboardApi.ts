import api from "@/lib/axios";

import type {
  DashboardSummary,
  DashboardRevenue,
  DashboardRanking,
} from "../types/dashboard.types";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await api.get<DashboardSummary>(
    "/dashboard/summary"
  );

  return response.data;
}

export async function getDashboardRevenue(): Promise<DashboardRevenue[]> {
  const response = await api.get<DashboardRevenue[]>(
    "/dashboard/revenue"
  );

  return response.data;
}

export async function getTopClients(): Promise<DashboardRanking[]> {
  const response = await api.get<DashboardRanking[]>(
    "/dashboard/top-clients"
  );

  return response.data;
}

export async function getMostRequestedServices(): Promise<
  DashboardRanking[]
> {
  const response = await api.get<DashboardRanking[]>(
    "/dashboard/services"
  );

  return response.data;
}