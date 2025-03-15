const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:KphDacHAkGewSheRBsMdMjAAqHyIVpku@yamabiko.proxy.rlwy.net:14179/railway',
});

const getActividades = async () => {
    const result = await pool.query('SELECT * FROM actividades');
    return result.rows;
};

const getActividadById = async (id) => {
    const result = await pool.query('SELECT * FROM actividades WHERE id_actividad = $1', [id]);
    return result.rows[0]; // Retorna solo un objeto en lugar de un array
};

module.exports = { getActividades, getActividadById };

