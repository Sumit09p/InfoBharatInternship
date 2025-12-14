import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Normalize user (VERY IMPORTANT)
  const normalizeUser = (u) => {
    if (!u) return null;
    return {
      ...u,
      id: u.id || u._id, // ✅ ENSURE id ALWAYS EXISTS
    };
  };

  // 🔄 Restore session on refresh
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const rawUser = localStorage.getItem("user");

      if (token && rawUser && rawUser !== "undefined") {
        const parsedUser = normalizeUser(JSON.parse(rawUser));

        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        setUser(parsedUser);
      } else {
        localStorage.clear();
      }
    } catch (err) {
      console.error("Auth restore failed", err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔐 LOGIN
  const login = async ({ email, password }) => {
    const res = await api.post("/users/login", { email, password });

    const normalizedUser = normalizeUser(res.data.user);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
    setUser(normalizedUser);

    return normalizedUser;
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  // 👤 UPDATE USER (profile/avatar)
  const saveUser = (updatedUser) => {
    const normalized = normalizeUser(updatedUser);
    setUser(normalized);
    localStorage.setItem("user", JSON.stringify(normalized));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        saveUser,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
