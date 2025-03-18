const pool = require('../config/db');

const getSesionesPorJugador = async (id_jugador) => {
  const result = await pool.query(
    `SELECT sj.*
         FROM sesiones_juego sj
         JOIN jugadores j ON sj.id_jugador = j.id_jugador
         WHERE j.id_jugador = $1`,
         [id_jugador]
  );
  return result.rows;
};

const registrarSesionJuego = async ({ id_jugador, id_juego, fecha, duracion_juego, intentos, monedas_ganadas }) => {
    const result = await pool.query(
        'INSERT INTO sesiones_juego (id_jugador, id_juego, fecha, duracion_juego, intentos, monedas_ganadas) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id_jugador, id_juego, fecha, duracion_juego, intentos, monedas_ganadas]
    );
    return result.rows[0];
};

module.exports = {
    getSesionesPorJugador,
    registrarSesionJuego,
};
