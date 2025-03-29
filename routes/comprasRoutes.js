const express = require("express");
const router = express.Router();
const ComprasController = require("../controllers/comprasController");
const validarToken = require("../middlewares/authMiddleware");

// Obtener todas las compras
router.get("/", validarToken, ComprasController.obtenerTodas);

// Obtener una compra por ID
router.get("/:id", validarToken, ComprasController.obtenerPorId);

// Registrar una nueva compra
router.post("/", validarToken, ComprasController.registrarCompra);

module.exports = router;
