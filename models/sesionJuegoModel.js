const {pool} = require("../config/db");

class SesionJuegoModel {
  // Obtener todas las sesiones de juego de un jugador
  static async obtenerPorJugador(id_jugador) {
    try {
      const query = `
        SELECT * FROM sesiones_juego
        WHERE id_jugador = $1
      `;
      const { rows } = await pool.query(query, [id_jugador]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener sesiones del jugador ${id_jugador}:`, error);
      throw error;
    }
  }

  // Registrar nueva sesión de juego
  static async crear(data) {
    const {
      id_jugador,
      id_juego,
      fecha,
      duracion_juego,
      intentos,
      monedas_ganadas
    } = data;

    try {
      const query = `
        INSERT INTO sesiones_juego (
          id_jugador,
          id_juego,
          fecha,
          duracion_juego,
          intentos,
          monedas_ganadas
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        id_jugador,
        id_juego,
        fecha,
        duracion_juego,
        intentos,
        monedas_ganadas
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al registrar sesión de juego:", error);
      throw error;
    }
  }
}

module.exports = SesionJuegoModel;
