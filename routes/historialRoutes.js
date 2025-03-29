const express = require("express");
const router = express.Router();
const HistorialController = require("../controllers/historialController");
const validarToken = require("../middlewares/authMiddleware");

router.get(
  "/:id_estudiante",
  validarToken,
  HistorialController.obtenerPorEstudiante
);
router.post("/", validarToken, HistorialController.crear);

module.exports = router;
