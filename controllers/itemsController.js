const itemModel = require('../models/itemModel');

// Obtener todos los items
const obtenerItems = async (req, res) => {
    try {
        const items = await itemModel.obtenerItems();
        res.json(items);
    } catch (error) {
        console.error('Error al obtener items:', error);
        res.status(500).json({ error: 'Error al obtener items' });
    }
};

// Obtener un item por ID
const obtenerItemPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await itemModel.obtenerItemPorId(id);

        if (!item) {
            return res.status(404).json({ error: 'Item no encontrado' });
        }

        res.json(item);
    } catch (error) {
        console.error('Error al obtener el item:', error);
        res.status(500).json({ error: 'Error al obtener el item' });
    }
};

module.exports = { obtenerItems, obtenerItemPorId };
