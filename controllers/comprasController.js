const ComprasModel = require('../models/compraModel');

class ComprasController {
  // GET /compras - Obtener todas las compras
  static async obtenerTodas(req, res) {
    try {
      const compras = await ComprasModel.obtenerTodas();
      return res.status(200).json({
        success: true,
        data: compras,
        message: 'Compras obtenidas correctamente'
      });
    } catch (error) {
      console.error('Error al obtener compras:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las compras',
        error: error.message
      });
    }
  }

  // GET /compras/:id - Obtener compra por ID
  static async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const compra = await ComprasModel.obtenerPorId(id);
      if (!compra) {
        return res.status(404).json({
          success: false,
          message: `No se encontró la compra con ID ${id}`
        });
      }
      return res.status(200).json({
        success: true,
        data: compra,
        message: 'Compra obtenida correctamente'
      });
    } catch (error) {
      console.error(`Error al obtener la compra con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener la compra',
        error: error.message
      });
    }
  }

  // POST /compras - Crear nueva compra
  static async crear(req, res) {
    const { id_usuario, id_item, cantidad, costo_total } = req.body;

    if (!id_usuario || !id_item || !cantidad || !costo_total) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios: id_usuario, id_item, cantidad, costo_total'
      });
    }

    try {
      const nuevaCompra = await ComprasModel.crear({
        id_usuario,
        id_item,
        cantidad,
        costo_total
      });

      return res.status(201).json({
        success: true,
        data: nuevaCompra,
        message: 'Compra registrada correctamente'
      });
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al registrar la compra',
        error: error.message
      });
    }
  }

  static async registrarCompra(req, res) {
    try {
      const { id_usuario, id_item, cantidad, costo_total } = req.body;
  
      if (!id_usuario || !id_item || !cantidad || !costo_total) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }
  
      const compra = await CompraModel.registrarCompra({ id_usuario, id_item, cantidad, costo_total });
      res.status(201).json(compra);
    } catch (error) {
      console.error('Error al registrar compra:', error);
      res.status(500).json({ message: 'Error interno al registrar la compra' });
    }
  }
  
}

module.exports = ComprasController;