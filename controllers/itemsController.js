const ItemModel = require("../models/itemModel");

class ItemsController {
  // GET /items - Obtener todos los ítems
  static async obtenerTodos(req, res) {
    try {
      const items = await ItemModel.obtenerTodos();
      return res.status(200).json({
        success: true,
        data: items,
        message: "Ítems obtenidos correctamente",
      });
    } catch (error) {
      console.error("Error al obtener los ítems:", error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener los ítems",
        error: error.message,
      });
    }
  }

  // GET /items/:id - Obtener ítem por ID
  static async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const item = await ItemModel.obtenerPorId(id);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el ítem con ID ${id}`,
        });
      }
      return res.status(200).json({
        success: true,
        data: item,
        message: "Ítem obtenido correctamente",
      });
    } catch (error) {
      console.error(`Error al obtener el ítem con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener el ítem",
        error: error.message,
      });
    }
  }

  // POST /items - Crear nuevo ítem
  static async crear(req, res) {
    const { nombre, descripcion, costo } = req.body;

    if (!nombre || !descripcion || !costo) {
      return res.status(400).json({
        success: false,
        message:
          "Todos los campos son obligatorios: nombre, descripcion, costo",
      });
    }

    try {
      const nuevoItem = await ItemModel.crear({
        nombre,
        descripcion,
        costo,
      });

      return res.status(201).json({
        success: true,
        data: nuevoItem,
        message: "Ítem creado correctamente",
      });
    } catch (error) {
      console.error("Error al crear el ítem:", error);
      return res.status(500).json({
        success: false,
        message: "Error al crear el ítem",
        error: error.message,
      });
    }
  }
}

module.exports = ItemsController;
