import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // persist token & user to localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // convenience: headers with auth
  const authHeaders = () => (token ? { Authorization: `Bearer ${token}` } : {});

  // fetch items for current user
  const fetchItems = async () => {
    if (!token) {
      setItems([]);
      return;
    }
    setLoadingItems(true);
    try {
      const res = await fetch("http://localhost:5001/api/items", {
        headers: {
          ...authHeaders(),
        },
      });
      if (!res.ok) {
        // If unauthorized, clear token/user
        if (res.status === 401 || res.status === 403) {
          setToken(null);
          setUser(null);
        }
        throw new Error("Failed to fetch items");
      }
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchItems error:", err);
    } finally {
      setLoadingItems(false);
    }
  };

  // auto-fetch items when token becomes available
  useEffect(() => {
    if (token) {
      fetchItems();
    } else {
      setItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = {
    user,
    setUser,
    token,
    setToken,
    items,
    setItems,
    loadingItems,
    fetchItems,
    authHeaders,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}