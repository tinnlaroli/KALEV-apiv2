const EstrategiaModel = require("../models/estrategiaModel");

class EstrategiaController {
  // GET /estrategias_ensenanza - Obtener todas las estrategias
  static async obtenerTodas(req, res) {
    try {
      const estrategias = await EstrategiaModel.obtenerTodas();
      return res.status(200).json({
        success: true,
        data: estrategias,
        message: "Estrategias obtenidas correctamente",
      });
    } catch (error) {
      console.error("Error al obtener estrategias:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener las estrategias",
        error: error.message,
      });
    }
  }

  // GET /estrategias_ensenanza/:id - Obtener estrategia por ID
  static async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const estrategia = await EstrategiaModel.obtenerPorId(id);
      if (!estrategia) {
        return res.status(404).json({
          success: false,
          message: `No se encontró la estrategia con ID ${id}`,
        });
      }
      return res.status(200).json({
        success: true,
        data: estrategia,
        message: "Estrategia obtenida correctamente",
      });
    } catch (error) {
      console.error(`Error al obtener estrategia con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener la estrategia",
        error: error.message,
      });
    }
  }

  // POST /estrategias_ensenanza - Crear nueva estrategia
  static async crear(req, res) {
    const { descripcion, estilo_asociado, id_tema } = req.body;

    if (!descripcion || !estilo_asociado || !id_tema) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios: descripcion, estilo_asociado, id_tema",
      });
    }

    try {
      const nuevaEstrategia = await EstrategiaModel.crear({
        descripcion,
        estilo_asociado,
        id_tema,
      });

      return res.status(201).json({
        success: true,
        data: nuevaEstrategia,
        message: "Estrategia creada correctamente",
      });
    } catch (error) {
      console.error("Error al crear la estrategia:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear la estrategia",
        error: error.message,
      });
    }
  }
}

module.exports = EstrategiaController;