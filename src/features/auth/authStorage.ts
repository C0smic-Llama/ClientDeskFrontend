import type { User } from "./types/auth.types";

const TOKEN_KEY = "clientdesk_token";
const USER_KEY = "clientdesk_user";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuth(token: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user) as User;
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}