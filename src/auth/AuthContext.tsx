import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./authContextHook";
import type { User } from "../types";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("tk unsub", user);
      if (user) {
        setUser({
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
