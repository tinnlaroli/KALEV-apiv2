const MetricaModel = require("../models/metricaModel");

class MetricaController {
  // GET /metricas/:id_jugador - Obtener métricas por jugador
  static async obtenerPorJugador(req, res) {
    const { id_jugador } = req.params;
    try {
      const metricas = await MetricaModel.obtenerPorJugador(id_jugador);
      return res.status(200).json({
        success: true,
        data: metricas,
        message: `Métricas del jugador ${id_jugador} obtenidas correctamente`,
      });
    } catch (error) {
      console.error(`Error al obtener métricas del jugador ${id_jugador}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener las métricas",
        error: error.message,
      });
    }
  }

  // POST /juegos/metricas - Registrar nueva métrica
  static async crear(req, res) {
    const {
      id_juego,
      id_jugador,
      puntuacion,
      tiempo_empleado,
      fecha_completado,
      intentos,
      progreso_porcentaje,
    } = req.body;

    if (
      !id_juego ||
      !id_jugador ||
      puntuacion === undefined ||
      tiempo_empleado === undefined ||
      !fecha_completado ||
      intentos === undefined ||
      progreso_porcentaje === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Todos los campos son obligatorios: id_juego, id_jugador, puntuacion, tiempo_empleado, fecha_completado, intentos, progreso_porcentaje",
      });
    }

    try {
      const nuevaMetrica = await MetricaModel.crear({
        id_juego,
        id_jugador,
        puntuacion,
        tiempo_empleado,
        fecha_completado,
        intentos,
        progreso_porcentaje,
      });

      return res.status(201).json({
        success: true,
        data: nuevaMetrica,
        message: "Métrica registrada correctamente",
      });
    } catch (error) {
      console.error("Error al registrar métrica:", error);
      return res.status(500).json({
        success: false,
        message: "Error al registrar la métrica",
        error: error.message,
      });
    }
  }
}

module.exports = MetricaController;