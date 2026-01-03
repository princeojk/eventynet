import { createContext, useContext } from "react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const user = useContext(AuthContext);

  if (!user) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return user;
};
