import React, { useState, createContext, useContext, useEffect } from "react";

export const AuthContext = createContext({
  authUser: false,
  setAuthUser: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

export default function AuthProvider({ children }) {
  const PROTECT_API = import.meta.env.VITE_PROTECT_API;

  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    fetch(PROTECT_API, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setAuthUser(true); // or user object if backend sends it
        } else {
          setAuthUser(false);
        }
      })
      .catch(() => setAuthUser(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  // const [authUser, setAuthUser] = useState(false)
  // const initialAuthUser = localStorage.getItem("user");
  // const [authUser, setAuthUser] = useState(initialAuthUser? JSON.parse(initialAuthUser) : undefined)

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, isLogin, setIsLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
