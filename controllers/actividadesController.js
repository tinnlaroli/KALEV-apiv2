const ActividadModel = require("../models/actividadModel");

class ActividadController {
  // GET /actividades - Obtener todas las actividades
  static async obtenerTodas(req, res) {
    try {
      const actividades = await ActividadModel.obtenerTodas();
      return res.status(200).json({
        success: true,
        data: actividades,
        message: "Actividades obtenidas correctamente",
      });
    } catch (error) {
      console.error("Error al obtener actividades:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener actividades",
        error: error.message,
      });
    }
  }

  // GET /actividades/:id - Obtener actividad por ID
  static async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const actividad = await ActividadModel.obtenerPorId(id);
      if (!actividad) {
        return res.status(404).json({
          success: false,
          message: `No se encontró la actividad con ID ${id}`,
        });
      }
      return res.status(200).json({
        success: true,
        data: actividad,
        message: "Actividad obtenida correctamente",
      });
    } catch (error) {
      console.error(`Error al obtener la actividad con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener la actividad",
        error: error.message,
      });
    }
  }

  // POST /actividades - Crear nueva actividad
  static async crear(req, res) {
    const { nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo } = req.body;

    if (!nombre_actividad || !descripcion || !fecha_inicio || !fecha_fin || !id_grupo) {
      return res.status(400).json({
        success: false,
        message:
          "Todos los campos son obligatorios: nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo",
      });
    }

    try {
      const nuevaActividad = await ActividadModel.crear({
        nombre_actividad,
        descripcion,
        fecha_inicio,
        fecha_fin,
        id_grupo,
      });

      return res.status(201).json({
        success: true,
        data: nuevaActividad,
        message: "Actividad creada correctamente",
      });
    } catch (error) {
      console.error("Error al crear la actividad:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear la actividad",
        error: error.message,
      });
    }
  }

  // GET /actividades/estudiante/:id_estudiante - Obtener actividades por estudiante
  static async obtenerPorEstudiante(req, res) {
    const { id_estudiante } = req.params;
    try {
      const actividades = await ActividadModel.obtenerPorEstudiante(id_estudiante);
      return res.status(200).json({
        success: true,
        data: actividades,
        message: "Actividades del estudiante obtenidas correctamente",
      });
    } catch (error) {
      console.error(`Error al obtener actividades del estudiante ${id_estudiante}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener actividades del estudiante",
        error: error.message,
      });
    }
  }
}

module.exports = ActividadController;