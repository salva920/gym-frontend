import React from 'react';
import { Box, TextField, Button, Modal, Card, CardContent, MenuItem, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import './FormStyles.css';

const AgregarClienteForm = ({ open, handleClose, nuevoCliente, setNuevoCliente, agregarCliente }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarCliente(e);
  };

  const horasDisponiblesManana = ['6am', '7am', '8am', '9am', '10am', '11am'];
  const horasDisponiblesTarde = ['3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modalBox-agregar-cliente">
        <Card>
          <Box className="modalHeader-agregar-cliente">
            <Typography variant="h6" component="h2" className="form-title">
              <FitnessCenterIcon />
              Agregar Cliente
            </Typography>
            <IconButton className="closeButton-agregar-cliente" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <CardContent>
            <form onSubmit={handleSubmit} className="form-grid-agregar-cliente">
              <Box className="form-row-agregar-cliente">
                <TextField
                  label="Nombre"
                  name="nombre"
                  value={nuevoCliente.nombre}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Cédula"
                  name="cedula"
                  value={nuevoCliente.cedula}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Box className="form-row-agregar-cliente">
                <TextField
                  label="Teléfono"
                  name="telefono"
                  value={nuevoCliente.telefono}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Correo"
                  name="correo"
                  value={nuevoCliente.correo}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Box className="form-row-agregar-cliente">
                <TextField
                  label="Dirección"
                  name="direccion"
                  value={nuevoCliente.direccion}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Fecha de Nacimiento"
                  type="date"
                  name="fecha_nacimiento"
                  value={nuevoCliente.fecha_nacimiento}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Box className="form-row-agregar-cliente">
                <TextField
                  label="Sexo"
                  select
                  name="sexo"
                  value={nuevoCliente.sexo}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                </TextField>
                <TextField
                  label="Peso"
                  name="peso"
                  value={nuevoCliente.peso}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Box className="form-row-agregar-cliente">
                <TextField
                  label="Horario"
                  select
                  name="horario"
                  value={nuevoCliente.horario}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem disabled>-- Mañana --</MenuItem>
                  {horasDisponiblesManana.map(hora => (
                    <MenuItem key={hora} value={hora}>{hora}</MenuItem>
                  ))}
                  <MenuItem disabled>-- Tarde --</MenuItem>
                  {horasDisponiblesTarde.map(hora => (
                    <MenuItem key={hora} value={hora}>{hora}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Historial Médico"
                  name="historial_medico"
                  value={nuevoCliente.historial_medico}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Box className="form-row-agregar-cliente">
                <TextField
                  label="Tipo de Entrenamiento"
                  select
                  name="tipo_entrenamiento"
                  value={nuevoCliente.tipo_entrenamiento}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Personalizado">Personalizado</MenuItem>
                </TextField>
                <TextField
                  label="Fecha de Inicio"
                  type="date"
                  name="fecha_inicio"
                  value={nuevoCliente.fecha_inicio}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Box className="form-row-agregar-cliente">
                <TextField
                  label="Tipo de Membresía"
                  select
                  name="tipo_membresia"
                  value={nuevoCliente.tipo_membresia}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="Mensual">Mensual</MenuItem>
                  <MenuItem value="Trimestral">Trimestral</MenuItem>
                  <MenuItem value="Anual">Anual</MenuItem>
                </TextField>
                <TextField
                  label="Notas"
                  name="notas"
                  value={nuevoCliente.notas}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Box>
              <Box className="form-actions-agregar-cliente">
                <Button onClick={handleClose} color="secondary" variant="contained" className="form-button">Cancelar</Button>
                <Button type="submit" variant="contained" color="primary" className="form-button">Guardar Cliente</Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default AgregarClienteForm;
