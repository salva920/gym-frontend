import React, { useState } from 'react';
import { Box, TextField, Button, Modal, Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import './FormStyles.css';

const EditarClienteForm = ({ open, handleClose, clienteEditando, setClienteEditando, editarCliente }) => {
  const [errors, setErrors] = useState({});

  if (!clienteEditando) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteEditando(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.nombre = clienteEditando.nombre ? "" : "Este campo es requerido.";
    tempErrors.cedula = clienteEditando.cedula ? "" : "Este campo es requerido.";
    tempErrors.telefono = clienteEditando.telefono ? "" : "Este campo es requerido.";
    tempErrors.correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clienteEditando.correo) ? "" : "Correo no válido.";
    tempErrors.direccion = clienteEditando.direccion ? "" : "Este campo es requerido.";
    tempErrors.fecha_nacimiento = clienteEditando.fecha_nacimiento ? "" : "Este campo es requerido.";
    tempErrors.peso = clienteEditando.peso ? "" : "Este campo es requerido.";
    tempErrors.historial_medico = clienteEditando.historial_medico ? "" : "Este campo es requerido.";
    tempErrors.fecha_inicio = clienteEditando.fecha_inicio ? "" : "Este campo es requerido.";
    tempErrors.notas = clienteEditando.notas ? "" : "Este campo es requerido.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      editarCliente(clienteEditando);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modalBox-editar-cliente">
        <Card>
          <Box className="modalHeader-editar-cliente">
            <Typography variant="h6" component="h2" className="form-title-editar-cliente">
              <FitnessCenterIcon />
              Editar Cliente
            </Typography>
            <IconButton className="closeButton-editar-cliente" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <CardContent>
            <form onSubmit={handleSubmit} className="form-grid-editar-cliente">
              <Box className="form-row-editar-cliente">
                <TextField
                  label="Nombre"
                  name="nombre"
                  value={clienteEditando.nombre}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                />
                <TextField
                  label="Cédula"
                  name="cedula"
                  value={clienteEditando.cedula}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.cedula}
                  helperText={errors.cedula}
                />
              </Box>
              <Box className="form-row-editar-cliente">
                <TextField
                  label="Teléfono"
                  name="telefono"
                  value={clienteEditando.telefono}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.telefono}
                  helperText={errors.telefono}
                />
                <TextField
                  label="Correo"
                  name="correo"
                  value={clienteEditando.correo}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.correo}
                  helperText={errors.correo}
                />
              </Box>
              <Box className="form-row-editar-cliente">
                <TextField
                  label="Dirección"
                  name="direccion"
                  value={clienteEditando.direccion}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.direccion}
                  helperText={errors.direccion}
                />
                <TextField
                  label="Fecha de Nacimiento"
                  type="date"
                  name="fecha_nacimiento"
                  value={clienteEditando.fecha_nacimiento}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  error={!!errors.fecha_nacimiento}
                  helperText={errors.fecha_nacimiento}
                />
              </Box>
              <Box className="form-row-editar-cliente">
                <TextField
                  label="Sexo"
                  name="sexo"
                  value={clienteEditando.sexo}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Box className="form-row-editar-cliente">
                <TextField
                  label="Peso"
                  name="peso"
                  value={clienteEditando.peso}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.peso}
                  helperText={errors.peso}
                />
              </Box>
              <Box className="form-row-editar-cliente">
                <TextField
                  label="Historial Médico"
                  name="historial_medico"
                  value={clienteEditando.historial_medico}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.historial_medico}
                  helperText={errors.historial_medico}
                />
              </Box>
              <Box className="form-row-editar-cliente">
                <TextField
                  label="Tipo de Entrenamiento"
                  name="tipo_entrenamiento"
                  value={clienteEditando.tipo_entrenamiento}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Fecha de Inicio"
                  type="date"
                  name="fecha_inicio"
                  value={clienteEditando.fecha_inicio}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                  error={!!errors.fecha_inicio}
                  helperText={errors.fecha_inicio}
                />
              </Box>
              <Box className="form-row-editar-cliente">
                <TextField
                  label="Tipo de Membresía"
                  name="tipo_membresia"
                  value={clienteEditando.tipo_membresia}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Notas"
                  name="notas"
                  value={clienteEditando.notas}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.notas}
                  helperText={errors.notas}
                />
              </Box>
              <Box className="form-actions-editar-cliente">
                <Button onClick={handleClose} color="secondary" variant="contained" className="form-button-editar-cliente">Cancelar</Button>
                <Button type="submit" variant="contained" color="primary" className="form-button-editar-cliente">Actualizar Cliente</Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default EditarClienteForm;
