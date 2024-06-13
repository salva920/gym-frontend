import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Crear estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff0000',
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10,
    color: '#777',
  },
  norms: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  normsText: {
    fontSize: 10,
    marginBottom: 4,
  },
  normsLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

const FacturaPDF = ({ cliente }) => {
  // Calcular la próxima fecha de cobro (asumiendo cobros mensuales)
  const proximaFechaCobro = new Date(cliente.fechaRegistro);
  proximaFechaCobro.setMonth(proximaFechaCobro.getMonth() + 1);
  const proximaFechaCobroFormatted = proximaFechaCobro.toISOString().split('T')[0];

  // Calcular edad
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
      edad--;
    }
    return edad;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Factura de Membresía GYM JMR</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Nombre: <Text style={styles.text}>{cliente.nombre}</Text></Text>
          <Text style={styles.label}>Cédula: <Text style={styles.text}>{cliente.cedula}</Text></Text>
          <Text style={styles.label}>Teléfono: <Text style={styles.text}>{cliente.telefono}</Text></Text>
          <Text style={styles.label}>Dirección: <Text style={styles.text}>{cliente.direccion}</Text></Text>
          <Text style={styles.label}>Años <Text style={styles.text}>{cliente.fecha_nacimiento} ({calcularEdad(cliente.fecha_nacimiento)} años)</Text></Text>
          <Text style={styles.label}>Horario: <Text style={styles.text}>{cliente.horario}</Text></Text>
          <Text style={styles.label}>Tipo de Entrenamiento: <Text style={styles.text}>{cliente.tipo_entrenamiento}</Text></Text>
          <Text style={styles.label}>Fecha de Inicio: <Text style={styles.text}>{cliente.fecha_inicio}</Text></Text>
          <Text style={styles.label}>Tipo de Membresía: <Text style={styles.text}>{cliente.tipo_membresia}</Text></Text>
          <Text style={styles.label}>Notas: <Text style={styles.text}>{cliente.notas}</Text></Text>
          <Text style={styles.label}>Fecha Próxima de Cobro: <Text style={[styles.text, styles.boldText]}>{proximaFechaCobroFormatted}</Text></Text>
        </View>
        <View style={styles.norms}>
          <Text style={styles.normsLabel}>Normas del Gimnasio:</Text>
          <Text style={styles.normsText}>- Llevar su propia agua y paño.</Text>
          <Text style={styles.normsText}>- Duración del entrenamiento: 2 horas.</Text>
          <Text style={styles.normsText}>- Hacer uso correcto de las máquinas.</Text>
          <Text style={styles.normsText}>- Mantener el orden y limpieza.</Text>
        </View>
        <View style={styles.footer}>
          <Text>¡Gracias por ser parte de nuestro gimnasio!</Text>
          <Text>¡Sigue entrenando y alcanzando tus metas!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default FacturaPDF;
