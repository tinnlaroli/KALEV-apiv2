const express = require('express');
const router = express.Router();
const {
  getTienda,
  registrarCompra,
  crearMascota,
  aplicarDecoracion,
  obtenerMascota,
  obtenerMascotasJugador,
  obtenerPersonalizacion,
  authController
} = require('../controllers/ionicMascotaAaronControllers');

// Tienda
router.get('/tienda', getTienda);

// Compras
router.post('/comprasItems', registrarCompra);

// Mascotas
router.post('/mascotas', crearMascota);
router.get('/mascotas/:id', obtenerMascota);
router.get('/mascotas/jugador/:id_jugador', obtenerMascotasJugador);
router.get('/mascotas/:id/personalizacion', obtenerPersonalizacion); // 🆕
router.post('/mascotas/:id/aplicar-decoracion', aplicarDecoracion);

// Login de estudiante
router.post('/login-estudiante', authController.login);

module.exports = router;
