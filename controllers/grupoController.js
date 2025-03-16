const GrupoModel = require('../models/grupoModel');

// Controlador para la gestión de grupos
class GrupoController {
  // GET /grupos - Obtener todos los grupos
  static async obtenerTodos(req, res) {
    try {
      const grupos = await GrupoModel.obtenerTodos();
      return res.status(200).json({
        success: true,
        data: grupos,
        message: 'Grupos obtenidos correctamente'
      });
    } catch (error) {
      console.error('Error al obtener grupos:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los grupos',
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
          success: false,
          message: `No se encontró el grupo con ID ${id}`
        });
      }
      return res.status(200).json({
        success: true,
        data: grupo,
        message: 'Grupo obtenido correctamente'
      });
    } catch (error) {
      console.error(`Error al obtener el grupo con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el grupo',
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
        success: false,
        message: 'Todos los campos son obligatorios: nombre_grupo, id_docente, id_director, grado'
      });
    }
    try {
      // Verificar que el docente existe
      const docenteExiste = await GrupoModel.verificarDocente(id_docente);
      if (!docenteExiste) {
        return res.status(400).json({
          success: false,
          message: `No existe un docente con ID ${id_docente}`
        });
      }
      // Verificar que el director existe
      const directorExiste = await GrupoModel.verificarDirector(id_director);
      if (!directorExiste) {
        return res.status(400).json({
          success: false,
          message: `No existe un director con ID ${id_director}`
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
        success: true,
        data: grupoCompleto,
        message: 'Grupo creado correctamente'
      });
    } catch (error) {
      console.error('Error al crear el grupo:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al crear el grupo',
        error: error.message
      });
    }
  }

  // PUT /grupos/:id - Actualizar un grupo existente
  static async actualizar(req, res) {
    const { id } = req.params;
    const { nombre_grupo, id_docente, id_director, grado } = req.body;

    // Validar que al menos un campo sea proporcionado
    if (!nombre_grupo && !id_docente && !id_director && !grado) {
      return res.status(400).json({
        success: false,
        message: 'Se debe proporcionar al menos un campo para actualizar'
      });
    }

    try {
      // Verificar que el grupo existe
      const grupoExistente = await GrupoModel.obtenerPorId(id);
      if (!grupoExistente) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el grupo con ID ${id}`
        });
      }

      // Verificar que el docente existe si se proporciona
      if (id_docente) {
        const docenteExiste = await GrupoModel.verificarDocente(id_docente);
        if (!docenteExiste) {
          return res.status(400).json({
            success: false,
            message: `No existe un docente con ID ${id_docente}`
          });
        }
      }

      // Verificar que el director existe si se proporciona
      if (id_director) {
        const directorExiste = await GrupoModel.verificarDirector(id_director);
        if (!directorExiste) {
          return res.status(400).json({
            success: false,
            message: `No existe un director con ID ${id_director}`
          });
        }
      }

      // Actualizar el grupo
      const grupoActualizado = await GrupoModel.actualizar(id, {
        nombre_grupo,
        id_docente,
        id_director,
        grado
      });

      // Obtener el grupo completo actualizado
      const grupoCompleto = await GrupoModel.obtenerPorId(id);

      return res.status(200).json({
        success: true,
        data: grupoCompleto,
        message: 'Grupo actualizado correctamente'
      });
    } catch (error) {
      console.error(`Error al actualizar el grupo con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar el grupo',
        error: error.message
      });
    }
  }

  // DELETE /grupos/:id - Eliminar un grupo
  static async eliminar(req, res) {
    const { id } = req.params;
    try {
      // Verificar que el grupo existe
      const grupoExistente = await GrupoModel.obtenerPorId(id);
      if (!grupoExistente) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el grupo con ID ${id}`
        });
      }

      // Eliminar el grupo
      await GrupoModel.eliminar(id);

      return res.status(200).json({
        success: true,
        message: `Grupo con ID ${id} eliminado correctamente`
      });
    } catch (error) {
      console.error(`Error al eliminar el grupo con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar el grupo',
        error: error.message
      });
    }
  }

  // GET /grupos/docente/:id_docente - Obtener grupos por docente
  static async obtenerPorDocente(req, res) {
    const { id_docente } = req.params;
    try {
      // Verificar que el docente existe
      const docenteExiste = await GrupoModel.verificarDocente(id_docente);
      if (!docenteExiste) {
        return res.status(404).json({
          success: false,
          message: `No existe un docente con ID ${id_docente}`
        });
      }

      // Obtener los grupos del docente
      const grupos = await GrupoModel.obtenerPorDocente(id_docente);
      
      return res.status(200).json({
        success: true,
        data: grupos,
        message: `Grupos del docente con ID ${id_docente} obtenidos correctamente`
      });
    } catch (error) {
      console.error(`Error al obtener grupos del docente con ID ${id_docente}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los grupos del docente',
        error: error.message
      });
    }
  }

  // GET /grupos/director/:id_director - Obtener grupos por director
  static async obtenerPorDirector(req, res) {
    const { id_director } = req.params;
    try {
      // Verificar que el director existe
      const directorExiste = await GrupoModel.verificarDirector(id_director);
      if (!directorExiste) {
        return res.status(404).json({
          success: false,
          message: `No existe un director con ID ${id_director}`
        });
      }

      // Obtener los grupos del director
      const grupos = await GrupoModel.obtenerPorDirector(id_director);
      
      return res.status(200).json({
        success: true,
        data: grupos,
        message: `Grupos del director con ID ${id_director} obtenidos correctamente`
      });
    } catch (error) {
      console.error(`Error al obtener grupos del director con ID ${id_director}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los grupos del director',
        error: error.message
      });
    }
  }

  // GET /grupos/grado/:grado - Obtener grupos por grado
  static async obtenerPorGrado(req, res) {
    const { grado } = req.params;
    try {
      // Obtener los grupos del grado especificado
      const grupos = await GrupoModel.obtenerPorGrado(grado);
      
      return res.status(200).json({
        success: true,
        data: grupos,
        message: `Grupos del grado ${grado} obtenidos correctamente`
      });
    } catch (error) {
      console.error(`Error al obtener grupos del grado ${grado}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los grupos por grado',
        error: error.message
      });
    }
  }
}

module.exports = GrupoController;