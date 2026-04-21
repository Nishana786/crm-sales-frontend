import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* 🔹 USER TYPE */
type User = {
  id: string;
  role: "admin" | "user";
  name?: string;
  email?: string;
};

/* 🔹 CONTEXT TYPE */
type AuthType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (u: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthType | null>(null);

/* 🔥 PROVIDER */
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* 🔥 INIT LOAD */
  useEffect(() => {
    const init = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        const tokenData = await AsyncStorage.getItem("token");

        if (userData && tokenData) {
          setUser(JSON.parse(userData));
          setToken(tokenData);
        }
      } catch (e) {
        console.log("Init error:", e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  /* 🔥 LOGIN */
  const login = async (u: User, t: string) => {
    setUser(u);
    setToken(t);

    await AsyncStorage.setItem("user", JSON.stringify(u));
    await AsyncStorage.setItem("token", t);
  };

  /* 🔥 LOGOUT */
  const logout = async () => {
    setUser(null);
    setToken(null);

    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* 🔹 HOOK */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext error");
  return ctx;
};