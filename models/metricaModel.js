const pool = require("../config/db");

class MetricaModel {
  // Obtener métricas por jugador
  static async obtenerPorJugador(id_jugador) {
    try {
      const query = `
        SELECT * FROM metricas
        WHERE id_jugador = $1
      `;
      const { rows } = await pool.query(query, [id_jugador]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener métricas del jugador ${id_jugador}:`, error);
      throw error;
    }
  }

  // Registrar nueva métrica
  static async crear(data) {
    const {
      id_juego,
      id_jugador,
      puntuacion,
      tiempo_empleado,
      fecha_completado,
      intentos,
      progreso_porcentaje
    } = data;

    try {
      const query = `
        INSERT INTO metricas (
          id_juego,
          id_jugador,
          puntuacion,
          tiempo_empleado,
          fecha_completado,
          intentos,
          progreso_porcentaje
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        id_juego,
        id_jugador,
        puntuacion,
        tiempo_empleado,
        fecha_completado,
        intentos,
        progreso_porcentaje
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al registrar métrica:", error);
      throw error;
    }
  }
}

module.exports = MetricaModel;
