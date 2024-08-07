import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; // Importa el contexto de autenticación
import './Login.css';

const API_URL = '/api';

const Login = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { setAuthToken } = useContext(AuthContext); // Usa el contexto de autenticación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, credentials); // Aquí es donde usamos API_URL
      if (res.data.auth) {
        setAuth(true);
        setAuthToken(res.data.token); // Establece el token de autenticación en el contexto
        localStorage.setItem('authToken', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`; // Agregar el token a las cabeceras
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <Box className="login-container">
      <Card className="login-card">
        <CardContent>
          <div className="login-logo-container">
            <img src="/logo.png" alt="Logo" className="login-logo" />
          </div>
          <Typography variant="h5" className="login-title">Iniciar Sesión</Typography>
          <Typography variant="body2" className="subtitle">Bienvenido de nuevo, por favor ingresa tus datos</Typography>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <TextField
                label="Usuario"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div className="form-group">
              <TextField
                label="Contraseña"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth className="login-btn">
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
