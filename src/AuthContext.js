import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { decode as jwtDecode } from 'jwt-decode'; // Cambia esto para que importe correctamente

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      const decodedToken = jwtDecode(authToken);
      setUser(decodedToken);
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
