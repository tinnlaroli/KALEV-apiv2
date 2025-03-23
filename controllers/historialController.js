const HistorialModel = require("../models/historialModel");

class HistorialController {
  // GET /historial/:id_estudiante - Obtener historial de recomendaciones por estudiante
  static async obtenerPorEstudiante(req, res) {
    const { id_estudiante } = req.params;
    try {
      const historial = await HistorialModel.obtenerPorEstudiante(id_estudiante);
      return res.status(200).json({
        success: true,
        data: historial,
        message: "Historial de recomendaciones obtenido correctamente",
      });
    } catch (error) {
      console.error(`Error al obtener historial del estudiante con ID ${id_estudiante}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener el historial",
        error: error.message,
      });
    }
  }

  // POST /historial - Registrar nueva recomendación
  static async crear(req, res) {
    const { id_estudiante, id_tema, id_estrategia, efectividad } = req.body;

    if (!id_estudiante || !id_tema || !id_estrategia || efectividad === undefined) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios: id_estudiante, id_tema, id_estrategia, efectividad",
      });
    }

    try {
      const nuevaRecomendacion = await HistorialModel.crear({
        id_estudiante,
        id_tema,
        id_estrategia,
        efectividad,
      });

      return res.status(201).json({
        success: true,
        data: nuevaRecomendacion,
        message: "Recomendación registrada correctamente",
      });
    } catch (error) {
      console.error("Error al registrar recomendación:", error);
      return res.status(500).json({
        success: false,
        message: "Error al registrar la recomendación",
        error: error.message,
      });
    }
  }
}

module.exports = HistorialController;
