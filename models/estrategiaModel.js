const pool = require("../config/db");

class EstrategiaModel {
  // Obtener todas las estrategias
  static async obtenerTodas() {
    try {
      const query = "SELECT * FROM estrategias_ensenanza";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener estrategias:", error);
      throw error;
    }
  }

  // Obtener estrategia por ID
  static async obtenerPorId(id) {
    try {
      const query = "SELECT * FROM estrategias_ensenanza WHERE id_estrategia = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener la estrategia con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear una nueva estrategia
  static async crear(data) {
    const { descripcion, estilo_asociado, id_tema } = data;

    try {
      const query = `
        INSERT INTO estrategias_ensenanza (descripcion, estilo_asociado, id_tema)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [descripcion, estilo_asociado, id_tema]);
      return rows[0];
    } catch (error) {
      console.error("Error al crear la estrategia:", error);
      throw error;
    }
  }
}

module.exports = EstrategiaModel;
