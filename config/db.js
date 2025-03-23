require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:KphDacHAkGewSheRBsMdMjAAqHyIVpku@yamabiko.proxy.rlwy.net:14179/railway',
    ssl: {
        rejectUnauthorized: false, // Solo si Railway requiere SSL
    }
});

pool.on('error', (err) => {
    console.error('Error en la conexión con la base de datos:', err);
});

module.exports = pool;
