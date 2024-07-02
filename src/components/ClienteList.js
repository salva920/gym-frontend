import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FacturaPDF from './FacturaPDF';
import ReactPaginate from 'react-paginate';
import './ClienteList.css';

const ClienteList = ({
  clientes,
  marcarComoSolvente,
  eliminarCliente,
  editarCliente,
  toggleFormulario,
  handleHourFilter,
  countByHour
}) => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [filtro, setFiltro] = useState('todos');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleClose = () => setClienteSeleccionado(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLocalHourFilter = (hora) => {
    setHoraSeleccionada(hora);
    handleHourFilter(hora);
    handleMenuClose();
  };

  // Ordenar clientes por fecha de registro en orden descendente
  const clientesOrdenados = [...clientes].sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));

  const clientesFiltrados = clientesOrdenados.filter((cliente) => {
    if (filtro === 'pendiente') {
      return cliente.estado_pago === 'Pendiente';
    } else if (filtro === 'completado') {
      return cliente.estado_pago === 'Pagado';
    } else {
      return true;
    }
  }).filter((cliente) => {
    return horaSeleccionada ? cliente.horario === horaSeleccionada : true;
  });

  const horasDisponibles = [
    '6am', '7am', '8am', '9am', '10am', '11am',
    '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'
  ];

  const calcularEdad = (fecha_nacimiento) => {
    return moment().diff(fecha_nacimiento, 'years');
  };

  // Configuración de paginación
  const itemsPerPage = 5;
  const pageCount = Math.ceil(clientesFiltrados.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = clientesFiltrados.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Lista de Clientes ({moment().format('MMMM')})</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleFormulario}
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
        >
          Agregar Cliente
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'flex-start',
          mb: 2,
          gap: 1,
        }}
      >
        <Button
          variant={filtro === 'todos' ? 'contained' : 'outlined'}
          onClick={() => setFiltro('todos')}
          sx={{ backgroundColor: filtro === 'todos' ? '#28a745' : undefined, color: filtro === 'todos' ? '#fff' : undefined }}
        >
          Todos
        </Button>
        <Button
          variant={filtro === 'pendiente' ? 'contained' : 'outlined'}
          onClick={() => setFiltro('pendiente')}
          sx={{ backgroundColor: filtro === 'pendiente' ? '#ffc107' : undefined, color: filtro === 'pendiente' ? '#fff' : undefined }}
        >
          Pendiente
        </Button>
        <Button
          variant={filtro === 'completado' ? 'contained' : 'outlined'}
          onClick={() => setFiltro('completado')}
          sx={{ backgroundColor: filtro === 'completado' ? '#007bff' : undefined, color: filtro === 'completado' ? '#fff' : undefined }}
        >
          Completado
        </Button>
        <Button variant="outlined" onClick={handleMenuClick}>
          Filtrar por Hora
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleLocalHourFilter('')}>Todos</MenuItem>
          {horasDisponibles.map(hora => (
            <MenuItem key={hora} onClick={() => handleLocalHourFilter(hora)}>
              {hora} ({countByHour(hora)})
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <TableContainer component={Paper} className="tableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Estado de Pago</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((cliente) => (
              <TableRow key={cliente._id} onClick={() => setClienteSeleccionado(cliente)} className="tableRow">
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.cedula}</TableCell>
                <TableCell>{cliente.telefono}</TableCell>
                <TableCell>{calcularEdad(cliente.fecha_nacimiento)} años</TableCell>
                <TableCell>{cliente.horario}</TableCell>
                <TableCell>{cliente.estado_pago}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); editarCliente(cliente); }} sx={{ mr: 1 }}>
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color={cliente.estado_pago === 'Pagado' ? 'success' : 'warning'}
                    onClick={(e) => { e.stopPropagation(); marcarComoSolvente(cliente._id); }}
                    sx={{ mr: 1 }}
                  >
                    {cliente.estado_pago === 'Pagado' ? 'Solvente' : 'Solventar'}
                  </Button>
                  <Button variant="contained" color="error" onClick={(e) => { e.stopPropagation(); eliminarCliente(cliente._id); }}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Siguiente'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <Modal open={!!clienteSeleccionado} onClose={handleClose}>
        <Box className="modalBox">
          <Box className="modalHeader">
            <Typography variant="h6">Detalles del Cliente</Typography>
            <IconButton className="closeButton" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {clienteSeleccionado && (
            <Box className="modalContent">
              <Typography variant="body1"><strong>Nombre:</strong> {clienteSeleccionado.nombre}</Typography>
              <Typography variant="body1"><strong>Cédula:</strong> {clienteSeleccionado.cedula}</Typography>
              <Typography variant="body1"><strong>Teléfono:</strong> {clienteSeleccionado.telefono}</Typography>
              <Typography variant="body1"><strong>Correo:</strong> {clienteSeleccionado.correo}</Typography>
              <Typography variant="body1"><strong>Dirección:</strong> {clienteSeleccionado.direccion}</Typography>
              <Typography variant="body1"><strong>Fecha de Nacimiento:</strong> {moment(clienteSeleccionado.fecha_nacimiento).format('DD/MM/YYYY')}</Typography>
              <Typography variant="body1"><strong>Edad:</strong> {calcularEdad(clienteSeleccionado.fecha_nacimiento)} años</Typography>
              <Typography variant="body1"><strong>Sexo:</strong> {clienteSeleccionado.sexo}</Typography>
              <Typography variant="body1"><strong>Peso:</strong> {clienteSeleccionado.peso}</Typography>
              <Typography variant="body1"><strong>Horario:</strong> {clienteSeleccionado.horario}</Typography>
              <Typography variant="body1"><strong>Historial Médico:</strong> {clienteSeleccionado.historial_medico}</Typography>
              <Typography variant="body1"><strong>Tipo de Entrenamiento:</strong> {clienteSeleccionado.tipo_entrenamiento}</Typography>
              <Typography variant="body1"><strong>Fecha de Inicio:</strong> {moment(clienteSeleccionado.fecha_inicio).format('DD/MM/YYYY')}</Typography>
              <Typography variant="body1"><strong>Tipo de Membresía:</strong> {clienteSeleccionado.tipo_membresia}</Typography>
              <Typography variant="body1"><strong>Estado de Pago:</strong> {clienteSeleccionado.estado_pago}</Typography>
              <Typography variant="body1"><strong>Notas:</strong> {clienteSeleccionado.notas}</Typography>
              <PDFDownloadLink
                document={<FacturaPDF cliente={clienteSeleccionado} />}
                fileName={`Factura_${clienteSeleccionado.nombre}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Generando PDF...' : 'Descargar Factura'
                }
              </PDFDownloadLink>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ClienteList;
