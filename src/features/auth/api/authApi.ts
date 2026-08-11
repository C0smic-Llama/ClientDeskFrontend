import api from "@/lib/axios";

import type {
  LoginRequest,
  LoginResponse,
} from "../types/auth.types";

export async function authenticate(
  credentials: LoginRequest,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    credentials,
  );

  return response.data;
}