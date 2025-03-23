const { pool } = require("../config/db");

class ItemModel {
  // Obtener todos los ítems
  static async obtenerTodos() {
    try {
      const query = "SELECT * FROM items";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener los ítems:", error);
      throw error;
    }
  }

  // Obtener un ítem por ID
  static async obtenerPorId(id) {
    try {
      const query = "SELECT * FROM items WHERE id_item = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener el ítem con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear nuevo ítem
  static async crear(data) {
    const { nombre, descripcion, costo } = data;

    try {
      const query = `
        INSERT INTO items (nombre, descripcion, costo)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [nombre, descripcion, costo]);
      return rows[0];
    } catch (error) {
      console.error("Error al crear el ítem:", error);
      throw error;
    }
  }
}

module.exports = ItemModel;
