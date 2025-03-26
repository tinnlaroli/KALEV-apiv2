const {pool} = require("../config/db");

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
      // ✅ Validar existencia del ítem
      const itemExiste = await pool.query(
        'SELECT 1 FROM item WHERE id_item = $1',
        [id_item]
      );
  
      if (itemExiste.rowCount === 0) {
        throw new Error(`El ítem con ID ${id_item} no existe`);
      }
  
      // ✅ Validar existencia del usuario
      const usuarioExiste = await pool.query(
        'SELECT 1 FROM usuarios WHERE id_usuario = $1',
        [id_usuario]
      );
  
      if (usuarioExiste.rowCount === 0) {
        throw new Error(`El usuario con ID ${id_usuario} no existe`);
      }
  
      // ✅ Insertar la compra si ambos existen
      const query = `
        INSERT INTO compras (id_usuario, id_item, fecha_compra, cantidad, costo_total)
        VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4)
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
      console.error("Error al registrar la compra:", error.message);
      throw error;
    }
  }
  
  
}

module.exports = ComprasModel;
