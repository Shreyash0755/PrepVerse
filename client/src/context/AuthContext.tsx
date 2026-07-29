import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "@/api/authApi";
import { registerUnauthorizedHandler, tokenStorage } from "@/api/axios";
import type { LoginPayload, RegisterPayload } from "@/types/auth";

interface AuthContextValue {
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!tokenStorage.get()
  );
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // JWT persistence: authentication survives a refresh because we source
    // the initial state directly from storage above.
    setIsInitializing(false);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    registerUnauthorizedHandler(() => {
      setIsAuthenticated(false);
      toast.error("Your session has expired. Please sign in again.");
      navigate("/login", { replace: true });
    });
  }, [navigate]);

  const login = useCallback(async (payload: LoginPayload) => {
    const { data } = await authApi.login(payload);
    tokenStorage.set(data.token);
    setIsAuthenticated(true);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    await authApi.register(payload);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, isInitializing, login, register, logout }),
    [isAuthenticated, isInitializing, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
