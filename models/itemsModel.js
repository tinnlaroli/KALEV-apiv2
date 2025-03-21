// models/itemModel.js
const db = require('../config/db'); // Importamos la conexión a la base de datos

// Función para obtener todos los items
const obtenerItems = async () => {
    try {
        const result = await db.query('SELECT * FROM item;'); // Consulta la tabla "item"
        return result.rows;
    } catch (error) {
        throw new Error('Error al obtener los items: ' + error.message);
    }
};

module.exports = { obtenerItems };
