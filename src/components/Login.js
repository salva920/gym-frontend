import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', credentials);
      if (res.data.auth) {
        setAuth(res.data.token);
        localStorage.setItem('authToken', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        toast.success('Inicio de sesión exitoso');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4">Iniciar Sesión</Typography>
      <TextField
        label="Usuario"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Iniciar Sesión
      </Button>
    </Box>
  );
};

export default Login;
