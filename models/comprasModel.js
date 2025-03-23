const db = require('../config/db');  // Conexión a la base de datos

const getCompras = async () => {
    const result = await db.query('SELECT * FROM compras;'); // Usar db.query en lugar de pool.query
    return result.rows;
};

const obtenerCompraPorId = async (id) => {
    try {
        const result = await db.query('SELECT * FROM compras WHERE id_compra = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error('Compra no encontrada');
        }
        return result.rows[0];
    } catch (error) {
        throw new Error('Error al obtener la compra: ' + error.message);
    }
};

const insertarCompra = async ({ id_usuario, id_item, fecha_compra, cantidad, costo_total }) => {
    try {
      const result = await db.query(
        'INSERT INTO compras (id_usuario, id_item, fecha_compra, cantidad, costo_total) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id_usuario, id_item, fecha_compra, cantidad, costo_total]
      );
      return result.rows[0];  // Devolver la compra registrada
    } catch (error) {
      console.error('Error al insertar compra:', error);
      throw new Error('No se pudo registrar la compra');
    }
  };

module.exports = { getCompras, obtenerCompraPorId, insertarCompra };
