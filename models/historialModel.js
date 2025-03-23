const {pool} = require("../config/db");

class HistorialModel {
  // Obtener historial de recomendaciones por estudiante
  static async obtenerPorEstudiante(id_estudiante) {
    try {
      const query = `
        SELECT * FROM historial_recomendaciones
        WHERE id_estudiante = $1
      `;
      const { rows } = await pool.query(query, [id_estudiante]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener historial del estudiante con ID ${id_estudiante}:`, error);
      throw error;
    }
  }

  // Crear una nueva entrada en el historial
  static async crear({ id_estudiante, id_tema, id_estrategia, efectividad }) {
    try {
      const query = `
        INSERT INTO historial_recomendaciones (id_estudiante, id_tema, id_estrategia, efectividad)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        id_estudiante,
        id_tema,
        id_estrategia,
        efectividad
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al registrar recomendación:", error);
      throw error;
    }
  }
}

module.exports = HistorialModel;
