const { getActividades, getActividadById } = require('../models/actividad');

const obtenerActividades = async (req, res) => {
    try {
        const actividades = await getActividades();
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener actividades' });
    }
};

const obtenerActividadPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const actividad = await getActividadById(id);

        if (!actividad) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        res.json(actividad);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la actividad' });
    }
};

module.exports = { obtenerActividades, obtenerActividadPorId };
