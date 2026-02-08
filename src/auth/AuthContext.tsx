import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./authContextHook";
import type { User } from "../types";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
        getToken(user);
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

  const getToken = async (user: FirebaseUser) => {
    const token = await user.getIdToken();
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ user, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
