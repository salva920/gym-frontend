import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !isTokenExpired(token)) {
      setAuthToken(token);
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      handleLogout();
    }
  }, []);

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const handleLogout = () => {
    setAuthToken('');
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login';
  };

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = authToken;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

    // Configurar interceptores de Axios para manejar errores de autenticación
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
