const GrupoModel = require('../models/grupoModel');

// Controlador para la gestión de grupos
class GrupoController {
  // GET /grupos - Obtener todos los grupos
  static async obtenerTodos(req, res) {
    try {
      const grupos = await GrupoModel.obtenerTodos();
      return res.status(200).json({
        exito: true,
        data: grupos,
        mensaje: 'Grupos obtenidos correctamente'
      });
    } catch (error) {
      console.error('Error al obtener grupos:', error);
      return res.status(500).json({
        exito: false,
        mensaje: 'Error al obtener los grupos',
        error: error.message
      });
    }
  }

  // GET /grupos/:id - Obtener detalles de un grupo específico
  static async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const grupo = await GrupoModel.obtenerPorId(id);
      if (!grupo) {
        return res.status(404).json({
          exito: false,
          mensaje: `No se encontró el grupo con ID ${id}`
        });
      }
      return res.status(200).json({
        exito: true,
        data: grupo,
        mensaje: 'Grupo obtenido correctamente'
      });
    } catch (error) {
      console.error(`Error al obtener el grupo con ID ${id}:`, error);
      return res.status(500).json({
        exito: false,
        mensaje: 'Error al obtener el grupo',
        error: error.message
      });
    }
  }

  // POST /grupos - Crear un nuevo grupo
  static async crear(req, res) {
    const { nombre_grupo, id_docente, id_director, grado } = req.body;
    
    // Validar campos requeridos
    if (!nombre_grupo || !id_docente || !id_director || !grado) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Todos los campos son obligatorios: nombre_grupo, id_docente, id_director, grado'
      });
    }
    
    try {
      // Verificar que el docente existe
      const docenteExiste = await GrupoModel.verificarDocente(id_docente);
      if (!docenteExiste) {
        return res.status(400).json({
          exito: false,
          mensaje: `No existe un docente con ID ${id_docente}`
        });
      }
      
      // Verificar que el director existe
      const directorExiste = await GrupoModel.verificarDirector(id_director);
      if (!directorExiste) {
        return res.status(400).json({
          exito: false,
          mensaje: `No existe un director con ID ${id_director}`
        });
      }
      
      // Crear el grupo
      const nuevoGrupo = await GrupoModel.crear({
        nombre_grupo,
        id_docente,
        id_director,
        grado
      });
      
      // Obtener el grupo completo con los nombres de docente y director
      const grupoCompleto = await GrupoModel.obtenerPorId(nuevoGrupo.id_grupo);
      
      return res.status(201).json({
        exito: true,
        data: grupoCompleto,
        mensaje: 'Grupo creado correctamente'
      });
    } catch (error) {
      console.error('Error al crear el grupo:', error);
      return res.status(500).json({
        exito: false,
        mensaje: 'Error al crear el grupo',
        error: error.message
      });
    }
  }
}

module.exports = GrupoController;