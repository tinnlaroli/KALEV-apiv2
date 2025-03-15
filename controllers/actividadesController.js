const { getActividades } = require('../models/actividad');

const obtenerActividades = async (req, res) => {
    try {
        const actividades = await getActividades();
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener actividades' });
    }
};

module.exports = { obtenerActividades };
