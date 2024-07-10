import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      setUser({ username: 'admin' }); // Asumiendo que el usuario es admin para simplificar
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
