import React, { createContext, useContext, useState, useEffect } from 'react';

// Estructura de usuario
const defaultUser = {
  Id: null,
  Nombre: '',
  Email: '',
  Rol: false,
};

const UserContext = createContext();

// Función segura para parsear usuario desde localStorage
function safeParseUser(storedUser) {
  if (!storedUser || storedUser === 'undefined') return defaultUser;
  try {
    const parsed = JSON.parse(storedUser);
    if (typeof parsed === 'object' && parsed !== null && 'Id' in parsed) {
      return parsed;
    }
    return defaultUser;
  } catch {
    return defaultUser;
  }
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return safeParseUser(storedUser);
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  const isLoggedIn = !!token && !!user?.Id;

  const isAdmin = !!user?.Rol;

  // Login: guarda usuario y token
  const login = (userData, token) => {
    if (!userData || !token) {
      console.error('Login inválido: faltan datos de usuario o token');
      return;
    }
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  // Logout: limpia usuario y token
  const logout = () => {
    setUser(defaultUser);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Si cambia el usuario o token, actualiza localStorage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    }
  }, [user, token, isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, token, isLoggedIn, isAdmin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acceder al contexto
export const useUser = () => useContext(UserContext);
// Hook para cerrar sesión desde cualquier componente
export const useLogout = () => {
  const { logout } = useUser();
  return logout;
};
