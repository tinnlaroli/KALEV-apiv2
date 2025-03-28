const express = require('express');
const router = express.Router();
const {
  getTienda,
  registrarCompra,
  crearMascota,
  aplicarDecoracion,
  obtenerMascota,
  obtenerMascotasJugador,
  loginEstudiante
} = require('../controllers/ionicMascotaAaronControllers');

router.get('/tienda', getTienda);
router.post('/comprasItems', registrarCompra);
router.post('/mascotas', crearMascota);
router.post('/mascotas/:id/aplicar-decoracion', aplicarDecoracion);
router.get('/mascotas/:id', obtenerMascota);
router.get('/mascotas/jugador/:id_jugador', obtenerMascotasJugador);
router.post('/login-estudiante', loginEstudiante);
module.exports = router;
