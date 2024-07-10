import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { decode as jwtDecode } from 'jwt-decode'; // Uso correcto de la importación nombrada

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken); // Uso correcto
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        setUser(decodedToken);
      } catch (error) {
        console.error("Error decodificando el token:", error);
        setAuthToken(null);
        localStorage.removeItem('authToken'); // Elimina el token si no es válido
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
