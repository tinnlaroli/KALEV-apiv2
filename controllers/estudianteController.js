const EstudianteModel = require('../models/estudianteModel');

class EstudianteController {
  // GET /estudiantes - Obtener todos los estudiantes
  static async obtenerTodos(req, res) {
    try {
      const estudiantes = await EstudianteModel.obtenerTodos();
      return res.status(200).json({
        success: true,
        data: estudiantes,
        message: 'Estudiantes obtenidos correctamente'
      });
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los estudiantes',
        error: error.message
      });
    }
  }

  // GET /estudiantes/:id - Obtener estudiante por ID
  static async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const estudiante = await EstudianteModel.obtenerPorId(id);
      if (!estudiante) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el estudiante con ID ${id}`
        });
      }
      return res.status(200).json({
        success: true,
        data: estudiante,
        message: 'Estudiante obtenido correctamente'
      });
    } catch (error) {
      console.error(`Error al obtener el estudiante con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el estudiante',
        error: error.message
      });
    }
  }

  // POST /estudiantes - Crear nuevo estudiante
  static async crear(req, res) {
    const { nombre, apellidos, correo, id_grupo } = req.body;

    if (!nombre || !apellidos || !correo || !id_grupo) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios: nombre, apellidos, correo, id_grupo'
      });
    }

    try {
      const nuevoEstudiante = await EstudianteModel.crear({
        nombre,
        apellidos,
        correo,
        id_grupo
      });

      return res.status(201).json({
        success: true,
        data: nuevoEstudiante,
        message: 'Estudiante creado correctamente'
      });
    } catch (error) {
      console.error('Error al crear el estudiante:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al crear el estudiante',
        error: error.message
      });
    }
  }

  // GET /estudiantes/grupo/:id_grupo - Obtener estudiantes por grupo
  static async obtenerPorGrupo(req, res) {
    const { id_grupo } = req.params;
    try {
      const estudiantes = await EstudianteModel.obtenerPorGrupo(id_grupo);
      return res.status(200).json({
        success: true,
        data: estudiantes,
        message: `Estudiantes del grupo ${id_grupo} obtenidos correctamente`
      });
    } catch (error) {
      console.error(`Error al obtener estudiantes del grupo ${id_grupo}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los estudiantes por grupo',
        error: error.message
      });
    }
  }
}

module.exports = EstudianteController;
