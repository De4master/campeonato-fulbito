// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 👇 usamos la misma clave que se usó al guardar el token
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));

  const login = (newToken) => {
    localStorage.setItem('access_token', newToken); // 🔐 Guardamos el token
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('access_token'); // ❌ Eliminamos el token al cerrar sesión
    setToken(null);
  };

  const isAuthenticated = !!token; // ✅ Booleano útil para proteger vistas

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
