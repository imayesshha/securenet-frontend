// context/AuthContext.jsx — manages login state across the whole app
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      return { user: JSON.parse(storedUser), token: storedToken };
    }
    return { user: null, token: null };
  });

  const login = (userData, tokenData) => {
    const newAuth = { user: userData, token: tokenData };
    setAuth(newAuth);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const { user, token } = auth;

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);