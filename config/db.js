const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  connectionString: 'postgresql://postgres:KphDacHAkGewSheRBsMdMjAAqHyIVpku@yamabiko.proxy.rlwy.net:14179/railway',
  ssl: {
    rejectUnauthorized: false 
  }
});

// Función para verificar la conexión a la base de datos
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Conexión a la base de datos establecida correctamente');
    client.release();
    return true;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};