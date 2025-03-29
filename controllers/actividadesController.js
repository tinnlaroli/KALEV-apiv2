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
    const { nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo } =
      req.body;

    // Validación de campos requeridos
    if (
      !nombre_actividad ||
      !descripcion ||
      !fecha_inicio ||
      !fecha_fin ||
      !id_grupo
    ) {
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
      const actividades = await ActividadModel.obtenerPorEstudiante(
        id_estudiante
      );
      return res.status(200).json({
        success: true,
        data: actividades,
        message: "Actividades del estudiante obtenidas correctamente",
      });
    } catch (error) {
      console.error(
        `Error al obtener actividades del estudiante ${id_estudiante}:`,
        error
      );
      return res.status(500).json({
        success: false,
        message: "Error al obtener actividades del estudiante",
        error: error.message,
      });
    }
  }

  // DELETE /actividades/:id - Eliminar actividad por ID
  static async eliminar(req, res) {
    const { id } = req.params;
    try {
      const query =
        "DELETE FROM actividades WHERE id_actividad = $1 RETURNING *";
      const { rows } = await pool.query(query, [id]);

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No se encontró la actividad con ID ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: `Actividad con ID ${id} eliminada correctamente`,
      });
    } catch (error) {
      console.error(`Error al eliminar la actividad con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al eliminar la actividad",
        error: error.message,
      });
    }
  }

  // PUT /actividades/:id - Actualizar actividad
  static async actualizar(req, res) {
    const { id } = req.params;
    const { nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo } =
      req.body;

    if (
      !nombre_actividad ||
      !descripcion ||
      !fecha_inicio ||
      !fecha_fin ||
      !id_grupo
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Todos los campos son obligatorios: nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo",
      });
    }

    try {
      const query = `
      UPDATE actividades
      SET nombre_actividad = $1, descripcion = $2, fecha_inicio = $3, fecha_fin = $4, id_grupo = $5
      WHERE id_actividad = $6
      RETURNING *
    `;
      const { rows } = await pool.query(query, [
        nombre_actividad,
        descripcion,
        fecha_inicio,
        fecha_fin,
        id_grupo,
        id,
      ]);

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No se encontró la actividad con ID ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        data: rows[0],
        message: "Actividad actualizada correctamente",
      });
    } catch (error) {
      console.error(`Error al actualizar la actividad con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar la actividad",
        error: error.message,
      });
    }
  }
}

module.exports = ActividadController;
