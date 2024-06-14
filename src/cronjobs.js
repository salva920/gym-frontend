const cron = require('node-cron');
const axios = require('axios');
const { Pool } = require('pg'); // O el cliente de la base de datos que estés utilizando

// Configurar la conexión a la base de datos
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'railway',
  password: 'ghJeQcVgVySohymnEwfoFvqTqCgUEknx',
  port: 13307,
});

// Función para actualizar el estado de pago de los clientes
const actualizarEstadoClientes = async () => {
  try {
    const res = await pool.query('SELECT id, fechaRegistro, estado_pago FROM clientes');
    const clientes = res.rows;

    const hoy = new Date();

    for (const cliente of clientes) {
      const fechaRegistro = new Date(cliente.fechaRegistro);
      const diferenciaMeses = (hoy.getFullYear() - fechaRegistro.getFullYear()) * 12 + (hoy.getMonth() - fechaRegistro.getMonth());

      if (diferenciaMeses >= 1 && cliente.estado_pago === 'Pagado') {
        await pool.query('UPDATE clientes SET estado_pago = $1 WHERE id = $2', ['Pendiente', cliente.id]);
      }
    }
    console.log('Estados de pago actualizados');
  } catch (err) {
    console.error('Error al actualizar los estados de pago:', err);
  }
};

// Programar el cron job para que se ejecute todos los días a la medianoche
cron.schedule('0 0 * * *', actualizarEstadoClientes, {
  scheduled: true,
  timezone: 'America/New_York', // Ajusta la zona horaria según sea necesario
});

module.exports = { actualizarEstadoClientes };
