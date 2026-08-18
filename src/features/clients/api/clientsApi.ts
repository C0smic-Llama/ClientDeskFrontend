import api from "@/lib/axios";

import type {
  Client,
  ClientPage,
  ClientRequest,
  ClientStatus,
} from "../types/client.types";

/**
 * Create a new client
 */
export async function createClient(
  data: ClientRequest,
): Promise<Client> {
  const response = await api.post<Client>(
    "/clients",
    data,
  );

  return response.data;
}

/**
 * Get a client by ID
 */
export async function getClientById(
  clientId: number,
): Promise<Client> {
  const response = await api.get<Client>(
    `/clients/${clientId}`,
  );

  return response.data;
}

/**
 * Get paginated clients
 */
export async function getClients(
  page = 0,
  size = 10,
  sort = "companyName,asc",
): Promise<ClientPage> {
  const response = await api.get<ClientPage>(
    "/clients",
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
 * Update an existing client
 */
export async function updateClient(
  clientId: number,
  data: ClientRequest,
): Promise<Client> {
  const response = await api.put<Client>(
    `/clients/${clientId}`,
    data,
  );

  return response.data;
}

/**
 * Delete a client
 */
export async function deleteClient(
  clientId: number,
): Promise<void> {
  await api.delete(`/clients/${clientId}`);
}

/**
 * Search clients
 */
export async function searchClients(
  keyword: string,
  page = 0,
  size = 10,
  sort = "companyName,asc",
): Promise<ClientPage> {
  const response = await api.get<ClientPage>(
    "/clients/search",
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
 * Get clients by status
 */
export async function getClientsByStatus(
  status: ClientStatus,
  page = 0,
  size = 10,
  sort = "companyName,asc",
): Promise<ClientPage> {
  const response = await api.get<ClientPage>(
    `/clients/status/${status}`,
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