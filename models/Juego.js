const pool = require('../config/db');

const getJuegos = async () => {
  const result = await pool.query('SELECT * FROM juego');
  return result.rows;
};

const getJuegoById = async (id_juego) => {
  const result = await pool.query('SELECT * FROM juego WHERE id_juego = $1', [id_juego]);
  return result.rows[0];
};

module.exports = {
  getJuegos,
  getJuegoById,
};
