"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "./types";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, accessToken: string, remember: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (
    loggedInUser: User,
    accessToken: string,
    remember: boolean,
  ) => {
    setUser(loggedInUser);

    if (remember) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("accessToken", accessToken);
    } else {
      sessionStorage.setItem("user", JSON.stringify(loggedInUser));
      sessionStorage.setItem("accessToken", accessToken);
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
