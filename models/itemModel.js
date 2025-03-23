const db = require('../config/db');

// Obtener todos los items
const obtenerItems = async () => {
    try {
        const result = await db.query('SELECT * FROM item;');
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener los items: ' + error.message);
    }
};

// Obtener un item por ID
const obtenerItemPorId = async (id) => {
    try {
        const result = await db.query('SELECT * FROM item WHERE id_item = $1;', [id]);
        return result.rows[0] || null;
    } catch (error) {
        throw new Error('Error al obtener el item: ' + error.message);
    }
};

module.exports = { obtenerItems, obtenerItemPorId };
