const { pool } = require("../config/db");

class JuegoModel {
  // Obtener todos los juegos
  static async obtenerTodos() {
    try {
      const query = "SELECT * FROM juegos";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener los juegos:", error);
      throw error;
    }
  }

  // Obtener juego por ID
  static async obtenerPorId(id) {
    try {
      const query = "SELECT * FROM juegos WHERE id_juego = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener el juego con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear nuevo juego
  static async crear(data) {
    const { nombre, descripcion, categoria } = data;

    try {
      const query = `
        INSERT INTO juegos (nombre, descripcion, categoria)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [nombre, descripcion, categoria]);
      return rows[0];
    } catch (error) {
      console.error("Error al crear el juego:", error);
      throw error;
    }
  }
}

module.exports = JuegoModel;
