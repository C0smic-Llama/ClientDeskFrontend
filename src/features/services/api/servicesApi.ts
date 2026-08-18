import api from "@/lib/axios";

import type {
  Service,
  ServicePage,
  ServiceRequest,
  ServiceCategory,
} from "../types/service.types";

/**
 * Create a new service
 */
export async function createService(
  data: ServiceRequest,
): Promise<Service> {
  const response = await api.post<Service>(
    "/services",
    data,
  );

  return response.data;
}

/**
 * Get a service by ID
 */
export async function getServiceById(
  serviceId: number,
): Promise<Service> {
  const response = await api.get<Service>(
    `/services/${serviceId}`,
  );

  return response.data;
}

/**
 * Get paginated services
 */
export async function getServices(
  page = 0,
  size = 10,
  sort = "serviceName,asc",
): Promise<ServicePage> {
  const response = await api.get<ServicePage>(
    "/services",
    {
      params: {
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}

/**
 * Update an existing service
 */
export async function updateService(
  serviceId: number,
  data: ServiceRequest,
): Promise<Service> {
  const response = await api.put<Service>(
    `/services/${serviceId}`,
    data,
  );

  return response.data;
}

/**
 * Delete a service
 */
export async function deleteService(
  serviceId: number,
): Promise<void> {
  await api.delete(`/services/${serviceId}`);
}

/**
 * Search services
 */
export async function searchServices(
  keyword: string,
  page = 0,
  size = 10,
  sort = "serviceName,asc",
): Promise<ServicePage> {
  const response = await api.get<ServicePage>(
    "/services/search",
    {
      params: {
        keyword,
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}

/**
 * Get active services
 */
export async function getActiveServices(
  page = 0,
  size = 10,
  sort = "serviceName,asc",
): Promise<ServicePage> {
  const response = await api.get<ServicePage>(
    "/services/active",
    {
      params: {
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}

/**
 * Get services by category
 */
export async function getServicesByCategory(
  category: ServiceCategory,
  page = 0,
  size = 10,
  sort = "serviceName,asc",
): Promise<ServicePage> {
  const response = await api.get<ServicePage>(
    "/services/category",
    {
      params: {
        category,
        page,
        size,
        sort,
      },
    },
  );

  return response.data;
}

/**
 * Activate a service
 */
export async function activateService(
  serviceId: number,
): Promise<Service> {
  const response = await api.patch<Service>(
    `/services/${serviceId}/activate`,
  );

  return response.data;
}

/**
 * Deactivate a service
 */
export async function deactivateService(
  serviceId: number,
): Promise<Service> {
  const response = await api.patch<Service>(
    `/services/${serviceId}/deactivate`,
  );

  return response.data;
}