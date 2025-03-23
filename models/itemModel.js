const {pool} = require("../config/db");

class ItemModel {
  // Obtener todos los ítems
  static async obtenerTodos() {
    try {
      const query = "SELECT * FROM item";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener los ítems:", error);
      throw error;
    }
  }

  // Obtener un ítem por ID
  static async obtenerPorId(id_item) {
    try {
      const query = "SELECT * FROM item WHERE id_item = $1";
      const { rows } = await pool.query(query, [id_item]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener el ítem con ID ${id_item}:`, error);
      throw error;
    }
  }

  // Crear nuevo ítem
  static async crear(data) {
    const {
      id_tipo_decoracion,
      nombre_item,
      descripcion,
      categoria_items,
      costo_monedas
    } = data;

    try {
      const query = `
        INSERT INTO item (id_tipo_decoracion, nombre_item, descripcion, categoria_items, costo_monedas)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        id_tipo_decoracion,
        nombre_item,
        descripcion,
        categoria_items,
        costo_monedas
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al crear el ítem:", error);
      throw error;
    }
  }
}

module.exports = ItemModel;
