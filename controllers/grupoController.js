const GrupoModel = require("../models/grupoModel");

class GrupoController {
  // GET /grupos - Obtener todos los grupos
  static async obtenerTodos(req, res) {
    try {
      const grupos = await GrupoModel.obtenerTodos();
      return res.status(200).json({
        success: true,
        data: grupos,
        message: "Grupos obtenidos correctamente",
      });
    } catch (error) {
      console.error("Error al obtener grupos:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener los grupos",
        error: error.message,
      });
    }
  }

  // GET /grupos/:id - Obtener grupo por ID
  static async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const grupo = await GrupoModel.obtenerPorId(id);
      if (!grupo) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el grupo con ID ${id}`,
        });
      }
      return res.status(200).json({
        success: true,
        data: grupo,
        message: "Grupo obtenido correctamente",
      });
    } catch (error) {
      console.error(`Error al obtener el grupo con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener el grupo",
        error: error.message,
      });
    }
  }

  // POST /grupos - Crear nuevo grupo
  static async crear(req, res) {
    const { nombre_grupo, id_docente, id_director, grado } = req.body;

    if (!nombre_grupo || !id_docente || !id_director || !grado) {
      return res.status(400).json({
        success: false,
        message:
          "Todos los campos son obligatorios: nombre_grupo, id_docente, id_director, grado",
      });
    }

    try {
      const docenteExiste = await GrupoModel.verificarDocente(id_docente);
      if (!docenteExiste) {
        return res.status(400).json({
          success: false,
          message: `No existe un docente con ID ${id_docente}`,
        });
      }

      const directorExiste = await GrupoModel.verificarDirector(id_director);
      if (!directorExiste) {
        return res.status(400).json({
          success: false,
          message: `No existe un director con ID ${id_director}`,
        });
      }

      const nuevoGrupo = await GrupoModel.crear({
        nombre_grupo,
        id_docente,
        id_director,
        grado,
      });

      const grupoCompleto = await GrupoModel.obtenerPorId(nuevoGrupo.id_grupo);

      return res.status(201).json({
        success: true,
        data: grupoCompleto,
        message: "Grupo creado correctamente",
      });
    } catch (error) {
      console.error("Error al crear el grupo:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear el grupo",
        error: error.message,
      });
    }
  }

  // PUT /grupos/:id - Actualizar grupo existente
  static async actualizar(req, res) {
    const { id } = req.params;
    const { nombre_grupo, id_docente, id_director, grado } = req.body;

    if (!nombre_grupo && !id_docente && !id_director && !grado) {
      return res.status(400).json({
        success: false,
        message: "Se debe proporcionar al menos un campo para actualizar",
      });
    }

    try {
      const grupoExistente = await GrupoModel.obtenerPorId(id);
      if (!grupoExistente) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el grupo con ID ${id}`,
        });
      }

      if (id_docente) {
        const docenteExiste = await GrupoModel.verificarDocente(id_docente);
        if (!docenteExiste) {
          return res.status(400).json({
            success: false,
            message: `No existe un docente con ID ${id_docente}`,
          });
        }
      }

      if (id_director) {
        const directorExiste = await GrupoModel.verificarDirector(id_director);
        if (!directorExiste) {
          return res.status(400).json({
            success: false,
            message: `No existe un director con ID ${id_director}`,
          });
        }
      }

      await GrupoModel.actualizar(id, {
        nombre_grupo,
        id_docente,
        id_director,
        grado,
      });

      const grupoActualizado = await GrupoModel.obtenerPorId(id);

      return res.status(200).json({
        success: true,
        data: grupoActualizado,
        message: "Grupo actualizado correctamente",
      });
    } catch (error) {
      console.error(`Error al actualizar el grupo con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar el grupo",
        error: error.message,
      });
    }
  }

  // DELETE /grupos/:id - Eliminar grupo
  static async eliminar(req, res) {
    const { id } = req.params;
    try {
      const grupoExistente = await GrupoModel.obtenerPorId(id);
      if (!grupoExistente) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el grupo con ID ${id}`,
        });
      }

      await GrupoModel.eliminar(id);

      return res.status(200).json({
        success: true,
        message: `Grupo con ID ${id} eliminado correctamente`,
      });
    } catch (error) {
      console.error(`Error al eliminar el grupo con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al eliminar el grupo",
        error: error.message,
      });
    }
  }

  // GET /grupos/docente/:id_docente - Obtener grupos por docente
  static async obtenerPorDocente(req, res) {
    const { id_docente } = req.params;
    try {
      const docenteExiste = await GrupoModel.verificarDocente(id_docente);
      if (!docenteExiste) {
        return res.status(404).json({
          success: false,
          message: `No existe un docente con ID ${id_docente}`,
        });
      }

      const grupos = await GrupoModel.obtenerPorDocente(id_docente);

      return res.status(200).json({
        success: true,
        data: grupos,
        message: `Grupos del docente con ID ${id_docente} obtenidos correctamente`,
      });
    } catch (error) {
      console.error(`Error al obtener grupos del docente con ID ${id_docente}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener los grupos del docente",
        error: error.message,
      });
    }
  }

  // GET /grupos/director/:id_director - Obtener grupos por director
  static async obtenerPorDirector(req, res) {
    const { id_director } = req.params;
    try {
      const directorExiste = await GrupoModel.verificarDirector(id_director);
      if (!directorExiste) {
        return res.status(404).json({
          success: false,
          message: `No existe un director con ID ${id_director}`,
        });
      }

      const grupos = await GrupoModel.obtenerPorDirector(id_director);

      return res.status(200).json({
        success: true,
        data: grupos,
        message: `Grupos del director con ID ${id_director} obtenidos correctamente`,
      });
    } catch (error) {
      console.error(`Error al obtener grupos del director con ID ${id_director}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener los grupos del director",
        error: error.message,
      });
    }
  }

  // GET /grupos/grado/:grado - Obtener grupos por grado
  static async obtenerPorGrado(req, res) {
    const { grado } = req.params;
    try {
      const grupos = await GrupoModel.obtenerPorGrado(grado);

      return res.status(200).json({
        success: true,
        data: grupos,
        message: `Grupos del grado ${grado} obtenidos correctamente`,
      });
    } catch (error) {
      console.error(`Error al obtener grupos del grado ${grado}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener los grupos por grado",
        error: error.message,
      });
    }
  }
}

module.exports = GrupoController;