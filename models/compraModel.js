const { pool } = require("../config/db");

class ComprasModel {
  // Obtener todas las compras
  static async obtenerTodas() {
    try {
      const query = "SELECT * FROM compras";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener compras:", error);
      throw error;
    }
  }

  // Obtener compra por ID
  static async obtenerPorId(id) {
    try {
      const query = "SELECT * FROM compras WHERE id_compra = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener la compra con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear nueva compra
  static async crear(data) {
    const { id_usuario, id_item, cantidad, costo_total } = data;

    try {
      const query = `
        INSERT INTO compras (id_usuario, id_item, cantidad, costo_total)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        id_usuario,
        id_item,
        cantidad,
        costo_total
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      throw error;
    }
  }
}

module.exports = ComprasModel;
