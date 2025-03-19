const comprasModel = require('../models/comprasModel');  // Asegúrate de usar el modelo

// Obtener todas las compras
const obtenerCompras = async (req, res) => {
  try {
    const compras = await comprasModel.obtenerCompras();  // Llamamos a la función desde el modelo
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

module.exports = { obtenerCompras, obtenerCompraPorId };   