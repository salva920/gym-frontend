import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AgregarClienteForm from './components/AgregarClienteForm';
import EditarClienteForm from './components/EditarClienteForm';
import ClienteList from './components/ClienteList';
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import Login from './components/Login';
import { Container, Box, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BlobProvider } from '@react-pdf/renderer';
import FacturaPDF from './components/FacturaPDF';
import { AuthContext } from './AuthContext';
import './App.css';

const API_URL = '/api';

function App() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    correo: '',
    direccion: '',
    fecha_nacimiento: '',
    sexo: 'Masculino',
    peso: '',
    horario: '6am',
    historial_medico: '',
    tipo_entrenamiento: 'General',
    fecha_inicio: '',
    tipo_membresia: 'Mensual',
    estado_pago: 'solvente',
    fechaRegistro: new Date().toISOString().split('T')[0],
    notas: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pdfCliente, setPdfCliente] = useState(null);
  const pdfLinkRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const verificarToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuth(true); // Asumiendo que un token existente es suficiente para autenticar
      }
    };

    verificarToken();
  }, []);

  useEffect(() => {
    if (auth) {
      obtenerClientes();
      verificarEstadoClientes(); // Verificar el estado de los clientes al autenticarse
    }
  }, [auth]);

  useEffect(() => {
    if (pdfCliente && pdfLinkRef.current) {
      pdfLinkRef.current.click();
    }
  }, [pdfCliente]);

  const obtenerClientes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/clientes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClientes(res.data);
      toast.success("Clientes obtenidos exitosamente");
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      toast.error("Error al obtener los clientes");
    } finally {
      setLoading(false);
    }
  };

  const verificarEstadoClientes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/clientes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const clientesPendientes = res.data.filter(cliente => cliente.estado_pago === 'Pendiente');
      if (clientesPendientes.length > 0) {
        toast.info(`Hay ${clientesPendientes.length} clientes con pagos pendientes.`);
      }
      setClientes(res.data);
    } catch (error) {
      console.error("Error al verificar el estado de los clientes:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(verificarEstadoClientes, 86400000); // Verificar una vez al día (86400000 ms = 24 horas)

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const agregarCliente = async (e) => {
    e.preventDefault();
    try {
      const clienteAEnviar = {
        ...nuevoCliente,
        fecha_nacimiento: formatDate(nuevoCliente.fecha_nacimiento),
        fecha_inicio: formatDate(nuevoCliente.fecha_inicio),
        fechaRegistro: formatDate(nuevoCliente.fechaRegistro),
      };
      await axios.post(`${API_URL}/clientes`, clienteAEnviar, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      obtenerClientes();
      setPdfCliente(clienteAEnviar);
      setNuevoCliente({
        nombre: '',
        cedula: '',
        telefono: '',
        correo: '',
        direccion: '',
        fecha_nacimiento: '',
        sexo: 'Masculino',
        peso: '',
        horario: '6am',
        historial_medico: '',
        tipo_entrenamiento: 'General',
        fecha_inicio: '',
        tipo_membresia: 'Mensual',
        estado_pago: 'solvente', // Aseguramos que el nuevo cliente se guarda como solventado
        fechaRegistro: new Date().toISOString().split('T')[0],
        notas: ''
      });
      setMostrarFormulario(false);
      toast.success("Cliente agregado exitosamente");
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
      toast.error("Error al agregar el cliente");
    }
  };

  const editarCliente = async (cliente) => {
    try {
      const clienteAEnviar = {
        ...cliente,
        fecha_nacimiento: formatDate(cliente.fecha_nacimiento),
        fecha_inicio: formatDate(cliente.fecha_inicio),
        fechaRegistro: formatDate(cliente.fechaRegistro),
      };
      await axios.put(`${API_URL}/clientes/${cliente._id}`, clienteAEnviar, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      obtenerClientes();
      setModoEdicion(false);
      setClienteEditando(null);
      setMostrarFormulario(false);
      toast.success("Cliente editado exitosamente");
    } catch (error) {
      console.error("Error al editar el cliente:", error.response ? error.response.data : error.message);
      toast.error(`Error al editar el cliente: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`${API_URL}/clientes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      obtenerClientes();
      toast.success("Cliente eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el cliente:", error.response ? error.response.data : error.message);
      toast.error(`Error al eliminar el cliente: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const marcarComoSolvente = async (id) => {
    try {
      await axios.put(`${API_URL}/clientes/solventar/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      obtenerClientes();
      toast.success("Cliente marcado como solvente");
    } catch (error) {
      console.error("Error al marcar como solvente:", error);
      toast.error("Error al marcar como solvente");
    }
  };

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem('token');
    toast.info("Sesión cerrada");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleHourFilter = (hour) => {
    setSelectedHour(hour);
  };

  const countByHour = (hour) => {
    return clientes.filter(cliente => cliente.horario === hour).length;
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedHour ? cliente.horario === selectedHour : true)
  );

  if (!auth) {
    return <Login setAuth={setAuth} />;
  }

  return (
    <div className="App">
      <ToastContainer />
      <Menu onSearch={handleSearch} onLogout={handleLogout} />
      <div className={`main-content ${scrolled ? 'scrolled' : ''}`}>
        <Container>
          <Dashboard clientes={clientesFiltrados} />
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <ClienteList
              clientes={clientesFiltrados}
              marcarComoSolvente={marcarComoSolvente}
              eliminarCliente={eliminarCliente}
              editarCliente={(cliente) => {
                setModoEdicion(true);
                setClienteEditando(cliente);
                setMostrarFormulario(true);
              }}
              toggleFormulario={() => {
                setModoEdicion(false);
                setMostrarFormulario(!mostrarFormulario);
              }}
              handleHourFilter={handleHourFilter}
              countByHour={countByHour}
            />
          )}
          <AgregarClienteForm
            open={mostrarFormulario && !modoEdicion}
            handleClose={() => setMostrarFormulario(false)}
            nuevoCliente={nuevoCliente}
            setNuevoCliente={setNuevoCliente}
            agregarCliente={agregarCliente}
          />
          <EditarClienteForm
            open={mostrarFormulario && modoEdicion}
            handleClose={() => setMostrarFormulario(false)}
            clienteEditando={clienteEditando}
            setClienteEditando={setClienteEditando}
            editarCliente={editarCliente}
          />
          {pdfCliente && (
            <BlobProvider document={<FacturaPDF cliente={pdfCliente} />}>
              {({ blob, url, loading, error }) => {
                if (!loading && url) {
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `Factura_${pdfCliente.nombre}.pdf`;
                  link.click();
                  setPdfCliente(null); // Reset the pdfCliente to avoid re-triggering the download
                }
                return null;
              }}
            </BlobProvider>
          )}
        </Container>
      </div>
    </div>
  );
}

export default App;
