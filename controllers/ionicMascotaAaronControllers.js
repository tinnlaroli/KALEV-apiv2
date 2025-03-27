const CompraMascotaAaronModel = require('../models/ionicMascotaAaronModels');

const getTienda = async (req, res) => {
  try {
    const items = await CompraMascotaAaronModel.obtenerTienda();
    const agrupado = items.reduce((acc, item) => {
      if (!acc[item.categoria_items]) acc[item.categoria_items] = [];
      acc[item.categoria_items].push(item);
      return acc;
    }, {});
    res.status(200).json(agrupado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la tienda' });
  }
};

const registrarCompra = async (req, res) => {
  try {
    const { id_usuario, id_item, cantidad, costo_total } = req.body;
    if (!id_usuario || !id_item || !cantidad || !costo_total) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    const compra = await CompraMascotaAaronModel.registrarCompra({ id_usuario, id_item, cantidad, costo_total });
    res.status(201).json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la compra' });
  }
};

const crearMascota = async (req, res) => {
  try {
    const { id_jugador, nombre_animal, tipo_animal } = req.body;
    if (!id_jugador || !nombre_animal || !tipo_animal) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    const mascota = await CompraMascotaAaronModel.crearMascota({ id_jugador, nombre_animal, tipo_animal });
    res.status(201).json(mascota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear mascota' });
  }
};

const aplicarDecoracion = async (req, res) => {
  try {
    const id_animal = parseInt(req.params.id);
    const { id_item } = req.body;
    if (!id_item || !id_animal) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    const decoracion = await CompraMascotaAaronModel.aplicarDecoracion({ id_animal, id_item });
    res.status(201).json(decoracion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al aplicar decoración' });
  }
};

const obtenerMascota = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const mascota = await CompraMascotaAaronModel.obtenerMascota(id);
    res.status(200).json(mascota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener mascota' });
  }
};

const obtenerMascotasJugador = async (req, res) => {
  try {
    const id_jugador = parseInt(req.params.id_jugador);
    const mascotas = await CompraMascotaAaronModel.obtenerMascotasPorJugador(id_jugador);
    res.status(200).json(mascotas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener mascotas del jugador' });
  }
};

module.exports = {
  getTienda,
  registrarCompra,
  crearMascota,
  aplicarDecoracion,
  obtenerMascota,
  obtenerMascotasJugador
};