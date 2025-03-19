const pool = require('../config/db');

const getMetricasPorJugador = async (id_jugador) => {
  const result = await pool.query(
    `SELECT m.*
         FROM metricas m
         JOIN jugadores j ON m.id_jugador = j.id_jugador
         WHERE j.id_jugador = $1`,
         [id_jugador]
  );
  return result.rows;
};

const registrarMetricas = async ({ id_juego, id_jugador, puntuacion, tiempo_empleado, fecha_completado, intentos, progreso_porcentaje }) => {
  const result = await pool.query(
    'INSERT INTO metricas (id_juego, id_jugador, puntuacion, tiempo_empleado, fecha_completado, intentos, progreso_porcentaje) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [id_juego, id_jugador, puntuacion, tiempo_empleado, fecha_completado, intentos, progreso_porcentaje]
  );
  return result.rows[0];
};

module.exports = {
  getMetricasPorJugador,
  registrarMetricas,
};