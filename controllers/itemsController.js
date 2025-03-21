// controllers/itemController.js
const itemModel = require('../models/itemsModel'); // Importamos el modelo de items

// Obtener todos los items
const obtenerItems = async (req, res) => {
    try {
        const items = await itemModel.obtenerItems(); // Llamamos a la función del modelo
        res.json(items); // Enviamos la respuesta en formato JSON
    } catch (error) {
        console.error('Error al obtener los items:', error);
        res.status(500).json({ error: 'Error al obtener los items' });
    }
};

module.exports = { obtenerItems };
