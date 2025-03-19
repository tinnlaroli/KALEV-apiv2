const comprasModel = require('../models/comprasModel');  // Asegúrate de que la ruta sea correcta

// Obtener todas las compras
const obtenerCompras = async (req, res) => {
    try {
      const compras = await comprasModel.getCompras();  // Usamos el nombre correcto de la función
      res.json(compras);
    } catch (error) {
      console.error('Error al obtener compras:', error);
      res.status(500).json({ error: 'Error al obtener compras' });
    }
  };

// Obtener los detalles de una compra específica por su ID
const obtenerCompraPorId = async (req, res) => {
  const { id } = req.params;  // Obtenemos el ID de los parámetros de la URL
  
  try {
    // Llamamos al modelo para obtener la compra por ID
    const compra = await comprasModel.obtenerCompraPorId(id);

    // Si no se encuentra la compra, devolver un error 404
    if (!compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    res.json(compra);  // Devolvemos los detalles de la compra
  } catch (error) {
    console.error('Error al obtener la compra:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
const registrarCompra = async (req, res) => {
    const { id_usuario, id_item, cantidad, costo_total } = req.body;
  
    // Validación de datos
    if (!id_usuario || !id_item || !cantidad || !costo_total) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos (id_usuario, id_item, cantidad, costo_total)' });
    }
  
    try {
      // Obtenemos la fecha actual
      const fecha_compra = new Date();
  
      // Insertar la nueva compra en la base de datos
      const nuevaCompra = await comprasModel.insertarCompra({ id_usuario, id_item, fecha_compra, cantidad, costo_total });
  
      // Devolver la compra registrada
      res.status(201).json(nuevaCompra);
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

module.exports = { obtenerCompras, obtenerCompraPorId, registrarCompra };  // Exportamos los métodos del controlador