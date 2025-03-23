const Estrategia = require('../models/estrategiaModel');

class EstrategiaController {
    static async obtenerEstrategias(req, res) {
        try {
            const estrategias = await Estrategia.getEstrategias();
            res.json(estrategias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async obtenerEstrategiaPorId(req, res) {
        try {
            const estrategia = await Estrategia.getEstrategiaById(req.params.id);
            if (!estrategia) {
                return res.status(404).json({ message: 'Estrategia no encontrada' });
            }
            res.json(estrategia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async crearEstrategia(req, res) {
        try {
            const { descripcion, estilo_asociado, id_tema } = req.body;
            const nuevaEstrategia = await Estrategia.create({ descripcion, estilo_asociado, id_tema });
            res.status(201).json(nuevaEstrategia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

class HistorialController {
    static async obtenerHistorialPorEstudiante(req, res) {
        try {
            const historial = await Historial.findByEstudianteId(req.params.id_estudiante);
            res.json(historial);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async registrarRecomendacion(req, res) {
        try {
            const { id_estudiante, id_tema, id_estrategia, efectividad } = req.body;
            const nuevaRecomendacion = await Historial.create({ id_estudiante, id_tema, id_estrategia, efectividad });
            res.status(201).json(nuevaRecomendacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { EstrategiaController, HistorialController};
