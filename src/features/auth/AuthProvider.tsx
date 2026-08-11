import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  clearAuth,
  getToken,
  getUser,
  setAuth,
} from "./authStorage";

import type { User } from "./types/auth.types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();

    setToken(storedToken);
    setUser(storedUser);

    setIsLoading(false);
  }, []);

  const login = useCallback(
    (newToken: string, newUser: User) => {
      setAuth(newToken, newUser);

      setToken(newToken);
      setUser(newUser);
    },
    [],
  );

  const logout = useCallback(() => {
    clearAuth();

    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      isLoading,
      login,
      logout,
    }),
    [
      user,
      token,
      isLoading,
      login,
      logout,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}