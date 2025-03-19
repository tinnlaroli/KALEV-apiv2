const db = require('../config/db');

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

module.exports = { getCompras, obtenerCompraPorId };
