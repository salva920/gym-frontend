import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import './Dashboard.css';

const Dashboard = ({ clientes }) => {
  const totalClientes = clientes.length;
  const clientesPendientes = clientes.filter(cliente => cliente.estado_pago === 'Pendiente').length;
  const clientesPagados = clientes.filter(cliente => cliente.estado_pago === 'Pagado').length;

  return (
    <Box className="dashboard">
      <Box className="card-container-dashboard">
        <Card className="card-dashboard">
          <CardContent>
            <Typography variant="h6">Total Clientes</Typography>
            <Typography variant="h4">{totalClientes}</Typography>
          </CardContent>
        </Card>
        <Card className="card-dashboard">
          <CardContent>
            <Typography variant="h6">Clientes con Pago Pendiente</Typography>
            <Typography variant="h4">{clientesPendientes}</Typography>
          </CardContent>
        </Card>
        <Card className="card-dashboard">
          <CardContent>
            <Typography variant="h6">Clientes con Pago Completo</Typography>
            <Typography variant="h4">{clientesPagados}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
