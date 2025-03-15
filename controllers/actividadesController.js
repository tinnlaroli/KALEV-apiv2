const { getActividades, getActividadById, crearActividad } = require('../models/actividad');

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

const crearActividadController = async (req, res) => {
    try {
        const { nombre, descripcion, fecha_inicio, fecha_fin, id_grupo } = req.body;

        // Validación básica
        if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !id_grupo) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const nuevaActividad = await crearActividad(nombre, descripcion, fecha_inicio, fecha_fin, id_grupo);
        res.status(201).json(nuevaActividad);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la actividad' });
    }
};

module.exports = { obtenerActividades, obtenerActividadPorId, crearActividadController };
