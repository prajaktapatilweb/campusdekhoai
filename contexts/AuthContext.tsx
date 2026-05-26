"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { apiFetch } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "staff";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (email: string, password: string) => Promise<User>;

  logout: () => Promise<void>;

  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  // CHECK AUTH ON PAGE LOAD
  useEffect(() => {
    if (window.location.pathname.startsWith("/dashboard")) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const data = await apiFetch<{ success: boolean; user: User }>(
        "/api/auth/me",
      );
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const login = async (email: string, password: string): Promise<User> => {
    const data = await apiFetch<{ success: boolean; user: User }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) },
    );

    setUser(data.user);

    return data.user;
  };

  // LOGOUT
  const logout = async () => {
    try {
      await apiFetch("/api/auth/logout", {
        method: "POST",
      });

      setUser(null);

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
