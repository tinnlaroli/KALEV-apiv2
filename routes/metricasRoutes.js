const express = require("express");
const router = express.Router();
const MetricaController = require("../controllers/metricaController");
const validarToken = require("../middlewares/authMiddleware");

// Obtener métricas por jugador
router.get("/:id_jugador", validarToken, MetricaController.obtenerPorJugador);

// Registrar nueva métrica
router.post("/", validarToken, MetricaController.crear);

module.exports = router;
