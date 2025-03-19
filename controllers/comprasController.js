const comprasModel = require('../models/comprasModel');

const obtenerCompras = async (req, res) => {
    try {
        const compras = await comprasModel.getCompras();
        res.json(compras);
    } catch (error) {
        console.error('Error al obtener compras:', error);
        res.status(500).json({ error: 'Error al obtener compras' });
    }
};

module.exports = { obtenerCompras };
