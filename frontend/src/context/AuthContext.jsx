import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeUser = (u) => {
    if (!u) return null;
    return { ...u, id: u.id || u._id };
  };

  // Restore session PER TAB
  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      const rawUser = sessionStorage.getItem("user");

      if (token && rawUser) {
        const parsedUser = normalizeUser(JSON.parse(rawUser));
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        setUser(parsedUser);
      }
    } catch {
      sessionStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    const res = await api.post("/users/login", { email, password });
    const normalizedUser = normalizeUser(res.data.user);

    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("user", JSON.stringify(normalizedUser));

    api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
    setUser(normalizedUser);
  };

  const logout = () => {
    sessionStorage.clear();
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
