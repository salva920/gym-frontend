import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, credentials);
      if (res.data.auth) {
        setAuth(true);
        localStorage.setItem('token', res.data.token);
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Error logging in');
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
