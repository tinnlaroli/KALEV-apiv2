const EstudianteModel = require('../models/estudianteModel');

// Controlador para la gestión de estudiantes
class EstudianteController {
  // GET /estudiantes - Obtener todos los estudiantes
  static async getAllEstudiantes(req, res) {  
    try {
      const estudiantes = await EstudianteModel.obtenerTodos();
      return res.status(200).json({
        success: true,
        data: estudiantes,
        message: 'Listado de estudiantes obtenido correctamente'
      });
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el listado de estudiantes',
        error: error.message
      });
    }
  }

  // GET /estudiantes/:id - Obtener un estudiante por su ID
  static async getEstudianteById(req, res) {
    try {
      const { id } = req.params;
      const estudiante = await EstudianteModel.obtenerPorId(id);
      
      if (!estudiante) {
        return res.status(404).json({
          success: false,
          message: `No se encontró estudiante con ID ${id}`
        });
      }

      return res.status(200).json({
        success: true,
        data: estudiante,
        message: 'Estudiante encontrado correctamente'
      });
    } catch (error) {
      console.error(`Error al obtener estudiante con ID ${req.params.id}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el estudiante',
        error: error.message
      });
    }
  }
  
  // GET /estudiantes/grupo/:id_grupo - Obtener estudiantes por grupo
  static async getEstudiantesByGrupo(req, res) {
    try {
      const { id_grupo } = req.params;
      
      // Verificamos si el grupo existe
      const grupoExiste = await EstudianteModel.verificarGrupoExiste(id_grupo);
      
      if (!grupoExiste) {
        return res.status(404).json({
          success: false,
          message: `El grupo con ID ${id_grupo} no existe`
        });
      }
      
      // Si el grupo existe, obtenemos sus estudiantes
      const estudiantes = await EstudianteModel.obtenerPorGrupo(id_grupo);
      
      return res.status(200).json({
        success: true,
        data: estudiantes,
        message: `Estudiantes del grupo ${id_grupo} obtenidos correctamente`
      });
    } catch (error) {
      console.error(`Error al obtener estudiantes del grupo ${req.params.id_grupo}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los estudiantes del grupo',
        error: error.message
      });
    }
  }

  // POST /estudiantes - Crear un nuevo estudiante
  static async createEstudiante(req, res) {
    try {
      // Verificamos si el grupo existe
      const { id_grupo } = req.body;
      if (id_grupo) {
        const grupoExiste = await EstudianteModel.verificarGrupoExiste(id_grupo);
        
        if (!grupoExiste) {
          return res.status(404).json({
            success: false,
            message: `El grupo con ID ${id_grupo} no existe`
          });
        }
      }
      
      const nuevoEstudiante = await EstudianteModel.crear(req.body);
      
      return res.status(201).json({
        success: true,
        data: nuevoEstudiante,
        message: 'Estudiante creado correctamente'
      });
    } catch (error) {
      console.error('Error al crear estudiante:', error);
      
      if (error.code === '23505') { // Código para violación de clave única en PostgreSQL
        return res.status(400).json({
          success: false,
          message: 'Error al crear estudiante: el correo o teléfono ya está registrado',
          error: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Error al crear estudiante',
        error: error.message
      });
    }
  }

  // PUT /estudiantes/:id - Actualizar un estudiante
  static async updateEstudiante(req, res) {
    try {
      const { id } = req.params;
      const { id_grupo } = req.body;
      
      // Verificamos si el estudiante existe
      const estudianteExiste = await EstudianteModel.obtenerPorId(id);
      if (!estudianteExiste) {
        return res.status(404).json({
          success: false,
          message: `No se encontró estudiante con ID ${id}`
        });
      }
      
      // Verificamos si el grupo existe
      if (id_grupo) {
        const grupoExiste = await EstudianteModel.verificarGrupoExiste(id_grupo);
        
        if (!grupoExiste) {
          return res.status(404).json({
            success: false,
            message: `El grupo con ID ${id_grupo} no existe`
          });
        }
      }
      
      const estudianteActualizado = await EstudianteModel.actualizar(id, req.body);
      
      return res.status(200).json({
        success: true,
        data: estudianteActualizado,
        message: 'Estudiante actualizado correctamente'
      });
    } catch (error) {
      console.error(`Error al actualizar estudiante con ID ${req.params.id}:`, error);
      
      if (error.code === '23505') {
        return res.status(400).json({
          success: false,
          message: 'Error al actualizar estudiante: el correo o teléfono ya está registrado',
          error: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar estudiante',
        error: error.message
      });
    }
  }

  // DELETE /estudiantes/:id - Eliminar un estudiante
  static async deleteEstudiante(req, res) {
    try {
      const { id } = req.params;
      
      // Verificamos si el estudiante existe
      const estudianteExiste = await EstudianteModel.obtenerPorId(id);
      if (!estudianteExiste) {
        return res.status(404).json({
          success: false,
          message: `No se encontró estudiante con ID ${id}`
        });
      }
      
      const estudianteEliminado = await EstudianteModel.eliminar(id);
      
      return res.status(200).json({
        success: true,
        data: estudianteEliminado,
        message: 'Estudiante eliminado correctamente'
      });
    } catch (error) {
      console.error(`Error al eliminar estudiante con ID ${req.params.id}:`, error);
      
      if (error.code === '23503') { // Violación de clave foránea
        return res.status(400).json({
          success: false,
          message: 'No se puede eliminar el estudiante porque tiene registros relacionados',
          error: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar estudiante',
        error: error.message
      });
    }
  }
};

module.exports = EstudianteController;