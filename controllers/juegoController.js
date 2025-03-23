const JuegoModel = require('../models/juegoModel');

class JuegoController {
  // GET /juegos - Obtener todos los juegos
  static async obtenerTodos(req, res) {
    try {
      const juegos = await JuegoModel.obtenerTodos();
      return res.status(200).json({
        success: true,
        data: juegos,
        message: 'Juegos obtenidos correctamente'
      });
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los juegos',
        error: error.message
      });
    }
  }

  // GET /juegos/:id - Obtener juego por ID
  static async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const juego = await JuegoModel.obtenerPorId(id);
      if (!juego) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el juego con ID ${id}`
        });
      }
      return res.status(200).json({
        success: true,
        data: juego,
        message: 'Juego obtenido correctamente'
      });
    } catch (error) {
      console.error(`Error al obtener el juego con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el juego',
        error: error.message
      });
    }
  }

  // POST /juegos - Crear nuevo juego
  static async crear(req, res) {
    const { nombre, descripcion, categoria } = req.body;

    if (!nombre || !descripcion || !categoria) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios: nombre, descripcion, categoria'
      });
    }

    try {
      const nuevoJuego = await JuegoModel.crear({
        nombre,
        descripcion,
        categoria
      });

      return res.status(201).json({
        success: true,
        data: nuevoJuego,
        message: 'Juego creado correctamente'
      });
    } catch (error) {
      console.error('Error al crear el juego:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al crear el juego',
        error: error.message
      });
    }
  }
}

module.exports = JuegoController;
