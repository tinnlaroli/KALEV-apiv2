const SesionJuegoModel = require('../models/sesionJuegoModel');

class SesionJuegoController {
  // GET /sesiones_juego/:id_jugador - Obtener sesiones por jugador
  static async obtenerPorJugador(req, res) {
    const { id_jugador } = req.params;
    try {
      const sesiones = await SesionJuegoModel.obtenerPorJugador(id_jugador);
      return res.status(200).json({
        success: true,
        data: sesiones,
        message: `Sesiones de juego del jugador ${id_jugador} obtenidas correctamente`
      });
    } catch (error) {
      console.error(`Error al obtener sesiones de juego del jugador ${id_jugador}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener sesiones de juego',
        error: error.message
      });
    }
  }

  // POST /sesiones_juego - Registrar nueva sesión de juego
  static async crear(req, res) {
    const { id_jugador, id_juego, fecha, duracion, intentos, monedas_ganadas } = req.body;

    if (!id_jugador || !id_juego || !fecha || duracion === undefined || intentos === undefined || monedas_ganadas === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios: id_jugador, id_juego, fecha, duracion, intentos, monedas_ganadas'
      });
    }

    try {
      const nuevaSesion = await SesionJuegoModel.crear({
        id_jugador,
        id_juego,
        fecha,
        duracion,
        intentos,
        monedas_ganadas
      });

      return res.status(201).json({
        success: true,
        data: nuevaSesion,
        message: 'Sesión de juego registrada correctamente'
      });
    } catch (error) {
      console.error('Error al registrar sesión de juego:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al registrar la sesión de juego',
        error: error.message
      });
    }
  }
}

module.exports = SesionJuegoController;
