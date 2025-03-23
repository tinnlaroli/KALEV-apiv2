const pool = require("../config/db");

class JuegoModel {
  // Obtener todos los juegos
  static async obtenerTodos() {
    try {
      const query = "SELECT * FROM juego";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener los juegos:", error);
      throw error;
    }
  }

  // Obtener juego por ID
  static async obtenerPorId(id_juego) {
    try {
      const query = "SELECT * FROM juego WHERE id_juego = $1";
      const { rows } = await pool.query(query, [id_juego]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener el juego con ID ${id_juego}:`, error);
      throw error;
    }
  }

  // Crear nuevo juego
  static async crear(data) {
    const {
      nombre_juego,
      descripcion,
      nivel,
      id_materia,
      id_estilo
    } = data;

    try {
      const query = `
        INSERT INTO juego (nombre_juego, descripcion, nivel, id_materia, id_estilo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        nombre_juego,
        descripcion,
        nivel,
        id_materia,
        id_estilo
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al crear el juego:", error);
      throw error;
    }
  }
}

module.exports = JuegoModel;
