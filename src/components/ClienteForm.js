import React from 'react';

const ClienteForm = ({ nuevoCliente, setNuevoCliente, agregarCliente, mostrarFormulario }) => {
  if (!mostrarFormulario) return null;

  return (
    <div>
      <h2>Agregar Cliente</h2>
      <form onSubmit={agregarCliente}>
        <input type="text" placeholder="Nombre" value={nuevoCliente.nombre} onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })} required />
        <input type="text" placeholder="Cédula" value={nuevoCliente.cedula} onChange={(e) => setNuevoCliente({ ...nuevoCliente, cedula: e.target.value })} required />
        <input type="text" placeholder="Teléfono" value={nuevoCliente.telefono} onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })} required />
        <input type="email" placeholder="Correo" value={nuevoCliente.correo} onChange={(e) => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })} />
        <textarea placeholder="Dirección" value={nuevoCliente.direccion} onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}></textarea>
        <input type="date" placeholder="Fecha de Nacimiento" value={nuevoCliente.fecha_nacimiento} onChange={(e) => setNuevoCliente({ ...nuevoCliente, fecha_nacimiento: e.target.value })} />
        <select value={nuevoCliente.sexo} onChange={(e) => setNuevoCliente({ ...nuevoCliente, sexo: e.target.value })}>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <input type="number" placeholder="Edad" value={nuevoCliente.edad} onChange={(e) => setNuevoCliente({ ...nuevoCliente, edad: e.target.value })} required />
        <input type="number" placeholder="Peso" value={nuevoCliente.peso} onChange={(e) => setNuevoCliente({ ...nuevoCliente, peso: e.target.value })} required />
        <input type="number" placeholder="Altura" value={nuevoCliente.altura} onChange={(e) => setNuevoCliente({ ...nuevoCliente, altura: e.target.value })} required />
        <textarea placeholder="Historial Médico" value={nuevoCliente.historial_medico} onChange={(e) => setNuevoCliente({ ...nuevoCliente, historial_medico: e.target.value })}></textarea>
        <select value={nuevoCliente.tipo_entrenamiento} onChange={(e) => setNuevoCliente({ ...nuevoCliente, tipo_entrenamiento: e.target.value })}>
          <option value="Normal">Normal</option>
          <option value="Personalizado">Personalizado</option>
        </select>
        <input type="date" placeholder="Fecha de Inicio" value={nuevoCliente.fecha_inicio} onChange={(e) => setNuevoCliente({ ...nuevoCliente, fecha_inicio: e.target.value })} required />
        <select value={nuevoCliente.tipo_membresia} onChange={(e) => setNuevoCliente({ ...nuevoCliente, tipo_membresia: e.target.value })}>
          <option value="Mensual">Mensual</option>
          <option value="Trimestral">Trimestral</option>
          <option value="Anual">Anual</option>
        </select>
        <textarea placeholder="Notas" value={nuevoCliente.notas} onChange={(e) => setNuevoCliente({ ...nuevoCliente, notas: e.target.value })}></textarea>
        <button type="submit">Agregar Cliente</button>
      </form>
    </div>
  );
};

export default ClienteForm;
